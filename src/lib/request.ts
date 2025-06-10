import { isJson } from './utils';

interface RequestOptions {
  url: string;
  method: string;
  bodyType: 'none' | 'json' | 'form-data';
  body?: string | Array<{ key: string; value: string; contentType?: string; file?: File | null }>;
  headers?: Record<string, string>;
}

export const sendRequest = async (options: RequestOptions) => {
  const formData = new FormData();
  formData.append('url', options.url);
  formData.append('method', options.method);
  formData.append('bodyType', options.bodyType);

  if (options.body) {
    if (options.bodyType === 'form-data' && Array.isArray(options.body)) {
      const requestFormData = new FormData();
      options.body.forEach((item) => {
        if (item.file) {
          requestFormData.append(item.key, item.file);
        } else {
          requestFormData.append(item.key, item.value);
        }
      });
      formData.append('body', JSON.stringify(Array.from(requestFormData.entries())));
    } else {
      formData.append('body', options.body as string);
    }
  }

  if (options.headers) {
    formData.append('headers', JSON.stringify(options.headers));
  }

  const response = await fetch('/api/fetch', {
    method: 'POST',
    body: formData,
    next: {
      revalidate: 0,
    },
  });

  const contentType = response.headers.get('content-type') || '';
  // if (!response.ok) {
  //   return { data: null, status: response.status, error: 'Failed to fetch' };
  // }
  const data = isJson(contentType) ? await response.json() : await response.text();
  return {
    data,
    status: response.status,
    type: contentType,
    duration: Number(response.headers.get('x-response-time')),
    size: Number(response.headers.get('x-response-size')),
    orginHeaders: response.headers.get('x-response-headers'),
    error: null,
  };
};
