<template>
	<label class="radio-container">
		{{ name }}
		<input type="radio" v-model="check" :value="value" />
		<span class="checkmark"></span>
	</label>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
	props: {
		name: {
			type: [String, Number],
			required: true
		},
		value: {
			type: [String, Number, Boolean],
			required: true
		},
		model: {
			type: [String, Number, Boolean],
			required: true
		}
	},
	setup(props, { emit }) {
		const check = computed({
			get(): string | number | boolean {
				return props.model
			},
			set(val: string | number | boolean): void {
				emit('update:model', val)
			}
		})
		return {
			check
		}
	}
})
</script>

<style lang="scss" scoped>
.radio-container {
	@extend %font-size-m;
	display: block;
	position: relative;
	padding-left: 20px;
	margin-bottom: 12px;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	&:not(:first-child) {
		margin-left: 16px;
	}
}

.radio-container input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}

.checkmark {
	position: absolute;
	top: 20%;
	left: 0;
	height: 12px;
	width: 12px;
	border: 1px solid $color-btn-accent;
}

.radio-container input:checked ~ .checkmark {
	background-color: var(--color-secondary);
	border-color: var(--color-secondary);
}

.checkmark:after {
	content: '';
	position: absolute;
	display: none;
}

.radio-container input:checked ~ .checkmark:after {
	display: block;
}

.radio-container .checkmark:after {
	color: var(--color-normal);
	left: 3px;
	top: 0;
	width: 5px;
	height: 9px;
	border: solid var(--color-normal);
	border-width: 0 1px 1px 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}
</style>
