<template>
	<view style="padding: 0 30rpx;">
		<uni-title type="h1" :title="title"></uni-title>
		<view style="display: flex;justify-content: space-between;align-items: center;">
			<uni-tag :text="Class" type="primary"></uni-tag>
			<uni-dateformat style="color: #999999;font-size: 13px;" :date="submitTime"></uni-dateformat>
		</view>

		<view style="margin-top: 20rpx;">
			{{content}}
		</view>
		<view style="margin-top: 20rpx ;">
			<image style="width: 100%;" v-for="(item,index) in img" :key="item._id" :src="item.fileID" mode="widthFix">
			</image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				content: "",
				img: [],
				Class: "",
				submitTime: ""
			}
		},
		onLoad(option) {
			console.log(option)
			this.getSchoolNoticeById(option.id)
		},
		methods: {
			getSchoolNoticeById(id) {
				let data = {
					id: id,
					method: "getSchoolNoticeById"
				}
				uniCloud.callFunction({
						name: "SchoolNoticeController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						this.title = res.result.data[0].title
						this.content = res.result.data[0].content
						this.img = res.result.data[0].img
						this.Class = res.result.data[0].class
						this.submitTime = res.result.data[0].submitTime
					})
					.catch((err) => {
						console.log(err)
					})
			}
		}
	}
</script>

<style>

</style>
