/**
 * @Author: zhengu.jiang
 * @Date: 2018-08-13 11:34:09 
 * @Last Modified by: zhengu.jiang
 * @Last Modified time: 2018-08-13 11:39:19
 * @Module: 分类报表--图表数据
 */

<template>
	<div id="category-charts">
		<section>
			<span class="sel" style="background-color: #FF9801;color: #fff;" @click="chooseGoods">选择样本数据</span>
			<span v-if="selGood.name" style="margin-left: 10px;font-size: 16px;">已选择：{{selGood.name}}</span>
		</section>
		<section style="text-align: center;">
			<div style="height: 50px;border-bottom: 2px solid #ccc;">
				<div style="margin: 0 auto;">
					<span v-for="(item, index) in headList" :key="index" class="titleChart" v-bind:style="{'width': (100/headList.length) + '%'}">
						<span @click="changeTitlechart(index,item)" style="cursor: pointer;display: inline-block;" v-bind:class="{'one': index == chartsTitle.flag}">{{item.name}}</span>
					</span>
				</div>
			</div>
			<div v-show="flag == 1 || flag == 2 || flag == 3 || flag == 4" style="height: 400px;width: 100%;" id="chart" ref='percent'></div>
			<div v-show="flag === 0" style="height: 400px;width: 100%;" id="chart" ref="myflow"></div>
			<div class="shops" v-if="ChartShopName.length != 0">
				<!-- <div class="hide" @click="chartShop(item)" v-for="(item, index) in ChartShopName" :key="index" style="height: 55px;width: auto;display: inline-block;margin-left: 10px;cursor: pointer;">
					<div :class="[item.className,{chactive:item.className}]" style="width: 15px;height: 15px;margin: 0 auto;border: 1px solid #69676F;border-radius: 3px;"></div>
					<div style="display: inline-block;height: 40px;line-height: 40px;">{{item.name}}</div>
				</div> -->
				<div>
					<div class="shops_list" v-if="ChartShopName.length >= 1">
						<div class="shopBox">
							<formShop v-if="showFormShop == 'yellow'" @chooseShop="getYellow" :isChart=true :shopId="yellow.id" :shopList="yellowShopList"></formShop>
						</div>
						<span class="yellowSign shops_sign"></span>
						<div class="select-body" @click="showShop('yellow')" @click.stop>
							<div class="select-body-btn">
								<span :title="yellow.name" class="text-ellipsis">{{yellow.name}}</span>
								<em><i></i></em>
							</div>
						</div>
						<!-- <span @click="showShop('yellow')" @click.stop style="display:inline-block;width:150px;height:30px;border:1px solid #ccc"></span> -->
						<!-- <selectBtn @emit="getYellow" :name="yellow.name" :sorts="yellowShopList.map(v=>v.name)"></selectBtn> -->
					</div>
					<div class="shops_list" v-if="ChartShopName.length >= 2">
						<span class="blueSign shops_sign"></span>
						<div class="select-body" @click="showShop('blue')" @click.stop>
							<div class="select-body-btn">
								<span :title="blue.name" class="text-ellipsis">{{blue.name}}</span>
								<em><i></i></em>
							</div>
						</div>
						<!-- <selectBtn @emit="getBlue" :name="blueName" :sorts="blueShopList.map(v=>v.name)"></selectBtn> -->
						<div class="shopBox">
							<formShop v-if="showFormShop == 'blue'" @chooseShop="getBlue" :isChart=true :shopId="blue.id" :shopList="blueShopList"></formShop>
						</div>
					</div>
					<div class="shops_list" v-if="ChartShopName.length >= 3">
						<span class="greenSign shops_sign"></span>
						<div class="select-body">
							<div class="select-body-btn" @click="showShop('green')" @click.stop>
								<span :title="green.name" class="text-ellipsis">{{green.name}}</span>
								<em><i></i></em>
							</div>
						</div>
						<!-- <selectBtn @emit="getGreen" :name="greenName" :sorts="greenShopList.map(v=>v.name)"></selectBtn> -->
						<div class="shopBox">
							<formShop v-if="showFormShop == 'green'" @chooseShop="getGreen" :isChart=true :shopId="green.id" :shopList="greenShopList"></formShop>
						</div>
					</div>
					<!-- <select-btn v-if="ChartShopName.length >= 1"></select-btn> -->
				</div>
			</div>
		</section>
		<addwin v-if="goods" @choose="getWin" :goods="selGood" :shop="shopList" :chooseShopList="chooseShopList"></addwin>
	</div>
