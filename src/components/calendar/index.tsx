import { Stack } from '@mui/system'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { theme } from '../../theme'

interface Props {
    events: Event[]
}

export const Calendar: React.FC<Props> = ({ events }) => {
	const localizer = momentLocalizer(moment)

	return (
		<Stack sx={{ height: '100vh', backgroundColor: '#FFF', p: theme.spacing(2), borderRadius: 1 }}>
			<BigCalendar localizer={localizer} views={{ month: true, week: true }} events={events} />
		</Stack>
	)
}
