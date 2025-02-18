import { DetailedUserDto, UserResponseDto } from '#dtos/user'
import { PopulatedUserModel, UserModel } from '#models/user/types.js'
import { MongoDocument } from '#shared/types/types.js'

export const mapUserInfo = (
  {
    password,
    email,
    followerIds,
    followingIds,
    ...user
  }: MongoDocument<UserModel>,
  userId: string,
) => {
  const body: MongoDocument<UserResponseDto> = {
    ...user,
    followed: Boolean(followerIds.find((id) => id.toString() === userId)),
  }

  return body
}

export const mapUserById = (
  {
    password,
    email,
    followerIds,
    followingIds,
    posts,
    ...user
  }: MongoDocument<PopulatedUserModel>,
  userId,
) => {
  const body: MongoDocument<DetailedUserDto> = {
    ...user,
    followed: Boolean(followerIds.find((el) => el._id.toString() === userId)),
  }

  return body
}
