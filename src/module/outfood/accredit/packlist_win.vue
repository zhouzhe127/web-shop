<template>
	<win :width="width" :height="height" @winEvent="winEvent" :align="'center'">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" slot-scope="props" style="height:100%">
			<ul class="aUl" style="width: 750px;margin-bottom: 30px;">
				<li v-for="(item,i) in packCom" :key="i" v-on:click="choseGood(item,i)" class="aLi" :class="{'shoName-select':item.categoryName==selected.categoryName}">{{item.categoryName}}
				</li>
			</ul>
			<!--底部===========================================-->
			<div style="width:100%;height: 40px;background-color: #f7f7f7;position: fixed;bottom: 50px;left: 0;">
				<h3 style="width: 160px;height: 40px;line-height: 40px;float: right;color: #FF9700;" class="elic">已选择:{{selected.categoryName}}</h3>
			</div>
		</div>
	</win>
</template>
<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			packCom: '',
			selected: {
				categoryName: this.addClassify != '' ? this.addClassify : ''
			}
		};
	},
	props: ['width', 'height', 'title', 'addClassify'],
	methods: {
		//获取分类列表名称
		async getOneAreaList() {
			let data = await http.getMeituanCategory({
				data: {}
			});
			this.packCom = data;
		},
		choseGood: function(item) {
			this.selected = item;
		},
		winEvent(str) {
			this.$emit('packwinEvent', str);
		}
	},
	mounted() {
		this.getOneAreaList();
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
	}
};
</script>
<style scoped>
.aUl {
	width: 100%;
	height: auto;
	overflow: auto;
	padding: 10px;
}

.aUl .aLi {
	padding: 0 15px;
	height: 40px;
	line-height: 40px;
	cursor: pointer;
	text-align: center;
	background-color: #f2f2f2;
	margin: 5px 10px;
	float: left;
}
.elic {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.shoName-select {
	border-color: #ff9800;
	background: url(../../../res/images/sign.png?18274) right bottom no-repeat;
}
</style>

