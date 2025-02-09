import { Schema, model, models } from 'mongoose'
import { PostLabelModel } from './types'

export const postLabelSchema = new Schema({
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
})

export const postLabelModel =
  models.postLabelModel<PostLabelModel> ||
  model<PostLabelModel>('PostLabelModel', postLabelSchema)
