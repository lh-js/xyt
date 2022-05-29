<template>
	<lee-select-city :currentPosition="currentPosition" @getNewPosition="getNewPosition" @submit="submitHandler"
		@select-current="useCurrentPosition">
	</lee-select-city>
</template>

<script>
	var QQMapWX = require('../../common/location/qqmap-wx-jssdk.js');
	var qqmapsdk;
	export default {
		data() {
			return {
				currentPosition: ""
			}
		},
		onLoad(option) {
			this.currentPosition = option.address
			this.getNewPosition()
		},
		methods: {
			submitHandler({
				simple
			}) {
				uni.showModal({
					title: '当前选择',
					content: simple.join('/'),
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							var pages = getCurrentPages();
							var prevPage = pages[pages.length - 2]; //上一个页面
							//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
							prevPage.setData({
								deliveryAddress: simple
							})
							uni.navigateBack({
								delta: 1
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			useCurrentPosition(name) {
				uni.showModal({
					title: '使用当前定位',
					content: name,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							var pages = getCurrentPages();
							var prevPage = pages[pages.length - 2]; //上一个页面
							//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
							prevPage.setData({
								deliveryAddress: name
							})
							uni.navigateBack({
								delta: 1
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			getNewPosition(name) {
				uni.showLoading({
					mask: true
				})
				console.log(name)
				var _this = this
				qqmapsdk = new QQMapWX({
					key: 'EISBZ-V2V34-C4GUF-D4AC6-X7YA7-H5BRJ'
				});
				qqmapsdk.reverseGeocoder({
					success: (res) => {
						console.log(res)
						uni.hideLoading()
						_this.currentPosition = res.result.ad_info.province == res.result.ad_info.city ? res
							.result
							.ad_info
							.city + "/" + res.result.ad_info.district : res.result.ad_info.province + "/" + res
							.result.ad_info.city + "/" + res.result.ad_info.district
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
</style>
