import { createReactionZodSchema } from '#dtos/reaction/input.dto.js'
import ReactionsService from '#services/reactions/reactions.service.js'
import { ControllerUtils } from '#shared/lib/ControllerUtils.js'

class ReactionsController {
  static create_reaction = ControllerUtils.create(
    ReactionsService.create_reaction,
    createReactionZodSchema,
  )
  static delete_reaction = ControllerUtils.delete(
    ReactionsService.delete_reaction,
  )
  static edit_reaction = ControllerUtils.update(ReactionsService.edit_reaction)

  static get_reactions = ControllerUtils.get(ReactionsService.get_reactions)
}

export default ReactionsController
