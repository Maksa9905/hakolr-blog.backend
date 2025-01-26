export interface PostResponseDto {
  _id: string
  title: string
  description: string
  date: string
  views: number
  likes: number
  dislikes: number
  authorId: string
  authorName: string
}

export interface DetailedPostResponseDto extends PostResponseDto {
  content: string
}
