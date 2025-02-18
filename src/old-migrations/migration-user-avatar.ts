import { userModel } from '#models/user/model.js'

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { Schema } = mongoose

const envConfig = dotenv.config()
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

userModel.updateMany({}, { $set: { avatarUrl: 'https://imgur.com/a/LZmusuN' } })
