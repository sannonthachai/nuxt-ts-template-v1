export interface ITextFieldState {
	value: string
	label: string
	type: string
	rules: Array<Function>
	info: string
	color: string
	errorMessage?: string
}
