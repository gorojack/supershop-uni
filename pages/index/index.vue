<template>
	<view>
		<uni-search-bar @confirm="search" placeholder="搜索">
		</uni-search-bar>
	</view>
	<uni-swiper-dot :info="bannerList" :current="current" field="content" mode="round" :dots-styles="{
						backgroundColor: 'rgba(83, 200, 249,0.3)',
						border: '1px rgba(83, 200, 249,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
						selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
					}">
		<image class="banner-holder" src="/static/icon/image_error.svg" v-if="bannerList.length===0" />
		<swiper class="swiper-box" @change="change" autoplay circular duration="300" interval="3000"
			v-if="bannerList.length!==0">
			<swiper-item v-for="(item, index) in bannerList" :key="index">
				<image style="width: 100%" :src="item.imageUrl" mode="aspectFill" @click="bannerClickHandle(item)" />
			</swiper-item>
		</swiper>
	</uni-swiper-dot>
	<view class="content">
		<view class="recommend-cate-box">
			<view class="recommend-cate-card" v-for="(item, index) in recommendCategories" :key="index"
				@click="recommendClickHandle(item)">
				<image :src="item.imageUrl" />
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="recommend-goods-box">
			<view class="recommend-goods-card" v-for="(item,index) in recommendGoods" :key="index">
				<goods-item :goods="item"></goods-item>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBanner
	} from '/api/service'
	import {
		getRecommendCategory
	} from '/api/category'
	import {
		getRecommendProduct
	} from '/api/product'
	export default {
		data() {
			return {
				bannerList: [],
				current: 0,
				recommendCategories: [],
				recommendGoods: [],
				isLoading: false
			}
		},
		onLoad() {
			this.fetchData()
		},
		onPullDownRefresh() {
			this.fetchData()
		},
		onReachBottom() {
			if (this.isLoading) return
			this.isLoading = true
			uni.showLoading({
				title: "加载中"
			})
			getRecommendProduct().then(resp => {
				const {
					data
				} = resp
				this.isLoading = false
				setTimeout(() => {
					uni.hideLoading()
				}, 200)
				this.recommendGoods = this.recommendGoods.concat(data)
			})
		},
		methods: {
			async fetchData() {
				let promises = []
				let banner = getBanner().then(resp => {
					const {
						data
					} = resp
					this.bannerList = data || []
				})
				let category = getRecommendCategory().then(resp => {
					const {
						data
					} = resp
					this.recommendCategories = data || []
				})
				let product = getRecommendProduct().then(resp => {
					const {
						data
					} = resp
					this.recommendGoods = data || []
				})
				promises.push(banner, category, product)
				await Promise.allSettled(promises)
				uni.stopPullDownRefresh()
			},
			search() {},
			change(e) {
				this.current = e.detail.current;
			},
			bannerClickHandle(e) {
				uni.showToast({
					title: e.title,
					icon: 'none',
					bottom: 'bottom'
				})
			},
			recommendClickHandle(e) {
				uni.showToast({
					title: e.title,
					icon: 'none',
					bottom: 'bottom'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.banner-holder {
		width: 100%;
		height: 400rpx;
	}

	.swiper-box {
		width: 100%;
		height: calc(80vw * 9 / 16);
	}

	swiper-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		color: #fff;
	}

	.recommend-cate-box {
		margin-top: 10rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.recommend-cate-card {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 64rpx;
				height: 64rpx;
			}

			text {
				font-size: 24rpx;
				font-weight: bold;
			}
		}
	}

	.recommend-goods-box {
		margin-top: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;

		.recommend-goods-card {
			display: flex;
			flex-direction: column;
			width: 45%;
			padding: 10rpx;
		}
	}
</style>