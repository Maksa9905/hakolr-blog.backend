import { Request, Response } from 'express'
import { PostModel, postModel } from '#models/posts'

import { GetPostsParams } from '#controllers/posts'
import { MongoDocument, ListResponseFormat } from '#shared/types'
import { withPagination } from '#shared/lib'
import {
  CreatePostDto,
  createPostZodSchema,
  DetailedPostResponseDto,
  postIdSchema,
  ShortPostResponseDto,
} from '#dtos/posts'
import { getPostsMapper } from '#mappers/get_posts/getPostsMapper.ts'

const get_posts = async (
  req: Request<any, any, any, GetPostsParams>,
  res: Response<ListResponseFormat<ShortPostResponseDto>>,
) => {
  const { page, limit, ...params } = req.query
  const posts = (await postModel
    .find(params)
    .lean()) as MongoDocument<PostModel>[]

  const mappedPosts = getPostsMapper(posts)

  res.send(withPagination(mappedPosts, page, limit))
}

const create_post = async (
  req: Request<any, any, any, CreatePostDto>,
  res: Response<MongoDocument<DetailedPostResponseDto> | string>,
) => {
  const data = req.body

  const validation = createPostZodSchema.safeParse(data)

  if (validation.success === false) {
    res.status(400).send(JSON.stringify(validation.error))
    return
  }

  const post = await postModel.create(data)
  post.save()

  res.send(post)
}

const delete_post = async (
  req: Request<{ id: string }>,
  res: Response<MongoDocument<DetailedPostResponseDto> | string>,
) => {
  const id = req.params.id

  const validation = postIdSchema.safeParse(id)

  if (validation.success === false) {
    res.status(400).send(JSON.stringify(validation.error))
    return
  }

  const post = (await postModel
    .findByIdAndDelete(id)
    .lean()) as MongoDocument<PostModel> | null

  if (post === null) {
    res.status(404).send('post not found')
    return
  }

  res.send(post)
}

const get_post = async (
  req: Request<{ id: string }>,
  res: Response<MongoDocument<DetailedPostResponseDto> | string>,
) => {
  const id = req.params.id

  const validation = postIdSchema.safeParse(id)

  if (validation.success === false) {
    res.status(400).send(JSON.stringify(validation.error))
    return
  }

  const post = (await postModel
    .findById(id)
    .lean()) as MongoDocument<PostModel> | null

  if (post === null) {
    res.status(404).send('post not found')
    return
  }

  res.send(post)
}

export default {
  get_posts,
  create_post,
  delete_post,
  get_post,
}
