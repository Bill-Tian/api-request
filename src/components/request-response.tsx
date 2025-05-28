import { RequestSelector } from '@/components/request-select';
import { Input as RequestInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RequestTabs } from '@/components/request-tabs';
import { ResponseTabs } from '@/components/response-tabs';
import { sendRequest } from '@/lib/request';
import { useState } from 'react';

interface RequestData {
  method: string;
  url: string;
  params: Array<{ key: string; value: string }>;
  headers: Array<{ key: string; value: string }>;
  body: string;
}

interface ResponseState {
  data: any;
  type: string;
  status: number;
  duration: number;
  size: number;
  orginHeaders: string;
  error: string | null;
}

interface RequestResponseProps {
  data: RequestData;
  onDataChange: (newData: Partial<RequestData>) => void;
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
  const [response, setResponse] = useState<ResponseState>({
    data: null,
    type: '',
    status: 0,
    duration: 0,
    size: 0,
    orginHeaders: '',
    error: null,
  });

  const send = async () => {
    try {
      const paramsOptions = {
        method: data.method,
        url: data.url,
        headers: data.headers
          .filter((header) => header.key && header.value)
          .reduce((acc: Record<string, string>, header) => {
            acc[header.key] = header.value;
            return acc;
          }, {}),
      };

      setIsLoading(true);
      const result = await sendRequest(paramsOptions);

      setResponse({
        data: result.data,
        type: result.type || '',
        status: Number(result.status) || 0,
        duration: Number(result.duration) || 0,
        size: Number(result.size) || 0,
        orginHeaders: result.orginHeaders ? JSON.parse(result.orginHeaders) : {},
        error: result.error || null,
      });
    } catch (error) {
      setResponse(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row w-full px-4 pt-4">
        <RequestSelector value={data.method} onChange={(method) => onDataChange({ method })} />
        <RequestInput
          className="w-full ml-2"
          placeholder="Enter a URL or paste a cURL command"
          value={data.url}
          onChange={(e) => onDataChange({ url: e.target.value })}
        />
        <Button className="ml-4" onClick={send}>
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
        type={response.type}
        status={response.status}
        duration={response.duration}
        size={response.size}
        responseData={response.data}
        orginHeaders={response.orginHeaders}
        activeTab={activeResponseTab}
        onTabChange={onResponseTabChange}
      />
    </div>
  );
};
