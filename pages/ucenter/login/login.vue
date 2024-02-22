<template>
	<view class="login">
		<view class="login-title">登录</view>
		<view class="login-content">
			<view class="login-username">
				<i class="el-icon-user"></i>
				<input type="text" placeholder="请输入账号" v-model="username">
			</view>
			<view class="login-password">
				<i class="el-icon-key"></i>
				<input type="password" placeholder="请输入密码" v-model="password">
			</view>
		</view>
		<view class="button">
			<button @click="onSubmit">登录</button>
		</view>
		<view class="login-button">
			<view class="login-password" @click="resetPassword">找回密码</view>
			<span>|</span>
			<view class="login-registration" @click="registration">注册账号</view>
		</view>
		<view class="login-other">
			<view class="login-top">
				其他登录方式
			</view>
			<view class="login-icon">
				<image src="/static/icon/QQ.svg" mode="widthFix" @click="loginOther('qq')"></image>
				<image src="/static/icon/WeChat.svg" mode="widthFix" @click="loginOther('wechat')"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				rules: {
					phone: [{
						required: true,
						message: '请输入手机号',
						rule: '/^1[23456789]\d{9}$/'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			onSubmit() {
				if (this.username == '' || this.password == '') {
					uni.showToast({
						title: "账号和密码不能为空",
						icon: "none"
					})
				} else {
					let data = {
						phone: this.username,
						password: this.password
					}
					// TODO login
				}
			},
			registration() {
				uni.navigateTo({
					url: '/pages/ucenter/registration/registration'
				});
			},
			resetPassword() {
				// TODO reset password
			},
			loginOther(type) {
				// TODO login other
			}
		}
	};
</script>

<style lang="less">
	.login {
		background-color: #fff;
		width: 100%;
		background-position: center;
		background-size: cover;
		margin: 0px;

		.login-title {
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

		.login-content {
			.login-username {
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

			.login-password {
				display: flex;
				align-items: center;
				margin: 0 50rpx;
				border-bottom: 1rpx solid gainsboro;
				margin-top: 50rpx;

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

		.login-button {
			display: flex;
			justify-content: center;
			margin-top: 100rpx;

			.login-password {
				padding: 0 15rpx;
				color: #1296db;
			}

			.login-registration {
				padding: 0 15rpx;
				color: #1296db;
			}
		}

		.login-other {
			position: absolute;
			bottom: 100rpx;
			left: 37%;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.login-top {
				text-align: center;
			}

			.login-icon {
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
