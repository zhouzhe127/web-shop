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
			<div class="label-content pt-20">
				<label class="required label">物料名称</label>
				<el-input clearable v-model="materialName" maxlength="20" class="el-in" placeholder="请输入物料名称"></el-input>
			</div>
			<div class="label-content">
				<label class="required label">物料编码</label>
				<el-input clearable v-model="materialCode"  maxlength="6" class="el-in" placeholder="请输入物料编码"></el-input>
				<el-button type="text" class="auto-code" @click="autoBarCode">生成编码</el-button>
			</div>
			<div class="label-content">
				<label class="required label">物料类型</label>
				<div style="width:210px;display:inline-block;">
					<el-select v-model="typeValue" placeholder="全部类型" class="el-in">
						<el-option v-for="item in typeCate" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
			</div>
			<div class="label-content">
				<label class="required label">物料分类</label>
				<div class="icon-div" @click="openCategoryWin(winName.category)">
					<span class="el-icon-circle-plus-outline"></span>
					添加物料分类
				</div>
				<span class="tips" v-if="selectCategory.id && categoryName.length<=1">
                    已选择分类：{{selectCategory.name}}
                </span>
				<span class="tips" v-if="categoryName.length>1">
					已选择分类：{{categoryName.join(',')}}
				</span>
			</div>
			<div class="label-content">
				<label class="label">品牌</label>
				<div class="icon-div" @click="openAddBrand(winName.brand)">
					<span class="el-icon-circle-plus-outline"></span>
					添加品牌
				</div>
				<span class="tips" v-show="selectBrand.id">
                    已选择品牌：{{selectBrand.name}}
                </span>
			</div>
			<div class="label-content">
				<label class="required label">保质期</label>
				<el-input placeholder="请输入保质期" v-model="validityObj.time"
					class="el-in" maxlength="3">
					<el-select v-model="validityObj.type" slot="append" placeholder="请选择" class="el-append">
						<el-option
							v-for="item in validityTypeArr"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-input>
			</div>
		</div>
		<div class="split-title" v-if="isBrand">
			分销价格
		</div>
		<div class="label-content" v-if="isBrand" v-for="(list,index) in dispiceArr" :key="index">
			<div class="inline-box">
				<label class="require label">{{list.name}}</label>
				<div class="input-box">
					<el-input v-model="list.value" placeholder="请输入价格" class="el-in"></el-input>
				</div>
			</div>
			<div class="inline-box">
				<label class="require label">单位</label>
				<el-select v-model="list.unitId" placeholder="请选择单位" class="el-in">
					<el-option v-for="item in selectUnit" :key="item.muId" :label="item.name" :value="item.muId"></el-option>
				</el-select>
			</div>
		</div>
		<component :is="showCom" :pObj="comObj" :selectList="comObj.selectCategory" :title="comObj.title"
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
				validityTypeArr: [
					{id: 0,name: '月'},
					{id: 1,name: '日'},
					{id: 2,name: '年'},
				],
				validityObj: {
					time: '',
					type: 1,
				},
				winName:{					//弹窗名
					category:'category',
					brand:'brand',
				},
				isBrand: '',
				flag: '', //当前打开的弹窗
				materialName: '', //物料名称
				materialCode: '', //物料简码
				materialId: '', //物料id

				category: [], //原物料分类
				categoryName:[],//原物料名称
				selectCategory: {			//选择的分类
					id:'',
					name:'',
				},

				selectBrand: {}, //选择的品牌
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
			//自动生成物料编码
			async autoBarCode(){
				let data = await http.materialCreateMaterialBarCode();
				this.materialCode = data;
			},
			initBtn(){
				this.$store.commit('setFixButton',[
					{
						name: '取消',
						type:'1',
						className:'info',
						fn:()=>{
							this.clickBtn('cancel');
						}
					},
					{
						name: '确定',
						type:'1',
						className:'primary',
						fn:()=>{
							this.clickBtn('ok');
						}
					},
				]);
			},
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
						this.selectBrand = arr[0];
						break;
				}
				this.flag = '';
				this.showCom = '';
			},
			openCategoryWin(flag) {
				this.showCom = 'addCategory';
				this.flag = flag;
				this.comObj = {
					id:this.selectCategory.id,
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
			//------------event-----------
			//返回true表示合格
			checkform() {
				if(this.category.length>1){
					this.$message.error('只能选择一个分类！请重新选择分类');
					return false;
				}
				if (!global.checkData({
					materialName: {
						cond: '$$.length>0 && $$.length<=20',
						pro: '请输入20字以内的名称!'
					},
					materialCode: {
						reg: /^[A-Za-z0-9]{1,6}$/,
						pro: '编码由英文,数字组成!'
					},

				}, this)) return false;

				if (!global.checkData({
					time: {
						reg: /[1-9]\d{0,2}/,
						pro: '保质期由1-3位数字组成!'
					}
				}, this.validityObj)) return false;

				if (this.selectCategory.length == 0) {
					this.$store.commit('setWin', {
						content: '请选择分类!',
						title: '温馨提示'
					});
					return false;
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
				if (this.selectBrand.id) {
					brandId = this.selectBrand.id;
				}

				let obj = {
					mid: this.materialId,
					name: this.materialName,
					barCode: this.materialCode,
					brandId: brandId,
					validity: this.validityObj.time,
					validityType: this.validityObj.type,
					cid: this.selectCategory.id,
					type: this.typeValue
				};
				if (this.isBrand) {
					obj.distributionData = this.updateArr;
				}
				return obj;
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
				this.validityObj = {
					time: material.validity,
					type: Number(material.validityType),
				};
				material.cate || (material.cate = []);
				this.category = material.cate.map((ele) => {
					return {id:ele.cid,name:ele.name};
				});
				this.categoryName = material.cate.map((ele) => {
					return ele.name;
				});
				if(this.category.length<=1){
					this.selectCategory = this.category[0];
				}
				this.brandList = await this.InvoicingBrandList();
				this.selectBrand = this.brandList.filter((res)=>{
					return material.brandId==res.id; 
				});
			},
			initData() {
				this.materialId = this.$route.query.id;
				let userData = storage.session('userShop');
				this.isBrand = userData.currentShop.ischain == '3' ? true : false;
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
			this.initBtn();
			this.initData();
			await this.syncRequest();
			this.getDistr();
		},
		components: {
			unitBrand: () =>
				import( /*webpackChunkName:'unit_brand_win'*/ './unit_brand_win'),
			addCategory: () =>
				import( /*webpackChunkName:'add_category_com'*/ './material_create_cate'),
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

		.el-in{
			width:210px;
		}
		.el-append{
			width:70px;
		}

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
			.icon-div{
				height: 40px;
				width: 210px;
				line-height: 40px;
				.inline;	
				cursor: pointer;
				color: #E1BB4A;

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
				color: #666;
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