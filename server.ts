import express from 'express'
const dot_env = require('dotenv').config();
const mongoose = require('mongoose');

import posts_router from '#routes/posts'

const databaseURI = process.env.DATABASE_URI;
const port = process.env.PORT || 5000

const app = express()

mongoose.connect(databaseURI)

app.use('/', posts_router)

app.listen(port, () => {
  console.log(`Hakolr-blog app listening on port ${port}`)
})