<!--营业统计 柱状图-->
<template>
	<div class="line">
		<div class="head">
			<span class="name">店铺</span>
			<div class="tab">
				<ul class="barTab select-ban" @click="tabBtn">
					<li v-for="(item,index) in tabList" :key="index" :data-index="index" :class="{active:tabIndex == index}">{{item.name}}</li>
				</ul>
			</div>
		</div>
		<div class="chart-box">
			<!--柱状图容器-->
			<div id="bar-charts"></div>
		</div>
		<div class="chart-select bar-check select-ban">
			<div v-for="(item,index) in checkList" :key="index" class="check-div" :class="[{active:barSelect[item.name]},item.className]" :data-index="index" @click="chartSelect">
				<i></i>{{item.name}}</div>
		</div>
		<div v-show="coverShow" class="loding-cover bar-cover"><i class="el-icon-loading"></i></div>
	</div>
</template>
<script>

import http from 'src/manager/http';

export default {
	props: ['cover', 'echarts', 'shopList','barObj'],
	data() {
		return {
			xAxis: {
				turnover: [],
				amount: [],
				orderNum: [],
				discount: [],
				passengerFlow: [],
			},
			dataBar: {
				total: {
					turnover: [],
					amount: [],
					orderNum: [],
					discount: [],
					passengerFlow: [],
				},
				eatIn: {
					turnover: [],
					amount: [],
					orderNum: [],
					discount: [],
					passengerFlow: [],
				},
				takeout: {
					turnover: [],
					amount: [],
					discount: [],
					orderNum: [],
					passengerFlow: [],
				},
				quickPayment:{
					turnover: [],
					amount: [],
					orderNum: [],
					discount: [],
					passengerFlow: [],
				}
			},
			tabList: [
				{ type: 'turnover', name: '营业总额' },
				{ type: 'discount', name: '优惠总额' },
				{ type: 'amount', name: '入账金额' },
				{ type: 'orderNum', name: '订单量' },
				{ type: 'passengerFlow', name: '客流量' }
			],
			checkList: [
				{ name: '总值', className: 'total' ,color:'#ff9800'},
				{ name: '堂吃', className: 'eatIn' ,color:'#fcd030'},
				{ name: '外卖', className: 'takeout' ,color:'#1b88ee'},
				{ name: '快捷支付', className: 'quickPayment' ,color:'#a16bff'},
			],
			xNameBar: '店铺名称',
			yNameBar: ['营业总额', '优惠总额', '入账金额', '订单量', '客流量'],
			yNameIndexBar: 0,
			tabIndex: 0,
			barType: 'turnover',
			sliderBarStart: 0,
			sliderBarEnd: 100,
			options: ['日', '周', '月', '季度', '年'],
			barDom: null,
			barSelect: {
				总值: true,
				堂吃: true,
				外卖: true,
				快捷支付:true,
			},
			coverShow: false,
			seriesData:[],//柱状图 样式列表
			reqObj:{},
			shopNum: 5,//每组的店铺数量
			idGroup:{},//每10个shopId分组
			alrGroup:[],//记录已经请求过的店铺id 防止重复请求
			eachRequestNum:0,//记录循环调用次数
			eachRequestObj:{},//循环请求获取的数据 最后在赋值给bar
			reserveData:{},
			dataZoom:{
				type: 'slider',
				show: true,
				startValue:'',
				endValue:'',
			},
			shopListObj:{},//店铺id对应name
		};
	},
	watch: {
		echarts: 'initEchart',
		barObj:{
			handler(newValue, oldValue) {
				this.reqObj = this.barObj;
				this.setIdGroup();
			},
			deep: true
		},
	},
	mounted() {
		if (this.echarts){
			this.initEchart();
		}
	},
	methods: {
		initEchart() {
			//实例化图表
			this.barDom = this.echarts.init(
				document.getElementById('bar-charts')
			);
			this.barDom.setOption(this.getBarData(this.barType));
			this.reqObj = this.barObj;
			this.setIdGroup();
			this.initData();

			//绑定echarts滚动条事件 监听滚动条编号
			//使用百分比监听滚动条变化
			this.barDom.on('datazoom',(params)=>{
				this.dataZoom.start = params.start;
				this.dataZoom.end = params.end;
				this.slide(params.start,params.end);
			});
		},
		//初始化数据 初始化数据只最多显示5家店铺 使用绝对值
		initData(){
			this.reserveData = {};//清空数据
			this.alrGroup = [];//清空已请求
			delete this.dataZoom.start;
			delete this.dataZoom.end;

			//店铺id对应名称，方便调用
			for(let item of this.reqObj.shopIds){
				for (let shop of this.shopList) {
					if(item==shop.id){
						this.shopListObj[item] = shop.shopName;
						break;
					}
				}
			}
			for(let i=0;i<this.reqObj.shopIds.length;i++){
				let item = this.reqObj.shopIds[i];
				this.$set(this.reserveData,item,{});
				
				if(this.reqObj.shopIds.length>=5){//选择店铺>=5
					if(i==0) this.dataZoom.startValue = this.shopListObj[item];
					if(i==4) this.dataZoom.endValue = this.shopListObj[item];
				}else{//选择店铺<5
					let start = this.reqObj.shopIds[0],
						end = this.reqObj.shopIds[this.reqObj.shopIds.length-1];
					this.dataZoom.startValue = this.shopListObj[start];
					this.dataZoom.endValue = this.shopListObj[end];
				}
			}
			this.slide(0,1);
		},
		//echarts滚动条变化调用
		slide(start,end){
			let shopLen = this.reqObj.shopIds.length;//店铺数量
			let groupNum = Math.ceil(shopLen/this.shopNum);//分组数量
			let point = parseInt(100/groupNum+'');//每次请求的临界点
			let endNum = parseInt(end+'');
			for(let i=0;i<groupNum;i++){
				if(endNum>point*i){
					let shopIds = this.setShopIds(i);
					if(shopIds){
						this.alrGroup.push(i);
						this.requestBarData(shopIds);
					}
				}
			}
		},
		//请求数据
		async requestBarData(shopIds){
			this.coverShow = true;
			let data = await http.BusinessGetStatByShopIds({data:{
				startTime: this.reqObj.reqStartTime,
				endTime: this.reqObj.reqEndTime,
				shopIds: shopIds.join('-'),
				isOpenTime: this.reqObj.openTime,
			}});
			this.coverShow = false;
			for(let key in data){
				this.reserveData[key] = data[key];
			}
			this.analytic();
		},
		//设置请求的shopIds 并返回
		setShopIds(num){
			let alrRequst = false;//是否已经请求过数据 默认未请求
			for(let item of this.alrGroup){
				if(num==item){
					alrRequst = true;
					break;
				}
			}
			if(!alrRequst){
				return this.idGroup[num];
			}else{
				return false;
			}
		},
		//设置id分组
		setIdGroup(){
			this.idGroup = {};
			let grounNum = Math.ceil(this.reqObj.shopIds.length/this.shopNum);
			for(let i=0;i<grounNum;i++){
				let begin = this.shopNum*i,end = this.shopNum*(i+1);
				let sliceArr = this.reqObj.shopIds.slice(begin,end);
				this.idGroup[i] = sliceArr;
			}
		},
		setCover() {
			this.coverShow = this.cover;
		},
		analytic() {
			let bar = this.reserveData;
			for (let x in this.dataBar) {
				//清空之前的数据,不做其他处理
				for (let m in this.dataBar[x]) {
					this.xAxis[m] = [];
					this.dataBar[x][m] = [];
				}
			}
			let xBar = [];
			for (let i in bar) {
				//1遍历 i = 店铺id
				for (let item of this.shopList) {
					//通过店铺id匹配店铺名称
					if (item.id == i) {
						xBar.push(item.shopName);
					}
				}
				
				for (let xKey in this.xAxis) {
					//店铺名称加入x轴
					this.xAxis[xKey] = xBar;
				}
				for (let j in bar[i]) {
					//2遍历 j = eatIn/takeout/total/quickPayment/
					for (let k in bar[i][j]) {
						//3遍历 k = turnover/amount/orderNum/discount/passengerFlow
						this.dataBar[j][k].push(bar[i][j][k]);
					}
				}
			}
			if (this.echarts) {
				this.setBarListData(this.barType);//循环设置柱状图图样式列表
				this.barDom.setOption(this.getBarData(this.barType));
			}
		},
		chartSelect(event) {
			let target = event.currentTarget;
			let index = parseInt(target.getAttribute('data-index'));
			let name = this.checkList[index].name;
			this.barSelect[name] = !this.barSelect[name];
			this.setBarListData(this.barType);//循环设置柱状图图样式列表
			this.barDom.setOption(this.getBarData(this.barType));
		},
		tabBtn() {
			let target = event.target;
			if (target.tagName.toLocaleLowerCase() == 'li') {
				let index = parseInt(target.getAttribute('data-index'));
				this.tabIndex = index;
				this.barType = this.tabList[index].type;
				this.yNameIndexBar = index; //重置图表下标
				this.setBarListData(this.barType);//循环设置柱状图图样式列表
				this.barDom.setOption(
					this.getBarData(this.barType)
				); //重置柱状图表数据
			}
		},
		setBarListData($name){//设置折线图的样式
			let list=[];//折线图样式列表
			for(let item of this.checkList){
				let obj = {
					name: item.name,
					type: 'bar',
					animation: true,
					barWidth: 15,
					barGap:'20%',
					itemStyle: {
						normal: {
							color: item.color
						}
					},
					data: this.dataBar[item.className][$name],
				};
				list.push(obj);
			}
			this.seriesData = list;
		},
		getBarData($name) {
			//获取柱状图数据格式
			return {
				legend: {
					selected: this.barSelect
				},
				grid: {
					top: 30,
					left: 80,
					right: 70,
					bottom: 70
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						animation: false,
						label: {
							backgroundColor: '#505765'
						}
					}
				},
				xAxis: [
					{
						name: this.xNameBar,
						axisTick: { show: false },
						data: this.xAxis[$name]
					}
				],
				yAxis: [
					{
						name: this.yNameBar[this.yNameIndexBar],
						type: 'value',
						axisTick: {
							show: false
						}
					}
				],
				dataZoom: [
					this.dataZoom,
				],
				series: this.seriesData
			};
		}
	}
};
</script>

