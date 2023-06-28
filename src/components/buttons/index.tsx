import { Button, Stack } from '@mui/material'
import { theme } from '../../theme'

interface Props {
	close: () => void
	type?: 'delete' | 'default'
}

export const Butttons: React.FC<Props> = ({ close, type = 'default' }) => {
	const onClickCancel = () => {
		close()
	}

	return (
		<Stack direction="row" justifyContent="flex-end" gap={2} sx={{ py: 3 }}>
			<Button variant="text" sx={{ color: type === 'delete' ? theme.palette.cru.neutral.dark : theme.palette.cru.blue.main }} size="large" onClick={onClickCancel}>
				Cancelar
			</Button>
			<Button variant="contained" size="large" type="submit" color={type === 'delete' ? 'error' : 'primary'} >
				{type === 'delete' ? 'Apagar' : 'Finalizar'}
			</Button>
		</Stack>
	)
}
