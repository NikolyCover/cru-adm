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
		h1: {
			fontSize: 32,
			color: '#FFF'
		}
	},
	components: {
		MuiButton: {
			variants: [
				{
					props: { variant: 'text' },
					style: {
						color: '#FFF'
					},
				},
				{
					props: { variant: 'contained' },
					style: {
						backgroundColor: CRU_COLORS.blue.main,
						textTransform: 'capitalize'
					},
				},
				{
					props: { size: 'medium' },
					style: {
						height: '2rem',
						width: 160
					}
				}
			]
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontWeight: '400',
				},
				head: {
					fontWeight: 600,
					color: '#FFF'
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					backgroundColor: '#FFF',
				},
				head: {
					background: CRU_COLORS.blue.main,
				},
			},
		},
		MuiTablePagination: {
			styleOverrides: {
				root: {
					fontSize: '0.75rem',
				},
				selectLabel: {
					fontSize: '0.75rem',
				},
				displayedRows: {
					fontSize: '0.75rem',
				},
			},
		},

	}
})
