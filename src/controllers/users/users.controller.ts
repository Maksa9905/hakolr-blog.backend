import { GetSubscribersParams } from '#dtos/user/input.dto.js'
import UsersService from '#services/users'
import { requestWrapper } from '#shared/lib/requestWrapper.js'
import { Request, Response } from 'express'

class UserController {
  static get_user_info = requestWrapper(async (req: Request, res: Response) => {
    const token = req.headers.authorization

    res.send(await UsersService.get_user_info(token))
    return
  })

  static get_user = requestWrapper(
    async (req: Request<{ id: string }>, res: Response) => {
      const token = req.headers.authorization

      res.send(await UsersService.get_user(req.params.id, token))
      return
    },
  )

  static subscribe = requestWrapper(async (req, res) => {
    try {
      const token = req.headers.authorization
      res.send(await UsersService.subsribe(req.params.id, token))
      return
    } catch (error) {
      res.send(error.message)
    }
  })

  static unsubscribe = requestWrapper(async (req, res) => {
    const token = req.headers.authorization

    res.send(await UsersService.unsubscribe(req.params.id, token))
    return
  })

  static get_subscribers = requestWrapper(
    async (
      req: Request<{ id: string }, any, any, GetSubscribersParams>,
      res,
    ) => {
      const userId = req.params.id
      const token = req.headers.authorization
      const params = req.query

      try {
        res.send(await UsersService.get_subscribers(userId, params, token))
        return
      } catch (error) {
        res.status(400).send({ success: 'unknown error' })
      }
    },
  )
}

export default UserController
