/*
<<<<<<< HEAD
 * @Author: zhouzhe 
 * @Date: 2018-09-04 16:20:06 
 */
=======
* @Author: zhouzhe
* @Date: 2018-09-04 16:20:06
*/
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab

<template>
	<div class="warehouse-lists">
		<div class="heander">
			<div class="title"><span>物料信息</span></div>
<<<<<<< HEAD
            <div class="innerBox">
                <ul>
                    <li><span>物料名称：</span><span>{{goodsDetail.name}}</span></li>
	                <li><span>物料简码：</span><span>{{goodsDetail.BC}}</span></li>
	                <li><span>品牌：</span><span>{{goodsDetail.brandName||'无'}}</span></li>
	                <li><span>批次数：</span><span>{{goodsDetail.batchNum}}</span></li>
					<li><span>备注：</span><span></span></li>
                </ul>
                <ul>
                    <li><span>物料类型：</span><span>{{typeValue[Number(goodsDetail.type)]}}</span></li>
                    <li><span>物料单位：</span><span>{{unitArr.join(',')}}</span></li>
                	<li><span>默认单位：</span><span v-if="goodsDetail.unit">{{defName}}</span></li>
                	<li><span>最小单位：</span><span v-if="goodsDetail.unit">{{minName}}</span></li>
                	
                </ul>
                <ul>
                    <li><span>单位换算：</span><span v-if="goodsDetail.unit">{{computeUnit(goodsDetail.unit)}}</span></li>
                	<li><span>分类：</span><span>{{goodsCate.join(',')}}</span></li>
                	<li><span>库存总量：</span><span>{{goodsDetail.num}}{{getdefUnit(goodsDetail.unit,2)}}</span></li>
                    <li><span>保质期：</span><span>{{goodsDetail.validity}}{{dataUnit[goodsDetail.validityType]}}</span></li>
                </ul>
            </div>
		</div>
		<div class="main">
			<div class="unit-box">
                <el-select v-model="selUnit" @change="unitChang" placeholder="单位切换">
					<el-option v-for="item in goodsUnit" :key="item.muId" :label="item.name" :value="item.muId"></el-option>
				</el-select>&nbsp;&nbsp;
				<span>操作类型：{{recordName}}</span>
		    </div>
=======
			<div class="innerBox">
				<ul>
					<li><span>物料名称：</span><span>{{goodsDetail.name}}</span></li>
					<li><span>物料简码：</span><span>{{goodsDetail.BC}}</span></li>
					<li><span>品牌：</span><span>{{goodsDetail.brandName||'无'}}</span></li>
					<li><span>批次数：</span><span>{{goodsDetail.batchNum}}</span></li>
				</ul>
				<ul>
					<li><span>物料类型：</span><span>{{typeValue[Number(goodsDetail.type)]}}</span></li>
					<li><span>物料单位：</span><span>{{unitArr.join(',')}}</span></li>
					<li><span>默认单位：</span><span v-if="goodsDetail.unit">{{defName}}</span></li>
					<li><span>最小单位：</span><span v-if="goodsDetail.unit">{{minName}}</span></li>

				</ul>
				<ul>
					<li><span>单位换算：</span><span v-if="goodsDetail.unit">{{computeUnit(goodsDetail.unit)}}</span></li>
					<li><span>分类：</span><span>{{goodsCate.join(',')}}</span></li>
					<li><span>库存总量：</span><span>{{goodsDetail.num}}{{getdefUnit(goodsDetail.unit,2)}}</span></li>
					<li><span>保质期：</span><span>{{goodsDetail.validity}}{{dataUnit[goodsDetail.validityType]}}</span></li>
				</ul>
			</div>
		</div>
		<div class="main">
			<div class="unit-box">
				<el-select v-model="selUnit" @change="unitChang" placeholder="单位切换">
					<el-option v-for="item in goodsUnit" :key="item.muId" :label="item.name" :value="item.muId"></el-option>
				</el-select>&nbsp;&nbsp;
				<span>操作类型：{{recordName}}</span>
			</div>
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
			<div class="list">
				<!-- <div class="head">
					批次列表 · 共<em> {{batchList.length}} </em>条数据
				</div> -->
<<<<<<< HEAD
                <el-table :data="selList" style="width: 100%;" row-class-name='a' border stripe>
					<el-table-column :label="`批次列表 · 共${selList.length}个条目`" class-name='tabletop'>
						<el-table-column label="序号" width="180" type="index"></el-table-column>
