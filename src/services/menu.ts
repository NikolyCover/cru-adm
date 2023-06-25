import { AxiosResponse } from 'axios'
import { cruAPI } from './cru-api'

export const getMenu = (id: number): Promise<AxiosResponse> => (
    cruAPI.get(`/menus/${id}`)
)

export const getAllMenus = (): Promise<AxiosResponse> => (
    cruAPI.get('/menus')
)
