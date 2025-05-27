'use client';
import { useState } from 'react';
import { RequestResponse } from './request-response';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, X, Dot } from 'lucide-react';

interface TabData {
  id: number;
  title: string;
  requestData: {
    method: string;
    url: string;
    params: Array<{ key: string; value: string }>;
    headers: Array<{ key: string; value: string }>;
    body: string;
  };
  activeRequestTab: string;
  activeResponseTab: string;
}

export function RequestResponseTabs() {
  const [tabs, setTabs] = useState<TabData[]>([
    {
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
    },
  ]);
  const [activeTab, setActiveTab] = useState('1');

  const addNewTab = () => {
    const newId = tabs.length + 1;
    setTabs([
      ...tabs,
      {
        id: newId,
        title: `Request ${newId}`,
        requestData: {
          method: 'GET',
          url: '',
          params: [{ key: '', value: '' }],
          headers: [{ key: '', value: '' }],
          body: '',
        },
        activeRequestTab: 'tab1',
        activeResponseTab: 'tab1',
      },
    ]);
    setActiveTab(newId.toString());
  };

  const removeTab = (id: number) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(newTabs);
    if (activeTab === id.toString()) {
      setActiveTab(newTabs[newTabs.length - 1].id.toString());
    }
  };

  const updateTabData = (id: number, newData: Partial<TabData['requestData']>) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === id
          ? {
              ...tab,
              requestData: {
                ...tab.requestData,
                ...newData,
              },
            }
          : tab
      )
    );
  };

  const updateActiveRequestTab = (id: number, value: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === id
          ? {
              ...tab,
              activeRequestTab: value,
            }
          : tab
      )
    );
  };

  const updateActiveResponseTab = (id: number, value: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === id
          ? {
              ...tab,
              activeResponseTab: value,
            }
          : tab
      )
    );
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex items-center bg-[#f9fafb]">
          <div className="flex items-center max-w-[850px] overflow-auto custom-scrollbar">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id.toString()}
                className="group relative h-auto w-35 bg-transparent mr-0 data-[state=active]:bg-[#fff] px-4 py-2 border-r border-r-[#f3f4f6] rounded-none data-[state=active]:shadow-[inset_0_1px_0_0,0_-1px_0_0] hover:bg-[#f3f4f6]"
              >
                <div className="flex items-center w-25 h-6 leading-6 px-2">
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
            ))}
          </div>
          <Plus size={16} className="ml-4 cursor-pointer" onClick={addNewTab} />
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id.toString()}>
            <RequestResponse
              data={tab.requestData}
              onDataChange={(newData) => updateTabData(tab.id, newData)}
              activeRequestTab={tab.activeRequestTab}
              activeResponseTab={tab.activeResponseTab}
              onRequestTabChange={(value) => updateActiveRequestTab(tab.id, value)}
              onResponseTabChange={(value) => updateActiveResponseTab(tab.id, value)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
