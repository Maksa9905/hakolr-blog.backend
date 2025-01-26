import { createPostZodSchema } from '#dtos/posts'
import PostsService from '#services/posts/posts.service.ts'
import { ControllerUtils } from '#shared/lib'

export class PostsController {
  static get_posts = ControllerUtils.get(PostsService.get_posts)

  static create_post = ControllerUtils.create(
    PostsService.create_post,
    createPostZodSchema,
  )

  static delete_post = ControllerUtils.delete(PostsService.delete_post)

  static get_post = ControllerUtils.getById(PostsService.get_post)
}

export default PostsController
