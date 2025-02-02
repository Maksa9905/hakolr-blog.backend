import { ReactionType } from '#models/reaction'
import { z } from 'zod'

export const createReactionZodSchema = z.object({
  type: z.enum(['like', 'dislike']).nullable(),
  postId: z.string().length(24),
})

export const editReactionZodSchema = createReactionZodSchema.and(
  z.object({ _id: z.string().length(24) }).optional(),
)

export type CreateReactionDto = z.infer<typeof createReactionZodSchema>

export type EditReactionDto = z.infer<typeof editReactionZodSchema>

export interface CreateReactionServiceDto {
  type: keyof typeof ReactionType | null
  postId: string
  userId: string
}

export interface EditReactionServiceDto extends CreateReactionServiceDto {
  _id: string
}
