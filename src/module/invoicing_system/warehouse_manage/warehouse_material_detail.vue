<!--
	*2018.3.28
	*黄一帆
-->
<template>
	<div class="warehouse-lists">
		<div class="heander">
			<div class="title"><span>库存详情</span></div>
            <div class="innerBox">
                <ul>
                    <li><span>物料名称：</span><span>{{goodsDetail.name}}</span></li>
	                <li><span>物料编码：</span><span>{{goodsDetail.barCode}}</span></li>
	                <li><span>品牌：</span><span>{{goodsDetail.brandName||'无'}}</span></li>
	                <li><span>批次数：</span><span>{{goodsDetail.batchNum}}</span></li>
                </ul>
                <ul>
                    <li><span>物料单位：</span><span>{{unitArr.join(',')}}</span></li>
                	<li><span>默认单位：</span><span v-if="goodsDetail.unit">{{getdefUnit(goodsDetail.unit,1)}}</span></li>
                	<li><span>最小单位：</span><span v-if="goodsDetail.unit">{{getdefUnit(goodsDetail.unit,2)}}</span></li>
                	<li><span>保质期：</span><span>{{goodsDetail.validity}}{{dataUnit[goodsDetail.validityType]}}</span></li>
                </ul>
                <ul>
                    <li><span>单位换算：</span><span v-if="goodsDetail.unit">{{computeUnit(goodsDetail.unit)}}</span></li>
                	<li><span>分类：</span><span>{{goodsCate.join(',')}}</span></li>
                	<li><span>库存总量：</span><span>{{goodsDetail.num}}{{getdefUnit(goodsDetail.unit,2)}}</span></li>
                </ul>
            </div>
		</div>
		<div class="main">
			<div class="unit-box">
		      <el-select v-model="unitIndex" placeholder="请选择单位" @change="selectList" class="el-size">
			    <el-option
					v-for="item in goodsUnit"
					:key="item.value"
					:label="item.label"
					:value="item.value">
			    </el-option>
			</el-select>
		    </div>
			<div class="list">
				<el-table :data="batchList" stripe border style="width: 100%" :header-cell-style="{'background-color':'#f5f7fa'}">
					<el-table-column type="index" :index="indexMethod" label="序号" width="100">
				    </el-table-column>
				    <el-table-column prop="batchCode" label="批次编号">
				    </el-table-column>
				    <el-table-column label="生产日期">
				    	<template slot-scope="scope">
				        	{{timeFormat(scope.row.productionTime)}}
				      	</template>
				    </el-table-column>
				    <el-table-column prop="supplier" label="供应商">
				    </el-table-column>
				    <el-table-column label="数量/重量">
				    	<template slot-scope="scope">
				        	{{comUnit(scope.row.surplus,relation[selUnit].value,relation[selUnit].name,minName)}}
				      	</template>
				    </el-table-column>
				    <el-table-column label="进价">
				    	<template slot-scope="scope">
				    		{{scope.row.purchasePrice}}元/{{scope.row.purchaseUnit.name}}
				    	</template>
				    </el-table-column>
				    <el-table-column label="所属仓库">
				    	<template slot-scope="scope">
				    		{{scope.row.wName}}
				    		<template v-if="scope.row.wName && scope.row.aName">-</template>
				    		{{scope.row.aName}}
				    	</template>
				    </el-table-column>
			  	</el-table>
			</div>
			<div class="page-box">
				<el-pagination @current-change="pageChange"
					:current-page="page"
					background
					layout="total,prev, pager, next"
					:total="count">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	import global from 'src/manager/global';

	export default {
		data() {
			return {
				tabactive: 0,
				mid: '',
				wid: '',
				goodsDetail: {
					unit: [],
				},
				dataUnit: ['月', '日', '年'],
				goodsData: {},
				goodsUnit: [],
				goodsCate: [],
				selUnit: 0,
				unitIndex: 0,
				minName: '', //最小单位名称
				unitArr: [],
				page: 1,
				pageTotal: 1,
				count:0,
				showNum: 10,
				relation: [], //关联
				batchList: [], //批次列表
				selList: [], //分页后的列表
				shopId:'',//店铺id
				dataObj:{},//请求参数
			};
		},
		components: {
			pageBtn: () =>
				import( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			selectBtn: () =>
				import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		},
		destroyed(){
			storage.session('materialDetailShopId',null);
		},
		mounted() {
			this.mid = this.$route.query.id;
			this.wid = this.$route.query.wid || '';
			this.shopId = storage.session('materialDetailShopId') || '';
			this.dataObj = {mid: this.mid,wid: this.wid};
			if(this.shopId){
				this.dataObj.shopId = this.shopId;
			}
			this.$store.commit('setPageTools', [{name: '返回',className: '',type:4,
				fn: () => {
					storage.session('warehouseDetailDestroy', true);
					window.history.go(-1);
				}
			}]);
			this.init();
			this.getDetail();
		},
		methods: {
			async init() {
				//获取批次列表
				let data = await http.invoic_getMaterialBatch({
					data: this.dataObj,
				});
				this.relation = data.relation;
				this.batchList = data.list;
				this.count = data.list.length;
				let arr = [];
				for(let i in this.relation) {
					let item = this.relation[i];
					if(item.isDefault == 1) {
						this.selUnit = i;
						this.unitIndex = item.muId;
					}
					if(item.isMin == 1) {
						this.minName = item.name;
					}
					arr.push({value:item.muId,label:item.name});
				}
				this.goodsUnit = arr;
				this.paging();
			},
			async getDetail() {
				//获取详情
				let data = await http.invoic_getMaterialDetail({
					data: this.dataObj,
				});
				this.goodsDetail = data;
				for(let item of this.goodsDetail.cate) {
					this.goodsCate.push(item.name);
				}
				for(let item of this.goodsDetail.unit) {
					this.unitArr.push(item.name);
				}
			},
			indexMethod(index){
				return 10*(this.page-1)+index+1;
			},
			paging() { //分页
				this.pageTotal = Math.ceil(this.batchList.length / this.showNum);
				let start = (this.page - 1) * this.showNum;
				let end = this.page * this.showNum;
				if(end > this.batchList.length) end = this.batchList.length;
				for(let i = start; i < end; i++) {
					let num = i < 9 ? '0' + (i + 1) : (i + 1);
					this.batchList[i].indexNum = num;
				}
				this.selList = this.batchList.slice(start, end);
			},
			timeFormat(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy年MM月dd日');
			},
			pageChange(obj) {
				this.page = obj.page;
				this.showNum = obj.num;
				this.paging();
			},
			comUnit(...args) { //number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				let [number, value, showName, minName] = args;
				return global.comUnit(number, value, showName, minName);
			},
			selectList(res) {
				//选择单位
				this.unitIndex = res;
				for(let i=0;i<this.relation.length;i++){
					if(res==this.relation[i].muId){
						this.selUnit = i;
						break;
					}
				}
			},
			computeUnit(arr) {
				//单位换算
				let str = '';
				let min = this.getdefUnit(arr, 2);
				for(let i in arr) {
					if(i > 0) str += '|';
					str += ` 1${arr[i].name}=${arr[i].value}${min} `;
				}
				return str;
			},
			getdefUnit(arr, type) {
				//获取默认单位,最小单位
				let key = type == 1 ? 'isDefault' : 'isMin';
				for(let item of arr) {
					if(item[key] == 1) {
						return item.name;
					}
				}
			},
		}
	};
</script>

<style lang='less' scoped>
.warehouse-lists {
	// min-width: 1300px;
	.heander {
		margin-bottom: 20px;
		.title {
			height: 20px;
			line-height: 20px;
			border-left: 2px solid #20a7dc;
			padding-left: 20px;
			margin-bottom: 30px;
			position: relative;
			padding-left: 100px;
			span {
				color: #333;
				font-size: 16px;
				position: absolute;
				left: 10px;
				top: 0;
				height: 20px;
				line-height: 20px;
			}
			&:after {
				content: '';
				width: 100%;
				display: inline-block;
				vertical-align: middle;
				border-top: 2px dashed #ddd;
				position: relative;
			}
		}
		.innerBox {
			padding-left: 50px;
			ul {
				display: inline-block;
				width: 32%;
				vertical-align: top;
				li {
					margin-bottom: 20px;
					span {
						font-size: 16px;
						display: inline-block;
						max-width: 70%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
	.main {
		margin-top: 20px;
		padding-bottom: 50px;
		.unit-box {
			width: 100%;
			padding-bottom: 20px;
		}
		.list {
			.head {
				height: 50px;
				line-height: 50px;
				padding: 0 10px;
				font-size: 16px;
				em {
					color: #ff3c04;
					font-size: inherit;
				}
			}
			.scroll-box{overflow: auto;}
			.title {min-width: 1000px;
				background: #e6e6e6;
				overflow: hidden;
				span {
					float: left;
					height: 40px;
					line-height: 40px;
					text-align: center;
					width: 15%;
				}
				.narrow {width: 10%;}
			}
			ul{
				min-width: 1000px;
				li {
					overflow: hidden;
					border-bottom: 2px solid #ddd;
					&:last-child {
						border-bottom: 0;
					}
					span {
						float: left;
						height: 70px;
						line-height: 70px;
						text-align: center;
						width: 15%;
						color: #555;
					}
					.narrow {width: 10%;}
					.handle {
						em {
							display: inline-block;
							padding: 0 20px;
							height: 18px;
							line-height: normal;
							cursor: pointer;
							&:hover {
								text-decoration: underline;
							}
						}
						.edit {
							color: #ff8d00;
							border-right: 1px solid #ddd;
						}
						.detail {
							color: #27a8e0;
						}
					}
				}
				.empty{height: 70px;text-align: center;line-height: 70px;color: #999;font-size: 20px;}
			} 
			
		}
		.page-box {
			margin-top: 10px;
			text-align: left;
		}
	}
}
</style>