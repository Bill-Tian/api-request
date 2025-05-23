'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import * as Tabs from '@radix-ui/react-tabs';
import { ParamType, TabParam } from './tab-param';
import { TabBody } from './tab-body';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export const ResponseTabs = ({ className, type, ...props }: any) => {
  const [headersList, setHeadersList] = React.useState<ParamType[]>([{ key: '232', value: '323' }]);

  return (
    <>
      <h2 className="text-2xl font-bold">Response</h2>
      <Tabs.Root className="flex w-[800px] flex-col" defaultValue="tab1">
        <Tabs.List
          className="flex shrink-0 border-b border-zinc-600"
          aria-label="Manage your account"
        >
          <Tabs.Trigger
            className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none text-zinc-800 outline-none first:rounded-tl-md last:rounded-tr-md hover:text-violet-900 data-[state=active]:text-violet-900 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current "
            value="tab1"
          >
            响应体
          </Tabs.Trigger>
          <Tabs.Trigger
            className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none text-zinc-800 outline-none first:rounded-tl-md last:rounded-tr-md hover:text-violet-900 data-[state=active]:text-violet-900 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current "
            value="tab2"
          >
            响应头
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="grow rounded-b-md bg-white py-5 outline-none"
          value="tab1"
        >
          <TabBody editable={false} />
        </Tabs.Content>
        <Tabs.Content
          className="grow rounded-b-md bg-white py-5 outline-none"
          value="tab2"
        >
          <div className="space-y-2 px-4">
            {headersList.map((item, index) => (
              <TabParam key={index} param={item} index={index} />
            ))}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};
