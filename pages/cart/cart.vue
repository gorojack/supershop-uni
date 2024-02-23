<template>
	<view class="content">
		<view class="brand-cate" v-for="(value,key) in cartMap" :key="key">
			<view class="brand-info">
				<checkbox-group @change="selectBrand(value[0].split(';')[0])">
					<checkbox value="1" style="transform: scale(0.7)" />
				</checkbox-group>
				<text class="brand-title">{{value[0].split(';')[1]}}</text>
				<uni-icons type="right" size="16" />
			</view>
			<view v-for="(item,index) in value[1]" :key="index">
				<cart-item :goods="item" @onItemSelectChange="itemSelectChange" />
			</view>
		</view>
	</view>
	<view class="goods-carts">
		<cart-nav @selectAll="selectAll" @navButtonClick="buyNow"></cart-nav>
	</view>
</template>

<script>
	import {
		getCart
	} from '/api/cart'
	export default {
		data() {
			return {
				page: 1,
				cartMap: {},
			}
		},
		onShow() {
			this.fetchData()
		},
		onPullDownRefresh() {
			this.fetchData()
			uni.showLoading({
				title: '加载中'
			})
		},
		methods: {
			async fetchData() {
				let promises = []
				const _getCart = getCart().then(resp => {
					const {
						data
					} = resp
					const map = new Map()
					data.forEach(item => {
						const key = `${item.product.brandId};${item.product.brandShowName}`
						if (map.has(key)) {
							map.get(key).push(item)
						} else {
							map.set(key, [item])
						}
					})
					this.cartMap = map
					console.log(this.cartMap)
				})
				promises.push(_getCart)
				await Promise.allSettled(promises)
				setTimeout(() => {
					uni.hideLoading()
					uni.stopPullDownRefresh()
				}, 200)
			},
			selectAll(isSelectAll) {
				console.log(isSelectAll)
			},
			selectBrand(brandId) {
				console.log('selectBrand: ' + brandId)
			},
			buyNow() {
				console.log('buy now')
			},
			itemSelectChange(selected, skuId) {
				console.log('selectChange:' + selected + ' ' + skuId)
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: 100rpx;
	}

	.brand-cate {
		margin: 20rpx 20rpx 30rpx 20rpx;
		padding: 20rpx;
		background-color: #ffffff;
		border-radius: 40rpx;
	}

	.brand-info {
		display: flex;
		align-items: center;

		.brand-title {
			font-size: 32rpx;
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