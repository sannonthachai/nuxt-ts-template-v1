export interface ICustodianState {
	email: string
	linkExpireTime: string
	token: string
}

export interface IVerifyResponse {
	email: string
	expire_time: string
}