=======
				<el-table :data="selList" style="width: 100%;" row-class-name='a' border stripe>
					<el-table-column :label="`批次列表 · 共${selList.length}个条目`" class-name='tabletop'>
						<el-table-column label="序号" width="80" type="index"></el-table-column>
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
						<el-table-column label="批次编码" prop="batchCode">
							<!-- <template slot-scope="scope">
								<div>{{getTime(scope.row.createTime)}}</div>
							</template> -->
						</el-table-column>
						<el-table-column label="生产日期">
							<template slot-scope="scope">
								<div>{{getTime(scope.row.productionTime)}}</div>
							</template>
						</el-table-column>
						<el-table-column label="供应商" prop="supplier"></el-table-column>
						<el-table-column label="变化量">
							<template slot-scope="scope">
<<<<<<< HEAD
								<div :class="scope.row.num>0? 'up':'down'">{{scope.row.num>0? '↑':'↓'}}{{scope.row.changeNum}}</div>
=======
								<div :class="scope.row.num>0? 'up':'down'">{{scope.row.changeNum}}</div>
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
							</template>
						</el-table-column>
						<el-table-column label="进价">
							<template slot-scope="scope">
<<<<<<< HEAD
								<div>{{scope.row.distributionPrice}}元/{{scope.row.distributionUnit}}</div>
							</template>
						</el-table-column>
						<el-table-column label="仓库" prop="wName"></el-table-column>
					</el-table-column>
                </el-table>
=======
								<div>{{scope.row.distributionPrice}}元/{{getunitid(scope.row.distributionUnit)}}</div>
							</template>
						</el-table-column>
						<el-table-column label="仓库" prop="wName">
							<template slot-scope="scope">
								<div>{{scope.row.wName}}/{{scope.row.aName}}</div>
							</template>
						</el-table-column>
						<el-table-column label="备注" prop="remark"></el-table-column>
					</el-table-column>
				</el-table>
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
			</div>
			<!-- <div class="page-box">
                <el-pagination @current-change="pageChange" :current-page="page" layout="total, prev, pager, next, jumper" :total="pageTotal"></el-pagination>
			</div> -->
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
<<<<<<< HEAD
				logId:'',
				recordName:'',
=======
				logId: '',
				recordName: '',
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
				goodsDetail: {
					unit: [],
				},
				dataUnit: ['月', '日', '年'],
				goodsData: {},
				goodsUnit: [],
				goodsCate: [],
