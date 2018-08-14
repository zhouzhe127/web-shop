<template>
	<section id="materials-putin-storage">
		<!-- <div class="return" @click="returnPage">返回</div> -->
		<div class="material-info" v-if="materialShow">
			<div class="titleTop">
				<div class="topbox">
					<i></i>
					<h3>物料信息</h3>
					<div class="dian" v-for="i in 32" :key="i"></div>
				</div>
			</div>
			<ul class="material-info-body">
				<li>
					<div>物料名称：{{materialInfo.name}}</div>
					<div>物料单位：{{unitInfoName}}</div>
					<div>单位换算：{{unitInfoConversion?unitInfoConversion:sameUnitConver}}</div>
				</li>
				<li>
					<div>物料简码：{{materialInfo.BC}}</div>
					<div>默认单位：{{unitInfoDefault}}</div>
					<div>分类：{{cateInfoName}}</div>
				</li>
				<li>
					<div>品牌：{{materialInfo.brandName||"无"}}</div>
					<div>最小单位：{{unitInfoMin}}</div>
					<div>保质期：{{materialInfo.validity+validityType}}</div>
				</li>
			</ul>
		</div>
		<div class="new-inventory" v-if="detailsType == 1">
			<div class="titleTop">
				<div class="topbox">
					<i></i>
					<h3>操作记录</h3>
					<div class="dian" v-for="i in 32" :key="i"></div>
				</div>
			</div>
			<ul class="new-inventory-body">
				<li>
					<section>
						<h6>操作类型:</h6>
						<span>{{operationRecordsList.typeName||"--"}}</span>
					</section>
					<section>
						<h6>操作时间:</h6>
						<span>{{timeConversion(operationRecordsList.createTime)}}</span>
					</section>
				</li>
				<li>
					<section>
						<h6>操作前数量/重量:</h6>
						<span>{{operationRecordsList.createBefore}}</span>
					</section>
					<section>
						<h6>数量/重量变化:</h6>
						<span>{{operationRecordsList.createChange}}</span>
					</section>
				</li>
				<li>
					<section>
						<h6>操作后数量/重量:</h6>
						<span>{{operationRecordsList.createAfter}}</span>
					</section>
					<section>
						<h6>操作人:</h6>
						<span>{{operationRecordsList.createName||"--"}}</span>
					</section>
				</li>
				<li v-if="pickingShow">
					<section>
						<h6>领料人:</h6>
						<span>{{operationRecordsList.ownerName||"--"}}</span>
					</section>
				</li>
				<li>
					<section>
						<h6>备注:</h6>
						<span>{{operationRecordsList.remark}}</span>
					</section>
				</li>
			</ul>
		</div>
		<div class="operationTable" v-if="detailsType == 2">
			<p v-if="operationRecordsList[0]">操作记录 · 日期：{{timeConversionDay(operationRecordsList[0].createTime)}}</p>
			<ul class="table-head">
				<li>操作时间</li>
				<li>商品</li>
				<li>数量/重量变化</li>
				<li>操作前数量/重量</li>
				<li>操作后数量/重量</li>
			</ul>
			<ul class="table-body" v-for="(item,index) in operationRecordsList" :key="index">
				<li>{{timeConversionHourse(item.createTime)}}</li>
				<li>{{item.goodsName||"--"}}</li>
				<li>{{item.createChange||"--"}}</li>
				<li>{{item.createBefore||"--"}}</li>
				<li>{{item.createAfter||"--"}}</li>
			</ul>
		</div>
		<div class="operationTableEdit" v-if="detailsType == 3">
			<p v-if="operationRecordsList[0]">修改批次信息 · 操作时间：{{timeConversion(Number(operationRecordsList[0].createTime))}}</p>
			<ul class="table-head-edit">
				<li></li>
				<li>修改前</li>
				<li>修改后</li>
			</ul>
			<div class="table-body-edit">
				<ul class="table-body-edit-info">
					<li>批次编号</li>
					<li>生产日期</li>
					<li>失效日期</li>
					<li>供应商</li>
					<li>进价</li>
					<li>备注</li>
				</ul>
				<ul class="table-body-edit-info">
					<li v-if="operationRecordsContent[4]">{{operationRecordsContent[4].modifyBefore}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[0]">{{timeConversion(operationRecordsContent[0].modifyBefore)}}</li>
					<li v-if="operationRecordsContent[1]">{{timeConversion(operationRecordsContent[1].modifyBefore)}}</li>
					<li v-if="operationRecordsContent[2]">{{operationRecordsContent[2].modifyBefore}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[5]">{{operationRecordsContent[5].modifyBefore}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[6]">{{operationRecordsContent[6].modifyBefore}}</li>
					<li v-else>--</li>
				</ul>
				<ul class="table-body-edit-info">
					<li v-if="operationRecordsContent[4]">{{operationRecordsContent[4].modifyAfter}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[0]">{{timeConversion(operationRecordsContent[0].modifyAfter)}}</li>
					<li v-if="operationRecordsContent[1]">{{timeConversion(operationRecordsContent[1].modifyAfter)}}</li>
					<li v-if="operationRecordsContent[2]">{{operationRecordsContent[2].modifyAfter}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[5]">{{operationRecordsContent[5].modifyAfter}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[6]">{{operationRecordsContent[6].modifyAfter}}</li>
					<li v-else>--</li>
				</ul>
			</div>
		</div>
		<div class="operationTableEdit" v-if="detailsType == 4">
			<p v-if="operationRecordsList[0]">修改物料信息 · 操作时间：{{timeConversion(Number(operationRecordsList[0].createTime))}}</p>
			<ul class="table-head-edit">
				<li></li>
				<li>修改前</li>
				<li>修改后</li>
			</ul>
			<div class="table-body-edit">
				<ul class="table-body-edit-info">
					<li>物料名称</li>
					<li>物料简码</li>
					<li>分类</li>
					<li>品牌</li>
					<li>保质期</li>
				</ul>
				<ul class="table-body-edit-info">
					<li v-if="operationRecordsContent[0]">{{operationRecordsContent[0].modifyBefore}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[1]">{{operationRecordsContent[1].modifyBefore}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[2]">{{operationRecordsContent[2].modifyBefore}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[3]">{{operationRecordsContent[3].modifyBefore.name}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[4]">{{operationRecordsContent[4].modifyBefore}}</li>
					<li v-else>--</li>
				</ul>
				<ul class="table-body-edit-info">
					<li v-if="operationRecordsContent[0]">{{operationRecordsContent[0].modifyAfter}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[1]">{{operationRecordsContent[1].modifyAfter}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[2]">{{operationRecordsContent[2].modifyAfter}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[3]">{{operationRecordsContent[3].modifyAfter.name}}</li>
					<li v-else>--</li>
					<li v-if="operationRecordsContent[4]">{{operationRecordsContent[4].modifyAfter}}</li>
					<li v-else>--</li>
				</ul>
			</div>
		</div>
		<details-unit v-if="!materialShow&&detailsType==5&&materialInfo&&operationRecordsList" :materialInfo="materialInfo" :detailList="operationRecordsList"></details-unit>
	</section>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				materialShow: true, //物料信息
				pickingShow: false, //领料人展示
				detailsType: 1, //详情类型
				unitReady: [], //备用单位数组
				unitInfo: [], //单位信息
				unitInfoName: '', //单位名称
				unitInfoDefault: '', //默认单位
				unitInfoMin: '', //最小单位
				unitInfoValue: '', //单位换算
				unitInfoConversion: '', //单位换算
				cateInfo: [], //分类信息
				cateInfoName: '', //分类名字
				getInfo: {}, //传进来的信息
				materialInfo: '', //物料信息
				operationRecords: [], //操作记录
				operationRecordsList: '', //详情列表
				operationRecordsTime: '', //操作时间
				operationRecordsContent: [], //操作内容
				validityType: '', //保质期单位
				sameUnitConver: '' //同样单位换算
			};
		},
		methods: {
			dealData(arr, parm) {
				let unitArr = [];
				for (let item of arr) {
					unitArr.push(item[parm]);
				}
				return unitArr;
			},
			timeConversion(time) {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm');
			},
			timeConversionDay(time) {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd');
			},
			timeConversionHourse(time) {
				return utils.format(new Date(time * 1000), 'hh:mm');
			},
			async init() {
				let res = await http.getMaterialDetail({
					data: {
						mid: this.getInfo.mid
					}
				});
				// if (!res.unitData) {

				// }
				this.materialInfo = res;
				this.unitInfo = res.unit;
				if (this.materialInfo.validityType == 0) {
					this.validityType = '月';
				} else if (this.materialInfo.validityType == 1) {
					this.validityType = '日';
				} else if (this.materialInfo.validityType == 2) {
					this.validityType = '年';
				}
				let arrUnit = [];
				for (let i = 0; i < this.unitInfo.length; i++) {
					if (this.unitInfo[i].isDefault == 1 && this.unitInfo[i].isMin == 1) {
						this.unitInfoDefault = this.unitInfo[i].name;
						this.unitInfoMin = this.unitInfo[i].name;
						this.sameUnitConver = '1' + this.unitInfo[i].name + '=' + this.unitInfo[i].value + this.unitInfoMin;
					}
					if (this.unitInfo[i].isDefault == 1) {
						this.unitInfoDefault = this.unitInfo[i].name;
					}
					if (this.unitInfo[i].isMin == 1) {
						this.unitInfoMin = this.unitInfo[i].name;
					}
					if (this.unitInfo[i].isMin == 0) {
						arrUnit.push(this.unitInfo[i]);
						this.unitInfo[i].unitConversion = '1' + this.unitInfo[i].name + '=' + this.unitInfo[i].value + this.unitInfoMin;
					}
				}
				this.conversionArr = arrUnit;
				this.unitInfoName = this.dealData(this.unitInfo, 'name').join('、');
				this.unitInfoConversion = this.dealData(this.conversionArr, 'unitConversion').join('|');
				this.cateInfo = res.cate;
				this.cateInfoName = this.dealData(this.cateInfo, 'name').join('、');
				let info = await http.getLogDetail({
					data: {
						id: this.getInfo.tid,
						type: this.getInfo.type,
						mid: this.getInfo.mid,
						createTime:this.getInfo.time
					}
				});
				console.log(info);
				this.operationRecords = info;
				this.operationRecordsList = info.list;
				this.operationRecordsTime = info.list.length ? info.list[0].creatTime : '';
				let arrType = storage.session('operttypeList');
				// let arrType = ['', '盘库', '入库', '耗损', '修改批次信息', '商品物料消耗', '出库（调库）', '入库（调库）', '领料', '回库', '修改物料信息'];
				for (let i of arrType) {
					if (this.operationRecordsList.actId == i.type) {
						this.operationRecordsList.typeName = i.typeName;
						break;
					}
				}
				console.log(this.operationRecordsList);
				this.operationRecordsContent = info.list.content;
			},
			// returnPage: function () {
			// 	storage.session('publicDetailReturn', true);
			// 	this.$router.push({
			// 		path: '/admin/inventoryManagement/suppliesDetail',
			// 		query: this.$route.query
			// 	});
			// },
			addEduce() {
				this.$store.commit('setPageTools', [{
					name: '返回',
					className: '',
					fn: async () => {
						storage.session('publicDetailReturn', true);
						this.$router.push({
							path: '/admin/inventoryManagement/suppliesDetail',
							query: this.$route.query
						});
					},
					type:4
				}]);
			},
		},
		mounted() {
			this.getInfo = this.$route.query;
			this.addEduce();
			if (this.getInfo.type == (1 || 2 || 3 || 6 || 7||11||13||14)) {
				this.detailsType = 1;
			} else if (this.getInfo.type == (8 || 9)) {
				this.detailsType = 1;
				this.pickingShow = true;
			} else if (this.getInfo.type == 5) {
				this.detailsType = 2;
			} else if (this.getInfo.type == 4) {
				this.detailsType = 3;
			} else if (this.getInfo.type == 10) {
				this.detailsType = 4;
				this.materialShow = false;
			} else if (this.getInfo.type == 15){
				this.detailsType = 5;
				this.materialShow = false;
			}
			this.init();
		},
		distryed(){
			storage.session('operttypeList','');
		},
		components:{
			detailsUnit: () =>
				import ( /*webpackChunkName: 'public_details_unit'*/ './public_details_unit'),
		}
	};
</script>

<style lang="less" scoped>
	#materials-putin-storage {
		.material-info {
			width: 100%;
			height: auto;
			.titleTop {
				width: 100%;
				height: 40px;
				overflow: hidden;
				.topbox {
					width: 100%;
					height: 40px;
					margin: 10px;
					line-height: 40px;
					position: relative;
					i {
						width: 2px;
						height: 28px;
						position: absolute;
						top: 6px;
						left: 0;
						background-color: #28a8e0;
					}
					h3 {
						width: 73px;
						height: 40px;
						margin-left: 10px;
						float: left;
						font-size: 16px;
					}
				}
			}
			.dian {
				width: 10px;
				height: 1px;
				border-top: 1px solid #e1e1e1;
				margin: 20px 5px;
				float: left;
			}
			.material-info-body {
				margin-top: 10px;
				width: 100%;
				padding-left: 40px;
				li {
					height: 30px;
					line-height: 30px;
					div {
						width: 33%;
						float: left;
					}
				}
			}
		}
		.new-inventory {
			width: 100%;
			margin-top: 10px;
			height: auto;
			.titleTop {
				width: 100%;
				height: 40px;
				overflow: hidden;
				.topbox {
					width: 100%;
					height: 40px;
					margin: 10px;
					line-height: 40px;
					position: relative;
					i {
						width: 2px;
						height: 28px;
						position: absolute;
						top: 6px;
						left: 0;
						background-color: #28a8e0;
					}
					h3 {
						width: 73px;
						height: 40px;
						margin-left: 10px;
						float: left;
						font-size: 16px;
					}
				}
			}
			.dian {
				width: 10px;
				height: 1px;
				border-top: 1px solid #e1e1e1;
				margin: 20px 5px;
				float: left;
			}
			.new-inventory-body {
				width: 1000px;
				height: auto;
				margin-top: 10px;
				li {
					margin-top: 20px;
					height: 40px;
					section {
						width: 400px;
						font-size: 20px;
						float: left;
						margin-left: 40px;
						h6 {
							height: 40px;
							line-height: 40px;
							float: left;
							text-align: left;
						}
						h6:after {
							content: "";
							margin: 0 5px;
						}
						span {
							height: 40px;
							line-height: 40px;
							float: left;
						}
						input {
							height: 40px;
							float: left;
							padding-left: 10px;
						}
					}
				}
			}
		}
		.operationTable {
			width: 100%;
			height: auto;
			margin-top: 20px;
			border: 1px solid #d2d2d2;
			p {
				width: 100%;
				height: 40px;
				line-height: 40px;
				margin-left: 20px;
			}
			.table-head {
				width: 100%;
				height: 40px;
				background: #f2f2f2;
				line-height: 40px;
				li {
					width: 20%;
					height: 40px;
					float: left;
					text-align: center;
				}
			}
			.table-head-edit {
				width: 100%;
				height: 40px;
				background: #f2f2f2;
				line-height: 40px;
				li {
					width: 40%;
					height: 40px;
					float: left;
					text-align: center;
					&:first-child {
						width: 20%;
					}
				}
			}
			.table-body {
				width: 100%;
				height: 60px;
				line-height: 60px;
				box-sizing: border-box;
				border-bottom: 1px solid #d2d2d2;
				&:last-child {
					border-bottom: none;
				}
				li {
					width: 20%;
					text-align: center;
					float: left;
				}
			}
			.table-body-edit {
				width: 100%;
				height: auto;
			}
			.table-body-edit-info {
				width: 40%;
				height: 60px;
				line-height: 60px;
				float: left;
				&:first-child {
					width: 20%;
				}
				li {
					height: 60px;
					text-align: center;
					border: 1px solid #d2d2d2;
					display: inline-block;
				}
			}
		}
		.operationTableEdit {
			width: 100%;
			height: auto;
			margin-top: 20px;
			border: 1px solid #d2d2d2;
			border-bottom: none;
			p {
				width: 100%;
				height: 40px;
				line-height: 40px;
				margin-left: 20px;
			}
			.table-head-edit {
				width: 100%;
				height: 40px;
				background: #f2f2f2;
				line-height: 40px;
				li {
					width: 40%;
					height: 40px;
					float: left;
					text-align: center;
					&:first-child {
						width: 20%;
					}
				}
			}
			.table-body-edit {
				width: 100%;
				height: auto;
			}
			.table-body-edit-info {
				width: 40%;
				height: 60px;
				line-height: 60px;
				float: left;
				&:first-child {
					width: 20%;
				}
				&:nth-child(2) li {
					border-right: none;
				}
				&:nth-child(3) li {
					border-left: none;
				}
				li {
					height: 60px;
					text-align: center;
					margin-top: -1px;
					border: 1px solid #d2d2d2;

				}
			}
		}
		.return {
			width: 100px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border: 1px solid #ccc;
			color: #ccc;
			position: absolute;
			right: 60px;
			top: 10px;
			cursor: pointer;
		}
	}
</style>