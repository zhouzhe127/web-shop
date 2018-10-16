<!--
    @file:修改物料
    @baichuan:曾伟福
-->
<template>
	<div id="material-edit">
		<div class="split-title">
			修改物料
		</div>
		<div>
			<div class="label-content">
				<label class="required label">物料名称</label>
				<input type="text" v-model="materialName" class="input" maxlength="20" placeholder="请输入物料名称">
			</div>
			<div class="label-content">
				<label class="require label">物料编码</label>
				<input type="text" v-model="materialCode" class="input" maxlength="6" placeholder="请输入物料编码">
			</div>
			<div class="label-content">
				<label class="required label">物料类型</label>
				<div style="width:210px;display:inline-block;">
					<el-select v-model="typeValue" placeholder="全部类型">
						<el-option v-for="item in typeCate" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
			</div>
			<div class="label-content">
				<label class="required label">物料分类</label>
				<div class="img-div" @click="openCategoryWin('category')">
					<img src="../../../res/images/add.png" alt="添加">添加分类
				</div>
				<span class="tips" v-show="selectCategory.length>0">
					(已选择:
					<i v-for="(item,index) in selectCategory" :key="index">{{item.name}}
						<template v-if="index!=selectCategory.length-1">
							,
						</template>
					</i>
					)
				</span>
			</div>
			<div class="label-content">
				<label class="label">品牌</label>
				<div class="img-div" @click="openAddBrand('brand')">
					<img src="../../../res/images/add.png" alt="添加">添加品牌
				</div>
				<span class="tips" v-show="selectBrand.length>0">
					(已选择:
					<i v-for="(item,index) in selectBrand" :key="index">{{item.name}}</i>
					)
				</span>
			</div>
			<div class="label-content">
				<label class="required label">保质期</label>
				<input type="text" class="input validity-input" maxlength="3" v-model="validityObj.time">
				<div class="validity" @click="hideUnitSelect">
					<span class="validity-num">{{validityObj.type}}</span>
					<span class="validity-trangle"></span>
					<ul class="validity-ul" v-show="validityObj.show">
						<li v-for="(item,index) in validityTypeArr" :key="index" @click="getValidity(item)">{{item.name}}</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="split-title" v-if="isBrand">
			分销价格
		</div>
		<div class="label-content" v-if="isBrand" v-for="(list,index) in dispiceArr" :key="index">
			<div class="inline-box">
				<label class="require label">{{list.name}}</label>
				<div class="input-box">
					<el-input v-model="list.value" placeholder="请输入价格"></el-input>
				</div>
			</div>
			<div class="inline-box">
				<label class="require label">单位</label>
				<el-select v-model="list.unitId" placeholder="请选择单位">
					<el-option v-for="item in selectUnit" :key="item.muId" :label="item.name" :value="item.muId"></el-option>
				</el-select>
			</div>
		</div>
		<div class="bottom">
			<div class="gray-btn gray" @click="clickBtn('cancel')">取消</div>
			<div class="yellow-btn yellow" @click="clickBtn('ok')">确定</div>
		</div>
		<component :is="showCom" :pObj="comObj" :list="comObj.category" :selectList="comObj.selectCategory" :title="comObj.title"
		 :radio="comObj.radio" :tips="comObj.tips" :showTips="false" @throwCommonWin="closeCommonWin"></component>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				validityTypeArr: [{
					id: 0,
					name: '月'
				},
				{
					id: 1,
					name: '日'
				},
				{
					id: 2,
					name: '年'
				}],
				validityObj: {
					time: '',
					type: '日',
					id: '',
					show: false
				}, //保质期
				isBrand: '',
				flag: '', //当前打开的弹窗
				materialName: '', //物料名称
				materialCode: '', //物料简码
				materialId: '', //物料id

				category: [], //物料分类
				selectCategory: [], //选择的分类

				selectBrand: [], //选择的品牌
				brandList: [], //品牌列表

				showCom: '',
				comObj: '',
				olddis: '', //已有分销价
				dispiceArr: [], //分销价数组
				selectUnit: [], //单位
				updateArr: [],
				typeCate: [{
					value: 0,
					label: '成品'
				}, {
					value: 1,
					label: '半成品'
				}, {
					value: 2,
					label: '普通物料'
				}],
				typeValue: '',
			};
		},
		methods: {
			clickBtn(flag) {
				switch (flag) {
					case 'ok':
						if (!this.checkform()) return;
						let obj = this.formatData();
						this.MaterialEditMaterial(obj).then((res) => {
							if (res) {
								this.$store.commit('setWin', {
									title: '温馨提示',
									content: '修改物料成功!'
								});
								this.$router.go(-1);
							}
						});
						break;
					case 'cancel':
						this.$router.go(-1);
						break;
				}
			},
			closeCommonWin(arr, res) {
				if (res == 'cancel' || res == 'close') {
					this.showCom = '';
					return;
				}
				switch (this.flag) {
					case 'category':
						this.selectCategory = arr;
						break;
					case 'brand':
						this.selectBrand = arr;
						break;
				}
				this.flag = '';
				this.showCom = '';
			},
			openCategoryWin(flag) {
				this.showCom = 'addCategory';
				this.flag = flag;
				this.comObj = {
					category: this.category,
					title: '选择分类',
					selectCategory: this.selectCategory,
					radio: true,
					tips: '请先配置分类!'

				};
			},
			openAddBrand(flag) {
				this.showCom = 'unitBrand';
				this.flag = flag;
				this.comObj = {
					title: '添加品牌',
					list: this.brandList,
					selectlist: this.selectBrand,
					radio: true,
					tips: '请先配置品牌'
				};
			},
			//组织分类数据
			organizeCategory(cate) {
				let temp = cate;
				let arr = [];
				cate.forEach((ele) => {
					ele.child = [];
					ele.showAdd = false;
					if (ele.pid == 0) {
						for (let i = 0, len = temp.length; i < len; i++) {
							if (ele.id == temp[i].pid && ele.id != temp[i].id) {
								ele.child.push(temp[i]);
							}
						}
						arr.push(ele);
					}
				});
				return arr;
			},
			//------------event-----------
			//获取保质期
			getValidity(item) {
				this.validityObj.type = item.name;
				this.validityObj.id = item.id;
			},
			//隐藏下拉框
			hideUnitSelect(event) {
				this.validityObj.show = !this.validityObj.show;
				event.cancelBubble = true;
			},
			//返回true表示合格
			checkform() {
				if (!global.checkData({
					materialName: {
						cond: '$$.length>0 && $$.length<=20',
						pro: '请输入20字以内的名称!'
					},
					materialCode: {
						reg: /^[A-Za-z0-9]{1,6}$/,
						pro: '编码由英文,数字组成!'
					},

				}, this)) return;

				if (!global.checkData({
					time: {
						reg: /[1-9]\d{0,2}/,
						pro: '保质期由1-3位数字组成!'
					}
				}, this.validityObj)) return;

				if (this.selectCategory.length == 0) {
					this.$store.commit('setWin', {
						content: '请选择分类!',
						title: '温馨提示'
					});
					return;
				}
				let check = true;
				if (this.isBrand) {
					this.updateArr = [];
					this.dispiceArr.map(v => {
						if (v.value) {
							this.updateArr.push(v);
							if (!v.unitId) {
								this.$message.error('请选择分销价单位！');
								check = false;
							}
							if (!/^([+-]?)\d*\.?\d+$/.test(v.value)) {
								this.$message({
									message: '请输入正确价格！',
									type: 'warning'
								});
								check = false;
							}
						}
					});
				}
				if (!check) return false;
				return true;
			},
			formatData() {
				//品牌
				let brandId = null;
				if (this.selectBrand[0]) {
					brandId = this.selectBrand[0].id;
				}

				//分类id
				let arr = [];
				this.selectCategory.forEach((ele) => {
					arr.push(ele.id);
				});
				let obj = {
					mid: this.materialId,
					name: this.materialName,
					barCode: this.materialCode,
					brandId: brandId,
					validity: this.validityObj.time,
					validityType: this.validityObj.id,
					cids: arr.join(','),
					type: this.typeValue
				};
				if (this.isBrand) {
					obj.distributionData = this.updateArr;
				}
				return obj;
			},
			domEvent() {
				this.validityObj.show = false;
			},
			//获取分类列表
			async MaterialGetCategoryList() {
				let res = await http.MaterialGetCategoryList({
					data: {}
				});
				return res;
			},
			async InvoicingBrandList() {
				let res = await http.InvoicingBrandList({
					data: {}
				});
				return res;
			},
			async MaterialEditMaterial(obj) {
				let res = await http.MaterialEditMaterial({
					data: obj
				});
				return res;
			},
			async MaterialGetMaterialDetail(mid) {
				let res = await http.MaterialGetMaterialDetail({
					data: {
						mid,
						isDistribution: 1
					}
				});
				return res;
			},
			async syncRequest() {
				let material = await this.MaterialGetMaterialDetail(this.materialId);
				this.materialName = material.name;
				this.materialCode = material.barCode;
				this.selectUnit = material.unit;
				this.typeValue = Number(material.type);
				this.olddis = material.distributionRela;
				let type = null;
				this.validityTypeArr.some((ele) => {
					if (ele.id == material.validityType) {
						type = ele.name;
						return true;
					}
				});
				this.validityObj = {
					time: material.validity,
					show: false,
					id: material.validityType,
					type: type
				};

				let category = await this.MaterialGetCategoryList();
				this.category = this.organizeCategory(category);
				material.cate || (material.cate = []);
				this.selectCategory = material.cate.map((ele) => {
					for (let i = 0, len = category.length; i < len; i++) {
						if (ele.cid == category[i].id) {
							return category[i];
						}
					}
				});

				this.brandList = await this.InvoicingBrandList();
				this.brandList.some((ele) => {
					if (ele.id == material.brandId) {
						this.selectBrand.push(ele);
						return true;
					}
				});
			},
			initData() {
				this.materialId = this.$route.query.id;
				let userData = storage.session('userShop');
				this.isBrand = userData.currentShop.ischain == '3' ? true : false;
				console.log(this.isBrand);
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
					this.olddis.map(s => {
						if (v.id == s.distributionId) {
							obj.value = s.value;
							obj.unitId = s.unitId;
						}
					});
					this.dispiceArr.push(obj);
				});
			},
		},
		async mounted() {
			this.initData();
			await this.syncRequest();
			this.getDistr();
			document.addEventListener('click', this.domEvent);

		},
		components: {
			unitBrand: () =>
				import( /*webpackChunkName:'unit_brand_win'*/ './unit_brand_win'),
			addCategory: () =>
				import( /*webpackChunkName:'add_category_com'*/ 'src/components/add_category_com'),
		},
		beforeDestroy() {
			document.removeEventListener('click', this.domEvent);
		},
	};
