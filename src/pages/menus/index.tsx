import { NavigationLayout } from '../../layouts/navigation'
import { Calendar } from '../../components/calendar'
import { useMenus } from '../../hooks/menus'
import { ViewLayout } from '../../layouts/view'
import { useCallback, useRef, useState } from 'react'
import { ModalHandles } from '../../components/modals/modal'
import { MenuForm } from '../../components/forms/menu'
import { SlotInfo } from 'react-big-calendar'
import { Menu } from '../../schemas/menu'

const MenusPage: React.FC = () => {
	const { events } = useMenus()

	const createModalRef = useRef<ModalHandles>(null)

	const [date, setDate] = useState<Date | null>(null)

	const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
		createModalRef.current?.open()
		setDate(slotInfo.start)
	}, [])

	return (
		<>
			<NavigationLayout>
				<ViewLayout title="Cardápios">
					<Calendar events={events} handleSelectSlot={handleSelectSlot} />
				</ViewLayout>
			</NavigationLayout>

			<MenuForm modalRef={createModalRef} date={date} />
		</>
	)
}

export default MenusPage
