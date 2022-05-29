<template>
	<scroll-view  class="cp-goods-select-category" :style="{'height':height}" :scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="false">
		<view ref="list-view" id="list-view" class="cp-goods-select-category__wrap">
			<view id="top-anchor"></view>
			<slot>
				<template v-for="(category,index) in options">
					<cp-goods-category-item :category="category" :key="index"></cp-goods-category-item>
				</template>
			</slot>
			<view class="" style="margin-bottom: 200rpx;"></view>
		</view>
		<view class="cp-goods-select-category__actions">
			<!-- 菜单底部插槽 -->
			<slot name="bottom"></slot>
		</view>
	</scroll-view>
</template>

<script>
	
	import scorll from '../scroll-mixin.js'
	
	export default {
		options: { styleIsolation: 'shared' },
		name: "cp-goods-select-category",
		inject: ['goodsSelect'],
		provide() {
			return {
				categoryControl: this
			};
		},
		mixins: [scorll],
		props: {
			"value": [String,Number],
			"props": Object,
		},
		data() {
			return {
			};
		},
		computed: {
			height(){
				return this.goodsSelect? this.goodsSelect.height : '80vh'
			},
			valueKey(){
				let key = this.props?.value || this.goodsSelect?.props?.value || 'value'
				return key
			},
			labelKey(){
				let key = this.props?.label || this.goodsSelect?.props?.label || 'label'
				return key
			},
			childrenKey(){
				let key = this.props?.children || this.goodsSelect?.props?.children || 'children'
				return key
			},
			options() {
				return  this.goodsSelect?.options || [];
			},
		
		},
		watch: {
			"options": {
				immediate: true,
				async handler(v) {
					if(!v?.length)return;
					
					await this.$nextTick()
					// #ifndef MP
						let components = this.$refs['list-view']
					// #endif
					// #ifdef MP
						let components = uni.createSelectorQuery().in(this).select("#list-view")._component
					// #endif
					this.initScrollTop(components , this.goodsSelect?._scrollDataCategroy)
				}
			},

		},
		async mounted() {
			await this.$nextTick()
			this.goodsSelect.$on('set-category-scrollTop',async (categoryId, instance) => {
				if(this.value == categoryId) return
				this.scrollTo(categoryId)
			})
		},
		methods: {
			onSelected(v) {
				this.$emit('input', v[this.valueKey] || '')
				this.$emit('change', v)
			},
			scrollTo(categoryId) {
				let p =  this.goodsSelect?._scrollDataCategroy.find(row => row.key == categoryId)
				if(!p?._rect)return
				
				let top =p._rect[0] || 0
				this.setScrollTop(top - this.goodsSelect?._height / 2)
			},
		}
	}
</script>

<style lang="scss">
	@import '../cp-goods-select/cp-goods-select.scss';
</style>