<<<<<<< HEAD
				selList:[],
				selUnit: '',
				minName: '', //最小单位名称
				defName:'',//默认单位名称
				unitArr: [],
                typeValue:['成品','半成品','普通物料']
			};
		},
		async mounted() {
			this.mid = this.$route.query.id;//物料id
			this.logId = this.$route.query.logId;//日志id
			this.recordName = this.$route.query.recordName;//操作类型
			this.$store.commit('setPageTools', [{name: '返回',className: '',type:4,
=======
				selList: [],
				selUnit: '',
				minName: '', //最小单位名称
				defName: '', //默认单位名称
				unitArr: [],
				typeValue: ['成品', '半成品', '普通物料']
			};
		},
		async mounted() {
			this.mid = this.$route.query.id; //物料id
			this.logId = this.$route.query.logId; //日志id
			this.recordName = this.$route.query.recordName; //操作类型
			this.$store.commit('setPageTools', [{
				name: '返回',
				className: '',
				type: 4,
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
				fn: () => {
					window.history.go(-1);
				}
			}]);
			await this.getDetail();
			this.init();
		},
		methods: {
			async init() {
				//获取批次列表
				let data = await http.invoicgetLogBatchDetail({
<<<<<<< HEAD
					data:{
						id:this.logId
=======
					data: {
						id: this.logId
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
					}
				})
				console.log(data);
				this.selList = data.list;
				this.unitChang();
			},
			async getDetail() {
				//获取详情
				let data = await http.invoic_getMaterialDetail({
					data: {
<<<<<<< HEAD
						mid:this.mid
					},
				});
                this.goodsDetail = data;
				this.goodsUnit = data.unit;
				this.minName = this.getdefUnit(data.unit,1);
				this.defName = this.getdefUnit(data.unit,2)
				for(let item of this.goodsDetail.cate) {
					this.goodsCate.push(item.name);
				}
				for(let item of this.goodsDetail.unit) {
=======
						mid: this.mid
					},
				});
				this.goodsDetail = data;
				this.goodsUnit = data.unit;
				this.minName = this.getdefUnit(data.unit, 2);
				this.defName = this.getdefUnit(data.unit, 1)
				for (let item of this.goodsDetail.cate) {
					this.goodsCate.push(item.name);
				}
				for (let item of this.goodsDetail.unit) {
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
					this.unitArr.push(item.name);
				}
			},
			timeFormat(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy年MM月dd日');
			},
			computeUnit(arr) {
				//单位换算
				let str = '';
				let min = this.getdefUnit(arr, 2);
<<<<<<< HEAD
				for(let i in arr) {
					if(i > 0) str += '|';
=======
				for (let i in arr) {
					if (i > 0) str += '|';
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
					str += ` 1${arr[i].name}=${arr[i].value}${min} `;
				}
				return str;
			},
			getdefUnit(arr, type) {
				//获取默认单位,最小单位
				let key = type == 1 ? 'isDefault' : 'isMin';
<<<<<<< HEAD
				for(let item of arr) {
					if(item[key] == 1) {
=======
				for (let item of arr) {
					if (item[key] == 1) {
						return item.name;
					}
				}
			},
			getunitid(id) {
				for (let item of this.goodsUnit) {
					if (item.muId == id) {
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
						return item.name;
					}
				}
			},
			getTime(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd hh:mm');
			},
<<<<<<< HEAD
			unitChang(id){
				let sel = '';
				console.log(id);
				for(let item of this.goodsUnit){
					if(id){
						if(item.muId==id){
							sel = item;
							break;
						}
					}else{
						if(item.isDefault==1){
=======
			unitChang(id) {
				let sel = '';
				for (let item of this.goodsUnit) {
					if (id) {
						if (item.muId == id) {
							sel = item;
							break;
						}
					} else {
						if (item.isDefault == 1) {
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
							sel = item;
							break;
						}
					}
				}
<<<<<<< HEAD
				this.selList.map(v=>{
					v.changeNum = this.comUnit(v.num,sel.value,sel.name,this.minName);
=======
				this.selList.map(v => {
					v.changeNum = this.comUnit(v.num, sel.value, sel.name, this.minName);
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
				});
				this.selList = utils.deepCopy(this.selList);
			},
			//单位换算
			comUnit(...args) {
				//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				let [number, value, showName, minName, type] = args;
				return global.comUnit(number, value, showName, minName, type);
			},
		}
	};
</script>

<style lang='less' scoped>
<<<<<<< HEAD
.warehouse-lists {
	// min-width: 1300px;
	.a{
		background-color: #F5F7FA;
	}
	.heander {
		margin-bottom: 20px;
		.title {
			height: 20px;
			line-height: 20px;
			border-left: 4px solid #E1BB4A;
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
					margin-bottom: 15px;
					span {
						font-size: 16px;
                        display: inline-block;
                        line-height: 20px;
						max-width: 70%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
=======
	.warehouse-lists {

		// min-width: 1300px;
		.a {
			background-color: #F5F7FA;
		}

		.heander {
			margin-bottom: 20px;

			.title {
				height: 20px;
				line-height: 20px;
				border-left: 4px solid #E1BB4A;
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
						margin-bottom: 15px;

						span {
							font-size: 16px;
							display: inline-block;
							line-height: 20px;
							max-width: 70%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
					}
				}
			}
		}
<<<<<<< HEAD
	}
	.up{
		color: red;
	}
	.down{
		color: green;
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
                border:1px solid #ebeef5;
				border-bottom: none;
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
=======

		.up {
			color: red;

			&::before {
				.comfir;
				background: url('../../../res/images/arrow-up.png') no-repeat;
			}
		}
		.comfir{
			content: '';
			display: inline-block;
			width: 8px;
			height: 13px;
			margin-right: 3px;
		}
		.down {
			color: green;
			&::before {
				.comfir;
				background: url('../../../res/images/arrow-down.png') no-repeat;
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
					border: 1px solid #ebeef5;
					border-bottom: none;

					em {
						color: #ff3c04;
						font-size: inherit;
					}
				}

				.scroll-box {
					overflow: auto;
				}

				.title {
					min-width: 1000px;
					background: #e6e6e6;
					overflow: hidden;

					span {
						float: left;
						height: 40px;
						line-height: 40px;
						text-align: center;
						width: 15%;
					}

					.narrow {
						width: 10%;
					}
				}

				ul {
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

						.narrow {
							width: 10%;
						}

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

					.empty {
						height: 70px;
						text-align: center;
						line-height: 70px;
						color: #999;
						font-size: 20px;
					}
				}

			}

			.page-box {
				margin-top: 10px;
				text-align: left;
			}
		}
	}
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
</style>