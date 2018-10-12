<!--
    **来源统计
    *
    * 
    * *孔伟研
    *
-->
<template>
	<div id="sources-stat">
		<div class="add-sources">
			<!-- <a v-if = "ischain == 0 || ischain ==3" href="javascript:void(0);" class="blue fr" style="width: 150px;height: 50px; margin-left: 20px;" @click='exportSource()'>导出</a>
            <a @click = "isSources('add')" v-if = "ischain == 0 || ischain ==3" href="javascript:void(0);" class="addclassify fr">添加来源</a> -->
			<div class="divisive-fans">
				分裂粉丝数：{{totalFansNum}}
			</div>
		</div>
		<!-- <com-table :listHeight='80' :showHand="false" :listName="'来源统计列表'" :showTitle='2' :listWidth="672" :introData="sourcesList"
		    :titleData="titleList">
			<div slot="con-0" slot-scope="props">{{props.index + 1}}</div>
			<div class="code" slot="con-4" slot-scope="props">
				<img :src="props.data.imageUrl" />
			</div>
			<section v-if="ischain == '0' || ischain == '3'" slot="con-5" slot-scope="props">
				<a :href="props.data.imageUrl" target="_blank" class="blue" style="width: 32%;">下载二维码</a>
				<a @click="isSources('edit',props.data)" href="javascript:void(0);" class="yellow" style="width: 32%;">编辑</a>
				<a @click="delSources(props.index,props.data)" href="javascript:void(0);" class="red" style="width: 32%;">删除</a>
			</section>
			<section v-if="ischain == '1' || ischain == '2'">
				<a href="javascript:void(0);" style="width: 100%;height: 100%;color: #333;">当前无权限</a>
			</section>
		</com-table> -->
		<div class="list_box" style="width:100%;">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>来源统计</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{allFormList.length}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="sourcesList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed label="序号" width="120" align="center">
					<template slot-scope="scope">
						<span>{{scope.$index + 1}}</span>
					</template>
				</el-table-column>
				<el-table-column label="名称" prop="name" width="200" align="center">
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center">
				</el-table-column>
				<el-table-column prop="count" label="人数" width="200" align="center">
				</el-table-column>
				<el-table-column prop="code" label="二维码" align="center">
					<template slot-scope="scope">
						<img :src="scope.row.imageUrl" style="width:60px;height:60px;" />
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="250">
					<template slot-scope="scope">
						<el-button size="medium" type="text" @click="downLoadcode(scope.row)" style="color: rgb(40, 168, 224);">下载二维码</el-button>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button size="medium" type="text" @click="isSources('edit',scope.row)" style="color: #ff8d00;">编辑</el-button>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button size="medium" type="text" @click="delSources(scope.$index,scope.row)" style="color: #fd3f1f;">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class='pageWrap'>
			<el-pagination background @size-change='handleSizeChange' @current-change='pageChange' :current-page='page' :page-size='num' layout='sizes, prev, pager, next' :page-count='endTotal' :page-sizes='[10, 20, 30]'></el-pagination>
		</div>
		<statisticsManagementWin v-if="showWin" @statisticsManagementWin="getResult" :detial='itemDetial' :types="types"></statisticsManagementWin>
	</div>
