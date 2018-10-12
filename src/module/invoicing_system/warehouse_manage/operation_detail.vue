<!--
    **调度管理-详情
    *
    * 黄一帆
    * *
    *
-->
<template>
    <div id="output-shipper">
		<div class="scroll-box">
			<template v-if="mainShow">
				<div class="head">调度单详情</div>
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
								<p>{{details.intoWname}}<em @click="openWareWin(details.intoWarehouse)" class="el-icon-document"></em></p>
							</div>
							<div class="item ware">
								<span>出货仓库：</span>
								<p>{{details.outWname}}<em @click="openWareWin(details.outWarehouse)" class="el-icon-document"></em></p>
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
							<template v-if="dynamic==2 || dynamic==5 || dynamic==6">
								<div class="item">
									<span v-if="disType==1">出货时间：</span>
									<span v-if="disType==2">入货时间：</span>
									{{operate.time}}
								</div>
								<div class="item">
									<span v-if="disType==1">出货人：</span>
									<span v-if="disType==2">入货人：</span>
									{{operate.name}}
								</div>
							</template>
							<template v-if="dynamic==4">
								<div class="item">
									<span>取消时间：</span>{{operate.time}}
								</div>
								<div class="item">
									<span>取消人：</span>{{operate.name}}
								</div>
							</template>
						</div>
					</div>
				<div class="tab-box" @click="tabClick" v-if="enterList.length">
					<span data-type="1" :class="{active:selIndex==-1}">出货单</span>
					<span v-for="(item,index) in enterList" :key="index" data-type="2" :data-index="index" :class="{active:selIndex==index}">
						入货单{{index+1}}
					</span>
				</div>
				<!-- 仓库详情弹窗 -->
                <div>
					<el-dialog
					  title="仓库信息"
					  :visible.sync="dialogVisible"
					  width="600px"
					  :close="handleClose">
					  <div class="ware-detail">
					  	<span>仓库名称：{{this.wareDetail.name}}</span>
					  	<span>仓库所属：{{this.wareDetail.ownerName}}</span>
					  	<span>仓库地址：{{this.wareDetail.provinceName}} {{this.wareDetail.cityName}} {{this.wareDetail.townName}}</span>
					  </div>
					  <span slot="footer" class="dialog-footer">
					    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
					  </span>
					</el-dialog>
				</div>
				<!-- 调度详情-列表 -->
				<detail-list
				@emit="getDetailObj"
				:detail="detailObj"
				:detailInto="detailObjInto"
				:type="disType"
				:tabIndex="logObj.type"
				></detail-list>
			</template>
			<!-- 打印 -->
			<output-print 
			v-if="printShow"
			@emit="getEmit" 
			:detail="details" 
			:goods="outGoods" 
			:material="outMaterial" 
			:isOpen="showCom"
			></output-print>
			
			<output-print-into
			v-if="printShowInto"
			@emit="getEmit" 
			:detail="details" 
			:goods="enterGoods" 
			:material="enterMaterial" 
			:isOpen="showCom"
			></output-print-into>
		</div>
    </div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			showCom: false, //是否展示详细内容
			details: {}, //详情信息
			allStatus: {
				1:'未出货',
				2:'待入货',
				3:'调度中',
				4:'已取消',
				5:'已完成',
				6:'已完成(异常)',
			},
			matTypeHash:{
				0:'成品',
				1:'半成品',
				2:'普通物料',
			},
			detailObj: {}, //详情列表对象
			detailObjInto: {}, //详情列表对象入货
			outGoods: [], //商品详情-出货
			outMaterial: [], //物料详情-出货
			enterList: [], //入货单的列表
			enterGoods: [], //商品详情-入货
			enterMaterial: [], //商品详情-入货
			printShow: false, //打印预览
			printShowInto: false, //入货单打印预览
			mainShow: true, //主页面显示
			enterShow: true, //入货显示
			detailId: '', //出货单id
			dispatchId: '', //出货单详情id
			dynamic: '', //调度状态
			disType: 1, //选择的调度单类型 1出货 2入货
			selIndex: -1, //选择的调度单index
			operate: {
				name: '', //操作人
				time: '', //操作时间
			},
			wareId: '', //仓库id 仓库详情弹窗
			btnArr: [], //右上角按钮
			outDetails: {}, //出货单详情列表
			uid: '', //操作人id
			isExamine: false, //是否从审核进入该详情
			isBrand:0,//0单店 1品牌
			wareDetail:{},//仓库详情
			dialogVisible:false,//仓库详情显示/隐藏
			isTotalLog:false,//是否从总日志进入
			logObj:{
				id:'',
				tab:'',
				type:'',
			},//总日志对象
		};
	},
	components: {
		detailList: () =>
			import( /*webpackChunkName: 'operation_detail_list'*/ './operation_detail_list'),
		outputPrint: () =>
			import( /*webpackChunkName: 'output_shipper_print'*/ './output_shipper_print'),
		outputPrintInto: () =>
			import( /*webpackChunkName: 'output_shipper_print'*/ './output_shipper_print_into'),
		enterGoods: () =>
			import( /*webpackChunkName: 'enter_goods'*/ './enter_goods'),
	},
	beforeRouteEnter (to, from, next) {
		if(from.path=='/admin/inventoryManagement/publicDetails'){
			next(function(self){
				self.isTotalLog = true;
			});
		}else{
			next();	
		}
	},
	mounted() {
		this.initBtn();
		this.detailId = this.$route.query.id;
		let userData = storage.session('userShop');
		this.isBrand = userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌
		let isExamine = storage.session('clusionToOperationDetail');
		if(isExamine) {
			this.isExamine = isExamine;
			storage.session('clusionToOperationDetail', null);
		}
		this.uid = userData.user.id;
		this.init().then(()=>{
			if(this.isTotalLog) this.totalLog();
		});
	},
	methods: {
		initBtn() {
			this.btnArr = [
				{name: '打印',className: 'warning',type:5,
					fn: () => {
						if(this.disType == 1) {
							this.printShow = true;
						} else if(this.disType == 2) {
							this.printShowInto = true;
						}
						this.mainShow = false;
						this.$store.commit('setPageTools', []);
					}
				},
				{name: '返回',className: 'info',type:4,
					fn: () => {
						storage.session('operationRequestDestroy', true);
						this.$router.go(-1);
					}
				},
			];
			this.$store.commit('setPageTools', this.btnArr);
		},
		totalLog(){//从总日志进入时，设置tab切换
			this.detailId = this.$route.query.id;
			this.logObj={
				id: this.$route.query.intoId,
				tab:this.$route.query.logTab,
				type:this.$route.query.logType,
			};
			
			if(this.logObj.tab==1){//辨别出货单/入货单  1出货单  2入货单
				this.selIndex = -1;
			}else{
				for(let i=0;i<this.enterList.length;i++){
					let item = this.enterList[i];
					if(this.logObj.id==item.id){
						this.selIndex = i;
					}
				}
			}
		},
		setInitBtn() { //等待接口返回后 显示按钮
			this.initBtn();
			if(this.isExamine) return; //审核页面不出现以下按钮
			if(this.dynamic == 1) {
				let addArr = [{
					name: '取消调度',
					className: 'danger',type:5,
					fn: () => {
						this.cancelMethod(); //取消
					}
				},
				{
					name: '确认出货',
					className: 'primary',type:4,
					fn: () => {
						this.confirmMethod(); //确认
					}
				}];
				this.btnArr.unshift(...addArr);
			}
			if(this.dynamic == 2) { //this.dynamic==2
				let addArr = [{
					name: '入货',
					className: 'primary',type:4,
					fn: () => {
						this.$router.push({
							path: '/admin/operation/enterGoods',
							query: this.$route.query
						});
					}
				}];
				this.btnArr.unshift(...addArr);
			}
			this.$store.commit('setPageTools', this.btnArr);
		},
		async openWareWin(wid) {
			this.wareId = wid;
			let data = await http.warehouseGetWarehouse({data:{
				id:this.wareId,
			}});
			let res = await import ( /*webpackChunkName: 'area_cn'*/ 'src/verdor/area_cn');
			let areaCn = res.default;
			data.provinceName = areaCn.getNameByCode(data.province);
			data.cityName = areaCn.getNameByCode(data.city);
			data.townName = areaCn.getNameByCode(data.town);
			this.wareDetail = data;
			this.dialogVisible = true;
		},
		handleClose() {
			this.dialogVisible = false;
		},
		getEmit() { //获取打印传值
			this.printShow = false;
			this.printShowInto = false;
			this.mainShow = true;
			if(this.disType == 1) {
				this.setOrderDetail(this.outDetails, 1);
			} else {
				this.setOrderDetail(this.enterList[this.selIndex], 2);
			}
			this.$store.commit('setPageTools', this.btnArr);
		},
		getDetailObj(obj) {
			this.showCom = obj.showCom; //打印的时候 是否展示详细内容
		},
		tabClick(index) { //单据类型切换
			let target = event.target;
			if(target.tagName.toLocaleLowerCase() == 'span') {
				let type = target.getAttribute('data-type');
				let index = target.getAttribute('data-index');
				if(type == 1) { //出货单
					this.selIndex = -1;
					this.setOrderDetail(this.outDetails, type);
				} else if(type == 2) { //入货单
					this.selIndex = index;
					let item = this.enterList[index];
					this.setOrderDetail(item, type);
				}
			}
		},
		setOrderDetail(item, type) {
			if(type == 1) {
				this.outGoods = this.setGoodsList(item.itemDetail.goodsDetail);
				this.outMaterial = this.setMaterialList(item.itemDetail.materialDetail);
				let obj = {
					goods: this.outGoods,
					material: this.outMaterial,
				};
				this.detailObj = obj; //传入子组件-详情列表
				this.disType = type;
			}
			if(type == 2) {
				this.enterGoods = this.setGoodsListInto(item.itemDetail.goodsDetail);
				this.enterMaterial = this.setMaterialListInto(item.itemDetail.materialDetail);
				let obj = {
					goods: this.enterGoods,
					material: this.enterMaterial,
				};
				this.detailObjInto = obj; //传入子组件-详情列表
				this.disType = type;
			}
			this.operate.name = item.operateUname;
			this.operate.time = this.timeConversion(item.operateTime, 1);
			this.$set(this.details,'operate',this.operate);
		},
		async init() {
			let res = await http.getDispatchRecordDetailList({
				data: {
					id: this.detailId,
					shopType: this.isBrand,
				}
			});
			this.details = res;
			this.details.isBrand = this.isBrand;
			this.details.operate = {};
			this.dynamic = this.details.dynamic;
			for(let item of res.invoiceList) {
				if(item.type == 1) {
					this.dispatchId = item.id;
					this.setOrderDetail(item, item.type);
					this.outDetails = item;
				} else if(item.type == 2) { //入货单放进数组，方便切换
					this.enterList.push(item);
				}
			}
			this.setInitBtn();
		},
		cancelMethod() {
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: '是否取消调度？',
				ok: {
					content: '是',
				},
				cancel: {
					content: '否'
				},
				callback: (res) => {
					if(res == 'ok') {
						this.cancelShipment();
					}
				}
			});
		},
		confirmMethod() {
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: '是否确认出货？',
				ok: {
					content: '是'
				},
				cancel: {
					content: '否'
				},
				callback: (res) => {
					if(res == 'ok') {
						this.confirmShipment();
					}
				}
			});
		},
		async cancelShipment() { //取消调度
			let res = await http.DispatchrecordCancelShipment({
				data: {
					id: this.detailId,
					dispatchId: this.dispatchId,
				}
			});
			if(res) {
				this.init();
			}
		},
		async confirmShipment() { //确认出货
			let res = await http.DispatchrecordConfirmShipment({
				data: {
					id: this.detailId,
					uid: this.uid,
					type: this.details.applyId > 0 ? 1 : 0,
				}
			});
			if(res) {
				this.init();
			}
		},
		myAlert(content) {
			this.$store.commit('setWin', {
				title: '操作提示',
				content: content,
			});
		},
		setGoodsList(arr) { //出货-设置商品列表-方便打印
			let goodList = utils.deepCopy(arr);
			for(let i in goodList) {
				let item = goodList[i];
				item.serialNumCus = Number(i) + 1; //序号
				item.typeNameCus = item.type == 0 ? '普通商品' : '称重商品'; //商品类型
				item.outGoodsNumCus = item.num + item.unit; //重量/数量
				let costTotal = 0;//成本总额
				for(let n in item.batchInfo) {
					let detail = item.batchInfo[n];
					let cost = 0;
					detail.serialNumCus = '批次 ' + (Number(n) + 1); //序号
					detail.timeCus = this.timeConversion(detail.productionTime); //出货时间
					detail.priceAndName = detail.purchasePrice + '元/' + item.unit; //进价
					detail.outGoodsNumCus = detail.num + item.unit; //重量/数量
					cost = detail.purchasePrice*detail.num;
					costTotal += cost;
				}
				item.costTotal = this.setNumfloat(costTotal)+'元';
			}
			return goodList;
		},
		setMaterialList(arr) { //出货-设置物料列表-方便打印
			let materialList = utils.deepCopy(arr);
			for(let i in materialList) {
				let item = materialList[i];
				let cateArr = [];
				for(let cate of item.cateData) {
					cateArr.push(cate.name);
				}
				item.serialNumCus = Number(i) + 1; //序号
				item.cateCus = cateArr.join(','); //物料分类
				item.outMatNumCus = this.setUnit(item.unitData, item.num, item.selectUnitName); //重量 数量
				item.matType = this.matTypeHash[item.type];
				let costTotal = 0;//成本总额
				for(let n in item.batchInfo) {
					let detail = item.batchInfo[n];
					let cost = 0;
					detail.serialNumCus = '批次 ' + (Number(n) + 1); //序号
					detail.timeCus = this.timeConversion(detail.productionTime); //出货时间
					detail.priceAndName = detail.purchasePrice + '元/' + this.getUnitName(item.unitData,detail.purchaseUnit); //进价
					detail.outMatNumCus = this.setUnit(item.unitData, detail.num, item.selectUnitName); //重量/数量
					if(this.isBrand) detail.distributionStr = detail.distributionPrice +'元/'+ this.getUnitName(item.unitData,detail.distributionUnit);//分销价
					cost = detail.num/this.getUnitName(item.unitData,detail.purchaseUnit,true)*detail.purchasePrice;
					costTotal += cost;
				}
				item.costTotal = this.setNumfloat(costTotal)+'元';
			}
			return materialList;
		},
		getUnitName(unit,id,isValue){//获取单位名称
			for(let item of unit){
				if(item.muId==id){
					if(isValue){//是否返回比例
						return item.value;
					}else{
						return item.name;	
					}
				}
			}
		},
		spliceArr(arr) { //筛选掉入货/耗损为0的数据
			for(let i = 0; i < arr.length; i++) {
				let item = arr[i];
				let into = 0,
					consume = 0;
				for(let n in item.batchInfo) {
					let detail = item.batchInfo[n];
					into = into + Number(detail.intoNum);
					consume = consume + Number(detail.consumeNum);
				}
				if(into <= 0 && consume <= 0) {
					arr.splice(i, 1);
				}
			}
		},
		setGoodsListInto(arr) { //入货-设置商品列表-方便打印
			let goodList = utils.deepCopy(arr);
			this.spliceArr(goodList);
			for(let i = 0; i < goodList.length; i++) {
				let item = goodList[i];
				item.serialNumCus = Number(i) + 1; //序号
				item.num = item.num + item.unit;
				let into = 0,
					consume = 0,
					costTotal = 0;
				for(let n in item.batchInfo) {
					let detail = item.batchInfo[n];
					let cost = 0;
					detail.serialNumCus = '批次 ' + (Number(n) + 1); //序号
					detail.timeCus = this.timeConversion(detail.productionTime); //出货时间
					detail.priceAndName = detail.purchasePrice + '元/' + item.unit; //进价
					detail.outGoodsNumCus = detail.num + item.unit; //重量/数量
					detail.intoNumDetail = detail.intoNum + item.unit;
					detail.consumeNumDetail = detail.consumeNum + item.unit;
					into = into + Number(detail.intoNum);
					consume = consume + Number(detail.consumeNum);
					cost = detail.intoNum*detail.purchasePrice;
					costTotal += cost;
				}
				item.intoNum = into + item.unit;
				item.consumeNum = consume + item.unit;
				item.wName = item.newWname;
				for(let areaItem of item.newArea) { //匹配区域名称
					if(areaItem.id == item.areaId) item.aName = areaItem.areaName;
				}
				item.costTotal = this.setNumfloat(costTotal)+'元';
			}
			return goodList;
		},
		setMaterialListInto(arr) { //入货-设置物料列表-方便打印
			let materialList = utils.deepCopy(arr);
			this.spliceArr(materialList);
			for(let i = 0; i < materialList.length; i++) {
				let item = materialList[i];
				item.serialNumCus = Number(i) + 1; //序号
				item.num = this.setUnit(item.unitData, item.num, item.unit);
				let into = 0,
					consume = 0,
					costTotal = 0;
				for(let n in item.batchInfo) {
					let detail = item.batchInfo[n];
					let cost = 0;
					detail.serialNumCus = '批次 ' + (Number(n) + 1); //序号
					detail.timeCus = this.timeConversion(detail.productionTime); //出货时间
					detail.priceAndName = detail.purchasePrice + '元/' + this.getUnitName(item.unitData,detail.purchaseUnit); //进价
					detail.outMatNumCus = this.setUnit(item.unitData, detail.num, item.selectUnitName); //重量/数量
					detail.intoNumDetail = this.setUnit(item.unitData, detail.intoNum, item.unit);
					detail.consumeNumDetail = this.setUnit(item.unitData, detail.consumeNum, item.unit);
					into = into + Number(this.setUnitNum(item.unitData, detail.intoNum, item.unit));
					consume = consume + Number(this.setUnitNum(item.unitData, detail.consumeNum, item.unit));
					cost = detail.intoNum/this.getUnitName(item.unitData,detail.purchaseUnit,true)*detail.purchasePrice;
					costTotal += cost;
				}
				item.intoNum = into + item.unit;
				item.consumeNum = consume + item.unit;
				item.wName = item.newWname;
				for(let areaItem of item.newArea) { //匹配区域名称
					if(areaItem.id == item.areaId) item.aName = areaItem.areaName;
				}
				item.costTotal = this.setNumfloat(costTotal)+'元';
			}
			return materialList;
		},
		setUnitNum(unit, num, name) { //换算成出货单位
			let res = 0;
			for(let item of unit) {
				if(item.name == name) {
					res = Number(num) / Number(item.value);
				}
			}
			return res;
		},
		setUnit(unit, num, name) { //换算成出货单位
			let res = 0;
			for(let item of unit) {
				if(item.name == name) {
					res = Number(num) / Number(item.value) + name;
				}
			}
			return res;
		},
		setNumfloat(num){//设置三位浮点型数字
			let str = num+'';
			let reg = /\.\d{4,}/;
			if(reg.test(str)){//小数点后四位以上
				let repNum = str.substr(str.indexOf('.')+3,1);
				if(repNum>0){//大于0则切掉
					str = str.replace(/(\d+\.\d{2})(\d*)/,'$1'+repNum);
				}else{//等于0则+1
					str = str.replace(/(\d+\.\d{2})(\d*)/,'$1'+'1');
				}
			}
			return str;
		},
		timeConversion(time, type) {
			if(type) {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm:ss');
			} else {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd');
			}
		},
	},

};
</script>
<style scoped lang='less'>
	.ware-detail{
		span{display: block;padding: 10px 0;font-size: 16px;line-break: 1.5;}
	}
