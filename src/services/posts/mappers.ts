import {
  DetailedPostResponseDto,
  PostResponseDto,
} from '#dtos/posts/output.dto.ts'
import { PostModel } from '#models/posts'
import { PopulatedPostModel } from '#models/posts'
import { reactionModel } from '#models/reaction/model.js'
import { ReactionType } from '#models/reaction/types.js'
import { MongoDocument } from '#shared/types'

export const mapPosts = async (
  posts: MongoDocument<PopulatedPostModel>[],
  userId: string,
): Promise<MongoDocument<PostResponseDto>[]> => {
  return await Promise.all(
    posts.map(
      async ({
        content,
        reactions,
        authorId: { password, email, followerIds, followingIds, ...author },
        ...post
      }) => ({
        ...post,
        author: {
          ...author,
          followed: !!followerIds.find((id) => id.toString() === userId),
        },
        reaction: await reactionModel.findOne({
          postId: post._id,
          userId: userId,
        }),
        reactions: {
          likes: reactions.filter(
            (reaction) => reaction.type === ReactionType.like,
          ).length,
          dislikes: reactions.filter(
            (reaction) => reaction.type === ReactionType.dislike,
          ).length,
          reactions,
        },
      }),
    ),
  )
}

export const mapPost = async (
  {
    reactions,
    authorId: { password, email, followerIds, followingIds, ...author },
    ...rest
  }: MongoDocument<PopulatedPostModel>,
  userId: string,
): Promise<MongoDocument<DetailedPostResponseDto>> => {
  return {
    ...rest,
    author: {
      ...author,
      followed: !!followerIds.find((id) => id.toString() === userId),
    },
    reaction: await reactionModel.findOne({
      postId: rest._id,
      userId: userId,
    }),
    reactions: {
      likes: reactions.filter((reaction) => reaction.type === ReactionType.like)
        .length,
      dislikes: reactions.filter(
        (reaction) => reaction.type === ReactionType.dislike,
      ).length,
      reactions,
    },
  }
}
