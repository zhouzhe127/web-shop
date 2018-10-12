<template>
	<div id="solutionStore">
		<p class="btn">
			<span class="store fl" v-for="(item,index) in bannerList" :key='index' v-bind:class="{'active':indexOn == index}" @click="isFlag && chooseBanner(index)">{{item.name}}</span>
		</p>
		<!--固定方案-->
		<div v-if="indexOn == 0">
			<div class="solutionSet">
				<p class="headLine">方案设置
					<span class="borderLine"></span>
				</p>
				<ul class="setBox">
					<li class="setItem">
						<span class="itemLeft required">方案名</span>
						<input type="text" placeholder="请输入名称" class="inp" v-model="name" maxlength="10" />
					</li>
					<li class="setItem">
						<span class="itemLeft required">排序</span>
						<section class="sortInp">
							<subadd :bindnum="num" :maxnum="255" :minnum="1" :sign='false' @toClick="change"></subadd>
						</section>
					</li>
					<li class="setItem">
						<span class="itemLeft required">显示渠道</span>
						<div class="show">
							<mulSelect :list='ditchList' :selects="selects" :styles="{'background-color':'rgb(240,240,240)'}" :name='"name"' :key='"id"'></mulSelect>
						</div>
					</li>
					<!-- 储值适用门店 -->
					<li class="setItem" v-if="flag && ischain == '3'">
						<span class="itemLeft">储值适用门店</span>
						<a href="javascript:void(0);" class="addclassify" @click="openshopWin">选择门店</a>
						<span style="color: #A5A5A5;" v-if="fixedslectsShopIds.length > 0">已选择{{fixedslectsShopIds.length}}家门店</span>
                       
					</li>
					<li class="setItem">
						<span class="itemLeft required">储值金额</span>
						<section>
							<input type="text" placeholder="请输入金额" class="inp sum fl" v-model="deposit" onkeyup="value=value.replace(/[^\d\.]/g,'')" maxlength="6" @blur="formatValue('deposit')"
							/>
							<span class="fl unit">元</span>
						</section>
					</li>
					<li class="setItem" style="margin-bottom: 30px;">
						<span class="itemLeft required">支付金额</span>
						<section>
							<input type="text" placeholder="请输入金额" class="inp sum fl" v-model="payment" onkeyup="value=value.replace(/[^\d\.]/g,'')" maxlength="6" @blur="formatValue('payment')"
							/>
							<span class="fl unit">元</span>
						</section>
					</li>
				</ul>
			</div>
			<div class="freeContent">
				<p class="headLine">赠送内容
					<span class="borderLine"></span>
				</p>
				<ul class="setBox">
					<li class="setItem">
						<span class="itemLeft">赠送优惠券</span>
						<a href="javascript:void(0);" class="addclassify" @click="openCouponWin">添加关联优惠券</a>
						<span style="color: #A5A5A5;" v-if="couponIds.length >= 1">已关联{{couponIds.length}}张优惠券</span>
					</li>
					<li class="setItem">
						<span class="itemLeft">赠送金额</span>
						<section>
							<input type="text" placeholder="请输入金额" class="inp sum fl" v-model="giftAmount" onkeyup="value=value.replace(/[^\d\.]/g,'')"
							    maxlength="6" @blur="formatValue('giftAmount')" />
							<span class="fl unit">元</span>
						</section>
					</li>
					<li class="setItem">
						<span class="itemLeft">赠送积分</span>
						<section>
							<input type="text" placeholder="请输入金额" class="inp sum fl" v-model="giftPoint" onkeyup="value=value.replace(/[^\d]/g,'')"
							    maxlength="6" />
							<span class="fl unit">积分</span>
						</section>
					</li>
				</ul>
			</div>
		</div>
		<!--自定义方案-->
		<div v-if="indexOn == 1">
			<div class="solutionSet">
				<p class="headLine">方案设置
					<span class="borderLine"></span>
				</p>
				<ul class="setBox">
					<li class="setItem">
						<span class="itemLeft required">方案名</span>
						<input type="text" placeholder="请输入名称" class="inp" maxlength="10" v-model="defName" />
					</li>
					<!-- 储值适用门店 -->
					<li class="setItem" v-if="ischain == '3'">
						<span class="itemLeft">储值适用门店</span>
						<a href="javascript:void(0);" class="addclassify" @click="openshopWin">选择门店</a>
						<span style="color: #A5A5A5;" v-if="customslectsShopIds.length > 0">已选择{{customslectsShopIds.length}}家门店</span>
					</li>
					<li class="setItem">
						<span class="itemLeft required">排序</span>
						<section class="sortInp">
							<subadd :bindnum="defNum" :maxnum="255" :minnum="1" :sign='false' @toClick="changeDef"></subadd>
						</section>
					</li>
					<li class="setItem">
						<span class="itemLeft required">赠送条件</span>
						<div class="filtrate fl" @click="getClick()">
							<span class="extent">{{typeName}}</span>
							<div style="float: right;">
								<i></i>
							</div>
						</div>
						<ul class="filtBox" v-show="willShow">
							<li v-for="(item,index) in conditionList" :key='index' @click="choseType(index,item)">{{item.name}}</li>
						</ul>
					</li>
					<li class="setItem" style="width: 800px;margin-bottom: 30px;" v-if="conditionOn == 0">
						<span class="itemLeft" style="width: 9%;"></span>
						<section>
							<span class="fl">当储值在</span>
							<div class="fl" style="margin: 0 10px;">
								<input type="text" placeholder="请输入金额" class="inp sum fl" style="width: 135px;" v-model="defDeposit" onkeyup="value=value.replace(/[^\d\.]/g,'')"
								    maxlength="6" @blur="formatValue('defDeposit')"/>
								<span class="fl unit">元</span>
							</div>
							<span class="fl">至</span>
							<div class="fl" style="margin: 0 10px;">
								<input type="text" placeholder="请输入金额" class="inp sum fl" style="width: 135px;" v-model="defPayment" onkeyup="value=value.replace(/[^\d\.]/g,'')"
								    maxlength="6" @blur="formatValue('defPayment')"/>
								<span class="fl unit">元</span>
							</div>
							<span>时，可赠送</span>
						</section>
					</li>
					<li class="setItem" style="width: 800px;margin-bottom: 30px;" v-if="conditionOn == 1">
						<span class="itemLeft" style="width: 9%;"></span>
						<section>
							<span class="fl" style="margin-right: 10px;">当储值金额</span>
							<div class="filtrate fl" @click="getRange()">
								<span class="extent" style="width: 80px;">{{rangeName}}</span>
								<div style="float: right;">
									<i></i>
								</div>
							</div>
							<ul class="filtBox" v-show="rangeShow" style="width: 120px;position: absolute;left: 170px;">
								<li v-for="(item,index) in rangeList" :key='index' @click="chooseRange(index,item)">{{item.name}}</li>
							</ul>
							<div class="fl" style="margin: 0 10px;">
								<input type="text" placeholder="请输入金额" class="inp sum fl" style="width: 135px;" v-model="defDeposit" onkeyup="value=value.replace(/[^\d\.]/g,'')"
								    maxlength="6" @blur="formatValue('defDeposit')"/>
								<span class="fl unit">元</span>
							</div>
							<span>时，可赠送</span>
						</section>
					</li>
				</ul>
			</div>
			<div class="freeContent">
				<p class="headLine">赠送内容
					<span class="borderLine"></span>
				</p>
				<ul class="setBox">
					<li class="setItem">
						<span class="itemLeft">赠送金额</span>
						<span class="freeFix" style="margin-right: 14px;" :key='index' v-for="(item,index) in presentList" v-bind:class="{'presentActive':presentOn == index }"
						    @click="choosePresent(index)">{{item.name}}</span>
					</li>
					<li class="setItem" v-if="presentOn == 0 || presentOn == 1">
						<span class="itemLeft"></span>
						<section>
							<span class="fl">赠送</span>
							<div class="fl" style="margin: 0 10px;">
								<template v-if="presentOn == 0">
									<input type="text" placeholder="请输入金额" class="inp sum fl" style="width: 135px;" v-model="defGiftAmount" onkeyup="value=value.replace(/[^\d\.]/g,'')"
									    maxlength="6" @blur="formatValue('defGiftAmount')"/>
									<span class="fl unit">元</span>
								</template>
								<template v-if="presentOn == 1">
									<input type="text" placeholder="请输入比例" class="inp sum fl" style="width: 135px;" v-model="defGiftAmount" onkeyup="value=value.replace(/[^\d]/g,'')"
									    maxlength="4" />
									<span class="fl unit">%</span>
								</template>
							</div>
						</section>
					</li>
					<li class="setItem">
						<span class="itemLeft">赠送积分</span>
						<span class="freeFix" style="margin-right: 14px;" :key='index' v-for="(item,index) in integralList" v-bind:class="{'presentActive':integralOn == index }"
						    @click="chooseIntegral(index)">{{item.name}}</span>
					</li>
					<li class="setItem" v-if="integralOn == 0 || integralOn == 1">
						<span class="itemLeft"></span>
						<section>
							<span class="fl">
								<template v-if="integralOn == 0">
									赠送积分为
								</template>
								<template v-if="integralOn == 1">
									赠送积分为固定金额的
								</template>
							</span>
							<div class="fl" style="margin: 0 10px;">
								<template v-if="integralOn == 0">
									<input type="text" placeholder="请输入金额" class="inp sum fl" style="width: 135px;" v-model="defGiftPoint" onkeyup="value=value.replace(/[^\d]/g,'')"
									    maxlength="6" />
									<span class="fl unit">分</span>
								</template>
								<template v-if="integralOn == 1">
									<input type="text" placeholder="请输入比例" class="inp sum fl" style="width: 135px;" v-model="defGiftPoint" onkeyup="value=value.replace(/[^\d]/g,'')"
									    maxlength="4" />
									<span class="fl unit">%</span>
								</template>
							</div>
						</section>
					</li>
				</ul>
			</div>
		</div>
		<ul class="setBox" style="margin-top: 39px;">
			<li class="setItem">
				<span class="itemLeft"></span>
				<section class="buttons">
					<a href="javascript:void(0);" class="gray" style="width: 200px;" @click="backList">取消</a>
					<a href="javascript:void(0);" class="blue" style="width: 200px;" @click="creatStore">保存</a>
				</section>
			</li>
		</ul>
		<coupon @compareArr='ca' v-if='show' @couponChange='couponChange' @winEvent='winEvent' :couponIds='couponIds'></coupon>
		<!-- 选择工作门店 -->
		<select-work-shop-win :slectsShopIds="slectsShopIds" :isEdit="isEdit" @closeWin="closeShopWin" v-if="isShowShopWin"></select-work-shop-win>
	</div>
