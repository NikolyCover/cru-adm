import { Dish } from '../schemas/dish'

export interface IAction {
	label: string
	calback: (datum?: Dish) => void
}
