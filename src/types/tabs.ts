export interface RequestData {
  method: string;
  url: string;
  params: Array<{ key: string; value: string }>;
  headers: Array<{ key: string; value: string }>;
  bodyType: 'none' | 'json' | 'form-data';
  body: string | Array<{ key: string; value: string; contentType?: string; file?: File | null }>;
}

export interface ResponseData {
  data: any;
  type: string;
  status: number;
  duration: number;
  size: number;
  orginHeaders: string;
  error: string | null;
}

export interface TabData {
  id: string;
  title: string;
  activeRequestTab: string;
  activeResponseTab: string;
  requestData: RequestData;
  responseData: ResponseData;
}
