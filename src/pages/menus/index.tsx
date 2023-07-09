import { NavigationLayout } from '../../layouts/navigation'
import { Calendar } from '../../components/calendar'
import { useMenus } from '../../hooks/menus'
import { ViewLayout } from '../../layouts/view'

const MenusPage: React.FC = () => {
	const { events } = useMenus()

	return (
		<NavigationLayout>
			<ViewLayout title='Cardápios'>
				<Calendar events={events} />
			</ViewLayout>
		</NavigationLayout>
	)
}

export default MenusPage
