<template>
	<view class="forum-detail">
		<view class="forum-detail-title">
			{{forumTitle}}
		</view>
		<view class="forum-user">
			<view style="display: flex;">
				<image :src="userAvatar" mode="aspectFill"></image>
				<view class="forum-username">
					{{userName}}
				</view>
			</view>
			<view class="forum-user-follow">
				关注
			</view>
		</view>
		<view class="forum-detail-content">
			<rich-text :nodes="forumContent"></rich-text>
		</view>
		<!-- <view class="content-image">
			<image
				src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/2e095de2-723a-473e-ad39-b302995be9ce.jpg"
				mode="widthFix"></image>
			<image
				src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/2e095de2-723a-473e-ad39-b302995be9ce.jpg"
				mode="widthFix"></image>
		</view> -->
		<view style="margin-top: 10px;">
			评论({{commentCount}})
		</view>
		<view class="forum-comment" @click="toCommont()">
			<view class="comment-input">
				<image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/ecf2ce1c-0d41-44e8-aaba-75e5b733d2f7.png"
					mode="widthFix"></image>
				<input type="text" value="" placeholder="写回答..." disabled />
			</view>
			<!-- <image
				src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/9c335c61-ee3b-4e51-b21c-95e59f6e56fb.png"
				mode="widthFix"></image> -->
		</view>
		<view>
			<view class="uni-padding-wrap">
				<!-- 评论区 start -->
				<view class="uni-comment">
					<view class="uni-comment-list" v-for="(item,index) in comment" :key="index"
						v-if="item.commentContent">
						<view class="uni-comment-face">
							<image :src="item.userAvatar" mode="aspectFill">
							</image>
						</view>
						<view class="uni-comment-body">
							<view class="uni-comment-top">
								<text>{{item.userName}}</text>
							</view>
							<view class="uni-comment-content">
								<text
									@click="userComment(item.email,item.userName,item._id)">{{item.commentContent}}</text>
								<image v-if="item.commentImg" :src="item.commentImg" mode="widthFix"
									@click="previewImg(item.commentImg)"></image>
							</view>
							<view class="uni-comment-date">
								<view>
									<uni-dateformat :date="item.submitTime"></uni-dateformat>
								</view>
								<view class="uni-comment-replay-btn" @click="openComment(item._id)">更多回复</view>
							</view>
						</view>
					</view>
					<image v-if="isCommentEntiy"
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/79633706-4359-482a-9a8d-2409cfac4bef.png"
						mode="widthFix"></image>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<scroll-view scroll-y="true" class="scroll-Y">
				<view class="uni-comment-list user-comment-list" v-for="(item,index) in beUserComment" :key="index">
					<view class="uni-comment-face">
						<image :src="item.userAvatar" mode="aspectFill">
						</image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>{{item.userName}}</text>
							<image
								src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/9d418308-a499-489c-ab01-7ea690865165.png"
								mode="aspectFill"></image>
							<text>{{item.beApplyUsername}}</text>
						</view>
						<view class="uni-comment-content">
							<text>{{item.applyUserComment}}</text>
							<image v-if="item.userCommentImg" :src="item.userCommentImg" mode="widthFix"
								@click="previewImg(item.userCommentImg)"></image>
						</view>
						<view class="uni-comment-date">
							<view>
								<uni-dateformat :date="item.submitTime"></uni-dateformat>
							</view>
						</view>
					</view>
				</view>
				<image v-if="isUserCommentEntiy"
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/79633706-4359-482a-9a8d-2409cfac4bef.png"
					mode="widthFix"></image>
			</scroll-view>
		</uni-popup>
		<uni-popup ref="popup1" type="bottom" background-color="#fff">
			<textarea value="" maxlength="-1" placeholder="写下你的解决思路..." v-model="forumComment" style="width: 100%;"
				:style="{marginBottom: keybroadheight+'rpx'}" @focus="textFocus" @blur="textblur" />
			<uni-file-picker ref="files" disable-preview :del-icon="false" return-type="object" :auto-upload="true"
				:list-styles="listStyles" :image-styles="imageStyles" @success="uploadSuccess">选择图片
			</uni-file-picker>
			<button type="default" @click="submitComment()">评论</button>
		</uni-popup>
		<uni-popup ref="popup2" type="bottom" background-color="#fff">
			<textarea value="" maxlength="-1" :placeholder="'回复'+commentUser" v-model="applyUserComment"
				style="width: 100%;" :style="{marginBottom: keybroadheight+'rpx'}" @focus="textFocus"
				@blur="textblur" />
			<uni-file-picker ref="files" disable-preview :del-icon="false" return-type="object" :auto-upload="true"
				:list-styles="listStyles" :image-styles="imageStyles" @success="uploadSuccess1">选择图片
			</uni-file-picker>
			<button type="default" @click="submitUserComment()">评论</button>
		</uni-popup>
		<!-- <view class="forum-comment" style="position: fixed;bottom: 0;" v-if="isReply">
			<view class="comment-input">
				<image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/ecf2ce1c-0d41-44e8-aaba-75e5b733d2f7.png"
					mode="widthFix"></image>
				<input type="text" value="" placeholder="说点什么吧..." style="height: 50px;" />
			</view>
			<image
				src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/9c335c61-ee3b-4e51-b21c-95e59f6e56fb.png"
				mode="widthFix"></image>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isReply: true,
				forumTitle: "",
				forumContent: "",
				userName: "",
				userAvatar: "",
				forumComment: "",
				commentImg: "",
				imageStyles: {
					width: 100,
					height: 100,
					border: {
						color: "#75757a",
						width: 2,
						style: 'dashed'
					}
				},
				listStyles: {
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
				},
				keybroadheight: 0,
				forumId: "",
				page: 1,
				comment: [],
				commentUserName: "",
				commentAvatar: "",
				commentContent: "",
				commentImg: "",
				commentTime: "",
				commentUser: "",
				applyUserComment: "",
				userCommentImg: "",
				beApplyUserEmail: "",
				beApplyUsername: "",
				beApplyCommentid: "",
				beUserComment: "",
				commentCount: 0,
				isCommentEntiy: true,
				isUserCommentEntiy: true
			}
		},
		onLoad(options) {
			console.log(options)
			this.getLearningForumById(options.id)
			this.forumId = options.id
			this.getComment(options.id)
			// this.getCommentCount(options.id)
		},
		// onReachBottom() {
		// 	this.page++
		// 	console.log(this.page)
		// 	this.getComment(this.forumId)
		// },
		methods: {
			openComment(id) {
				this.$refs.popup.open('bottom')
				this.getUserComment(id)
			},
			toCommont() {
				this.$refs.popup1.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			},
			confirm(value) {
				// 输入框的值
				console.log(value)
				this.$refs.popup.close()
			},
			getLearningForumById(id) {
				uni.showLoading({
					mask: true
				})
				let learnForum = {
					_id: id,
					method: "getLearningForumById"
				}
				uniCloud.callFunction({
						name: "forumController",
						data: learnForum
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						this.forumTitle = res.result.data[0].forumTitle
						this.forumContent = res.result.data[0].forumContent
						this.userName = res.result.data[0].userName
						this.userAvatar = res.result.data[0].userAvatar
					})
					.catch((err) => {
						console.log(err)
					})
			},
			submitComment() {
				// access_token三十天获取一次
				// 上次获取4月24日
				// uni.request({
				//     url: 'https://aip.baidubce.com/oauth/2.0/token', 
				//     data: {
				//         grant_type:'client_credentials',
				// 		client_id:'5VHXzTqyOPQNxdyAaihnzIgL',
				// 		client_secret:'I7ndSCTXRAu67Otoel79jm2GAgrQ0b1u'
				//     },
				// 	method:'GET',
				//     success: (res) => {
				//         console.log(res);
				//     },
				// 	})
				if (this.forumComment != "") {
					uni.showLoading({
						mask: true
					})
					uni.request({
						url: 'https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined',
						data: {
							access_token: "24.5d4e30ff6b095ce761376e9dce767b7c.2592000.1656337842.282335-26041411",
							text: this.forumComment
						},
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							console.log(res);
							if (res.data.conclusionType == 1) {
								if (this.commentImg == "") {
									uni.getStorage({
										key: 'userinfo',
										success: (res1) => {
											console.log(res1.data)
											let emailData = {
												email: res1.data.email,
												method: "getUserInfo"
											}
											uniCloud.callFunction({
													name: "userController",
													data: emailData
												})
												.then((res2) => {
													console.log(res2.result.data[0])
													var myDate = new Date()
													let forumComment = {
														commentContent: this.forumComment,
														commentImg: this.commentImg,
														userAvatar: res2.result.data[0]
															.userAvatar,
														userName: res2.result.data[0]
															.userName,
														email: res2.result.data[0].email,
														forumId: this.forumId,
														submitTime: myDate.getTime(),
														method: "uploadComment"
													}
													console.log(forumComment)
													uniCloud.callFunction({
															name: "commentController",
															data: forumComment
														})
														.then((res) => {
															uni.hideLoading()
															console.log(res)
															this.page = 1
															this.comment = ''
															this.getComment(this.forumId)
															uni.showToast({
																duration: 1500,
																title: '评论成功!',
																mask: true,
																icon: 'none'
															})
															this.$refs.popup1.close()
														})
														.catch((err) => {
															console.log(err)
														})
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
								} else {
									uni.request({
										url: 'https://aip.baidubce.com/rest/2.0/solution/v1/img_censor/v2/user_defined',
										data: {
											access_token: "24.5d4e30ff6b095ce761376e9dce767b7c.2592000.1656337842.282335-26041411",
											imgUrl: this.commentImg
										},
										method: 'POST',
										header: {
											'content-type': 'application/x-www-form-urlencoded'
										},
										success: (res) => {
											console.log(res);
											if (res.data.conclusionType == 1) {
												uni.getStorage({
													key: 'userinfo',
													success: (res1) => {
														console.log(res1.data)
														let emailData = {
															email: res1.data.email,
															method: "getUserInfo"
														}
														uniCloud.callFunction({
																name: "userController",
																data: emailData
															})
															.then((res2) => {
																console.log(res2
																	.result
																	.data[0])
																var myDate =
																	new Date()
																let forumComment = {
																	commentContent: this
																		.forumComment,
																	commentImg: this
																		.commentImg,
																	userAvatar: res2
																		.result
																		.data[
																			0]
																		.userAvatar,
																	userName: res2
																		.result
																		.data[
																			0]
																		.userName,
																	email: res2
																		.result
																		.data[
																			0]
																		.email,
																	forumId: this
																		.forumId,
																	submitTime: myDate
																		.getTime(),
																	method: "uploadComment"
																}
																console.log(
																	forumComment
																)
																uniCloud
																	.callFunction({
																		name: "commentController",
																		data: forumComment
																	})
																	.then((
																		res
																	) => {
																		uni.hideLoading()
																		console
																			.log(
																				res
																			)
																		this.page =
																			1
																		this.comment =
																			''
																		this.getComment(
																			this
																			.forumId
																		)
																		uni.showToast({
																			duration: 1500,
																			title: '评论成功!',
																			mask: true,
																			icon: 'none'
																		})
																		this.$refs
																			.popup1
																			.close()
																	})
																	.catch((
																		err
																	) => {
																		console
																			.log(
																				err
																			)
																	})
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
											} else {
												uni.showToast({
													duration: 1500,
													title: res.data.data[0].msg,
													mask: true,
													icon: 'none'
												})
											}
										}
									});
								}
							} else {
								uni.showToast({
									duration: 1500,
									title: res.data.data[0].msg,
									mask: true,
									icon: 'none'
								})
							}
						}
					});
				} else {
					uni.showToast({
						duration: 1500,
						title: '评论不能为空!',
						mask: true,
						icon: 'none'
					})
				}
			},
			submitUserComment() {
				if (this.applyUserComment != "") {
					uni.showLoading({
						mask: true
					})
					uni.request({
						url: 'https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined',
						data: {
							access_token: "24.5d4e30ff6b095ce761376e9dce767b7c.2592000.1656337842.282335-26041411",
							text: this.applyUserComment
						},
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							console.log(res);
							if (res.data.conclusionType == 1) {
								if (this.userCommentImg == "") {
									uni.getStorage({
										key: 'userinfo',
										success: (res1) => {
											console.log(res1.data)
											let emailData = {
												email: res1.data.email,
												method: "getUserInfo"
											}
											uniCloud.callFunction({
													name: "userController",
													data: emailData
												})
												.then((res2) => {
													console.log(res2.result.data[0])
													var myDate = new Date()
													let userComment = {
														applyUserComment: this
															.applyUserComment,
														userCommentImg: this
															.userCommentImg,
														userAvatar: res2.result.data[0]
															.userAvatar,
														userName: res2.result.data[0]
															.userName,
														email: res2.result.data[0].email,
														forumId: this.forumId,
														beApplyUserEmail: this
															.beApplyUserEmail,
														beApplyUsername: this
															.beApplyUsername,
														beApplyCommentid: this
															.beApplyCommentid,
														submitTime: myDate.getTime(),
														method: "uploadUserComment"
													}
													console.log(userComment)
													uniCloud.callFunction({
															name: "commentController",
															data: userComment
														})
														.then((res) => {
															uni.hideLoading()
															console.log(res)
															this.getUserComment(this
																.beApplyCommentid)
															uni.showToast({
																duration: 1500,
																title: '评论成功!',
																mask: true,
																icon: 'none'
															})
															this.$refs.popup2.close()
														})
														.catch((err) => {
															console.log(err)
														})
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
								} else {
									uni.request({
										url: 'https://aip.baidubce.com/rest/2.0/solution/v1/img_censor/v2/user_defined',
										data: {
											access_token: "24.5d4e30ff6b095ce761376e9dce767b7c.2592000.1656337842.282335-26041411",
											imgUrl: this.userCommentImg
										},
										method: 'POST',
										header: {
											'content-type': 'application/x-www-form-urlencoded'
										},
										success: (res) => {
											console.log(res);
											if (res.data.conclusionType == 1) {
												uni.getStorage({
													key: 'userinfo',
													success: (res1) => {
														console.log(res1.data)
														let emailData = {
															email: res1.data.email,
															method: "getUserInfo"
														}
														uniCloud.callFunction({
																name: "userController",
																data: emailData
															})
															.then((res2) => {
																console.log(res2
																	.result
																	.data[0])
																var myDate =
																	new Date()
																let userComment = {
																	applyUserComment: this
																		.applyUserComment,
																	userCommentImg: this
																		.userCommentImg,
																	userAvatar: res2
																		.result
																		.data[
																			0]
																		.userAvatar,
																	userName: res2
																		.result
																		.data[
																			0]
																		.userName,
																	email: res2
																		.result
																		.data[
																			0]
																		.email,
																	forumId: this
																		.forumId,
																	beApplyUserEmail: this
																		.beApplyUserEmail,
																	beApplyUsername: this
																		.beApplyUsername,
																	beApplyCommentid: this
																		.beApplyCommentid,
																	submitTime: myDate
																		.getTime(),
																	method: "uploadUserComment"
																}
																console.log(
																	userComment
																)
																uniCloud
																	.callFunction({
																		name: "commentController",
																		data: userComment
																	})
																	.then((
																		res
																		) => {
																		uni.hideLoading()
																		console
																			.log(
																				res
																			)
																		this.getUserComment(
																			this
																			.beApplyCommentid
																		)
																		uni.showToast({
																			duration: 1500,
																			title: '评论成功!',
																			mask: true,
																			icon: 'none'
																		})
																		this.$refs
																			.popup2
																			.close()
																	})
																	.catch((
																		err
																		) => {
																		console
																			.log(
																				err
																			)
																	})
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
											} else {
												uni.showToast({
													duration: 1500,
													title: res.data.data[0].msg,
													mask: true,
													icon: 'none'
												})
											}
										}
									});
								}
							} else {
								uni.showToast({
									duration: 1500,
									title: res.data.data[0].msg,
									mask: true,
									icon: 'none'
								})
							}
						}
					});
				} else {
					uni.showToast({
						duration: 1500,
						title: '评论不能为空!',
						mask: true,
						icon: 'none'
					})
				}
			},
			uploadSuccess(path) {
				console.log(path.tempFilePaths[0])
				this.commentImg = path.tempFilePaths[0]
			},
			uploadSuccess1(path) {
				console.log(path.tempFilePaths[0])
				this.userCommentImg = path.tempFilePaths[0]
			},
			textFocus(e) {
				// console.log(e.detail.height)
				this.keybroadheight = e.detail.height
			},
			textblur() {
				this.keybroadheight = 0
			},
			getComment(id) {
				uni.showLoading({
					mask: true
				})
				let data = {
					// page: this.page,
					forumId: id,
					method: "getCommentById"
				}
				console.log(data)
				uniCloud.callFunction({
						name: "commentController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res.result.data)
						if (res.result.data != "") {
							this.comment = res.result.data
							this.commentCount = res.result.data.length
						} else {
							uni.showToast({
								duration: 1500,
								title: '没有评论了!',
								mask: true,
								icon: 'none'
							})
						}
						if (this.comment == "") {
							this.isCommentEntiy = true
						} else {
							this.isCommentEntiy = false
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getUserComment(id) {
				uni.showLoading({
					mask: true
				})
				let data = {
					beApplyCommentid: id,
					method: "getUserComment"
				}
				uniCloud.callFunction({
						name: "commentController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res.result.data)
						this.beUserComment = res.result.data
						if (this.beUserComment == "") {
							this.isUserCommentEntiy = true
						} else {
							this.isUserCommentEntiy = false
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			userComment(email, username, id) {
				this.$refs.popup2.open('bottom')
				this.beApplyUserEmail = email
				this.commentUser = username
				this.beApplyUsername = username
				this.beApplyCommentid = id
			},
			// getCommentCount(id) {
			// 	let data = {
			// 		forumId: id
			// 	}
			// 	uniCloud.callFunction({
			// 			name: "getUserCommentCount",
			// 			data: data
			// 		})
			// 		.then((res) => {
			// 			console.log(res)
			// 			this.commentCount = res.result.total
			// 		})
			// 		.catch((err) => {
			// 			console.log(err)
			// 		})
			// },
			previewImg(img) {
				uni.previewImage({
					urls: [
						img
					]
				});
			}
		}
	}
</script>

<style scoped>
	.scroll-Y {
		height: 500px;
	}

	.scroll-Y image {
		width: 100%;
	}

	.forum-detail {
		padding: 10px;
	}

	.forum-detail-title {
		font-size: 22px;
	}

	.forum-user {
		width: 100%;
		height: 50rpx;
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.forum-user image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50rpx;
	}

	.forum-user .forum-username {
		margin-left: 3px;
		font-size: 13px;
		line-height: 50rpx;
	}

	.forum-detail-content {
		font-size: 15px;
		margin-top: 10px;
	}

	.forum-user-follow {
		border: 1px solid #999999;
		height: 35rpx;
		width: 80rpx;
		font-size: 13px;
		line-height: 35rpx;
		text-align: center;
		border-radius: 35rpx;
	}

	.content-image {
		width: 100%;
		margin-top: 10px;
	}

	.content-image image {
		width: 100%;
	}

	.forum-comment {
		width: 90%;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
		margin: 10px auto;

	}

	.forum-comment .comment-input {
		height: 40px;
		width: 80%;
		border: 1px solid #a9abb0;
		border-radius: 40px;
		display: flex;
		align-items: center;
		/* color: #B9B9B9; */
		margin-left: 15px;
	}

	.comment-input input {
		margin-left: 20rpx;
	}

	.forum-comment image {
		width: 30px;
		margin-left: 10px;
	}

	/* comment */
	page {
		background-color: #f8f8f8;
	}

	.uni-padding-wrap {
		padding: 30upx;
	}

	view {
		font-size: 28upx;
	}

	.uni-comment {
		padding: 5rpx 0;
		display: flex;
		flex-grow: 1;
		flex-direction: column;
	}

	.uni-comment-list {
		flex-wrap: nowrap;
		padding: 10rpx 0;
		margin: 10rpx 0;
		width: 100%;
		display: flex;
		/* border: 1px solid; */
	}

	.user-comment-list {
		/* border: 1px solid; */
		/* width: 90% !important; */
		margin-left: 80rpx;
		margin-top: 30rpx;
	}

	.uni-comment-face {
		width: 70upx;
		height: 70upx;
		border-radius: 100%;
		margin-right: 20upx;
		flex-shrink: 0;
		overflow: hidden;
	}

	.uni-comment-face image {
		width: 70upx;
		height: 70upx;
		border-radius: 70upx;
	}

	.uni-comment-body {
		width: 100%;
	}

	.uni-comment-top {
		/* line-height: 1.5em; */
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.uni-comment-top image {
		width: 10px;
		height: 10px;
		margin: 0 3px;
	}

	.uni-comment-top text {
		color: #0A98D5;
		font-size: 24upx;
	}

	.uni-comment-date {
		line-height: 38upx;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		display: flex !important;
		flex-grow: 1;
	}

	.uni-comment-date view {
		color: #666666;
		font-size: 24upx;
		line-height: 38upx;
	}

	.uni-comment-content {
		line-height: 1.6em;
		font-size: 28upx;
		padding: 8rpx 0;
		width: 90%;
		display: flex;
		flex-direction: column;
	}

	.uni-comment-content image {
		border: 1px solid;
		border-radius: 20rpx;
		width: 70%;
	}

	.uni-comment-replay-btn {
		background: #FFF;
		font-size: 24upx;
		line-height: 28upx;
		padding: 5rpx 20upx;
		border-radius: 30upx;
		color: #333 !important;
		margin: 0 10upx;
	}
</style>
