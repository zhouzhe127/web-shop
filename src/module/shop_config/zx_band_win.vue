<!--
	**店铺配置——支付方式——弹窗
	* 
	* 孔伟研
	* *
	* 
-->
<template>
	<section id="table">
		<!-- <span class="return" @click="back">返回</span> -->
		<div class="topTitle">中信银行入驻表格</div>
		<div class="content-box">
			<div class="content-title">
				<span class="titles">商户信息</span>
			</div>
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">商户性质</span>
			<selectBtn @emit="changeWxType" :sorts="busisNature" :name="busisName" :selected.sync="busisNatureSel"></selectBtn>
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">商户全称</span>
			<input :class="{redborder: merInfo.mchtNm === '' && isRed}" type="text" placeholder="请输入商户全称" maxlength="20" v-model="merInfo.mchtNm" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">商户简称</span>
			<input :class="{redborder: merInfo.mchtCnAbbr === '' && isRed}" type="text" placeholder="请输入商户简称" maxlength="12" v-model="merInfo.mchtCnAbbr" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading">经营范围</span>
			<input type="text" placeholder="请输入经营范围" maxlength="20" v-model="merInfo.manageScope" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">商户电话</span>
			<input :class="{redborder: merInfo.mchtTel === '' && isRed}" type="text" placeholder="请输入商户电话" maxlength="18" v-model="merInfo.mchtTel" onkeyup="value=value.replace(/[^0-9-]/g,'')" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">联系人姓名</span>
			<input :class="{redborder: merInfo.contact === '' && isRed}" type="text" placeholder="请输入联系人姓名" maxlength="20" v-model="merInfo.contact" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">联系人电话</span>
			<input :class="{redborder: merInfo.commTel === '' && isRed}" type="text" placeholder="请输入联系人电话" maxlength="18" v-model="merInfo.commTel" onkeyup="value=value.replace(/[^0-9-]/g,'')" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">联系人邮箱</span>
			<input :class="{redborder: merInfo.commEmail === '' && isRed}" type="text" placeholder="请输入联系人邮箱" v-model="merInfo.commEmail" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">商户种类</span>
			<selectBtn @emit="changeBusisTypeSel" :sorts="busisType" :name="busisTypeName" :selected.sync="busisTypeSel"></selectBtn>
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">营业执照编号</span>
			<input :class="{redborder: merInfo.licenceNo === '' && isRed}" type="text" placeholder="请输入营业执照编号" maxlength="22" v-model="merInfo.licenceNo" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading">税务证编号</span>
			<input type="text" placeholder="请输入税务证编号" maxlength="22" v-model="merInfo.taxNo" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading">组织结构代码</span>
			<input type="text" placeholder="请输入组织结构代码" maxlength="10" v-model="merInfo.bankLicenceNo" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">法人姓名</span>
			<input :class="{redborder: merInfo.manager === '' && isRed}" type="text" placeholder="请输入法人姓名" maxlength="20" v-model="merInfo.manager" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">法人身份证</span>
			<input :class="{redborder: merInfo.identityNo === '' && isRed}" type="text" placeholder="请输入法人身份证" maxlength="18" v-model="merInfo.identityNo" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">商户所属地区</span>
			<selectBtn @emit="changeOnearea" :sorts.sync="oneArea" :name.sync="oneName" :selected.sync="oneAreaSel"></selectBtn>
			<selectBtn @emit="changeTwoarea" :sorts.sync="twoArea" :name.sync="twoName" :selected.sync="twoAreaSel"></selectBtn>
			<selectBtn @emit="changethreearea" :sorts.sync="threeArea" :name.sync="threeName" :selected.sync="threeAreaSel"></selectBtn>
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">详细地址</span>
			<input :class="{redborder: merInfo.addr === '' && isRed}" type="text" placeholder="请输入详细地址" maxlength="20" v-model="merInfo.addr" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading">备注</span>
			<input type="text" placeholder="请输入备注" maxlength="30" v-model="merInfo.memo" />
		</div>
		<div class="content-box">
			<div class="content-title">
				<span class="titles">微信账号信息</span>
			</div>
		</div>
		<div class="content-box multi">
			<span class="fl sub-heading required">开通微信</span>
			<section class="pay">
				<radioBtn @selOn="openWx" :list.sync="wxList.list" :index.sync="wxList.flag" :name='"name"'></radioBtn>
			</section>
		</div>
		<div class="content-box multi">
			<span class="fl sub-heading" :class="{'required': wxList.flag === 0}">微信支付方式</span>
			<section class="pay">
				<mulSelect @selOn="selWx" :list.sync="wxpayList" :selects.sync="wxpaySelects" :name='"name"' :key='"id"'></mulSelect>
			</section>
		</div>
		<div class="content-box">
			<span class="fl sub-heading" :class="{'required': wxpaySelects.indexOf(2) != -1}">关联公众号appid</span>
			<input type="text" placeholder="商户公众号对应的appid" maxlength="20" v-model="merInfo.subAppid" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading">推荐关注公众号</span>
			<input type="text" placeholder="请输入公众号" maxlength="20" v-model="merInfo.subscribeAppid" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading" :class="{'required': wxList.flag === 0}">微信一级类目</span>
			<div @click.stop class="statisticsList">
				<section @click="wxOneshowSort($event)" class="tableListInp chairFix">
					<span v-bind:title="wxOneName.name" class="extent">{{wxOneName.name}}</span>
					<div class="fr">
						<i></i>
					</div>
				</section>
				<ul v-if="wxOne" class="tableListUl">
					<li @click="wxOnesortselShow(item)" v-for="(item,index) in wxOneType" :key="index" :title="item.name">{{item.name}}</li>
				</ul>
			</div>
		</div>
		<div class="content-box">
			<span class="fl sub-heading" :class="{'required': wxList.flag === 0}">微信二级类目</span>
			<div @click.stop class="statisticsList">
				<section @click="wxTwoshowSort($event)" class="tableListInp chairFix">
					<span :title="wxTwoName.name" class="extent">{{wxTwoName.name}}</span>
					<div class="fr">
						<i></i>
					</div>
				</section>
				<ul v-if="wxTwo" class="tableListUl">
					<li @click="wxTwosortselShow(item)" v-for="(item,index) in wxTwoType" :key="index" :title="item.name">{{item.name}}</li>
				</ul>
			</div>
		</div>
		<div class="content-box">
			<span class="fl sub-heading">微信手续费：</span>
			<span class="sub-heading">0.3%</span>
		</div>
		<div class="content-box">
			<span class="fl sub-heading">微信结算周期：</span>
			<span class="sub-heading">交易日次日(n+1)</span>
		</div>
		<div class="content-box">
			<div class="content-title">
				<span class="titles">支付宝账号信息</span>
			</div>
		</div>
		<div class="content-box" style="overflow:hidden;">
			<span class="fl sub-heading required">开通支付宝</span>
			<section class="pay">
				<radioBtn @selOn="openAli" :list.sync="aliList.list" :index.sync="aliList.flag" :name='"name"'></radioBtn>
			</section>

		</div>
		<div class="content-box multi" style="overflow:hidden;">
			<span class="fl sub-heading" :class="{'required': aliList.flag === 0}">支付宝支付方式</span>
			<section class="pay">
				<mulSelect @selOn="selZfb" :list.sync="alipayList" :selects.sync="alipaySelects" :name='"name"' :key='"id"'></mulSelect>
			</section>
		</div>
		<div class="content-box">
			<span class="fl sub-heading" :class="{'required': aliList.flag === 0}">支付宝一级类目</span>
			<div @click.stop class="statisticsList">
				<section @click="showSort" class="tableListInp chairFix">
					<span :title="aliTypeName.name" class="extent">{{aliTypeName.name}}</span>
					<div class="fr">
						<i></i>
					</div>
				</section>
				<ul v-if="sortSel" class="tableListUl">
					<li @click="sortselShow(item)" v-for="(item,index) in aliType" :key="index" :title="item.name">{{item.name}}</li>
				</ul>
			</div>
		</div>
		<div class="content-box">
			<span class="fl sub-heading">支付宝商户手续费：</span>
			<span class="sub-heading">0.3%</span>
		</div>
		<div class="content-box">
			<span class="fl sub-heading">支付宝结算周期：</span>
			<span class="sub-heading">交易日次日(n+1)</span>
		</div>
		<div class="content-box">
			<div class="content-title">
				<span class="titles">银行账户信息
					<!-- <span class="redtitle">(请填写企业账户)</span> -->
				</span>
			</div>
		</div>
		<div v-if="shopType.flag == '1' || busisTypeSel == '1'" class="content-box multi">
			<span class="fl sub-heading required">账户类型</span>
			<section class="pay">
				<radioBtn @selOn="getShopType" :list.sync="shopType.list" :index.sync="shopType.flag" :name='"name"'></radioBtn>
			</section>
		</div>
		<div v-if="shopType.flag == '1'" class="content-box">
			<span class="fl sub-heading required">开户人身份证号</span>
			<input :class="{redborder: merInfo.settleAcctNm === '' && isRed}" type="text" placeholder="请输入开户人身份证号" maxlength="18" v-model="merInfo.accIdeNo" />
		</div>
		<div v-if="shopType.flag == '1'" class="content-box">
			<span class="fl sub-heading required">开户人手机号</span>
			<input :class="{redborder: merInfo.settleAcctNm === '' && isRed}" type="text" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入开户人手机号" maxlength="11" v-model="merInfo.accPhone" />
		</div>
		<div class="content-box multi">
			<span class="fl sub-heading required">是否为中信银行账户</span>
			<section class="pay">
				<radioBtn @selOn="openZx" :list.sync="iszxBank.list" :index.sync="iszxBank.flag" :name='"name"'></radioBtn>
			</section>
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">结算开户名</span>
			<input :class="{redborder: merInfo.settleAcctNm === '' && isRed}" type="text" placeholder="请输入结算开户名" maxlength="30" v-model="merInfo.settleAcctNm" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">结算账户</span>
			<input :class="{redborder: merInfo.settleAcct === '' && isRed}" type="text" placeholder="请输入结算账户" maxlength="30" v-model="merInfo.settleAcct" onkeyup="value=value.replace(/[^0-9]/g,'')" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading required">收款银行全称</span>
			<input :class="{redborder: merInfo.settleBankAllName === '' && isRed}" type="text" placeholder="请输入收款银行全称" maxlength="50" v-model="merInfo.settleBankAllName" />
		</div>
		<div class="content-box">
			<span class="fl sub-heading" :class="{'required': iszxBank.flag === 1}">收款银行行号</span>
			<input type="text" placeholder="请输入收款银行行号" maxlength="12" v-model="merInfo.settleBankCode" />
		</div>
		<a href="javascript: void(0)" class="fl yellow" @click="save" style="width: 200px;margin-left: 25px;margin-top: 50px;">提交</a>
	</section>
