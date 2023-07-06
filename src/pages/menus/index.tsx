import { Typography } from '@mui/material'
import { NavigationLayout } from '../../layouts/navigation'
import { menusAtom } from '../../contexts/menu' 
import { useRecoilValue } from 'recoil'
import { Calendar } from '../../components/calendar'

const MenusPage: React.FC = () => {
	const menus = useRecoilValue(menusAtom)

	console.log(menus)

	return (
		<NavigationLayout>
			<Typography variant="h1" sx={{ mb: 3 }}>Cardárpios</Typography>
			<Calendar />
		</NavigationLayout>
	)
}

export default MenusPage
