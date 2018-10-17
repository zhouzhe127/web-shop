<template>
	<section class="pie">
		<div class="pie-main">
			<div class="head">
				<div class="item" v-for="(item,index) in pieCheckList" :key="index">
					<span>{{item.title}}</span>
				</div>
			</div>
			<div class="pie-block">
				<div class="block">
					<!--饼图容器-->
					<div id="pie-1"></div>
				</div>
				<div class="block line">
					<!--饼图容器-->
					<div id="pie-2"></div>
				</div>
			</div>
		</div>
		<div class="pie-main" v-if="!isBrand">
			<div class="head">
				<div class="item" v-for="(item,index) in pieCheckListOne" :key="index">
					<span>{{item.title}}</span>
				</div>
			</div>
			<div class="pie-block">
				<div class="block">
					<!--饼图容器-->
					<div id="pie-3"></div>
				</div>
				<div class="block line">
					<!--饼图容器-->
					<div id="pie-4"></div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			pieCheckList: [{ title: '消费总额占比' }, { title: '订单占比' }],
			pieCheckListOne: [
				{ title: '营业金额占比' },
				{ title: '优惠金额占比' }
			],
			//饼图数据，只需要给定数量 插件会自动计算百分百，饼图显示按如下循序显示 对应后台返回数据循序
			dataPie: {
				totalHuo: [
					//消费金额占比
					{ value: 0, name: '优惠金额' },
					{ value: 0, name: '实收金额' }
				],
				orderNum: [
					//订单占比
					{ value: 0, name: '堂吃' },
					{ value: 0, name: '外卖' },
					{
						value: 0,
						name: '快捷支付',
						itemStyle: { normal: { color: '#a16bff' } }
					}
				],
				goods: [
					//营业金额占比
					{ value: 0, name: '堂吃商品费' },
					{ value: 0, name: '服务费' },
					{ value: 0, name: '外卖商品费' },
					{
						value: 0,
						name: '快捷支付',
						itemStyle: { normal: { color: '#a16bff' } }
					}
				],
				discount: [
					//优惠金额占比
					{ value: 0, name: '赠品金额' },
					{ value: 0, name: '整单折扣' },
					{ value: 0, name: '整单强折' },
					{ value: 0, name: '单品折扣' },
					{ value: 0, name: '活动优惠券' },
					{ value: 0, name: '外卖活动补贴' },
					{ value: 0, name: '自营外卖活动补贴' },
					{ value: 0, name: '其它优惠' }
				]
			},
			formatPie: ['￥', ' ', '￥', '￥'],
			pieDom: [null, null, null, null],
			pieType: ['totalHuo', 'orderNum', 'goods', 'discount']
		};
	},
	props: ['pie', 'echarts', 'isBrand'],
	created() {
		if (this.isBrand) {
			this.dataPie = {
				totalHuo: [
					//消费金额占比
					{ value: 0, name: '优惠金额' },
					{ value: 0, name: '实收金额' }
				],
				orderNum: [
					//订单占比
					{ value: 0, name: '堂吃' },
					{ value: 0, name: '外卖' },
					{ value: 0, name: '自营外卖' },
					{
						value: 0,
						name: '快捷支付',
						itemStyle: { normal: { color: '#a16bff' } }
					}
				]
			};
		}
		this.chuData();
	},
	mounted() {
		if (this.echarts) this.initEchart();
		console.log(this.pie);
	},
	methods: {
		//实例化图形
		initEchart() {
			for (let i = 0; i < (this.isBrand ? 2 : 4); i++) {
				this.pieDom[i] = this.echarts.init(
					document.getElementById('pie-' + (i + 1))
				);
				this.pieDom[i].setOption(
					this.getPieDate(this.dataPie[this.pieType[i]], i)
				);
			}
		},
		getPieDate($data, index) {
			return {
				tooltip: {
					formatter: '{b}:' + this.formatPie[index] + '{c} ({d}%)'
				},
				series: [
					{
						type: 'pie',
						radius: '50%',
						center: ['50%', '50%'],
						label: {
							normal: {
								formatter:
									'{b|{b}}{c|' +
									this.formatPie[index] +
									'{c}}\n{hr|}\n {per|{d}%}  ',
								rich: {
									hr: {
										borderColor: '#333',
										width: '100%',
										borderWidth: 0.5,
										height: 0
									},
									b: {
										color: '#333',
										lineHeight: 22,
										align: 'left'
									},
									c: {
										color: '#C23531',
										lineHeight: 22,
										align: 'left'
									},
									per: {
										color: '#333',
										lineHeight: 22,
										align: 'left'
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
						},
						data: $data
					}
				],
				color: [
					'#fcd030',
					'#459cee',
					'#6fccc6',
					'#a16bff',
					'#fb2cff',
					'#ff3e17',
					'#ffc2b6',
					'#feffb7'
				]
			};
		},
		//处理数据
		chuData() {
			let proportion = this.pie;
			let obj = this.isBrand
				? { totalHuo: [], orderNum: [] }
				: { totalHuo: [], orderNum: [], goods: [], discount: [] };
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
			//删除部分为0的数据
			for (let j in obj) {
				if (
					obj[j].some(v => {
						return v != 0;
					})
				) {
					for (let n = 0; n < this.dataPie[j].length; n++) {
						if (this.dataPie[j][n].value == 0) {
							this.dataPie[j].splice(n, 1);
							n--;
						}
					}
				}
			}
		}
	}
};
</script>

<style lang="less" scoped>
.pie {
	width: 100%;
	overflow: auto;
	.pie-main {
		margin-bottom: 20px;
		border: 1px solid #ddd;
		border-radius: 10px;
		overflow: hidden;
		width: 100%;
		.head {
			overflow: hidden;
			background: #fafafa;
			.item {
				float: left;
				width: 50%;
				text-align: center;
				height: 50px;
				line-height: 50px;
				span {
					font-size: 18px;
				}
			}
		}
		.pie-block {
			position: relative;
			overflow: hidden;
			.block {
				float: left;
				width: 50%;
				height: 250px;
				text-align: center;
			}
			.block > div {
				width: 100%;
				height: 250px;
			}
			.line {
				border-left: 1px solid #ddd;
				border-image: linear-gradient(#ffffff, #ddd, #ffffff) 10 10;
			}
		}
	}
}
</style>