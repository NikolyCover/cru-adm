import { Backdrop, CircularProgress } from '@mui/material'
import { theme } from '../../theme'

interface Props {
	open: boolean
	isPage?: true
}

export const Loading: React.FC<Props> = ({ open, isPage }) => {
	return (
		<Backdrop
			sx={{
				color: isPage ? theme.palette.cru.blue.main : '#FFF',
				zIndex: (theme) => theme.zIndex.drawer + 1,
				...(isPage && { backgroundColor: '#FFF' }),
			}}
			open={open}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	)
}
