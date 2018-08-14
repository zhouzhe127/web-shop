<template>
	<div>
		<win @winEvent="getWinClickResult" :align="'center'" :width="580" :height="300">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<span class="required" v-if="type === 2">区域名称</span>
				<span class="required" v-else>货架名称</span>
				<input type="text" placeholder="请输入名称" v-model="titleName" maxlength="10">
			</div>
		</win>
	</div>

</template>

<script>
export default {
	data() {
		return {
			title: '',
			titleName: '',
			type: 0,
			id: -1
		};
	},
	props: {
		pTitleName: String,
		pType: Number,
		houseType: Number
	},
	mounted() {
		this.type = this.pType;
		switch (this.type + '') {
			case '0':
				this.houseType === 0
					? (this.title = '新增仓库')
					: (this.title = '新增货架');
				break;
			case '1':
				this.houseType === 0
					? (this.title = '修改仓库')
					: (this.title = '修改货架');
				this.titleName = this.pTitleName;
				break;
			case '2':
				this.title = '修改区域';
				this.titleName = this.pTitleName;
				break;
		}
	},
	methods: {
		getWinClickResult(res) {
			if (
				(this.titleName == '' || this.titleName == '0') &&
				res == 'ok'
			) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '名称不能为空且不能为0'
				});
				return false;
			}
			this.$emit('addhouse', res, this.titleName);
		}
	},
	components: {
		win: () => import(/*webpackChunkName: 'win'*/ 'src/components/win')
	}
};
</script>

<style lang="less" scoped>
#tan {
	.required {
		margin-left: 100px;
	}
	input {
		width: 300px;
		margin-top: 80px;
		outline: none;
		height: 40px;
		margin-left: 10px;
		padding-left: 10px;
	}
}
</style>