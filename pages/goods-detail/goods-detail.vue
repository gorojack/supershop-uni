<template>
	<view class="content">
		<view>
			<uni-swiper-dot :info="goodsInfo.previewImages" v-if="goodsInfo.previewImages" :current="current" field="content">
				<image class="image-holder" src="/static/icon/image_error.svg" v-if="goodsInfo.previewImages.length===0" />
				<swiper class="swiper-box" @change="change" autoplay circular duration="300" interval="3000"
					v-if="goodsInfo.previewImages.length!==0">
					<swiper-item v-for="(item, index) in goodsInfo.previewImages" :key="index">
						<image style="width: 100%" :src="item.imageUrl" mode="aspectFit" @click="previewClickHandle(item)" />
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="goods-header">
			<view class="title-box">
				<text>{{ goodsInfo.title }}</text>
				<view class="share-box">
					<image src="/static/icon/share.svg" />
					<text>分享</text>
				</view>
			</view>
			<view class="divider"></view>
			<view v-if="goodsInfo.price" class="price-box">
				<text class="price-text">&nbsp;￥{{ goodsInfo.price.salePrice }}&nbsp;</text>
				<uni-tag :text="goodsInfo.price.priceLabel" type="primary" size="mini" />
				<text class="price-market">￥{{ goodsInfo.price.marketPrice }}</text>
				<text class="sale-discount">&nbsp;{{ goodsInfo.price.saleDiscount }}</text>
			</view>
		</view>
		<view class="divider"></view>
		<view class="brand-info" v-if="brandInfo">
			<image class="brand-logo" :src="brandInfo.logo" mode="aspectFit" />
			<view class="brand-descp">
				<text class="brand-name">{{brandInfo.name}}</text>
				<text class="brand-slogan">{{brandInfo.slogan}}</text>
			</view>
			<button class="btn-brand" type="primary" size="mini">进店</button>
		</view>
		<view class="divider"></view>
		<view class="goods-detail">
			<uni-section title="商品详细" type="line">
				<view class="detail-images" v-if="goodsInfo.detailImages">
					<view v-for="(item,index) in goodsInfo.detailImages" :key="index">
						<image class="detail-image" :src="item.imageUrl" mode="widthFix" lazy-load />
					</view>
				</view>
			</uni-section>
		</view>
		<view class="divider"></view>
	</view>
	<view class="goods-carts">
		<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
			@buttonClick="buttonClick" />
	</view>
</template>

<script>
	import {
		getProductInfo
	} from '/api/product'
	import {
		getBrandInfo
	} from '/api/brand'
	import {
		addCart
	} from '/api/cart'
	export default {
		data() {
			return {
				productId: '',
				goodsInfo: {},
				brandInfo: {},
				current: 0,
				options: [{
					icon: 'chat',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 3,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #468bff, #70a6ff)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #629dff, #8db8ff)',
						color: '#fff'
					}
				],
				number: 1
			}
		},
		onLoad(option) {
			this.productId = option.productId
			if (this.productId)
				this.fetchData()
		},
		methods: {
			fetchData() {
				getProductInfo({
					productId: this.productId
				}).then(resp => {
					const {
						data
					} = resp
					this.goodsInfo = data
					if (data.brandId) {
						getBrandInfo({
							brandId: data.brandId
						}).then(resp => {
							const {
								data
							} = resp
							this.brandInfo = data
						})
					}
				})
			},
			clickItem(e) {},
			change(e) {
				this.current = e.detail.current;
			},
			previewClickHandle(e) {
				let imageUrls = []
				let current = 0
				const previewImageArr = this.goodsInfo.previewImages
				for (let i = 0; i < previewImageArr.length; i++) {
					const {
						imageUrl
					} = previewImageArr[i]
					imageUrls.push(imageUrl)
					if (e.imageUrl === imageUrl) current = i
				}
				uni.previewImage({
					urls: imageUrls,
					current: current,
					indicator: 'default',
					loop: true
				})
			},
			onClick(e) {
				// TODO chat, store and cart
			},
			buttonClick(e) {
				if (e.index == 0) {
					addCart({
						skuId: this.goodsInfo.skuId,
						number: this.number
					}).then(resp => {
						uni.showToast({
							title: resp.msg
						})
					})
				}
				if (e.index == 1) {
					// TODO buy now
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: 50px;
	}

	.divider {
		background: #E0E3DA;
		width: 90%;
		height: 1rpx;
		margin: 1rpx auto;
	}

	.image-holder {
		width: 100%;
		height: 400rpx;
	}

	.swiper-box {
		width: 100%;
		height: calc(100vw * 9 / 16);
		background-color: #edeff6;
	}

	swiper-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		color: #fff;
	}

	.goods-header {
		background-color: #ffffff;
		padding: 10rpx;

		.title-box {
			font-size: 36rpx;
			padding: 10rpx;
			display: flex;
			justify-content: center;

			.share-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 200rpx;

				image {
					width: 64rpx;
					height: 64rpx;
				}

				text {
					width: 64rpx;
					font-size: 30rpx;
					color: #707070;
				}
			}
		}

		.price-box {
			padding: 10rpx;
			color: #8db8ff;
			font-size: 38rpx;

			.price-market {
				text-decoration: line-through;
				margin-left: 10rpx;
			}

			.sale-discount {
				font-size: 28rpx;
			}

			.price-text {
				color: #3782ff;
				font-size: 46rpx;
			}
		}
	}

	.brand-info {
		margin-top: 40rpx;
		background-color: #ffffff;
		padding: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			border: 1rpx solid #1d1d1f;
		}

		.brand-descp {
			display: flex;
			flex-direction: column;
			margin-left: 16rpx;
			height: 100rpx;
			flex: auto;

			.brand-name {
				font-size: 38rpx;
			}

			.brand-slogan {
				font-size: 24rpx;
				margin: 10rpx;
			}
		}

		.btn-brand {
			margin-right: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 72rpx;
			height: 72rpx;
			width: 130rpx;
			border-radius: 45rpx;
			font-size: 26rpx;
			font-weight: bold;
		}
	}

	.goods-detail {
		margin-top: 40rpx;

		.detail-image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-carts {
		display: flex;
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>