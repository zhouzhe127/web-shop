/* * @Author: zhouzhe * @Date: 2018-06-26 10:11:22 */
<template>
	<div id="jurdetail">
		<div class="topbox">
			<i></i>
			<h3 v-if="tabactive==0">查看同步详情</h3>
			<h3 v-else>权限指派详情</h3>
			<div class="dian" v-for="i in 72" :key="i"></div>
		</div>
		<div class="innerBox">
			<ul>
				<li>
					<span>方案名称：</span>
					<span>{{planName||"--"}}</span>
				</li>
			</ul>
			<ul>
				<li>
					<span>操作时间：</span>
					<span>{{getTime(createTime)}}</span>
				</li>
			</ul>
			<ul>
				<li>
					<span>操作人：</span>
					<span>{{createUName||"--"}}</span>
				</li>
			</ul>
		</div>
		<div class="table">
			<ul class="tabbutton" v-if="type==1">
				<li v-for="(item,index) in tebData" :class="{'active':index==tebIndex}" @click="tebClick(item,index)" :key="index">
					<span>{{item}}</span>
				</li>
			</ul>
			<div v-if="!showList">
				<com-table :titleData="titleList" :showHand="false" :allTotal="allTotal" :introData="listData">
				</com-table>
				<div class="page">
					<page-turn :total="total" :isNoJump="true" :num="num" :page="page" @pageNum="changePage"></page-turn>
				</div>
			</div>
			<div v-else>
				<div class="childBox" v-for="(item,i) in childBox" :key="i">
					<div class="inputBox" v-for="(list,index) in item" :key="index">
						<h1>{{list.name}}:</h1>
						<div class="right middle">{{list.selter}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	let logId = '';
	export default {
		data() {
			return {
				tebData: ['目标门店', '分类指派', '单位指派', '品牌指派', '物料指派', 'BOM单指派', '供应商指派'],
				typeList:['分类','单位','品牌','物料','BOM单','供应商'],
				titleList: [],
				allTotal: 0,
				listData: [],
				tebIndex: 0,
				total: 0,
				page: 1,
				num: 10,
				planName:'',
				createUName:'',
				createTime:'',
				type:1,
				tabactive:0,
				showList:false,
				allList:[],
				childBox: [
					[{
						name: '物料单位修改',
						bind:'updateUnit',
						selter: '关'
					},
					{
						name: '物料分类修改',
						bind:'updateCategory',
						selter: '关'
					},
					{
						name: '商品品牌修改',
						bind:'updateBrand',
						selter: '关'
					},
					{
						name: '物料修改',
						bind:'updateMaterial',
						selter: '关'
					},
					{
						name: '供应商修改',
						bind:'updateSupplier',
						selter: '关'
					},
					{
						name: 'BOM单修改',
						bind:'updateBom',
						selter: '关'
					}],
					[{
						name: '物料单位新建',
						bind:'createUnit',
						selter: '关'
					},
					{
						name: '物料分类新建',
						bind:'createCategory',
						selter: '关'
					},
					{
						name: '商品品牌新建',
						bind:'createBrand',
						selter: '关'
					},
					{
						name: '物料新建',
						bind:'createMaterial',
						selter: '关'
					},
					{
						name: '供应商新建',
						bind:'createSupplier',
						selter: '关'
					},
					{
						name: 'BOM单新建',
						bind:'createBom',
						selter: '关'
					}]
				],
			};
		},
		methods: {
			tebClick(item, index) {
				this.tebIndex = index;
				this.showList = false;
				let list = [{
					titleName: '目标门店',
					dataName: 'shopName'
				},
				{
					titleName: '类型',
					dataName: 'item'
				}, {
					titleName: '门店',
					dataName: 'shopName'
				},
				{
					titleName: '分类',
					dataName: 'item'
				},
				{
					titleName: '单位',
					dataName: 'item'
				},
				{
					titleName: '品牌',
					dataName: 'item'
				},
				{
					titleName: '物料',
					dataName: 'item'
				},
				{
					titleName: 'BOM单',
					dataName: 'item'
				},
				{
					titleName: '供应商',
					dataName: 'item'
				},
				{
					titleName: '指派内容',
					dataName: 'item'
				},
				{
					titleName: '结果',
					dataName: 'status'
				}];
				let sleArr = [];
				switch (item) {
					case '目标门店':
						sleArr = [list[0], list[1]];
						break;
					case '分类指派':
						sleArr = [list[2], list[3], list[10]];
						break;
					case '单位指派':
						sleArr = [list[2], list[4], list[10]];
						break;
					case '品牌指派':
						sleArr = [list[2], list[5], list[10]];
						break;
					case '物料指派':
						sleArr = [list[2], list[6], list[10]];
						break;
					case 'BOM单指派':
						sleArr = [list[2], list[7], list[10]];
						break;
					case '供应商指派':
						sleArr = [list[2], list[8], list[10]];
						break;
					case '异常':
						sleArr = [list[2], list[9], list[10]];
						break;	
					case '权限指派':
						this.showList = true;
						break;	
				}
				this.titleList = sleArr;
				if(this.tabactive==0)this.getList();
			},
			async nextinit() {
				let url = this.tabactive==0? 'InvoicingetAssignLogDetail':'InvoicingetAssignInventoryConfigLogDetail';
				let data = await http[url]({
					data: {
						logId: logId
					}
				});
				this.planName = data.planName;
				this.createUName = data.createUName;
				this.createTime = data.createTime;
				if(this.tabactive==1&&data.shop){
					data.shop.map(v=>{
						switch(Number(v.isChain)){
							case 0:
								v.item = '单店';
								break;
							case 1:
								v.item = '直营店';
								break;
							case 2:
								v.item = '加盟店';
								break;
							case 3:
								v.item = '品牌';
								break;			
						}
					});
					for(let item of this.childBox){
						for(let list of item){
							if(Number(data.plan[list.bind])==1) list.selter='开';
						}
					}
					this.allList=data.shop;
					this.total = Math.ceil(this.allList.length/this.num);
					this.listData = this.allList.slice((this.page-1)*this.num,this.page*this.num);
					this.tebClick('目标门店',0);
				}
			},
			async getList() {
				this.listData = [];
				let obj = {
					logId: logId,
					page: this.page,
					size: this.num
				};
				let url = this.type==1? 'InvoicingetAssignDetail':'InvoicingetAssignErrorDetail';
				if(this.type==1) Object.assign(obj,{'type':this.tebIndex});
				let data = await http[url]({
					data: obj
				});
				if(!data.list) return;
				if(this.tebIndex===0){
					let that = this;
					data.list.map(v=>{
						if(this.type==1){
							v.item=v.item==1?'直营店':'加盟店';
						}else{
							v.item= `${that.typeList[Number(v.type)-1]}:${v.item}`;
						}
					});
				}
				this.listData = data.list;
				this.total = data.total||0;
				this.allTotal = data.count||0;
			},
			changePage(data) {
				this.page = data.page;
				this.num = data.num;
				this.total = Math.ceil(this.allList.length/this.num);
				if(this.tabactive==0){
					this.getList();
				}else{
					this.listData = this.allList.slice((this.page-1)*this.num,this.page*this.num);
				}
				
			},
			getTime(time) {
				return utils.format(time, 'yyyy-MM-dd hh:mm');
			}
		},
		mounted() {
			console.log(11111);
			this.$store.commit('setPageTools', [{
				name: '返回',
				className: ['back'],
				fn: () => {
					window.history.go(-1);
				}
			}]);
			logId = this.$route.query.logId;
			this.type = this.$route.query.type;
			this.tabactive=this.$route.query.tabactive;
			if(this.tabactive==0){
				let name = this.type ==1?'目标门店':'异常';
				this.tebClick(name, 0);
			}else{
				this.tebData = ['目标门店','权限指派'];
			}
			this.nextinit();
			
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			pageTurn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		},
		// computed: {},
	};
</script>
<style lang='less' scoped>
	#jurdetail {
		.topbox {
			width: 100%;
			height: 40px;
			margin: 10px;
			line-height: 40px;
			position: relative;
			overflow: hidden;
			i {
				width: 2px;
				height: 28px;
				position: absolute;
				top: 6px;
				left: 0;
				background-color: #28a8e0;
			}
			h3 {
				height: 40px;
				margin-left: 10px;
				float: left;
				font-size: 16px;
			}
			.dian {
				width: 10px;
				height: 1px;
				border-top: 1px solid #e1e1e1;
				margin: 20px 5px;
				float: left;
			}
		}
		.innerBox {
			padding: 10px 0 20px 50px;
			ul {
				display: inline-block;
				width: 32%;
				vertical-align: top;
				li {
					margin-bottom: 15px;
					span {
						display: inline-block;
						max-width: 70%;
						line-height: 18px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
		.table {
			margin-top: 10px;
			.tabbutton {
				li {
					width: 105px;
					height: 35px;
					background-color: #e9e9e9;
					text-align: center;
					border-radius: 6px;
					display: inline-block;
					margin-right: 15px;
					cursor: pointer;
					line-height: 35px;
				}
				.active {
					background-color: #29abe2;
					color: #ffffff;
				}
			}
			.childBox {
				width: 35%;
				display: inline-block;
				.inputBox {
					height: 40px;
					margin-top: 15px;
					h1 {
						width: 130px;
						text-align: right;
						vertical-align: middle;
						display: inline-block;
					}
					.middle {
						vertical-align: middle;
					}
					.right {
						display: inline-block;
						margin-left: 10px;
					}
				}
			}
		}
	}
</style>