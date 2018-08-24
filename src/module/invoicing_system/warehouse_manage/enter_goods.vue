<!--
    **入货组件
    *
    * 黄一帆
    * *
    *
-->
<template>
    <div id="output-shipper">
		<div class="scroll-box">
			<div class="head-line">入货</div>
			<div class="detail">
				<div class="block">
					<div class="item">
						<span>调度单号：</span>{{details.receiptNumber}}
					</div>
					<div class="item">
						<span>调度状态：</span>{{allStatus[details.dynamic]}}
					</div>
					<div class="item ware">
						<span>入货仓库：</span>
						<p>{{details.intoWname}}<em @click="openWareWin(details.intoWarehouse)"></em></p>
					</div>
					<div class="item ware">
						<span>出货仓库：</span>
						<p>{{details.outWname}}<em @click="openWareWin(details.outWarehouse)"></em></p>
					</div>
				</div>
				<div class="block">
					<div class="item">
						<span>创建时间：</span>{{timeConversion(details.createTime,1)}}
					</div>
					<div class="item">
						<span>创建人：</span>{{details.createName}}
					</div>
					<div class="item narrow">
						<span>原因：</span>{{details.cause||'--'}}
					</div>
					<div class="item narrow">
						<span>备注：</span>{{details.remark||'--'}}
					</div>
				</div>
				<div class="block">
					<div class="item">
						<span>出货时间：</span>{{operate.time}}
					</div>
					<div class="item">
						<span>出货人：</span>{{operate.name}}
					</div>
				</div>
			</div>
			<div class="tab-box">
				<span :class="{active:tabIndex==0}" @click="tabIndex=0">商品</span>
				<span :class="{active:tabIndex==1}" @click="tabIndex=1">物料</span>
			</div>
			<div class="consume-list" v-if="tabIndex==0">
				<div class="head">商品列表 · 共 <em>{{enterGoods.success.list.length}}</em> 个条目</div>
				<div class="list" >
					<div class="scroll-box">
						<div class="title">
							<span class="narrow">操作</span> 
							<span>商品名称</span>
							<span>出货数量</span>
							<span>已入货</span>
							<span>已耗损</span>
							<span>入货<em class="select-ban" @click="surplusAll('goods','into')">剩余全部</em></span>
							<span>耗损<em class="select-ban" @click="surplusAll('goods','consume')">剩余全部</em></span>
							<span class="ware">入货仓库</span>
						</div>
						<div class="item"  @click="goodsHandle" v-for="(item,index) in enterGoods.success.list" :key="index"
							 :data-index="index">
							<!--操作-->
							<div class="unit narrow">
								<template v-if="item.isSurplus">
									<em class="handle-btn sel-batch select-ban">选择批次</em>
								</template>
								<template v-else>
									<em class="handle-btn init-end select-ban">入货完毕</em>
								</template>
							</div>
							<!--商品名称-->
							<div class="unit" :title="item.name">{{item.name}}</div>
							<!--出货数量-->
							<div class="unit">{{item.outNum}}{{item.unit}}</div>
							<!--已入货-->
							<div class="unit">{{item.overIntoNum}}{{item.unit}}</div>
							<!--已耗损-->
							<div class="unit">{{item.overConsumeNum}}{{item.unit}}</div>
							<!--入货-剩余全部-->
							<div class="unit">
								<template v-if="item.isSurplus">
									<div class="input-box">
										<input type="text" placeholder="输入数字" @input="intoInput(item,'into')" v-model="item.intoNum"
										:disabled="item.haveBatch" maxlength="10"/>
										<em>{{item.unit}}</em>
									</div>
								</template>
								<template v-else>--</template>
							</div>
							<!--耗损-剩余全部-->
							<div class="unit">
								<template v-if="item.isSurplus">
									<div class="input-box">
										<input type="text" placeholder="输入数字" @input="intoInput(item,'consume')" v-model="item.consumeNum"
										:disabled="item.haveBatch" maxlength="10"/>
										<em>{{item.unit}}</em>
									</div>
								</template>
								<template v-else>--</template>
							</div>
							<!--入货仓库-->
							<div class="unit ware">
								<span>
									{{item.warehouse}}<template v-if="item.wArea">-{{item.wArea}}</template>
									<template v-if="item.isSurplus">
										<em class="change-ware"></em>
									</template>
								</span>
							</div>
						</div>
						<!--商品入货-匹配失败-->
						<div class="item error" v-for="(item,index) in enterGoods.error" :key="index">
							<div class="unit narrow">
								<em class="handle-btn error select-ban">匹配失败</em>
							</div>
							<div class="unit" :title="item.itemName">{{item.itemName}}</div>
							<div class="unit reason" :title="item.reason">
								失败原因：
								<div class="error-icon">!</div>
								{{item.reason}}
							</div>
						</div>
						<div class="empty" v-if="!enterGoods.success.list.length && !enterGoods.error.length">- 暂无条目 -</div>
					</div>
				</div>
			</div>
			<div class="consume-list" v-if="tabIndex==1">
				<div class="head">物料列表 · 共 <em>{{enterMaterial.success.list.length}}</em> 个条目</div>
				<div class="list">
					<div class="scroll-box">
						<div class="title">
							<span class="narrow">操作</span>
							<span>物料名称</span>
							<span>出货数量</span>
							<span>已入货</span>
							<span>已耗损</span>
							<span>入货<em class="select-ban" @click="surplusAll('mat','into')">剩余全部</em></span>
							<span>耗损<em class="select-ban" @click="surplusAll('mat','consume')">剩余全部</em></span>
							<span class="ware">入货仓库</span>
						</div>
						<div class="item"  @click="materialHandle" v-for="(item,index) in enterMaterial.success.list" :key="index"
							 :data-index="index">
							<!--操作-->
							<div class="unit narrow">
								<template v-if="item.isSurplus">
									<em class="handle-btn sel-batch select-ban">选择批次</em>
								</template>
								<template v-else>
									<em class="handle-btn init-end select-ban">入货完毕</em>
								</template>
							</div>
							<!--物料名称-->
							<div class="unit" :title="item.name">{{item.name}}</div>
							<!--出货数量-->
							<div class="unit">{{item.outNumShow}}{{item.unit}}</div>
							<!--已入货-->
							<div class="unit">{{item.overIntoNumShow}}{{item.unit}}</div>
							<!--已耗损-->
							<div class="unit">{{item.overConsumeNumShow}}{{item.unit}}</div>
							<!--入货-剩余全部-->
							<div class="unit">
								<template v-if="item.isSurplus">
									<div class="input-box">
										<input type="text" placeholder="输入数字" @input="intoInput(item,'into')" v-model="item.intoNum" 
										:disabled="item.haveBatch" maxlength="10"/>
										<em>{{item.unit}}</em>
									</div>
								</template>
								<template v-else>--</template>
							</div>
							<!--耗损-剩余全部-->
							<div class="unit">
								<template v-if="item.isSurplus">
									<div class="input-box">
										<input type="text" placeholder="输入数字" @input="intoInput(item,'consume')" v-model="item.consumeNum"
										:disabled="item.haveBatch" maxlength="10"/>
										<em>{{item.unit}}</em>
									</div>
								</template>
								<template v-else>--</template>
							</div>
							<!--入货仓库-->
							<div class="unit ware">
								<span>
									{{item.warehouse}}<template v-if="item.wArea">-{{item.wArea}}</template>
									<template v-if="item.isSurplus">
										<em class="change-ware"></em>
									</template>
								</span>
							</div>
						</div>
						<!--物料入货-匹配失败-->
						<div class="item error" v-for="(item,index) in enterMaterial.error" :key="index">
							<div class="unit narrow">
								<em class="handle-btn error select-ban">匹配失败</em>
							</div>
							<div class="unit" :title="item.name">{{item.name}}</div>
							<div class="unit reason" :title="item.reason">
								失败原因：
								<div class="error-icon">!</div>
								{{item.reason}}
							</div>
						</div>
						<div class="empty" v-if="!enterMaterial.success.list.length && !enterMaterial.error.length">- 暂无条目 -</div>
					</div>
				</div>
			</div>
			<!-- 仓库详情弹窗 -->
			<component
                :is="showWareWin"
				:wid="wareId"
                @winEvent="wareWin"
                @errorEmit="errorEmit"
                :width="500"
                :height="200"
                :errorList="errorList"
            ></component>
		</div>
		
		<warehouse-win 
		:title="'选择仓库-区域'" 
		:wid="chooseWare"
		:shopId='intoShopId'
		:isBrand='intoIsBrand'
		:areaId = "chooseArea"
		v-if="wareShow"
		@wareEvent="wareEvent">
		</warehouse-win>
		
		<!-- 商品-物料批次选择 -->
	    <goods-batch 
	    v-if="batchShow" 
		:goods="goodsItem"
		:material="materialItem"
		:selGoods="selGoodsBatch"
		:selMat="selMatBatch"
		:type="batchType"
		@goods="goodsWinClose"
		@mat="materialWinClose"
		></goods-batch>
	
    </div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			showWareWin: null, //仓库详情弹窗
			details: {}, //详情信息
			allStatus: {
				'1': '未出货',
				'2': '待入货',
				'3': '调度中',
				'4': '已取消',
				'5': '已完成',
				'6': '已完成(异常)',
			},
			outWareId: '', //出库的仓库id
			detailObj: {}, //详情列表对象
			outGoods: [], //商品详情-出货
			outMaterial: [], //物料详情-出货
			enterList: [], //入货单的列表
			enterGoods: { //商品详情-入货
				error: [],
				success: {
					list: [],
				},
			},
			enterMaterial: { //商品详情-入货
				error: [],
				success: {
					list: [],
				},
			},
			selGoodsBatch: [], //已选中商品批次
			selMatBatch: [], //已选中物料批次
			goodsItem: {}, //当前操作的商品
			materialItem: {}, //当前操作的物料
			batchType: 0, //批次弹框类型
			listIndex: 0, //操作的列表index
			operate: {
				name: '', //操作人
				time: '', //操作时间
			},
			wareId: '', //仓库id 仓库详情弹窗
			tabIndex: 0,
			dispatchId: '', //调度id
			batchShow: false,
			wareShow: false, //修改仓库
			chooseWare: '', //选择的仓库
			chooseArea: '', //选择的区域
			handleType: 1, //操作类型 1商品 2物料
			exportShopId: '', //出库仓库id
			eachProps: ['intoNum', 'consumeNum'],
			intoShopId: '', //入货仓库的shopId
			intoIsBrand: false, //可入货仓库 是否品牌
			isClick: false, //是否已经点击提交，防止重复点击
			errorList:{//入货失败 匹配失败列表
				goods:[],
				material:[],
			},
		};
	},
	components: {
		warehouseDetail: () =>
			import( /*webpackChunkName: 'waremessage_win'*/ '../conclusion/waremessage_win'),
		goodsBatch: () =>
			import( /*webpackChunkName:'enter_goods_batch'*/ './enter_goods_batch'),
		errorWin: () =>
			import( /*webpackChunkName:'enter_goods_batch'*/ './enter_goods_error'),
		warehouseWin: () =>
			import( /*webpackChunkName: 'warehouse_win_enter'*/ '../invoicing/warehouse_win_enter')
	},
	mounted() {
		this.initBtn();
		this.dispatchId = this.$route.query.id;
		this.init();
		let goodsPromise = this.getGoods();
		let matPromise = this.getMaterial();
		//商品列表为空，而物料列表有数据 直接切换到物料列表
		Promise.all([goodsPromise,matPromise]).then(()=>{
			this.initTabIndex();
		});
	},
	methods: {
		initBtn() {
			this.btnArr = [{name: '确认',style: 'background: #f8931f;border: 1px solid #f8931f;color: #fff;',
				fn: () => {
					this.confirm();
				}
			},
			{name: '取消',style: 'background: #B3B3B3;border: 1px solid #B3B3B3;color: #fff;',
				fn: () => {
					storage.session('operationRequestDestroy', true);
					this.$router.go(-1);
				}
			}];
			this.$store.commit('setPageTools', this.btnArr);
		},
		initTabIndex(){//设置初始化选项卡位置
			let isGoods = this.enterGoods.error.length>0 || this.enterGoods.success.list.length>0;
			let isMaterial = this.enterMaterial.error.length>0 || this.enterMaterial.success.list.length>0;
			if(!isGoods && isMaterial){
				this.tabIndex = 1;
			}
		},
		openWareWin(wid) {
			this.wareId = wid;
			this.showWareWin = 'warehouseDetail';
		},
		wareWin() {
			this.showWareWin = null;
		},
		surplusAll(type, handle) { //入库-剩余全部
			if(type == 'goods') { //商品
				this.goodsItem.haveBatch = false;
				let arr = utils.deepCopy(this.enterGoods.success.list);
				this.enterGoods.success.list = this.surplusAllCom(arr, handle, 'goods');
			} else { //物料
				this.materialItem.haveBatch = false;
				let arr = utils.deepCopy(this.enterMaterial.success.list);
				this.enterMaterial.success.list = this.surplusAllCom(arr, handle, 'mat');
			}
		},
		surplusAllCom(arr, handle, type) { //入库-剩余全部-公共部分
			for(let i in arr) {
				let item = arr[i];
				let surplus = 0;
				if(type == 'goods') {
					surplus = item.outNum*1000 - item.overIntoNum*1000 - item.overConsumeNum*1000; //剩余能入库 能耗损数量 
				} else if(type == 'mat') {
					surplus = item.outNumShow*1000 - item.overIntoNumShow*1000 - item.overConsumeNumShow*1000; //剩余能入库 能耗损数量
				}
				if(handle == 'into') { //入货-剩余全部
					item.intoNum = (surplus - item.consumeNum*1000)/1000;
					this.autoGoodsBatch(item, item.intoNum, 'intoNum', 'consumeNum');
				} else { //耗损-剩余全部
					item.consumeNum = (surplus - item.intoNum*1000)/1000;
					this.autoGoodsBatch(item, item.consumeNum, 'consumeNum', 'intoNum');
				}
			}
			return arr;
		},
		autoGoodsBatch(...agrs) { //自动匹配商品批次
			let [item, theNum, mate, otherNum] = agrs;
			for(let batch of item.batchInfo) {
				batch[mate] = ''; //先清空一波批次数量
			}
			for(let batch of item.batchInfo) {
				let surplus = Number(batch.num/item.unitValue) - Number(batch[otherNum]); //剩余能入库 能耗损数量 
				if(theNum > surplus) { //该批次剩余的出货量不够
					batch[mate] = surplus;
					theNum = theNum - surplus;
				} else { //该数量足够 或者 有多余的数量 
					batch[mate] = theNum;
					break;
				}
			}
		},
		intoInput(item, handle) { //监听输入框的值
			if(handle == 'into') { //入货
				this.autoGoodsBatch(item, item.intoNum, 'intoNum', 'consumeNum');
			} else { //耗损
				this.autoGoodsBatch(item, item.consumeNum, 'consumeNum', 'intoNum');
			}
		},
		setUnit(num, unit, unitData) { //设置单位显示
			let res = '';
			for(let item of unitData) {
				if(unit == item.name) {
					res = Number(num) / Number(item.value);
					break;
				}
			}
			return res;
		},
		confirmVeri(item) { //提交时 数据验证
			let tipName = '';
			let reg = /^[0-9]*$/; //整数
			let reg2 = /^[0-9]*\.?[0-9]{0,3}$/; //小数点后三位
			if(item.gType == -1) {
				tipName = '物料';
			} else {
				if(item.gType == 0) {
					tipName = '普通商品';
				} else if(item.gType == 1 || item.gType == 2) {
					tipName = '称重商品';
				}
			}
			if(isNaN(item.intoNum) || isNaN(item.consumeNum)) {
				this.myAlert(`${tipName}（${item.name}）只能输入数字`);
				return false;
			}
			//普通商品
			if(tipName == '普通商品' && !reg.test(item.intoNum)) { //普通商品
				this.myAlert(`${tipName}（${item.name}）入货量只能输入整数`);
				return false;
			}
			if(tipName == '普通商品' && !reg.test(item.consumeNum)) { //普通商品
				this.myAlert(`${tipName}（${item.name}）耗损量只能输入整数`);
				return false;
			}
			//称重商品
			if(tipName == '称重商品' && !reg2.test(item.intoNum)) { //称重商品
				this.myAlert(`${tipName}（${item.name}）入货量只能输入小数点后三位`);
				return false;
			}
			if(tipName == '称重商品' && !reg2.test(item.consumeNum)) { //称重商品
				this.myAlert(`${tipName}（${item.name}）耗损量只能输入小数点后三位`);
				return false;
			}
			if((item.intoNum*1000 + item.consumeNum*1000) > (item.outNum*1000 - item.overIntoNum*1000 - item.overConsumeNum*1000)) {
				this.myAlert(`${tipName}（${item.name}）可入货数量不足`);
				return false;
			}
			return true;
		},
		confirmVeriMat(item) { //物料验证
			let reg2 = /^[0-9]*\.?[0-9]{0,3}$/; //小数点后三位
			if(!reg2.test(item.intoNum)) {
				this.myAlert(`物料（${item.name}）入货量只能输入小数点后三位`);
				return false;
			}
			if(!reg2.test(item.consumeNum)) {
				this.myAlert(`物料（${item.name}）耗损量只能输入小数点后三位`);
				return false;
			}
			return true;
		},
		//点击确认提交数据
		confirm() {
			//获取的可入货列表都为空，则不允许入货
			if(!this.enterGoods.success.list.length && !this.enterMaterial.success.list.length){
				this.myAlert('没有可入货列表');
				return;
			}
			let arr = [],
				allSendNum = 0;
			let goodsList = utils.deepCopy(this.enterGoods.success.list);
			for(let item of goodsList) {
				item.intoNum = Number(item.intoNum);
				item.consumeNum = Number(item.consumeNum);
				for(let batch of item.batchInfo) {
					batch.intoNum = Number(batch.intoNum);
					batch.consumeNum = Number(batch.consumeNum);
				}
				if(!this.confirmVeri(item)) return;
				let allNum = item.intoNum + item.consumeNum;
				allSendNum += allNum;
			}
			arr.push(...goodsList);
			let matList = utils.deepCopy(this.enterMaterial.success.list);
			for(let item of matList) {
				//因为物料的数量会乘以比例，所以这里提前验证
				let veriItem = utils.deepCopy(item);
				if(!this.confirmVeriMat(veriItem)) return;
				item.intoNum = Number(item.intoNum) * item.unitValue;
				item.consumeNum = Number(item.consumeNum) * item.unitValue;
				for(let batch of item.batchInfo) {
					batch.intoNum = Number(batch.intoNum) * item.unitValue;
					batch.consumeNum = Number(batch.consumeNum) * item.unitValue;
				}
				if(!this.confirmVeri(item)) return;
				let allNum = item.intoNum + item.consumeNum;
				allSendNum += allNum;
			}
			arr.push(...matList);
			if(allSendNum <= 0) {
				this.myAlert('入货/耗损 数量不能为空');
				return;
			}
			this.confirmSubmit(arr);
		},
		async confirmSubmit(arr){
			if(this.isClick) {
				this.$message({message: '请勿重复点击',type: 'error'});
				return;
			}
			this.isClick = true;//禁止重复点击
			let res=null;
			try{
				res = await http.DispatchrecordItemSubmit({
					data: {
						id: this.dispatchId,
						exportShopId: this.exportShopId,
						importShopId: this.intoShopId,
						list: arr,
					}
				},true);
			}
			catch(e){
				this.$message({message: e.error.message,type: 'error'});
				this.isClick = false;//接口报错，还能继续点击
			}
			if(res=='OK'){
				this.$message({message: '入货成功',type: 'success'});
				storage.session('operationRequestDestroy', true);
				window.history.go(-1);
			}else if(res){
				this.showWareWin = 'errorWin';
				this.errorList.goods = res.goodsError;
				this.errorList.material = res.materialError;
				this.isClick = false;//接口报错，还能继续点击
			}
		},
		async init() {
			let res = await http.getDispatchRecordDetailList({
				data: {
					id: this.dispatchId,
				}
			});
			for(let item of res.invoiceList) {
				if(item.type == 1) { //获取出货单信息
					this.operate.name = item.operateUname;
					this.operate.time = this.timeConversion(item.operateTime, 1);
				}
			}
			this.details = res;
			this.outWareId = res.outWarehouse;
			this.getWareDetail(this.details.intoWarehouse);
		},
		getGoods() { //获取商品列表
			return http.DispatchrecordGetGoodsList({
				data: {
					id: this.dispatchId, //调度id
				}
			}).then((data)=>{
				for(let item of data.success.list) {
					item.intoNum = '';
					item.consumeNum = '';
					for(let batch of item.batchInfo) {
						batch.numShow = batch.num;
						batch.intoNum = '';
						batch.consumeNum = '';
					}
					let surplusNum = item.outNum - item.overIntoNum - item.overConsumeNum; //剩余数量
					if(surplusNum > 0) { //还有剩余数量
						item.isSurplus = true;
					} else {
						item.isSurplus = false;
					}
				}
				this.enterGoods = data;
				if(data.success.exportShopId) this.exportShopId = data.success.exportShopId;
			});
		},
		getMaterial() { //获取物料列表
			return http.DispatchrecordGetMaterialList({
				data: {
					id: this.dispatchId, //调度id
				}
			}).then((data)=>{
				for(let item of data.success.list) {
					item.outNumShow = this.setUnit(item.outNum, item.unit, item.unitData);
					item.overIntoNumShow = this.setUnit(item.overIntoNum, item.unit, item.unitData);
					item.overConsumeNumShow = this.setUnit(item.overConsumeNum, item.unit, item.unitData);
					item.intoNum = '';
					item.consumeNum = '';
					for(let batch of item.batchInfo) {
						batch.numShow = this.setUnit(batch.num, item.unit, item.unitData);
						batch.intoNum = '';
						batch.consumeNum = '';
					}
					for(let unit of item.unitData) {
						if(item.unit == unit.name) {
							item.unitValue = Number(unit.value);
							break;
						}
					}
					let surplusNum = item.outNum - item.overIntoNum - item.overConsumeNum; //剩余数量
					if(surplusNum > 0) { //还有剩余数量
						item.isSurplus = true;
					} else {
						item.isSurplus = false;
					}
				}
				this.enterMaterial = data;
				if(data.success.exportShopId) this.exportShopId = data.success.exportShopId;
			});
		},
		async getWareDetail(id) { //获取仓库详情-得到仓库所属
			let data = await http.warehouseGetWarehouse({
				data: {
					id: id,
				}
			});
			let brandId = data.owner.split(',')[0];
			let shopId = data.owner.split(',')[1];
			if(shopId != 0) { //单店
				this.intoShopId = shopId;
				this.intoIsBrand = false;
			} else { //品牌
				this.intoShopId = brandId;
				this.intoIsBrand = true;
			}
		},
		errorEmit(res){
			if(res){
				this.showWareWin = null;
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '匹配成功的商品或物料，入货成功',
					callback: () => {
						storage.session('operationRequestDestroy', true);
						window.history.go(-1);
					}
				});
			}
		},
		goodsHandle(event) { //商品操作
			let target = event.target,
				current = event.currentTarget;
			let index = current.getAttribute('data-index');
			let item = this.enterGoods.success.list[index];
			if(target.className.includes('sel-batch')) { //选择批次
				this.openBatchWinGoods(item, 'goods');
			} else if(target.className.includes('change-ware')) { //修改仓库
				this.chooseWare = item.wid;
				this.chooseArea = item.areaId;
				this.handleType = 1;
				this.goodsItem = item;
				this.wareShow = true;
			}
			if(target.tagName.toLocaleLowerCase() == 'input') {
				if(target.getAttribute('disabled') == 'disabled') {
					this.myAlert('请先清空该批次数据,再进行修改');
				}
			}
		},
		materialHandle(event) { //物料操作
			let target = event.target,
				current = event.currentTarget;
			let index = current.getAttribute('data-index');
			let item = this.enterMaterial.success.list[index];
			if(target.className.includes('sel-batch')) { //选择批次
				this.openBatchWinGoods(item, 'mat');
			} else if(target.className.includes('change-ware')) { //修改仓库
				this.chooseWare = item.wid;
				this.chooseArea = item.areaId;
				this.handleType = 2;
				this.materialItem = item;
				this.wareShow = true;
			}
		},
		openBatchWinGoods(item, type) { //打开商品批次选择
			if(type == 'goods') {
				this.batchType = 0;
				this.goodsItem = item;
				this.selGoodsBatch = utils.deepCopy(this.goodsItem.batchInfo);
			} else {
				this.batchType = 1;
				this.materialItem = item;
				this.selMatBatch = utils.deepCopy(this.materialItem.batchInfo);
			}
			this.batchShow = true;
		},
		goodsWinClose(res, list) { //商品批次选择后
			if(res == 'ok') {
				this.goodsItem.batchInfo = list;
				let into = 0,
					consumeNum = 0;
				for(let item of list) {
					into += Number(item.intoNum);
					consumeNum += Number(item.consumeNum);
				}
				this.goodsItem.intoNum = into;
				this.goodsItem.consumeNum = consumeNum;
				if(into > 0 || consumeNum > 0) {
					this.goodsItem.haveBatch = true;
				} else {
					this.goodsItem.haveBatch = false;
				}
				this.numberVeri(this.goodsItem);
			}
			this.batchShow = false;
		},
		materialWinClose(res, list) { //物料批次选择后
			if(res == 'ok') {
				this.materialItem.batchInfo = list;
				let into = 0,
					consumeNum = 0;
				for(let item of list) {
					into += Number(item.intoNum);
					consumeNum += Number(item.consumeNum);
				}
				this.materialItem.intoNum = into;
				this.materialItem.consumeNum = consumeNum;
				if(into > 0 || consumeNum > 0) {
					this.materialItem.haveBatch = true;
				} else {
					this.materialItem.haveBatch = false;
				}
				if(!this.numberVeri(this.materialItem)) return;
			}
			this.batchShow = false;
		},
		numberVeri(item) { //入货数量验证
			let surplus = Number(item.outNum) - Number(item.overIntoNum) - Number(item.overConsumeNum); //剩余能入库 能耗损数量
			let nowNum = Number(item.intoNum) + Number(item.consumeNum);
			if(nowNum > surplus) {
				item.noPass = true;
				let str = `(${item.name}) 剩余可入货数量不足`;
				this.myAlert(str);
				return false;
			}
			return true;
		},
		wareEvent(res, obj) { //仓库选择完毕
			if(res == 'ok') {
				if(this.handleType == 1) { //商品
					for(let i in obj) {
						this.goodsItem[i] = obj[i];
					}
				} else { //物料
					for(let i in obj) {
						this.materialItem[i] = obj[i];
					}
				}
			}
			this.wareShow = false;
		},
		myAlert(content) {
			this.$store.commit('setWin', {
				title: '操作提示',
				content: content,
			});
		},
		listClick(index) { //列表点击事件 用于获取操作的列表index
			this.listIndex = index;
		},
		timeConversion(time, type) {
			if(type) {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm:ss');
			} else {
				return utils.format(new Date(time * 1000), 'yyyy年MM月dd日');
			}
		},
	},
};
</script>
<style scoped lang='less'>
	#output-shipper {
		position: relative;
		.color-size {color: #333;font-size: 16px;}
		.head-line {
			padding-left: 15px;height: 30px;border-left: 2px solid #28a8e0;font-size: 16px;line-height: 30px;color: #333;
			&:after {
				content: "";display: inline-block;width: 535px;margin-left: 25px;border: 1px dashed #ccc;position: relative;top: -5px;
			}
		}
		.detail {overflow: hidden;padding-top: 20px;padding-left:5%;
			.block{float: left;width: 33.33%;padding-right:20px;
				.item{font-size: 16px;position: relative;min-height:20px;padding-left: 80px;margin-bottom: 20px;
					span{position: absolute;left: 0;top: 0;font-size: 16px;}
					p{min-width: 30px;max-width: 100%;min-height: 20px;position: relative;display: inline-block;font-size: inherit;
						em{display: block;height: 18px;width: 18px;position: absolute;right: -22px;top: 0;cursor: pointer;
							background: url(../../../res/images/examine.jpg) center;}
					}
				}
				.narrow{padding-left: 50px;}
				.ware{padding-right: 20px;}
			}
			/*examine*/
		}
		.tab-box{padding-bottom: 20px;
			overflow: hidden;
			span{float: left;width: 120px;height: 35px;line-height: 33px;text-align: center;color: #f8941f;border: 1px solid #f8941f;
				cursor: pointer;
				&.active{background: #f8941f;color: #fff;}
			}
		}
		.consume-list{
			width: 100%;border: 1px solid #ccc;
			.head{height: 45px;line-height: 45px;padding: 0 10px;font-size: 16px;
				em{color: #ff3a05;}
			}
			.list{overflow: auto;
				.scroll-box{min-width: 1200px;}
				.title{background: #f2f2f2;overflow: hidden;
					span{width: 13%;height: 40px;line-height: 40px;text-align: center;float: left;
						em{color: #26a7e0;padding-left: 5px;text-decoration: underline;cursor: pointer;}
					}
					.ware{padding-right: 30px;}
					.narrow{width: 9%;}
				}
				.item{text-align: center;border-bottom: 2px solid #f7f7f7;width: 100%;
					.unit{width: 13%;float: left;height: 70px;line-height: 70px;
						text-overflow: ellipsis;white-space: nowrap;overflow: hidden;
						.handle-btn{display: inline-block;height: 18px;vertical-align: middle;line-height: normal;padding: 0 15px;cursor: pointer;
							color: #29a8df;
							&.error{color: #ea3b44;cursor: default;}
						}
						.init-end{color: #666;cursor: not-allowed;}
						span{display: inline-block;vertical-align: middle;}
						.input-box{vertical-align: middle;
							line-height: normal;height: 40px;border: 1px solid #ccc;overflow: hidden;display: inline-block;
							input{height: 38px;line-height: 38px;width: 80px;float: left;border: 0;padding: 0 5px;
								&:focus{outline: none;}
							}
							em{width: 40px;height: 38px;line-height: 38px;text-align: center;border-left: 1px solid #ccc;float: left;
								color: #333;
							}
						}
						.error-icon{
							height: 20px;width: 20px;border-radius: 50%;color: #fff;background: #ea3b44;display: inline-block;
							text-align: center;line-height: 20px;font-size: 16px;font-weight: bold;vertical-align: middle;
						}
						&.reason{width: 78%;text-align: left;}
					}
					.ware{padding-right: 30px;
						span{height: 18px;position: relative;line-height: normal;max-width: 100%;
							.change-ware{
								height: 18px;width: 18px;display: block;position: absolute;right: -22px;top: 0;
								background: url(../../../res/images/evret.jpg) center;cursor: pointer;
							}
						}
					}
					.narrow{width: 9%;}
					&:after{zoom: 1;display: block;content: '';clear: both;}
					&:last-child{border-bottom: 0;}
				}
				.empty{height: 70px;line-height: 70px;text-align: center;font-size: 20px;color: #999;}
			}
		}
	}
</style>
