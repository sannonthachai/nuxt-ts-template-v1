<template>
	<v-card class="mx-auto" max-width="100%">
		<v-card-text>
			<v-container>
				<v-row align="center" class="v-card__text--container">
					<v-col>
						<div class="text-center">
							<v-icon class="v-card__text--icon">{{ card.icon }}</v-icon>
							<div class="v-card__text--topic">{{ card.topic }}</div>
							<div>{{ card.info }}</div>
							<slot name="additional"></slot>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IStatusCardState } from './model'

@Component
export default class StatusCard extends Vue {
	@Prop({ required: true }) card!: IStatusCardState
}
</script>

<style lang="scss" scoped>
@import './styles/_StatusCard.scss';
</style>
