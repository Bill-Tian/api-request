import { ResponseTabGroup } from '@/components/response-tab-group';
import { bytesToSize, cn, msToSecondsOrMinutes } from '@/lib/utils';
import { ResponseState } from '@/components/count-tabs';

interface ResponseProps {
  loading: boolean;
  response: ResponseState | null;
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
            <span className="text-gray-800">Status: </span> {status}&nbsp; • &nbsp;
            {status >= 200 && status < 300 ? 'OK' : 'Error'}
          </span>
          {status >= 200 && status < 300 && (
            <>
              <span>
                <span className="text-gray-800">Time: </span> {time}
              </span>
              <span>
                <span className="text-gray-800">Size: </span> {size}
              </span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-xl font-bold">Response</h3>
      {response ? <RenderedResponseMeta /> : null}
      <ResponseTabGroup
        loading={loading}
        response={response}
        activeTab={activeResponseTab}
        onTabChange={onResponseTabChange}
      />
    </div>
  );
};
