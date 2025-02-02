import { ReactionDto } from '#dtos/reaction'
import { ReactionModel } from '#models/reaction'
import { UserDto } from '../user'

export interface PostResponseDto {
  _id: string
  title: string
  description: string
  date: string
  views: number
  reaction: ReactionModel | null
  reactions: {
    likes: number
    dislikes: number
    reactions: ReactionDto[]
  }
  author: UserDto
}

export interface DetailedPostResponseDto extends PostResponseDto {
  content: string
}
