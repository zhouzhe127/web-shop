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
						<template slot-scope="scope" v-if="scope.row.goodsNum">
							{{scope.row.goodsNum.surplus}}{{getMinUnit(scope.row)}}
						</template>
					</el-table-column>
					<el-table-column label="批次数量" width="150">
						<template slot-scope="scope" v-if="scope.row.goodsNum">
							{{scope.row.goodsNum.batch}}
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="search-module">
				<div class="sleType">
					<el-input v-model="goodsName" placeholder="请输入物料名称"></el-input>
				</div>
				<div class="sleType">
					<el-input v-model="barCode" placeholder="请输入物料编码"></el-input>
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
							v-if="!scope.row.checkAdd&!scope.row.select"
							:disabled="scope.row.checkAdd && !scope.row.select">添加</el-button>
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
						<template slot-scope="scope" v-if="scope.row.goodsNum">
							{{scope.row.goodsNum.surplus}}{{getMinUnit(scope.row)}}
						</template>
					</el-table-column>
					<el-table-column label="批次数量" width="150">
						<template slot-scope="scope" v-if="scope.row.goodsNum">
							{{scope.row.goodsNum.batch}}
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
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				page: 1,
				selType: 0,
				goodsList: [],
				allGoods: '全部类型',
				pageTotal: 0,
				num: 10,
				tebData: ['物料'],
				sleList: [], //选择的物料
				goodsName: '',
				barCode:'',
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
			//获取最小单位名称
			getMinUnit(item){
				return item.unit.filter((res)=>{
					return res.isMin==1;
				})[0].name;
			},
			async init() {
				let data = await http.getMaterialList({
					data: {
						page: this.page,
						name: this.goodsName,
						cid: this.twoSle ? this.twoSle.id ? this.twoSle.id : '' : this.oneSle.id ? this.oneSle.id : '',
						type:this.typeValue,
						num:10,
						barCode:this.barCode,
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
							this.$set(this.goodsList[i],'checkAdd',true);
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
				this.page = 1;
				this.init();
			},
			reset() {
				//重置
				this.page = 1;
				this.goodsName = '';
				this.oneSle = '';
				this.twoSle = '';
				this.barCode = '';
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
		@media only screen and (max-width:1110px) {
			.setSpeen {
				margin-top: 10px;
				display: block;
			}
		}
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
					height: 20px;
					line-height: 20px;
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
				padding-top: 20px;
				.sleType{
					width: 170px;
					display: inline-block;
					margin-right: 10px;
					margin-bottom: 20px;
				}
				.sleBtn {
					display: inline-block;
					margin-right: 10px;
					margin-bottom: 20px;
				}
				.search-select {
					display: inline-block;
					margin-right: 10px;
					margin-bottom: 20px;
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