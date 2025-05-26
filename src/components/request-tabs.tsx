'use client';

import * as React from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import { ParamType, TabParam } from './tab-param';
import { TabBody } from './tab-body';
import { Plus } from 'lucide-react';
import { TabsTrigger } from './ui/tabs';
import { DataEmpty } from './data-empty';

export const RequestTabs = () => {
  const [paramsList, setParamsList] = React.useState<ParamType[]>([{ key: '', value: '' }]);
  const [headersList, setHeadersList] = React.useState<ParamType[]>([{ key: '', value: '' }]);
  const [bodyValue, setBodyValue] = React.useState<string>(``);

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

  const handleBodyChange = (val: string) => {
    console.log(val);
    setBodyValue(val);
  };

  return (
    <Tabs.Root className="flex w-[900px] flex-col" defaultValue="tab1">
      <Tabs.List
        className="flex shrink-0 border-b border-zinc-200"
        aria-label="Manage your account"
      >
        <TabsTrigger value="tab1">Query Params</TabsTrigger>
        <TabsTrigger value="tab2">Headers</TabsTrigger>
        <TabsTrigger value="tab3">Body</TabsTrigger>
      </Tabs.List>
      <Tabs.Content
        className="grow rounded-b-md bg-white py-2 outline-none px-4 border border-[#f3f4f6]"
        value="tab1"
      >
        <div className="h-[200px] overflow-auto custom-scrollbar pr-2">
          <div className="flex items-center justify-between mb-1">
            <label className="inline-block text-sm font-medium text-gray-500 mb-2">
              Query Parameters
            </label>
            <div className="flex items-center">
              <Plus size={16} className="ml-2 cursor-pointer" onClick={handleAddParam} />
            </div>
          </div>

          {paramsList.length === 0 ? (
            <div className="flex items-center justify-center h-[calc(100%-32px)]">
              <DataEmpty />
            </div>
          ) : (
            paramsList.map((item, index) => (
              <TabParam
                key={index}
                param={item}
                index={index}
                onChange={handleParamChange}
                onDelete={handleDeleteParam}
              />
            ))
          )}
        </div>
      </Tabs.Content>
      <Tabs.Content
        className="grow rounded-b-md bg-white py-2 outline-none px-4 border border-[#f3f4f6]"
        value="tab2"
      >
        <div className="h-[200px] overflow-auto custom-scrollbar pr-2">
          <div className="flex items-center justify-between mb-1">
            <label className="inline-block text-sm font-medium text-gray-500 mb-2">
              Header List
            </label>
            <div className="flex items-center">
              <Plus size={16} className="ml-2 cursor-pointer" onClick={handleAddHeader} />
            </div>
          </div>
          {headersList.length === 0 ? (
            <div className="flex items-center justify-center h-[calc(100%-32px)]">
              <DataEmpty />
            </div>
          ) : (
            headersList.map((item, index) => (
              <TabParam
                isHeader={true}
                key={index}
                param={item}
                index={index}
                onChange={handleHeaderChange}
                onDelete={handleDeleteHeader}
              />
            ))
          )}
        </div>
      </Tabs.Content>
      <Tabs.Content
        className="grow rounded-b-md bg-white py-2 outline-none px-4 border border-[#f3f4f6] overflow-auto custom-scrollbar"
        value="tab3"
      >
        <TabBody codeValue={bodyValue} onChange={handleBodyChange} />
      </Tabs.Content>
    </Tabs.Root>
  );
};
