<!--
	**桌台管理
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="table-show">
		<section>
			<el-table ref="multipleTable" stripe :header-cell-style = "{'background-color':'#f5f7fa'}" :data="showTableList" border style="width:90%">
				<el-table-column show-overflow-tooltip min-width = "120" align="center" label="操作">
					<template slot-scope="scope">
						<span style="color: #FE8D2C;cursor:pointer" @click="edit(scope.row)">编辑</span>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<span style="color: #FD3F1F;cursor:pointer" @click="del(scope.row)">删除</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip min-width = "80" align="center" prop="sort" label="排序"></el-table-column>
				<el-table-column show-overflow-tooltip min-width = "120"  align="center" prop="tableName"  label="桌台名称"> </el-table-column>
				<el-table-column show-overflow-tooltip min-width = "120" align="center" prop="areaName" label="区域名称"></el-table-column>
				<el-table-column show-overflow-tooltip min-width = "80"  align="center" prop="normalSeat"  label="默认席位"> </el-table-column>
				<el-table-column show-overflow-tooltip min-width = "80"  align="center" prop="minSeat"  label="最少容纳(位)"> </el-table-column>
				<el-table-column show-overflow-tooltip min-width = "80"  align="center" prop="maxSeat"  label="最多容纳(位)"> </el-table-column>
				<el-table-column  min-width="80" align="center" label="二维码">
					<template slot-scope="scope">
						<span class="table-code">
							<a :href="host+'table/createTableCode?format=json&tableId=' + scope.row.id +'&shopId=' + userData.currentShop.id+ '&areaName='+scope.row.areaName+'&tableName='+scope.row.tableName+'&token='+userData.accessToken"></a>
						</span>
					</template>
				</el-table-column>
			</el-table>
		</section>
		<section style="margin-top: 10px">
			<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="page" :page-size = "num"
						   layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
		</section>


		<!--<ul class="tas-variety" v-cloak>-->
			<!--<li v-on:click="add">-->
				<!--<span>-->
					<!--<img src="../../res/images/comadd.png" alt="添加" style="margin-top: 30px;opacity:0.5;" />-->
				<!--</span>-->
				<!--新建桌台-->
			<!--</li>-->
			<!--<li v-for="(item,i) in tableList" class="taste-list" v-on:click="edit(item.id,i)" :key="i">-->
				<!--<div class="divOne"></div>-->
				<!--<div class="divThree">-->
					<!--<span class="spanName" :class="{'width200':i+1<10,'width180':(i+1)<100&&(i+1)>=10,'width140':i+1>=100}">{{item.areaName}} - {{item.tableName}}</span>-->
					<!--<span class="spanIndex">{{i+1}}</span>-->
				<!--</div>-->
				<!--<div class="divFro">-->
					<!--<span> 默认席位：{{item.normalSeat}}</span>-->
				<!--</div>-->
				<!--<div class="divTwo">-->
					<!--<div class="jobDiv">-->
						<!--<div>-->
							<!--最少容纳(位)-->
						<!--</div>-->
						<!--<div class="divAll">-->
							<!--{{item.minSeat}}-->
						<!--</div>-->
					<!--</div>-->
					<!--<div class="telDiv">-->
						<!--<div>-->
							<!--最多容纳（位）-->
						<!--</div>-->
						<!--<div class="divAll">-->
							<!--{{item.maxSeat}}-->
						<!--</div>-->
						<!--<section class="table-code" @click="doji($event)">-->
							<!--<a :href="host+'table/createTableCode?format=json&tableId=' + item.id +'&shopId=' + userData.currentShop.id+ '&areaName='+item.areaName+'&tableName='+item.tableName+'&token='+userData.accessToken"></a>-->
						<!--</section>-->
					<!--</div>-->
				<!--</div>-->
			<!--</li>-->
		<!--</ul>-->

		<tableWin v-if="showWin" @throwWinResult="doThrowWinResult" :isAdd="isAdd"  :tableId="tableId"
				   :userData="userData" :tableDetial="tableDetial" :Area="Area">
		</tableWin>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import global from 'src/manager/global';

