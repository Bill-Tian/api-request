'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import * as Tabs from '@radix-ui/react-tabs';
import { ParamType, TabParam } from './tab-param';
import { TabBody } from './tab-body';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export const RequestTabs = ({ className, type, ...props }: any) => {
  const [paramsList, setParamsList] = React.useState<ParamType[]>([{ key: '', value: '' }]);
  const [headersList, setHeadersList] = React.useState<ParamType[]>([{ key: '', value: '' }]);

  const handleParamChange = (index: number, field: 'key' | 'value', value: string) => {
    setParamsList((prev) => {
      const newList = [...prev];
      newList[index] = { ...newList[index], [field]: value };
      return newList;
    });
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    setHeadersList((prev) => {
      const newList = [...prev];
      newList[index] = { ...newList[index], [field]: value };
      return newList;
    });
  };

  const handleAddParam = () => {
    setParamsList((prev) => [...prev, { key: '', value: '' }]);
  };

  const handleAddHeader = () => {
    setHeadersList((prev) => [...prev, { key: '', value: '' }]);
  };

  const handleDeleteParam = (index: number) => {
    setParamsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteHeader = (index: number) => {
    setHeadersList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Tabs.Root className="flex w-[800px] flex-col" defaultValue="tab1">
      <Tabs.List
        className="flex shrink-0 border-b border-zinc-600"
        aria-label="Manage your account"
      >
        <Tabs.Trigger
          className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none text-zinc-800 outline-none first:rounded-tl-md last:rounded-tr-md hover:text-violet-900 data-[state=active]:text-violet-900 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current "
          value="tab1"
        >
          请求参数
        </Tabs.Trigger>
        <Tabs.Trigger
          className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none text-zinc-800 outline-none first:rounded-tl-md last:rounded-tr-md hover:text-violet-900 data-[state=active]:text-violet-900 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current "
          value="tab2"
        >
          请求头
        </Tabs.Trigger>
        <Tabs.Trigger
          className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none text-zinc-800 outline-none first:rounded-tl-md last:rounded-tr-md hover:text-violet-900 data-[state=active]:text-violet-900 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current "
          value="tab3"
        >
          请求体
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        className="grow rounded-b-md bg-white py-5 outline-none"
        value="tab1"
      >
        <div className="space-y-2 px-4">
          {paramsList.map((item, index) => (
            <TabParam
              key={index}
              param={item}
              index={index}
              onChange={handleParamChange}
              onDelete={handleDeleteParam}
            />
          ))}
          <Button variant="outline" size="sm" className="mt-2" onClick={handleAddParam}>
            <Plus className="h-4 w-4 mr-2" />
            添加参数
          </Button>
        </div>
      </Tabs.Content>
      <Tabs.Content
        className="grow rounded-b-md bg-white py-5 outline-none"
        value="tab2"
      >
        <div className="space-y-2 px-4">
          {headersList.map((item, index) => (
            <TabParam
              key={index}
              param={item}
              index={index}
              onChange={handleHeaderChange}
              onDelete={handleDeleteHeader}
            />
          ))}
          <Button variant="outline" size="sm" className="mt-2" onClick={handleAddHeader}>
            <Plus className="h-4 w-4 mr-2" />
            添加头
          </Button>
        </div>
      </Tabs.Content>
      <Tabs.Content
        className="grow rounded-b-md bg-white py-5 outline-none"
        value="tab3"
      >
        <TabBody />
      </Tabs.Content>
    </Tabs.Root>
  );
};
