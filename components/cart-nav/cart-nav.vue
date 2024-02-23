<template>
	<view class="cart-nav">
		<uni-list-item>
			<template v-slot:header>
				<checkbox-group @change="checkBoxChange">
					<checkbox style="transform: scale(0.8)" value="1" :checked="selectedAll">全选</checkbox>
				</checkbox-group>
			</template>
			<template v-slot:footer>
				<view class="total-price">
					<text class="label-text">总价</text>
					<text class="price-text">￥{{parseFloat(totalPrice).toFixed(2)}}</text>
				</view>
				<button class="btn-buy" type="primary" size="mini" @click="btnClick">立即购买</button>
			</template>
		</uni-list-item>
	</view>
</template>

<script>
	export default {
		name: "cart-nav",
		props: {
			selectedAll: {
				type: Boolean,
				default: false
			},
			totalPrice: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {};
		},
		methods: {
			checkBoxChange(e) {
				const value = e.detail.value
				this.$emit("selectAll", value == 1)
			},
			btnClick() {
				this.$emit("navButtonClick")
			}
		}
	}
</script>

<style lang="scss">
	.cart-nav {
		height: 100rpx;
		width: 100%;
		background-color: #fefefe;
		border-radius: 24rpx 0 0 24rpx;

		.total-price {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-right: 20rpx;

			.label-text {
				font-size: 24rpx;
			}

			.price-text {
				font-size: 32rpx;
				color: #3782ff;
			}
		}

		.btn-buy {
			width: 180rpx;
			height: 56rpx;
			line-height: 56rpx;
			font-size: 32rpx;
			padding: 0;
			border-radius: 45rpx;
		}
	}
</style>