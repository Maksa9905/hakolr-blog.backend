import { PostResponseDto } from '#dtos/posts/output.dto.ts'
import { PostModel } from '#models/posts'
import { MongoDocument } from '#shared/types'

export const mapPosts = (
  posts: MongoDocument<PostModel>[],
): MongoDocument<PostResponseDto>[] => {
  return posts.map(({ content, ...post }) => post)
}
