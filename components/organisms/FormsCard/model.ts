import { ITextFieldState } from '~/components/molecules/TextField/model'

export interface IFormsCardState {
	topic: string
	subTopic: string
	button: string
	info: string
	textField: Array<ITextFieldState>
}
