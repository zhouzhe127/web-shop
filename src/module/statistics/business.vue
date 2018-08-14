<!--营业统计-->
<template>
	<div class="business" @click="tips">
		<div class="filter">
			<div class="block">
				<span>时间类型：</span>
				<!--下拉框组件-->
				<selectBtn @emit="selectType" :sorts="options" :index="selectedType" :width="150" class="select-btn"></selectBtn>
				<div class="input-box input-start">
					<!--日期组件 开始时间-->
					<calendar :time="startTime" :type="selectedType" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
				</div>
				<div class="input-box input-start">
					<!--日期组件 开始时间-->
					<calendar :time="endTime" :type="selectedType" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
				</div>
			</div>
			<div class="block">
				<div class="input-check select-ban">
					<i @click="timeCheck" :class="{active:this.openTime == 1}"></i>
					按营业时间统计
				</div>
				<!--选择店铺按钮-->
				<div class="input-box input-start">
					<select-store @emit="getDrop" :sorts="shopList" :tipName="dropName" v-if="isBrand"></select-store>
				</div>
				<div class="search-box">
					<span class="search-btn yellow" @click="search">搜索</span>
					<span class="reset-btn gray" @click="resetInput">重置</span>
				</div>
			</div>
			<div class="store-show" v-if="isBrand" :style="{'height':storeShowH}">
				<i>已选择店铺：</i>
				<div class="store-block" ref="storeBlock">
					<em @click='openStore' class="select-ban">{{isShowStore?'收起':'展开'}}</em>
					<span v-for="(item,index) in shopList" :key="index" :data-id="item.id" v-if="item.selected">{{item.name}}，</span>
				</div>
			</div>
		</div>
		<!--统计数据-->
		<specific :specific="sales"></specific>
		<!--饼图-->
		<pieChart :pie="pie" :cover="coverShow" :echarts="echarts" v-if="isOneShow"></pieChart>
		<!--柱状图-->
		<barChart :bar="bar" :cover="coverShow" :echarts="echarts" :shopList="shopList" v-if="isBrand && !isOneShow"></barChart>
		<!--条形图-->
		<lineChart :line="line" :cover="coverShow" :echarts="echarts"></lineChart>

		<!--提示弹框-->
		<div class="busi-tips" :style="posiTips" v-if="tipShow">
			<em></em>{{tipsText}}</div>
	</div>
</template>

<script>
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import Timer from 'src/verdor/timer';
import http from 'src/manager/http';

