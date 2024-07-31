import { z } from 'zod'

export const ArticlesSchema = z
  .object({
    title: z.string(),
    content: z.string(),
  })
  .partial()

export const UserSchema = z
  .object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
  })
  .partial()

export const UserLoginSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .partial()
