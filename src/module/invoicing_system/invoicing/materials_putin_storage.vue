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
					<!-- <div>单位换算：{{unitInfoConversion?unitInfoConversion:sameUnitConver}}</div> -->
					<div :class="{'bigDiv':materialInfo.unit && materialInfo.unit.length>3}">单位换算:
						<i v-for="(item,index) in materialInfo.unit" :key="index">1{{item.name}}={{item.value}}{{smallUnit}}
							<i v-if="index!=materialInfo.unit.length-1">&nbsp;&nbsp;|&nbsp;&nbsp;</i>
						</i>
					</div>
				</li>
				<li>
					<div>物料编码：{{materialInfo.barCode}}</div>
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
					<h3>新建库存</h3>
					<div class="dian" v-for="i in 32" :key="i"></div>
				</div>
			</div>
			<ul class="new-inventory-body" v-if="presenceBatches == 0">
				<li>
					<section>
						<p>入库类型</p>
						<span>新增入库</span>
					</section>
					<section>

					</section>
				</li>
				<li>
					<section>
						<p>仓库</p>
						<section @click="showHouse" class="tableListInp chairFix" style="vertical-align: middle;">
							<span class="inptext">{{iswear}}{{iswear&&"/"}}{{isarea}}</span>
							<div class="fl">
								<span class="addstyle">+</span>
							</div>
						</section>
					</section>
					<section>
						<h6>批次编码</h6>
						<input type="text" placeholder="选填" v-model="batchCode">
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
						<p>供应商</p>
						<section @click="showSupply" class="tableListInp chairFix" style="vertical-align: middle;">
							<span class="inptext">{{selectSupply}}</span>
							<div class="fl">
								<span class="addstyle">+</span>
							</div>
						</section>
					</section>
					<section>
						<h6>货号</h6>
						<input type="text" placeholder="选填" v-model="articleNo">
					</section>
				</li>
				<li>
					<section>
						<p>进价</p>
						<input type="text" placeholder="请输入进价" v-model="purchasePrice" maxlength="10">
					</section>
					<section>
						<p>进价单位</p>
						<section class="priceUnit">
							<selectBtn @selOn="getUnit" :sorts="allUnit" :name="unitName" :width="'200'"></selectBtn>
						</section>
					</section>
				</li>
				<div class="weightNum">
					<p>数量/重量</p>
					<input type="text" placeholder="0" v-model="number" maxlength="10">
					<!-- <selectBtn @selOn="getUnit" :sorts="allUnit" :name="unitName" :width="'100'" style="float:left;margin-left:10px;"></selectBtn> -->
					<span>{{unitName}}</span>
					<span v-if="unitName!=smallUnit">+</span>
					<input v-if="unitName!=smallUnit" type="text" placeholder="0" style="width:150px;" v-model="weight" maxlength="10">
					<div v-if="unitName!=smallUnit" class="weightNum-unit">{{smallUnit}}</div>
				</div>
				<div class="note">
					<p>备注</p>
					<textarea placeholder="请输入备注" v-model="remark" maxlength="40"></textarea>
				</div>
				<div class="prompt">
					<img src="../../../res/icon/prompt.png" alt="">
					<span>限40字以内</span>
				</div>
			</ul>
			<ul class="new-inventory-body" v-if="presenceBatches == 1">
				<li>
					<section>
						<h6>入库类型:</h6>
						<span>已有批次入库</span>
					</section>
					<section>
						<h6>批次编码:</h6>
						<span>{{existingBatchInfo.batchCode}}</span>
					</section>
				</li>
				<li>
					<section>
						<h6>仓库:</h6>
						<!-- <span>{{existingBatchInfo.wName}}{{"-"}}{{existingBatchInfo.aName}}</span> -->
						<section @click="showHouse" class="tableListInp chairFix" style="vertical-align: middle;">
							<span class="inptext">{{existingBatchInfo.wName||'暂无'}}/{{existingBatchInfo.aName||'暂无'}}</span>
							<div class="fl">
								<span class="addstyle">+</span>
							</div>
						</section>
					</section>
					<section>
						<h6>进价:</h6>
						<span>{{existingBatchInfo.distributionPrice}}元{{"/"}}{{getpiceunit(existingBatchInfo.distributionUnit)}}</span>
					</section>
				</li>
				<li>
					<section>
						<h6>生产日期:</h6>
						<span>{{timeConversion(existingBatchInfo.productionTime)}}</span>
					</section>
					<section>
						<h6>失效日期:</h6>
						<span>{{timeConversion(existingBatchInfo.expiryTime)}}</span>
					</section>
				</li>
				<li>
					<section>
						<h6>供应商:</h6>
						<span>{{existingBatchInfo.supplier}}</span>
					</section>
					<section>
						<h6>货号:</h6>
						<span>{{existingBatchInfo.articleNo}}</span>
					</section>
				</li>
				<div class="weightNum">
					<p>数量/重量</p>
					<input type="text" placeholder="0" v-model="number" maxlength="10">
					<!-- <span>{{existingBatchInfo.purchaseUnit.name}}</span>
					<span v-if="existingBatchInfo.purchaseUnit.name!=smallUnit">+</span>
					<input v-if="existingBatchInfo.purchaseUnit.name!=smallUnit" type="text" placeholder="0" style="width:200px;" v-model="weight"
					    maxlength="10">
					<div v-if="existingBatchInfo.purchaseUnit.name!=smallUnit" class="weightNum-unit">{{smallUnit}}</div> -->
					<span>{{unitName}}</span>
					<span v-if="unitName!=smallUnit">+</span>
					<input v-if="unitName!=smallUnit" type="text" placeholder="0" style="width:150px;" v-model="weight" maxlength="10">
					<div v-if="unitName!=smallUnit" class="weightNum-unit">{{smallUnit}}</div>
				</div>
				<div class="note">
					<p>备注</p>
					<span>{{existingBatchInfo.remark}}</span>
				</div>
			</ul>
		</div>
		<ul class="btn">
			<li class="gray" @click="cancal">取消</li>
			<li @click="continuePutin">继续入库</li>
			<li class="orange" @click="confirm">确定</li>
		</ul>
		<multiple-win :styles="{backgroundColor: '#F1F1F1'}" @selArray="winSel" :isradio="win.isradio" :selects="win.selects"
		    :title="win.title" v-if="win.show&&win.list.length>0" :name="win.name" :width="win.width" :height="win.height" :list="win.list" :selkey="win.selkey"></multiple-win>
		<warehouseWin ref="warehouse" :goodsWid="goodsWid" :goodsareaId="goodsareaId" :title="winTitle" :wareType="wareType" v-if="wareshow"
		    @wareEvent="wareEvent"></warehouseWin>
	</section>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				presenceBatches: '0', //有无批次
				allUnit: [], //单位
				unitName: '', //默认单位
				startTime: '', //生产日期
				endTime: '', //失效日期
				newShopdetail: {},
				wareshow: false, //仓库下拉框显示
				wareType: 0,
				winTitle: '仓库位置',
				iswear: '请选择仓库',
				isarea: '区域',
				selectSupply: '请选择供应商',
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
				getInfo: {}, //点击入库接收的数据
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
				successInfo: null, //入库成功信息
				conversionArr: [], //除了最小单位的换算数组
				smallUnit: '', //数量/重量的最小单位
				UnitDataInfo: '', //通过物料id获取的单位信息
				validityType: '', //保质期单位
				sameUnitConver: '', //同样单位换算
				goodsWid: '', //老批次入库wid
				goodsareaId: ''
			};
		},
		// watch:{
		//     'unitName': 'init'
		// },
		methods: {
			getStartTime: function (time) {
				this.startTime = time;
			},
			getEndTime: function (time) {
				this.endTime = time + 24 * 60 * 60 * 1000 - 1;
			},
			getUnit: function (res) {
				this.purchaseUnit = this.unitReady[res].id;
				this.unitName = this.unitReady[res].name;
				this.conversion = this.unitReady[res].value;
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
						mid: this.getInfo.type == 1 ? this.getInfo.id : this.existingBatchInfo.itemId
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
				console.log(arrUnit);
				this.conversionArr = arrUnit;
				this.unitInfoName = this.dealData(this.unitInfo, 'name').join('、');
				this.unitInfoConversion = this.dealData(this.conversionArr, 'unitConversion').join('|');
				this.cateInfo = res.cate;
				this.cateInfoName = this.dealData(this.cateInfo, 'name').join('、');
				let unit = await http.getUnitByMid({
					data: {
						mid: this.getInfo.type == 1 ? this.getInfo.id : this.existingBatchInfo.itemId
					}
				});
				this.UnitDataInfo = unit;
				let arr = [];
				let arr1 = [];
				unit.forEach((item) => {
					if (item.isMin == 1 && item.isDefault == 1) {
						this.smallUnit = item.name;
						this.unitName = item.name;
						this.conversion = 1;
						this.purchaseUnit = item.muId;
					} else if (item.isMin == 1) {
						this.smallUnit = item.name;
					} else if (item.isDefault == 1) {
						this.unitName = item.name;
						this.conversion = item.value;
						this.purchaseUnit = item.muId;
					}
					arr.push(item.name);
					let obj = {
						id: item.muId,
						name: item.name,
						value: item.value
					};
					arr1.push(obj);
				});
				this.allUnit = arr;
				this.unitReady = arr1;
			},
			async putStorage() {
				if (isNaN(this.purchasePrice) == true) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '进价请输入数字'
					});
					return;
				}
				if (isNaN(this.number) == true) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '数量请输入数字'
					});
					return;
				}
				if (isNaN(this.weight) == true) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '重量请输入数字'
					});
					return;
				}
				if (this.getInfo.type == 1) {
					let res = await http.addInventory({
						data: {
							itemId: this.getInfo.id,
							type: 1,
							wid: this.wid,
							areaId: this.areaId,
							supplierId: this.supplierId,
							totalSurplus: Number(this.number) * this.conversion + Number(this.weight),
							purchasePrice: this.purchasePrice,
							purchaseUnit: this.purchaseUnit,
							productionTime: parseInt(this.startTime / 1000),
							expiryTime: parseInt(this.endTime / 1000),
							batchCode: this.batchCode,
							articleNo: this.articleNo,
							remark: this.remark
						}
					});
					this.successInfo = res;
				} else if (this.getInfo.type == 2) {
					// this.listenValue();
					let res = await http.goodsinventoryAddNum({
						data: {
							itemId: this.existingBatchInfo.itemId,
							type: 1,
							batchId: this.existingBatchInfo.batchId,
							wid: this.existingBatchInfo.wid,
							areaId: this.existingBatchInfo.areaId,
							num: Number(this.number) * this.conversion + Number(this.weight),
						}
					});
					this.successInfo = res;
				}

			},
			// listenValue() {
			// 	console.log(this.existingBatchInfo.purchaseUnit)
			// 	console.log(this.UnitDataInfo)
			// 	for (let i = 0; i < this.UnitDataInfo.length; i++) {
			// 		if (this.existingBatchInfo.purchaseUnit.name == this.UnitDataInfo[i].name) {
			// 			this.conversion = this.UnitDataInfo[i].value;
			// 		}
			// 	}
			// },
			wareEvent(str) {
				console.log(str);
				this.wareshow = false;
				if (str == 'ok') {
					this.wareClose();
				}
			},
			wareClose() {
				let wareWin = this.$refs.warehouse;
				console.log(wareWin);
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
				if (this.existingBatchInfo) {
					this.existingBatchInfo.aName = wareWin.chooseWare.areaName;
					this.existingBatchInfo.areaId = wareWin.chooseWare.id;
					this.goodsareaId = wareWin.chooseWare.id;
				}
			},
			showHouse() {
				this.wareshow = true;
			},
			async showSupply() {
				this.win.show = true;
				let data = await http.suppierList();
				this.win.list = data;
				console.log(data);
			},
			winSel(arr,str) {
				this.win.show = false;
				if(str=='ok'){
					this.win.selects = arr;
					this.supplierId = arr[0];
					if (this.supplierId == undefined) {
						this.supplierId = '';
					}
					if (this.win.list.length > 0 && arr.length > 0) {
						this.selectSupply = this.win.list.find(p => p.id === arr[0]).name;
					}
				}
				
			},
			// winEvent(str) {
			// 	this.win.show = false;
			// 	if (str == 'ok') {
			// 		this.openOrClose();
			// 	}
			// },
			cancal: function () {
				if (this.getInfo.type == 1) {
					storage.session('tabactive', 1);
					this.$router.push({
						path: '/admin/inventoryManagement',
						query: this.$route.query
					});
				} else if (this.getInfo.type == 2) {
					window.history.go(-1);
				}
			},
			getpiceunit(id){
				let str = ''
				for(let item of this.UnitDataInfo){
					if(id == item.muId){
						str = item.name;
					}
				}
				return str;
			},
			async confirm() {
				if (this.getInfo.type == 1) {
					if (this.startTime > this.endTime) {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '生产日期不能大于失效日期'
						});
						return;
					}
					if (this.wid == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请选择仓库'
						});
						return;
					}
					if (this.areaId == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请选择区域'
						});
						return;
					}
					if (this.supplierId == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请选择供应商'
						});
						return;
					}
					if (this.purchasePrice == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请输入进价'
						});
						return;
					}
					if (this.number == '' && this.weight == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请输入数量/重量'
						});
						return;
					}
					if (this.number + this.weight == 0) {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '数量/重量不能为0'
						});
						return;
					}
					if (this.purchaseUnit == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请选择进价单位'
						});
						return;
					}
				} else if (this.getInfo.type == 2) {
					if (this.startTime > this.endTime) {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '生产日期不能大于失效日期'
						});
						return;
					}
					if (this.number == '' && this.weight == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请输入数量'
						});
						return;
					}
				}
				await this.putStorage();
				if (this.getInfo.type == 1) {
					storage.session('tabactive', 1);
					if (this.successInfo) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '入库成功',
							callback: (val) => {
								if (val == 'ok') {
									this.$router.push({
										path: '/admin/inventoryManagement',
										query: this.$route.query
									});
								}
							}
						});
					}
				} else if (this.getInfo.type == 2) {
					if (this.successInfo) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '入库成功',
							callback: (val) => {
								if (val == 'ok') {
									window.history.go(-1);
								}
							}
						});
					}
				}
			},
			async continuePutin() {
				if (this.getInfo.type == 1) {
					if (this.startTime > this.endTime) {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '生产日期不能大于失效日期'
						});
						return;
					}
					if (this.wid == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请选择仓库'
						});
						return;
					}
					if (this.areaId == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请选择区域'
						});
						return;
					}
					if (this.supplierId == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请选择供应商'
						});
						return;
					}
					if (this.purchasePrice == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请输入进价'
						});
						return;
					}
					if (this.number == '' && this.weight == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请输入数量/重量'
						});
						return;
					}
					if (this.number + this.weight == 0) {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '数量/重量不能为0'
						});
						return;
					}
					if (this.purchaseUnit == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请选择进价单位'
						});
						return;
					}
				} else if (this.getInfo.type == 2) {
					if (this.startTime > this.endTime) {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '生产日期不能大于失效日期'
						});
						return;
					}
					if (this.number == '' && this.weight == '') {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请输入数量'
						});
						return;
					}
				}
				await this.putStorage();
				if (this.getInfo.type == 1) {
					if (this.successInfo) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '入库成功',
						});
					}
				} else if (this.getInfo.type == 2) {
					if (this.successInfo) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '入库成功',
						});
					}
				}
				this.getUnit(0);
				this.supplierId = '';
				this.selectSupply = '请选择供应商';
				this.number = '0';
				this.weight = '0';
				this.purchasePrice = '';
				this.startTime = new Date().setHours(0, 0, 0, 0);
				this.endTime = new Date().setHours(23, 59, 59, 999);
				this.win.selects = [];
				this.batchCode = '';
				this.articleNo = '';
				this.remark = '';
			},
			timeConversion(time) {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm:ss');
			}
		},
		mounted() {
			this.existingBatchInfo = storage.session('putstoreInfo');
			this.getInfo = this.$route.query;
			if (this.getInfo.type == 1) {
				this.presenceBatches = 0;
			} else if (this.getInfo.type == 2) {
				this.presenceBatches = 1;
				this.goodsWid = this.existingBatchInfo.wid; //老批次入库已有wid
				this.goodsareaId = this.existingBatchInfo.areaId;
			}
			this.init();
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(23, 59, 59, 999);
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
				.bigDiv {
					width: 100%;
					display: block;
				}
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
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
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
				.weightNum {
					margin-top: 20px;
					height: 40px;
					p {
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
					input {
						height: 40px;
						width: 100px;
						padding-left: 10px;
						float: left;
					}
					span {
						margin: 10px 5px 0 5px;
						float: left;
					}
					.weightNum-unit {
						width: 40px;
						height: 40px;
						border: 1px solid #ccc;
						border-left: none;
						text-align: center;
						line-height: 40px;
						float: left;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
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
						resize: none;
						width: 600px;
						height: 80px;
						float: left;
						border: 1px #ccc solid;
					}
					span {
						line-height: 40px;
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
				&:nth-child(2) {
					background: #fff;
					border: 1px solid orange;
					color: orange;
					cursor: pointer;
				}
			}
		}
	}
</style>