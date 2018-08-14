<!--
    @file:新建物料
    @baichuan:曾伟福

-->
<template>
	<div id="material-create">
		<div class="split-title">
			新建物料
		</div>
		<div>
			<div class="label-content">
				<label class="required label">物料名称</label>
				<input type="text" v-model="materialName" class="input" maxlength="20" placeholder="请输入物料名称">
			</div>
			<div class="label-content">
				<label class="require label">物料简码</label>
				<input type="text" v-model="materialCode" class="input" maxlength="20" placeholder="请输入物料简码">
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
                        <i v-for="(item,index) in selectCategory" :key="index">{{item.name}}<i v-if="index!=selectCategory.length-1">,</i></i>
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
			<div class="label-content">
				<label class="required label">物料单位</label>
				<div class="img-div" @click="openAddUnitWin('unit')">
					<img src="../../../res/images/add.png" alt="添加">添加单位
				</div>
				<span class="tips" v-show="selectUnit.length>0">
                    (已选择:
                        <i v-for="(item,index) in selectUnit" :key="index">{{item.name}}<i v-if="index!=selectUnit.length-1">,</i></i>
                    )
                </span>
			</div>
			<div class="label-content" v-show="selectUnit.length>0">
				<label class="required label">默认单位</label>
				<mul-select :width="210" :sorts="selectUnitName" :name="unitObj.de" @emit="getSelectUnitDe" style="margin-left:-3px;"></mul-select>
			</div>
			<div class="label-content" v-show="selectUnit.length>0">
				<label class="required label">最小单位</label>
				<mul-select :width="210" :sorts="selectUnitName" :name="unitObj.min" @emit="getSelectUnitMin" style="margin-left:-3px;"></mul-select>
			</div>
			<div class="label-content" v-for="(item,index) in groupUnit" :key="index" v-if="item.unitId!=unitObj.minId">
				<label :class="{'required':index==0,'label':true}">{{index==0 ? '单位换算' : ''}}</label>
				<div class="unit-div">
					<input type="text" v-model="item.value" placeholder="请输入数字" maxlength="15">
					<span :title="item.minName">{{item.minName}}</span>
				</div>
				<span class="equal-unit">=1&nbsp;{{item.unitName}}</span>
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
					<el-option v-for="item in selectUnit" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</div>
		</div>
		<div class="bottom">
			<div class="gray-btn gray" @click="clickBtn('cancel')">取消</div>
			<div class="new-btn new" @click="clickBtn('continue')">继续新建</div>
			<div class="yellow-btn yellow" @click="clickBtn('ok')">确定</div>
		</div>
		<component 
			:is="showCom" 
			:pObj="comObj" 
			:list="comObj.category" 
			:selectList="comObj.selectCategory"  
			:title ="comObj.title" 
			:radio ="comObj.radio"
			:tips ="comObj.tips"
			:showTips ="false"
			@throwCommonWin="closeCommonWin"
		></component>
	</div>
