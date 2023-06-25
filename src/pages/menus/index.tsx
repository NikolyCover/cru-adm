import { Typography } from '@mui/material'
import { NavigationLayout } from '../../layouts/navigation'
import { menusAtom } from '../../contexts/menu'
import { useRecoilValue } from 'recoil'

const MenusPage: React.FC = () => {
	const menus = useRecoilValue(menusAtom)

	console.log(menus)

	return (
		<NavigationLayout>
			<Typography>Menus Page</Typography>
		</NavigationLayout>
	)
}

export default MenusPage
