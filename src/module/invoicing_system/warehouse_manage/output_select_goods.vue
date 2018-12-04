<template>
	<div id="output-select-goods">
		<div class="title">
			<i></i>
			<h3>选择添加商品</h3>
		</div>
		<!-- <ul class="tebBox">
        <li v-for="(item,index) in tebData" @click="tebClick(index)" :key="index" :class="{active:tabactive==index}">{{item}}</li>
    </ul> -->
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
						<li>商品名</li>
						<li>条形码</li>
						<li>售价</li>
						<li>商品类型</li>
						<li>库存数量/重量</li>
						<li>批次数量</li>
					</div>
					<div v-if="show" class="select-item" v-for="(item,index) in sleList" :key="index">
						<div class="select-row">
							<li style="color:#ff3c04;" @click="delList(item,index)">删除</li>
							<li v-if="item.index<9">{{`0${index+1}`}}</li>
							<li v-else>{{index+1}}</li>
							<li>{{item.gName}}</li>
							<li>{{item.barCode}}</li>
							<li>{{item.price}}</li>
							<li>{{typeList[Number(item.type)+1]}}</li>
							<li v-if="item.goodsNum">{{item.goodsNum.surplus}}{{item.unit}}</li>
							<li v-else>--</li>
							<li v-if="item.goodsNum">{{item.goodsNum.batch}}</li>
							<li v-else>--</li>
						</div>
					</div>
					<div v-if="sleList.length == 0" id="emptyData">-----暂无条目-----</div>
				</div>
			</div>

			<div class="search-module">
				<input type="text" class="search-input" v-model="searchName" placeholder="请输入商品名">
				<input type="text" class="search-input" v-model="searchCode" placeholder="请输入条形码">
				<div class="search-select">
					<select-btn :sorts="typeList" :name="allGoods" @selOn="selectList" ref="select"></select-btn>
				</div>
				<div class="setspeen">
					<div class="blue filter" @click="search">筛选</div>
					<div class="gray reset" @click="reset">重置</div>
				</div>
			</div>

			<div class="table-select">
				<div class="select-title">
					商品列表
					<span class="circle"></span> 共
					<span class="select-num">{{listTotal}}</span> 个条目
				</div>
				<div class="select-body">
					<div class="select-head">
						<li>操作</li>
						<li>序号</li>
						<li>商品名</li>
						<li>条形码</li>
						<li>售价</li>
						<li>商品类型</li>
						<li>库存数量/重量</li>
						<li>批次数量</li>
					</div>
					<div class="select-item" v-for="(item,index) in goodsdetail" :key="index" :class="{'active':item.select}">
						<div class="select-row">
							<li v-if="item.select">已添加</li>
							<li v-if="!item.checkAdd&&!item.select" style="color:#27a8e0;" @click="addList(item,index)">添加</li>
							<li v-if="item.checkAdd&&!item.select" style="color:#cccccc;">添加</li>
							<li v-if="(index+1)+(page-1)*10<10">{{`0${index+1}`}}</li>
							<li v-else>{{(index+1)+(page-1)*10}}</li>
							<li>{{item.goodsName}}</li>
							<li>{{item.barCode||"--"}}</li>
							<li>{{item.price}}</li>
							<li>{{typeList[Number(item.type)+1]}}</li>
							<li v-if="item.goodsNum">{{item.goodsNum.surplus}}{{item.unit}}</li>
							<li v-else>--</li>
							<li v-if="item.goodsNum">{{item.goodsNum.batch}}</li>
							<li v-else>--</li>
						</div>
					</div>
					<div v-if="goodsdetail.length == 0" id="emptyData">-----暂无条目-----</div>
				</div>
			</div>
			<div class="page-box">
				<pageBtn @pageNum="pageChange" :isNoJump="false" :isNoPaging='true' :total="pageTotal" :page="page"></pageBtn>
			</div>
		</div>
		<!-- <selectSupplies v-show="tabactive == 1" :addBtn="true" :wid="wid" :sleSupplies="getSupplies" :type="true" ref="supplies"></selectSupplies> -->
	</div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			page: 1,
			selType: -1,
			goodsdetail: '',
			typeList: ['全部类型', '普通商品', '称重商品'],
			allGoods: '全部类型',
			pageTotal: 0,
			// tebData: ['商品', '物料'],
			// tabactive: 0,
			sleList: [], //选择的商品
			listTotal: 0,
			searchName: '',
			searchCode: '',
			// sleSupplies: '', //选择的物料
			num: 10,
			show: true
		};
	},
	props: ['sleCommodity', 'getSupplies', 'wid', 'addBtn'],
	methods: {
		async init() {
			let data = await http.inventoryGoodsList({
				data: {
					page: this.page,
					num: this.num,
					type: this.selType,
					goodsName: this.searchName,
					barCode: this.searchCode
				}
			});
			this.listTotal = data.count;
			this.goodsdetail = data.list;
			this.pageTotal = data.total;
			let arr = [];
			for(let item of this.goodsdetail) {
				arr.push(item.id);
			}
			if(arr.length > 0) {
				let resNum = await http.invent_getGoodsNum({
					data: {
						gids: arr.join(','),
						wid: this.wid ? this.wid : ''
					}
				});

				for(let i in this.goodsdetail) {
					for(let item of resNum) {
						if(this.goodsdetail[i].id == item.id) {
							this.goodsdetail[i].goodsNum = item;
						}
					}
					if(this.addBtn && (!resNum[i] || !resNum[i].batch || resNum[i].batch <= 0 || resNum[i].surplus <= 0)) {
						this.goodsdetail[i].checkAdd = true;
					}
				}
				this.goodsdetail = utils.deepCopy(this.goodsdetail);
			}
			this.checkSle();
			console.log(this.goodsdetail);
		},
		selectList(sel) {
			console.log(sel);
			this.selType = sel - 1;
		},
		addList(item) {
			//点击添加
			item.select = true;
			this.sleList.push(item);
		},
		checkSle() {
			for(let item of this.goodsdetail) {
				item.select = false;
			}
			for(let item of this.goodsdetail) {
				for(let sleItem of this.sleList) {
					if(item.id == sleItem.id) {
						item.select = true;
					}
				}
			}
		},
		delList(item, index) {
			//点击删除
			this.sleList.splice(index, 1);
			item.select = false;
			this.checkSle();
		},
		search() {
			this.page = 1;
			this.init();
		},
		reset() {
			//重置
			this.page = 1;
			this.searchName = '';
			this.searchCode = '';
			this.$refs.select.sortName = '全部类型';
			this.$refs.select.selected = 0;
			this.selType = -1;
			this.init();
		},
		pageChange(res) {
			this.page = res.page;
			this.init();
		},
		// tebClick(index) {
		//   this.tabactive = index;
		// }
	},
	mounted() {
		if(this.sleCommodity) this.sleList = this.sleCommodity;
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
		this.init();
	},
	components: {
		pageBtn: () =>
			import( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		selectBtn: () =>
			import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		// selectSupplies: () =>
		//   import(/*webpackChunkName: 'output_select_supplies'*/ './output_select_supplies')
	},
};
</script>
<style lang="less" scoped>
	@media only screen and (max-width:1250px) {
		.setspeen {
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
		.setspeen {
			display: inline-block;
		}
		.page-box {
			margin-top: 10px;
			padding-bottom: 30px
		}
		.search-module {
			padding-top: 16px;
			padding-bottom: 16px;
			.search-input {
				height: 40px;
				color: #a5a5a5;
				font-size: 14px;
				line-height: 40px;
				text-indent: 15px;
				padding: 0;
				outline: none;
				margin-right: 15px;
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
		.tebBox {
			display: inline-block;
			color: orange;
			margin-bottom: 20px;
			cursor: pointer;
			li {
				border: 1px orange solid;
				display: inline-block;
				padding: 10px 40px;
			}
			.active {
				background-color: orange;
				color: #ffffff;
			}
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