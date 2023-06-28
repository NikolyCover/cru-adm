import { MoreHoriz } from '@mui/icons-material'
import { Button, IconButton, Popover, Stack } from '@mui/material'
import { IOption } from '../../interfaces/option'
import { useMemo, useState } from 'react'
import { theme } from '../../theme'

interface Props {
	options: IOption[]
	datumId: number
}

export const Options: React.FC<Props> = ({ options, datumId }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const onOptionClick = (opt: IOption) => {
		opt.action(datumId)
		setAnchorEl(null)
	}

	const open = useMemo(() => !!anchorEl, [anchorEl])
	const id = open ? 'options-popover' : undefined

	return (
		<>
			<IconButton aria-label="more" onClick={handleOpen}>
				<MoreHoriz />
			</IconButton>
			<Popover
				id={id}
				open={!!anchorEl}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Stack>
					{options?.map((opt, index) => (
						<Button onClick={() => onOptionClick(opt)} key={index} sx={{ color: theme.palette.cru.neutral.dark, width: theme.spacing(15) }}>
							{opt.label}
						</Button>
					))}
				</Stack>
			</Popover>
		</>
	)
}