</template>

<script>
	import utils from 'src/verdor/utils';
	let echarts = null;
	export default {
		data() {
			return {
				selGood: {
					id: '',
					type: '',
					name: '',
					shopList: []
				}, //选中样本数据
				chartsTitle: {
					flag: 0,
					list: []
				}, //图表数据导航列表
				series: [], //图表折线数据
				ChartShopName: [], //选中的店铺
				ChartSelShop: [], //默认选中的三家店铺
				goods: false, //选择样本数据弹框
				classification: [],
				yellowShopList: [],
				blueShopList: [],
				greenShopList: [],
				yellow: {
					id: '',
					name: ''
				},
				blue: {
					id: '',
					name: ''
				},
				green: {
					id: '',
					name: ''
				},
				showFormShop: '',//店铺选择弹窗
			};
		},
		props: [
			'formData', //数据列表
			'headList', // 图表选择列表
			'flag', // 报表类型
			'shopName', // 选中的店铺
			'buttonFlag', //查看数据类型
			'shopList', //所有的店铺列表
			'changeCharts',
			'chooseShopList', //选中的店铺集合
		],
		watch: {
			buttonFlag: function () {
				this.chartsTitle.flag = 0;
				this.changeTitlechart(this.chartsTitle.flag, this.headList[this.chartsTitle.flag]);
			},
			changeCharts: function () {
				this.init();
				this.chartsTitle.list = this.selGood;
				this.changeTitlechart(this.chartsTitle.flag, this.headList[this.chartsTitle.flag]);
				// this.changeTitlechart(this.chartsTitle.flag, this.headList[this.chartsTitle.flag]);
			}
		},
		created(){
			this.getShopname();
		},
		async mounted() {
			echarts = await
			import ( /*webpackChunkName: 'echarts'*/ 'src/verdor/echarts');
			this.init();
			document.addEventListener('click', this.show);
			//图表默认显示品牌店下第一个分类的数据
			// let oneData = utils.deepCopy(this.classification[0].shop[0].category);
			let oneData = utils.deepCopy(this.classification[0].shop[0]);
			for (let i = 0; i < oneData.length; i++) {
				if (oneData[i].categoryId && oneData[i].categoryId < 100000) {
					this.selGood.id = oneData[i].categoryId;
					this.selGood.type = 'cate';
					this.selGood.name = oneData[i].categoryName;
					this.selGood.cate = 'cate';
					break;
				}
			}
			// this.getShopname();
			// this.showDataChoose(0)
			this.chartsTitle.list = this.selGood;
			this.changeTitlechart(this.chartsTitle.flag, this.headList[this.chartsTitle.flag]);
		},
		methods: {
			show(){
				this.showFormShop = '';
			},
			init(){ 
				let obj = {'shopId': 'a','shopName': 'b','goodsNum':'c','num':'d','attrPrice':'e','freeNum':'f','freePrice':'g','returnNum': 'h','returnPrice':'i','discountPrice':'j','price':'k','totalPrice':'l','barCode':'m','secBarCode':'n','specifications':'o','unitPrice':'p','child':'q','goods':'r','categoryName':'t','categoryId':'u','gid': 'v','goodName': 'w'};
				this.classification = utils.deepCopy(this.formData);
				for(let i = 0; i < this.classification.length; i++){
					this.classification[i].shop = Object.values(this.classification[i].shop);
					let shop = this.classification[i].shop;
					for(let j = 0; j < shop.length; j++){
						shop[j] = Object.values(shop[j]);
						let cate = shop[j];
						for(let m = 0; m < cate.length; m++){
							cate[m].q = Object.values(cate[m].q);
							cate[m].r = Object.values(cate[m].r);
							for(let key in obj){
								if(key != 'gid' && key != 'goodsName'){
									cate[m][key] = cate[m][obj[key]];
									delete cate[m][obj[key]];
								}
							}
							let goods = cate[m].goods;
							let child = cate[m].child;
							for(let n = 0; n < child.length; n++){
								child[n].r = Object.values(child[n].r);
								for(let key in obj){
									if(key != 'gid' && key != 'goodsName'){
										child[n][key] = child[n][obj[key]];
										delete child[n][obj[key]];
									}
								}
								let childGoods = child[n].goods;
								for(let k = 0; k < childGoods.length; k++){
									for(let key in obj){
										if(key != 'gid' && key != 'goodsName' && key != 'categoryId' && key != 'categoryName' && key != 'child' && key != 'goods'){
											childGoods[k][key] = childGoods[k][obj[key]];
											delete childGoods[k][obj[key]];
										}
									}
								}
							}
							for(let n = 0; n < goods.length; n++){
								goods[n].goods = Object.values(goods[n]);
								for(let key in obj){
									goods[n][key] = goods[n][obj[key]];
									delete goods[n][obj[key]];
								}
							}
						}
					}
				}
			},
			//选择样本数据
			chooseGoods() {
				this.goods = !this.goods;
			},
			showShop(type){
				this.showFormShop = type;
			},
			getShopList(){
				this.yellowShopList = this.ChartShopName.filter(v=>v.className != 'chblue' && v.className != 'chgreen');
				this.blueShopList = this.ChartShopName.filter(v=>v.className != 'chyellow' && v.className != 'chgreen');
				this.greenShopList = this.ChartShopName.filter(v=>v.className != 'chblue' && v.className != 'chyellow');
			},
			getYellow(res){ 
				this.yellowShopList.forEach(v => {
					v.className = '';
					if(v.name == res.name){
						v.className = 'chyellow';
					}
				});
				this.yellow.name = res.name;
				this.yellow.id = res.id;
				this.getShopList();
				this.chartShops(res);
				this.showFormShop = '';
			},
			getBlue(res){
				this.blueShopList.forEach(v => {
					v.className = '';
					if(v.name == res.name){
						v.className = 'chblue';
					}
				});
				this.blue.name = res.name;
				this.blue.id = res.id;
				this.getShopList();
				this.chartShops(res);
				this.showFormShop = '';
			},
			getGreen(res){
				this.greenShopList.forEach(v => {
					v.className = '';
					if(v.name == res.name){
						v.className = 'chgreen';
					}
				});
				this.green.name = res.name;
				this.green.id = res.id;
				this.getShopList();
				this.chartShops(res);
				this.showFormShop = '';
			},
			//获取店铺名
			getShopname: function () {
				if (this.shopName != '请选择店铺') {
					// this.shopName = this.shopName.substring(0,this.shopName.length-1);
					// let list = this.shopName.split(',');
					let arr = [];
					// for (let i = 0; i < list.length; i++) {
					// 	let obj = {};
					// 	if (i === 0) {
					// 		obj.className = 'chyellow';
					// 		obj.name = list[i];
					// 	} else if (i === 1) {
					// 		obj.className = 'chblue';
					// 		obj.name = list[i];
					// 	} else if (i === 2) {
					// 		obj.className = 'chgreen';
					// 		obj.name = list[i];
					// 	} else {
					// 		obj.className = '';
					// 		obj.name = list[i];
					// 	}
					// 	arr.push(obj);
					// }
					for (let i = 0; i < this.chooseShopList.length; i++) {
						let obj = {};
						obj.name = this.chooseShopList[i].shopName;
						obj.id = this.chooseShopList[i].id;
						obj.ischain = this.chooseShopList[i].ischain;
						if (i === 0) {
							obj.className = 'chyellow';
							this.yellow.name = this.chooseShopList[i].shopName;
							this.yellow.id = this.chooseShopList[i].id;
						} else if (i === 1) {
							obj.className = 'chblue';
							this.blue.name = this.chooseShopList[i].shopName;
							this.blue.id = this.chooseShopList[i].id;
						} else if (i === 2) {
							obj.className = 'chgreen';
							this.green.name = this.chooseShopList[i].shopName;
							this.green.id = this.chooseShopList[i].id;
						} else {
							obj.className = '';
						}
						arr.push(obj);
					}
					this.ChartShopName = arr;
					this.ChartSelShop = arr.slice(0, 3);
				} else {
					this.shopName = '请选择店铺';
				}
				this.getShopList();
			},
			getColor: function (arr, color) {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].className == color) {
						return false;
					}
				}
				return true;
			},
			//图表所选店铺小于3个时的公用方法
			chartColor: function (name, color) {
				for (let i = 0; i < this.series.length; i++) {
					if (this.series[i].name == name) {
						this.selSeries.push(this.series[i]);
						for (let j = 0; j < this.ChartShopName.length; j++) {
							if (name == this.ChartShopName[j].name) {
								this.ChartSelShop.push(this.ChartShopName[j]);
							}
						}
					}
				}
				for (let j = 0; j < this.ChartShopName.length; j++) {
					if (name == this.ChartShopName[j].name) {
						this.ChartShopName[j].className = color;
					}
				}
			},
			chartShops(item){
				this.ChartSelShop.forEach((v,index) => {
					if(v.className == '') this.ChartSelShop.splice(index,1);
				});
				this.ChartSelShop.push(item);
				this.selSeries = [];
				for (let i = 0; i < this.ChartSelShop.length; i++) {
					for (let j = 0; j < this.series.length; j++) {
						if (this.ChartSelShop[i].name == this.series[j].name) {
							this.selSeries.push(this.series[j]);
						}
					}
				}
				if (this.flag === 0) {
					this.showEchart();
				} else {
					this.showPercent();
				}
			},
			//图表选择店铺
			chartShop: function (item) {
				if (item.className) {
					for (let i = 0; i < this.selSeries.length; i++) {
						if (this.selSeries[i].name == item.name) {
							this.selSeries.splice(i, 1);
						}
					}
					for (let m = 0; m < this.ChartSelShop.length; m++) {
						if (this.ChartSelShop[m].name == item.name) {
							this.ChartSelShop.splice(m, 1);
						}
					}
					for (let j = 0; j < this.ChartShopName.length; j++) {
						if (item.name == this.ChartShopName[j].name) {
							this.ChartShopName[j].className = '';
						}
					}

				} else {
					if (this.selSeries.length == 3) {
						let ChartShopName = utils.deepCopy(this.ChartShopName);
						let ChartSelShop = utils.deepCopy(this.ChartSelShop);
						let cname = ChartSelShop[0].className;
						for (let j = 0; j < ChartShopName.length; j++) {
							if (ChartSelShop[0].name === ChartShopName[j].name) {
								ChartShopName[j].className = '';
							}
						}
						for (let i = 0; i < ChartShopName.length; i++) {
							if (item.name === ChartShopName[i].name) {
								ChartShopName[i].className = cname;
								ChartSelShop = ChartSelShop.splice(1, 3);
								ChartSelShop.push(ChartShopName[i]);
							}
						}
						this.ChartSelShop = ChartSelShop;
						this.ChartShopName = ChartShopName;
						this.selSeries = [];
						for (let i = 0; i < this.ChartSelShop.length; i++) {
							for (let j = 0; j < this.series.length; j++) {
								if (this.ChartSelShop[i].name == this.series[j].name) {
									this.selSeries.push(this.series[j]);
								}
							}
						}
					} else {
						if (this.getColor(this.ChartShopName, 'chyellow')) {
							this.chartColor(item.name, 'chyellow');
						} else if (this.getColor(this.ChartShopName, 'chblue')) {
							this.chartColor(item.name, 'chblue');
						} else if (this.getColor(this.ChartShopName, 'chgreen')) {
							this.chartColor(item.name, 'chgreen');
						}
					}

				}
				if (this.flag === 0) {
					this.showEchart();
				} else {
					this.showPercent();
				}
			},
			//改变图表头部导航
			changeTitlechart: function (index, item) {
				this.chartsTitle.flag = index;
				this.getCharts(item.type);
				this.dataTime = this.dataTime.reverse();
				if (this.flag === 0) {
					this.showEchart();
				} else {
					this.showPercent();
				}
			},
			//找出该店铺下选择的样本数据对应的每天数据
			//titleName表示需要看的数据 如：'商品总数'，'销量'
			//item表示选中的样本数据类型和名称
			judgeShop: function (...argus) {
				let [arr, item, titleName] = argus;
				for (let i = 0; i < arr.length; i++) {
					if (item.type == 'cate') { //样本数据选中的是分类
						if (arr[i].categoryName == item.name) { //如果一级分类 直接返回
							return arr[i][titleName];
						}
						for (let j = 0; j < arr[i].child.length; j++) { //选中的是二级分类
							if (arr[i].child[j].categoryName == item.name) {
								return arr[i].child[j][titleName];
							}
						}
					} else if (item.type == 'goods') { //样本数据选中的是商品
						for (let e = 0; e < arr[i].goods.length; e++) { //选中的是一级分类下的商品
							if (arr[i].goods[e].goodName == item.name) {
								return arr[i].goods[e][titleName];
							}
						}
						for (let f = 0; f < arr[i].child.length; f++) { //选中的是二级分类下的商品
							for (let g = 0; g < arr[i].child[f].goods.length; g++) {
								if (arr[i].child[f].goods[g].goodName == item.name) {
									return arr[i].child[f].goods[g][titleName];
								}
							}
						}
					} else if (item.type == 'package') { //选中的是套餐
						for (let e = 0; e < arr[i].goods.length; e++) {
							if (arr[i].goods[e].goodName == item.name) {
								return arr[i].goods[e][titleName];
							}
						}
					}
				}
			},
			//判断门店在某一天是否有数据
			isShopData: function (name, shop) {
				for (let j = 0; j < shop.length; j++) {
					if (name == shop[j][0].shopName) {
						return true;
					}
				}
				return false;
			},
			//计算图表显示的数据方法
			chartDatas: function (...argus) {
				let [arr, name, dataObj, dataTime, item, titleName] = argus;
				for (let k = 0; k < name.length; k++) {
					dataObj[name[k].name] = [];
					for (let m = 0; m < arr.length; m++) {
						dataTime[m] = arr[m].time;
						for (let n = 0; n < arr[m].shop.length; n++) {
							if (!this.isShopData(name[k].name, arr[m].shop)) {
								dataObj[name[k].name][m] = 0;
							} else {
								if (name[k].name == arr[m].shop[n][0].shopName) {
									dataObj[name[k].name][m] = this.judgeShop(arr[m].shop[n], item, titleName);
								}
							}
						}
					}
				}
			},
			getCharts: function (titleName) {
				let name = this.ChartShopName; //选中的店铺
				let dataObj = {}; //保存每个店铺每天的数据
				this.dataTime = []; //保存X轴时间
				//获取图表显示的数据
				this.chartDatas(this.classification, name, dataObj, this.dataTime, this.selGood, titleName);
				this.series = [];
				for (let a = 0; a < name.length; a++) {
					this.series[a] = {};
					for (let key in dataObj) {
						if (name[a].name == key) {
							this.series[a].name = name[a].name;
							this.series[a].data = dataObj[key];
							if (this.flag === 0) {
								this.series[a].type = 'line';
							} else {
								this.series[a].type = 'bar';
							}

						}
					}
				}
				if (this.flag == 3 || this.flag == 4) {
					for (let i = 0; i < this.series.length; i++) {
						for (let j = 0; j < this.series[i].data.length; j++) {
							// if (this.series[i].data[j] == 0) {
							// } else 
							if (this.series[i].data[j][0] == '-') {
								this.series[i].data[j] = 0;
							} else if (this.series[i].data[j] == 0) {
								this.series[i].data[j] = 0;
							} else {
								this.series[i].data[j] = this.series[i].data[j][0];
							}
						}
					}
				}
				this.selSeries = [];
				for (let j = 0; j < this.series.length; j++) {
					this.series[j].data.reverse();
				}
				for (let i = 0; i < this.ChartSelShop.length; i++) {
					for (let j = 0; j < this.series.length; j++) {
						if (this.ChartSelShop[i].name == this.series[j].name) {
							this.selSeries.push(this.series[j]);
						}
					}
				}
			},
			//设置图表显示的颜色
			changeColor: function () {
				for (let j = 0; j < this.selSeries.length; j++) {
					let itemStyle = {
						normal: {
							lineStyle: {
								color: '#00FF00'
							}
						}
					};
					this.selSeries[j].itemStyle = itemStyle;
					for (let i = 0; i < this.ChartShopName.length; i++) {
						if (this.selSeries[j].name == this.ChartShopName[i].name) {
							if (this.ChartShopName[i].className == 'chyellow') {
								this.selSeries[j].itemStyle.normal.lineStyle.color = '#ffc801';
								this.selSeries[j].itemStyle.normal.color = '#ffc801';
							} else if (this.ChartShopName[i].className == 'chblue') {
								this.selSeries[j].itemStyle.normal.lineStyle.color = '#1b88ee';
								this.selSeries[j].itemStyle.normal.color = '#1b88ee';
							} else if (this.ChartShopName[i].className == 'chgreen') {
								this.selSeries[j].itemStyle.normal.lineStyle.color = '#5eb71c';
								this.selSeries[j].itemStyle.normal.color = '#5eb71c';
							}
						}
					}
				}
			},
			showEchart: function () {
				let selected = {};
				for (let m = 0; m < this.ChartShopName.length; m++) {
					selected[this.ChartShopName[m].name] = false;
				}
				for (let i = 0; i < this.selSeries.length; i++) {
					selected[this.selSeries[i].name] = true;
				}
				let myChart = echarts.init(this.$refs.myflow);
				//在相同时间下，有些店铺没有数据位null，将其转为0；
				for (let k = 0; k < this.selSeries.length; k++) {
					for (let j = 0; j < this.selSeries[k].data.length; j++) {
						if (this.selSeries[k].data[j] === undefined) {
							this.selSeries[k].data[j] = 0;
						}
					}
				}
				this.changeColor();
				let option = {
					tooltip: {
						trigger: 'axis',
						textStyle: {
							align: 'left'
						}
						// formatter: function (params) {
						// 	let relVal = params[0].name + '<br/>';
						// 	if (params.length == 1) {
						// 		relVal += params[0].seriesName + ' : ' + params[0].value;
						// 	} else if (params.length == 2) {
						// 		relVal += params[0].seriesName + ' : ' + params[0].value + '<br/>';
						// 		relVal += params[1].seriesName + ' : ' + params[1].value;
						// 	} else {
						// 		relVal += params[0].seriesName + ' : ' + params[0].value + '<br/>';
						// 		relVal += params[1].seriesName + ' : ' + params[1].value + '<br/>';
						// 		relVal += params[2].seriesName + ' : ' + params[2].value;
						// 	}
						// 	return relVal;
						// },
					},
					legend: {
						selected: selected
					},
					toolbox: {
						show: true,
						x: '1100',
						feature: {
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: true,
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: this.dataTime
					}],
					yAxis: [{
						type: 'value'
					}],
					series: this.selSeries
				};
				myChart.setOption(option, true);
			},
			showPercent: function () {
				let selected = {};
				for (let m = 0; m < this.ChartShopName.length; m++) {
					selected[this.ChartShopName[m].name] = false;
				}
				for (let i = 0; i < this.selSeries.length; i++) {
					selected[this.selSeries[i].name] = true;
				}
				//总占比中 将百分号移除
				for (let m = 0; m < this.selSeries.length; m++) {
					for (let n = 0; n < this.selSeries[m].data.length; n++) {
						if (this.isString(this.selSeries[m].data[n])) {
							this.selSeries[m].data[n] = this.selSeries[m].data[n].replace('%', '');
						}
					}
				}
				let myChart = echarts.init(this.$refs.percent);
				for (let i = 0; i < this.selSeries.length; i++) {
					this.selSeries[i].barGap = '1%';
				}
				let isok = '';
				let name = this.chartsTitle.list;
				//图表中订单量、消费金额、商品总数不用百分比表示
				if (this.flag == 1 || this.flag == 2) {
					if (name[this.chartsTitle.flag].name === 'orderNum') {
						isok = 'isok';
					}
				}
				//在相同时间下，有些店铺没有数据位null，将其转为0；
				for (let k = 0; k < this.selSeries.length; k++) {
					for (let j = 0; j < this.selSeries[k].data.length; j++) {
						if (this.selSeries[k].data[j] === undefined) {
							this.selSeries[k].data[j] = 0;
						}
					}
				}
				let option = {
					tooltip: {
						trigger: 'axis',
						formatter: isok ? '' : function (params) {
							let relVal = params[0].name + '<br/>';
							if (params.length == 1) {
								relVal += params[0].seriesName + ' : ' + params[0].value + '%';
							} else if (params.length == 2) {
								relVal += params[0].seriesName + ' : ' + params[0].value + '%' + '<br/>';
								relVal += params[1].seriesName + ' : ' + params[1].value + '%';
							} else {
								relVal += params[0].seriesName + ' : ' + params[0].value + '%' + '<br/>';
								relVal += params[1].seriesName + ' : ' + params[1].value + '%' + '<br/>';
								relVal += params[2].seriesName + ' : ' + params[2].value + '%';
							}
							return relVal;
						},
					},
					legend: {
						selected: selected
					},
					toolbox: {
						show: true,
						x: '1100',
						feature: {
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: true,
					xAxis: [{
						type: 'category',
						data: this.dataTime
					}],
					yAxis: [{
						type: 'value',
						name: isok ? '' : '单位: %',
					}],
					series: this.selSeries
				};
				myChart.setOption(option, true);
			},
			isString(obj) {
				return Object.prototype.toString.call(obj) === '[object String]';
			},
			getWin(res, data, shopList) {
				this.goods = false;
				if (res == 'ok') {
					if (data.id >= 100000 && data.name.indexOf(shopList.shopName) == -1) {
						data.name += '(' + shopList.shopName + ')';
					}
					this.selGood = data;
					this.selGood.shopList = shopList;
					this.changeTitlechart(this.chartsTitle.flag, this.headList[this.chartsTitle.flag]);
				}
			}
		},
		destroyed(){
			document.removeEventListener('click', this.show);
		},
		components: {
			addwin: () =>
				import ( /*webpackChunkName: 'category_win'*/ './category_win'),
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			formShop: () =>
				import ( /*webpackChunkName: 'form_shop'*/ './form_shop')
		}
	};
