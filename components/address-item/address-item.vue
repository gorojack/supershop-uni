<template>
	<view class="address-item-box" v-if="address">
		<view class="avatar">
			{{address.addressee}}
		</view>
		<view class="info-box">
			<view class="addressee-info">
				<text class="addressee-text">{{address.addressee}}</text>
				<text class="phone-text">{{address.phone}}</text>
				<uni-tag class="default-tag" v-if="address.isDefault" text="默认" type="primary" size="mini" />
			</view>
			<view class="address">
				{{address.fullName}} {{address.fullAddress}}
			</view>
		</view>
		<view class="btn-edit">
			<uni-icons type="compose" size="24" @click="edit"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name: "address-item",
		props: {
			address: {
				type: Object
			}
		},
		data() {
			return {};
		},
		methods: {
			edit() {
				uni.navigateTo({
					url: '/pages/ucenter/address/new-address/new-address',
					success: (res) => {
						res.eventChannel.emit('acceptAddress', this.address)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.address-item-box {
		display: flex;
		align-items: center;
		padding: 10rpx;

		.avatar {
			border-radius: 100%;
			background-color: #007aff;
			min-width: 100rpx;
			min-height: 100rpx;
			width: 100rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 42rpx;
			color: #fefefe;
			font-weight: bold;
			overflow: hidden;
		}

		.info-box {
			margin-left: 20rpx;
			margin-right: 60rpx;
			flex: auto;
			padding: 5rpx;

			.addressee-info {
				height: 50rpx;
				line-height: 50rpx;

				.addressee-text {
					font-size: 42rpx;
				}

				.phone-text {
					margin-left: 10rpx;
					color: #2f2f2f;
				}

				.default-tag {
					margin-left: 10rpx;
				}
			}
		}

		.address {
			color: #707070;
		}

		.btn-edit {
			margin: 5rpx;
		}
	}
</style>