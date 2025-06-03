'use client';
import { useState, useEffect, useCallback } from 'react';
import { Request } from '@/components/request';
import { Response } from '@/components/response';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, X, Dot } from 'lucide-react';
import { MethodColorMap } from '@/lib/constants';
import { cn } from '@/lib/utils';

// 常量定义
const STORAGE_KEYS = {
  TABS: 'requestTabs',
  ACTIVE_TAB: 'activeTab',
} as const;

const DEFAULT_TAB: TabData = {
  id: 1,
  title: 'Request 1',
  requestData: {
    method: 'GET',
    url: '',
    params: [{ key: '', value: '' }],
    headers: [{ key: 'content-Type', value: 'application/json' }],
    body: '',
  },
  activeRequestTab: 'tab1',
  activeResponseTab: 'tab1',
};

// 类型定义
export interface RequestData {
  method: string;
  url: string;
  params: Array<{ key: string; value: string }>;
  headers: Array<{ key: string; value: string }>;
  body: string;
}

export interface ResponseState {
  data: any;
  type: string;
  status: number;
  duration: number;
  size: number;
  orginHeaders: string;
  error: string | null;
}

interface TabData {
  id: number;
  title: string;
  requestData: RequestData;
  activeRequestTab: string;
  activeResponseTab: string;
}

// 工具函数
const getStoredData = <T,>(key: string, defaultValue: T): T => {
  try {
    const saved = sessionStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: any): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to sessionStorage:', error);
  }
};

export function CountTabs() {
  // 状态管理
  const [response, setResponse] = useState<ResponseState | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [tabs, setTabs] = useState<TabData[]>([DEFAULT_TAB]);
  const [activeTab, setActiveTab] = useState('1');

  // 在客户端挂载后从 sessionStorage 加载数据
  useEffect(() => {
    setMounted(true);
    const savedTabs = getStoredData(STORAGE_KEYS.TABS, [DEFAULT_TAB]);
    const savedActiveTab = getStoredData(STORAGE_KEYS.ACTIVE_TAB, '1');
    setTabs(savedTabs);
    setActiveTab(savedActiveTab);
  }, []);

  // 只在客户端挂载后保存数据
  useEffect(() => {
    if (mounted) {
      saveToStorage(STORAGE_KEYS.TABS, tabs);
    }
  }, [tabs, mounted]);

  useEffect(() => {
    if (mounted) {
      saveToStorage(STORAGE_KEYS.ACTIVE_TAB, activeTab);
    }
  }, [activeTab, mounted]);

  // 事件处理函数
  const addNewTab = useCallback(() => {
    const newId = tabs.length + 1;
    setTabs(prev => [...prev, {
      ...DEFAULT_TAB,
      id: newId,
      title: `Request ${newId}`,
    }]);
    setActiveTab(newId.toString());
  }, [tabs.length]);

  const removeTab = useCallback((id: number) => {
    if (tabs.length === 1) return;
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== id);
      if (activeTab === id.toString()) {
        setActiveTab(newTabs[newTabs.length - 1].id.toString());
      }
      return newTabs;
    });
  }, [tabs.length, activeTab]);

  const updateTabData = useCallback((id: number, newData: Partial<RequestData>) => {
    setTabs(prev => prev.map(tab =>
      tab.id === id
        ? { ...tab, requestData: { ...tab.requestData, ...newData } }
        : tab
    ));
  }, []);

  const updateActiveRequestTab = useCallback((id: number, value: string) => {
    setTabs(prev => prev.map(tab =>
      tab.id === id ? { ...tab, activeRequestTab: value } : tab
    ));
  }, []);

  const updateActiveResponseTab = useCallback((id: number, value: string) => {
    setTabs(prev => prev.map(tab =>
      tab.id === id ? { ...tab, activeResponseTab: value } : tab
    ));
  }, []);

  // 渲染辅助函数
  const renderTabTrigger = useCallback((tab: TabData) => (
    <TabsTrigger
      key={tab.id}
      value={tab.id.toString()}
      className="group relative h-auto w-40 justify-start bg-transparent mr-0 border-none cursor-pointer data-[state=active]:bg-background px-2 py-2 rounded-none data-[state=active]:shadow-[inset_0_1px_0_0,0_-1px_0_0] hover:bg-card"
    >
      <div className="flex items-center h-6 leading-6 px-2">
        <div className={cn('text-xs font-medium mr-1', MethodColorMap[tab.requestData.method as keyof typeof MethodColorMap])}>{tab.requestData.method}</div>
        <div className="truncate w-20">{tab.title}</div>
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
  ), [tabs.length, removeTab]);

  const renderTabContent = useCallback((tab: TabData) => (
    <TabsContent key={tab.id} value={tab.id.toString()}>
      <Request
        data={tab.requestData}
        onDataChange={(newData) => updateTabData(tab.id, newData)}
        activeRequestTab={tab.activeRequestTab}
        activeResponseTab={tab.activeResponseTab}
        onRequestTabChange={(value) => updateActiveRequestTab(tab.id, value)}
        onResponseTabChange={(value) => updateActiveResponseTab(tab.id, value)}
        setLoading={setLoading}
        setResponse={setResponse}
        loading={loading}
      />
      <Response
        loading={loading}
        response={response}
        activeResponseTab={tab.activeResponseTab}
        onResponseTabChange={(value) => updateActiveResponseTab(tab.id, value)}
      />
    </TabsContent>
  ), [loading, response, updateTabData, updateActiveRequestTab, updateActiveResponseTab]);

  return (
    <div className="max-w-6xl mx-auto my-2 border border-border rounded p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start rounded-none p-0">
          <div className="flex items-center max-w-[850px] overflow-auto custom-scrollbar">
            {tabs.map(renderTabTrigger)}
          </div>
          <Plus size={16} className="mx-2 cursor-pointer" onClick={addNewTab} />
        </TabsList>
        {tabs.map(renderTabContent)}
      </Tabs>
    </div>
  );
}
