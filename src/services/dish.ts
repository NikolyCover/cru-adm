import { AxiosResponse } from 'axios'
import { cruAPI } from './cru-api'
import { Dish } from '../schemas/dish'

export const getDish = (id: number): Promise<AxiosResponse<Dish>> => cruAPI.get<Dish>(`/dishes/${id}`)

export const getAllDishes = (): Promise<AxiosResponse<Dish[]>> => cruAPI.get<Dish[]>('/dishes')
