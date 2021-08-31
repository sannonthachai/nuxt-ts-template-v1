<template>
	<label class="checkbox-container">
		{{ name }}
		<input type="checkbox" @input="check" :checked="checked" v-bind="$attrs" />
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
			type: [String, Number],
			required: true
		},
		model: {
			type: Array,
			required: true
		}
	},
	setup(props, { emit }) {
		const checked = computed(() => props.model.includes(props.value))

		function check() {
			let updatedModel = [...props.model]
			if (checked.value) updatedModel.splice(updatedModel.indexOf(props.value), 1)
			else updatedModel.push(props.value)
			emit('update:model', updatedModel)
		}

		return {
			checked,
			check
		}
	}
})
</script>

<style lang="scss" scoped>
.checkbox-container {
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

.checkbox-container input {
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

.checkbox-container input:checked ~ .checkmark {
	background-color: var(--color-secondary);
	border-color: var(--color-secondary);
}

.checkmark:after {
	content: '';
	position: absolute;
	display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
	display: block;
}

.checkbox-container .checkmark:after {
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
