<template>
	<view class="latter-list">
		<view class="latter-list-item" v-for="(v, k) in data" :key="k">
			<view class="latter-list-latter">{{ v[0] }}</view>
			<view class="plist">
				<view class="plist-item"
					v-for="(m, n) of v[1]"
					:key="n"
					:class="{ selected: selected === m }"
					@click="selectHandler(m)"
				>
					<text>{{ m.name }}</text>
					<text class="select-icon">✔</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				required: true
			},
			selected: Object
		},
		methods: {
			selectHandler(item) {
				this.$emit('select', item)
			}
		}
	}
</script>

<style lang="scss">
	$lee-spacing-base: 30upx;
	$lee-spacing-large: 40upx;
	$lee-font-size-caption: 28upx;
	$lee-text-height: 60upx;
	
	.latter-list {
		&-item {
			display: flex;
			&:not(:last-child) {
				margin-bottom: $lee-spacing-large;
			}
		}
		
		&-latter {
			$width: 60upx;
			width: $width;
			font-size: $lee-font-size-caption;
			color: $uni-text-color-grey;
			line-height: $lee-text-height;
		}
	}
	
	.plist {
		flex: 1;
		width: 0;
		
		&-item {
			height: $lee-text-height;
			line-height: $lee-text-height;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			&:not(:last-child) {
				margin-bottom: $lee-spacing-base;
			}
			
			&.selected {
				color: $uni-color-primary;
			}
			&:not(.selected) > .select-icon {
				display: none;
			}
		}
	}
</style>
