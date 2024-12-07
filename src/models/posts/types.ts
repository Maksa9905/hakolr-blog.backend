export interface PostModel {
  _id: string
  title: string
  description: string
  date: string
  views: number
  likes: number
  dislikes: number
  authorId: string
  authorName: string
  content: string
}
