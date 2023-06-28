import { NavigationLayout } from '../../layouts/navigation'
import { useRecoilValue } from 'recoil'
import { dishAtom, filteredDishesSelector } from '../../contexts/dish'
import { Table } from '../../components/table'
import { TableOptions } from '../../components/table/options'
import { Typography } from '@mui/material'
import Modal, { ModalHandles } from '../../components/modal'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DishForm } from '../../components/forms/dish'
import { IAction } from '../../interfaces/action'
import { DeleteForm } from '../../components/forms/delete'

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
	const dishes = useRecoilValue(filteredDishesSelector)
	const [dishId, setDishId] = useState(-1)
	const dish = useRecoilValue(dishAtom(dishId))

	const [modalGoal, setModalGoal] = useState<ModalGoal>('create')

	const modalTitle = useMemo(() => (modalGoal === 'create' ? 'Cadastrar' : (modalGoal === 'edit' ? 'Editar' : 'Apagar')) + ' prato', [modalGoal])

    const openModal = useCallback(() => modalRef.current?.open(), [modalRef])
	const closeModal = useCallback(() => modalRef.current?.close(), [modalRef])
	
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

	const handleCloseModal = () => {
		setModalGoal('create')
	}

	useEffect(() => {
		if(modalGoal == 'create') setDishId(-1)
	}, [modalGoal])

	const options: IAction[] = [
		{ label: 'Editar', func: edit},
		{ label: 'Excluir', func: del}
	]

	return (
		<NavigationLayout>
			<Typography variant='h1' sx={{ mb: 3 }}>Pratos</Typography>
			<TableOptions buttonLabel='Cadastrar prato' buttonOnClick={openModal} />
			<Table headings={HEADINGS} data={dishes} options={options} />
			<Modal ref={modalRef} title={modalTitle} actionOnClose={handleCloseModal}>
                {modalGoal === 'delete' && dish ? <DeleteForm close={closeModal} value={dish} /> : <DishForm close={closeModal} dish={dish} />}
            </Modal>
		</NavigationLayout>
	)
}

export default DishesPage
