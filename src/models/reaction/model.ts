import { ReactionModel, ReactionType } from './types'
import { Schema, model, models } from 'mongoose'

export const reactionSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(ReactionType),
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
})

export const reactionModel =
  models.Reaction<ReactionModel> ||
  model<ReactionModel>('Reaction', reactionSchema)
