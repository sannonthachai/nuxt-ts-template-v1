<template>
	<v-container>
		<BePFHeader />
		<v-row justify="center">
			<v-col sm="6" md="4" xl="3">
				<FormsCard v-if="status === verified" :card="formsCard" @submit="download" />
				<StatusCard v-if="status === expired" :card="statusCard" />
				<DownloadCard v-if="status === downloading" :card="statusCard" @repeatDownload="repeatDownload" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, namespace, mixins, ProvideReactive } from 'nuxt-property-decorator'
import StatusCardMixin from '@/mixins/status-card'
import BePFHeader from '~/components/molecules/BePFHeader/BePFHeader.vue'
import { IFormsCardState } from '~/components/organisms/FormsCard/model'
import { ITextFieldState } from '~/components/molecules/TextField/model'
import { IFileState } from '~/store/modules/file/model'
import { ErrorHandler } from '~/store/error_handler'
const file = namespace('file')

@Component({
	inject: [],
	components: {
		BePFHeader
	}
})
export default class DownloadFileToken extends mixins(StatusCardMixin) {
	@file.Getter
	fileInfo!: IFileState

	@file.Action
	verify!: (token: string) => Promise<void>

	@file.Action
	downloadFile!: (data: { token: string; email: string; password: string }) => Promise<void>

	@ProvideReactive() vTextFieldTrigger!: number

	status: string = ''
	verified: string = 'verified'
	expired: string = 'expired'
	downloading: string = 'downloading'

	textField1: ITextFieldState = {
		value: '',
		label: 'Username',
		type: 'text',
		rules: [],
		info: '',
		color: '#ffcc00'
	}

	textField2: ITextFieldState = {
		value: '',
		label: 'Password',
		type: 'password',
		rules: [this.setErrorMessage],
		info: '',
		color: '#ffcc00',
		errorMessage: ''
	}

	textFields: Array<ITextFieldState> = [this.textField1, this.textField2]

	formsCard: IFormsCardState = {} as IFormsCardState

	get payload(): any {
		return {
			token: this.fileInfo.token,
			email: this.textField1.value,
			password: this.textField2.value
		}
	}

	setErrorMessage(): boolean {
		this.textField2.errorMessage = ''
		return true
	}

	async created(): Promise<void> {
		try {
			await this.verify(this.$route.params.token)

			this.setFormsCardState()
			this.status = this.verified
		} catch (err) {
			if (err instanceof ErrorHandler) {
				this.setExpireCard()
				this.status = this.expired
				console.error(err)
			}
		}
	}

	async repeatDownload(): Promise<void> {
		try {
			await this.downloadFile(this.payload)
		} catch (err) {
			if (err instanceof ErrorHandler) {
				console.error(err)
			}
		}
	}

	async download(): Promise<void> {
		try {
			await this.downloadFile(this.payload)
			this.setDownloadingCard()
			this.status = this.downloading
		} catch (err) {
			if (err instanceof ErrorHandler) {
				if (err.errorMessage) {
					this.textField2.errorMessage = err.errorMessage
				} else {
					this.textField2.errorMessage = 'Password ไม่ถูกต้อง'
				}

				console.error(err)
			}
		}
	}

	private setFormsCardState(): void {
		this.formsCard.topic = 'Download File:'
		this.formsCard.subTopic = this.fileInfo.fileName
		this.formsCard.button = 'Download'
		this.formsCard.info = 'Do you forget password? Please contact account manager or system administrator.'
		this.formsCard.textField = this.textFields
	}
}
</script>
