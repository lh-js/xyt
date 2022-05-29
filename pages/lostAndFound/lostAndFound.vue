<template>
	<view>
		<view style="display: flex;justify-content: flex-end;align-items: center;">
			<view v-if="isSearch"
				style="display: flex;align-items: center;width: 280rpx;justify-content: space-between;">
				<view style="color: #999999;">
					搜
				</view>
				<SelectBox @selectbox="selectbox" :select="select" />
			</view>
			<uni-search-bar style="width: 100%;" @confirm="search" @focus="focus" @blur="blur" @cancel="cancel">
			</uni-search-bar>
		</view>
		<!-- 无数据显示 -->
		<image style="width: 100%;" v-if="isSearchEntiy"
			src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/79633706-4359-482a-9a8d-2409cfac4bef.png"
			mode="widthFix"></image>
		<view class="LAF-itemList">
			<view class="LAF-item" v-for="(item,index) in searchRecruitList" :key="index"
				@click="toRecruitDetail(item._id)">
				<view class="LAF-itemTitle">
					{{item.recruitName}}
					<image
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/a98b83d2-a8da-49c5-ae05-ae333269dbe8.png"
						mode="widthFix"></image>
				</view>
				<view class="LAF-itemClass">
					<text v-if="item.recruitClass=='certificates'">
						类型：证件
					</text>
					<text v-if="item.recruitClass=='clothes'">
						类型：服饰
					</text>
					<text v-if="item.recruitClass=='digital'">
						类型：数码
					</text>
					<text v-if="item.recruitClass=='dailyNecessities'">
						类型：日用品
					</text>
					<text v-if="item.recruitClass=='schoolSupplies'">
						类型：学习用品
					</text>
					<text v-if="item.recruitClass=='other'">
						类型：其他
					</text>
				</view>
				<view class=".LAF-itemImg">
					<image
						:src="item.recruitImg=='' ?'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/5fcaad5d-c412-4629-bd84-29bd02d39ea7.png':item.recruitImg"
						mode="aspectFill"></image>
				</view>
				<view class=".LAF-itemUser">
					<image :src="item.userAvatar" mode="aspectFill"></image>
					<view class=".LAF-itemUserName">
						{{item.userName}}
					</view>
				</view>
				<view class="LAF-submitTime">
					<uni-dateformat :date="item.submitTime"></uni-dateformat>
				</view>
				<view class=".LAF-itemButtonContent">
					<view class=".LAF-itemButton">
						{{item.recruitState==0 ?'认领中':'已认领'}}
					</view>
				</view>
			</view>
		</view>
		<view class="LAF-itemList">
			<view class="LAF-item" v-for="(item,index) in searchLostList" :key="index" @click="toLostDetail(item._id)">
				<view class="LAF-itemTitle">
					{{item.lostName}}
					<image
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/a98b83d2-a8da-49c5-ae05-ae333269dbe8.png"
						mode="widthFix"></image>
				</view>
				<view class="LAF-itemClass">
					<text v-if="item.lostClass=='certificates'">
						类型：证件
					</text>
					<text v-if="item.lostClass=='clothes'">
						类型：服饰
					</text>
					<text v-if="item.lostClass=='digital'">
						类型：数码
					</text>
					<text v-if="item.lostClass=='dailyNecessities'">
						类型：日用品
					</text>
					<text v-if="item.lostClass=='schoolSupplies'">
						类型：学习用品
					</text>
					<text v-if="item.lostClass=='other'">
						类型：其他
					</text>
				</view>
				<view class=".LAF-itemImg">
					<image
						:src="item.lostImg=='' ?'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/5fcaad5d-c412-4629-bd84-29bd02d39ea7.png':item.lostImg"
						mode="aspectFill"></image>
				</view>
				<view class=".LAF-itemUser">
					<image :src="item.userAvatar" mode="aspectFill"></image>
					<view class=".LAF-itemUserName">
						{{item.userName}}
					</view>
				</view>
				<view class="LAF-submitTime">
					<uni-dateformat :date="item.submitTime"></uni-dateformat>
				</view>
				<view class=".LAF-itemButtonContent">
					<view class=".LAF-itemButton">
						{{item.lostState==0 ?'寻物中':'已寻到'}}
					</view>
				</view>
			</view>
		</view>
		<!-- 		<view class="header">
			<view class="input">
				<image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/2420b0d3-f49f-4c46-bdc6-b611d513bcd3.png"
					class="search"></image>
				<input type="text" value="" placeholder="搜索" disabled />
			</view>
		</view> -->
		<!-- 		<view class="classification-LAF">
			<view v-for="(item,index) in classificationList" :key="index">
				<uni-tag :text="item.text" :type="item.type" :circle="true" @click="classSelect(item.value,index)">
				</uni-tag>
			</view>
		</view> -->
		<view class="switch-address" v-if="!isSearch">
			<switch :checked="isMySchool" @change="switchChange" type="switch" />
			<text>是否只获取自己定位学校的物品</text>
		</view>
		<view class="LAF-content" v-if="!isSearch">
			<view class="LAF-title">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#4cd964"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<view class="LAF-itemList">
						<view class="LAF-item" v-for="(item,index) in recruitList" :key="index"
							@click="toRecruitDetail(item._id)">
							<view class="LAF-itemTitle">
								{{item.recruitName}}
								<image
									src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/a98b83d2-a8da-49c5-ae05-ae333269dbe8.png"
									mode="widthFix"></image>
							</view>
							<view class="LAF-itemClass">
								<text v-if="item.recruitClass=='certificates'">
									类型：证件
								</text>
								<text v-if="item.recruitClass=='clothes'">
									类型：服饰
								</text>
								<text v-if="item.recruitClass=='digital'">
									类型：数码
								</text>
								<text v-if="item.recruitClass=='dailyNecessities'">
									类型：日用品
								</text>
								<text v-if="item.recruitClass=='schoolSupplies'">
									类型：学习用品
								</text>
								<text v-if="item.recruitClass=='other'">
									类型：其他
								</text>
							</view>
							<view class=".LAF-itemImg">
								<image
									:src="item.recruitImg=='' ?'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/5fcaad5d-c412-4629-bd84-29bd02d39ea7.png':item.recruitImg"
									mode="aspectFill"></image>
							</view>
							<view class=".LAF-itemUser">
								<image :src="item.userAvatar" mode="aspectFill"></image>
								<view class=".LAF-itemUserName">
									{{item.userName}}
								</view>
							</view>
							<view class="LAF-submitTime">
								<uni-dateformat :date="item.submitTime"></uni-dateformat>
							</view>
							<view class=".LAF-itemButtonContent">
								<view class=".LAF-itemButton">
									{{item.recruitState==0 ?'认领中':'已认领'}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-show="current === 1">
					<view class="LAF-itemList">
						<view class="LAF-item" v-for="(item,index) in lostList" :key="index"
							@click="toLostDetail(item._id)">
							<view class="LAF-itemTitle">
								{{item.lostName}}
								<image
									src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/a98b83d2-a8da-49c5-ae05-ae333269dbe8.png"
									mode="widthFix"></image>
							</view>
							<view class="LAF-itemClass">
								<text v-if="item.lostClass=='certificates'">
									类型：证件
								</text>
								<text v-if="item.lostClass=='clothes'">
									类型：服饰
								</text>
								<text v-if="item.lostClass=='digital'">
									类型：数码
								</text>
								<text v-if="item.lostClass=='dailyNecessities'">
									类型：日用品
								</text>
								<text v-if="item.lostClass=='schoolSupplies'">
									类型：学习用品
								</text>
								<text v-if="item.lostClass=='other'">
									类型：其他
								</text>
							</view>
							<view class=".LAF-itemImg">
								<image
									:src="item.lostImg=='' ?'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/5fcaad5d-c412-4629-bd84-29bd02d39ea7.png':item.lostImg"
									mode="aspectFill"></image>
							</view>
							<view class=".LAF-itemUser">
								<image :src="item.userAvatar" mode="aspectFill"></image>
								<view class=".LAF-itemUserName">
									{{item.userName}}
								</view>
							</view>
							<view class="LAF-submitTime">
								<uni-dateformat :date="item.submitTime"></uni-dateformat>
							</view>
							<view class=".LAF-itemButtonContent">
								<view class=".LAF-itemButton">
									{{item.lostState==0 ?'寻物中':'已寻到'}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SelectBox from '../../components/select-box/select-box.vue'
	export default {
		components: {
			SelectBox //下拉框组件
		},
		data() {
			return {
				// classificationList: [{ //论坛分类列表
				// 		text: "证件",
				// 		value: "certificates",
				// 		type: "default"
				// 	},
				// 	{
				// 		text: "服饰",
				// 		value: "clothes",
				// 		type: "default"
				// 	},
				// 	{
				// 		text: "数码",
				// 		value: "digital",
				// 		type: "default"
				// 	},
				// 	{
				// 		text: "日用品",
				// 		value: "dailyNecessities",
				// 		type: "default"
				// 	},
				// 	{
				// 		text: "学习用品",
				// 		value: "schoolSupplies",
				// 		type: "default"
				// 	},
				// 	{
				// 		text: "其他",
				// 		value: "other",
				// 		type: "default"
				// 	}
				// ],
				// LAFClass: "certificates",
				items: ["失物招领", "寻物启事"],
				current: 0,
				recruitList: [],
				lostList: [],
				page: 1,
				isMySchool: false,
				isSearch: false,
				select: [{
					name: "认领"
				}, {
					name: "寻物"
				}],
				selectSearch: "认领",
				searchRecruitList: [],
				searchLostList: [],
				isSearchEntiy: false
			}
		},
		onLoad() {
			this.getRecruitList()
			// this.getLostItemList()
		},
		// onReachBottom() {
		// 	if (this.current == 0) {
		// 		this.page++
		// 		this.getRecruitList()
		// 	} else {
		// 		this.page++
		// 		this.getLostItemList()
		// 	}
		// },
		methods: {
			// classSelect(value, index) { //论坛类别选择
			// 	console.log(value)
			// 	this.classificationList[0].type = "default"
			// 	this.classificationList[1].type = "default"
			// 	this.classificationList[2].type = "default"
			// 	this.classificationList[3].type = "default"
			// 	this.classificationList[4].type = "default"
			// 	this.classificationList[5].type = "default"
			// 	this.classificationList[index].type = "success"
			// 	this.LAFClass = value
			// },
			switchChange(e) {
				this.isMySchool = e.target.value
				console.log(this.isMySchool)
				// this.onClickItem(e)
				if (this.current == 1) {
					if (this.isMySchool) {
						this.getLostByAddress()
					} else {
						this.getLostItemList()
					}
				} else {
					if (this.isMySchool) {
						this.getRecruitByAddress()
					} else {
						this.getRecruitList()
					}
				}
			},
			onClickItem(e) {
				console.log(e.currentIndex)
				this.current = e.currentIndex
				// this.page = 1
				if (e.currentIndex == 1) {
					if (this.isMySchool) {
						this.getLostByAddress()
					} else {
						this.getLostItemList()
					}
				} else {
					if (this.isMySchool) {
						this.getRecruitByAddress()
					} else {
						this.getRecruitList()
					}
				}
			},
			getRecruitList() {
				uni.showLoading({
					mask: true
				})
				let data = {
					// page: this.page
					method: "getRecruit"
				}
				uniCloud.callFunction({
						name: "recruitController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						this.recruitList = res.result.data
						if (res.result.data.length == 0) {
							uni.showToast({
								duration: 1500,
								title: '没有数据了!',
								mask: true,
								icon: 'none'
							})
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getLostItemList() {
				uni.showLoading({
					mask: true
				})
				let data = {
					// page: this.page,
					method: "getLostItem"
				}
				uniCloud.callFunction({
						name: "lostController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						this.lostList = res.result.data
						if (res.result.data.length == 0) {
							uni.showToast({
								duration: 1500,
								title: '没有数据了!',
								mask: true,
								icon: 'none'
							})
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getRecruitByAddress() {
				var that = this
				uni.showLoading({
					mask: true
				})
				uni.getStorage({
					key: 'address',
					success: (res1) => {
						console.log(res1.data)
						let data = {
							address: res1.data.address,
							method: "getRecruitByAddress"
						}
						uniCloud.callFunction({
								name: "recruitController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								that.recruitList = res.result.data
							})
							.catch((err) => {
								console.log(err)
							})
					},
					fail(err) {
						uni.showToast({
							duration: 1500,
							title: '没有选择地址，请到首页选择地址！',
							mask: true,
							icon: 'none'
						})
					}
				})
			},
			getLostByAddress() {
				var that = this
				uni.showLoading({
					mask: true
				})
				uni.getStorage({
					key: 'address',
					success: (res1) => {
						console.log(res1.data)
						let data = {
							address: res1.data.address,
							method: "getLostByAddress"
						}
						uniCloud.callFunction({
								name: "lostController",
								data: data
							})
							.then((res) => {
								uni.hideLoading()
								console.log(res)
								that.lostList = res.result.data
							})
							.catch((err) => {
								console.log(err)
							})
					},
					fail(err) {
						uni.showToast({
							duration: 1500,
							title: '没有选择地址，请到首页选择地址！',
							mask: true,
							icon: 'none'
						})
					}
				})
			},
			toRecruitDetail(id) {
				// console.log(id)
				uni.navigateTo({
					url: "../recruitDetail/recruitDetail?id=" + id
				})
			},
			toLostDetail(id) {
				uni.navigateTo({
					url: "../lostDetail/lostDetail?id=" + id
				})
			},
			search(e) {
				if (this.selectSearch == "认领") {
					this.searchRecruit(e.value)
				} else {
					this.searchLost(e.value)
				}
			},
			focus(e) {
				console.log(e)
				this.isSearch = true
			},
			blur(e) {
				console.log(e)
			},
			cancel(e) {
				console.log(e)
				this.isSearch = false
				this.isSearchEntiy = false
				this.searchLostList = []
				this.searchRecruitList = []
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			selectbox(data) {
				console.log(data)
				this.selectSearch = data
			},
			searchRecruit(recruitName) {
				uni.showLoading({
					mask: true
				})
				this.searchRecruitList = []
				this.searchLostList = []
				this.isSearchEntiy = false
				console.log(recruitName)
				let data = {
					recruitName: recruitName,
					method: "searchRecruit"
				}
				uniCloud.callFunction({
						name: "recruitController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						if (res.result.data.length == 0) {
							this.isSearchEntiy = true
						} else {
							this.searchRecruitList = res.result.data
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			searchLost(lostName) {
				uni.showLoading({
					mask: true
				})
				this.searchRecruitList = []
				this.searchLostList = []
				this.isSearchEntiy = false
				console.log(lostName)
				let data = {
					lostName: lostName,
					method: "searchLost"
				}
				uniCloud.callFunction({
						name: "lostController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						if (res.result.data.length == 0) {
							this.isSearchEntiy = true
						} else {
							this.searchLostList = res.result.data
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
	// .header {
	// 	display: flex;
	// 	flex-direction: row;
	// 	align-items: center;
	// 	padding: realSize(20px);

	// 	.btn {
	// 		width: realSize(36px);
	// 		height: realSize(30px);
	// 	}

	// 	.input {
	// 		height: 30px;
	// 		width: 90%;
	// 		// margin-left: realSize(5px);
	// 		// margin-right: realSize(5px);
	// 		background: rgba(255, 255, 255, 1);
	// 		border-radius: 30px;
	// 		display: flex;
	// 		flex-direction: row;
	// 		align-items: center;
	// 		margin: 10px auto;


	// 		.search {
	// 			width: 30rpx;
	// 			height: 30rpx;
	// 			margin-left: 20rpx;
	// 			margin-right: 20rpx;
	// 		}
	// 	}
	// }
	.search-pick {
		background: #0bc99d;
		width: 150rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		border-radius: 50rpx;
	}

	.classification-LAF {
		display: flex;
		justify-content: space-between;
		margin: 10px auto;
		width: 92%;
	}

	.switch-address {
		margin: 20px auto;
		width: 92%;
		display: flex;
		align-items: center;
	}

	.switch-address text {
		color: #999999;
		font-size: 15px;
	}

	.LAF-content .LAF-title {
		width: 50%;
	}

	.LAF-itemList {
		width: 90%;
		margin: 10px auto;
		// border: 1px solid;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.LAF-item {
		width: 49%;
		// height: 500rpx;
		background: #FFFFFF;
		margin-top: 5px;
		border-radius: 10px;
		padding: 10px;
		box-sizing: border-box;
	}

	.LAF-itemTitle {
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// border: 1px solid;
	}

	.LAF-itemTitle image {
		width: 50rpx;
	}

	.LAF-itemClass {
		font-size: 12px;
		color: #B9B9B9;
		margin-top: 3px;
	}

	.LAF-itemImg {
		width: 100%;
		height: 200rpx;
		// border: 1px solid;
		margin-top: 3px;
	}

	.LAF-itemImg image {
		width: 100%;
		height: 100%;
	}

	.LAF-itemUser {
		width: 100%;
		// border: 1px solid;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 3px;
	}

	.LAF-itemUser image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50rpx;
		border: 2px solid #B8B8B8;
	}

	.LAF-itemUser .LAF-itemUserName {
		margin-left: 3px;
		font-size: 13px;
	}

	.LAF-submitTime {
		font-size: 13px;
		color: #B9B9B9;
		margin-top: 3px;
	}

	.LAF-itemButtonContent {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-top: 3px;
	}

	.LAF-itemButtonContent .LAF-itemButton {
		width: 130rpx;
		height: 50rpx;
		background: #0bc99d;
		display: flex;
		line-height: 50rpx;
		justify-content: center;
		border-radius: 50rpx;
		color: #FFFFFF;
	}
</style>
