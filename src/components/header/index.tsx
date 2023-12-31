import { Stack } from '@mui/system'
import { ReactComponent as Logo } from '../../assets/logotype.svg'
import { Button } from '@mui/material'
import { theme } from '../../theme'
import { useNavigate } from 'react-router'

export const Header = () => {
    const navigate = useNavigate()

    const handleClick = (path: string) => {
        navigate(`/${path}`)
    }

	return (
		<Stack direction="row" justifyContent="space-between" sx={{ paddingY: theme.spacing(4), mb: theme.spacing(2) }}>
			<Logo />
			<Stack direction="row" gap={4}>
				<Button variant="text" size='small' onClick={() => handleClick('menus')}>Cardápios</Button>
				<Button variant="text" size='small' onClick={() => handleClick('dishes')}>Pratos</Button>
			</Stack>
		</Stack>
	)
}
