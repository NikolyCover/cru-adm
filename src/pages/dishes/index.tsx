import { NavigationLayout } from '../../layouts/navigation'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dishAtom, dishesAtom } from '../../contexts/dish'
import { Table } from '../../components/table'
import { TableOptions } from '../../components/table/options'
import { Typography } from '@mui/material'
import Modal, { ModalHandles } from '../../components/modal'
import { useRef, useState } from 'react'
import { DishForm } from '../../components/forms/dish'
import { IOption } from '../../interfaces/option'

const HEADINGS = [
	'Nome',
	'Descrição',
	'Contém leite',
	'Contém carne',
	'Categoria'
]

type ModalGoal = 'create' | 'edit' | 'delete'

const DishesPage: React.FC = () => {
	const modalRef = useRef<ModalHandles>(null)
	const dishes = useRecoilValue(dishesAtom)
	const [modalGoal, setModalGoal] = useState<ModalGoal>('create')
	const [dishId, setDishId] = useState(-1)
	const [dish, setDish] = useRecoilState(dishAtom(dishId))

	const modalTitle = modalGoal === 'create' ? 'Cadastrar' : (modalGoal === 'edit' ? 'Editar' : 'Apagar') + ' prato'

    const openModal = () => modalRef.current?.open()
	
	const edit = (dishId: number) => {
		setModalGoal('edit')
		openModal()
		setDishId(dishId)
	}

	const del = (dishId: number) => {
		setModalGoal('delete')
		openModal()
		setDishId(dishId)
	}

	const options: IOption[] = [
		{ label: 'Editar', action: edit},
		{ label: 'Excluir', action: del}
	]

	return (
		<NavigationLayout>
			<Typography variant='h1' sx={{ mb: 3 }}>Pratos</Typography>
			<TableOptions buttonLabel='Cadastrar prato' buttonOnClick={openModal} />
			<Table headings={HEADINGS} data={dishes} options={options} />
			<Modal ref={modalRef} title={modalTitle} actionOnClose={() => setModalGoal('create')}>
                <DishForm close={() => modalRef.current?.close()} values={dish} />
            </Modal>
		</NavigationLayout>
	)
}

export default DishesPage
