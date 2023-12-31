import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface Props<T extends FieldValues> {
	register: UseFormRegister<T>
	name: Path<T>
	label: string
	defaultChecked?: boolean
}

export function Checkbox<TProps extends FieldValues>({ register, name, label, defaultChecked }: Props<TProps>) {
	
	if(defaultChecked == undefined) return null

	return (
		<FormControlLabel
			control={<MuiCheckbox color="primary" {...register(name)} defaultChecked={defaultChecked} />}
			label={label}
			//defaultChecked={defaultChecked}
		/>
	)
}
