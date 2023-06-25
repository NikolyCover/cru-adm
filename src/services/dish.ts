import { AxiosResponse } from 'axios'
import { cruAPI } from './cru-api'

export const getDish = (id: number): Promise<AxiosResponse> => cruAPI.get(`/dishes/${id}`)

export const getAllDishes = (): Promise<AxiosResponse> => cruAPI.get('/dishes')
