import { Stack } from '@mui/system'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { Button } from '@mui/material'
import { theme } from '../../theme'

export const Header = () => {
	return (
		<Stack direction="row" justifyContent="space-between" sx={{ marginY: theme.spacing(2) }}>
			<Logo />
			<Stack direction="row" gap={4}>
				<Button variant="text">Cardápios</Button>
				<Button variant="text">Menus</Button>
			</Stack>
		</Stack>
	)
}
