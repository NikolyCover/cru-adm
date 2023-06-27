import { AxiosResponse } from 'axios'
import { cruAPI } from './cru-api'
import { Dish, DishParamns } from '../schemas/dish'

export const getDish = (id: number): Promise<AxiosResponse<Dish>> => cruAPI.get<Dish>(`/dishes/${id}`)

export const getAllDishes = (): Promise<AxiosResponse<Dish[]>> => cruAPI.get<Dish[]>('/dishes')

export const createDish = (data: DishParamns): Promise<AxiosResponse<Dish>> => {
    const formatedData = {
        name: data.name,
        contains_milk: data.containsMilk,
        contains_meat: data.containsMeat,
        category: data.category
    }
    return cruAPI.post(`/dishes`, formatedData)
}

export const updateDish = (data: Dish): Promise<AxiosResponse<Dish>> => {
    const formatedData = {
        name: data.name,
        contains_milk: data.containsMilk,
        contains_meat: data.containsMeat,
        category: data.category
    }
    return cruAPI.put(`/dishes/${data.id}`, formatedData)
}