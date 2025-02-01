import { PostModel } from '../posts'

export interface UserModel {
  _id: string
  email: string
  name: string
  password: string
  posts: PostModel[]
}
