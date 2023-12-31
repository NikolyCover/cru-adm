import { NavigationLayout } from '../../layouts/navigation'
import { useRecoilValue } from 'recoil'
import { filteredDishesSelector } from '../../contexts/dish'
import { Table } from '../../components/table'
import { TableOptions } from '../../components/table/options'
import { ModalHandles } from '../../components/modals/modal'
import { useCallback, useRef, useState } from 'react'
import { IAction } from '../../interfaces/action'
import { Dish } from '../../schemas/dish'
import { ConfirmationModal } from '../../components/modals/confirmation'
import { useDish } from '../../hooks/dish'
import { DishForm } from '../../components/forms/dish'
import { ViewLayout } from '../../layouts/view'

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
		if (dish?.id == selectedDish.id) {
			return editModalRef.current?.open()
		}

		setDish(selectedDish)
	}

	const deleteAction = (dish: Dish) => {
		setDish(dish)
		openDeleteModal()
	}

	const options = [
		{ label: 'Editar', calback: editAction },
		{ label: 'Excluir', calback: deleteAction },
	] as IAction[]

	const onDelete = async () => {
		if (dish) await deleteDish(dish.id)
	}

	return (
		<>
			<NavigationLayout>
				<ViewLayout title='Pratos'>
					<TableOptions buttonLabel="Cadastrar prato" buttonOnClick={openCreateModal} />
					<Table headings={HEADINGS} data={dishes} options={options} />
				</ViewLayout>
			</NavigationLayout>

			<DishForm modalRef={createModalRef} onClose={console.log} />

			{dish && <DishForm modalRef={editModalRef} dish={dish} onClose={() => setDish(null)} />}

			<ConfirmationModal modalRef={deleteModalRef} title={`Apagar ${dish?.name}?`} onConfirm={onDelete}>
				Você tem certeza que deseja apagar o prato? Se ele estiver cadastrado em algum cardápio essa ação não
				irá ser realizada!
			</ConfirmationModal>
		</>
	)
}

export default DishesPage
