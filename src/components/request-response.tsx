import { RequestSelector } from '@/components/request-select';
import { Input as RequestInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RequestTabs } from '@/components/request-tabs';
import { ResponseTabs } from '@/components/response-tabs';
import { sendRequest } from '@/lib/request';
import { useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);

  const [responseData, setResponseData] = useState<any>(null);
  const [type, setType] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [duration, setDuration] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [orginHeaders, setOrginHeaders] = useState<any>(null);
  const send = async () => {
    const paramsOptions: any = {
      method: data.method,
      url: data.url,
      headers: data.headers
        .filter((header) => header.key !== '' || header.value !== '')
        .reduce((acc: Record<string, string>, header) => {
          acc[header.key] = header.value;
          return acc;
        }, {}),
    };

    setIsLoading(true);
    const response = await sendRequest(paramsOptions);
    const { data: responseData, status, type, duration, size, orginHeaders, error } = response;
    setIsLoading(false);
    if (error) {
      console.log(error);
      setResponseData(responseData);
      setStatus(status);
      return;
    }
    setResponseData(responseData);
    setType(type);
    setStatus(status);
    setDuration(duration);
    setSize(size);
    setOrginHeaders(orginHeaders);
  };
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row w-full px-4 pt-4">
        <RequestSelector value={data.method} onChange={(method) => onDataChange({ method })} />
        <RequestInput
          className="w-full ml-2 bg-[#f9fafb] rounded-l-none border-0"
          placeholder="Enter a URL or paste a cURL command"
          value={data.url}
          onChange={(e) => onDataChange({ url: e.target.value })}
        />
        <Button className="ml-4" onClick={() => send()}>
          Send
        </Button>
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
        isLoading={isLoading}
        type={type}
        status={status}
        duration={duration}
        size={size}
        responseData={responseData}
        orginHeaders={orginHeaders}
        activeTab={activeResponseTab}
        onTabChange={onResponseTabChange}
      />
    </div>
  );
};
