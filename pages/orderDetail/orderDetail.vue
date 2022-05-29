<template>
	<view>
		<uni-card>
			<view @click="selectAddress()"
				style="height: 100rpx;display: flex;justify-content: space-between;align-items: center;">
				<uni-icons type="location-filled" color="#0bc99d" size="30"></uni-icons>
				<view v-if="name==''">
					选择你的地址
				</view>
				<view>
					<view style="font-size: 15px;font-weight: bold;">
						{{deliveryAddress}}{{detailAddress}}
					</view>
					<view style="font-size: 13px;">
						{{name}} {{phone}}
					</view>
				</view>
				<uni-icons type="right" color="#0bc99d" size="20"></uni-icons>
			</view>
		</uni-card>
		<uni-card style="border-radius: 20rpx;" v-for="(item,index) in checkedData" :key="item._id">
			<view class="cart-item">
				<view class="cart-item-user" style="display: flex;">
					<uni-icons type="shop-filled" size="30" color="#0bc99d"></uni-icons>
					{{item.shopingcar_info[0].idleUserName}}
					<uni-icons type="right" size="20"></uni-icons>
				</view>
				<view style="display: flex;justify-content: space-between;margin: 15rpx 0"
					v-for="(item1,index1) in item.shopingcar_info" :key="item1._id">
					<view class="cart-itemright">
						<view class="cart-image">
							<image :src="item1.idleCover" mode="aspectFill"></image>
							<view class="price">
								¥{{item1.idlePrice}}
							</view>
						</view>
						<view class="cart-itemtxt">
							<view class="name">
								{{item1.idleName}}
							</view>
							<view class="desciption">
								{{item1.idleDescribe}}
							</view>
							<view class="tag">
								<uni-tag :text="item1.quality" type="error"></uni-tag>
							</view>
							<view class="item-num">
								X{{item1.amount}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-card>
		<uni-card>
			<view style="display: flex;justify-content: space-between;">
				<view>
					共{{totalSum}}件宝贝
				</view>
				<view>
					商品总价 <text style="color: red;font-size: 12px;margin-left: 5rpx;">¥</text><text
						style="color: red;font-size: 17px;">{{totalPrice}}</text>
				</view>
			</view>
		</uni-card>
		<uni-card>
			<view>
				<radio-group @change="radioChange">
					<view
						style="width: 100%;display: flex;justify-content: space-between;align-items: center;margin: 20rpx 0;">
						<view class="zfb" style="display: flex;align-items: center;">
							<image
								src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a0439cf-af57-474f-b688-798babb30901/da40ac3c-3ea0-470c-b1a1-be2064a8608a.jpg"
								mode="aspectFill"></image>支付宝支付
						</view>
						<label class="radio">
							<radio value="zfb" :checked="payWayChecked" />
						</label>
					</view>
					<view
						style="width: 100%;display: flex;justify-content: space-between;align-items: center;margin: 20rpx 0;">
						<view class="zfb" style="display: flex;align-items: center;">
							<image
								src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a0439cf-af57-474f-b688-798babb30901/034daaf7-05b0-4cd4-b370-f0ea68cd0426.jpg"
								mode="aspectFill"></image>微信支付
						</view>
						<label class="radio">
							<radio value="wx" :checked="!payWayChecked" />
						</label>
					</view>

				</radio-group>
			</view>
		</uni-card>
		<uni-card>
			<view>
				订单备注
			</view>
			<uni-easyinput type="textarea" v-model="orderRemark" placeholder="订单备注(选填)"></uni-easyinput>
		</uni-card>
		<view style="height: 100rpx;">

		</view>
		<view
			style="position: fixed;bottom: 0;height: 100rpx;width: 100%; background: #FFFFFF; padding: 20rpx;box-sizing: border-box; display: flex;justify-content: flex-end;align-items: center;">
			<view style="color: #999999;font-size: 13px;margin-right: 5rpx;">
				共{{totalSum}}件
			</view>
			<view>
				合计：<text style="color: red;font-size: 12px;margin-left: 5rpx;">¥</text><text
					style="color: red;font-size: 17px;margin-right: 5rpx;">{{totalPrice}}</text>
			</view>
			<view @click="submitOrder()"
				style="width: 200rpx;height: 60rpx;border-radius: 60rpx;background: #0bc99d;display: flex;justify-content: center;align-items: center;color: #FFFFFF;">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				totalPrice: 0,
				totalSum: 0,
				checkedData: [],
				name: "",
				phone: "",
				deliveryAddress: "",
				detailAddress: "",
				payWayChecked: true,
				payWay: "zfb",
				orderRemark: ""
			}
		},
		onLoad(option) {
			this.getCheckedData()
			this.getTotalPrice()
			this.getTotalSum()
			if (option.id) {
				this.getAddressById(option.id)
			} else {
				this.getDefaultAddress()
			}
			// this.get()
		},
		methods: {
			getTotalSum() {
				uni.showLoading({
					mask: true
				})
				var that = this
				uni.getStorage({
					key: 'userinfo',
					success: (res1) => {
						console.log(res1.data)
						let data = {
							myEmail: res1.data.email,
							method: "getTotalSum"
						}
						uniCloud.callFunction({
								name: "shoppingcarController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								if (res.result.data.length != 0) {
									this.totalSum = res.result.data[0].totalSum
								} else {
									this.totalSum = 0
								}
							})
							.catch((err) => {
								console.log(err)
							})
					}
				})
			},
			getTotalPrice() {
				uni.showLoading({
					mask: true
				})
				var that = this
				uni.getStorage({
					key: 'userinfo',
					success: (res1) => {
						console.log(res1.data)
						let data = {
							myEmail: res1.data.email,
							method: "getTotalPrice"
						}
						uniCloud.callFunction({
								name: "shoppingcarController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								if (res.result.data.length != 0) {
									this.totalPrice = res.result.data[0].totalPrice
								} else {
									this.totalPrice = 0
								}
							})
							.catch((err) => {
								console.log(err)
							})
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
			},
			getCheckedData() {
				uni.getStorage({
					key: 'userinfo',
					success: (res1) => {
						console.log(res1.data)
						let data = {
							myEmail: res1.data.email,
							method: "getCheckedData"
						}
						uniCloud.callFunction({
								name: "shoppingcarController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								this.checkedData = res.result.data
							})
							.catch((err) => {
								console.log(err)
							})
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
			},
			getDefaultAddress() {
				uni.showLoading({
					mask: true
				})
				uni.getStorage({
					key: 'userinfo',
					success: (res1) => {
						console.log(res1.data)
						let address = {
							email: res1.data.email,
							method: "getDefaultAddress"
						}
						uniCloud.callFunction({
								name: "shippingAddressController",
								data: address
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								if (res.result.data.length != 0) {
									this.name = res.result.data[0].name
									this.phone = res.result.data[0].phone
									this.deliveryAddress = res.result.data[0].deliveryAddress
									this.detailAddress = res.result.data[0].detailAddress
								}
							})
							.catch((err) => {
								console.log(err)
							})
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
			},
			getAddressById(id) {
				let address = {
					id: id,
					method: "getAddressById"
				}
				uniCloud.callFunction({
						name: "shippingAddressController",
						data: address
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						if (res.result.data.length != 0) {
							this.name = res.result.data[0].name
							this.phone = res.result.data[0].phone
							this.deliveryAddress = res.result.data[0].deliveryAddress
							this.detailAddress = res.result.data[0].detailAddress
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			selectAddress() {
				let data = {
					isSelectAddress: true
				}
				uni.redirectTo({
					url: "../shippingAddress/shippingAddress?isSelectAddress=" + data
				})
			},
			radioChange(e) {
				console.log(e)
				this.payWay = e.detail.value
			},
			submitOrder() {
				// let isHaveStock = true
				// for (let i = 0; i < this.checkedData.length; i++) {
				// 	for (let j = 0; j < this.checkedData[i].shopingcar_info.length; j++) {
				// 		let dataStock = {
				// 			id: this.checkedData[i].shopingcar_info[j].idleId,
				// 			method: "getIdleById"
				// 		}
				// 		console.log(this.checkedData[i].shopingcar_info[j].idleId)
				// 		uniCloud.callFunction({
				// 				name: "idleController",
				// 				data: dataStock
				// 			})
				// 			.then((res) => {
				// 				uni.hideLoading()
				// 				console.log(res)
				// 				if (res.result.data.length != 0) {
				// 					if (res.result.data[0].stockCount <= 0) {
				// 						isHaveStock = true
				// 						return;
				// 					}
				// 				}
				// 			})
				// 			.catch((err) => {
				// 				console.log(err)
				// 			})
				// 	}
				// }
				// if (isHaveStock == false) {
				if (this.name == '' && this.phone == '' && this.deliveryAddress == '' && this.detailAddress == '') {
					uni.showToast({
						duration: 1500,
						title: '请选择地址信息!',
						mask: true,
						icon: 'none'
					})
				} else {
					uni.getStorage({
						key: 'userinfo',
						success: (res1) => {
							console.log(res1.data)
							let seller = []
							for (let i = 0; i < this.checkedData.length; i++) {
								seller.push(this.checkedData[i]._id)
							}

							let idle = []
							for (let i = 0; i < this.checkedData.length; i++) {
								for (let j = 0; j < this.checkedData[i].shopingcar_info.length; j++) {
									idle.push(this.checkedData[i].shopingcar_info[j].idleId)
								}
							}
							console.log(seller)
							console.log(idle)
							var myDate = new Date()
							let order = {
								buyerEmail: res1.data.email,
								sellerEmail: seller,
								uploadSellerEmail: [],
								shipEmailList: [],
								receiptEmailList: [],
								idleIdList: idle,
								evaluateIdleIdList: [],
								itemNum: this.totalSum,
								totalPrice: this.totalPrice,
								payWay: this.payWay,
								remark: this.orderRemark,
								goodsInfo: this.checkedData,
								addressInfo: {
									name: this.name,
									phone: this.phone,
									deliveryAddress: this.deliveryAddress,
									detailAddress: this.detailAddress
								},
								orderState: 0,
								submitTime: myDate.getTime(),
								method: "uploadOrder"
							}
							console.log(order)
							uniCloud.callFunction({
									name: "orderController",
									data: order
								})
								.then((res) => {
									uni.hideLoading()
									console.log(res)
									if (res.result.affectedDocs != 0) {
										uni.showToast({
											duration: 1500,
											title: '订单提交成功！',
											mask: true,
											icon: 'none'
										})
										let idleList = []
										for (let i = 0; i < this.checkedData.length; i++) {
											for (let j = 0; j < this.checkedData[i].shopingcar_info
												.length; j++) {
												let data = {
													idleId: this.checkedData[i].shopingcar_info[j]
														.idleId,
													amount: this.checkedData[i].shopingcar_info[j]
														.amount
												}
												idleList.push(data)
											}
										}
										console.log(idleList)
										for (let i = 0; i < idleList.length; i++) {
											let data = {
												idleId: idleList[i].idleId,
												amount: -idleList[i].amount,
												method: "decreaseStock"
											}
											console.log(data)
											uniCloud.callFunction({
													name: "idleController",
													data: data
												})
												.then((res) => {
													uni.hideLoading()
													console.log(res)
												})
												.catch((err) => {
													console.log(err)
												})
										}
										this.removeShoppingcarChecked()
										setTimeout(() => {
											uni.reLaunch({
												url: "../myBuyOrder/myBuyOrder"
											})
										}, 1500)
									}
								})
								.catch((err) => {
									console.log(err)
								})
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
				// } else {
				// 	uni.showToast({
				// 		duration: 1500,
				// 		title: '有商品库存不足，请检查后重新下单!',
				// 		mask: true,
				// 		icon: 'none'
				// 	})
				// }
			},
			removeShoppingcarChecked() {
				uni.showLoading({
					mask: true
				})
				let data = {
					method: "removeShoppingcarChecked"
				}
				uniCloud.callFunction({
						name: "shoppingcarController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			// get() {
			// 	let data = {
			// 		method: "getOrderBySellerEmail"
			// 	}
			// 	uniCloud.callFunction({
			// 			name: "orderController",
			// 			data: data
			// 		})
			// 		.then((res) => {
			// 			uni.hideLoading()
			// 			console.log(res)
			// 		})
			// 		.catch((err) => {
			// 			console.log(err)
			// 		})
			// },
			// same(aa, bb) {
			// 	if (aa.length != bb.length) {
			// 		return false
			// 	} else {
			// 		let cc = [...bb];
			// 		for (let item in aa) {
			// 			for (let it in cc) {
			// 				if (aa[item] === cc[it]) {
			// 					cc.splice(it, 1)
			// 					// console.log(cc);
			// 				}
			// 			}
			// 		}
			// 		return cc.length < 1 ? true : false;
			// 	}
			// }
		}
	}
</script>

<style lang="scss">
	.cart-header {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		height: 80rpx;
		background: #0bc99d;
		color: #FFFFFF;
		position: fixed;
		top: 0;
		z-index: 5;
	}

	.manager {
		margin-right: 40rpx;
	}

	.cart-item {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.cart-itemleft {
		/* height: 100%; */
		width: 50rpx;
		/* border: 1px solid; */
		display: flex;
		align-items: center;
		margin-right: 15px;
	}

	.cart-itemleft image {
		width: 50rpx;
		height: 50rpx;
	}

	.cart-itemright {
		/* background-color: #007AFF; */
		width: 100%;
		display: flex;
		align-items: center;
		/* justify-content: center; */
	}

	.cart-itemright image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
		margin-left: 10px;
	}

	.cart-itemtxt {
		margin-left: 10px;
	}

	.cart-itemtxt .name {
		color: #000000;
		font-size: 15px;
	}

	.cart-itemtxt .desciption {
		color: #C0C0C0;
		font-size: 10px;
		margin-top: 5px;
		overflow: hidden;
		white-space: nowrap;
		/*文字超出宽度则显示ellipsis省略号*/
		text-overflow: ellipsis;
		width: 60%;
	}

	.cart-itemtxt .tag {
		margin-top: 5px;
	}

	.cart-itemright .price {
		color: red;
		margin-top: 5px;
		display: flex;
		justify-content: space-between;
	}

	.cart-itemright .item-num {
		width: 350rpx;
		/* border: 1px solid; */
		display: flex;
		justify-content: flex-end;
	}

	.cart-image {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.cart-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		/* padding: 0 30px 0 30px; */
		z-index: 5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.all-check {
		height: 100%;
		width: 130rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.all-check image {
		width: 50rpx;
		height: 50rpx;
	}

	.all-check .all-checktxt {
		color: #909399;
	}

	.cart-footer .cart-pay {
		display: flex;
		/* border: 1px solid; */
	}

	.cart-pay .pay-button {
		width: 180rpx;
		height: 70rpx;
		background-color: #ffaa00;
		text-align: center;
		line-height: 70rpx;
		border-radius: 60rpx;
		margin-left: 10rpx;
		color: #FFFFFF;
	}

	.cart-pay .all-money {
		text-align: center;
		height: 70rpx;
		line-height: 70rpx;
	}

	.cart-pay .all-money text:nth-child(2) {
		color: red;
		font-size: 12px;
	}

	.cart-pay .all-money text:nth-child(3) {
		color: red;
		font-size: 15px;
	}

	.zfb image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50rpx;
		margin-right: 10rpx;
	}
</style>
