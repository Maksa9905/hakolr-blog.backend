import {
  CreateReactionServiceDto,
  EditReactionServiceDto,
} from '#dtos/reaction/input.dto.js'
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

  static create_reaction = async (dto: CreateReactionServiceDto) => {
    const reaction = await reactionModel.create(dto)
    reaction.save()

    return reaction
  }

  static delete_reaction = async (id: string, userId: string) => {
    const reaction = (await reactionModel.findById(
      id,
    )) as MongoDocument<ReactionModel> | null

    if (reaction?.userId.toString() === userId) {
      await reactionModel.findByIdAndDelete(id)
    } else throw new Error('You cannot delete this reaction')
  }

  static edit_reaction = async (id: string, dto: EditReactionServiceDto) => {
    const reaction = (await reactionModel.findById(
      id,
    )) as MongoDocument<ReactionModel> | null

    if (reaction?.userId.toString() === dto.userId)
      reactionModel.findByIdAndUpdate(id, dto)
    else throw new Error('You cannot edit this reaction')
  }
}

export default ReactionsService
