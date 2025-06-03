'use client';

import * as React from 'react';
import { ParamType, InputParam } from './input-param';
import { CodeBody } from './code-body';
import { DataEmpty } from './data-empty';
import {
  OverflowTabs,
  OverflowTabsList,
  OverflowTabsTrigger,
  OverflowTabsContent,
} from '@/components/ui/overflow-tabs';
import { ResponseState } from '@/components/count-tabs';

interface ResponseTabsProps {
  loading: boolean;
  response: ResponseState | null;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const ResponseTabGroup = ({
  loading,
  response,
  activeTab,
  onTabChange,
}: ResponseTabsProps) => {
  const [headersList, setHeadersList] = React.useState<ParamType[]>([]);

  React.useEffect(() => {
    const headers = response?.orginHeaders;
    // 处理OriginHeaders数据
    const headersList = headers
      ? Object.entries(headers).map(([key, value]) => ({
          key,
          value: value as string,
        }))
      : [];
    setHeadersList(headersList);
  }, [response?.orginHeaders]);

  return (
    <OverflowTabs value={activeTab} onValueChange={onTabChange}>
      <OverflowTabsList>
        <OverflowTabsTrigger value="tab1">Response Body</OverflowTabsTrigger>
        <OverflowTabsTrigger value="tab2">Response Header</OverflowTabsTrigger>
      </OverflowTabsList>
      <OverflowTabsContent value="tab1">
        <CodeBody
          type={response?.type}
          editable={false}
          codeValue={response?.data ? JSON.stringify(response?.data, null, 2) : ''}
          minHeight="100px"
        />
      </OverflowTabsContent>
      <OverflowTabsContent value="tab2">
        <div className="h-[240px] overflow-auto custom-scrollbar pr-2">
          {headersList.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <DataEmpty />
            </div>
          ) : (
            headersList.map((item, index) => <InputParam key={index} param={item} index={index} />)
          )}
        </div>
      </OverflowTabsContent>
    </OverflowTabs>
  );
};
