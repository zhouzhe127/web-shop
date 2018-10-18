<!--
    **快速调度
    *
    * 黄一帆
    * *
    *
-->
<template>
    <div>
    <div id="out-store" v-if="showMain">
		<div class="scroll-box">
            <div class="store-list">
                <label class="label">原因</label>
                <input type="text" class="text"  placeholder="请输入调度原因" v-model="cause" maxlength="20">
                <div class="tip-word">
                        <img src="../../../res/images/handle-tips.png" alt="">限20字以内,数字/字母
                </div>
            </div>
            <div class="store-list">
                <label class="label required">操作人</label>
                <span class="text" style="display:inline-block;color:#333333;">{{userName}}</span>
                <div class="tip-word">
                </div>
            </div>
            <div class="store-list" style="margin-top:-15px;">
                <label class="label">调度单号</label>
                <input type="text" class="text" placeholder="请输入调度单号" maxlength="20" v-model="receiptNumber">
                <div class="tip-word">
                        <img src="../../../res/images/handle-tips.png" alt=""> 限20字以内,数字/字母
                </div>
            </div>
            <div class="store-list">
                <label class="label">备注</label>
                <textarea class="textarea" placeholder="请输入备注" v-model="remark" maxlength="40"></textarea>
                <div class="tip-word">
                        <img src="../../../res/images/handle-tips.png" alt="">限40字以内
                </div>
            </div>

            <div class="store-list" style="margin-bottom:20px;">
                <label class="label required">出货仓库</label>
                <div class="add" @click="openAddStoreWin('out')"> 添加仓库</div>
                <span class="select-store" >
                    {{outWarehouse?"(已选择: "+outWarehouse.name+")":"请添加仓库"}}
                </span>
            </div>
            <div class="store-list" style="margin-bottom:20px;">
                <label class="label required">入货仓库</label>
                <div class="add" @click="openAddStoreWin('in')">添加仓库</div>
                <span class="select-store">
                  {{inWarehouse?"(已选择: "+inWarehouse.name+")":"请添加仓库"}}
                </span>
            </div>
            <div class="store-list" style="margin-bottom:20px;">
                <label class="label required">出货商品</label>
                <div class="add" @click="addGoods('goods')">添加商品</div>
            </div>
			<div class="store-list" style="margin-bottom:20px;">
                <label class="label required">出货物料</label>
                <div class="add" @click="addGoods('material')">添加物料</div>
            </div>
            <template  v-if="goodsDetails.length>0||materialInfo.length>0">
				<div class="tebBox">
					<div class="chooseBtn">
						<span :class="{select:selectType==0}" @click="selectType=0">商品</span>
						<span :class="{select:selectType==1}" @click="selectType=1">物料</span>
						
					</div>
					<div class="piceType" v-if="selectType==1&&isBrand">
						<el-select v-model="picestyle" @change="picestyleChange" placeholder="分销价格切换">
							<el-option v-for="item in dispiceArr" :key="item.distributionId" :label="item.name" :value="Number(item.distributionId)"></el-option>
						</el-select>
					</div>
				</div>	
				<div class="add-list" v-if="selectType==0">
					<div class="head">
						商品列表 · 共<span>{{goodsDetails.length}}</span>个条目
					</div>
					<div class="title goods">
						<li>操作</li>
						<li>出货数量</li>
						<li>商品名</li>
						<li>库存批次数</li>
						<li>条形码</li>
						<li>商品类型</li>
						<li>库存数量/重量</li>
					</div>
					<div class="table-body">
						<div class="ceil goods" v-for="(item,index) in goodsDetails" :key="index">
							<li>
								<span style="color:#ff7147;cursor:pointer;" @click="delList(index,0)">删除</span>
								<span class="split-line"></span>
								<span style="color:#35aee2;cursor:pointer;" @click="openBatchWin(item,index)">批次选择</span>    
							</li>
							<li>
								<input class="text" type="text" placeholder="输入数字" v-model="item.selectNum"
									:disabled="item.haveBatch" maxlength="10" >
							</li>
							<li :title="item.goodsName" class="ellipsis">{{item.goodsName}}</li>
							<li>{{item.batch}}</li>
							<li class="ellipsis">{{item.barCode}}</li>
							<li>{{typeList[Number(item.type)]}}</li>
							<li>{{item.surplus}}{{item.unit}}</li>
						</div>
						<div class="empty" v-if='!goodsDetails.length'>- 暂无条目 -</div>
					</div>
				</div>
				<div class="add-list" v-if="selectType==1">
					<div class="head">
						物料列表 · 共<span>{{materialInfo.length}}</span>个条目
					</div>
					<div class="title material">
						<li>操作</li>
						<li>出货单位选择</li>
						<li>出货数量/重量</li>
						<li>物料名称</li>
						<li v-if="isBrand">分销价格</li>
						<li v-if="isBrand">价格单位</li>
						<li>库存数量/重量</li>
						<li>库存批次数</li>
						<li>类型</li>
					</div>
					<div class="table-body">
						<div class="ceil material" v-for="(item,index) in materialInfo" :key="index">
							<li>
								<span style="color:#ff7147;font-size:14px;cursor:pointer;" @click="delList(index,1)">删除</span>
								<span class="split-line"></span>
								<span style="color:#35aee2;font-size:14px;cursor:pointer;" @click="openSuppliesWin(item,index)">批次选择</span>    
							</li>
							<li>
								<selectBtn @selOn="(res)=>getUnit(res,index)" :sorts="item.unitList" :index="item.index" :width="'100'"></selectBtn>
							</li>
							<li>
							<div class="input-box">
								<input placeholder="输入数字" v-model="item.selectNum" maxlength="10" :disabled="item.haveBatch">
								<div class="ellipsis">{{item.selectName}}</div>
							</div> 
							</li>
							<li :title="item.name" class="ellipsis">{{item.name}}</li>
							<li v-if="isBrand">
								<div class="dispice">
									<span v-if="item.piceValue&&item.distributionId>=0">{{item.piceValue}}</span>
									<div class="input-num" v-if="item.distributionId==-2">
										<el-input type="text" placeholder="" maxlength="9" v-model="item.piceValue"></el-input>
									</div>
									<div class="slebox">
										<el-select v-model="item.distributionId" @change="piceChange(item)" placeholder="分销价格切换">
											<el-option v-for="s in item.rela" :key="s.distributionId" :label="s.distributionName" :value="Number(s.distributionId)"></el-option>
										</el-select>
									</div>
								</div>
							</li>
							<li v-if="isBrand">
								<el-select v-model="item.piceUnitid" :disabled="item.distributionId != -2" placeholder="单位">
									<el-option v-for="s in item.unit" :key="s.muId" :label="s.name" :value="s.muId"></el-option>
								</el-select>
							</li>
							<li class="ellipsis">{{item.numberUnit}}</li>
							<li>{{item.batch}}</li>
							<li>{{typeCate[item.type]}}</li>
						</div>
						<div class="empty" v-if='!materialInfo.length'>- 暂无条目 -</div>
					</div>
				</div>
			</template>
            <div class="bottom" :class="{'have-goods':goodsDetails.length>0||materialInfo.length>0}">
                <div class="gray" @click="returnBefore">取消</div>
                <div class="yellow" @click="sure">确定</div>
            </div>
			<component
				:is="showCom"
				:pObj="comObj"
				@throwWin="winWarehouse"
			></component>
		</div>
    </div>
	<!-- 添加商品 srcShopId源店铺(出)  dstShopId目标店铺(入)-->
    <select-goods 
	@select="getSleGoods" 
	:wid="outWarehouseId" 
	:addBtn="true" 
	:dstShopId="inShopId"
	:srcShopId="outShopId"
	:shopId="outShopId"
	:sleCommodity="sleGoods" 
	v-if="showSleGoods"></select-goods>

	<!-- 添加物料 srcShopId源店铺(出)  dstShopId目标店铺(入)-->
	<select-material 
	@select="getSleMaterial" 
	:wid="outWarehouseId" 
	:addBtn="true" 
	:sleSupplies="sleMaterial"
	:dstShopId="inShopId"
	:srcShopId="outShopId"
	:shopId="outShopId"
	v-if="showSleMaterial"></select-material>

	<!-- 商品批次选择 -->
    <goods-batch v-if="goodsBatchShow" 
	:wid="outWarehouseId"
	:needItem="goodsItem"
	:selectItem="selectGoods"
	:shopId="outShopId"
	@throwWin="goodsWinClose" 
	></goods-batch>

	<!-- 物料批次选择 -->
    <material-batch v-if="matBatchShow" 
	:wid="outWarehouseId" 
	:batchInfo="materialItem"
	:selectItem="selectMaterial"
	:shopId="outShopId"
	@getWin="suppliWinClose" 
	:type="false"></material-batch>
    </div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				showCom: '',
				comObj: {},
				cause: '', //出货原因
				receiptNumber: '', //单据编号
				remark: '', //备注
				goodsInfo: '', //商品信息
				userName: '', //操作人首字母
				userId: '', //操作人id
				selectType: 0, //0商品 1物料
				unitName: [],
				allUnit: [],
				showMain: true, //显示主页面
				showSleGoods: false,
				showSleMaterial: false,
				tabIndex: 0, //选择商品-物料组件 0商品 1物料
				sleGoods: [], //商品
				sleMaterial: [], //物料
				typeList: ['普通商品', '称重商品'],
				goodsItem: '', //选择的商品
				selIndex: '',
				sleItem: '',
				nextUnit: [],
				goodsBatchShow: false,
				matBatchShow: false,
				suppliesItem: '',
				// isBrand: 0, //1为品牌 0为非品牌
				materialInfo: [],
				item: '',
				winIndex: 0,
				wareList: [], //拼接过后的仓库列表
				outWarehouse: '', //出货仓库
				outWarehouseId: '', //出货仓库id
				outWhSelected: '', //出货已选中仓库
				inWarehouse: '', //入货仓库
				inWarehouseId: '', //入货仓库id
				inWhSelected: '', //入货已选中仓库
				isPutIn: null, //判断出货入货
				goodsDetails: [], //商品详情
				copyGoodsDetails: [], //复制一份商品详情
				goodsBatchDetails: [], //商品批次
				materialDetail: [], //物料详情
				goodsIndex: '',
				bouncedType: null, //弹框0仓库弹框  1 批次弹框
				goodsDetailsNum: null,
				materialIndex: '', //选中物料批次
				goodsOut: [], //商品出货列表
				suppliesOut: [], //物料出货列表
				materialItem: {}, //当前操作的物料
				inShopId: '', //入货方品牌id
				outShopId: '', //出货方店铺id
				selectGoods: [], //已选中批次
				selectMaterial: [], //已选中批次
				clearArr: ['goodsDetails', 'materialInfo', 'sleGoods', 'sleMaterial', 'goodsOut', 'suppliesOut'], //清空字段
				isClick: false, //是否已经点击提交，防止重复点击
				typeCate:['成品','半成品','普通物料'],//物料类型
				dispiceArr: [], //分销价
				isBrand: false,
				picestyle: '' //选择的分销价
			};
		},
		mounted() {
			this.isBrand = storage.session('userShop').currentShop.ischain == '3'? true : false;
			this.initData();
			this.getDistr();
		},
		components: {
			goodsBatch: () =>
				import( /*webpackChunkName:'output_store_batch_win'*/ './output_store_batch_win'), //商品批次选择
			materialBatch: () =>
				import( /*webpackChunkName: 'output_material_batch_win'*/ './output_material_batch_win'), //物料批次选择
			addStore: () =>
				import( /*webpackChunkName:'warehouse_select'*/ './warehouse_select'),
			selectBtn: () =>
				import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			selectGoods: () =>
				import( /*webpackChunkName: 'output_select_goods_ware'*/ './output_select_goods_ware'),
			selectMaterial: () =>
				import( /*webpackChunkName: 'output_select_supplies_ware'*/ './output_select_supplies_ware'),
	
		},
		destroyed(){
			storage.session('warehouse_select',null);
		},
		methods: {
			addGoods(type) { //添加商品-物料
				if(!this.addVeri()) return;
				if(type == 'goods') { //添加商品
					this.showSleGoods = true;
				} else if(type == 'material') { //添加商品
					this.showSleMaterial = true;
				}
				this.showMain = false;
			},
			addVeri() { //添加商品物料-验证
				if(!this.outWarehouseId) {
					this.myAlert('请选择出货仓库');
					return false;
				}
				if(!this.inWarehouseId) {
					this.myAlert('请选择入货仓库');
					return false;
				}
				return true;
			},
			getUnit(index, listIndex) { //切换单位
				let item = this.materialInfo[listIndex];
				item.selectNum = '';
				item.haveBatch = false;
				item.selectName = item.unit[index].name;
				item.selectValue = item.unit[index].value;
				this.materialInfo.splice(listIndex, 1, item);
			},
			warehouseVeri(idName) { //选择仓库-验证
				if(this.inWarehouseId || this.outWarehouseId) {
					if(this.inWarehouseId == this.outWarehouseId) {
						this.myAlert('出货/入货仓库不能相同');
						this[idName] = '';
						return false;
					}
				}
				return true;
			},
			openAddStoreWin(flag) { //打开选择仓库弹窗
				this.bouncedType = 0;
				if(flag == 'in') {
					this.isPutIn = 'in';
					this.comObj.selectId = this.inWarehouseId;
					this.comObj.title = '选择入货仓库';
					this.showCom = 'addStore';
				} else if(flag == 'out') {
					this.isPutIn = 'out';
					this.comObj.selectId = this.outWarehouseId;
					this.comObj.title = '选择出货仓库';
					this.showCom = 'addStore';
				}
			},
			winWarehouse(res, value) { //选择仓库后
				let isEmpty = true;
				let propName = '',
					otherName = '',
					tip = '',
					otherTip = '';
				if(res == 'ok') {
					if(this.isPutIn == 'out') { //出货仓库
						propName = 'out';
						otherName = 'in';
						tip = '出货';
						otherTip = '入货';
					} else if(this.isPutIn == 'in') { //入货仓库
						propName = 'in',
						otherName = 'out';
						tip = '入货';
						otherTip = '出货';
					}
					if(!value.id) {
						this.myAlert(`${tip}仓库不能为空`);
						return;
					}
					if(!this[propName + 'WarehouseId'] && !this[otherName + 'WarehouseId']) { //出入货仓库id都为空
						isEmpty = true;
					} else { //出入货仓库id不全为空
						isEmpty = false;
					}
					if(!isEmpty && value.id == this[otherName + 'WarehouseId']) { //获取仓库信息后-如果出入货仓库相同
						this.$confirm(`该仓库为${otherTip}仓库，是否替换为${tip}仓库？`, '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							let obj = {
								title: `选择${tip}仓库`,
								selectId: value.id,
							};
							this.comObj = obj;
							this.setWareInformation(otherName, '');
							this.setWareInformation(propName, value);
							this.showCom = ''; //关闭弹窗 
							for(let i of this.clearArr) {
								this[i] = [];
							}
						}).catch(()=>{});
					} else { //两个仓库不相同
						if(value.id != this[propName + 'WarehouseId']) {
							for(let i of this.clearArr) {
								this[i] = [];
							}
						}
						this.showCom = '';
						this.setWareInformation(propName, value);
					}
				} else {
					this.showCom = '';
				}
			},
			setWareInformation(name, value) { //设置仓库信息
				this[name + 'WarehouseId'] = value ? value.id : '';
				this[name + 'Warehouse'] = value ? value : '';
				if(value.shopId!='0'){
					this[name + 'ShopId'] = value.shopId;
				}else{
					this[name + 'ShopId'] = value.brandId;
				}
			},
			getSleGoods(res) { //选择商品后，解析列表
				this.$store.commit('setPageTools', []);
				if(res.length) this.selectType = 0;
				this.showSleGoods = false;
				this.showMain = true;
				this.sleGoods = res;
				let arr = [];
				if(!res) return;
				for(let i in res) {
					let item = res[i];
					let obj = {
						id: item.gid,
						goodsName: item.goodsName,
						barCode: item.barCode,
						unit: item.unit,
						type: item.type,
						batch: item.batch,
						surplus: item.surplus,
						batchId: '',
						selectNum: '',
						haveBatch: false,
					};
					arr.push(obj);
				}
				this.goodsDetails = arr;
			},
			getSleMaterial(res) { //选择物料后，解析列表
				this.$store.commit('setPageTools', []);
				if(res.length) this.selectType = 1;
				this.sleMaterial = res;
				this.showSleMaterial = false;
				this.showMain = true;
				let arr = [];
				if(!res) return;
				for(let item of res) {
					let obj = {
						id: item.id, // 物料id
						name: item.name, //物料名
						type: item.type, //物料类型
						unit: item.unit, //所有单位信息
						selUnit: '', //选择的单位
						batch: item.batch, //批次
						surplus: item.surplus, //库存数量/重量
						selectNum: '',
						index: 0, //单位选择的索引
						haveBatch: false,
						validity: item.validity,
						validityType: item.validityType,
					};
					let cateArr = [];
					for(let cate of item.cate) {
						cateArr.push(cate.name);
					}
					obj.materialCategoryName = cateArr.join(',');
					arr.push(obj);
				}
				this.materialInfo = arr;
				this.picestyle = '';
				this.unitConversion(this.materialInfo);
				this.getsuppliespice();
			},
			delList(index, type) { //删除商品/物料
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'confirm',
					content: '确认删除？',
					callback: (res) => {
						if(res == 'ok') {
							this.delListEach(index, type);
						}
					}
				});
			},
			delListEach(index, type) { //删除商品/物料
				let list = '',
					prevList = '',
					reqList = '',
					idName = '';
				if(type == 0) { //删除商品
					list = 'goodsDetails';
					prevList = 'sleGoods';
					reqList = 'goodsOut';
					idName = 'id';
				} else { //删除物料
					list = 'materialInfo';
					prevList = 'sleMaterial';
					reqList = 'suppliesOut';
					idName = 'mid';
				}
				let id = this[list][index].id;
				for(let i = 0; i < this[reqList].length; i++) {
					let item = this[reqList][i];
					if(id == item[idName]) {
						this[reqList].splice(i, 1);
						i--;
					}
				}
				this[list].splice(index, 1);
				this[prevList].splice(index, 1);
			},
			unitConversion(detailList) {
				for(let item of detailList) {
					let unitList = [];
					for(let n in item.unit) {
						let unitItem = item.unit[n];
						if(unitItem.isDefault == 1) {
							item.showName = unitItem.name; //展示单位名
							item.showValue = unitItem.value; //展示单位的换算关系
							item.defaultValue = unitItem.value; //批次选择用
							item.defaultName = unitItem.name;
						}
						if(unitItem.isMin == 1) {
							item.minName = unitItem.name; //最小单位
							item.selectName = unitItem.name;
							item.selectValue = unitItem.value;
							item.index = n;
						}
						unitList.push(unitItem.name); //单位列表
					}
					item.unitList = unitList;
					item.comNum = item.surplus; //保存comNum，用于计算
					//换位默认单位数据
					item.numberUnit = global.comUnit(
						item.surplus,
						item.showValue,
						item.showName,
						item.minName
					);
				}
			},
			//单位换算
			comUnit(...args) { //number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				let [number, value, showName, minName, type] = args;
				return global.comUnit(number, value, showName, minName, type);
			},
			openBatchWin(item, index) { //打开商品批次选择
				if(!this.outWarehouseId) {
					this.myAlert('请选择出货仓库');
					return;
				}
				this.goodsItem = item;
				this.goodsIndex = index;
				this.selectGoods = this.goodsItem.batchInfo;
				this.goodsBatchShow = true;
			},
			openSuppliesWin(item, index) { //打开物料批次选择
				if(!this.inWarehouseId) {
					this.myAlert('请选择入货仓库');
					return;
				}
				this.materialItem = item;
				this.materialIndex = index;
				this.selectMaterial = this.materialItem.batchInfo;
				this.matBatchShow = true;
			},
			goodsWinClose(res, value) { //商品批次选择后
				this.goodsBatchShow = false;
				if(res == 'ok') {
					this.goodsItem.batchInfo = value;
					let arr = [],
						allNum = 0,
						obj = {};
					for(let i in value) {
						if(Number(value[i].surplus) < Number(value[i].outNum)) {
							this.myAlert('出货数量不能大于当前库存数量');
							return;
						}
						obj = {
							id: this.goodsItem.id,
							barCode: this.goodsItem.barCode,
							batchId: value[i].batchId,
							num: value[i].outNum,
							name: this.goodsItem.goodsName,
						};
						if(value[i].outNum) {
							arr.push(obj);
							allNum += Number(obj.num);
						}
					}
					if(arr.length > 0) {
						this.goodsItem.haveBatch = true;
					} else {
						this.goodsItem.haveBatch = false;
					}
					this.goodsItem.selectNum = allNum;
					this.spliceArr(this.goodsOut, this.goodsItem.id, 'id');
					this.goodsOut.push(...arr);
				}
			},
			suppliWinClose(res, backData, selUnitObj) { //物料批次选择
				this.matBatchShow = false;
				if(res == 'ok') {
					console.log(backData);
					this.materialItem.batchInfo = backData;
					let supArr = [],
						totalNum = 0;
					for(let item of backData) {
						if(Number(item.twoNum) > 0) {
							let obj = {
								mid: this.materialItem.id,
								type: 0,
								batchId: item.batchId,
								num: Number(item.twoNum) * parseInt(selUnitObj.value),
								selectUnitName: this.materialItem.selectName,
								name: this.materialItem.name,
							};
							totalNum += Number(item.twoNum);
							supArr.push(obj);
						}
					}
					this.materialItem.selectNum = totalNum;
					if(supArr.length > 0) {
						this.materialItem.haveBatch = true;
					} else {
						this.materialItem.haveBatch = false;
					}
					this.spliceArr(this.suppliesOut, this.materialItem.id, 'mid');
					this.suppliesOut.push(...supArr);
					console.log(this.materialInfo);
				}
			},
			spliceArr(arr, id, idName) { //商品物料列表-去重
				for(let i = 0; i < arr.length; i++) {
					let item = arr[i];
					if(item[idName] == id) {
						arr.splice(i, 1);
						i--;
					}
				}
			},
			initData() {
				let userData = storage.session('userShop');
				this.userName = userData.user.name;
				this.userId = userData.user.id;
			},
			myAlert(content) {
				this.$message({message: content,type: 'error'});
			},
			async sure() { //确认提交
				if(!this.addVeri()) return;
				for(let i in this.goodsDetails) {
					let item = this.goodsDetails[i];
					let checkNum = Number(item.selectNum);
					let reg = /^[0-9]*$/g;
					let reg2 = /^[0-9]*\.?[0-9]{0,3}$/g;
					if(isNaN(checkNum)) {
						this.myAlert(`商品(${item.goodsName})出货数量必须为数字`);
						return;
					}
					if(item.type == 0 && !reg.test(checkNum)) {
						this.myAlert(`普通商品(${item.goodsName})出货数量只能为整数`);
						return;
					}
					if(item.type == 1 && !reg2.test(checkNum)) {
						this.myAlert(`称重商品(${item.goodsName})出货数量只能为小数点后三位`);
						return;
					}
					if(checkNum <= 0) {
						this.myAlert(`商品(${item.goodsName})出货数量必须大于0`);
						return;
					}
					if(checkNum > Number(item.surplus)) {
						this.myAlert(`商品(${item.goodsName})出货数量不能大于当前库存数量`);
						return;
					}
	
					let haveBatch = item.haveBatch ? item.haveBatch : false;
					if(!haveBatch) { //没有选择批次的时候
						let obj = {
							id: item.id,
							barCode: item.barCode,
							batchId: '',
							num: item.selectNum || '',
							name: item.goodsName,
						};
						let isExist = false; //该条数据是否已存在
						for(let out of this.goodsOut) {
							if(out.id == item.id) {
								isExist = true;
								break;
							}
						}
						if(!isExist) this.goodsOut.push(obj);
					}
				}
				for(let i in this.materialInfo) {
					let item = this.materialInfo[i];
					let supNum = Number(item.selectNum) * Number(item.selectValue);
					let checkNum = supNum;
					let reg2 = /^[0-9]*\.?[0-9]{0,3}$/g;
					if(isNaN(checkNum)) {
						this.myAlert(`物料(${item.name})出货物料数量必须为数字`);
						return;
					}
					if(!reg2.test(Number(item.selectNum))) {
						this.myAlert(`物料(${item.name})出货数量只能为小数点后三位`);
						return;
					}
					if(checkNum <= 0) {
						this.myAlert(`物料(${item.name})出货数量必须大于0`);
						return;
					}
					if(checkNum > Number(item.comNum)) {
						this.myAlert(`物料(${item.name})出货数量不能大于当前库存数量`);
						return;
					}
					if(!item.piceValue&&this.isBrand&&item.piceValue!==0&&item.isPurchase!==1&&item.piceValue!==0){
						this.$message.error('请选择分销价！');
						return;
					}
					if(!item.piceUnitid&&this.isBrand&&item.isPurchase!==1){
						this.$message.error('请选择分销价单位！');
						return;
					}
					let haveBatch = item.haveBatch ? item.haveBatch : false;
					if(!haveBatch) {
						let supObj = {
							mid: item.id,
							type: item.type,
							batchId: '',
							num: supNum,
							selectUnitName: item.selectName,
							name: item.name,
						};
						if(this.isBrand){
							Object.assign(supObj,{
								distributionPrice:item.piceValue,
								distributionUnit:item.piceUnitid== '等于进价'? 0:item.piceUnitid,
								isPurchase:item.isPurchase
							})
						}
						let isExist = false; //该条数据是否已存在
						for(let out of this.suppliesOut) {
							if(out.mid == item.id) {
								isExist = true;
								break;
							}
						}
						if(!isExist) this.suppliesOut.push(supObj);
					}
				}
				if(!this.goodsOut.length && !this.suppliesOut.length) {
					this.myAlert('请先添加商品或物料');
					return;
				}
				let reg = /^[0-9a-zA-Z]*$/g;
				if(this.receiptNumber && !reg.test(this.receiptNumber)) {
					this.myAlert('出货单号只能是英文字母或数字');
					return;
				}
				this.addDispatchRecord();
			},
			returnBefore() {
				window.history.go(-1);
			},
			//出货
			async addDispatchRecord() {
				if(this.isClick) {
					this.$store.commit('setWin', {title: '温馨提示',content: '请勿重复点击'});
					return;
				}
				this.isClick = true;//禁止重复点击
				let res=null;
				try{
					res = await http.addQuickDispatch({
						data: {
							cause: this.cause,
							receiptNumber: this.receiptNumber,
							remark: this.remark,
							outWarehouse: this.outWarehouseId,
							intoWarehouse: this.inWarehouseId,
							goodsDetail: this.goodsOut.length ? this.goodsOut : '',
							materialDetail: this.suppliesOut.length ? this.suppliesOut : '',
						}
					},true);
				}
				catch(e){
					this.$store.commit('setWin', {title: '错误提示',content: e.error.message});
					this.isClick = false;//接口报错，还能继续点击
				}
				if(res){
					this.$store.commit('setWin', {
						title: '提示',
						content: '快速调度成功',
						callback: () => {
							res.outWname = this.outWarehouse.name;
							res.intoWname = this.inWarehouse.name;
							res.createName = this.userName;
							storage.session('outStoreDetails', res);
							this.$router.push({
								path: 'outputShipper',
								query: this.$route.query
							});
						}
					});
				}else{
					this.isClick = false;//接口报错，还能继续点击
				}
			},
			//获取分销价
			async getDistr() {
				let res = await http.invoicingGetDistributionConfig();
				res.map(v => {
					let obj = {};
					Object.assign(obj, {
						distributionId: v.id,
						value: '',
						name: v.name,
						unitId: ''
					});
					this.dispiceArr.push(obj);
				});
				this.dispiceArr = this.dispiceArr.concat([{
					distributionId: -1,
					value: '',
					name: '等于进价',
					unitId: ''
				}, {
					distributionId: -2,
					value: '',
					name: '自定义价格',
					unitId: ''
				}]);
			},
			picestyleChange(sle){
				this.materialInfo.map(v => {
					let check = true;
					v.distributionId = Number(sle);
					v.piceUnitid = '';
					v.piceValue = '';
					v.isPurchase = 0;
					if(sle!=-1){
						v.rela.map(s => {
							if (s.distributionId == v.distributionId) {
								check = false;
								v.piceValue = s.value;
								v.piceUnitid = s.unitId;
							}
						});
					}else{
						check = false;
						v.isPurchase = 1;
						v.piceValue = 0;
						v.piceUnitid = '等于进价';
					}
					if(check) v.distributionId = -2;//没有匹配到位自定义价格
				});
			},
			//获取物料分销价
			async getsuppliespice() {
				let arr = [];
				this.materialInfo.map(v => {
					arr.push(v.id);
				});
				let data = await http.materialGetDistributionByMids({
					data: {
						mids: arr.join(',')
					}
				});
				for (let item of data) {
					item.rela = item.rela.concat([{
						distributionId: -1,
						value: '',
						distributionName: '等于进价',
						unitId: ''
					}, {
						distributionId: -2,
						value: '',
						distributionName: '自定义价格',
						unitId: ''
					}]);

					for (let v of this.materialInfo) {
						if (item.id == v.id) v.rela = item.rela;
					}
				}
				this.materialInfo = utils.deepCopy(this.materialInfo);
				console.log(this.materialInfo);
				console.log(data);
			},
			piceChange(data) {
				data.piceUnitid = '';
				data.piceValue = '';
				data.isPurchase = 0;
				if (data.distributionId == -1) {
					data.isPurchase = 1;
					data.piceValue = 0;
					data.piceUnitid = '等于进价';
				} else {
					data.rela.map(v => {
						if (v.distributionId == data.distributionId) {
							data.piceValue = v.value;
							data.piceUnitid = v.unitId;
						}
					})
				}
				this.materialInfo = utils.deepCopy(this.materialInfo);
			}
		},
	};
