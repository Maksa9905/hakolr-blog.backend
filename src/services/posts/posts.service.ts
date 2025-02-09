import { CreatePostDto, GetPostsParams } from '#dtos/posts'
import { PopulatedPostModel, PostModel, postModel } from '#models/posts'
import { withPagination } from '#shared/lib/withPagination.ts'
import { MongoDocument } from '#shared/types'
import { mapPost, mapPosts } from './mappers'

export class PostsService {
  static get_posts = async (params: GetPostsParams, userId: string) => {
    const { page, limit, ...restParams } = params
    const posts = (await postModel
      .find(restParams)
      .lean()
      .populate('reactions')
      .populate('authorId')) as MongoDocument<PopulatedPostModel>[]

    return withPagination(await mapPosts(posts, userId), page, limit)
  }

  static get_post = async (id: string, userId: string) => {
    const post = (await postModel
      .findById(id)
      .lean()
      .populate('authorId')
      .populate('reactions')) as MongoDocument<PopulatedPostModel> | null

    return post ? await mapPost(post, userId) : null
  }

  static delete_post = async (id: string) => {
    const post = (await postModel
      .findByIdAndDelete(id)
      .lean()) as MongoDocument<PostModel> | null

    return post
  }

  static create_post = async (dto: CreatePostDto) => {
    const post = await postModel.create(dto)
    post.save()

    return post
  }

  static get_random_post_labels = async () => {}
}

export default PostsService
