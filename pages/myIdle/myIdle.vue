<template>
	<view class="forum-content">
		<view class="forum-box" v-for="(item,index) in myIdleList" :key="item._id">
			<view class="forum-item" @click="toIdleDetail(item._id)">
				<view class="forum-item-title">
					{{item.idleName}}
				</view>
				<image :src="item.idleImageList[0].fileID" mode="aspectFill"></image>
			</view>
			<view class="forum-state">
				<view class="">
					{{item.quality}}
				</view>
				<view>
					评价数{{item.evaluate_info.length}}
				</view>
				<view class="">
					留言数{{item.message_info.length}}
				</view>
				<view class="">
					库存数{{item.stockCount}}
				</view>
				<view style="display: flex;align-items: center;">
					<view style="display: flex;flex-direction: column;">
						是否匿名
						<switch style="margin-right: 3px;" :checked="item.isIdleAnonymous"
							@change="switchChange($event,item._id)" type="switch" />
					</view>
					<button type="warn" size="mini" @click="removeIdle(item._id)">删除</button>
				</view>
			</view>
		</view>
		<image v-if="isCommentEntiy"
			src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/79633706-4359-482a-9a8d-2409cfac4bef.png"
			mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myIdleList: [],
				isCommentEntiy: false,
				// idleList: [],
				// lostInfo: []
			}
		},
		onLoad() {
			this.getMyIdle()
		},
		methods: {
			getMyIdle() {
				uni.showLoading({
					mask: true
				})
				uni.getStorage({
					key: 'userinfo',
					success: (res1) => {
						console.log(res1.data)
						let dataForum = {
							// page: this.page,
							email: res1.data.email,
							method: "getIdleByUserId"
						}
						uniCloud.callFunction({
								name: "idleController",
								data: dataForum
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								if (res.result.data.length != 0) {
									this.myIdleList = res.result.data
								}
								if (this.myIdleList == "") {
									this.isCommentEntiy = true
								} else {
									this.isCommentEntiy = false
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
			toIdleDetail(id) {
				uni.navigateTo({
					url: "../idleDetail/idleDetail?id=" + id
				})
			},
			removeIdle(id) {
				console.log(id)
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定要删除此闲置吗？',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							})
							console.log('用户点击确定');
							let data = {
								id: id,
								method: "removeIdle"
							}
							uniCloud.callFunction({
									name: "idleController",
									data: data
								})
								.then((res1) => {
									console.log(res1)
									if (res1.result.affectedDocs == 1) {
										let data = {
											idleId: id,
											method: "removeMessage"
										}
										uniCloud.callFunction({
												name: "idleMessageController",
												data: data
											})
											.then((res2) => {
												console.log(res2)
												// if (res2.result.affectedDocs == 1) {
												let dataEvaluate = {
													idleId: id,
													method: "removeEvaluate"
												}
												uniCloud.callFunction({
														name: "idleEvaluateController",
														data: dataEvaluate
													})
													.then((res2) => {
														console.log(res2)
														// if (res2.result.affectedDocs == 1) {
														uni.hideLoading()
														that.getMyIdle()
														// }
													})
													.catch((err) => {
														console.log(err)
													})
												// }
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
			},
			switchChange(e, id) {
				uni.showLoading({
					mask: true
				})
				console.log(e.target.value)
				let data = {
					id: id,
					isIdleAnonymous: e.target.value,
					method: "changeIsIdleAnonymous"
				}
				uniCloud.callFunction({
						name: "idleController",
						data: data
					})
					.then((res2) => {
						console.log(res2)
						if (res2.result.affectedDocs == 1) {
							uni.hideLoading()
							this.getMyIdle()
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "../../common/forum/forum.css";

	.recruit-user-item {
		padding: 0 30rpx;

		.recruit-user {
			display: flex;
			justify-content: space-between;
			width: 100%;
			// border: 1px solid;
			align-items: center;

			.recruit-user-message {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.recruit-user-name {
					margin-left: 10rpx;
				}
			}

			.recruit-user-message image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 80rpx;
			}

			.dorecruit-time {
				color: #999999;
			}

			.dorecruit-time uni-dateformat {
				margin-left: 3px;
			}

		}

		.recruit-user-remark {
			width: 100%;
			word-wrap: break-word;
			word-break: break-all;
			// border: 1px solid;
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			.recruit-remark-text {
				display: flex;
				flex-direction: column;
			}

			.recruit-remark-text text:nth-child(1) {
				font-size: 16px;
				color: #999999;
			}

			.recruit-remark-text text:nth-child(2) {
				font-size: 13px;
				color: #999999;
				width: 200px;
				// border: 1px solid;
			}

			.recruit-user-button {
				width: 100%;
				display: flex;
				justify-content: flex-end;
				// border: 1px solid;
			}
		}
	}
</style>