</script>

<style lang="less" scoped>
	#category-charts {
		max-width: 1450px;
		.shops{
			display: inline-block;
			margin: 0 auto;
			.shops_list{
				display: inline-block;
				margin-right: 20px;
				vertical-align: middle;
				position: relative;
				.shopBox{
					height: 0;
					margin-left: -350px;
					position: absolute;
					left: 100px;
					top: -350px;
				}
				.shops_sign{
					display: inline-block;
					width: 10px;
					height: 10px;
					border-radius: 10px;
					margin-right: 10px;
				}
				.yellowSign{
					background: #ffc801;
				}
				.blueSign{
					background: #1b88ee;
				}
				.greenSign{
					background: #5eb71c;
				}
				.select-body{
					position: relative;display: inline-block;line-height: normal;
					.select-body-btn {
						vertical-align: middle;display: inline-block;border: #b3b3b3 solid 1px;overflow: hidden;cursor: pointer;
						em{width: 40px;height: 38px;float: right;text-align: center;line-height: 38px;border-left: 1px solid #ccc;
							i {height: 10px;width: 10px;display: inline-block;
								border-top: 10px solid #b3b3b3;border-left: 5px solid transparent;border-right: 5px solid transparent;box-sizing: border-box;
							}
						}
						span {
							width: 150px;height: 38px;line-height: 38px;
							text-align: center;color: #666666;float: left;
						}
					}
				}
			}
		}
		.titleChart {
			display: inline-block;
			text-align: center;
			line-height: 50px;
		}
		.sel {
			display: inline-block;
			width: 135px;
			height: 40px;
			font-size: 16px;
			background: #f2f2f2;
			border-radius: 3px;
			text-align: center;
			line-height: 40px;
			cursor: pointer;
			margin-right: 10px;
		}
		.one {
			font-size: 16px;
			color: #f8941f;
			border-bottom: 3px solid #f8941f;
		}
		.chyellow {
			background: #ffc801 url("../../res/icon/white_select.png") no-repeat center center;
		}
		.chblue {
			background: #1b88ee url("../../res/icon/white_select.png") no-repeat center center;
		}
		.chgreen {
			background: #5eb71c url("../../res/icon/white_select.png") no-repeat center center;
		}
		.chactive {
			border: none !important;
		}
		.numGreen {
			color: #0EA59E;
		}
		.numRed {
			color: #FF3C04;
		}
		.numGreen {
			color: #0EA59E;
		}
		.numRed {
			color: #FF3C04;
		}
	}
</style>