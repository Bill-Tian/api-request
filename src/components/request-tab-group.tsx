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
  body: string | Array<{ key: string; value: string; contentType?: string; file?: File | null }>;
  bodyType: 'none' | 'json' | 'form-data';
  onParamsChange: (params: ParamType[]) => void;
  onHeadersChange: (headers: ParamType[]) => void;
  onBodyChange: (body: string | Array<{ key: string; value: string; contentType?: string; file?: File | null }>) => void;
  onBodyTypeChange: (bodyType: 'none' | 'json' | 'form-data') => void;
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
  bodyType,
  onParamsChange,
  onHeadersChange,
  onBodyChange,
  onBodyTypeChange,
  activeTab,
  onTabChange,
}: RequestTabsProps) => {
  const handleParamChange = (
    index: number,
    field: 'key' | 'value' | 'contentType',
    value: string,
  ) => {
    const newParams = [...params];
    newParams[index] = { ...newParams[index], [field]: value };
    onParamsChange(newParams);
  };

  const handleHeaderChange = (
    index: number,
    field: 'key' | 'value' | 'contentType',
    value: string,
  ) => {
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

  const handleFormDataChange = (
    index: number,
    field: 'key' | 'value' | 'contentType',
    value: string,
  ) => {
    if (Array.isArray(body)) {
      const newBody = [...body];
      newBody[index] = { ...newBody[index], [field]: value };
      onBodyChange(newBody);
    }
  };

  const handleAddFormData = () => {
    if (Array.isArray(body)) {
      onBodyChange([...body, { key: '', value: '' }]);
    }
  };

  const handleDeleteFormData = (index: number) => {
    if (Array.isArray(body)) {
      onBodyChange(body.filter((_, i) => i !== index));
    }
  };

  const handleFileChange = (index: number, file: File | null) => {
    if (Array.isArray(body)) {
      const newBody = [...body];
      newBody[index] = { ...newBody[index], file };
      onBodyChange(newBody);
    }
  };

  return (
    <OverflowTabs value={activeTab} onValueChange={onTabChange}>
      <OverflowTabsList>
        <OverflowTabsTrigger value="tab1">Query Params</OverflowTabsTrigger>
        <OverflowTabsTrigger value="tab2">Headers</OverflowTabsTrigger>
        <OverflowTabsTrigger value="tab3">Body</OverflowTabsTrigger>
      </OverflowTabsList>
      <OverflowTabsContent value="tab1">
        <div className="h-[240px] overflow-auto custom-scrollbar pr-2">
          <label className="inline-block text-sm font-medium text-gray-500 mb-3">
            Query Parameters
          </label>
          <InfoTable
            list={params}
            inputOnChange={handleParamChange}
            handleAddParam={handleAddParam}
            handleDeleteParam={handleDeleteParam}
          />
        </div>
      </OverflowTabsContent>
      <OverflowTabsContent value="tab2">
        <div className="h-[240px] overflow-auto custom-scrollbar pr-2">
          <label className="inline-block text-sm font-medium text-gray-500 mb-3">Header List</label>
          <InfoTable
            list={headers}
            inputOnChange={handleHeaderChange}
            handleAddParam={handleAddHeader}
            handleDeleteParam={handleDeleteHeader}
          />
        </div>
      </OverflowTabsContent>
      <OverflowTabsContent value="tab3">
        <RadioGroup
          value={bodyType}
          defaultValue="none"
          className="flex gap-6 my-4 text-xs"
          onValueChange={(value) => onBodyTypeChange(value as 'none' | 'json' | 'form-data')}
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
        <div className="flex h-60 overflow-auto custom-scrollbar pr-2">
          {bodyType === 'none' ? (
            <div className="flex items-center justify-center h-60 text-muted-foreground">
              This request does not have a body
            </div>
          ) : bodyType === 'json' ? (
            <CodeBody codeValue={typeof body === 'string' ? body : ''} onChange={onBodyChange} height="240px" />
          ) : (
            <InfoTable
              showUpload={true}
              list={Array.isArray(body) ? body : [{ key: '', value: '', contentType: 'auto', file: null }]}
              inputOnChange={handleFormDataChange}
              handleAddParam={handleAddFormData}
              handleDeleteParam={handleDeleteFormData}
              handleFileChange={handleFileChange}
            />
          )}
        </div>
      </OverflowTabsContent>
    </OverflowTabs>
  );
};
