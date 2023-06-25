import { Typography } from '@mui/material'
import { NavigationLayout } from '../../layouts/navigation'
import { useRecoilValue } from 'recoil'
import { dishesAtom } from '../../contexts/dish'

const DishesPage: React.FC = () => {
	const dishes = useRecoilValue(dishesAtom)
	console.log(dishes)
	
	return (
		<NavigationLayout>
			<Typography>Dishes Page</Typography>
		</NavigationLayout>
	)
}

export default DishesPage