</template>
<script>
import global from 'src/manager/global';
import http from 'src/manager/http';
// import area_cn from "src/components/area_cn.vue";

let area = null;
let data = null;
export default {
	data() {
		return {
			wxList: {
				flag: -1,
				list: [{ id: 1, name: '是' }, { id: 2, name: '否' }]
			},
			aliList: {
				flag: 0,
				list: [{ id: 1, name: '是' }, { id: 2, name: '否' }]
			},
			iszxBank: {
				flag: -1,
				list: [{ id: 1, name: '是' }, { id: 2, name: '否' }]
			},
			wxpayList: [
				{ id: 0, name: '被扫' },
				{ id: 1, name: '主扫' },
				{ id: 2, name: '公众号支付' }
			], //微信支付方式
			shopType: {
				flag: -1,
				list: [{ id: 1, name: '对公账户' }, { id: 2, name: '个人账户' }]
			}, //账户类型

			wxpaySelects: [], //选中的微信支付方式
			alipayList: [
				{ id: 0, name: '二清被扫' },
				{ id: 1, name: '二清主扫,交易创建接口' }
			], //支付宝支付方式
			alipaySelects: [], //选中的支付宝支付方式
			busisNature: [
				'政府机构',
				'国营企业',
				'私营企业',
				'外资企业',
				'个体工商户',
				'事业单位'
			], //商户性质
			busisName: '请选择', //选中的商户性质名称
			busisNatureSel: -1, //选中的商户性质
			busisType: ['企业', '个体工商户'], //商户种类
			busisTypeName: '请选择', //选中的商户种类名称
			busisTypeSel: -1, //选中的商户种类
			oneArea: [], //地区选择--省
			arr1: [], //保存省编号加名称信息
			oneAreaSel: -1,
			oneName: '请选择所属省',
			twoArea: [], //地区选择--市
			arr2: [], //保存市编号加名称信息
			twoAreaSel: -1,
			twoName: '请选择所属市',
			threeArea: [], //地区选择--区
			arr3: [], //保存区编号加名称信息
			threeAreaSel: -1,
			threeName: '请选择所属区',
			aliType: [
				{ id: 2015050700000000, name: '美食' },
				{ id: 2015091000052157, name: '超市便利店' },
				{ id: 2015063000020189, name: '生活服务' },
				{ id: 2015062600004525, name: '休闲娱乐' },
				{ id: 2015062600002758, name: '购物' },
				{ id: 2016062900190124, name: '爱车' },
				{ id: 2016042200000148, name: '教育培训' },
				{ id: 2016062900190296, name: '医疗健康' },
				{ id: 2015080600000001, name: '航旅' },
				{ id: 2016062900190337, name: '专业销售/批发' },
				{ id: 2016062900190371, name: '政府/社会组织' }
			], //支付宝一级类目
			aliTypeName: { id: -1, name: '请选择一级类目' },
			sortSel: false, //一级类目是否展开

			wxOneType: [], //微信一级类目
			wxOne: false, //微信一级类目是否展开
			wxOneName: { id: -1, name: '请选择一级类目', list: [] },

			wxTwoType: [],
			wxTwo: false, //微信二级类目是否展开
			wxTwoName: { id: -1, name: '请选择二级类目' },

			merInfo: {
				mchtNm: this.config ? this.config.mchtNm : '', //商户全称
				mchtCnAbbr: this.config ? this.config.mchtCnAbbr : '', //商户简称
				manageScope: this.config ? this.config.manageScope : '', //经营范围
				etpsAttr: '', //商户性质
				etpsTp: '', //商户种类
				mchtTel: this.config ? this.config.mchtTel : '', //商户电话
				contact: this.config ? this.config.contact : '', //联系人姓名
				commTel: this.config ? this.config.commTel : '', //联系人电话
				commEmail: this.config ? this.config.commEmail : '', //联系人邮箱
				licenceNo: this.config ? this.config.licenceNo : '', //营业执照编号
				taxNo: this.config ? this.config.taxNo : '', //税务证编号
				bankLicenceNo: this.config ? this.config.bankLicenceNo : '', //组织结构代码
				manager: this.config ? this.config.manager : '', //法人姓名
				identityNo: this.config ? this.config.identityNo : '', //法人身份证
				provCode: '', //商户所属省
				cityCode: '', //商户所属市
				areaCode: '', //商户所属区
				addr: this.config ? this.config.addr : '', //详细地址
				memo: this.config ? this.config.memo : '', //备注
				WXActive: '', //是否开通微信
				olCode1: '', //微信支付方式    支付方式编码，可填多个，以“|”分割 01-被扫  02-主扫  03-公众号支付 06-H5
				subAppid: this.config ? this.config.subAppid : '', //关联公众号
				subscribeAppid: this.config ? this.config.subscribeAppid : '', //推荐关注公众号
				qGroupId: '', //微信一级目录
				categroryId: '', //微信二级目录
				ZFBActive: '', //是否开通支付宝
				olCodeA: '', //支付宝支付方式   支付方式编码，可填多个，以“|”分割；D1-二清被扫   D2-二清主扫、交易创建接口
				categIdC: '', //支付宝一级类目
				isOrNotZxMchtNo: '', //是否为中信银行账户
				settleAcctNm: this.config ? this.config.settleAcctNm : '', //结算开户名
				settleAcct: this.config ? this.config.settleAcct : '', //结算账户
				settleBankAllName: this.config
					? this.config.settleBankAllName
					: '', //收款银行全称
				settleBankCode: this.config ? this.config.settleBankCode : '', //收款银行行号
				acctType: this.config ? this.config.acctType : '', //银行账户类型 1企业账户  2个人账户
				accIdeNo: this.config ? this.config.accIdeNo : '', //个人账户开户身份证
				accPhone: this.config ? this.config.accPhone : '' //个人账户开户手机号
			},
			isRed: false, //表单未填写，边框显示为红色
			person: [],
			company: [],
			gov: []
		};
	},
	components: {
		selectBtn: () =>
			import(/* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
		radioBtn: () =>
			import(/* webpackChunkName:"radio_btn" */ 'src/components/radio_btn'),
		mulSelect: () =>
			import(/* webpackChunkName:"mul_select" */ 'src/components/mul_select')
	},
	props: [
		'config', //中信支付详情
		'types' //添加或修改轮播图
	],
	watch: {
		oneAreaSel: 'changeOnearea',
		twoAreaSel: 'changeTwoarea',
		threeAreaSel: 'changethreearea',
		busisNatureSel: 'changeWxType'
	},
	async mounted() {
		data = await import(/* webpackChunkName:"zx_band_info" */ './zx_band_info.js');
		data = data.default;
		this.person = data.person;
		this.company = data.company;
		this.gov = data.gov;
		document.addEventListener('click', this.close);
		this.$store.commit('setPageTools', [
			{ name: '返回', className: ['gray'], fn: this.back }
		]);
		this.inteConfig();
	},
	async created() {
		// area = await import(/* webpackChunkName:"area_cn" */ 'src/verdor/area_cn.js');
		area = await import(/* webpackChunkName:"zx_area" */ './zx_area.js');
		area = area.default.data;
		for(let i = 0; i < area.length; i++){
			let arr = [];
			arr.push(area[i].id);
			arr.push(area[i].name);
			this.arr1.push(arr);
		}
		for (let i = 0; i < this.arr1.length; i++) {
			this.oneArea.push(this.arr1[i][1]);
			//商户所属地区--选中省
			if (this.config.provCode == this.arr1[i][0]) {
				this.oneAreaSel = i;
				this.oneName = this.arr1[i][1];
			}
		}
		//香港澳门
		if (this.config.cityCode == '810000') {
			this.oneName = '香港特别行政区';
			this.oneAreaSel = 32;
		}
		if (this.config.cityCode == '820000') {
			this.oneName = '澳门特别行政区';
			this.oneAreaSel = 33;
		}
	},
	// async created() {
	// 	area = await import(/* webpackChunkName:"area_cn" */ 'src/verdor/area_cn.js');
	// 	area = area.default;
	// 	this.arr1 = area.get1();
	// 	for (let i = 0; i < this.arr1.length; i++) {
	// 		this.oneArea.push(this.arr1[i][1]);
	// 		//商户所属地区--选中省
	// 		if (this.config.provCode == this.arr1[i][0]) {
	// 			this.oneAreaSel = i;
	// 			this.oneName = this.arr1[i][1];
	// 		}
	// 	}
	// 	//香港澳门
	// 	if (this.config.cityCode == '810000') {
	// 		this.oneName = '香港特别行政区';
	// 		this.oneAreaSel = 32;
	// 	}
	// 	if (this.config.cityCode == '820000') {
	// 		this.oneName = '澳门特别行政区';
	// 		this.oneAreaSel = 33;
	// 	}
	// },
	destroyed() {
		document.removeEventListener('click', this.close);
	},
	methods: {
		close() {
			this.sortSel = false;
			this.wxOne = false;
			this.wxTwo = false;
		},
		//账户类型选择
		getShopType: function(e) {
			this.shopType.flag = e;
		},
		//如果有数据，对带的下拉框数据进行处理
		inteConfig: function() {
			this.$nextTick(function() {
				if (this.config) {
					//商户性质
					if (this.config.etpsAttr) {
						if (this.config.etpsAttr == 7) {
							this.busisNatureSel = 5;
							this.busisName = '事业单位';
						} else {
							this.busisNatureSel =
								Number(this.config.etpsAttr) - 1;
							this.busisName = this.busisNature[
								Number(this.config.etpsAttr) - 1
							];
						}
					}
					//商户种类
					if (this.config.etpsTp == 1) {
						this.busisTypeSel = 0;
						this.busisTypeName = '企业';
					} else if (this.config.etpsTp == 2) {
						this.busisTypeSel = 1;
						this.busisTypeName = '个体工商户';
					}
					//是否开通微信
					this.config.WXActive == 'N'
						? (this.wxList.flag = 1)
						: (this.wxList.flag = 0);
					//微信支付方式
					if (this.config.olCode1) {
						let wxPay = this.config.olCode1.split('|');
						for (let i = 0; i < wxPay.length; i++) {
							if (wxPay[i] == '01') {
								this.wxpaySelects.push(0);
							} else if (wxPay[i] == '02') {
								this.wxpaySelects.push(1);
							} else if (wxPay[i] == '03') {
								this.wxpaySelects.push(2);
							}
						}
					}
					//开通支付宝
					this.merInfo.ZFBActive == 'N'
						? (this.aliList.flag = 1)
						: (this.aliList.flag = 0);
					//支付宝支付方式
					if (this.config.olCodeA) {
						let aliPay = this.config.olCodeA.split('|');
						for (let i = 0; i < aliPay.length; i++) {
							if (aliPay[i] == 'D1') {
								this.alipaySelects.push(0);
							} else if (aliPay[i] == 'D2') {
								this.alipaySelects.push(1);
							}
						}
					}

					//选中的支付宝一级类目
					for (let i = 0; i < this.aliType.length; i++) {
						if (this.config.categIdC == this.aliType[i].id) {
							this.aliTypeName = this.aliType[i];
						}
					}
					//是否为中信银行账户
					this.merInfo.isOrNotZxMchtNo == 'Y'
						? (this.iszxBank.flag = 0)
						: (this.iszxBank.flag = 1);
					//银行账户信息的账户类型
					this.merInfo.acctType == '1'
						? (this.shopType.flag = 0)
						: (this.shopType.flag = 1);
				}
			});
		},
		//返回按钮点击
		back: function() {
			this.$emit('zxBandWin', this.config);
		},
		zxBandWin: function() {
			this.$emit('zxBandWin', this.config);
			// sd.controller(['js/sd/payment-way.js']);
		},
		//是否为中信用户按钮点击
		openZx: function(e) {
			this.iszxBank.flag = e;
		},
		//开通微信按钮点击
		openWx: function(e) {
			this.wxList.flag = e;
		},
		//选择微信支付方式
		selWx: function(e) {
			this.wxpaySelects = e;
		},
		//开通支付宝按钮点击
		openAli: function(e) {
			this.aliList.flag = e;
		},
		//选择支付宝交易方式
		selZfb: function(e) {
			this.alipaySelects = e;
		},
		//商户种类的切换
		changeBusisTypeSel: function(e) {
			e == '1' ? (this.shopType.flag = 1) : (this.shopType.flag = 0);
			this.busisTypeSel = e;
			this.busisTypeName = this.busisType[e];
		},
		//选择省--改变市区
		changeOnearea: function(e) {
			this.oneAreaSel = e;
			this.twoArea.length = 0;
			this.twoName = '请选择所属市';
			this.twoAreaSel = -1;
			this.threeName = '请选择所属区';
			this.threeAreaSel = -1;
			this.merInfo.provCode = this.arr1[this.oneAreaSel][0]; //选择的省编号
			this.arr2 = [];
			// this.arr2 = area.get2(this.arr1[this.oneAreaSel][0]);
			for(let i = 0; i < area.length; i++){
				if(i == e){
					for(let j = 0; j < area[i].child.length; j++){
						let arr = [];
						arr.push(area[i].child[j].id);
						arr.push(area[i].child[j].name);
						this.arr2.push(arr);
					}
				}
			}
			for (let i = 0; i < this.arr2.length; i++) {
				this.twoArea.push(this.arr2[i][1]);
			}
			//香港澳门地区 省编号为1
			if (
				this.merInfo.provCode == '810000' ||
				this.merInfo.provCode == '820000'
			) {
				this.merInfo.provCode = '1';
			}
			//已完成表格入驻，点击编辑进入
			if (this.config) {
				for (let j = 0; j < this.arr2.length; j++) {
					if (this.config.cityCode == this.arr2[j][0]) {
						this.twoAreaSel = j;
						this.twoName = this.arr2[j][1];
					}
				}
			}
		},
		//选择市--改变区
		changeTwoarea: function(e) {
			this.twoAreaSel = e;
			this.threeArea.length = 0;
			this.threeName = '请选择所属区';
			this.threeAreaSel = -1;
			this.arr3 = [];
			if (this.twoAreaSel != -1) {
				this.merInfo.cityCode = this.arr2[this.twoAreaSel][0]; //选择的市编号
				// this.arr3 = area.get3(this.arr2[this.twoAreaSel][0]);
				for(let i = 0; i < area.length; i++){
					if(i == this.oneAreaSel){
						for(let j = 0; j < area[i].child.length; j++){
							if(j == e){
								for(let k = 0; k < area[i].child[j].child.length; k++){
									let arr = [];
									arr.push(area[i].child[j].child[k].id);
									arr.push(area[i].child[j].child[k].name);
									this.arr3.push(arr);
								}
							}
						}
					}
				}
				for (let i = 0; i < this.arr3.length; i++) {
					this.threeArea.push(this.arr3[i][1]);
				}
			} else {
				this.threeArea = [];
			}
			//已完成表格入驻，点击编辑进入
			if (this.config) {
				for (let k = 0; k < this.arr3.length; k++) {
					if (this.config.areaCode == this.arr3[k][0]) {
						this.threeAreaSel = k;
						this.threeName = this.arr3[k][1];
					}
				}
			}
		},
		changethreearea: function(e) {
			this.threeAreaSel = e;
		},
		//改变商户性质，微信一级 二级类目也相应发生变化
		changeWxType: function(e) {
			this.busisNatureSel = e;
			this.wxOneType = [];
			this.wxOneName = { id: -1, name: '请选择一级类目', list: [] };
			this.wxTwoType = [];
			this.wxTwoName = { id: -1, name: '请选择二级类目' };
			if (this.busisNatureSel == 0 || this.busisNatureSel == 5) {
				this.wxOneType = this.gov;
			} else if (
				this.busisNatureSel == 1 ||
				this.busisNatureSel == 2 ||
				this.busisNatureSel == 3
			) {
				this.wxOneType = this.company;
			} else if (this.busisNatureSel == 4) {
				this.wxOneType = this.person;
			}
			//已完成表格入驻，点击编辑进入
			if (this.config) {
				//微信一级类目
				for (let i = 0; i < this.wxOneType.length; i++) {
					if (this.config.qGroupId == this.wxOneType[i].id) {
						this.wxOneName = this.wxOneType[i];
						this.wxTwoType = this.wxOneType[i].list;
					}
				}
				//微信二级类目
				for (let j = 0; j < this.wxTwoType.length; j++) {
					if (this.config.categroryId == this.wxTwoType[j].id) {
						this.wxTwoName = this.wxTwoType[j];
					}
				}
			}
		},
		//点击展开微信一级类目
		wxOnesortselShow: function(item) {
			this.wxTwoName = { id: -1, name: '请选择二级类目' };
			this.wxOne = false;
			this.wxOneName = item;
			this.wxTwoType = item.list;
		},
		wxOneshowSort: function(e) {
			e.stopPropagation();
			if (this.busisNatureSel == -1) {
				this.errorShow('请选择商户性质！');
				return false;
			}
			this.wxTwo = false;
			this.sortSel = false;
			this.wxOne = !this.wxOne;
		},
		//点击展开微信二级类目
		wxTwosortselShow: function(item) {
			this.wxTwo = false;
			this.wxTwoName = item;
		},
		wxTwoshowSort: function(e) {
			e.stopPropagation();
			this.wxOne = false;
			this.sortSel = false;
			this.wxTwo = !this.wxTwo;
		},

		//点击展开支付宝一级类目
		sortselShow: function(item) {
			this.sortSel = false;
			this.aliTypeName = item;
		},
		showSort: function(e) {
			e.stopPropagation();
			this.wxOne = false;
			this.wxTwo = false;
			this.sortSel = !this.sortSel;
		},
		//中信银行表单提交接口
		async applyZxMerId(data) {
			let dd = await http.applyZxMerId({ data: { merInfo: data } });
			if (dd && dd.secMerId) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '保存成功'
				});
				this.back();
			}
		},
		errorShow(content) {
			this.$store.commit('setWin', {
				winType: 'alert',
				content: content
			});
		},
		//提交
		save: function() {
			if (
				!global.checkData(
					{
						mchtNm: '请输入商户全称！',
						mchtCnAbbr: '请输入商户简称！',
						mchtTel: '请输入商户电话！',
						contact: '请输入联系人姓名！',
						commTel: '请输入联系人电话！',
						commEmail: {
							reg: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
							pro: '请输入正确的邮箱编号！'
						},
						licenceNo: '请输入营业执照编号！',
						manager: '请输入法人姓名！',
						identityNo: '请输入法人身份证！',
						addr: '请输入详细地址！',
						settleAcctNm: '请输入结算开户名！',
						settleAcct: '请输入结算账号！',
						settleBankAllName: '请输入收款银行全称！'
					},
					this.merInfo
				)
			)
				return false;

			if (
				!global.checkData(
					{
						busisNatureSel: {
							cond: '$$ != -1',
							pro: '请选择商户性质！'
						},
						busisTypeSel: {
							cond: '$$ != -1',
							pro: '请选择商户种类！'
						},
						wxList: {
							cond: '$$.flag != -1',
							pro: '请选择是否开通微信！'
						},
						aliList: {
							cond: '$$.flag != -1',
							pro: '请选择是否开通支付宝！'
						},
						iszxBank: {
							cond: '$$.flag != -1',
							pro: '请选择是否为中信银行账户！'
						},
						shopType: {
							cond: '$$.flag != -1',
							pro: '请选择账户类型'
						}
					},
					this
				)
			)
				return false;

			if (
				this.oneAreaSel == -1 ||
				this.twoAreaSel == -1 ||
				this.threeAreaSel == -1
			) {
				this.errorShow('请选择商户所属地区！');
				return false;
			}
			if (this.wxList.flag === 0 && this.wxpaySelects.length === 0) {
				this.errorShow('请选择微信支付方式！');
				return false;
			}
			if (
				this.wxpaySelects.indexOf(2) != -1 &&
				this.merInfo.subAppid == ''
			) {
				this.errorShow('请输入关联公众号！');
				return false;
			}
			if (this.wxList.flag === 0 && this.wxOneName.id == -1) {
				this.errorShow('请选择微信一级类目！');
				return false;
			}
			if (this.wxList.flag === 0 && this.wxTwoName.id == -1) {
				this.errorShow('请选择微信二级类目！');
				return false;
			}
			if (this.wxList.flag == 1 && this.aliList.flag == 1) {
				this.errorShow('支付宝至少开通一项！');
				return false;
			}
			if (this.aliList.flag === 0 && this.alipaySelects.length === 0) {
				this.errorShow('请选择支付宝支付方式！');
				return false;
			}
			if (this.aliList.flag === 0 && this.aliTypeName.id == -1) {
				this.errorShow('请选择支付宝一级类目！');
				return false;
			}
			if (this.iszxBank.flag == 1 && !this.merInfo.settleBankCode) {
				this.errorShow('请填写收款银行行号！');
				return false;
			}
			if (this.shopType.flag == 1 && this.accIdeNo == '') {
				this.errorShow('请输入开户人身份证号');
				return false;
			}
			if (this.shopType.flag == 1 && this.accPhone == '') {
				this.errorShow('请输入开户人手机号');
				return false;
			}

			//商户性质
			if (this.busisNatureSel == 5) {
				this.merInfo.etpsAttr = 7;
			} else {
				this.merInfo.etpsAttr = this.busisNatureSel + 1;
			}
			//商户种类
			this.merInfo.etpsTp = this.busisTypeSel + 1;
			//区编号
			this.merInfo.areaCode = this.arr3[this.threeAreaSel][0];
			//是否开通微信
			this.wxList.flag === 0
				? (this.merInfo.WXActive = 'Y')
				: (this.merInfo.WXActive = 'N');

			if (this.wxList.flag === 0) {
				//微信主商户号类型
				// this.merInfo.mainMchtTp = '0' + this.wxbusisTypeSel;
				//微信一级类目
				this.merInfo.qGroupId = this.wxOneName.id;
				//微信二级类目
				this.merInfo.categroryId = this.wxTwoName.id;
			} else {
				this.merInfo.qGroupId = '';
				this.merInfo.categroryId = '';
			}
			//微信支付方式
			this.merInfo.olCode1 = '';
			for (let i = 0; i < this.wxpaySelects.length; i++) {
				if (this.wxpaySelects[i] == 0) {
					this.merInfo.olCode1 += '01|';
				} else if (this.wxpaySelects[i] == 1) {
					this.merInfo.olCode1 += '02|';
				} else if (this.wxpaySelects[i] == 2) {
					this.merInfo.olCode1 += '03|';
				} else if (this.wxpaySelects[i] == 3) {
					this.merInfo.olCode1 += '06|';
				}
			}
			this.merInfo.olCode1 = this.merInfo.olCode1.substring(
				0,
				this.merInfo.olCode1.length - 1
			);

			//是否开通支付宝
			this.aliList.flag === 0
				? (this.merInfo.ZFBActive = 'Y')
				: (this.merInfo.ZFBActive = 'N');
			//支付宝支付方式
			this.merInfo.olCodeA = '';
			for (let i = 0; i < this.alipaySelects.length; i++) {
				if (this.alipaySelects[i] == 0) {
					this.merInfo.olCodeA += 'D1|';
				} else if (this.alipaySelects[i] == 1) {
					this.merInfo.olCodeA += 'D2|';
				}
			}
			this.merInfo.olCodeA = this.merInfo.olCodeA.substring(
				0,
				this.merInfo.olCodeA.length - 1
			);
			//支付宝一级类目
			this.merInfo.categIdC = this.aliTypeName.id;
			//是否为中信银行账户
			this.iszxBank.flag === 0
				? (this.merInfo.isOrNotZxMchtNo = 'Y')
				: (this.merInfo.isOrNotZxMchtNo = 'N');
			//银行账户类型
			this.shopType.flag == 1
				? (this.merInfo.acctType = 2)
				: (this.merInfo.acctType = 1);
			this.applyZxMerId(this.merInfo);
		}
	}
};
</script>

