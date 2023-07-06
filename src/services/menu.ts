import { AxiosResponse } from 'axios'
import { cruAPI } from './cru-api'
import { Menu } from '../schemas/menu'

export const getMenu = (id: number): Promise<AxiosResponse<Menu>> => (
    cruAPI.get(`/menus/${id}`)
)

export const getAllMenus = (): Promise<AxiosResponse<Menu[]>> => (
    cruAPI.get('/menus')
)
