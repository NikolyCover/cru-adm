import { FormControl, InputLabel, Select as MuiSelect } from '@mui/material'
import { ReactNode } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { theme } from '../../theme'

interface Props<T extends FieldValues> {
    register: UseFormRegister<T>
    name: Path<T>
    label: string
    defaultValue: string
    children: ReactNode
    fullWidth?: true
    width?: number | string
}

export function Select<TProps extends FieldValues>({ register, name, label, defaultValue, children, fullWidth, width }: Props<TProps>) {
	return (
		<FormControl fullWidth={fullWidth} sx={{ width: width }}>
			<InputLabel id="fabricationYear">{label}</InputLabel>
			<MuiSelect
				{...register(name)}
				defaultValue={defaultValue}
				id={name}
				size="small"
				label={label}
                sx={{ width: '100%'}}
                MenuProps={{ PaperProps: { sx: { maxHeight: theme.spacing(20) } } }}
			>
				{children}
			</MuiSelect>
		</FormControl>
	)
}
