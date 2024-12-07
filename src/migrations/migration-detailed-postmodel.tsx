import { PostModel } from '#entities/post/model.ts'
const dot_env = require('dotenv').config()

const mongoose = require('mongoose')

const databaseURI = process.env.DATABASE_URI

async function migrate() {
  try {
    await mongoose.connect(databaseURI)

    const documents = await PostModel.find()

    for (const doc of documents) {
      const updatedDoc = {
        title: doc.title,
        content: '',
        description: doc.content,
        date: doc.date,
        views: doc.views,
        likes: doc.likes,
        dislikes: doc.dislikes,
        authorId: doc.authorId,
        authorName: doc.authorName,
      }

      await PostModel.updateOne({ _id: doc._id }, updatedDoc)
    }

    console.log('Migration completed!')
  } catch (error) {
    console.error('Error during migration:', error)
  } finally {
    mongoose.connection.close()
  }
}

migrate()
