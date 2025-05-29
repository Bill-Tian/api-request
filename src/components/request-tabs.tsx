'use client';

import * as React from 'react';

import { ParamType, TabParam } from './tab-param';
import { TabBody } from './tab-body';
import { Plus } from 'lucide-react';
import { DataEmpty } from './data-empty';
import {
  OverflowTabs,
  OverflowTabsList,
  OverflowTabsTrigger,
  OverflowTabsContent,
} from '@/components/ui/overflow-tabs';

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
    <OverflowTabs className="w-[900px]" value={activeTab} onValueChange={onTabChange}>
      <OverflowTabsList>
        <OverflowTabsTrigger value="tab1">Query Params</OverflowTabsTrigger>
        <OverflowTabsTrigger value="tab2">Headers</OverflowTabsTrigger>
        <OverflowTabsTrigger value="tab3">Body</OverflowTabsTrigger>
      </OverflowTabsList>
      <OverflowTabsContent value="tab1">
        <div className="h-[240px] overflow-auto custom-scrollbar pr-2">
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
      </OverflowTabsContent>
      <OverflowTabsContent value="tab2">
        <div className="h-[240px] overflow-auto custom-scrollbar pr-2">
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
      </OverflowTabsContent>
      <OverflowTabsContent value="tab3">
        <TabBody codeValue={body} onChange={onBodyChange} />
      </OverflowTabsContent>
    </OverflowTabs>
  );
};
