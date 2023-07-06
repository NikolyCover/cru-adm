import { useRecoilValue } from 'recoil'
import { menusAtom } from '../contexts/menu'

export const useMenus = () => {
	const menus = useRecoilValue(menusAtom)

	console.log(menus)

	const events: Event[] =  []//menus.

	return {
		events
	}
}
