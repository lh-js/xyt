<template>
	<view>
		<view v-if="!isData"
			style="width: 96%;border: 1px solid #C7C7C7;margin: 10rpx auto;margin-bottom: 30rpx; border-radius: 20rpx;background: #FFFFFF;"
			v-for="(item,index) in orderList" :key="item._id">
			<uni-card>订单号：{{item._id}}</uni-card>
			<uni-card style="border-radius: 20rpx;" v-for="(item1,index1) in item.goodsInfo" :key="item1._id">
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
						<view style="width: 100%;display: flex;justify-content: flex-end;" v-if="item.orderState==1"
							@click="evaluateItem(item.evaluateIdleIdList,item._id,item2.idleId,item.buyerEmail,item2.idleCover,item2.idleName)">
							{{item.evaluateIdleIdList.indexOf(item2.idleId)==-1 ? '评价' : '已评价'}}
						</view>
					</view>
					<view style="width: 100%;display: flex;justify-content: flex-end;" v-if="item.orderState==2">
						已完成
					</view>
					<view v-else-if="item.orderState==0"
						style="width: 100%;display: flex;justify-content: space-between;"
						:style="item.uploadSellerEmail.indexOf(item1._id)!=-1 ? '' :'justify-content: flex-end !important;'">
						<view v-if="item.uploadSellerEmail.indexOf(item1._id)!=-1"
							@click="getTrackingNumber(item.shipEmailList,item.receiptEmailList,item._id,item1._id)">
							<view v-if="item.shipEmailList.indexOf(item1._id)==-1">
								等待卖家发货
							</view>
							<view v-else>
								<view v-if="item.receiptEmailList.indexOf(item1._id)!=-1">
									已收货
								</view>
								<view v-else>
									查看快递单号
								</view>
							</view>
						</view>
						<view
							@click="getPayCode(item1._id,item.payWay,item1.totalPrice,item.sellerEmail,item.uploadSellerEmail,item._id)">
							{{item.uploadSellerEmail.indexOf(item1._id)==-1 ? '付款' : '已付款'}}
						</view>
					</view>
				</view>
			</uni-card>
			<uni-card>
				<view style="font-weight: bold;font-size: 15px;color: #000000;">
					<text>我的收货地址</text><text
						style="font-size: 12px !important;font-weight: normal !important;color: #999999 !important;">(修改地址联系卖家协商）</text>
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
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view class="">
						共{{item.itemNum}}件
					</view>
					<view class="">
						合计：¥{{item.totalPrice}}
					</view>
				</view>
			</uni-card>
			<uni-card>
				<view style="display: flex;justify-content: space-between;align-items: center;"
					:style="item.orderState==1 ? 'justify-content: flex-end !important;':''">
					<view v-if="item.orderState==0" @click="cancelOrder(item._id)">
						取消订单
					</view>
					<view v-if="item.orderState==2" @click="applyAfterSales(item._id,item.orderState)">
						申请售后
					</view>
					<view v-if="item.orderState==3" @click="finishAfterSales(item._id,item.orderState)">
						完成售后
					</view>
					<!-- <view class="">
						修改地址
					</view> -->
					<view v-if="item.orderState==0"
						@click="makeSureOrderReceipt(item._id,item.orderState,item.sellerEmail,item.receiptEmailList)">
						确认收货
					</view>
					<view v-else-if="item.orderState==1"
						@click="completeEvaluation(item._id,item.orderState,item.idleIdList,item.evaluateIdleIdList)">
						完成评价
					</view>
					<view v-else-if="item.orderState==2">
						订单已完成
					</view>
					<view v-else-if="item.orderState==3">
						售后中
					</view>
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
				style="width: 600rpx;height: 530rpx;background: #FFFFFF;border-radius: 10rpx;display: flex;flex-direction: column;align-items: center;">
				<view style="margin-top: 5rpx;color: #C0C4CC;font-size: 13px;">
					点击收款码预览保存付款
				</view>
				<view style="width: 100%;display: flex;justify-content: center;margin-top: 50rpx;color: red;"
					v-if="payCode==''">
					等待卖家上传收款码...
				</view>
				<view @click="previewImg()" v-if="payCode!=''" class="pay-image"
					style="display: flex;justify-content: center;margin-top: 50rpx;">
					<image :src="payCode" mode="aspectFill"></image>
				</view>
				<view style="margin-top: 10rpx;">
					您需支付¥{{totalPrice}}
				</view>
				<view v-if="payCode!=''"
					style="width: 100%;display: flex;justify-content: center;margin-top: 10rpx;color: #C0C4CC;font-size: 12px;">
					完成支付后记得点击确认支付，卖家核实后可尽快发货
				</view>
				<view @click="makeSurePay()" v-if="payCode!=''"
					style="width: 90%;height: 100rpx;background: #0bc99d;border-radius: 100rpx;display: flex;justify-content: center;align-items: center;color: #FFFFFF;margin-top: 30rpx;">
					确认支付
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup1" type="center" :animation="true">
			<view
				style="background: #FFFFFF;width: 500rpx;height: 400rpx;border-radius: 10rpx;display: flex;flex-direction: column;align-items: center;">
				<view style="margin-top: 20rpx;">
					快递单号
				</view>
				<uni-card @click="copyTrackingNumber()">
					{{trackingNumber}}
					<view v-if="trackingNumber==''">
						等待卖家上传快递单号
					</view>
				</uni-card>
				<view @click="makeSureReceipt()" v-if="trackingNumber!=''"
					style="width: 60%;height: 100rpx;background: #0bc99d;border-radius: 100rpx;display: flex;justify-content: center;align-items: center;color: #FFFFFF;margin-top: 30rpx;">
					{{trackingState==0 ? '确认收货' : '已收货'}}
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup2" type="center" :animation="true">
			<view
				style="width: 700rpx;height: 900rpx;background: #FFFFFF;border-radius: 10rpx;display: flex;flex-direction: column;align-items: center;">
				<view style="font-size: 15px;font-weight: bold;margin-top: 10rpx;">
					发表评论
				</view>
				<view class="idle" style="width: 90%;margin-top: 10rpx;display: flex;align-items: center;">
					<image :src="idleCover" mode="aspectFill"></image>
					<view style="color: #999999;margin-left: 20rpx;">
						{{idleName}}
					</view>
				</view>
				<view style="width: 90%;margin-top: 30rpx;display: flex;align-items: center;">
					<view style="font-size: 14px;font-weight: bold;">
						描述相符
					</view>
					<view style="margin-left: 20rpx;">
						<uni-rate v-model="idleScore" @change="onChange" />
					</view>
				</view>
				<view style="width: 90%;margin-top: 30rpx;">
					<uni-easyinput :inputBorder="false" type="textarea" v-model="idleScoreDescription"
						placeholder="从多个角度评价宝贝,可以帮助更多想买的人"></uni-easyinput>
				</view>
				<view style="width: 90%;margin-top: 30rpx;">
					<uni-file-picker style="margin-top: 20rpx;" v-model="idleImageList" file-mediatype="image"
						mode="grid" :limit="3" :list-styles="listStyles" :image-styles="imageStyles"
						@progress="progress" @success="success" @fail="fail" @select="select">
						<view
							style="font-size: 12px;color: #999999;flex-direction: column;align-items: center;justify-content: center;">
							<view style="width: 100%;display: flex;justify-content: center;">
								<uni-icons type="camera" size="30"></uni-icons>
							</view>
							<view>
								上传买家秀
							</view>
						</view>
					</uni-file-picker>
				</view>
				<view
					style="width: 90%;margin-top:20rpx;display: flex;align-items: center;background: #fff4ef;color: #ee270b;">
					<uni-icons color="#fcb620" type="paperplane-filled" size="20"></uni-icons>
					<view>
						发图能帮助他人更真实的了解商品～
					</view>
				</view>
				<view @click="submitEvaluate()"
					style="width: 250rpx;height: 100rpx;background:#fd6f0b;display: flex;align-items: center;justify-content: center;color: #FFFFFF;border-radius: 100rpx;margin-top: 30rpx;">
					发布
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
				payCode: "",
				totalPrice: 0,
				sellerEmail: [],
				paySellerEmail: [],
				orderId: "",
				email: "",
				trackingNumber: "",
				trackingState: 0,
				isData: false,
				idleId: "",
				buyerEmail: "",
				idleCover: "",
				idleName: "",
				idleScore: 0,
				idleScoreDescription: "",
				idleImageList: [],
				imageStyles: { //上传封面的风格
					width: 100,
					height: 100,
					border: {
						color: "#c8c8d0",
						width: 1,
						style: 'soild',
						radius: 5
					}
				},
				listStyles: { //上传封面的风格
					// 是否显示边框
					border: true,
					// 是否显示分隔线
					dividline: true,
					// 线条样式
					borderStyle: {
						width: 1,
						color: 'blue',
						radius: 2
					}
				}
			}
		},
		onLoad() {
			this.getMyBuyOrder()
		},
		methods: {
			getMyBuyOrder() {
				uni.getStorage({
					key: 'userinfo',
					success: (res1) => {
						console.log(res1.data)
						let data = {
							email: res1.data.email,
							orderState: 3,
							method: "getMyBuyOrder"
						}
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
			getPayCode(id, payWay, price, sellerEmail, paySellerEmail, orderId) {
				console.log(id)
				console.log(payWay)
				console.log(price)
				console.log(sellerEmail)
				console.log(paySellerEmail)
				console.log(orderId)
				this.payEmail = id
				this.sellerEmail = sellerEmail
				this.paySellerEmail = paySellerEmail
				this.orderId = orderId
				this.totalPrice = price
				if (paySellerEmail.indexOf(id) == -1) {
					this.$refs.popup.open('center')
					let data = {
						email: id,
						method: "getPayCode"
					}
					uniCloud.callFunction({
							name: "payWayController",
							data: data
						})
						.then((res) => {
							uni.hideLoading()
							console.log(res)
							if (res.result.data.length != 0) {
								this.payCode = res.result.data[0][payWay]
								console.log(this.payCode)
							} else {
								this.payCode = ""
							}
						})
						.catch((err) => {
							console.log(err)
						})
				}
			},
			makeSurePay() {
				console.log(this.orderId)
				console.log(this.payEmail)
				console.log(this.sellerEmail)
				console.log(this.paySellerEmail)
				uni.showModal({
					title: '提示',
					content: '确保您已经支付成功再点击确认支付哦！',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							let data = {
								_id: this.orderId,
								payEmail: this.payEmail,
								method: "payOrder"
							}
							uniCloud.callFunction({
									name: "orderController",
									data: data
								})
								.then((res) => {
									uni.hideLoading()
									console.log(res)
									if (res.result.affectedDocs != 0) {
										uni.showToast({
											duration: 1500,
											title: '支付成功！',
											mask: true,
											icon: 'none'
										})
										this.getMyBuyOrder()
										this.$refs.popup.close()
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
			},
			getTrackingNumber(shipEmailList, receiptEmailList, orderId, sellerEmail) {
				this.orderId = orderId
				this.sellerEmail = sellerEmail
				console.log(this.orderId)
				console.log(this.sellerEmail)
				console.log(shipEmailList)
				console.log(receiptEmailList)
				if (shipEmailList.indexOf(sellerEmail) != -1) {
					if (receiptEmailList.indexOf(sellerEmail) == -1) {
						let data = {
							orderId: this.orderId,
							sellerEmail: this.sellerEmail,
							method: "getTrackingNumber"
						}
						this.$refs.popup1.open('center')
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
								} else {
									this.trackingNumber = ""
									this.trackingState = 0
								}
							})
							.catch((err) => {
								console.log(err)
							})
					}
				}
			},
			previewImg() {
				uni.previewImage({
					urls: [this.payCode]
				})
			},
			copyTrackingNumber() {
				uni.setClipboardData({
					data: this.trackingNumber,
					success: function() {
						console.log('success');
					}
				});
			},
			makeSureReceipt() {
				if (this.trackingState == 0) {
					uni.showModal({
						title: '提示',
						content: '确认收到货之后确认收货哦！',
						success: (res) => {
							if (res.confirm) {
								console.log('用户点击确定');
								let data = {
									orderId: this.orderId,
									sellerEmail: this.sellerEmail,
									trackingState: 1,
									method: "makeSureReceipt"
								}
								uniCloud.callFunction({
										name: "trackingNumController",
										data: data
									})
									.then((res) => {
										uni.hideLoading()
										console.log(res)
										if (res.result.affectedDocs != 0) {
											let receipt = {
												orderId: this.orderId,
												sellerEmail: this.sellerEmail,
												method: "addReceipt"
											}
											uniCloud.callFunction({
													name: "orderController",
													data: receipt
												})
												.then((res1) => {
													uni.hideLoading()
													console.log(res1)
													if (res1.result.affectedDocs != 0) {
														uni.showToast({
															duration: 1500,
															title: '确认收货成功！',
															mask: true,
															icon: 'none'
														})
														this.getMyBuyOrder()
														this.$refs.popup1.close()
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
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			makeSureOrderReceipt(orderId, orderState, sellerEmail, receiptEmailList) {
				if (orderState == 0) {
					uni.showModal({
						title: '提示',
						content: '请确保订单所有商品都收到再确认收货哦！',
						success: (res) => {
							if (res.confirm) {
								console.log('用户点击确定');
								if (this.same(sellerEmail, receiptEmailList)) {
									let data = {
										orderId: orderId,
										orderState: 1,
										method: "makeSureOrderReceipt"
									}
									uniCloud.callFunction({
											name: "orderController",
											data: data
										})
										.then((res) => {
											uni.hideLoading()
											console.log(res)
											if (res.result.affectedDocs != 0) {
												uni.showToast({
													duration: 1500,
													title: '确认收货成功待评价！',
													mask: true,
													icon: 'none'
												})
												this.getMyBuyOrder()
											}
										})
										.catch((err) => {
											console.log(err)
										})
								} else {
									uni.showToast({
										duration: 1500,
										title: '有物品尚未收货！',
										mask: true,
										icon: 'none'
									})
								}
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			completeEvaluation(orderId, orderState, idleIdList, evaluateIdleIdList) {
				if (orderState == 1) {
					uni.showModal({
						title: '提示',
						content: '完成所有商品的评价了之后再结束订单哦！',
						success: (res) => {
							if (res.confirm) {
								console.log('用户点击确定');
								if (this.same(idleIdList, evaluateIdleIdList)) {
									let data = {
										orderId: orderId,
										orderState: 2,
										method: "completeEvaluation"
									}
									uniCloud.callFunction({
											name: "orderController",
											data: data
										})
										.then((res) => {
											uni.hideLoading()
											console.log(res)
											if (res.result.affectedDocs != 0) {
												uni.showToast({
													duration: 1500,
													title: '确认评价成功订单已完成！',
													mask: true,
													icon: 'none'
												})
												this.getMyBuyOrder()
											}
										})
										.catch((err) => {
											console.log(err)
										})
								} else {
									uni.showToast({
										duration: 1500,
										title: '有物品尚未评价！',
										mask: true,
										icon: 'none'
									})
								}
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			applyAfterSales(orderId, orderState) {
				if (orderState == 2) {
					uni.showModal({
						title: '确定申请售后吗？',
						content: '申请售后请到闲置详情页联系卖家！',
						success: (res) => {
							if (res.confirm) {
								console.log('用户点击确定');
								let data = {
									orderId: orderId,
									orderState: 2,
									method: "completeEvaluation"
								}
								uniCloud.callFunction({
										name: "orderController",
										data: data
									})
									.then((res) => {
										uni.hideLoading()
										console.log(res)
										if (res.result.affectedDocs != 0) {
											uni.showToast({
												duration: 1500,
												title: '确认售后成功订单已完成！',
												mask: true,
												icon: 'none'
											})
											this.getMyBuyOrder()
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
			},
			finishAfterSales(orderId, orderState) {
				if (orderState == 3) {
					uni.showModal({
						title: '提示',
						content: '确定完成售后吗？',
						success: (res) => {
							if (res.confirm) {
								console.log('用户点击确定');
								let data = {
									orderId: orderId,
									orderState: 2,
									method: "applyAfterSales"
								}
								uniCloud.callFunction({
										name: "orderController",
										data: data
									})
									.then((res) => {
										uni.hideLoading()
										console.log(res)
										if (res.result.affectedDocs != 0) {
											uni.showToast({
												duration: 1500,
												title: '申请售后成功！',
												mask: true,
												icon: 'none'
											})
											this.getMyBuyOrder()
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
			},
			cancelOrder(id) {
				uni.showModal({
					title: '提示',
					content: '确认取消此订单吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							let data = {
								id: id,
								method: "removeOrder"
							}
							uniCloud.callFunction({
									name: "orderController",
									data: data
								})
								.then((res) => {
									uni.hideLoading()
									console.log(res)
									if (res.result.affectedDocs != 0) {
										uni.showToast({
											duration: 1500,
											title: '取消订单成功！',
											mask: true,
											icon: 'none'
										})
										this.getMyBuyOrder()
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
			},
			evaluateItem(evaluateIdleIdList, orderId, idleId, buyerEmail, idleCover, idleName) {
				if (evaluateIdleIdList.indexOf(idleId) == -1) {
					console.log(orderId)
					console.log(idleId)
					console.log(buyerEmail)
					console.log(idleCover)
					console.log(idleName)
					this.orderId = orderId
					this.idleId = idleId
					this.buyerEmail = buyerEmail
					this.idleCover = idleCover
					this.idleName = idleName
					this.idleScore = 0
					this.idleScoreDescription = ""
					this.idleImageList = []
					this.$refs.popup2.open('center')
				}
			},
			onChange(e) {
				console.log(e.value)
			},
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},
			// 上传成功
			success(e) {
				console.log('上传成功')
				console.log(this.idleImageList)
			},
			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			submitEvaluate() {
				var myDate = new Date()
				let idleEvaluate = {
					orderId: this.orderId,
					idleId: this.idleId,
					buyerEmail: this.buyerEmail,
					idleCover: this.idleCover,
					idleName: this.idleName,
					idleScore: this.idleScore,
					idleScoreDescription: this.idleScoreDescription,
					idleImageList: this.idleImageList,
					submitTime: myDate.getTime(),
					method: "uploadEvaluate"
				}
				console.log(idleEvaluate)
				uniCloud.callFunction({
						name: "idleEvaluateController",
						data: idleEvaluate
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						if (res.result.id) {
							let idleId = {
								orderId: this.orderId,
								idleId: this.idleId,
								method: "addEvaluate"
							}
							uniCloud.callFunction({
									name: "orderController",
									data: idleId
								})
								.then((res) => {
									uni.hideLoading()
									console.log(res)
									if (res.result.affectedDocs != 0) {
										uni.showToast({
											duration: 1500,
											title: '评价成功！',
											mask: true,
											icon: 'none'
										})
										this.getMyBuyOrder()
										this.$refs.popup2.close()
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
			},
			same(aa, bb) {
				if (aa.length != bb.length) {
					return false
				} else {
					let cc = [...bb];
					for (let item in aa) {
						for (let it in cc) {
							if (aa[item] === cc[it]) {
								cc.splice(it, 1)
								// console.log(cc);
							}
						}
					}
					return cc.length < 1 ? true : false;
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

	.idle image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 10rpx;
	}
</style>