<style lang="less" scoped>
.line {
	width: 100%;
	border: 1px solid #ddd;
	margin-top: 30px;
	position: relative;
	.head {
		height: 100px;
		position: relative;
		.name {
			position: absolute;
			left: 0;
			top: 30px;
			font-size: 20px;
			padding-left: 20px;
			color: #444;
		}
		.tab {
			width: 100%;
			padding: 30px 0;
		}
		ul {
			width: 100%;
			text-align: center;
		}
		li {
			display: inline-block;
			width: 120px;
			height: 40px;
			line-height: 38px;
			text-align: center;
			margin: 0 7px;
			font-size: 16px;
			color: #333;
			background: #f2f2f2;
			border-radius: 3px;
			cursor: pointer;
			border: 1px solid #f2f2f2;
			&:hover {
				border: 1px solid #28a8e0;
				color: #28a8e0;
			}
			&.active {
				background: #28a8e0;
				color: #fff;
				border: 1px solid #28a8e0;
			}
		}
		@media only screen and (max-width: 1200px) {
			.name {
				font-size: 16px;
			}
			li {
				width: 100px;
				font-size: 14px;
				height: 35px;
				line-height: 32px;
			}
		}
	}
	.chart-box {
		overflow: auto;
		padding-bottom: 50px;
		#bar-charts {
			height: 390px;
		}
	}
	.chart-box > div {
		width: 100%;
		height: 350px;
	}
	.chart-select {
		position: absolute;
		bottom: 25px;
		left: 0;
		width: 100%;
		text-align: center;
		div {
			margin: 0 20px;
			color: #444;
		}
		i {
			margin-right: 10px;
		}
		.total:hover i {
			border: 1px solid #ff9800;
		}
		.eatIn:hover i {
			border: 1px solid #fcd030;
		}
		.takeout:hover i {
			border: 1px solid #1b88ee;
		}
		.quickPayment:hover i {
			border: 1px solid #a16bff;
		}
		.total.active i {
			border: 1px solid #ff9800;
			background: url(../../res/icon/white_select.png) #ff9800 center
				no-repeat;
		}
		.eatIn.active i {
			border: 1px solid #fcd030;
			background: url(../../res/icon/white_select.png) #fcd030 center
				no-repeat;
		}
		.takeout.active i {
			border: 1px solid #1b88ee;
			background: url(../../res/icon/white_select.png) #1b88ee center
				no-repeat;
		}
		.quickPayment.active i {
			border: 1px solid #a16bff;
			background: url(../../res/icon/white_select.png) #a16bff center
				no-repeat;
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
.loding-cover {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9;
	background: #fff;
	opacity: 0.9;
	text-align: center;
	display: flex;
	i{display: inline-block;font-size: 40px;margin: auto;color: #666;}
}
.bar-cover {
	height: 340px;
	bottom: 100px;
}
</style>