import { FormButtons } from "../../buttons"

interface Props {
    close: () => void
}

export const DishForm: React.FC<Props> = ({ close }) => {
    return (
        <form>
            <FormButtons close={close} />
        </form>
    )
}