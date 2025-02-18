import express from 'express'
import AuthService from '#services/auth'
import UserController from '#controllers/users'

const router = express.Router()

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

router.get('/api/user/info', UserController.get_user_info)
router.get('/api/user/:id', UserController.get_user)
router.post('/api/user/subscribe/:id', UserController.subscribe)
router.delete('/api/user/subscribe/:id', UserController.unsubscribe)
router.get('/api/user/:id/subscribers', UserController.get_subscribers)

export default router
