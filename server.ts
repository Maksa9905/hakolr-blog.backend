import express from 'express'
import dotEnv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const envConfig = dotEnv.config()

import auth_router from '#routes/auth'
import users_router from '#routes/users'
import posts_router from '#routes/posts'

const databaseURI = process.env.DATABASE_URI
const cookieSecretKey = process.env.COOKIE_SECRET_KEY
const port = process.env.PORT || 5000

const app = express()

if (databaseURI) {
  mongoose.connect(databaseURI)

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    }),
  )
  app.use(cookieParser(cookieSecretKey))

  app.use(auth_router)
  app.use(posts_router)
  app.use(users_router)

  app.listen(port, () => {
    console.log(`Hakolr-blog app listening on port ${port}`)
  })
} else {
  console.error('Database URI is not defined')
}
