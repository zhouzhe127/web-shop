<template>
	<div class="invendetail">
		<div class="titleTop">
			<div class="topbox">
				<i></i>
				<h3>商品详情</h3>
				<div class="dian" v-for="i in 32" :key="i"></div>
			</div>
		</div>
		<section style="width:750px;height:auto;margin-top: 20px;">
			<div class="cList" style="width: 750px;padding-left: 7%;">
				<div style="width: 49%;display: inline-block;">
					<div style="width:100%;height:40px;">
						<h3 class="showBefore">名称:</h3>
						<div class="shopAfter">{{newShopdetail.gName||"--"}}</div>
					</div>
					<div style="width:100%;height:40px;">
						<h3 class="showBefore">品牌:</h3>
						<div class="shopAfter">{{newShopdetail.brandName||"--"}}</div>
					</div>
					<div style="width:100%;height:40px;">
						<h3 class="showBefore">分类:</h3>
						<div class="shopAfter">{{showCate(newShopdetail.cate)}}</div>
					</div>
				</div>
				<div style="width: 49%;display: inline-block;vertical-align: top;">
					<div style="width:100%;height:40px;">
						<h3 class="showBefore">条码:</h3>
						<div class="shopAfter">{{newShopdetail.barCode||"--"}}</div>
					</div>
					<div style="width:100%;height:40px;">
						<h3 class="showBefore">规格:</h3>
						<div class="shopAfter">{{newShopdetail.specifications||"--"}}</div>
					</div>
					<div style="width:100%;height:40px;">
						<h3 class="showBefore">单位:</h3>
						<div class="shopAfter">{{newShopdetail.unit||"--"}}</div>
					</div>
					<div style="width:100%;height:40px;">
						<h3 class="showBefore">有效期:</h3>
						<div class="shopAfter">
							{{newShopdetail.validity||"--"}}
							<span v-if="newShopdetail.validityType==1">日</span>
							<span v-if="newShopdetail.validityType==0">月</span>
							<span v-if="newShopdetail.validityType==2">年</span>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div class="titleTop">
			<div class="topbox">
				<i></i>
				<h3>新建库存</h3>
				<div class="dian" v-for="i in 32" :key="i"></div>
			</div>
		</div>
		<div class="coninp" v-if="isStatus==0">
			<div class="cList conbox">
				<div class="leftform">
					<div>
						<label class="content-box">
							<span class="required">入库类型</span>
							<span v-if="isoldStatus" class="right" style="border:none;">新增入库</span>
							<span v-else class="right" style="border:none;">新增批次</span>
						</label>
						<div class="content-box" v-if="isOk">
							<span class="required">生产日期</span>
							<div class="orMaRetBox">
								<calendar :only="false" :time="startTime" :calStyle="{'width':'230px'}" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
							</div>
						</div>
						<label class="content-box">
							<span class="required">数量</span>
							<input v-model="newNum" class="right" @input="changeNum" type="text" placeholder="请填写入库数量" maxlength="10" />
						</label>
						<label class="content-box">
							<span class="required">进价</span>
							<input v-model="purchasePrice" class="right" type="text" placeholder="请输入进价" maxlength="10" />
						</label>
						<label class="content-box">
							<span class="required icon-none">批次编码</span>
							<input v-model="batchCode" class="right" type="text" placeholder="选填" maxlength="20" />
						</label>
					</div>
				</div>
				<div class="leftform">
					<div>
						<label class="content-box">
							<span class="required">仓库</span>
							<section @click="showHouse" class="tableListInp chairFix" style="vertical-align: middle;">
								<span class="inptext">{{iswear}}{{iswear&&"/"}}{{isarea}}</span>
								<div class="fl">
									<span class="addstyle">+</span>
								</div>
							</section>
						</label>
						<div class="content-box">
							<span class="required">失效日期</span>
							<section class="orMaRetBox" style="margin-right: 30px;">
								<calendar :only="false" :calStyle="{'width':'230px'}" :time="endTime" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
							</section>
						</div>
						<label class="content-box">
							<span class="notop">供应商</span>
							<section @click="showSupply" class="tableListInp chairFix" style="vertical-align: middle;">
								<span class="inptext">{{selectSupply}}</span>
								<div class="fl">
									<span class="addstyle">+</span>
								</div>
							</section>
						</label>
						<label class="content-box">
							<span class="required icon-none">货号</span>
							<input v-model="artNo" class="right" type="text" placeholder="选填" maxlength="20" />
						</label>
					</div>
				</div>
				<label class="content-box" style="vertical-align: top;">
					<span class="required icon-none">备注</span>
					<textarea v-model="remarks" maxlength="40" class="right remark" placeholder="请填写备注信息"></textarea>
				</label>
				<div class="boxbottom">
					<a href="javascript:void(0);" class="gray del" @click="cancel">取消</a>
					<a @click="continueSave" href="javascript:void(0);" class="yellow continus" style="">继续入库</a>
					<a @click="batchSave" href="javascript:void(0);" class="yellow" style="width: 110px;">确认入库</a>
				</div>
			</div>
		</div>

		<div v-if="isStatus==1" class="cList coninp" style="width: 750px;margin-top: 20px;overflow: hidden;">
			<div style="width: 49%;display: inline-block;float: left;">
				<div class="info-content userinfo conbox">
					<label class="content-box">
						<span class="required icon-none" style="color: #ccc;">入库类型:</span>
						<span style="color: #ccc;display: inline-block;width: 230px;height: 40px;">已有批次入库</span>
					</label>
					<label class="content-box">
						<span class="required icon-none" style="color: #ccc;vertical-align: top;">生产日期:</span>
						<span style="color: #ccc;display: inline-block;width: 230px;height: 40px;">{{productionTime}}</span>
					</label>
					<label class="content-box">
						<span class="required">数量:</span>
						<input v-model="houseTotal" @input="changehouseTotal" class="right" type="text" placeholder="请填写入库数量" maxlength="10" />
					</label>
					<label class="content-box">
						<span class="required icon-none" style="color: #ccc;">批次编码:</span>
						<span style="color: #ccc;display: inline-block;vertical-align: top;width: 230px;height: 40px;">{{newareaName.batchCode}}</span>
					</label>
				</div>
			</div>
			<div style="width: 49%;display: inline-block;float: left;">
				<div class="info-content userinfo conbox">
					<label class="content-box" style="height: 41px;overflow: hidden;">
						<span class="required icon-none" style="float: left;">仓库:</span>
						<!-- <span style="color: #ccc;display: inline-block;width: 230px;height: 40px;float: left;">{{newareaName.wName||'暂无'}}/{{newareaName.aName||'暂无'}}</span> -->
						<section @click="showHouse" class="tableListInp chairFix" style="vertical-align: middle;">
							<span class="inptext">{{newareaName.wName||'暂无'}}/{{newareaName.aName||'暂无'}}</span>
							<div class="fl">
								<span class="addstyle">+</span>
							</div>
						</section>
					</label>
					<label class="content-box" style="height: 41px;overflow: hidden;">
						<span class="required icon-none" style="color: #ccc;float: left;">失效日期:</span>
						<span style="color: #ccc;display: inline-block;width: 230px;height: 40px;float: left;">{{invalidTime}}</span>
					</label>
					<label class="content-box" style="height: 41px;overflow: hidden;">
						<span class="required icon-none" style="color: #ccc;float: left;">供应商:</span>
						<span style="color: #ccc;display: inline-block;width: 230px;height: 40px;float: left;">{{newareaName.supplier}}</span>
					</label>
					<label class="content-box" style="height: 41px;overflow: hidden;">
						<span class="required icon-none" style="color: #ccc;float: left;">货号:</span>
						<span style="color: #ccc;display: inline-block;width: 230px;height: 40px;float: left;">{{newareaName.articleNo}}</span>
					</label>
				</div>
			</div>
			<div class="info-content userinfo conbox" style="float: left;">

				<label class="content-box" style="height: 80px;">
					<span class="required icon-none" style="vertical-align: top;color: #ccc;">备注:</span>
					<span class="right" style="color: #ccc;display: inline-block;width: 460px;height: 80px;">{{newareaName.remark}}</span>
				</label>
			</div>

			<div style="margin-top: 50px;margin-left: 120px;float: left;">
				<a href="javascript:void(0);" class="gray" style="width: 110px;" @click="cancel">取消</a>
				<a v-if="isStatus!=1" @click="continueSave" href="javascript:void(0);" class="blue" style="width: 110px;margin-right: 20px;">继续添加</a>
				<a v-on:click.stop="batchSave" href="javascript:void(0);" class="yellow" style="width: 110px;margin-right: 20px;">保存</a>
			</div>
		</div>
		<div class="coninp" v-if="isStatus==2">
			<div class="cList conbox">
				<div class="leftform">
					<div>
						<label class="content-box" style="height: 41px;overflow: hidden;">
							<span class="required" style="float: left;">仓库</span>
							<span style="display: inline-block;width: 230px;height: 40px;padding-left: 10px;float: left;">{{newareaName.wName||'暂无'}}/{{newareaName.aName||'暂无'}}</span>
						</label>
						<div class="content-box" v-if="isOk">
							<span class="required">生产日期</span>
							<div class="orMaRetBox">
								<calendar :only="false" :calStyle="{'width':'230px'}" :time="startTime" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
							</div>
						</div>
						<label class="content-box">
							<span class="required icon-none">供应商</span>
							<section @click="showSupply" class="tableListInp chairFix" style="vertical-align: middle;">
								<span class="inptext">{{selectSupply}}</span>
								<div class="fl">
									<span class="addstyle">+</span>
								</div>
							</section>
						</label>
						<label class="content-box">
							<span class="required icon-none">批次编码</span>
							<input v-model="batchCode" class="right" type="text" placeholder="选填" maxlength="20" />
						</label>
					</div>
				</div>
				<div class="leftform">
					<div>
						<label class="content-box">
							<span class="required">数量</span>
							<!-- <input v-model="newNum" class="right" type="text" placeholder="请填写入库数量" maxlength="8" /> -->
							<span style="display: inline-block;width: 230px;height: 40px;padding-left: 10px;">{{newNum}}</span>
						</label>
						<div class="content-box">
							<span class="required">失效日期</span>
							<section class="orMaRetBox" style="margin-right: 30px;">
								<calendar :only="false" :calStyle="{'width':'230px'}" :time="endTime" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
							</section>
						</div>
						<label class="content-box">
							<span class="required icon-none">进价</span>
							<input v-model="purchasePrice" class="right" type="text" placeholder="选填" maxlength="10" />
						</label>
						<label class="content-box">
							<span class="required icon-none">货号</span>
							<input v-model="artNo" class="right" type="text" placeholder="选填" maxlength="20" />
						</label>
					</div>
				</div>
				<label class="content-box" style="vertical-align: top;">
					<span class="required icon-none">备注</span>
					<textarea v-model="remarks" maxlength="40" class="right remark" placeholder="请填写备注信息"></textarea>
				</label>
				<div class="boxbottom">
					<a href="javascript:void(0);" class="gray del" @click="cancel">取消</a>
					<a @click="modification" href="javascript:void(0);" class="yellow" style="width: 110px;">确定</a>
				</div>
			</div>
		</div>
		<warehouse-win ref="warehouse" :title="winTitle" :goodsWid="goodsWid" :goodsareaId="goodsareaId" :wareType="wareType" v-show="wareshow"
		    @wareEvent="wareEvent"></warehouse-win>
		<multiple-win :styles="{backgroundColor: '#F1F1F1'}" @selArray="winSel" :isradio="win.isradio" :selects="win.selects" :title="win.title"
		    v-if="win.show&&win.list.length>0" :name="win.name" :width="win.width" :height="win.height" :list="win.list" :selkey="win.selkey"></multiple-win>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import global from 'src/manager/global';

	export default {
		data() {
			return {
				gid: '',
				newShopdetail: {
					cate: [],
				},
				isoldStatus: true,
				isOk: true,
				startTime: new Date().setHours(0, 0, 0, 0),
				wareShow: true,
				newNum: '',
				batchCode: '',
				wareArea: '',
				endTime: new Date().setHours(0, 0, 0, 0),
				selectSupply: '选择供应商',
				artNo: '', //货号
				remarks: '', //备注信息
				iswear: '',
				isarea: '',
				isStatus: 0,
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
				continue: true,
				productionTime: '',
				houseTotal: '',
				newareaName: '',
				invalidTime: '',
				check: true,
				wareshow: false,
				wareType: 0,
				winTitle: '仓库位置',
				batchId: null,
				purchasePrice: '', //进价
				checkHttp: true,
				goodsWid: '', //老批次入库wid
				goodsareaId: '',
				shopId: storage.session('userShop').currentShop.id,
				brandId: storage.session('userShop').currentShop.brandId
			};
		},
		methods: {
			async init() {
				let data = await http.InvoicingGetGoodsDetail({
					data: {
						gid: this.gid,
					}
				});
				this.newShopdetail = data;
				if (this.newShopdetail.validity && this.isStatus == 0) {
					if (this.newShopdetail.validityType == 0) {
						this.endTime = new Date().setMonth(
							new Date().getMonth() + parseInt(this.newShopdetail.validity)
						);
					} else if (this.newShopdetail.validityType == 1) {
						this.endTime = new Date().setDate(
							new Date().getDate() + parseInt(this.newShopdetail.validity)
						);
					} else if (this.newShopdetail.validityType == 2) {
						this.endTime = new Date().setFullYear(
							new Date().getFullYear() + parseInt(this.newShopdetail.validity)
						);
					}
				}
			},
			showCate(cate) {
				let arr = [];
				for (let item of cate) {
					arr.push(item.name);
				}
				return arr.join(',');
			},
			startTimeChange(time) {
				this.startTime = time;
			},
			endTimeChange(time) {
				this.endTime = time;
			},
			showHouse() {
				this.wareshow = true;
			},
			cancel() {
				window.history.go(-1);
			},
			changeNum() {
				if (this.newNum.includes('.')) {
					this.newNum = this.newNum.substr(0, this.newNum.indexOf('.') + 4);
				}
			},
			continueSave() {
				this.check = false;
				this.putGoods();
			},
			clearSelect() { //清除
				this.newNum = '';
				this.win.selects = [];
				this.remarks = '';
				this.artNo = '';
				this.batchCode = '';
				this.purchasePrice = '';
				this.selectSupply = '选择供应商';
			},
			getString(arr) {
				if (typeof arr == 'string' || !arr) return arr;
				return arr.join(',');
			},
			batchSave() {
				if (this.isStatus) {
					this.seaveGoods();
				} else {
					this.putGoods();
				}
				this.check = true;
			},
			async seaveGoods() {
				if (!global.checkData({
					houseTotal: {
						reg: /^\d*\.?\d+$/,
						pro: '请输入入库数量'
					}
				},
				this)) {
					this.check = false;
					return false;
				}
				if (this.houseTotal == '' || this.houseTotal == 0) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '请输入数量'
					});
					return false;
				}
				let data = await http.goodsinventoryAddNum({
					data: {
						itemId: this.gid,
						batchId: this.batchId,
						num: this.houseTotal,
						wid: this.newareaName.wid,
						areaId: this.newareaName.areaId,
						type: 0
					}
				});
				if (data) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '您选择的商品入库成功。'
					});
					if (this.check) this.cancel();
				} else {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '入库失败。'
					});
				}
			},
			async putGoods() {
				if (!global.checkData({
					newNum: {
						reg: /^\d*\.?\d+$/,
						pro: '请输入入库数量'
					},
					purchasePrice: {
						reg: /^\d*\.?\d+$/,
						pro: '进价输入有误'
					}
				},
				this)) {
					this.check = false;
					return false;
				}
				if (this.endTime < this.startTime) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '失效日期应大于于生产日期'
					});
					this.check = false;
					return false;
				}
				if (this.newNum <= 0 || !this.newNum) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '数量填写有误'
					});
					this.check = false;
					return false;
				}
				if (this.newShopdetail.type == 0 && this.newNum.includes('.')) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '普通商品数量应为整数'
					});
					this.check = false;
					return false;
				}
				if (this.win.selects.length == 0) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '请选择供货商'
					});
					this.check = false;
					return false;
				}
				if (!this.newShopdetail.warehouse) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '请选择仓库'
					});
					this.check = false;
					return false;
				}
				let productTime = utils.getTime({
					time: this.startTime,
					type: false
				}).start;
				let end;
				//未选择失效时间 则使用根据开始时间自动匹配的失效时间
				if (this.endTime == '') {
					//						end = parseInt(this.startTime) + (this.newShopdetail.validity) * 30 * 24 * 3600 * 1000;
					if (this.newShopdetail.validityType == 1) {
						end = new Date(this.startTime).setDate(
							new Date(this.startTime).getDate() + +this.newShopdetail.validity
						);
					} else if (this.newShopdetail.validityType == 0) {
						end = new Date(this.startTime).setMonth(
							new Date(this.startTime).getMonth() + +this.newShopdetail.validity
						);
					} else if (this.newShopdetail.validityType == 2) {
						end = new Date(this.startTime).setFullYear(
							new Date(this.startTime).getFullYear() +
							+this.newShopdetail.validity
						);
					}
					end = parseInt(end / 1000);
				} else {
					end = parseInt(this.endTime / 1000);
				}
				let data = await http.addInventory({
					data: {
						type: 0,
						itemId: this.gid,
						wid: this.newShopdetail.warehouse.wid,
						areaId: this.newShopdetail.warehouse.areaId,
						supplierId: this.win.selects[0],
						totalSurplus: this.newNum,
						productionTime: productTime,
						expiryTime: end,
						batchCode: this.batchCode,
						articleNo: this.artNo,
						remark: this.remarks,
						purchaseUnit: 0,
						purchasePrice: this.purchasePrice ? this.purchasePrice : 0
					}
				});
				if (data) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '您选择的商品入库成功。'
					});
					this.clearSelect();
					if (this.check) this.cancel();
				} else {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '入库失败。'
					});
				}
			},
			async showSupply() {
				this.win.show = true;
				let data = await http.suppierList();
				this.win.list = data;
			},
			winSel(arr, str) {
				this.win.show = false;
				if (str == 'ok') {
					this.win.selects = arr;
					if (this.win.list.length > 0 && arr.length > 0) {
						this.selectSupply = this.win.list.find(p => p.id === arr[0]).name;
					} else {
						this.selectSupply = '';
					}
				}
			},
			wareEvent(str) {
				this.wareshow = false;
				if (str == 'ok') {
					this.wareClose();
				}
			},
			changehouseTotal(){
				if(Number(this.newShopdetail.type)!=1){
					this.houseTotal = Math.floor(this.houseTotal);
				}else{
					if (this.houseTotal.includes('.')) {
						this.houseTotal = this.houseTotal.substr(0, this.houseTotal.indexOf('.') + 4);
					}
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
				this.newShopdetail.warehouse = {
					wid: wareWin.homeId,
					areaId: wareWin.chooseWare.id,
				};
				if (this.newareaName) {
					this.newareaName.aName = wareWin.chooseWare.areaName;
					this.newareaName.areaId = wareWin.chooseWare.id;
					this.goodsareaId = wareWin.chooseWare.id;
				}
			},
			async modification() {
				if (this.endTime < this.startTime) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '失效日期应大于于生产日期'
					});
					return false;
				}
				let data = await http.updateBatch({
					data: {
						type: 0,
						wid: this.newareaName.wid,
						batchId: this.batchId,
						itemId: this.gid,
						productionTime: this.startTime / 1000,
						expiryTime: this.endTime / 1000,
						batchCode: this.batchCode, //批次编码
						supplierId: this.win.selects[0], //供应商ID
						articleNo: this.artNo, //货号
						purchasePrice: this.purchasePrice, //进价
						remark: this.remarks //备注
					},
					formId: 'uploadImageForm'
				});
				if (data) this.cancel();
			}
		},
		mounted: function () {
			this.gid = this.$route.query.gid;
			if (this.$route.query.batchId) this.batchId = this.$route.query.batchId;
			let resole = storage.session('goodsneed');
			this.newareaName = resole;
			if (resole && this.$route.query.isStatus) {
				this.isStatus = this.$route.query.isStatus;
				this.productionTime =resole.productionTime==0? '--':utils.format(
					resole.productionTime,
					'yyyy年MM月dd日'
				);
				this.invalidTime =resole.expiryTime==0? '--':utils.format(resole.expiryTime, 'yyyy年MM月dd日');
				if (this.isStatus == 2) {
					this.startTime = resole.productionTime * 1000;
					this.endTime = resole.expiryTime * 1000||new Date().setHours(0, 0, 0, 0);
					this.selectSupply = resole.supplier;
					this.batchCode = resole.batchCode;
					this.remarks = resole.remark;
					this.artNo = resole.articleNo;
					this.purchasePrice = resole.purchasePrice;
					this.newNum = resole.surplus;
					this.win.selects[0] = resole.supplierId;
				} else if (this.isStatus == 1) {
					this.goodsWid = resole.wid; //老批次入库已有wid
					this.goodsareaId = resole.areaId;
				}
			}

			this.init();
		},
		components: {
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			multipleWin: () =>
				import ( /*webpackChunkName: 'multiple_win'*/ 'src/components/multiple_win'),
			warehouseWin: () =>
				import ( /*webpackChunkName: 'warehouse_win'*/ './warehouse_win')
		}
	};
