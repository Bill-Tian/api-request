import { isJson } from './utils';

interface RequestOptions {
  url: string;
  method: string;
  body?: any;
  headers?: Record<string, string>;
}

export const sendRequest = async (options: RequestOptions) => {
  const response = await fetch('/api/fetch', {
    method: 'POST',
    body: JSON.stringify(options),
    headers: { 'content-Type': 'application/json' },
    next: {
      revalidate: 0,
    },
  });
  const contentType = response.headers.get('content-type') || '';
  if (!response.ok) {
    return { data: null, status: response.status, error: 'Failed to fetch' };
  }
  const data = isJson(contentType) ? await response.json() : await response.text();
  return {
    data,
    status: response.status,
    type: contentType,
    duration: response.headers.get('x-response-time'),
    size: response.headers.get('x-response-size'),
    orginHeaders: response.headers.get('x-response-headers'),
    error: null,
  };
};
