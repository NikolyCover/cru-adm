import { z } from 'zod'
import { OrganizedDishesSchema } from './organized-dishes'

export const MenuSchema = z.object({
	id: z.number(),
	date: z.date(),
	organizedDishes: z.array(OrganizedDishesSchema)
})

export type Menu = z.infer<typeof MenuSchema>
