/*
* @Author: zhouzhe
* @Date: 2018-11-29 15:23:16
*/
<template>
	<div class="gatherBox">
		<el-dialog :title="title" :visible.sync="dialogShow" width="550px" :before-close="handleClose">
			<span slot="title" class="winTitle">{{title}}</span>
			<div class="dialogContent">
				<div class="inpStyle">
					<span class="required label">集合名称</span>
					<div class="inpbox">
						<el-input clearable v-model="gatherName" maxlength="20" class="el-in" placeholder="输入集合名称"></el-input>
					</div>
				</div>
				<div>
					<div class="inpStyle">
						<el-radio-group v-model="sleType">
							<el-radio-button v-for="(item,index) in typeArr" :key="index" :label="index" border>{{item}}</el-radio-button>
						</el-radio-group>
					</div>
					<div class="tip-icon inpStyle">
						<i></i>
						<span>{{iconText}}</span>
						<!-- <span v-if="chooseCate">一个集合中物料分类的最大数量为100</span> -->
					</div>
					<!-- ------------------------ -->
					<div class="operate" v-if="sleType==0">
						<el-checkbox v-model="chooseCate">按物料分类新建集合</el-checkbox>
						<div class="btnstyle">
							<el-button type="primary" @click="showWin(0)" icon="el-icon-plus">{{chooseCate?"选择物料分类":"选择物料"}}</el-button>
							<span>{{chooseCate?"已选择物料分类数量："+selectClassifyId.length:"已选择物料数量："+selectMater.length}}</span>
						</div>
					</div>
					<!-- ------------------------ -->
					<div class="operate" v-if="sleType==1">
						<el-checkbox v-model="chooseCate">按物料单位，物料分类新建集合</el-checkbox>
						<div class="btnstyle">
							<div class="steps">
								<span>步骤一：</span>
								<el-button type="primary" @click="showWin(1)" icon="el-icon-plus">选择物料单位</el-button>
								<span class="spanText" :title="selectUnit.name">已选择物料单位：<span>{{selectUnit.name}}</span></span>
							</div>
							<div class="steps">
								<span>步骤二：</span>
								<el-button type="primary" @click="showWin(0)" icon="el-icon-plus" :disabled="!selectUnit.name&&!chooseCate">{{chooseCate?"选择物料分类":"选择物料"}}</el-button>
								<span>{{chooseCate?"已选择物料分类数量："+selectClassifyId.length:"已选择物料数量："+selectMater.length}}</span>
							</div>
						</div>
					</div>
					<!-- ------------------------ -->
					<div class="operate" v-if="sleType==2">
						<el-checkbox v-model="chooseCate">按供应商，物料分类新建集合</el-checkbox>
						<div class="btnstyle">
							<div class="steps">
								<span>步骤一：</span>
								<el-button type="primary" @click="showWin(2)" icon="el-icon-plus">选择供应商</el-button>
								<span>已选择供应商数量：{{selectSuppier.length}}</span>
							</div>
							<div class="steps">
								<span>步骤二：</span>
								<el-button type="primary" @click="showWin(0)" icon="el-icon-plus">{{chooseCate?"选择物料分类":"选择物料"}}</el-button>
								<span>{{chooseCate?"已选择物料分类数量："+selectClassifyId.length:"已选择物料数量："+selectMater.length}}</span>
							</div>
						</div>
					</div>
					<!-- ------------------------ -->
					<div class="operate" v-if="sleType==3">
						<!-- <el-checkbox v-model="chooseCate">按物料单位，物料分类新建集合</el-checkbox> -->
						<div class="btnstyle">
							<div class="steps">
								<span>步骤一：</span>
								<el-button type="primary" @click="showWin(0)" icon="el-icon-plus">选择物料</el-button>
								<span class="spanText" :title="selectMater.name">已选择物料名称：<span>{{selectMater.name}}</span></span>
							</div>
							<div class="steps">
								<span>步骤二：</span>
								<el-button type="primary" @click="showWin(2)" icon="el-icon-plus">选择供应商</el-button>
								<span>已选择供应商数量：{{selectSuppier.length}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button v-if="!id" @click="handleClose('continue')" type="text">继续添加</el-button>
				<el-button v-else @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="handleClose('ok')">确 定</el-button>
			</span>
		</el-dialog>
		<selectWin v-if="unitWin" @positionEvent="getUnit" :title="'选择物料单位'" :list="unitsArr" :selectArr="selectUnit"
		 :isSingle="true"></selectWin>
		<selectWin v-if="suppierWin" @positionEvent="getSuppier" :title="'选择供应商'" :list="suppierList" :selectArr="selectSuppier"
		 :isSingle="false"></selectWin>
		<selectClassifyWin v-if="classify" :select="selectClassifyId" :key="'id'" @positionEvent="getClassify"></selectClassifyWin>
		<selectMaterialWin v-if="showMaterWin" :unitName="selectUnit.name" :pSelects="selectMater" :isSingle="materisSingle"
		 :pList="sendMaterial" @change="getMaterial"></selectMaterialWin>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				id: 0, //编辑是需要用到的ID
				gatherName: '',
				dialogShow: true,
				typeArr: ['物料', '单位-物料', '供应商-物料', '物料-供应商'],
				sleType: 0,
				chooseCate: false, //是否显示分类按钮
				unitsArr: [], //物料单位数据
				unitWin: false,
				selectUnit: {}, //选中的单位
				suppierList: [], //供应商数据
				selectSuppier: [], //选择的供应商
				suppierWin: false,
				showMaterWin: false, //显示选择物料弹窗
				sendMaterial: [],
				selectMater: [], //选中的物料
				classify: false, //分类弹窗
				// selectClassify: [], //选中的分类
				selectClassifyId: [], //选中的分类id
				materisSingle: false, //物料弹窗是否为单选
				classifyData: [], //物料分类数据
				cache: {} //缓存数据
			};
		},
		props: {
			//弹窗标题
			title: {
				type: [String],
				default: '新建集合'
			},
			materialList: Array,
			editData: Object
		},
		methods: {
			async init() {
				let res = await http.All([{
					httpId: 'MaterialGetUnitList'
				}, {
					httpId: 'suppierList'
				}, {
					httpId: 'invoiv_getCategoryList'
				}]);
				console.log(res);
				this.unitsArr = res[0].data;
				this.suppierList = res[1].data;
				this.classifyData = res[2].data;
			},
			showWin(type) {
				switch (type) {
					case 0:
						if (this.chooseCate) {
							this.classify = true;
						} else {
							this.showMaterWin = true;
							if (this.sleType == 3) this.materisSingle = true;
						}
						break;
					case 1:
						this.unitWin = true;
						break;
					case 2:
						this.suppierWin = true;
				}
			},
			//获取所有物料
			recursiveGetMaterialList() {
				this.sendMaterial = utils.deepCopy(this.materialList);
				// return arr;
			},
			async handleClose(done) {
				if (done == 'ok' || done == 'continue') {
					if (!this.checkData()) {
						return false;
					}
					let backData = await this.sendData();
					backData.continue = done == 'continue' ? true : false;
					this.$emit('change', backData);
				} else {
					this.$emit('change', false);
				}
				if (done == 'continue') {
					this.resetData();
				}
			},
			resetData() {
				this.gatherName = '';
				this.chooseCate = false;
				this.materisSingle = false;
				this.selectUnit = {};
				this.selectMater = [];
				this.selectClassifyId = [];
				this.selectSuppier = [];
			},
			sendWarning(type, str) {
				this.$message({
					type: type,
					message: str,
				});
				return false;
			},
			checkData() {
				let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
				if (!reg.test(this.gatherName)) return this.sendWarning('warning', '请输入正确的集合名称！');
				if (this.chooseCate) {
					if (this.selectClassifyId.join(',') == '') {
						return this.sendWarning('warning', '请选择分类！');
					}
				} else {
					let setArr = this.selectMater;
					if (!Array.isArray(this.selectMater)) {
						setArr = [this.selectMater];
					}
					if (Array.from(setArr, x => x.id).join(',') == '') {
						return this.sendWarning('warning', '请选择物料！');
					}
				}
				if (this.sleType == 1 && !this.selectUnit.id) {
					return this.sendWarning('warning', '请选择单位！');
				}
				if (this.sleType == 2 || this.sleType == 3) {
					if (Array.from(this.selectSuppier, x => x.id).join(',') == '') {
						return this.sendWarning('warning', '请选择供应商！');
					}
				}
				return true;
			},
			async sendData() {
				let url = '';
				let obj = {
					id: this.id,
					name: this.gatherName,
				};

				if (this.sleType != 3) {
					obj.isCategory = this.chooseCate ? 1 : 0;
					this.chooseCate ? obj.cid = this.selectClassifyId.join(',') : obj.mid = Array.from(this.selectMater, x => x.id).join(
						',');
				}
				switch (this.sleType) {
					case 0:
						url = 'materialReportSetStatisticScopeMaterial';
						break;
					case 1:
						url = 'materialreportSetStatisticScopeUnitMaterial';
						obj.unitId = this.selectUnit.id;
						break;
					case 2:
						url = 'materialReportSetStatisticScopeSupplierMaterial';
						obj.supplierId = Array.from(this.selectSuppier, x => x.id).join(',');
						obj.supplierName = Array.from(this.selectSuppier, x => x.name).join(',');
						break;
					case 3:
						url = 'materialReportSetStatisticScopeMaterialSupplier';
						Object.assign(obj, {
							mid: this.selectMater.id,
							supplierId: Array.from(this.selectSuppier, x => x.id).join(','),
							supplierName: Array.from(this.selectSuppier, x => x.name).join(','),
						});
						break;
				}
				let data = await http[url]({
					data: obj
				});
				// this.$message({
				// 	type: 'success',
				// 	message: `${this.id?'修改':'添加'}成功!`
				// });
				this.sendWarning('success', `${this.id?'修改':'添加'}成功!`);
				return data.new;
			},
			getMaterial(data) {
				console.log(data);
				if (data) {
					if (data.length > 500) {
						return this.sendWarning('warning', '一个集合中物料的最大数量为500');
					}
					this.cache = {};
					this.selectMater = data;
				}
				this.showMaterWin = false;
			},
			getClassify(data) {
				if (data) {
					let arr = [];
					data.forEach(v => {
						if (v.selectChildren.length > 0) {
							arr = arr.concat(Array.from(v.selectChildren, x => x.id));
						} else if (v.selectAll) {
							arr.push(v.id);
						}
					});
					if (data.length > 100) {
						return this.sendWarning('warning', '一个集合中物料分类的最大数量为100');
					}
					// this.selectClassify = data;
					this.cache = {};
					this.selectClassifyId = arr;
				}
				this.classify = false;
			},
			getUnit(data) {
				this.unitWin = false;
				if (data) {
					this.selectUnit = data;
					let arr = [];
					this.materialList.forEach(v => {
						v.unit.forEach(u => {
							if (data.id == u.muId) {
								arr.push(v);
							}
						});
					});
					this.cache = {};
					this.sendMaterial = arr;
				}
			},
			getSuppier(data) {
				if (data) {
					if (data.length > 100) {
						return this.sendWarning('warning', '一个集合中供应商的数量最大数量为100');
					}
					this.cache = {};
					this.selectSuppier = data;
				}
				this.suppierWin = false;
			},
			setEdit(data) {
				this.id = data.id;
				this.gatherName = data.name;
				if (data.type != 6) {
					this.chooseCate = data.isCategory == 0 ? false : true;
					if (data.isCategory == 0) {
						this.selectMater = this.getSelectArr(data.mid, this.sendMaterial, 'id');
					} else {
						this.selectClassifyId = data.cid;
					}
				}
				if (data.type == 4) this.selectUnit = data.unit;
				if (data.type > 4) {
					this.selectSuppier = this.getSelectArr(data.supplierName.split(','), this.suppierList, 'name');
					if (data.type == 6) {
						this.selectMater = this.$parent.getMateralName(data.mid);
					}
				}
			},
			getSelectArr(data, list, key) {
				let arr = [];
				data.forEach(v => {
					for (let item of list) {
						if (item[key] == v) {
							arr.push(item);
							break;
						}
					}
				});
				return arr;
			}

		},
		async mounted() {
			await this.init();
			this.recursiveGetMaterialList();
			if (this.editData && this.editData.id) {
				this.sleType = this.editData.type - 3;
				this.$nextTick(() => {
					this.setEdit(this.editData);
				});
			}

		},
		components: {
			selectWin: () =>
				import( /*webpackChunkName: 'select_win'*/ './select_win'), //选择单位
			selectClassifyWin: () =>
				import( /*webpackChunkName: 'select_classify_win'*/ './select_classify_win'), //选择分类
			selectMaterialWin: () =>
				import( /*webpackChunkName: 'select_material_win'*/ './select_material_win'), //选择分类

		},
		computed: {
			iconText() {
				let str = '一个集合中物料的最大数量为500';
				if (this.sleType == 2) {
					if (this.chooseCate) {
						str = '一个集合中供应商、物料分类的数量分别最大为100';
					}
				} else if (this.sleType == 3) {
					str = '一个集合中供应商的数量最大为100';
				} else if (this.chooseCate) {
					str = '一个集合中物料分类的最大数量为100';
				}
				return str;
			}
		},
		watch: {
			sleType(news, old) {
				console.log(news, old);
				this.cache[old] = {
					chooseCate: this.chooseCate,
					materisSingle: this.materisSingle,
					selectUnit: this.selectUnit,
					selectMater: this.selectMater,
					selectClassifyId: this.selectClassifyId,
					selectSuppier: this.selectSuppier,
				};
				if (this.cache[news]) {
					let newsCache = this.cache[news];
					this.chooseCate = newsCache.chooseCate;
					this.materisSingle = newsCache.materisSingle;
					this.selectUnit = newsCache.selectUnit;
					this.selectMater = newsCache.selectMater;
					this.selectClassifyId = newsCache.selectClassifyId;
					this.selectSuppier = newsCache.selectSuppier;
					this.sendMaterial = newsCache.sendMaterial;
				} else {
					this.chooseCate = false;
					this.materisSingle = false;
					this.selectUnit = {};
					this.selectMater = [];
					this.selectClassifyId = [];
					this.selectSuppier = [];
				}

				this.sendMaterial = utils.deepCopy(this.materialList);
			}
		}
	};
</script>
<style lang='less' scoped>
	.gatherBox {
		.winTitle {
			display: block;
			font-size: 20px;
			text-align: center;
			color: #606266;
		}

		.dialogContent {
			.inpStyle {
				margin-bottom: 15px;

				.inpbox {
					display: inline-block;
					width: 200px;
					margin-left: 15px;
				}
			}

			.btnstyle {
				margin-top: 15px;

				// border: 1px #cccccc dotted;
				span {
					vertical-align: middle;
				}

				.steps {
					width: 90%;
					border: 1px #cccccc dashed;
					margin-bottom: 15px;
					padding: 10px 15px;
				}

				.spanText {
					display: inline-block;
					// white-space: nowrap;
					// overflow: hidden;
					// text-overflow: ellipsis;
					width: 55%;
					span{
						display: inline-block;
						width: 45%;
						vertical-align: middle;
					}
				}
			}

			.tip-icon {
				i {
					vertical-align: middle;
					display: inline-block;
					width: 18px;
					height: 18px;
					background: url(../../../../res/icon/prompt.png) center center no-repeat;
				}

				span {
					color: #999999;
					vertical-align: middle;
				}
			}
		}
	}
</style>