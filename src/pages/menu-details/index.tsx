import { NavigationLayout } from '../../layouts/navigation'
import { useRecoilValue } from 'recoil'
import { menuAtom } from '../../contexts/menu'
import { DishCard } from '../../components/dish-card'
import { getDishesByCategory } from '../../utils/dishes-by-category'
import { Stack } from '@mui/material'
import { ViewLayout } from '../../layouts/view'
import { formatDate } from '../../utils/format-date'

const MenuDetails: React.FC = () => {
	const menu = useRecoilValue(menuAtom)

	if (!menu) {
		return null
	}

	const proteins = getDishesByCategory(menu, 'PROTEIN')
	const sideDishes = getDishesByCategory(menu, 'SIDE_DISH')
	const salads = getDishesByCategory(menu, 'SALAD')
	const desserts = getDishesByCategory(menu, 'DESSERT')
	const drinks = getDishesByCategory(menu, 'DRINK')

	return (
		<NavigationLayout>
			<ViewLayout goBack title={`Cardápio de ${formatDate(menu.date)}`}>
				<Stack gap={3}>
					{proteins && <DishCard title="Proteínas" dishes={proteins} />}
					{sideDishes && <DishCard title="Acompanhamentos" dishes={sideDishes} />}
					{salads && <DishCard title="Salada" dishes={salads} />}
					{desserts && <DishCard title="Sobremesa" dishes={desserts} />}
					{drinks && <DishCard title="Sucos" dishes={drinks} />}
				</Stack>
			</ViewLayout>
		</NavigationLayout>
	)
}

export default MenuDetails
