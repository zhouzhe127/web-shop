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
							<li v-if="item.goodsNum">{{item.goodsNum.surplus}}<span v-for="(unit,i) in item.unit" :key="i" v-if="unit.isMin==1">{{unit.name}}</span></li>
							<li v-else>--</li>
							<li v-if="item.goodsNum">{{item.goodsNum.batch}}</li>
							<li v-else>--</li>
						</div>
					</div>
					<div v-if="sleList.length == 0" id="emptyData">-----暂无条目-----</div>
				</div>
			</div>

			<div class="search-module">
				<div class="sleType">
					<el-input v-model="goodsName" placeholder="请输入物料名称"></el-input>
				</div>
				<div class="sleType">
					<el-select v-model="typeValue" placeholder="全部类型">
						<el-option v-for="item in typeCate" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="sleBtn">
					<select-store @emit="getDrop" :sorts="oneCate" :isSingle="true" :tipName="'请选择一级分类'"></select-store>
				</div>
				<div class="sleBtn" @click="checkOne">
					<select-store @emit="getNext" :sorts="twoCate" :isSingle="true" :tipName="'请选择二级分类'" ref="twosel"></select-store>
				</div>
				<div class="setSpeen">
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
							<li v-if="!item.checkAdd&!item.select" style="color:#27a8e0;" @click="addList(item,index)">添加</li>
							<li v-if="item.checkAdd&!item.select" style="color:#cccccc;">添加</li>
							<li v-if="(index+1)+(page-1)*10<10">{{`0${index+1}`}}</li>
							<li v-else>{{(index+1)+(page-1)*10}}</li>
							<li>{{item.name||'--'}}</li>
							<li>{{typeCate[Number(item.type)+1].label}}</li>
							<li>{{getString(item.cate,"name")}}</li>
							<li v-if="item.goodsNum">{{item.goodsNum.surplus}}<span v-for="(unit,i) in item.unit" :key="i" v-if="unit.isMin==1">{{unit.name}}</span></li>
							<li v-else>--</li>
							<li v-if="item.goodsNum">{{item.goodsNum.batch}}</li>
							<li v-else>--</li>
						</div>
					</div>
					<div v-if="goodsList.length == 0" id="emptyData">-----暂无条目-----</div>
				</div>
			</div>
			<div class="page-box">
				<pageBtn @pageNum="pageChange" :isNoJump="false" :isNoPaging='true' :total="pageTotal" :page="page"></pageBtn>
			</div>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
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
			goodsName: '',
			oneCate: [],
			twoCate: [],
			oneSle: '',
			twoSle: '',
			cataList: '', //分类列表
			listTotal: 0, //商品总数
			sinSle: [],
			show: true,
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
			typeValue:-1,
		};
	},
	props: ['type', 'sleSupplies', 'wid', 'addBtn'],
	methods: {
		async init() {
			let data = await http.getMaterialList({
				data: {
					page: this.page,
					name: this.goodsName,
					cid: this.twoSle ? this.twoSle.id ? this.twoSle.id : '' : this.oneSle.id ? this.oneSle.id : '',
					type:this.typeValue,
					num:10
				}
			});
			this.goodsList = data.list;
			this.pageTotal = data.total;
			this.listTotal = data.count;
			let arr = [];
			for(let item of this.goodsList) {
				arr.push(item.id);
			}
			if(arr.length > 0) {
				let resNum = await http.invoiv_getMaterialNum({
					data: {
						mids: arr.join(','),
						wid: this.wid ? this.wid : ''
					}
				});
				for(let i in this.goodsList) {
					for(let item of resNum) {
						if(this.goodsList[i].id == item.id) {
							this.goodsList[i].goodsNum = item;
						}
					}
					if(
						this.addBtn &&
						(!resNum[i] ||
							!resNum[i].batch ||
							resNum[i].batch <= 0 ||
							resNum[i].surplus <= 0)
					) {
						this.goodsList[i].checkAdd = true;
					}
				}
				this.goodsList = utils.deepCopy(this.goodsList);
			}
			this.checkSle();
		},
		async getCate() {
			let data = await http.invoiv_getCategoryList();
			this.cataList = data;
			for(let item of this.cataList) {
				if(item.pid == 0) this.oneCate.push(item);
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
		addList(item) {
			item.select = true;
			this.sleList.push(item);
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
			this.goodsName = '';
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
		}
	},
	async mounted() {
		console.log(this.sleSupplies);
		if(this.sleSupplies) {
			this.sleList = this.sleSupplies;
		}
		if(!this.type) {
			this.$store.commit('setPageTools', [{name: '确定',className: ['firstBtn wearhouse'],
				fn: () => {
					this.$store.commit('setPageTools',[]);
					this.$emit('select', this.sleList);
				}
			},
			{name: '取消',className: ['abrogate'],
				fn: () => {
					this.$store.commit('setPageTools',[]);
					this.$emit('select', false);
				}
			}]);
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
			padding-top: 16px;
			padding-bottom: 16px;
			.sleType{
				width: 170px;
				display: inline-block;
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
	
	.bounce-enter-active {
		animation: bounce-in 0.5s;
	}
	
	.bounce-leave-active {
		animation: bounce-out 0.5s;
	}
	
	@keyframes bounce-in {
		0% {
			height: 0;
		}
		100% {
			height: auto;
		}
	}
	
	@keyframes bounce-out {
		0% {
			height: auto;
		}
		100% {
			height: 0px;
		}
	}
</style>