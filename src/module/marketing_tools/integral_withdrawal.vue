<!--
    **积分抵现配置
    *
    * 胡江
    * *
    *
-->
<template>
	<div id="integral-consume">
		<div class="ic-title">
			<div class="text">
				基本设置
			</div>
			<div class="dashed">
			</div>
		</div>
		<div class="ic-line">
			<div class="text">
				开启积分抵扣
			</div>
			<!-- <on-off :status="open" @statusChange="getIsDiscountToggle"></on-off> -->
			<el-switch v-model="open" active-color="#E1BB4A" inactive-color="#dcdfe6">
			</el-switch>
		</div>
		<div class="ic-line">
			<div class="text required" style="margin-left: 158px;">
				抵扣渠道
			</div>
			<div class="fl selectbtns">
				<!-- <span v-for="(item,index) in canalList" :key='index' :class="{sign:selectCanal.indexOf(item.index)!=-1}" @click="doMore(item.index)">{{item.name}}</span> -->
				<mulSelect :list.sync="canalList" :selects.sync="selectCanal" :styles="{'marginRight':'8px'}" :name='"name"' :key='"id"'></mulSelect>
			</div>
		</div>
		<div class="ic-line">
			<div class="text required" style="margin-left:130px;">
				积分抵扣比例
			</div>
			<!-- <div class="integralDiv">
				积分
			</div>
			<input type="text" class="input fl inputOne" v-model="point" maxlength="8">
			<div class="text fl" style="margin: 0 10px;">
				:
			</div>
			<div class="integralNum" style="">
				元
			</div>
			<input type="text" class="input fl inputTwo" v-model="pointCash" maxlength="8"> -->
			<el-input v-model="point" class="fl inputOne" maxlength="8">
				<template slot="suffix">积分</template>
			</el-input>
			<div class="text fl" style="margin: 0 10px;">
				:
			</div>
			<el-input v-model="pointCash" class="fl inputOne" maxlength="8">
				<template slot="suffix">元</template>
			</el-input>
		</div>
		<div class="ic-title">
			<div class="text">
				设置规则
			</div>
			<div class="dashed">
			</div>
		</div>
		<div class="ic-line">
			<div class="text">
				积分抵扣上限
			</div>
			<!-- <template v-for="(item,index) in maxList" >
				<div class="fl integralTop" :class="{icSelect:index == maxSelect}" @click="changeSelect('maxSelect',index)" :key="index">
					{{item}}
				</div>  
			</template> -->
			<el-radio-group v-model="maxSelectName" class="fl">
				<el-radio v-for="(item,index) in maxList" :key="index" :label="item" border @change.native="clicktheRadio(item,index)"></el-radio>
			</el-radio-group>
		</div>
		<template v-if="maxSelect == 1">
			<div class="ic-line">
				<div class="text" style="margin-left:168px;">
					计算方式
				</div>
				<!-- <template v-for="(item,index) in computerWay">
					<div class="fl computeStyle" :class="{icSelect:index == selectComputerWay}" @click="changeSelect('selectComputerWay',index)"
					    :key="index">
						{{item}}
					</div>
				</template> -->
				<el-radio-group v-model="computerWayName" class="fl">
					<el-radio v-for="(item,index) in computerWay" :key="index" :label="item" border @change.native="selectComputer(item,index)"></el-radio>
				</el-radio-group>
			</div>
			<div class="ic-line">
				<div class="text" style="margin-left:154px;">
					最多为订单
				</div>
				<!-- <div class="maxOrder">
					%
				</div>
				<input type="text" class="input orderInput" v-model="maxDate.percentage" maxlength="3" placeholder="请输入百分比"> -->
				<el-input v-model="maxDate.percentage" class="fl totalInput" type="text" maxlength="3" placeholder="请输入百分比">
					<template slot="suffix">%</template>
				</el-input>
			</div>
		</template>
		<div class="ic-line" v-if="maxSelect == 2">
			<div class="text" style="margin-left: 154px;">
				最多金额为
			</div>
			<!-- <div class="maxNumber">
				元
			</div>
			<input type="text" class="input numInput" v-model="maxDate.money" maxlength="10" placeholder="请输入金额"> -->
			<el-input v-model="maxDate.money" class="input numInput" type="text" maxlength="10" placeholder="请输入金额">
				<template slot="suffix">元</template>
			</el-input>
		</div>
		<div class="ic-title">
			<div class="text">
				积分使用上限
			</div>
			<div class="dashed">
			</div>
		</div>
		<div class="ic-line">
			<div class="text required" style="margin-left: 116px;">
				最多使用总积分
			</div>
			<!-- <div class="useIntegral">
				%
			</div>
			<input type="text" class="input useInput" v-model="maxPointRate" maxlength="3" placeholder="请输入百分比"> -->
			<el-input v-model="maxPointRate" class="useInput" type="text" maxlength="3" placeholder="请输入百分比">
				<template slot="suffix">%</template>
			</el-input>
		</div>
		<div class="ic-title" style="margin-top: 10px;">
			<div class="text">
				积分抵扣条件
			</div>
			<div class="dashed">
			</div>
		</div>
		<div class="ic-line">
			<div class="text" style="margin-left: 168px;">
				计算方式
			</div>
			<!-- <template v-for="(item,index) in conditionList">
				<div class="fl numStyleOne" :class="{icSelect:index == selectConditionList}" @click="changeSelect('selectConditionList',index)"
				    :key="index">
					{{item}}
				</div>
                <el-radio v-model="radio3" class="fl numStyleOne" :label="item" @click="changeSelect('selectConditionList',index)" border></el-radio>
			</template> -->
			<el-radio-group v-model="conditionListName" class="fl">
				<el-radio v-for="(item,index) in conditionList" :key="index" :label="item" border @change.native="conditionSelect(item,index)"></el-radio>
			</el-radio-group>
		</div>
		<div class="ic-line" v-if="selectConditionList != 0">
			<div class="text required" style="margin-left: 144px;" v-if="selectConditionList == 1">
				人均消费满
			</div>
			<div class="text required" style="margin-left: 158px;" v-if="selectConditionList == 2">
				总消费满
			</div>
			<!-- <div class="totalNumber">
				元
			</div>
			<input type="text" class="input fl totalInput" v-model="minCash" maxlength="10" placeholder="请输入金额"> -->
			<el-input v-model="minCash" class="fl totalInput" type="text" maxlength="10" placeholder="请输入金额">
				<template slot="suffix">元</template>
			</el-input>
			<div class="fl" style="margin-left: 10px;">
				允许使用
			</div>
		</div>
		<div class="ic-title" style="margin-top: 10px;">
			<div class="text">
				使用方式
			</div>
			<div class="dashed">
			</div>
		</div>
		<div class="ic-line">
			<div class="text" style="margin-left: 168px;">
				使用方式
			</div>
			<!-- <template v-for="(item,index) in userWay">
				<div class="fl useStyleOne" :class="{icSelect:index == selectUserWay}" @click="changeSelect('selectUserWay',index)" :key="index">
					{{item}}
				</div>
                <el-radio v-model="radio4" class="fl useStyleOne" :label="item" @click="changeSelect('selectUserWay',index)" :key="index" border></el-radio>
			</template> -->
			<el-radio-group v-model="userWayName" class="fl">
				<el-radio v-for="(item,index) in userWay" :key="index" :label="item" border @change.native="userWaySelect(item,index)"></el-radio>
			</el-radio-group>
			<img src="../../res/images/prompt.png" class="useImg" />
			<div class="text" style="margin-left: 4px;">
				最大限度使用
			</div>
		</div>
		<!-- <a href="javascript:void(0);" class="yellow useA" @click="updatePointConfig" v-if="update">保存</a> -->
		<el-button type="primary" class="yellow useA" @click="updatePointConfig" v-if="update">保存</el-button>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';

	export default {
		data() {
			return {
				userData: Object,
				update: false, //是否有权限保存
				open: false, //是否开启积分抵扣
				canalList: [
					{
						name: 'pos收银',
						id: '1'
					},
					{
						name: '微店',
						id: '2'
					},
					{
						name: '扫码支付',
						id: '3'
					}
				], //抵扣渠道列表
				selectCanal: [],
				point: null, //积分抵扣值
				pointCash: null, //抵扣金额数
				maxList: ['无条件', '按百分比', '按现金消费'], //积分抵扣上限的方式列表
				maxSelectName: '无条件',
				maxSelect: 0, //积分抵扣上限的选择
				maxDate: {
					money: null,
					percentage: null
				}, //设置规则里面的 输入框 百分比 和 元
				maxPointRate: null, //可使用的总积分
				computerWayName: '打折前',
				computerWay: ['打折前', '打折后'], // 设置规则里面的 计算方式
				selectComputerWay: 0, //选中的计算方式
				conditionListName: '无条件',
				conditionList: ['无条件', '人均消费', '总消费'], //积分抵扣条件列表
				selectConditionList: 0,
				minCash: null, //使用积分的条件金额
				userWayName: '手动输入',
				userWay: ['手动输入', '自动计算'], //使用方式
				selectUserWay: 0,
				checked3: true
			};
		},
		mounted() {
			this.userData = storage.session('userShop');
			if (this.userData.currentShop && this.userData.currentShop.ischain == 3) {
				this.update = true;
			}
			if (this.userData.currentShop && this.userData.currentShop.ischain == 0) {
				this.update = true;
			}
			this.getPointConfig();
		},
		methods: {
			// getIsDiscountToggle(res) {
			// 	this.open = res;
			// },
			doMore(res) {
				if (this.selectCanal.indexOf(res) != -1) {
					this.selectCanal = this.selectCanal.replace(res, '');
				} else {
					if (res == 1) {
						this.selectCanal = res.concat(this.selectCanal);
					} else {
						this.selectCanal = this.selectCanal.concat(res);
					}
				}
			},
			//初始化
			async getPointConfig() {
				let res = await http.getPointConf({
					data: {
						shopId: this.userData.currentShop.id
					}
				});
				if (res) {
					this.init(res);
				}
			},
			init(info) {
				if (info.status == '0') {
					this.open = false;
				} else if (info.status == '1') {
					this.open = true;
				}
				if (info.channel == '0') {
					info.channel = '';
				}
				info.channel += '';

				this.selectCanal = [];
				for (let i = 0; i < info.channel.length; i++) {
					this.selectCanal.push(info.channel[i]);
				}


				this.point = info.point;
				this.pointCash = info.pointCash;
				if (info.maxRule == 0) {
					this.maxSelect = 0;
				} else if (info.maxRule == 1) {
					this.maxSelect = 1;
					this.selectComputerWay = 0;
					this.maxDate.percentage = info.maxRuleValue;
				} else if (info.maxRule == 2) {
					this.maxSelect = 1;
					this.selectComputerWay = 1;
					this.maxDate.percentage = info.maxRuleValue;
				} else if (info.maxRule == 3) {
					this.maxSelect = 2;
					this.maxDate.money = info.maxRuleValue;
				}
				this.maxSelectName = this.maxList[this.maxSelect];
				this.computerWayName = this.computerWay[this.selectComputerWay];

				this.maxPointRate = info.maxPointRate;
				this.selectConditionList = info.pointUseRule;
				this.conditionListName = this.conditionList[this.selectConditionList];
				this.minCash = info.minCash;
				this.selectUserWay = info.useMode;
				this.userWayName = this.userWay[this.selectUserWay];
			},
			//保存
			async updatePointConfig() {
				if (this.testInfo()) {
					let obj = {};
					let channel = '';
					for (let item of this.selectCanal) {
						channel += item;
					}
					obj.channel = channel;
					obj.maxPointRate = this.maxPointRate;
					obj.point = this.point;
					obj.pointCash = this.pointCash;
					if (this.maxSelect == 1) {
						if (this.selectComputerWay == 0) {
							obj.maxRule = 1;
							obj.maxRuleValue = this.maxDate.percentage;
						} else if (this.selectComputerWay == 1) {
							obj.maxRule = 2;
							obj.maxRuleValue = this.maxDate.percentage;
						}
					} else if (this.maxSelect == 2) {
						obj.maxRule = 3;
						obj.maxRuleValue = this.maxDate.money;
					} else {
						obj.maxRule = 0;
					}
					obj.pointUseRule = this.selectConditionList;
					obj.minCash = this.minCash;
					obj.useMode = this.selectUserWay;
					obj.status = this.open ? '1' : '0';
					obj.updateUid = this.userData.user.id;
					obj.shopId = this.userData.currentShop.id;
					let res = await http.updatePointConf({
						data: obj
					});
					if (res) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '保存成功'
						});
					}
				}
			},
			testInfo() {
				let znum = /^[0-9]+$/; //正整数
				if (this.point == 0) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '基本设置中,积分抵扣比例中积分不能为0'
					});
					return false;
				}
				if (this.pointCash == 0) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '基本设置中,积分抵扣比例中金额不能为0'
					});
					return false;
				}
				if (!znum.test(this.point)) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '基本设置中,积分抵扣比例中积分只能是正整数'
					});
					return false;
				}

				if (this.selectCanal.length == 0) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '基本设置中,抵扣渠道至少要有一个'
					});
					return false;
				}

				if (!znum.test(this.pointCash)) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '基本设置中,积分抵扣比例中金额只能是正整数'
					});
					return false;
				}
				let bol = false;
				if (
					this.point % this.pointCash == 0 ||
					this.pointCash % this.point == 0
				) {
					bol = true;
				}
				if (!bol) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '基本设置中,积分抵扣 积分和金额需要满足相互整除'
					});
					return false;
				}

				if (this.maxSelect == 1) {
					if (!znum.test(this.maxDate.percentage) ||
						this.maxDate.percentage - 0 > 100 ||
						this.maxDate.percentage - 0 == 0
					) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '设置规则中,按百分比比例只能是(1-100)正整数'
						});
						return false;
					}
				} else if (this.maxSelect == 2) {
					if (!znum.test(this.maxDate.money) || this.maxDate.money == 0) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '设置规则中,按现金消费抵扣金额只能是大于0的正整数'
						});
						return false;
					}
				}

				if (!znum.test(this.maxPointRate) ||
					this.maxPointRate - 0 > 100 ||
					this.maxPointRate - 0 == 0
				) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '积分使用上限中,最多使用总积分只能是(1-100)正整数'
					});
					return false;
				}
				if (this.selectConditionList != 0) {
					let str = this.selectConditionList == 1 ? '人均消费额度' : '总消费额度';
					if (this.minCash == 0) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: `积分抵扣条件中,${str}不能为0`
						});
						return false;
					}
					if (!znum.test(this.minCash)) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: `积分抵扣条件中,${str}最多使用总积分只能是大于0的整数`
						});
						return false;
					}
				}
				return true;
			},
			changeSelect(item, index) {
				//改变积分抵扣上限
				this[item] = index;
			},
			clicktheRadio: function (item, index) {
				this.maxSelect = index;
			},
			conditionSelect: function (item, index) {
				this.selectConditionList = index;
			},
			selectComputer: function (item, index) {
				this.selectComputerWay = index;
			},
			userWaySelect: function (item, index) {
				this.selectUserWay = index;
			},
		},
		components: {
			onOff: () =>
				import( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
			mulSelect: () =>
				import( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
		}
	};
</script>
<style type="text/css" scoped>
	#integral-consume .ic-title {
		/*width: 1400px;*/
		width: 100%;
		height: 30px;
		line-height: 30px;
		position: relative;
	}

	#integral-consume .ic-title .text {
		width: 120px;
		height: 20px;
		line-height: 20px;
		text-indent: 10px;
		position: absolute;
		left: 0;
		top: 10px;
		border-left: 6px solid #f8931f;
	}

	#integral-consume .ic-title .dashed {
		width: 87%;
		height: 10px;
		border-top: 1px dashed rgb(228, 229, 230);
		position: absolute;
		right: 0;
		top: 20px;
	}

	#integral-consume .ic-line {
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin-top: 20px;
		position: relative;
	}

	#integral-consume .ic-line .text {
		float: left;
		margin-left: 140px;
		margin-right: 10px;
	}

	/*多选*/

	/* .ic-line .selectbtns {
		width: 400px;
		height: 40px;
	}

	.ic-line .selectbtns span {
		display: inline-block;
		height: 40px;
		line-height: 40px;
		padding-left: 18px;
		padding-right: 18px;
		background-color: #f1f1f1;
		text-align: center;
		cursor: pointer;
		margin-right: 8px;
	} */

	.sign {
		background: url("../../res/images/sign.png") right bottom no-repeat;
	}

	.ic-line .integralDiv {
		position: absolute;
		top: 0;
		left: 290px;
		width: 40px;
		height: 40px;
		text-align: center;
	}

	.ic-line .integralNum {
		position: absolute;
		top: 0;
		left: 420px;
		width: 40px;
		height: 40px;
		text-align: center;
	}

	.ic-line .inputOne {
		width: 100px;
	}

	.ic-line .integralTop {
		width: 100px;
		height: 40px;
		text-align: center;
		/* border: 1px solid rgb(189, 190, 191); */
		margin-right: 10px;
		cursor: pointer;
	}

	.ic-line .computeStyle {
		width: 100px;
		height: 40px;
		text-align: center;
		/* border: 1px solid rgb(189, 190, 191); */
		margin-right: 10px;
		cursor: pointer;
	}

	.ic-line .maxOrder {
		position: absolute;
		top: 0;
		left: 410px;
		width: 40px;
		height: 40px;
		text-align: center;
	}

	.ic-line .orderInput {
		width: 210px;
		/* border: 1px solid rgb(189, 190, 191); */
	}

	.ic-line .maxNumber {
		position: absolute;
		top: 0;
		left: 410px;
		width: 40px;
		height: 40px;
		text-align: center;
	}

	.ic-line .numInput {
		width: 210px;
		/* border: 1px solid rgb(189, 190, 191); */
	}

	.ic-line .useIntegral {
		position: absolute;
		top: 0;
		left: 410px;
		width: 40px;
		height: 40px;
		text-align: center;
	}

	.useInput {
		width: 210px;
		/* border: 1px solid rgb(189, 190, 191); */
	}

	.numStyleOne {
		width: 100px;
		height: 40px;
		text-align: center;
		/* border: 1px solid rgb(189, 190, 191); */
		margin-right: 10px;
		cursor: pointer;
	}

	.totalNumber {
		position: absolute;
		top: 0;
		left: 400px;
		width: 40px;
		height: 40px;
		text-align: center;
	}

	.totalInput {
		width: 200px;
		/* border: 1px solid rgb(189, 190, 191); */
	}

	.useStyleOne {
		width: 100px;
		height: 40px;
		text-align: center;
		/* border: 1px solid rgb(189, 190, 191); */
		margin-right: 10px;
		cursor: pointer;
	}

	.useImg {
		margin-top: 11px;
		float: left;
	}

	.useA {
		width: 200px;
		margin: 40px 0 0 235px;
	}

	#integral-consume .icSelect {
		border: 1px solid rgb(244, 147, 50) !important;
		background-color: rgb(249, 240, 227);
		color: #f39801;
	}
</style>