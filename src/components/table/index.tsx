import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table as TableWrapper } from '@mui/material'
import { Dish } from '../../schemas/dish'
import { toString } from '../../utils/to-string'

interface Props {
	headings: string[]
	data: Dish[]
}

export const Table: React.FC<Props> = ({ headings, data }) => {
	return (
		<TableContainer>
			<TableWrapper>
				<TableHead>
					<TableRow>
						{headings.map((heading, index) => (
							<TableCell key={index}>{heading}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((dish) => (
						<TableRow key={dish.id}>
							<TableCell>{toString(dish.name)}</TableCell>
							<TableCell>{toString(dish.description)}</TableCell>
							<TableCell>{toString(dish.contains_milk)}</TableCell>
							<TableCell>{toString(dish.contains_meat)}</TableCell>
							<TableCell>{toString(dish.category)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</TableWrapper>
		</TableContainer>
	)
}
