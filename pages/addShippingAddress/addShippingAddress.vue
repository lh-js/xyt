<template>
	<view class="content">
		<view class="input" style="margin-top: 20rpx;">
			<text>收货人</text>
			<uni-easyinput v-model="name" placeholder="名字"></uni-easyinput>
		</view>
		<view class="input">
			<text>手机号码</text>
			<uni-easyinput suffixIcon="right" v-model="phone" placeholder="手机号"></uni-easyinput>
		</view>
		<view class="input">
			<text>所在地区</text>
			<view @click="selectAddress()" style="width: 80%;background: #F8F8F8;">
				<uni-easyinput style="width: 100%;" suffixIcon="location-filled" v-model="deliveryAddress"
					placeholder="省,市,区"></uni-easyinput>
			</view>
			<!-- <view class="select-address" @click="selectAddress()" style="color: #C0C4CC;">
				<view>{{deliveryAddress}}</view>
				<view>
					<uni-icons type="location-filled" color="#C0C4CC" size="20"></uni-icons>
				</view>
			</view> -->

		</view>
		<view class="input">
			<text>详细地址</text>
			<uni-easyinput type="textarea" v-model="detailAddress" placeholder="小区楼栋/乡村名称"></uni-easyinput>
		</view>
		<view class="input">
			<text>设为默认收获地址</text>
			<switch v-model="isDefalutAddress" :checked="isDefalutAddress" @change="changeSwitch" />
		</view>
		<view class="button" @click="saveAddress()">
			保存
		</view>
		<auto-parse-address boxClass="c-box" @result="result"></auto-parse-address>
		<view style="width: 90%;margin: 0 auto;">
			<button type="warn" size="mini" @click="removeAddress()">删除</button>
		</view>
	</view>
</template>