</script>
<style lang="less" scoped>
	.invendetail {
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
				}
			}
		}
		.coninp {
			width: 750px;
			height: auto;
			.cList {
				font-size: 16px;
				width: 100%;
				padding-left: 7%;
			}
			.conbox {
				width: 750px;
				margin-top: 20px;
				.leftform {
					width: 49%;
					display: inline-block;
					vertical-align: text-top;
				}
				.calendar {
					input {
						width: 231px;
					}
				}
				.content-box {
					min-width: 400px;
					max-width: 1100px;
					display: inline-block;
					line-height: 40px;
					margin-bottom: 15px;
					input {
						width: 220px;
						height: 35px;
						font-size: 14px;
						padding-left: 8px;
						outline: none;
					}
					.notop{
						.required
					}
					.required {
						display: inline-block;
						font-size: 16px;
						margin-right: 17px;
						width: 100px;
						text-align: right;
					}
					.right {
						display: inline-block;
						width: 230px;
						height: 40px;
						border: 1px solid #cdcdcd;
						padding-left: 10px;
					}
					.orMaRetBox {
						display: inline-block;
						vertical-align: middle;
					}
					.tableListInp {
						color: #666666;
						border: #b3b3b3 solid 1px;
						height: 40px;
						display: inline-block;
						cursor: pointer;
						div {
							width: 39px;
							height: 40px;
							position: relative;
							z-index: 5;
						}
						.inptext {
							height: 39px;
							width: 189px;
							display: block;
							float: left;
							border-right: 1px #b3b3b3 solid;
							padding-left: 10px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
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
					.remark {
						resize: none;
						width: 400px;
						height: 80px;
						vertical-align: middle;
						padding: 10px;
						font-size: 14px;
					}
					.icon-none {
						padding-right: 9px;
						&::after {
							display: none;
						}
					}
				}
				.boxbottom {
					margin-top: 50px;
					margin-left: 120px;
					.del {
						width: 110px;
						margin-right: 20px;
					}
					.continus {
						width: 110px;
						margin-right: 20px;
						background: none;
						color: #f8941f;
						border: 1px solid #f8941f;
					}
				}
			}
		}
		.showBefore {
			font-size: 16px;
			height: 40px;
			line-height: 40px;
			float: left;
			text-align: right;
			color: #333;
			margin-right: 5px;
		}
		.shopAfter {
			font-size: 16px;
			max-width: 75%;
			height: 40px;
			line-height: 40px;
			float: left;
			text-align: left;
			color: #333;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			span {
				font-size: 16px;
			}
		}
		.dian {
			width: 10px;
			height: 1px;
			border-top: 1px solid #e1e1e1;
			margin: 20px 5px;
			float: left;
		}
	}
</style>