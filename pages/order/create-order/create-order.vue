<template>
	<view class="content">
		<view class="address-box">
			<address-item :address="orderConfirm.address" />
			<view class="btn-change-address" @click="btnChooseClick">选择其他地址</view>
		</view>
		<view class="brand-cate" v-for="(value,key) in orderConfirm.brands" :key="key">
			<view class="brand-info">
				<text class="brand-title">{{value[0].split(';')[1]}}</text>
				<uni-icons type="right" size="16" />
			</view>
			<view v-for="(item,index) in value[1]" :key="index">
				<cart-item :goods="item" :showCheck="false" />
			</view>
			<view class="order-comment">
				<uni-list>
					<uni-list-item title="订单备注" showArrow clickable rightText="无备注" @click="btnCommentClick" />
				</uni-list>
			</view>
		</view>
	</view>
	<view class="goods-carts" :key="new Date().getTime()">
		<cart-nav :totalPrice="totalPrice" :showCheck="false" :buttonText="'提交订单'"
			@navButtonClick="onNavButtonClick"></cart-nav>
	</view>
</template>

<script>
	import {
		createOrder,
		confirmOrder
	} from '/api/order'
	export default {
		data() {
			return {
				orderConfirm: {}
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中'
			})
			const channel = this.getOpenerEventChannel()
			channel.on('acceptCartIds', (data) => {
				confirmOrder(data).then(resp => {
					const {
						data
					} = resp
					this.orderConfirm = data
					this.orderConfirm.brands = new Map(Object.entries(this.orderConfirm.brands))
					uni.hideLoading()
				})
			})
		},
		computed: {
			totalPrice() {
				let price = 0
				if (!this.orderConfirm.brands) return 0
				this.orderConfirm.brands.forEach((value, key) => {
					value.forEach(item => {
						price += Number(item.product.price.salePrice * item.number)
					})
				})
				return price
			}
		},
		methods: {
			btnChooseClick() {
				// TODO choose other address
			},
			onNavButtonClick() {
				// TODO submit order
			},
			btnCommentClick() {
				// TODO comment
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 20rpx;

		.address-box {
			background-color: #ffffff;
			border-radius: 40rpx;
			padding: 20rpx;
		}

		.btn-change-address {
			text-align: center;
			margin-top: 10rpx;
			color: #848484;
		}

		.brand-cate {
			background-color: #ffffff;
			margin-top: 40rpx;
			border-radius: 40rpx;
		}

		.brand-info {
			padding: 20rpx;
			padding-bottom: 0;
			display: flex;
			align-items: center;

			.brand-title {
				font-size: 32rpx;
			}
		}

		.order-comment {
			border-bottom: 40rpx;
		}
	}

	.goods-carts {
		position: fixed;
		left: 0;
		right: 0;
		bottom: var(--window-bottom, 0);
		z-index: 99;
	}
</style>