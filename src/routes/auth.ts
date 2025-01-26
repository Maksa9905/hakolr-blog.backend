import express from 'express'
import AuthController from '#controllers/auth'

const bodyParser = require('body-parser')

const auth = express.Router()

const jsonParser = bodyParser.json()

auth.post('/login', jsonParser, AuthController.login)
auth.post('/register', jsonParser, AuthController.register)

export default auth
