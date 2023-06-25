import { createTheme } from '@mui/material'
import { IColor } from './interfaces/color'
import '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {
	interface Palette {
		cru: {
			blue: IColor
			neutral: IColor
		}
	}

	interface PaletteOptions {
        cru: {
            blue: IColor
			neutral: IColor
        },
    }
}

const CRU_COLORS = {
	blue: {
		dark: '#0C5C75',
		main: '#289FC3',
		light: '#C9E7F0',
	},
	neutral: {
		main: '#7F969D',
		white: '#FFF',
	},
}

export const theme = createTheme({
	palette: {
        cru: { ...CRU_COLORS },
    },
	typography: {
		fontFamily: ['Fredoka'].join(','),
		allVariants: {
			color: '#FFF'
		},
		button: {
			color: '#FFF'
		}
	},
	components: {
		MuiButton: {
			variants: [
				{
					props: { variant:'text' },
					style: {
						color: '#FFF'
					},
				}
			]
		}
	}
})
