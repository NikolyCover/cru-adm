import { useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import { ArrayPath, Control, FieldArray, Path, useFieldArray } from 'react-hook-form'
import { Grid, IconButton, Stack, Typography } from '@mui/material'
import { ControlledInput } from '../controlled-input'
import { Item } from '../../interfaces/item'
import { theme } from '../../theme'

interface Props<T extends object> {
	items: Item[]
	control: Control<T>
	name: ArrayPath<T>
	defaultValue: FieldArray<T, ArrayPath<T>>
}

export function DishesInput<T extends object>({ items, control, name, defaultValue }: Props<T>) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: name,
	})

	const appendDish = useCallback(() => append(defaultValue, { shouldFocus: true }), [])
	const removeDish = useCallback((index: number) => remove(index), [])

	// useEffect(() => {
    //     return () => {
	// 		fields.map((field, index) => {
	// 			remove(index)
	// 		})
    //     }
    // }, [])

	return (
		<>
			<Typography>Pratos:</Typography>
			<Grid container spacing={2} sx={{ width: 1000 }}>
				{fields.map((item, index) => (
					<Grid item xs={4} key={item.id}>
						<Stack direction="row" alignItems="center" gap={2} key={item.id}>
							<ControlledInput
								control={control}
								name={`${name}.${index}.value` as Path<T>}
								select
								items={items}
							/>
							<IconButton onClick={() => removeDish(index)}>
								<CloseIcon />
							</IconButton>
						</Stack>
					</Grid>
				))}
			</Grid>
			<Stack
				direction="row"
				justifyContent="center"
				sx={{ color: '#FFF', borderRadius: 1, width: '100%', backgroundColor: theme.palette.cru.blue.main }}
				onClick={appendDish}
			>
				<AddIcon />
			</Stack>
		</>
	)
}
