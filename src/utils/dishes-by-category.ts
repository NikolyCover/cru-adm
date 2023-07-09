import { Menu } from '../schemas/menu'
import { Category } from '../types/category'

export const getDishesByCategory = (menu: Menu, category: Category) =>
	menu.organizedDishes.find((organizedDishes) => organizedDishes.category === category)?.dishes
