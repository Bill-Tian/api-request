'use client';

import * as React from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import { ParamType, TabParam } from './tab-param';
import { TabBody } from './tab-body';
import { TabsTrigger } from './ui/tabs';
import { cn } from '@/lib/utils';

export const ResponseTabs = () => {
  const [headersList] = React.useState<ParamType[]>([]);

  const isSuccess = true;

  return (
    <div>
      <h3 className="text-xl font-bold">Response</h3>
      <div className="flex items-center text-sm font-semibold my-4">
        <div
          className={cn('inline-flex flex-1 space-x-4', {
            'text-green-500': isSuccess,
            'text-red-500': !isSuccess,
          })}
        >
          <span>
            <span className="text-gray-800">Status: </span> 200&nbsp; • &nbsp;OK
          </span>
          <span>
            <span className="text-gray-800">Time: </span> 1901 ms
          </span>
          <span>
            <span className="text-gray-800">Size: </span> 62 B
          </span>
        </div>
      </div>
      <Tabs.Root className="flex w-[800px] flex-col" defaultValue="tab1">
        <Tabs.List
          className="flex shrink-0 border-b border-zinc-200"
          aria-label="Manage your account"
        >
          <TabsTrigger value="tab1">Response Body</TabsTrigger>
          <TabsTrigger value="tab2">Response Header</TabsTrigger>
        </Tabs.List>
        <Tabs.Content className="grow rounded-b-md bg-white py-5 outline-none" value="tab1">
          <TabBody editable={false} codeValue={''} />
        </Tabs.Content>
        <Tabs.Content className="grow rounded-b-md bg-white py-2 outline-none" value="tab2">
          <label className="inline-block text-sm font-medium text-gray-500 mb-2">
            {' '}
            Header List{' '}
          </label>
          <div className="space-y-2">
            {headersList.map((item, index) => (
              <TabParam key={index} param={item} index={index} />
            ))}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
