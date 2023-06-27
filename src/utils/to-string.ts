import { CATEGORIES, CATEGORIES_LABELS } from '../consts/categories'
import { Category } from '../schemas/dish'

export const toString = (value: unknown) => {
	if (typeof value === 'boolean') return value === true ? 'Sim' : 'Não'
	if (!value) return '-'
	if (isCategory(value)) return getCategoryLabel(value)
	if (typeof value === 'string') return value
}

const isCategory = (value: unknown): value is Category => {
	return typeof value === 'string' && !!CATEGORIES.find((cat) => cat === value)
}

const getCategoryLabel = (category: Category) => CATEGORIES_LABELS[category]
