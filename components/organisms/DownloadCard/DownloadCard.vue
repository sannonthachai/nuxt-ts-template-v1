<template>
	<StatusCard :card="card">
		<template #additional>
			<div class="mt-5">
				<span class="v-card__text--download">{{ alert }}</span>
				<span class="v-card__text--download-button" @click="repeatDownload">{{ repeat }}</span>
			</div>
		</template>
	</StatusCard>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import { IStatusCardState } from '../StatusCard/model'

@Component
export default class DownloadCard extends Vue {
	@Prop({ required: true }) card!: IStatusCardState

	alert: string = 'หากไฟล์ไม่โหลดอัตโนมัติ'
	repeat: string = 'โหลดอีกครั้ง'

	@Emit()
	repeatDownload(): string {
		return 'success'
	}
}
</script>

<style lang="scss" scoped>
@import './styles/_DownloadCard.scss';
</style>
