import { Component, Vue } from 'nuxt-property-decorator'
import { IStatusCardState } from '~/components/organisms/StatusCard/model'

@Component
class StatusCardMixin extends Vue {
	statusCard: IStatusCardState = {
		icon: '',
		topic: '',
		info: ''
	}

	setSuccessCard(): void {
		this.statusCard.icon = 'fa-check-circle'
		this.statusCard.topic = 'เซ็ตรหัสผ่านสำเร็จ'
	}

	setExpireCard(): void {
		this.statusCard.icon = 'fa-hourglass-end'
		this.statusCard.topic = 'ลิงก์หมดอายุ'
		this.statusCard.info = 'หากต้องการลิงก์ใหม่ โปรดติดต่อ FINNOMENA'
	}

	setDownloadingCard(): void {
		this.statusCard.icon = 'fa-cloud-download-alt'
		this.statusCard.topic = 'กำลังดาวน์โหลด'
		this.statusCard.info = 'open-account-20200403T073033.zip'
	}
}

export default StatusCardMixin
