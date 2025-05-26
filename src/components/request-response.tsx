import { RequestSelector } from '@/components/request-select';
import { Input as RequestInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RequestTabs } from '@/components/request-tabs';
import { ResponseTabs } from '@/components/response-tabs';

export const RequestResponse = () => {
  return (
    <div className='w-full flex flex-col gap-5'>
      <div className="flex flex-row w-full px-4 pt-4">
        <RequestSelector />
        <RequestInput className="w-full ml-2 bg-[#f9fafb] rounded-l-none border-0" placeholder="Enter a URL or paste a cURL command" />
        <Button className="ml-4">Send</Button>
      </div>
      <RequestTabs />
      <ResponseTabs />
    </div>
  );
};
