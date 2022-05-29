<template>
	<view>
		<view v-if="!isData"
			style="width: 96%;border: 1px solid #C7C7C7;margin: 10rpx auto;margin-bottom: 30rpx; border-radius: 20rpx;background: #FFFFFF;"
			v-for="(item,index) in orderList" :key="item._id">
			<uni-card>订单号：{{item._id}}</uni-card>
			<uni-card style="border-radius: 20rpx;" v-for="(item1,index1) in item.goodsInfo" :key="item1._id"
				v-if="myEmail==item1._id">
				<view class="cart-item">
					<view class="cart-item-user" style="display: flex;">
						<uni-icons type="shop-filled" size="30" color="#0bc99d"></uni-icons>
						{{item1.shopingcar_info[0].idleUserName}}
						<uni-icons type="right" size="20"></uni-icons>
					</view>
					<view v-for="(item2,index2) in item1.shopingcar_info" :key="item2._id">
						<view class="cart-itemright"
							style="display: flex;justify-content: space-between;margin: 15rpx 0">
							<view class="cart-image">
								<image @click="toIdleDetail(item2.idleId)" :src="item2.idleCover" mode="aspectFill">
								</image>
								<view class="price">
									¥{{item2.idlePrice}}
								</view>
							</view>
							<view class="cart-itemtxt">
								<view class="name">
									{{item2.idleName}}
								</view>
								<view class="desciption">
									{{item2.idleDescribe}}
								</view>
								<view class="tag">
									<uni-tag :text="item2.quality" type="error"></uni-tag>
								</view>
								<view class="item-num">
									X{{item2.amount}}
								</view>
							</view>
						</view>
						<view style="width: 100%;display: flex;justify-content: flex-end;" v-if="item.orderState==1">
							{{item.evaluateIdleIdList.indexOf(item2.idleId)==-1 ? '待买家评价' : '买家已评价'}}
						</view>
					</view>
					<view style="width: 100%;display: flex;justify-content: flex-end;">
						<!-- <view v-if="item.uploadSellerEmail.indexOf(item1._id)!=-1"
							@click="getTrackingNumber(item._id,item1._id)">
							查看快递单号
						</view> -->
						<!-- <view
							@click="getPayCode(item1._id,item.payWay,item1.totalPrice,item.sellerEmail,item.uploadSellerEmail,item._id)">
							{{item.uploadSellerEmail.indexOf(item1._id)==-1 ? '付款' : '已付款'}}
						</view> -->
						<!-- <view v-if="myEmail==item1._id">
							<view v-if="item.uploadSellerEmail.indexOf(item1._id)==-1">
								等待买家付款
							</view>
							<view v-else>
								填写或修改快递单号
							</view>
						</view>
						<view v-else>
							无效商品
						</view> -->
						<!-- {{myEmail==item1._id ? '填写或者修改快递单号' : '无效商品'}} -->
						<view v-if="item.orderState==2">
							已完成
						</view>
						<view v-else-if="item.orderState==0"
							@click="writeTrackingNumber(item._id,item1._id,item.uploadSellerEmail,item.shipEmailList,item.receiptEmailList)">
							<!-- {{item.uploadSellerEmail.indexOf(item1._id)==-1 ? '共¥'+item1.totalPrice+' 等待买家付款' :
						'填写或者修改快递单号'}} -->
							<view v-if="item.uploadSellerEmail.indexOf(item1._id)!=-1">
								<view v-if="item.shipEmailList.indexOf(item1._id)==-1">
									填写快递单号
								</view>
								<view v-else>
									<view v-if="item.receiptEmailList.indexOf(item1._id)!=-1">
										已收货
									</view>
									<view v-else>
										修改快递单号
									</view>
								</view>
							</view>
							<view v-else>
								共¥{{item1.totalPrice}} 等待买家付款
							</view>
						</view>
					</view>
				</view>
			</uni-card>
			<uni-card>
				<view style="font-weight: bold;font-size: 15px;color: #000000;">
					买家收货地址
				</view>
				<view>
					{{item.addressInfo.deliveryAddress}} {{item.addressInfo.detailAddress}}
				</view>
				<view>
					{{item.addressInfo.name}} {{item.addressInfo.phone}}
				</view>
			</uni-card>
			<uni-card v-if="item.remark!=''">
				<view style="font-weight: bold;font-size: 15px;color: #000000;">
					<text>我的订单备注</text>
				</view>
				<view>
					{{item.remark}}
				</view>
			</uni-card>
			<uni-card>
				<view style="display: flex;justify-content: flex-end;align-items: center;">
					<view v-if="item.orderState==0">
						等待卖家确认收货
					</view>
					<view v-else-if="item.orderState==1">
						等待卖家确认评价
					</view>
					<view v-else-if="item.orderState==2">
						订单已完成
					</view>
					<view v-else-if="item.orderState==3">
						售后中
					</view>
					<!-- {{item.orderState==0 ? '等待卖家确认收货' : '订单已完成'}} -->
				</view>
			</uni-card>
		</view>
		<view v-if="isData" style="width: 100%;display: flex;justify-content: center;">
			<image
				src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/79633706-4359-482a-9a8d-2409cfac4bef.png"
				mode="widthFix"></image>
		</view>
		<uni-popup ref="popup" type="center" :animation="true">
			<view
				style="background: #FFFFFF;width: 500rpx;height: 400rpx;border-radius: 10rpx;display: flex;flex-direction: column;align-items: center;">
				<view style="margin-top: 20rpx;">
					快递单号
				</view>
				<view style="margin-top: 50rpx;">
					<uni-easyinput v-model="trackingNumber" placeholder="填写快递单号"></uni-easyinput>
				</view>
				<view @click="saveTrackingNumber()"
					style="width: 60%;height: 100rpx;background: #0bc99d;border-radius: 100rpx;display: flex;justify-content: center;align-items: center;color: #FFFFFF;margin-top: 50rpx;">
					{{trackingState==0 ? '确认' : '买家已收货'}}
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [],
				myEmail: "",
				trackingNumber: "",
				orderId: "",
				sellerId: "",
				trackingNumberMode: "",
				trackingState: 0,
				isData: false
			}
		},
		onLoad() {
			this.getMySellOrder()
		},
		methods: {
			getMySellOrder() {
				uni.getStorage({
					key: 'userinfo',
					success: (res1) => {
						console.log(res1.data)
						let data = {
							email: res1.data.email,
							orderState: 3,
							method: "getMySellOrder"
						}
						this.myEmail = res1.data.email
						uniCloud.callFunction({
								name: "orderController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								if (res.result.data.length != 0) {
									this.orderList = res.result.data
									this.isData = false
								} else {
									this.isData = true
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
			writeTrackingNumber(orderId, sellerId, uploadSellerEmail, shipEmailList, receiptEmailList) {
				console.log(orderId)
				console.log(sellerId)
				console.log(uploadSellerEmail)
				this.orderId = orderId
				this.sellerId = sellerId
				if (uploadSellerEmail.indexOf(sellerId) != -1) {
					if (shipEmailList.indexOf(sellerId) == -1) {
						this.$refs.popup.open('center')
						let data = {
							orderId: orderId,
							sellerEmail: sellerId,
							method: "getTrackingNumber"
						}
						uniCloud.callFunction({
								name: "trackingNumController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								if (res.result.data.length != 0) {
									this.trackingNumber = res.result.data[0].trackingNum
									this.trackingState = res.result.data[0].trackingState
									this.trackingNumberMode = "update"
								} else {
									this.trackingNumber = ""
									this.trackingState = 0
									this.trackingNumberMode = "add"
								}
							})
							.catch((err) => {
								console.log(err)
							})
					} else {
						if (receiptEmailList.indexOf(sellerId) == -1) {
							this.$refs.popup.open('center')
							let data = {
								orderId: orderId,
								sellerEmail: sellerId,
								method: "getTrackingNumber"
							}
							uniCloud.callFunction({
									name: "trackingNumController",
									data: data
								})
								.then((res) => {
									uni.hideLoading()
									console.log(res)
									if (res.result.data.length != 0) {
										this.trackingNumber = res.result.data[0].trackingNum
										this.trackingState = res.result.data[0].trackingState
										this.trackingNumberMode = "update"
									} else {
										this.trackingNumber = ""
										this.trackingState = 0
										this.trackingNumberMode = "add"
									}
								})
								.catch((err) => {
									console.log(err)
								})
						}
					}
				}
			},
			saveTrackingNumber() {
				if (this.trackingState == 0) {
					if (this.trackingNumberMode == "add") {
						uni.showLoading({
							mask: true
						})
						let data = {
							orderId: this.orderId,
							sellerEmail: this.sellerId,
							trackingNum: this.trackingNumber,
							trackingState: 0,
							method: "uploadTrackingNumber"
						}
						uniCloud.callFunction({
								name: "trackingNumController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								if (res.affectedDocs != 0) {
									let trackData = {
										orderId: this.orderId,
										sellerEmail: this.sellerId,
										method: "addTrackingNumber"
									}
									uniCloud.callFunction({
											name: "orderController",
											data: trackData
										})
										.then((res1) => {
											uni.hideLoading()
											console.log(res1)
											if (res1.result.affectedDocs != 0) {
												uni.showToast({
													duration: 1500,
													title: '快递单号填写成功！',
													mask: true,
													icon: 'none'
												})
												this.getMySellOrder()
												this.$refs.popup.close()
											}
										})
										.catch((err) => {
											console.log(err)
										})
								}
							})
							.catch((err) => {
								console.log(err)
							})
					} else {
						uni.showLoading({
							mask: true
						})
						let data = {
							orderId: this.orderId,
							sellerEmail: this.sellerId,
							trackingNum: this.trackingNumber,
							trackingState: 0,
							method: "updateTrackingNumber"
						}
						uniCloud.callFunction({
								name: "trackingNumController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								if (res.result.affectedDocs != 0) {
									uni.showToast({
										duration: 1500,
										title: '快递单号更新成功！',
										mask: true,
										icon: 'none'
									})
									this.$refs.popup.close()
								}
							})
							.catch((err) => {
								console.log(err)
							})
					}
				}
			},
			toIdleDetail(id) {
				uni.navigateTo({
					url: "../idleDetail/idleDetail?id=" + id
				})
			}
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

	.pay-image image {
		width: 200rpx;
		height: 200rpx;
	}
</style>
