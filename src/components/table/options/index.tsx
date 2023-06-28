import { Button, Stack } from '@mui/material'
import { SearchBox } from './search-box'

interface Props {
	buttonLabel: string
	buttonOnClick: () => void
}

export const TableOptions: React.FC<Props> = ({ buttonLabel, buttonOnClick }) => {

	return (
		<Stack direction='row' justifyContent="space-between" sx={{ mb: 2 }}>
			<SearchBox />
			<Button variant="contained" size="medium" onClick={buttonOnClick} sx={{ textTransform: 'capitalize' }}>
				{buttonLabel}
			</Button>
		</Stack>
	)
}
