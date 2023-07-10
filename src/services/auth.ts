import { AxiosResponse } from 'axios'
import { User } from '../schemas/user'
import { cruAPI } from './cru-api'

export const authenticate = (username: string, password: string): Promise<AxiosResponse<User>> =>
	cruAPI.post(`/user`, { username: username, password: password })
