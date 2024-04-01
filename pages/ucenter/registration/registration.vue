<template>
	<view class="register">
		<view class="register-title">注册</view>
		<view class="register-content">
			<view class="register-input-item">
				<i class="el-icon-user"></i>
				<input type="text" placeholder="输入用户名" v-model="username" @blur="usernameBlur" />
			</view>
			<view class="register-input-item">
				<i class="el-icon-key"></i>
				<input type="password" placeholder="确认密码" v-model="password">
			</view>
			<view class="register-input-item">
				<i class="el-icon-key"></i>
				<input placeholder="请输入邮箱" v-model="email">
			</view>
			<view class="register-input-item">
				<i class="el-icon-key"></i>
				<input type="password" placeholder="输入验证码" v-model="code">
				<button type="primary" size="mini" style="max-height: 60rpx; width: 160rpx; padding 0;" @click="getCode"
					:disabled="countdown!=60">{{countdown!=60?countdown:"获取"}}</button>
			</view>
		</view>
		<view class="button">
			<button @click="onSubmit">注册</button>
		</view>
		<view class="register-button">
			<view style="padding: 0 15rpx;">已有账号?</view>
			<span>|</span>
			<view class="register-tologin" @click="toLogin">立即登录</view>
		</view>
	</view>
</template>

<script>
	import {
		register,
		checkUsername,
		code
	} from '/api/user'
	import {
		setToken
	} from '/utils/auth'
	export default {
		data() {
			return {
				username: '',
				password: '',
				email: '',
				code: '',
				countdown: 60
			};
		},
		methods: {
			onSubmit() {
				if (this.username == '' || this.password == '' || this.email == '' || this.code == '') {
					uni.showToast({
						title: "输入不能为空",
						icon: "none"
					})
				} else {
					let data = {
						username: this.username,
						password: this.password,
						email: this.email,
						code: this.code
					}
					register(data).then(resp => {
						const {
							data
						} = resp
						console.log(resp)
						uni.switchTab({
							url: '/pages/ucenter/ucenter'
						})
					})
				}
			},
			toLogin() {
				uni.navigateBack()
			},
			usernameBlur() {
				checkUsername({
					username: this.username
				}).then(resp => {
					console.log(resp)
				})
			},
			getCode() {
				const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
				if (pattern.test(this.email)) {
					code({
						email: this.email
					}).then(resp => {
						if (resp.code == 1000) {
							uni.showToast({
								title: "验证码已发送",
								icon: "none"
							})
							var id = setInterval(() => {
								this.countdown -= 1
								console.log(this.countdown)
								if (this.countdown == 0) {
									this.countdown = 60
									clearInterval(id)
								}
							}, 1000)
						}
						console.log(resp)
					})
				} else {
					uni.showToast({
						title: "邮箱格式错误",
						icon: "none"
					})
				}
			}
		}
	};
</script>

<style lang="less">
	.register {
		width: 100%;
		background-position: center;
		background-size: cover;
		margin: 0px;

		.register-title {
			padding-top: 150rpx;
			display: flex;
			justify-content: flex-start;
			margin-left: 50rpx;
			font-weight: 700;
			font-size: 40rpx;
			color: #1296db;
			letter-spacing: 5rpx;
			margin-bottom: 50rpx;
		}

		.register-content {
			.register-input-item {
				display: flex;
				align-items: center;
				margin: 0 50rpx;
				border-bottom: 1rpx solid gainsboro;

				input {
					padding: 10rpx;
					height: 60rpx;
					width: 80%;
				}

				i {
					color: #1296db;
					padding-right: 20rpx;
					font-size: 50rpx;
				}
			}
		}

		.button {
			margin-top: 120rpx;

			button {
				background-color: #1296db;
				width: 90%;
				height: 85rpx;
				text-align: center;
				line-height: 85rpx;
				color: #fff;
			}
		}

		.register-button {
			display: flex;
			justify-content: center;
			margin-top: 100rpx;

			.register-tologin {
				padding: 0 15rpx;
				color: #1296db;
			}
		}

		.register-other {
			position: absolute;
			bottom: 100rpx;
			left: 37%;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.register-top {
				text-align: center;
			}

			.register-icon {
				display: flex;
				justify-content: space-between;
				margin-top: 50rpx;

				image {
					width: 80rpx;
				}
			}
		}
	}
</style>