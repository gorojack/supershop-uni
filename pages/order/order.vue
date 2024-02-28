<template>
	<view>
		<view class="nav-tab">
			<uni-segmented-control :current="currentIndex" :values="items" style-type="text" active-color="#007aff"
				@clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="currentIndex === 0">
				<view v-if="orderMap.length==0" class="empty-order">
					<image src="/static/icon/no_content.svg" mode="heightFix" />
					<text style="color: #bfbfbf;">暂时没有啦.</text>
				</view>
				<view class="order-info" v-for="(value,key) in orderMap" :key="key">
					<view class="brand-info">
						<text class="brand-title">{{value[0].split(';')[1]}}</text>
						<uni-icons type="right" size="16" />
					</view>
					<view v-for="(item,index) in value[1]" :key="index">
						<order-item :order="item" />
					</view>
					<view class="goods-nav">
						<view v-if="value[1][0].status==1">
							<button class="btn-nav" type="primary" size="mini">取消订单</button>
							<button class="btn-nav" type="primary" size="mini">修改信息</button>
							<button class="btn-nav" type="primary" size="mini">立即支付</button>
						</view>
						<view v-if="value[1][0].status==2">
							<button class="btn-nav" type="primary" size="mini">催发货</button>
							<button class="btn-nav" type="primary" size="mini">修改地址</button>
						</view>
						<view v-if="value[1][0].status==3">
							<button class="btn-nav" type="primary" size="mini">延长收货</button>
							<button class="btn-nav" type="primary" size="mini">查看物流</button>
							<button class="btn-nav" type="primary" size="mini">确认收货</button>
						</view>
					</view>
				</view>
			</view>
			<view v-if="currentIndex === 1">
				<view v-if="orderMap.length==0" class="empty-order">
					<image src="/static/icon/no_content.svg" mode="heightFix" />
					<text style="color: #bfbfbf;">暂时没有啦.</text>
				</view>
				<view class="order-info" v-for="(value,key) in orderMap" :key="key">
					<view class="brand-info">
						<text class="brand-title">{{value[0].split(';')[1]}}</text>
						<uni-icons type="right" size="16" />
					</view>
					<view v-for="(item,index) in value[1]" :key="index">
						<order-item :order="item" />
					</view>
					<view class="goods-nav">
						<button class="btn-nav" type="primary" size="mini">取消订单</button>
						<button class="btn-nav" type="primary" size="mini">修改信息</button>
						<button class="btn-nav" type="primary" size="mini">立即支付</button>
					</view>
				</view>
			</view>
			<view v-if="currentIndex === 2">
				<view v-if="orderMap.length==0" class="empty-order">
					<image src="/static/icon/no_content.svg" mode="heightFix" />
					<text style="color: #bfbfbf;">暂时没有啦.</text>
				</view>
				<view class="order-info" v-for="(value,key) in orderMap" :key="key">
					<view class="brand-info">
						<text class="brand-title">{{value[0].split(';')[1]}}</text>
						<uni-icons type="right" size="16" />
					</view>
					<view v-for="(item,index) in value[1]" :key="index">
						<order-item :order="item" />
					</view>
					<view class="goods-nav">
						<button class="btn-nav" type="primary" size="mini">催发货</button>
						<button class="btn-nav" type="primary" size="mini">修改地址</button>
					</view>
				</view>
			</view>
			<view v-if="currentIndex === 3">
				<view v-if="orderMap.length==0" class="empty-order">
					<image src="/static/icon/no_content.svg" mode="heightFix" />
					<text style="color: #bfbfbf;">暂时没有啦.</text>
				</view>
				<view class="order-info" v-for="(value,key) in orderMap" :key="key">
					<view class="brand-info">
						<text class="brand-title">{{value[0].split(';')[1]}}</text>
						<uni-icons type="right" size="16" />
					</view>
					<view v-for="(item,index) in value[1]" :key="index">
						<order-item :order="item" />
					</view>
					<view class="goods-nav">
						<button class="btn-nav" type="primary" size="mini">延长收货</button>
						<button class="btn-nav" type="primary" size="mini">查看物流</button>
						<button class="btn-nav" type="primary" size="mini">确认收货</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		listOrder
	} from '/api/order'
	export default {
		data() {
			return {
				currentIndex: 0,
				items: ['全部', '待支付', '待发货', '待签收'],
				page: 1,
				pageSize: 10,
				orderMap: new Map()
			}
		},
		onLoad(option) {
			this.currentIndex = parseInt(option.type) || 0
			this.fetchData()
		},
		onPullDownRefresh() {
			uni.showLoading({
				title: '加载中'
			})
			setTimeout(() => {
				uni.hideLoading()
				uni.stopPullDownRefresh()
			}, 5000)
			this.fetchData()
		},
		methods: {
			fetchData() {
				uni.showLoading({
					title: '加载中'
				})
				setTimeout(() => {
					uni.hideLoading()
				}, 5000)
				listOrder({
					type: this.currentIndex,
					page: this.page,
					pageSize: this.pageSize
				}).then(resp => {
					const {
						data
					} = resp
					this.orderMap = Object.entries(data)
					console.log(this.orderMap)
					uni.hideLoading()
					uni.stopPullDownRefresh()
				})
			},
			onClickItem(e) {
				if (this.currentIndex !== e.currentIndex) {
					this.currentIndex = e.currentIndex
					this.fetchData()
				}
			},
		}
	}
</script>

<style lang="scss">
	.nav-tab {
		background-color: #ffffff;
	}

	.content {
		margin: 20rpx;
		padding-bottom: 20rpx;
		border-radius: 10rpx;
	}

	.order-info {
		background-color: #ffffff;
		padding: 20rpx;
		margin: 10rpx;
		margin-bottom: 30rpx;
		border-radius: 20rpx;

		.order-item {
			padding: 10rpx;
		}


		.goods-nav {
			display: flex;
			justify-content: right;

			.btn-nav {
				margin: 10rpx;
				border-radius: 40rpx;
			}
		}
	}

	.empty-order {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>