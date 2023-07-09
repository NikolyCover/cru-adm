import { IconButton, Stack, Typography } from '@mui/material'
import { ReactNode, useCallback } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { IAction } from '../interfaces/action'
import { Actions } from '../components/actions'

interface Props {
	children: ReactNode
	goBack?: true
	title: string
	actions?: IAction[]
}

export const ViewLayout: React.FC<Props> = ({ children, goBack, title, actions }) => {
	const navigate = useNavigate()

	const onGoBack = useCallback(() => {
		navigate(-1)
	}, [])

	return (
		<>
			<Stack direction="row" justifyContent='space-between' alignItems="center" sx={{ mb: 3 }}>
				<Stack direction="row">
					{goBack && (
						<IconButton onClick={onGoBack} color="primary">
							<ArrowBack />
						</IconButton>
					)}
					<Typography variant="h1">{title}</Typography>
				</Stack>
				{actions && <Actions actions={actions} white />}
			</Stack>
			{children}
		</>
	)
}
