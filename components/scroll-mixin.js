
export default {

	data() {
		return {
			// 设置滑动的距离
			scrollTop: 0,
		}
	},
	methods: {
		/* 获取元素*/
		queryElement(id, comp) {
			const query = uni.createSelectorQuery().in(comp || this);
			return new Promise((resolve, reject) => {
				try {
					query.select(id).boundingClientRect(data => resolve(data)).exec();
				} catch (e) {
					reject(e)
				}
			})
		},
		async initScrollTop(comp , options ,fl) {
			//滑动容器距离viewport高度
			const {top = 0 } = await this.queryElement("#top-anchor", comp);
			const _scrollViewTop = top
			//计算分类区间
			let i = 0;
			let j = 0;
			let components = comp.$children
			for (; i < components.length; i++) {
				let ele = components[i]
				const data = await this.queryElement("#scroll-item", ele);
				if (!data) continue;

				let top = data.top - _scrollViewTop,
					bottom = top + data.height;
				options[j++]._rect= [top, bottom]
			}
		},
		setScrollTop(target = 0) {
			this.scrollTop = target - 1;
			this.$nextTick(() => this.scrollTop = target);
		},
	}
}
