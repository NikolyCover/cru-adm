import { Stack } from '@mui/system'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar as BigCalendar, Event, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { theme } from '../../theme'
import { useCallback } from 'react'
import { Menu } from '../../schemas/menu'
import { useNavigate } from 'react-router-dom'

interface Props {
    events: Event[]
}

export const Calendar: React.FC<Props> = ({ events }) => {
	const localizer = momentLocalizer(moment)
	const navigate = useNavigate()

	const handleSelectSlot = () => {
		console.log('onSlot')
	}

	const handleSelectEvent = useCallback((event: Event) => {
		const menu = event.resource as Menu
		navigate(`${menu.id}`)
	}, [])

	return (
		<Stack sx={{ height: '100vh', backgroundColor: '#FFF', p: theme.spacing(2), borderRadius: 1 }}>
			<BigCalendar localizer={localizer} views={{ month: true, week: true }} events={events} onSelectSlot={handleSelectSlot} onSelectEvent={handleSelectEvent} />
		</Stack>
	)
}
