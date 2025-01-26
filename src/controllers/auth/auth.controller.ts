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
      res.send({ success: 'Successfully logged in', token })
      return
    }

    res.status(401).send({ success: 'Login failed', token: null })
  }

  static register = ControllerUtils.create(
    AuthService.register,
    createUserDtoSchema,
  )
}

export default AuthController
