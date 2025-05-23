import { RequestSelector } from '@/components/request-select';
import { Input as RequestInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RequestTabs } from '@/components/request-tabs';
import { ResponseTabs } from '@/components/response-tabs';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-row w-full">
          <RequestSelector />
          <RequestInput className="w-full bg-[#f9fafb]" />
          <Button className="ml-4">Send</Button>
        </div>

        <RequestTabs />

        <ResponseTabs />
      </main>
    </div>
  );
}
