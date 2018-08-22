<template>
	<div id="batchSchedule">
		<div class="split-title">
			批量调度
		</div>
		<div class="innerBox">
			<ul>
				<li>
					<span>出货仓库：</span>
					<span>{{wName}}</span>
					<img src="../../../res/images/evret.jpg" @click="addShow = true" alt="">
				</li>
			</ul>
			<ul>
				<li>
					<span>配货方式：</span>
					<el-select v-model="allot" placeholder="请选择">
						<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</li>
			</ul>
		</div>
		<ul class="typeBox">
			<li v-for="(item,index) in typeData" :class="{active:typeactive==index}" @click="typeBox(index)" :key="index">{{item}}</li>
		</ul>
		<batch-goods :proData="goodsList" :allot="allot" v-if="options.length>0" v-show="typeactive==0" ref="goods"></batch-goods>
		<batch-supplies :proData="materialList" :allot="allot" v-if="options.length>0" v-show="typeactive==1" ref="supplies"></batch-supplies>
		<add-store :pObj="comObj" v-if="addShow" @throwWin="throwWin"></add-store>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				addShow: false,
				typeData: ['商品', '物料'],
				typeactive: 0,
				options: [],
				allot: 5,
				goodsList: [], //商品数据
				materialList: [], //物料数据
				wName: '',
				getData: {},
				isBrand:false
			};
		},
		methods: {
			async init() {
				let data = await http.invgetMultiApplicationMatchList({
					data: this.getData
				});
				this.setgoodsKey(data.goodsList);
				this.setSuppliesKey(data.materialList);
				if (this.goodsList.length <= 0 && this.materialList.length > 0) this.typeactive = 1;
				console.log(data);
			},
			async getType() {
				let res = await http.invgetAllocationType();
				this.options = res;
			},
			setgoodsKey(data) { //处理商品数据
				this.goodsList = [];
				for (let item of data) {
					let cil = 0; //申请单数
					let applyNum = 0; //申请总数
					let applyAverage = 0; //平均申请数
					let listArr = {};
					let arr = [];
					if (item.list && item.list.length > 0) {
						item.list.map(v => {
							let obj = {};
							Object.assign(obj, {
								shopName: v.shopName,
								warehouse: v.warehouse,
								num: v.num || 0,
								itemId: v.itemId, //入货商品ID
								wid: v.wid,
								applyId: v.applyId,
								isSuccess: v.isSuccess,
								applyScale: 0, //按比例
								average: 0, //平均分配
								outNum: 0 //出货量
							});
							if (Number(v.isSuccess) == 1) {
								applyNum += parseInt(v.num*1000);
								cil++;
							}
							arr.push(obj)
						});
						arr.sort(this.sortSuccess)
					}
					applyNum = applyNum/1000;
					Object.assign(listArr, {
						itemName: item.itemName,
						id: item.itemId,
						type: item.type,
						unit: item.unit,
						surplus: item.surplus,
						list: arr,
						grossOutnum: applyNum > item.surplus ? item.surplus : applyNum, //出货量
						applyAverage: Math.floor(applyNum / cil) || 0, //平均申请量
						applyAll: applyNum, //申请总量
						cil: cil,
						allot: this.allot,
						showList: true //是否展开
					});
					this.goodsList.push(listArr);
				}
				this.goodsList = utils.deepCopy(this.goodsList);
			},
			setSuppliesKey(data) { //处理物料数据
				this.materialList = [];
				for (let item of data) {
					let cil = 0; //申请单数
					let applyNum = 0; //申请总数
					let applyAverage = 0; //平均申请数
					let checkisDefault = false; //是否为默认单位
					let listArr = {};
					let arr = [];
					item.distribution = item.distribution.concat([{
						distributionId: -1,
						value: '',
						distributionName: '等于进价',
						unitId: ''
					}, {
						distributionId: -2,
						value: 0,
						distributionName: '自定义价格',
						unitId: ''
					}]);
					if (item.list && item.list.length > 0) {
						item.list.map(v => {

							let obj = {};
							let applyUnit = this.applyUnit(v.unitName, item.unit, 1);
							let setdistrid = this.setdistrid(v.distributionId, item.distribution);
							let piceUnitid = this.applyUnit(setdistrid, item.unit);
							Object.assign(obj, {
								shopName: v.shopName,
								warehouse: v.warehouse,
								applyId: v.applyId,
								wid: v.wid,
								itemId: v.itemId, //入货物料ID
								unit: v.unit,
								unitName: applyUnit.name,
								unitValue: applyUnit.value,
								piceUnitid: piceUnitid.muId,
								isPurchase: 0, //是否为进价
								num: v.num || 0,
								distrId: v.distributionId,
								distributionId: Number(setdistrid.distributionId),
								piceValue: setdistrid.value,
								isSuccess: v.isSuccess,
								applyScale: 0, //按比例
								average: 0, //平均分配
								outNum: 0 //出货量
							});
							if (Number(v.isSuccess) == 1) {
								applyNum += Number(v.num);
								cil++;
							}
							arr.push(obj);
						});
						arr.sort(this.sortSuccess);
						for (let i = 0; i < arr.length - 2; i++) {
							if (arr[i].isSuccess == 1 && arr[i + 1].isSuccess == 1) {
								if (arr[i].unit != arr[i + 1].unit) {
									checkisDefault = true;
								}
							}
						}
					}
					let topUnit = '';
					if (checkisDefault) {
						topUnit = this.applyUnit(false, item.unit);
					} else {
						topUnit = this.applyUnit(item.list[0].unitName, item.unit,1);
					}
					Object.assign(listArr, {
						itemName: item.itemName,
						id: item.itemId,
						type: item.type,
						unit: item.unit,
						unitName: topUnit.name,
						unitValue: topUnit.value,
						surplus: item.surplus,
						list: arr,
						distribution: item.distribution,
						grossOutnum: this.calevalue(applyNum > item.surplus ? item.surplus : applyNum, topUnit.value), //出货量
						applyAverage: Math.floor(applyNum / cil) || 0, //平均申请量
						applyAll: applyNum, //申请总量
						cil: cil,
						allot: this.allot,
						showList: true //是否展开
					});
					this.materialList.push(listArr);
				}
				this.materialList = utils.deepCopy(this.materialList);
			},
			calevalue(num, value) {
				if (value) {
					return parseInt(num / value * 1000) / 1000;
				} else {
					return num;
				}
			},
			setdistrid(id, arr) {
				let check = true;
				let obj = '';
				for (let item of arr) {
					if (item.distributionId == id) {
						obj = item;
						check = false;
					}
				}
				if (check) obj = arr[arr.length - 1];
				return obj;
			},
			applyUnit(id, unit, type) {
				let res = '';
				let df = ''; //默认单位
				let check = false;
				for (let item of unit) {
					if (id || id === 0) {
						let cf = type==1?item.name:item.muId
						if (id == cf) {
							res = item;
							check = true;
						}
					}
					if (item.isDefault == 1) {
						df = item;
					}
				}
				if (!check) res = df;
				return res;
			},
			sortSuccess(x, y) {
				if (x.isSuccess == 0 && y.isSuccess == 1) {
					return 1;
				} else {
					return -1;
				}
			},

			typeBox(index) {
				this.typeactive = index;
			},
			throwWin(str, res) {
				this.addShow = false;
				if (str == 'ok') {
					console.log(res);
					if (res.id == this.getData.wid) {
						this.$message({
							message: '出货仓库不能与入货仓库重复,请重新选择',
							type: 'warning'
						});
						this.addShow = true;
					} else {
						this.getData.wid = res.id;
						this.wName = res.name;
						this.init();
					}
				}
			},
			async getWarehouse() {
				//获取仓库列表
				let data = await http.warehouseList();
				let arr = [];
				if (data) {
					for (let item of data) {
						let obj = {
							id: item.id,
							name: item.name
						};
						if (item.shopId != 0) { //单店
							obj.ischain = 0;
							obj.shopId = item.shopId;
						} else { //品牌
							obj.ischain = 1;
							obj.shopId = item.brandId;
						}
						arr.push(obj);
					}
					this.comObj = {
						allList: arr,
					};
				}
			},
			goodshopSet(arrgoods) {
				let arr = [];
				arrgoods.map(res => {
					let obj = {
						applyId: res.applyId,
						intoWarehouse: res.wid,
						intoItemId: res.itemId,
						num: res.outNum || 0,
						selectUnitName: res.unit,
						intoWarehouseName: res.warehouse,
						intoWarehouseOwner: res.shopName,
						applyNum: res.num,
						isSuccess: res.isSuccess
					}
					arr.push(obj);
				});
				return arr;
			},
			surplusshopSet(item) {
				let arr = [];
				let arrsurplus = item.list
				arrsurplus.map(res => {
					let unit = this.applyUnit(res.piceUnitid, item.unit);
					let obj = {
						applyId: res.applyId,
						num: res.outNum * res.unitValue || 0,
						intoWarehouse: res.wid,
						intoItemId: res.itemId,
						selectUnitName: res.unitName,
						intoWarehouseName: res.warehouse,
						intoWarehouseOwner: res.shopName,
						applyNum: res.num,
						distributionPrice: res.piceValue, //分销价格
						distributionUnit: res.isPurchase == 1 ?  0:unit.muId||0,
						isPurchase: this.isBrand? res.isPurchase:1, //是否为进价
						isSuccess: res.isSuccess
					}
					arr.push(obj);
				});
				return arr;
			},
			setoutputData() { //处理给后台的数据
				let goodsData = this.$refs.goods.goodsList;
				let suppliesData = this.$refs.supplies.materialList;
				let sendGoods = [];
				let sendsupplies = [];
				for (let item of goodsData) {
					let objGoods = {
						id: item.id,
						name: item.itemName,
						invenNum: item.surplus,
						allocationType: item.allot,
						detail: this.goodshopSet(item.list)
					}
					sendGoods.push(objGoods);
				}
				for (let item of suppliesData) {
					let objSupplies = {
						id: item.id,
						name: item.itemName,
						type: item.type,
						invenNum: item.surplus,
						allocationType: item.allot,
						selectUnitName: item.unitName,
						detail: this.surplusshopSet(item)
					}
					sendsupplies.push(objSupplies);
				}
				let obj = {
					outWarehouse: this.getData.wid,
					goodsDetail: sendGoods,
					materialDetail: sendsupplies
				}
				this.confirms(obj);
			},
			async confirms(obj) {
				let data = await http.invaddMultDispatchRecord({
					data: obj
				});
				if (data) {
					storage.session("batch_schedule",data);
					this.$router.push({
						path: '/admin/conclusionList/multipleExamine'
					});
					this.$message({
						message: '调度成功',
						type: 'success'
					});
				}
			},
			addEduce() {
				this.$store.commit('setPageTools', [{
					name: '确认调度',
					className: 'primary',
					fn: () => {
						this.$confirm('确定批量调度?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.setoutputData();
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消'
							});  
						});
					},
					type: 4
				}, {
					name: '取消',
					className: 'info',
					fn: () => {
						window.history.go(-1);
					},
					type: 4
				}]);
			}
		},
		mounted() {
			let needStor = storage.session('mulSelectDispatch');
			this.isBrand = storage.session('userShop').currentShop.ischain == '3'? true : false;
			this.wName = needStor.wName;
			Object.assign(this.getData, {
				wid: needStor.wid,
				param: needStor.param
			})
			this.init();
			this.getType();
			this.getWarehouse();
			this.addEduce();
		},
		components: {
			batchSupplies: () =>
				import ( /*webpackChunkName: 'batch_supplies'*/ './batch_supplies'),
			batchGoods: () =>
				import ( /*webpackChunkName: 'batch_goods'*/ './batch_goods'),
			addStore: () =>
				import ( /*webpackChunkName:'choose_warehouse__win'*/
					'src/module/invoicing_system/warehouse_manage/choose_warehouse_win'),
		},
		// computed: {},
	}
