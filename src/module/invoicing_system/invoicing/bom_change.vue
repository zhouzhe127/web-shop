<!--
    **bom修改
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div id="create-bom">
		<div class="scroll-box">
			<template v-if="!addWlShow">
				<div class="line-title">
					修改BOM单<p></p>
				</div>
				<div class="store-content">
					<div class="store-list">
						<label class="store-name required">创建人</label>
						<span class="word">{{createName}}</span>
					</div>
					<div class="store-list">
						<label class="store-name required">BOM单类型</label>
						<div class="tab-box">
							<el-radio-group v-model="isPublic">
								<el-radio-button label="1">公开</el-radio-button>
								<el-radio-button label="-1">私密</el-radio-button>
    						</el-radio-group>
						</div>
					</div>
					<div class="store-list">
						<label class="store-name">BOM单编号</label>
						<el-input v-model="bomNum" placeholder="请输入BOM单编号" maxlength="20" class="store-input"></el-input>
						<span class="font-limit">
							<em></em>限20字以内,数字/字母
						</span>
					</div>
					<div class="store-list">
						<label class="store-name required">商品名称</label>
						<div class="word">
							{{goodsName}}
						</div>
					</div>
					<div class="store-list">
						<label class="store-name required">自动消耗</label>
						<div class="shared-box">
							<el-switch
								v-model="isAutoBool"
								active-color="#E1BB4A"
								inactive-color="#909399"
								style="width:80px;height:40px;">
							</el-switch>
						</div>
					</div>
					<div class="store-list">
						<label class="store-name required">库存可以为负数</label>
						<div class="shared-box">
							<el-switch
								v-model="isOversoldBool"
								active-color="#E1BB4A"
								inactive-color="#909399"
								style="width:80px;height:40px;">
							</el-switch>
						</div>
					</div>
					<div class="store-list">
						<label class="store-name">备注</label>
						<el-input type="textarea" v-model="remark" rows="3"
						placeholder="请输入备注信息" maxlength="40" class="store-input"></el-input>
						<span class="font-limit">
							<em></em>限40字以内
						</span>
					</div>
					<div class="store-list">
						<label class="store-name required">物料消耗</label>
						<el-button type="primary" class="add-blong" 
							icon="el-icon-plus" @click="addWlClick">添加物料</el-button>
					</div>
				</div>
				<div class="consume-list" v-if="wlListEach.length">
					<div class="head">物料消耗列表 · 共
						<em>{{wlListEach.length}}</em> 个条目</div>
					<el-table :data="wlListEach" stripe border style="width:100%" :header-cell-style="{'background-color':'#f5f7fa'}">
						<el-table-column label="操作" fixed="left" width="160">
							<template slot-scope="scope" >
								<el-button v-if="scope.row.id" type="text" style='color:#666' @click="listHandle(scope.row,'delete',true)">删除</el-button>
								<el-button v-else type="text" style='color:#D34A2B' @click="listHandle(scope.row,'delete')">删除</el-button>
								<el-button type="text" @click="listHandle(scope.row,'sort')">仓库消耗排序</el-button>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="物料名称" min-width="200">
						</el-table-column>
						<el-table-column label="单位选择" width="150">
							<template slot-scope="scope">
								<el-select v-model="scope.row.defId" placeholder="请选择仓库" @change="(res)=>{selectUnit(scope.row,res)}">
									<el-option
										v-for="item in scope.row.unitArr"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column label="盘库数量" width="320" align="center">
							<template slot-scope="scope">
								<template v-if="scope.row.def">
									<div class="input-box">
										<input type="text" v-model="scope.row.defNum" maxlength="10" placeholder="请输入数量"/>
										<div class="word">{{scope.row.def}}</div>
									</div>
									+
								</template>
								<div class="input-box">
									<input type="text" v-model="scope.row.minNum" maxlength="10" placeholder="请输入数量"/>
									<div class="word">{{scope.row.min}}</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="出成率" min-width="150">
							<template slot-scope="scope">
								<el-input placeholder="输入数字" v-model="scope.row.yield" ></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="wids.length" label="已选仓库数" width="100">
						</el-table-column>
					</el-table>
				</div>
				<component :winOpen="sortSend" :pGoodsList="sortSend" :is="showWin" @emit="getSortArr" @throwGoodListWin="getSelectGoods"></component>
			</template>
			<!--添加物料-->
			<add-material v-if="addWlShow" :sleSupplies="sleSupplies" @select="getWlSelect"></add-material>
		</div>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	import global from 'src/manager/global';
	import storage from 'src/verdor/storage';

	export default {
		data() {
			return {
				bomId: '', //bom单id
				createUid: '', //用户id
				createName: '', //用户名称
				detail: [], //详情数据 用于修改bom单
				param: {
					gid: '', //商品或物料id
				},
				tips: {
					gid: '请选择商品',
				},
				bomNum: '', //bom单编号
				materialInfo: '', //物料信息
				remark: '', //备注
				page: 1, //分页
				wid: '', //仓库id
				gList: [], //单次请求的商品列表
				goodsList: [], //商品列表
				goodsEnd: false, //商品列表是否请求完毕
				goodsName: '', //选中商品名称
				goodsType: '', //选中商品类型
				timerId: '', //轮询的唯一id 用于清除轮询
				sortSend: {}, //排序参数
				showWin: null,
				type: 1, //1商品 2物料
				ownerName: '', //仓库所属-名称
				isBrand: 0, //1为品牌 0为非品牌
				isPublic: 1, //是否公开 1公开 -1私密
				isAutoBool: true, //
				isOversoldBool: true, //库存可以为负数
				booleanShared: true,
				isShared: 1, //是否共享
				addWlShow: false, //添加物料显示
				currentItem: 0, //正在操作的物料
				wlList: [], //选中的物料列表
				wlListEach: [], //选中的物料列表-列表遍历
				wlListEachPrev: [], //原有的物料列表
				warehouse: [], //仓库列表
				sendWlList: [], //选中的仓库id列表
				alreadyGoods: [], //已关联的商品id集合
				isVeryLarge: false, //消耗数量太大
				bidArr: [], //删除的物料
				isClick: false, //是否已经点击提交，防止重复点击
				isGoBack:false,//修改成功以后，是否原路返回
				shopId:'',
			};
		},
		created() {
			this.userData = storage.session('userShop');
		},
		beforeRouteEnter (to, from, next) {
			if(from.path=='/admin/inventoryManagement/publicDetails'){
				next(function(self){
					self.isGoBack = true;
				});
			}else{
				next();	
			}
		},
		mounted() {
			this.initBtn();
			this.initData(); //初始化数据
			this.getWarehouseList(); //获取仓库列表
		},
		components: {
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			onOff: () =>
				import ( /*webpackChunkName: 'on_off'*/ 'src/components/on_off'),
			addMaterial: () =>import ( /*webpackChunkName: 'output_select_supplies'*/ 'src/module/invoicing_system/warehouse_manage/output_select_supplies'),
			warehouseSort: () =>
				import ( /*webpackChunkName: 'bom_create_sort'*/ 'src/module/invoicing_system/invoicing/bom_create_sort'),
			goodsPackage: () =>
				import ( /*webpackChunkName: 'good_package_win'*/ 'src/module/goods_config/common/good_package_win'),
		},
		methods: {
			initBtn(){
				let arr = [
					{name: '取消',className: 'info',type:1,
						fn: () => {
							this.cancel();
						}
					},
					{name: '确定',className: 'primary',type:1,
						fn: () => {
							this.confirm();
						}
					},
				];
				this.$store.commit('setFixButton',arr);
			},
			initData() {
				this.shopId = this.userData.currentShop.id;
				this.isBrand = this.userData.currentShop.ischain == '3' ? true : false; //是否为品牌
				let bomId = this.$route.query.id;
				this.bomId = bomId;
				this.getBomDetail(); //获取bom单详情
			},
			async getWarehouseList() { //请求仓库列表
				let data = await http.warehouseWarehouseList();
				this.warehouse = data;
			},
			async bomEdit(obj) { //修改bom单
				if(this.isClick) {
					this.$message({message: '请勿重复点击',type: 'error'});
					return;
				}
				this.isClick = true;
				let res=null;
				try{
					res = await http.bomBillmaterialEditBom({
						data: obj
					},true);
				}
				catch(e){
					this.$message({message: e.error.message,type: 'error'});
					this.isClick = false;//接口报错，还能继续点击
				}
				if(res){
					this.$message({message: 'BOM修改成功!',type: 'success'});
					if(this.isGoBack){//原路返回
						window.history.go(-1);
					}else{//跳转bom单列表
						this.$router.push({
							path: '/admin/bomList',
							query: this.$route.query
						});
					}
				}
			},
			async getBomDetail() {
				let data = await http.BillmaterialGetBomDetail({
					data: {
						bid: this.bomId,
					}
				});
				this.wlListEachPrev = this.setChangeBom(data);
				this.wlListEach = utils.deepCopy(this.wlListEachPrev);
			},
			async getBomListByShopId() { //过滤已关联的商品
				let data = await http.getBomListByShopId();
				let arr = [];
				for (let item of data) {
					for (let goods of this.goodsList) {
						if (item != goods.id && goods.isInvoicing != 1) {
							arr.push(goods);
						}
					}
				}
				this.goodsList = arr;
			},
			setChangeBom(data) { //设置修改bom单数据
				for (let i in data) {
					if (i == 'gid') {
						this.param[i] = data[i];
					} else if (i == 'gName') {
						this.goodsName = data[i];
					} else if (i == 'isAuto') {
						this.isAutoBool = data.isAuto == 1;
					} else if (i == 'isOversold') {
						this.isOversoldBool = data.isOversold == 1;
					} else {
						this[i] = data[i];
					}
				}
				let arr = [];
				for (let item of data.detail) {
					let obj = {
						id: item.id, //唯一id
						wids: item.wids.split(','), //仓库id
						mid: item.mid, //物料id
						unit: item.unit, //单位列表
						name: item.mName, //物料名称
						minId: item.minUnit, //最小单位id
						defId: item.consumeUnit, //默认单位id
						isPrev: true, //是否是之前的物料
						yield:item.yield*100,
					};
					let unitObj = this.editUnit(item); //根据获取的消耗单位 去匹配单位列表
					for (let i in unitObj) {
						obj[i] = unitObj[i];
					}
					arr.push(obj);
				}
				return arr;
			},
			editUnit(obj) { //修改仓库 单位计算
				let min = '',
					def = '',
					value = 1;
				let unitArr = [];
				for (let i in obj.unit) {
					let item = obj.unit[i];
					unitArr.push({value:item.muId,label:item.name});
					if (obj.minUnit == obj.consumeUnit && obj.minUnit == item.muId) {
						min = item.name;
						def = item.name;
						value = item.value;
					}
					if (obj.minUnit != obj.consumeUnit) {
						if (obj.minUnit == item.muId) min = item.name;
						if (obj.consumeUnit == item.muId) {
							def = item.name;
							value = item.value;
						}
					}
				}
				//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				let unitArrs = global.comUnit(obj.consumeNum, value, def, min, true);
				let minNum = 0,
					defNum = 0;
				defNum = unitArrs.oNull || 0;
				minNum = unitArrs.tNull || 0;
				def = unitArrs.oNull ? def : '';
				min = unitArrs.tNull ? min : '';
				return {
					minNum: minNum,
					defNum: defNum,
					min: min,
					def: def,
					unitArr: unitArr,
					value: value,
					consumeNum: obj.consumeNum, //总量
				};
			},
			cancel() {
				storage.session('bomListDestroy', true);
				this.$router.push({
					path: 'bomDetail',
					query: this.$route.query
				});
			},
			//点击确认提交数据
			confirm() {
				if (!this.checkForm()) return;
				let obj = this.formatData();
				if (this.isVeryLarge) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '物料消耗量数量太大'
					});
					return false;
				}
				this.bomEdit(obj);
			},
			openGoods() { //选择商品-点击 打开商品选择弹框
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '关联过的商品无法修改'
				});
			},
			getSelectGoods(res, obj) { //选择商品-获取选择的商品
				if (res == 'ok') {
					if (obj.goodArr.length) {
						this.param.gid = obj.goodArr[0].id;
						this.goodsName = obj.goodArr[0].goodsName;
						this.goodsType = obj.goodArr[0].type;
						this.showWin = null;
					} else {
						this.$store.commit('setWin', {
							title: '提示信息',
							content: '请选择要关联的商品'
						});
					}
				} else {
					this.showWin = null;
				}
			},
			selectUnit(item,unitId) { //物料列表-选中单位
				let thisList = item;
				let unit = item.unit.filter((res)=>{
					return res.muId==unitId;
				})[0];
				let min = thisList.min,
					def = thisList.def;
				if (unit.isMin == 1) {
					min = unit.name;
					thisList.minId = unit.muId;
					def = unit.name;
					thisList.defId = unit.muId;
				} else {
					def = unit.name;
					thisList.defId = unit.muId;
				}
				thisList.value = unit.value;
				if (thisList.isPrev) {
					let unitArrs = global.comUnit(thisList.consumeNum, unit.value, def, min, true);
					thisList.defNum = unitArrs.oNull || 0;
					thisList.minNum = unitArrs.tNull || 0;
					thisList.def = unitArrs.oNull ? def : '';
					thisList.min = unitArrs.tNull ? min : '';
				} else {
					if (def == min) {
						thisList.def = '';
						thisList.defNum = '';
					} else {
						thisList.def = def;
					}
					thisList.min = min;
				}
			},
			addWlClick() { //添加物料
				let arr = [];
				for (let item of this.wlListEachPrev) {
					let obj = {
						id: item.mid,
						noPrev: true,
					};
					arr.push(obj);
				}
				this.$store.commit('setFixButton',[]);
				this.sleSupplies = arr.concat(...this.wlList);
				this.addWlShow = true;
			},
			getWlSelect(res) { //添加物料-获取物料选中列表-并且请求仓库数据
				if (res) {
					this.wlList = res; //新增的物料列表
					this.setWlList();
					this.initBtn();
				}
				this.addWlShow = false;
			},
			setWlList() { //物料选择完毕后-设置物料列表
				let wlListArr = [];
				for (let item of this.wlList) { //设置列表字段
					let obj = {
						wids: [], //仓库id
						mid: item.id, //物料id
						unit: item.unit, //单位列表
						name: item.name, //物料名称
						minNum: 0, //最小单位消耗量
						defNum: 0, //默认消耗量
						yield:100,
					};
					let unitConv = this.unitConv(item);
					for (let i in unitConv) {
						obj[i] = unitConv[i];
					}
					wlListArr.push(obj);
				}
				//设置单位换算
				this.wlListEach = this.wlListEachPrev.concat(...wlListArr);
			},
			unitConv(item) { //单位换算
				let unitArr = [],
					def = '',
					min = '',
					minId = '',
					defId = '',
					value = 1;
				for (let i in item.unit) {
					let unit = item.unit[i];
					unitArr.push({value:unit.muId,label:unit.name});
					if (unit.isMin == 1) {
						min = unit.name;
						minId = unit.muId;
						if (unit.isDefault == 1) {
							defId = unit.muId;
						}
					} else if (unit.isDefault == 1) {
						def = unit.name; //默认消耗单位名称
						defId = unit.muId; //默认消耗单位id
						value = unit.value; //比例
					}
				}
				let obj = {
					unitArr: unitArr,
					min: min, //最小单位名称
					minId: minId, //最小单位id
					def: def, //消耗单位名称
					defId: defId, //消耗单位id-必须
					value: value, //最小单位跟默认单位的换算比例
					id: 0,
				};
				return obj;
			},
			unitComp() { //消耗单位计算
				let arr = [];
				for (let item of this.wlListEach) {
					let num = Number(item.minNum) + Number(item.defNum * item.value);
					if (num > 999999999) {
						this.isVeryLarge = true;
					} else {
						this.isVeryLarge = false;
					}
					let obj = { //全部为必填参数
						mid: item.mid,
						consumeUnit: item.defId, //这里传入的是消耗单位  并不会改变默认单位
						consumeNum: num,
						wids: item.wids.join(','),
						minUnit: item.minId,
						id: item.id,
						yield:Number(item.yield)/100,
					};
					arr.push(obj);
				}
				return JSON.stringify(arr);
			},
			listHandle(item,type,isPre) { //列表操作 删除-仓库消耗排序
				if (type=='delete') { //删除
					if (this.wlListEach.length <= 1) {
						this.$message({message: '物料消耗不能为空',type: 'error'});
					} else {
						if (isPre) { //删除之前的物料
							let id = item.id;
							for (let item of this.wlListEach) {
								if (item.id == id) { //因为新添加的物料 不存在id字段，所以不用考虑bids重复的问题
									this.bidArr.push(item.id);
									this.deletePrevList(id);
								}
							}
						} else { //删除新加物料
							let mid = item.mid;
							this.deleteList(this.wlListEach, mid, 'mid');
							this.deleteList(this.wlListEachPrev, mid, 'mid');
							this.deleteList(this.wlList, mid, 'id');
						}
					}
				} else if (type=='sort') { //排序
					this.showWin = 'warehouseSort';
					this.sortSend = {
						list: this.warehouse,
						widList: item.wids,
						shopId:this.shopId,
						isBrand:this.isBrand,
					};
					this.currentItem = item;
				}
			},
			deletePrevList(id) { //删除原有物料
				this.deleteList(this.wlListEach, id, 'id');
				this.deleteList(this.wlListEachPrev, id, 'id');
				this.deleteList(this.wlList, id, 'id');
			},
			deleteList(arr, mid, idName) { //删除新增物料
				for (let i in arr) {
					if (arr[i][idName] == mid) arr.splice(i, 1);
				}
			},
			getSortArr(res) { //仓库排序-弹框确认后-获取排序后的数组
				if (res) {
					this.currentItem.wids = res;
				}
				this.showWin = null;
			},
			//校验表单
			checkForm() {
				if(/[^a-zA-z0-9]/.test(this.bomNum)){
					this.$message({message: 'bom单编号只能输入字母/数字',type: 'error'});
					return false;
				}
				for (let i in this.tips) {
					this.param[i] = this.param[i].trim();
					if (this.param[i].length == 0) {
						let content = this.tips[i];
						this.$message({message: content,type: 'error'});
						return false;
					}
				}
				if (!this.wlListEach.length) {
					this.$message({message: '请选择物料消耗',type: 'error'});
					return false;
				}
				for (let i in this.wlListEach) {
					let item = this.wlListEach[i];
					let defNum = Number(item.defNum),
						minNum = Number(item.minNum);
					if (item.wids.length == 0) {
						return this.checkTips(item.name, '请选择仓库消耗排序');
					}
					if(isNaN(defNum) || isNaN(minNum)){
						this.checkTips(item.name, '毛料数量必须为数字');
						return false;
					}
					if(isNaN(item.yield)){
						this.checkTips(item.name, '出成率必须为数字');
						return false;
					}
					if(Number(item.yield)>100){
						this.checkTips(item.name, '出成率不能大于100%');
						return false;
					}
					let addNum = defNum + minNum;
					if (addNum <= 0) {
						return this.checkTips(item.name, '物料消耗量必须大于0');
					}
				}
				return true;
			},
			checkTips(name, tips) {
				let content = '(' + name + ') ' + tips;
				this.$message({message: content,type: 'error'});
				return false;
			},
			//格式化数据
			formatData() {
				this.materialInfo = this.unitComp();
				let obj = {
					id: this.bomId,
					createUid: this.createUid,
					isPublic: this.isPublic,
					gid: this.param.gid,
					isAuto: Number(this.isAutoBool),
					isOversold: Number(this.isOversoldBool),
					type: this.goodsType,
					bomNum: this.bomNum,
					remark: this.remark,
					materialInfo: this.materialInfo,
					bids: this.bidArr.join(','),
				};
				return obj;
			},

		},

	};
