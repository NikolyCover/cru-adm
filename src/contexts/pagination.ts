import { atom } from 'recoil'

export const paginationAtom = atom({
	key: 'pagination-atom',
	default: {
		rowsPerPage: 10,
		page: 0,
	},
})
