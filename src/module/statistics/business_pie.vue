<!--营业统计 饼图-->
<template>
	<div class="pie">
		<div class="pie-main">
			<div class="head">
				<div class="item" v-for="(item,index) in pieCheckList" :key="index">
					<span>{{item.title}} 
						<em class="help-icon" :data-name="item.tipsParam" v-if="item.tipsParam"></em>
						<div class="check-div select-ban" v-if="item.param"
							:class="{active:pieCheck[item.param]}" :data-index="index" @click="checkBtn"><i></i>含外卖</div>
					</span>
				</div>
			</div>
			<div class="pie-block">
				<div class="block">
					<!--饼图容器-->
					<div id="pie-1"></div>
				</div>
				<div class="block">
					<!--饼图容器-->
					<div id="pie-2"></div>
				</div>
				<div class="block">
					<!--饼图容器-->
					<div id="pie-3"></div>
				</div>
				<div v-if="coverShow" class="loding-cover pie-cover"><i class="el-icon-loading"></i></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['pie', 'cover', 'echarts'],
	data() {
		return {
			dataPie: {//饼图数据，只需要给定数量 插件会自动计算百分百，饼图显示按如下循序显示 对应后台返回数据循序
				goods: [
					//营业金额占比
					{ value: 0,name: '堂吃商品费'},
					{ value: 0,name: '服务费' },
					{ value: 0,name: '外卖商品费' },
					{ value: 0,name: '快捷支付',itemStyle:{normal:{color:'#a16bff'}}},
				],
				discount: [
					//优惠金额占比
					{ value: 0,name: '店内优惠' },
					{ value: 0,name: '活动优惠券' },
					{ value: 0,name: '外卖活动补贴' }
				],
				orderNum: [
					//订单占比
					{ value: 0,name: '堂吃'},
					{ value: 0,name: '外卖'},
					{ value: 0,name: '快捷支付',itemStyle:{normal:{color:'#a16bff'}}},
				]
			},
			pieCheckList:[
				{title:'营业金额占比',param:'goods',tipsParam:'pieGoods',name:'外卖商品费'},
				{title:'优惠金额占比',param:'discount',tipsParam:'pieDiscount',name:'外卖活动补贴'},
				{title:'订单占比'},
			],
			pieCheck: { goods: true, discount: true },
			pieSelect: [
				{
					'堂吃商品费': true,
					'服务费': true,
					'外卖商品费': true,
					'快捷支付':true,
				},
				{
					'店内优惠': true,
					'活动优惠券': true,
					'外卖活动补贴': true,
				},
				{
					'堂吃':true,
					'外卖':true,
					'快捷支付':true
				}
			],
			formatPie: ['￥', '￥', ' '],
			pieDom: [null, null, null],
			pieType: ['goods', 'discount', 'orderNum'],
			coverShow: false
		};
	},
	watch: {
		pie: 'analytic',
		cover: 'setCover',
		echarts: 'initEchart'
	},
	components: {},
	mounted() {
		if (this.echarts) this.initEchart();
	},
	methods: {
		initEchart() {
			//实例化图形
			for (let i = 0; i < 3; i++) {
				this.pieDom[i] = this.echarts.init(
					document.getElementById('pie-' + (i + 1))
				);
				this.pieDom[i].setOption(
					this.getPieDate(this.dataPie[this.pieType[i]], i)
				);
			}
		},
		setCover() {
			this.coverShow = this.cover;
		},
		analytic() {
			let proportion = this.pie;
			let obj = { goods: [], discount: [], orderNum: [] };
			//先将后台返回的数据转换成如下格式 方便循环
			for (let x in obj) {
				for (let m in proportion[x]) {
					obj[x].push(proportion[x][m]);
				}
			}
			//把转解析过的数据 赋值给dataPie 饼图要用的
			for (let i in proportion) {
				for (let n in this.dataPie[i]) {
					this.dataPie[i][n].value = obj[i][n];
				}
			}
			//因为是异步加载 所以先判断echarts是否加载完毕 再执行饼图初始化
			if (this.echarts) {
				for (let i = 0; i < 3; i++) {
					this.pieDom[i].setOption(
						this.getPieDate(this.dataPie[this.pieType[i]], i)
					);
				}
			}
		},
		checkBtn(event) {
			//饼图check选中
			let target = event.currentTarget;
			let index = parseInt(target.getAttribute('data-index'));
			let name = this.pieCheckList[index].name;
			let type = this.pieCheckList[index].param;
			if (this.pieCheck[type]) {
				this.pieCheck[type] = false; //隐藏
				this.pieSelect[index][name] = false;
			} else {
				this.pieCheck[type] = true; //显示
				this.pieSelect[index][name] = true;
			}
			this.pieDom[index].setOption(
				this.getPieDate(this.dataPie[type], index)
			);
		},
		getPieDate($data, index) {//$data每个饼图的样式及数据  index每个饼图的下标
			//获取饼图数据格式
			return {
				tooltip: {
					formatter: '{b}:' + this.formatPie[index] + '{c} ({d}%)'
				},
				legend: {
					selected: this.pieSelect[index]
				},
				series: [
					{
						type: 'pie',
						animation: false,
						data: $data,
						hoverAnimation: false,
						minAngle: 1,
						stillShowZeroSum: true,
						radius: [0, 80],
						itemStyle: {},
						label: {
							normal: {
								formatter: [
									'{title| {b}} {rate|{d}%}',
									'{hr|}'
								].join('\n'),
								rich: {
									title: {
										color: '#444',
										fontSize: 14,
										height: 20,
										align: 'left'
									},
									rate: {
										color: '#ff3c04',
										fontSize: 14,
										height: 20,
										align: 'right'
									},
									hr: {
										height: 1
									}
								}
							}
						},
						labelLine: {
							normal: {
								lineStyle: {
									color: '#333'
								}
							}
						}
					}
				],
				color: ['#fcd030', '#459cee', '#6fccc6','#a16bff']
			};
		}
	}
};
</script>

<style lang="less" scoped>
.pie {
	width: 100%;
	margin-top: 30px;
	border: 1px solid #ddd;
	overflow: auto;
	.pie-main {
		min-width: 1450px;
		width: 100%;
	}
	.head {
		overflow: hidden;
		background: #fafafa;
	}
	.item {
		float: left;
		width: 33.33%;
		text-align: center;
		height: 50px;
		line-height: 50px;
		span {
			font-size: 18px;
		}
	}
	.check-div:hover i {
		border: 1px solid #28a8e0;
	}
	.check-div.active i {
		background: url(../../res/icon/white_select.png) #28a8e0 center
			no-repeat;
		border: 1px solid #28a8e0;
	}
	.pie-block {
		position: relative;
		overflow: hidden;
	}
	.block {
		float: left;
		width: 33.33%;
		height: 250px;
		text-align: center;
	}
	.block > div {
		width: 100%;
		height: 250px;
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
	opacity: 0.7;
	text-align: center;
	display: flex;
	i{display: inline-block;font-size: 40px;margin: auto;color: #666;opacity: 1;}
}
.pie-cover {
	height: 250px;
}
</style>