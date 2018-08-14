<template>
	<section id="statCategory" style="padding-top: 20px;">
		<section>
			<section class="statSearch">
				<div class="button" style="margin-bottom: 20px;" @click="addColor">
					<a href="javascript:void(0);" class="select" :bind="storeType">全部</a>
					<a href="javascript:void(0);" :bind="storeType">堂吃</a>
					<a href="javascript:void(0);" :bind="storeType">外卖</a>
					<div v-on:click="openDetial(8,$event)" class="detLi" style="float: left;margin-top: 12px;">
						<img class="detImg1" src="../../res/icon/orderdetial18.png" />
						<div v-if="orderAll[8].status" class="detDiv1" style="position: absolute;right: -90px;top: 30px;">
							<i class="detI"></i>
							<h3 class="detH3">外卖没有的数据会在某些字段中值为0（赠品数量，赠品金（总）额，赠品金（总）额占比，整单减免，整单减免占比，口味金（总）额，口味金（总）额占比）</h3>
						</div>
					</div>
				</div>
				<section class="statisticsScreen chairFix">
					<!--日期选择和搜索框-->
					<section class="statisticsList fl">
						<section class="chairFix">
							<calendar :time="startTime" :format="'yyyy年MM月dd日'" @emit="getStartTime"></calendar>
						</section>
					</section>
					<span style="float: left; width: 25px;"> - </span>
					<section class="statisticsList fl">
						<section class="chairFix">
							<calendar :time="endTime" :format="'yyyy年MM月dd日'" @emit="getEndTime"></calendar>
						</section>
					</section>
					<span class="order-order-searchA" style="margin-right:15px;">
						<span v-on:click="dateSreachOrder" class="order-order-search"></span>
					</span>
					<section class="statisticsList fl" style="line-height: 46px;margin-right: 20px;height: 55px;">
						<div v-on:click="selectBusinessHours" :class="{'active':isOpenTime}" style="width:20px;height:20px;cursor: pointer;border:1px solid #28A8E0;margin:13px 10px;float: left;"></div>
						<span style="font-size: 16px;">按营业时间</span>
					</section>
					<div class='minView chairFix'>
						<!--一级分类搜索-->
						<section class="statisticsList fl" style="margin-right:20px;">
							<section v-on:click="showOneList" class="tableListInp chairFix">
								<span class="overdian" style="height: 41px;width: 136px;display: block;float: left;text-align: center;border-right: 1px #B3B3B3 solid;">{{oneArea}}</span>
								<div class="fl">
									<i></i>
								</div>
							</section>
							<ul v-if="oneBtn" class="tableListUl">
								<li class="overdian" v-on:click="selectOneArea(item)" v-for='(item,index) in oneList' :key='index'>{{item.categoryName}}</li>
							</ul>
						</section>
						<section class="statisticsList fl" style="margin-right:40px;height: 55px;">
							<input class="searchgoods" type="text" placeholder="请输入名称" v-model="searchName" />
						</section>
						<section class="statisticsList fl" style="height: 55px;">
							<a @click="search" href="javascript:void(0);" class="yellow" style="width: 90px;height: 40px;line-height: 40px;">搜索</a>
							<a @click="resetSearch" href="javascript:void(0);" class="gray" style="width: 90px;height: 40px;line-height: 40px;">重置</a>
						</section>
					</div>

				</section>
			</section>
			<section style="line-height: 28px;margin-bottom: 10px;">
				<span v-on:click="openDetial(0,$event)" class="width100 detLi" style="font-size: 18px;">{{orderAll[0].name}}
					<img class="detImg1" src="../../res/icon/orderdetial18.png" style="vertical-align: middle;" />
					<div v-if="orderAll[0].status" class="detDiv1" style="top: -25px;left: 110px;">
						<i class="detI triright" style="top: 25px;left: -20px;"></i>
						<h3 v-if="allTypeShow" class="detH3" style="color: #e6e6e7;">本页面中所有占比（除商品实收金额占比）数据均以消费金额为基数进行计算得出的占比</h3>
						<h3 v-if="halleatShow" class="detH3" style="color: #e6e6e7;">本页面中所有的占比（除商品实收金额占比）数据均以营业额为基数进行计算得出的占比</h3>
						<h3 v-if="takeoutShow" class="detH3" style="color: #e6e6e7;">本页面中所有占比（除商品实收金额占比）数据均以消费金额为基数进行计算得出的占比</h3>
					</div>
				</span>
				<span v-if="orderAll[7].name != '请选择店铺'" class="width100 detLi" style="font-size: 18px;margin-left: 20px;">选择店铺：
					<span style="display: inline-block;vertical-align: top;font-size: 18px;width: 400px;word-wrap:break-word;white-space:pre-wrap">{{orderAll[7].name}}</span>
				</span>
			</section>

			<!--组件-->
			<categoryTable :halleatShow="halleatShow" :takeoutShow="takeoutShow" :allTypeShow="allTypeShow" :orderAll="orderAll" :paginationList="paginationList" :classification="classification" :total="total">
			</categoryTable>
		</section>
		<pageElement @pageNum="getPageNum" :page="page" :total="endTotal" :num="num" :isNoJump='true'></pageElement>
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			startTime: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //日期组件的结束时间
			oneArea: '请选择一级分类', // 区域
			oneList: [], // 一级分类列表
			oneBtn: false, // 一级分类显示

			classification: [], //全部分类统计列表
			paginationList: [], //分页内容(页面展示的数据)
			exportUrl: 'javascript:void(0);',
			itemClassification: [], //分类中的单个类的商品列表
			isPackage: false, //判断是套餐还是分类统计默认false：分类统计
			isOpenTime: true, //是否按营业时间，默认 false 0 否
			total: {},
			orderAll: [
				{
					name: '分类总览',
					status: false
				},
				{
					name: '整单减免',
					status: false
				},
				{
					name: '商品优惠总额',
					status: false
				},
				{
					name: '商品实收总额',
					status: false
				},
				{
					name: '消费总额',
					status: false
				},
				{
					name: '销量',
					status: false
				},
				{
					name: '商品实收金额占比',
					status: false
				},
				{
					name: '请选择店铺',
					status: false
				},
				{
					name: '堂吃外卖',
					status: false
				}
			],

			searchName: '', //商品名搜索
			oneId: -2, //选中一级分类id
			shopList: [
				{ name: '本页面中所', id: 1 },
				{ name: '本页面中所', id: 2 },
				{ name: '本页面中所', id: 3 },
				{ name: '本页面中所', id: 4 },
				{ name: '本页面中所', id: 5 },
				{ name: '本页面中所', id: 6 }
			],
			selects: [],
			countList: [{ name: 10 }, { name: 50 }],
			page: 1,
			num: 10,
			endTotal: 1,
			timeList: [
				{ id: '1', timeName: '按营业时间' },
				{ id: '2', timeName: '市别' }
			], //时间分类列表
			timeListKind: [], //时间选择
			timeBtn: false, //时间
			timeBtnKind: false,
			allArea: '选择区域',
			timeArea: '选择时间类别',
			timeKind: '选择时间',
			storeType: null, //0全部 1堂吃 2外卖
			halleatShow: false, //堂吃
			takeoutShow: false, //外卖
			allTypeShow: true, //全部
			clickJudgment: null,
			userData: {}
		};
	},
	mounted() {
		this.$store.commit('setPageTools', [
			{
				name: '导出',
				fn: () => {
					this.exportData();
				},
				className: 'blue'
			},
			{
				name: '打印',
				fn: () => {
					this.printData();
				},
				className: 'blue'
			}
		]);
		this.init();
		document.onclick = () => {
			this.oneBtn = false;
			for (let i = 0; i < this.orderAll.length; i++) {
				this.orderAll[i].status = false;
			}
		};
	},
	watch: {
		//监听选中的店铺
		selects() {
			let name = '';
			for (let i = 0; i < this.shopList.length; i++) {
				for (let j = 0; j < this.selects.length; j++) {
					if (this.selects[j] == this.shopList[i].id) {
						name = name + this.shopList[i].name + ',';
					}
				}
			}
			if (name) {
				this.orderAll[7].name = name.substring(0, name.length - 1);
			} else {
				this.orderAll[7].name = '请选择店铺';
			}
		},
		num: 'init',
		page: 'setPage'
	},
	methods: {
		//堂吃外卖切换
		addColor(e) {
			let chooseState = document.querySelectorAll('.button a');
			if (
				e.target.nodeType === 1 &&
				e.target.nodeName.toLocaleLowerCase() === 'a'
			) {
				for (let i = 0; i < chooseState.length; i++) {
					if (chooseState[i] === e.target) {
						this.storeType = i;
						if (this.storeType == 0) {
							this.halleatShow = false;
							this.takeoutShow = false;
							this.allTypeShow = true;
						} else if (this.storeType == 1) {
							this.takeoutShow = false;
							this.halleatShow = true;
							this.allTypeShow = false;
						} else if (this.storeType == 2) {
							this.halleatShow = false;
							this.allTypeShow = false;
							this.takeoutShow = true;
						}
						this.clickJudgment = false;
						this.init();
						this.setPage();
						this.page = 1;
					}
					chooseState[i].removeAttribute('class');
				}
				e.target.className = 'select';
			}
		},
		//点击按营业时间
		selectBusinessHours() {
			this.isOpenTime = !this.isOpenTime;
		},
		//显示一级分类列表
		showOneList(e) {
			e.stopPropagation();
			this.oneBtn = !this.oneBtn;
			if (this.oneList.length == 0) {
				this.oneBtn = false;
			}
		},
		// 模拟select选择框,一级分类
		selectOneArea(data) {
			this.oneArea = data.categoryName;
			this.oneId = data.categoryId;
			//                this.twoArea = '请选择二级分类'
			//                this.twoList = data.child;
		},
		//点击店铺选择 阻止冒泡
		stop(e) {
			e.stopPropagation();
		},
		//选择开始时间
		getStartTime(receiveTime) {
			this.startTime = receiveTime;
		},
		//选择结束时间
		getEndTime(receiveTime) {
			this.endTime = receiveTime + 24 * 60 * 60 * 1000 - 1;
		},
		//翻页组件接收
		getPageNum(res) {
			this.page = res.page;
			this.num = res.num;
		},
		//重置
		resetSearch() {
			this.searchName = '';
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(23, 59, 59, 999);
			this.isOpenTime = true;
			this.oneArea = '请选择一级分类';
			this.oneId = -2;
			this.search();
		},
		//搜索条件
		searchCondition() {
			if (this.storeType == null) {
				this.storeType = 0;
			}
			let startT = this.startTime;
			let endT = '';
			if (
				utils.format(new Date(this.endTime), 'dd') ==
				utils.format(new Date(), 'dd')
			) {
				endT = new Date().setHours(23, 59, 59, 999);
			} else {
				endT = new Date(this.endTime).setHours(23, 59, 59, 999);
			}
			if (parseInt((endT - startT) / 1000 / 60 / 60 / 24) > 90) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '只能查询90天内的订单'
				});
				return false;
			}
			startT = parseInt(startT / 1000);
			endT = parseInt(endT / 1000);
			if (startT - endT > 0) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '结束的时间不能小于开始时间'
				});
				return false;
			}
			return true;
		},
		//初始化，用于显示分类
		async init(bool) {
			if (this.searchCondition()) {
				this.classification = [];
				//获取全部数据
				let res;
				if (this.storeType == 0) {
					res = await http.goodssalesMore({
						data: {
							startTime: parseInt(this.startTime / 1000),
							endTime: parseInt(this.endTime / 1000),
							isOpenTime: Number(this.isOpenTime),
							shopId: this.userData.currentShop.id
						}
					});
				} else if (this.storeType == 1) {
					res = await http.categorystatisticsMore({
						data: {
							startYear: utils.format(
								new Date(this.startTime),
								'yyyy'
							),
							startMonth: utils.format(
								new Date(this.startTime),
								'MM'
							),
							startDay: utils.format(
								new Date(this.startTime),
								'dd'
							),
							endYear: utils.format(
								new Date(this.endTime),
								'yyyy'
							),
							endMonth: utils.format(
								new Date(this.endTime),
								'MM'
							),
							endDay: utils.format(new Date(this.endTime), 'dd'),
							isOpenTime: Number(this.isOpenTime),
							shopId: this.userData.currentShop.id
						}
					});
				} else if (this.storeType == 2) {
					res = await http.goodssalesTakeoutList({
						data: {
							startTime: parseInt(this.startTime / 1000),
							endTime: parseInt(this.endTime / 1000),
							isOpenTime: Number(this.isOpenTime),
							shopId: this.userData.currentShop.id
						}
					});
				}
				let list = res.list;
				this.total = res.total;
				//加入selected判断是否选中
				let lista = {
					selected: false,
					click: false
				};
				if (!list) {
					return;
				}
				for (let i = 0; i < list.length; i++) {
					for (let j = 0; j < list[i].child.length; j++) {
						for (let key in lista) {
							list[i].child[j][key] = lista[key];
						}
					}
					for (let key in lista) {
						list[i][key] = lista[key];
					}
				}
				this.classification = list;
				this.oneList = [];
				//防止点击查询重复添加分类
				for (let i = 0; i < this.classification.length; i++) {
					this.oneList.push(this.classification[i]);
				}
				if (bool) {
					if (this.oneList.length != 0) {
						this.oneList.unshift({
							categoryId: '-1',
							categoryName: '全部'
						});
					}
				} else {
					if (this.oneList.length != 0) {
						this.oneList.unshift({
							categoryId: '-2',
							categoryName: '全部'
						});
					}
					//分类搜索、商品名搜索
					let newList = [];
					for (let i = 0; i < list.length; i++) {
						//只有分类搜索
						if (
							this.oneId == list[i].categoryId &&
							!this.searchName
						) {
							list[i].click = this.clickJudgment;
							newList.push(list[i]);
						} else if (
							(this.oneId == list[i].categoryId &&
								this.searchName) ||
							(this.oneId == -2 && this.searchName)
						) {
							//分类与商品名搜索
							let goods = []; //保存一级分类查询到的商品
							for (let j = 0; j < list[i].goods.length; j++) {
								if (
									list[i].goods[j].goodsName.indexOf(
										this.searchName
									) != -1
								) {
									goods.push(list[i].goods[j]);
									list[i].click = this.clickJudgment;
								}
							}
							list[i].goods = goods;
							newList.push(list[i]);
							let a = []; //保存查询到的所有二级分类
							for (let m = 0; m < list[i].child.length; m++) {
								if (list[i].child[m].goods.length != 0) {
									let arr = list[i].child[m];
									let twogoods = []; // 保存二级分类查询到的商品
									for (let n = 0; n < arr.goods.length; n++) {
										if (
											arr.goods[n].goodsName.indexOf(
												this.searchName
											) != -1
										) {
											twogoods.push(arr.goods[n]);
											list[i].click = this.clickJudgment;
											arr.click = this.clickJudgment;
										}
									}
									arr.goods = twogoods;
									a.push(arr);
									//将查询商品的所有二级分类放到newList列表中
									if (m == list[i].child.length - 1) {
										newList[newList.length - 1].child = a;
									}
								}
							}
						}
					}
					if (this.oneId != -2 || this.searchName) {
						//去掉没有商品的一级分类和二级分类
						if (this.searchName) {
							for (let i = 0; i < newList.length; i++) {
								if (!newList[i].click) {
									newList.splice(i, 1);
									i--;
								} else {
									for (
										let j = 0;
										j < newList[i].child.length;
										j++
									) {
										if (!newList[i].child[j].click) {
											newList[i].child.splice(j, 1);
											j--;
										}
									}
								}
							}
							for (let i = 0; i < newList.length; i++) {
								for (
									let j = 0;
									j < newList[i].child.length;
									j++
								) {
									if (newList[i].child[j].goods.length == 0) {
										newList[i].child.splice(j, 1);
										j--;
									}
								}
							}
						}
						this.classification = newList;
					}
				}
				this.setPage();
			}
		},
		//搜索图标
		async dateSreachOrder() {
			this.init(true);
		},
		//分类 、 商品名搜索
		search() {
			this.page = 1;
			this.clickJudgment = true;
			this.init();
		},
		//导出
		async exportData() {
			let print = [];
			//调用方法处理数据传给后台
			this.selected(print);
			if (print.length == 0) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '请选择分类！'
				});
				return false;
			}
			if (this.storeType == 0) {
				await http.goodssalesExportMore({
					data: {
						startTime: parseInt(this.startTime / 1000),
						endTime: parseInt(this.endTime / 1000),
						shopId: this.userData.currentShop.id,
						isOpenTime: Number(this.isOpenTime),
						condition: JSON.stringify(print),
						token: this.userData.accessToken
					}
				});
			} else if (this.storeType == 1) {
				await http.categorystatisticsExport({
					data: {
						startYear: utils.format(
							new Date(this.startTime),
							'yyyy'
						),
						startMonth: utils.format(
							new Date(this.startTime),
							'MM'
						),
						startDay: utils.format(new Date(this.startTime), 'dd'),
						endYear: utils.format(new Date(this.endTime), 'yyyy'),
						endMonth: utils.format(new Date(this.endTime), 'MM'),
						endDay: utils.format(new Date(this.endTime), 'dd'),
						isOpenTime: Number(this.isOpenTime),
						condion: JSON.stringify(print),
						shopId: this.userData.currentShop.id
					}
				});
			} else if (this.storeType == 2) {
				await http.goodssalesExportTakeout({
					data: {
						startTime: parseInt(this.startTime / 1000),
						endTime: parseInt(this.endTime / 1000),
						shopId: this.userData.currentShop.id,
						isOpenTime: Number(this.isOpenTime),
						condition: JSON.stringify(print),
						token: this.userData.accessToken
					}
				});
			}
		},
		//打印
		async printData() {
			let print = [];
			//调用方法处理数据传给后台
			this.selected(print);
			if (print.length == 0) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '请选择分类！'
				});
				return false;
			}
			if (this.storeType == 0) {
				await http.goodssalesPrintDataMore({
					data: {
						startTime: parseInt(this.startTime / 1000),
						endTime: parseInt(this.endTime / 1000),
						shopId: this.userData.currentShop.id,
						condition: JSON.stringify(print),
						isOpenTime: Number(this.isOpenTime)
					}
				});
			} else if (this.storeType == 1) {
				await http.categorystatisticsPrintData({
					data: {
						startYear: utils.format(
							new Date(this.startTime),
							'yyyy'
						),
						startMonth: utils.format(
							new Date(this.startTime),
							'MM'
						),
						startDay: utils.format(new Date(this.startTime), 'dd'),
						endYear: utils.format(new Date(this.endTime), 'yyyy'),
						endMonth: utils.format(new Date(this.endTime), 'MM'),
						endDay: utils.format(new Date(this.endTime), 'dd'),
						isOpenTime: Number(this.isOpenTime),
						condion: JSON.stringify(print)
					}
				});
			} else if (this.storeType == 2) {
				await http.goodssalesPrintTakeoutData({
					data: {
						startTime: parseInt(this.startTime / 1000),
						endTime: parseInt(this.endTime / 1000),
						shopId: this.userData.currentShop.id,
						condition: JSON.stringify(print)
					}
				});
			}
			this.$store.commit('setWin', {
				title: '操作提示',
				content: '打印分类统计已发送！'
			});
		},
		//封装选中分类和商品
		//选中以[{cid: '', click: ''}]的格式传给后台
		selected(print) {
			let list = this.classification;
			for (let i = 0; i < list.length; i++) {
				let cate = { cid: '', click: '' };
				if (list[i].selected && list[i].click) {
					cate.cid = list[i].categoryId;
					cate.click = list[i].click ? 1 : 0;
					print.push(cate);
					for (let j = 0; j < list[i].child.length; j++) {
						if (list[i].child[j].selected) {
							let catet = { cid: '', click: '' };
							catet.cid = list[i].child[j].categoryId;
							catet.click = list[i].child[j].click ? 1 : 0;
							print.push(catet);
						}
					}
				} else if (list[i].selected && !list[i].click) {
					cate.cid = list[i].categoryId;
					cate.click = list[i].click ? 1 : 0;
					print.push(cate);
				} else if (!list[i].selected && list[i].click) {
					for (let j = 0; j < list[i].child.length; j++) {
						if (list[i].child[j].selected) {
							cate.cid = list[i].child[j].categoryId;
							cate.click = list[i].child[j].click ? 1 : 0;
							print.push(cate);
						}
					}
				}
			}
		},

		//点击说明详情
		openDetial(index, e) {
			e.stopPropagation();
			for (let i = 0; i < this.orderAll.length; i++) {
				if (i != index) {
					this.orderAll[i].status = false;
				}
			}
			this.orderAll[index].status = !this.orderAll[index].status;
		},
		setPage() {
			this.endTotal = Math.ceil(this.classification.length / this.num);
			let pageStart = (this.page - 1) * this.num;
			let pageEnd = this.page * this.num;
			this.paginationList = this.classification.slice(pageStart, pageEnd);
		}
	},
	created() {
		this.userData = storage.session('userShop');
	},
	components: {
		calendar: () =>
			import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		pageElement: () =>
			import(/*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		categoryTable: () =>
			import(/*webpackChunkName:"category_table"*/ './category_table')
	}
};
</script>
<style lang="less" scoped>
@media screen and (max-width: 1440px) {
	.minView {
		float: left;
	}
}
.chairFix:after {
	content: '';
	display: block;
	clear: both;
}
#statCategory {
	position: relative;
}
#statCategory .statisticsScreen {
	margin-bottom: 10px;
}
#statCategory .statisticsScreen > span {
	color: #666;
	font-size: 14px;
	height: 40px;
	width: 40px;
	text-align: center;
	line-height: 41px;
}
#statCategory .tableListInp {
	color: #666666;
	border: #b3b3b3 solid 1px;
	height: 43px;
	cursor: pointer;
}
#statCategory .tableListInp .fl {
	width: 41px;
	height: 41px;
	position: relative;
	z-index: 5;
}
#statCategory .tableListInp .calendar-ctr {
	width: 41px;
	height: 41px;
	border-left: 1px solid #b3b3b3;
	position: relative;
	z-index: 5;
	float: left;
}

