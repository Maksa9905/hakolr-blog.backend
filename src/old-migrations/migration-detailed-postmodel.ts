import { postModel } from "#models/posts"
const dot_env = require('dotenv').config()

const mongoose = require('mongoose')

const databaseURI = process.env.DATABASE_URI

async function migrate() {
  try {
    await mongoose.connect(databaseURI)

    const documents = await postModel.find()

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

      await postModel.updateOne({ _id: doc._id }, updatedDoc)
    }

    console.log('Migration completed!')
  } catch (error) {
    console.error('Error during migration:', error)
  } finally {
    mongoose.connection.close()
  }
}

migrate()
