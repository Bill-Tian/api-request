import { isJson } from '@/lib/utils';

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const startTime = new Date();

    const url = formData.get('url') as string;
    const method = formData.get('method') as string;
    const bodyType = formData.get('bodyType') as string;
    const body = formData.get('body') as string;
    const headers = JSON.parse(formData.get('headers') as string || '{}');

    let requestBody: string | FormData | undefined = undefined;
    if (bodyType === 'form-data') {
      const formDataEntries = JSON.parse(body);
      const formDataBody = new FormData();
      formDataEntries.forEach(([key, value]: [string, any]) => {
        formDataBody.append(key, value);
      });
      requestBody = formDataBody;
    } else if (bodyType === 'json') {
      requestBody = body;
    }

    const response = await fetch(url, {
      method,
      body: requestBody,
      headers,
      cache: 'no-store',
    });

    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();

    // if (!response.ok) {
    //   return new Response(JSON.stringify({ error: 'Failed to fetch' }), {
    //     status: response.status,
    //   });
    // }

    const contentType = response.headers.get('content-type') || '';
    const contentLength = response.headers.get('content-length');

    // 获取所有响应头信息
    const headersObj: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headersObj[key] = value;
    });

    // 获取响应数据
    const data = isJson(contentType) ? await response.json() : await response.text();
    const responseData = isJson(contentType) ? JSON.stringify(data) : data;

    // 计算响应大小
    const size = contentLength
      ? parseInt(contentLength, 10)
      : new TextEncoder().encode(responseData).length;

    return new Response(responseData, {
      status: response.status,
      headers: {
        'content-type': contentType,
        'x-response-time': `${duration}`,
        'x-response-size': `${size}`,
        'x-response-headers': JSON.stringify(headersObj),
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};
