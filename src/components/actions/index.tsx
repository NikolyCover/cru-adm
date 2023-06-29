import { MoreHoriz } from '@mui/icons-material'
import { Button, IconButton, Popover, Stack } from '@mui/material'
import { IAction } from '../../interfaces/action'
import { useMemo, useState } from 'react'
import { theme } from '../../theme'
import { Dish } from '../../schemas/dish'

interface Props {
	actions: IAction[]
	datum: Dish
}

export const Actions: React.FC<Props> = ({ actions, datum }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

	const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClosePopover = () => {
		setAnchorEl(null)
	}

	const onClick = (action: IAction) => {
		action.calback(datum)
		handleClosePopover()
	}

	const open = useMemo(() => !!anchorEl, [anchorEl])
	const id = open ? 'actions-popover' : undefined

	return (
		<>
			<IconButton aria-label="more" onClick={handleOpenPopover}>
				<MoreHoriz />
			</IconButton>
			<Popover
				id={id}
				open={!!anchorEl}
				anchorEl={anchorEl}
				onClose={handleClosePopover}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Stack>
					{actions?.map((act, index) => (
						<Button onClick={() => onClick(act)} key={index} sx={{ color: theme.palette.cru.neutral.dark, width: theme.spacing(15) }}>
							{act.label}
						</Button>
					))}
				</Stack>
			</Popover>
		</>
	)
}
