import { GetPostsParams, createPostZodSchema } from '#dtos/posts'
import PostsService from '#services/posts/posts.service.ts'
import { ControllerUtils } from '#shared/lib'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export class PostsController {
  static get_posts = async (
    req: Request<any, any, any, GetPostsParams>,
    res: Response,
  ) => {
    const token = req.headers.authorization

    const tokenData = jwt.decode(token)

    const posts = await PostsService.get_posts(req.query, tokenData._id)

    res.send(posts)
  }

  static create_post = ControllerUtils.create(
    PostsService.create_post,
    createPostZodSchema,
  )

  static delete_post = ControllerUtils.delete(PostsService.delete_post)

  static get_post = async (
    req: Request<{ id: string }, any, any, GetPostsParams>,
    res: Response,
  ) => {
    const token = req.headers.authorization

    const tokenData = jwt.decode(token)

    const posts = await PostsService.get_post(req.params.id, tokenData._id)

    res.send(posts)
  }
}

export default PostsController
