import { z } from 'zod'

export const createUserDtoSchema = z.object({
  name: z.string().min(8).max(40),
  password: z
    .string()
    .refine((value) =>
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value),
    ),
  email: z.string().email(),
})

export type CreateUserDto = z.infer<typeof createUserDtoSchema>
