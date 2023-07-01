import { useSetRecoilState } from 'recoil'
import { feedbackAtom } from '../contexts/feedback'
import {
	CREATE_DISH_ERROR_MESSAGE,
	CREATE_DISH_SUCESS_MESSAGE,
	DELETE_DISH_ERROR_MESSAGE,
	DELETE_DISH_REGISTERED_IN_MENU_MESSAGE,
	DELETE_DISH_SUCESS_MESSAGE,
	EDIT_DISH_ERROR_MESSAGE,
	EDIT_DISH_SUCESS_MESSAGE,
} from '../constants/messages'
import { AxiosError } from 'axios'
import { createDish, deleteDish, updateDish } from '../services/dish'
import { DishParamns } from '../schemas/dish'
import { dishesAtom } from '../contexts/dish'

export const useDish = () => {
	const setDishes = useSetRecoilState(dishesAtom)
	const setFeedback = useSetRecoilState(feedbackAtom)

	const del = async (id: number) => {
		try {
			const { data } = await deleteDish(id)

			if(!data) {
				setFeedback({
					value: 'error',
					message: DELETE_DISH_REGISTERED_IN_MENU_MESSAGE,
				})
			} else {
				setDishes((dishes) => [...dishes.filter((dish) => dish.id !== id)])

				setFeedback({
					value: 'success',
					message: DELETE_DISH_SUCESS_MESSAGE,
				})
			}
		} catch (error) {
			setFeedback({
				value: 'error',
				message: DELETE_DISH_ERROR_MESSAGE + (error as AxiosError).message,
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
				message: CREATE_DISH_ERROR_MESSAGE,
			})
		}
	}

	const update = async (params: DishParamns, id: number) => {
		try {
			const { data } = await updateDish(params, id)

			setDishes((dishes) => [...(dishes.filter((dish) => dish.id !== id)), data].sort((a, b) => a.id - b.id))

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
