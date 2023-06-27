import { useForm } from 'react-hook-form'
import { FormButtons } from '../../buttons'
import { DishParamns, DishParamnsSchema } from '../../../schemas/dish'
import { zodResolver } from '@hookform/resolvers/zod'
import { createDish } from '../../../services/dish'
import { MenuItem, Stack, TextField } from '@mui/material'
import { Checkbox } from '../../checkbox'
import { Select } from '../../select'
import { CATEGORIES, CATEGORIES_LABELS } from '../../../consts/categories'
import { useState } from 'react'
import { Loading } from '../../loading'
import { feedbackAtom } from '../../../contexts/feedback'
import { CREATE_DISH_ERROR_MESSAGE, CREATE_DISH_SUCESS_MESSAGE } from '../../../consts/messages'
import { useRecoilState } from 'recoil'

interface Props {
	close: () => void
}

export const DishForm: React.FC<Props> = ({ close }) => {
	const [isLoading, setIsLoading] = useState(false)
    const [feedback, setFeedback] = useRecoilState(feedbackAtom)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<DishParamns>({ resolver: zodResolver(DishParamnsSchema) })

	const create = async (paramns: DishParamns) => {
		setIsLoading(true)
		try {
			await createDish(paramns)
            setFeedback({
                value: 'success',
                message: CREATE_DISH_SUCESS_MESSAGE
            })
		} catch (error) {
            setFeedback({
                value: 'error',
                message: CREATE_DISH_ERROR_MESSAGE
            })
		}
		setIsLoading(false)
	}

	return (
		<>
			<Loading open={isLoading} />
			<form onSubmit={handleSubmit(create)}>
				<Stack gap={2} sx={{ mt: '5px' }}>
					<Stack direction="row" gap={2}>
						<TextField
							{...register('name')}
							label="Nome"
							error={!!errors.name}
							helperText={errors.name?.message}
							size="small"
						/>
						<Select register={register} name="category" label="Categoria" defaultValue={CATEGORIES[0]}>
							{CATEGORIES.map((category, index) => (
								<MenuItem key={index} value={category}>
									{CATEGORIES_LABELS[category]}
								</MenuItem>
							))}
						</Select>
					</Stack>
					<Stack direction="row" justifyContent="space-between" gap={2}>
						<Checkbox register={register} name="containsMilk" label="Contém leite" />
						<Checkbox register={register} name="containsMeat" label="Contém carne" />
					</Stack>
					<FormButtons close={close} />
				</Stack>
			</form>
		</>
	)
}