</script>
<style lang='less' scoped>
	#batchSchedule {
		.split-title {
			text-indent: 15px;
			border-left: 2px solid #29a8e0;
			margin-bottom: 20px;
			.mixin(#333, 20px, 16px);
			&:after {
				content: '';
				display: inline-block;
				border: 1px dashed #ddd;
				width: 470px;
				position: relative;
				left: 20px;
				top: -4px;
			}
		}
		.mixin(@color, @height, @size) {
			color: @color;
			height: @height;
			line-height: @height;
			font-size: @size;
		}
		.innerBox {
			padding-left: 50px;
			ul {
				display: inline-block;
				width: 32%;
				vertical-align: top;
				li {
					margin-bottom: 20px;
					height: 40px;
					line-height: 40px;
					display: flex;
					align-items: center;
					span {
						display: inline-block;
						max-width: 70%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 16px;
					}
					img {
						cursor: pointer;
						margin: 0 10px;
						width: 18px;
						height: 18px;
						display: inline-block;
					}
				}
			}
		}
		.typeBox {
			margin-top: 15px;
			li {
				width: 100px;
				height: 35px;
				text-align: center;
				line-height: 35px;
				display: inline-block;
				margin-right: 10px;
				cursor: pointer;
				background-color: #eeeeee;
				border-radius: 5px;
			}
			.active {
				background-color: #E1BB4A;
				color: #ffffff;
			}
		}

	}
</style>