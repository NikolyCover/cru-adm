import { Search } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { startTransition, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { paginationAtom, searchAtom } from '../../../../contexts/filtering'
import { theme } from '../../../../theme'

export const SearchBox: React.FC = () => {
	const [, setSearchValue] = useRecoilState(searchAtom)
	const [pagination, setPagination] = useRecoilState(paginationAtom)

	const handleChange = (value: string) => {
		startTransition(() => {
			setSearchValue(value)
		})

		setPagination({...pagination, page: 0})
	}

	useEffect(() => {
		return () => {
			setSearchValue('')
		}
	}, [])

	return (
		<TextField
			id="search-box"
			placeholder="pesquisar..."
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Search fontSize="small" />
					</InputAdornment>
				),
				sx: {
					height: theme.spacing(4),
					fontSize: '0.75rem',
                    backgroundColor: '#FFF',
                    width: theme.spacing(30)
				},
			}}
			onChange={(e) => handleChange(e.target.value)}
		/>
	)
}
