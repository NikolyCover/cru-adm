import { Stack, Typography } from "@mui/material"
import { Dish } from "../../../schemas/dish"
import { Warning } from "./warning"
import { theme } from "../../../theme"

interface Props {
  dish: Dish
}

export const Item: React.FC<Props> = ({ dish }) => {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ backgroundColor: '#FFF', borderRadius: 2, paddingX: 2, height: 56 }}>
      <Typography>{dish.name}</Typography>
      <Stack direction='row' gap={1}>
        {dish.containsMilk && <Warning type="milk"/>}
        {dish.containsMeat && <Warning type="meat"/>}
      </Stack>
    </Stack>
  )
}