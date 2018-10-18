<!--
    @file:新建物料
    @baichuan:曾伟福

-->
<template>
	<div id="material-create">
		<div class="head">
			<span>新建物料</span>
			<div></div>
		</div>

		<div>
			<div class="label-content pt-20">
				<label class="required label">物料名称</label>
				<el-input clearable v-model="materialName" maxlength="20" class="el-in" placeholder="请输入物料名称"></el-input>
			</div>


			<div class="label-content">
				<label class="required label">物料编码</label>
				<el-input clearable v-model="materialCode"  maxlength="6" class="el-in" placeholder="请输入物料编码"></el-input>
			</div>


			<div class="label-content">
				<label class="required label">物料类型</label>
				<el-select v-model="typeValue" placeholder="全部类型" class="el-in">
					<el-option 
						v-for="item in typeCate" 
						:key="item.value" 
						:label="item.label" 
						:value="item.value"
					></el-option>
				</el-select>
			</div>


			<div class="label-content">
				<label class="required label">物料分类</label>
				<div class="icon-div" @click="openCategoryWin(winName.category)">
					<span class="el-icon-circle-plus-outline"></span>
					添加物料分类
				</div>

				<span class="tips" v-show="selectCategory.length > 0">
                    (已选择:
                        <i v-for="(item,index) in selectCategory" :key="index">{{item.name}}<i v-if="index!=selectCategory.length-1">,</i></i>
                    )
                </span>
			</div>

			<div class="label-content">
				<label class="label required-no">品牌</label>

				<div class="icon-div" @click="openAddBrand(winName.brand)">
					<span class="el-icon-circle-plus-outline"></span>
					添加品牌
				</div>
				<span class="tips" v-show="selectBrand.length > 0">
                    (已选择:
                        <i v-for="(item,index) in selectBrand" :key="index">{{item.name}}</i>
                    )
                </span>
			</div>

			<div class="label-content">
				<label class="required label">保质期</label>
				<el-input placeholder="请输入保质期" v-model="validityObj.time" @change="(res)=>{typeRatio(validityObj,'time','validate')}" class="el-in" maxlength="3">
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

			<div class="label-content">
				<label class="required label">物料单位</label>

				<div class="icon-div" @click="openAddUnitWin(winName.unit)">
					<span class="el-icon-circle-plus-outline"></span>
					添加单位
				</div>
				<span class="tips" v-show="selectUnit.length > 0">
                    (已选择:
                        <i v-for="(item,index) in selectUnit" :key="index">{{item.name}}<i v-if="index!=selectUnit.length-1">,</i></i>
                    )
                </span>
			</div>

			<!-- 单位选择 -->
			<div class="label-content" v-show="selectUnit.length > 0">
				<label class="required label">默认单位</label>
				<el-select v-model="convertUnit.defUnitId" @change="(res)=>{changeUnit(res,'defUnitName')}" placeholder="请选择默认单位" class="el-in">
					<el-option
						v-for="item in selectUnit"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</div>

			<div class="label-content" v-show="selectUnit.length > 0">
				<label class="required label">最小单位</label>
				<el-select v-model="convertUnit.minUnitId" @change="(res)=>{changeUnit(res,'minUnitName')}" placeholder="请选择最小单位" class="el-in">
					<el-option
						v-for="item in selectUnit"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</div>

			<!-- 单位换算 -->
			<div class="label-content" v-for="(item,index) in groupUnit" :key="index" v-if="item.unitId != convertUnit.minUnitId">
				<label :class="{'required':index == 0,'label':true}">{{ index == 0 ? '单位换算' : ''}}</label>

				<el-input placeholder="请输入数字" v-model="item.value" class="el-in" maxlength="15" @change="()=>{typeRatio(item,'value','unit')}">
					<template slot="append">
						{{convertUnit.minUnitName}}
					</template>
				</el-input>
				<span class="equal-unit"> = 1 {{item.unitName}}</span>
			</div>
		</div>

		<!-- 分销价 -->
		<div class="head" v-if="isBrand">
			<span>分销价格</span>
			<div></div>
		</div>
		<div class="pt-20" v-if="isBrand">
			<div class="label-content"  v-for="(list,index) in dispiceArr" :key="index">
				<div class="inline-box">
					<label class="required-no label">{{list.name}}</label>
					<div class="input-box">
						<el-input v-model="list.value" placeholder="请输入价格" @change="(res)=>{typeRatio(list,'value','distribute')}"></el-input>
					</div>
				</div>
				<div class="inline-box">
					<label class="required-no label">单位</label>
					<el-select v-model="list.unitId" placeholder="请选择单位" class="el-in">
						<el-option 
							v-for="item in selectUnit" 
							:key="item.id" 
							:label="item.name" 
							:value="item.id"
						></el-option>
					</el-select>
				</div>
			</div>
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
	说明:
		1.分销价1-10位,可以位0,保留两位小数
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

			winName:{					//弹窗名
				category:'category',
				brand:'brand',
				unit:'unit',
			},

			flag: '', 					//当前打开的弹窗标识
			isBrand: false,				//是否是品牌

			showCom: '',				//展示的弹窗名
			comObj: {},



			validityObj: {
				time: '',
				type: 1,
			}, 							//保质期
			materialName: '', 			//物料名称
			materialCode: '', 			//物料编码
			typeValue:'',				//物料类型

			category: [], 				//物料分类
			selectCategory: [], 		//选择的分类

			selectBrand: [], 			//选择的品牌
			brandList: [], 				//品牌列表

			units: [], 					//单位列表
			selectUnit: [], 			//选中的单位

			dispiceArr:[],				//分销价数组
			convertUnit:{},				//单位换算选择的单位

			groupUnit: [], 				//换率

		};
	},
	methods: {
		closeCommonWin(arr, res) {
			let winName = this.winName;
			let tempObj = {};
			if(res == 'cancel' || res == 'close') {
				this.showCom = '';
				this.flag = '';
				return;
			}
			switch(this.flag) {
				case winName.category:
					this.selectCategory = arr;
					break;
				case winName.brand:
					this.selectBrand = arr;
					break;
				case winName.unit:
					if(arr.length > 5) {
						this.$message('最多可添加5个单位哦!');
						return;
					}
					this.selectUnit = arr;
					this.groupUnit = [];
					this.initConvert();
					if(this.selectUnit.length == 1) {
						tempObj = this.selectUnit[0];
						this.convertUnit = {
							defUnitId: tempObj.id,
							defUnitName: tempObj.name,
							minUnitId: tempObj.id,
							minUnitName: tempObj.name,							
						};
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
		//默认,最小单位选择
		changeUnit(unitId,sym){
			this.convertUnit[sym] = this.getEle(this.selectUnit,unitId,'id').name;
			if(sym == 'minUnitName'){
				this.groupUnit = [];
				let temp = this.selectUnit.filter((ele)=>{
					return ele.id != unitId;
				});
				for(let ele of temp){
					let obj = {
						unitId:ele.id,
						unitName:ele.name,
						value:''
					};
					this.groupUnit.push(obj);
				}
			}
		},
		//输入换算比例,输入分销价
		typeRatio(item,attr,sym){
			let val = '',
				temp = [],
				reg = '';
			
			if(sym == 'distribute'){
				reg = /([1-9]\d{0,9}|0)(\.\d{1,2})?/;
			}else if(sym == 'validate'){
				reg = /[1-9]\d{0,2}/;
			}else{
				reg = /[1-9]\d{0,10}(\.\d{1,3})?/;
			}

			val = item[attr] + '';
			val = val.trim();
			temp = val.match(reg)
			if(!temp){
				temp = [];
				temp[0] = '';
			}
			item[attr] = temp[0];
		},



		formatData() {
			let brandId = '',	
				distributionData = [],				//分销价
				convertUnit = this.convertUnit,
				arr = [],							//分类id
				unitData = [],						//换算比例
				obj = {};							//最终提交的数据

			//品牌
			if(this.selectBrand[0]) {
				brandId = this.selectBrand[0].id;
			}

			//分类id
			this.selectCategory.forEach((ele) => {
				arr.push(ele.id);
			});

			//换率
			this.groupUnit.forEach((ele) => {
				let obj = {
					muId: ele.unitId,
					value: ele.value,
					isDefault: ele.unitId == convertUnit.defUnitId ? 1 : 0,
					isMin: 0
				};
				unitData.push(obj);
			});
			unitData.push({
				muId: convertUnit.minUnitId,
				value: 1,
				isDefault: convertUnit.minUnitId == convertUnit.defUnitId ? 1 : 0 ,
				isMin: 1				
			});


			obj = {
				name: this.materialName,
				barCode: this.materialCode,
				brandId,
				validity: this.validityObj.time,
				validityType: this.validityObj.type,
				cids: arr.join(','),
				unitData: unitData,
				type:this.typeValue
			};

			//分销价
			if(this.isBrand){
				for(let ele of this.dispiceArr){
					console.log(ele);
					if(ele.value !== '' && ele.unitId !== ''){
						distributionData.push({
							distributionId:ele.distributionId,
							value:ele.value,
							name:ele.name,
							unitId:ele.unitId
						});
					}
				}	
				console.log(distributionData);
				obj.distributionData = distributionData;
			}
			return obj;
		},
		//返回true表示合格
		checkform() {
			if(!global.checkData({
				materialName: {
					cond: '$$.length>0 && $$.length<=20',
					pro: '请输入20字以内的物料名称!'
				},
				materialCode: {
					reg: /^[0-9A-Za-z]{1,6}$/,
					pro: '编码由1-6位英文,数字组成!'
				}
			}, this)) return;

			if(this.typeValue === ''){
				this.$message.error('请选择物料类型!');
				return;
			}

			if(this.selectCategory.length == 0) {
				this.$message.error('请选择分类!');
				return;
			}

			if(this.selectUnit.length == 0) {
				this.$message.error('请选择单位!');
				return;
			}

			if(this.convertUnit.defUnitId === ''){
				this.$message.error('请选择默认单位!');	
				return;			
			}
			if(this.convertUnit.minUnitId === ''){
				this.$message.error('请选择最小单位!');	
				return;			
			}

			for(let ele of this.groupUnit){
				if(!ele.value){
					this.$message.error('请输入换算比例!');	
					return;
				}
			}


			if(this.isBrand){
				for(let ele of this.dispiceArr){
					if(ele.value !== '' && !ele.unitId){
						let tips = `请为 ${ele.name} 分销价选择相应的单位!`
						this.$message.error(tips);						
						return;
					}
				}
			}
			return true;
		},
		async clickBtn(flag) {
			let temp = {};
			storage.session('tabactive', 1);
			switch(flag) {
				case 'continue':
				case 'ok':
					if(!this.checkform()) return;
					let obj = this.formatData();

					temp = await this.MaterialAddMaterial(obj);
					this.alert('新建物料成功!');

					if(flag == 'continue') {
						this.initCondtion();
						this.initConvert();
					}else{
						this.$router.go(-1);
					}
					break;
				case 'cancel':
					this.$router.go(-1); //返回到上一个页面
					break;
			}
		},		



		initData(){
			let userData = storage.session('userShop');
			this.isBrand = userData.currentShop.ischain == 3;
		},
		//重新初始化数据
		initCondtion() {
			this.groupUnit = [];			//单位换算关系
			this.flag = '';					//当前打开的弹窗
			this.showCom = '';				//当前展示的弹窗
			this.comObj = {};
			this.materialName = ''; 		//物料名称
			this.materialCode = ''; 		//物料简码
			this.selectUnit = []; 			//选中的单位
			this.typeValue = '';			//物料类型
			this.selectCategory = [];		//选择中的分类
			this.selectBrand = [];			//选择的品牌
			this.validityObj = {			//保质期
				time: '',
				type: 1,
			};
			this.dispiceArr.forEach(v=>{	//分销价
				v.value = '';
				v.unitId = '';
			});
		},
		initConvert(){
			this.convertUnit = {				//单位换算选择的单位
				defUnitId:'',
				defUnitName:'',
				minUnitId:'',
				minUnitName:'',
			};
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
					name: '继续新建',
					type:'2',
					className:'',
					fn:()=>{
						this.clickBtn('continue');
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



    	getEle(arr,val,attr){
			let temp = {};
			for(let ele of arr){
				if(ele[attr] == val){
					temp = ele;
					break;
				}
			}
			return temp;
        },
		alert(content,fn,title='提示信息',){
			this.$alert(content, title, {
				confirmButtonText: '确定',
				callback: action => {
					action = action == 'confirm' ? 'ok' :'cancel';
					if(typeof fn == 'function') fn(action);
				}
			});
		},
		//新建物料
		async MaterialAddMaterial(obj) {
			let res = await http.MaterialAddMaterial({
				data: obj
			});
			return res;
		},
		//获取分类列表
		async MaterialGetCategoryList() {
			let res = await http.MaterialGetCategoryList({
				data: {}
			});
			let temp = [];

			if(!Array.isArray(res)) res = [];
			temp = [...res];
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
		},
		//获取物料单位
		async MaterialGetUnitList() {
			let res = await http.MaterialGetUnitList({
				data: {}
			});
			if(Array.isArray(res)){
				this.units = res;
			}
		},
		//获取品牌
		async InvoicingBrandList() {
			let res = await http.InvoicingBrandList({
				data: {}
			});
			if(Array.isArray(res)){
				this.brandList = res;
			}
		},
		//获取分销价
		async getDistr() {
			if(!this.isBrand) return;
			
			let res = await http.invoicingGetDistributionConfig();
			if(!Array.isArray(res)){
				res = [];
			}
			res.forEach(v=>{
				let obj = {
					distributionId:v.id,
					name:v.name,
					value:'',				
					unitId:''					
				};
				this.dispiceArr.push(obj);
			});
		},
	},
	mounted() {
		this.initData();
		this.initConvert();
		this.initBtn();

		this.MaterialGetCategoryList();
		this.MaterialGetUnitList();
		this.InvoicingBrandList();
		this.getDistr();
	},
	components: {
		unitBrand: () =>
			import( /*webpackChunkName:'unit_brand_win'*/ './unit_brand_win'),
		addCategory: () =>
			import( /*webpackChunkName:'add_category_com'*/ 'src/components/add_category_com'),

	},
};
</script>
<style lang='less' scoped>

	.head{
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		max-width: 1436px;
		margin-top:20px;
		span{
			height:23px;
			line-height: 23px;
			border-left:2px solid #E1BB4A;
			padding-left:10px;
			padding-right:5px;
			flex-grow: 0;			
		}
		div{
			flex-grow: 1;
			border-bottom:2px dashed #ddd;
			height:13px;
		}
	}
	
	.el-in{
		width:240px;
	}
	.el-append{
		width:70px;
	}
	.required-no{
		&:after{
			position: relative;
			top: -8px;
			right: -2px;
			content: "*";
			visibility: hidden;
		}
	}
	.pt-20{
		padding-top:20px;
	}
	#material-create {
		.mixin(@color, @height, @size) {
			color: @color;
			height: @height;
			line-height: @height;
			font-size: @size;
		}
		.inline {
			margin-left: -3px;
			display: inline-block;
			vertical-align: middle;
		}
		.label-content {
			padding-bottom: 20px;
			.label {
				.mixin(#333, 40px, 14px);
				width: 115px;
				text-align: right;
				display: inline-block;
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
			.tips {
				margin-left: 10px;
			}
			.inline-box{
				display: inline-block;
				margin-right: 20px;
			}
			.input-box{
				display: inline-block;
				width: 240px;
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