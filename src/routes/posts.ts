import express from 'express'
import post_controller from '#controllers/posts'

const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

router.get('/posts', post_controller.get_posts)

router.post('/posts', jsonParser, post_controller.create_post)

router.delete('/posts/:id', post_controller.delete_post)

router.get('/posts/:id', post_controller.get_post)

export default router
