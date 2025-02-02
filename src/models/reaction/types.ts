export interface ReactionModel {
  _id: string
  type: ReactionType
  userId: string
  postId: string
}

export enum ReactionType {
  like = 'like',
  dislike = 'dislike',
}
