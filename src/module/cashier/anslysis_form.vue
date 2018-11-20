/**
 * @Author: zhengu.jiang
 * @Date: 2018-08-13 10:45:55 
 * @Last Modified by: 孔伟研
 * @Last Modified time: 2018-11-14 16:41:49
 * @Module: 收银分析表格
 */

<template>
	<div id="report-order">
		<!-- <div class="load" v-if="!loading" style="width: 128px;margin: 200px auto;">
			<img src="../../res/images/preloader.gif" />
		</div> -->
		<!-- <section v-else class="main" :style="{'width': (showWidth*1+400*1)+'px','min-width': (showWidth*1+400*1)+'px'}" :class="{'max': (showWidth*1+450*1)>1350}" style="height: auto;position: relative;box-shadow: 7px 7px 15px #ccc;"> -->
		<section class="main" style="width: 100%;border-color:#ebeef5;border-bottom:none">
			<div class="total">
				<span>收银分析·共
					<span style="color: #FE3D04;padding: 0 5px;">{{reportList.list.length}}</span>条记录</span>
				<span class="with" @click="contrast">选择固定对比</span>
			</div>
		</section>
		<el-table :data="orderPageList" :header-cell-style="rowClass" :summary-method="getSummaries" show-summary border style="width: 100%;" :head-align="'center'" stripe>
			<el-table-column :render-header="renderHeader" fixed label="全选" align="center" :show-overflow-tooltip="true" width="50px" style="text-align:center">
				<template slot-scope="scope">
					<ul>
						<li class="aLi" v-on:click="selected(scope.row,scope.$index)" style="cursor: pointer;">
							<div class="circle" :class="{ 'active': scope.row.selected}"></div>
						</li>
					</ul>
				</template>
			</el-table-column>
			<el-table-column fixed label="时间" align="center" :show-overflow-tooltip="true" width="150px" style="text-align:center">
				<template slot-scope="scope">
					<ul>
						<li v-if="selectedType === 0" :style="{height: (scope.row.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;">
							<p style="line-height: 30px;">{{timeTodate(scope.row.time)}}</p>
							<p style="line-height: 10px;">{{timeToday(scope.row.time)}}</p>
						</li>
						<li v-if="selectedType === 1" :style="{height: (scope.row.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;">
							<p style="line-height: 30px;">{{timeToweek(scope.row.time)}}</p>
							<p style="line-height: 10px;">{{weekTotime(scope.row.time)}}</p>
						</li>
						<li v-if="selectedType === 2" :style="{height: (scope.row.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;">
							<p style="line-height: 50px;">{{timeTodate(scope.row.time)}}</p>
						</li>
						<li v-if="selectedType === 3" :style="{height: (scope.row.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;">
							<p style="line-height: 30px;">{{timeToquarter(scope.row.time)}}</p>
						</li>
						<li v-if="selectedType === 4" :style="{height: (scope.row.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;">
							<p style="line-height: 50px;">{{timeToyear(scope.row.time)}}</p>
						</li>
					</ul>
				</template>
			</el-table-column>
			<el-table-column fixed align="center" label="店铺名称" width="150px">
				<template slot-scope="scope" style="text-align:center">
					<span v-for="(f,e) in scope.row.list" :key="e">
						<span v-if="f.shopName" :class="{line: e != scope.row.list.length-1}" class="title" style="height: 50px;line-height:50px;display: inline-block;width: 100%;vertical-align: bottom">{{f.shopName}}</span>
					</span>
				</template>
			</el-table-column>
			<template v-for="(item,index) in selHead">
				<el-table-column v-if="item.selected" :key="index+'list'" align="center" width="120px" :prop="item.column" :label="item.name">
					<template slot-scope="scope" style="text-align:center">
						<span v-for="(f,e) in scope.row.list" :key="e">
							<span :class="{line: e != scope.row.list.length-1}" class="title" style="height: 50px;line-height:50px;display: inline-block;width: 100%;vertical-align: bottom">
								<span v-if="flag != 3 && flag != 4">
									<i>{{f[item.column]}}</i>
									<i v-if="(flag == 1 || flag == 2) && item.column != 'orderNum' &&  item.column != 'goodsNum' &&
									item.column != 'originalPrice' && item.column != 'vouchersCash' && item.column != 'vouchersNum' && item.column != 'paidIn'">%</i>
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
			<el-pagination @current-change="pageChange" background :page-size="num" :current-page.sync="page" layout="total, prev, pager, next, jumper" :total="saveReportList.length"></el-pagination>
		</div>
		<!-- <section class="main" :class="{'max': (showWidth*1+450*1)>1350}" style="height: auto;position: relative;">
			<div class="total">
				<span>收银分析·共
					<span style="color: #FE3D04;padding: 0 5px;">{{orderList.length}}</span>条记录</span>
				<span class="with" @click="contrast">选择固定对比</span>
			</div>
			<section v-if="orderList.length > 0">
				<div class="aLeft">
					<div style="width:100%;height: auto;">
						<ul class="aUl" style="background-color: #e6e6e6;">
							<li @click="selected()" class="aLi" style="width: 50px;color: #28a8e0;cursor: pointer;">全选</li>
							<li class="aLi" style="width: 200px;">时间</li>
							<li class="aLi" style="width: 150px;">店铺名称</li>
						</ul>
						<section style="width:100%;height: auto;">
							<ul class="aUl" style="background-color: #f2f2f2;" v-if="orderList.length == 0">
								<li class="aLi" style="width: 400px;"></li>
							</ul>
							<ul :style="{height: (item.list.length * 50) + 'px'}" class="aUl" v-for='(item,index) in orderPageList' :key="index" style="color: #333333;overflow: hidden;width:100%;border-bottom: 1px solid #ccc;background-color: #fff;">
								<li :style="{height: (item.list.length * 50) + 'px'}" class="aLi" v-on:click="selected(item,index)" style="cursor: pointer;width:50px;">
									<div class="circle" :class="{ 'active': item.selected}"></div>
								</li>
								<li v-if="selectedType === 0" :style="{height: (item.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;width:200px;">
									<p style="line-height: 30px;">{{timeTodate(item.time)}}</p>
									<p style="line-height: 10px;">{{timeToday(item.time)}}</p>
								</li>
								<li v-if="selectedType === 1" :style="{height: (item.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;width:200px;">
									<p style="line-height: 30px;">{{timeToweek(item.time)}}</p>
									<p style="line-height: 10px;">{{weekTotime(item.time)}}</p>
								</li>
								<li v-if="selectedType === 2" :style="{height: (item.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;width:200px;">
									<p style="line-height: 50px;">{{timeTodate(item.time)}}</p>
								</li>
								<li v-if="selectedType === 3" :style="{height: (item.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;width:200px;">
									<p style="line-height: 30px;">{{timeToquarter(item.time)}}</p>
								</li>
								<li v-if="selectedType === 4" :style="{height: (item.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;width:200px;">
									<p style="line-height: 50px;">{{timeToyear(item.time)}}</p>
								</li>
								<li :style="{height: (item.list.length * 50) + 'px'}" class="aLi" style="cursor: pointer;width:150px;">
									<span v-for="(f,e) in item.list" :key="e">
										<span v-if="n.name" v-for="(n,m) in f" :key="m" class="title" style="height: 50px;display: inline-block;width: 100%;border-bottom: 1px solid #ccc;vertical-align: bottom">{{n.name}}</span>
									</span>

								</li>
							</ul>
						</section>
						<ul class="aUl" style="background-color: #e6e6e6;">
							<li class="aLi" style="width: 50px;"></li>
							<li class="aLi" style="width: 200px;"></li>
							<li v-if="!backList" class="aLi" style="width: 150px;font-weight: 700;">合计</li>
						</ul>
					</div>
				</div>
				<div class="aRight" style="width:100%;height: auto;padding-left: 400px;overflow: auto;overflow-x: scroll">
					<section v-bind:style="{width:showWidth + 'px'}">
						<ul style="color: #333333;width:100%;background: #e6e6e6;" v-bind:style="{width:showWidth + 'px'}" class="first">
							<li style="color: #28A8E0;" :title=item.name v-if="item.selected" v-for="(item,index) in selHead" :key="index" class="width70 title">{{item.name}}</li>
						</ul>
						<template v-if='orderList.length > 0'>
							<template v-for='item in orderPageList'>
								<ul v-for="a in item.list" :key="a.num" style="color: #333333;overflow: hidden;width:100%;border-bottom: 1px solid #ccc;"
									v-bind:style="{width:showWidth + 'px'}" class="order-content-show detialList">

									<li class="width70 title" v-if="c.selected && flag === 0" v-for="(c,e) in a" :key="e">{{c.num}}</li>
									<li class="width70 title" v-if="c.selected && (flag == 1 || flag == 2)" v-for="(c,f) in a" :key="f">
										{{c.num}}
										<span v-if="!c.orderNum && !c.goodsNum && !c.originalPrice">%</span>
									</li>
									<li class="width70 title" v-if="c.selected && (flag == 3 || flag == 4)" v-for="(c,g) in a" :key="g">
										<span v-bind:class="{numGreen: c.num[1]<0,numRed: c.num[1]>0}" style="display: block;height: 10px;line-height: 30px;">{{c.num[1]}}</span>
										<span v-bind:class="{numRed: c.num[0]>0, numGreen: c.num[0]<0}">{{c.num[0]}}
											<span v-if="c.num[0] != '-'">%</span>
											<span v-if="c.num[0]<0 || c.num[1]<0">↓</span>
											<span v-if="c.num[0]>0 || c.num[1]>0">↑</span>
										</span>
									</li>
								</ul>
							</template>
						</template>
						<ul v-else v-bind:style="{width:showWidth + 'px'}">
							<li style="width: 100%;background-color: #F2F2F2;color: #F8931F;">没有订单</li>
						</ul>
						<ul style="color: #333333;width:100%;overflow: hidden;background: #e6e6e6;" v-bind:style="{width:showWidth + 'px'}" class="first">
							<li v-if="!backList && item.selected" class="width70 title" v-for="(item,index) in totalList" :key="index">{{item.num}}</li>
						</ul>
					</section>

				</div>
			</section>
			<section v-else style="border-top: 1px solid #ccc;height: 200px;text-align: center;line-height: 200px;font-size: 24px;color: #B3B3B3;">
				-暂无数据-
			</section>

		</section> -->
		<!-- <page v-if="total > 1 && loading" @pageNum="pageChange" :page="page" :total='total' :isNoJump='true' :isNoPaging='true' style="margin-top: 20px;margin-bottom: 50px;float: left;position: relative;width: 100%;"></page> -->
	</div>
