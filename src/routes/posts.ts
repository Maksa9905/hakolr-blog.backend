import express from 'express'
import PostsController from '#controllers/posts'
import AuthService from '#services/auth'

const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

router.use(AuthService.validate_token)

router.get('/posts', PostsController.get_posts)
router.get('/posts/:id', PostsController.get_post)
router.post('/posts', jsonParser, PostsController.create_post)
router.delete('/posts/:id', PostsController.delete_post)

export default router
