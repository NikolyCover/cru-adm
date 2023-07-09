import { Stack } from '@mui/system'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar as BigCalendar, Event, SlotInfo, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { theme } from '../../theme'
import { useCallback } from 'react'
import { Menu } from '../../schemas/menu'
import { useNavigate } from 'react-router-dom'

interface Props {
	events: Event[]
	handleSelectSlot: (slotInfo: SlotInfo) => void
}

export const Calendar: React.FC<Props> = ({ events, handleSelectSlot }) => {
	const localizer = momentLocalizer(moment)
	const navigate = useNavigate()

	const handleSelectEvent = useCallback((event: Event) => {
		const menu = event.resource as Menu
		navigate(`${menu.id}`)
	}, [])

	return (
		<Stack sx={{ height: '100vh', backgroundColor: '#FFF', p: theme.spacing(2), borderRadius: 1 }}>
			<BigCalendar
				localizer={localizer}
				views={{ month: true, week: true }}
				events={events}
				onSelectSlot={handleSelectSlot}
				onSelectEvent={handleSelectEvent}
				selectable
			/>
		</Stack>
	)
}
