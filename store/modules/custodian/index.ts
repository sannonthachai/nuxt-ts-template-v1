import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { ErrorHandler } from '../../error_handler'
import { ICustodianState, IVerifyResponse } from './models'
import { IResponse } from '~/models/response'
import { $axios } from '~/utils/api'

@Module({
	namespaced: true,
	stateFactory: true
})
export default class Custodian extends VuexModule {
	api: string = '/api/reset_password'

	info: ICustodianState = {
		email: '',
		linkExpireTime: '',
		token: ''
	}

	get custodianInfo(): ICustodianState {
		return this.info
	}

	@Mutation
	updateState(data: ICustodianState): void {
		this.info = { ...this.info, ...data }
	}

	@Action({ rawError: true })
	async verify(token: string): Promise<void> {
		try {
			const response: IResponse<IVerifyResponse> = await $axios.$get(`${this.api}/${token}/verify`)
			const data: ICustodianState = {
				email: response.data.email,
				linkExpireTime: response.data.expire_time,
				token
			}

			this.context.commit('updateState', data)
		} catch (err) {
			throw new ErrorHandler(err.response.status, err.response.data)
		}
	}

	@Action({ rawError: true })
	async updatePassword(data: { token: string; password: string }): Promise<void> {
		try {
			await $axios.$put(`${this.api}/${data.token}`, { password: data.password })
		} catch (err) {
			throw new ErrorHandler(err.response.status, err.response.data)
		}
	}
}
