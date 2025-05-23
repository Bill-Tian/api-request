import { RequestSelector } from '@/components/request-select';
import { Input as RequestInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RequestTabs } from '@/components/request-tabs';
import { ResponseTabs } from '@/components/response-tabs';

export const RequestResponse = () => {
  return (
    <div className='w-full flex flex-col gap-[32px]'>
      <div className="flex flex-row w-full">
        <RequestSelector />
        <RequestInput className="w-full bg-[#f9fafb] rounded-l-none" />
        <Button className="ml-4">Send</Button>
      </div>
      <RequestTabs />
      <ResponseTabs />
    </div>
  );
};
