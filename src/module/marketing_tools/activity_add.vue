<template>
	<!--添加活动弹框-->
	<section id="addActivity">
		<Win @winEvent='winEvent' :width='750' :height='350'>
			<section class="sec" slot='content'>
				<div class="top">
					<span class="sel" v-for="(item,index) in timeList" :key='index' v-bind:class="{'on':flag1 == index}" @click="show(index)">{{item.name}}</span>
				</div>
				<div class="choiceact">
					<span class="span_1">选择活动：</span>
					<div class='sp'>
						<section v-for="(items,ind) in timeList">
							<span v-for="(item,indexs) in items.children" :key="indexs" @click="changeRadio(item)" :class="{'effect':payType==item.id}" v-if="ind == flag1">{{item.name}}</span>
						</section>
						<div class="div_1">
							<span class="span_2">更多</span>
							<span class="span_3">开发中...</span>
						</div>
					</div>
				</div>
			</section>
		</Win>
	</section>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

export default {
	data() {
		return {
			listShow: true,
			timeList: [{
				'name': '会员招募'
			}, {
				'name': '消费激励'
			}, {
				'name': '标准营销'
			}, {
				'name': '顾客关怀'
			}],
			flag1: 0,
			listLong: [],
			listShort: [],
			payType: 0, //选中的id	
		};
	},
	methods: {
		winEvent(str) {
			if (str == 'ok') {
				let obj = {
					type: this.flag1,
					mouldType: this.timeList[this.flag1].children[this.payType].id
				};
				storage.session('activityType', obj);
			}
			this.$emit('winEvent', {
				status: str,
				type: this.payType, //子选中的
				module: this.timeList[this.flag1]
			});
		},
		show(index) {
			this.flag1 = index;
		},
		async list() {
			let data = await http.getActivityMould({
				data: {
					type: this.flag1,
				}
			});
			this.timeList = data;
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
	mounted() {
		this.list();
	}
};
</script>
<style scoped>
.sec {
	padding: 20px 50px;
}

.top {
	border-bottom: 1px dashed #ccc;
	padding-bottom: 20px;
}

.choiceact {
	padding-top: 10px;
	position: relative;
}

.choiceact .span_1 {
	font-size: 14px;
	color: #999999;
}

.choiceact .sp {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}

.sp .selectbtns {
	width: auto;
}

.choiceact .div_1 {
	vertical-align: top;
	position: relative;
	display: inline-block;
	width: 120px;
	height: 120px;
	text-align: center;
	background-color: #f1f1f1;
	border-radius: 8px;
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