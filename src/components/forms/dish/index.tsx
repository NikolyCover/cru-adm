import { useForm } from 'react-hook-form'
import { Butttons } from '../../buttons'
import { Dish, DishParamns, DishParamnsSchema } from '../../../schemas/dish'
import { zodResolver } from '@hookform/resolvers/zod'
import { MenuItem, Stack, TextField } from '@mui/material'
import { Checkbox } from '../../checkbox'
import { Select } from '../../select'
import { CATEGORIES, CATEGORIES_LABELS } from '../../../constants/categories'
import { useEffect, useState } from 'react'
import { Loading } from '../../loading'
import Modal, { ModalHandles } from '../../modal'
import { useDish } from '../../../hooks/dish'

interface Props {
	modalRef: React.RefObject<ModalHandles>
	dish?: Dish
	onClose: () => void
}

export const DishForm: React.FC<Props> = ({ modalRef, dish, onClose }) => {
	const [isLoading, setIsLoading] = useState(false)

	const { createDish, updateDish } = useDish()

	const closeModal = () => {
		onClose()
		modalRef.current?.close()
	}

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<DishParamns>({ 
		defaultValues: dish, 
		resolver: zodResolver(DishParamnsSchema) 
	})

	const onSubmit = async (params: DishParamns) => {
		setIsLoading(true)

		if (dish) {
			await updateDish(params, dish.id)
		} else {
			await createDish(params)
		}

		closeModal()
		setIsLoading(false)
	}

	useEffect(() => {
		if(dish){
			Object.entries(dish).forEach(([ key, value ]) => {
				setValue(key as keyof DishParamns, value as string | boolean)
			})
		}
	}, [ dish ])

	return (
		<Modal 
			ref={modalRef} 
			title={(dish ? 'Editar' : 'Cadastrar') + 'Prato'}

		>
			<Loading open={isLoading} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack gap={2} sx={{ mt: '5px' }}>
					<Stack direction="row" gap={2}>
						<TextField
							{...register('name')}
							label="Nome"
							error={!!errors.name}
							helperText={errors.name?.message}
							size="small"
						/>
						<Select
							register={register}
							name="category"
							label="Categoria"
							defaultValue={dish ? dish.category : CATEGORIES[0]}
						>
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
						defaultValue={dish && dish.description}
					/>
					<Stack direction="row" justifyContent="space-between" gap={2}>
						<Checkbox
							register={register}
							name="containsMilk"
							label="Contém leite"
							defaultChecked={!!dish?.containsMilk}
						/>
						<Checkbox
							register={register}
							name="containsMeat"
							label="Contém carne"
							defaultChecked={!!dish?.containsMeat}
						/>
					</Stack>
					<Butttons close={closeModal} />
				</Stack>
			</form>
		</Modal>
	)
}