#output-shipper {
	position: relative;
	.color-size {color: #333;font-size: 16px;}
	.head {
		padding-left: 15px;height: 20px;border-left: 2px solid #28a8e0;font-size: 16px;line-height: 20px;color: #333;
		position: relative;
		&:after {
			content: "";display: inline-block;width: 100%;border: 1px dashed #ccc;position: absolute;top: 10px;
			left: 100px;
		}
	}
	.detail {overflow: hidden;padding-top: 20px;padding-left:5%;
		.block{float: left;width: 33.33%;padding-right:20px;
			.item{font-size: 16px;position: relative;min-height:20px;padding-left: 80px;margin-bottom: 20px;
				span{position: absolute;left: 0;top: 0;font-size: 16px;}
				p{min-width: 30px;max-width: 100%;min-height: 20px;position: relative;display: inline-block;font-size: inherit;
					em{display: block;font-size: 18px;color: #E1BB4A;position: absolute;right: -22px;top: 0;cursor: pointer;}
				}
			}
			.narrow{padding-left: 50px;}
			.ware{padding-right: 20px;}
		}
		/*examine*/
	}
	.tab-box{
		overflow: hidden;display: inline-block;padding-left: 1px;
		span{float: left;color: #606266;height: 40px;line-height: 38px;padding: 0 15px;text-align: center;margin-bottom: 10px;
			cursor: pointer;border: 1px solid #dcdfe6;margin-left: -1px;
			&.active{background: #E1BB4A;color: #fff;border: 1px solid #E1BB4A;}
			&:first-child{border-top-left-radius: 4px;border-bottom-left-radius: 4px;}
			&:last-child{border-top-right-radius: 4px;border-bottom-right-radius: 4px;}
		}
	}
}
</style>