</script>
<style lang='less' scoped>
	#material-edit {
		.mixin(@color, @height, @size) {
			color: @color;
			height: @height;
			line-height: @height;
			font-size: @size;
		}

		;

		.inline {
			margin-left: -3px;
			display: inline-block;
			vertical-align: middle;
		}

		.split-title {
			text-indent: 15px;
			border-left: 2px solid #29a8e0;
			margin-bottom: 30px;
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

		.label-content {
			// border:1px solid #ff0000;
			padding-bottom: 20px;

			.inline-box {
				display: inline-block;
				margin-right: 20px;
			}

			.input-box {
				display: inline-block;
				width: 210px;
			}

			.label {
				.mixin(#333, 40px, 14px);
				width: 115px;
				text-align: right;
				display: inline-block;
				// border:1px solid #ff0000;
				padding-right: 20px;
				vertical-align: middle;
			}

			.input {
				.mixin(#333, 40px, 14px);
				display: inline-block;
				height: 40px;
				width: 210px;
				border: 1px solid #ccc;
				vertical-align: middle;
				margin-left: -3px;
			}

			.tips {
				margin-left: 10px;
			}

			.img-div {
				height: 40px;
				width: 210px;
				background-color: #29a8e0;
				color: #fff;
				color: #fff;
				font-size: 14px;
				line-height: 40px;
				text-align: center;
				cursor: pointer;
				.inline;

				img {
					position: absolute;
					margin-left: -35px;
					margin-top: 10px;
					display: inline-block;
					vertical-align: middle;
				}
			}

			.validity-input {
				width: 120px;
				color: #333;
			}

			.validity {
				.inline;
				height: 40px;
				margin-left: 7px;
				color: #333;
				width: 80px;
				border: 1px solid #ccc;

				.validity-num {
					width: 40px;
					height: 40px;
					display: inline-block;
					text-align: center;
					vertical-align: middle;
					.mixin(#333, 40px, 14px);
					border-right: 1px solid #ccc;
				}

				.validity-trangle {
					position: absolute;
					margin-top: 16px;
					margin-left: 12px;
					border: 7px solid transparent;
					border-top: 9px solid #ccc;
				}

				.validity-ul {
					margin: 0;
					padding: 0;
					width: 40px;
					position: absolute;
					margin-left: 39px;
					margin-top: -2px;
					z-index: 11;

					li {
						list-style: none;
						height: 32px;
						border: 1px solid #ccc;
						border-bottom: 0;
						text-align: center;
						.mixin(#333, 32px, 14px);
						cursor: pointer;
						background-color: #fff;

						&:last-child {
							border-bottom: 1px solid #ccc;
						}
					}
				}
			}

			.unit-div {
				.inline;
				width: 210px;
				height: 40px;
				border: 1px solid #ccc;

				input[type='text'] {
					width: 167px;
					height: 38px;
					padding: 0;
					border: 0;
					outline: none;
					text-indent: 15px;
					float: left;
					font-size: 14px;
				}

				span {
					width: 37px;
					height: 40px;
					text-align: center;
					vertical-align: middle;
					.mixin(#333, 40px, 14px);
					border-left: 1px solid #ccc;
					float: left;
				}
			}

			.equal-unit {
				margin-left: 10px;
				font-size: 14px;
			}
		}

		.bottom {
			padding-left: 115px;
			margin-top: 50px;

			div {
				width: 200px;
				height: 50px;
				line-height: 50px;
				margin-right: 10px;
				text-align: center;
				font: 16px;
				display: inline-block;
				cursor: pointer;
			}

			.gray-btn {
				color: #fff;
			}

			.new-btn {
				border: 1px solid #ff9200;
				color: #ff9200
			}

			.yellow-btn {
				color: #fff;
			}
		}
	}
</style>