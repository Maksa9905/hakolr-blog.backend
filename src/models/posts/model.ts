import { model, models, Schema } from 'mongoose'
import { PostModel } from './types'

export const postSchema = new Schema({
  title: {
    type: String,
    min: 1,
    max: 48,
  },
  description: {
    type: String,
    min: 1,
    max: 240,
  },
  content: {
    type: String,
    min: 1,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  date: String,
  views: Number,
})

postSchema.virtual('reactions', {
  ref: 'Reaction',
  localField: '_id',
  foreignField: 'postId',
})

export const postModel =
  models.Post<PostModel> || model<PostModel>('Post', postSchema)
