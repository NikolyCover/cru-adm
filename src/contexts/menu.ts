import { atom, selector } from 'recoil'
import { getAllMenus } from '../services/menu'
import { AxiosError } from 'axios'
import { Menu } from '../schemas/menu'

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

export const menuAtom = atom<Menu | null>({
	key: 'menu-atom',
	default: null,
})
