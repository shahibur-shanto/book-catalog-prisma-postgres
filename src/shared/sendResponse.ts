import { Response } from 'express';

type IApiReponse<T> = {
  statusCode?: number;
  success?: boolean;
  message?: string | null;
  token?:string|null;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage?: number;
  } | null;
  data?: T | null;
};

const sendResponse = <T>(
  res: Response,
  data: Partial<IApiReponse<T>>
): void => {
  const responseData: IApiReponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    token:data.token,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
  };

  res.status(data.statusCode || 200).json(responseData);
};

export default sendResponse;
