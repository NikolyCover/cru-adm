import { MoreHoriz } from '@mui/icons-material'
import { Button, IconButton, Popover, Stack } from '@mui/material'
import { IAction } from '../../interfaces/action'
import { useMemo, useState } from 'react'
import { theme } from '../../theme'

interface Props {
	actions: IAction[]
	datumId: number
}

export const Actions: React.FC<Props> = ({ actions, datumId }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

	const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClosePopover = () => {
		setAnchorEl(null)
	}

	const onClick = (opt: IAction) => {
		opt.func(datumId)
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
					{actions?.map((opt, index) => (
						<Button onClick={() => onClick(opt)} key={index} sx={{ color: theme.palette.cru.neutral.superDark, width: theme.spacing(15) }}>
							{opt.label}
						</Button>
					))}
				</Stack>
			</Popover>
		</>
	)
}
