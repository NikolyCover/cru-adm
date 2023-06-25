import { atom, selector, selectorFamily } from 'recoil'
import { AxiosError } from 'axios'
import { getAllDishes, getDish } from '../services/dish'

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

export const dishSelector = selectorFamily({
	key: 'dish-selector',
	get: (dishId: number) => async () => {
		try {
			const response = await getDish(dishId)
			return response.data
		} catch (error) {
			console.log('Error fetching dish: ', error as AxiosError)
			return []
		}
	},
})

export const dishAtom = atom({
	key: 'dish-atom',
	default: dishSelector,
})
