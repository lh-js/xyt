<template>
	<view class="shopping-car">
		<view style="height: 80rpx;">

		</view>
		<view class="cart-header">
			<view class="manager" @click="switchIsDetele()">
				<text v-if="!isDelete">管理</text>
				<text v-if="isDelete">完成</text>
			</view>
		</view>
		<uni-card style="border-radius: 20rpx;" v-for="(item,index) in shoppingCarDataList" :key="item._id"
			v-if="!isShoppingcarEmpty">
			<view class="cart-item">
				<view class="cart-item-user" style="display: flex;">
					<view class="cart-itemleft" style="margin-right: 35rpx;">
						<image @click="checkIdleUser(item.ischecked==item.shopingcar_info.length,item._id)"
							v-if="item.ischecked==item.shopingcar_info.length" src="../../static/checkbox.png"
							mode="widthFix"></image>
						<image @click="checkIdleUser(item.ischecked==item.shopingcar_info.length,item._id)"
							v-if="!(item.ischecked==item.shopingcar_info.length)" src="../../static/checkbox1.png"
							mode="widthFix"></image>
					</view>
					<uni-icons type="shop-filled" size="30" color="#0bc99d"></uni-icons>
					{{item.shopingcar_info[0].idleUserName}}
					<uni-icons type="right" size="20"></uni-icons>
				</view>
				<view style="display: flex;justify-content: space-between;margin: 15rpx 0"
					v-for="(item1,index1) in item.shopingcar_info" :key="item1._id">
					<view class="cart-itemleft">
						<image @click="checkItem(item1.isChecked,item1._id)" v-if="item1.isChecked==1"
							src="../../static/checkbox.png" mode="widthFix"></image>
						<image @click="checkItem(item1.isChecked,item1._id)" v-if="!item1.isChecked==1"
							src="../../static/checkbox1.png" mode="widthFix"></image>
					</view>
					<view class="cart-itemright">
						<view class="cart-image">
							<image @click="toIdleDetail(item1.idleId)" :src="item1.idleCover" mode="aspectFill"></image>
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
								<uni-number-box v-model="item1.amount" :min="1" :max="item1.stockCount"
									@change="changeAmount($event,item1._id)"></uni-number-box>
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-card>
		<view style="width: 100%;display: flex;justify-content: center;" v-if="isShoppingcarEmpty">
			<image
				src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a0439cf-af57-474f-b688-798babb30901/24cb561d-a7b9-4fa5-84da-4f14dadcaabe.png"
				mode="aspectFill"></image>
		</view>

		<view class="cart-footer">
			<view class="all-check">
				<image @click="allCheck(allCount ==0 ? false : allCount==checkedCount)"
					v-if="allCount ==0 ? false : allCount==checkedCount" src="../../static/checkbox.png"
					mode="widthFix"></image>
				<image @click="allCheck(allCount ==0 ? false : allCount==checkedCount)"
					v-if="!(allCount ==0 ? false : allCount==checkedCount)" src="../../static/checkbox1.png"
					mode="widthFix"></image>
				<view class="all-checktxt">
					全选
				</view>
			</view>
			<view class="cart-pay">
				<view v-if="!isDelete" class="all-money">
					<text style="color: #999999;font-size: 14px;margin-right: 5rpx;"
						v-if="totalSum!=0">已选{{totalSum}}件</text>
					<text>合计: </text><text style="color: red;font-size: 12px;">￥</text> <text
						style="color: red;font-size: 15px;">{{totalPrice}}</text>
				</view>
				<view v-if="!isDelete" class="pay-button" @click="toPay()">
					结算
				</view>
				<view @click="removeShoppingcarChecked()" class="pay-button" style="background: #fe0849 !important;"
					v-if="isDelete">
					删除
				</view>
			</view>
		</view>
		<view style="height: 100rpx;">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDelete: false,
				shoppingCarDataList: [],
				isShoppingcarEmpty: false,
				allCount: 0,
				checkedCount: 0,
				totalPrice: 0,
				myEmail: "",
				totalSum: 0,
				checkedData: []
			}
		},
		onLoad() {
			this.getTotalPrice()
			this.initCheck()
		},
		onShow() {
			this.initShoppingCar()
			this.getAllCount()
			this.getCheckedCount()
		},
		methods: {
			switchIsDetele() {
				if (this.isDelete) {
					this.isDelete = false
				} else {
					this.isDelete = true
				}
			},
			initShoppingCar() {
				uni.showLoading({
					mask: true
				})
				var that = this
				uni.getStorage({
					key: 'userinfo',
					success: (res1) => {
						console.log(res1.data)
						this.myEmail = res1.data.email
						let data = {
							myEmail: res1.data.email,
							method: "getShoppingCarData"
						}
						uniCloud.callFunction({
								name: "shoppingcarController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								console.log(res.result.data)
								if (res.result.data.length != 0) {
									this.isShoppingcarEmpty = false
									this.shoppingCarDataList = res.result.data
								} else {
									this.isShoppingcarEmpty = true
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
			initCheck() {
				uni.showLoading({
					mask: true
				})
				var that = this
				uni.getStorage({
					key: 'userinfo',
					success: (res1) => {
						console.log(res1.data)
						let data = {
							isChecked: 0,
							myEmail: res1.data.email,
							method: "cancelOrAllCheck"
						}
						uniCloud.callFunction({
								name: "shoppingcarController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								if (res.result.affectedDocs != 0) {
									this.initShoppingCar()
									this.getAllCount()
									this.getCheckedCount()
									this.getTotalPrice()
									this.getTotalSum()
									this.getCheckedData()
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
			getUserName(email) {
				let data = {
					email: email,
					method: "getUserInfo"
				}
				uniCloud.callFunction({
						name: "userController",
						data: data
					})
					.then((res) => {
						console.log(res)
						console.log(res.result.data[0].userName)
						return res.result.data[0].userName
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getAllCount() {
				let data = {
					myEmail: this.myEmail,
					method: "getAllCount"
				}
				uniCloud.callFunction({
						name: "shoppingcarController",
						data: data
					})
					.then((res) => {
						console.log(res)
						this.allCount = res.result.total
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getCheckedCount() {
				let data = {
					myEmail: this.myEmail,
					method: "getCheckedCount"
				}
				uniCloud.callFunction({
						name: "shoppingcarController",
						data: data
					})
					.then((res) => {
						console.log(res)
						this.checkedCount = res.result.total
					})
					.catch((err) => {
						console.log(err)
					})
			},
			checkItem(isChecked, id) {
				console.log(isChecked)
				if (isChecked == 1) {
					uni.showLoading({
						mask: true
					})
					let data = {
						id: id,
						isChecked: 0,
						method: "cancelOrCheckedItem"
					}
					uniCloud.callFunction({
							name: "shoppingcarController",
							data: data
						})
						.then((res) => {
							uni.hideLoading()
							console.log(res)
							if (res.result.affectedDocs == 1) {
								this.initShoppingCar()
								this.getAllCount()
								this.getCheckedCount()
								this.getTotalPrice()
								this.getTotalSum()
								this.getCheckedData()
							}
						})
						.catch((err) => {
							console.log(err)
						})
				} else if (isChecked == 0) {
					uni.showLoading({
						mask: true
					})
					let data = {
						id: id,
						isChecked: 1,
						method: "cancelOrCheckedItem"
					}
					uniCloud.callFunction({
							name: "shoppingcarController",
							data: data
						})
						.then((res) => {
							uni.hideLoading()
							console.log(res)
							if (res.result.affectedDocs == 1) {
								this.initShoppingCar()
								this.getAllCount()
								this.getCheckedCount()
								this.getTotalPrice()
								this.getTotalSum()
								this.getCheckedData()
							}
						})
						.catch((err) => {
							console.log(err)
						})
				}
			},
			checkIdleUser(isChecked, id) {
				console.log(isChecked)
				console.log(id)
				if (isChecked) {
					uni.showLoading({
						mask: true
					})
					let data = {
						id: id,
						isChecked: 0,
						myEmail: this.myEmail,
						method: "cancelOrCheckedIdleUser"
					}
					uniCloud.callFunction({
							name: "shoppingcarController",
							data: data
						})
						.then((res) => {
							uni.hideLoading()
							console.log(res)
							if (res.result.affectedDocs != 0) {
								this.initShoppingCar()
								this.getAllCount()
								this.getCheckedCount()
								this.getTotalPrice()
								this.getTotalSum()
								this.getCheckedData()
							}
						})
						.catch((err) => {
							console.log(err)
						})
				} else if (!isChecked) {
					uni.showLoading({
						mask: true
					})
					let data = {
						id: id,
						isChecked: 1,
						myEmail: this.myEmail,
						method: "cancelOrCheckedIdleUser"
					}
					uniCloud.callFunction({
							name: "shoppingcarController",
							data: data
						})
						.then((res) => {
							uni.hideLoading()
							console.log(res)
							if (res.result.affectedDocs != 0) {
								this.initShoppingCar()
								this.getAllCount()
								this.getCheckedCount()
								this.getTotalPrice()
								this.getTotalSum()
								this.getCheckedData()
							}
						})
						.catch((err) => {
							console.log(err)
						})
				}
			},
			allCheck(isChecked) {
				console.log(isChecked)
				if (isChecked) {
					uni.showLoading({
						mask: true
					})
					let data = {
						isChecked: 0,
						myEmail: this.myEmail,
						method: "cancelOrAllCheck"
					}
					uniCloud.callFunction({
							name: "shoppingcarController",
							data: data
						})
						.then((res) => {
							uni.hideLoading()
							console.log(res)
							if (res.result.affectedDocs != 0) {
								this.initShoppingCar()
								this.getAllCount()
								this.getCheckedCount()
								this.getTotalPrice()
								this.getTotalSum()
								this.getCheckedData()
							}
						})
						.catch((err) => {
							console.log(err)
						})
				} else if (!isChecked) {
					uni.showLoading({
						mask: true
					})
					let data = {
						isChecked: 1,
						myEmail: this.myEmail,
						method: "cancelOrAllCheck"
					}
					uniCloud.callFunction({
							name: "shoppingcarController",
							data: data
						})
						.then((res) => {
							uni.hideLoading()
							console.log(res)
							if (res.result.affectedDocs != 0) {
								this.initShoppingCar()
								this.getAllCount()
								this.getCheckedCount()
								this.getTotalPrice()
								this.getTotalSum()
								this.getCheckedData()
							}
						})
						.catch((err) => {
							console.log(err)
						})
				}
			},
			changeAmount(amount, id) {
				console.log(id)
				console.log(amount)
				uni.showLoading({
					mask: true
				})
				let data = {
					_id: id,
					amount: amount,
					method: "changeIdleAmount"
				}
				uniCloud.callFunction({
						name: "shoppingcarController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						if (res.result.affectedDocs != 0) {
							this.initShoppingCar()
							this.getAllCount()
							this.getCheckedCount()
							this.getTotalPrice()
							this.getTotalSum()
							this.getCheckedData()
						}
					})
					.catch((err) => {
						console.log(err)
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
						this.initShoppingCar()
						this.getAllCount()
						this.getCheckedCount()
						this.getTotalPrice()
						this.getTotalSum()
						this.getCheckedData()
					})
					.catch((err) => {
						console.log(err)
					})
			},
			toIdleDetail(id) {
				uni.navigateTo({
					url: "../idleDetail/idleDetail?id=" + id
				})
			},
			toPay() {
				if (this.checkedData.length != 0) {
					uni.navigateTo({
						url: "../orderDetail/orderDetail"
					})
				} else {
					uni.showToast({
						duration: 1500,
						title: '请选择要支付的商品!',
						mask: true,
						icon: 'none'
					})
				}
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
			}
		}
	}
</script>

<style>
	/* .shopping-car{
		padding: 0 20px;
	} */
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

	/* .cart-pay .all-money text:nth-child(2) {
		color: red;
		font-size: 12px;
	} */

	/* .cart-pay .all-money text:nth-child(3) {
		color: red;
		font-size: 15px;
	} */
</style>
