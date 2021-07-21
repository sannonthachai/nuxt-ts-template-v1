export interface IResponse<T> {
	status: boolean
	service_code: string
	data: T
}
