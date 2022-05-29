<template>
	<view style="padding:10rpx 20rpx 110rpx 20rpx">
		<view class="idle-detail-imglist" style="height: 400rpx;border-radius: 10rpx;">
			<swiper style="height: 100%;" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in idleImageList" :key="index">
					<view class="swiper-item">
						<image style="width: 100%;height: 400rpx;border-radius: 10rpx;" :src="item.fileID"
							mode="aspectFill" @click="previewImg(index)"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="idle-detail-user">
			<view class="idle-tx-name">
				<image :src="userAvatar" mode="aspectFill"></image>
				<view class="idle-user-name">
					<text>{{userName}}</text>
					<text>发布于<uni-dateformat :date="submitTime"></uni-dateformat> {{deliveryAddress}}</text>
				</view>
			</view>
			<view class="idle-user-button">
				<uni-icons type="plusempty" color="#FFFFFF"></uni-icons>关注
			</view>
		</view>
		<view class="idle-detail-content">
			<view class="idle-detail-price">
				<view class="idle-idle-tag">
					{{quality}}
				</view>
				<text>￥{{idlePrice}}</text>
				<view class="idle-price-tag" v-if="isFreeShipping">
					包邮
				</view>
			</view>
			<view class="idle-detail-title">
				{{idleName}}
			</view>
			<view class="idle-detail-describe">
				{{idleDescribe}}
			</view>
			<view class="idle-detail-video" v-if="idleVideo.length==1">
				<video :src="idleVideo[0].fileID" controls></video>
			</view>
			<view class="idle-detail-browse">
				<text>{{messageCount}}人留言</text>
				<text>库存 {{stockCount}}</text>
				<text>{{ealuateCount}}人评价</text>
			</view>
		</view>
		<!-- 	<view class="idle-detail-sayprice">
			<text>出价</text>
			<view class="idle-sayprice-list">
				<view class="idle-sayprice-item">
					<view class="idle-sayprice-user">
						<image
							src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a0439cf-af57-474f-b688-798babb30901/047f01cb-a86a-4e55-acd1-88c70223be6c.jpg"
							mode="aspectFill"></image>
						<view class="sayprice-user-name">
							<text>来自湖北襄阳</text>
							<text>小宏同学</text>
						</view>
					</view>
					<view class="idle-sayprice-price">
						<view class="idle-sayprice-remark">
							默默出了个价
						</view>
						<text>￥200</text>
					</view>
				</view>
				<view class="idle-sayprice-item">
					<view class="idle-sayprice-user">
						<image
							src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a0439cf-af57-474f-b688-798babb30901/047f01cb-a86a-4e55-acd1-88c70223be6c.jpg"
							mode="aspectFill"></image>
						<view class="sayprice-user-name">
							<text>来自湖北襄阳</text>
							<text>小宏同学</text>
						</view>
					</view>
					<view class="idle-sayprice-price">
						<view class="idle-sayprice-remark">
							默默出了个价
						</view>
						<text>￥200</text>
					</view>
				</view>
			</view>
		</view> -->
		<view class="idle-detail-evaluate">
			<text>全部评价({{ealuateCount}})</text>
			<view class="idle-evaluate-list">
				<view class="idle-evaluate-item" v-for="(item,index) in evaluateList" :key="item._id">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<image style="width: 50rpx;height: 50rpx;border-radius: 50rpx;"
								:src="item.user_info[0].userAvatar" mode="aspectFill"></image>
							<view style="margin-left: 10rpx;">
								<view style="font-size: 13px;">
									{{item.user_info[0].userName}}
								</view>
								<view style="color: #999999;font-size: 12px;">
									<uni-dateformat :date="item.submitTime"></uni-dateformat>
								</view>
							</view>
						</view>
						<uni-icons color="#0bc99d" style="margin-right: 100rpx;"
							:type="item.idleScore>2.5 ? 'hand-up-filled' : 'hand-down-filled'" size="25">
						</uni-icons>
					</view>
					<view style="margin-top: 10rpx;">
						<uni-rate :disabled="true" disabledColor="#fdc031" v-model="item.idleScore" />
					</view>
					<view style="margin-top: 10rpx;">
						{{item.idleScoreDescription}}
					</view>
					<view style="margin-top: 10rpx;display: flex;">
						<image v-for="(item1,index1) in item.idleImageList" :key="index"
							style="width: 210rpx;height: 210rpx;margin-right: 5rpx;" :src="item1.fileID"
							mode="aspectFill" @click="previewImg2(index1,item.idleImageList)"></image>
					</view>
				</view>
				<view v-if="evaluateList.length==0">
					暂无评价
				</view>
			</view>
		</view>
		<view class="idle-detail-message">
			<text>全部留言({{messageCount}})</text>
			<view class="idle-message-list">
				<view class="idle-message-item" style="flex-direction: column;" v-for="(item,index) in messageList"
					:key="item._id" v-if="item.messageContent">
					<view style="display: flex; align-items: center;">
						<view class="message-username-content">
							<view class="message-username-time">
								<image :src="item.userAvatar" mode="aspectFill"></image>
								<text style="margin-left: 10rpx;">{{item.userName}}</text>
								<view style="font-weight: normal;font-size: 11px;margin-left: 10rpx;">
									<uni-dateformat :date="item.submitTime"></uni-dateformat>
								</view>
							</view>
							<text style="width: 80%;margin-left: 60rpx;"
								@click="applyUserMessageClick(item.userName,item.email,item._id)">
								{{item.messageContent}}
							</text>
						</view>
					</view>
					<view class="idle-message-list" style="margin-left: 80rpx;padding: 0 !important;">
						<view class="idle-message-item" style="align-items: center;border-bottom: none !important;"
							v-for="(item1,index1) in item.userMessage_info" :key="item1._id">
							<view class="message-username-content">
								<view class="message-username-time">
									<image :src="item1.userAvatar" mode="aspectFill"></image>
									<text style="margin-left: 10rpx;">{{item1.userName}}</text>
									<view style="font-weight: normal;font-size: 11px;margin-left: 10rpx;">
										<uni-dateformat :date="item1.submitTime"></uni-dateformat>
									</view>
								</view>
								<text style="width: 80%;margin-left: 60rpx;">{{item1.applyUserMessage}}</text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="messageList.length==0">
					暂无留言
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="idle-user-connect">
				<view class="user-connect-button" @click="getInformation()">
					{{isIdleAnonymous ? "匿名" : "获取联系方式("+idleContactInformationMode+")"}}
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup1" type="bottom">
			<view class="idle-user-message" :style="{height: keybroadheight+200+'rpx'}">
				<view class="user-message-content">
					<uni-easyinput :inputBorder="false" v-model="idleMessage" placeholder="看对眼就留言,问问更多细节~~"
						@focus="textFocus" @blur="textblur">
					</uni-easyinput>
					<!-- <input type="text" value="" placeholder="看对眼就留言,问问更多细节~~"  /> -->
					<view class="user-message-button" @click="submitComment()">
						发送
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup2" type="bottom">
			<view class="idle-user-message" :style="{height: keybroadheight+200+'rpx'}">
				<view class="user-message-content">
					<uni-easyinput :inputBorder="false" v-model="applyUserMessage" :placeholder="'回复'+beApplyUserName"
						@focus="textFocus" @blur="textblur">
					</uni-easyinput>
					<!-- <input type="text" value="" placeholder="看对眼就留言,问问更多细节~~"  /> -->
					<view class="user-message-button" @click="submitUserComment()">
						发送
					</view>
				</view>
			</view>
		</uni-popup>
		<view class="idle-detail-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					icon: 'phone',
					text: '联系'
				}, {
					icon: 'chat',
					text: '留言',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车'
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				],
				keybroadheight: 0,
				id: "",
				idleName: "",
				oneClass: "",
				twoClass: "",
				threeClass: "",
				quality: "",
				idleDescribe: "",
				idlePrice: "",
				isFreeShipping: "",
				shippingPrice: "",
				idleImageList: "",
				idleVideo: "",
				deliveryAddress: "",
				idleContactInformationMode: "",
				idleContactInformation: "",
				isIdleAnonymous: "",
				idleTradingState: "",
				userAvatar: "",
				userName: "",
				email: "",
				submitTime: "",
				lookCount: "",
				stockCount: "",
				idleMessage: "", //评论
				applyUserMessage: "",
				beApplyUserName: "",
				beApplyUserEmail: "",
				beApplyMessageId: "",
				messageList: [],
				messageCount: 0,
				userEmail: "",
				evaluateList: [],
				ealuateCount: 0
			}
		},
		onLoad(option) {
			console.log(option)
			this.getIdleById(option.id)
			this.getIdleMessage(option.id)
			this.getUserEmail()
			this.getEvaluateList(option.id)
		},
		methods: {
			onClick(e) {
				console.log(e)
				if (e.index == 0) {
					if (this.userEmail != this.email) {
						this.$refs.popup.open('bottom')
					} else {
						uni.showToast({
							duration: 1500,
							title: '此物品是您发布的，无法获取联系方式！',
							mask: true,
							icon: 'none'
						})
					}
				} else if (e.index == 1) {
					this.$refs.popup1.open('bottom')
				} else if (e.index == 2) {
					uni.switchTab({
						url: "../shoppingcar/shoppingcar"
					})
				}
			},
			applyUserMessageClick(username, email, id) {
				this.beApplyUserName = username
				this.beApplyUserEmail = email
				this.beApplyMessageId = id
				console.log(username)
				console.log(email)
				console.log(id)
				this.$refs.popup2.open('bottom')
			},
			buttonClick(e) {
				console.log(e)
				if (e.index == 0) {
					this.addToShoppingCar()
				} else if (e.index == 1) {
					this.buyNow()
				}
				// this.options[2].info++
			},
			getIdleById(id) {
				let data = {
					method: "getIdleById",
					id: id
				}
				uniCloud.callFunction({
						name: "idleController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						this.id = res.result.data[0]._id
						this.idleName = res.result.data[0].idleName
						this.oneClass = res.result.data[0].oneClass
						this.twoClass = res.result.data[0].twoClass
						this.threeClass = res.result.data[0].threeClass
						this.quality = res.result.data[0].quality
						this.idleDescribe = res.result.data[0].idleDescribe
						this.idlePrice = res.result.data[0].idlePrice
						this.isFreeShipping = res.result.data[0].isFreeShipping
						this.shippingPrice = res.result.data[0].shippingPrice
						this.idleImageList = res.result.data[0].idleImageList
						this.idleVideo = res.result.data[0].idleVideo
						this.deliveryAddress = res.result.data[0].deliveryAddress
						this.idleContactInformationMode = res.result.data[0].idleContactInformationMode
						this.idleContactInformation = res.result.data[0].idleContactInformation
						this.isIdleAnonymous = res.result.data[0].isIdleAnonymous
						this.idleTradingState = res.result.data[0].idleTradingState
						this.userAvatar = res.result.data[0].userAvatar
						this.userName = res.result.data[0].userName
						this.email = res.result.data[0].email
						this.submitTime = res.result.data[0].submitTime
						this.lookCount = res.result.data[0].lookCount
						this.stockCount = res.result.data[0].stockCount
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getInformation() {
				if (this.isIdleAnonymous == false) {
					uni.setClipboardData({
						data: this.idleContactInformation,
						success: function() {
							console.log('success');
						}
					});
				}
			},
			textFocus(e) {
				// console.log(e.detail.height)
				this.keybroadheight = 30
			},
			textblur() {
				this.keybroadheight = 0
			},
			submitComment() {
				uni.showLoading({
					mask: true
				})
				if (this.idleMessage != "") {
					uni.request({
						url: 'https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined',
						data: {
							access_token: "24.5d4e30ff6b095ce761376e9dce767b7c.2592000.1656337842.282335-26041411",
							text: this.idleMessage
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
												console.log(res2.result.data[0])
												var myDate = new Date()
												let idleMessage = {
													messageContent: this.idleMessage,
													userAvatar: res2.result.data[0]
														.userAvatar,
													userName: res2.result.data[0].userName,
													email: res2.result.data[0].email,
													idleId: this.id,
													submitTime: myDate.getTime(),
													method: "uploadIdleMessage"
												}
												console.log(idleMessage)
												uniCloud.callFunction({
														name: "idleMessageController",
														data: idleMessage
													})
													.then((res) => {
														uni.hideLoading()
														console.log(res)
														if (res.result.id) {
															this.idleMessage = ''
															this.getIdleMessage(this.id)
															uni.showToast({
																duration: 1500,
																title: '留言成功!',
																mask: true,
																icon: 'none'
															})
															this.$refs.popup1.close()
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
						title: '留言不能为空!',
						mask: true,
						icon: 'none'
					})
				}
			},
			submitUserComment() {
				if (this.applyUserMessage != "") {
					uni.showLoading({
						mask: true
					})
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
									let userMessage = {
										applyUserMessage: this.applyUserMessage,
										userAvatar: res2.result.data[0].userAvatar,
										userName: res2.result.data[0].userName,
										email: res2.result.data[0].email,
										idleId: this.id,
										beApplyUserEmail: this.beApplyUserEmail,
										beApplyUserName: this.beApplyUserName,
										beApplyMessageId: this.beApplyMessageId,
										submitTime: myDate.getTime(),
										method: "uploadUserIdleMessage"
									}
									console.log(userMessage)
									uniCloud.callFunction({
											name: "idleMessageController",
											data: userMessage
										})
										.then((res) => {
											uni.hideLoading()
											console.log(res)
											if (res.result.id) {
												this.applyUserMessage = ''
												this.getIdleMessage(this.id)
												uni.showToast({
													duration: 1500,
													title: '评论用户成功!',
													mask: true,
													icon: 'none'
												})
												this.$refs.popup2.close()
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
				} else {
					uni.showToast({
						duration: 1500,
						title: '留言不能为空!',
						mask: true,
						icon: 'none'
					})
				}
			},
			getIdleMessage(id) {
				uni.showLoading({
					mask: true
				})
				let data = {
					// page: this.page,
					idleId: id,
					method: "getIdleMessageById"
				}
				console.log(data)
				uniCloud.callFunction({
						name: "idleMessageController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res.result.data)
						if (res.result.data != "") {
							this.messageList = res.result.data
							this.messageCount = res.result.data.length
						} else {
							uni.showToast({
								duration: 1500,
								title: '没有评论了!',
								mask: true,
								icon: 'none'
							})
						}
						// if (this.comment == "") {
						// 	this.isCommentEntiy = true
						// } else {
						// 	this.isCommentEntiy = false
						// }
					})
					.catch((err) => {
						console.log(err)
					})
			},
			previewImg(index) {
				var imgList = []
				for (let i = 0; i < this.idleImageList.length; i++) {
					imgList.push(this.idleImageList[i].fileID)
				}
				console.log(imgList)
				uni.previewImage({
					current: index,
					urls: imgList,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				})
			},
			previewImg2(index, idleImageList) {
				var imgList = []
				for (let i = 0; i < idleImageList.length; i++) {
					imgList.push(idleImageList[i].fileID)
				}
				console.log(imgList)
				uni.previewImage({
					current: index,
					urls: imgList,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
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
			addToShoppingCar() {
				//1查询数据库，如果数据库中含有相同商品，则数量加一即可
				//2数据库不含相同商品，直接添加
				if (this.userEmail != this.email) {
					uni.showLoading({
						mask: true
					})
					let data = {
						idleId: this.id,
						myEmail: this.userEmail,
						method: "getShoppingcarDataByIdleId"
					}
					uniCloud.callFunction({
							name: "shoppingcarController",
							data: data
						})
						.then((res) => {
							uni.hideLoading()
							console.log(res)
							if (res.result.data.length == 0) {
								if (this.stockCount > 0) {
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
													let shoppingCarData = {
														idleId: this.id,
														idleCover: this.idleImageList[0].fileID,
														idleName: this.idleName,
														idleDescribe: this.idleDescribe,
														quality: this.quality,
														idlePrice: this.idlePrice,
														idleUserEmail: this.email,
														idleUserName: this.userName,
														myEmail: res2.result.data[0].email,
														amount: 1,
														stockCount: this.stockCount,
														isChecked: 0,
														submitTime: myDate.getTime(),
														method: "uploadIdleToCart"
													}
													console.log(shoppingCarData)
													uniCloud.callFunction({
															name: "shoppingcarController",
															data: shoppingCarData
														})
														.then((res) => {
															uni.hideLoading()
															console.log(res)
															if (res.result.id) {
																uni.switchTab({
																	url: "../shoppingcar/shoppingcar"
																})
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
								} else {
									uni.showToast({
										duration: 1500,
										title: '商品库存不足！',
										mask: true,
										icon: 'none'
									})
								}
							} else {
								let amount = res.result.data[0].amount + 1
								if (amount <= res.result.data[0].stockCount) {
									let data = {
										idleId: this.id,
										amount: amount,
										method: "updateShoppingcarDataAmount"
									}
									uniCloud.callFunction({
											name: "shoppingcarController",
											data: data
										})
										.then((res) => {
											uni.hideLoading()
											console.log(res)
											if (res.result.affectedDocs != 0) {
												uni.switchTab({
													url: "../shoppingcar/shoppingcar"
												})
											}
										})
										.catch((err) => {
											console.log(err)
										})
								} else {
									uni.showToast({
										duration: 1500,
										title: '商品库存不足！',
										mask: true,
										icon: 'none'
									})
								}
							}
						})
						.catch((err) => {
							console.log(err)
						})
				} else {
					uni.showToast({
						duration: 1500,
						title: '此物品是您发布的，不能加入购物车！',
						mask: true,
						icon: 'none'
					})
				}
			},
			buyNow() {
				if (this.userEmail != this.email) {
					if (this.stockCount > 0) {
						let data = {
							isChecked: 0,
							myEmail: this.userEmail,
							method: "cancelOrAllCheck"
						}
						uniCloud.callFunction({
								name: "shoppingcarController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
							})
							.catch((err) => {
								console.log(err)
							})
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
										let shoppingCarData = {
											idleId: this.id,
											idleCover: this.idleImageList[0].fileID,
											idleName: this.idleName,
											idleDescribe: this.idleDescribe,
											quality: this.quality,
											idlePrice: this.idlePrice,
											idleUserEmail: this.email,
											idleUserName: this.userName,
											myEmail: res2.result.data[0].email,
											amount: 1,
											stockCount: this.stockCount,
											isChecked: 1,
											submitTime: myDate.getTime(),
											method: "uploadIdleToCart"
										}
										console.log(shoppingCarData)
										uniCloud.callFunction({
												name: "shoppingcarController",
												data: shoppingCarData
											})
											.then((res) => {
												uni.hideLoading()
												console.log(res)
												if (res.result.id) {
													uni.redirectTo({
														url: "../orderDetail/orderDetail"
													})
													setTimeout(() => {
														this.removeShoppingcarChecked()
													}, 1000)
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
					} else {
						uni.showToast({
							duration: 1500,
							title: '商品库存不足！',
							mask: true,
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						duration: 1500,
						title: '此物品是您发布的，不能购买！',
						mask: true,
						icon: 'none'
					})
				}
			},
			removeShoppingcarChecked() {
				uni.showLoading({
					mask: true
				})
				let data = {
					method: "removeShoppingcarChecked"
				}
				uniCloud.callFunction({
						name: "shoppingcarController",
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
			getEvaluateList(id) {
				let evaluate = {
					idleId: id,
					method: "getEvaluateList"
				}
				console.log(evaluate)
				uniCloud.callFunction({
						name: "idleEvaluateController",
						data: evaluate
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						if (res.result.data != 0) {
							this.evaluateList = res.result.data
							this.ealuateCount = res.result.data.length
						}
					})
					.catch((err) => {
						console.log(err)
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.idle-detail-user {
		width: 100%;
		height: 100rpx;
		border-bottom: 1px solid #DCDFE6;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.idle-tx-name {
			display: flex;
			align-items: center;

			.idle-user-name {
				display: flex;
				flex-direction: column;
				margin-left: 5rpx;
			}

			.idle-user-name text:nth-child(1) {
				font-weight: bold;
			}

			.idle-user-name text:nth-child(2) {
				color: #999999;
				font-size: 13px;
			}
		}

		.idle-tx-name image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 80rpx;
		}

		.idle-user-button {
			width: 120rpx;
			height: 50rpx;
			background: #0bc99d;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
			border-radius: 50rpx;
			line-height: 50rpx;
		}
	}

	.idle-detail-content {
		display: flex;
		flex-direction: column;

		.idle-detail-price {
			display: flex;
			align-items: center;
			margin-top: 20rpx;

			.idle-idle-tag {
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
				margin-right: 5rpx;
			}

			.idle-price-tag {
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
				margin-left: 10rpx;
			}
		}

		.idle-detail-price text {
			color: #fe4543;
			font-size: 14px;
			font-weight: bold;
		}

		.idle-detail-title {
			margin-top: 20rpx;
			font-weight: bold;
		}

		.idle-detail-describe {
			margin-top: 20rpx;
			background: #FFFFFF;
			padding: 20rpx;
			border-radius: 20rpx;
		}

		.idle-detail-video {
			width: 100%;
			margin-top: 20rpx;
			border-radius: 20rpx;
		}

		.idle-detail-video video {
			width: 100%;
			border-radius: 20rpx;
		}

		.idle-detail-browse {
			width: 100%;
			// border: 1px solid;
			color: #999999;
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			margin-top: 20rpx;
		}
	}

	.idle-detail-sayprice {
		font-weight: bold;
		margin-top: 20rpx;

		.idle-sayprice-list {
			width: 100%;

			.idle-sayprice-item {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 10rpx;
				// border: 1px solid #DCDCDC;
				border-radius: 10rpx;
				padding: 5rpx 10rpx;
				background-color: #FFFFFF;
				box-sizing: border-box;

				.idle-sayprice-user {
					display: flex;
					align-items: center;

					.sayprice-user-name {
						margin-left: 10px;
						display: flex;
						flex-direction: column;
					}

					.sayprice-user-name text:nth-child(1) {
						color: #999999;
						font-size: 13px;
						font-weight: normal;
					}

					.sayprice-user-name text:nth-child(2) {
						font-weight: normal;
					}
				}

				.idle-sayprice-user image {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50rpx;
				}

				.idle-sayprice-price {
					display: flex;

					.idle-sayprice-remark {
						font-weight: normal;
						font-size: 15px;
					}
				}

				.idle-sayprice-price text {
					color: #fe4543;
					font-size: 14px;
					font-weight: bold;
					margin-left: 10rpx;
				}
			}
		}
	}

	.idle-detail-evaluate {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;

		.idle-evaluate-list {
			display: flex;
			flex-direction: column;
			width: 100%;
			margin-top: 10rpx;
			background: #FFFFFF;
			padding: 20rpx;
			border-radius: 20rpx;
			box-sizing: border-box;

			.idle-evaluate-item {
				display: flex;
				flex-direction: column;
				margin-top: 10rpx;
				padding-bottom: 10rpx;
				border-bottom: 1px solid #EEEEEE;
			}
		}
	}

	.idle-detail-evaluate text:nth-child(1) {
		font-weight: bold;
	}

	.idle-detail-message {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;

		.idle-message-list {
			display: flex;
			flex-direction: column;
			width: 100%;
			margin-top: 10rpx;
			background: #FFFFFF;
			padding: 20rpx;
			border-radius: 20rpx;
			box-sizing: border-box;

			.idle-message-item {
				display: flex;
				// align-items: center;
				margin-top: 10rpx;
				padding-bottom: 10rpx;
				border-bottom: 1px solid #EEEEEE;

				.message-username-content {
					display: flex;
					flex-direction: column;
					margin-left: 10rpx;
					width: 100%;

					.message-username-time {
						color: #999999;
						font-size: 13px;
						display: flex;
						align-items: center;
						flex-direction: row;
					}
				}

				.message-username-content text:nth-child(2) {
					font-size: 14px;
					margin-top: 5rpx;
				}
			}

			.idle-message-item image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50rpx;
			}
		}
	}

	.idle-detail-message text:nth-child(1) {
		font-weight: bold;
	}

	.idle-detail-nav {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
	}

	.idle-user-connect {
		// background: #FFFFFF;
		height: 200rpx;
		display: flex;
		// align-items: center;
		justify-content: center;

		.user-connect-button {
			position: sticky;
			top: 0;
			width: 500rpx;
			height: 100rpx;
			background: #0bc99d;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
			border-radius: 100rpx;
		}
	}

	.idle-user-message {
		background: #FFFFFF;
		// height: 200rpx;
		display: flex;
		// align-items: center;
		justify-content: center;

		.user-message-content {
			position: sticky;
			top: 0;
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			// border: 1px solid;

			.user-message-button {
				width: 120rpx;
				height: 60rpx;
				border-radius: 50rpx;
				background: #0bc99d;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #FFFFFF;
				margin-left: 10rpx;
			}
		}

		.user-message-content uni-easyinput {
			// border: 1px solid;
			width: 80%;
			height: 100rpx;
			display: flex;
			align-items: center;
			// margin-left: 20rpx;
		}
	}
</style>