</script>
<style lang="less" scoped>
	#create-bom {
		padding-bottom: 40px;
		padding-top: 10px;
		.vertical-line {
			line-height: 40px;
			height: 40px;
		}
		.line-title{
			height: 20px;line-height: 20px;border-left: 3px solid #E1BB4A;position: relative;overflow: hidden;
			padding-left: 10px;font-size: 16px;
			p{position: absolute;height: 12px;border-bottom: 2px dashed #ddd;left: 110px;top: 0;width: 100%;}
		}
		.consume-list {
			width: 100%;
			.head {
				height: 50px;
				line-height: 50px;
				padding: 0 20px;
				font-size: 14px;
				border: 1px solid #ebeef5;
				border-bottom: 0;
				em {
					color: #ff3a05;
				}
			}
			.input-box{
				display: inline-block;vertical-align: middle;overflow: hidden;
				input,.word{
					height: 40px;line-height: 38px;border: 1px solid #dcdfe6;float: left;background: #fff;
				}
				input{
					width: 85px;padding: 0 5px;
					border-top-left-radius: 4px;
					border-bottom-left-radius: 4px;
					&:focus{outline: none;}
				}
				.word{
					width:50px;border-left: 0;text-align: center;
					border-top-right-radius: 4px;
					border-bottom-right-radius: 4px;
					background: #f5f7fa;
				}
			}
		}
		.store-content {
			padding-left: 28px;
			.store-list {
				position: relative;
				margin-bottom: 20px;
				padding-left: 130px;
				.store-name {
					font-size: 14px;
					width: 110px;
					display: inline-block;
					text-align: right;
					color: #333;
					.vertical-line;
					position: absolute;
					top: 0;
					left: 0;
				}
				.tab-box {
					overflow: hidden;
					span {
						float: left;
						width: 100px;
						height: 40px;
						line-height: 38px;
						color: #333;
						border: 1px solid #d2d2d2;
						text-align: center;
						cursor: pointer;
						&:nth-child(1) {
							margin-right: 10px;
						}
						&.active {
							border: 1px solid #f8941f;
							color: #f8941f;
						}
					}
				}
				.word {
					display: inline-block;
					height: 40px;
					line-height: 40px;
					padding-left: 10px;
					color: #333;
				}
				.store-input {
					width: 210px;
				}
				.area-input {
					margin-left: 0;
				}
				.now-select {
					padding-left: 10px;
					font-size: 14px;
					color: #707077;
				}
				.add-blong {
					width: 210px;
				}
				.active {
					border: 1px solid #eb9e60;
					background: #fff3e4;
					color: #eb9e60;
				}
				.text-area {
					width: 210px;
					height: 100px;
					border: 1px solid #bebebe;
					resize: none;
					outline: none;
					padding: 10px;
					margin-top: 20px;
					box-sizing: border-box;
					font-size: 14px;
					display: block;
				}
				.font-limit {
					color: #c3c3c3;
					font-size: 14px;
					margin-top: 15px;
					display: block;
					vertical-align: middle;
					em {
						vertical-align: middle;
						margin-right: 10px;
						width: 18px;
						height: 18px;
						display: inline-block;
						background: url(../../../res/images/handle-tips.png) center no-repeat;
					}
				}
				.tips {
					display: block;
					img {
						margin-right: 10px;
					}
				}
				.opera-img {
					vertical-align: middle;
					display: inline-block;
					width: 40px;
					.vertical-line;
					text-align: center;
					cursor: pointer;
					img {
						vertical-align: middle;
						display: inline-block;
					}
					&.del {
						background: url(../../../res/images/gray-del.png) center no-repeat;
					}
					&.add {
						background: url(../../../res/images/gray-add.png) center no-repeat;
					}
				}
			}
		}
	}
</style>