</template>

<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			totalList: [], //总计
			selTotalList: [], //保存的原始总计数据
			orderList: [], //表格数据
			orderPageList: [],
			total: 0, // 总页数
			len: 0, // 总记录条数
			// num: 0, // 当前每页展示数量
			page: 1, //当前第几页
			backList: false,
			showWidth: 0,
			titleList: [], //表格头部
			list: [],
			saveReportList: [], //列表数据
			selOrderList: [] //保存的原始表格数据
		};
	},
	props: [
		'width',
		'loading',
		'reportList',
		'headList',
		'selShopid',
		'selectedType',
		'selHead',
		'flag',
		'isBack',
		'isChange',
		'exportIndex',
		'shopId',
		'num'
	],
	mounted() {
		console.log(this.selHead);
		this.showWidth = this.width;
		// this.dataList();
		// let reportList = utils.deepCopy(this.reportList.list);
		// this.enterHead(this.selHead, 'ok');
	},
	watch: {
		reportList: function() {
			// if(this.reportList.length == 0){
			// 	return false;
			// }
			// this.dataList();
			this.saveReportList = utils.deepCopy(this.reportList.list);
			this.page = 1;
			this.pageChange(this.page);
		},
		backList: function() {
			this.$emit('back', this.backList);
		},
		isBack: function() {
			this.backList = false;
			// this.dataList()
			// this.orderList = utils.deepCopy(this.selOrderList);
			// this.chartsOrder = utils.deepCopy(this.selOrderList);
			// this.totalList = utils.deepCopy(this.selTotalList);
			// if(report.chartList.flag == 1){//在图表页面，只有数据更新了 才更新图表
			//     this.changeChart(1)
			// }
			this.saveReportList = utils.deepCopy(this.reportList.list);
			this.page = 1;
			this.pageChange(this.page);
		},
		exportIndex: function() {
			this.exportData();
		}
	},
	methods: {
		rowClass(row) {
			if (
				(row.columnIndex != 0) &
				(row.columnIndex != 1) &
				(row.columnIndex != 2)
			) {
				return 'color: #28a8e0';
			}
		},
		renderHeader(h, { column }) {
			return h(
				'span',
				{
					style: 'cursor:pointer;color: #28a8e0;',
					on: {
						click: this.selected
					}
				},
				column.label
			);
		},
		//表格合计
		getSummaries(param) {
			let total = this.reportList.total;
			// const { columns, data } = param;
			const { columns } = param;
			const sums = [];
			columns.forEach((column, index) => {
				if (index === 0 || index === 1) {
					sums[index] = '';
					return;
				}
				if (index === 2) {
					sums[index] = '合计';
					return;
				}
				for (let key in total) {
					if (key == column.property) {
						sums[index] = total[key];
					}
				}
			});

			return sums;
		},
		errorShow(content) {
			this.$store.commit('setWin', {
				title: '提示信息',
				winType: 'alert',
				content: content
			});
		},
		//导出
		exportData() {
			let index = 0;
			for (let i = 0; i < this.saveReportList.length; i++) {
				if (this.saveReportList[i].selected) {
					index++;
				}
			}
			if (index < 1) {
				this.errorShow('请选择至少1组数据');
				return false;
			}
			//找出已勾选的数据
			let data = this.saveReportList.filter(v => {
				if (v.selected) {
					return v;
				}
			});
			let exportData = utils.deepCopy(data);
			//将时间放入每个店铺中
			for (let i = 0; i < exportData.length; i++) {
				for (let j = 0; j < exportData[i].list.length; j++) {
					let shop = exportData[i].list[j];
					shop['time'] = exportData[i].time;
					if (this.flag == 1 || this.flag == 2) {
						//报表为占比数据，添加%导出
						//订单量 销量 消费金额 代金劵金额 代金劵数量 快捷支付实收金额不需要加%
						for (let key in shop) {
							if (
								key != 'orderNum' &&
								key != 'goodsNum' &&
								key != 'originalPrice' &&
								key != 'shopName' &&
								key != 'time' &&
								key != 'vouchersCash' &&
								key != 'vouchersNum' &&
								key != 'paidIn'
							) {
								shop[key] = `${shop[key]}%`;
							}
						}
					}
					delete exportData[i].list[j].shopId;
				}
			}
			exportData = JSON.stringify(exportData);
			console.log(exportData.length);
			if (exportData.length > 570000) {
				this.errorShow('数据量过大，请缩小范围查询');
				return false;
			}
			//选中的表头
			let titleData = [];
			this.headList.forEach(v => {
				if (v.selected) {
					titleData.push(v.column);
				}
			});
			titleData = [...titleData, 'shopName', 'time'];
			http.exportAnalysisReport({
				data: {
					shopId: this.shopId,
					analysisInfo: exportData,
					type: this.flag == 3 || this.flag == 4 ? 1 : '',
					titleData: JSON.stringify(titleData)
				}
			});
		},
		//导出
		// exportData() {
		// 	let a = 0;
		// 	for (let j = 0; j < this.orderList.length; j++) {
		// 		if (this.orderList[j].selected) {
		// 			a++;
		// 		}
		// 	}
		// 	if (a < 1) {
		// 		this.errorShow('请选择至少1组数据');
		// 		return false;
		// 	}
		// 	let print = utils.deepCopy(this.orderList);
		// 	let headList = utils.deepCopy(this.headList);
		// 	// let totalList = this.totalList;
		// 	//去掉未勾选数据，整理数据
		// 	for (let i = 0; i < print.length; i++) {
		// 		if (!print[i].selected) {
		// 			print.splice(i, 1);
		// 			i--;
		// 		} else {
		// 			for (let m = 0; m < print[i].list.length; m++) {
		// 				for (let n = 0; n < print[i].list[m].length; n++) {
		// 					if (!print[i].list[m][n].selected && n < print[i].list[m].length - 1) {
		// 						print[i].list[m].splice(n, 1);
		// 						n--;
		// 					}
		// 					for (a in print[i].list[m][n]) {
		// 						for (let j = 0; j < headList.length; j++) {
		// 							if (headList[j].column == a) {
		// 								print[i].list[m][n].name = headList[j].name;
		// 							}
		// 						}
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// 	//整理数据，将表头直接对应金额，加入店铺名称和时间
		// 	let data = utils.deepCopy(print);
		// 	for (let k = 0; k < print.length; k++) {
		// 		data[k].list = [];
		// 		for (let b = 0; b < print[k].list.length; b++) {
		// 			data[k].list[b] = {};
		// 			for (let c = 0; c < print[k].list[b].length; c++) {
		// 				if (c < print[k].list[b].length - 1) {
		// 					if (this.flag == 1 || this.flag == 2) { //报表为占比数据时，添加%导出
		// 						if (this.flag == 1 && (print[k].list[b][c].name == '订单量' || print[k].list[b][c].name == '商品总数' || print[k].list[
		// 							b][c].name == '消费金额')) {
		// 							data[k].list[b][print[k].list[b][c].name] = print[k].list[b][c].num;
		// 						} else if (this.flag == 2 && (print[k].list[b][c].name == '销量' || print[k].list[b][c].name == '订单量' || print[k]
		// 							.list[b][c].name == '商品总数' || print[k].list[b][c].name == '消费金额')) {
		// 							data[k].list[b][print[k].list[b][c].name] = print[k].list[b][c].num;
		// 						} else {
		// 							data[k].list[b][print[k].list[b][c].name] = print[k].list[b][c].num + '%';
		// 						}
		// 					} else {
		// 						data[k].list[b][print[k].list[b][c].name] = print[k].list[b][c].num;
		// 					}
		// 				} else {
		// 					data[k].list[b]['时间'] = print[k].time;
		// 					data[k].list[b]['店铺名称'] = print[k].list[b][c].name;
		// 				}
		// 			}
		// 		}
		// 	}
		// 	//去掉外围时间和selected属性
		// 	for (let i = 0; i < data.length; i++) {
		// 		delete data[i].time;
		// 		delete data[i].selected;
		// 	}
		// 	this.$emit('exportData', data);
		// 	http.exportAnalysisReport({
		// 		data: {
		// 			shopId: this.shopId,
		// 			analysisInfo: JSON.stringify(data),
		// 			type: this.flag == 3 || this.flag == 4 ? 1 : ''
		// 		}
		// 	});

		// },
		//选择固定对比
		contrast() {
			let index = 0;
			for (let i = 0; i < this.saveReportList.length; i++) {
				if (this.saveReportList[i].selected) {
					index++;
				}
			}
			if (index < 1) {
				this.errorShow('请选择至少2组对比数据');
				return false;
			}
			this.backList = true;
			for (let i = 0; i < this.saveReportList.length; i++) {
				if (!this.saveReportList[i].selected) {
					this.saveReportList.splice(i, 1);
					i--;
				}
			}
			this.page = 1;
			this.pageChange(this.page);
		},
		//判断是否全部选择
		isAllsel() {
			for (let k = 0; k < this.saveReportList.length; k++) {
				if (!this.saveReportList[k].selected) {
					return false;
				}
			}
			return true;
		},
		//全选
		selected(item, index) {
			if (index !== undefined) {
				item.selected
					? (this.orderPageList[index].selected = false)
					: (this.orderPageList[index].selected = true);
				for (let i = 0; i < this.orderPageList.length; i++) {
					for (let j = 0; j < this.orderList.length; j++) {
						if (
							this.orderList[j].time == this.orderPageList[i].time
						) {
							this.orderList[j].selected = this.orderPageList[
								i
							].selected;
						}
					}
				}
			} else {
				if (this.isAllsel()) {
					for (let i = 0; i < this.saveReportList.length; i++) {
						this.saveReportList[i].selected = false;
					}
				} else {
					for (let i = 0; i < this.saveReportList.length; i++) {
						this.saveReportList[i].selected = true;
					}
				}
			}
		},
		//翻页
		pageChange(page) {
			this.orderPageList = this.saveReportList.slice(
				(page - 1) * this.num,
				(page - 1) * this.num + this.num
			);
			// console.log(this.orderPageList);
			// console.log(this.selHead);
		},
		//时间戳转日期
		timeTodate: function(time) {
			let a = time.replace(/\//g, '-');
			return a;
		},
		timeToweek: function(time) {
			let a = time.split('/');
			return a[0] + '第' + a[1] + '周';
		},
		timeToquarter: function(time) {
			let a = time.split('/');
			return a[0] + '第' + a[1] + '季度';
		},
		timeToyear: function(time) {
			return time + '年度';
		},
		//周数转时间戳
		weekTotime: function(time) {
			let a = time.split('/');
			let week1 = ''; //全年第一周的时间
			let week2 = ''; //当前周数结束时间
			let week3 = ''; //当前周数开始时间
			if (new Date(a[0], 0, 1).getDay() == 1) {
				week1 =
					new Date(a[0], 0, 1).setHours(0, 0, 0, 0) +
					24 * 60 * 60 * 1000;
				week2 =
					week1 -
					24 * 3600 * 1000 +
					a[1] * 24 * 3600 * 1000 * 7 -
					1000;
				week3 = week1 + (a[1] - 1) * 24 * 3600 * 1000 * 7 - 1000;
			} else if (new Date(a[0], 0, 1).getDay() > 1) {
				let total = 8 - new Date(a[0], 0, 1).getDay();
				week1 =
					new Date(a[0], 0, 1).setHours(0, 0, 0, 0) +
					24 * 60 * 60 * 1000 * total;
				week2 = week1 + a[1] * 24 * 3600 * 1000 * 7 - 1000;
				week3 = week1 + (a[1] - 1) * 24 * 3600 * 1000 * 7;
			} else if (new Date(a[0], 0, 1).getDay() < 1) {
				week1 =
					new Date(a[0], 0, 1).setHours(0, 0, 0, 0) +
					24 * 60 * 60 * 1000;
				week2 = week1 + a[1] * 24 * 3600 * 1000 * 7 - 1000;
				week3 = week1 + (a[1] - 1) * 24 * 3600 * 1000 * 7;
			}
			let end = utils.format(new Date(week2), 'yyyy.MM.dd');
			let start = utils.format(new Date(week3), 'yyyy.MM.dd');
			return '(' + start + '~' + end + ')';
		},
		timeToday: function(time) {
			let a = time.split('/');
			let day = new Date(a[0], a[1] - 1, a[2]).getDay();
			let arr = [
				'星期日',
				'星期一',
				'星期二',
				'星期三',
				'星期四',
				'星期五',
				'星期六'
			];
			return arr[day];
		}
	},
	components: {
		page: () =>
			import(/*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		comTable: () =>
			import(/*webpackChunkName: 'com_table'*/ 'src/components/com_table')
	}
};
</script>

<style>
#report-order .el-table .cell {
	padding: 0;
	line-height: 40px;
}
#report-order .el-table td {
	padding: 0;
}
#report-order .el-table__body-wrapper {
	z-index: 1;
}
</style>

<style lang="less" scoped>
#report-order {
	.tabletop {
		text-align: center;
	}
	// width: 1450px;
	position: relative;
	.load {
		width: 128px;
		margin: 200px auto;
	}
	.circle {
		width: 26px;
		height: 26px;
		border: 1px #c7c7c7 solid;
		border-radius: 50%;
		margin: 0 auto;
		background: #fff;
	}
	.active {
		background: url(../../res/icon/selected.png) center center no-repeat,
			#28a8e0;
	}
	.line {
		border-bottom: 1px solid #ebeef5;
	}
	.page-box {
		margin-top: 20px;
	}
	.numGreen {
		color: #0ea59e;
	}
	.numRed {
		color: #ff3c04;
	}
	.main {
		border: 1px solid #ccc;
		height: auto;
		position: relative;
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
			width: 400px;
			height: auto;
			float: left;
			position: absolute;
			left: 0;
			z-index: 5;
		}
		.aRight {
			.title {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.width70 {
				width: 100px;
			}
		}
	}
}
</style>