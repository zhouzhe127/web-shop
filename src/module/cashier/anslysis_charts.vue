/**
 * @Author: zhengu.jiang
 * @Date: 2018-08-13 10:45:27 
 * @Last Modified by: zhengu.jiang
 * @Last Modified time: 2018-08-13 10:45:47
 * @Module:  收银分析 图表
 */

<template>
	<div id="charts-order">
		<div v-show="!loading" style="width: 128px;margin: 200px auto;">
			<img src="../../res/images/preloader.gif" />
		</div>

		<section v-show="loading" style="text-align: center;width:100%">
			<div style="height: 50px;border-bottom: 2px solid #ccc;">
				<div style="margin: 0 auto;">
					<span v-for="(item, index) in chartsTitle.list" :key="index" class="titleChart" v-bind:style="{'width': (100/chartsTitle.list.length) + '%'}">
						<span @click="changeTitlechart(index,item)" style="cursor: pointer;display: inline-block;" v-bind:class="{'one': index == chartsTitle.flag}">{{item.name}}</span>
					</span>
				</div>
			</div>
			<div ref="percent" v-if="flag == 1 || flag == 2 || flag == 3 || flag == 4" style="height: 400px;width:100%;min-width:700px"
			    id="chart"></div>
			<div ref="myflow" v-if="flag === 0" style="height: 400px;width:100%;min-width:700px" id="chart"></div>
			<div style="display: inline-block;margin: 0 auto;">
				<div class="hide" @click="chartShop(item)" v-for="(item, index) in ChartShopName" :key="index" style="height: 55px;width: auto;display: inline-block;margin-left: 10px;cursor: pointer;">
					<div :class="[item.className,{chactive:item.className}]" style="width: 15px;height: 15px;margin: 0 auto;border: 1px solid #69676F;border-radius: 3px;"></div>
					<div style="display: inline-block;height: 40px;line-height: 40px;">{{item.name}}</div>
				</div>
			</div>
			<div style="width: 750px;margin-bottom: 10px;">
				<div style="margin-bottom: 20px;display: inline-block;margin: 0 auto;">
					<span class="sel" v-for="(item,index) in buttonList.list" :key="index" v-bind:class="{'on': flag == index}" @click="light(index)">{{item.name}}</span>
				</div>
			</div>
            <el-table :header-cell-style="rowClass" :data="chartsPageList" :summary-method="getSummaries" show-summary border style="width: 100%;" :head-align="'center'" stripe>
                <el-table-column fixed label="时间" align="center" :show-overflow-tooltip="true" width="150px" style="text-align:center">
                    <template slot-scope="scope">
                        <ul>
                            <li v-if="typeFlag === 0" :style="{height: (scope.row.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;">
                                <p style="line-height: 30px;">{{timeTodate(scope.row.time)}}</p>
                                <p style="line-height: 10px;">{{timeToday(scope.row.time)}}</p>
                            </li>
                            <li v-if="typeFlag === 1" :style="{height: (scope.row.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;">
                                <p style="line-height: 30px;">{{timeToweek(scope.row.time)}}</p>
                                <p style="line-height: 10px;">{{weekTotime(scope.row.time)}}</p>
                            </li>
                            <li v-if="typeFlag === 2" :style="{height: (scope.row.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;">
                                <p style="line-height: 50px;">{{timeTodate(scope.row.time)}}</p>
                            </li>
                            <li v-if="typeFlag === 3" :style="{height: (scope.row.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;">
                                <p style="line-height: 30px;">{{timeToquarter(scope.row.time)}}</p>
                            </li>
                            <li v-if="typeFlag === 4" :style="{height: (scope.row.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;">
                                <p style="line-height: 50px;">{{timeToyear(scope.row.time)}}</p>
                            </li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column fixed align="center" label="店铺名称" width="200px">
                    <template slot-scope="scope" style="text-align:center">
                        <span v-for="(f,e) in scope.row.list" :key="e">
                            <span v-if="f.shopName" :class="{line: e != scope.row.list.length-1}" class="title" style="height: 50px;line-height:50px;display: inline-block;width: 100%;vertical-align: bottom">{{f.shopName}}</span>
                        </span>
                    </template>
                </el-table-column>
                <template v-for="(item,index) in chartsTitle.list">
                    <el-table-column :key="index+'list'" align="center" :prop="item.column" :label="item.name">
                        <template slot-scope="scope" style="text-align:center">
                            <span v-for="(f,e) in scope.row.list" :key="e">
                                <span :class="{line: e != scope.row.list.length-1}" class="title" style="height: 50px;line-height:50px;display: inline-block;width: 100%;vertical-align: bottom">
                                    <span v-if="flag != 3 && flag != 4">
                                        <i>{{f[item.column]}}</i>
                                        <i v-if="(flag == 1 || flag == 2) && item.column != 'orderNum' &&  item.column != 'goodsNum' &&  item.column != 'originalPrice'">%</i>
                                    </span>
                                    <span v-else>
                                        <span v-bind:class="{numGreen: f[item.column][1]<0,numRed: f[item.column][1]>0}" style="display: block;height: 10px;line-height: 30px;">{{f[item.column][1]}}</span>
                                        <span v-bind:class="{numRed: f[item.column][0]>0, numGreen: f[item.column][0]<0}">{{f[item.column][0]}}
                                            <span v-if="f[item.column][0] != '-'">%</span>
                                            <span v-if="f[item.column][0]<0 || f[item.column][1]<0">↓</span>
                                            <span v-if="f[item.column][0]>0 || f[item.column][1]>0">↑</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
            <div class="page-box">
                <el-pagination @current-change="pageChange" background :page-size="num" :current-page.sync="page" layout="total, prev, pager, next, jumper" :total="chartsOrder.length"></el-pagination>
            </div>
		</section>
	</div>

