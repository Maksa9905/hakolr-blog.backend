import { userModel } from '#models/user'
import jwt from 'jsonwebtoken'
import { mapUserInfo } from './mappers'
import { DetailedUserDto } from '#dtos/user'
import { MongoDocument } from '#shared/types/types.js'

export class UsersService {
  static get_user = async (token?: string) => {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)

    if (!verified) return null

    const { _id } = jwt.decode(token)

    const user = (await userModel
      .findOne({ _id })
      .lean()
      .populate('posts')) as MongoDocument<DetailedUserDto>

    return user ? mapUserInfo(user) : null
  }
}

export default UsersService
