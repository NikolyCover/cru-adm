export const someIncludes = (content: (string | number)[], searchValue: string) => (
	content.some(value => {
		if(typeof value == 'number')  {
			value = value.toString()
		}
	
		return value?.toLowerCase().includes(searchValue.toLowerCase())
	})
)
