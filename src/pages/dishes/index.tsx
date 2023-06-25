import { NavigationLayout } from '../../layouts/navigation'
import { useRecoilValue } from 'recoil'
import { dishesAtom } from '../../contexts/dish'
import { Table } from '../../components/table'

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
			<Table headings={HEADINGS} data={dishes} />
		</NavigationLayout>
	)
}

export default DishesPage
