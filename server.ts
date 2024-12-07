import express from 'express'
import dotEnv from 'dotenv'
import mongoose from 'mongoose'

const envConfig = dotEnv.config()

import posts_router from '#routes/posts'

const databaseURI = process.env.DATABASE_URI
const port = process.env.PORT || 5000

const app = express()

if (databaseURI) {
  mongoose.connect(databaseURI)

  app.use('/', posts_router)

  app.listen(port, () => {
    console.log(`Hakolr-blog app listening on port ${port}`)
  })
} else {
  console.error('Database URI is not defined')
}
