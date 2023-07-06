import { useSetRecoilState } from 'recoil'
import { feedbackAtom } from '../contexts/feedback'
import {
	CREATE_DISH_ERROR_MESSAGE,
	CREATE_DISH_SUCESS_MESSAGE,
	DELETE_DISH_ERROR_MESSAGE,
	DELETE_DISH_SUCESS_MESSAGE,
	EDIT_DISH_ERROR_MESSAGE,
	EDIT_DISH_SUCESS_MESSAGE,
} from '../constants/messages'
import { AxiosError } from 'axios'
import { createDish, deleteDish, updateDish } from '../services/dish'
import { DishParamns } from '../schemas/dish'
import { dishesAtom } from '../contexts/dish'
import { HTTPStatus } from '../interfaces/http-status'

export const useDish = () => {
	const setDishes = useSetRecoilState(dishesAtom)
	const setFeedback = useSetRecoilState(feedbackAtom)

	const del = async (id: number) => {
		try {
			await deleteDish(id)

			setDishes((dishes) => [...dishes.filter((dish) => dish.id !== id)])

			setFeedback({
				value: 'success',
				message: DELETE_DISH_SUCESS_MESSAGE,
			})
		} catch (error) {
			setFeedback({
				value: 'error',
				message: (error as AxiosError<HTTPStatus>).response?.data.message ?? DELETE_DISH_ERROR_MESSAGE,
			})
		}
	}

	const create = async (paramns: DishParamns) => {
		try {
			const { data } = await createDish(paramns)

			setDishes((dishes) => [...dishes, data])

			setFeedback({
				value: 'success',
				message: CREATE_DISH_SUCESS_MESSAGE,
			})
		} catch (error) {
			setFeedback({
				value: 'error',
				message: (error as AxiosError<HTTPStatus>).response?.data.message ?? CREATE_DISH_ERROR_MESSAGE,
			})
		}
	}

	const update = async (params: DishParamns, id: number) => {
		try {
			const { data } = await updateDish(params, id)

			setDishes((dishes) => [...dishes.filter((dish) => dish.id !== id), data].sort((a, b) => a.id - b.id))

			setFeedback({
				value: 'success',
				message: EDIT_DISH_SUCESS_MESSAGE,
			})
		} catch (error) {
			setFeedback({
				value: 'error',
				message: EDIT_DISH_ERROR_MESSAGE,
			})
		}
	}

	return {
		deleteDish: del,
		createDish: create,
		updateDish: update,
	}
}
