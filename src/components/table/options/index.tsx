import { Button, Stack } from '@mui/material'
import Modal, { ModalHandles } from '../../modal'
import { useRef } from 'react'
import { DishForm } from '../../forms/dish'

interface Props {
	buttonLabel: string
}

export const TableOptions: React.FC<Props> = ({ buttonLabel }) => {
    const modalRef = useRef<ModalHandles>(null)

    const openModal = () => modalRef.current?.open()

	return (
		<Stack justifyContent="flex-end" sx={{ mb: 2 }}>
			<Button variant="contained" size="medium" onClick={openModal}>
				{buttonLabel}
			</Button>
            <Modal ref={modalRef} title='Cadastrar prato'>
                <DishForm close={() => modalRef.current?.close()} />
            </Modal>
		</Stack>
	)
}
