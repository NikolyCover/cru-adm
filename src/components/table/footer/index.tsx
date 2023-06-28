import { TableFooter, TablePagination, TableRow } from '@mui/material'
import { useRecoilState } from 'recoil'
import { paginationAtom } from '../../../contexts/filtering'

interface Props {
	count: number
}

export const Footer: React.FC<Props> = ({ count }) => {
	const [pagination, setPagination] = useRecoilState(paginationAtom)

	const handleChangePage = (_event: any, page: number) => {
		setPagination({
			...pagination,
			page,
		})
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPagination({
			page: 0,
			rowsPerPage: Number(event.target.value),
		})
	}

	return (
		<TableFooter>
			<TableRow>
				<TablePagination
					count={count}
					rowsPerPage={pagination.rowsPerPage}
					page={pagination.page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelRowsPerPage={'Linhas por página:'}
					labelDisplayedRows={({ from, to, count }) => {
						return from + ' a ' + to + ' de ' + count
					}}
					rowsPerPageOptions={[5, 10, 20, 50, 100]}
				/>
			</TableRow>
		</TableFooter>
	)
}
