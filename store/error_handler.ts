interface IErrorResponse {
	status: boolean
	service_code: string
	error_code: string
	error_message: string
}

export class ErrorHandler extends Error {
	statusCode: number
	serviceCode: string
	errorCode: string
	errorMessage: string

	constructor(statusCode: number, message: IErrorResponse) {
		super()
		this.statusCode = statusCode
		this.serviceCode = message.service_code
		this.errorCode = message.service_code
		this.errorMessage = message.error_message
	}
}
