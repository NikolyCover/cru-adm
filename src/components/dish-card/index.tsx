import { Stack, Typography } from "@mui/material"
import { Dish } from "../../schemas/dish"
import { Item } from "./item"
import { theme } from "../../theme"

interface Props {
    title: string
    dishes: Dish[]
}

export const DishCard: React.FC<Props> = ({ title, dishes }) => {
    return (
        <Stack sx={{ backgroundColor: theme.palette.cru.blue.main, borderRadius: theme.spacing(), p: theme.spacing(2) }}>
            <Typography variant="h2">{title}</Typography>
            <Stack gap={1}>
                {dishes.map((dish) => (
                    <Item key={dish.id} dish={dish} />
                ))}
            </Stack>
        </Stack>
    )
}