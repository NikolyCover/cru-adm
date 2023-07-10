import { atom } from 'recoil'
import { User } from '../schemas/user'

export const userAtom = atom<User>({
	key: 'user-atom',
	default: undefined
})
