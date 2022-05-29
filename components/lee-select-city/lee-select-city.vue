<template>
	<view class="lee-select-city" :style="{ height }">
		<!-- 选择提示 -->
		<view class="lee-select-display" v-if="currentSelected.length">
			<view class="lee-select-display-item" v-for="(v, k) of currentSelected" :key="k"
				:class="{ active: currentLevel === k }" @click="skipLevel(k)">{{ v.name }}</view>
			<view class="lee-select-display-item" v-if="placeholder">{{ placeholder }}</view>
		</view>
		<!-- 选择提示END -->

		<view class="swiper">
			<view class="swiper-wrapper" :style="{
				transform: `translateX(-${100 * currentLevel/3}%)`
			}">
				<!-- 省级 -->
				<scroll-view class="swiper-item" scroll-y>
					<view class="swiper-content">
						<!-- 当前定位 -->
						<block>
							<view class="caption">
								<text>当前定位</text>
								<text class="action" @click="getNewPosition">重新定位</text>
							</view>
							<view class="current-position" @click="selectCurrentPosition">
								{{ currentPosition }}
							</view>
						</block>
						<!-- 当前定位END -->

						<!-- 热门城市 -->
						<block v-if="hotCities.length">
							<view class="caption">热门城市</view>
							<view class="gird">
								<view class="gird-item" v-for="(v, k) of hotCities" :key="k">
									<view @click="hotCitySelectHandler(v)">{{ v[0] }}</view>
								</view>
							</view>
						</block>
						<!-- 热门城市END -->
						<view class="caption">选择省份/地区</view>
						<lee-latter-list :data="dataByLetter" :selected="currentSelected[0]" @select="selectPro" />
					</view>
				</scroll-view>
				<!-- 省级END -->

				<!-- 市级 -->
				<scroll-view class="swiper-item" scroll-y>
					<view class="swiper-content">
						<view class="caption">选择城市</view>
						<lee-latter-list :data="level2Data" :selected="currentSelected[1]" @select="selectCity" />
					</view>
				</scroll-view>
				<!-- 市级END -->

				<!-- 市级 -->
				<scroll-view class="swiper-item" scroll-y>
					<view class="swiper-content">
						<view class="caption">选择区/县</view>
						<lee-latter-list :data="level3Data" :selected="currentSelected[2]" @select="selectQu" />
					</view>
				</scroll-view>
				<!-- 市级END -->
			</view>
		</view>
	</view>
</template>

<script>
	var QQMapWX = require('../../common/location/qqmap-wx-jssdk.js');
	var qqmapsdk;
	import LeeLatterList from './lee-latter-list.vue'
	import cityData from './city.json'
	import hotCities from './hot-cities.json'

	export default {
		components: {
			LeeLatterList
		},
		props: {
			// 容器高度
			height: {
				type: String,
				default: '100%'
			},

			// 城市级联数据
			data: {
				type: Array,
				default: () => JSON.parse(JSON.stringify(cityData))
			},

			// 热门城市
			hotCities: {
				type: Array,
				default: () => JSON.parse(JSON.stringify(hotCities))
			},
			currentPosition: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				currentLevel: 0,
				currentSelected: [],
				showPlaceholder: true,
			}
		},
		computed: {
			// 获取按Letter分组后的一级列表
			dataByLetter() {
				return this.formatByLatter(this.data)
			},

			// 当前二级列表
			level2Data() {
				const lastLevel = this.currentSelected[0]
				if (!lastLevel) return []
				return this.formatByLatter(lastLevel.children || [])
			},

			// 当前三级列表
			level3Data() {
				const lastLevel = this.currentSelected[1]
				if (!lastLevel) return []
				return this.formatByLatter(lastLevel.children || [])
			},

			placeholder() {
				const ln = this.currentSelected.length
				if (ln === 0) return '请选择地区'
				if (ln === 1) return '请选择城市'
				if (ln === 2) return '请选择县'
				return ''
			}
		},
		// async created() {
		// 	await this.getNewPosition()
		// },
		methods: {
			// 选择省份
			selectPro(item) {
				this.currentSelected = [item]
				if (this.level2Data.length) {
					this.currentLevel = 1
				} else {
					this.submit()
				}
			},

			// 选择城市
			selectCity(item) {
				this.currentSelected.splice(1)
				this.$set(this.currentSelected, 1, item)
				if (this.level3Data.length) {
					this.currentLevel = 2
				} else {
					this.submit()
				}
			},

			// 选择区/县
			selectQu(item) {
				this.currentSelected.splice(2)
				this.$set(this.currentSelected, 2, item)
				this.submit()
			},

			// 跳转到指定级数
			skipLevel(level) {
				this.currentLevel = level
			},

			// 提交当前选择
			submit() {
				const selected = this.currentSelected.slice(0)
				const simple = selected.map(v => v.name)
				this.$emit('submit', {
					simple,
					selected
				})
			},

			// 点击热门城市
			hotCitySelectHandler(item) {
				let current = this.data
				const selected = []
				for (const v of item[1]) {
					const node = current.find(m => m.name === v)
					if (!node) return
					current = node.children
					if (!current || current.length === 0) return
					selected.push(node)
				}
				this.currentSelected = selected
				const nextLevel = selected.length
				if (
					(nextLevel === 1 && this.level2Data.length) ||
					(nextLevel === 2 && this.level3Data.length)
				) {
					this.currentLevel = nextLevel
				} else {
					this.submit()
				}
			},

			// 使用当前定位
			selectCurrentPosition() {
				this.$emit('select-current', this.currentPosition)
			},
			// 重新定位
			getNewPosition() {
				this.$emit('getNewPosition', this.currentPosition)
			},
			// 按latter格式化
			formatByLatter(list) {
				return list.reduce((map, item) => {
					if (!item.latter) return map
					let tmp = map.find(v => v[0] === item.latter)
					if (!tmp) {
						tmp = [item.latter, []]
						map.push(tmp)
					}
					tmp[1].push(item)
					tmp[1].sort((a, b) => {
						return a.name - b.name
					})
					return map
				}, []).sort((a, b) => {
					return a[0].charCodeAt(0) - b[0].charCodeAt(0)
				})
			}
		}
	}
