import { EditReactionDto, createReactionZodSchema } from '#dtos/reaction'
import { TokenData } from '#models/auth/types.js'
import ReactionsService from '#services/reactions'
import { requestWrapper } from '#shared/lib/requestWrapper.js'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

class ReactionsController {
  static post_user_reaction = requestWrapper(
    async (req: Request<any, any, EditReactionDto>, res: Response) => {
      const body = req.body

      const token = req.headers.authorization
      const tokenData: TokenData = jwt.decode(token)

      const reaction = await ReactionsService.post_user_reaction(
        tokenData._id,
        body.postId,
        body.type,
      )

      res.status(200).send(reaction)
      return
    },
  )
}

export default ReactionsController
