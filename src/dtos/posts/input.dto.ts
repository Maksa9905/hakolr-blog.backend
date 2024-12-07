import { z } from 'zod'

export const createPostZodSchema = z.object({
  title: z.string().min(1).max(40),
  description: z.string().min(1).max(240),
  content: z.string().min(1),
  date: z.coerce.date(), // date iso string
  authorId: z.string(),
})

export const postIdSchema = z.string().length(24)

export type CreatePostDto = z.infer<typeof createPostZodSchema>
