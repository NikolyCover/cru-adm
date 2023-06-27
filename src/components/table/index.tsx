import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table as TableWrapper } from '@mui/material'
import { Dish } from '../../schemas/dish'
import { toString } from '../../utils/to-string'
import { useMemo } from 'react'
import { paginateArray } from '../../utils/paginate-array'
import { IOption } from '../../interfaces/option'
import { Options } from '../options'
import { useRecoilValue } from 'recoil'
import { paginationAtom } from '../../contexts/pagination'
import { Footer } from './footer'

interface Props {
	headings: string[]
	data: Dish[]
	options?: IOption[]
}

export const Table: React.FC<Props> = ({ headings, data, options }) => {
	const pagination = useRecoilValue(paginationAtom)

	const paginatedData = useMemo(
		() => paginateArray(data, pagination.rowsPerPage, pagination.page),
		[data, pagination]
	)

	return (
		<TableContainer component={Paper}>
			<TableWrapper>
				<TableHead>
					<TableRow>
						{headings.map((heading, index) => (
							<TableCell key={index}>{heading}</TableCell>
						))}
						{options && <TableCell></TableCell>}
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
							{options && (
								<TableCell>
									<Options />
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
				<Footer count={data.length} />
			</TableWrapper>
		</TableContainer>
	)
}
