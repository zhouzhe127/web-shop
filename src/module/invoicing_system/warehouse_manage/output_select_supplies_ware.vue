<template>
	<div id="output-select-goods">
		<div class="title">
			<i></i>
			<h3>选择添加物料</h3>
		</div>
		<div>
			<div class="table-select">
				<div class="select-title">
					货品信息
					<span class="circle"></span> 共
					<span class="select-num">{{sleList.length}}</span> 个条目
					<a class="packUp" @click="show=!show">
						{{show?'收起':'展开'}}
					</a>
				</div>
				<el-table :data="sleList" stripe border style="width:100%" :header-cell-style="{'background-color':'#f5f7fa'}">
					<el-table-column width="100" fixed="left" label="操作">
						<template slot-scope="scope">
							<el-button type="text" @click="delList(scope.row,scope.$index)" class="danger-color">删除</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="物料名称" min-width="200">
					</el-table-column>
					<el-table-column prop="barCode" label="物料编码" min-width="200">
					</el-table-column>
					<el-table-column label="类型" width="150">
						<template slot-scope="scope">
							{{typeCate[Number(scope.row.type)+1].label}}
						</template>
					</el-table-column>
					<el-table-column label="分类" min-width="200">
						<template slot-scope="scope">
							{{getString(scope.row.cate,"name")}}
						</template>
					</el-table-column>
					<el-table-column label="库存数量/重量" min-width="200">
						<template slot-scope="scope">
							{{setUnit(scope.row.surplus,scope.row.unit)}}
						</template>
					</el-table-column>
					<el-table-column label="批次数量" width="150">
						<template slot-scope="scope">
							{{scope.row.batch}}
						</template>
					</el-table-column>
				</el-table>
			</div>

			<div class="search-module">
				<div class="sleType">
					<el-input v-model="mName" placeholder="请输入物料名称"></el-input>
				</div>
				<div class="sleType">
					<el-input v-model="barCode" placeholder="请输入物料编码"></el-input>
				</div>
				<div class="sleType">
					<el-select v-model="typeValue" placeholder="全部类型">
						<el-option v-for="item in typeCate" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="sleType">
					<el-cascader
						class="el-size"
						:options="oneSort"
						v-model="cidSel"
						@change="getSortSel"
						change-on-select>
					</el-cascader>
				</div>
				<div class="sleType">
					<el-button type="primary" @click="search">筛选</el-button>
					<el-button type="info" @click="reset">重置</el-button>
				</div>
			</div>

			<div class="table-select">
				<div class="select-title">
					物料列表
					<span class="circle"></span> 共
					<span class="select-num">{{listTotal}}</span> 个条目
				</div>
				<el-table :data="goodsList" stripe border style="width:100%" :header-cell-style="{'background-color':'#f5f7fa'}">
					<el-table-column width="100" fixed="left" label="操作">
						<template slot-scope="scope">
							<el-button type="text" v-if="scope.row.select" style="color:#999">已添加</el-button>
							<el-button type="text" @click="addList(scope.row,scope.$index)" 
							v-if="!scope.row.select" 
							:disabled="scope.row.surplus<=0">添加</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="物料名称" min-width="200">
					</el-table-column>
					<el-table-column prop="barCode" label="物料编码" min-width="200">
					</el-table-column>
					<el-table-column label="类型" width="150">
						<template slot-scope="scope">
							{{typeCate[Number(scope.row.type)+1].label}}
						</template>
					</el-table-column>
					<el-table-column label="分类" min-width="200">
						<template slot-scope="scope">
							{{getString(scope.row.cate,"name")}}
						</template>
					</el-table-column>
					<el-table-column label="库存数量/重量" min-width="200">
						<template slot-scope="scope">
							{{setUnit(scope.row.surplus,scope.row.unit)}}
						</template>
					</el-table-column>
					<el-table-column label="批次数量" width="150">
						<template slot-scope="scope">
							{{scope.row.batch}}
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="page-box">
				<el-pagination @current-change="pageChange"
					:current-page="page"
					background
					layout="prev, pager, next"
					:page-count="pageTotal">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import global from 'src/manager/global';
