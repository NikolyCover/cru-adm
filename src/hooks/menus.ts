import { useRecoilValue } from 'recoil'
import { menusAtom } from '../contexts/menu'
import { Event } from 'react-big-calendar'

export const useMenus = () => {
	const menus = useRecoilValue(menusAtom)

	const events: Event[] = menus.map((menu) => ({
		id: menu.id,
		title: 'Cardápio',
		allDay: true,
		start: new Date(menu.date),
		end: new Date(menu.date),
		resource: menu
	}))

	return {
		events
	}
}
