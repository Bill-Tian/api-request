'use client';

import * as React from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import { ParamType, TabParam } from './tab-param';
import { TabBody } from './tab-body';
import { Plus } from 'lucide-react';
import { TabsTrigger } from './ui/tabs';
import { DataEmpty } from './data-empty';

interface RequestTabsProps {
  params: ParamType[];
  headers: ParamType[];
  body: string;
  onParamsChange: (params: ParamType[]) => void;
  onHeadersChange: (headers: ParamType[]) => void;
  onBodyChange: (body: string) => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const RequestTabs = ({
  params,
  headers,
  body,
  onParamsChange,
  onHeadersChange,
  onBodyChange,
  activeTab,
  onTabChange,
}: RequestTabsProps) => {
  const handleParamChange = (index: number, field: 'key' | 'value', value: string) => {
    const newParams = [...params];
    newParams[index] = { ...newParams[index], [field]: value };
    onParamsChange(newParams);
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    onHeadersChange(newHeaders);
  };

  const handleAddParam = () => {
    onParamsChange([...params, { key: '', value: '' }]);
  };

  const handleAddHeader = () => {
    onHeadersChange([...headers, { key: '', value: '' }]);
  };

  const handleDeleteParam = (index: number) => {
    onParamsChange(params.filter((_, i) => i !== index));
  };

  const handleDeleteHeader = (index: number) => {
    onHeadersChange(headers.filter((_, i) => i !== index));
  };

  return (
    <Tabs.Root 
      className="flex w-[900px] flex-col" 
      value={activeTab} 
      onValueChange={onTabChange}
    >
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

          {params.length === 0 ? (
            <div className="flex items-center justify-center h-[calc(100%-32px)]">
              <DataEmpty />
            </div>
          ) : (
            params.map((item, index) => (
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
          {headers.length === 0 ? (
            <div className="flex items-center justify-center h-[calc(100%-32px)]">
              <DataEmpty />
            </div>
          ) : (
            headers.map((item, index) => (
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
        <TabBody codeValue={body} onChange={onBodyChange} />
      </Tabs.Content>
    </Tabs.Root>
  );
};
