import { atom, atomFamily, selector, selectorFamily } from 'recoil'
import { AxiosError } from 'axios'
import { getAllDishes, getDish } from '../services/dish'
import { Dish } from '../schemas/dish'

export const dishesSelector = selector({
	key: 'dishes-selector',
	get: async () => {
		try {
			const response = await getAllDishes()
			return response.data
		} catch (error) {
			console.log('Error fetching dishes: ', error as AxiosError)
			return []
		}
	},
})

export const dishesAtom = atom({
	key: 'dishes-atom',
	default: dishesSelector,
})

export const dishSelector = selectorFamily<Dish | undefined, number>({
	key: 'dish-selector',
	get: (dishId: number) => async () => {
		try {
			const response = dishId == -1 ? undefined : await getDish(dishId)
			return response?.data
		} catch (error) {
			console.log('Error fetching dish: ', error as AxiosError)
			return undefined
		}
	},
})

export const dishAtom = atomFamily<Dish | undefined, number>({
	key: 'dish-atom',
	default: id => (dishSelector(id)),
})
