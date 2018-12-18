<template>
	<div id="solutionStore">
		<p class="btn">
			<span class="store fl" v-for="(item,index) in bannerList" :key='index' v-bind:class="{'active':indexOn == index}" @click="isFlag && chooseBanner(index)">{{item.name}}</span>
		</p>
		<!-- 方案设置 -->
		<div class="set-line">
			<div class="titles">方案设置</div>
			<div class="line"></div>
		</div>
		<!--固定方案-->
		<section v-if="indexOn == 0">
			<!-- 活动标题 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">方案名</span>
				<div class="rightHalf">
					<el-input v-model="name" maxlength="10" placeholder="请输入方案名称"></el-input>
				</div>
			</div>
			<!-- 排序 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">排序</span>
				<div class="rightHalf">
					<el-input-number v-model="num" @change="handleChange" :min="1" :max="255" label="描述文字"></el-input-number>
				</div>
			</div>
			<!-- 显示渠道 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">显示渠道</span>
				<div class="rightHalf">
					<mulSelect :list='ditchList' :selects="selects" :styles="{'border-radius':'4px','marginRight':'8px'}" :name='"name"' :key='"id"'></mulSelect>
				</div>
			</div>
			<!-- 选择门店 -->
			<div class="online-box clearfix" v-if="flag && ischain == '3'">
				<span class="online-sub fl required">储值适用门店</span>
				<div class="rightHalf">
					<el-button type="primary" icon="el-icon-plus" @click="openshopWin" style="width:179px;">选择门店</el-button>
					<span style="color: #A5A5A5;" v-if="fixedslectsShopIds.length > 0">已选择{{fixedslectsShopIds.length}}家门店</span>
				</div>
			</div>
			<!-- 储值金额 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">储值金额</span>
				<div class="rightHalf">
					<el-input placeholder="请输入金额" v-model="deposit" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'')" style="width:179px;" @blur="formatValue('deposit')">
						<template slot="suffix">元</template>
					</el-input>
				</div>
			</div>
			<div class="online-box clearfix">
				<span class="online-sub fl required">赠送金额</span>
				<div class="rightHalf">
					<el-input placeholder="请输入金额" v-model="payment" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'')" style="width:179px;" @blur="formatValue('payment')">
						<template slot="suffix">元</template>
					</el-input>
				</div>
			</div>
		</section>
		<section v-if="indexOn == 1">
			<div class="online-box clearfix">
				<span class="online-sub fl required">方案名</span>
				<div class="rightHalf">
					<el-input v-model="defName" maxlength="10" placeholder="请输入方案名称"></el-input>
				</div>
			</div>
			<div class="online-box clearfix" v-if="ischain == '3'">
				<span class="online-sub fl required">储值适用门店</span>
				<div class="rightHalf">
					<el-button type="primary" icon="el-icon-plus" @click="openshopWin" style="width:179px;">选择门店</el-button>
					<span style="color: #A5A5A5;" v-if="customslectsShopIds.length > 0">已选择{{customslectsShopIds.length}}家门店</span>
				</div>
			</div>
			<!-- 排序 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">排序</span>
				<div class="rightHalf">
					<el-input-number v-model="defNum" @change="changeDef" :min="1" :max="255" label="描述文字"></el-input-number>
				</div>
			</div>
			<div class="online-box clearfix">
				<span class="online-sub fl required">赠送条件</span>
				<div class="rightHalf">
					<el-select v-model="typeName" placeholder="请选择" @change="selexpirationTime" style="color:#c0c4cc;width: 179px;">
						<el-option v-for="item in conditionList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="online-box clearfix" v-if="conditionOn == 0">
				<span class="online-sub fl"></span>
				<div class="rightHalf">
					<span>当储值在</span>
					<el-input placeholder="请输入金额" v-model="defDeposit" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'')" style="width:179px;" @blur="formatValue('defDeposit')">
						<template slot="suffix">元</template>
					</el-input>
					<span>至</span>
					<el-input placeholder="请输入金额" v-model="defPayment" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'')" style="width:179px;" @blur="formatValue('defPayment')">
						<template slot="suffix">元</template>
					</el-input>
					<span>时，可赠送</span>
				</div>
			</div>
			<div class="online-box clearfix" v-if="conditionOn == 1">
				<span class="online-sub fl"></span>
				<div class="rightHalf">
					<span>当储值金额</span>
					<el-select v-model="rangeName" placeholder="请选择" @change="chooseRange" style="color:#c0c4cc;width: 179px;">
						<el-option v-for="item in rangeList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<el-input placeholder="请输入金额" v-model="defDeposit" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'')" style="width:179px;" @blur="formatValue('defDeposit')">
						<template slot="suffix">元</template>
					</el-input>
					<span>时，可赠送</span>
				</div>
			</div>
		</section>
		<!-- 赠送内容 -->
		<!-- 方案设置 -->
		<div class="set-line">
			<div class="titles">赠送内容</div>
			<div class="line"></div>
		</div>
		<section v-if="indexOn == 0">
			<div class="online-box clearfix">
				<span class="online-sub fl required">赠送优惠券</span>
				<div class="rightHalf">
					<el-button class="fl" type="primary" icon="el-icon-plus" @click="addCoupon" style="width:179px;">添加关联优惠券</el-button>
					<span class="coupon_name" style="color: #A5A5A5;" v-if="couponIds.length >= 1">(已关联:{{getCouponName(couponIds)}})</span>
				</div>
			</div>
			<div class="online-box clearfix">
				<span class="online-sub fl required">支付金额</span>
				<div class="rightHalf">
					<el-input placeholder="请输入金额" v-model="giftAmount" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'')" style="width:179px;" @blur="formatValue('giftAmount')">
						<template slot="suffix">元</template>
					</el-input>
				</div>
			</div>
			<div class="online-box clearfix">
				<span class="online-sub fl required">赠送积分</span>
				<div class="rightHalf">
					<el-input placeholder="请输入金额" v-model="giftPoint" maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:179px;">
						<template slot="suffix">积分</template>
					</el-input>
				</div>
			</div>
		</section>
		<section v-if="indexOn == 1">
			<div class="online-box clearfix">
				<span class="online-sub fl required">赠送金额</span>
				<div class="rightHalf">
					<span class="freeFix" style="margin-right: 14px;" :key='index' v-for="(item,index) in presentList" v-bind:class="{'presentActive':presentOn == index }" @click="choosePresent(index)">{{item.name}}</span>
				</div>
			</div>
			<div class="online-box clearfix" v-if="presentOn == 0">
				<span class="online-sub fl"></span>
				<div class="rightHalf">
					<span>赠送</span>
					<el-input placeholder="请输入金额" v-model="defGiftAmount" onkeyup="value=value.replace(/[^\d\.]/g,'')" maxlength="6" @blur="formatValue('defGiftAmount')" style="width:179px;">
						<template slot="suffix">元</template>
					</el-input>
				</div>
			</div>
			<div class="online-box clearfix" v-if="presentOn == 1">
				<span class="online-sub fl"></span>
				<div class="rightHalf">
					<span>赠送</span>
					<el-input placeholder="请输入比例" v-model="defGiftAmount" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="4" style="width:179px;">
						<template slot="suffix">%</template>
					</el-input>
				</div>
			</div>
			<!-- 赠送积分 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">赠送积分</span>
				<div class="rightHalf">
					<span class="freeFix" style="margin-right: 14px;" :key='index' v-for="(item,index) in integralList" v-bind:class="{'presentActive':integralOn == index }" @click="chooseIntegral(index)">{{item.name}}</span>
				</div>
			</div>
			<div class="online-box clearfix" v-if="integralOn == 0">
				<span class="online-sub fl"></span>
				<div class="rightHalf">
					<span>赠送积分为</span>
					<el-input placeholder="请输入金额" v-model="defGiftPoint" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="6" style="width:179px;">
						<template slot="suffix">分</template>
					</el-input>
				</div>
			</div>
			<div class="online-box clearfix" v-if="integralOn == 1">
				<span class="online-sub fl"></span>
				<div class="rightHalf">
					<span>赠送积分为固定金额的</span>
					<el-input placeholder="请输入金额" v-model="defGiftPoint" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="4" style="width:179px;">
						<template slot="suffix">%</template>
					</el-input>
				</div>
			</div>
		</section>
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<el-button type="info" style="width: 200px;" @click="backList">取消</el-button>
				<el-button type="primary" style="width: 200px;" @click="creatStore">保存</el-button>
			</div>
		</div>
		<!-- 关联优惠券的弹窗 -->
		<addCoupon v-if='showCoupon' :selectCoupon='couponIds' @winEvent='winEvent'></addCoupon>
		<!-- 选择工作门店 -->
		<select-work-shop-win :slectsShopIds="slectsShopIds" :isEdit="isEdit" @closeWin="closeShopWin" v-if="isShowShopWin"></select-work-shop-win>
	</div>
