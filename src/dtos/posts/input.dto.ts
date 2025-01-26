import { z } from 'zod'
import { WithParams } from '#shared/types'

export const createPostZodSchema = z.object({
  title: z.string().min(1).max(40),
  description: z.string().min(1).max(240),
  content: z.string().min(1),
  authorId: z.string(),
})

export type CreatePostDto = z.infer<typeof createPostZodSchema>

export type GetPostsParams = WithParams<{
  title: string
  content: string
}>
