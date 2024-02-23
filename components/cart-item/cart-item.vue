<template>
	<view v-if="goods.product">
		<view class="goods-info">
			<checkbox-group class="check-box-group" @change="checkBoxChange">
				<checkbox style="transform: scale(0.7)" value="1" :checked="isSelected" />
			</checkbox-group>
			<image :src="goods.product.squareImage" />
			<view class="info-text-box" v-if="goods.product.price">
				<text class="info-title">{{goods.product.title}}</text>
				<view class="price-market">
					<text>￥{{goods.product.price.marketPrice}}</text>
					<text class="price-discount">{{goods.product.price.saleDiscount}}</text>
				</view>
				<view>
					<text class="price-info">￥{{goods.product.price.salePrice}}</text>
					<text class="price-label">{{goods.product.price.priceLabel}}</text>
				</view>
			</view>
			<view class="number-input-box">
				<view class="btn-action" @click="numberAction(0)">-</view>
				<input class="number-input" @blur="checkNumber" type="number" v-model="goods.number" />
				<view class="btn-action" @click="numberAction(1)">+</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "cart-item",
		props: {
			goods: {
				type: Object
			},
			isSelected: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {};
		},
		methods: {
			numberAction(type) {
				if (type == 1) {
					this.goods.number = this.goods.number + 1
				} else {
					if (this.goods.number - 1 <= 0) {
						uni.showToast({
							title: '至少选择1件',
							icon: 'error'
						})
						return
					}
					this.goods.number = this.goods.number - 1
				}
			},
			checkNumber() {
				if (this.goods.number <= 0) {
					this.goods.number = 1
				}
			},
			checkBoxChange(e) {
				const value = e.detail.value
				this.$emit("onItemSelectChange", value == 1, this.goods.id)
			}
		}
	}
</script>

<style lang="scss">
	.goods-info {
		padding: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		.check-box-group {
			flex: 1;
		}

		image {
			min-width: 160rpx;
			min-height: 160rpx;
			width: 160rpx;
			height: 160rpx;
			border-radius: 20rpx;
			flex: 1;
		}

		.info-text-box {
			flex: auto;
			height: 180rpx;
			padding-left: 10rpx;
			display: flex;
			flex-direction: column;

			text {
				font-size: 38rpx;
				color: #1d1d1f;
				margin-right: 10rpx;
			}

			.info-title {
				overflow: hidden;
				height: 60rpx;
				line-height: 60rpx;
			}

			.price-market {
				text {
					text-decoration: line-through;
					font-size: 28rpx;
					color: #8db8ff;
				}

				.price-discount {
					text-decoration: none;
					font-size: 32rpx;
				}
			}

			.price-label {
				font-size: 32rpx;
				color: #8db8ff;
				text-decoration: underline;
			}

			.price-info {
				font-size: 44rpx;
				color: #3782ff;
			}
		}

		.number-input-box {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 2rpx solid #8db8ff;
			width: 120rpx;
			height: 46rpx;

			.number-input {
				border-left: 2rpx solid #8db8ff;
				border-right: 2rpx solid #8db8ff;
				width: 60rpx;
				height: 46rpx;
				font-size: 24rpx;
				text-align: center;
			}

			.btn-action {
				width: 60rpx;
				height: 46rpx;
				text-align: center;
				line-height: 46rpx;
			}

			.btn-action:active {
				color: #f1f1f1;
				background-color: #8db8ff;
			}
		}
	}
</style>