<template>
	<view class="forum-content">
		<view class="forum-box" v-for="(item,index) in learningForum" :key="item._id">
			<view class="forum-item" @click="toForumDetail(item._id)">
				<view class="forum-item-title">
					{{item.forumTitle}}
				</view>
				<image v-if="item.forumCover!=''" :src="item.forumCover" mode="aspectFill"></image>
			</view>
			<view class="forum-state">
				<view class="">
					{{item.userName}}
				</view>
				<view class="">
					{{item.lookCount}}阅读
				</view>
				<view class="">
					{{item.comment_info.length}}评论
				</view>
				<view class="">
					<button type="warn" size="mini" @click="removeForum(item._id)">删除</button>
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
				learningForum: "",
				page: 1,
				isCommentEntiy: true,
			}
		},
		onLoad() {
			this.getLearningForum()
		},
		methods: {
			getLearningForum() {
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
							method: "getLearningForumByUserId"
						}
						uniCloud.callFunction({
								name: "forumController",
								data: dataForum
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								this.learningForum = res.result.data
								if (this.learningForum == "") {
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
			toForumDetail(id) {
				uni.navigateTo({
					url: "../forumDetail/forumDetail?id=" + id
				})
			},
			removeForum(id) {
				console.log(id)
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定要删除此论坛吗？',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							})
							console.log('用户点击确定');
							let data = {
								id: id,
								method: "removeForum"
							}
							uniCloud.callFunction({
									name: "forumController",
									data: data
								})
								.then((res1) => {
									console.log(res1)
									let forum = {
										forumId: id,
										method: "removeComment"
									}
									uniCloud.callFunction({
											name: "commentController",
											data: forum
										})
										.then((res2) => {
											console.log(res2)
											uni.hideLoading()
											that.getLearningForum()
										})
										.catch((err) => {
											console.log(err)
										})
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
		}
	}
</script>

<style>
	@import "../../common/forum/forum.css"
</style>
