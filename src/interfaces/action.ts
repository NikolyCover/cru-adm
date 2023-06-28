export interface IAction {
	label: string
	func: (datumId: number) => void
}