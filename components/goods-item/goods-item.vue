<template>
	<view class="goods-item-card" @click="goDetail">
		<image class="goods-image" :src="goods.smallImage" mode="aspectFill" />
		<text class="goods-item-title">{{goods.title}}</text>
		<text class="goods-item-price" v-if="goods.price">￥{{goods.price.salePrice}}</text>
	</view>
</template>

<script>
	export default {
		name: "goods-item",
		props: {
			goods: {
				type: Object
			}
		},
		data() {
			return {};
		},
		methods: {
			goDetail() {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?productId=' + this.goods.productId
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item-card {
		display: flex;
		flex-direction: column;
		width: 100%;

		.goods-item-title {
			font-weight: bold;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2;
			line-clamp: 2;
		}

		.goods-image {
			width: 100%;
			background-color: #fafafa;
		}

		.goods-item-title {
			padding: 4rpx;
			color: #1d1d1f;
		}

		.goods-item-price {
			font-size: 30rpx;
			color: #f26522;
		}
	}
</style>