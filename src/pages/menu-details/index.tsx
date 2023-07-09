import { NavigationLayout } from '../../layouts/navigation'
import { useRecoilValue } from 'recoil'
import { menuAtom } from '../../contexts/menu'
import { DishCard } from '../../components/dish-card'
import { getDishesByCategory } from '../../utils/dishes-by-category'
import { Stack } from '@mui/material'
import { ViewLayout } from '../../layouts/view'
import { formatDate } from '../../utils/format-date'
import { useNavigate, useParams } from 'react-router-dom'
import { ConfirmationModal } from '../../components/modals/confirmation'
import { ModalHandles } from '../../components/modals/modal'
import { useRef } from 'react'
import { useMenus } from '../../hooks/menu'
import { IAction } from '../../interfaces/action'

const MenuDetails: React.FC = () => {
	const { id } = useParams()
	const menu = useRecoilValue(menuAtom(Number(id)))

	const { deleteMenu } = useMenus()

	const deleteModalRef = useRef<ModalHandles>(null)

	const navigate = useNavigate()

	if (!menu) {
		return null
	}

	const proteins = getDishesByCategory(menu, 'PROTEIN')
	const sideDishes = getDishesByCategory(menu, 'SIDE_DISH')
	const salads = getDishesByCategory(menu, 'SALAD')
	const desserts = getDishesByCategory(menu, 'DESSERT')
	const drinks = getDishesByCategory(menu, 'DRINK')

	const editAction = () => {
		//editModalRef.current?.open()
	}

	const deleteAction = () => {
		deleteModalRef.current?.open()
	}

	const onDelete = async () => {
		menu && (await deleteMenu(menu.id))
		navigate('/')
	}

	const options: IAction[] = [
		{ label: 'Editar', calback: editAction },
		{ label: 'Excluir', calback: deleteAction },
	]

	return (
		<>
			<NavigationLayout>
				<ViewLayout goBack title={`Cardápio de ${formatDate(menu.date)}`} actions={options}>
					<Stack gap={3}>
						{proteins && <DishCard title="Proteínas" dishes={proteins} />}
						{sideDishes && <DishCard title="Acompanhamentos" dishes={sideDishes} />}
						{salads && <DishCard title="Salada" dishes={salads} />}
						{desserts && <DishCard title="Sobremesa" dishes={desserts} />}
						{drinks && <DishCard title="Sucos" dishes={drinks} />}
					</Stack>
				</ViewLayout>
			</NavigationLayout>

			<ConfirmationModal
				modalRef={deleteModalRef}
				title={`Apagar cardápio do dia ${formatDate(menu.date)}?`}
				onConfirm={onDelete}
			>
				Você tem certeza que deseja apagar o cardápio? Essa ação não poderá ser desfeita!
			</ConfirmationModal>
		</>
	)
}

export default MenuDetails
