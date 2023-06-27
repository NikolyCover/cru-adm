import { Button, Stack } from '@mui/material'
import { theme } from '../../theme'

interface Props {
	close: () => void
}

export const FormButtons: React.FC<Props> = ({ close }) => {
	const onClickCancel = () => {
		close()
	}

	return (
		<Stack direction="row" justifyContent="flex-end" gap={2} sx={{ py: 3 }}>
			<Button variant="text" sx={{ color: theme.palette.cru.blue.main }} size="large" onClick={onClickCancel}>
				Cancelar
			</Button>
			<Button variant="contained" size="large" type="submit">
				Finalizar
			</Button>
		</Stack>
	)
}