export default {
	data() {
		return {
			options: ['日', '周', '月', '季度', '年'],
			selectedType: 0, //对应循序  0:日, 1:周, 2:月, 3:季度, 4:年
			selectedName: '日',
			startTime: '',
			endTime: '',
			reqStartTime: '',
			reqEndTime: '',
			openTime: 1, //是否按营业时间统计
			shopList: [], //店铺列表
			shopId:'',//单店id
			shopIds: '',
			shopSelectStr: '', //选中店铺名称拼接
			storeName: '', //选中店铺按钮 显示,
			isBrand: '', //是否为品牌,
			isBrandSend: 0,
			isOneStore: '', //是否单店 用于判断
			isOneShow: '', //是否单店 用于显示
			coverShow: false, //加载gif
			storeListShow: false, //店铺列表显示
			allSelected: true, //选中全部
			sales: [],
			pie: [],
			bar: [],
			line: [],
			tipsContent: {
				business:
					'该时间段内所有堂吃商品原价+堂吃服务费+外卖商品原价 = 营业总额（不计入退品）',
				discount:
					'活动优惠券、店内优惠（整单减免、整单折扣、整单强折、单品减免、单品折扣、赠菜金额、积分抵扣）以及外卖活动优惠金额',
				amount:
					'入账总额 = 营业总额 - 优惠总额（不计入未入账的支付方式的金额）',
				pieGoods: '不计入外卖服务费',
				pieDiscount: '外卖优惠、活动等都计入外卖活动补贴'
			},
			tipsText: '',
			tipShow: false,
			posiTips: '',
			helpIconDom: null,
			echarts: null,
			userData: '',
			userShopList: [],
			userShopIdStr: '',
			dropList: [], //店铺列表 传入
			dropName: '请选择店铺',
			repeat: true, //防止重复轮询
			taskId:'',//任务id
			timerId:'',//轮询id
			isShowStore:false,//已选中店铺列表 是否展开
			storeShowH:'20px',
		};
	},
	components: {
		selectBtn: () =>
			import(/*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		calendar: () =>
			import(/*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
		selectStore: () =>
			import(/*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
		specific: () =>
			import(/*webpackChunkName: 'business_specific'*/ './business_specific'),
		pieChart: () =>
			import(/*webpackChunkName: 'business_pie'*/ './business_pie'),
		barChart: () =>
			import(/*webpackChunkName: 'business_bar'*/ './business_bar'),
		lineChart: () =>
			import(/*webpackChunkName: 'business_line'*/ './business_line')
	},
	created() {
		this.userData = storage.session('userShop');//获取店铺数据
		this.shopId = this.userData.currentShop.id;
		let shopIdArr = [],
			shopListArr = [];
		if (this.userData.currentShop.ischain == '3') {
			this.userShopList = storage.session('shopList');
			for(let item of this.userShopList){//组合店铺列表
				shopIdArr.push(item.id);
				let obj = {
					id: item.id,
					name: item.shopName
				};
				shopListArr.push(obj);
			}
			this.userShopIdStr = shopIdArr.join('-'); //品牌下店铺id拼接
			this.userShopList = shopListArr;
		}
	},
	mounted() {
		//设置字段
		this.isBrand = this.userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌,
		this.shopIds = this.isBrand
			? this.userShopIdStr
			: this.userData.currentShop.id;
		for (let i in this.userShopList) {
			//店铺默认全部选中
			this.userShopList[i].selected = true;
		}
		this.shopList = this.userShopList; //店铺列表
		this.storeName =
			this.userShopList.length > 0
				? this.userShopList[0].name
				: '选择店铺'; //选中店铺按钮 显示,
		this.isOneStore = this.userShopList.length <= 1 ? true : false; //是否单店 用于判断
		this.isOneShow = this.userShopList.length <= 1 ? true : false; //是否单店 用于显示

		//获取当前时间
		this.startTime = new Date().setHours(0, 0, 0, 0);
		this.endTime = new Date().setHours(0, 0, 0, 0);
		//单店 或者 品牌且有直营店
		if (this.isBrand == 0 || this.userShopList.length > 0) {
			this.search();
		}
		this.getEcharts();
	},
	destroyed() {
		Timer.clear(this.timerId);
	},
	methods: {
		openStore(){//展开收起-已选中店铺列表
			if(this.isShowStore==true){//展开时点击
				this.storeShowH = '20px';
			}else{
				this.storeShowH = 'auto';
			}
			this.isShowStore = !this.isShowStore;
		},
		//选择搜索日期的类型 
		selectType(index) {
			this.selectedType = index;
		},
		//是否按营业时间统计
		timeCheck() {
			this.openTime = this.openTime == 0 ? 1 : 0;
		},
		//开始时间
		startTimeChange(time) {
			this.startTime = time;
		},
		//结束时间
		endTimeChange(time) {
			this.endTime = time;
		},
		setIsOneStore(selectNum) {
			this.isOneStore = selectNum == 1 ? true : false; //判断是否只选择一家店铺 == 1 ? true : false; //判断是否只选择一家店铺
		},
		//获取选中的店铺 遍历
		getDrop(arr) {
			this.shopList = arr;
			let idArr = [],
				selectNum = 0;
			for (let item of this.shopList) {
				if (item.selected == true) {
					idArr.push(item.id);
					selectNum++;
				}
			}
			this.shopIds = idArr.join('-');
			this.setIsOneStore(selectNum);
		},
		//异步加载echarts插件
		async getEcharts() {
			let data = await import(/* webpackChunkName:'echarts' */ 'src/verdor/echarts');
			this.echarts = data;
		},
		//获取单店数据
		async getData($shopId) {
			this.coverShow = true;
			let data = await http.statisticsBusiness({
				data: {
					startTime: this.reqStartTime,
					endTime: this.reqEndTime,
					dateType: this.selectedType + 1,
					isOpenTime: this.openTime,
					shopId:$shopId,
				}
			});
			this.sales = data.sales;
			this.pie = data.proportion;
			this.line = data.list;
			this.coverShow = false;
		},
		//获取品牌数据
		async getDataBrand() {
			let data = await http.statisticsBrandBusiness({
				data: {
					startTime: this.reqStartTime,
					endTime: this.reqEndTime,
					dateType: this.selectedType + 1,
					shopIds: this.shopIds,
					isOpenTime: this.openTime,
				}
			});
			Timer.clear(this.timerId);
			this.repeat = true;
			this.coverShow = false; //停止加载动画
			if(data){
				this.sales = data.sales;
				this.bar = data.columnar;
				this.line = data.list;
				this.coverShow = false;
			}else{
				this.$store.commit('setWin', {title: '提示信息',
					content:'请求失败，请重试...'
				});	
			}
		},
		async getTaskId(){//轮询请求
			if (!this.repeat) {
				//轮询未结束 防止重复轮询
				this.$store.commit('setWin', {title: '提示信息',
					content:'当前查询尚未结束，请结束后再进行查询或刷新浏览器重新查询！'
				});
				return;
			}
			http.createBusinessTask({
				data: {
					startTime: this.reqStartTime,
					endTime: this.reqEndTime,
					dateType: this.selectedType + 1,
					shopIds: this.shopIds,
					isOpenTime: this.openTime,
				}
			}).then(data => {
				this.taskId = data;
				this.repeat = false; //禁止重复轮询
				this.coverShow = true; //开始加载动画
				//轮询请求taskId
				this.timerId = Timer.add(() => {
					http.taskInfo({data: {taskId: this.taskId}})
						.then(data => {
							if (data.status == 3) {
								//轮询完成 获取数据
								this.getDataBrand();
							} else if (data.status == 2) {
								//失败
								Timer.clear(this.timerId);
								this.coverShow = false; //停止加载动画
								this.repeat = true; //轮询完成 可继续查询
								//失败
								this.$store.commit('setWin', {
									title: '提示信息',
									content: '请求失败，请重试！'
								});
							}
						});
				},1000,600,false,() => {
					Timer.clear(this.timerId); //轮询超时
					this.repeat = true; //可重新查询
					this.coverShow = false; //停止加载动画
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '请求超时，请重试！'
					});
				}
				);
			});
		},
		validate() {
			//日期验证
			let isPass = true,
				start = parseInt(this.startTime / 1000 / 3600 / 24),
				end = parseInt(this.endTime / 1000 / 3600 / 24);
			if (start > end) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '开始时间不能大于结束时间'
				});
				isPass = false;
			}
			if (this.isBrand && this.shopIds == '') {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '没有可选店铺'
				});
				isPass = false;
			}
			return isPass;
		},
		//搜索 因为按照不同类型的日期选择，需要计算结束时间的末尾 比如第二周的最后一秒
		search() {
			if (!this.validate()) return;
			this.reqStartTime = utils.format(
				new Date(this.startTime),
				'yyyyMMdd'
			);
			const oneDay = 1000 * 3600 * 24,
				sixDay = 1000 * 3600 * 24 * 6;
			let endTime;
			let thisMonth;
			let thisYear;
			//结束时间需要计算截止时间
			switch (this.selectedType) {
				case 0: //日
					this.reqEndTime = utils.format(
						new Date(this.endTime),
						'yyyyMMdd'
					);
					break;
				case 1: //周
					endTime = new Date(this.endTime).setHours(0, 0, 0, 0); //取零点
					this.reqEndTime = utils.format(
						new Date(endTime + sixDay),
						'yyyyMMdd'
					); //加上6天 并格式化
					break;
				case 2: //月
				case 3: //季度
					endTime = new Date(this.endTime);
					(thisMonth = endTime.getMonth()), //获取该时间的月份
					(thisYear = endTime.getFullYear()); //获取该时间年份
					if (thisMonth < 11 && this.selectedType == 2) {
						thisMonth = thisMonth + 1;
					} else if (thisMonth < 9 && this.selectedType == 3) {
						thisMonth = thisMonth + 3;
					} else {
						thisMonth = 0;
						thisYear = thisYear + 1;
					}
					endTime.setYear(thisYear);
					endTime.setMonth(thisMonth, 1);
					endTime = new Date(Date.parse(endTime) - oneDay); //去掉一天即等于该月或改季度最后一天
					this.reqEndTime = utils.format(endTime, 'yyyyMMdd');
					break;
				case 4: //年
					endTime = new Date(this.endTime);
					endTime.setYear(endTime.getFullYear() + 1, 1); //设置该时间年份+1
					endTime = new Date(Date.parse(endTime) - oneDay); //去掉一天等于该年最后一天
					this.reqEndTime = utils.format(endTime, 'yyyyMMdd');
					break;
				default:
					break;
			}

			//请求接口
			this.isOneShow = this.isOneStore;
			if (this.isOneStore) {//选择一家店铺
				this.isBrandSend = 0;
				if(this.isBrand==1){//品牌
					Timer.clear(this.timerId);
					this.getData(this.shopIds);
				}else{//单店
					this.getData(this.shopId);
				}
			} else {
				//多店 品牌
				this.isBrandSend = 1;
				this.getTaskId();
			}
			
		},
		resetInput() {//重置数据
			this.openTime = 1;
			this.selectedType = 0;
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(0, 0, 0, 0);
			if (this.isBrand) {
				let list = utils.deepCopy(this.shopList);
				let idArr = [];
				for (let item of list) {
					item.selected = true;
					idArr.push(item.id);
				}
				this.shopList = list;
				this.shopIds = idArr.join('-');
				this.setIsOneStore(this.shopList.length);
			}
			this.search();
		},
		tips(event) {//提示信息
			let target = event.target;
			if (target.className == 'help-icon') {
				if (!this.tipShow || target != this.helpIconDom) {
					let type = target.getAttribute('data-name'),
						posiTop = target.offsetTop - 15,
						posiLeft = target.offsetLeft + 30;
					this.tipsText = this.tipsContent[type];
					this.posiTips = `top:${posiTop}px;left:${posiLeft}px`;
					this.tipShow = true;
					this.helpIconDom = target;
					document.addEventListener('click', this.tipsClose);
				} else {
					this.tipShow = false;
					this.posiTips = '';
					document.removeEventListener('click', this.tipsClose);
				}
			}
		},
		tipsClose(event) {//关闭提示信息
			if (!event.target.className.includes('help-icon')) {
				this.tipShow = false;
				this.posiTips = '';
				document.removeEventListener('click', this.tipsClose);
			}
		}
	}
};
</script>

