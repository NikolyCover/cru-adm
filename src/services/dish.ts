import { AxiosResponse } from 'axios'
import { cruAPI } from './cru-api'
import { Dish, DishParamns } from '../schemas/dish'

export const getDish = (id: number): Promise<AxiosResponse<Dish>> => cruAPI.get<Dish>(`/dishes/${id}`)

export const getAllDishes = (): Promise<AxiosResponse<Dish[]>> => cruAPI.get<Dish[]>('/dishes')

export const createDish = (data: DishParamns): Promise<AxiosResponse<Dish>> => {
	return cruAPI.post(`/dishes`, data)
}

export const updateDish = (data: Dish): Promise<AxiosResponse<Dish>> => {
	return cruAPI.put(`/dishes/${data.id}`, data)
}
