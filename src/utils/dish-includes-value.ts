import { Dish } from '../schemas/dish'
import { getCategoryLabel } from './category'
import { someIncludes } from './some-includes'

export const dishIncludesValue = (dish: Dish, searchValue: string) =>
	someIncludes([dish.name, getCategoryLabel(dish.category), (!!dish.description ? dish.description : '')], searchValue)
