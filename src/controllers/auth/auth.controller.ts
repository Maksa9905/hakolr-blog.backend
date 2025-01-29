import { AuthOutputDto, UserAuthenticationInfo } from '#dtos/auth'
import { createUserDtoSchema } from '#dtos/user/input.dto.ts'
import AuthService from '#services/auth'
import { ControllerUtils } from '#shared/lib'
import { Request, Response } from 'express'

class AuthController {
  static login = async (
    req: Request<any, any, UserAuthenticationInfo, any>,
    res: Response<any, AuthOutputDto>,
  ) => {
    const token = await AuthService.login(req.body)

    if (token) {
      res.cookie('Authorization', token)
      res.send({ success: 'Successfully logged in' })
      return
    }

    res.status(401).send({ success: 'Login failed' })
  }

  static verify_token = async (req: Request, res: Response) => {
    const token = req.cookies['Authorization']

    const verified = await AuthService.validate_token(token)

    if (verified) {
      res.status(200).send({ success: 'Authorized' })
    } else {
      res.status(401).send({ success: 'Unauthorized' })
    }
  }

  static register = ControllerUtils.create(
    AuthService.register,
    createUserDtoSchema,
  )
}

export default AuthController
