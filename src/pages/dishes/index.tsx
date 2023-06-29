import { NavigationLayout } from '../../layouts/navigation'
import { useRecoilValue } from 'recoil'
import { filteredDishesSelector } from '../../contexts/dish'
import { Table } from '../../components/table'
import { TableOptions } from '../../components/table/options'
import { Typography } from '@mui/material'
import { ModalHandles } from '../../components/modal'
import { useCallback, useRef, useState } from 'react'
import { DishForm } from '../../components/forms/dish'
import { IAction } from '../../interfaces/action'
import { Dish } from '../../schemas/dish'
import { ConfirmationModal } from '../../components/confirmation-modal'
import { useDish } from '../../hooks/dish'

const HEADINGS = ['Nome', 'Descrição', 'Contém leite', 'Contém carne', 'Categoria']

const DishesPage: React.FC = () => {
	const dishes = useRecoilValue(filteredDishesSelector)
	const [dish, setDish] = useState<Dish | null>(null)

	const { deleteDish } = useDish()

	const deleteModalRef = useRef<ModalHandles>(null)
	const formModalRef = useRef<ModalHandles>(null)

	const openFormModal = useCallback(() => formModalRef.current?.open(), [formModalRef])

	const openDeleteModal = useCallback(() => deleteModalRef.current?.open(), [deleteModalRef])
	const closeDeleteModal = useCallback(() => deleteModalRef.current?.close(), [deleteModalRef])

	const editAction = (dish: Dish) => {
		setDish(dish)
	}

	const deleteAction = (dish: Dish) => {
		setDish(dish)
		openDeleteModal()
	}

	const options: IAction[] = [
		{ label: 'Editar', calback: editAction },
		{ label: 'Excluir', calback: deleteAction },
	]

	const onDelete = async () => {
		if (dish) await deleteDish(dish.id)
	}

	return (
		<>
			<NavigationLayout>
				<Typography variant="h1" sx={{ mb: 3 }}>
					Pratos
				</Typography>
				<TableOptions buttonLabel="Cadastrar prato" buttonOnClick={openFormModal} />
				<Table headings={HEADINGS} data={dishes} options={options} />
				{/* <Modal ref={modalRef} title={modalTitle}>
					{modalGoal === 'delete' && dish ? (
						<DeleteForm close={closeModal} value={dish} />
					) : (
						<DishForm close={closeModal} dish={dish} />
					)}
				</Modal> */}
			</NavigationLayout>

			<ConfirmationModal
				modalRef={deleteModalRef}
				title="Apagar Prato"
				OnConfirm={onDelete}
				close={closeDeleteModal}
			>
				Você tem certeza que deseja apagar o prato?
			</ConfirmationModal>

			{/* <DishesForm modalRef={ref} {...(dishId && { dishId })} /> */}
		</>
	)
}

export default DishesPage
