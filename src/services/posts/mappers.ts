import { PostResponseDto } from '#dtos/posts/output.dto.ts'
import { PostModel } from '#models/posts'
import { PopulatedPostModel } from '#models/posts'
import { MongoDocument } from '#shared/types'

export const mapPosts = (
  posts: MongoDocument<PopulatedPostModel>[],
): MongoDocument<PostResponseDto>[] => {
  return posts.map(
    ({ content, authorId: { password, ...author }, ...post }) => ({
      ...post,
      author,
    }),
  )
}