<script>
	import autoParseAddress from '../../components/auto-parse-address/auto-parse-address.vue'
	export default {
		components: {
			'auto-parse-address': autoParseAddress
		},
		data() {
			return {
				name: "",
				phone: "",
				deliveryAddress: "",
				detailAddress: "",
				isDefalutAddress: false,
				id: ""
			}
		},
		onShow() {
			var pages = getCurrentPages();
			var currPage = pages[pages.length - 1]; //当前页面
			// console.log(currPage.__data__.deliveryAddress)
			this.deliveryAddress = currPage.__data__.deliveryAddress
		},
		onLoad(option) {
			this.id = option.id
			if (option.id != "add") {
				this.getShippingAddressById(option.id)
			}
		},
		methods: {
			result(e) {
				console.log(e)
				this.name = e.name
				this.phone = e.phone
				this.deliveryAddress = e.province + "/" + e.city + "/" + e.area
				this.detailAddress = e.detail
				/**
				 * @params e: { province: '', name: '', city: '', area: '', detail: '', phone: '', postalCode: '' }
				 * 
				 * */
			},
			selectAddress() {
				uni.navigateTo({
					url: "../selectAddress/selectAddress?address=" + this.deliveryAddress
				})
			},
			changeSwitch(e) {
				console.log(e)
				this.isDefalutAddress = e.detail.value
			},
			saveAddress() {
				if (this.id != "add") {
					uni.showLoading({
						mask: true
					})
					uni.getStorage({
						key: 'userinfo',
						success: (res1) => {
							console.log(res1.data)
							var myDate = new Date()
							let addressInfo = {
								_id: this.id,
								name: this.name,
								phone: this.phone,
								deliveryAddress: this.deliveryAddress,
								detailAddress: this.detailAddress,
								isDefault: this.isDefalutAddress,
								method: "updateShippingAddress",
							}
							console.log(addressInfo)
							if (addressInfo.isDefault) {
								let email = {
									email: res1.data.email,
									method: "cancelDefault"
								}
								uniCloud.callFunction({
										name: "shippingAddressController",
										data: email
									})
									.then((res) => {
										uni.hideLoading();
										console.log(res)
										uniCloud.callFunction({
												name: "shippingAddressController",
												data: addressInfo
											})
											.then((res) => {
												uni.hideLoading();
												console.log(res)
												uni.showToast({
													duration: 1500,
													title: '更新成功！',
													mask: true,
													icon: 'none'
												})
												setTimeout(() => {
													uni.redirectTo({
														url: '../shippingAddress/shippingAddress'
													})
												}, 1500)
											})
											.catch((err) => {
												console.log(err)
											})
									})
									.catch((err) => {
										console.log(err)
									})
							} else {
								uniCloud.callFunction({
										name: "shippingAddressController",
										data: addressInfo
									})
									.then((res) => {
										uni.hideLoading();
										console.log(res)
										uni.showToast({
											duration: 1500,
											title: '更新成功！',
											mask: true,
											icon: 'none'
										})
										setTimeout(() => {
											uni.redirectTo({
												url: '../shippingAddress/shippingAddress'
											})
										}, 1500)
									})
									.catch((err) => {
										console.log(err)
									})
							}
						},
						fail(err) {
							uni.showToast({
								duration: 1500,
								title: '请登录后再进行操作!',
								mask: true,
								icon: 'none'
							})
						}
					})
				} else {
					uni.showLoading({
						mask: true
					})
					uni.getStorage({
						key: 'userinfo',
						success: (res1) => {
							console.log(res1.data)
							var myDate = new Date()
							let addressInfo = {
								name: this.name,
								phone: this.phone,
								deliveryAddress: this.deliveryAddress,
								detailAddress: this.detailAddress,
								isDefault: this.isDefalutAddress,
								email: res1.data.email,
								method: "uploadShippingAddress",
								submitTime: myDate.getTime()
							}
							console.log(addressInfo)
							if (addressInfo.isDefault) {
								let email = {
									email: res1.data.email,
									method: "cancelDefault"
								}
								uniCloud.callFunction({
										name: "shippingAddressController",
										data: email
									})
									.then((res) => {
										uni.hideLoading();
										console.log(res)
										uniCloud.callFunction({
												name: "shippingAddressController",
												data: addressInfo
											})
											.then((res) => {
												uni.hideLoading();
												console.log(res)
												uni.showToast({
													duration: 1500,
													title: '添加成功！',
													mask: true,
													icon: 'none'
												})
												setTimeout(() => {
													uni.redirectTo({
														url: '../shippingAddress/shippingAddress'
													})
												}, 1500)
											})
											.catch((err) => {
												console.log(err)
											})
									})
									.catch((err) => {
										console.log(err)
									})
							} else {
								uniCloud.callFunction({
										name: "shippingAddressController",
										data: addressInfo
									})
									.then((res) => {
										uni.hideLoading();
										console.log(res)
										uni.showToast({
											duration: 1500,
											title: '添加成功！',
											mask: true,
											icon: 'none'
										})
										setTimeout(() => {
											uni.redirectTo({
												url: '../shippingAddress/shippingAddress'
											})
										}, 1500)
									})
									.catch((err) => {
										console.log(err)
									})
							}
						},
						fail(err) {
							uni.showToast({
								duration: 1500,
								title: '请登录后再进行操作!',
								mask: true,
								icon: 'none'
							})
						}
					})
				}
			},
			getShippingAddressById(id) {
				uni.showLoading({
					mask: true
				})
				let data = {
					id: id,
					method: "getShippingAddressById"
				}
				uniCloud.callFunction({
						name: "shippingAddressController",
						data: data
					})
					.then((res) => {
						uni.hideLoading();
						console.log(res)
						this.name = res.result.data[0].name
						this.phone = res.result.data[0].phone
						this.deliveryAddress = res.result.data[0].deliveryAddress
						this.detailAddress = res.result.data[0].detailAddress
						this.isDefalutAddress = res.result.data[0].isDefault
					})
					.catch((err) => {
						console.log(err)
					})
			},
			removeAddress() {
				uni.showModal({
					title: '提示',
					content: '确定删除此地址吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.showLoading({
								mask: true
							})
							let data = {
								id: this.id,
								method: "removeAddress"
							}
							uniCloud.callFunction({
									name: "shippingAddressController",
									data: data
								})
								.then((res) => {
									uni.hideLoading();
									console.log(res)
									if (res.result.affectedDocs != 0) {
										uni.redirectTo({
											url: "../shippingAddress/shippingAddress"
										})
									}
								})
								.catch((err) => {
									console.log(err)
								})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.input {
			width: 90%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;
		}

		.input uni-easyinput {
			width: 80%;
			background: #F8F8F8;
		}

		.select-address {
			width: 80%;
			height: 80rpx;
			background: #F8F8F8;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border: 1px solid #D8D8D8;
			border-radius: 10rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
		}

		.button {
			width: 90%;
			height: 100rpx;
			border-radius: 100rpx;
			background: #0bc99d;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
		}
	}
</style>
