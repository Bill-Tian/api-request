import { RequestSelector } from '@/components/request-select';
import { Input as RequestInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RequestTabs } from '@/components/request-tabs';
import { ResponseTabs } from '@/components/response-tabs';

interface RequestResponseProps {
  data: {
    method: string;
    url: string;
    params: Array<{ key: string; value: string }>;
    headers: Array<{ key: string; value: string }>;
    body: string;
  };
  onDataChange: (newData: Partial<RequestResponseProps['data']>) => void;
  activeRequestTab: string;
  activeResponseTab: string;
  onRequestTabChange: (value: string) => void;
  onResponseTabChange: (value: string) => void;
}

export const RequestResponse = ({ 
  data, 
  onDataChange,
  activeRequestTab,
  activeResponseTab,
  onRequestTabChange,
  onResponseTabChange,
}: RequestResponseProps) => {
  return (
    <div className='w-full flex flex-col gap-5'>
      <div className="flex flex-row w-full px-4 pt-4">
        <RequestSelector 
          value={data.method}
          onChange={(method) => onDataChange({ method })}
        />
        <RequestInput 
          className="w-full ml-2 bg-[#f9fafb] rounded-l-none border-0" 
          placeholder="Enter a URL or paste a cURL command"
          value={data.url}
          onChange={(e) => onDataChange({ url: e.target.value })}
        />
        <Button className="ml-4">Send</Button>
      </div>
      <RequestTabs 
        params={data.params}
        headers={data.headers}
        body={data.body}
        onParamsChange={(params) => onDataChange({ params })}
        onHeadersChange={(headers) => onDataChange({ headers })}
        onBodyChange={(body) => onDataChange({ body })}
        activeTab={activeRequestTab}
        onTabChange={onRequestTabChange}
      />
      <ResponseTabs 
        activeTab={activeResponseTab}
        onTabChange={onResponseTabChange}
      />
    </div>
  );
};
