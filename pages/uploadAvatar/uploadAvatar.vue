<template>
	<view class="upload-Img">
		<view class="upload-avatar">
			<uni-file-picker ref="files" disable-preview :del-icon="false" return-type="object" :auto-upload="true"
				:list-styles="listStyles" :image-styles="imageStyles" @success="uploadSuccess">选择头像</uni-file-picker>
			<!-- <button type="default" @click="upload">上传</button> -->
			<!-- <div style="color: #fe519f;">上传头像</div> -->
		</view>
		<view class="check-message">
			<view class="check-message-item">
				<view class="check-message-txt">
					用户名：
				</view>
				<view class="uni-form-item uni-column">
					<input v-model="userName" disabled type="text" class="uni-input" name="" placeholder="请输入用户名" />
				</view>
			</view>
			<view class="check-message-item">
				<view class="check-message-txt">
					邮箱：
				</view>
				<view class="uni-form-item uni-column">
					<input v-model="email" disabled type="text" class="uni-input" name="" placeholder="请输入邮箱" />
				</view>
			</view>
			<view class="check-message-item">
				<view class="check-message-txt">
					性别：
				</view>
				<view class="uni-form-item uni-column">
					<view>
						<radio-group @change="radioChange">
							<label>
								<radio value="男" />男
							</label>
							<label class="radio">
								<radio value="女" />女
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<view class="check-message-item">
				<view class="check-message-txt">
					住址：
				</view>
				<view class="uni-form-item uni-column">
					<!-- <input v-model="school" type="text" class="uni-input" name="" placeholder="请输入住址" /> -->
					<uni-data-picker class="uni-input" placeholder="请选择地址" popup-title="请选择城市"
						collection="opendb-city-china" field="code as value, name as text" orderby="value asc"
						:step-searh="true" self-field="code" parent-field="parent_code" @change="onchange"
						@nodeclick="onnodeclick">
					</uni-data-picker>
				</view>
			</view>
			<view class="check-message-item">
				<view class="check-message-txt">
					详细地址：
				</view>
				<view class="uni-form-item uni-column">
					<input v-model="homeDetail" type="text" class="uni-input" name="" placeholder="请输入详细地址" />
				</view>
			</view>
			<view class="check-message-item">
				<view class="check-message-txt">
					学校：
				</view>
				<view class="uni-form-item uni-column">
					<input v-model="school" type="text" class="uni-input" name="" placeholder="请输入学校名称" />
				</view>
			</view>
			<view class="check-message-item">
				<view class="check-message-txt">
					个性签名：
				</view>
				<view class="uni-form-item uni-column">
					<input v-model="autograph" type="text" class="uni-input" name="" placeholder="请输入个性签名" />
				</view>
			</view>
			<button class="submit" type="default" @click="submitData">确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageStyles: {
					width: 100,
					height: 100,
					border: {
						color: "#75757a",
						width: 2,
						style: 'dashed',
						radius: '100px'
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
				//个人信息
				id:"",
				userAvatar:"",
				userName: "",
				email: "",
				sex: "",
				city: "",
				homeDetail:"",
				school:"",
				autograph:""
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.id=options.id
			this.getUserInfo(options.id)
		},
		methods: {
			uploadSuccess(path) {
				console.log(path.tempFilePaths[0])
				this.userAvatar=path.tempFilePaths[0]
			},
			upload() {
				this.$refs.files.upload()
			},
			onchange(e) {
				const value = e.detail.value
				this.city=value[0].text+" "+value[1].text+" "+value[2].text
				console.log(value[2].text)
			},
			onnodeclick(node) {
				// console.log(node.text)
				// console.log("")
			},
			radioChange: function(evt) {
				console.log(evt.detail.value)
				this.sex=evt.detail.value
			},
			submitData(){
				uni.showLoading({
					mask: true
				})
				let data={
					id:this.id,
					userAvatar:this.userAvatar,
					userName:this.userName,
					email:this.email,
					sex: this.sex,
					city: this.city,
					homeDetail:this.homeDetail,
					school:this.school,
					autograph:this.autograph,
					method:"updateUserMsg"
				}
				console.log(data)
				uniCloud.callFunction({
					name:"userController",
					data:data
				})
				.then((res) => {
					uni.hideLoading()
					console.log(res)
					uni.showToast({
						duration: 1500,
						title: '信息填写完成! 快去登录吧！',
						mask: true,
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateTo({
							url:"../login/login"
						})
					}, 1500)
				})
				.catch((err) => {
					console.log(err)
				})
			},
			getUserInfo(id){
				uni.showLoading({
					mask:true
				})
				let data = {
					id:id,
					method:"getUserInfoById"
				}
				uniCloud.callFunction({
					name:"userController",
					data:data
				})
				.then((res) => {
					uni.hideLoading()
					console.log(res)
					this.userName=res.result.data[0].userName
					this.email=res.result.data[0].email
				})
				.catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upload-Img {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.upload-avatar {
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 100rpx;
		color: #808080;
		margin-bottom: 50rpx;
	}

	.upload-avatar button {
		width: 100%;
		margin-top: 10px;
		color: #FFFFFF;
		background: linear-gradient(to right, #ff8f77, #fe519f);
	}

	.uni-form-item {
		// margin-bottom: 40upx;
		// padding: 0;
		border-bottom: 1px solid #e3e3e3;

		// border: 1px solid;
		.uni-input {
			font-size: 30upx;
			// padding: 7px 0;
			// width: 350rpx;
			color: #808080;
		}
	}

	.check-message {
		margin-top: 30px;
		width: 90%;
	}

	.check-message-item {
		display: flex;
		align-items: center;
		// border: 1px solid;
		justify-content: space-between;
		margin-top: 10px;
	}

	.check-message-txt {
		// border: 1px solid;
		height: 100%;
		color: #808080;
		font-size: 36rpx;
	}
	
	.radio{
		margin-left: 15px;
	}
	
	.submit{
		width: 100%;
		margin-top: 30px;
		color: #FFFFFF;
		background: linear-gradient(to right, #ff8f77, #fe519f);
	}
</style>
