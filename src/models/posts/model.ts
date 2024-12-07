import { model, models, Schema } from 'mongoose'
import { PostModel } from './types'

export const postSchema = new Schema({
  title: String,
  description: String,
  content: String,
  date: String,
  views: Number,
  likes: Number,
  dislikes: Number,
  authorId: String,
  authorName: String,
})

export const postModel =
  models.postModel<PostModel> || model<PostModel>('Post', postSchema)