</template>
<script>
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';

	export default {
		data() {
			return {
				ischain: '',
				bannerList: [
					{
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
				presentList: [
					{
						name: '赠送固定储值金额'
					},
					{
						name: '按比例赠送储值金额'
					}
				],
				presentOn: '-1',
				integralList: [
					{
						name: '赠送固定积分'
					},
					{
						name: '按比例赠送积分'
					}
				],
				integralOn: '-1',
				conditionList: [
					{
						name: '满足储值区间可赠送',
						index: 0
					},
					{
						name: '满足储值条件可赠送',
						index: 1
					}
				],
				conditionOn: 0,
				typeName: '满足储值区间可赠送',
				willShow: false, //活动类型框是否显示
				ditchList: [
					{
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
				rangeList: [
					{
						name: '等于',
						value: '1'
					},
					{
						name: '大于等于',
						value: '3'
					},
					{
						name: '小于等于',
						value: '4'
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
				show: false,
				slectsShopIds: [], //   选择的门店
				customslectsShopIds: [], //自定义方案选择的门店
				fixedslectsShopIds: [], //固定方案选择的门店
				isShowShopWin: false,
				isEdit: false,
				flag: false,
			};
		},
		watch: {
			'selects': function () {
				this.flag = false;
				for (let item of this.selects) {
					if (item == '2') {
						this.flag = true;
						break;
					}
				}
			}
		},
		components: {
			subadd: () =>
				import ( /* webpackChunkName:'subadd' */ 'src/components/subadd'),
			mulSelect: () =>
				import ( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
			coupon: () =>
				import ( /* webpackChunkName:'member_store_coupon' */ './member_store_coupon'),
			'select-work-shop-win': () =>
				import ( /* webpackChunkName: 'select_work_shop_win' */ './../seller_assistant/select_work_shop_win'),
		},
		mounted() {
			this.$store.commit('setPageTools', {
				back: () => {
					this.backList();
				}
			});
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
			openshopWin: function () {
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
			winEvent() {
				this.show = false;
			},
			ca(arr) {
				this.compareArr = arr;
			},
			changeDef(num) {
				this.defNum = num;
			},
			change(num) {
				this.num = num;
			},
			//选择固定或者自定义方案
			chooseBanner: function (index) {
				this.indexOn = index;
			},
			//赠送何种金额
			choosePresent: function (index) {
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
			chooseIntegral: function (index) {

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
			chooseDitch: function (index) {
				this.selects = index;
				this.channel = this.selects;

			},

			//选择区间范围
			chooseRange: function (index, item) {
				this.rangeOn = index;
				this.rangeName = item.name;
				this.rangeShow = false;
				this.depositRule = item.value;
			},
			//显示活动类型
			getClick: function () {
				if (this.willShow == true) {
					this.willShow = false;
				} else {
					this.willShow = true;
				}
			},
			//显示区间条件
			getRange: function () {
				if (this.rangeShow == true) {
					this.rangeShow = false;
				} else {
					this.rangeShow = true;
				}
			},
			//选择满足何种赠送条件
			choseType: function (index, item) {
				this.conditionOn = index;
				this.typeName = item.name;
				this.willShow = false;
			},
			//返回
			backList: function () {
				this.$router.push('/admin/memberStoredValueScheme');
			},

			//打开关联优惠券
			openCouponWin() {

				this.show = true;

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
					if (!global.checkData(
						{
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
			editDetail: function () {
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
		}
	};
</script>
<style scoped>
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
		line-height: 41px;
		cursor: pointer;
		margin: 0;
		background: #F2F2F2;
		color: #333;
	}

	#solutionStore .btn .active {
		background: #28A8E0;
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
		border: 1px #D2D2D2 solid;
		display: inline-block;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
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