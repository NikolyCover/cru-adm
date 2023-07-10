import { Button, Stack, Typography } from '@mui/material'
import { theme } from '../../theme'
import { ReactComponent as Logo } from '../../assets/logotype.svg'
import { ControlledInput } from '../../components/controlled-input'
import { useForm } from 'react-hook-form'
import { UserParams, userParamsSchema } from '../../schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../hooks/auth'
import { Feedback } from '../../components/feedback'

const Login: React.FC = () => {
	const { control, handleSubmit } = useForm<UserParams>({
        defaultValues: {
            username: '',
            password: ''
        },
		resolver: zodResolver(userParamsSchema),
	})

	const { auth } = useAuth()

    const onSubmit = async (params: UserParams) => {
		await auth(params)
    }

	return (
		<Stack direction="row" height="100vh">
			<Stack
				justifyContent="center"
				width="50vw"
				alignItems="center"
				sx={{ backgroundColor: theme.palette.cru.blue.superDark }}
			>
				<Logo />
			</Stack>
			<Stack justifyContent="center" alignItems="center" width="50vw" gap={4}>
				<Typography variant="h1" sx={{ color: theme.palette.cru.blue.superDark, fontWeight: '500' }}>
					Faça login abaixo
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack alignItems='center' gap={2} width={350}>
						<ControlledInput control={control} name="username" label='Usuário' size="small" />
						<ControlledInput control={control} name="password" label='Senha' type='password' size="small" />
						<Button color='secondary' sx={{ width: '100%' }} type='submit'>Entrar</Button>
					</Stack>
				</form>
			</Stack>
			<Feedback />
		</Stack>
	)
}

export default Login
