<!--会员分析 饼状图-->
<template>
	<div class="broken">
		<div class="data_l">
			<div class="data_t">会员性别占比</div>
			<div class="data_b">
				<section>
					<div class="block">
						<!--饼图容器-->
						<div id="pie-1"></div>
					</div>
				</section>
			</div>
		</div>
		<div class="data_l">
			<div class="data_t">会员年龄占比(周岁)</div>
			<div class="data_b">
				<div class="block">
					<!--饼图容器-->
					<div id="pie-2"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['echarts', 'pie'],
	data() {
		return {
			pieDom: [null, null],
			dataPie: {
				gender: [
					//营业金额占比
					// { value: 0, name: '女性会员' },
					// { value: 0, name: '男性会员' },
					// { value: 0, name: '未知' }
				],
				age: [
					//优惠金额占比
					// { value: 0, name: '未知' },
					// { value: 0, name: '0-9' },
					// { value: 0, name: '10-18' },
					// { value: 0, name: '19-39' },
					// { value: 0, name: '40-59' },
					// { value: 0, name: '60以上' }
				],
			},
			pieType: ['gender', 'age'],
			genderType: {
				0: '未知',
				1: '男',
				2: '女'
			},
			ageType: {
				'未知': '未知',
				'0-9': '0～9岁',
				'10-18': '10～18岁',
				'19-39': '19～39岁',
				'40-59': '40～59岁',
				'60以上': '60岁以上',
			}
		};
	},
	watch: {
		echarts: 'initEchart',
		pie: 'analytic'
	},
	mounted() {
		if (this.echarts) this.initEchart();
	},
	methods: {
		initEchart() {
			//实例化图形
			for (let i = 0; i < 2; i++) {
				this.pieDom[i] = this.echarts.init(
					document.getElementById('pie-' + (i + 1))
				);
				this.pieDom[i].setOption(
					this.getPieDate(this.dataPie[this.pieType[i]], 0)
				);
			}
		},
		getPieDate($data) {
			//获取饼图数据格式
			return {
				tooltip: {
					formatter: '{b}:' + '{c} ({d}%)'
				},
				legend: {
					//selected: this.pieSelect[index]
				},
				series: [{
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
				}],
				color: ['#fcd030', '#459cee', '#6fccc6', '#A06BFF', '#FC8B40', '#DR7658']
			};
		},
		analytic() {
			let proportion = this.pie;
			this.dataPie.gender = [];
			this.dataPie.age = [];
			//获取会员的性别占比
			for (let i = 0; i < proportion.gender.length; i++) {
				let genderObj = {
					value: '',
					name: ''
				};
				genderObj.value = proportion.gender[i].count;
				genderObj.name = this.genderType[proportion.gender[i].gender];
				this.dataPie.gender.push(genderObj);
			}
			//获取会员的年龄占比
			for (let i = 0; i < proportion.age.length; i++) {
				let ageObj = {
					value: '',
					name: ''
				};
				ageObj.value = proportion.age[i].num;
				ageObj.name = this.ageType[proportion.age[i].ageRange];
				this.dataPie.age.push(ageObj);
			}
			//因为是异步加载 所以先判断echarts是否加载完毕 再执行饼图初始化
			if (this.echarts) {
				for (let i = 0; i < 2; i++) {
					this.pieDom[i].setOption(
						this.getPieDate(this.dataPie[this.pieType[i]], i)
					);
				}
			}
		},
	},
};
</script>
<style scoped>
.broken {
	max-width: 1247px;
	height: 339px;
	border: 1px solid #D2D2D2;
	display: flex;
}

.broken .data_l {
	width: 50%;
	height: 100%;
}

.broken .data_t {
	width: 100%;
	height: 50px;
	font-size: 16px;
	background: #F7F7F7;
	line-height: 50px;
	text-align: center;
}

.broken .data_b {
	width: 100%;
	height: 289px;
	padding: 30px 0px 30px 0px;
}

.broken .data_b .block {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
}

.broken .data_b .block>div {
	width: 100%;
	height: 250px;
}


.broken .data_b section {
	width: 100%;
	height: 100%;
	border-right: 1px solid #D2D2D2;
}
</style>