import { PostModel } from '../posts'

export interface UserModel {
  _id: string
  email: string
  name: string
  status: string
  avatarUrl: string
  password: string
  posts: PostModel[]
  followerIds: string[]
  followingIds: string[]
}

export interface PopulatedUserModel
  extends Omit<UserModel, 'followerIds' | 'followingIds'> {
  followerIds: UserModel[]
  followingIds: UserModel[]
}
