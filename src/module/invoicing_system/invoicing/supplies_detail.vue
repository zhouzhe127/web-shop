/* * @Author: zhouzhe * @Date: 2018-05-07 17:57:34 */

<template>
	<div id="suppliesDetaile">
		<div class="headBox">
			<div class="headTitle">
				物料信息
				<a @click="showDetail=!showDetail" v-if="isBrand&&goodsDetail.distributionRela&&goodsDetail.distributionRela.length>0">{{!showDetail ? '展开' : '收起'}}</a>
			</div>
			<div class="innerBox">
				<ul>
					<li>
						<span>物料名称：</span>
						<span>{{goodsDetail.name||"--"}}</span>
					</li>
					<li>
						<span>物料编码：</span>
						<span>{{goodsDetail.barCode||"--"}}</span>
					</li>
					<li>
						<span>品牌：</span>
						<span>{{goodsDetail.brandName||"--"}}</span>
					</li>
					<li>
						<span>批次数：</span>
						<span>{{goodsDetail.batchNum||"--"}}</span>
					</li>
				</ul>
				<ul>
					<li>
						<span>物料类型：</span>
						<span>{{typeValue[goodsDetail.type]}}</span>
					</li>
					<li>
						<span>物料单位：</span>
						<span v-if="goodsDetail.unit">{{getString(goodsDetail.unit,"name")}}</span>
					</li>
					<li>
						<span>默认单位：</span>
						<span v-if="goodsDetail.unit">{{getdefUnit(goodsDetail.unit,1)}}</span>
					</li>
					<li>
						<span>最小单位：</span>
						<span v-if="goodsDetail.unit">{{getdefUnit(goodsDetail.unit,2)}}</span>
					</li>
					
				</ul>
				<ul>
					<li :title="computeUnit(goodsDetail.unit)" style="width: 400px;">
						<span style="vertical-align: top;">单位换算：</span>
						<span style="white-space: pre;" v-if="goodsDetail.unit">{{computeUnit(goodsDetail.unit)}}</span>
					</li>
					<li>
						<span>分类：</span>
						<span v-if="goodsDetail.cate">{{getString(goodsDetail.cate,"name")}}</span>
					</li>
					<li>
						<span>库存总量：</span>
						<span>{{goodsDetail.num}}{{getdefUnit(goodsDetail.unit,2)}}</span>
					</li>
					<li>
						<span>保质期：</span>
						<span>{{goodsDetail.validity||"--"}}{{dataUnit[goodsDetail.validityType]}}</span>
					</li>
				</ul>

			</div>

			<div class="search">
				<!-- <div class="blue filter" @click="turnToEditMaterial">修改</div>
				<div class="gray reset" @click="delList">删除</div> -->
				<el-button @click="revampcate" type="primary">修改单位</el-button>
				<el-button @click="turnToEditMaterial" type="warning">编辑</el-button>
				<el-button @click="delList" type="info">删除</el-button>
			</div>
		</div>
		<div class="area-detail" v-if="isBrand&&showDetail&&goodsDetail.distributionRela&&goodsDetail.distributionRela.length>0">
			<li v-for="(wa,waIndex) in goodsDetail.distributionRela" :key="waIndex">
				<span>{{waIndex+1}}</span>
				<i>{{wa.distributionName}}&nbsp;:&nbsp;{{wa.value}}/<strong v-for="(u,i) in goodsDetail.unit" :key="i" v-if="u.muId==wa.unitId">{{u.name}}</strong></i>
			</li>
		</div>
		<div style="margin:20px 0;width:180px;">
			<el-select v-model="selUnit" placeholder="单位切换">
				<el-option v-for="(item,index) in goodsUnit" :key="index" :label="item.name" :value="item"></el-option>
			</el-select>
		</div>
		<supplies-list :goodsData="goodsData" :selUnit="selUnit?selUnit:goodsUnit[0]"></supplies-list>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				// tebData: ['批次列表', '操作记录'],
				unitList: '', //单位列表
				// tabactive: 0,
				mid: '',
				goodsDetail: '',
				dataUnit: ['月', '日', '年'],
				goodsData: '',
				goodsUnit: '',
				selUnit: '',
				showDetail: true,
				isBrand: false,
				typeValue:['成品','半成品','普通物料']
			};
		},
		mounted() {
			if (storage.session('publicDetailReturn')) this.tabactive = 1;
			this.isBrand = storage.session('userShop').currentShop.ischain == '3' ? true : false;
			this.$store.commit('setPageTools', [{
				name: '返回',
				type: 4,
				className: '',
				fn: () => {
					storage.session('warehouseDetailDestroy', true); //用于判断 是否从详情页返回
					storage.session('tabactive', 1);
					if (storage.session('publicDetailReturn')) {
						this.$router.push({
							path: '/admin/inventoryManagement'
						});
					} else {
						window.history.go(-1);
					}
				}
			},
			{
				name: '盘库',
				type: 4,
				className: 'primary',
				fn: () => {
					let obj = this.$route.query;
					obj.id = this.mid;
					this.$router.push({
						path: 'warehouseCount',
						query: obj
					});
				}
			}]);
			this.mid = this.$route.query.id;
			this.init();
		},
		methods: {
			async init() {
				let res = await http.All([{
					httpId: 'invoic_getMaterialDetail',
					data: {
						mid: this.mid,
						isDistribution: 1
					}
				},
				{
					httpId: 'invoic_getMaterialBatch',
					data: {
						mid: this.mid
					}
				}]);
				this.goodsDetail = res[0].data;
				this.goodsData = res[1].data;
				// utils.sortByAll(this.goodsData.relation, 'value', true);
				for (let i in this.goodsData.relation) {
					if (this.goodsData.relation[i].isDefault == 1) {
						let str = this.goodsData.relation.splice(i, 1);
						this.goodsData.relation.unshift(str[0]);
					}
				}
				this.goodsUnit = this.goodsData.relation;
			},
			// tebClick(index) {
			// 	this.tabactive = index;
			// },
			getString(arr, key) {
				if (typeof (arr) == 'string' || !arr) {
					return arr;
				} else {
					let res = [];
					for (let item of arr) {
						res.push(item[key]);
					}
					return res.join(',');
				}
			},
			getdefUnit(arr, type) {
				//获取默认单位,最小单位
				let key = type == 1 ? 'isDefault' : 'isMin';
				for (let i in arr) {
					if (arr[i][key] == 1) {
						return arr[i].name;
					}
				}
			},
			computeUnit(arr) {
				//单位换算
				let str = '';
				let min = this.getdefUnit(arr, 2);
				for (let i in arr) {
					if (i > 0) str += '\n';
					str += ` 1${arr[i].name}=${arr[i].value}${min} `;
				}
				return str;
			},
			async delList() {
				this.$store.commit('setWin', {
					title: '提示',
					content: '确定删除此物料?',
					winType: 'confirm',
					callback: async res => {
						if (res == 'ok') {
							await http.invoic_delMaterial({
								data: {
									mid: this.mid
								}
							});
							window.history.go(-1);
						}
					}
				});
			},
			// selectList(sle) {
			// 	//选择单位
			// 	console.log(sle);
			// 	this.selUnit = sle;
			// },
			revampcate() { //修改单位
				this.$router.push({
					path: 'revampUnit',
					query: {
						id: this.mid,
						name: this.goodsDetail.name || '--'
					}
				});
			},
			turnToEditMaterial() {
				this.$router.push({
					path: 'materialEdit',
					query: {
						id: this.mid
					}
				});
			},
		},
		computed: {},
		components: {
			suppliesList: () =>
				import ( /*webpackChunkName: 'supplies_list'*/ './supplies_list'),
			suppliesOpert: () =>
				import ( /*webpackChunkName: 'supplies_opert'*/ './supplies_opert'),
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn')
		},
		destroyed() {
			storage.session('publicDetailReturn', null);
			storage.session('publicDetailReturn', false);
		}
	};
