import express from 'express'
import AuthController from '#controllers/auth'

const bodyParser = require('body-parser')

const auth = express.Router()

const jsonParser = bodyParser.json()

auth.post('/api/login', jsonParser, AuthController.login)
auth.post('/api/verify_token', AuthController.verify_token)
auth.post('/api/register', jsonParser, AuthController.register)

export default auth
