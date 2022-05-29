<template>
	<view class="page_edu">
		<view class="page_edu_header">
			<!-- 定位部分 -->
			<view class="position">
				<view class="left" @click="getAddres()">
					<image
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/90713f9d-439a-4d62-be27-9f2fe51e9588.png"
						mode="widthFix"></image>
					<view class="area">
						{{address}}
					</view>
					<image
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/bfae29f1-0693-4301-8f8d-32076b896f7e.png"
						mode="widthFix"></image>
				</view>
				<image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/9d46f643-0ab2-4444-a7c3-931a81e7e001.png"
					class="btn"></image>
			</view>
			<!-- 搜索栏 -->
			<view class="header">
				<!-- <image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/84a204e3-2feb-4667-8275-1f89369f0cdd.png"
					class="btn"></image> -->
				<view class="input">
					<image
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/2420b0d3-f49f-4c46-bdc6-b611d513bcd3.png"
						class="search"></image>
					<input type="text" value="" placeholder="搜索" disabled />
				</view>
				<!-- <image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/ee06c0ad-2d9f-4761-b9ba-4d027db0b857.png"
					class="btn"></image> -->
			</view>
			<!-- 中间部分 -->
			<view class="header_content">
				<!-- 左边文字部分 -->
				<view class="left">
					<text class="title">校园通</text>
					<text class="sub_title">你的校园平台</text>
					<text class="btn">立即加入</text>
				</view>
				<!-- 右边图片 -->
				<view>
					<image
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/37a1a843-0651-4dfc-99d1-55873f87d03e.png"
						style="width: 132px;height: 122px;"></image>
				</view>
			</view>
		</view>
		<!-- 主要模块部分 -->
		<view class="page_content">
			<view class="menu">
				<block v-for="(item,index) in menus" :key="index">
					<view class="item" @click="navTo(index)">
						<view class="img_view" :style="{background: item.bg}">
							<image :src="item.icon" class="image"></image>
						</view>
						<text class="txt">{{item.text}}</text>
					</view>
				</block>
			</view>
			<!-- <view class="s_menu">
				<template v-for="(it,i) in second_menus">
					<view class="item" :key="'s_menu_'+i">
						<image :src="it.icon" class="image"></image>
						<text class="txt">{{it.txt}}</text>
					</view>
				</template>
			</view> -->
			<!-- 二手市场猜你喜欢标题 -->
			<!-- <scroll-view scroll-x="true" class="slider">
				<block v-for="(it, i) in records" :key="i">
					<view class="item" :style="{background: it.bg, marginRight: i === records.length - 1 ? '15px' : '0px'}">
						<view class="item_content">
							<view class="title">
								<text class="first">{{it.title}}</text>
								<text class="main">主讲：{{it.mainTeacher}}</text>
								<text class="sub" :style="{color:it.subColor}">标题名称</text>
							</view>
							<image class="image" :src="it.icon"></image>
							<text class="free">免\n费</text>
						</view>
					</view>
				</block>
			</scroll-view> -->
			<!-- 活动轮播图 -->
			<view style="margin: 5px auto;border-radius: 5px;height: 240rpx;width: 95%;">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(item,index) in indexBanner" :key="index">
						<view class="swiper-item">
							<image style="width: 100%;border-radius: 5px;" :src="item.src" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="ad">
				<view class="ad_btn">
					<text class="title">二手市场上新</text>
					<text class="sub_title">猜你喜欢</text>
				</view>
				<image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/7247ca29-4c43-4e65-a7f1-c97d79c07205.png"
					class="bg"></image>
			</view>
		</view>
		<!-- 猜你喜欢商品列表 -->
		<view class="goods-list">
			<view class="title">— 猜你喜欢 —</view>
			<view class="idle-list">
				<view class="idle-item" v-for="(item,index) in idleList" :key="item._id"
					@click="toIdleDetail(item._id,item.twoClass,item.lookCount)">
					<image :src="item.idleImageList[0].fileID" mode="aspectFill"></image>
					<view class="idle-item-title">
						<view class="item-title-tag" v-if="item.isFreeShipping">
							包邮
						</view>
						<text>{{item.idleName}}</text>
					</view>
					<view class="idle-item-describe">
						<view class="item-describe-tag">
							{{item.quality}}
						</view>
						<text>{{item.idleDescribe}}</text>
					</view>
					<view class="idle-item-price">
						<text>￥{{item.idlePrice}}</text>
						<text>{{item.lookCount}}人浏览</text>
					</view>
					<view class="idle-item-user">
						<view class="idle-user">
							<image :src="item.userAvatar" mode="aspectFill"></image>
							<text>{{item.userName}}</text>
						</view>
						<view class="idle-item-state">
							<text v-if="item.idleTradingState==0">
								<text v-if="item.stockCount==0">已售空</text>
								<text v-else>热卖中</text>
							</text>
						</view>
					</view>
				</view>
			</view>
			<view class="loading-text">------没有更多了-----</view>
		</view>
		<uni-popup ref="popup" type="top" background-color="#0bc99d">
			<view style="margin: 0 auto;width: 90%;color: #FFFFFF;display: flex;background:#0bc99d ;">
				请选择定位的学校
				<image style="width: 50rpx;height: 50rpx;"
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/bfae29f1-0693-4301-8f8d-32076b896f7e.png"
					mode="widthFix"></image>
			</view>
			<scroll-view scroll-y="true" class="scroll-Y">
				<uni-card v-for="(item,index) in schoolList" :key="index" @click="getSchool(item.title)">
					<text>{{item.title}}</text>
				</uni-card>
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
	var QQMapWX = require('../../common/location/qqmap-wx-jssdk.js');
	var qqmapsdk;
	export default {
		data() {
			return {
				menus: [{
						"bg": "linear-gradient(0deg,rgba(9,216,162,1),rgba(90,242,217,1))",
						"icon": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/7d9daa6e-258e-42c9-86c0-ae304d82d532.png",
						"text": "学习论坛"
					},
					{
						"bg": "linear-gradient(0deg,rgba(251,184,35,1),rgba(255,228,40,1))",
						"icon": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/f64f13e9-5c3c-452f-b69d-347a3c62bd6b.png",
						"text": "失物招领"
					},
					{
						"bg": "linear-gradient(0deg,rgba(255,126,34,1),rgba(240,184,27,1))",
						"icon": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/6c22fd49-a52b-4a88-bd24-696b561784b8.png",
						"text": "跳蚤市场"
					},
					{
						"bg": "linear-gradient(0deg,rgba(9,177,252,1),rgba(24,200,255,1))",
						"icon": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/f98a58bf-925c-4963-b188-cea85db3fa11.png",
						"text": "校园活动"
					}
				], //主要模块按钮
				indexBanner: [{
						"src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/dfef6b7f-0284-4308-b4c2-e2f0bf87ca96.jpg"
					},
					{
						"src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/0374c999-a1f7-4033-92f0-d9f38f2cc8db.jpg"
					},
					{
						"src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/d35e23bb-0cd7-412d-83ea-964b645cc480.jpg"
					},
					{
						"src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/c9e4b029-f27b-40e9-974c-1eb351d4eb87.jpg"
					}
				], //轮播图
				productList: [], //猜你喜欢列表
				address: "点击定位", //定位
				schoolList: [], //定位学校列表
				idleList: []
			}
		},
		onLoad() {
			qqmapsdk = new QQMapWX({
				key: 'EISBZ-V2V34-C4GUF-D4AC6-X7YA7-H5BRJ'
			});
			// this.getButton()
			// this.getBanner()
			// this.getReGoods()
			// this.findNearbySchool()
			this.showSchool()
			this.getIdleByTwoClass()
		},
		onShow() {
			this.getIdleByTwoClass()
		},
		methods: {
			getButton() { //获取主要模块按钮
				uniCloud.callFunction({
						name: 'getIndexButton'
					})
					.then((res) => {
						this.menus = res.result.data
						// console.log(res.result.data)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getBanner() { //获取轮播图
				uniCloud.callFunction({
						name: 'getIndexBanner'
					})
					.then((res) => {
						this.indexBanner = res.result.data
						// console.log(res.result.data)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			// getReGoods() { //获取推荐商品列表
			// 	uniCloud.callFunction({
			// 			name: 'getIndexProducts'
			// 		})
			// 		.then((res) => {
			// 			this.productList = res.result.data
			// 			// console.log(res.result.data)
			// 		})
			// 		.catch((err) => {
			// 			console.log(err)
			// 		})
			// },
			navTo(id) { //跳转到主要模块
				console.log(id)
				if (id == 0) {
					uni.navigateTo({
						url: "../learningforum/learningforum"
					})
				} else if (id == 1) {
					uni.navigateTo({
						url: "../lostAndFound/lostAndFound"
					})
				} else if (id == 2) {
					uni.navigateTo({
						url: "../idleTrading/idleTrading"
					})
				} else if (id == 3) {
					uni.navigateTo({
						url: "../schoolNotice/schoolNotice"
					})
				}
			},
			getAddres() { //获取周边学校
				var that = this;
				// 调用接口
				this.$refs.popup.open('top')
				qqmapsdk.search({
					keyword: '学校',
					success: function(res) {
						console.log(res.data);
						that.schoolList = res.data

					},
					fail: function(res) {
						console.log(res);
					}
				});
				// uni.getLocation({
				// 	type: 'wgs84',
				// 	isHighAccuracy: true,
				// 	success: function(res) {
				// 		console.log(res)
				// 		qqmapsdk.reverseGeocoder({
				// 			location: {
				// 				latitude: res.latitude,
				// 				longitude: res.longitude
				// 			} ||
				// 			'', //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
				// 			// get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
				// 			success: function(res) { //成功后的回调
				// 				console.log(res);
				// 				uni.showModal({
				// 					title: '提示',
				// 					content: '是否显示详细地址',
				// 					success: function(res1) {
				// 						if (res1.confirm) {
				// 							that.address = res.result
				// 								.formatted_addresses.recommend
				// 						} else if (res1.cancel) {
				// 							that.address = res.result.ad_info.city
				// 						}
				// 					}
				// 				});

				// 			}
				// 		})
				// 	}
				// });
			},
			getSchool(title) { //选择一个学校作为定位
				this.address = title
				let addressData = {
					address: this.address
				}
				uni.setStorage({
					key: 'address',
					data: addressData,
					success: function() {
						console.log('getAddress success');
					}
				});
				this.$refs.popup.close()
			},
			showSchool() {
				var that = this
				uni.getStorage({
					key: 'address',
					success: (res1) => {
						console.log(res1.data)
						that.address = res1.data.address
					},
					fail(err) {
						console.log("没有选择地址")
					}
				})
			},
			getIdleByTwoClass() {
				uni.showLoading({
					mask: true
				})
				var that = this
				uni.getStorage({
					key: 'class',
					success: (res) => {
						console.log(res)
						let data = {
							value: res.data.twoClass,
							method: "getIdleByTwoClass"
						}
						uniCloud.callFunction({
								name: "idleController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								if (res.result.data.length == 0) {
									that.idleList = []
								} else {
									that.idleList = res.result.data
								}
							})
							.catch((err) => {
								console.log(err)
							})
					},
					fail(err) {
						that.idleList = []
						uni.hideLoading()
					}
				})
			},
			toIdleDetail(id, twoClass, lookCount) {
				console.log(lookCount)
				uni.navigateTo({
					url: "../idleDetail/idleDetail?id=" + id
				})
				let storageData = {
					twoClass: twoClass
				}
				uni.setStorage({
					key: 'class',
					data: storageData,
					success: function() {
						console.log('推荐信息缓存成功！');
					}
				});
				lookCount = lookCount + 1
				let data = {
					id: id,
					lookCount: lookCount,
					method: "increaseLookCount"
				}
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
		}
	}
</script>

<style>
	page {
		width: 100%;
		background-color: #ebebeb;
	}
</style>
<style lang="scss" scoped>
	@function realSize($args) {
		@return $args / 1.5;
	}

	.scroll-Y {
		height: 200px;
		background: #0bc99d;
	}

	.position {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 10px;
		margin-right: 10px;
	}

	.position .left {
		display: flex;
	}

	.position image {
		width: 50rpx;
		height: 50rpx;
	}

	.position .area {
		color: #e6e6e6;
		font-size: 35rpx;
		// margin-left: 5px;
	}

	.page_edu {
		width: 100%;
	}

	.page_edu_header {
		padding-top: 10px;
		background-color: #0bc99d;
		width: 100%;
		height: realSize(415px);

		.header {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: realSize(20px);

			.btn {
				width: realSize(36px);
				height: realSize(30px);
			}

			.input {
				height: 30px;
				width: 100%;
				// margin-left: realSize(5px);
				// margin-right: realSize(5px);
				background: rgba(255, 255, 255, 1);
				border-radius: realSize(30px);
				display: flex;
				flex-direction: row;
				align-items: center;

				.search {
					width: realSize(30px);
					height: realSize(30px);
					margin-left: realSize(20px);
					margin-right: realSize(20px);
				}
			}
		}

		.header_content {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding-right: 10px;

			.left {
				display: flex;
				flex-direction: column;
				width: 52%;
				// margin-top: 10px;
				margin-left: 15px;
				// margin-right: 15px;

				.title {
					width: realSize(419px);
					height: realSize(59px);
					font-size: realSize(47px);
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
				}

				.sub_title {
					margin-top: 3px;
					font-size: realSize(24px);
					font-weight: 400;
					color: rgba(255, 255, 255, 1);

					background: linear-gradient(0deg, rgba(120, 255, 224, 1) 0%, rgba(255, 255, 255, 1) 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				.btn {
					margin-top: 3px;
					width: realSize(198px);
					height: realSize(60px);
					background: linear-gradient(-30deg, rgba(252, 135, 29, 1), rgba(246, 185, 9, 1));
					box-shadow: 0px 4px 10px 0px rgba(255, 121, 0, 0.5);
					border-radius: realSize(30px);
					color: rgba(255, 255, 255, 1);
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.page_content {
		width: 100%;
		margin-top: -74px;

		.menu {
			margin-left: 10px;
			margin-right: 10px;
			padding-left: 10px;
			padding-right: 10px;
			height: realSize(176px);
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 10px 10px 0px rgba(0, 161, 124, 0.1);
			border-radius: 10px;
			display: flex;
			flex-direction: row;
			align-items: stretch;
			justify-content: space-between;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.img_view {
					width: 60px;
					height: 60px;
					border-radius: 30px;
					display: flex;
					align-items: center;
					justify-content: center;

					.image {
						width: 40px;
						height: 40px;
					}
				}

				.txt {
					margin-top: 5px;
					font-size: 14px;
					color: rgba(51, 51, 51, 1);
				}
			}
		}

		.s_menu {
			display: flex;
			flex-direction: row;
			align-items: stretch;
			justify-content: space-between;
			margin-top: 15px;
			margin-left: 10px;
			margin-right: 10px;
			padding-left: 10px;
			padding-right: 10px;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.image {
					width: 35px;
					height: 35px;
				}

				.txt {
					margin-top: 5px;
					font-size: 14px;
					color: rgba(51, 51, 51, 1);
				}
			}
		}

		.ad {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			.bg {
				position: absolute;
				width: 120px;
				height: 105px;
				left: 0;
			}

			.ad_btn {
				width: 100%;
				height: 63px;
				margin: 30px;
				background: linear-gradient(0deg, rgba(253, 155, 28, 1), rgba(251, 197, 33, 1));
				border-radius: 67px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.title {
					font-size: realSize(38px);
					font-family: PingFang-SC-Heavy;
					font-weight: 800;
					color: rgba(255, 255, 255, 1);
				}

				.sub_title {
					background: linear-gradient(0deg, rgba(255, 128, 37, 1), rgba(255, 153, 32, 1));
					box-shadow: 0px 4px 5px 0px rgba(92, 53, 48, 0.3), 0px 1px 0px 0px rgba(228, 228, 228, 1);
					border-radius: realSize(24px);
					font-size: realSize(24px);
					font-family: PingFang-SC-Heavy;
					font-weight: 800;
					font-style: italic;
					color: rgba(255, 236, 177, 1);
					line-height: realSize(26px);
				}
			}
		}
	}

	.slider {
		white-space: nowrap;
		width: 100%;
		background-color: white;

		.item {
			display: inline-block;
			margin-left: 15px;
			margin-top: 13px;
			margin-bottom: 13px;
			width: 60%;
			height: 125px;
			border-radius: 10px;

			.item_content {
				display: flex;
				flex-direction: row;

				.title {
					width: 36%;
					margin: 20px;
					display: flex;
					flex-direction: column;

					.first {
						font-size: 16px;
						color: rgba(46, 65, 69, 1);
					}

					.main {
						font-size: 13px;
						color: rgba(79, 103, 101, 1);
						margin-top: 5px;
					}

					.sub {
						width: 60px;
						font-size: 10px;
						margin-top: 20px;
						background: rgba(255, 255, 255, 0.4);
						border-radius: 5px;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				.image {
					margin-top: 35px;
					width: 80px;
					height: 80px;
				}

				.free {
					background: rgba(11, 147, 252, 1);
					border-radius: 0px 0px 22px 22px;
					width: 25px;
					height: 50px;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FFFFFF;
					font-size: 14px;
				}
			}
		}
	}

	.goods-list {
		background-color: #f4f4f4;

		.title {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 95%;
			padding: 0 2.5% 2.5vw 2.5%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48.75%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;

				image {
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}

				.name {
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.slogan {
						color: #807c87;
						font-size: 24upx;
					}
				}
			}

		}
	}


	.idle-content-top {
		width: 96%;
		height: 300rpx;
		margin: 10rpx auto;
		border: 1px solid #DCDCDC;
		border-radius: 15rpx;
		background: #FFFFFF;

		.idle-top-more {
			width: 96%;
			height: 50rpx;
			margin: 10rpx auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			// border: 1px solid;

			.idle-top-title {
				display: flex;
				align-items: center;

				.idle-title-left {
					font-size: 15px;
					font-weight: bold;
				}

				.idle-title-right {
					background: #fee5c6;
					font-size: 13px;
					margin-left: 3rpx;
					border-radius: 5rpx;
					padding: 0 2rpx;
				}
			}

			.idle-more-button {
				width: 90rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px solid #CACCCE;
				font-size: 12px;
				height: 40rpx;
				color: #a3a3a3;
				border-radius: 40rpx;
			}
		}

		.idle-top-class {
			width: 96%;
			height: 200rpx;
			margin: 10rpx auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			// border: 1px solid;

			.idle-class-item {
				width: 150rpx;
				height: 200rpx;
				display: flex;
				flex-direction: column;
				// border: 1px solid;
				align-items: center;
				justify-content: space-between;

				.class-item-title {
					font-size: 13px;
					font-weight: bold;
				}

				.class-item-describe {
					color: #a4a4a4;
					font-size: 12px;
				}
			}

			.idle-class-item image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 100rpx;
				// border: 1px solid;
			}
		}
	}

	.idle-list {
		width: 96%;
		margin: 10rpx auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.idle-item {
			width: 48%;
			height: 510rpx;
			border: 1px solid #D9D9D9;
			border-radius: 20rpx;
			margin-bottom: 10rpx;
			background: #FFFFFF;
			margin-top: 10rpx;

			.idle-item-title {
				display: flex;
				align-items: center;
				// border: 1px solid;

				.item-title-tag {
					width: 50rpx;
					height: 30rpx;
					background: #0caeff;
					border-radius: 6rpx;
					font-size: 10px;
					color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0 3rpx;
					margin-left: 5rpx;
				}
			}

			.idle-item-title text {
				width: 270rpx;
				font-size: 12px;
				font-weight: bold;
				margin-left: 5rpx;
				overflow: hidden;
				white-space: nowrap;
				/*文字超出宽度则显示ellipsis省略号*/
				text-overflow: ellipsis;
				// border: 1px solid;
			}

			.idle-item-describe {
				display: flex;
				align-items: center;
				margin-top: 10rpx;
				// border: 1px solid;

				.item-describe-tag {
					width: 70rpx;
					height: 30rpx;
					background: #ff0000;
					border-radius: 6rpx;
					font-size: 10px;
					color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0 3rpx;
					margin-left: 5rpx;
				}
			}

			.idle-item-describe text {
				width: 250rpx;
				font-size: 11px;
				// font-weight: bold;
				margin-left: 5rpx;
				overflow: hidden;
				white-space: nowrap;
				/*文字超出宽度则显示ellipsis省略号*/
				text-overflow: ellipsis;
				// border: 1px solid;
			}

			.idle-item-price {
				width: 90%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;
				// border: 1px solid;
			}

			.idle-item-price text:nth-child(1) {
				color: #fe4543;
				font-size: 14px;
				font-weight: bold;
			}

			.idle-item-price text:nth-child(2) {
				color: #a3a3a3;
				font-size: 11px;
			}

			.idle-item-user {
				width: 96%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				// border: 1px solid;
				padding: 0 5rpx;
				box-sizing: border-box;
				margin-top: 10rpx;

				.idle-user {
					display: flex;
					align-items: center;
					// border: 1px solid;
				}

				.idle-user image {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50rpx;
				}

				.idle-user text {
					color: #a2a2a2;
					font-size: 12px;
					margin-left: 10rpx;
				}

				.idle-item-state {
					color: #E43D33;
					font-size: 13px;
					// border: 1px solid;
				}
			}
		}

		.idle-item image {
			width: 100%;
			height: 300rpx;
			border-radius: 20rpx;
		}
	}
</style>
