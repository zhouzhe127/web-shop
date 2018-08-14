<template>
	<section id="materials-putin-storage">
		<div class="material-info">
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
					<div>品牌：{{materialInfo.brandName}}</div>
					<div>最小单位：{{unitInfoMin}}</div>
					<div>保质期：{{materialInfo.validity+validityType}}</div>
				</li>
			</ul>
		</div>
		<div class="new-inventory">
			<div class="titleTop">
				<div class="topbox">
					<i></i>
					<h3>修改批次信息</h3>
					<div class="dian" v-for="i in 32" :key="i"></div>
				</div>
			</div>
			<ul class="new-inventory-body">
				<li>
					<section>
						<p>入库类型</p>
						<span>修改批次信息</span>
					</section>
					<section>
						<p>仓库</p>
						<span>{{existingBatchInfo.wName}}{{"-"}}{{existingBatchInfo.aName}}</span>
					</section>
				</li>
				<li>
					<section>
						<h6>批次编码</h6>
						<input type="text" placeholder="选填" v-model="batchCode" maxlength="20">
					</section>
					<section>
						<p>供应商</p>
						<section @click="showSupply" class="tableListInp chairFix" style="vertical-align: middle;">
							<span class="inptext">{{selectSupply}}</span>
							<div class="fl">
								<span class="addstyle">+</span>
							</div>
						</section>
					</section>
				</li>
				<li>
					<section>
						<p>生产日期</p>
						<section class="dateBox">
							<calendar :time="startTime" :format="'yyyy-MM-dd'" @emit="getStartTime"></calendar>
						</section>
					</section>
					<section>
						<p>失效日期</p>
						<section class="dateBox">
							<calendar :time="endTime" :format="'yyyy-MM-dd'" @emit="getEndTime"></calendar>
						</section>
					</section>
				</li>
				<li>
					<section>
						<h6>进价</h6>
						<input type="text" placeholder="选填" v-model="purchasePrice" maxlength="10">
					</section>
					<section>
						<h6>进价单位</h6>
						<span v-if="existingBatchInfo.purchaseUnit">{{getpiceunit(existingBatchInfo.purchaseUnit)}}</span>
					</section>
				</li>
				<li>
					<section>
						<h6>数量/重量</h6>
						<span>{{(materialInfo.num)}}{{unitInfoMin}}</span>
					</section>
					<section>
						<h6>货号</h6>
						<input type="text" placeholder="选填" v-model="articleNo" maxlength="20">
					</section>
				</li>
				<div class="note">
					<p>备注</p>
					<textarea placeholder="选填" v-model="remark" maxlength="40"></textarea>
				</div>
				<div class="prompt">
					<img src="../../../res/icon/prompt.png" alt="">
					<span>限40字以内</span>
				</div>
			</ul>
		</div>
		<ul class="btn">
			<li class="gray" @click="cancal">取消</li>
			<li class="orange" @click="confirm">确定</li>
		</ul>
		<multiple-win @winEvent="winEvent" :styles="{backgroundColor: '#F1F1F1'}" @selArray="winSel" :isradio="win.isradio" :selects="win.selects"
		    :title="win.title" v-if="win.show&&win.list.length>0" :name="win.name" :width="win.width" :height="win.height" :list="win.list" :selkey="win.selkey"></multiple-win>
		<warehouseWin ref="warehouse" :title="winTitle" :wareType="wareType" v-if="wareshow" @wareEvent="wareEvent"></warehouseWin>
	</section>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				allUnit: ['只', '个'], //单位
				unitName: '只', //默认单位
				startTime: '', //生产日期
				endTime: '', //失效日期
				newShopdetail: '',
				wareshow: false, //仓库下拉框显示
				wareType: 0,
				winTitle: '仓库位置',
				iswear: '',
				isarea: '',
				selectSupply: '选择供应商',
				win: {
					title: '供应商',
					show: false,
					list: [],
					width: 980,
					height: 400,
					isradio: true,
					name: 'name',
					selkey: 'id',
					selects: []
				},
				unitReady: [], //备用单位数组
				materialInfo: {}, //物料信息
				unitInfo: [], //单位信息
				unitInfoName: '', //单位名称
				unitInfoDefault: '', //默认单位
				unitInfoMin: '', //最小单位
				unitInfoValue: '', //单位换算
				unitInfoConversion: '', //单位换算
				cateInfo: [], //分类信息
				cateInfoName: '', //分类名字
				wid: '', //仓库id
				areaId: '', //区域id
				supplierId: '', //供应商Id
				number: '', //数量
				weight: '', //重量
				conversion: '', //换算
				purchasePrice: '', //进价
				purchaseUnit: '', //进价单位
				batchCode: '', //批次编码
				articleNo: '', //货号
				remark: '', //备注
				existingBatchInfo: {}, //已有批次信息
				conversionArr: [], //除了最小单位的换算数组
				smallUnit: '', //数量/重量的最小单位
				negative: '', //正负
				validityType: '', //保质期单位
				sameUnitConver: '' //同样单位换算
			};
		},
		methods: {
			getStartTime: function (time) {
				this.startTime = time;
			},
			getEndTime: function (time) {
				this.endTime = time;
			},
			getpiceunit(id){
				let str = ''
				for(let item of this.unitInfo){
					if(id == item.muId){
						str = item.name;
					}
				}
				return str;
			},
			dealData(arr, parm) {
				let unitArr = [];
				for (let item of arr) {
					unitArr.push(item[parm]);
				}
				return unitArr;
			},
			async init() {
				let res = await http.getMaterialDetail({
					data: {
						mid: this.existingBatchInfo.itemId
					}
				});
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
					if (this.existingBatchInfo.purchaseUnit == this.unitInfo[i].name) {
						this.conversion = this.unitInfo[i].value;
					} else {
						this.conversion = 1;
					}
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
			},
			wareEvent(str) {
				console.log(str);
				this.wareshow = false;
				if (str == 'ok') {
					this.wareClose();
				}
			},
			wareClose() {
				let wareWin = this.$refs.warehouse;
				if (!wareWin.chooseWare) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '请选择区域'
					});
					this.wareshow = true;
					return false;
				}
				this.iswear = wareWin.searchList[wareWin.homeSel].name;
				this.isarea = wareWin.chooseWare.areaName;
				this.wid = wareWin.homeId;
				this.areaId = wareWin.chooseWare.id;
			},
			showHouse() {
				this.wareshow = true;
			},
			async showSupply() {
				this.win.show = true;
				let data = await http.suppierList();
				this.win.list = data;
			},
			winSel(arr) {
				this.win.selects = arr;
				this.supplierId = arr[0];
				if (this.supplierId == undefined) {
					this.supplierId = '';
				}
				if (this.win.list.length > 0 && arr.length > 0) {
					this.selectSupply = this.win.list.find(p => p.id === arr[0]).name;
				}
			},
			winEvent(str) {
				this.win.show = false;
				if (str == 'ok') {
					this.openOrClose();
				}
			},
			cancal() {
				window.history.go(-1);
			},
			async confirm() {
				if (this.startTime > this.endTime) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '生产日期不能大于失效日期'
					});
					return;
				}
				let res = await http.updateBatch({
					data: {
						type: 1,
						batchId: this.existingBatchInfo.batchId,
						wid: this.wid,
						itemId: this.existingBatchInfo.itemId,
						batchCode: this.batchCode,
						supplierId: this.supplierId,
						articleNo: this.articleNo,
						purchasePrice: this.purchasePrice,
						productionTime: this.startTime / 1000,
						expiryTime: this.endTime / 1000,
						remark: this.remark
					}
				});
				if (res) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '修改成功',
						callback: (val) => {
							if (val == 'ok') {
								window.history.go(-1);
							}
						}
					});
				}
			}
		},
		mounted() {
			this.existingBatchInfo = storage.session('editInfo');
			this.wid = this.existingBatchInfo.wid;
			this.areaId = this.existingBatchInfo.areaId;
			this.supplierId = this.existingBatchInfo.supplierId;
			this.batchCode = this.existingBatchInfo.batchCode;
			this.selectSupply = this.existingBatchInfo.supplier;
			this.startTime = Number(this.existingBatchInfo.productionTime) * 1000;
			this.endTime = Number(this.existingBatchInfo.expiryTime) * 1000;
			this.purchasePrice = this.existingBatchInfo.purchasePrice;
			this.articleNo = this.existingBatchInfo.articleNo;
			this.remark = this.existingBatchInfo.remark;
			this.init();
		},
		components: {
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			warehouseWin: () =>
				import ( /*webpackChunkName: 'warehouse_win'*/ './warehouse_win'),
			multipleWin: () =>
				import ( /*webpackChunkName: 'multiple_win'*/ 'src/components/multiple_win'),
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
						p {
							width: 100px;
							height: 40px;
							line-height: 40px;
							float: left;
							text-align: right;
						}
						h6 {
							width: 100px;
							height: 40px;
							line-height: 40px;
							float: left;
							text-align: right;
						}
						p:after {
							content: "*";
							color: red;
							margin: 0 5px;
						}
						h6:after {
							content: "";
							color: red;
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
							width: 200px;
						}
						.tableListInp {
							color: #666666;
							border: #b3b3b3 solid 1px;
							height: 40px;
							width: 200px;
							display: inline-block;
							cursor: pointer;
							div {
								width: 41px;
								height: 40px;
								position: relative;
								z-index: 5;
							}
							.inptext {
								height: 39px;
								width: 157px;
								display: block;
								float: left;
								border-right: 1px #b3b3b3 solid;
								padding-left: 10px;
							}
							.addstyle {
								font-size: 30px;
								text-align: center;
								width: 100%;
								display: inline-block;
								color: #b2b2b2;
								line-height: 30px;
							}
						}
						.priceUnit {
							width: 300px;
							float: left;
						}
					}
					.dateBox {
						list-style: none;
						width: 200px;
						height: 40px;
						float: left;
					}
				}
				.note {
					width: 100%;
					margin-top: 30px;
					height: 80px;
					p {
						width: 100px;
						height: 40px;
						line-height: 40px;
						float: left;
						text-align: right;
					}
					p:after {
						content: "";
						color: red;
						margin: 0 5px;
					}
					textarea {
						width: 600px;
						height: 80px;
						float: left;
						padding-left: 10px;
					}
				}
				.prompt {
					width: 100%;
					height: 40px;
					img {
						margin-left: 100px;
						vertical-align: middle;
					}
					span {
						line-height: 40px;
						color: #ccc;
					}
				}
			}
		}
		.btn {
			width: 100%;
			height: 50px;
			margin-left: 100px;
			margin-top: 20px;
			li {
				width: 10%;
				height: 50px;
				margin-right: 30px;
				line-height: 50px;
				text-align: center;
				float: left;
				color: #fff;
			}
		}
	}
</style>