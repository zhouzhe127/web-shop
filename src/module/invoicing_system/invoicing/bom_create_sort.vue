<!--
    **bom仓库消耗排序
    *
    * 黄一帆
    * *
    *
-->
<template>
	<win @winEvent="clickResult" :align="'center'" :width="800" :height="'auto'" :type="'confirm'">
		<!--标题-->
		<span slot="title">仓库消耗排序</span>
		<!--内容-->
		<div slot="content" class="content">
			<div class="block select-ban">
				<div class="box list" @click="listClick">
					<span class="btn" v-if="!item.selected" v-for="(item,index) in list" :key="index" :data-id="item.id">
						{{item.name}}
					</span>
					<div class="empty" v-if="!list.length">-本店还没有仓库-</div>
				</div>
				<div class="box sort" @click="sortClick">
					<div class="title">已选择：({{sortList.length}})</div>
					<div class="item" v-for="(item,index) in sortList" :key="index">
						<em>{{index+1}}</em>
						<div class="posi-box">
							<span class="btn" :data-id="item.id">
								{{item.name}}
							</span>
							<i class="el-icon-circle-check"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</win>
</template>

<script>
	import utils from 'src/verdor/utils';

	export default {
		data() {
			return {
				list: [], //仓库列表
				sortList: [], //排序好的仓库列表
				widList: [], //选中仓库id列表
				shopId:'',
				isBrand:'',
			};
		},
		props: [
			'winOpen', //仓库排序参数
		],
		mounted() {
			let obj = utils.deepCopy(this.winOpen);
			for(let key in obj){
				if(obj[key] && key!='list') this[key] = obj[key];
			}
			let arr=[];
			for(let item of obj.list){
				console.log(this.isBrand);
				if(this.isBrand){//品牌
					if(item.brandId==this.shopId && item.shopId=='0'){
						arr.push(item);
					}
				}else{//单店
					if(item.shopId==this.shopId){
						arr.push(item);
					}
				}
			}
			this.list = arr;
			this.setDefault();
		},
		methods: {
			clickResult(res) {
				if (res == 'ok') {
					this.$emit('emit', this.widList);
				} else {
					this.$emit('emit', false);
				}
			},
			setDefault() { //设置已选中的仓库
				if (this.widList.length) {
					for (let item1 of this.widList) {
						for (let item2 of this.list) {
							if (item2.id == item1) {
								this.sortList.push(item2);
								item2.selected = true;
							}
						}
					}
				} else {
					for (let item of this.list) {
						item.selected = false;
					}
				}
			},
			listClick(event) { //点击仓库 排序
				let target = event.target;
				if (target.className.includes('btn')) {
					let id = target.getAttribute('data-id');
					let name = target.textContent;
					let obj = {
						id: id,
						name: name
					};
					for (let i in this.list) { //左侧列表 选中隐藏
						if (this.list[i].id == id) this.list[i].selected = true;
					}
					this.sortList.push(obj);
					this.widList.push(id);
				}
			},
			sortClick(event) { //点击排序好的仓库-取消排序
				let target = event.target;
				if (target.className.includes('btn')) {
					let id = target.getAttribute('data-id');
					for (let i in this.list) { //左侧列表 重新显示
						if (this.list[i].id == id) this.list[i].selected = false;
					}
					for (let i in this.sortList) { //右侧列表移除
						if (this.sortList[i].id == id) {
							this.sortList.splice(i, 1);
							this.widList.splice(i, 1);
						}
					}
				}
			}
		},
		components: {
			win: () =>
				import ( /*webpackChunkName:'win'*/ 'src/components/win_element'),
		}
	};
</script>

<style lang="less" scoped>
	.content {
		.overflow-hidden {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		.block {
			width: 100%;
			min-height: 400px;
			padding-top: 20px;
			display: flex;
			span {
				height: 40px;
				line-height: 38px;
				border: 1px solid #ccc;
				text-align: center;
				cursor: pointer;
				display: inline-block;
				margin: 5px;
				padding: 0 15px;
				background-color: #fff;
				border-radius: 4px;
				max-width: 100%;
				.overflow-hidden;
			}
			.box {
				padding: 0 15px;
				align-items: stretch;
			}
			.list {
				width: 55%;
				border-right: 1px dashed #ccc;
				.empty{width: 100%;padding: 30px 0;text-align: center;font-size: 16px;color: #999;}
			}
			.sort {
				width: 45%;
				padding-left: 30px;
				max-height: 360px;
				overflow: auto;
				.title {
					padding-bottom: 10px;
					margin-left: -20px;
				}
				.item {
					width: 100%;
					position: relative;
					em {
						position: absolute;
						left: -20px;
						top: 18px;
						font-size: 16px;
						display: inline-block;
					}
				}
				.posi-box{
					position: relative;
					display: inline-block;
					margin: 5px;
					max-width: 100%;
					i{
						position: absolute;
						right: -5px;
						top: -5px;
						font-size: 16px;
						color: #E1BB4A;
					}
				}
				span {
					color: #E1BB4A;
					border: 1px solid #E1BB4A;
					position: relative;
					margin: 0;
				}
			}
		}
	}
</style>