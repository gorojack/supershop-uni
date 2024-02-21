<template>
	<view>
		<uni-forms ref="loginForm" :modelValue="loginForm">
			<uni-forms-item label="用户名" required>
				<uni-easyinput v-model="loginForm.username" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item label="密码" required>
				<uni-easyinput v-model="loginForm.password" placeholder="请输入密码" />
			</uni-forms-item>
			<button @click="doLogin">登录</button>
		</uni-forms>
	</view>
</template>

<script>
	import {
		login
	} from '/api/user'
	export default {
		data() {
			return {
				loginForm: {}
			}
		},
		methods: {
			doLogin() {
				login(this.loginForm).then(resp => {
					console.log(resp)
				})
			}
		}
	}
</script>

<style>

</style>