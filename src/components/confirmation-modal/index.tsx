import { ReactNode, useState } from 'react'
import Modal, { ModalHandles } from '../modal'
import { Typography } from '@mui/material'
import { Butttons } from '../buttons'
import { Loading } from '../loading'

interface Props {
	modalRef: React.RefObject<ModalHandles>
	title: string
	onConfirm: () => void
	children: ReactNode
}

export const ConfirmationModal: React.FC<Props> = ({ modalRef, title, children, onConfirm }) => {
	const [isLoading, setIsLoading] = useState(false)

	const onFinish =  async () => {
		setIsLoading(true)
		await onConfirm()
		setIsLoading(false)
		modalRef.current?.close()
	}

	return (
		<>
			<Loading open={isLoading} />
			<Modal ref={modalRef} title={title}>
				<Typography>{children}</Typography>
				<Butttons type="delete" close={() => modalRef.current?.close()} onFinish={onFinish} />
			</Modal>
		</>
	)
}
