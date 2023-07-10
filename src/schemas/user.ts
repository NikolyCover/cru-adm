import { z } from 'zod'

export const userSchema = z.object({
	id: z.number(),
	name: z.string(),
	username: z.string(),
	password: z.string(),
})

export type User = z.infer<typeof userSchema>

export const userParamsSchema = z.object({
	username: z.string(),
	password: z.string(),
})

export type UserParams = z.infer<typeof userParamsSchema>