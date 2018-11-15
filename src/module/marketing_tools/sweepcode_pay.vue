<!--
    **扫码支付配置
    *
    * miaochuan.sha
    * *
    *
-->
<template>
	<div id="sweepCode">
		<!-- 扫码支付基本配置 -->
		<div class="set-line">
			<div class="titles">基础配置</div>
			<div class="line"></div>
		</div>
		<!-- 下载扫码支付二维码 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">快捷支付二维码 </span>
			<a :href="downloadUrl" class="fl add_btn qRcode" :download="shopName"> 下载门店二维码</a>
			<img src="../../res/images/icon-refresh.png" class="upload" @click="updateShortUrl">
		</div>
			<!-- 门店折扣-->
			<div class="online-box clearfix">
				<span class="online-sub fl">门店折扣</span>
				<div class="fl" style="height: 40px;line-height: 40px;">
					<el-switch v-model="payDiscount" active-color="#E1BB4A" inactive-color="#dcdfe6">
					</el-switch>
				</div>
				<div class="fl handle-tips" style="margin-left: 20px;">
					<i></i> 门店折扣与会员折扣不共享
				</div>
			</div>
			<!-- 门店折扣 -->
			<div class="online-box clearfix" v-if='payDiscount'>
				<span class="online-sub fl"></span>
				<span class="discount">折扣率</span>
				<el-input maxlength="3" v-model="discounts" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:60px;"></el-input>
				<span class="discount">%</span>
			</div>
			<!-- 门店折扣 -->
			<div class="online-box clearfix" v-if='payDiscount'>
				<span class="online-sub fl"></span>
				<div class="businessHours">
					<div @click="selectBusinessHours" :class="{'active':isMember}"></div>
					<span>仅有会员享有门店折扣</span>
				</div>
			</div>
			<!-- **************************************************************** -->
			<!-- 支付方式 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">支付方式</span>
				<mulSelect class='fl' :list.sync="goodsType" :selects.sync="goodsSelect" :styles="{backgroundColor:'#fff',marginRight:'8px','border-radius':'4px'}" :name='"name"' :key='"id"'></mulSelect>
				<div class="fl handle-tips">
					<i></i> 使用时需在支付门店支付方式内开启微信或支付宝
				</div>
			</div>
			<!-- 会员支付 优惠券使用 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">会员支付</span>
				<div class="rightHalf">
					<el-switch v-model="paySwitch" active-color="#E1BB4A" inactive-color="#dcdfe6">
					</el-switch>
				</div>
				<div class="clearfix fl">
					<span class="online-sub fl">优惠券使用</span>
					<div class="rightHalf">
						<el-switch v-model="couponSwitch" active-color="#E1BB4A" inactive-color="#dcdfe6">
						</el-switch>
					</div>
				</div>
			</div>
			<!-- 积分抵扣 开启用餐人数 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">积分抵扣</span>
				<div class="rightHalf">
					<el-switch v-model="pointSwitch" active-color="#E1BB4A" inactive-color="#dcdfe6">
					</el-switch>
				</div>
				<div class="clearfix fl">
					<span class="online-sub fl">开启用餐人数</span>
					<div class="rightHalf">
						<el-switch v-model="payMeals" active-color="#E1BB4A" inactive-color="#dcdfe6">
						</el-switch>
					</div>
				</div>
			</div>
			<!--开启优惠规则 用餐人数填写 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">会员余额与优惠券共用</span>
				<div class="rightHalf">
					<el-switch v-model="isAmountCoupon" active-color="#E1BB4A" inactive-color="#dcdfe6">
					</el-switch>
				<el-tooltip placement="right">
					<div slot="content">开启后,会员余额与优惠券可共同使用;关闭后,若使用会员余额则无法使用优惠券,反之使用优惠券规则无法使用会员余额。</div>
					<i class="el-icon-question" style="font-size:24px;line-height:40px;"></i>
				</el-tooltip>					
				</div>
				<div class="clearfix fl" v-if='payMeals'>
					<span class="online-sub fl"></span>
					<div class="rightHalf">
						<span class="discount">用餐</span>
						<el-input maxlength="2" v-model="diningnums" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:60px;"></el-input>
						<span class="discount">人</span>
					</div>
				</div>
			</div>
			<!-- 开启优惠规则 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">开启优惠规则</span>
				<div class="rightHalf">
					<el-switch v-model="preferentialSwitch" active-color="#E1BB4A" inactive-color="#dcdfe6">
					</el-switch>
				</div>
			</div>
			<!-- 优惠规则 -->
			<div class="online-box clearfix" v-if="preferentialSwitch">
				<span class="online-sub fl"></span>
				<section class="fl therules">
					<section class="clearfix" v-if="configure.length <= 9">
						<div class="rulebox">
							<input type="text" placeholder="请输入规则" class="fl define-inp" v-model="content" maxlength="20" />
							<div class='bg fl' @click="saveConcont"></div>
						</div>
						<div class="fl handle-tips">
							<i></i> 最多输入10条,每条限制30字符
						</div>
					</section>
					<div class="rlues" v-for="(content,i) in configure" :key='i' v-if="configure.length >= 1">{{content}}
						<i class="del" @click="delConcont(i)"></i>
					</div>
				</section>
			</div>
			<!-- ************************************************************************************** -->
			<!-- 绑定门店管理人员 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">绑定门店管理人员</span>
				<a href="javascript:;" class="employees employeeColor" @click="chooseuser"> <img src="../../res/images/a-dd.png" alt="">
				选择微信粉丝</a>
			</div>
			<!-- 绑定门店管理人员 -->
			<div class="online-box clearfix" v-show="userSelect.length > 0">
				<span class="online-sub fl"></span>
				<section class="clearfix fl" style="width:639px;">
					<div class="fans" v-for="(item,index) in userSelect" :key="index">
						<img :src="item.imageUrl" />
						<span>{{item.name}}</span>
						<i @click="deluser(index)" class="delete"> <img src="../../res/images/yichu.png" alt=""> <span>移除</span>
					</i>
					</div>
				</section>
			</div>
			<div class="online-box clearfix">
				<span class="online-sub fl">生成员工专属码</span>
				<el-select v-model="value8" filterable placeholder="请选择" @change='addStaffScanPay'>
					<el-option v-for="item in restaurants" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<!-- <com-table style="width:800px;" :listHeight='80' :showHand="false" :listName="'员工码'" :showTitle='2' :introData="taList" :titleData="titleList">
			<div slot="con-1" slot-scope="props" style="width:400px;">
				<a @click="downloadCode(props.data)" download :href="downloadUrls" class="alink_color">下载二维码</a>
				<a class="alink_color" href="javascript:void(0);" @click="del(props.data,props.$index)" style="width: 32%;">删除</a>

			</div>
		</com-table> -->
			<div class="online-box clearfix">
				<span class="online-sub fl"></span>
				<el-table :data="taList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}" style="width: 800px;">
					<el-table-column fixed prop="staffName" label="姓名" align="center">
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<a @click="downloadCode(scope.row)" style="color: #E1BB4A;" :download="scope.row.staffName" :href="downloadUrls" class="alink_color">下载二维码</a>
							<span style="padding:0 5px;color: #D2D2D2">|</span>
							<el-button size="medium" type="text" @click="del(scope.row,scope.$index)" style="color: #E1BB4A;">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="online-box clearfix">
				<span class="online-sub fl"></span>
				<el-button type="primary" @click="addconfig" style="width:200px;">保存</el-button>
			</div>
			<!-- 选择员工 -->
			<select-user-win :selectedList="userSelect" @closeWin="closeUserWin" v-if="isShowSelector"></select-user-win>
		</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import global from 'src/manager/global';

	let QRErrorCorrectLevel = null;
	export default {
		data() {
			return {
				isAmountCoupon: false, //会员与优惠券公用
				payDiscount: false, //门店折扣开关
				discount: '', //折扣
				paySwitch: false, //会员支付
				couponSwitch: false, //开启优惠券支付
				pointSwitch: false, //积分抵扣使用
				shareSwitch: false, //是否共享
				payMeals: false, //用餐人数开关
				diningnum: '1', //用餐的人数
				preferentialSwitch: false, //优惠规则
				configure: [], // 支付规则
				content: '', // 规则内容 
				isShowSelector: false, //  是否展示选择员工弹框
				userSelect: [], // 用户选中的数组:'javascript:;'
				downloadUrl: 'javascript:;',
				downloadUrls: 'javascript:;',
				shopName: '', //店铺名称
				qrcode: '',
				goodsType: [{
					'name': '微信',
					'id': 0
				}, {
					'name': '支付宝',
					'id': 1
				}], //固定支付方式
				goodsSelect: [], //固定支付方式选中
				isMember: false, //仅会员享受门店折扣
				restaurants: [],
				state3: '',
				value8: '',
				taList: [],
				allTotal: 0,
				page: 1,
				pageTotal: 10,
				shortUrlPreFix: '',
			};
		},
		methods: {
			del(item, index) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'confirm',
					content: '确认删除?',
					callback: (res) => {
						if (res == 'ok') {
							http.deleteStaffScanPay({
								data: {
									staffId: item.staffId,

								}
							}).then(() => {
								this.taList.splice(index, 1);
							});
						}
					}
				});
			},
			async downloadCode(item) { //下载二维码
				let url = item.shortUrl;
				this.downloadUrls = await this.qrcode.getQrBase64(url, {
					padding: 15,
					width: 300,
					height: 300,
					correctLevel: QRErrorCorrectLevel.L
				}); //链接地址 下载的二维码						
			},
			openpayDiscount: function(res) { //开启门店折扣
				this.payDiscount = res;
			},
			openpaySwitch: function(res) { //开启会员支付
				this.paySwitch = res;
			},
			opencouponSwitch: function(res) { //开启优惠券
				this.couponSwitch = res;
			},
			openpointSwitch: function(res) { //开启积分抵扣
				this.pointSwitch = res;
			},
			openshareSwitch: function(res) { //是否共享
				this.shareSwitch = res;
			},
			openpayMeals: function(res) { //开启用餐人数
				this.payMeals = res;
			},
			openpreferentialSwitch: function(res) { //优惠规则
				this.preferentialSwitch = res;
			},
			delConcont: function(i) { //删除任务规则
				// 将对应的下标的规则从数组里面删除掉
				this.configure.splice(i, 1);
				this.content = '';
			},
			// 保存规则配置
			saveConcont: function() {
				// 如果为空
				if (this.content.trim() == '') {
					this.$store.commit('setWin', {
						content: '请填写规则内容！',
						time: 1000
					});
					return false;
				}
				// 规则最多定义五条数据
				if (this.configure.length == 10) {
					this.$store.commit('setWin', {
						content: '最多添加十条！',
						time: 1000
					});
					return false;
				}
				this.configure.push(this.content);
				// 每次输入完规则之后将输入框清空
				this.content = '';
			},
			closeUserWin(str) { //  选择用户
				this.isShowSelector = false;
				if (str) {
					this.userSelect = str;
				}
			},
			chooseuser: function() { //选择员工
				this.isShowSelector = true;
			},
			deluser: function(i) {
				this.userSelect.splice(i, 1);
			},
			checkFormData: function() { //判断条件
				if (this.goodsSelect.length == 0) {
					this.$store.commit('setWin', {
						content: '请至少选择一种支付方式',
						title: '操作提示',
						winType: 'alert'
					});
					return false;
				}
				if (this.payDiscount && this.discount == '') {
					this.$store.commit('setWin', {
						content: '请填写门店折扣',
						title: '操作提示',
						winType: 'alert'
					});
					return false;
				}
				if (this.payDiscount && (Number(this.discount) > 100 || Number(this.discount) < 1)) {
					this.$store.commit('setWin', {
						content: '门店折扣范围1～100',
						title: '操作提示',
						winType: 'alert'
					});
					return false;
				}
				if (this.payMeals && this.diningnum == '') {
					this.$store.commit('setWin', {
						content: '请填写门用餐人数',
						title: '操作提示',
						winType: 'alert'
					});
					return false;
				}
				if (this.payMeals && (Number(this.diningnum) > 20 || Number(this.diningnum) < 1)) {
					this.$store.commit('setWin', {
						content: '用餐人数范围1-20',
						title: '操作提示',
						winType: 'alert'
					});
					return false;
				}
				if (this.preferentialSwitch && this.configure == '') {
					this.$store.commit('setWin', {
						content: '请至少添加一条规则',
						title: '操作提示',
						winType: 'alert'
					});
					return false;
				}
				return true;
			},
			async addconfig() {
				if (!this.checkFormData()) return;
				let fansIds = '';
				if (!utils.isEmptyObject(this.userSelect)) {
					for (let item of this.userSelect) {
						fansIds += item.id + ',';
					}
					fansIds = fansIds.substring(0, fansIds.length - 1);
				}
				let data = await http.addScanPayConfig({
					data: {
						isMemberPay: Number(this.paySwitch), //会员支付
						isCouponPay: Number(this.couponSwitch), //优惠券使用
						isPointsPay: Number(this.pointSwitch), //积分抵扣
						isMemberCoupon: Number(this.shareSwitch), //是否共享
						onlyMember: Number(this.isMember), //仅有会员享受
						isAmountCoupon: Number(this.isAmountCoupon), //会员与优惠券
						rules: this.preferentialSwitch == true ? this.configure.join('!#!') : '', //规则
						fansIds: fansIds,
						payMode: this.goodsSelect.join(','), //支付方式
						shopDiscount: this.payDiscount ? this.discount : 0, //门店折扣
						person: this.payMeals ? this.diningnum : 0 //用餐人数
					}
				});
				if (data) {
					this.$store.commit('setWin', {
						content: '保存成功',
						title: '操作提示',
						winType: 'alert'
					});
					this.getsweepcodeConfig();
				}
			},
			async addStaffScanPay(userId) {
				//console.log(userId, 'id');
				let data = await http.addStaffScanPay({
					data: {
						staffId: userId
					}
				});
				// let arrList = [];
				// this.restaurants.map((item) => {
				// 	if (userId == item.staffId) {
				// 		if (arrList.indexOf(item.staffId) > -1) {
				// 			return;
				// 		}
				// 		arrList.push(item);
				// 		this.taList = this.taList.concat(arrList);
				// 	}
				// 	return item;

				// });
				if (data) {
					this.getsweepcodeConfig();
				}
				//console.log(data, 'data');
			},
			async getUserList() { //获取下拉框中所有员工的列表
				let res = await http.getUserList();
				this.restaurants = res;
				this.restaurants.map((item) => {
					item.value = item.userId;
					item.label = item.name;
					return item;
				});
			},
			async getsweepcodeConfig() {
				let data = await http.getScanPayInfo({
					data: {}
				});
				//console.log(data, 'data');
				if (data) {
					let staffList = Object.values(data.staffList);
					this.getUserList();
					this.taList = staffList;
					if (data.payMode != '') {
						let arr = data.payMode.split(',');
						this.goodsSelect = [];
						for (let item of arr) {
							this.goodsSelect.push(Number(item));
						} //支付方式
					}
					if (data.shopDiscount == '0') {
						this.payDiscount = false;
						this.discount = '';
					} else {
						this.payDiscount = true;
						this.discount = data.shopDiscount;
					} //门店折扣
					if (data.person == '0') {
						this.payMeals = false;
						this.diningnum = '1';
					} else {
						this.payMeals = true;
						this.diningnum = data.person;
					} //用餐人数
					this.isMember = Boolean(Number(data.onlyMember));
					this.paySwitch = Boolean(Number(data.isMemberPay)); //会员支付
					this.couponSwitch = Boolean(Number(data.isCouponPay)); //优惠券
					this.pointSwitch = Boolean(Number(data.isPointsPay)); //积分
					this.shareSwitch = Boolean(Number(data.isMemberCoupon)); //共享
					this.isAmountCoupon = Boolean(Number(data.isAmountCoupon));
					if (data.rules != '') {
						this.configure = data.rules.split('!#!');
						this.preferentialSwitch = true;
					}
					if (data.fansInfo) {
						for (let item of data.fansInfo) {
							item.selected = true;
						}
						this.userSelect = data.fansInfo; //用户信息
					}

					this.downloadUrl = this.qrcode.getQrBase64(data.shortUrl, {
						padding: 15,
						width: 300,
						height: 300,
						correctLevel: QRErrorCorrectLevel.L
					}); //链接地址 下载的二维码
				}
			},

			async updateShortUrl() {
				let data = await http.updateShortUrl({
					data: {}
				});
				if (data) {
					this.$store.commit('setWin', {
						content: '刷新成功',
						title: '操作提示',
						winType: 'alert'
					});
					this.getsweepcodeConfig();
				}
			},
			selectBusinessHours: function() {
				//是否仅会员享受门店折扣
				this.isMember = !this.isMember;
			},
			querySearch(queryString, cb) {
				let restaurants = this.restaurants;
				let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			createFilter(queryString) {
				return (restaurant) => {
					return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			// handleSelect(item) {
			// 	console.log(item);
			// },
			// handleIconClick(ev) {
			// 	console.log(ev);
			// }
		},
		computed: {
			discounts: {
				get() {
					return this.discount;
				},
				set(newValue) {
					this.discount = newValue.replace(/[^\d]/g, '');
				}
			},
			diningnums: {
				get() {
					return this.diningnum;
				},
				set(newValue) {
					this.diningnum = newValue.replace(/[^\d]/g, '');
				}
			},
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			onOff: () =>
				import ( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
			'select-user-win': () =>
				import ( /* webpackChunkName: 'select_user_win' */ './select_user_win'),
			mulSelect: () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
		},
		async mounted() {
			this.shopName = storage.session('userShop').currentShop.name;
			this.qrcode = await
			import ( /* webpackChunkName:'qrcode' */ 'src/verdor/jr-qrcode.js');
			QRErrorCorrectLevel = this.qrcode.QRErrorCorrectLevel;
			this.getsweepcodeConfig();
			this.shortUrlPreFix = global.host.shop;
			console.log(this.shortUrlPreFix, 'shorurl');
		}
	};
</script>
<style type="text/css" scoped>
	#sweepCode {
		width: 100%;
		height: auto;
	}

	#sweepCode .set-line {
		width: 100%;
		height: 28px;
		line-height: 28px;
		border-left: 4px solid #E1BB4A;
		margin: 15px 0 35px;
		position: relative;
	}

	#sweepCode .set-line .titles {
		min-width: 10%;
		/*兼容IE*/
		float: left;
		margin-left: 12px;
		font-size: 16px;
		text-align: left;
	}

	#sweepCode .set-line .line {
		display: inline-block;
		width: 70%;
		border-bottom: 1px dashed #d9d9d9;
		margin-bottom: 5px;
	}

	#sweepCode .online-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 29px;
	}

	#sweepCode .online-box .rightHalf {
		width: 150px;
		height: auto;
		float: left;
		line-height: 40px;
	}

	#sweepCode .online-box .el_input {
		width: 218px
	}

	#sweepCode .online-box .businessHours {
		float: left;
		line-height: 42px;
		height: 42px;
	}

	#sweepCode .online-box .businessHours div {
		width: 20px;
		height: 20px;
		cursor: pointer;
		border: 1px solid #28a8e0;
		margin: 11px 8px;
		float: left;
	}

	#sweepCode .online-box .businessHours span {
		font-size: 16px;
		color: #333;
	}

	#sweepCode .online-box .upload {
		display: inline-block;
		width: 15px;
		height: 15px;
		margin-top: 10px;
	}

	#sweepCode .online-box .therules {
		width: auto;
		height: auto;
	}

	#sweepCode .online-box .therules .rulebox {
		min-height: 40px;
		padding: 0;
		position: relative;
		cursor: pointer;
	}

	#sweepCode .online-box .therules .rulebox .define-inp {
		width: 255px;
		height: 36px;
		padding: 0;
		border-radius: 4px 0 0 4px;
		border: 1px solid #dcdfe6;
	}

	#sweepCode .online-box .therules .rulebox input {
		outline: none;
		text-indent: 12px;
	}

	#sweepCode .online-box .therules .rulebox .bg {
		border: 1px solid #dcdfe6;
		width: 36px;
		float: left;
		height: 36px;
		border-left: none;
		border-radius: 0 4px 4px 0;
		background: url(../../res/icon/iconright.png) #fff center no-repeat;
	}

	#sweepCode .online-box .online-sub {
		display: block;
		font-size: 16px;
		width: 150px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
	}

	#sweepCode .online-box .discount {
		font-size: 16px;
		line-height: 40px;
	}

	#sweepCode .online-box .discountinp {
		width: 60px;
		height: 40px;
		text-align: center;
	}

	#sweepCode .clearfix::before,
	#sweepCode .clearfix::after {
		display: table;
		content: “”;
	}

	#sweepCode .clearfix::after {
		clear: both;
	}

	#sweepCode .online-box .add_btn {
		background: url(../../res/images/qrcode.png) no-repeat 20px center #E1BB4A;
		height: 40px;
		line-height: 40px;
		text-align: center;
		width: 175px;
		color: #FFFFFF;
		cursor: pointer;
		margin-right: 10px;
		border-radius: 4px;
	}

	#sweepCode .rlues {
		width: 292px;
		height: 40px;
		border: 1px solid #dcdfe6;
		text-align: center;
		line-height: 40px;
		position: relative;
		font-size: 12px;
		background-color: #fff;
		margin-bottom: 25px;
		border-radius: 4px;
	}

	#sweepCode .del {
		position: absolute;
		right: -12px;
		top: -12px;
		display: none;
		width: 25px;
		height: 25px;
		background-image: url(../../res/images/delete.png);
		background-position: center center;
		background-repeat: no-repeat;
		cursor: pointer;
	}

	#sweepCode .rlues:hover i {
		display: block;
	}

	#sweepCode .handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url("../../../src/res/images/prompt.png") 0 center no-repeat;
		color: #999999;
	}

	#sweepCode .online-box .employees {
		width: 130px;
		height: 40px;
		line-height: 40px;
	}

	#sweepCode .online-box .fans {
		width: 100px;
		height: 120px;
		text-align: center;
		border: 1px solid #eaeaea;
		float: left;
		margin-right: 20px;
		margin-bottom: 20px;
		position: relative;
		border-radius: 4px;
	}

	/* #sweepCode .online-box .fans:hover {
		border: 1px solid #e9c048;
        background:url(../../../static/images/checkbg.jpg) top center no-repeat; 
	} */

	#sweepCode .online-box .fans img {
		display: block;
		width: 60px;
		height: 60px;
		border-radius: 30px;
		margin: 16px auto;
	}

	#sweepCode .online-box .fans span {}

	#sweepCode .fans:hover i {
		display: block;
	}

	.active {
		background: url(../../res/icon/selected.png) center center no-repeat,
			#28a8e0;
	}


	.employeeColor {
		color: #e9c048;
	}

	.alink_color {
		color: #E1BB4A;
	}

	.delete {
		position: absolute;
		right: 27px;
		bottom: -34px;
		background-position: center center;
		background-repeat: no-repeat;
		cursor: pointer;
		width: 44px;
		display: flex;
		flex: 1;
		align-items: center;
		display: none;

	}

	#sweepCode .online-box .fans .delete img {
		width: 14px;
		height: 14px;
		float: left;

	}

	#sweepCode .online-box .fans .delete span {
		float: left;
		position: relative;
		top: 16px;
		left: 2px;
	}

	.dinnerNum {
		width: 200px;
		position: absolute;
		left: 310px;
	}

	.dinnerNum .online-sub {
		width: auto;
	}
</style>