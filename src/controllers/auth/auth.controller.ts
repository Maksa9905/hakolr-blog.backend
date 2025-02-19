import { AuthOutputDto, UserAuthenticationInfo } from '#dtos/auth'
import { createUserDtoSchema } from '#dtos/user/input.dto.ts'
import AuthService from '#services/auth'
import { requestWrapper } from '#shared/lib/requestWrapper.js'
import { NextFunction, Request, Response } from 'express'

class AuthController {
  static login = requestWrapper(
    async (
      req: Request<any, any, UserAuthenticationInfo, any>,
      res: Response<any, AuthOutputDto>,
      next: NextFunction,
    ) => {
      const token = await AuthService.login(req.body)

      if (token) {
        res.cookie('Authorization', token)
        res.send({ success: 'Successfully logged in' })
        return
      }

      res.status(401).send({ success: 'Login failed' })
      return
    },
  )

  static verify_token = requestWrapper(async (req: Request, res: Response) => {
    const token = req.headers.authorization

    if (!token) {
      res.status(401).send({ success: 'Unauthorized' })
      return
    }

    const verified = await AuthService.validate_token(token)

    if (verified) {
      res.status(200).send({ success: 'Authorized' })
      return
    } else {
      res.status(401).send({ success: 'Unauthorized' })
      return
    }
  })

  static register = requestWrapper(async (req: Request, res: Response) => {
    const validation = createUserDtoSchema.safeParse(req.body)

    if (validation.error) {
      res.status(400).send(JSON.parse(validation.error.message))
      return
    }

    const response = await AuthService.register(req.body)
    res.send(response)
    return
  })
}

export default AuthController
