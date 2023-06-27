import { ReactNode, forwardRef, useImperativeHandle, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'

export interface ModalHandles {
    open: () => void
    close: () => void
}

interface Props {
    title: string
    children: ReactNode
    handleEnd?: () => void
}

const Modal: React.ForwardRefRenderFunction<ModalHandles, Props> = ({ title, children }, ref) => {
	const [visible, setVisible] = useState(false)

    useImperativeHandle(ref, () => (
        {open, close}
    ))

	const open = () => {
		setVisible(true)
	}

    const close = () => {
		setVisible(false)
	}

	return (
		<Dialog open={visible} onClose={close}>
			<DialogTitle sx={{ px: 3, pt: 3, pb: 2 }} >{title}</DialogTitle>
            <DialogContent sx={{ py: 0, px: 3}}>
                {children}
            </DialogContent>
		</Dialog>
	)
}

export default forwardRef(Modal)
