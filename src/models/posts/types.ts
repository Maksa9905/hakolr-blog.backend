import { ReactionModel } from '#models/reaction/types.js'
import { UserModel } from '../user'

export interface PostModel {
  _id: string
  title: string
  description: string
  date: string
  views: number
  reactions: ReactionModel[]
  authorId: string
  content: string
}

export interface PopulatedPostModel extends Omit<PostModel, 'authorId'> {
  authorId: UserModel
}
