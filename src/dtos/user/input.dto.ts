import { z } from 'zod'

export const createUserDtoSchema = z.object({
  name: z.string().min(8).max(40),
  password: z.string().min(6).max(16),
  email: z.string().email(),
})

export type CreateUserDto = z.infer<typeof createUserDtoSchema>

export interface GetSubscribersParams {
  page: number
  limit: number
}
