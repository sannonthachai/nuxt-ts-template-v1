<template>
	<v-app class="background">
		<v-main>
			<v-container>
				<nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
.background {
	background: #e9e9e9;
}
</style>
