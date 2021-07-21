<template>
	<v-card class="mx-auto" max-width="100%">
		<v-card-text>
			<div class="mb-7">
				<div class="v-card__text--topic">{{ card.topic }}</div>
				<div class="v-card__text--email">{{ card.subTopic }}</div>
			</div>

			<TextField
				v-for="(item, index) in card.textField"
				:key="index"
				:input.sync="item.value"
				:text-field="item"
			/>

			<div class="v-card__text--error-message">{{ card.info }}</div>
		</v-card-text>

		<v-card-actions class="v-card__actions--container">
			<v-btn small class="v-card__actions--button" color="#ffcc00" @click="submit">{{ card.button }}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'nuxt-property-decorator'
import { IFormsCardState } from '../FormsCard/model'

@Component
export default class FormsCard extends Vue {
	@Prop({ required: true }) card!: IFormsCardState

	@Emit()
	submit(): string {
		return 'success'
	}
}
</script>

<style lang="scss" scoped>
@import './styles/_FormsCard.scss';
</style>
