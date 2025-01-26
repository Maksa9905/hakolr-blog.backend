import { model, models, Schema } from 'mongoose'
import { UserModel } from './types'

export const userSchema = new Schema({
  email: String,
  name: String,
  password: String,
})

export const userModel =
  models.userModel<UserModel> || model('userModel', userSchema)
