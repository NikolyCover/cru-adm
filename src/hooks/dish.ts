import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil'
import { feedbackAtom } from '../contexts/feedback'
import { DELETE_DISH_ERROR_MESSAGE, DELETE_DISH_SUCESS_MESSAGE } from '../consts/messages'
import { AxiosError } from 'axios'
import { dishesSelector } from '../contexts/dish'
import { deleteDish } from '../services/dish'

export const useDish = () => {
	const [, setFeedback] = useRecoilState(feedbackAtom)
	const refreshDishes = useRecoilRefresher_UNSTABLE(dishesSelector)

	const del = async (id: number) => {
		try {
			await deleteDish(id)

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
	}

	return {
		deleteDish: del,
	}
}
