import { createTheme } from '@mui/material'
import { IColor } from './interfaces/color'
import '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {
	interface Palette {
		cru: {
			blue: IColor
			neutral: IColor
			red: IColor
		}
	}

	interface PaletteOptions {
        cru: {
            blue: IColor
			neutral: IColor
			red: IColor
        },
    }
}

const CRU_COLORS = {
	blue: {
		superDark: '#0C5C75',
		dark: '#1F99BE',
		main: '#289FC3',
		light: '#C9E7F0',
	},
	neutral: {
		main: '#7F969D',
		dark: '#2B2626'
	},
	red: {
		main: '#f44336'
	}
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
						color: '#FFF',
						
						"&:hover": {
							opacity: .95
						}
					},
				},
				{
					props: { variant: 'contained' },
					style: {
						backgroundColor: CRU_COLORS.blue.main,
						"&:hover": {
							backgroundColor: CRU_COLORS.blue.dark,
						}
					},
				},
				{
					props: { size: 'medium' },
					style: {
						height: '2rem',
						width: 160
					}
				},
				{
					props: { color: 'error' },
					style: {
						backgroundColor: `${CRU_COLORS.red.main} !important`,
					}
				}
			],
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
