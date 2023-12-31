import { Button, Stack } from '@mui/material'
import { theme } from '../../theme'

interface Props {
	close: () => void
	type?: 'delete' | 'default'
	onFinish?: () => void
}

export const Butttons: React.FC<Props> = ({ close, type = 'default', onFinish }) => {
	const onClickCancel = () => {
		close()
	}

	return (
		<Stack direction="row" justifyContent="flex-end" gap={2} sx={{ py: 3 }}>
			<Button variant="text" sx={{ color: type === 'delete' ? theme.palette.cru.neutral.superDark : theme.palette.cru.blue.main }} size="large" onClick={onClickCancel}>
				Cancelar
			</Button>
			<Button variant="contained" size="large" type={onFinish ? 'button' : 'submit'} color={type === 'delete' ? 'error' : 'primary'} onClick={onFinish}>
				{type === 'delete' ? 'Apagar' : 'Finalizar'}
			</Button>
		</Stack>
	)
}
