import { z } from 'zod'
import { CATEGORIES } from '../consts/categories'
export type Category = typeof CATEGORIES[number]

export const DishSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    containsMilk: z.boolean(),
    containsMeat: z.boolean(),
    category: z.enum(CATEGORIES), 
})

export type Dish = z.infer<typeof DishSchema>

const REQUIRED_MESSAGE = 'O campo é obrigatório'

export const DishParamnsSchema = z.object({
    name: z.string().min(1, REQUIRED_MESSAGE),
    description: z.string().optional(),
    containsMilk: z.boolean(),
    containsMeat: z.boolean(),
    category: z.enum(CATEGORIES)
})

export type DishParamns = z.output<typeof DishParamnsSchema>