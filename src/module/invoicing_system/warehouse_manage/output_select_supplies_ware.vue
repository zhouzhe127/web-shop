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
				<div class="select-body">
					<div class="select-head">
						<li>操作</li>
						<li>序号</li>
						<li>物料名称</li>
						<li>类型</li>
						<li>分类</li>
						<li>库存数量/重量</li>
						<li>批次数量</li>
					</div>
					<div v-if="show" class="select-item" v-for="(item,index) in sleList" :key="index">
						<div class="select-row">
							<li style="color:#ff3c04;" @click="delList(item,index)">删除</li>
							<li v-if="index<9">{{`0${index+1}`}}</li>
							<li v-else>{{index+1}}</li>
							<li>{{item.name}}</li>
							<li>{{typeCate[Number(item.type)+1].label}}</li>
							<li>{{getString(item.cate,"name")}}</li>
							<li>{{setUnit(item.surplus,item.unit)}}</li>
							<li>{{item.batch}}</li>
						</div>
					</div>
					<div v-if="sleList.length == 0" id="emptyData">-----暂无条目-----</div>
				</div>
			</div>

			<div class="search-module">
				<div class="inline-box">
					<!-- <input type="text" class="search-input" v-model="mName" placeholder="请输入物料名称"> -->
					<div class="sleType">
						<el-input v-model="mName" placeholder="请输入物料名称"></el-input>
					</div>
					<div class="sleType">
						<el-select v-model="typeValue" placeholder="全部类型">
							<el-option v-for="item in typeCate" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
					<div class="sleBtn">
						<select-store @emit="getDrop" :sorts="oneCate" :isSingle="true" :tipName="'请选择一级分类'"></select-store>
					</div>
				</div>
				<div class="inline-box sleBtn" @click="checkOne">
					<select-store @emit="getNext" :sorts="twoCate" :isSingle="true" :tipName="'请选择二级分类'" ref="twosel"></select-store>
				</div>
				<div class="inline-box setSpeen">
					<div @click="search" class="blue filter">筛选</div>
					<div @click="reset" class="gray reset">重置</div>
				</div>
			</div>

			<div class="table-select">
				<div class="select-title">
					物料列表
					<span class="circle"></span> 共
					<span class="select-num">{{listTotal}}</span> 个条目
				</div>
				<div class="select-body">
					<div class="select-head">
						<li>操作</li>
						<li>序号</li>
						<li>物料名称</li>
						<li>类型</li>
						<li>分类</li>
						<li>库存数量/重量</li>
						<li>批次数量</li>
					</div>
					<div class="select-item" v-for="(item,index) in goodsList" :key="index" :class="{'active':item.select}">
						<div class="select-row">
							<li v-if="item.select">已添加</li>
							<li v-if="!item.select && item.surplus>0" @click="addList(item,index)" class="add">添加</li>
							<li v-if="item.surplus<=0" @click="addEmpty" class="surplus-empty">添加</li>
							<li v-if="(index+1)+(page-1)*10<10">{{`0${index+1}`}}</li>
							<li v-else>{{(index+1)+(page-1)*10}}</li>
							<li>{{item.name||'--'}}</li>
							<li>{{typeCate[Number(item.type)+1].label}}</li>
							<li>{{getString(item.cate,"name")}}</li>
							<li>{{setUnit(item.surplus,item.unit)}}</li>
							<li>{{item.batch}}</li>
						</div>
					</div>
					<div v-if="goodsList.length == 0" id="emptyData">-----暂无条目-----</div>
				</div>
			</div>
			<div class="page-box">
				<pageBtn @pageNum="pageChange" :isNoPaging="false" :isNoJump="true" :total="pageTotal" :page="page"></pageBtn>
			</div>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import global from 'src/manager/global';
