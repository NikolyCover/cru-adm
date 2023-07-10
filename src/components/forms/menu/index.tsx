import { useForm } from 'react-hook-form'
import { Butttons } from '../../buttons'
import { Loading } from '../../loading'
import Modal, { ModalHandles } from '../../modals/modal'
import { Menu, MenuFormParamns, MenuFormParamsSchema } from '../../../schemas/menu'
import { useMenus } from '../../../hooks/menu'
import { Stack } from '@mui/material'
import { formatDate } from '../../../utils/format-date'
import { DishesInput } from '../../dishes-select'
import { useState } from 'react'
import { getAllDishIds } from '../../../utils/get-dishes-ids'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
	modalRef: React.RefObject<ModalHandles>
	date?: Date
	menu?: Menu
}

export const MenuForm: React.FC<Props> = ({ modalRef, menu, date }) => {
	const [isLoading, setIsLoading] = useState(false)

	const { createMenu, updateMenu, dishes } = useMenus()

	const closeModal = () => {
		modalRef.current?.close()
	}

	const { control, handleSubmit } = useForm<MenuFormParamns>({
		defaultValues: {
			dishesIds: menu ? getAllDishIds(menu.organizedDishes) : []
		},
		resolver: zodResolver(MenuFormParamsSchema),
	})

	const onSubmit = async (params: MenuFormParamns) => {
		setIsLoading(true)

		if (menu) {
			await updateMenu(params, menu.id)
		} else if (date) {
			await createMenu(params, date)
		}

		closeModal()
		setIsLoading(false)
	}

	return (
		<Modal ref={modalRef} title={`${date ? `Cadastrar Cardápio em ${formatDate(date)}` : 'Editar Cardápio'}`}>
			<Loading open={isLoading} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack gap={2}>
					<DishesInput
                        control={control}
                        name='dishesIds'
                        defaultValue={{ value: -1 }}
						items={dishes.map((dish) => ({
							label: dish.name,
							value: dish.id,
						}))}
					/>
					<Butttons close={closeModal} />
				</Stack>
			</form>
		</Modal>
	)
}
