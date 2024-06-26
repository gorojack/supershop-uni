<template>
	<view>
		<uni-nav-bar class="nav-bar" status-bar="true" title="购物车">
			<block v-slot:left>
				<view>
					<button class="nav-left-btn" :type="manageMode?'warn':'primary'" size="mini"
						@click="switchMode">{{manageMode?'退出':'管理'}}</button>
				</view>
			</block>
		</uni-nav-bar>
	</view>
	<view class="content">
		<view class="brand-cate" v-for="(value,key) in cartMap" :key="key">
			<view class="brand-info">
				<checkbox-group @change="selectBrand($event,value[0].split(';')[0])">
					<checkbox value="1" style="transform: scale(0.7)" :checked="hasBrandSelected(value[0].split(';')[0])" />
				</checkbox-group>
				<text class="brand-title">{{value[0].split(';')[1]}}</text>
				<uni-icons type="right" size="16" />
			</view>
			<view v-for="(item,index) in value[1]" :key="index">
				<cart-item :goods="item" @onItemSelectChange="itemSelectChange" :isSelected="hasSelected(item.id)" />
			</view>
		</view>
	</view>
	<view class="goods-carts" :key="new Date().getTime()">
		<cart-nav @selectAll="selectAll" :selectedAll="isSelectedAll" :totalPrice="totalPrice" :manageMode="manageMode"
			@navButtonClick="onNavButtonClick"></cart-nav>
	</view>
</template>

<script>
	import {
		getCart,
		deleteCart
	} from '/api/cart'
	export default {
		data() {
			return {
				page: 1,
				cartMap: new Map(),
				selectedIds: new Set(),
				allIds: [],
				isSelectedAll: false,
				manageMode: false
			}
		},
		onShow() {
			this.fetchData()
		},
		onPullDownRefresh() {
			this.fetchData()
			this.selectedIds.clear()
			this.isSelectedAll = false
			uni.showLoading({
				title: '加载中'
			})
		},
		computed: {
			totalPrice() {
				let price = 0
				this.cartMap.forEach((value, key) => {
					value.forEach(item => {
						if (this.selectedIds.has(item.id)) {
							price += Number(item.product.price.salePrice * item.number)
						}
					})
				})
				return price
			}
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
						if (item.product) {
							this.allIds.push(item.id)
							const key = `${item.product.brandId};${item.product.brandShowName}`
							if (map.has(key)) {
								map.get(key).push(item)
							} else {
								map.set(key, [item])
							}
						}
					})
					this.cartMap = map
				})
				promises.push(_getCart)
				await Promise.allSettled(promises)
				setTimeout(() => {
					uni.hideLoading()
					uni.stopPullDownRefresh()
				}, 200)
				this.manageMode = false
			},
			selectAll(isSelectAll) {
				if (isSelectAll) {
					this.cartMap.forEach((value, key) => {
						value.forEach(item => {
							this.selectedIds.add(item.id)
						})
					})
				} else {
					this.selectedIds.clear()
				}
				this.isSelectedAll = isSelectAll
			},
			selectBrand(e, brandId) {
				const isSelected = e.detail.value == 1
				this.cartMap.forEach((value, key) => {
					value.forEach(item => {
						if (item.product.brandId == brandId) {
							if (isSelected)
								this.selectedIds.add(item.id)
							else
								this.selectedIds.delete(item.id)
						}
					})
				})
				this.checkSelectAll()
			},
			onNavButtonClick() {
				if (this.manageMode) {
					if (this.selectedIds.size == 0) {
						uni.showToast({
							title: '未选择任何商品',
							icon: 'error'
						})
						return
					}
					uni.showModal({
						title: '提示',
						content: `确定要删除${this.selectedIds.size}个商品吗`,
						success: (res) => {
							if (res.confirm) {
								deleteCart(Array.from(this.selectedIds)).then(resp => {
									uni.showToast({
										title: resp.msg
									})
									this.fetchData()
									this.selectAll(false)
								})
							}
						}
					})
				} else {
					uni.navigateTo({
						url: '/pages/order/create-order/create-order',
						success: (res) => {
							res.eventChannel.emit('acceptCartIds', Array.from(this.selectedIds))
						}
					})
				}
			},
			itemSelectChange(selected, id) {
				if (selected) {
					this.selectedIds.add(id)
				} else {
					this.selectedIds.delete(id)
				}
				this.checkSelectAll()
			},
			hasSelected(id) {
				return this.selectedIds.has(id)
			},
			hasBrandSelected(brandId) {
				const idArr = []
				this.cartMap.forEach((value, key) => {
					if (key.split(';')[0] == brandId) {
						value.forEach(item => {
							idArr.push(item.id)
						})
					}
				})
				return idArr.every(item => this.selectedIds.has(item));
			},
			checkSelectAll() {
				this.isSelectedAll = this.allIds.every(item => this.selectedIds.has(item))
			},
			switchMode() {
				this.manageMode = !this.manageMode
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

	.nav-left-btn {
		width: 130rpx;
		line-height: 60rpx;
	}
</style>