<template>
	<view>
		<uni-search-bar @confirm="search(false)" v-model="searchValue" placeholder="搜索">
		</uni-search-bar>
	</view>
	<view class="content">
		<view v-if="searchData.length===0" style="display: flex; flex-direction: column; align-items: center;">
			<image src="/static/icon/no_content.svg" mode="heightFix" />
			<text style="color: #bfbfbf;">暂时没有相关商品</text>
		</view>
		<view class="goods-box">
			<view class="goods-card" v-for="(item,index) in searchData" :key="index">
				<goods-item :goods="item"></goods-item>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		searchProduct
	} from '/api/product'
	export default {
		data() {
			return {
				page: 1,
				pageSize: 12,
				searchValue: '',
				searchData: []
			}
		},
		onLoad(option) {
			this.searchValue = option.value
			this.search()
		},
		onReachBottom() {
			if (this.isLoading) return
			this.isLoading = true
			uni.showLoading({
				title: "加载中"
			})
			this.page = this.page + 1
			this.search(true)
		},
		methods: {
			search(more) {
				const param = {
					page: this.page,
					pageSize: this.pageSize,
					query: this.searchValue
				}
				searchProduct(param).then(resp => {
					const {
						data
					} = resp
					this.isLoading = false
					setTimeout(() => {
						uni.hideLoading()
					}, 200)
					this.searchData = more ? this.searchData.concat(data.content) : data.content
				})
			}
		}
	}
</script>

<style>
	.goods-box {
		margin-top: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;

		.goods-card {
			display: flex;
			flex-direction: column;
			width: 45%;
			padding: 10rpx;
		}
	}
</style>