'use client';

import * as React from 'react';
import { ParamType, TabParam } from './tab-param';
import { TabBody } from './tab-body';
import { cn } from '@/lib/utils';
import { DataEmpty } from './data-empty';
import {
  OverflowTabs,
  OverflowTabsList,
  OverflowTabsTrigger,
  OverflowTabsContent,
} from '@/components/ui/overflow-tabs';

interface ResponseTabsProps {
  isLoading: boolean;
  type: string;
  status: number;
  duration: number;
  size: string;
  responseData: any;
  orginHeaders: any;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const ResponseTabs = ({
  isLoading,
  type,
  status,
  duration,
  size,
  responseData,
  orginHeaders,
  activeTab,
  onTabChange,
}: ResponseTabsProps) => {
  const [headersList, setHeadersList] = React.useState<ParamType[]>([]);

  React.useEffect(() => {
    const headers = orginHeaders;
    const headersList = headers
      ? Object.entries(headers).map(([key, value]) => ({
          key,
          value: value as string,
        }))
      : [];
    setHeadersList(headersList);
  }, [orginHeaders]);

  const isSuccess = 200 <= status && status < 300;

  return (
    <div className="">
      <h3 className="text-xl font-bold">Response</h3>
      {isLoading ? (
        <div className="flex items-center h-[200px] justify-center text-xs font-semibold my-4">
          <div className="w-10 h-10 border-t-transparent border-solid rounded-full animate-spin border-blue-500 border-2"></div>
        </div>
      ) : (
        <div>
          {!!status && (
            <div className="flex items-center text-xs font-semibold my-4">
              <div
                className={cn('inline-flex flex-1 space-x-4', {
                  'text-green-500': isSuccess,
                  'text-red-500': !isSuccess,
                })}
              >
                <span>
                  <span className="text-gray-800">Status: </span> {status}&nbsp; • &nbsp;
                  {isSuccess ? 'OK' : 'Error'}
                </span>
                {isSuccess && (
                  <>
                    <span>
                      <span className="text-gray-800">Time: </span> {duration} ms
                    </span>
                    <span>
                      <span className="text-gray-800">Size: </span> {size}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
          <OverflowTabs value={activeTab} onValueChange={onTabChange}>
            <OverflowTabsList>
              <OverflowTabsTrigger value="tab1">Response Body</OverflowTabsTrigger>
              <OverflowTabsTrigger value="tab2">Response Header</OverflowTabsTrigger>
            </OverflowTabsList>
            <OverflowTabsContent value="tab1">
              <div className="flex items-center justify-center min-h-60 max-h-100 overflow-auto custom-scrollbar pr-2">
                {responseData ? (
                  <TabBody type={type} editable={false} codeValue={JSON.stringify(responseData, null, 2)} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <DataEmpty />
                  </div>
                )}
              </div>
            </OverflowTabsContent>
            <OverflowTabsContent value="tab2">
              <label className="inline-block text-sm font-medium text-gray-500 mb-2">
                Header List
              </label>
              <div className="h-[240px] overflow-auto custom-scrollbar pr-2">
                {headersList.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <DataEmpty />
                  </div>
                ) : (
                  headersList.map((item, index) => (
                    <TabParam key={index} param={item} index={index} />
                  ))
                )}
              </div>
            </OverflowTabsContent>
          </OverflowTabs>
        </div>
      )}
    </div>
  );
};