</template>
<script>
/*
	    1)默认单位是否可以等于最小单位?
	    2)当只选了一个单位的时候默认单位是否等于最小单位?

	*/
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
			flag: '', //当前打开的弹窗
			isBrand: false,

			showCom: '',
			comObj: {},

			validityObj: {
				time: '',
				type: '日',
				show: false
			}, //保质期
			materialName: '', //物料名称
			materialCode: '', //物料简码

			category: [], //物料分类
			selectCategory: [], //选择的分类

			units: [], //单位列表
			selectUnitName: [], //单位名,
			selectUnit: [], //选中的单位
			unitObj: {
				min: '请选择最小单位',
				minId: '',
				de: '请选择默认单位',
				deId: ''
			}, //最小单位与默认单位
			groupUnit: [], //换率

			selectBrand: [], //选择的品牌
			brandList: [], //品牌列表
			dispiceArr:[],//分销价数组
			updateArr:[],
			typeCate: [{
				value:0,
				label:'成品'
			},{
				value:1,
				label:'半成品'
			},{
				value:2,
				label:'普通物料'
			}],
			typeValue:'',
		};
	},
	methods: {
		closeCommonWin(arr, res) {
			if(res == 'cancel' || res == 'close') {
				this.showCom = '';
				return;
			}
			switch(this.flag) {
				case 'category':
					this.selectCategory = arr;
					// console.log(this.selectCategory);
					break;
				case 'brand':
					this.selectBrand = arr;
					break;
				case 'unit':
					if(arr.length > 5) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '最多可添加5个单位哦!'
						});
						return;
					}
					this.selectUnit = arr;
					this.selectUnitName = this.selectUnit.map((ele) => {
						return ele.name;
					});
					this.groupUnit = [];
					if(this.selectUnit.length == 1) {
						let temp = this.selectUnit[0];
						this.unitObj = {
							min: temp.name,
							minId: temp.id,
							de: temp.name,
							deId: temp.id
						};

						let obj = {
							'unitId': temp.id, //单位id
							'unitName': temp.name, //单位名
							'value': temp.id == this.unitObj.minId ? 1 : '', //换算
							'minId': this.unitObj.minId, //最小单位id
							'minName': this.unitObj.min, //最小单位名字    
						};
						this.groupUnit.push(obj);
					} else {
						this.unitObj = {
							min: '请选择最小单位',
							minId: '',
							de: '请选择默认单位',
							deId: ''
						}; //最小单位与默认单位
					}
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
		openAddUnitWin(flag) {
			this.showCom = 'unitBrand';
			this.flag = flag;
			this.comObj = {
				title: '添加单位',
				list: this.units,
				selectlist: this.selectUnit,
				radio: false,
				tips: '请先配置单位!'
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
				tips: '请先配置品牌',
			};
		},

		//----------event-------------
		//获取保质期
		getValidity(item) {
			this.validityObj.type = item.name;
		},
		//隐藏下拉框
		hideUnitSelect(event) {
			this.validityObj.show = !this.validityObj.show;
			event.cancelBubble = true;
		},
		//获取默认
		getSelectUnitDe(index) {
			this.units.some((ele) => {
				if(ele.name == this.selectUnitName[index]) {
					this.unitObj.de = ele.name;
					this.unitObj.deId = ele.id;
					return true;
				}
			});
		},
		//最小单位
		getSelectUnitMin(index) {
			this.selectUnit.some((ele) => {
				if(ele.name == this.selectUnitName[index]) {
					this.unitObj.min = ele.name;
					this.unitObj.minId = ele.id;
					return true;
				}
			});

			this.groupUnit = [];
			for(let i = 0, len = this.selectUnit.length; i < len; i++) {
				let temp = this.selectUnit[i];
				let obj = {
					'unitId': temp.id, //单位id
					'unitName': temp.name, //单位名
					'value': temp.id == this.unitObj.minId ? 1 : '', //换算
					'minId': this.unitObj.minId, //最小单位id
					'minName': this.unitObj.min, //最小单位名字    
				};
				this.groupUnit.push(obj);
			}
			let val = null;
			this.groupUnit = this.groupUnit.filter((ele) => {
				if(!ele.value) return true;
				val = ele;
			});
			if(val) this.groupUnit.push(val);
		},
		//提交数据
		clickBtn(flag) {
			storage.session('tabactive', 1);
			switch(flag) {
				case 'continue':
				case 'ok':
					if(!this.checkform()) return;
					let obj = this.formatData();

					this.MaterialAddMaterial(obj).then(() => {
						if(flag == 'ok') this.$router.go(-1);
						if(flag == 'continue') {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: '新建物料成功!'
							});
							this.initData();
						}
					});
					break;
				case 'cancel':
					this.$router.go(-1); //返回到上一个页面
					break;
			}
		},
		//----------utils-----------
		formatData() {
			//品牌
			let brandId = null;
			if(this.selectBrand[0]) {
				brandId = this.selectBrand[0].id;
			}
			//保质期
			let validityType = null;
			this.validityTypeArr.some((ele) => {
				if(ele.name == this.validityObj.type) {
					validityType = ele.id;
				}
			});

			//分类id
			let arr = [];
			this.selectCategory.forEach((ele) => {
				arr.push(ele.id);
			});

			//换率
			let unitData = [];
			this.groupUnit.forEach((ele) => {
				let de = ele.unitId == this.unitObj.deId ? 1 : 0;
				let min = ele.unitId == this.unitObj.minId ? 1 : 0;
				let obj = {
					muId: ele.unitId,
					value: ele.value,
					isDefault: de,
					isMin: min
				};
				unitData.push(obj);
			});

			let obj = {
				name: this.materialName,
				BC: this.materialCode,
				brandId: brandId,
				validity: this.validityObj.time,
				validityType: validityType,
				cids: arr.join(','),
				unitData: unitData,
				type:this.typeValue
			};
			if(this.isBrand) obj.distributionData = this.updateArr;
			return obj;
		},
		//返回true表示合格
		checkform() {
			if(!global.checkData({
				materialName: {
					cond: '$$.length>0 && $$.length<=20',
					pro: '请输入20字以内的名称!'
				},
				materialCode: {
					reg: /^[0-9A-Za-z]{0,20}$/,
					pro: '简码由英文,数字组成!'
				}
			}, this)) return;
			if(this.typeValue===''){
				this.$message.error('请选择物料类型!');
				return;
			}
			if(!global.checkData({
				time: {
					reg: /[1-9]\d{0,2}/,
					pro: '保质期由1-3位数字组成!'
				}
			}, this.validityObj)) return;
			if(this.selectCategory.length == 0) {
				this.$store.commit('setWin', {
					content: '请选择分类!',
					title: '温馨提示'
				});
				return;
			}
			if(this.selectUnit.length == 0) {
				this.$store.commit('setWin', {
					content: '请选择单位!',
					title: '温馨提示'
				});
				return;
			}
			if(!this.unitObj.minId || !this.unitObj.deId) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					content: '请选择最小单位与默认单位!'
				});
				return;
			}
			let flag = this.groupUnit.some((ele) => {
				let regVal = /^[1-9]\d{0,10}(\.\d{0,3})?$/;
				if(!regVal.test(ele.value)) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '请输入大于1的换算数字,最多可含3位小数!'
					});
					return true;
				}
			});
			let check = true;
			if(this.isBrand){
				this.updateArr = [];
				this.dispiceArr.map(v=>{
					if(v.value!==''){
						if(v.unitId === ''){
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: '请选择分销价单位！'
							});
							check = false;
						}
						this.updateArr.push(v);
						if(!/^([+-]?)\d*\.?\d+$/.test(v.value)){
							this.$message({
                                message: '请输入正确价格！',
                                type: 'warning'
                            });
                            check = false;
						}
					}
					
				})
			}
			console.log(check)
			if(!check) return false;
			if(flag) return false;
			return true;
		},
		//重新初始化数据
		initData() {
			this.flag = '';
			this.showCom = '';
			this.comObj = {};
			this.materialName = ''; //物料名称
			this.materialCode = ''; //物料简码
			this.selectUnit = []; //选中的单位
			this.selectCategory = [];
			this.selectBrand = [];
			this.typeValue = '';
			this.unitObj = {
				min: '',
				minId: '',
				de: '',
				deId: ''
			}; //最小单位与默认单位
			this.groupUnit = [];
			this.validityObj = {
				time: '',
				type: '日',
				show: false
			};
			this.dispiceArr.map(v=>{
				v.value = '';
				v.unitId = '';
			});
		},
		//获取分类列表
		async MaterialGetCategoryList() {
			let res = await http.MaterialGetCategoryList({
				data: {}
			});
			return res;
		},
		//获取物料单位
		async MaterialGetUnitList() {
			let res = await http.MaterialGetUnitList({
				data: {}
			});
			return res;
		},
		//获取品牌
		async InvoicingBrandList() {
			let res = await http.InvoicingBrandList({
				data: {}
			});
			return res;
		},
		//新建物料
		async MaterialAddMaterial(obj) {
			let res = await http.MaterialAddMaterial({
				data: obj
			});
			return res;
		},
		//获取分销价
		async getDistr() {
			let res = await http.invoicingGetDistributionConfig();
			if(!Array.isArray(res)){
				res = [];
			}
			res.map(v=>{
				let obj = {};
				Object.assign(obj,{
					distributionId:v.id,
					value:'',
					name:v.name,
					unitId:''
				});
				this.dispiceArr.push(obj);
			});
		},
		domEvent() {
			this.validityObj.show = false;
		},
	},
	mounted() {
		let userData = storage.session('userShop');
		this.isBrand = userData.currentShop.ischain == '3'? true : false;
		this.MaterialGetCategoryList().then((res) => {
			let temp = res;
			res.forEach((ele) => {
				ele.child = [];
				if(ele.pid == 0) {
					for(let i = 0, len = temp.length; i < len; i++) {
						if(ele.id == temp[i].pid && ele.id != temp[i].id) {
							ele.child.push(temp[i]);
						}
					}
					this.category.push(ele);
				}
			});
		});

		this.MaterialGetUnitList().then((res) => {
			this.units = res;
		});

		this.InvoicingBrandList().then((res) => {
			this.brandList = res;
		});
		this.getDistr();
		document.addEventListener('click', this.domEvent);
	},
	components: {
		unitBrand: () =>
			import( /*webpackChunkName:'unit_brand_win'*/ './unit_brand_win'),
		mulSelect: () =>
			import( /*webpackChunkName:'select_btn'*/ 'src/components/select_btn'),
		addCategory: () =>
			import( /*webpackChunkName:'add_category_com'*/ 'src/components/add_category_com'),

	},
	beforeDestroy() {
		document.removeEventListener('click', this.domEvent);
	},
};
</script>
<style lang='less' scoped>
	#material-create {
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
			.inline-box{
				display: inline-block;
				margin-right: 20px;
			}
			.input-box{
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
					position: relative;
					padding-right: 15px;
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
					height: 38px;
					display: inline-block;
					text-align: center;
					vertical-align: middle;
					.mixin(#333, 38px, 14px);
					border-right: 1px solid #ccc;
				}
				.validity-trangle {
					position: relative;
					top: 13px;
					margin-left: 12px;
					border: 7px solid transparent;
					border-top: 9px solid #ccc;
				}
				.validity-ul {
					margin: 0;
					padding: 0;
					margin-top: -2px;
					z-index: 11;
					width: 80px;
					position: relative;
					margin-left: -1px;
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
					text-overflow: ellipsis;
					overflow: hidden;
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