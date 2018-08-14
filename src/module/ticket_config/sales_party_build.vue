<!--
	**新建销方管理
	*
	* 胡江
	* *
	*
-->
<template>
	<section id="table">
		<div class="content-box">
			<div class="content-title">
				<span class="titles">新建销方管理</span>
			</div>
		</div>
		<div class="content-box" v-if="!isAdd">
			<span class="fl sub-heading required">原销方税号</span>
			<input type="text" maxlength="20" :value="yidentifier" :disabled="true" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">销方税号</span>
			<input type="text" placeholder="请输入税号，15位、18位或20位”" maxlength="20" v-model="salesInfo.identifier" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">销方名称</span>
			<input type="text" placeholder="请输入销方名称" maxlength="100" v-model="salesInfo.name" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">销方地址</span>
			<input type="text" placeholder="请输入销方地址" maxlength="100" v-model="salesInfo.address" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">销方电话</span>
			<input type="text" style="width: 200px;" placeholder="请输入销方电话" maxlength="20" v-model="salesInfo.telephoneNo" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">销方银行</span>
			<input type="text" placeholder="请输入销方银行" maxlength="100" v-model="salesInfo.bank" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">销方银行账户</span>
			<input type="text" placeholder="请输入销方银行账户" maxlength="30" v-model="salesInfo.bankAcc" />
		</div>
		<div class="content-box" v-if="isAdd">
			<span class="fl sub-heading required">开票人</span>
			<input type="text" style="width: 200px;" placeholder="请输入开票人" maxlength="4" v-model="salesInfo.drawer" />
		</div>
		<div class="content-box" v-if="isAdd">
			<span class="fl sub-heading required">开票类型</span>
			<radioBtn @selOn="doThrowWinResult" :list="ticketType" :index="ticketTypeIndex" :name='"name"'></radioBtn>
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">电子票开票限额</span>
			<radioBtn @selOn="selTicketLimit" :list="ticketLimit" :index="ticketLimitIndex" :name='"name"'></radioBtn>
		</div>
		<template v-if="isAdd">
			<div class="content-box">
				<div class="content-title">
					<span class="titles">其它配置</span>
				</div>
			</div>
			<div class="content-box">
				<span class="fl sub-heading">一般纳税人起始时间</span>
				<section class="statisticsLists" v-show="noSelTime">
					<section @click="isShowSelTime()" class="tableListInp chairFix">
						<span class="spanSty">请选择时间</span>
						<div class="fl calendar-ctr">
							<i></i>
						</div>
					</section>
				</section>
				<calendar v-show="!noSelTime" :time="taxpayerTime" :show="true" :type="2" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
			</div>
			<div class="content-box">
				<span class="fl sub-heading">一般纳税人类型</span>
				<selectBtn @emit="changeTaxpayerType" :sorts="taxpayerTypeList" :name="taxpayerTypeName" :selected.sync="taxpayerTypeNum"></selectBtn>
			</div>
			<!--<div class="content-box">-->
			<!--<span class="fl sub-heading">选择地址</span>-->
			<!--<div v-if="isSeeSales" class="divClass">{{showAddress}}</div>-->
			<!--<addressLinkage v-else @emit="getAddress" :province="salesInfo.province" :city="salesInfo.city" :area="salesInfo.town" :width="'300'"></addressLinkage>-->
			<!--</div>-->
			<!--<div class="content-box">-->
			<!--<span class="fl sub-heading">详细地址</span>-->
			<!--<input type="text" placeholder="请输入详细地址" maxlength="100" v-model="salesInfo.detailedAddress"  :disabled="isSeeSales"/>-->
			<!--</div>-->
			<div class="content-box">
				<span class="fl sub-heading">复核人</span>
				<input type="text" style="width: 200px;" placeholder="请输入复核人" maxlength="4" v-model="salesInfo.reviewer" />
			</div>
			<div class="content-box">
				<span class="fl sub-heading">收款人</span>
				<input type="text" style="width: 200px;" placeholder="请输入收款人" maxlength="4" v-model="salesInfo.payee" />
			</div>
		</template>

		<!--<div class="content-box">-->
		<!--<span class="fl sub-heading">电子票分票金额</span>-->
		<!--<input type="text" style="width: 200px;" placeholder="大于零且小于开票限额" maxlength="14" v-model="salesInfo.sumMoney"  :disabled="isSeeSales"/>-->
		<!--</div>-->
		<!--<ticketedPoint :seller="true" @seller="backThing" v-if="!isSeeSales&&!salesId"-->
		<!--&gt;</ticketedPoint>-->
		<div class="content-box" style="margin-top: 50px">
			<span class="fl sub-heading"></span>
			<a href="javascript:;" style="background: #B3B3B3;" @click="del()">取消</a>
			<a href="javascript:;" style="background: #FF9200;" @click="save()">保存</a>
		</div>
	</section>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			salesInfo: {
				identifier: '', //销方税号
				name: '', //销方名称
				address: '', //销方地址
				telephoneNo: '', //销方电话
				bank: '', //销方银行
				bankAcc: '', //销方银行账户

				drawer: '', //开票人
				reviewer: '', //复核人
				payee: '' //收款人
			},
			taxpayerTime: '', //一般纳税人起始时间
			taxpayerTypeList: ['不适用', '全部适用', '部分适用'],
			taxpayerTypeName: '请选择一般纳税人类型', //一般纳税人类型
			taxpayerTypeNum: -1,
			ticketType: [
				{ id: '01', name: '客户端' },
				{ id: '03', name: '服务器' },
				{ id: '04', name: '税控盒子' }
			], //开票类型
			ticketTypeIndex: 0, //初始设置为客户端
			ticketLimit: [
				{ id: 0, name: '百元版999.99', num: 999.99 },
				{ id: 1, name: '千元版9999.99', num: 9999.99 },
				{ id: 2, name: '万元版99999.99', num: 99999.99 }
			], //开票额度
			ticketLimitIndex: '0',

			noSelTime: true, //请选择时间
			yidentifier: '' //原销方账号
		};
	},
	props: ['isAdd', 'editData'],
	created() {
		if (!this.isAdd) {
			this.salesInfo = utils.deepCopy(this.editData); //编辑的数据
			this.yidentifier = this.salesInfo.identifier;
			this.ticketLimitIndex = -1;
		}
		this.$store.commit('setPageTools', []);
	},
	methods: {
		//改变纳税人类型
		changeTaxpayerType(index) {
			this.taxpayerTypeNum = index;
		},
		//是否展示时间选择的插件
		isShowSelTime() {
			this.noSelTime = false;
		},
		//选择开始时间
		startTimeChange(time) {
			this.taxpayerTime = time;
		},
		//时间转换
		timestampToTime(time) {
			let date = new Date(time);
			let Y = date.getFullYear();
			let M =
				date.getMonth() + 1 < 10
					? '0' + (date.getMonth() + 1)
					: date.getMonth() + 1 + '';
			return Y + M;
		},
		//选择开票类型
		doThrowWinResult(index) {
			this.ticketTypeIndex = index;
		},
		selTicketLimit(index) {
			this.ticketLimitIndex = index;
		},
		//新增、编辑销方
		async addSales() {
			this.salesInfo.yidentifier = this.isAdd
				? this.salesInfo.identifier
				: this.yidentifier;
			if (this.isAdd) {
				this.salesInfo.ybnsrqssj = this.timestampToTime(this.taxpayerTime); //一般纳税人起始时间
				this.salesInfo.ybnsrlx =
					this.taxpayerTypeNum == -1 ? '' : this.taxpayerTypeNum + 2; //一般纳税人类型(2、不适用；3、全部适用；4、部分适用）
				this.salesInfo.issueType = this.ticketType[this.ticketTypeIndex].id; //开票类型（01 客户端，03 服务器，04 税控盒子）
			}
			this.salesInfo.eticketLim = this.ticketLimit[this.ticketLimitIndex].num; //电票开票限额
			this.salesInfo.type = this.isAdd ? '01' : '02';
			let res = await http.invoiceAddSeller({
				data: this.salesInfo
				//                        {
				//                        identifier:this.salesInfo.salesNum,//销货方税号
				//                        name:this.salesInfo.salesName,//销货方名称
				//                        address:this.salesInfo.salesAddress,//销货方地址
				//                        telephoneNo:this.salesInfo.salesTelephone,//销货方电话
				//                        bank:this.salesInfo.salesBank,//销货方银
				//                        bankAcc:this.salesInfo.salesAccount,//销货方银行账号
				//                        ybnsrqssj:this.timestampToTime(this.taxpayerTime),//一般纳税人起始时间
				//                        ybnsrlx:this.taxpayerTypeNum==-1?'':(this.taxpayerTypeNum+2),//一般纳税人类型(2、不适用；3、全部适用；4、部分适用）
				//                        drawer:this.salesInfo.ticketPeople,//开票人
				//                        payee:this.salesInfo.Payee,//收款人
				//                        reviewer:this.salesInfo.reviewer,//复核人
				//                        issueType:this.ticketType[this.ticketTypeIndex].id,//开票类型（01 客户端，03 服务器，04 税控盒子）
				//                        eticketLim:this.ticketLimit[this.ticketLimitIndex].num,//电票开票限额
				//                        clientShopId:this.backData.clientNO?this.backData.clientNO:this.userdata.currentShop.id,//店铺id
				//                        taxEquip:this.backData.taxEquip,//税控设备厂商,
				//                        equipNum:this.backData.equipNum,//税控设备号
				//                        taxDiskPass:this.backData.taxDiskPass,//税控盘密码
				//                        certiCipher:this.backData.certiCipher,//证书密码
				//                    }
			});
			if (res) {
				this.$emit('salesFun', 'ok');
			}
		},
		//取消
		del() {
			this.$emit('salesFun', 'cancel');
		},
		//保存
		save() {
			if (this.checkData()) {
				this.addSales();
			}
		},
		//验证数据
		checkData() {
			//            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{20}$)/;
			let reg = /(^[0-9a-zA-Z]{15}$)|(^[0-9a-zA-Z]{18}$)|(^[0-9a-zA-Z]{20}$)/;
			//                let regOne=/(^1\d{10}$)|(^\d{4}-\d{8}$)/;
			let regOne = /^\d+-?\d+$/;
			if (!reg.test(this.salesInfo.identifier)) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content:
						'销方税号：仅限字母和数字，字数限制为“15个字”或“18个字”或“20 个字”'
				});
				return false;
			}
			if (this.salesInfo.name.trim() == '') {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '销方名称不能为空'
				});
				return false;
			}
			if (this.salesInfo.address.trim() == '') {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '销方地址不能为空'
				});
				return false;
			}
			if (!regOne.test(this.salesInfo.telephoneNo)) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '销方电话格式不对'
				});
				return false;
			}
			if (this.salesInfo.bank.trim() == '') {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '销方银行不能为空'
				});
				return false;
			}
			if (!/^\d+$/.test(this.salesInfo.bankAcc)) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '销方银行账户不能为空,且为纯数字'
				});
				return false;
			}
			if (this.isAdd && this.salesInfo.drawer.trim() == '') {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '开票人不能为空'
				});
				return false;
			}
			if (this.ticketLimitIndex == -1) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '请选择电子票开票限额'
				});
				return false;
			}
			return true;
		}
	},
	components: {
		selectBtn: () =>
			import(/* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
		radioBtn: () =>
			import(/* webpackChunkName:"radio_btn" */ 'src/components/radio_btn'),
		calendar: () =>
			import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type')
	}
};
</script>

