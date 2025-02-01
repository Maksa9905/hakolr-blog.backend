import { CreateReactionDto } from '#dtos/reaction/input.dto.js'
import { reactionModel } from '#models/reaction/model.js'
import { ReactionModel } from '#models/reaction/types.js'
import { withPagination } from '#shared/lib/withPagination.js'
import { MongoDocument } from '#shared/types/types.js'

class ReactionsService {
  static get_reactions = async () => {
    const reactions =
      (await reactionModel.find()) as MongoDocument<ReactionModel>[]
    return withPagination(reactions)
  }

  static create_reaction = async (dto: CreateReactionDto) => {
    const reaction = await reactionModel.create(dto)
    reaction.save()

    return reaction
  }

  static delete_reaction = async (id: string) => {
    const reaction = await reactionModel.findByIdAndDelete(id)
    return reaction
  }

  static edit_reaction = async (id: string, dto: CreateReactionDto) => {
    const reaction = await reactionModel.findByIdAndUpdate(id, dto)
    return reaction
  }
}

export default ReactionsService
