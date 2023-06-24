import { RecoilRoot } from 'recoil'
import { Routes } from './routes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme'

export const App: React.FC = () => (
	<ThemeProvider theme={theme}>
    <CssBaseline />
		<RecoilRoot>
			<Routes />
		</RecoilRoot>
	</ThemeProvider>
)
