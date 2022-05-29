<!-- 蓝色简洁登录页面 -->
<template>
	<view class="login-bg">
		<view class="t-login">
			<form class="cl">
				<view class="t-a">
					<image src="@/static/user.png"></image>
					<input type="text" name="phone" placeholder="请输入邮箱" maxlength="20" v-model="email" />
				</view>
				<view class="t-a">
					<image src="@/static/pwd.png"></image>
					<input type="password" name="code" maxlength="18" placeholder="请输入密码" v-model="pwd" />
				</view>
				<button @tap="login()">登 录</button>
				<view class="t-c">
					<text class="t-c-txt" @click="register()">注册账号</text>
					<text @click="forgotPwd()">忘记密码</text>
				</view>
			</form>
			<view class="t-f"><text>—————— 其他登录方式 ——————</text></view>
			<view class="t-e cl">
				<view class="t-g" @tap="wxLogin()">
					<image src="@/static/wx2.png"></image>
				</view>
				<view class="t-g" @tap="wxLogin()">
					<image src="@/static/qq2.png"></image>
				</view>
				<view class="t-g" @tap="wxLogin()">
					<image src="@/static/wb.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		/**
		 * 2020年12月9日  李新雷编写（练习）  适用所有app登录
		 * vue版本简洁又美观的登录页面（个人感觉插件市场的登录都不太好看，哈哈 O(∩_∩)O）
		 * 如果需要注册（注册可以设计在登录按钮下方），直接复制该页面稍微改动即可
		 */
		data() {
			return {
				email: '', //手机号码
				pwd: '', //密码
				isLogin: false
			};
		},
		onLoad() {},
		methods: {
			//当前登录按钮操作
			login() {
				uni.showLoading({
					mask: true
				})
				let userinfo = {
					email: this.email,
					pwd: this.pwd,
					method: "loginUser"
				}
				uniCloud.callFunction({
						name: "userController",
						data: userinfo
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						if (res.result.data.length == 1) {
							this.isLogin = true
							uni.showToast({
								duration: 1500,
								title: '登录成功！',
								mask: true,
								icon: 'none'
							})
							let storageData = {
								// _id: res.result.data[0]._id,
								// userAvatar: res.result.data[0].userAvatar,
								// userName: res.result.data[0].userName,
								email: res.result.data[0].email
								// sex: res.result.data[0].sex,
								// city: res.result.data[0].city,
								// homeDetail: res.result.data[0].homeDetail,
								// school: res.result.data[0].school,
								// autograph: res.result.data[0].autograph
							}
							uni.setStorage({
								key: 'userinfo',
								data: storageData,
								success: function() {
									console.log('登录信息缓存成功！');
								}
							});
							uni.reLaunch({
								url: "../mine/mine"
							})
						} else {
							uni.showToast({
								duration: 1500,
								title: '账号或密码错误！',
								mask: true,
								icon: 'none'
							})
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			//忘记密码
			forgotPwd() {
				uni.navigateTo({
					url: "../forpwd/forpwd"
				})
			},
			//立刻注册
			register() {
				uni.navigateTo({
					url: "../register/register"
				})
			},
			wxLogin() {
				uni.showToast({
					duration: 1500,
					title: '敬请期待！',
					mask: true,
					icon: 'none'
				})
			}
		}
	};
</script>
<style>
	.login-bg {
		height: 100%;
		display: flex;
		align-items: center;
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

	.t-login button {
		font-size: 28rpx;
		background: linear-gradient(to right, #ff8f77, #fe519f);
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
	}

	.t-login input {
		padding: 0 20rpx 0 120rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin-bottom: 50rpx;
		background: #f6f6f6;
		border: 1px solid #f6f6f6;
		font-size: 28rpx;
		border-radius: 50rpx;
	}

	.t-login .t-a {
		position: relative;
	}

	.t-login .t-a image {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		left: 40rpx;
		top: 28rpx;
		padding-right: 20rpx;
	}

	.t-login .t-b {
		text-align: left;
		font-size: 46rpx;
		color: #000;
		padding: 300rpx 0 120rpx 0;
		font-weight: bold;
	}

	.t-login .t-d {
		text-align: center;
		color: #999;
		margin: 80rpx 0;
	}

	.t-login .t-c {
		text-align: right;
		color: #666666;
		margin: 30rpx 30rpx 40rpx 0;
	}

	.t-login .t-c .t-c-txt {
		margin-right: 300rpx;
	}

	.t-login .t-e {
		text-align: center;
		width: 600rpx;
		margin: 40rpx auto 0;
	}

	.t-login .t-g {
		float: left;
		width: 33.33%;
	}

	.t-login .t-e image {
		width: 70rpx;
		height: 70rpx;
	}

	.t-login .t-f {
		text-align: center;
		margin: 80rpx 0 0 0;
		color: #999;
	}

	.t-login .t-f text {
		margin-left: 20rpx;
		color: #b9b9b9;
		font-size: 27rpx;
	}

	.t-login .uni-input-placeholder {
		color: #aeaeae;
	}

	.cl {
		zoom: 1;
	}

	.cl:after {
		clear: both;
		display: block;
		visibility: hidden;
		height: 0;
		content: '\20';
	}
</style>
