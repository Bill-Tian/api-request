import { RequestTabs } from '@/components/request-tab-group';
import { sendRequest } from '@/lib/request';
import { toast } from 'sonner';
import { UrlEditor } from '@/components/url-editor';
import { RequestData, ResponseState } from '@/components/count-tabs';

interface RequestResponseProps {
  data: RequestData;
  onDataChange: (newData: Partial<RequestData>) => void;
  activeRequestTab: string;
  activeResponseTab: string;
  onRequestTabChange: (value: string) => void;
  onResponseTabChange: (value: string) => void;
  setLoading: (value: boolean) => void;
  setResponse: (value: ResponseState) => void;
}

export const Request = ({
  data,
  onDataChange,
  activeRequestTab,
  onRequestTabChange,
  setLoading,
  setResponse,
}: RequestResponseProps) => {
  const send = async () => {
    if (!data.url) {
      toast.error('Please enter a URL');
      return;
    }
    try {
      const headersList = data.headers.filter((header) => header.key && header.value);
      const headers = headersList.reduce((acc: Record<string, string>, header) => {
        acc[header.key] = header.value;
        return acc;
      }, {});

      const paramsOptions = {
        method: data.method,
        url: data.url,
        headers,
      };

      setLoading(true);
      const result = await sendRequest(paramsOptions);
      setResponse({
        data: result.data,
        type: result.type || '',
        status: Number(result.status) || 0,
        duration: Number(result.duration) || 0,
        size: result.size || 0,
        orginHeaders: result.orginHeaders ? JSON.parse(result.orginHeaders) : {},
        error: result.error || null,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        <UrlEditor data={data} onDataChange={onDataChange} onSend={send} />
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
      </div>
    </div>
  );
};
