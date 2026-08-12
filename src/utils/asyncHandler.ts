import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Params } from '../types/common.types';

type AsyncHandler<P, ResBody, ReqBody, ReqQuery> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>;

export const asyncHandler = <P = Params, ResBody = any, ReqBody = any, ReqQuery = any>(
  fn: AsyncHandler<P, ResBody, ReqBody, ReqQuery>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
