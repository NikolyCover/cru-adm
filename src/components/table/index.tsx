import {
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Table as TableWrapper,
} from '@mui/material'
import { Dish } from '../../schemas/dish'
import { toString } from '../../utils/to-string'
import { useMemo, useState } from 'react'
import { paginateArray } from '../../utils/paginate-array'

interface Props {
	headings: string[]
	data: Dish[]
}

export const Table: React.FC<Props> = ({ headings, data }) => {
	const [pagination, setPagination] = useState({
		rowsPerPage: 10,
		page: 0,
	})

	const paginatedData = useMemo(
		() => paginateArray(data, pagination.rowsPerPage, pagination.page),
		[data, pagination]
	)

    const handleChangePage = (event: any, page: number) => {
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
		<TableContainer component={Paper} >
			<TableWrapper>
				<TableHead>
					<TableRow>
						{headings.map((heading, index) => (
							<TableCell key={index}>{heading}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{paginatedData.map((dish) => (
						<TableRow key={dish.id}>
							<TableCell>{toString(dish.name)}</TableCell>
							<TableCell>{toString(dish.description)}</TableCell>
							<TableCell>{toString(dish.contains_milk)}</TableCell>
							<TableCell>{toString(dish.contains_meat)}</TableCell>
							<TableCell>{toString(dish.category)}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							count={data.length}
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
			</TableWrapper>
		</TableContainer>
	)
}
