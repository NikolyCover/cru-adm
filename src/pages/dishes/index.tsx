import { NavigationLayout } from '../../layouts/navigation'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
import { dishesAtom, dishesSelector } from '../../contexts/dish'
import { Table } from '../../components/table'
import { TableOptions } from '../../components/table/options'
import { Typography } from '@mui/material'
import Modal, { ModalHandles } from '../../components/modal'
import { useEffect, useRef } from 'react'
import { DishForm } from '../../components/forms/dish'

const HEADINGS = [
	'Nome',
	'Descrição',
	'Contém leite',
	'Contém carne',
	'Categoria'
]

const DishesPage: React.FC = () => {
	const modalRef = useRef<ModalHandles>(null)
    const openModal = () => modalRef.current?.open()
	const dishes = useRecoilValue(dishesAtom)

	return (
		<NavigationLayout>
			<Typography variant='h1' sx={{ mb: 3 }}>Pratos</Typography>
			<TableOptions buttonLabel='Cadastrar prato' buttonOnClick={openModal} />
			<Table headings={HEADINGS} data={dishes} />
			<Modal ref={modalRef} title='Cadastrar prato'>
                <DishForm close={() => modalRef.current?.close()} />
            </Modal>
		</NavigationLayout>
	)
}

export default DishesPage
