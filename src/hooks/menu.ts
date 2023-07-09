import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { menusAtom } from '../contexts/menu'
import { Event } from 'react-big-calendar'
import { MenuParamns } from '../schemas/menu'
import { createMenu, deleteMenu, updateMenu } from '../services/menu'
import { feedbackAtom } from '../contexts/feedback'
import { CREATE_MENU_ERROR_MESSAGE, CREATE_MENU_SUCESS_MESSAGE, DELETE_MENU_ERROR_MESSAGE, DELETE_MENU_SUCESS_MESSAGE, EDIT_MENU_ERROR_MESSAGE, EDIT_MENU_SUCESS_MESSAGE } from '../constants/messages'
import { AxiosError } from 'axios'
import { HTTPStatus } from '../interfaces/http-status'
import { dishesAtom } from '../contexts/dish'

export const useMenus = () => {
	const [menus, setMenus] = useRecoilState(menusAtom)
	const dishes = useRecoilValue(dishesAtom)

	const setFeedback = useSetRecoilState(feedbackAtom)

	const events: Event[] = menus.map((menu) => ({
		id: menu.id,
		title: 'Cardápio',
		allDay: true,
		start: new Date(menu.date),
		end: new Date(menu.date),
		resource: menu
	}))

	const create = async (paramns: MenuParamns, date: Date) => {
		try {
			const { data } = await createMenu(paramns, date)

			setMenus((menus) => [...menus, data])

			setFeedback({
				value: 'success',
				message: CREATE_MENU_SUCESS_MESSAGE,
			})
		} catch (error) {
			setFeedback({
				value: 'error',
				message: (error as AxiosError<HTTPStatus>).response?.data.message ?? CREATE_MENU_ERROR_MESSAGE,
			})
		}
	}

	const update = async (params: MenuParamns, id: number) => {
		try {
			const { data } = await updateMenu(params, id)

			setMenus((menus) => [...menus.filter((menu) => menu.id !== id), data].sort((a, b) => a.id - b.id))

			setFeedback({
				value: 'success',
				message: EDIT_MENU_SUCESS_MESSAGE,
			})
		} catch (error) {
			setFeedback({
				value: 'error',
				message: EDIT_MENU_ERROR_MESSAGE,
			})
		}
	}

	const del = async (id: number) => {
		try {
			await deleteMenu(id)

			setMenus((menus) => [...menus.filter((menu) => menu.id !== id)])

			setFeedback({
				value: 'success',
				message: DELETE_MENU_SUCESS_MESSAGE,
			})
		} catch (error) {
			setFeedback({
				value: 'error',
				message: (error as AxiosError<HTTPStatus>).response?.data.message ?? DELETE_MENU_ERROR_MESSAGE,
			})
		}
	}

	return {
		events,
		createMenu: create,
		updateMenu: update,
		deleteMenu: del,
		dishes
	}
}
