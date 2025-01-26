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

export const userModel =
  models.userModel<UserModel> || model('userModel', userSchema)

const createUsers = async () => {
  const users = []

  for (let i = 0; i < 15; i++) {
    const user = new userModel({
      _id: new mongoose.Types.ObjectId(),
      email: faker.internet.email(),
      name: faker.internet.displayName(),
      password: faker.internet.password(),
    })
    users.push(user)
  }

  try {
    await userModel.insertMany(users)
    console.log('15 пользователей успешно добавлены в базу данных!')
  } catch (err) {
    console.error('Ошибка при добавлении пользователей:', err)
  } finally {
    mongoose.connection.close() // Закрыть подключение
  }
}

createUsers()
