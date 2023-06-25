import { atom, selector } from 'recoil'
import { getAllMenus } from '../services/menu'
import { AxiosError } from 'axios'

export const menusSelector = selector({
	key: 'menus-selector',
	get: async () => {
		try {
			const response = await getAllMenus()
			return response.data
		} catch (error) {
			console.log('Error fetching menus: ', error as AxiosError)
			return []
		}
	},
})

export const menusAtom = atom({
	key: 'menus-atom',
	default: menusSelector,
})
