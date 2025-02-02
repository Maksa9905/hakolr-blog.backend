export interface ReactionDto {
  _id: string
  type: string
  postId: string
  userId: string
}

export type DetailedReactionDto = ReactionDto
