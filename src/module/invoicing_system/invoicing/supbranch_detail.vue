/*
 * @Author: zhouzhe 
 * @Date: 2018-09-04 16:20:06 
 */

<template>
	<div class="warehouse-lists">
		<div class="heander">
			<div class="title"><span>库存详情</span></div>
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
                	<li><span>默认单位：</span><span v-if="goodsDetail.unit">{{getdefUnit(goodsDetail.unit,1)}}</span></li>
                	<li><span>最小单位：</span><span v-if="goodsDetail.unit">{{getdefUnit(goodsDetail.unit,2)}}</span></li>
                	
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
                <el-select v-model="selUnit" placeholder="单位切换">
					<el-option v-for="item in goodsUnit" :key="item.muId" :label="item.name" :value="item.muId"></el-option>
				</el-select>
		    </div>
			<div class="list">
				<!-- <div class="head">
					批次列表 · 共<em> {{batchList.length}} </em>条数据
				</div> -->
                <el-table :data="selList" style="width: 100%;" row-class-name='a' border stripe>
					<el-table-column :label="`批次列表 · 共${batchList.length}个条目`" class-name='tabletop'>
						<el-table-column label="序号" width="180" type="index"></el-table-column>
						<el-table-column label="批次编码" >
							<!-- <template slot-scope="scope">
								<div>{{getTime(scope.row.createTime)}}</div>
							</template> -->
						</el-table-column>
						<el-table-column label="生产日期"></el-table-column>
						<el-table-column label="供应商"></el-table-column>
						<el-table-column label="变化量"></el-table-column>
						<el-table-column label="进价"></el-table-column>
						<el-table-column label="仓库"></el-table-column>
					</el-table-column>
                </el-table>
			</div>
			<div class="page-box">
                <el-pagination @current-change="pageChange" :current-page="page" layout="total, prev, pager, next, jumper" :total="pageTotal"></el-pagination>
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
				goodsDetail: {
					unit: [],
				},
				dataUnit: ['月', '日', '年'],
				goodsData: {},
				goodsUnit: [],
				goodsCate: [],
				selUnit: '',
				minName: '', //最小单位名称
				unitArr: [],
				page: 1,
				pageTotal: 0,
				batchList: [], //批次列表
				selList: [], //分页后的列表
                dataObj:{},//请求参数
                typeValue:['成品','半成品','普通物料']
			};
		},
		mounted() {
            // this.mid = this.$route.query.id;
            this.mid = 3;
			this.dataObj = {mid: this.mid};
			this.$store.commit('setPageTools', [{name: '返回',className: '',type:4,
				fn: () => {
					window.history.go(-1);
				}
			}]);
			// this.init();
			this.getDetail();
		},
		methods: {
			async init() {
				//获取批次列表
			},
			async getDetail() {
				//获取详情
				let data = await http.invoic_getMaterialDetail({
					data: this.dataObj,
				});
                this.goodsDetail = data;
                this.goodsUnit = data.unit;
				for(let item of this.goodsDetail.cate) {
					this.goodsCate.push(item.name);
				}
				for(let item of this.goodsDetail.unit) {
					this.unitArr.push(item.name);
				}
			},
			paging() { //分页
				
			},
			timeFormat(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy年MM月dd日');
			},
			pageChange(obj) {
				
			},
			comUnit(...args) { //number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				let [number, value, showName, minName] = args;
				return global.comUnit(number, value, showName, minName);
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
			}
		}
	};
</script>

<style lang='less' scoped>
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
</style>