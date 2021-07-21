<template>
	<v-row justify="center">
		<v-col sm="6" md="4" xl="3">
			<img src="~/assets/images/finno-logo.svg" />
			<div class="header__font">{{ header }}</div>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class BePFHeader extends Vue {
	header: string = 'BePrivateFund'
}
</script>

<style lang="scss" scoped>
@import './styles/_BePFHeader.scss';
</style>
