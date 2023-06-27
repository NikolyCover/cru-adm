import { Button, Stack } from '@mui/material'

interface Props {
	buttonLabel: string
	buttonOnClick: () => void
}

export const TableOptions: React.FC<Props> = ({ buttonLabel, buttonOnClick }) => {

	return (
		<Stack justifyContent="flex-end" sx={{ mb: 2 }}>
			<Button variant="contained" size="medium" onClick={buttonOnClick}>
				{buttonLabel}
			</Button>
		</Stack>
	)
}
