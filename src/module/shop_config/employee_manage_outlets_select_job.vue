<!--
	**员工管理-弹窗-选择职位
	*
	* 创建人 李志刚 2018-03-12
	* *
	*
-->
<template>
	<win :align="'center'" :width="500" :height="'auto'" @winEvent="jobWinFn" :ok="jobOkStyle">
		<span slot="title">{{title}}</span>
		<div slot="content">
			<div class="jobsWrap">
				<div class="jobType" v-if="showjobType">
					<a href="javascript:;" :class="{select: jobtype == 'brand'}" @click="changeJobtype('brand')">品牌指派</a>
					<a href="javascript:;" :class="{select: jobtype == 'shopself'}" @click="changeJobtype('shopself')">门店自建</a>
				</div>
				<div class="jobBox" :class="{shopselfJob: jobtype == 'shopself'}">
					<div class="jobL">
						<span v-for="(v,i) in jobList" @click="selectJobFn(i)" :key="i" :class="{select: selectIndex == i}" v-if="v.id>=100000 || v.id==0">
							{{v.name}}</span>
						<div v-if="(jobList.filter(v=>+v.id>=100000||v.id==0)).length==0">该分类下没有匹配到的相应职位(╯︵╰)</div>
					</div>
					<div class="jobR">
						<span v-for="(v,i) in jobList" @click="selectJobFn(i)" :key="i" :class="{select: selectIndex == i}" v-if="ischain==0 || +v.id<100000&&+v.id!=0">
							{{v.name}}</span>
						<div v-if="(jobList.filter(v=>+v.id<100000&&+v.id!=0)).length==0">该分类下没有匹配到的相应职位(╯︵╰)</div>
					</div>
				</div>
				<div class="subInfo" v-if="selectIndex!==-1">
					已选择职位:
					<span class="sdOrange">{{jobList[selectIndex].name}}</span>
				</div>
			</div>
		</div>
	</win>
</template>

<script>
export default {
	data() {
		return {
			jobtype: 'brand', // brand 品牌指派 shopself 门店自建
			jobOkStyle: {
				content: '确定',
				style: { backgroundColor: '#fe9300' }
			},
			selectJob: NaN, // 选好的职位
			selectIndex: -1,
			showjobType: true
		};
	},
	props: {
		index: {
			default: -1,
			type: Number
		},
		jobList: Array,
		title: String,
		ischain: Number
	},
	methods: {
		// 选择职位时切换 门店和品牌
		changeJobtype(type) {
			this.jobtype = type;
		},
		// 选中职位
		selectJobFn(i) {
			this.selectIndex = i;
		},
		jobWinFn(info) {
			if (info == 'ok' && this.selectIndex == -1) {
				this.$store.commit('setWin', { content: '请先选择一个职位' });
				return;
			}
			this.$emit('winEvent', info, this.selectIndex);
		}
	},
	created() {
		// 单店
		if (this.ischain == 0) {
			this.showjobType = false;
			this.jobtype = 'shopself';
		}
		this.selectIndex = this.index;
		if (this.jobList.filter(v => v.type == '1').length == 0) {
			this.jobtype = 'shopself';
		}
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
	}
};
</script>
<style lang="less" scoped>
@sdOrange: #fe9300;
@sdBlue: #2daadd;
.sdOrange {
	color: @sdOrange;
}
.sdBlue {
	color: @sdBlue;
}
.jobsWrap {
	padding: 20px 0 55px;
	margin: 0 20px;
	overflow: hidden;
	position: relative;
	// 右下 提示
	.subInfo {
		position: absolute;
		color: @sdOrange;
		right: 0;
		bottom: 0;
		height: 45px;
		line-height: 45px;
	}
	.jobType {
		padding-bottom: 10px;
		a {
			display: inline-block;
			height: 40px;
			line-height: 40px;
			border-radius: 4px;
			background-color: #e7e7e7;
			padding: 0 10px;
			margin: 0 5px;
			&.select {
				background-color: @sdBlue;
			}
		}
		// border-bottom: 1px solid @sdBlue;
	}
	.jobBox {
		padding-top: 15px;
		width: 200%;
		transition: all 0.3s;
		min-height: 150px;
		&.shopselfJob {
			transform: translate3D(-50%, 0, 0);
		}
		span {
			display: inline-block;
			padding: 0 10px;
			margin: 0 5px 10px;
			border: 1px solid #d2d2d2;
			height: 40px;
			line-height: 40px;
			cursor: pointer;
			&.select {
				border: 1px solid @sdOrange;
				background-color: #ffefd3;
				color: @sdOrange;
			}
		}
		.jobL {
			width: 50%;
			float: left;
		}
		.jobR {
			margin-left: 50%;
			width: 50%;
		}
		div div {
			color: #c8c8c8;
			text-align: center;
			height: 45px;
			line-height: 45px;
		}
	}
}
</style>
