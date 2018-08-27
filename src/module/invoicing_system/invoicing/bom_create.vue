<!--
    **新建bom单
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div id="create-bom">
		<div class="scroll-box">
			<template v-if="!addWlShow">
				<div class="create">新建BOM单</div>
				<div class="store-content">
					<div class="store-list">
						<label class="store-name required">创建人</label>
						<span class="word">{{createName}}</span>
					</div>
					<div class="store-list">
						<label class="store-name required">BOM单类型</label>
						<div class="tab-box" @click="tabClick">
							<span :class="{active:isPublic == 1}" data-index="1">公开</span>
							<span :class="{active:isPublic == -1}" data-index="-1">私密</span>
						</div>
					</div>
					<div class="store-list">
						<label class="store-name">BOM单编号</label>
						<input type="text" placeholder="请输入BOM单编号" maxlength="20" class="store-input" v-model="bomNum" @input="codeInput" @propertychange="codeInput">
						<span class="font-limit">
							<em></em>限20字以内,数字/字母
						</span>
					</div>
					<div class="store-list">
						<label class="store-name required">商品名称</label>
						<div class="add-blong" @click="openGoods">
							<em class="img-span"></em>选择商品
						</div>
						<em class="now-select" v-if="goodsName">( 已选择：{{goodsName}} )</em>
						<em class="now-select" v-if="!goodsName">( 请选择商品 )</em>
					</div>
					<div class="store-list">
						<label class="store-name required">自动消耗</label>
						<div class="shared-box">
							<on-off :status="isAutoBool" @statusChange="getAuto"></on-off>
						</div>
					</div>
					<div class="store-list">
						<label class="store-name required">库存可以为负数</label>
						<div class="shared-box">
							<on-off :status="isOversoldBool" @statusChange="getOversold"></on-off>
						</div>
					</div>
					<div class="store-list">
						<label class="store-name">备注</label>
						<textarea class="text-area" placeholder="请输入备注信息" v-model="remark" maxlength="40"></textarea>
						<span class="font-limit">
							<em></em>限40字以内
						</span>
					</div>
					<div class="store-list">
						<label class="store-name required">物料消耗</label>
						<div class="add-blong" @click="addWlClick">
							<em class="img-span"></em>添加物料
						</div>
					</div>
				</div>
				<div class="consume-list" v-if="wlListEach.length">
					<div class="head">物料消耗列表 · 共
						<em>{{wlListEach.length}}</em> 个条目</div>
					<div class="list">
						<div class="title">
							<span>操作</span>
							<span>物料名称</span>
							<span>消耗单位</span>
							<span class="wide">毛料</span>
							<span>出成率</span>
							<span>已选仓库数</span>
						</div>
						<div class="item" v-for="(item,index) in wlListEach" :key="index" @click="listHandle" :data-index="index">
							<div class="unit">
								<em class="handle-btn delete" :data-mid="item.mid">删除</em>
								<em class="handle-btn sort">仓库消耗排序</em>
							</div>
							<div class="unit pad">
								{{item.name}}
							</div>
							<div class="unit">
								<select-btn @emit="selectUnit" :sorts="item.unitName" :index="item.uninIndex" :width="100" class="select-btn"></select-btn>
							</div>
							<div class="unit wide">
								<template v-if="item.def">
									<div class="input-box">
										<input type="text" placeholder="输入数字" v-model="item.defNum" maxlength="10" />
										<em :title="item.def">{{item.def}}</em>
									</div>
									<span> + </span>
								</template>
								<div class="input-box">
									<input type="text" placeholder="输入数字" v-model="item.minNum" maxlength="10" />
									<em :title="item.min">{{item.min}}</em>
								</div>
							</div>
							<div class="unit">
								<div class="input-box">
									<input type="text" placeholder="输入数字" v-model="item.yield" />
									<em>%</em>
								</div>
							</div>
							<div class="unit pad">
								{{item.wids.length}}
							</div>
						</div>
					</div>
				</div>
				<div class="store-content">
					<div class="bottom-btn">
						<div class="gray cancel-btn" @click="cancel">取消</div>
						<div class="yellow ok-btn" @click="confirm">确定</div>
					</div>
				</div>
				<component :winOpen="sortSend" :is="showWin" @emit="getSortArr" @selectGoods="getSelectGoods" :pGoodsList="pGoodsList" :pCategory="pCategory"
				    :pObj="pObj"></component>
			</template>
			<!--添加物料-->
			<add-material v-if="addWlShow" :sleSupplies="sleSupplies" @select="getWlSelect"></add-material>
		</div>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
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
				wlTips: {
					wids: '请选择仓库消耗排序',
					minNum: '消耗量不能为空',
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
				isAuto: 1, //自动消耗
				isAutoBool: true, //
				isOversold: 1, //库存可以为负数
				isOversoldBool: true, //库存可以为负数
				booleanShared: true,
				isShared: 1, //是否共享
				addWlShow: false, //添加物料显示
				index: 0, //正在操作的物料index
				wlList: [], //选中的物料列表
				wlListEach: [], //选中的物料列表-列表遍历
				warehouse: [], //仓库列表
				sendWlList: [], //选中的仓库id列表
				alreadyGoods: [], //已关联的商品id集合
				isVeryLarge: false, //消耗数量太大
				showPage: 50, //每页显示条数
				totalNum: 0, //总页数
				cid: '', //分类id
				pGoodsList: [],
				pCategory: [],
				pObj: {},
				searchName:'',//搜索名称
				isSearch: false, //是否处于搜索状态
				saveObj: {}, //保存一个搜索状态下的对象
				isClick: false, //是否已经点击提交，防止重复点击
				shopId:'',
				isBrand:'',
			};
		},
		created() {
			this.userData = storage.session('userShop');
		},
		mounted() {
			this.initData(); //初始化数据
			this.getBomListByShopId(); //获取已经关联的商品
			this.getWarehouseList(); //获取仓库列表
			this.getCategoryList();
		},
		components: {
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			onOff: () =>
				import ( /*webpackChunkName: 'on_off'*/ 'src/components/on_off'),
			addMaterial: () =>
				import ( /*webpackChunkName: 'output_select_supplies'*/
					'src/module/invoicing_system/warehouse_manage/output_select_supplies'),
			warehouseSort: () =>
				import ( /*webpackChunkName: 'bom_create_sort'*/ 'src/module/invoicing_system/invoicing/bom_create_sort'),
			listPage: () =>
				import ( /*webpackChunkName: 'list_page'*/ 'src/components/list_page'),
		},
		methods: {
			initData() {
				this.createUid = this.userData.user.id;
				this.createName = this.userData.user.name;
				this.shopId = this.userData.currentShop.id;
				this.isBrand = this.userData.currentShop.ischain == '3' ? true : false; //是否为品牌
			},
			async getWarehouseList() { //请求仓库列表
				let data = await http.warehouseWarehouseList();
				this.warehouse = data;
			},
			async getGoodsList() {
				let data = await http.getGoodsList({
					data: {
						page: this.page,
						num: this.showPage,
					}
				});
				this.goodsList = data.list;
				this.totalNum = data.total;
				this.setBomGoodsAlready();
				this.pObj.totalNum = this.totalNum;
				this.pObj.currentPage = this.page;
			},
			async searchGoodsList() { //获取后台商品列表
				let data = await http.goodsGetListByCid({
					data: {
						goodsName: this.searchName,
						cid: this.cid,
						page: this.page,
						num: this.showPage,
					}
				});
				this.goodsList = data.list;
				this.totalNum = data.totalNum;
				this.setBomGoodsAlready();
				this.pObj.totalNum = this.totalNum;
			},
			//新建BOM单
			async bomAdd(obj) {
				if(this.isClick) {
					this.$store.commit('setWin', {title: '温馨提示',content: '请勿重复点击'});
					return;
				}
				this.isClick = true;
				let res=null;
				try{
					res = await http.bomBillmaterialAddBom({
						data: obj
					},true);
				}
				catch(e){
					this.$message({message: e.error.message,type: 'error'});
					this.isClick = false;//接口报错，还能继续点击
				}
				if(res){
					this.$message({message: 'BOM单新建成功！',type: 'success'});
					this.$router.push({
						path: '/admin/bomList',
						query: this.$route.query
					});
				}
			},
			async getBomListByShopId() { //请求已关联商品
				let data = await http.getBomListByShopId();
				this.areadyGoods = data;
				this.getGoodsList();
			},
			setBomGoodsAlready() { //过滤已关联的商品
				let arr = [];
				if (this.areadyGoods.length) {
					for (let goods of this.goodsList) {
						for (let item of this.areadyGoods) {
							if (item == goods.id) {
								goods.alreadySel = true;
								break;
							} else {
								goods.alreadySel = false;
							}
						}
						if (goods.isInvoicing != 1 && goods.type == 0 || goods.type == 1) {
							arr.push(goods);
						}
					}
					this.goodsList = arr;
				} else {
					for (let goods of this.goodsList) {
						if (goods.isInvoicing != 1 && goods.type == 0 || goods.type == 1) {
							arr.push(goods);
						}
					}
					this.goodsList = arr;
				}
				this.pGoodsList = utils.deepCopy(arr);
			},
			cancel() {
				storage.session('bomListDestroy', true);
				this.$router.push({
					path: '/admin/bomList',
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
				this.bomAdd(obj);
			},
			getAuto(res) { //是否自动消耗
				this.isAutoBool = res;
				this.isAuto = res ? 1 : 0;
			},
			getOversold(res) { //库存是否可以为负数
				this.isOversoldBool = res;
				this.isOversold = res ? 1 : 0;
			},
			async getCategoryList() {
				let category = await http.getCategoryList();
				this.pCategory = category;
			},
			openGoods() { //选择商品-点击 打开商品选择弹框
				this.showWin = 'listPage';
				this.pObj = {
					title: '选择商品',
					currentPage: this.page,
					totalNum: this.totalNum,
					showPageNum: 6,
					selGoods: [this.param.gid],
					fieldName: 'goodsName',
					onlyCategoryId: true,
				};
			},
			getSelectGoods(obj) { //选择商品-获取选择的商品
				if (obj.status == 'ok') {
					if (obj.selList.length) {
						this.param.gid = obj.selList[0].id;
						this.goodsName = obj.selList[0].goodsName;
						this.goodsType = obj.selList[0].type;
						this.showWin = null;
					} else {
						this.$store.commit('setWin', {
							title: '提示信息',
							content: '请选择要关联的商品'
						});
					}
				} else if (obj.status == 'close' || obj.status == 'cancel') {
					this.showWin = null;
				} else if (obj.status == 'search') { //点击筛选
					if (!obj.cid && !obj.search) { //没有选择筛选条件
						this.isSearch = false; //转变为非搜索状态
						this.getGoodsList();
					} else {
						this.isSearch = true; //转变为搜索状态
						this.searchGoods(obj);
						this.saveObj = utils.deepCopy(obj);
					}
				} else if (obj.status == 'page') { //点击翻页
					this.page = obj.page;
					if (this.isSearch) { //搜索状态
						this.searchGoods(this.saveObj);
					} else { //非搜索状态
						this.getGoodsList();
					}
				}
			},
			searchGoods(obj) { //点击筛选
				this.searchName = obj.search;
				this.cid = obj.cid;
				this.searchGoodsList();
				this.pObj.currentPage = 1;
			},
			selectUnit(index) { //物料列表-选中单位
				let thisList = this.wlListEach[this.index];
				let unit = thisList.unit[index];
				if (unit.isMin == 1) {
					thisList.min = unit.name;
					thisList.minId = unit.muId;
					thisList.def = '';
					thisList.defNum = '';
					thisList.defId = unit.muId;
				} else {
					thisList.def = unit.name;
					thisList.defId = unit.muId;
				}
				thisList.value = unit.value;
			},
			addWlClick() { //添加物料
				this.sleSupplies = this.wlList;
				this.addWlShow = true;
			},
			getWlSelect(res) { //添加物料-获取物料选中列表-并且请求仓库数据
				if (res) {
					this.wlList = res;
					this.setWlList();
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
						minNum: '', //最小单位消耗量
						defNum: '', //默认消耗量
						yield:100,
					};
					let unitConv = this.unitConv(item);
					for (let i in unitConv) {
						obj[i] = unitConv[i];
					}
					wlListArr.push(obj);
				}
				this.wlListEach = wlListArr;
			},
			unitConv(item) { //单位换算
				let unitName = [],
					index = 0,
					def = '',
					min = '',
					minId = '',
					defId = '',
					value = 1;
				for (let i in item.unit) {
					let unit = item.unit[i];
					unitName.push(unit.name);
					if (unit.isMin == 1) {
						min = unit.name;
						minId = unit.muId;
						if (unit.isDefault == 1) {
							defId = unit.muId;
							index = i;
						}
					} else if (unit.isDefault == 1) {
						def = unit.name; //默认消耗单位名称
						defId = unit.muId; //默认消耗单位id
						value = unit.value; //比例
						index = i;
					}
				}
				let obj = {
					unitName: unitName,
					min: min, //最小单位名称
					minId: minId, //最小单位id
					def: def, //消耗单位名称
					defId: defId, //消耗单位id-必须
					value: value, //最小单位跟默认单位的换算比例
					uninIndex: index, //默认选中的单位
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
						yield:Number(item.yield)/100,
					};
					if (!this.isCreate) obj.id = item.id;
					arr.push(obj);
				}
				return JSON.stringify(arr);
			},
			listHandle(event) { //列表操作 删除-仓库消耗排序
				let target = event.target;
				this.index = event.currentTarget.getAttribute('data-index');

				let classNam = target.className;
				if (classNam.includes('delete')) { //删除
					let mid = target.getAttribute('data-mid');
					this.deleteList(this.wlListEach, mid, 'mid');
					this.deleteList(this.wlList, mid, 'id');
				} else if (classNam.includes('sort')) { //排序
					this.showWin = 'warehouseSort';
					this.sortSend = {
						list: this.warehouse,
						widList: this.wlListEach[this.index].wids,
						shopId:this.shopId,
						isBrand:this.isBrand,
					};
				}
			},
			deleteList(arr, mid, idName) {
				for (let i in arr) {
					if (arr[i][idName] == mid) arr.splice(i, 1);
				}
			},
			getSortArr(res) { //仓库排序-弹框确认后-获取排序后的数组
				if (res) {
					this.wlListEach[this.index].wids = res;
				}
				this.showWin = null;
			},
			tabClick(event) {
				let target = event.target;
				if (target.tagName.toLocaleLowerCase() == 'span') {
					let index = target.getAttribute('data-index');
					this.isPublic = index;
				}
			},
			codeInput(event) { //限制文本框输入 只能输入数字和字母
				let num = event.target.value;
				num = num.replace(/[^A-Za-z0-9]/g, '');
				this.bomNum = num;
				event.target.value = num;
			},
			//校验表单
			checkForm() {
				for (let i in this.tips) {
					this.param[i] = this.param[i].trim();
					if (this.param[i].length == 0) {
						let content = this.tips[i];
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: content
						});
						return false;
					}
				}
				if (!this.wlListEach.length) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '请选择物料消耗'
					});
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
						this.checkTips(item.name, '物料消耗量必须为数字');
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
				let goodsType = '';
				if (this.goodsType == 0 || this.goodsType == 1) {
					goodsType = 0;
				}
				let obj = {
					createUid: this.createUid,
					isPublic: this.isPublic,
					gid: this.param.gid,
					isAuto: this.isAuto,
					isOversold: this.isOversold,
					type: goodsType,
					bomNum: this.bomNum,
					remark: this.remark,
					materialInfo: this.materialInfo,
				};
				return obj;
			},

		},

	};
