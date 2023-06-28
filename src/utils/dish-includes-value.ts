import { Dish } from '../schemas/dish'
import { someIncludes } from './some-includes'

export const dishIncludesValue = (dish: Dish, searchValue: string) =>
	someIncludes([dish.name, dish.category, (!!dish.description ? dish.description : '')], searchValue)
