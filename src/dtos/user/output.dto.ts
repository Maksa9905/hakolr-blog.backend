import { PostResponseDto } from '#dtos/posts'

export interface UserResponseDto {
  _id: string
  name: string
  status: string
  avatarUrl: string
  followed: boolean
}

export interface DetailedUserDto extends UserResponseDto {}
