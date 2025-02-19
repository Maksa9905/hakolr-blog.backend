import express from 'express'
import PostsController from '#controllers/posts'
import AuthService from '#services/auth'
import PostLabelsController from '#controllers/post_labels/post_labels.controller.js'

const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

router.use(async (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    const verified = await AuthService.validate_token(token)
    if (verified) {
      next('route')
      return
    } else {
      res.status(401).send({ success: 'Unauthorized' })
      return
    }
  }
  res.status(401).send({ success: 'Unauthorized' })
  return
})

router.get('/api/posts', PostsController.get_posts)
router.get('/api/posts/labels', PostLabelsController.get_post_labels)
router.get('/api/posts/:id', PostsController.get_post)
router.post('/api/posts', jsonParser, PostsController.create_post)

export default router
