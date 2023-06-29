import { NavigationLayout } from '../../layouts/navigation'
import { useRecoilValue } from 'recoil'
import { filteredDishesSelector } from '../../contexts/dish'
import { Table } from '../../components/table'
import { TableOptions } from '../../components/table/options'
import { Typography } from '@mui/material'
import { ModalHandles } from '../../components/modal'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IAction } from '../../interfaces/action'
import { Dish } from '../../schemas/dish'
import { ConfirmationModal } from '../../components/confirmation-modal'
import { useDish } from '../../hooks/dish'
import { DishForm } from '../../components/forms/dish'

const HEADINGS = ['Nome', 'Descrição', 'Contém leite', 'Contém carne', 'Categoria']

const DishesPage: React.FC = () => {
	const dishes = useRecoilValue(filteredDishesSelector)
	const [dish, setDish] = useState<Dish | null>(null)

	const { deleteDish } = useDish()

	const deleteModalRef = useRef<ModalHandles>(null)
	const createModalRef = useRef<ModalHandles>(null)
	const editModalRef = useRef<ModalHandles>(null)

	const openCreateModal = useCallback(() => createModalRef.current?.open(), [createModalRef])

	const openDeleteModal = useCallback(() => deleteModalRef.current?.open(), [deleteModalRef])

	const editAction = (selectedDish: Dish) => {
		if(dish?.id == selectedDish.id){
			return editModalRef.current?.open()
		}

		setDish(selectedDish)
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

	// useEffect(() => {
	// 	if(dish !== null){
	// 		return editModalRef.current?.open()			
	// 	}

	// 	return editModalRef.current?.close()
	// }, [ dish ])

	return (
		<>
			<NavigationLayout>
				<Typography variant="h1" sx={{ mb: 3 }}>
					Pratos
				</Typography>
				<TableOptions buttonLabel="Cadastrar prato" buttonOnClick={openCreateModal} />
				<Table headings={HEADINGS} data={dishes} options={options} />
			</NavigationLayout>

			<DishForm modalRef={createModalRef} onClose={console.log} />

			{ dish && <DishForm modalRef={editModalRef} dish={dish} onClose={() => setDish(null)}/> }

			<ConfirmationModal
				modalRef={deleteModalRef}
				title="Apagar Prato"
				onConfirm={onDelete}
			>
				Você tem certeza que deseja apagar o prato {dish?.name} ?
			</ConfirmationModal>
		</>
	)
}

export default DishesPage
