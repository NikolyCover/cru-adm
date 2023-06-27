import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface Props<T extends FieldValues> {
	register: UseFormRegister<T>
	name: Path<T>
	label: string
}

export function Checkbox<TProps extends FieldValues>({ register, name, label }: Props<TProps>) {
	return (
		<FormControlLabel
			control={<MuiCheckbox color="primary" {...register(name)} />}
			label={label}
		/>
	)
}