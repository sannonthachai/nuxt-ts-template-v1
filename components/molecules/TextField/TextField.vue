<template>
	<div>
		<div class="text-field__label">{{ textField.label }}</div>
		<div v-if="textField.info" class="text-field__info">{{ textField.info }}</div>
		<v-text-field
			ref="input"
			v-model="value"
			:rules="textField.rules"
			:type="textField.type"
			:color="textField.color"
			:error-messages="textField.errorMessage"
			class="mt-2"
			maxlength="255"
			dense
			outlined
		></v-text-field>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Ref, InjectReactive, Watch } from 'nuxt-property-decorator'
import { ITextFieldState } from './model'

@Component
export default class TextField extends Vue {
	@Prop({ required: true }) textField!: ITextFieldState
	@PropSync('input', { type: String }) value!: string
	@InjectReactive() vTextFieldTrigger!: number

	@Ref('input') readonly textFieldRef!: any

	@Watch('vTextFieldTrigger')
	validateTextField() {
		this.textFieldRef.validate(true)
	}
}
</script>

<style lang="scss" scoped>
@import './styles/_TextField.scss';
</style>
