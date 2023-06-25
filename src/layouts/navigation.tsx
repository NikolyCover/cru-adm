import { Stack } from '@mui/material'
import { theme } from '../theme'
import { ReactNode } from 'react'
import { Header } from '../components/header'

interface Props {
	children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
	return (
		<Stack sx={{ backgroundColor: theme.palette.cru.blue.dark, height: '100vh', paddingX: theme.spacing(10) }}>
			<Header />
			{children}
		</Stack>
	)
}
