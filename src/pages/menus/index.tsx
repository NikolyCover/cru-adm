import { Typography } from '@mui/material'
import { NavigationLayout } from '../../layouts/navigation'
import { Calendar } from '../../components/calendar'
import { useMenus } from '../../hooks/menus'

const MenusPage: React.FC = () => {
	const {events} = useMenus()

	return (
		<NavigationLayout>
			<Typography variant="h1" sx={{ mb: 3 }}>Cardárpios</Typography>
			<Calendar events={events} />
		</NavigationLayout>
	)
}

export default MenusPage