<style scoped>
#table {
	position: relative;
	min-width: 600px;
	max-width: 1300px;
	margin-bottom: 250px;
}
#table .pay {
	width: auto;
	float: left;
	background: #f2f2f2;
}
#table .topTitle {
	position: absolute;
	left: 165px;
	font-weight: bold;
	color: #5ebee8;
	top: -35px;
	font-size: 16px;
}
#table .content-box {
	width: 100%;
	height: auto;
	margin-bottom: 15px;
	clear: both;
	/*overflow: hidden;*/
}
#table .content-title {
	position: relative;
	height: 40px;
	line-height: 40px;
	width: 800px;
	margin-left: 30px;
}
#table .content-title:before {
	content: '';
	position: absolute;
	left: 0;
	top: 10px;
	width: 3px;
	height: 20px;
	background-color: #2ea8dc;
}
#table .content-title:after {
	content: '';
	position: absolute;
	right: 0;
	top: 20px;
	border: 1px dashed #b3b3b3;
	width: 780px;
}
#table .titles {
	position: absolute;
	left: 15px;
	z-index: 88;
	background-color: #ffffff;
	font-size: 16px;
}
#table .sub-heading {
	min-width: 130px;
	height: 40px;
	line-height: 40px;
	text-align: right;
	margin-left: 10px;
	margin-right: 20px;
}
#table .redtitle {
	color: #ea3b45;
	margin-left: 10px;
}

