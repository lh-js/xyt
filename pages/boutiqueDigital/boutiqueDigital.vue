<template>
	<view>
		<view class="idle-list">
			<view class="idle-item" v-for="(item,index) in idleList" :key="item._id" @click="toIdleDetail(item._id)">
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
		<!-- 无数据显示 -->
		<image style="width: 100%;" v-if="isSearchEntiy"
			src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/79633706-4359-482a-9a8d-2409cfac4bef.png"
			mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				idleList: [],
				isSearchEntiy: false
			}
		},
		onLoad() {
			this.getIdleByOneClass()
		},
		methods: {
			getIdleByOneClass() {
				uni.showLoading({
					mask: true
				})
				let data = {
					value: 1002,
					method: "getIdleByOneClass"
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
							this.idleList = res.result.data
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			toIdleDetail(id) {
				uni.navigateTo({
					url: "../idleDetail/idleDetail?id=" + id
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
