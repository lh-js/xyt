<template>
	<view>
		<view class="check">
			<view @click="showbox">
				<text v-model="text" class="spanstyle">{{text}}</text>
				<img class="imgstyle" :style="{ width: size + 'px', height: size + 'px' }"
					:src="fold ? arrowup : arrowdown" />
			</view>
			<view v-show="fold" class="dropbox">
				<span @click="check(item)" v-for="(item, index) in select" :key="index"
					class="select">{{ item.name }}</span>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: ['select'],
		data() {
			return {
				text: "认领",
				fold: false,
				border: true,
				size: 18,
				arrowdown: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a0439cf-af57-474f-b688-798babb30901/b4024bae-067c-4e94-be53-5a641088c408.png",
				arrowup: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8a0439cf-af57-474f-b688-798babb30901/70fcf6a5-a879-4702-a2b3-adfc4fb9b4a4.png",
			};
		},
		methods: {
			showbox() {
				this.fold = !this.fold;
			},
			check(item) {
				this.text = item.name
				this.fold = !this.fold;
				this.$emit('selectbox', item.name)
			},
		},
	};
</script>
<style scoped>
	.check {
		width: 60px;
		height: 20px;
		font-size: 12px;
		padding: 2px 5px 6px 8px;
		text-align: center;
		border: 1px solid #d9d9d9;
		border-radius: 5px;
	}

	.imgstyle {
		position: relative;
		top: 5px;
	}

	.dropbox {
		position: relative;
		top: 6px;
		height: 55px;
		border: 1px solid #F7F7F7;
		box-shadow: 0 4px 3px rgb(0 0 0 / 3%);
		border-radius: 0 0 5px 5px;
		overflow-y: scroll;
		/* transition: height 2s; */
		color: #999999;
		background: #FFFFFF;
	}

	.select {
		display: block;
		width: 100%;
		height: 25px;
		line-height: 25px;
	}

	.spanstyle {
		color: #999999;
		display: inline-block;
		width: 40px;
	}
</style>
