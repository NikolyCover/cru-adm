import { useRecoilState, useSetRecoilState } from 'recoil'
import { userAtom } from '../contexts/user'
import { UserParams } from '../schemas/user'
import { feedbackAtom } from '../contexts/feedback'
import { AxiosError } from 'axios'
import { HTTPStatus } from '../interfaces/http-status'
import { authenticate } from '../services/auth'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
	const [user, setUser] = useRecoilState(userAtom)
    const setFeedback = useSetRecoilState(feedbackAtom)

    const navigate = useNavigate()

    const auth = async (params: UserParams) => {
        try {
            const response = await authenticate(params.username, params.password)

            setUser(response.data)

            navigate('/menus')

            setFeedback({
                value: 'success',
                message: 'Usuário autenticado com sucesso!'
            })
		} catch (error) {
            setFeedback({
                value: 'error',
                message: (error as AxiosError<HTTPStatus>).response?.data.message ?? ''
            })
		}

		return undefined
    }

	return {
		user,
        auth
	}
}
