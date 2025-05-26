'use client';
import { useState } from 'react';
import { RequestResponse } from './request-response';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, X, Dot } from 'lucide-react';

export function RequestResponseTabs() {
  const [tabs, setTabs] = useState([{ id: 1, title: 'Request 1' }]);
  const [activeTab, setActiveTab] = useState('1');

  const addNewTab = () => {
    const newId = tabs.length + 1;
    setTabs([...tabs, { id: newId, title: `Request ${newId}` }]);
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
            <RequestResponse />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