export default {
	data() {
		return {
			page: 1,
			selType: 0,
			goodsList: '',
			allGoods: '全部类型',
			pageTotal: 0,
			num: 10,
			tebData: ['物料'],
			sleList: [], //选择的物料
			mName: '',
			oneCate: [],
			twoCate: [],
			oneSle: '',
			twoSle: '',
			cataList: '', //分类列表
			listTotal: 0, //商品总数
			sinSle: [],
			show: true,
			typeValue:-1,
			typeCate: [{
				value:-1,
				label:'全部类型'
			},{
				value:0,
				label:'成品'
			},{
				value:1,
				label:'半成品'
			},{
				value:2,
				label:'普通物料'
			}],
		};
	},
	/*
	 *dstShopId出货方店铺ID
	 *srcShopId入货方店铺ID
	 */
	props: ['type', 'sleSupplies', 'wid', 'addBtn', 'dstShopId', 'srcShopId', 'shopId'],
	methods: {
		async init() {
			let data = await http.whGetInventoryMaterialList({
				data: {
					wid: this.wid,
					page: this.page,
					num: this.num,
					name: this.mName,
					cid: this.twoSle ? this.twoSle.id ? this.twoSle.id : '' : this.oneSle.id ? this.oneSle.id : '',
					shopId: this.shopId,
					type:this.typeValue,
				}
			});
			this.goodsList = data.list;
			this.pageTotal = Number(data.total);
			this.listTotal = Number(data.count);
			this.checkSle();
		},
		async getCate() {
			let data = await http.invoiv_getCategoryList();
			this.cataList = data;
			for(let item of this.cataList) {
				if(item.pid == 0) this.oneCate.push(item);
			}
		},
		addEmpty() {
			this.alert('该商品库存数量不足');
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
				item.select = false;
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
			this.page = res.page;
			this.init();
		},
		tebClick(index) {
			this.tabactive = index;
		},
		checkOne() {
			if(this.oneSle.length == 0) {
				this.$refs.twosel.sortShow = false;
				this.alert('请选择一级分类');
			}
		},
		async addList(item) {
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
		search() {
			//搜索
			this.init();
		},
		reset() {
			//重置
			this.page = 1;
			this.mName = '';
			this.oneSle = '';
			this.twoSle = '';
			this.typeValue = -1;
			for(let item of this.oneCate) {
				item.selected = false;
			}
			this.oneCate = utils.deepCopy(this.oneCate);
			for(let item of this.twoCate) {
				item.selected = false;
			}
			this.twoCate = utils.deepCopy(this.twoCate);
			this.init();
		},
		getDrop(sle) {
			for(let i in sle) {
				if(sle[i].selected) {
					this.oneSle = sle[i];
					break;
				} else {
					this.oneSle = '';
				}
			}
			this.twoCate = [];
			for(let i in this.cataList) {
				if(this.cataList[i].pid == this.oneSle.id)
					this.twoCate.push(this.cataList[i]);
			}
		},
		getNext(sle) {
			for(let i in sle) {
				if(sle[i].selected) {
					this.twoSle = sle[i];
					break;
				} else {
					this.twoSle = '';
				}
			}
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
					name: res.name
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
			this.$store.commit('setPageTools', [
				{name: '确定',className: ['firstBtn wearhouse'],
					fn: () => {
						this.$store.commit('setPageTools', []);
						this.$emit('select', this.sleList);
					}
				},
				{name: '取消',className: ['abrogate'],
					fn: () => {
						this.$store.commit('setPageTools', []);
						this.$emit('select', false);
					}
				}
			]);
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
	@media only screen and (max-width:1110px) {
		.setSpeen {
			margin-top: 10px;
			display: block;
		}
	}
	
	#output-select-goods {
		.title {
			width: 98%;
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
				background-color: #f8941f;
			}
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
		.setSpeen {
			display: inline-block;
		}
		.search-module {
			.inline-box {
				display: inline-block;
				padding-top: 15px;
			}
			.sleType{
				width: 170px;
				display: inline-block;
				margin-right: 15px;
			}
			padding-bottom: 15px;
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
			border: 1px solid #ccc;
			.select-title {
				height: 50px;
				line-height: 50px;
				padding-left: 20px;
				font-size: 16px;
				color: #333;
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
			.select-head {
				background-color: #f2f2f2;
				overflow: auto;
				display: flex;
				justify-content: space-between;
				li {
					.table-head;
					line-height: 40px;
					height: 40px;
					font-size: 16px;
					color: #43414a;
				}
			}
			.active {
				background-color: #cccccc;
				border-bottom: 1px #fff solid;
			}
			.select-item {
				.select-row {
					overflow: auto;
					border-bottom: 1px #ccc solid;
					display: flex;
					justify-content: space-between;
					li {
						.table-head;
						height: 70px;
						line-height: 70px;
						font-size: 14px;
						color: #666666;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						&:first-child {
							font-size: 16px;
							cursor: pointer;
						}
					}
					.add {
						color: #29abe2;
					}
					.surplus-empty {
						color: #999;
					}
				}
			}
		}
		.page-box {
			margin-top: 10px;
			padding-bottom: 30px;
		}
		#emptyData {
			margin: 0 auto;
			text-align: center;
			height: 50px;
			line-height: 50px;
			color: orange;
		}
	}
</style>