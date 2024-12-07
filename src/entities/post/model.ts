import { model, models, Schema } from "mongoose";
import { Post } from "./types";

export const postSchema = new Schema({
    title: String,
    description: String,
    content: String,
    date: String,
    views: Number,
    likes: Number,
    dislikes: Number,
    authorId: String,
    authorName: String,
})

export const PostModel = models.Post<Post> || model<Post>('Post', postSchema)