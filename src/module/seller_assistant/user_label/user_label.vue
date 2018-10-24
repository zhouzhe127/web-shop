<!--
    **用户标签
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="userLabel">
		<!-- 列表 -->
		<com-table :listHeight='80' :listName="'用户标签'" :key="index" :showTitle='1' :introData="labelist" :titleData="titleList" :allTotal="labelist.length" :listWidth="1436" :widthType='true'>
			<div slot="con-0" slot-scope="props" class="btnLink">
				<a href="javascript:;" @click="openStore(props.data,'edi')">编辑</a>
				<a href="javascript:;" @click="deletLabel(props.data)">删除</a>
			</div>
			<div slot="con-1" slot-scope="props">{{labelist.length - props.index}}</div>
			<div slot="con-2" slot-scope="props">{{userType[props.data.type]}}</div>
		</com-table>
		<!-- 弹窗 -->
		<component v-if="showWin" :is="isPopupwindow" :type='type' :labeldetail='labeldetail' @getAppliedWin='getResult'></component>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import getAppliedWin from './user_label_win.vue';

	export default {
		data() {
			return {
				index: null,
				titleList: [{
					titleName: '操作',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 287 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '序号',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 215 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '类型',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 215 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '标签名称',
					dataName: 'name',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 718 + 'px',
						flex: 'none'
					}
				}
				],
				allTotal: 0,
				showWin: false, //弹窗默认关闭状态
				isPopupwindow: '',
				type: '', //编辑标签和新增标签
				labelist: [], //标签列表
				labeldetail: '',
				userType: {
					0: '用户',
					1: '工作人员'
				}
			};
		},
		methods: {
			openStore: function(item, type) { //打开新增用户标签的弹窗
				this.showWin = true; //打开弹窗
				this.type = type; //编辑或者新增
				this.labeldetail = item; //编辑的详情
				this.isPopupwindow = 'getAppliedWin';
			},
			getResult: function(res) {
				if (res == 'ok') {
					this.getLabel();
				}
				this.showWin = false;
			},
			async getLabel() { // 获取用户标签
				let data = await http.getlabelList({
					data: {

					}
				});
				this.labelist = data; //将数据赋值
			},
			deletLabel: function(item) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'confirm',
					content: '确定删除该标签',
					callback: (res) => {
						if (res == 'ok') {
							this.deletLabels(item);
						}
					}
				});
			},
			async deletLabels(item) {
				let data = await http.delete({
					data: {
						tagId: item.id
					}
				});
				if (data) {
					this.getLabel();
				}
			}
		},
		watch: {

		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			getAppliedWin
		},
		mounted() {
			this.$store.commit('setPageTools', [{
				name: '新增用户标签',
				fn: () => {
					this.openStore({}, 'view');
				},
				className: 'el-btn-yellow'
			}]);
			this.getLabel();
		}

	};
</script>
<style type="text/css" scoped>
	#userLabel .btnLink a {
		cursor: pointer;
		display: inline-block;
		height: 18px;
		text-align: center;
		line-height: 18px;
		padding: 0 16px;
	}

	#userLabel .btnLink a:nth-child(1) {
		border-right: 1px solid #CECECE;
		color: #FF8D00;
	}

	#userLabel .btnLink a:nth-child(2) {
		color: #FF3D04;
	}
</style>