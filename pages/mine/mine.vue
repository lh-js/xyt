<template>
	<view class="page">
		<view class="background-view"> </view>
		<view class="userInfo-box">
			<image v-if="isLogin" class="userImage" :src="userAvatar" @click="toUserMessage()" mode="aspectFill">
			</image>
			<view v-if="isLogin" class="user-text">
				<view class="view-item text-overflow">{{userName}}</view>
				<view class="view-item text-overflow" style="font-size: 12px;">账号：{{email}}</view>
			</view>
			<view v-if="isLogin" class="config flex-center">
				<image @click="toModifyPWD()"
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/49d95c4a-8f57-4356-bf22-a65a5d4990c9.png">
				</image>
			</view>
			<view v-if="!isLogin" class="unlogin flex-center">
				<view class="unlogin-txt">
					登录校园通
				</view>
				<view class="tologin" @click="toLogin()">
					去登陆
				</view>
			</view>
		</view>
		<view class="user-info-card">
			<view class="item" @click="toMyIdle()">
				<view class="item-1 text-overflow">我的闲置</view>
				<view class="item-2 text-overflow">{{idleCount}}</view>
			</view>
			<view class="item" @click="toMyLost()">
				<view class="item-1 text-overflow">我的寻物</view>
				<view class="item-2 text-overflow">{{lostCount}}</view>
			</view>
			<view class="item" @click="toMyRecruit()">
				<view class="item-1 text-overflow">我的招领</view>
				<view class="item-2 text-overflow">{{recruitCount}}</view>
			</view>
			<view class="item" @click="toMyForum()">
				<view class="item-1 text-overflow">我的论坛</view>
				<view class="item-2 text-overflow">{{forumCount}}</view>
			</view>
		</view>
		<view class="list-box">
			<view class="box">
				<view class="box-title">
					<view class="text1">订单中心</view>
					<!-- <view class="text2"><text>查看全部</text>
						<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/2c14b1f2-0718-487e-8975-88cc91ed0c91.png"></image>
					</view> -->
				</view>
				<view class="box-content">
					<view v-for="(item, index) in list1" :key="index" class="item" @click="skipMethod1(item.pathUrl)">
						<view class="item1 flex-center">
							<image :src="item.imgPath"></image>
						</view>
						<view class="item2 text-overflow flex-center">
							{{ item.imgText }}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="list-box">
			<view class="box">
				<view class="box-title">
					<view class="text1">我的服务</view>
				</view>
				<view class="box-content">
					<view v-for="(item, index) in list2" :key="index" class="item" @click="skipMethod2(item.pathUrl)">
						<view class="item1 flex-center">
							<image :src="item.imgPath"></image>
						</view>
						<view class="item2 text-overflow flex-center">
							{{ item.imgText }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//import {  } from "@/common/api/{$}.js";
	export default {
		data() {
			return {
				isLogin: false, //是否登录
				id: "",
				email: "",
				userName: "",
				userAvatar: "",
				list1: [{
						// 图片路径
						imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/4b7c00dc-9199-4faa-b32f-e8d4384d0b3d.png",
						// 图片文字
						imgText: "我买的",
						// 此区域点击跳转的页面
						pathUrl: "1",
					},
					{
						// 图片路径
						imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/80f56526-c0fd-4931-b1dd-6e3f122f0732.png",
						// 图片文字
						imgText: "我卖的",
						// 此区域点击跳转的页面
						pathUrl: "2",
					},
					// {
					// 	// 图片路径
					// 	imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/4b7c00dc-9199-4faa-b32f-e8d4384d0b3d.png",
					// 	// 图片文字
					// 	imgText: "我买到的",
					// 	// 此区域点击跳转的页面
					// 	pathUrl: "3",
					// },
					// {
					// 	// 图片路径
					// 	imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/80f56526-c0fd-4931-b1dd-6e3f122f0732.png",
					// 	// 图片文字
					// 	imgText: "我卖出的",
					// 	// 此区域点击跳转的页面
					// 	pathUrl: "4",
					// },
					// {
					// 	// 图片路径
					// 	imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/547286c2-a491-47b9-87d3-b94603b3beee.png",
					// 	// 图片文字
					// 	imgText: "待收货",
					// 	// 此区域点击跳转的页面
					// 	pathUrl: "5",
					// },
					// {
					// 	// 图片路径
					// 	imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/2742a0e7-c6b6-4bf4-a00d-7d4cb8abfb13.png",
					// 	// 图片文字
					// 	imgText: "待评价",
					// 	// 此区域点击跳转的页面
					// 	pathUrl: "6",
					// },
					{
						// 图片路径
						imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/226d5e14-a92c-4af3-8238-bd6114b3a6ed.png",
						// 图片文字
						imgText: "售后(买)",
						// 此区域点击跳转的页面
						pathUrl: "3",
					},
					{
						// 图片路径
						imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/226d5e14-a92c-4af3-8238-bd6114b3a6ed.png",
						// 图片文字
						imgText: "售后(卖)",
						// 此区域点击跳转的页面
						pathUrl: "4",
					}
				],
				list2: [
					// {
					// 	// 图片路径
					// 	imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/254d02d7-e880-4684-846c-04cc52a57ec5.png",
					// 	// 图片文字
					// 	imgText: "我的推广",
					// 	// 此区域点击跳转的页面
					// 	pathUrl: "1",
					// },
					{
						// 图片路径
						imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/9626da0d-92f7-430d-856f-147229590890.png",
						// 图片文字
						imgText: "我的收款码",
						// 此区域点击跳转的页面
						pathUrl: "2",
					},
					{
						// 图片路径
						imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/4172a0a6-875c-46ce-ba4e-9b6b687bc6de.png",
						// 图片文字
						imgText: "地址信息",
						// 此区域点击跳转的页面
						pathUrl: "3",
					}
					// ,
					// {
					// 	// 图片路径
					// 	imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/d0194411-848a-4797-8777-e3d2f221a4b6.png",
					// 	// 图片文字
					// 	imgText: "我的收藏",
					// 	// 此区域点击跳转的页面
					// 	pathUrl: "4",
					// },
					// {
					// 	// 图片路径
					// 	imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/aaa5b0ba-8ba2-4cb0-b7f3-6b8bae01ca45.png",
					// 	// 图片文字
					// 	imgText: "优惠卷",
					// 	// 此区域点击跳转的页面
					// 	pathUrl: "5",
					// },
					// {
					// 	// 图片路径
					// 	imgPath: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/7b8775e9-6a5f-4421-a5b8-bd2647be126e.png",
					// 	// 图片文字
					// 	imgText: "我的会员",
					// 	// 此区域点击跳转的页面
					// 	pathUrl: "6",
					// }
				],
				forumCount: 0,
				recruitCount: 0,
				lostCount: 0,
				idleCount: 0
			};
		},
		//监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad
		onInit() {},
		//监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
		onLoad() {
			// console.log(options.isLogin)
			// this.isLogin=options.isLogin
			this.checkLogin()

		},
		//监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady() {

		},
		onShow() {
			this.getMyForumCount()
			this.getMyRecruitCount()
			this.getMyLostCount()
			this.getMyIdleCount()
		},
		//监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		beforeDestroy() {

		},
		//页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
		onReachBottom() {},
		onShareAppMessage(res) {},
		created() {

		},
		methods: {
			checkLogin() {
				var that = this
				uni.getStorage({
					key: 'userinfo',
					success: function(res) {
						uni.showLoading({
							mask: true
						})
						console.log(res.data);
						// that.email=res.data.email
						// that.userName=res.data.userName
						// that.userAvatar=res.data.userAvatar
						that.email = res.data.email
						// that.isLogin=true
						let data = {
							email: that.email,
							method: "getUserInfo"
						}
						uniCloud.callFunction({
								name: "userController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								that.userName = res.result.data[0].userName
								// that.email = res.result.data[0].email
								that.userAvatar = res.result.data[0].userAvatar
								that.isLogin = true
							})
							.catch((err) => {
								console.log(err)
							})
					}
				});
			},
			skipMethod1(param) {
				console.log(param)
				if (param == 1) {
					uni.navigateTo({
						url: "../myBuyOrder/myBuyOrder"
					})
				} else if (param == 2) {
					uni.navigateTo({
						url: "../mySellOrder/mySellOrder"
					})
				} else if (param == 3) {
					uni.navigateTo({
						url: "../buyAfterSales/buyAfterSales"
					})
				} else if (param == 4) {
					uni.navigateTo({
						url: "../sellAfterSales/sellAfterSales"
					})
				}
			},
			// 跳转页面
			skipMethod2(param) {
				console.log(param)
				if (param == 2) {
					uni.navigateTo({
						url: "../myReceiptCode/myReceiptCode"
					})
				} else if (param == 3) {
					uni.navigateTo({
						url: "../shippingAddress/shippingAddress"
					})
				}
			},
			toLogin() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			toUserMessage() {
				uni.navigateTo({
					url: "../userMessage/userMessage?email=" + this.email
				})
			},
			toModifyPWD() {
				uni.navigateTo({
					url: "../modfiyPWD/modfiyPWD?email=" + this.email
				})
			},
			toMyForum() {
				uni.getStorage({
					key: 'userinfo',
					success: function(res) {
						uni.navigateTo({
							url: "../myForum/myForum"
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
			toMyRecruit() {
				uni.getStorage({
					key: 'userinfo',
					success: function(res) {
						uni.navigateTo({
							url: "../myRecruit/myRecruit"
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
			toMyLost() {
				uni.getStorage({
					key: 'userinfo',
					success: function(res) {
						uni.navigateTo({
							url: "../myLost/myLost"
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
			toMyIdle() {
				uni.getStorage({
					key: 'userinfo',
					success: function(res) {
						uni.navigateTo({
							url: "../myIdle/myIdle"
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
			getMyForumCount() {
				var that = this
				uni.getStorage({
					key: 'userinfo',
					success: function(res) {
						console.log(res.data);
						let data = {
							email: res.data.email,
							method: "getMyforumCount"
						}
						console.log(data)
						uniCloud.callFunction({
								name: "forumController",
								data: data
							})
							.then((res) => {
								console.log(res)
								that.forumCount = res.result.total
							})
							.catch((err) => {
								console.log(err)
							})
					}
				});
			},
			getMyRecruitCount() {
				var that = this
				uni.getStorage({
					key: 'userinfo',
					success: function(res) {
						console.log(res.data);
						let data = {
							email: res.data.email,
							method: "getMyRecruitCount"
						}
						console.log(data)
						uniCloud.callFunction({
								name: "recruitController",
								data: data
							})
							.then((res) => {
								console.log(res)
								that.recruitCount = res.result.total
							})
							.catch((err) => {
								console.log(err)
							})
					}
				});
			},
			getMyLostCount() {
				var that = this
				uni.getStorage({
					key: 'userinfo',
					success: function(res) {
						console.log(res.data);
						let data = {
							email: res.data.email,
							method: "getMyLostCount"
						}
						console.log(data)
						uniCloud.callFunction({
								name: "lostController",
								data: data
							})
							.then((res) => {
								console.log(res)
								that.lostCount = res.result.total
							})
							.catch((err) => {
								console.log(err)
							})
					}
				});
			},
			getMyIdleCount() {
				var that = this
				uni.getStorage({
					key: 'userinfo',
					success: function(res) {
						console.log(res.data);
						let data = {
							email: res.data.email,
							method: "getMyIdleCount"
						}
						console.log(data)
						uniCloud.callFunction({
								name: "idleController",
								data: data
							})
							.then((res) => {
								console.log(res)
								that.idleCount = res.result.total
							})
							.catch((err) => {
								console.log(err)
							})
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.page {
		position: relative;
		height: 100vh;
		background-color: #f2f2f2;
		animation: text linear 0.4s;
	}

	.background-view {
		height: 30%;
		background-color: #0bc99d;
		border-bottom-left-radius: 50%;
		border-bottom-right-radius: 50%;
	}

	@keyframes text {
		0% {
			transform: translate(-100%, 0);
		}

		100% {
			transform: translate(0, 0);
		}
	}

	.userInfo-box {
		top: 4%;
		position: absolute;
		width: 80%;
		left: 50%;
		transform: translate(-50%, 0);
		height: 120rpx;
		padding: 20rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		flex-wrap: wrap;

		.userImage {
			width: 20%;
			height: 100%;
			border-radius: 50%;
		}

		.user-text {
			width: 70%;
			color: white;
			font-size: 1em;

			.view-item {
				margin-left: 20rpx;
				line-height: 2;
			}
		}

		.config {
			width: 10%;
			overflow: hidden;
			height: 100%;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.user-info-card {
		top: 18%;
		position: absolute;
		width: 80%;
		left: 50%;
		transform: translate(-50%, 0);
		height: 100rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 30rpx;
		background-color: white;
		border-radius: 40rpx;
		box-shadow: 0px 1px 2px #e3e3e3;

		.item {
			width: 35%;
			display: flex;
			align-items: center;
			flex-direction: column;
			height: 100%;

			.item-1 {
				color: #0bc99d;
				font-size: 14px;
				width: 100%;
				text-align: center;
			}

			.item-2 {
				text-align: center;
				width: 100%;
				margin-top: 10rpx;
			}
		}
	}

	.text-overflow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list-box {
		// height: 380rpx;
		padding: 30rpx;

		// background-color: lightgreen;
		.box {
			background-color: white;
			width: 100%;
			height: 90%;
			display: flex;
			flex-direction: column;
			border-radius: 20rpx;
			box-shadow: 0px 1px 2px #e3e3e3;

			.box-title {
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2px solid #d8d8d8;

				.text1 {
					font-size: 1.3em;
					text-indent: 1em;
				}

				.text2 {
					color: #d8d8d8;
					font-size: 1.2em;
					display: flex;
					align-items: center;
					margin-right: 20rpx;

					image {
						margin-left: 20rpx;
						width: 40rpx;
						height: 40rpx;
					}
				}
			}

			.box-content {
				height: 60%;
				padding: 20rpx 40rpx 40rpx 40rpx;
				display: flex;
				justify-content: start;
				flex-wrap: wrap;

				.item {
					width: 25%;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-top: 20rpx;
					height: 100%;

					.item1 {
						height: 50%;
						width: 100%;
						text-align: center;

						image {
							width: 65rpx;
							height: 65rpx;
						}
					}

					.item2 {
						height: 50%;
						width: 100%;
						font-size: 0.9em;
					}
				}
			}
		}
	}

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.unlogin .unlogin-txt {
		color: #FFFFFF;
	}

	.unlogin {
		display: flex;
		flex-direction: column;
		margin-top: -30rpx;
	}

	.unlogin .tologin {
		width: 300rpx;
		height: 60rpx;
		background: linear-gradient(to right, #ff8f77, #ffaa00);
		border-radius: 60rpx;
		margin-top: 10rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 60rpx;
	}
</style>
