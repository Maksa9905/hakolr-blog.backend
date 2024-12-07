import { ShortPostResponseDto } from '#dtos/posts/output.dto.ts'
import { PostModel } from '#models/posts'
import { MongoDocument } from '#shared/types'

export const getPostsMapper = (
  posts: MongoDocument<PostModel>[],
): MongoDocument<ShortPostResponseDto>[] => {
  console.log(posts.map(({ content, ...post }) => post))
  return posts.map(({ content, ...post }) => post)
}
