<template>
	<view>
		<uni-section title="卡片封面图+操作栏" type="line">
			<uni-card style="height: 500rpx;" v-for="(item,index) in schoolNoticeList" :key="item._id">
				<image slot='cover' style="width: 100%;height: 300rpx;" :src="item.img[0].fileID"></image>
				<uni-tag :text="item.Class" type="primary"></uni-tag>
				<text style="margin-left: 10rpx;" class="uni-body">{{item.title}}</text>
				<view slot="actions" class="card-actions">

					<view class="card-actions-item">
						<view>
							<uni-icons type="calendar" size="18" color="#999"></uni-icons>
						</view>
						<view style="color: #999999;margin-left: 10rpx;">
							发布时间
						</view>
						<view style="color: #999999;margin-left: 5rpx;">
							<uni-dateformat :date="item.submitTime"></uni-dateformat>
						</view>
					</view>
					<view>
						<navigator class="card-actions-item" :url="'../noticeDetail/noticeDetail?id='+item._id">
							<view>
								<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
							</view>
							<view class="card-actions-item-text">详细信息</view>
						</navigator>
					</view>
				</view>
			</uni-card>
		</uni-section>
		<!-- 无数据显示 -->
		<image style="width: 100%;" v-if="isData"
			src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/79633706-4359-482a-9a8d-2409cfac4bef.png"
			mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schoolNoticeList: [],
				isData: false
			}
		},
		onLoad() {
			this.getSchoolNoticeList()
		},
		methods: {
			getSchoolNoticeList() {
				let data = {
					method: "getSchoolNoticeList"
				}
				uniCloud.callFunction({
						name: "SchoolNoticeController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						if (res.result.data.length != 0) {
							this.schoolNoticeList = res.result.data
							this.isData = false
						} else {
							this.isData = true
						}
					})
					.catch((err) => {
						console.log(err)
					})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		overflow: hidden;
	}

	.custom-cover {
		flex: 1;
		flex-direction: row;
		position: relative;
	}

	.cover-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		background-color: rgba($color: #000000, $alpha: 0.4);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 15px;
		font-size: 14px;
		color: #fff;
	}

	.card-actions {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 45px;
		border-top: 1px #eee solid;
	}

	.card-actions-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-actions-item-text {
		font-size: 12px;
		color: #666;
		margin-left: 5px;
	}

	.cover-image {
		flex: 1;
		height: 150px;
	}

	.no-border {
		border-width: 0;
	}
</style>
