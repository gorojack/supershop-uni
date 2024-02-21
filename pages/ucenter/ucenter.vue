<template>
	<view>
		<button @click="goLogin">登录页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goLogin() {
				uni.navigateTo({
					url: '/pages/ucenter/login/login'
				})
			}
		}
	}
</script>

<style>

</style>