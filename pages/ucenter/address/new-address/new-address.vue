<template>
	<view>
		<uni-section title="地址信息" type="line">
			<view class="form-box">
				<uni-forms ref="addressForm" :rules="addressRules" v-model="addressFormData">
					<uni-forms-item label="收件人" name="addressee" required>
						<uni-easyinput v-model="addressFormData.addressee" placeholder="收件人名字" />
					</uni-forms-item>
					<uni-forms-item label="手机号" name="phone" required>
						<uni-easyinput v-model="addressFormData.phone" placeholder="手机号" />
					</uni-forms-item>
					<uni-forms-item label="所在地区" name="cityCode" required>
						<uni-data-picker v-model="addressFormData.cityCode" :localdata="localData" popup-title="请选择省市区">
						</uni-data-picker>
					</uni-forms-item>
					<uni-forms-item label="详细地址" name="fullAddress" required>
						<uni-easyinput type="textarea" v-model="addressFormData.fullAddress" placeholder="小区,门牌号等" />
					</uni-forms-item>
					<uni-forms-item label=" ">
						<uni-data-checkbox v-model="addressFormData.isDefaults" multiple
							:localdata="defaultCheck"></uni-data-checkbox>
					</uni-forms-item>
				</uni-forms>
			</view>
		</uni-section>
	</view>
	<view class="bottom-box">
		<button class="btn-save" type="warn" @click="delAddress" v-if="showDelete">删除</button>
		<button class="btn-save" type="primary" @click="saveAddress">保存</button>
	</view>
</template>

<script>
	import cityRows from '@/static/city_data.json'
	import {
		addAddress,
		deleteAddress
	} from '/api/address'
	export default {
		data() {
			return {
				showDelete: false,
				localData: [],
				addressFormData: {
					isDefaults: []
				},
				defaultCheck: [{
					text: '设为默认地址',
					value: 1
				}],
				addressRules: {
					addressee: {
						rules: [{
							required: true,
							errorMessage: '收件人不能为空'
						}]
					},
					phone: {
						rules: [{
							required: true,
							errorMessage: '手机号不能为空'
						}, {
							format: 'number',
							errorMessage: '手机号只能包含数字'
						}]
					},
					cityCode: {
						rules: [{
							required: true,
							errorMessage: '所在区域不能为空'
						}]
					},
					fullAddress: {
						rules: [{
							required: true,
							errorMessage: '详细地址不能为空'
						}, {
							minLength: 3,
							errorMessage: '详细地址至少在三个字以上'
						}]
					}
				},
			}
		},
		onLoad() {
			this.localData = this.get_city_tree()
			const channel = this.getOpenerEventChannel()
			channel.on('acceptAddress', (data) => {
				this.addressFormData = data
				this.addressFormData.cityCode = data.cityCode.toString()
				this.addressFormData.isDefaults = data.isDefault == 1 ? [1] : []
				this.showDelete = true
			})
		},
		methods: {
			delAddress() {
				uni.showModal({
					title: '提示',
					content: '确定要删除该地址吗',
					success: (res) => {
						if (res.confirm) {
							deleteAddress(this.addressFormData).then(resp => {
								uni.showToast({
									title: resp.msg
								})
								uni.navigateBack()
							})
						}
					}
				})
			},
			saveAddress() {
				this.$refs.addressForm.validate().then(res => {
					this.addressFormData.isDefault = this.addressFormData.isDefaults.length
					addAddress(this.addressFormData).then(resp => {
						uni.showToast({
							title: resp.msg
						})
						uni.navigateBack()
					})
				}).catch(err => {
					console.log(err)
					return
				})
			},
			get_city_tree() {
				let res = []
				if (cityRows.length) {
					res = this.handleTree(cityRows)
				}
				return res
			},
			handleTree(data, parent_code = null) {
				let res = []
				let keys = {
					id: 'code',
					pid: 'parent_code',
					children: 'children',
					text: 'name',
					value: 'code'
				}
				let oneItemDEMO = {
					text: '',
					value: '',
					children: []
				}
				let oneItem = {}
				for (let index in data) {
					if (parent_code === null) {
						if (!data[index].hasOwnProperty(keys.pid) || data[index][keys.pid] == parent_code) {
							oneItem = JSON.parse(JSON.stringify(oneItemDEMO))
							oneItem.text = data[index][keys.text]
							oneItem.value = data[index][keys.value]
							oneItem.children = this.handleTree(data, data[index][keys.id])
							res.push(oneItem)
						} else {}
					} else {
						if (data[index].hasOwnProperty(keys.pid) && data[index][keys.pid] == parent_code) {
							oneItem = JSON.parse(JSON.stringify(oneItemDEMO))
							oneItem.text = data[index][keys.text]
							oneItem.value = data[index][keys.value]
							oneItem.children = this.handleTree(data, data[index][keys.id])
							res.push(oneItem)
						} else {}
					}
				}
				return res
			}
		}
	}
</script>

<style lang="scss">
	.form-box {
		padding: 20rpx;
	}

	.bottom-box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fefefe;
		display: flex;

		.btn-save {
			margin: 20rpx;
			border-radius: 45rpx;
			min-width: 200rpx;
		}

		.btn-save:last-child {
			flex: auto;
		}
	}
</style>