import { AxiosResponse } from 'axios'
import { cruAPI } from './cru-api'
import { Menu, MenuParamns } from '../schemas/menu'

export const getMenu = (id: number): Promise<AxiosResponse<Menu>> => (
    cruAPI.get(`/menus/${id}`)
)

export const getAllMenus = (): Promise<AxiosResponse<Menu[]>> => (
    cruAPI.get('/menus')
)

export const createMenu = (data: MenuParamns, date: Date): Promise<AxiosResponse<Menu>> => {
	return cruAPI.post(`/menus`, {
        date: date,
        dishes_ids: data.dishesIds
    })
}

export const updateMenu = (data: MenuParamns, id: number): Promise<AxiosResponse<Menu>> => {
	return cruAPI.put(`/menus/${id}`, {
        dishes_ids: data.dishesIds
    })
}

export const deleteMenu = (id: number): Promise<AxiosResponse<Menu>> => {
	return cruAPI.delete(`/menus/${id}`)
}