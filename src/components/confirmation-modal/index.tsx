import { ReactNode, useState } from 'react'
import Modal, { ModalHandles } from '../modal'
import { Typography } from '@mui/material'
import { Butttons } from '../buttons'
import { Loading } from '../loading'

interface Props {
	modalRef: React.Ref<ModalHandles>
	close: () => void
	title: string
	OnConfirm: () => void
	children: ReactNode
}

export const ConfirmationModal: React.FC<Props> = ({ modalRef, title, children, OnConfirm, close }) => {
	const [isLoading, setIsLoading] = useState(false)

	const onFinish = () => {
		setIsLoading(true)
		OnConfirm()
		close()
		setIsLoading(false)
	}

	return (
		<>
			<Loading open={isLoading} />
			<Modal ref={modalRef} title={title}>
				<Typography>{children}</Typography>
				<Butttons type="delete" close={close} onFinish={onFinish} />
			</Modal>
		</>
	)
}
