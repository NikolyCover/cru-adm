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
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderColor: CRU_COLORS.blue.light,
					fontWeight: '400',
					color: '#FFF'
				},
				head: {
					fontWeight: 600,
				},
				footer: {
					border: 'none',
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				head: {
					borderRadius: 8,
					background: CRU_COLORS.blue.main,
				},
			},
		},
		MuiTablePagination: {
			styleOverrides: {
				root: {
					fontSize: '0.75rem',
					color: '#FFF',
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
