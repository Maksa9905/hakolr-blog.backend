import { PopulatedUserModel, UserModel, userModel } from '#models/user'
import jwt from 'jsonwebtoken'
import { mapUserById, mapUserInfo } from './mappers'
import { DetailedUserDto, GetSubscribersParams } from '#dtos/user'
import { MongoDocument } from '#shared/types/types.js'
import { withPagination } from '#shared/lib/withPagination.js'
import { mapPosts } from '#services/posts/mappers.js'
import { postModel } from '#models/posts/index.js'

export class UsersService {
  static get_user_info = async (token?: string) => {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)

    if (!verified) return null

    const { _id } = jwt.decode(token)

    const user = (await userModel
      .findOne({ _id })
      .lean()
      .populate('posts')
      .populate('followerIds')
      .populate('followingIds')) as MongoDocument<UserModel>

    return user ? mapUserInfo(user, _id) : null
  }

  static get_user = async (id: string, token?: string) => {
    const userId = jwt.decode(token)._id

    const user = (await userModel
      .findById(id)
      .lean()
      .populate('posts')
      .populate('followerIds')
      .populate('followingIds')) as MongoDocument<PopulatedUserModel> | null

    return user ? mapUserById(user, userId) : null
  }

  static subsribe = async (followingId: string, token?: string) => {
    const userId = jwt.decode(token)._id

    await userModel
      .findByIdAndUpdate(followingId, {
        $addToSet: { followerIds: userId },
      })
      .lean()
    const user = (await userModel
      .findByIdAndUpdate(userId, {
        $addToSet: { followingIds: followingId },
      })
      .lean()) as MongoDocument<UserModel>

    return user
  }

  static unsubscribe = async (followingId: string, token?: string) => {
    const userId = jwt.decode(token)._id

    await userModel
      .findByIdAndUpdate(followingId, {
        $pull: { followerIds: userId },
      })
      .lean()
    const user = (await userModel
      .findByIdAndUpdate(userId, {
        $pull: { followingIds: followingId },
      })
      .lean()) as MongoDocument<UserModel>

    return user
  }

  static get_subscribers = async (
    userId: string,
    params: GetSubscribersParams,
    token?: string,
  ) => {
    const id = jwt.decode(token)._id

    const response = (await userModel
      .find({ followingIds: { $in: userId } })
      .populate('posts')
      .populate('followerIds')
      .populate('followingIds')
      .lean()) as MongoDocument<PopulatedUserModel>[]

    return withPagination(
      response.map((el) => mapUserById(el, id)),
      String(params.page),
      String(params.limit),
    )
  }
}

export default UsersService
