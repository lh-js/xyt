<template>
	<view class="forum-content">
		<view class="forum-box" v-for="(item,index) in myLostList" :key="item._id">
			<view class="forum-item" @click="toLostDetail(item._id)">
				<view class="forum-item-title">
					{{item.lostName}}
				</view>
				<image v-if="item.lostImg!=''" :src="item.lostImg" mode="aspectFill"></image>
			</view>
			<view class="forum-state">
				<view class="">
					{{item.userName}}
				</view>
				<view class="">
					<text v-if="item.lostClass=='certificates'">
						证件
					</text>
					<text v-if="item.lostClass=='clothes'">
						服饰
					</text>
					<text v-if="item.lostClass=='digital'">
						数码
					</text>
					<text v-if="item.lostClass=='dailyNecessities'">
						日用品
					</text>
					<text v-if="item.lostClass=='schoolSupplies'">
						学习用品
					</text>
					<text v-if="item.lostClass=='other'">
						其他
					</text>
				</view>
				<view class="">
					{{item.lostState == 0 ? '未寻到' : '已寻到'}}
				</view>
				<view style="display: flex;align-items: center;">
					<view style="display: flex;flex-direction: column;">
						是否匿名
						<switch style="margin-right: 3px;" :checked="item.isLostAnonymous"
							@change="switchChange($event,item._id)" type="switch" />
					</view>
					<button type="warn" size="mini" @click="removeLost(item._id)">删除</button>
				</view>
			</view>
			<uni-collapse style="width: 100%;">
				<uni-collapse-item title="归还列表" :open="false">
					<view class="recruit-user-item">
						<!-- <uni-collapse accordion v-model="value"> -->
						<view v-for="(item1,index1) in item.retrunLost_info" :key="item1._id"
							style="border-top: 1px solid #AEAEAE;border-radius: 3px;margin-bottom: 5px;">
							<!-- 								<uni-collapse-item title-border="none" :open="true" :border="false">
									<template v-slot:title> -->
							<view class="recruit-user">
								<view class="recruit-user-message">
									<image :src="item1.myUserAvatar" mode="aspectFill"></image>
									<view class="recruit-user-name">
										{{item1.myUserName}}
									</view>
								</view>
								<view class="dorecruit-time">
									{{item1.returnLostState==0 ? '' : '已归还'}}
									<uni-dateformat :date="item1.returnLostTime"></uni-dateformat>
								</view>
							</view>
							<!-- 				</template> -->
							<view class="recruit-user-remark">
								<view class="recruit-remark-text">
									<text>备注：</text>
									<text>{{item1.remark =="" ? '无' : item1.remark}}</text>
								</view>
								<view class="recruit-user-button">
									<view>
										<button type="primary" size="mini"
											:disabled="item1.returnLostState==1 || item.lostState==1"
											@click="returnLost(item._id,item1._id)">{{item1.returnLostState==0 && item.lostState==0 ? '确认归还' : '已归还'}}</button>
									</view>
								</view>
							</view>
							<!-- </uni-collapse-item> -->
						</view>
						<view style="width: 100%;display: flex;justify-content: center;color: #999999;"
							v-if="item.retrunLost_info.length==0">
							此物品暂时无人归还
						</view>
						<!-- </uni-collapse> -->
					</view>
				</uni-collapse-item>
			</uni-collapse>
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
				myLostList: [],
				isCommentEntiy: false,
				returnLostUserList: [],
				lostInfo: []
			}
		},
		onLoad() {
			this.getMyLost()
		},
		methods: {
			getMyLost() {
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
							method: "getLostByUserId"
						}
						uniCloud.callFunction({
								name: "lostController",
								data: dataForum
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								this.myLostList = res.result.data
								if (this.myLostList == "") {
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
			toLostDetail(id) {
				uni.navigateTo({
					url: "../lostDetail/lostDetail?id=" + id
				})
			},
			removeLost(id) {
				console.log(id)
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定要删除此寻物吗？',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							})
							console.log('用户点击确定');
							let data = {
								id: id,
								method: "removeLost"
							}
							uniCloud.callFunction({
									name: "lostController",
									data: data
								})
								.then((res1) => {
									console.log(res1)
									if (res1.result.affectedDocs == 1) {
										let data = {
											lostId: id,
											method: "removeReturnLostUser"
										}
										uniCloud.callFunction({
												name: "returnLostUserController",
												data: data
											})
											.then((res2) => {
												console.log(res2)
												if (res2.result.affectedDocs == 1) {
													uni.hideLoading()
													that.getMyLost()
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
			},
			returnLost(lostId, userId) { //归还物品
				var that = this
				uni.showModal({
					title: '提示',
					content: '确认是他归还的物品吗？',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							})
							var myDate = new Date()
							let data = {
								id: userId,
								returnLostState: 1,
								returnLostTime: myDate.getTime(),
								method: "updatereturnLostStateById"
							}
							uniCloud.callFunction({
									name: "returnLostUserController",
									data: data
								})
								.then((res1) => {
									console.log(res1)
									if (res1.result.affectedDocs == 1) {
										let data = {
											id: lostId,
											lostState: 1,
											method: "updateLostStateById"
										}
										uniCloud.callFunction({
												name: "lostController",
												data: data
											})
											.then((res2) => {
												console.log(res2)
												if (res2.result.affectedDocs == 1) {
													uni.hideLoading()
													that.getMyLost()
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
			},
			switchChange(e, id) {
				uni.showLoading({
					mask: true
				})
				console.log(e.target.value)
				let data = {
					id: id,
					isLostAnonymous: e.target.value,
					method: "changeIsLostAnonymous"
				}
				uniCloud.callFunction({
						name: "lostController",
						data: data
					})
					.then((res2) => {
						console.log(res2)
						if (res2.result.affectedDocs == 1) {
							uni.hideLoading()
							this.getMyLost()
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
