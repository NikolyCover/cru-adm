import { useEffect, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { useRecoilState } from 'recoil'
import { feedbackAtom } from '../../contexts/feedback'

export const Feedback: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [feedback, setFeedback] = useRecoilState(feedbackAtom)

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}

		setIsOpen(false)
		
		setFeedback({
			value: 'none',
			message: ''
		})
	}
	
	useEffect(() => {
		if(feedback.value != 'none') setIsOpen(true)
	}, [feedback])

	if(feedback.value === 'none') {
		return null
	}

	return (
		<Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={feedback.value} sx={{ width: '100%' }} variant='filled'>
				{feedback.message}
			</Alert>
		</Snackbar>
	)
}