</script>
<style lang="less" scoped>
	#suppliesDetaile {
		margin-top: 10px;
		.headBox {
			border: 1px #ebeef5 solid;
			position: relative;
			.headTitle {
				padding: 10px 20px;
				background-color: #f5f7fa;
				a {
					font-size: 14px;
					text-decoration: #E1BB4A underline;
					color: #E1BB4A;
					cursor: pointer;
				}
			}
			.innerBox {
				padding: 20px 0 20px 40px;
				ul {
					display: inline-block;
					width: 23%;
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

			.search {
				display: inline-block;
				position: absolute;
				bottom:15px;
				right: 25px;
				.search-btn {
					width: 100px;
					height: 40px;
					line-height: 40px;
					color: #fff;
					font-size: 16px;
					margin-right: 10px;
					display: inline-block;
					text-align: center;
					border-radius: 5px;
				}
				.filter,
				.reset {
					.search-btn;
				}
			}
		}
		.area-detail {
			display: block;
			border: 1px #ebeef5 solid;
			border-top: none;
			padding-left:40px; 
			li {
				line-height: 75px;
				text-align: left;
				vertical-align: middle;
				display: inline-block;
				border: none;
				span {
					border-radius: 50%;
					display: inline-block;
					vertical-align: middle;
					height: 33px;
					width: 33px;
					background-color: #f2f2f2;
					color: #333;
					vertical-align: middle;
					line-height: 33px;
					margin-right: 10px;
					text-align: center;
				}
				i {
					display: inline-block;
					width: 65%;
					line-height: normal;
					vertical-align: text-top;
				}
				width:33.2%;
				color:#999999;
				font-size:16px;
			}
		}
		// .tebBox {
		// 	display: inline-block;
		// 	color: orange;
		// 	margin: 20px 0;
		// 	cursor: pointer;
		// 	li {
		// 		border: 1px orange solid;
		// 		display: inline-block;
		// 		padding: 10px 35px;
		// 	}
		// 	.active {
		// 		background-color: orange;
		// 		color: #ffffff;
		// 	}
		// }
	}
</style>