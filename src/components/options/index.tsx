import { MoreHoriz } from '@mui/icons-material'
import { Button, IconButton, Popover, Stack } from '@mui/material'
import { IOption } from '../../interfaces/option'
import { useState } from 'react'
import { theme } from '../../theme'

interface Props {
	options: IOption[]
	datumId: number
}

export const Options: React.FC<Props> = ({ options, datumId }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const onOptionClick = (opt: IOption) => {
		handleClose()
		opt.action(datumId)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'options-popover' : undefined

	return (
		<>
			<IconButton aria-label="more" onClick={handleClick}>
				<MoreHoriz />
			</IconButton>
			<Popover
				id={id}
				open={open}
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
