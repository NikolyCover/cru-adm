import milk from '../../../../assets/milk.png'
import meat from '../../../../assets/meat.png'
import { theme } from '../../../../theme'

interface Props {
    type: 'milk' | 'meat'
}

export const Warning: React.FC<Props> = ({ type }) => {
    return (
        <img src={type == 'milk' ? milk : meat} width={theme.spacing(5)} />
    )
}