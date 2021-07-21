import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { ErrorHandler } from '../../error_handler'
import { IFileState, IVerifyResponse } from './model'
import { IResponse } from '~/models/response'
import { $axios } from '~/utils/api'

@Module({
	namespaced: true,
	stateFactory: true
})
export default class File extends VuexModule {
	info: IFileState = {
		token: '',
		fileName: ''
	}

	get fileInfo(): IFileState {
		return this.info
	}

	@Mutation
	updateState(data: IFileState): void {
		this.info = { ...this.info, ...data }
	}

	@Action({ rawError: true })
	async verify(token: string): Promise<void> {
		try {
			const response: IResponse<IVerifyResponse> = await $axios.$get(`/api/${token}/verify`)
			const data: IFileState = {
				fileName: response.data.file_name,
				token
			}

			this.context.commit('updateState', data)
		} catch (err) {
			throw new ErrorHandler(err.response.status, err.response.data)
		}
	}

	@Action({ rawError: true })
	async downloadFile(data: { token: string; email: string; password: string }): Promise<void> {
		try {
			await $axios.$post(`/api/${data.token}`, { email: data.email, password: data.password })
		} catch (err) {
			throw new ErrorHandler(err.response.status, err.response.data)
		}
	}
}
