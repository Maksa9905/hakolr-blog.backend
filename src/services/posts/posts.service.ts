import { CreatePostDto, GetPostsParams } from '#dtos/posts'
import { PostModel, postModel } from '#models/posts'
import { withPagination } from '#shared/lib/withPagination.ts'
import { MongoDocument } from '#shared/types'

export class PostsService {
  static get_posts = async (params: GetPostsParams) => {
    const { page, limit, ...restParams } = params
    const posts = (await postModel
      .find(restParams)
      .lean()) as MongoDocument<PostModel>[]

    return withPagination(posts, page, limit)
  }

  static get_post = async (id: string) => {
    const post = (await postModel
      .findById(id)
      .lean()) as MongoDocument<PostModel> | null

    return post
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
}

export default PostsService
