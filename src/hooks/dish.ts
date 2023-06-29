import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { feedbackAtom } from '../contexts/feedback'
import { CREATE_DISH_ERROR_MESSAGE, CREATE_DISH_SUCESS_MESSAGE, DELETE_DISH_ERROR_MESSAGE, DELETE_DISH_SUCESS_MESSAGE, EDIT_DISH_ERROR_MESSAGE, EDIT_DISH_SUCESS_MESSAGE } from '../consts/messages'
import { AxiosError } from 'axios'
import { createDish, deleteDish, updateDish } from '../services/dish'
import { DishParamns } from '../schemas/dish'
import { dishesAtom } from '../contexts/dish'

export const useDish = () => {
    const [ dishes, setDishes ] = useRecoilState(dishesAtom)
	const setFeedback = useSetRecoilState(feedbackAtom)

	const del = async (id: number) => {
		try {
			await deleteDish(id)

			setFeedback({
				value: 'success',
				message: DELETE_DISH_SUCESS_MESSAGE,
			})
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

            setDishes(dishes => ([ ...dishes, data ]))

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
			await updateDish(params, id)

            //setDishes(dishes =>)

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
        updateDish: update
	}
}
