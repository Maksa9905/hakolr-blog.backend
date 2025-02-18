import { ReactionDto } from '#dtos/reaction'
import { ReactionModel } from '#models/reaction'
import { UserResponseDto } from '../user'

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
  author: UserResponseDto
}

export interface DetailedPostResponseDto extends PostResponseDto {
  content: string
}
