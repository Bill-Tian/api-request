import * as React from 'react';

import { cn } from '@/lib/utils';

import * as Tabs from "@radix-ui/react-tabs";

export const RequestInput = ({ className, type, ...props }: any) => {
    return (
        <Tabs.Root
		className="flex w-[300px] flex-col shadow-[0_2px_10px] shadow-blackA2"
		defaultValue="tab1"
	>
		<Tabs.List
			className="flex shrink-0 border-b border-mauve6"
			aria-label="Manage your account"
		>
			<Tabs.Trigger
				className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none text-mauve11 outline-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black"
				value="tab1"
			>
				Account
			</Tabs.Trigger>
			<Tabs.Trigger
				className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none text-mauve11 outline-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black"
				value="tab2"
			>
				Password
			</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content
			className="grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
			value="tab1"
		>

		</Tabs.Content>
		<Tabs.Content
			className="grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
			value="tab2"
		>

		</Tabs.Content>
	</Tabs.Root>
    );
  }
