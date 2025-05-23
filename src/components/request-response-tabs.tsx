'use client';
import { useState } from "react";
import { RequestResponse } from "./request-response";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Plus, X } from "lucide-react";

export function RequestResponseTabs() {
  const [tabs, setTabs] = useState([{ id: 1, title: "请求 1" }]);
  const [activeTab, setActiveTab] = useState("1");

  const addNewTab = () => {
    const newId = tabs.length + 1;
    setTabs([...tabs, { id: newId, title: `请求 ${newId}` }]);
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
      <div className="flex items-center gap-2 mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id.toString()}
                className="flex items-center gap-2"
              >
                {tab.title}
                {tabs.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTab(tab.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <Plus size={16}  onClick={addNewTab}/>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id.toString()}>
              <RequestResponse />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
} 