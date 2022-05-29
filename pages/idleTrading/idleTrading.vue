<template>
	<view>
		<uni-search-bar style="width: 100%;" @confirm="search" @focus="focus" @blur="blur" @cancel="cancel">
		</uni-search-bar>
		<!-- 无数据显示 -->
		<image style="width: 100%;" v-if="isSearchEntiy"
			src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/79633706-4359-482a-9a8d-2409cfac4bef.png"
			mode="widthFix"></image>
		<view class="idle-list">
			<view class="idle-item" v-for="(item,index) in searchIdleList" :key="item._id"
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
		<view class="idle-content" style="background: #f9f9f9;" v-if="!isSearch">
			<view class="idle-content-top">
				<view class="idle-top-more">
					<view class="idle-top-title">
						<view class="idle-title-left">
							闲置优品
						</view>
						<view class="idle-title-right">
							<text>平台保障</text>
							<text>|</text>
							<text>全国包邮</text>
							<text>|</text>
							<text>品质包退</text>
						</view>
					</view>
					<view class="idle-more-button" @click="toidleClass()">
						<text>更多</text>
						<view style="margin-right: -14rpx;">
							<uni-icons type="right"></uni-icons>
						</view>
					</view>
				</view>
				<view class="idle-top-class">
					<view class="idle-class-item" @click="toBoutiqueDigital()">
						<image
							src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a0439cf-af57-474f-b688-798babb30901/3ab05ddd-08f2-49c1-a558-ad5691fd6f7c.jpg"
							mode="aspectFill"></image>
						<view class="class-item-title">
							精品数码
						</view>
						<view class="class-item-describe">
							一年质保
						</view>
					</view>
					<view class="idle-class-item" @click="toLuxuryGoods()">
						<image
							src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a0439cf-af57-474f-b688-798babb30901/08a1264c-6302-41fc-b28a-aba97363151c.jpg"
							mode="aspectFill"></image>
						<view class="class-item-title">
							奢品捡漏
						</view>
						<view class="class-item-describe">
							低价保真
						</view>
					</view>
					<view class="idle-class-item" @click="toTrendyClothesShoes()">
						<image
							src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a0439cf-af57-474f-b688-798babb30901/39a5fd0e-1849-4310-af6c-f9bb6184fcf8.jpg"
							mode="aspectFill"></image>
						<view class="class-item-title">
							潮服潮鞋
						</view>
						<view class="class-item-describe">
							七天包退
						</view>
					</view>
					<view class="idle-class-item" @click="toIdleRanking()">
						<image
							src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a0439cf-af57-474f-b688-798babb30901/3ab05ddd-08f2-49c1-a558-ad5691fd6f7c.jpg"
							mode="aspectFill"></image>
						<view class="class-item-title">
							闲置榜单
						</view>
						<view class="class-item-describe">
							粉丝好评
						</view>
					</view>
				</view>
			</view>
			<view style="width: 100%;background-color: #FFFFFF;z-index: 5;">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#4cd964"></uni-segmented-control>
			</view>
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				items: ["新发", "推荐"],
				idleList: [],
				isSearch: false,
				isSearchEntiy: false,
				searchIdleList: [],
			}
		},
		onLoad() {
			this.getAllIdleList()
		},
		onShow() {
			var that = this;
			if (this.current == 0) {
				this.getAllIdleList()
			} else {
				uni.getStorage({
					key: 'class',
					success: (res) => {
						console.log(res)
						that.getIdleByTwoClass(res.data.twoClass)
					},
					fail(err) {
						that.getAllIdleList()
					}
				})
			}
		},
		methods: {
			toidleClass() {
				uni.navigateTo({
					url: "../idleClassification/idleClassification"
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
			},
			getAllIdleList() {
				uni.showLoading({
					mask: true
				})
				let data = {
					method: "getAllIdleList"
				}
				uniCloud.callFunction({
						name: "idleController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						this.idleList = res.result.data
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getIdleByTwoClass(value) {
				uni.showLoading({
					mask: true
				})
				let data = {
					value: value,
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
							this.getAllIdleList()
						} else {
							this.idleList = res.result.data
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			onClickItem(e) {
				console.log(e)
				var that = this
				this.current = e.currentIndex
				if (this.current == 0) {
					this.getAllIdleList()
				} else {
					uni.getStorage({
						key: 'class',
						success: (res) => {
							console.log(res)
							that.getIdleByTwoClass(res.data.twoClass)
						},
						fail(err) {
							that.getAllIdleList()
						}
					})
				}
			},
			search(e) {
				this.searchIdle(e.value)
			},
			focus(e) {
				console.log(e)
				this.isSearch = true
			},
			blur(e) {
				console.log(e)
			},
			cancel(e) {
				console.log(e)
				this.isSearch = false
				this.isSearchEntiy = false
				this.searchIdleList = []
			},
			searchIdle(idleName) {
				uni.showLoading({
					mask: true
				})
				this.searchIdleList = []
				this.isSearchEntiy = false
				console.log(idleName)
				let data = {
					idleName: idleName,
					method: "searchIdle"
				}
				uniCloud.callFunction({
						name: "idleController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						if (res.result.data.length == 0) {
							this.isSearchEntiy = true
						} else {
							this.searchIdleList = res.result.data
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			toBoutiqueDigital() {
				uni.navigateTo({
					url: '../boutiqueDigital/boutiqueDigital'
				})
			},
			toLuxuryGoods() {
				uni.navigateTo({
					url: '../luxuryGoods/luxuryGoods'
				})
			},
			toTrendyClothesShoes() {
				uni.navigateTo({
					url: '../trendyClothesShoes/trendyClothesShoes'
				})
			},
			toIdleRanking() {
				uni.navigateTo({
					url: '../IdleRanking/IdleRanking'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
