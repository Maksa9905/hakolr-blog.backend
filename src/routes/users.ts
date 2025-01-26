import express from 'express'
import AuthService from '#services/auth'

const router = express.Router()

router.use(AuthService.validate_token)

export default router
