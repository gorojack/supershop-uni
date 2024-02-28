<template>
	<view class="order-item" v-if="order.product">
		<view class="goods-info">
			<view class="goods-cover">
				<image class="goods-image" :src="order.product.squareImage" />
			</view>
			<view class="goods-info-text">
				<view>{{order.product.title}}</view>
				<view>sku info</view>
			</view>
			<view class="goods-price-info" v-if="order.product.price">
				<view class="goods-price-text">￥{{parseFloat(order.product.price.salePrice).toFixed(2)}}</view>
				<view class="goods-number-text">x{{order.number}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "order-item",
		props: {
			order: {
				type: Object
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.goods-info {
		display: flex;

		.goods-image {
			max-width: 200rpx;
			max-height: 200rpx;
			border-radius: 20rpx;
		}

		.goods-info-text {
			padding: 10rpx;
			overflow: hidden;
			white-space: nowrap;
		}

		.goods-price-info {
			padding: 10rpx;
			text-align: center;

			.goods-price-text {
				font-weight: bold;
			}

			.goods-number-text {
				font-size: 32rpx;
				color: #848484;
			}
		}
	}
</style>