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
      const formDataBody = new FormData();
      
      // 处理非文件数据
      const nonFileItems = JSON.parse(body);
      nonFileItems.forEach((item: { key: string; value: string; contentType?: string }) => {
        formDataBody.append(
          item.key,
          new Blob([item.value], { type: item.contentType || '' }),
        );
      });

      // 处理文件数据
      const fileCount = parseInt(formData.get('fileCount') as string || '0');
      for (let i = 0; i < fileCount; i++) {
        const file = formData.get(`file_${i}`) as File;
        const key = formData.get(`file_key_${i}`) as string;
        if (file && key) {
          formDataBody.append(key, file);
        }
      }

      requestBody = formDataBody;
      // 删除手动设置的 Content-Type，让浏览器自动处理
      delete headers['Content-Type'];
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
