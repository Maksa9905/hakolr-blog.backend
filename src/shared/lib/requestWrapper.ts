import { NextFunction, Request, Response } from 'express'

export const requestWrapper = <
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = Record<string, any>,
>(
  request: (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction,
  ) => Promise<void>,
) => {
  return async (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction,
  ) => {
    try {
      await request(req, res, next)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
