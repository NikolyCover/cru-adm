import { z } from 'zod'
import { OrganizedDishesSchema } from './organized-dishes'

export const MenuFormParamsSchema = z.object({
    dishesIds: z.object({ value: z.number() }).array()
})

export type MenuFormParamns = z.output<typeof MenuFormParamsSchema>

export const MenuParamsSchema = z.object({
    dishesIds: z.number().array()
})

export type MenuParamns = z.output<typeof MenuParamsSchema>

export const MenuSchema = z.object({
	id: z.number(),
	date: z.date(),
	organizedDishes: z.array(OrganizedDishesSchema)
})

export type Menu = z.infer<typeof MenuSchema>
