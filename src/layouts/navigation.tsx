import { Stack } from '@mui/material'
import { theme } from '../theme'
import { ReactNode } from 'react'
import { Header } from '../components/header'
import { Feedback } from '../components/feedback'

interface Props {
	children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
	return (
		<Stack sx={{ backgroundColor: theme.palette.cru.blue.dark, minHeight: '100vh', paddingX: theme.spacing(10), pb: theme.spacing(3)}}>
			<Header />
			{children}
			<Feedback />
		</Stack>
	)
}