export default {
	data() {
		return {
			host: global.host.shop,
			Area: [], //区域列表
			tableList:[], //桌台列表
			userData: Object,
			isAdd: true, //是否是添加，true为是
			showWin: false,
			tableId: '', //桌台id

			tableDetial:null,//桌台详细信息

			num: 10, //一页处理多少数据
			total: 0, //总页数
			page: 1, //当前第几页
			showTableList:[],//展示的桌台列表
		};
	},
	created(){
		let arr = [{name:'新建桌台',className:'pick',fn:()=>{
			this.add();
		}}];
		this.$store.commit('setPageTools',arr);
		this.userData = storage.session('userShop');
		this.init();
		this.getArea();
	},
	methods: {
		//删除
		del(item){
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: `确定删除桌台${item.tableName}?`,
				callback: delRes => {
					if (delRes == 'ok') {
						this.deleteTable(item);
					}
				}
			});
		},
		//删除桌台
		async deleteTable(item) {
			let res = await http.deleteTable({
				data: {
					shopId: this.userData.currentShop.id,
					id:item.id
				}
			});
			if (res) {
				for(let j=0;j<this.tableList.length;j++){
					if(this.tableList[j].id==item.id){
						this.tableList.splice(j,1);
						break;
					}
				}
				this.paging();
			}
		},
		//分页
		paging() {
			this.total = Math.ceil(this.tableList.length / this.num); //获取总页数
			this.showTableList = this.tableList.slice((this.page - 1) * this.num, (this.page - 1) * this.num + this.num
			); //截取当前页数据
		},
		//每页显示几条数据
		numChange(e){
			this.num=e;
			this.paging();
		},
		//切换到第几页
		pageClick(e){
			this.page=e;
			this.paging();
		},
		//桌台列表
		async init() {
			let res = await http.getTableList({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.tableList = res;
				this.sortList();
				this.paging();
			}
		},
		//得到区域列表
		async getArea() {
			let res = await http.getArea({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.Area = res;
			}
		},
		//添加
		add() {
			this.isAdd = true;
			this.showWin = true;
		},
		//编辑
		async edit(item) {
			console.log(item);
			this.isAdd = false;
			this.tableId = item.id;
			this.tableDetial=utils.deepCopy(item);
			this.tableDetial.id=this.tableDetial.id+'';
//			this.tableDetial = await http.getTableInfo({
//				data: {
//					shopId: this.userData.currentShop.id,
//					id: this.tableId
//				}
//			});
			this.showWin = true;
		},
		doThrowWinResult(res,data) {
			console.log(data);
			if (res == 'ok') {
				if(this.isAdd){ //添加
					for (let i = 0; i < data.length; i++) {
						this.tableList.push(data[i]);
					}
				}else { //编辑
					for(let j=0;j<this.tableList.length;j++){
						if(this.tableList[j].id==this.tableId){
							this.tableList.splice(j,1,data);
							break;
						}
					}
				}
				this.sortList();
				this.paging();
				this.showWin = false;
			} else if (res == 'cancel') {
				if (!this.isAdd) { //删除
					for(let j=0;j<this.tableList.length;j++){
						if(this.tableList[j].id==data){
							this.tableList.splice(j,1);
							break;
						}
					}
					this.paging();
				}
				this.showWin = false;
			} else if (res == 'close') {
				this.showWin = false;
			}
		},
		//排序
		sortList() {
			this.tableList = utils.sortByAll(
				this.tableList,
				['sort', 'id'],
				true
			);
		}
	},
	components: {
		tableWin: () =>
			import(/*webpackChunkName: "table_manage_win"*/ './table_manage_win')
	}
};
</script>

<style scoped lang="less">
#table-show {
	/*padding-top: 30px;*/
	/*ul.tas-variety {*/
		/*li {*/
			/*&:first-child {*/
				/*width: 300px;*/
				/*height: 200px;*/
				/*float: left;*/
				/*margin-right: 15px;*/
				/*text-align: center;*/
				/*margin-bottom: 15px;*/
				/*color: #b3b3b3;*/
				/*cursor: pointer;*/
				/*font-size: 22px;*/
				/*line-height: 16px;*/
				/*border: 1px #b3b3b3 solid;*/
				/*span {*/
					/*display: block;*/
					/*margin-top: 20px;*/
					/*margin-bottom: 10px;*/
				/*}*/
			/*}*/
		/*}*/
		/*.taste-list {*/
			/*width: 300px;*/
			/*height: 200px;*/
			/*background-color: #f2f2f2;*/
			/*float: left;*/
			/*margin-right: 15px;*/
			/*margin-bottom: 15px;*/
			/*color: #333333;*/
			/*cursor: pointer;*/
			/*.divOne {*/
				/*background-color: #6cc2e6;*/
				/*height: 8px;*/
			/*}*/
			/*.divThree {*/
				/*position: relative;*/
				/*margin-left: 20px;*/
				/*.spanName {*/
					/*float: left;*/
					/*margin: 30px 0 30px 0;*/
					/*font-size: 26px;*/
					/*text-overflow: ellipsis;*/
					/*overflow: hidden;*/
					/*white-space: nowrap;*/
				/*}*/
				/*.spanIndex {*/
					/*float: right;*/
					/*margin: 20px 15px 30px 0;*/
					/*font-size: 72px;*/
					/*color: #cbe3ee;*/
				/*}*/
				/*.width180 {*/
					/*width: 180px;*/
				/*}*/
				/*.width140 {*/
					/*width: 135px;*/
				/*}*/
				/*.width200 {*/
					/*width: 220px;*/
				/*}*/
			/*}*/
			/*.divFro {*/
				/*float: left;*/
				/*margin-left: 20px;*/
				/*span {*/
					/*font-size: 17px;*/
					/*color: #333333;*/
				/*}*/
			/*}*/
			/*.divTwo {*/
				/*margin-left: 20px;*/
				/*clear: both;*/
				/*.jobDiv {*/
					/*display: inline-block;*/
					/*font-size: 14px;*/
					/*width: 120px;*/
					/*border-right: 1px solid #d2d2d2;*/
				/*}*/
				/*.telDiv {*/
					/*display: inline-block;*/
					/*margin: 0 15px 0 20px;*/
					/*position: relative;*/
					/*.table-code {*/
						/*width: 30px;*/
						/*height: 30px;*/
						/*float: right;*/
						/*position: absolute;*/
						/*background-image: url(../../res/images/code.png);*/
						/*background-size: 30px 30px;*/
						/*top: 25px;*/
						/*right: -10px;*/
						/*a {*/
							/*width: 100%;*/
							/*height: 100%;*/
						/*}*/
						/*&:hover {*/
							/*background-image: url(../../res/images/downcode.png);*/
						/*}*/
					/*}*/
				/*}*/
				/*.divAll {*/
					/*margin-top: 10px;*/
					/*font-size: 18px;*/
				/*}*/
			/*}*/
		/*}*/
	/*}*/
	.table-code {
		width: 30px;
		height: 30px;
		background-image: url(../../res/images/code.png);
		background-size: 30px 30px;
		display: inline-block;
		a {
		width: 100%;
		height: 100%;
		}
		&:hover {
			background-image: url(../../res/images/downcode.png);
		}
	}
}
</style>