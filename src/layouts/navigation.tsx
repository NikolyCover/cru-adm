import { Stack } from "@mui/material"
import { theme } from "../theme"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
    return (
        <Stack sx={{ backgroundColor: theme.palette.cru.blue.dark, height: '100vh' }} >
            {children}
        </Stack>
    )
}