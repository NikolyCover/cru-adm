import { CATEGORIES, CATEGORIES_LABELS } from '../constants/categories'
import { Category } from '../types/category'

export const isCategory = (value: unknown): value is Category => {
	return typeof value === 'string' && !!CATEGORIES.find((cat) => cat === value)
}

export const getCategoryLabel = (category: Category) => CATEGORIES_LABELS[category]
