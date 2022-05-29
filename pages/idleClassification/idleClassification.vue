<template>
	<view style="background-color: #FFFFFF;">
		<!-- 独立商品列表  -->
		<!-- @scrolltolower="handelScrolltolower" -->
		<CpGoodSselect height="100vh" :options="list" :props="{label:'text',value:'value',children:'children'}"
			@category-change="handelCategoryChange">
			<view style="background: #FFFFFF;padding:20rpx 0;">
				<view v-for="(item,index) in secondClass.children" :key="index" :category="item.text">
					<view class="goods-class">
						<view class="goods-class-two">
							{{ item.text}}
						</view>
						<view class="goods-class-three">
							<view class="class-three-item" v-for="(item1,index1) in item.children" :key="index1"
								:class="[(index1+1)%3==0 ? 'margin-0' : 'margin-r']" @click="enterClass(item1.value)">
								<image
									src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a0439cf-af57-474f-b688-798babb30901/29400051-7b16-4abd-ade8-896a2fc3bd27.jpg"
									mode="aspectFill"></image>
								<view class="class-three-text">
									<!-- {{item1.value}} -->{{item1.text}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</CpGoodSselect>
		<!-- <CpGoodSselect height="100vh" :props="{label:'label',value:'value',son:'son'}" :options="list"
			@scrolltolower="handelScrolltolower" @category-change="handelCategoryChange">
			<CpGoodsItem v-for="(item,index) in list" :key="index" :category="item.label">
				<view v-for="(cell,k) in secondClass.son" :key="k" class="goods__item ">
					{{ cell.label}}
				</view>
			</CpGoodsItem>
		</CpGoodSselect> -->
	</view>
</template>

<script>
	import CpGoodSselect from '../../components/cp-goods-select/cp-goods-select.vue'
	export default {
		components: {
			CpGoodSselect
		},
		data() {
			return {
				list: [],
				secondClass: {

				}
			}
		},
		onLoad() {
			this.initIdleClass()
			this.getOneClass()
		},
		methods: {
			initIdleClass() {
				uni.showLoading({
					mask: true
				})
				let data = {
					method: "initIdleClass"
				}
				uniCloud.callFunction({
						name: "idleClassController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						this.list = res.result.data
					})
					.catch((err) => {
						console.log(err)
					})
			},
			// handelScrolltolower(e) {
			// 	console.log(e)
			// },
			handelCategoryChange(e) {
				this.secondClass = e
				console.log(this.secondClass)
			},
			enterClass(value) {
				console.log(value)
				uni.navigateTo({
					url: "../idleClassDetail/idleClassDetail?value=" + value
				})
			},
			getOneClass() {
				uni.showLoading({
					mask: true
				})
				let data = {
					method: "getOneClass"
				}
				uniCloud.callFunction({
						name: "idleClassController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						this.secondClass = res.result.data[0]
					})
					.catch((err) => {
						console.log(err)
					})
			}
		}
	}
</script>

<style lang="scss">
	.goods-class {
		margin: 20rpx 20rpx;

		.goods-class-two {
			font-size: 15px;
			font-weight: bold;
			margin-bottom: 20rpx;
			margin-top: 20rpx;
		}

		.goods-class-three {
			width: 100%;
			// border: 1px solid;
			display: flex;
			flex-wrap: wrap;
			// background: #FFFFFF;

			.class-three-item {
				width: 130rpx;
				height: 160rpx;
				// border: 1px solid;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				margin-top: 10rpx;
				// background: #07C160;


				.class-three-text {
					font-size: 10px;
					color: #999999;
					font-weight: normal;
				}
			}

			.class-three-item image {
				width: 130rpx;
				height: 130rpx;
				// border: 1px solid;
			}

		}
	}

	.margin-0 {
		margin-right: 0 !important;
	}

	.margin-r {
		margin-right: 60rpx;
	}
</style>
