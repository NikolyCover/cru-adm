import { useState } from 'react'
import { Loading } from '../../loading'
import { Dish } from '../../../schemas/dish'
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil'
import { feedbackAtom } from '../../../contexts/feedback'
import { DELETE_DISH_ERROR_MESSAGE, DELETE_DISH_SUCESS_MESSAGE } from '../../../consts/messages'
import { dishesSelector } from '../../../contexts/dish'
import { deleteDish } from '../../../services/dish'
import { Typography } from '@mui/material'
import { Butttons } from '../../buttons'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'

interface Props {
	close: () => void
	value: Dish
}

export const DeleteForm: React.FC<Props> = ({ close, value }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [, setFeedback] = useRecoilState(feedbackAtom)
	const refreshDishes = useRecoilRefresher_UNSTABLE(dishesSelector)

	const { handleSubmit } = useForm<Dish>()

	const submit = async () => {
		setIsLoading(true)
		try {
			await deleteDish(value.id)

			setFeedback({
				value: 'success',
				message: DELETE_DISH_SUCESS_MESSAGE,
			})

			refreshDishes()
		} catch (error) {
			setFeedback({
				value: 'error',
				message: DELETE_DISH_ERROR_MESSAGE + (error as AxiosError).message,
			})
		}
		setIsLoading(false)
		close()
	}

	return (
		<>
			<Loading open={isLoading} />
			<form onSubmit={handleSubmit(submit)}>
				<Typography>Você tem certeza que deseja apagar o prato {value.name}?</Typography>
				<Butttons type='delete'  close={close} />
			</form>
		</>
	)
}
