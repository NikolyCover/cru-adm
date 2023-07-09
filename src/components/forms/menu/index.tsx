import { useForm } from 'react-hook-form'
import { Butttons } from '../../buttons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loading } from '../../loading'
import Modal, { ModalHandles } from '../../modals/modal'
import { Menu, MenuParamns, MenuParamsSchema } from '../../../schemas/menu'
import { useMenus } from '../../../hooks/menus'
import { Stack } from '@mui/material'
import { useState } from 'react'
import { formatDate } from '../../../utils/format-date'

interface Props {
	modalRef: React.RefObject<ModalHandles>
    date?: Date
	menu?: Menu
}

export const MenuForm: React.FC<Props> = ({ modalRef, menu, date }) => {
	const [isLoading, setIsLoading] = useState(false)

	const { createMenu, updateMenu } = useMenus()

	const closeModal = () => {
		modalRef.current?.close()
	}

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<MenuParamns>({ 
		// defaultValues: {
        //     dishesIds: menu?.organizedDishes.map((datum) => datum.dishes.)
        // }, 
		resolver: zodResolver(MenuParamsSchema) 
	})

	const onSubmit = async (params: MenuParamns) => {
		setIsLoading(true)

		if (menu) {
			await updateMenu(params, menu.id)
		} else {
			await createMenu(params)
		}

		closeModal()
		setIsLoading(false)
	}

	return (
		<Modal 
			ref={modalRef} 
			title={`${menu ? 'Editar' : 'Cadastrar'} Cardápio ${date && `em ${formatDate(date)}`}`}

		>
			<Loading open={isLoading} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack gap={2} sx={{ mt: '5px' }}>
                    
					<Butttons close={closeModal} />
				</Stack>
			</form>
		</Modal>
	)
}
