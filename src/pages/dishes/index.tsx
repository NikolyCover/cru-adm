import { NavigationLayout } from '../../layouts/navigation'
import { useRecoilValue } from 'recoil'
import { dishesAtom } from '../../contexts/dish'
import { Table } from '../../components/table'
import { TableOptions } from '../../components/table/options'
import { Typography } from '@mui/material'
import Modal, { ModalHandles } from '../../components/modal'
import { useRef } from 'react'
import { DishForm } from '../../components/forms/dish'
import { IOption } from '../../interfaces/option'

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

	const func = () => {}

	const options: IOption[] = [
		{ label: 'Editar', action: func},
		{ label: 'Excluir', action: func}
	]

	return (
		<NavigationLayout>
			<Typography variant='h1' sx={{ mb: 3 }}>Pratos</Typography>
			<TableOptions buttonLabel='Cadastrar prato' buttonOnClick={openModal} />
			<Table headings={HEADINGS} data={dishes} options={options} />
			<Modal ref={modalRef} title='Cadastrar prato'>
                <DishForm close={() => modalRef.current?.close()} />
            </Modal>
		</NavigationLayout>
	)
}

export default DishesPage
