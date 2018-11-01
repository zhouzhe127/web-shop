<!--
    **人员等级
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="staffLevel">
		<!-- <com-table :listHeight='80' :listWidth="1436" :listName="'人员级别'" :key="index" :showTitle='1' :introData="levelist" :titleData="titleList"
		    :allTotal="levelist.length" :widthType='true'>
			<div slot="con-0" slot-scope="props" class="btnLink">
				<a href="javascript:;" @click="openStore(props.data,'edi')">编辑</a>
				<a href="javascript:;" @click="deletLevel(props.data)">删除</a>
			</div>
			<div slot="con-1" slot-scope="props" class="btnLink_g">
				<ul>
					<li v-for="(item,index) in props.data.star" class="on" :key="index">
					</li>
					<li v-for="(item,index) in props.data.unstar" :key="index+'_0'">
					</li>
				</ul>
			</div>
		</com-table> -->
		<div class="list_box">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>人员级别</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{levelist.length}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="levelist" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="id" label="操作" align="center" width="280">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="openStore(scope.row,'edi')" style="color: #ff8d00;">编辑</el-button>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button size="mini" type="text" @click="deletLevel(scope.row)" style="color: #fd3f1f;">删除</el-button>
					</template>
				</el-table-column>
				<el-table-column label="等级显示" align="center" width="400">
					<template slot-scope="scope">
						<div class="btnLink_g">
							<ul>
								<li v-for="(item,index) in scope.row.star" class="on" :key="index">
								</li>
								<li v-for="(item,index) in scope.row.unstar" :key="index+'_0'">
								</li>
							</ul>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="名称" align="center" width="500">
				</el-table-column>
				<el-table-column prop="totalGold" label="条件" align="center">
				</el-table-column>
			</el-table>
		</div>
		<!-- 弹窗 -->
		<component v-if="showWin" :is="isPopupwindow" :type='type' :leveldetail='leveldetail' @getAppliedWin='getResult'></component>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	import getAppliedWin from './staff_level_win.vue';

	export default {
		data() {
			return {
				index: null,
				allTotal: 0,
				showWin: false, //弹窗默认关闭状态
				isPopupwindow: '',
				type: '', //编辑标签和新增标签
				levelist: [], //等级列表
				leveldetail: ''
			};
		},
		methods: {
			openStore: function(item, type) { //打开新增用户标签的弹窗
				this.showWin = true; //打开弹窗
				this.type = type;
				this.leveldetail = item;
				this.isPopupwindow = 'getAppliedWin';
			},
			getResult: function(res) {
				if (res == 'ok') {
					this.getLevel();
				}
				this.showWin = false;
			},
			async getLevel() {
				let data = await http.getListlevel({
					data: {}
				});
				if (data && data != '') {
					this.levelist = data;
					this.levelist = utils.sortByAll(this.levelist, ['sort', 'star'], true);
					//计算出等级
					for (let i = 0; i < this.levelist.length; i++) {
						if (this.levelist[i].star == null) {
							this.levelist[i].star = 0;
						}
						this.levelist[i].star = Number(this.levelist[i].star);
						this.levelist[i].unstar = 5 - Number(this.levelist[i].star);
					}
				}
			},
			deletLevel: function(item) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'confirm',
					content: '确定删除该等级',
					callback: (res) => {
						if (res == 'ok') {
							this.deletLevels(item);
						}
					}
				});
			},
			async deletLevels(item) {
				let data = await http.deletelevel({
					data: {
						levelId: item.id
					}
				});
				if (data) {
					this.getLevel();
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
				name: '新增人员等级',
				fn: () => {
					this.openStore({}, 'view');
				},
				className: 'el-btn-yellow'
			}]);
			this.getLevel(); //获取等级列表
		}

	};
</script>
<style type="text/css" scoped>
	#staffLevel .list {
		width: 1436px;
		min-height: 156px;
		border: 1px solid #D2D2D2;
	}

	#staffLevel .list .list_title {
		width: 1436px;
		height: 45px;
		line-height: 45px;
		padding-left: 17px;
	}

	#staffLevel .list .list_title span {
		font-size: 16px;
		color: #333;
		font-weight: bold;
	}

	#staffLevel .list .list_title span:first-child {
		margin-right: 11px;
	}

	#staffLevel .list .list_title span:nth-child(2) {
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #000;
		margin-right: 11px;
		vertical-align: middle;
	}

	#staffLevel .list .list_title span:last-child a {
		font-size: 16px;
		color: #FF3C05;
	}

	#staffLevel .list .heads {
		width: 1436px;
		height: 41px;
		background: #F2F2F2;
	}

	#staffLevel .list .heads li {
		float: left;
		text-align: center;
		line-height: 41px;
		font-size: 16px;
		color: #43414A;
	}

	#staffLevel .list .heads li:nth-child(1) {
		width: 20%;
	}

	#staffLevel .list .heads li:nth-child(2) {
		width: 40%;
	}

	#staffLevel .list .heads li:nth-child(3) {
		width: 20%;
	}

	#staffLevel .list .heads li:nth-child(4) {
		width: 20%;
	}

	#staffLevel .list .nolist {
		width: 1436px;
		text-align: center;
		line-height: 70px;
		font-size: 24px;
		color: #E0E0E0;
	}

	#staffLevel .list .contents {
		width: 1436px;
		height: 69px;
		border-bottom: 1px solid #F7F7F7;
	}

	#staffLevel .list .contents li {
		float: left;
		height: 69px;
		text-align: center;
		line-height: 69px;
		font-size: 14px;
		color: #666;
	}

	#staffLevel .list .contents li:nth-child(1) {
		width: 20%;
	}

	#staffLevel .btnLink_g {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#staffLevel .btnLink_g ul {
		float: left;
		display: inline;
		height: 60px;
		line-height: 60px;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	#staffLevel .btnLink_g ul li {
		float: left;
		width: 24px;
		cursor: pointer;
		text-indent: -9999px;
		background: url(../../../../src/res/icon/star.png) no-repeat;
		height: 20px;
		display: inline;
		flex: 1;
	}

	#staffLevel .btnLink_g ul li.on {
		background-position: 0 -28px;
	}

	#staffLevel .btnLink a {
		cursor: pointer;
		display: inline-block;
		height: 18px;
		text-align: center;
		line-height: 18px;
		padding: 0 16px;
	}

	#staffLevel .btnLink a:nth-child(1) {
		border-right: 1px solid #CECECE;
		color: #FF8D00;
	}

	#staffLevel .btnLink a:nth-child(2) {
		color: #FF3D04;
	}
</style>