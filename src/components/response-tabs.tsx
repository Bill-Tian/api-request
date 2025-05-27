'use client';

import * as React from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import { ParamType, TabParam } from './tab-param';
import { TabBody } from './tab-body';
import { TabsTrigger } from './ui/tabs';
import { cn } from '@/lib/utils';
import { DataEmpty } from './data-empty';

interface ResponseTabsProps {
  isLoading: boolean;
  type: string;
  status: number;
  duration: number;
  size: number;
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
    <div>
      <h3 className="text-xl font-bold">Response</h3>
      {isLoading ? (
        <div className="flex items-center h-[200px] justify-center text-xs font-semibold my-4">
          <div className="w-10 h-10 border-t-transparent border-solid rounded-full animate-spin border-blue-500 border-2"></div>
        </div>
      ) : (
        <div>
          {status && (
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
          <Tabs.Root value={activeTab} onValueChange={onTabChange}>
            <Tabs.List
              className="flex shrink-0 border-b border-zinc-200"
              aria-label="Manage your account"
            >
              <TabsTrigger value="tab1">Response Body</TabsTrigger>
              <TabsTrigger value="tab2">Response Header</TabsTrigger>
            </Tabs.List>
            <Tabs.Content className="grow rounded-b-md bg-white py-5 outline-none" value="tab1">
              <div className="h-[240px] overflow-auto custom-scrollbar pr-2">
                {responseData ? (
                  <TabBody editable={false} codeValue={JSON.stringify(responseData, null, 2)} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <DataEmpty />
                  </div>
                )}
              </div>
            </Tabs.Content>
            <Tabs.Content className="grow rounded-b-md bg-white py-2 outline-none" value="tab2">
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
            </Tabs.Content>
          </Tabs.Root>
        </div>
      )}
    </div>
  );
};
