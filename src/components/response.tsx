import { ResponseTabGroup } from '@/components/response-tab-group';
import { bytesToSize, cn, msToSecondsOrMinutes } from '@/lib/utils';
import { ResponseData } from '@/types/tabs';

interface ResponseProps {
  loading: boolean;
  response: ResponseData | null;
  activeResponseTab: string;
  onResponseTabChange: (value: string) => void;
}

export const Response = ({
  loading,
  response,
  activeResponseTab,
  onResponseTabChange,
}: ResponseProps) => {
  let time = '0 ms';
  let status = 0;
  let size = '0 B';

  const hasResponse = !(response == null);
  if (hasResponse) {
    status = response.status;
    size = response.size ? bytesToSize(response?.size) : '0 B';
    time = msToSecondsOrMinutes(response?.duration);
  }

  const RenderedResponseMeta = () => {
    return (
      <div className="flex items-center text-xs font-semibold my-4">
        <div
          className={cn('inline-flex flex-1 space-x-4', {
            'text-green-500': status >= 200 && status < 300,
            'text-red-500': status < 200 || status >= 300,
          })}
        >
          <span>
            <span className="text-primary">Status: </span> {status}&nbsp; • &nbsp;
            {status >= 200 && status < 300 ? 'OK' : 'Error'}
          </span>
          <>
            <span>
              <span className="text-primary">Time: </span> {time}
            </span>
            <span>
              <span className="text-primary">Size: </span> {size}
            </span>
          </>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-xl font-bold">Response</h3>
      {response?.status ? <RenderedResponseMeta /> : null}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}
        <ResponseTabGroup
          loading={loading}
          response={response}
          activeTab={activeResponseTab}
          onTabChange={onResponseTabChange}
        />
      </div>
    </div>
  );
};
