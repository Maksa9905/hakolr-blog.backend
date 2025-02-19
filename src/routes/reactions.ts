import express from 'express'
import AuthService from '#services/auth'
import ReactionsController from '#controllers/reactions/reactions.controller.js'

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

router.post(
  '/api/reactions',
  jsonParser,
  ReactionsController.post_user_reaction,
)

export default router