</script>
<style lang="less" scoped>
	#create-bom {
		overflow: auto;
		.scroll-box {
			min-width: 1200px;
		}
		padding-bottom: 40px;
		padding-top: 10px;
		.vertical-line {
			line-height: 40px;
			height: 40px;
		}
		.create {
			text-indent: 15px;
			border-left: 2px solid #20a7dc;
			margin-bottom: 30px;
			font-size: 16px;
			color: #333;
		}
		.create:after {
			content: '';
			width: 479px;
			display: inline-block;
			margin-left: 40px;
			border-bottom: 2px dashed #ddd;
			top: -4px;
			position: relative;
		}
		.consume-list {
			width: 100%;
			border: 1px solid #ccc;
			.head {
				height: 45px;
				line-height: 45px;
				padding: 0 20px;
				font-size: 16px;
				em {
					color: #ff3a05;
				}
			}
			.list {
				.title {
					background: #f2f2f2;
					overflow: hidden;
					span {
						width: 14%;
						height: 40px;
						line-height: 40px;
						text-align: center;
						float: left;
					}
					.wide {
						width: 30%;
					}
				}
				.item {
					text-align: center;
					border-bottom: 2px solid #f7f7f7;
					width: 100%;
					.unit {
						float: left;
						height: 70px;
						line-height: 70px;
						width: 14%;
						.handle-btn {
							display: inline-block;
							height: 18px;
							vertical-align: middle;
							line-height: normal;
							padding: 0 10px;
							cursor: pointer;
						}
						.delete {
							border-right: 1px solid #ccc;
							color: #ff3a05;
						}
						.sort {
							color: #29a8df;
						}
						span {
							display: inline-block;
							vertical-align: middle;
						}
						.input-box {
							vertical-align: middle;
							line-height: normal;
							height: 40px;
							border: 1px solid #ccc;
							overflow: hidden;
							display: inline-block;
							input {
								height: 38px;
								line-height: 38px;
								width: 80px;
								float: left;
								border: 0;
								padding: 0 5px;
								&:focus {
									outline: none;
								}
							}
							em {
								width: 40px;
								height: 38px;
								line-height: 38px;
								text-align: center;
								border-left: 1px solid #ccc;
								float: left;
								color: #333;
							}
						}
					}
					.wide {
						width: 30%;
					}
					.pad {
						padding: 0 10px;
						color: #555;
					}
					&:after {
						zoom: 1;
						display: block;
						content: '';
						clear: both;
					}
					&:last-child {
						border-bottom: 0;
					}
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
				}
				.store-input {
					height: 40px;
					width: 210px;
					border: 1px solid #d2d2d2;
					display: inline-block;
					padding: 0 10px;
					outline: none;
					font-size: 14px;
					vertical-align: top;
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
					background: #29a8e0;
					width: 210px;
					border: 1px solid #29a8e0;
					display: inline-block;
					font-size: 14px;
					text-align: center;
					color: #ffffff;
					cursor: pointer;
					.vertical-line;
					em {
						vertical-align: middle;
						width: 18px;
						height: 18px;
						text-align: center;
						display: inline-block;
						margin-top: -3px;
						margin-right: 10px;
						background: url(../../../res/images/add.png) center no-repeat;
					}
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
				.address-box {
					display: inline-block;
					vertical-align: top;
					margin-bottom: 20px;
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
				.area-name {
					width: 110px;
					display: inline-block;
					color: #333;
					font-size: 14px;
					color: #333;
					text-align: right;
					position: absolute;
					top: 0;
					left: 0;
					.vertical-line;
				}
			}
			.bottom-btn {
				padding-left: 130px;
				padding-top: 40px;
				padding-bottom: 40px;
				div {
					width: 210px;
					height: 50px;
					line-height: 50px;
					text-align: center;
					margin-right: 10px;
					display: inline-block;
					color: #f1f1f1;
					font-size: 16px;
				}
			}
		}
	}
</style>