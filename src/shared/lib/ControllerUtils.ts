import { Request, Response } from 'express'
import { ZodSchema } from 'zod'
import { idSchema, ListResponseFormat, MongoDocument } from '../types'

export class ControllerUtils {
  static create = <CreateDto, ResponseDto, TSchema>(
    serviceMethod: (data: CreateDto) => Promise<MongoDocument<ResponseDto>>,
    resolver?: ZodSchema<TSchema>,
  ) => {
    return async <
      Params,
      ResBody = any,
      ReqBody = any,
      RequestQuery = qs.ParsedQs,
      Locals extends Record<string, any> = Record<string, any>,
    >(
      req: Request<Params, ResponseDto, CreateDto, RequestQuery, Locals>,
      res: Response<MongoDocument<ResponseDto> | string, Locals>,
    ) => {
      if (!resolver) {
        const response = await serviceMethod(req.body)
        res.send(response)
        return
      }

      const validation = resolver.safeParse(req.body)

      if (validation.error) {
        res.status(400).send(JSON.parse(validation.error.message))
        return
      }

      const response = await serviceMethod(req.body)
      res.send(response)
    }
  }

  static get = <TQuery, ResponseDto, TSchema>(
    serviceMethod: (
      query: TQuery,
    ) => Promise<ListResponseFormat<MongoDocument<ResponseDto>>>,
    resolver?: ZodSchema<TSchema>,
  ) => {
    return async (
      req: Request<any, any, any, TQuery, any>,
      res: Response<
        ListResponseFormat<MongoDocument<ResponseDto>> | string,
        any
      >,
    ) => {
      if (!resolver) {
        const response = await serviceMethod(req.query)
        res.send(response)
        return
      }

      const validation = resolver.safeParse(req.query)

      if (validation.error) {
        res.status(400).send(JSON.parse(validation.error.message))
        return
      }

      const response = await serviceMethod(req.query)
      res.send(response)
    }
  }

  static getById = <ResponseDto>(
    serviceMethod: (id: string) => Promise<MongoDocument<ResponseDto> | null>,
  ) => {
    return async (
      req: Request<{ id: string }>,
      res: Response<MongoDocument<ResponseDto> | string, any>,
    ) => {
      const validation = idSchema.safeParse(req.params.id)

      if (validation.error) {
        res.status(400).send(JSON.parse(validation.error.message))
        return
      }

      const response = await serviceMethod(req.params.id)

      if (!response) {
        res.status(404).send('not found')
        return
      }

      res.send(response)
    }
  }

  static delete = <ResponseDto>(
    serviceMethod: (id: string) => Promise<MongoDocument<ResponseDto> | null>,
  ) => {
    return async (
      req: Request<{ id: string }>,
      res: Response<MongoDocument<ResponseDto> | string, any>,
    ) => {
      const validation = idSchema.safeParse(req.params.id)

      if (validation.error) {
        res.status(400).send(JSON.parse(validation.error.message))
        return
      }

      const response = await serviceMethod(req.params.id)

      if (!response) {
        res.status(404).send('not found')
        return
      }

      res.send(response)
    }
  }
}
