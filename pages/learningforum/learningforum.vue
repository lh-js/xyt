<template>
	<view>
		<!-- 搜索栏，搜索论坛 -->
		<view class="search-header">
			<!-- 搜索框 -->
			<uni-search-bar @confirm="search" @focus="focus" @blur="blur" @cancel="cancel"></uni-search-bar>
			<!-- 搜索到的论坛 -->
			<view class="forum-content">
				<view class="forum-box" v-for="(item,index) in searchLearningForum" :key="item._id"
					@click="toForumDetail(item._id,item.lookCount)">
					<view class="forum-item">
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
					</view>
				</view>
				<!-- 无数据显示 -->
				<image v-if="isSearchForumEntiy"
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/79633706-4359-482a-9a8d-2409cfac4bef.png"
					mode="widthFix"></image>
			</view>
			<!-- 分段器 -->
			<uni-segmented-control v-if="isSearch" :current="current" :values="items" @clickItem="onClickItem()"
				styleType="text" activeColor="#4cd964"></uni-segmented-control>
		</view>
		<!-- 推荐区 -->
		<view class="content" v-if="isSearch">
			<view v-show="current === 0">
				<view class="learn-sort">
					<view class="sort-title">
						<view class="">
							论坛热榜
						</view>
						<view class="">
							查看全部 <uni-icons type="right" color="#FFFFFF"></uni-icons>
						</view>
					</view>
					<view class="learn-sort-item" v-for="(item,index) in sortFormList" :key="item._id">
						<view style="display: flex;">
							<image v-if="index==0"
								src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/74600614-79e9-4381-bcac-f136536a305d.png"
								mode="widthFix"></image>
							<image v-if="index==1"
								src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/f3b47d7a-eb4e-4d7a-930e-4a59190bd293.png"
								mode="widthFix"></image>
							<image v-if="index==2"
								src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/596f64f3-8d1c-4380-82de-ffdd36f869fc.png"
								mode="widthFix"></image>
							<view class="learn-sort-text">{{item.forumTitle}}</view>
						</view>
						<view class="item-hot">热度 {{item.lookCount}}</view>
					</view>
					<view v-if="isSortFormListEntiy"
						style="width: 300rpx;display: flex;align-items: center;justify-content: center;color: #999999;margin: 20rpx auto;">
						暂无热榜
					</view>
					<!-- 					<view class="learn-sort-item">
						<view style="display: flex;">
							<image
								src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/f3b47d7a-eb4e-4d7a-930e-4a59190bd293.png"
								mode="widthFix"></image>
							<view class="learn-sort-text">三万字速通JavaScript？</view>
						</view>
						<view class="item-hot">热度 100</view>
					</view>
					<view class="learn-sort-item">
						<view style="display: flex;">
							<image
								src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/596f64f3-8d1c-4380-82de-ffdd36f869fc.png"
								mode="widthFix"></image>
							<view class="learn-sort-text">世间万物皆可为对象？</view>
						</view>
						<view class="item-hot">热度 100</view>
					</view> -->
				</view>
				<view class="forum-content">
					<view class="forum-box" v-for="(item,index) in learningForum" :key="item._id"
						@click="toForumDetail(item._id,item.lookCount)">
						<view class="forum-item">
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
						</view>
					</view>
					<image v-if="isForumEntiy"
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/79633706-4359-482a-9a8d-2409cfac4bef.png"
						mode="widthFix"></image>
				</view>
			</view>
			<view v-show="current === 1">
				<view class="forum-content">
					<view class="forum-box" v-for="(item,index) in learningProgrammingForum" :key="item._id"
						@click="toForumDetail(item._id,item.lookCount)">
						<view class="forum-item">
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
						</view>
					</view>
					<image v-if="isProgrammingForumEntiy"
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/79633706-4359-482a-9a8d-2409cfac4bef.png"
						mode="widthFix"></image>
				</view>
			</view>
			<view v-show="current === 2">
				<view class="forum-content">
					<view class="forum-box" v-for="(item,index) in learningScienceForum" :key="item._id"
						@click="toForumDetail(item._id,item.lookCount)">
						<view class="forum-item">
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
						</view>
					</view>
					<image v-if="isScienceForumEntiy"
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/79633706-4359-482a-9a8d-2409cfac4bef.png"
						mode="widthFix"></image>
				</view>
			</view>
			<view v-show="current === 3">
				<view class="forum-content">
					<view class="forum-box" v-for="(item,index) in learningOtherForum" :key="item._id"
						@click="toForumDetail(item._id,item.lookCount)">
						<view class="forum-item">
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
								28评论
							</view>
						</view>
					</view>
					<image v-if="isOtherForumEntiy"
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/79633706-4359-482a-9a8d-2409cfac4bef.png"
						mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				learningForum: [],
				learningProgrammingForum: [],
				learningScienceForum: [],
				learningOtherForum: [],
				page: 1,
				current: 0,
				items: [
					"推荐",
					"编程",
					"科学",
					"其他"
				],
				isForumEntiy: true,
				isProgrammingForumEntiy: true,
				isScienceForumEntiy: true,
				isOtherForumEntiy: true,
				isSearch: true,
				searchLearningForum: [],
				isSearchForumEntiy: false,
				sortFormList: [],
				isSortFormListEntiy: false
			}
		},
		onLoad() {
			// this.getAllLearningForum()
		},
		onShow() {
			this.getAllLearningForum()
			this.sortForumByLookCount()
		},
		// onReachBottom() {
		// 	if (this.current == 0) {
		// 		this.getAllLearningForum()
		// 	} else if (this.current == 1) {
		// 		this.page++
		// 		this.getLearningForum("programming")
		// 	} else if (this.current == 2) {
		// 		this.page++
		// 		this.getLearningForum("science")
		// 	} else if (this.current == 3) {
		// 		this.page++
		// 		this.getLearningForum("other")
		// 	}
		// 	// this.page++;
		// 	// this.getLearningForum()
		// },
		methods: {
			getAllLearningForum() {
				uni.showLoading({
					mask: true
				})
				let data = {
					method: "getAllLearningForum"
				}
				uniCloud.callFunction({
						name: "forumController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						if (res.result.data.length != 0) {
							// this.learningForum = [...this.learningForum, ...res.result.data]
							this.learningForum = res.result.data
							if (this.learningForum == "") {
								this.isForumEntiy = true
							} else {
								this.isForumEntiy = false
							}
						} else {
							uni.showToast({
								duration: 1500,
								title: '没有数据',
								mask: true,
								icon: 'none'
							})
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getLearningForum(forumClass) {
				uni.showLoading({
					mask: true
				})
				let dataForum = {
					// page: this.page,
					forumClass: forumClass,
					method: "getLearnForumByClass"
				}
				uniCloud.callFunction({
						name: "forumController",
						data: dataForum
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						if (res.result.data.length != 0) {
							if (this.current == 1) {
								// this.learningProgrammingForum = [...this.learningProgrammingForum, ...res.result.data]
								this.learningProgrammingForum = res.result.data
								if (this.learningProgrammingForum.length == 0) {
									this.isProgrammingForumEntiy = true
								} else {
									this.isProgrammingForumEntiy = false
								}
							} else if (this.current == 2) {
								// this.learningScienceForum = [...this.learningScienceForum, ...res.result.data]
								this.learningScienceForum = res.result.data
								if (this.learningScienceForum.length == 0) {
									this.isScienceForumEntiy = true
								} else {
									this.isScienceForumEntiy = false
								}
							} else if (this.current == 3) {
								// this.learningOtherForum = [...this.learningOtherForum, ...res.result.data]
								this.learningOtherForum = res.result.data
								if (this.learningOtherForum.length == 0) {
									this.isOtherForumEntiy = true
								} else {
									this.isOtherForumEntiy = false
								}
							}
						} else {
							uni.showToast({
								duration: 1500,
								title: '没有数据！',
								mask: true,
								icon: 'none'
							})
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			toForumDetail(id, lookCount) {
				uni.navigateTo({
					url: "../forumDetail/forumDetail?id=" + id
				})
				lookCount = lookCount + 1
				let data = {
					id: id,
					lookCount: lookCount,
					method: "increaseLookCount"
				}
				uniCloud.callFunction({
						name: "forumController",
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
			onClickItem(e) {
				console.log(e)
				this.current = e.currentIndex
				if (this.current == 0) {
					// this.page = 1
					this.learningForum = []
					this.getAllLearningForum()
				} else if (this.current == 1) {
					// this.page = 1
					this.learningProgrammingForum = []
					this.getLearningForum("programming")
				} else if (this.current == 2) {
					// this.page = 1
					this.learningScienceForum = []
					this.getLearningForum("science")
				} else if (this.current == 3) {
					// this.page = 1
					this.learningOtherForum = []
					this.getLearningForum("other")
				}
			},
			search(e) {

				uni.showLoading({
					mask: true
				})
				this.searchLearningForum = []
				this.isSearchForumEntiy = false
				console.log(e.value)
				let data = {
					forumTitle: e.value,
					method: "searchForum"
				}
				uniCloud.callFunction({
						name: "forumController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						if (res.result.data.length == 0) {
							this.isSearchForumEntiy = true
						} else {
							this.searchLearningForum = res.result.data
						}

					})
					.catch((err) => {
						console.log(err)
					})
			},
			focus(e) {
				console.log(e)
				this.isSearch = false
			},
			blur(e) {
				console.log(e)
			},
			cancel(e) {
				console.log(e)
				this.isSearch = true
				this.isSearchForumEntiy = false
				this.searchLearningForum = []
			},
			sortForumByLookCount() {
				uni.showLoading({
					mask: true
				})
				let data = {
					method: "sortForumByLookCount"
				}
				uniCloud.callFunction({
						name: "forumController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						if (res.result.data.length == 0) {
							this.isSortFormListEntiy = true
						} else {
							this.sortFormList = res.result.data
						}
					})
					.catch((err) => {
						console.log(err)
					})
			}
		}
	}
</script>

<style>
	@import "../../common/forum/forum.css"
</style>
