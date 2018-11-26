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
		<div class="list_box">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>用户标签</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{labelist.length}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="labelist" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="id" label="操作" align="center" width="280">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="openStore(scope.row,'edi')" style="color: #ff8d00;">编辑</el-button>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button size="mini" type="text" @click="deletLabel(scope.row)" style="color: #fd3f1f;">删除</el-button>
					</template>
				</el-table-column>
				<el-table-column label="序号" align="center" width="200">
					<template slot-scope="scope">
						<span>{{labelist.length - scope.$index}}</span>
					</template>
				</el-table-column>
				<el-table-column label="类型" align="center" width="200">
					<template slot-scope="scope">
						<span>{{userType[scope.row.type]}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="标签名称" align="center">
				</el-table-column>
			</el-table>
		</div>
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