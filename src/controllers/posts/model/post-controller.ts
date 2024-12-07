import { Request, Response } from "express";
import { Post, PostModel } from "#entities/post";

import { GetPostsParams } from "#controllers/posts";
import { MongoDocument, ResponseFormat } from "#shared/types";
import { withPagination } from "#shared/lib";

const get_posts = async (req: Request<any, any, any, GetPostsParams>, res: Response<ResponseFormat<Post>>) => {
    const {page, limit, ...params} = req.query;
    const posts: MongoDocument<Post>[] = await PostModel.find(params);

    res.send(withPagination(posts, page, limit));
}

const create_post = async (req, res) => {
    const data = req.body;

    const post = await PostModel.create(data);
    post.save();

    res.send(post)
}

const delete_post = async (req, res) => {
    const id = req.params.id;

    const post = await PostModel.findByIdAndDelete(id);

    res.send(post)
}

const get_post = async (req, res) => {
    const id = req.params.id;

    if (id.length !== 24) res.status(403).send('Wrong id');

    else {
        const post = await PostModel.findById(id);

        res.send(post)
    }
}

export default {
    get_posts,
    create_post,
    delete_post,
    get_post
}