</script>
<style lang='less' scoped>
#out-store {overflow: auto;
	.scroll-box{min-width: 1300px;} 
	.ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.vertical-input {line-height: 40px;height: 40px;width: 210px;outline: none;
		padding: 0 10px;vertical-align: top;margin-left: -5px;font-size: 14px;
	}
	.vertical-label {line-height: 40px;height: 40px;
		width: 116px;padding-right: 25px;color: #333333;text-align: right;
	}
	.vertical-line {line-height: 40px;height: 40px;}
	font-size: 14px;
	.store-list {
		.label {.vertical-label;display: inline-block;}
		.text {.vertical-input;}
		.tip-word {.vertical-line;color: #c9c9c9;padding-left: 116px;
			img {vertical-align: middle;}
		}
		.textarea {height: 100px;resize: none;font-size: 14px;width: 210px;color: #333;
			outline: none;padding: 0 10px;vertical-align: top;margin-left: -5px;padding-top: 10px;
			box-sizing: border-box;border: 1px solid #ccc;
		}
		.add {display: inline-block;background-color: #29a8e0;width: 210px;height: 40px;
			background-position: 30% 50%;padding-left: 90px;
			.vertical-line;vertical-align: top;margin-left: -3px;color: #fff;cursor: pointer;
			.img-span {vertical-align: middle;}
		}
		.select-store {width: auto;height: 40px;padding-left: 15px;display: inline-block;color: #707077;vertical-align: top;line-height: 40px;}
	}
	.piceType {
				display: inline-block;
				width: 200px;
				margin-left: 15px;
				vertical-align: top;
			}
	.tebBox{
		margin-top: 20px;
	}			
	.chooseBtn {width: 240px;height: 40px;
		cursor: pointer;
		display: inline-block;
		span {
			width: 50%;height: 100%;text-align: center;line-height: 40px;
			color: #fe8d01;border: 1px solid #fe8d01;float: left;
			&:last-child{border-left: 0;}
		}
		.select {
			background: #fe8d01;
			color: #ffffff;
		}
	}
	.bottom {
		margin-top: 40px;margin-bottom: 40px;
		padding-left: 117px;
		div {
			width: 210px;height: 50px;margin-right: 10px;display: inline-block;
			font-size: 16px;line-height: 50px;text-align: center;color: #f3f3f3;
		}
		&.have-goods{padding-left: 0;}
	}
	.add-list{width: 100%;margin-top: 20px;
		width: 100%;border: 1px solid #ccc;font-size: 16px;
		.head {width: 100%;height: 45px;line-height: 45px;padding-left: 10px;font-size: 16px;color: #333;
			span{color: #fe8d01}
		}
		.title{background-color: #f2f2f2;height: 40px;list-style: none;line-height: 40px;overflow: hidden;width: 100%;
			li {font-size: 14px;text-align: center;color: #333;float: left;}
		}
		.goods li{width: 14%;&:nth-child(3){width: 16%;}}
		.material li{width: 9.5%;&:nth-child(3){width: 18%;};&:nth-child(5){width: 200px;};&:nth-child(6){width: 100px;}}
		.table-body {
			.ceil {width: 100%;height: 70px;line-height: 70px;border-bottom: 2px solid #f7f7f7;
				&:after{content: '';zoom: 1;display: block;clear: both;}
				li {list-style: none;font-size: 14px;color: #333;text-align: center;
					float: left;height: 70px;line-height: 70px;
					.split-line {height: 18px;width: 0;border-left: 1px solid #ccc;display: inline-block;margin: 0 15px;}
					.text {height: 40px;line-height: 40px;width: 100px;padding: 0 10px;
						border: 1px solid #ccc;outline: none;font-size: inherit;color: #333;
					}
					.input-box{
						height: 40px;display: inline-block;overflow: hidden;border: 1px solid #ccc;vertical-align: middle;
						input{width: 100px;height: 38px;line-height: 38px;padding: 0 10px;border: 0;float: left;
							&:focus{outline: none;}
						}
						div{width: 40px;height: 38px;line-height: 38px;text-align: center;border-left: 1px solid #ccc;float: left;}
					}
				}
			}
			.empty{height: 70px;line-height: 70px;text-align: center;color: #999;font-size: 20px;}
			.goods li{width: 14%;&:nth-child(3){width: 16%;}}
			.material li{width: 9.5%;&:nth-child(3){width: 18%;};&:nth-child(5){width: 200px;};&:nth-child(6){width: 100px;}
				.dispice {
					.slebox {
						width: 120px;
						display: inline-block;
					}
					.input-num{
						width: 60px;
						display: inline-block;
						position: relative;
						right: -8px;
					}
				}
			}
		}
	}
}
</style>


