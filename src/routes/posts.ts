import express from 'express'
import PostsController from '#controllers/posts'
import AuthService from '#services/auth'

const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

router.use(async (req, res, next) => {
    const token = req.cookies['Authorization']
    if (token) {
        const verified = await AuthService.validate_token(token)
        if (verified) {
            next()
        } else {
            res.status(401).send({ success: 'Unauthorized' })
        }
    }
})

router.get('/api/posts', PostsController.get_posts)
router.get('/api/posts/:id', PostsController.get_post)
router.post('/api/posts', jsonParser, PostsController.create_post)
router.delete('/api/posts/:id', PostsController.delete_post)

export default router
