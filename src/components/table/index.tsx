import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table as TableWrapper } from '@mui/material'
import { Dish } from '../../schemas/dish'
import { toString } from '../../utils/to-string'
import { useMemo } from 'react'
import { paginateArray } from '../../utils/paginate-array'
import { IAction } from '../../interfaces/action'
import { Actions } from '../actions'
import { useRecoilValue } from 'recoil'
import { paginationAtom } from '../../contexts/filtering'
import { Footer } from './footer'

interface Props {
	headings: string[]
	data: Dish[]
	options?: IAction[]
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
							<TableCell>{toString(dish.containsMilk)}</TableCell>
							<TableCell>{toString(dish.containsMeat)}</TableCell>
							<TableCell>{toString(dish.category)}</TableCell>
							{options && (
								<TableCell>
									<Actions actions={options} datum={dish}/>
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