#statCategory .tableListInp div i {
	height: 10px;
	width: 10px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -5px;
	margin-left: -5px;
	border-top: 10px solid #b3b3b3;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	box-sizing: border-box;
}
#statCategory .statisticsList {
	position: relative;
}
#statCategory .statisticsList .searchgoods {
	width: 174px;
	height: 41px;
	text-align: center;
	border: 1px solid #b3b3b3;
}
#statCategory .statisticsList ul {
	width: 100%;
	max-height: 200px;
	margin: 0;
	position: absolute;
	top: 43px;
	left: 0;
	z-index: 10;
	background: #fff;
	overflow-y: auto;
	border-bottom: 1px solid #ccc;
}
#statCategory .statisticsList .overdian {
	overflow: hidden;
	display: block;
	white-space: nowrap;
	text-overflow: ellipsis;
	line-height: 40px;
}
#statCategory .statisticsList ul li {
	text-align: center;
	height: 41px;
	border: 1px #b3b3b3 solid;
	border-top: 0;
	background: #fff;
	cursor: pointer;
}
#statCategory .statisticsList ul li:hover {
	background: #f0f0f0;
}

#statCategory .blue {
	background: #00adef;
}
// .order-operation {
// 	position: absolute;
// 	right: 200px;
// 	top: -46px;
// 	z-index: 2;
// 	width: 350px;
// 	height: 40px;
// }
// .order-operation div {
// 	display: inline-block;
// 	width: 90px;
// 	height: 40px !important;
// 	float: right;
// 	margin-left: 20px;
// 	line-height: 40px;
// 	text-align: center;
// 	color: #ffffff;
// }
.order-order-search {
	background: url(../../res/images/search.png) center center no-repeat;
}
.order-order-searchA,
.order-order-search {
	// display: inline-block;
	float: left;
	width: 40px;
	height: 40px;
	background-color: #29a7e1;
	cursor: pointer;
}
.order-order-searchA:hover {
	background-color: #1878a5;
	transition: background-color ease-in-out 0.2s;
}
.order-order-searchA:active {
	background-color: #154961;
}
.export {
	display: block;
	width: 90px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	color: #fff;
	font-size: 14px;
}
.active {
	background: url(../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
}
.detLi {
	position: relative;
	cursor: pointer;
}
.detLi .detDiv1 {
	display: inline-block;
	width: 300px;
	background: #45404b;
	position: absolute;
	top: 45px;
	right: -15px;
	padding: 10px;
	box-shadow: 3px 2px 10px #ccc;
	z-index: 10;
}
.detLi .detDiv1 .detI {
	width: 0;
	height: 0;
	line-height: 0;
	position: absolute;
	top: -10px;
	right: 30%;
	border-width: 10px;
	border-top: 0px;
	border-style: solid;
	border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
}
.detLi .detDiv1 .detH3 {
	line-height: 30px;
	color: #e6e6e7;
	text-align: center;
}
.triright {
	width: 0;
	height: 0;
	border-top: 10px solid transparent !important;
	border-bottom: 10px solid transparent !important;
	border-right: 10px solid #45404b !important;
	border-left: 10px solid transparent !important;
}
.button {
	width: 100%;
	float: left;
}
.button a {
	// display: inline-block;
	width: 100px;
	height: 40px;
	margin-right: 5px;
	float: left;
	color: orange;
	text-align: center;
	line-height: 38px;
	border: 1px solid orange;
}
.button a.select {
	background: orange;
	color: #fff;
}
</style>
	