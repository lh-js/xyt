<template>
	<view id='scroll-item' class="cp-goods-select-category-item " :class="{'actived': actived }"
		@click.stop="handelClick()">
		<!-- 菜单项插槽 -->
		<slot>
			{{label}}
		</slot>
	</view>
</template>

<script>
	export default {
		inject: ['goodsSelect', 'categoryControl'],
		props: {
			category: {
				type: Object,
				required: true
			}
		},
		data: () => ({

		}),
		computed: {
			actived() {
				return this.goodsSelect?.currentCategory == this.value
			},
			value() {
				let key = this.props?.value || this.goodsSelect?.props?.value || 'value'
				return this.category[key]
			},
			label() {
				let key = this.props?.label || this.goodsSelect?.props?.label || 'label'
				return this.category[key] || '未知'
			},
		},
		methods: {
			async handelClick() {
				this.goodsSelect?.changeCategroy(this.category)
				this.categoryControl?.onSelected(this.category)
			},
		}
	}
</script>

<style>
</style>
