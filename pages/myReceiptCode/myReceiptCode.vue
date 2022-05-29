<template>
	<view style="height: 100%;display: flex;flex-direction: column;justify-content: space-around;align-items: center;">
		<view style="display: flex;flex-direction: column;align-items: center;">
			<view>
				我的支付宝收款码
			</view>
			<view style="margin-top: 20rpx;" v-if="isUploadZFB">
				<uni-file-picker ref="files" disable-preview :del-icon="false" return-type="object" :auto-upload="false"
					:list-styles="listStyles" :image-styles="imageStyles" @success="uploadSuccess">选择图片
				</uni-file-picker>
			</view>
			<button v-if="isUploadZFB" style="width: 100%;margin-top: 30rpx;" type="default" @click="upload">上传</button>
			<view style="margin-top: 20rpx;" v-if="!isUploadZFB">
				<image style="width: 150px;height: 150px;" :src="zfbReceiptCode" mode="aspectFill"></image>
			</view>
			<button v-if="!isUploadZFB" style="width: 100%;margin-top: 30rpx;" type="default"
				@click="isUploadZFB=true">编辑</button>
		</view>
		<view style=" display: flex;flex-direction: column;align-items: center;">
			<view>
				我的微信收款码
			</view>
			<view style="margin-top: 20rpx;" v-if="isUploadWX">
				<uni-file-picker ref="files1" disable-preview :del-icon="false" return-type="object"
					:auto-upload="false" :list-styles="listStyles" :image-styles="imageStyles"
					@success="uploadSuccess1">选择图片
				</uni-file-picker>
			</view>
			<button v-if="isUploadWX" style="width: 100%;margin-top: 30rpx;" type="default" @click="upload1">上传</button>
			<view style="margin-top: 20rpx;" v-if="!isUploadWX">
				<image style="width: 150px;height: 150px;" :src="wxReceiptCode" mode="aspectFill"></image>
			</view>
			<button v-if="!isUploadWX" style="width: 100%;margin-top: 30rpx;" type="default"
				@click="isUploadWX=true">编辑</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageStyles: {
					width: 150,
					height: 150,
					border: {
						color: "#75757a",
						width: 2,
						style: 'dashed',
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
				zfbReceiptCode: "",
				wxReceiptCode: "",
				isUploadZFB: true,
				isUploadWX: true
			}
		},
		onLoad() {
			this.getMyReceiptCode()
		},
		methods: {
			uploadSuccess(path) {
				console.log(path.tempFilePaths[0])
				if (this.wxReceiptCode == "" && this.zfbReceiptCode == "") {
					uni.getStorage({
						key: 'userinfo',
						success: (res1) => {
							console.log(res1.data)
							let data = {
								email: res1.data.email,
								wx: "",
								zfb: path.tempFilePaths[0],
								method: "uploadReceiptCode"
							}
							console.log(data)
							uniCloud.callFunction({
									name: "payWayController",
									data: data
								})
								.then((res) => {
									uni.hideLoading()
									console.log(res)
									if (res.result.affectedDocs != 0) {
										uni.showToast({
											duration: 1500,
											title: '上传成功！',
											mask: true,
											icon: 'none'
										})
										this.getMyReceiptCode()
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
				} else {
					uni.getStorage({
						key: 'userinfo',
						success: (res1) => {
							console.log(res1.data)
							let data = {
								email: res1.data.email,
								wx: "",
								zfb: path.tempFilePaths[0],
								method: "updateZFBReceiptCode"
							}
							console.log(data)
							uniCloud.callFunction({
									name: "payWayController",
									data: data
								})
								.then((res) => {
									uni.hideLoading()
									console.log(res)
									if (res.result.affectedDocs != 0) {
										uni.showToast({
											duration: 1500,
											title: '更新成功！',
											mask: true,
											icon: 'none'
										})
										this.getMyReceiptCode()
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
				}
			},
			upload() {
				this.$refs.files.upload()
			},
			uploadSuccess1(path) {
				console.log(path.tempFilePaths[0])
				if (this.wxReceiptCode == "" && this.zfbReceiptCode == "") {
					uni.getStorage({
						key: 'userinfo',
						success: (res1) => {
							console.log(res1.data)
							let data = {
								email: res1.data.email,
								wx: path.tempFilePaths[0],
								zfb: "",
								method: "uploadReceiptCode"
							}
							console.log(data)
							uniCloud.callFunction({
									name: "payWayController",
									data: data
								})
								.then((res) => {
									uni.hideLoading()
									console.log(res)
									if (res.result.affectedDocs != 0) {
										uni.showToast({
											duration: 1500,
											title: '上传成功！',
											mask: true,
											icon: 'none'
										})
										this.getMyReceiptCode()
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
				} else {
					uni.getStorage({
						key: 'userinfo',
						success: (res1) => {
							console.log(res1.data)
							let data = {
								email: res1.data.email,
								wx: path.tempFilePaths[0],
								zfb: "",
								method: "updateWXReceiptCode"
							}
							console.log(data)
							uniCloud.callFunction({
									name: "payWayController",
									data: data
								})
								.then((res) => {
									uni.hideLoading()
									console.log(res)
									if (res.result.affectedDocs != 0) {
										uni.showToast({
											duration: 1500,
											title: '更新成功！',
											mask: true,
											icon: 'none'
										})
										this.getMyReceiptCode()
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
				}
			},
			upload1() {
				this.$refs.files1.upload()
			},
			getMyReceiptCode() {
				uni.getStorage({
					key: 'userinfo',
					success: (res1) => {
						console.log(res1.data)
						let data = {
							email: res1.data.email,
							method: "getPayCode"
						}
						console.log(data)
						uniCloud.callFunction({
								name: "payWayController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								if (res.result.data.length != 0) {
									if (res.result.data[0].wx) {
										this.wxReceiptCode = res.result.data[0].wx
										this.isUploadWX = false
									}
									if (res.result.data[0].zfb) {
										this.zfbReceiptCode = res.result.data[0].zfb
										this.isUploadZFB = false
									}
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
			}
		}
	}
</script>

<style>

</style>