<style scoped lang="less">
#table {
	position: relative;
	min-width: 600px;
	margin-bottom: 250px;
	.content-box {
		width: 100%;
		height: auto;
		margin-bottom: 15px;
		clear: both;
		.divClass {
			height: 40px;
			line-height: 40px;
			display: inline-block;
		}
		.content-title {
			position: relative;
			height: 40px;
			line-height: 40px;
			width: 800px;
			margin-left: 30px;
			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 10px;
				width: 3px;
				height: 20px;
				background-color: #2ea8dc;
			}
			&:after {
				content: '';
				position: absolute;
				right: 0;
				top: 20px;
				border: 1px dashed #b3b3b3;
				width: 780px;
			}
			.titles {
				position: absolute;
				left: 15px;
				z-index: 88;
				background-color: #ffffff;
				font-size: 16px;
			}
		}
		input {
			width: 400px;
			height: 40px;
			padding-left: 5px;
		}
		.sub-heading {
			min-width: 130px;
			height: 40px;
			line-height: 40px;
			text-align: right;
			margin-left: 10px;
			margin-right: 20px;
		}
		a {
			display: inline-block;
			width: 150px;
			height: 40px;
			text-align: center;
			line-height: 40px;
			font-size: 16px;
			color: #fff;
		}
	}
	.statisticsLists {
		border: 1px solid #cccccc;
		position: relative;
		height: 40px;
		line-height: 40px;
		width: 200px;
		vertical-align: middle;
		display: inline-block;
		cursor: pointer;
		.tableListInp {
			.spanSty {
				height: 38px;
				width: 157px;
				float: left;
				text-align: center;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				color: #b3b3b3;
			}
			/*三角形-所有的边框线*/
			.calendar-ctr {
				width: 38px;
				height: 38px;
				position: relative;
				z-index: 5;
				border-left: #b3b3b3 solid 1px;
				i {
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
			}
		}
	}
}
</style>