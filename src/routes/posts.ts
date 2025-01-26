import express from 'express'
import PostsController from '#controllers/posts'
import AuthService from '#services/auth'

const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

router.use(AuthService.validate_token)

router.get('/posts', PostsController.get_posts)
router.get('/posts/:id', post_controller.get_post)
router.post('/posts', jsonParser, post_controller.create_post)
router.delete('/posts/:id', post_controller.delete_post)

export default router
