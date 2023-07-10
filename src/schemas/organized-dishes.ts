import { DishSchema } from './dish'
import { z } from 'zod'
import { CATEGORIES } from '../constants/categories'

export const OrganizedDishesSchema = z.object({
	category: z.enum(CATEGORIES),
	dishes: z.array(DishSchema)
})

export type OrganizedDishes = z.infer<typeof OrganizedDishesSchema>