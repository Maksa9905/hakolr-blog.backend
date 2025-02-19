import { EditReactionServiceDto } from '#dtos/reaction/input.dto.js'
import { reactionModel } from '#models/reaction/model.js'
import { ReactionModel, ReactionType } from '#models/reaction/types.js'
import { MongoDocument } from '#shared/types/types.js'

class ReactionsService {
  static post_user_reaction = async (
    userId: string,
    postId: string,
    type: keyof typeof ReactionType | null,
  ) => {
    if (type) {
      const reaction = await reactionModel.findOneAndUpdate(
        { userId, postId },
        { type },
      )

      if (reaction) return reaction

      const newReaction = await reactionModel.create({ userId, postId, type })
      return newReaction
    }

    const reaction = await reactionModel.findOneAndDelete({
      userId,
      postId,
    })
    return reaction
  }

  static edit_reaction = async (id: string, dto: EditReactionServiceDto) => {
    const reaction = (await reactionModel.findById(
      id,
    )) as MongoDocument<ReactionModel> | null

    if (reaction?.userId.toString() === dto.userId)
      await reactionModel.findByIdAndUpdate(id, dto)
    else throw new Error('You cannot edit this reaction')
  }
}

export default ReactionsService
