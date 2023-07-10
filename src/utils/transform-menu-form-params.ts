import { MenuFormParamns } from '../schemas/menu'

export const transformMenuFormParams = (params: MenuFormParamns) => ({
	dishesIds: params.dishesIds.map((dishId) => dishId.value),
})