</template>

<script>
	import utils from 'src/verdor/utils';
	let echarts = null;
	export default {
		data() {
			return {
				chartsTitle: {
					flag: -1,
					list: []
				},
				chartsOrder: [], //表格数据
				chartsPageList: [],
				chartWidth: 0,
				chartIndex: 0,
				backList: false,
				chartTotalList: '', //图表表格总计
				page: 1,
				// num: 0,
				len: 0,
				total: 0,
				buttonList: {
					flag: 0,
					list: [{
						index: 0,
						name: '原表'
					},
					{
						index: 1,
						name: '占比'
					},
					{
						index: 2,
						name: '总占比'
					},
					{
						index: 3,
						name: '环比'
					},
					{
						index: 4,
						name: '同比'
					}]
				},
				ChartSelShop: [], //默认选中的三家店铺
				series: [], //图表折线数据
				selSeries: [], //保存的图表折线数据
				chartsHead: [], //表头
                titleList: [], //表格头部
                ChartShopName: [],
			};
		},
		props: {
			reportList: Object,//请求出来的数据
			loading: Boolean,
			// selOrderList: Array,
			headList: Array, //表头
			// totalList: Array, //总计
			typeFlag: Number, //报表日期类型
			selShopid: Array, //选中的门店
			chartFlag: Number,
			ChartShop: Array, //获取门店名称
			flag: Number, //报表类型
            chartType: Number, //选中的类型数据
            num: Number
		},
		watch: {
			chartFlag(val) {
                this.changeCtype(val);
			},
			reportList() {
                this.ChartShopName = this.ChartShop;
                this.ChartSelShop = this.ChartShop.slice(0, 3);
                this.chartsOrder = utils.deepCopy(this.reportList.list);
                this.pageChange(this.page);
                // this.getTitle(0);
				// this.dataList();
                this.getTitle(0);
                this.changeCtype(this.chartType);
			}
		},
		async mounted() {
			echarts = await import ( /*webpackChunkName: 'echarts'*/ 'src/verdor/echarts'),
            this.ChartShopName = this.ChartShop;
			// this.dataList();
			this.chartsHead = utils.deepCopy(this.headList);
            this.ChartSelShop = this.ChartShop.slice(0, 3);
            this.chartsOrder = utils.deepCopy(this.reportList.list);
            this.pageChange(this.page);
            this.getTitle(0);
			this.changeCtype(0);
		},
		methods: {
            rowClass(row){
				if(row.columnIndex != 0 & row.columnIndex != 1){
					return 'color: #28a8e0'
				}
			},
            //表格合计
			getSummaries(param) {
                let total = this.reportList.total;
				const { columns, data } = param;
				const sums = [];
				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = '';
						return;
					}
					if (index === 1){
						sums[index] = '合计';
						return;
					}
					for(let key in total){
						if(key == column.property){
							sums[index] = total[key];
						}
					}
				});

				return sums;
			},
            //获取图表表头
            getTitle(index){
                let list = this.headList;
				let title = [];
				for (let i = 0; i < list.length; i++) {
					let arr = {};
					if (index === 0 && (list[i].column == 'orderNum' || list[i].column == 'originalPrice' || list[i].column == 'price' ||
						list[i].column == 'paymentPrice')) {
                        title.push(list[i]);
					} else if (index == 1 && (list[i].name.indexOf('数量') > -1 && list[i].column != 'freeNum' && list[i].column !=
						'returnNum' || (list[i].column == 'goodsNum' || list[i].column == 'salesNum'))) {
                        title.push(list[i]);
					} else if (index == 2 && list[i].name.indexOf('金额') > -1 && list[i].column != 'discountPrice' && list[i].column !=
						'freePrice' && list[i].column != 'returnPrice') {
                        title.push(list[i]);
					} else if (index == 3 && (list[i].column == 'discountPrice' || list[i].column == 'freeNum' || list[i].column ==
						'freePrice')) {
                        title.push(list[i]);

					} else if (index == 4 && (list[i].column == 'returnNum' || list[i].column == 'returnPrice' || list[i].column ==
						'goodsNum' || list[i].column == 'originalPrice')) {
                        title.push(list[i]);

					} else if (index == 5 && (list[i].column == 'change' || list[i].column == 'bitPrice' || list[i].column ==
						'chargePrice' || list[i].column == 'profit' || list[i].column == 'originalPrice')) {
                        title.push(list[i]);

					} else if (index == 6 && (list[i].column == 'cash' || list[i].column == 'bank' || list[i].column == 'wx' || list[i]
						.column == 'ali' || list[i].column == 'vip' || list[i].column == 'zxwx' || list[i].column == 'zxali' || list[i].column ==
						'other' || list[i].column == 'price')) {
                        title.push(list[i]);

					}
                }
				return title;
            },
			//表格类型选择
			light(index) {
				this.buttonList.flag = index;
				this.$emit('search', index);
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
			//图表查看数据切换
			changeCtype(index) {
				this.chartIndex = 0;
				this.chartsTitle.list = this.getTitle(index);
				this.changeTitlechart(0, this.chartsTitle.list[0]);

				console.log(this.chartsTitle);
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
								this.selSeries[j].itemStyle.normal.lineStyle.color = 'red';
								this.selSeries[j].itemStyle.normal.color = 'red';
							}
						}
					}
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
			showEchart: function () {
				let selected = {};
				for (let m = 0; m < this.ChartShopName.length; m++) {
					selected[this.ChartShopName[m].name] = false;
				}
				for (let i = 0; i < this.selSeries.length; i++) {
					selected[this.selSeries[i].name] = true;
				}

                this.changeColor();
                let isok = false
				let myChart = echarts.init(this.$refs.myflow);
				let option = {
					tooltip: {
						trigger: 'axis',
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
			isString(obj) {
				return Object.prototype.toString.call(obj) === '[object String]';
			},
			showPercent: function () {
				let selected = {};
				for (let m = 0; m < this.ChartShopName.length; m++) {
					selected[this.ChartShopName[m].name] = false;
				}
				for (let i = 0; i < this.selSeries.length; i++) {
					selected[this.selSeries[i].name] = true;
				}
				//环比同比将data数据中'-'转为0
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
				let title = this.chartsTitle.list;
				//图表中订单量、消费金额、商品总数不用百分比表示
				if (this.flag == 1 || this.flag == 2) {
					if (title[this.chartsTitle.flag].column === 'orderNum' || title[this.chartsTitle.flag].column === 'originalPrice' ||
						title[this.chartsTitle.flag].column === 'goodsNum') {
						isok = 'isok';
					}
				}
                this.changeColor();
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
			//改变图表头部导航
			changeTitlechart: function (index, item) {
                this.chartsTitle.flag = index;
				this.getCharts(item.column);
				this.dataTime = this.dataTime.reverse();
				if (this.flag === 0) {
					this.showEchart();
				} else {
					this.showPercent();
				}
			},
			//判断该店铺在相同时间下是否有数据
			judgeShop: function (arr, name) {
				for (let i = 0; i < arr.length; i++) {
                    if(name == arr[i]['shopName']){
                        return i
                    }
				}
				return false;
			},
			//计算图表显示的数据方法
			chartDatas: function (...argus) {
                let [arr, name, dataObj, dataTime, titleName] = argus;
				for (let k = 0; k < name.length; k++) {
					dataObj[name[k].name] = [];
					for (let m = 0; m < arr.length; m++) {
						dataTime[m] = arr[m].time;
						let index = this.judgeShop(arr[m].list, name[k].name);
						if (this.judgeShop(arr[m].list, name[k].name) !== false) {
                            dataObj[name[k].name][m] = arr[m].list[index][titleName];
						} else {
							dataObj[name[k].name][m] = 0;
						}
					}
                }
                
			},
			getCharts: function (titleName) {
				let name = this.ChartShopName; //选中的店铺
				let dataObj = {}; //保存每个店铺每天的数据
				this.dataTime = [];
				// let dataTime = []; //保存X轴时间
                this.chartDatas(this.chartsOrder, name, dataObj, this.dataTime, titleName);
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
			//对列表进行分页
			toPage() {
				if (this.selShopid.length <= 3) {
					this.num = 8;
				} else if (this.selShopid.length > 3 && this.selShopid.length <= 5) {
					this.num = 5;
				} else if (this.selShopid.length > 5 && this.selShopid.length < 10) {
					this.num = 3;
				} else if (this.selShopid.length >= 10 && this.selShopid.length < 20) {
					this.num = 2;
				} else {
					this.num = 1;
				}
				this.page = 1;
				this.total = Math.ceil(this.chartsOrder.length / this.num);
				if (this.total < 10) {
					this.len = this.total;
				} else {
					this.len = 10;
				}
				if (this.page >= this.total) {
					this.page = this.total >= 0 ? this.total : 0;
				} else {
					this.page = this.page;
				}
				this.chartsPageList = this.chartsOrder.slice((this.page - 1) * this.num, (this.page - 1) * this.num + this.num);
			},
			//翻页
			pageChange(page) {
				this.chartsPageList = this.chartsOrder.slice((page - 1) * this.num, (page - 1) * this.num + this.num);
			},
			//时间戳转日期
			timeTodate: function (time) {
				let a = time.replace(/\//g, '-');
				return a;
			},
			timeToweek: function (time) {
				let a = time.split('/');
				return a[0] + '第' + a[1] + '周';
			},
			timeToquarter: function (time) {
				let a = time.split('/');
				return a[0] + '第' + a[1] + '季度';
			},
			timeToyear: function (time) {
				return time + '年度';
			},
			//周数转时间戳
			weekTotime: function (time) {
				let a = time.split('/');
				let week1 = ''; //全年第一周的时间
				let week2 = ''; //当前周数结束时间
				let week3 = ''; //当前周数开始时间
				if (new Date(a[0], 0, 1).getDay() == 1) {
					week1 = new Date(a[0], 0, 1).setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000;
					week2 = week1 - 24 * 3600 * 1000 + a[1] * 24 * 3600 * 1000 * 7 - 1000;
					week3 = week1 + (a[1] - 1) * 24 * 3600 * 1000 * 7 - 1000;
				} else if (new Date(a[0], 0, 1).getDay() > 1) {
					let total = 8 - new Date(a[0], 0, 1).getDay();
					week1 = (new Date(a[0], 0, 1).setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 * total);
					week2 = week1 + a[1] * 24 * 3600 * 1000 * 7 - 1000;
					week3 = week1 + (a[1] - 1) * 24 * 3600 * 1000 * 7;
				} else if (new Date(a[0], 0, 1).getDay() < 1) {
					week1 = (new Date(a[0], 0, 1).setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000);
					week2 = week1 + a[1] * 24 * 3600 * 1000 * 7 - 1000;
					week3 = week1 + (a[1] - 1) * 24 * 3600 * 1000 * 7;
				}
				let end = utils.format(new Date(week2), 'yyyy.MM.dd');
				let start = utils.format(new Date(week3), 'yyyy.MM.dd');
				return '(' + start + '~' + end + ')';
			},
			timeToday: function (time) {
				let a = time.split('/');
                let day = (new Date(a[0], a[1] - 1, a[2])).getDay();
                let arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
				return arr[day];
			},
		},
		components: {
			page: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table')
		}
	};
</script>
<style>
	#charts-order .el-table .cell{
		padding: 0;
	}
	#charts-order .el-table td{
		padding: 0;
	}
    #charts-order .el-table__body-wrapper{
        z-index: 1;
    }
</style>
<style lang="less" scoped>
	#charts-order {
		min-width: 700px;
		max-width: 1300px;
        position: relative;
        .line{
			border-bottom: 1px solid #ebeef5;
		}
		.page-box{
            margin-top: 20px;
            text-align: left;
		}
		.numGreen {
			color: #0EA59E;
		}
		.numRed {
			color: #FF3C04;
		}
		.titleChart {
			display: inline-block;
			text-align: center;
			line-height: 50px; // min-width: 100px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			.one {
				font-size: 16px;
				color: #f8941f;
				border-bottom: 3px solid #f8941f;
			}
		}
		.chyellow {
			background: #ffc801 url("../../res/icon/white_select.png") no-repeat center center;
		}
		.chblue {
			background: #1b88ee url("../../res/icon/white_select.png") no-repeat center center;
		}
		.chgreen {
			background: red url("../../res/icon/white_select.png") no-repeat center center;
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
		.on {
			background: #28a8e0;
			color: #fff;
		}
		.max {
			width: 1450px !important;
			min-width: 1450px !important;
		}
		.load {
			width: 128px;
			margin: 200px auto;
		}
		.main {
			border: 1px solid #ccc;
			height: auto;
			position: relative;
			box-shadow: 7px 7px 15px #ccc;
			ul {
				color: #333333;
				width: 100%;
				height: 50px;
				li {
					float: left;
					height: 50px;
					text-align: center;
					line-height: 50px;
				}
			}
			.total {
				height: 50px;
				line-height: 50px;
				padding-left: 20px;
				span {
					font-size: 18px;
				}
				.with {
					cursor: pointer;
					display: inline-block;
					text-align: center;
					width: 130px;
					height: 40px;
					background-color: #28a8e0;
					color: #fff;
					margin-top: 5px;
					line-height: 40px;
					margin-left: 10px;
				}
			}
			.aLeft {
				width: 450px;
				height: auto;
				float: left;
				position: absolute;
				left: 0;
				z-index: 5;
				.circle {
					width: 26px;
					height: 26px;
					border: 1px #c7c7c7 solid;
					border-radius: 50%;
					margin: 0 auto;
					margin-top: 15px;
					background: #fff;
				}
				.active {
					background: url(../../res/icon/selected.png) center center no-repeat, #28A8E0;
				}
			}
			.aRight {
				.title {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.width70 {
					width: 100px
				}
			}
		}
	}
</style>