#table .multi {
	overflow: hidden;
}
#table .content-box input {
	width: 400px;
	height: 40px;
	padding-left: 5px;
}
#table .statisticsList {
	margin-right: 10px;
	height: 45px;
	vertical-align: middle;
	display: inline-block;
	position: relative;
}
#table .statisticsList ul {
	top: 40px;
	max-height: 205px;
	overflow: auto;
	z-index: 100;
}
#table .redborder {
	border: 1px solid red;
}
#table .return {
	display: inline-block;
	width: 100px;
	height: 40px;
	border: 1px solid #b3b3b3;
	color: #b3b3b3;
	text-align: center;
	line-height: 40px;
	position: absolute;
	top: 0;
	background: #fff;
	z-index: 10;
	right: 0;
	cursor: pointer;
}
#table .tableListInp {
	color: #666;
	border: 1px solid #b3b3b3;
	height: 40px;
	cursor: pointer;
	display: inline-block;
}
#table .tableListInp div {
	width: 41px;
	height: 40px;
	position: relative;
	z-index: 5;
}
#table .tableListInp div i {
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
#table .statisticsList ul {
	top: 40px;
	max-height: 205px;
	overflow: auto;
	z-index: 100;
	width: 100%;
	margin: 0;
	position: absolute;
	left: 0;
	background: #fff;
}
#table .statisticsList ul li {
	width: 100%;
	text-align: center;
	height: 41px;
	border: 1px solid #b3b3b3;
	border-top: 0;
	background: #fff;
	cursor: pointer;
	list-style: none;
	overflow: hidden;
	line-height: 40px;
}
#table .statisticsList .extent {
	width: 150px;
	height: 39px;
	display: block;
	float: left;
	line-height: 40px;
	overflow: hidden;
	text-align: center;
	border-right: 1px #b3b3b3 solid;
}
</style>