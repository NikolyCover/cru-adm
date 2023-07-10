import { atom, atomFamily, selector, selectorFamily } from 'recoil'
import { getAllMenus, getMenu } from '../services/menu'
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

export const menuSelector = selectorFamily({
	key: 'menu-selector',
	get: (id: number) => async () => {
		try {
			if(id != -1) {
				const response = await getMenu(id)
				return response.data
			}
		} catch (error) {
			console.log('Error fetching menu: ', error as AxiosError)
		}
		return undefined
	},
})

export const menuAtom = atomFamily<Menu | undefined, number>({
	key: 'menu-atom',
	default: id => menuSelector(id),
})
