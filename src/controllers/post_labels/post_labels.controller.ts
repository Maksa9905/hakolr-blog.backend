import PostLabelsService from '#services/post_labels/post_labels.service.js'
import { Request, Response } from 'express'

class PostLabelsController {
  static get_post_labels = async (req: Request, res: Response) => {
    res.send(await PostLabelsService.get_random_post_label())
    return
  }
}

export default PostLabelsController
