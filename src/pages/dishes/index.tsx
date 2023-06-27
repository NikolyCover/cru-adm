import { NavigationLayout } from '../../layouts/navigation'
import { useRecoilValue } from 'recoil'
import { dishesAtom } from '../../contexts/dish'
import { Table } from '../../components/table'
import { TableOptions } from '../../components/table/options'
import { Typography } from '@mui/material'

const HEADINGS = [
	'Nome',
	'Descrição',
	'Contém leite',
	'Contém carne',
	'Categoria'
]

const DishesPage: React.FC = () => {
	const dishes = useRecoilValue(dishesAtom)
	
	return (
		<NavigationLayout>
			<Typography variant='h1' sx={{ mb: 3 }}>Pratos</Typography>
			<TableOptions buttonLabel='Cadastrar prato' />
			<Table headings={HEADINGS} data={dishes} />
		</NavigationLayout>
	)
}

export default DishesPage