export default {
	data() {
		return {
			page: 1,
			selType: 0,
			goodsList: [],
			pageTotal: 0,
			num: 10,
			tebData: ['物料'],
			sleList: [], //选择的物料
			mName: '',
			barCode:'',
			oneSort:[],//一级分类列表
			cid:'',//分类id
			cidSel:[''],//选中的分类id
			cataList: '', //分类列表
			listTotal: 0, //商品总数
			sinSle: [],
			show: true,
			typeValue:-1,
			typeCate: [
				{value:-1,label:'全部类型'},
				{value:0,label:'成品'},
				{value:1,label:'半成品'},
				{value:2,label:'普通物料'},
			],
		};
	},
	/*
	 *dstShopId出货方店铺ID
	 *srcShopId入货方店铺ID
	 */
	props: ['type', 'sleSupplies', 'wid', 'addBtn', 'dstShopId', 'srcShopId', 'shopId'],
	methods: {
		//获取最小单位名称
		getMinUnit(item){
			return item.unit.filter((res)=>{
				return res.isMin==1;
			})[0].name;
		},
		async init() {
			let data = await http.whGetInventoryMaterialList({
				data: {
					wid: this.wid,
					page: this.page,
					num: this.num,
					name: this.mName,
					cid: this.cid,
					shopId: this.shopId,
					type:this.typeValue,
					barCode:this.barCode,
				}
			});
			this.goodsList = data.list;
			this.pageTotal = Number(data.total);
			this.listTotal = Number(data.count);
			this.checkSle();
		},
		async getCate(){//获取一二级分类
			let data = await http.invoiv_getCategoryList();
			let one = [];
			for(let item of data){
				if(item.pid == 0){
					one.push({value:item.id,label:item.name,children:[]});
				}
			}
			one.unshift({value:'',label:'全部分类'});
			this.oneSort = one;
			for(let one of this.oneSort){
				let two = [];
				for(let item of data){
					if(one.value==item.pid){
						two.push({value:item.id,label:item.name});
					}
				}
				if(two.length){
					one.children = two;
				}else{
					delete one.children;
				}
			}
		},
		getSortSel(res){
			if(res.length>1){
				this.cid = res[1];
			}else{
				this.cid = res[0];
			}
		},
		checkIn() {
			let sleArr = [];
			for(let i in this.sleSupplies) {
				if(this.sleSupplies[i].noPrev) {
					this.sinSle.push(this.sleSupplies[i]);
				} else {
					sleArr.push(this.sleSupplies[i]);
				}
			}
			this.sleList = sleArr;
		},
		checkSle() {
			for(let item of this.goodsList) {
				this.$set(item,'select',false);
			}
			for(let item of this.goodsList) {
				for(let sleItem of this.sleList) {
					if(item.id == sleItem.id) {
						item.select = true;
					}
				}
				for(let sleItem of this.sinSle) {
					if(item.id == sleItem.id) {
						item.select = true;
					}
				}
			}
		},
		setUnit(num, unit) { //单位计算
			let def = '',
				min = '',
				value = 1;
			for(let item of unit) {
				if(item.isMin == 1) { //最小单位
					min = item.name;
					if(item.isDefault == 1) { //默认单位
						def = item.name;
						value = item.value;
					}
				} else if(item.isDefault == 1) { //默认单位
					def = item.name;
					value = item.value;
				}
			}
			//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
			return global.comUnit(num, value, def, min);
		},
		getString(arr, key) {
			if(typeof arr == 'string' || !arr) {
				return arr;
			} else {
				let res = [];
				for(let item of arr) {
					res.push(item[key]);
				}
				return res.join(',');
			}
		},
		selectList(sel) {
			this.selType = sel - 1;
		},
		pageChange(res) {
			this.page = res;
			this.init();
		},
		tebClick(index) {
			this.tabactive = index;
		},
		async addList(item) {
			if(item.surplus<=0){
				this.alert('该商品库存数量不足');
				return;
			}
			let check = await this.checkGoods(item);
			if(check) {
				item.select = true;
				this.sleList.push(item);
			}
		},
		delList(item, index) {
			this.sleList.splice(index, 1);
			item.select = false;
			this.checkSle();
		},
		//搜索
		search() {
			this.page = 1;
			this.init();
		},
		//重置
		reset() {
			this.page = 1;
			this.mName = '';
			this.oneSle = '';
			this.twoSle = '';
			this.barCode = '';
			this.typeValue = -1;
			this.cidSel = [''];
			this.cid = '';
			this.init();
		},
		alert(con, title) {
			this.$store.commit('setWin', {
				title: title,
				content: con
			});
		},
		async checkGoods(res) { //匹配物料
			let obj = {
				material: [{
					id: res.id,
					name: res.name,
					barCode: res.barCode,
				}]
			};
			let data = await http.invoic_getMatchItemList({
				data: {
					itemList: obj,
					srcShopId: this.srcShopId,
					dstShopId: this.dstShopId
				}
			});
			if(data.material && data.material.length > 0) {
				return true;
			} else {
				this.alert('出入货物料不匹配');
			}
		}
	},
	async mounted() {
		if(this.sleSupplies) {
			this.sleList = this.sleSupplies;
		}
		if(!this.type) {
			let arr = [
				{name: '取消',className: 'info',type:1,
					fn: () => {
						this.$store.commit('setFixButton',[]);
						this.$emit('select', false);
					}
				},
				{name: '确定',className: 'primary',type:1,
					fn: () => {
						this.$store.commit('setFixButton',[]);
						this.$emit('select', this.sleList);
					}
				},
			];
			this.$store.commit('setFixButton',arr);
		}
		this.getCate();
		this.init();
		await this.checkIn();
	},
	components: {
		pageBtn: () =>
			import( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		selectBtn: () =>
			import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		selectStore: () =>
			import( /*webpackChunkName: 'page'*/ 'src/components/select_store')
	},
};
</script>
<style lang="less" scoped>
	.danger-color{color: #d34a2b;}
	#output-select-goods {
		.title {
			width: 98%;
			height: 20px;
			margin-bottom: 15px;
			position: relative;
			overflow: hidden;
			border-left: 3px solid #E1BB4A;
			h3 {
				height: 40px;
				margin-left: 10px;
				float: left;
				font-size: 16px;
				font-family: "微软雅黑";
			}
		}
		.table-head {
			list-style: none;
			text-align: center;
			flex: 1;
		}
		.search-module {
			.sleType{
				width: 200px;
				display: inline-block;
				margin-right: 10px;
				margin-bottom: 20px;
			}
			padding-top: 20px;
			.search-input {
				height: 40px;
				font-size: 14px;
				line-height: 40px;
				text-indent: 15px;
				padding: 0;
				outline: none;
				margin-right: 15px;
			}
			.sleBtn {
				display: inline-block;
				margin-right: 20px;
			}
			.search-select {
				display: inline-block;
				margin-right: 15px;
			}
			.search-btn {
				width: 100px;
				height: 40px;
				line-height: 40px;
				color: #fff;
				font-size: 16px;
				margin-right: 10px;
				display: inline-block;
				text-align: center;
			}
			.filter,
			.reset {
				.search-btn;
			}
		}
		.table-select {
			.select-title {
				height: 50px;
				line-height: 50px;
				padding-left: 20px;
				font-size: 16px;
				color: #333;
				border: 1px solid #ebeef5;
				border-bottom: 0;
				.packUp {
					cursor: pointer;
					color: #5ebee8;
					text-decoration: underline;
				}
				.circle {
					display: inline-block;
					width: 4px;
					height: 4px;
					border: 1px solid #333;
					border-radius: 50%;
					margin: 0 15px;
					background-color: #333;
					vertical-align: middle;
					margin-top: -4px;
				}
				.select-num {
					color: #ff3c04;
					font-size: 16px;
				}
			}
		}
		.page-box {
			margin-top: 10px;
			padding-bottom: 30px;
		}
	}
</style>