<template>
	<v-container>
		<BePFHeader />
		<v-row justify="center">
			<v-col sm="6" md="4" xl="3">
				<FormsCard v-if="status === verified" :card="formsCard" @submit="resetPassword" />
				<StatusCard v-if="status === expired || status === success" :card="statusCard" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, namespace, ProvideReactive, mixins } from 'nuxt-property-decorator'
import StatusCardMixin from '@/mixins/status-card'
import BePFHeader from '~/components/molecules/BePFHeader/BePFHeader.vue'
import { ICustodianState } from '~/store/modules/custodian/models'
import { ITextFieldState } from '~/components/molecules/TextField/model'
import { IFormsCardState } from '~/components/organisms/FormsCard/model'
import { ErrorHandler } from '~/store/error_handler'
const custodian = namespace('custodian')

@Component({
	inject: [],
	components: {
		BePFHeader
	}
})
export default class ResetPasswordToken extends mixins(StatusCardMixin) {
	@custodian.Getter
	custodianInfo!: ICustodianState

	@custodian.Action
	verify!: (token: string) => Promise<void>

	@custodian.Action
	updatePassword!: (data: { token: string; password: string }) => Promise<void>

	@ProvideReactive() vTextFieldTrigger: number = 0

	status: string = ''
	verified: string = 'verified'
	success: string = 'success'
	expired: string = 'expired'

	textField1: ITextFieldState = {
		value: '',
		label: 'New Password',
		type: 'password',
		rules: [this.vPassword],
		info: 'ความยาวขั้นต่ำ 6 หลัก ประกอบด้วยตัวอักษรภาษาอังกฤษและตัวเลขผสมกัน',
		color: '#ffcc00'
	}

	textField2: ITextFieldState = {
		value: '',
		label: 'Repeat New Password',
		type: 'password',
		rules: [this.vRepeatPassword],
		info: '',
		color: '#ffcc00'
	}

	textFields: Array<ITextFieldState> = [this.textField1, this.textField2]

	formsCard: IFormsCardState = {} as IFormsCardState

	get expireTime(): string {
		const isoExpireTime = this.custodianInfo.linkExpireTime
		const expireTime = new Date(isoExpireTime)
		const minute = (expireTime.getMinutes() < 10 ? '0' : '') + expireTime.getMinutes()
		return `${expireTime.getHours()}.${minute}`
	}

	get expireTimeMessage(): string {
		return `สามารถเปลี่ยนพาสเวิร์ดได้ถึงเวลา ${this.expireTime} น.`
	}

	async created(): Promise<void> {
		try {
			await this.verify(this.$route.params.token)

			if (this.isExpireLink()) {
				this.setExpireCard()
				this.status = this.expired
			} else {
				this.setFormsCardState()
				this.status = this.verified
			}
		} catch (err) {
			if (err instanceof ErrorHandler) {
				this.setExpireCard()
				this.status = this.expired
				console.error(err)
			}
		}
	}

	vPassword(value: string): string | boolean {
		const pattern = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)(\w|[^\w\s]){6,}$/
		return pattern.test(value) || this.textField1.info
	}

	vRepeatPassword(value: string): string | boolean {
		return value === this.textField1.value || 'รหัสผ่านไม่ตรงกัน'
	}

	async resetPassword(): Promise<void> {
		const data = {
			token: this.custodianInfo.token,
			password: this.textField1.value
		}

		if (this.isExpireLink()) {
			this.setExpireCard()
			this.status = this.expired
			return
		}

		if (this.validatePassword()) {
			try {
				await this.updatePassword(data)
				this.setSuccessCard()
				this.status = this.success
			} catch (err) {
				if (err instanceof ErrorHandler) {
					console.error(err)
				}
			}
		}
	}

	private validatePassword(): boolean {
		if (this.vPassword(this.textField1.value) === true && this.vRepeatPassword(this.textField2.value) === true) {
			return true
		}

		this.vTextFieldTrigger++
		return false
	}

	private isExpireLink(): boolean {
		const newDate = new Date()
		const expireTimeISO = new Date(this.custodianInfo.linkExpireTime)

		if (expireTimeISO.getTime() > newDate.getTime()) {
			return false
		}

		return true
	}

	private setFormsCardState(): void {
		this.formsCard.topic = 'Create Password for'
		this.formsCard.subTopic = this.custodianInfo.email
		this.formsCard.button = 'Submit'
		this.formsCard.info = this.expireTimeMessage
		this.formsCard.textField = this.textFields
	}
}
</script>