</template>
<script type="text/javascript">
import storage from 'src/verdor/storage';
import global from 'src/manager/global';
import http from 'src/manager/http';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			ischain: '',
			bannerList: [{
				name: '固定方案'
			},
			{
				name: '自定义方案'
			}
			], //固定还是自定义方案，数组
			//          bannerOn: '',//判断是固定方案还是自定义方案，默认固定
			indexOn: 0, //默认固定
			isFlag: true, //编辑方案是固定和自定义是否可以切换
			num: 1, //排序输入框默认值
			defNum: 1, //自定义排序输入框默认值
			presentList: [{
				name: '赠送固定储值金额'
			},
			{
				name: '按比例赠送储值金额'
			}
			],
			presentOn: '-1',
			integralList: [{
				name: '赠送固定积分'
			},
			{
				name: '按比例赠送积分'
			}
			],
			integralOn: '-1',
			conditionList: [{
				name: '满足储值区间可赠送',
				id: 0
			},
			{
				name: '满足储值条件可赠送',
				id: 1
			}
			],
			conditionOn: 0,
			typeName: '满足储值区间可赠送',
			willShow: false, //活动类型框是否显示
			ditchList: [{
				id: 1,
				name: '微信'
			},
			{
				id: 2,
				name: 'POS收银'
			}
			],
			ditchOn: '-1',
			selects: [],
			rangeList: [{
				name: '等于',
				id: '1'
			},
			{
				name: '大于等于',
				id: '3'
			},
			{
				name: '小于等于',
				id: '4'
			}
			],
			rangeShow: false,
			rangeName: '等于',
			rangeOn: 0,
			id: '', //方案ID
			name: '', //方案名
			defName: '', //自定义方案名
			sort: '', //排序
			channel: '', //渠道:1(微信),2(pos收银)【自定义方案默认2】
			defChannel: '', //自定义渠道
			deposit: '', //储值金额(自定义方案时 条件是满足储值金额区间可赠送时是范围开始金额)
			defDeposit: '', //自定义方案范围开始
			payment: '', //支付金额 (自定义方案时 条件是满足储值金额区间可赠送时是储值范围结束金额)
			defPayment: '', //自定义方案范围结束
			giftAmount: '', //赠送金额
			defGiftAmount: '', //自定义方案赠送金额
			giftPoint: '', //赠送积分
			defGiftPoint: '', //自定义方案赠送积分
			type: '', //储值类型 1固定 2自定义
			giftAmountRule: '', //增送金额规则 1(赠送固定储值金额) 2(按比例赠送储值金额) （没有就不用传）
			giftPointRule: '', //增送积分规则 1(赠送固定积分) 2(按比例赠送积分) （没有就不用传）
			depositRule: '', //自定义类型独有:1(等于)2(范围) 3(大于等于) 4（小于等于） （没有就不用传）
			couponIds: [], //json串关联的优惠券
			compareArr: [], //用于比较优惠劵数组
			editdetail: '', //修改数据
			showCoupon: false,
			slectsShopIds: [], //   选择的门店
			customslectsShopIds: [], //自定义方案选择的门店
			fixedslectsShopIds: [], //固定方案选择的门店
			isShowShopWin: false,
			isEdit: false,
			flag: false,
		};
	},
	watch: {
		'selects': function() {
			this.flag = false;
			for (let item of this.selects) {
				if (item == '2') {
					this.flag = true;
					break;
				}
			}
		},
		'couponIds': {
			deep: true,
			handler: function() {
				this.getCouponName(this.couponIds);
			}
		}
	},
	components: {
		subadd: () =>
			import( /* webpackChunkName:'subadd' */ 'src/components/subadd'),
		mulSelect: () =>
			import( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
		'addCoupon': () =>
			import( /*webpackChunkName: 'associated_coupons'*/ 'src/components/associated_coupons'),
		'select-work-shop-win': () =>
			import( /* webpackChunkName: 'select_work_shop_win' */ './../../seller_assistant/staff/select_work_shop_win'),
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '返回',
			fn: () => {
				this.backList();
			},
			'couponIds': {
				deep: true,
				handler: function() {
					this.getCouponName(this.couponIds);
				}
			}
		},
		components: {
			subadd: () =>
				import( /* webpackChunkName:'subadd' */ 'src/components/subadd'),
			mulSelect: () =>
				import( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
			'addCoupon': () =>
				import( /*webpackChunkName: 'associated_coupons'*/ 'src/components/associated_coupons'),
			'select-work-shop-win': () =>
				import( /* webpackChunkName: 'select_work_shop_win' */ './../../seller_assistant/staff/select_work_shop_win'),
		},
		mounted() {
			this.$store.commit('setPageTools', [{
				name: '返回',
				fn: () => {
					this.backList();
				},
				className: 'el-btn-blue'
			}]);
			this.ischain = storage.session('userShop').currentShop.ischain;
			this.editdetail = storage.session('editdetail');
			if (this.editdetail) {
				this.editDetail();
				this.isFlag = !this.isFlag;
			}
		},
		beforeDestroy() {
			storage.session('editdetail', null);
		},
		methods: {
			openshopWin: function() {
				this.isShowShopWin = true;
				if (this.indexOn == 0) {
					this.slectsShopIds = this.fixedslectsShopIds;
				} else if (this.indexOn == 1) {
					this.slectsShopIds = this.customslectsShopIds;
				}
			},
			closeShopWin(str) { //   选择门店
				this.isShowShopWin = false;
				if (str) {
					if (this.indexOn == 0) {
						this.fixedslectsShopIds = str;
					} else if (this.indexOn == 1) {
						this.customslectsShopIds = str;
					}
				}
			},
			couponChange(arr) {
				this.couponIds = arr.selectList;
			},
			winEvent(obj) { //选择优惠券弹窗回掉
				this.showCoupon = false;
				if (obj.status == 'ok') {
					this.couponIds = obj.data.select;
				}
			},
			ca(arr) {
				this.compareArr = arr;
			},
			changeDef(num) {
				this.defNum = num;
			},
			//选择固定或者自定义方案
			chooseBanner: function(index) {
				this.indexOn = index;
			},
			//赠送何种金额
			choosePresent: function(index) {
				if (this.presentOn == index) {
					this.presentOn = '-1';
					this.defGiftAmount = '';
					this.giftAmountRule = '';
				} else {
					this.presentOn = index;
					this.giftAmountRule = this.presentOn + 1;
				}
			},
			//赠送何种积分
			chooseIntegral: function(index) {

				if (this.integralOn == index) {
					this.integralOn = '-1';
					this.defGiftPoint = '';
					this.giftPointRule = '';
				} else {
					this.integralOn = index;
					this.giftPointRule = this.integralOn + 1;
				}
			},
			//选择何种支付方式
			chooseDitch: function(index) {
				this.selects = index;
				this.channel = this.selects;

		//选择区间范围
		chooseRange: function(item) {
			//console.log(item)
			//this.rangeOn = index;
			// this.rangeName = item.name;
			// this.rangeShow = false;
			this.depositRule = item;
		},
		//显示活动类型
		getClick: function() {
			if (this.willShow == true) {
				this.willShow = false;
			} else {
				this.willShow = true;
			}
		},
		//显示区间条件
		getRange: function() {
			if (this.rangeShow == true) {
				this.rangeShow = false;
			} else {
				this.rangeShow = true;
			}
		},
		//选择满足何种赠送条件
		choseType: function(index, item) {
			this.conditionOn = index;
			this.typeName = item.name;
			this.willShow = false;
		},
		//返回
		backList: function() {
			this.$router.push('/admin/memberStoredValueScheme');
		},
		//关联优惠券弹窗
		addCoupon: function() { //添加优惠券
			this.showCoupon = true;
		},
		//请求接口
		async creatStore() {
			//判断是固定方案还是自定义方案
			this.channel = this.selects.toString().replace(',', '');

			this.type = this.indexOn + 1;
			if (this.type == 1) {
				this.giftAmountRule = '';
				this.giftPointRule = '';
				this.depositRule = '';
				this.slectsShopIds = this.flag ? this.fixedslectsShopIds : []; //固定方案的id
				if (!global.checkData({
					name: '请填写方案名',
					channel: '请选择显示渠道',
					deposit: {
						cond: `$$!=''&&!isNaN($$)`,
						pro: '请正确填写储值金额'
					},
					payment: {
						cond: `$$!=''&&!isNaN($$)`,
						pro: '请正确填写支付金额'
					},

				}, this)) return false;
			}
			//判断必填项是否填写完整
			if (this.type == 2) {
				this.defChannel = 2;
				this.name = this.defName;
				this.num = this.defNum;
				this.channel = this.defChannel;
				this.deposit = this.defDeposit;
				this.payment = this.defPayment;
				this.giftAmount = this.defGiftAmount;
				this.giftPoint = this.defGiftPoint;
				this.slectsShopIds = this.customslectsShopIds; //自定义方案的id
				if (this.presentOn == 0 || this.presentOn == 1) {
					if (this.giftAmount == '') {
						this.$store.commit('setWin', {
							content: '请填写赠送金额'
						});
						return false;
					}
				}
			},
			//显示区间条件
			getRange: function() {
				if (this.rangeShow == true) {
					this.rangeShow = false;
				} else {
					this.rangeShow = true;
				}
				if (this.conditionOn == 0) {
					this.depositRule = 2;
					if (!global.checkData({
						defDeposit: {
							cond: `$$!=''&&!isNaN($$)`,
							pro: '请正确填写自定义赠送条件起始金额'
						},
						defPayment: {
							cond: `$$!=''&&!isNaN($$)`,
							pro: '请正确填写自定义赠送条件结束金额'
						},
					}, this)) return false;
					//判断储值金额区间
					if (this.depositRule == 2) {
						if ((Number(this.defDeposit) - Number(this.defPayment)) > 0) {
							this.$store.commit('setWin', {
								content: '请填写赠送金额'
							});
							return false;
						}
					}
					if (this.defName == '') {
						this.$store.commit('setWin', {
							content: '请填写自定义方案名'
						});
						return false;
					}
					if (this.conditionOn == 0) {
						this.depositRule = 2;
						if (!global.checkData(
							{
								defDeposit: {
									cond: `$$!=''&&!isNaN($$)`,
									pro: '请正确填写自定义赠送条件起始金额'
								},
								defPayment: {
									cond: `$$!=''&&!isNaN($$)`,
									pro: '请正确填写自定义赠送条件结束金额'
								},
							}, this)) return false;
						//判断储值金额区间
						if (this.depositRule == 2) {
							if ((Number(this.defDeposit) - Number(this.defPayment)) > 0) {
								this.$store.commit('setWin', {
									content: '请正确填写储值金额区间'
								});
								return false;
							}
						}
					}
					if (this.conditionOn == 1) {
						if (!global.checkData(
							{
								defDeposit: {
									cond: `$$!=''&&!isNaN($$)`,
									pro: '请正确填写自定义赠送条件起始金额'
								},
							}, this)) return false;
					}
				}
				if (this.conditionOn == 1) {
					if (!global.checkData({
						defDeposit: {
							cond: `$$!=''&&!isNaN($$)`,
							pro: '请正确填写自定义赠送条件起始金额'
						},
					}, this)) return false;
				}
			}
			//判断赠送金额条件
			if (this.presentOn == 0 && this.type == 2) {
				if (this.defGiftAmount == 0) {
					this.$store.commit('setWin', {
						content: '请输入大于0的赠送金额'
					});
					return false;
				}
			}
			if (this.presentOn == 1 && this.type == 2) {
				if (this.defGiftAmount == 0) {
					this.$store.commit('setWin', {
						content: '请输入大于0的赠送金额比例'
					});
					return false;
				}
				if (this.presentOn == 1 && this.type == 2) {
					if (this.defGiftAmount == 0) {
						this.$store.commit('setWin', {
							content: '请输入大于0的赠送金额比例'
						});
						return false;
					}
					if (Number(this.defGiftAmount) > 1000) {
						this.$store.commit('setWin', {
							content: '请输入小于1000的赠送金额比例'
						});
						return false;
					}
				}

				//判断赠送积分条件
				if (this.integralOn == 0 && this.type == 2) {
					if (this.defGiftPoint == 0) {
						this.$store.commit('setWin', {
							content: '请输入大于0的赠送积分'
						});
						return false;
					}
				}
				if (this.integralOn == 1 && this.type == 2) {
					if (this.defGiftPoint == 0) {
						this.$store.commit('setWin', {
							content: '请输入大于0的赠送积分比例'
						});
						return false;
					}
					if (Number(this.defGiftPoint) > 1000) {
						this.$store.commit('setWin', {
							content: '请输入小于1000的赠送积分比例'
						});
						return false;
					}
				}
				let url = (this.editdetail == null) ? 'depositPlan/create' : 'depositPlan/edit';
				await http.depositPlan({
					data: {
						id: this.id ? this.id : '',
						name: this.name,
						sort: this.num,
						channel: this.channel,
						deposit: this.deposit,
						payment: this.payment,
						giftAmount: this.giftAmount,
						giftPoint: this.giftPoint,
						type: this.type,
						giftAmountRule: this.giftAmountRule,
						giftPointRule: this.giftPointRule,
						depositRule: (this.depositRule == '') ? 1 : this.depositRule,
						couponIds: JSON.stringify(this.couponIds),
						shopId: storage.session('shopId'),
						depositShopIds: this.slectsShopIds.join(',')
					},
					url: global.host['wx'] + url
				});
				this.$store.commit('setWin', {
					content: '创建成功',
					callback: () => {
						this.backList();
					}
				});


			},
			//点击编辑或者修改时数据回填
			editDetail: function() {
				this.indexOn = this.editdetail.type - 1;
				this.type = this.editdetail.type;
				this.name = this.editdetail.name;
				this.id = this.editdetail.id;
				this.num = this.editdetail.sort;
				this.channel = this.editdetail.channel;
				this.channel = parseInt(this.channel);
				//组件需要传入的是一个数组
				let num = this.editdetail.channel;
				let n = num.split('');
				let tmp = new Array();
				for (let i = 0; i < n.length; i++) {
					tmp[i] = Number(n[i]);
				}
				n = tmp;
				this.selects = n;

				this.deposit = this.editdetail.deposit;
				this.payment = this.editdetail.payment;
				this.giftAmount = this.editdetail.giftAmount;
				this.giftPoint = this.editdetail.giftPoint;
				if (this.editdetail.couponIds) {
					this.couponIds = JSON.parse(this.editdetail.couponIds);
				}
				if (this.editdetail.depositShopIds != '') {
					this.fixedslectsShopIds = this.editdetail.depositShopIds.split(','); //使用门店
				}
				if (this.editdetail.type == 2) {
					this.defName = this.editdetail.name;
					this.defNum = this.editdetail.sort;
					this.defChannel = this.editdetail.channel;
					this.defDeposit = this.editdetail.deposit;
					this.defPayment = this.editdetail.payment;
					this.giftAmountRule = this.editdetail.giftAmountRule;
					if (this.editdetail.giftAmountRule) {
						this.presentOn = this.editdetail.giftAmountRule - 1;
						if (this.editdetail.giftAmount == 0) {
							this.defGiftAmount = '';
							this.presentOn = '-1';
						} else {
							this.defGiftAmount = this.editdetail.giftAmount;
						}

					}
					if (this.editdetail.depositShopIds != '') {
						this.customslectsShopIds = this.editdetail.depositShopIds.split(','); //使用门店
					}
					this.giftPointRule = this.editdetail.giftPointRule;
					if (this.editdetail.giftPointRule) {
						this.integralOn = this.editdetail.giftPointRule - 1;
						if (this.editdetail.giftPoint == 0) {
							this.defGiftPoint = '';

						} else {
							this.defGiftPoint = this.editdetail.giftPoint;
						}

					}
					this.depositRule = this.editdetail.depositRule;
					if (this.editdetail.depositRule == 2) {
						this.conditionOn = 0;
						this.typeName = '满足储值区间可赠送';
					} else {
						this.conditionOn = 1;
						this.typeName = '满足储值条件可赠送';
						if (this.editdetail.depositRule == 1) {
							this.rangeName = '等于';
						} else if (this.editdetail.depositRule == 3) {
							this.rangeName = '大于等于';
						} else if (this.editdetail.depositRule == 4) {
							this.rangeName = '小于等于';
						}
					}
				}
			},
			formatValue: function(model) {
				this[model] = utils.toFloatStr(this[model], 2);
			},
			handleChange: function(value) {
				this.num = value;
			},
			selexpirationTime: function(val) { //活动期限
				this.conditionOn = val; //点击对应的id
			},
			getCouponName: function(arr) { //获取优惠券名称
				let couponName = '';
				let couponArr = [];
				for (let item of arr) {
					let oneCoupon = item.name + '*' + item.num;
					couponArr.push(oneCoupon);
				}
				couponName = couponArr.join(';');
				return couponName;
			}
		}
	};
</script>
<style scoped>
	#solutionStore {
		max-width: 1400px;
		height: auto;
	}

	#solutionStore .set-line {
		width: 1000px;
		height: 28px;
		line-height: 28px;
		border-left: 4px solid #28a8e0;
		margin: 15px 0 35px;
		position: relative;
	}

	#solutionStore .set-line .titles {
		float: left;
		margin-left: 12px;
		width: 100px;
		font-size: 16px;
		text-align: left;
	}

	#solutionStore .set-line .line {
		display: inline-block;
		width: 870px;
		border-bottom: 1px dashed #d9d9d9;
		margin-bottom: 5px;
	}

	#solutionStore .online-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 29px;
	}

	#solutionStore .online-box .online-sub {
		display: block;
		font-size: 16px;
		width: 150px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
	}

	#solutionStore .online-box .rightHalf {
		max-width: 900px;
		height: auto;
		float: left;
		line-height: 40px;
	}

	#solutionStore .online-box .rightHalf .coupon_name {
		float: left;
		display: block;
		width: 600px;
		height: 40px;
		line-height: 40px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	#solutionStore .solution {
		width: 101px;
		height: 42px;
		border: 1px #B3B3B3 solid;
		color: #B3B3B3;
		font-size: 16px;
		line-height: 42px;
		text-align: center;
		float: right;
		cursor: pointer;
	}

	#solutionStore .btn {
		margin-bottom: 23px;
		height: 41px;
	}

	#solutionStore .btn .store {
		width: 121px;
		height: 41px;
		display: block;
		font-size: 16px;
		text-align: center;
		border: 1px solid #dcdfe6;
		line-height: 41px;
		cursor: pointer;
		margin: 0;
		background: #fff;
		color: #606266;
	}

	#solutionStore .btn .store:first-child {
		border-radius: 4px 0 0 4px;
		border-right: 0;
	}

	#solutionStore .btn .store:last-child {
		border-radius: 0px 4px 4px 0px;
		border-left: 0;
	}

	#solutionStore .btn .active {
		background: #e1bb4a;
		color: #fff;
	}

	#solutionStore .solutionSet {
		width: 580px;
	}

	#solutionStore .headLine {
		width: 580px;
		border-left: 3px #28A8E0 solid;
		padding-left: 9px;
		font-size: 16px;
		position: relative;
		margin-bottom: 20px;
	}

	#solutionStore .headLine .borderLine {
		border-top: 2px #B3B3B3 dashed;
		display: block;
		width: 476px;
		position: absolute;
		top: 50%;
		right: 0;
	}

	#solutionStore .setBox {
		width: 580px;
	}

	#solutionStore .setBox .setItem {
		width: 100%;
		margin-bottom: 15px;
		height: 40px;
		line-height: 40px;
		display: table;
		position: relative;
	}

	#solutionStore .inp {
		width: 211px;
		height: 38px;
		text-indent: 10px;
	}

	#solutionStore .inp::-webkit-input-placeholder {
		font-size: 14px;
		color: #A5A5A5;
		outline: none;
	}

	#solutionStore .setBox .setItem .itemLeft {
		width: 18%;
		display: table-cell;
		padding-right: 18px;
		text-align: end;
		vertical-align: middle;
	}

	#solutionStore .solutionSet .setBox .setItem .sortInp {
		height: 40px;
	}

	#solutionStore .solutionSet .setBox .setItem .sortInp .on-span {
		background-color: #B3B3B3;
	}

	#solutionStore .solutionSet .setBox .setItem .sortInp .input-content {
		border: 1px #D2D2D2 solid;
		border-left: none;
		border-right: none;
		width: 56px;
	}

	#solutionStore .solutionSet .setBox .setItem .ditch {
		width: 101px;
		height: 40px;
		border: 1px #D2D2D2 solid;
		display: inline-block;
		line-height: 40px;
		text-align: center;
		margin-right: 8px;
	}

	#solutionStore .sum {
		width: 170px;
		height: 38px;
	}

	#solutionStore .unit {
		width: 40px;
		height: 38px;
		border: 1px #D2D2D2 solid;
		border-left: none;
		display: inline-block;
		text-align: center;
	}

	#solutionStore .addclassify {
		width: 211px;
		height: 40px;
		background-position-x: 40px;
		margin-right: 26px;
	}

	#solutionStore .freeContent .buttons {
		margin-top: 37px;
	}

	#solutionStore .solutionSet .setBox .setItem .filtrate {
		display: inline-block;
		height: 40px;
		cursor: pointer;
		color: #666;
		border: 1px solid #D2D2D2;
		position: relative;
	}

	#solutionStore .solutionSet .setBox .setItem .filtrate .extent {
		display: block;
		float: left;
		overflow: hidden;
		width: 170px;
		height: 39px;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		border-right: 1px solid #D2D2D2;
		line-height: 40px;
	}

	#solutionStore .solutionSet .setBox .setItem .filtrate div {
		position: relative;
		width: 40px;
		height: 40px;
	}

	#solutionStore .solutionSet .setBox .setItem .filtrate div i {
		position: absolute;
		top: 50%;
		left: 50%;
		box-sizing: border-box;
		width: 10px;
		height: 10px;
		margin-top: -5px;
		margin-left: -5px;
		border-top: 10px solid #6A666F;
		border-right: 5px solid transparent;
		border-left: 5px solid transparent;
	}

	#solutionStore .freeFix {
		width: 212px;
		height: 40px;
		border: 1px #dcdfe6 solid;
		display: inline-block;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
		border-radius: 4px;
	}

	#solutionStore .presentActive {
		border: 1px #FF9200 solid;
		background: #FFEDD1;
		color: #FF9200;
	}

	#solutionStore .solutionSet .setBox .filtBox {
		width: 211px;
		border: 1px solid #D1D1D1;
		background-color: #fff;
		margin-top: 50px;
		z-index: 999;
		position: absolute;
		left: 90px;
	}

	#solutionStore .solutionSet .setBox .filtBox li {
		height: 50px;
		margin: 0px 8px;
		border-bottom: 1px solid #D1D1D1;
		box-sizing: border-box;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
		color: #68656D;
		cursor: pointer;
	}

	#solutionStore .solutionSet .setBox .filtBox li:last-of-type {
		border-bottom: none;
	}

	.filtBox:after {
		content: "";
		width: 6px;
		height: 6px;
		border-left: 1px solid #D1D1D1;
		border-bottom: 1px solid #D1D1D1;
		transform: rotate(135deg);
		-webkit-transform: rotate(135deg);
		position: absolute;
		right: 15px;
		top: -5px;
		background: #fff;
	}

	.sel {
		display: inline-block;
		width: 120px;
		height: 40px;
		font-size: 16px;
		background: #f2f2f2;
		border-radius: 3px;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		margin-right: 10px;
	}

	.on {
		background: #28a8e0;
		color: #fff;
	}

	.countList {
		width: 100%;
	}





























	/*.selectbtns{margin-left: 10px;}*/

	.show>.selectbtns span {
		width: 100px;
		height: 38px;
		background-color: #fff;
		line-height: 38px;
		margin-right: 13px;
		border: 1px #D2D2D2 solid;
	}

	.show>.selectbtns span.sign {
		color: #FF9200;
		border: 1px #FF9200 solid;
	}

	.show>.selectbtns span:hover {
		background-color: #fff;
	}

	.countList span {
		width: 90%;
		height: 45px;
		margin-right: 30px;
		margin-top: 10px;
		line-height: 45px;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.countList span:before {
		content: "";
		width: 0;
		height: 0;
		border: 8px solid #fff;
		border-radius: 8px;
		position: absolute;
		bottom: 15px;
		left: -10px;
	}

	.countList span:after {
		content: "";
		width: 0;
		height: 0;
		border: 8px solid #fff;
		border-radius: 8px;
		position: absolute;
		bottom: 15px;
		right: -10px;
	}
</style>