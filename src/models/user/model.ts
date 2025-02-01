import { model, models, Schema } from 'mongoose'
import { UserModel } from './types'

export const userSchema = new Schema({
  email: String,
  name: String,
  password: String,
})

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'authorId',
})

export const userModel =
  models.userModel<UserModel> || model('User', userSchema)
