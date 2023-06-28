import { useForm } from 'react-hook-form'
import { FormButtons } from '../../buttons'
import { Dish, DishParamns, DishParamnsSchema } from '../../../schemas/dish'
import { zodResolver } from '@hookform/resolvers/zod'
import { createDish, updateDish } from '../../../services/dish'
import { MenuItem, Stack, TextField } from '@mui/material'
import { Checkbox } from '../../checkbox'
import { Select } from '../../select'
import { CATEGORIES, CATEGORIES_LABELS } from '../../../consts/categories'
import { useState } from 'react'
import { Loading } from '../../loading'
import { feedbackAtom } from '../../../contexts/feedback'
import { CREATE_DISH_ERROR_MESSAGE, CREATE_DISH_SUCESS_MESSAGE, EDIT_DISH_ERROR_MESSAGE, EDIT_DISH_SUCESS_MESSAGE } from '../../../consts/messages'
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil'
import { dishesSelector } from '../../../contexts/dish'

interface Props {
	close: () => void
	values?: Dish
}

export const DishForm: React.FC<Props> = ({ close, values }) => {
	const [isLoading, setIsLoading] = useState(false)
    const [, setFeedback] = useRecoilState(feedbackAtom)
	const refreshDishes = useRecoilRefresher_UNSTABLE(dishesSelector)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<DishParamns>({ resolver: zodResolver(DishParamnsSchema) })

	const submit = async (paramns: DishParamns ) => {
		setIsLoading(true)
		try {
			values ? await updateDish({id: values.id, ...paramns}) : await createDish(paramns)
            setFeedback({
                value: 'success',
                message: values ? EDIT_DISH_SUCESS_MESSAGE : CREATE_DISH_SUCESS_MESSAGE
            })
			refreshDishes()
		} catch (error) {
            setFeedback({
                value: 'error',
                message: values ? EDIT_DISH_ERROR_MESSAGE : CREATE_DISH_ERROR_MESSAGE
            })
		}
		setIsLoading(false)
	}

	return (
		<>
			<Loading open={isLoading} />
			<form onSubmit={handleSubmit(submit)}>
				<Stack gap={2} sx={{ mt: '5px' }}>
					<Stack direction="row" gap={2}>
						<TextField
							{...register('name')}
							label="Nome"
							error={!!errors.name}
							helperText={errors.name?.message}
							size="small"
							defaultValue={values && values.name}
						/>
						<Select register={register} name="category" label="Categoria" defaultValue={values ? values.category : CATEGORIES[0]}>
							{CATEGORIES.map((category, index) => (
								<MenuItem key={index} value={category}>
									{CATEGORIES_LABELS[category]}
								</MenuItem>
							))}
						</Select>
					</Stack>
					<TextField
							{...register('description')}
							label="Descrição"
							error={!!errors.description}
							helperText={errors.description?.message}
							size="small"
							defaultValue={values && values.description}
						/>
					<Stack direction="row" justifyContent="space-between" gap={2}>
						<Checkbox register={register} name="containsMilk" label="Contém leite" defaultChecked={values?.containsMilk} />
						<Checkbox register={register} name="containsMeat" label="Contém carne" defaultChecked={values?.containsMeat} />
					</Stack>
					<FormButtons close={close} />
				</Stack>
			</form>
		</>
	)
}
