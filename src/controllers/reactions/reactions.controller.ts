import { EditReactionDto, createReactionZodSchema } from '#dtos/reaction'
import { ReactionType } from '#models/reaction'
import ReactionsService from '#services/reactions'
import { ControllerUtils } from '#shared/lib/ControllerUtils.js'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

class ReactionsController {
  static get_reactions = ControllerUtils.get(ReactionsService.get_reactions)

  static add_user_reaction = async (
    req: Request<any, any, EditReactionDto>,
    res: Response,
  ) => {
    const body = req.body

    const token = req.headers.authorization
    const { _id: userId } = jwt.decode(token)

    if (body._id) {
      if (body.type) {
        try {
          await ReactionsService.edit_reaction(body._id, { ...body, userId })
          res.send({ success: 'Reaction edited' })
          return
        } catch (error) {
          res.status(400).send({ success: 'Reaction not edited' })
          return
        }
      } else {
        try {
          await ReactionsService.delete_reaction(body._id, userId)
          res.send({ success: 'Reaction deleted' })
          return
        } catch (error) {
          res.status(400).send({ success: 'Reaction not deleted' })
          return
        }
      }
    }

    try {
      await ReactionsService.create_reaction({ ...body, userId })
      res.send({ success: 'Reaction created' })
      return
    } catch (error) {
      res.status(400).send({ success: 'Reaction not created' })
      return
    }
  }
}

export default ReactionsController
