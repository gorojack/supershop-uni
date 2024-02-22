<template>
	<view class="user-info" @click="goLogin">
		<image :src="userInfo?userInfo.avatar:'/static/icon/default_avatar.svg'" />
		<text>{{userInfo?userInfo.nickname:'点击登录'}}</text>
		<uni-icons class="right-arrow" type="right" style="color:#8f8f8f" />
	</view>
	<view class="divider" />
	<view class="order-info">
		<uni-section title="订单" type="line">
			<template v-slot:right>
				<view style="color:#8f8f8f;" @click="goOrder(0)">查看全部订单 <uni-icons type="arrow-right" style="color:#8f8f8f" />
				</view>
			</template>
			<view class="divider" />
			<view class="order-info-list">
				<view @click="goOrder(1)">
					<uni-badge class="order-info-item" text="2" absolute="rightTop" :offset="badgeOffset">
						<image src="/static/icon/pay.svg" />
						<text>待支付</text>
					</uni-badge>
				</view>
				<view @click="goOrder(2)">
					<uni-badge class="order-info-item" text="2" absolute="rightTop" :offset="badgeOffset">
						<image src="/static/icon/send.svg" />
						<text>待发货</text>
					</uni-badge>
				</view>
				<view @click="goOrder(3)">
					<uni-badge class="order-info-item" text="2" absolute="rightTop" :offset="badgeOffset">
						<image src="/static/icon/no_signed.svg" />
						<text>待签收</text>
					</uni-badge>
				</view>
			</view>
		</uni-section>
	</view>
	<view class="divider" />
	<view class="settings">
		<uni-list>
			<uni-list-item class="list-item" showArrow clickable title="地址管理" @click="goLocation">
				<template v-slot:header>
					<image src="/static/icon/location.svg" />
				</template>
			</uni-list-item>
			<uni-list-item class="list-item" showArrow clickable title="关于" @click="goAbout">
				<template v-slot:header>
					<image src="/static/icon/hint.svg" />
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from '/api/user'
	import {
		getToken
	} from '/utils/auth'
	export default {
		data() {
			return {
				userInfo: {},
				badgeOffset: [6, 2]
			}
		},
		onLoad() {},
		onShow() {
			this.fetchData()
		},
		methods: {
			fetchData() {
				if (!getToken()) return
				getUserInfo().then(resp => {
					const {
						data
					} = resp
					this.userInfo = data
					localStorage.setItem('currentUser', data)
				})
			},
			goLogin() {
				uni.navigateTo({
					url: '/pages/ucenter/login/login'
				})
			},
			goOrder(type) {
				// TODO goOrder
			},
			goLocation() {
				// TODO goLocation
			},
			goAbout() {
				// TODO goAbout
			}
		}
	}
</script>

<style lang="scss">
	.user-info {
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		height: 120rpx;

		image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}

		text {
			margin-left: 20rpx;
			font-size: 38rpx;
			color: #1d1d1f;
		}

		.right-arrow {
			margin-left: auto;
		}
	}

	.divider {
		background: #E0E3DA;
		width: 90%;
		height: 1rpx;
		margin: 1rpx auto;
	}

	.order-info {
		margin-top: 60rpx;

		.order-info-list {
			display: flex;
			justify-content: space-between;
			padding: 32rpx 48rpx;

			.order-info-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 0 40rpx;

				image {
					width: 64rpx;
					height: 64rpx;
				}

				text {
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}
	}

	.settings {
		margin-top: 60rpx;

		.list-item {
			line-height: 42rpx;

			image {
				width: 42rpx;
				height: 42rpx;
				margin-right: 16rpx;
			}
		}
	}
</style>