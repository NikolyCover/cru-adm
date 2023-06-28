import { getCategoryLabel, isCategory } from './category'

export const toString = (value: unknown) => {
	if (typeof value === 'boolean') return value === true ? 'Sim' : 'Não'
	if (!value) return '-'
	if (isCategory(value)) return getCategoryLabel(value)
	if (typeof value === 'string') return value
}
