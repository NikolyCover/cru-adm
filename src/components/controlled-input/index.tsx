import { Checkbox, FormControlLabel, MenuItem, TextField, TextFieldProps } from '@mui/material'
import { Control, Path, useController } from 'react-hook-form'
import { Item } from '../../interfaces/item'
import { theme } from '../../theme'

interface ControlInputProps<T extends object> {
	control: Control<T>
	name: Path<T>
	select?: never
	items?: never
	multiple?: never
	checkbox?: never
}

interface ControlSelectProps<T extends object> {
	control: Control<T>
	name: Path<T>
	select: true
	items: Item[]
	multiple?: true
	checkbox?: never
}

interface ControlCheckboxProps<T extends object> {
	control: Control<T>
	name: Path<T>
	select?: never
	items?: never
	multiple?: never
	checkbox: true
}

type Props<T extends object> = (ControlInputProps<T> | ControlSelectProps<T> | ControlCheckboxProps<T>) & TextFieldProps

export function ControlledInput<T extends object>({
	control,
	name,
	select,
	items,
	multiple,
	value,
	checkbox,
	...inputProps
}: Props<T>) {
	const { field, fieldState } = useController({ control, name, rules: { required: inputProps.required } })

	const error = fieldState.error //solve problemns is acessing error of fields that are from a object

	if (checkbox) {
		return (
			<FormControlLabel
				control={<Checkbox color="primary" checked={field.value as boolean} {...field} />}
				label={inputProps.label}
			/>
		)
	}

	return (
		<TextField
			{...field}
			{...inputProps}
			error={!!error}
			{...(!!error && { helperText: error.message as string })}
			select={select}
			SelectProps={{ multiple, MenuProps: { PaperProps: { sx: { maxHeight: theme.spacing(20) } } } }}
			sx={{ width: '100%' }}
		>
			{items?.map((item, index) => (
				<MenuItem value={item.value} key={index}>
					{item.label}
				</MenuItem>
			))}
		</TextField>
	)
}
