import { OrganizedDishes } from '../schemas/organized-dishes'

export function getAllDishIds(organizedDishesList: OrganizedDishes[]) {
	const dishIds: { value: number }[] = [];
  
	for (const organizedDishes of organizedDishesList) {
	  for (const dish of organizedDishes.dishes) {
		dishIds.push({ value: dish.id });
	  }
	}
  
	return dishIds;
  }
