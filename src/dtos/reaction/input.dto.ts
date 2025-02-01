import { z } from 'zod'

export const createReactionZodSchema = z.object({
  type: z.enum(['like', 'dislike']).nullable(),
  postId: z.string().length(24),
  userId: z.string().length(24),
})

export type CreateReactionDto = z.infer<typeof createReactionZodSchema>
