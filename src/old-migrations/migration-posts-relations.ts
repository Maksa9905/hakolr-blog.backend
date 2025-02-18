import { postModel, postSchema } from '#models/posts/model.js'
import { PostModel } from '#models/posts/types.js'
import { userSchema } from '#models/user/model.ts'
import { UserModel } from '#models/user/types.ts'
import { faker } from '@faker-js/faker'
import { model, models } from 'mongoose'

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

const createUsers = async () => {
  const users = []

  for (let i = 0; i < 5; i++) {
    const post = new postModel({
      _id: new mongoose.Types.ObjectId(),
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      content: faker.lorem.sentence(),
      date: faker.date.past().toISOString(),
      views: faker.number.int(),
      authorId: '67b08bd7e028db0ffab4779a',
      reactions: [],
    })
    users.push(post)
  }

  try {
    await postModel.insertMany(users)
    console.log('15 постой успешно добавлены в базу данных!')
  } catch (err) {
    console.error('Ошибка при добавлении постов:', err)
  } finally {
    mongoose.connection.close() // Закрыть подключение
  }
}

createUsers()
