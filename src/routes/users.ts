import express from 'express'
import AuthService from '#services/auth'

const router = express.Router()

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

export default router
