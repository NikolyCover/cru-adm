export const formatDate = (date: Date) => {
	const newDate = new Date(date)
	const day = String(newDate.getDate()).padStart(2, '0')
	const month = String(newDate.getMonth() + 1).padStart(2, '0')
	const year = String(newDate.getFullYear())
	const weekDay = WEEK_DAYS.find((wd) => wd.value == newDate.getDay())?.label

	return `${day}/${month}/${year} - ${weekDay}`
}

const WEEK_DAYS = [
	{ value: 0, label: 'Domingo' },
	{ value: 1, label: 'Segunda-feira' },
	{ value: 2, label: 'Terça-feira' },
	{ value: 3, label: 'Quarta-feira' },
	{ value: 4, label: 'Quinta-feira' },
	{ value: 5, label: 'Sexta-feira' },
	{ value: 6, label: 'Sábado' },
]
