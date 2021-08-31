<template>
	<v-tooltip top :disabled="!textOverflow">
		<template v-slot:activator="{ on, attrs }">
			<div
				ref="value"
				class="text-overflow cursor--default"
				v-bind="attrs"
				v-on="on"
				@mouseover="checkTextOverflow"
			>
				{{ value ? value : '-' }}
			</div>
		</template>
		<span>{{ tooltip ? tooltip : '-' }}</span>
	</v-tooltip>
</template>

<script>
export default {
	props: {
		value: {
			required: true,
			type: [String, Number]
		},
		tooltip: {
			required: true,
			type: [String, Number]
		}
	},
	data() {
		return {
			textOverflow: false
		}
	},
	methods: {
		checkTextOverflow(e) {
			const ref = this.$refs.value
			if (ref) {
				if (ref.scrollWidth > ref.offsetWidth) {
					this.textOverflow = true
				} else {
					this.textOverflow = false
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import './styles/_Tooltip.scss';
</style>
