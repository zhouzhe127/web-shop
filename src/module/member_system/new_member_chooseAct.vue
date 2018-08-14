<template>
	<!--添加活动弹框-->
	<section id="addActivity">
		<Win @winEvent='winEvent' :width='750' :height='350'>
			<span slot="title">选择活动类型</span>
			<section class="sec" slot='content'>
				<div class='sp'>
					<span v-for="(item,indexs) in timeList" :key="indexs" @click="changeRadio(item)" :class="{'effect':payType==item.id}">{{item.name}}</span>
				</div>
			</section>
		</Win>
	</section>
</template>
<script>
import storage from 'src/verdor/storage';
export default {
	props: {
		selectedList: Array //选中的会员的数组
	},
	data() {
		return {
			timeList: [{
				name: '自定义营销',
				id: 0
			}, {
				name: '消费额激励',
				id: 1
			}],
			flag1: 0,
			payType: 0, //选中的id	
		};
	},
	methods: {
		winEvent(str) {
			if (str == 'ok') {
				let memberIds = [];
				for (let item of this.selectedList) {
					memberIds.push(item.memberId);
				}
				storage.session('memberIds', memberIds);
				switch (this.payType) {
					case 0:
						this.$router.push('/admin/activity/generalActivity/custom');
						break;
					case 1:
						this.$router.push('/admin/activity/generalActivity/encourage');
						break;
					default:
						break;
				}
			}
			this.$emit('winEvent', '');
		},
		changeRadio: function(item) {
			//选择渠道
			let id = item.id;
			this.payType = id;
		},
	},
	components: {
		radio: () =>
			import ( /* webpackChunkName:'radio' */ 'src/components/radio_btn'),
		Win: () =>
			import ( /* webpackChunkName:'win' */ 'src/components/win')
	},
	// mounted() {

	// }
};
</script>
<style scoped>
.sec {
	padding: 100px 200px;
}


.choiceact {
	padding-top: 10px;
	position: relative;
}

.choiceact .span_1 {
	font-size: 14px;
	color: #999999;
}

.sp {
	display: flex;
	justify-content: space-around;
}

.sp .selectbtns {
	width: auto;
}

.sp span {
	vertical-align: top;
	position: relative;
	display: inline-block;
	width: 120px;
	height: 120px;
	text-align: center;
	background-color: #f1f1f1;
	border-radius: 8px;
	text-align: center;
	line-height: 120px;
}

.choiceact .span_2 {
	line-height: 120px;
}

.choiceact .span_3 {
	position: absolute;
	right: 35px;
	bottom: 20px;
	font-size: 12px;
	color: #999999;
}

.sel {
	display: inline-block;
	width: 120px;
	height: 40px;
	font-size: 16px;
	background: #f2f2f2;
	border-radius: 3px;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	margin-right: 10px;
}

.on {
	background-color: #28a8e0;
	color: #fff;
}

.sp section>span {
	min-width: 120px;
	height: 120px;
	display: inline-block;
	text-align: center;
	line-height: 120px;
	cursor: pointer;
	background-color: #f2f2f2;
	border-radius: 8px;
	margin-right: 8px;
}

.sp .effect {
	background: url('./../../../src/res/images/sign.png') #f2f2f2 no-repeat right bottom;
}
</style>