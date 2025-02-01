import UsersService from '#services/users'
import { Request, Response } from 'express'

class UserController {
  static get_user = async (req: Request, res: Response) => {
    const token = req.headers.authorization

    res.send(await UsersService.get_user(token))
    return
  }
}

export default UserController