</template>
<script>
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			ischain: '',
			isBrand: '', //判断是否是品牌
			sourcesList: [],
			hint: false,
			imgHost: '',
			totalFansNum: null,
			exportUrl: 'javascript:void(0);',
			index: null,
			types: 'add', //添加或者编辑
			itemDetial: {}, //列表单个详情
			newItemDetial: {}, ////拷贝列表单个详情
			showWin: false, //弹窗默认关闭状态
			allTotal: 0,
			page: 1,
			num: 10,
			pageTotal: 10,
			endTotal: 1,
			allFormList: [] //所有的数据
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.ischain = userData.currentShop.ischain;
		this.isBrand = this.ischain == '3' ? false : true;
		if (this.ischain == '0' || this.ischain == '3') {
			this.$store.commit('setPageTools', [{
				name: '添加来源',
				className: ['addStaff', 'firstBtn'],
				fn: this.add,
				type: 2
			},
			{
				name: '导出',
				className: ['setTemp', 'export-btn'],
				fn: this.exportSource
			}
			]);
		}
		this.getCountList();
	},
	components: {
		statisticsManagementWin: () =>
			import ( /*webpackChunkName: 'statistics_management_win'*/ './statistics_management_win'),
		comTable: () =>
			import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table')
	},
	methods: {
		getResult: function(res, item) {
			if (res == 'ok') {
				if (item.name == '') {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '请添加来源名称'
					});
					return false;
				}
				if (this.types == 'edit') {
					this.editStaticId(item);
				} else if (this.types == 'add') {
					this.addStaticId(item);
				}
			}
			this.showWin = false;
		},
		//添加来源
		async addStaticId(data) {
			await http.addStaticId({
				data: data
			});
			//this.sourcesList.push(detial);
			this.getCountList();
		},
		//修改来源
		async editStaticId(data) {
			await http.editStaticId({
				data: data
			});
			this.getCountList();
		},
		delSources: function(i, detial) {
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确定要删除来源?',
				callback: delRes => {
					if (delRes == 'ok') {
						this.delStaticId(detial);
						this.getCountList();
						//this.sourcesList.splice(this.sourcesList[i], 1);
					}
				}
			});
		},
		//删除来源
		async delStaticId(detial) {
			await http.delStaticId({
				data: {
					id: detial.id
				}
			});
		},
		//获取来源列表
		async getCountList() {
			let sourcesList = await http.getCountList({
				data: {}
			});
			this.allFormList = sourcesList.list;
			if (this.allFormList.length == 0) {
				this.hint = true;
				this.allFormList = [];
			} else {
				let count = sourcesList.count ? sourcesList.count : [];
				let list = this.allFormList ? this.allFormList : [];
				for (let i = 0; i < list.length; i++) {
					list[i].count = 0;
					list[i].createTime = utils.format(
						new Date(list[i].createTime * 1000),
						'yyyy-MM-dd'
					);
					for (let j = 0; j < count.length; j++) {
						if (count[j].id == list[i].id) {
							list[i].count = count[j].count;
						}
					}
				}
				this.allFormList = list;
				//console.log(JSON.stringify(this.allFormList))
				// this.allTotal = list.length;
				this.sortSources();
				this.$nextTick(() => {
					this.setPage();
				});
			}
			this.totalFansNum = sourcesList.fissionNum.count;
		},
		add() {
			this.isSources('add');
		},
		//添加或编辑来源
		isSources: function(type, item) {
			this.showWin = true;
			this.types = type;
			if (item) {
				this.itemDetial = item;
			} else {
				this.itemDetial = {
					count: '0',
					imageUrl: '',
					name: '',
					id: ''
				};
			}
			// this.ass = 'statisticsManagementWin';
		},
		//导出来源列表
		exportSource: function() {
			//先判断 来源列表 是否为空
			if (this.sourcesList.length == 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '来源列表为空，没有数据可以导出'
				});
				return false;
			}
			this.getAllSourceList();
		},
		//导出接口
		async getAllSourceList() {
			await http.getAllSourceList({
				data: {}
			});
		},
		sortSources: function() {
			let arr = this.allFormList;
			let sortTab = function(a, b) {
				let value1 = parseInt(a['id']);
				let value2 = parseInt(b['id']);
				if (value1 > value2) {
					return -1;
				} else if (value1 < value2) {
					return 1;
				} else {
					let id1 = parseInt(a['createTime']);
					let id2 = parseInt(b['createTime']);
					if (id1 > id2) {
						return -1;
					} else if (id1 < id2) {
						return 1;
					}
				}
				return 0;
			};
			this.allFormList = arr.sort(sortTab);
		},
		downLoadcode: function(item) {
			//window.location.href = item.imageUrl;
			window.open(item.imageUrl);
		},
		setPage: function() {
			this.endTotal = Math.ceil((this.allFormList.length) / (this.num));
			let pageStart = (this.page - 1) * (this.num);
			let pageEnd = (this.page) * (this.num);
			let pageContent = this.allFormList.slice(pageStart, pageEnd);
			this.sourcesList = pageContent;
		},
		//每页显示多少条数据
		handleSizeChange(p) {
			this.num = p;
			this.setPage();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.setPage();
		},
	},
};
</script>
<style type="text/css" scoped>
.sources-stat {
	width: 100%;
	height: 30px;
	line-height: 30px;
	/*overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;*/
}

#sources-stat .hint {
	width: 100%;
	height: 100px;
	color: #f8931f;
	line-height: 100px;
	text-align: center;
	font-size: 30px;
	background-color: #eeeeee;
}

#sources-stat ul {
	min-width: 800px;
}

#sources-stat ul li {
	float: left;
	display: block;
	text-align: center;
	background-color: #fff;
	height: 80px;
	line-height: 80px;
	width: 14.4%;
	min-width: 100px;
}

#sources-stat ul.title li {
	background-color: #e6e6e6;
	height: 50px;
	line-height: 50px;
}

#sources-stat ul.con li.gray {
	background-color: #f2f2f2;
}

#sources-stat .code img {
	width: 60px;
	height: 60px;
	margin-top: 10px;
}

#sources-stat .add-sources {
	width: 100%;
	height: 60px;
}

#sources-stat .add-sources .divisive-fans {
	width: 250px;
	float: left;
	color: #f8931f;
	background-color: #f2f2f2;
	margin-bottom: 10px;
	height: 40px;
	line-height: 40px;
	text-align: center;
}









/* #sources-stat .add-sources .addclassify {
	        background-color: #f8931f;
	        color: #FFFFFF;
	        height: 50px;
	        line-height: 50px;
	        width: 160px;
	    } */


/* #sources-window .souce-text {
	        width: 70px;
	        height: 40px;
	        display: block;
	        float: left;
	        line-height: 40px;
	        margin-right: 10px;
	    } */
</style>