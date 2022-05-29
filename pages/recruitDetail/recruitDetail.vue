<template>
	<view class="recruit-detail">
		<view class="recruit-detail-box">
			<view class="recruit-detail-name">
				认领物品名称 | {{recruitName}}
				<view class="recruit-submit-time">
					<uni-dateformat :date="submitTime"></uni-dateformat>
				</view>
			</view>
			<!-- <view class="recruit-detail-class">
				<text v-if="recruitClass=='certificates'">
					认领物品类型 | 证件
				</text>
				<text v-if="recruitClass=='clothes'">
					认领物品类型 | 服饰
				</text>
				<text v-if="recruitClass=='digital'">
					认领物品类型 | 数码
				</text>
				<text v-if="recruitClass=='dailyNecessities'">
					认领物品类型 | 日用品
				</text>
				<text v-if="recruitClass=='schoolSupplies'">
					认领物品类型 | 学习用品
				</text>
				<text v-if="recruitClass=='other'">
					认领物品类型 | 其他
				</text>
			</view> -->
			<view class="recruit-detail-address">
				<image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/bcb8106d-5803-494e-9419-188473a2fd42.png"
					mode="widthFix"></image>
				<view class="school">
					{{address=='未选择' ? '未选择学校' :address}}
				</view>
			</view>
			<view class="recruit-detail-img">
				<image
					:src="recruitImg=='' ?'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/5fcaad5d-c412-4629-bd84-29bd02d39ea7.png':recruitImg"
					mode="aspectFill" @click="previewImage()"></image>
			</view>
			<view class="recruit-detail-location">
				拾到位置 | {{detailedAddress}}
			</view>
			<view class="recruit-detail-location">
				拾到时间 | {{datetimesingle}}
			</view>
			<view class="recruit-detail-location">
				备注 | {{recruitRemarks=='' ? '无' :recruitRemarks}}
			</view>
			<view class="recruit-button-box">
				<view class="recruit-state">
					{{recruitState==0 ?'认领中':'已认领'}}
				</view>
			</view>
		</view>
		<!-- <view class="recruit-state">
			认领中
		</view> -->
		<view class="recruit-user-box">
			<view class="recruit-user-content">
				<image :src="userAvatar" mode="aspectFill"></image>
				{{userName}}
			</view>
			<view class="recruit-button" @click="openRecruit()">
				认领
			</view>
		</view>
		<uni-popup ref="popup" type="center" :animation="true">
			<view class="recruit-button-content">
				<view class="recruit-content-logo">
					<image
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/a98b83d2-a8da-49c5-ae05-ae333269dbe8.png"
						mode="widthFix"></image>
				</view>
				<view class="recruit-content-title">
					失物招领
				</view>
				<view class="recruit-content-remark">
					注：寄放在代管处的物品可导航直接去领
				</view>
				<view class="recruit-content-user">
					<image :src="userAvatar" mode="aspectFill"></image>
					{{userName}}
				</view>
				<view class="recruit-content-location">
					<view v-if="recruitLocation=='selfCustody'">
						物品现位置：本人代管
					</view>
					<view v-if="recruitLocation=='situ'">
						物品现位置：拾取处
					</view>
					<view v-if="recruitLocation=='escrowOffice'">
						物品现位置：代管处
					</view>
					<view v-if="recruitLocation=='other'">
						物品现位置：其他
					</view>
					<image @click="toEscrowOffice()"
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/bcb8106d-5803-494e-9419-188473a2fd42.png"
						mode="widthFix"></image>
					<view @click="toEscrowOffice()">
						点击导航
					</view>
				</view>
				<!-- <view class="recruit-content-contact">
					{{contactInformationMode}}：{{contactInformation}}
				</view> -->
				<view class="recruit-content-submit" @click="getContactInformation()">
					{{isRecruitAnonymous ? '匿名' : '获取联系方式('+contactInformationMode+')'}}
				</view>
				<view class="recruit-content-submit do-recruit" @click="doRecruit()">
					{{email==userEmail||recruitState == 1 ? '无法认领' : '我要认领'}}
				</view>
				<view class="recruit-content-attention">
					请添加好友/通话后介绍物品的详细信息，谨防诈骗
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup1" type="center" :animation="true">
			<view class="makesure-recruit">
				<uni-title type="h1" title="提示"></uni-title>
				<uni-title type="h3" title="确定要认领此物品吗？"></uni-title>
				<view class="dorecruit-remark">
					<textarea maxlength="50" style="width: 100%;height: 150rpx;" placeholder-style="color:#B8B8B8"
						placeholder="输入备注更容易认领成功哦!(备注不能超过50字符)" v-model="doRecruitRemark" />
				</view>
				<view class="submit-remark">
					<view @click="cancelRecruit()">取消</view>
					<view @click="makeSureDoRecruit()">确认</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: "",
				contactInformation: "",
				contactInformationMode: "",
				datetimesingle: "",
				detailedAddress: "",
				isRecruitAnonymous: "",
				recruitClass: "",
				recruitImg: "",
				recruitLocation: "",
				recruitName: "",
				recruitRemarks: "",
				recruitState: "",
				submitTime: "",
				userAvatar: "",
				email: "",
				userName: "",
				id: "",
				doRecruitRemark: "",
				userEmail: "" //申请人的邮箱
			}
		},
		onLoad(option) {
			console.log(option)
			this.getRecruitById(option.id)
			this.getUserEmail()
		},
		methods: {
			previewImage() {
				if (this.recruitImg != "") {
					uni.previewImage({
						urls: [
							this.recruitImg
						]
					});
				}
			},
			openRecruit() {
				this.$refs.popup.open('center')
			},
			getRecruitById(id) {
				uni.showLoading({
					mask: true
				})
				let data = {
					id: id,
					method: "getRecruitById"
				}
				uniCloud.callFunction({
						name: "recruitController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						this.address = res.result.data[0].address
						this.contactInformation = res.result.data[0].contactInformation
						this.contactInformationMode = res.result.data[0].contactInformationMode
						this.datetimesingle = res.result.data[0].datetimesingle
						this.detailedAddress = res.result.data[0].detailedAddress
						this.isRecruitAnonymous = res.result.data[0].isRecruitAnonymous
						this.recruitClass = res.result.data[0].recruitClass
						this.recruitImg = res.result.data[0].recruitImg
						this.recruitLocation = res.result.data[0].recruitLocation
						this.recruitName = res.result.data[0].recruitName
						this.recruitRemarks = res.result.data[0].recruitRemarks
						this.recruitState = res.result.data[0].recruitState
						this.submitTime = res.result.data[0].submitTime
						this.userAvatar = res.result.data[0].userAvatar
						this.email = res.result.data[0].email
						this.userName = res.result.data[0].userName
						this.id = res.result.data[0]._id
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getContactInformation() {
				if (this.isRecruitAnonymous == false) {
					uni.setClipboardData({
						data: this.contactInformation,
						success: function() {
							console.log('success');
						}
					});
				}
			},
			doRecruit() {
				if (this.email != this.userEmail) {
					if (this.recruitState == 0) {
						uni.showLoading({
							mask: true
						})
						let data = {
							myEmail: this.userEmail,
							recruitId: this.id,
							method: "checkDoUserEmail"
						}
						uniCloud.callFunction({
								name: "doRecruitUserController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								if (res.result.data == 0) {
									this.$refs.popup1.open('center')
								} else {
									uni.showToast({
										duration: 1500,
										title: '请勿重复提交申请!',
										mask: true,
										icon: 'none'
									})
								}
							})
							.catch((err) => {
								console.log(err)
							})
					} else {
						uni.showToast({
							duration: 1500,
							title: '物品已经被认领，无法认领!',
							mask: true,
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						duration: 1500,
						title: '此物品是你发布的，无法认领!',
						mask: true,
						icon: 'none'
					})
				}
			},
			cancelRecruit() {
				this.$refs.popup1.close();
				this.doRecruitRemark = ''
			},
			makeSureDoRecruit() {
				uni.showLoading({
					mask: true
				})
				var that = this
				uni.getStorage({
					key: 'userinfo',
					success: (res1) => {
						console.log(res1.data)
						let data = {
							email: res1.data.email,
							method: "getUserInfo"
						}
						uniCloud.callFunction({
								name: "userController",
								data: data
							})
							.then((res2) => {
								console.log(res2.result.data[0])
								var myDate = new Date()
								let doRecruit = {
									recruitId: that.id,
									recruitUserEmail: that.email,
									myUserAvatar: res2.result.data[0]
										.userAvatar,
									myUserName: res2.result.data[0].userName,
									myEmail: res2.result.data[0].email,
									submitTime: myDate.getTime(),
									doRecruitTime: "",
									doRecruitState: 0,
									remark: that.doRecruitRemark,
									method: "uploadDoRecruitUser"
								}
								console.log(doRecruit)
								uniCloud.callFunction({
										name: "doRecruitUserController",
										data: doRecruit
									})
									.then((res) => {
										uni.hideLoading()
										console.log(res)
										if (res.result.id) {
											uni.showToast({
												duration: 1500,
												title: '申请成功',
												mask: true,
												icon: 'none'
											})
											that.$refs.popup1.close();
											that.doRecruitRemark = ''
										}
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
			},
			getUserEmail() {
				var that = this
				uni.getStorage({
					key: 'userinfo',
					success: (res1) => {
						console.log(res1.data)
						this.userEmail = res1.data.email
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
			toEscrowOffice() {
				let plugin = requirePlugin('routePlan');
				let key = 'EISBZ-V2V34-C4GUF-D4AC6-X7YA7-H5BRJ'; //使用在腾讯位置服务申请的key
				let referer = '__UNI__C8C1BD3'; //调用插件的app的名称
				let endPoint = JSON.stringify({ //终点
					'name': '校园通代管处',
					'latitude': 39.894806,
					'longitude': 116.321592
				});
				wx.navigateTo({
					url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recruit-detail {
		padding: 10px;
	}

	.recruit-detail-box {
		background: #FFFFFF;
		width: 100%;
		// height: 600rpx;
		border-radius: 15px;
		padding: 10px;
		box-sizing: border-box;

		.recruit-detail-name {
			font-weight: bold;
			display: flex;
			justify-content: space-between;

			.recruit-submit-time {
				font-weight: normal !important;
				font-size: 13px;
				color: #999999;
			}
		}

		.recruit-detail-class {
			// font-size: 15px;
			color: #999999;
			margin-top: 20rpx;
		}

		.recruit-detail-address {
			height: 100rpx;
			// border: 1px solid;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.school {
				width: 400rpx;
				height: 50rpx;
				background: #0bc99d;
				border-radius: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #FFFFFF;
			}
		}

		.recruit-detail-address image {
			height: 50rpx;
			width: 50rpx;
		}

		.recruit-detail-img {
			width: 100%;
			height: 400rpx;
		}

		.recruit-detail-img image {
			width: 100%;
			height: 400rpx;
			border: 1px solid;
			border-radius: 20px;
		}

		.recruit-detail-location {
			color: #999999;
			margin-top: 10rpx;
			// border: 1px solid;
		}

		.recruit-button-box {
			width: 100%;
			margin-top: 30rpx;
			display: flex;
			// justify-content: center;

			.recruit-state {
				background: #0bc99d;
				color: #FFFFFF;
				width: 150rpx;
				height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				border-radius: 50rpx;
			}
		}
	}

	// .recruit-state {
	// 	background: #0bc99d;
	// 	color: #FFFFFF;
	// 	width: 50%;
	// 	height: 150rpx;
	// 	border-radius: 15px;
	// 	padding: 20px;
	// 	box-sizing: border-box;
	// 	margin: 10px auto;
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// }

	.recruit-user-box {
		background: #FFFFFF;
		width: 100%;
		height: 150rpx;
		border-radius: 15px;
		padding: 20px;
		box-sizing: border-box;
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.recruit-user-content {
			display: flex;
			align-items: center;
			// border: 1px solid;
			width: 350rpx;
			justify-content: flex-start;
		}

		.recruit-user-content image {
			width: 60rpx;
			height: 60rpx;
			border-radius: 60rpx;
			border: 2px solid #999999;
		}

		.recruit-button {
			width: 150rpx;
			height: 50rpx;
			border-radius: 50rpx;
			background: #0bc99d;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.recruit-button-content {
		width: 700rpx;
		// height: 1000rpx;
		background: #FFFFFF;
		border-radius: 50rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.recruit-content-logo {
			width: 100%;
			display: flex;
			justify-content: center;
		}

		.recruit-content-logo image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 80rpx;
			margin-top: 30rpx;
		}

		.recruit-content-title {
			font-weight: bold;
			margin-top: 20rpx;
		}

		.recruit-content-remark {
			font-size: 13px;
			color: #999999;
			margin-top: 10rpx;
		}

		.recruit-content-user {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #999999;
			margin-top: 100rpx;
		}

		.recruit-content-user image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 80rpx;
			margin-top: 30rpx;
		}

		.recruit-content-location {
			height: 130rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #999999;
			font-size: 13px;
			margin-top: 10rpx;
			// border: 1px solid;
		}

		.recruit-content-location image {
			width: 30px;
			height: 30px;
			// border: 1px solid;
		}

		.recruit-content-contact {
			color: #999999;
			font-size: 15px;
			margin-top: 10rpx;
		}

		.recruit-content-submit {
			width: 80%;
			height: 100rpx;
			border-radius: 20rpx;
			background: #0bc99d;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
			margin-top: 20rpx;
		}

		.do-recruit {
			width: 40% !important;
			border-radius: 100rpx !important;
		}

		.recruit-content-attention {
			color: #999999;
			font-size: 11px;
			margin-top: 100rpx;
			margin-bottom: 50rpx;
		}
	}

	.makesure-recruit {
		width: 500rpx;
		height: 500rpx;
		border-radius: 30rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.dorecruit-remark {
		width: 80%;
		height: 150rpx;
		border: 1px solid #B8B8B8;
		border-radius: 20rpx;
	}

	.submit-remark {
		width: 80%;
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.submit-remark view {
		width: 100rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		// border: 1px solid;
	}
</style>
