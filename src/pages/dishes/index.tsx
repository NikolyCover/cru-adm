import { NavigationLayout } from '../../layouts/navigation'
import { useRecoilValue } from 'recoil'
import { dishAtom, dishesAtom } from '../../contexts/dish'
import { Table } from '../../components/table'
import { TableOptions } from '../../components/table/options'
import { Typography } from '@mui/material'
import Modal, { ModalHandles } from '../../components/modal'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DishForm } from '../../components/forms/dish'
import { IOption } from '../../interfaces/option'
import { DeleteForm } from '../../components/forms/delete'
import { Dish } from '../../schemas/dish'

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
	const [dishId, setDishId] = useState(-1)
	const dish = useRecoilValue(dishAtom(dishId))

	const [modalGoal, setModalGoal] = useState<ModalGoal>('create')

	const modalTitle = useMemo(() => modalGoal === 'create' ? 'Cadastrar' : (modalGoal === 'edit' ? 'Editar' : 'Apagar') + ' prato', [modalGoal])

    const openModal = useCallback(() => modalRef.current?.open(), [modalRef])
	
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

	const options: IOption[] = [
		{ label: 'Editar', action: edit},
		{ label: 'Excluir', action: del}
	]

	return (
		<NavigationLayout>
			<Typography variant='h1' sx={{ mb: 3 }}>Pratos</Typography>
			<TableOptions buttonLabel='Cadastrar prato' buttonOnClick={openModal} />
			<Table headings={HEADINGS} data={dishes} options={options} />
			<Modal ref={modalRef} title={modalTitle} actionOnClose={handleCloseModal}>
                {modalGoal === 'delete' && dish ? <DeleteForm close={() => modalRef.current?.close()} value={dish} /> : <DishForm close={() => modalRef.current?.close()} values={dish} />}
            </Modal>
		</NavigationLayout>
	)
}

export default DishesPage
