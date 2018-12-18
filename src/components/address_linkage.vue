<!--省市区三级联动-->
<!--黄一帆-->
<template>
	<div class="address-linkage">
		<div class="inp-box" ref="addressBtn" @click="showMain">
			<input type="text"  placeholder="请选择地区" v-model="inputStr" :style="btnWidth" readonly="readonly"/>
			<em><i class="el-icon-arrow-down"></i></em>
		</div>
		<div class="main" v-show="addressShow" @click="stopProp">
			<em class="arrow"></em>
			<div class="tab select-ban" @click="tabClick">
				<span v-for="(item,index) in tabName" :key="index" :data-index="index"
					:class="{active:tabIndex == index}">{{item.name}}</span>
			</div>
			<div class="list" @click="chooseProvince" v-if="tabIndex == 0">
				<div class="item" v-for="(section,index) in provinceList" :key="index">
					<div class="sort">
						{{section.letter}}
					</div>
					<ul>
						<li data-code="" class="clear" v-if="index==0">清除</li>
						<li v-for="(item,index) in section.arr" 
							:key="index" :data-code="item.code" :class="{active:item.selected}">{{item.name}}</li>
					</ul>
				</div>
			</div>
			<div class="list" @click="chooseCity" v-if="tabIndex == 1">
				<div class="item" v-for="(section,index) in cityList" :key="index">
					<div class="sort">
						{{section.letter}}
					</div>
					<ul>
						<li data-code="" class="clear" v-if="index==0">清除</li>
						<li v-for="(item,index) in section.arr" 
							:key="index" :data-code="item.code" :class="{active:item.selected}">{{item.name}}</li>
					</ul>
				</div>
				<div class="empty" v-if="!cityList.length">请选择省份</div>
			</div>
			<div class="list" @click="chooseArea" v-if="tabIndex == 2">
				<div class="item" v-for="(section,index) in areaList" :key="index">
					<div class="sort">
						{{section.letter}}
					</div>
					<ul>
						<li data-code="" class="clear" v-if="index==0">清除</li>
						<li v-for="(item,index) in section.arr" 
							:key="index" :data-code="item.code" :class="{active:item.selected}">{{item.name}}</li>
					</ul>
				</div>
				<div class="empty" v-if="!areaList.length">请选择城市</div>
			</div>
		</div>
	</div>
</template>

