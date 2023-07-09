import { IconButton, Stack, Typography } from '@mui/material'
import { ReactNode, useCallback } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface Props {
	children: ReactNode
	goBack?: true
    title: string
}

export const ViewLayout: React.FC<Props> = ({ children, goBack, title }) => {
	const navigate = useNavigate()

	const onGoBack = useCallback(() => {
		navigate(-1)
	}, [])

	return (
		<>
			<Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
				{goBack && (
					<IconButton onClick={onGoBack}>
						<ArrowBack />
					</IconButton>
				)}
				<Typography variant="h1">{title}</Typography>
			</Stack>
			{children}
		</>
	)
}
