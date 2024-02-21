<template>
	<view class="content">
		<scroll-view class="cate-box" scroll-y="true" scroll-bar="none">
			<view :class="currentCategoryId==item.categoryId?'item active':'item'" v-for="(item,index) in categoryList"
				:key="index" @click="switchCate(item)">
				{{item.categoryTitle}}
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" scroll-bar="none" style="flex:2; height:100vh" @scrolltolower="loadLoadMore">
			<view class="goods-box">
				<view v-if="goodsList.length===0" style="display: flex; flex-direction: column; align-items: center;">
					<image src="/static/icon/no_content.svg" mode="heightFix" />
					<text style="color: #bfbfbf;">暂时没有啦.</text>
				</view>
				<view class="goods-card" v-for="(item,index) in goodsList" v-if="goodsList.length!==0">
					<goods-item :goods="item" />
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getCategory
	} from '/api/category'
	import {
		getProductByNdCategoryId
	} from '/api/product'
	export default {
		data() {
			return {
				categoryList: [],
				scrollTop: 0,
				currentCategoryId: 0,
				currentPage: 1,
				goodsList: [],
				isLoading: false,
				total: 0
			};
		},
		onLoad() {
			this.fetchData()
		},
		methods: {
			async fetchData() {
				getCategory().then(resp => {
					const {
						data
					} = resp
					this.categoryList = data || []
					this.switchCate(this.categoryList[0])
				})
			},
			loadLoadMore() {
				if (this.goodsList.length >= this.total) {
					if (this.isLoading) return
					uni.showToast({
						title: '没有更多啦.',
						icon: 'none'
					})
					this.isLoading = true
					return
				}
				if (this.isLoading) return
				uni.showLoading({
					title: "加载中"
				})
				this.currentPage = this.currentPage + 1
				getProductByNdCategoryId({
					ndCateId: this.currentCategoryId,
					page: this.currentPage,
					pageSize: 10
				}).then(resp => {
					const {
						data
					} = resp
					this.isLoading = false
					setTimeout(() => {
						uni.hideLoading()
					}, 200)
					this.total = data.totalElements
					this.goodsList = this.goodsList.concat(data.content)
				})
			},
			switchCate(e) {
				this.currentCategoryId = e.categoryId
				this.goodsList = []
				this.isLoading = true
				uni.showLoading({
					title: "加载中"
				})
				getProductByNdCategoryId({
					ndCateId: this.currentCategoryId,
					page: this.currentPage,
					pageSize: 10
				}).then(resp => {
					const {
						data
					} = resp
					this.isLoading = false
					setTimeout(() => {
						uni.hideLoading()
					}, 200)
					this.total = data.totalElements
					this.goodsList = data.content
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: row;

		.cate-box {
			width: 200rpx;
			height: 100vh;
			background-color: #fafafa;

			.item {
				text-align: center;
				line-height: 90rpx;
				width: 200rpx;
				height: 90rpx;
				color: #333;
				font-size: 28rpx;
			}

			.active {
				color: #ff3456;
				font-weight: bold;
				font-size: 28rpx;
			}
		}

		.goods-box {
			margin-top: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;

			.goods-card {
				display: flex;
				flex-direction: column;
				width: 45%;
				padding: 10rpx;
			}
		}
	}
</style>