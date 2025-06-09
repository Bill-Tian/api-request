'use client';

import * as React from 'react';

import { ParamType, InputParam } from './input-param';
import { CodeBody } from './code-body';
import { Plus } from 'lucide-react';
import { DataEmpty } from './data-empty';
import {
  OverflowTabs,
  OverflowTabsList,
  OverflowTabsTrigger,
  OverflowTabsContent,
} from '@/components/ui/overflow-tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { InfoTable } from './info-table';

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

const bodyTypeList = [
  { value: 'none', label: 'None' },
  { value: 'json', label: 'JSON' },
  { value: 'form-data', label: 'Form Data' },
];

export const RequestTabGroup = ({
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

  const [bodyType, setBodyType] = React.useState('none');
  return (
    <OverflowTabs value={activeTab} onValueChange={onTabChange}>
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
              <InputParam
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
              <InputParam
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
        <RadioGroup
          value={bodyType}
          defaultValue="none"
          className="flex gap-6 my-4 text-xs"
          onValueChange={(value) => setBodyType(value)}
        >
          {bodyTypeList.map((item) => (
            <div className="flex items-center space-x-2" key={item.value}>
              <RadioGroupItem value={item.value} id={item.value} />
              <Label htmlFor={item.value} className="text-xs">
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {bodyType === 'none' ? (
          <div className="flex items-center justify-center h-60 text-muted-foreground">
            This request does not have a body
          </div>
        ) : bodyType === 'json' ? (
          <CodeBody codeValue={body} onChange={onBodyChange} height="240px" />
        ) : (
          <InfoTable list={[{ key: 'test', value: 'test' }]} />
        )}
      </OverflowTabsContent>
    </OverflowTabs>
  );
};