<style lang="less" scoped>
.business {
	padding-bottom: 40px;
	.text-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.align {
		display: inline-block;
		vertical-align: middle;
	}
	.filter {
		padding-bottom: 10px;
		.block {
			display: inline-block;
			padding-bottom: 10px;
		}
		.input-start {
			margin-left: 10px;
		}
		.input-box {
			.align;
		}
		.input-check {
			.align;
			font-size: 16px;
			margin-left: 20px;
			color: #333;
			i {
				height: 20px;
				width: 20px;
				border-radius: 2px;
				margin-right: 5px;
				color: #444;
				cursor: pointer;
				display: inline-block;
				border: 1px solid #bbb;
				vertical-align: middle;
				margin-top: -3px;
				&.active {
					background: url(../../res/icon/white_select.png) #28a8e0
						center no-repeat;
					border: 1px solid #28a8e0;
				}
			}
		}
		.store {
			.align;
			margin-left: 20px;
			position: relative;
			.store-btn {
				float: left;
				color: #666;
				width: 150px;
				height: 40px;
				line-height: 40px;
				border: 1px solid #ddd;
				cursor: pointer;
				span {
					float: left;
					width: 108px;
					height: 38px;
					padding: 0 10px;
				}
				i {
					float: right;
					border-left: 1px solid #b3b3b3;
					width: 40px;
					height: 38px;
					text-align: center;
					opacity: 0.5;
				}
			}
			.store-btn:hover {
				border: 1px solid #aaa;
			}
			.list {
				position: absolute;
				right: 0;
				top: 50px;
				width: 400px;
				background: #333;
				padding: 10px 5px 10px 10px;
				box-shadow: 0 5px 5px #666;
				z-index: 20;
				em {
					position: absolute;
					right: 10px;
					top: -10px;
					height: 0;
					width: 0;
					border-bottom: 10px solid #333;
					border-left: 7px solid transparent;
					border-right: 7px solid transparent;
				}
				ul {
					float: left;
					overflow: auto;
					max-height: 500px;
					width: 100%;
					li {
						height: 40px;
						line-height: 40px;
						padding: 0 15px;
						float: left;
						color: #fff;
						border: 1px solid #fff;
						margin: 5px;
						cursor: pointer;
						&.active {
							background: url(../../res/images/sign.png) right
								103% no-repeat;
							border-color: #ff9800;
						}
						&.all {
							width: 80px;
							text-align: center;
						}
					}
				}
			}
		}
		.store-show {
			width: 100%;
			margin-bottom: 10px;
			display: block;
			overflow: hidden;
			line-height: 20px;
			position: relative;
			i {float: left;position: absolute;left: 0;top: 0;}
			.store-block{
				overflow: hidden;
				width: 100%;
				padding-left: 84px;
				em{
					float: left;color: #09f;margin-right: 5px;
					cursor: pointer;text-decoration: underline;
				}
				span {
					float: left;
					color: #333;
				}
			}
		}
		.search-box {
			.align;
			width: 200px;
			height: 40px;
			margin-left: 10px;
			span {
				width: 80px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				border: 0;
				color: #fff;
				display: inline-block;
				cursor: pointer;
			}
			.search-btn {
				margin-right: 10px;
			}
		}
	}
	.check-div {
		display: inline-block;
		margin-left: 40px;
		cursor: pointer;
		i {
			height: 18px;
			width: 18px;
			display: inline-block;
			border-radius: 3px;
			margin-right: 5px;
			color: #444;
			border: 1px solid #bbb;
			vertical-align: middle;
			margin-top: -3px;
		}
	}
	.help-icon {
		display: inline-block;
		height: 18px;
		width: 18px;
		vertical-align: middle;
		cursor: pointer;
		margin-top: -3px;
		background: url(../../res/icon/orderdetial18.png) no-repeat;
	}
}
.busi-tips {
	position: absolute;
	max-width: 300px;
	padding: 15px;
	background: #333;
	color: #fff;
	line-height: 1.5;
	font-size: 14px;
	box-shadow: 0 5px 5px #666;
	z-index: 10;
	em {
		position: absolute;
		left: -10px;
		top: 12px;
		height: 0;
		width: 0;
		border-right: 10px solid #333;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
	}
}
</style>