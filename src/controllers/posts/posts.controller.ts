import { CreatePostDto, GetPostsParams, createPostZodSchema } from '#dtos/posts'
import { TokenData } from '#models/auth/types.js'
import PostsService from '#services/posts/posts.service.ts'
import { ControllerUtils } from '#shared/lib'
import { idSchema } from '#shared/types/types.js'
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

  static create_post = (req: Request<any, CreatePostDto>, res: Response) => {
    const token = req.headers.authorization

    const tokenData: TokenData = jwt.decode(token)

    const date = new Date()

    const body = {
      ...req.body,
      authorId: tokenData._id,
      date: date.toISOString(),
      views: 0,
    }

    ControllerUtils.create(PostsService.create_post, createPostZodSchema)(
      { ...req, body: body } as Request,
      res,
    )
  }

  static delete_post = ControllerUtils.delete(PostsService.delete_post)

  static get_post = async (
    req: Request<{ id: string }, any, any, GetPostsParams>,
    res: Response,
  ) => {
    const token = req.headers.authorization

    const validation = idSchema.safeParse(req.params.id)

    if (validation.success) {
      const tokenData = jwt.decode(token)
      const posts = await PostsService.get_post(req.params.id, tokenData._id)
      res.send(posts)
    } else {
      res.status(400).send(JSON.parse(validation.error.message))
    }
  }
}

export default PostsController