</script>

<style lang="scss">
	$lee-spacing-small: 10upx;
	$lee-spacing-base: 30upx;
	$lee-spacing-large: 40upx;
	$lee-font-size-caption: 28upx;
	$lee-text-height: 60upx;

	.lee-select-city {
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: $uni-bg-color;
	}

	.swiper {
		flex: 1;
		width: 100%;
		height: 0;
		overflow: hidden;
		position: relative;

		&-wrapper {
			width: 300%;
			height: 100%;
			display: flex;
			position: relative;
		}

		&-item {
			width: calc(100% / 3);
			height: 100%;
			position: relative;
			box-sizing: border-box;
		}

		&-content {
			position: relative;
			box-sizing: border-box;
			padding: $lee-spacing-base;

			>.caption {
				color: $uni-text-color-grey;
				font-size: $lee-font-size-caption;
				margin-bottom: $lee-spacing-base;

				>.action {
					float: right;
				}
			}
		}
	}

	// 已选择显示
	.lee-select-display {
		padding: $lee-spacing-base;
		box-shadow: 0 2upx 2upx rgba(0, 0, 0, .15);

		&-item {
			$height: 80upx;
			height: $height;
			line-height: $height;
			box-sizing: border-box;
			padding: 0 $lee-spacing-base;
			font-size: $lee-font-size-caption;
			border-left: 1px solid $uni-color-primary;
			position: relative;

			&.active {
				color: $uni-color-primary;
			}

			&::before {
				content: '';
				top: 0;
				left: -4upx;
				width: 8upx;
				height: 50%;
				background-color: $uni-bg-color;
				position: absolute;
				display: none;
			}

			&:first-child::before,
			&:last-child::before {
				display: block;
			}

			&:last-child::before {
				top: 50%;
			}

			&::after {
				$size: 14upx;
				top: 50%;
				left: 0;
				content: '';
				width: $size;
				height: $size;
				border-radius: 50%;
				position: absolute;
				background-color: $uni-color-primary;
				transform: translate(-50%, -50%);
			}

			&:last-child::after {
				background-color: $uni-text-color-grey;
			}
		}
	}

	// 热门城市
	.gird {
		$height: 80upx;

		display: flex;
		flex-wrap: wrap;
		position: relative;
		margin-bottom: $lee-spacing-base;

		&-item {
			width: 20%;
			height: $height;
			box-sizing: border-box;
			padding: $lee-spacing-small;

			>view {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: $lee-font-size-caption;
				background-color: $uni-bg-color-hover;
				border-radius: 8upx;
			}
		}
	}

	// 当前定位
	.current-position {
		$height: 80upx;
		height: $height;
		line-height: $height;
		text-align: center;
		font-size: $lee-font-size-caption;
		margin-bottom: $lee-spacing-base;
		color: $uni-color-primary;
		background-color: lighten($uni-color-primary, 40%);
		border-radius: 8upx;
	}
</style>