<script>
let areaCn=null;
export default{
	props:['province','city','area','width'],
	data:function() {
		return{
			addressShow:false,
			tabIndex:0,//选中省市区 切换按钮
			provinceList:[],//省 列表
			cityList:[],//市 列表
			areaList:[],//区 列表
			provinceCode:'',
			cityCode:'',
			areaCode:'',
			provinceName:'',
			cityName:'',
			areaName:'',
			inputStr:'',//文本框显示
			tabName:[
				{name:'省份',show:true},
				{name:'城市',show:false},
				{name:'地区',show:false},
			],
			section:['A-G','H-K','L-S','T-Z'],//字母排序区间
			btnWidth:'width:150px',
		};
	},
	watch:{
		'province':'setDefault',
		'city':'setDefault',
		'area':'setDefault',
	},
	mounted(){
		this.btnWidth = this.width ? 'width:'+ (this.width-42)+'px;' : 'width:150px;';
		this.getAreaCn();
	},
	methods:{
		init(){
			this.getProvince();
			this.setDefault();//设置默认样式
		},
		close(event){//关闭弹框 同时移除document的click事件
			let banDom = this.$refs.addressBtn.getElementsByTagName('*'),
				isBan = true;
			for(let i=0;i<banDom.length;i++){
				if(event.target == banDom[i]) isBan = false;
			}
			if(isBan) this.hidePop();
		},
		showMain(){ //文本框点击事件 显示隐藏弹出层
			if(!this.addressShow){//打开
				this.showPop();
			}else{//关闭
				this.hidePop();
			}
		},
		showPop(){//显示弹出层
			this.addressShow = true;
			document.addEventListener('click',this.close);
		},
		hidePop(){//隐藏弹出层
			this.addressShow = false;
			document.removeEventListener('click',this.close);
		},
		stopProp(event){
			event.stopPropagation();
		},
		setDefault(){//组件加载时 默认选中
			let province = this.province ? parseInt(this.province) : '';
			let city = this.city ? parseInt(this.city) : '';
			let area = this.area ? parseInt(this.area) : '';
			if(province!==0 && province != this.provinceCode){
				this.setProvince(this.province);
			}
			if(city!==0 && city != this.cityCode){
				this.setCity(this.city);
			}
			if(area!==0 && area != this.areaCode){
				this.setArea(this.area);
			}
		},
		async getAreaCn(){
			let data = await import (/*webpackChunkName: 'area_cn'*/ 'src/verdor/area_cn'); 
			areaCn = data.default;
			this.init();
		},
		getProvince(){//获取 省
			this.provinceList = this.sort(areaCn.get1(),this.section);//获取省份列表 并排序
		},
		chooseProvince(event){//点击省份 获取 市
			let target = event.target;
			if(target.tagName.toLocaleLowerCase() == 'li'){
				this.clear('province');//清空之前的选择
				let code = target.getAttribute('data-code');
				let name = target.textContent;
				this.setProvince(code,name);
			}
		},
		chooseCity(event){//点击城市 获取 区
			let target = event.target;
			if(target.tagName.toLocaleLowerCase() == 'li'){
				this.clear('city');//清空之前的选择
				let code = target.getAttribute('data-code');
				let name = target.textContent;
				this.setCity(code,name);
			}
		},
		chooseArea(event){//点击选中区域
			let target = event.target;
			if(target.tagName.toLocaleLowerCase() == 'li'){
				let code = target.getAttribute('data-code');
				let name = target.textContent;
				this.setArea(code,name);
			}
		},
		setProvince(code,name){//对应 点击-省份
			if(code){
				this.provinceCode = code;
				this.provinceName = name ? name : areaCn.getNameByCode(code);
				this.cityList = this.sort(areaCn.get2(this.provinceCode),this.section);//获取城市列表 并排序
				this.tabIndex = 1;//切换到城市
			}else{
				this.clear('province');
				this.tabIndex = 0;//切换到省份
			}
			this.setClass(this.provinceList,code);//设置省份被选中地址高亮
		},
		setCity(code,name){//对应 点击-城市
			if(code){
				this.cityCode = code;
				this.cityName = name ? name : areaCn.getNameByCode(code);
				this.areaList = this.sort(areaCn.get3(this.cityCode),this.section);//获取区域列表 并排序
				this.tabIndex = 2;
			}else{
				this.clear('city');
				this.tabIndex = 1;//切换到城市
			}
			this.setClass(this.cityList,code);//设置城市被选中地址高亮
		},
		setArea(code,name){//对应 点击-区域
			if(code){
				this.areaCode = code;
				this.areaName = name ? name : areaCn.getNameByCode(code);
				this.addressShow = false;
			}
			this.setClass(this.areaList,code);//设置城市被选中地址高亮
		},
		tabClick(event){//省市区切换
			let target = event.target;
			if(target.tagName.toLocaleLowerCase() == 'span'){
				let index =  parseInt(target.getAttribute('data-index'));
				this.tabIndex = index;
			}
		},
		clear(type){//清空之前的选择
			if(type == 'province'){
				this.provinceCode = '',this.provinceName = '';
				this.cityCode = '',this.cityName = '',this.cityList = [];
				this.tabName[1].show = false,
				this.tabName[2].show = false;
			}else if(type == 'city'){
				this.cityCode = '',this.cityName = '';
				this.tabName[2].show = false;
			}
			this.areaList = [],this.areaCode = '',this.areaName = '';
		},
		setClass(arr,code){//设置选中样式
			for(let item of arr){
				for(let arrItem of item.arr){
					if(code == arrItem.code){
						arrItem.selected = true;
					}else{
						arrItem.selected = false;
					}
				}
			}
			this.setChoose();
		},
		setChoose(){//设置选中后的 显示 派发数据
			let cityName = this.cityName ? ' / ' + this.cityName : '';
			let areaName = this.areaName ? ' / ' + this.areaName : '';
			this.inputStr = this.provinceName + cityName + areaName;
			let obj = {
				province:this.provinceCode,
				city:this.cityCode,
				area:this.areaCode,
				provinceName:this.provinceName,
				cityName:this.cityName,
				areaName:this.areaName,
			};
			this.$emit('emit',obj);
		},
		sort(arr,section){//省市区 按字母排序 这里的arr是带数字的二维数组 配合area_cn使用
			let letters = '*abcdefghjklmnopqrstwxyz'.split('');
			let zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('');
				
			let sortArr = [];//按照字母排序的数组
			let sectionArr = [];//按照字母区间排序的数组
			letters.forEach((item1,index)=>{//字母排序
				let curr = {letter: item1, data:[]};
				arr.forEach((item2)=>{
					if((!zh[index-1] || zh[index-1].localeCompare(item2[1],'zh') <= 0) && item2[1].localeCompare(zh[index],'zh') == -1) {
						let obj = {code:item2[0],name:item2[1],selected:false};
						curr.data.push(obj);
					}
				});
				if(curr.data.length) {
					sortArr.push(curr);
				}
			});
			if(section || section.length){//区间排序
				section.forEach((item)=>{
					let strArr = item.split('-');
					let itemArr = [];//单个区间
					
					strArr.forEach((item,index)=>{//转小写
						strArr[index] = item.toLocaleLowerCase();
					});
					sortArr.forEach((item)=>{
						if(item.letter == strArr[0] || item.letter == strArr[1]){
							itemArr.push(...item.data);
						}
						if(item.letter.localeCompare(strArr[0]) == 1 && item.letter.localeCompare(strArr[1]) == -1){
							itemArr.push(...item.data);
						}
					});
					if(itemArr.length){
						let obj = {
							letter:item,
							arr:itemArr
						};
						sectionArr.push(obj);
					} 
				});
			}
			return sectionArr;
		}
	},
};
</script>

