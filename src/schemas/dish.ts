import { z } from 'zod'

const CATEGORIES = ['PROTEIN', 'SIDE_DISH', 'SALAD', 'DESSERT', 'DRINK'] as const

export const DishSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    contains_milk: z.boolean(),
    contains_meat: z.boolean(),
    category: z.enum(CATEGORIES), 
})

export type Dish = z.infer<typeof DishSchema>