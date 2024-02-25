<template>
	<view>
		<view class="address-box">
			<view v-for="(item,index) in addressList" :key="index">
				<address-item :address="item" />
			</view>
		</view>
		<view class="bottom-box">
			<button class="btn" type="warn">管理</button>
			<button class="btn btn-save" type="primary" @click="addNewAddress">添加收货地址</button>
		</view>
	</view>
</template>

<script>
	import {
		listAddress
	} from '/api/address'
	export default {
		data() {
			return {
				addressList: []
			}
		},
		onLoad() {
			this.fetchData()
		},
		onShow() {
			this.fetchData()
		},
		onPullDownRefresh() {
			this.fetchData()
			uni.showLoading({
				title: '加载中'
			})
			setTimeout(() => {
				uni.hideLoading()
				uni.stopPullDownRefresh()
			}, 5000)
		},
		methods: {
			fetchData() {
				listAddress().then(resp => {
					const {
						data
					} = resp
					this.addressList = data
					setTimeout(() => {
						uni.hideLoading()
						uni.stopPullDownRefresh()
					}, 200)
				})
			},
			addNewAddress() {
				uni.navigateTo({
					url: '/pages/ucenter/address/new-address/new-address'
				})
			}
		}
	}
</script>

<style lang="scss">
	.address-box {
		margin: 30rpx;
		margin-top: 10rpx;
		background-color: #fefefe;
		border-radius: 20rpx;
	}

	.bottom-box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fefefe;
		display: flex;

		.btn {
			margin: 20rpx;
			border-radius: 45rpx;
			width: 200rpx;
			height: 70rpx;
			line-height: 70rpx;
		}

		.btn-save {
			flex: auto;
		}
	}
</style>