<style lang="less" >
	.address-linkage{display: inline-block;position: relative;
		.inp-box{display: inline-block;border: 1px solid #dcdfe6;overflow: hidden;vertical-align: middle;cursor: pointer;
			border-radius: 4px;
			input{width: 138px;height: 38px;line-height: 38px;padding-left: 10px;border: 0;float: left;cursor: pointer;}
			em{width: 40px;height: 38px;float: right;text-align: center;line-height: 38px;
				i {font-size: 14px;color: #c0c4cc;}
			}
		}
		.main{position: absolute;left: 0;top: 50px;z-index: 10;width: 300px;border: 1px solid #ebeef5;background: #fff;
			border-radius: 4px;box-shadow: 0 2px 12px #ddd;
			.arrow{
				position: absolute;left: 142px;top: -8px;height: 0;width: 0;
				border-bottom:8px solid #ebeef5;border-left:7px solid transparent;border-right:7px solid transparent;
				&:after{
					content: ' ';display: block;
					position: absolute;left: -7px;top: 1px;height: 0;width: 0;
					border-bottom:8px solid #fff;border-left:7px solid transparent;border-right:7px solid transparent;
				}
			}
			.tab{width: 100%;border-bottom: 1px solid #e4e7ed;
				height: 35px;position: relative;
				span{float: left;width: 33.33%;text-align: center;height: 35px;line-height: 35px;color: #606266;
					position: absolute;top: 0;left: 0;z-index: 2;
					border-right: 1px solid #e4e7ed;cursor: pointer;
					border-top-left-radius: 4px;
					&:nth-child(2){left: 33.33%;}
					&:nth-child(3){left: 66.66%;border-right: 0;border-top-right-radius: 4px;}
					&:hover{color: #E1BB4A;}
					transition: 0.2s all;
				}
				.active{color: #E1BB4A;background: #fff;}
			}
		}
		.list{padding: 10px 0;max-height: 300px;overflow: auto;
			.item{overflow: hidden;
				.sort{float: left;width: 20%;padding: 10px 0;text-align: center;font-weight: bold;color: #606266;}
				ul{float: left;width: 80%;
					li{float: left;text-align: center;padding: 10px 5px;color: #606266;cursor: pointer;
						&:hover{text-decoration: underline;}
					}
					li.active{color: #E1BB4A;}
					li.clear{color: #d34a2b;}
				}
			}
			.empty{height: 100px;line-height: 100px;text-align: center;font-size: 18px;color: #999;}
		}
	}
</style>