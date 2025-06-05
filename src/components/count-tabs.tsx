'use client';
import { useState, useEffect } from 'react';
import { Request } from '@/components/request';
import { Response } from '@/components/response';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, X, Dot } from 'lucide-react';
import { MethodColorMap } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { TabData, RequestData, ResponseData } from '@/types/tabs';
import { getStoredData, saveToStorage, STORAGE_KEYS } from '@/lib/storage';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// 默认标签页数据
const DEFAULT_TAB_ID = '1'; // 服务器端渲染时使用固定值
const DEFAULT_TAB: TabData = {
  id: DEFAULT_TAB_ID,
  title: `Untitled`,
  requestData: {
    method: 'GET',
    url: '',
    params: [{ key: '', value: '' }],
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: '',
  },
  activeRequestTab: 'tab1',
  activeResponseTab: 'tab1',
  responseData: {
    data: null,
    type: '',
    status: 0,
    duration: 0,
    size: 0,
    orginHeaders: '',
    error: null,
  },
};

export function CountTabs() {
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState<TabData[]>([DEFAULT_TAB]);
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB_ID);
  const [editingTab, setEditingTab] = useState<TabData | null>(null);
  const [newTitle, setNewTitle] = useState('');

  // 在客户端挂载后从 sessionStorage 加载数据
  useEffect(() => {
    const savedTabs = getStoredData(STORAGE_KEYS.TABS, [DEFAULT_TAB]);
    const savedActiveTab = getStoredData(STORAGE_KEYS.ACTIVE_TAB, DEFAULT_TAB_ID);
    setTabs(savedTabs);
    setActiveTab(savedActiveTab);
  }, []);

  // 只在客户端挂载后保存数据
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TABS, tabs);
  }, [tabs]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ACTIVE_TAB, activeTab);
  }, [activeTab]);

  // 事件处理函数
  const addNewTab = () => {
    const newId = uuidv4(); // 使用 UUID 生成唯一 ID
    setTabs((prev) => [
      ...prev,
      {
        ...DEFAULT_TAB,
        id: newId,
        title: `Untitled`,
      },
    ]);
    setActiveTab(newId);
  };

  const removeTab = (id: string) => {
    if (tabs.length === 1) return;
    setTabs((prev) => {
      const newTabs = prev.filter((tab) => tab.id !== id);
      if (activeTab === id) {
        setActiveTab(newTabs[newTabs.length - 1].id);
      }
      return newTabs;
    });
  };

  const updateTabData = (id: string, newData: Partial<RequestData>) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === id ? { ...tab, requestData: { ...tab.requestData, ...newData } } : tab,
      ),
    );
  };

  const updateActiveRequestTab = (id: string, value: string) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === id ? { ...tab, activeRequestTab: value } : tab)),
    );
  };

  const updateActiveResponseTab = (id: string, value: string) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === id ? { ...tab, activeResponseTab: value } : tab)),
    );
  };

  const setResponseData = (id: string, value: ResponseData) => {
    setTabs((prev) => prev.map((tab) => (tab.id === id ? { ...tab, responseData: value } : tab)));
  };

  const handleTitleEdit = (tab: TabData) => {
    setEditingTab(tab);
    setNewTitle(tab.title);
  };

  const handleTitleSave = () => {
    if (editingTab) {
      setTabs((prev) =>
        prev.map((tab) => (tab.id === editingTab.id ? { ...tab, title: newTitle } : tab)),
      );
      setEditingTab(null);
    }
  };

  // 渲染辅助函数
  const renderTabTrigger = (tab: TabData) => (
    <TabsTrigger
      key={tab.id}
      value={tab.id}
      className="group relative h-auto w-40 justify-start bg-transparent mr-0 border-r-[0px] border-l border-l-solid border-l-border/60 cursor-pointer text-muted-foreground data-[state=active]:text-foreground data-[state=active]:bg-background px-2 py-2 rounded-none data-[state=active]:shadow-[inset_0_1.5px_0_0_var(--primary),0_-1.5px_0_0_var(--primary)] hover:bg-primary/10"
      onDoubleClick={() => handleTitleEdit(tab)}
    >
      <div className="flex items-center h-6 leading-6 px-2">
        <div
          className={cn(
            'text-xs font-medium mr-1',
            MethodColorMap[tab.requestData.method as keyof typeof MethodColorMap],
          )}
        >
          {tab.requestData.method}
        </div>
        {/* <Tooltip>
          <TooltipTrigger className="cursor-pointer">
          </TooltipTrigger>
          <TooltipContent>
            <p>{tab.title}</p>
          </TooltipContent>
        </Tooltip> */}
        <div className="truncate w-20 text-[13px]">{tab.title}</div>

        <div className="flex items-center absolute right-2 top-3">
          {tabs.length > 1 ? (
            <div
              className="h-4 w-4 invisible group-hover:visible cursor-pointer hover:bg-accent hover:text-accent-foreground rounded"
              onClick={(e) => {
                e.stopPropagation();
                removeTab(tab.id);
              }}
            >
              <X className="h-4 w-4" />
            </div>
          ) : (
            <div className="h-4 w-4 ml-4">
              <Dot size={16} />
            </div>
          )}
        </div>
      </div>
    </TabsTrigger>
  );

  const renderTabContent = (tab: TabData) => (
    <TabsContent key={tab.id} value={tab.id}>
      <Request
        data={tab.requestData}
        onDataChange={(newData) => updateTabData(tab.id, newData)}
        activeRequestTab={tab.activeRequestTab}
        activeResponseTab={tab.activeResponseTab}
        onRequestTabChange={(value) => updateActiveRequestTab(tab.id, value)}
        onResponseTabChange={(value) => updateActiveResponseTab(tab.id, value)}
        setLoading={setLoading}
        setResponse={(value) => setResponseData(tab.id, value)}
        loading={loading}
      />
      <Response
        loading={loading}
        response={tab.responseData}
        activeResponseTab={tab.activeResponseTab}
        onResponseTabChange={(value) => updateActiveResponseTab(tab.id, value)}
      />
    </TabsContent>
  );

  return (
    <div className="max-w-6xl mx-auto my-2 border border-border rounded p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full h-auto justify-start rounded-none p-0">
          <div className="flex items-center overflow-auto custom-scrollbar">
            {tabs.map(renderTabTrigger)}
          </div>
          <Plus size={16} className="mx-4 cursor-pointer" onClick={addNewTab} />
        </TabsList>
        {tabs.map(renderTabContent)}
      </Tabs>

      <Dialog open={!!editingTab} onOpenChange={() => setEditingTab(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Request Title</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter new title"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTab(null)}>
              Cancel
            </Button>
            <Button onClick={handleTitleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
