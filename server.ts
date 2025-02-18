import express from 'express'
import dotEnv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const envConfig = dotEnv.config()

import auth_router from '#routes/auth'
import users_router from '#routes/users'
import posts_router from '#routes/posts'
import reactions_router from '#routes/reactions'

const databaseURI = process.env.DATABASE_URI
const cookieSecretKey = process.env.COOKIE_SECRET_KEY
const port = process.env.PORT || 5000

const app = express()

if (databaseURI) {
  try {
    mongoose.connect(databaseURI)
    console.log('connected to database')
  } catch (error) {
    console.error(error)
  }

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
  app.use(reactions_router)

  app.listen(port, () => {
    console.log(`Hakolr-blog app listening on port ${port}`)
  })
} else {
  console.error('Database URI is not defined')
}
