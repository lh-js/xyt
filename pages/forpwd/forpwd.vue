<template>
	<view class="content">
		<view class="t-login">
			<view v-if="!changeSuccess">
				<view class="uni-form-item uni-column">
					<input type="text" v-model="email" class="uni-input" name="" placeholder="请输入邮箱" />
				</view>
				<view class="uni-form-item uni-column column-with-btn">
					<input type="text" class="uni-input" name="" placeholder="请输入图片验证码" v-model="captchaImg" />
					<!-- <image src="../../static/kitty-BasicLogin/captcha.jpg" mode="" class="img-captcha"></image> -->
					<view class="canvas-img-code" @click="refresh()">
						<canvas :style="{width:width+'px',height:height+'px'}" canvas-id="imgcanvas"
							@error="canvasIdErrorCallback"></canvas>
					</view>
				</view>
				<view class="uni-form-item uni-column column-with-btn">
					<input v-model="code" type="number" class="uni-input" name="" placeholder="请输入验证码" />
					<button :class="{active : !disableCodeBtn}" :disabled="disableCodeBtn"
						@tap="sendCode">{{codeBtn.text}}</button>
				</view>
				<!-- <view class="uni-form-item uni-column">
					<input v-model="yPWD" type="password" class="uni-input" name="" placeholder="请输入原密码" />
				</view> -->
				<view class="uni-form-item uni-column">
					<input v-model="PWD" type="password" class="uni-input" name="" placeholder="请输入新密码(6-18位包含英文和数字)" />
				</view>
				<view class="uni-form-item uni-column">
					<input v-model="qRPWD" type="password" class="uni-input" name="" placeholder="请确认新密码" />
				</view>
				<button type="primary" @click="modfiyPassword()">确认修改</button>
				<!-- <button type="primary" @click="exitLogin()">退出登录</button> -->
			</view>
			<view v-if="changeSuccess">
				<view class="text-reset">重置成功，新密码已生效！</view>
				<button type="primary" @click="gotoLogin()">立即登陆</button>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				id: "",
				email: "",
				captchaImg: '',
				checkCaptchaImg: "",
				myPWD: "",
				// yPWD: "",
				PWD: "",
				qRPWD: "",
				seconds: 10,
				codeBtn: {
					text: '获取验证码',
					waitingCode: false,
					count: this.seconds
				},
				//邮件验证码
				code: '',
				codeId: '',
				effectiveTime: 300,
				emailStatus: "",
				statusJson: {
					'-5': '验证失败',
					'-4': '验证码已使用',
					'-3': '验证码已失效',
					'-2': '当前邮箱未发送验证码',
					'-1': '还未发送验证码',
					'0': '验证码不正确',
				},
				changeSuccess: false,
				width: 120,
				height: 45
			}
		},
		onLoad() {
			// console.log(options.id)
			// this.id = options.id
			// this.getUserInfo()
		},
		onShow() {
			_this = this;
			setTimeout(function() {
				_this.init();
			}, 1000)
		},
		methods: {
			sendCode: function() {
				let emailCheck = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
				if (emailCheck.test(this.email)) {
					if (this.checkCaptchaImg == this.captchaImg) {
						this.testSend();
						this.codeBtn.waitingCode = true;
						this.codeBtn.count = this.seconds;
						this.codeBtn.text = this.codeBtn.count + 's';

						let countdown = setInterval(() => {
							this.codeBtn.count--;
							this.codeBtn.text = this.codeBtn.count + 's';
							if (this.codeBtn.count < 0) {
								clearInterval(countdown);
								this.codeBtn.text = '重新发送';
								this.codeBtn.waitingCode = false;
							}
						}, 1000);
					} else if (this.captchaImg == '') {
						uni.showToast({
							duration: 1500,
							title: '请输入验证码!',
							mask: true,
							icon: 'none'
						})
					} else {
						uni.showToast({
							duration: 1500,
							title: '验证码错误!',
							mask: true,
							icon: 'none'
						})
					}
				} else if (this.email == '') {
					uni.showToast({
						duration: 1500,
						title: '请输入邮箱!',
						mask: true,
						icon: 'none'
					})
				} else {
					uni.showToast({
						duration: 1500,
						title: '邮箱格式错误!',
						mask: true,
						icon: 'none'
					})
				}
			},
			gotoLogin: function() {
				uni.reLaunch({
					url: "../mine/mine"
				})
			},
			// 初始化验证码
			init: function() {
				// console.log('start');
				var context = uni.createCanvasContext('imgcanvas', this),
					w = this.width,
					h = this.height;
				context.setFillStyle("white");
				context.setLineWidth(5);
				context.fillRect(0, 0, w, h);
				var pool = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "I", "M", "N", "O", "P", "Q",
						"R", "S",
						"T", "U", "V", "W", "S", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
					],
					str = '';
				for (var i = 0; i < 4; i++) {
					var c = pool[this.rn(0, pool.length - 1)];
					var deg = this.rn(-30, 30);
					context.setFontSize(18);
					context.setTextBaseline("top");
					context.setFillStyle(this.rc(80, 150));
					context.save();
					context.translate(30 * i + 15, parseInt(h / 1.5));
					context.rotate(deg * Math.PI / 180);
					context.fillText(c, -15 + 5, -15);
					context.restore();
					str += c;
				}
				uni.setStorage({
					key: 'imgcode',
					data: str,
				});
				for (var i = 0; i < 40; i++) {
					context.beginPath();
					context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
					context.closePath();
					context.setFillStyle(this.rc(150, 200));
					context.fill();
				}
				context.draw();
				this.checkCaptchaImg = str;
				console.log(this.checkCaptchaImg);
			},
			rc: function(min, max) {
				var r = this.rn(min, max);
				var g = this.rn(min, max);
				var b = this.rn(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
			},
			rn: function(max, min) {
				return parseInt(Math.random() * (max - min)) + min;
			},
			refresh: function() {
				this.init();
			},
			canvasIdErrorCallback: function(e) {
				console.error(e.detail.errMsg)
			},
			// getUserInfo() {
			// 	return new Promise((resolve, reject) => {
			// 		let data = {
			// 			email: this.email,
			// 			method:"getUserInfo"
			// 		}
			// 		uniCloud.callFunction({
			// 				name: "userController",
			// 				data: data
			// 			})
			// 			.then((res) => {
			// 				console.log(res)
			// 				// this.userName=res.result.data[0].userName
			// 				// this.email = res.result.data[0].email
			// 				// this.myPWD = res.result.data[0].pwd
			// 				// console.log(this.myPWD)
			// 				// this.userAvatar=res.result.data[0].userAvatar
			// 				// this.sex=res.result.data[0].sex
			// 				// this.city=res.result.data[0].city
			// 				// this.homeDetail=res.result.data[0].homeDetail
			// 				// this.school=res.result.data[0].school
			// 				// this.autograph=res.result.data[0].autograph
			// 				this.id = res.result.data[0]._id
			// 				resolve(res.result.data[0]._id)
			// 				console.log(this.id)
			// 			})
			// 			.catch((err) => {
			// 				console.log(err)
			// 			})
			// 	})
			// },
			testSend() {
				if (!this.email) {
					uni.showToast({
						duration: 1500,
						title: '请输入邮箱',
						mask: true,
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					mask: true
				})
				uniCloud.callFunction({
					name: "getEmailCode",
					data: {
						serviceType: 'qq',
						method: 'sendCode',
						html: '您正在修改密码,您的验证码是#code#,转发给他人可能导致账号被盗,请勿泄露,谨防被骗!',
						email: this.email,
						subject: '修改密码验证码'
					}
				}).then((res) => {
					uni.hideLoading();
					if (res.result.status) {
						this.codeId = res.result.id;
						uni.showToast({
							duration: 1500,
							icon: 'none',
							title: '发送成功',
							mask: true
						})
					} else {
						uni.showToast({
							duration: 1500,
							title: '发送失败',
							mask: true,
							icon: 'none'
						})
					}
				});
			},
			testValidate() {
				return new Promise((resolve, reject) => {
					uni.showLoading({
						mask: true
					})
					uniCloud.callFunction({
						name: "getEmailCode",
						data: {
							code: this.code,
							method: 'validateCode',
							email: this.email,
							codeId: this.codeId,
							effectiveTime: 300
						}
					}).then((res) => {
						uni.hideLoading();
						uni.showToast({
							duration: 1500,
							title: this.statusJson[res.result.status],
							mask: true,
							icon: 'none'
						})
						resolve(res.result.status)
						this.emailStatus = res.result.status
						// console.log(this.emailStatus)
					});
				})
			},
			async modfiyPassword() {
				let emailCheck = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
				let pwdCheck = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/;
				// let userNameCheck = /^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$/;
				if (emailCheck.test(this.email)) {
					if (this.checkCaptchaImg == this.captchaImg) {
						if (this.code != '') {
							await this.testValidate()
							if (this.emailStatus == 1) {
								// console.log("验证成功")
								if (this.PWD != '') {
									if (pwdCheck.test(this.PWD)) {
										if (this.PWD == this.qRPWD) {
											// await this.getUserInfo()
											let data = {
												email: this.email,
												pwd: this.PWD,
												method: "updatePWD"
											}
											// console.log(data)
											uniCloud.callFunction({
													name: "userController",
													data: data
												})
												.then((res) => {
													console.log(res)
													if (res.result.updated == 1) {
														uni.showToast({
															duration: 1500,
															title: '修改成功！',
															mask: true,
															icon: 'none'
														})
														this.changeSuccess = true
														uni.removeStorage({
															key: 'userinfo',
															success: function(res) {
																console.log('success');
															}
														});
													}else{
														uni.showToast({
															duration: 1500,
															title: '修改失败！',
															mask: true,
															icon: 'none'
														})
													}
												})
												.catch((err) => {
													console.log(err)
												})
											// console.log("成功")
										} else if (this.qRPWD == '') {
											uni.showToast({
												duration: 1500,
												title: '请确认一次密码!',
												mask: true,
												icon: 'none'
											})
										} else {
											uni.showToast({
												duration: 1500,
												title: '两次密码输入不一致',
												mask: true,
												icon: 'none'
											})
										}
									} else {
										uni.showToast({
											duration: 1500,
											title: '密码由6-18位数字 英文 特殊符号组成且必须包含数字及英文！',
											mask: true,
											icon: 'none'
										})
									}
								} else {
									uni.showToast({
										duration: 1500,
										title: '请输入新密码!',
										mask: true,
										icon: 'none'
									})
								}
							}
						} else {
							uni.showToast({
								duration: 1500,
								title: '请输入邮箱收到的验证码!',
								mask: true,
								icon: 'none'
							})
						}
					} else if (this.captchaImg == '') {
						uni.showToast({
							duration: 1500,
							title: '请输入验证码!',
							mask: true,
							icon: 'none'
						})
					} else {
						uni.showToast({
							duration: 1500,
							title: '验证码错误!',
							mask: true,
							icon: 'none'
						})
					}
				} else if (this.email == '') {
					uni.showToast({
						duration: 1500,
						title: '请输入邮箱!',
						mask: true,
						icon: 'none'
					})
				} else {
					uni.showToast({
						duration: 1500,
						title: '邮箱格式错误!',
						mask: true,
						icon: 'none'
					})
				}
			},
			exitLogin() {

			}
		},
		computed: {
			disableCodeBtn: function() {
				return this.codeBtn.waitingCode || this.captchaImg.length < 4;
			}
		}
	}
</script>

<style lang="scss" scoped>
	$color-primary: #b49950;

	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #edfff8;
	}

	.t-login {
		width: 580rpx;
		padding: 55rpx;
		margin: 0 auto;
		font-size: 28rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.15);
		z-index: 9;
	}

	.uni-form-item {
		margin-bottom: 40upx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;

		.uni-input {
			font-size: 30upx;
			padding: 7px 0;
		}
	}

	.column-with-btn {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		button {
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;

			&:after {
				border: none
			}

			&.active {
				background: linear-gradient(to right, #ff8f77, #fe519f);
				color: $uni-text-color-inverse;
			}
		}
	}

	.img-captcha {
		width: 150upx;
		height: 60upx;
	}

	button[type="primary"] {
		background: linear-gradient(to right, #ff8f77, #fe519f);
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}

	.text-reset {
		text-align: center;
		margin-bottom: 100upx;
		font-size: 36upx;
	}
</style>
