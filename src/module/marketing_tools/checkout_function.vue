<!--
    **新增结账功能
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="pay-window">
		<!-- 基础配置 -->
		<div class="set-line">
			<div class="titles">基础配置</div>
			<div class="line"></div>
		</div>
		<!-- 自定义名称 -->
		<div class="pay-window-box">
			<span class="fl pay-window-sub">自定义名称</span>
			<input type="text" class="fl custom" placeholder="请输入自定义名称" v-model="name" maxlength="4" />
			<div class="fl handle-tips">
				<i></i> 最多四个字
			</div>
		</div>
		<!-- 关联功能 -->
		<div class="pay-window-box">
			<span class="fl pay-window-sub required">关联功能</span>
			<template v-for="(item,index) in goodlist">
				<span :key='index' :class="type == index ? 'signa associated' : 'associated'" v-on:click="tabTypes(index,'1')" v-if="item.type">{{item.name}}</span>
			</template>
		</div>
		<!-- 开启关联功能 -->
		<div class="pay-window-box" v-show="opentheFunction">
			<span class="fl pay-window-sub">开启功能</span>
			<onOff :key='1' :status="payStatus" @statusChange="ispayStatus"></onOff>
			<!-- <span :class="payStatus == false?'off check-span' : 'on check-span'" v-on:click="ispayStatus"></span> -->
		</div>
		<!-- 配送规则 -->
		<div class="set-line">
			<div class="titles">配送规则</div>
			<div class="line"></div>
		</div>
		<!-- 外卖的支付方式 -->
		<!-- 起送费 -->
		<div class="pay-window-box clearfix" v-if="type == '1'">
			<span class="fl pay-window-sub required">起送费</span>
			<div class="rightHalf">
				<section class="fl">
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="sendingfee" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="keepValue('sendingfee')" />
					<span>元</span>
				</section>
				<div class="fl handle-tips">
					<i></i> 满足费用才允许配送
				</div>
			</div>
			<!-- <input type="text" id="sendingfee" maxlength="5" class="fl" style="width: 149px;height: 36px;padding: 0;border-color: #999;border-right: none;" placeholder="0" v-model="sendingfee" />
			<div style="border:1px solid #999;width: 69px;float: left;height: 36px;border-left: none;text-align: center;line-height: 36px;background-color: #fff;">元</div> -->
		</div>
		<!-- 配送范围 -->
		<div class="pay-window-box clearfix" v-if="type == '1'">
			<span class="fl pay-window-sub required">配送范围</span>
			<section class="fl" style="overflow: hidden;">
				<div class="scopes" v-for="(item,index) in distances" :key='index'>
					<div class="scopes_l fl">
						<span>{{item.defaultdis}}</span>
						<span>Km</span>
					</div>
					<div class="lines"></div>
					<div class="scopes_r fl">
						<input type="text" name="" v-model="item.distance" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="3">
						<span>Km</span>
					</div>
					<div class="lines"></div>
					<div class="scopes_r fl">
						<input type="text" name="" v-model="item.cost" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="formatValue(index)">
						<span>元</span>
					</div>
					<span class="seat fl">配送费</span>
					<a href="javascript:void(0)" class="delet fl" @click="deldistance(index)"></a>
				</div>
			</section>
			<a href="javascript:void(0)" class="add fl" @click='adddistance'>
					<img src="../../res/images/adds.png">
				</a>
		</div>
		<!-- 预计到达 -->
		<div class="pay-window-box clearfix" v-if="type == '1'">
			<span class="fl pay-window-sub required">预计到达</span>
			<div class="rightHalf">
				<section class="fl">
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="estimatedtime" onkeyup="value=value.replace(/[^\d.]/g,'')" />
					<span>分钟</span>
				</section>
			</div>
			<!-- <input type="text" id="estimatedtime" maxlength="5" placeholder="0" class="fl" style="width: 149px;height: 36px;padding: 0;border-color: #999;border-right: none;" v-model="estimatedtime" />
			<div style="border:1px solid #999;width: 69px;float: left;height: 36px;border-left: none;text-align: center;line-height: 36px;background-color: #fff;">分钟</div> -->
		</div>
		<!-- 备餐时间 -->
		<div class="pay-window-box clearfix" v-if="type == '0'">
			<span class="fl pay-window-sub required">备餐时间</span>
			<div class="rightHalf">
				<section class="fl">
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="equipment" onkeyup="value=value.replace(/[^\d]/g,'')" />
					<span>分钟</span>
				</section>
			</div>
			<!-- <input type="text" id="equipment" maxlength="5" class="fl" placeholder="0" style="width: 149px;height: 36px;padding: 0;border-color: #999;" v-model="equipment" />
			<div style="border:1px solid #999;width: 69px;float: left;height: 36px;border-left: none;text-align: center;line-height: 36px;">分钟</div> -->
		</div>
		<!-- 快递的支付方式 -->
		<!-- 快递费用 -->
		<div class="pay-window-box clearfix" v-if="type == '3'">
			<span class="fl pay-window-sub required">快递费用</span>
			<div class="rightHalf">
				<section class="fl">
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="equipment" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="keepValue('equipment')" />
					<span>元</span>
				</section>
				<div class="fl handle-tips">
					<i></i> 无法使用积分抵扣
				</div>
			</div>
			<!-- <input type="text" id="shippingfee" maxlength="5" placeholder="0" class="fl" style="width: 149px;height: 36px;padding: 0;border-color: #999;border-right: none;" v-model="shippingfee" />
			<div style="border:1px solid #999;width: 69px;float: left;height: 36px;border-left: none;text-align: center;line-height: 36px;background-color: #fff;">元</div> -->
		</div>
		<!-- 支付规则 -->
		<div class="pay-window-box clearfix" style="margin-bottom:0;">
			<span class="fl pay-window-sub">支付规则</span>
			<section class="fl payment-rules">
				<div class='define' v-if="configure.length <=4 ">
					<input type="text" placeholder="请输入规则" class="fl define-inp" v-model="content" maxlength="20" />
					<div class='bg' @click="saveConcont"></div>
					<div class="fl handle-tips">
						<i></i> 最多定义五条
					</div>
				</div>
				<div class="rlues" v-for="(content,i) in configure" :key='i' v-if="configure.length >= 1">{{content}}
					<i @click="delConcont(i)"></i>
				</div>
			</section>
		</div>
		<!-- 可填写内容配置 -->
		<div class="pay-window-box clearfix">
			<span class="fl pay-window-sub">可填写内容配置</span>
			<!-- 根据关联功能的type值显示对应的内容配置 -->
			<span class="fl" v-if="type == '0'">
					<mulSelect :list.sync="configurationList" :selects.sync="configurationSelect" :name='"name"' :key='"id"' :styles="{'background-color':'rgb(239,239,239)','margin-right':'8px'}"></mulSelect>
				</span>
			<span class="fl" v-if="type == '1'">
					<mulSelect :list.sync="takeoutList" :selects.sync="takeoutSelect" :name='"name"' :key='"id"' :styles="{'background-color':'rgb(239,239,239)'}"></mulSelect>
				</span>
			<span class="fl" v-if="type == '3'">
					<mulSelect :list.sync="courierList" :selects.sync="courierSelect" :name='"name"' :key='"id"' :styles="{'background-color':'rgb(239,239,239)'}"></mulSelect>
				</span>
		</div>
		<!-- 用餐人数 -->
		<div class="pay-window-box clearfix" v-if="type == '0'">
			<span class="fl pay-window-sub">用餐人数</span>
			<!-- <span :class="{'check-span':true,fl:true,off:personStatus == false,on:personStatus}" v-on:click="ispersonStatus"></span> -->
			<onOff class="fl" :key='1' :status="personStatus" @statusChange="ispersonStatus"></onOff>
			<div class="fl handle-tips">
				<i></i> 关闭后,默认用餐人数为1人
			</div>
			<!-- <span class="fl" style="margin-left: 10px;">关闭后,默认用餐人数为1人</span> -->
		</div>
		<div class="pay-window-box clearfix" v-if="type == '0' && personStatus">
			<span class="fl pay-window-sub"></span>
			<div class="rightHalf">
				<span class="required fl ceiling">上限人数</span>
				<section class="fl">
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="mealsNum" onkeyup="value=value.replace(/[^\d]/g,'')" />
					<span>人</span>
				</section>
			</div>
			<!-- <input type="text" id="mealsNum" maxlength="5" class="fl" placeholder="0" style="width: 100px;height: 36px;padding: 0;border-color: #999;" v-model="mealsNum" />
			<div style="border:1px solid #999;width: 40px;float: left;height: 36px;border-left: none;text-align: center;line-height: 36px;">人</div> -->
		</div>
		<!-- 可配送区域 -->
		<div class="pay-window-box clearfix" v-if="type == '0'">
			<span class="fl pay-window-sub">可配送范围</span>
			<a href="javascript:void(0);" class="addclassify" v-on:click="isarea" v-show="area == false">添加关联区域</a>
			<a href="javascript:void(0);" class="related-area" v-on:click="isarea" v-show="area == true">关联区域</a>
			<span style="margin-left: 20px;" v-if="areaLength != '' && areaLength != 0 ">已选{{areaLength}}个区域</span>
		</div>
		<!-- 管理区域 -->
		<div class="pay-window-box clearfix" v-if="type == '0' && area">
			<span class="fl pay-window-sub"></span>
			<div class="regionalCorrelation fl">
				<div class="regionalbox">
					<a href="javascript:void(0)" class="check fl " style="margin-right: 40px;" @click="isCheckAll(true)">全选</a>
					<a href="javascript:void(0)" class="unselect fl" @click="isCheckAll()">全部取消</a>
				</div>
				<!-- 地址 -->
				<mulSelect :list.sync="areaList" :selects.sync="areaSelect" :styles="{backgroundColor:'rgb(240,240,240)','marginRight':'8px','marginBottom':'8px'}" :name='"areaName"' :key='"id"'></mulSelect>
			</div>
		</div>
		<!-- 高级设置 -->
		<div class="set-line">
			<div class="titles">高级设置</div>
			<div class="line"></div>
		</div>
		<!-- 必点商品 -->
		<div class="pay-window-box clearfix">
			<span class="fl pay-window-sub">必点商品</span>
			<div class="rightHalf">
				<singleSelect class="fl" :index='result' @selOn='haveIndex' :styles="{width:'108px',border: '1px solid #cecdcd',marginRight: '8px'}" :list="evaluationList" :name="'name'" :key='"id"'></singleSelect>
				<div class="prompting fl" @click="isPublicNumber('2')">
					<div class="detDiv" v-if="isPublic['2']">
						<i class="detI triright"></i>
						<h3 class="detH3">
							仅提醒:用户下单时,提醒其必点商品,允许跳过.不选择必点商品同样允许下单.
							<p>提醒并必点:用户下单时,提醒其必点商品,，不允许跳过.不选择必点商品不允许下单.</p>
						</h3>
					</div>
				</div>
			</div>
		</div>
		<!-- 提醒内容 -->
		<div class="pay-window-box clearfix">
			<span class="fl pay-window-sub">提醒内容</span>
			<div class="rightHalf">
				<input type="text" class="fl custom" placeholder="请输入提醒内容" v-model="mustGoodsRemind" maxlength="50" />
				<div class="fl handle-tips">
					<i></i> 限50字,必点商品名称用{goods}代替
				</div>
			</div>
		</div>
		<!-- 多人下单 -->
		<!-- <div class="pay-window-box clearfix">
			<span class="fl pay-window-sub">多人下单</span>
			<div class="rightHalf">
				<onOff :key='1' :status="manypeopleStatus" @statusChange="ismanypeopleStatus"></onOff>
				<div class="pay-window-box clearfix" style="margin-top: 10px;" v-if="manypeopleStatus">
					<span class="fl pay-window-sub" style="width: 80px;text-align: left;">单用户必点</span>
					<div class="rightHalf" style="width: 300px;">
						<template v-for="(item,index) in singleUser">
							<span :key='index' :class="userStatus == index ? 'signa associated' : 'associated'" v-on:click="tabTypes(index,'2')">{{item.name}}</span>
						</template>
						<div class="prompting fl" @click="isPublicNumber('3')">
							<div class="detDiv" v-if="isPublic['3']">
								<i class="detI triright"></i>
								<h3 class="detH3">
							是:每增加一个购物车判断必点,否则不允许下单.
							<p>否:整单判断必点商品,一个订单下至少存在一个必点商品,否则不允许下单.</p>
						</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> -->
		<!-- 保存 -->
		<div class="pay-window-box clearfix">
			<span class="fl pay-window-sub"></span>
			<div class="rightHalf">
				<a href="javascript:void(0);" class="blue fl" style="width: 200px;" @click="saveConfig">保存</a>
			</div>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	props: {
		opentheFunction: Boolean,
		upPayInfo: Object,
		isUpdata: String,
		modifyindex: [String, Number],
		checkoutMenu: Array
	},
	data() {
		return {
			invoicingId: '', // 结账功能id
			payStatus: true, //是否开启支付方式
			personStatus: true, //用餐人数的状态
			mealsNum: '', //用餐人数
			name: '', // 自定义的名称
			index: -1, //选中的index
			type: '0', // 关联功能 选中的状态 
			area: false, // 关联区域地址显示和隐藏
			needInfo: '', //弹窗的信息
			goodlist: [{ // 关联功能的数据展示列表
					'type': '0',
					'name': '自助'
				},
				{
					'type': '1',
					'name': '外卖'
				},
				{
					// 'type': '',
					'name': '自取'
				},
				{
					'type': '3',
					'name': '快递'
				}
			],
			configurationList: [{ //自助模式下的可填写内容配置
					'name': '姓名',
					'id': '1'
				},
				{
					'name': '电话',
					'id': '2'
				},
				{
					'name': '发票',
					'id': '3'
				},
				{
					'name': '地址',
					'id': '4'
				}
			],
			configurationSelect: [],
			takeoutList: [{ //外卖模式下的可填写内容配置
				'name': '发票',
				'id': '3'
			}],
			takeoutSelect: [],
			inviteList: [{ // 自取模式下的可填写内容配置
					'name': '姓名',
					'id': '1'
				},
				{
					'name': '电话',
					'id': '2'
				},
				{
					'name': '发票',
					'id': '3'
				}
			],
			inviteSelect: [],
			courierList: [{ //  快递下的可填写内容配置
				'name': '发票',
				'id': '3'
			}],
			courierSelect: [],
			areaList: [], //请求到的区域列表的数据
			areaSelect: [], //区域选中数组
			areaLength: '', // 区域选中数组的长度
			configure: [], // 支付规则
			content: '', // 规则内容 
			equipment: '', //备餐时间
			sendingfee: '', //起送费
			shippingfee: '0', // 配送费
			estimatedtime: '', // 预计到达时间 :[]
			distances: [{
				'defaultdis': '0',
				'distance': '5',
				'cost': '0'
			}],
			evaluationList: [{
				id: 1,
				name: '仅提醒'
			}, {
				id: 2,
				name: '必点'
			}],
			result: 0, //必点商品选中的
			mustGoodsRemind: '', //t提醒内容
			manypeopleStatus: false, //多人下单的状态
			singleUser: [{
				id: 1,
				name: '是'
			}, {
				id: 2,
				name: '否'
			}],
			userStatus: 0, //单用户必点状态
			isPublic: {
				'1': false,
				'2': false,
				'3': false
			}
		};
	},
	watch: {
		'distances': {
			handler() {
				for (let i = 1; i < this.distances.length; i++) {
					this.distances[i].defaultdis = this.distances[i - 1].distance;
				}
			},
			deep: true
		}
	},
	methods: {
		ispayStatus: function(res) { //开启关联功能
			this.payStatus = res;
		},
		ispersonStatus: function(res) { //开启用餐人数的状态
			this.personStatus = res;
		},
		ismanypeopleStatus: function(res) { //是否开启多人下单
			this.manypeopleStatus = res;
		},
		// 关联功能切换
		tabTypes: function(index, type) {
			if (type == '1') {
				this.type = index;
			} else {
				this.userStatus = index;
			}
		},
		// 是否显示地址的
		isarea: function() {
			this.area = !this.area;
		},
		checkForm: function() { //验证表单
			let reg = /^([1-9]|(1[0-9])|(2[0]))$/; //匹配1-20
			// 判断自定义名称是否为空 如果为空的话就就显示对应的关联功能的名字
			if (!this.name) {
				// 当输入框的为''时
				this.name = this.goodlist[this.type].name;
			}
			// 当在关联功能为自助时候
			if (this.type == '0') {
				if (this.equipment == '') {
					// 当输入框的为''时
					this.$store.commit('setWin', {
						content: '请输入备餐时间',
						time: 1000
					});
					return false;
				}
				if (this.equipment > 60) {
					// 当输入框的为''时
					this.$store.commit('setWin', {
						content: '备餐时间不得超过60分钟',
						time: 1000
					});
					return false;
				}
				if (this.personStatus && utils.trim(this.mealsNum) == '') {
					this.$store.commit('setWin', {
						content: '用餐人数不能为空',
						time: 1000
					});
					return false;
				}
				if (this.personStatus && !reg.test(this.mealsNum)) {
					this.$store.commit('setWin', {
						content: '用餐人数为1-20的正整数',
						time: 1000
					});
					return false;
				}
			}
			if (this.type == '1') {
				// 起送费的判断
				if (this.sendingfee == '') {
					// 当输入框的为''时
					this.$store.commit('setWin', {
						content: '请输入起送费',
						time: 1000
					});
					return false;
				}
				//配送范围判断
				for (let item of this.distances) {
					if (Number(item.distance) <= Number(item.defaultdis)) {
						this.$store.commit('setWin', {
							content: '请填写结束距离,并且结束距离应大于起始距离'
						});
						return false;
					}
					if (item.cost == '' || item.distance == '') {
						this.$store.commit('setWin', {
							content: '完善配送范围填写，或删除配送区域'
						});
						return false;
					}
					if (Number(item.cost) > 999 || Number(item.cost) < 0) {
						this.$store.commit('setWin', {
							content: '配送费区间0~999'
						});
						return false;
					}
				}
				if (this.estimatedtime == '') {
					// 当输入框的为''时
					this.$store.commit('setWin', {
						content: '请输入预计到达时间',
						time: 1000
					});
					return false;
				}
			}
			if (this.type == '3') {
				// 配送费的判断
				if (this.shippingfee == '') {
					// 当输入框的为''时
					this.$store.commit('setWin', {
						content: '请输入快递费',
						time: 1000
					});
					return false;
				}
			}
			return true;
		},
		saveConfig: function() { //保存方法
			if (!this.checkForm()) return;
			// 结账功能的修改和保存
			// 首先通过传递的type值来判断执行修改还是保存 1 表示修改
			this.setItem();
			this.$emit('winEvent', false);
			// if (this.isUpdata == '1') {
			// 	// 修改
			// 	let bool = this.itemInArr(this.needInfo, this.wininfo.updatePay, 'id');
			// 	if (!bool) {
			// 		if (this.needInfo.id) {
			// 			this.wininfo.updatePay.push(this.needInfo);
			// 		} else {
			// 			this.wininfo.addPay.splice(this.getIndex(this.item), 1, this.needInfo);
			// 		}
			// 	} else {
			// 		this.wininfo.updatePay.splice(bool - 1, 1, this.needInfo);
			// 	}
			// 	this.wininfo.pay.splice(this.i, 1, this.needInfo);
			// } else {
			// 	// 新增
			// 	this.wininfo.addPay.push(this.needInfo);
			// 	this.wininfo.pay.push(this.needInfo);
			// }			

		},
		//获取点击对应的index
		// 点击对应的功能  获取传递进来的参数
		getItemInfo: function() {
			let item = this.upPayInfo;
			// 获取传递数组参数
			if (item.id) {
				this.invoicingId = item.id; //结账功能id
			}
			this.name = item.name; // 获取对应的名称
			this.payStatus = Boolean(Number(item.status)); // 获取对应的是否开启支付状态
			this.personStatus = Boolean(Number(item.confineStatus)); //是否开启用餐人数的状态
			this.mealsNum = item.personConfine; //用餐人数
			this.type = item.type - 1; // 对应的功能类型
			if (item.customContent != '') {
				this.configure = item.customContent.split('!#!'); //获取支付规则
			}
			if (item.scopeDelivery != '') {
				this.distances = [];
				for (let it of item.scopeDelivery) {
					this.distances.push({
						'defaultdis': '0',
						'distance': it.distance,
						'cost': it.cost
					});
				}
				for (let i = 1; i < this.distances.length; i++) {
					this.distances[i].defaultdis = this.distances[i - 1].distance;
				}
			}
			this.equipment = item.readyMealTime; // 备餐时间
			this.sendingfee = item.minFee; // 起送费
			this.shippingfee = item.moveFee; //  配送费
			this.estimatedtime = item.preArriveTime; // 预计送达时间
			// 可填写内容配置回填
			if (item.fillContent != undefined && item.fillContent != '') {
				let fillContent = String(item.fillContent);
				for (let i = 0; i < fillContent.length; i++) {
					switch (Number(item.type)) {
						case 1:
							this.configurationSelect.push(fillContent[i]);
							break;
						case 2:
							this.takeoutSelect.push(fillContent[i]);
							break;
						case 4:
							this.courierSelect.push(fillContent[i]);
							break;
					}
				}
			}
			// 判断等待区域配置为否为空 不为空赋值
			if (item.type == 1) {
				if (item.areaIds && item.areaIds != '') {
					let areaIds = item.areaIds.split(',');
					this.areaSelect = areaIds;
					this.areaLength = utils.isEmptyObject(this.areaSelect) == true ? '' : this.areaSelect.length;
				}
			}
			this.result = item.mustGoodsStatus - 1; //必点商品
			this.mustGoodsRemind = item.mustGoodsRemind; //提醒内容
			this.manypeopleStatus = Boolean(Number(item.multiOrderStatus)); //多人下单开关
			if (this.manypeopleStatus) { //单人必点
				if (item.multiOrderStatus == 2) {
					this.userStatus = 0;
				} else if (item.multiOrderStatus == 1) {
					this.userStatus = 1;
				}
			}
		},
		// 保存修改方法
		setItem: function() {
			// 修改信息
			let item = {};
			// if (this.isUpdata) {
			// 	item.status = Number(this.payStatus); //支付开启或关闭
			// }
			if (this.invoicingId != '') item.id = this.invoicingId; //功能id
			//单个结账功能新增的时候默认开启 修改时可以关闭
			item.status = Number(this.payStatus); //支付开启或关闭
			item.name = this.name; // 功能名称
			item.type = Number(this.type) + 1; //功能类型
			item.confineStatus = Number(this.personStatus); //用餐人数的状态
			if (this.personStatus) { //用餐人数关闭的状态下 用餐人数默认为1
				item.personConfine = this.mealsNum;
			} else {
				item.personConfine = 1;
			}
			item.customContent = this.configure.join('!#!'); //支付规则
			if (!utils.isEmptyObject(this.configurationSelect) && item.type == 1) { //可填写内容
				item.fillContent = Number(String(this.configurationSelect).replace(/,/g, ''));
			}
			if (!utils.isEmptyObject(this.inviteSelect) && item.type == 3) { //可填写内容
				item.fillContent = Number(String(this.inviteSelect).replace(/,/g, ''));
			}
			if (!utils.isEmptyObject(this.takeoutSelect) && item.type == 2) { //可填写内容
				item.fillContent = Number(String(this.takeoutSelect).replace(/,/g, ''));
			}
			if (!utils.isEmptyObject(this.courierSelect) && item.type == 4) { //可填写内容
				item.fillContent = Number(String(this.courierSelect).replace(/,/g, ''));
			}

			if (item.fillContent == '' || item.fillContent == undefined) item.fillContent = 0;

			if (item.type == 1) {
				this.getArea(); // 获取区域数据的列表
				let arrList = []; // 定义一个空数组

				this.areaList.filter((item, i, arr) => {
					this.areaSelect.filter(function(item2, j, arr2) {
						if (arr2[j] == arr[i].id) {
							arrList.push(arr2[j]);
						}
					});
				});
				// 获取选中的数组
				this.areaSelect = utils.unique(utils.deepCopy(arrList));
				if (!utils.isEmptyObject(this.areaSelect)) { //可配送区域的id
					item.areaIds = this.areaSelect.join(',');
				}
				// 获取选中数组的长度
				this.areaLength = utils.isEmptyObject(this.areaSelect) == true ? '' : this.areaSelect.length;
				// 将选中的数组保存下来
				// square.payList = this.areaSelect;
			}
			item.readyMealTime = this.equipment; // 备餐时间
			item.minFee = this.sendingfee; // 起送费
			item.moveFee = this.shippingfee; //配送费
			item.preArriveTime = this.estimatedtime; //预计送达时间
			// 配送范围
			item.scopeDelivery = [];
			for (let it of this.distances) {
				item.scopeDelivery.push({
					'distance': it.distance,
					'cost': it.cost
				});
			}
			item.mustGoodsStatus = this.result + 1; //必点商品
			item.mustGoodsRemind = this.mustGoodsRemind; //提醒内容
			//多人下单开关
			//是 传2
			//否 传1
			//关掉传0
			if (this.manypeopleStatus) {
				if (this.userStatus == 0) {
					item.multiOrderStatus = 2;
				} else if (this.userStatus == 1) {
					item.multiOrderStatus = 1;
				}
			} else {
				item.multiOrderStatus = 0;
			}
			//item.multiOrderStatus = this.manypeopleStatus ? this.userStatus + 1 : 0; //多人下单开关
			if (this.isUpdata == '1') {
				this.checkoutMenu[this.modifyindex] = item;
			} else {
				this.checkoutMenu.push(item);
			}
			//this.needInfo = item;
		},
		// 获取关联区域
		async getArea() {
			let data = await http.getArea({});
			this.areaList = data;
			// 请求关联区域的接口

		},
		// 关联区域的全选与反选
		isCheckAll: function(isCheck) {
			if (isCheck) {
				this.areaSelect = [];
				this.areaList.filter((itme) => {
					// 将地址的id全部放到区域选择的数组当中去
					this.areaSelect.push(itme.id);
				});
			} else {
				// 否则的话清空数组
				this.areaSelect = [];
			}
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
			if (this.configure.length == 5) {
				this.$store.commit('setWin', {
					content: '最多添加五条！',
					time: 1000
				});
				return false;
			}
			this.configure.push(this.content);
			// 每次输入完规则之后将输入框清空
			this.content = '';
			// 保存
			// square.rulesList = this.configure;
		},
		// 删除规则配置
		delConcont: function(i) {
			// 将对应的下标的规则从数组里面删除掉
			this.configure.splice(i, 1);
			this.content = '';
			// 将输入的规则保存下来
			// square.rulesList = this.configure;
		},
		adddistance: function() {
			for (let item of this.distances) {
				if (Number(item.distance) <= Number(item.defaultdis)) {
					this.$store.commit('setWin', {
						content: '请填写结束距离,并且结束距离应大于起始距离'
					});
					return false;
				}
				if (item.cost == '' || item.distance == '') {
					this.$store.commit('setWin', {
						content: '完善配送范围填写，或删除配送区域'
					});
					return false;
				}
				if (Number(item.cost) > 999 || Number(item.cost) < 0) {
					this.$store.commit('setWin', {
						content: '配送费区间0~999'
					});
					return false;
				}
			}
			if (this.distances.length == 5) {
				this.$store.commit('setWin', {
					content: '最多添加五条！',
					time: 1000
				});
				return false;
			}
			this.distances.push({
				'defaultdis': '',
				'distance': '',
				'cost': ''
			});
		},
		deldistance: function(i) {
			if (i == 0) {
				this.$store.commit('setWin', {
					content: '默认项无法删除',
					time: 1000
				});
				return false;
			}
			// 将对应的下标的规则从数组里面删除掉
			this.distances.splice(i, 1);
		},
		formatValue: function(index) {
			this.distances[index].cost = utils.toFloatStr(this.distances[index].cost, 2);
		},
		haveIndex(i) { //评价模式
			this.result = i;
		},
		returnPay: function() { //返回按钮
			this.$emit('winEvent', false);
		},
		keepValue: function(value) {
			this[value] = utils.toFloatStr(this[value], 2);
		},
		isPublicNumber: function(type) { //提示的状态
			for (let key in this.isPublic) {
				if (key != type) {
					this.isPublic[key] = false;
				}
			}
			this.isPublic[type] = !this.isPublic[type];
		},
	},
	components: {
		Win: () =>
			import ( /* webpackChunkName:'win' */ 'src/components/win'),
		mulSelect: () =>
			import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
		'singleSelect': () =>
			import ( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select'),
		onOff: () =>
			import ( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '返回',
			className: ['fd-white'],
			fn: () => {
				this.returnPay();
			}
		}]);
		this.getArea();
		if (this.isUpdata == '1') { //如果修改获取信息
			this.getItemInfo();
		}
	}
};
</script>
<style type="text/css" scoped>
input {
	outline: none;
	text-indent: 20px;
	background: #fff;
}

.bg {
	border: 1px solid #999;
	width: 68px;
	float: left;
	height: 36px;
	border-left: none;
	background: url(../../res/icon/iconright.png) #fff center no-repeat;
}

#pay-window .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#pay-window .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

#pay-window .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#pay-window .pay-window-box {
	min-height: 40px;
	width: 100%;
	margin-bottom: 25px;
	line-height: 40px;
}

#pay-window .pay-window-box .custom {
	width: 215px;
	height: 36px;
	padding: 0;
	border-color: #999;
}

#pay-window .pay-window-box .associated {
	float: left;
	display: block;
	width: 98px;
	height: 36px;
	border: 1px solid #999;
	margin-right: 15px;
	text-align: center;
	line-height: 38px;
	cursor: pointer;
	background: #fff;
}

#pay-window .pay-window-box .scopes {
	height: 40px;
	margin-bottom: 22px;
}

#pay-window .pay-window-box .scopes .seat {
	display: block;
	height: 40px;
	width: 80px;
	text-align: center;
	line-height: 40px;
}

#pay-window .pay-window-box .payment-rules {
	width: auto;
	height: auto;
}

#pay-window .pay-window-box .payment-rules .define {
	height: 40px;
	padding: 0;
	position: relative;
	cursor: pointer;
	margin-bottom: 25px;
}

#pay-window .pay-window-box .payment-rules .define .define-inp {
	width: 320px;
	height: 36px;
	padding: 0;
	border-color: #999;
}

#pay-window .pay-window-box .rightHalf {
	width: 600px;
	height: auto;
	float: left;
}

#pay-window .pay-window-box .ceiling {
	display: block;
	height: auto;
	min-height: 40px;
	line-height: 40px;
	color: #666666;
	margin-right: 25px;
}

#pay-window .pay-window-box .rightHalf section {
	width: 210px;
	height: 38px;
	border: 1px solid #CECDCD;
	border-color: rgb(153, 153, 153);
	/* float: left; */
}

#pay-window .pay-window-box .rightHalf section .cumulative {
	width: 150px;
	height: 36px;
	border: none;
	/* border: 1px solid #eaeaea;
	border-color: rgb(153, 153, 153); */
	float: left;
	outline: none;
	text-indent: 17px;
}

#pay-window .pay-window-box .rightHalf section span {
	display: block;
	float: left;
	width: 58px;
	height: 37px;
	text-align: center;
	line-height: 38px;
	border-left: 1px solid #CECDCD;
	border-color: rgb(153, 153, 153);
}

#pay-window .pay-window-box .scopes .delet {
	display: block;
	width: 16px;
	height: 19px;
	background: url(../../../src/res/icon/icondelete.png) no-repeat center;
	margin: 10px 25px 10px 0;
}

#pay-window .pay-window-box .add {
	display: block;
	width: 19px;
	height: 19px;
	margin: 10px 0;
}

#pay-window .pay-window-box .add img {
	width: 100%;
	height: 100%;
	float: left;
}

#pay-window .pay-window-box .scopes .scopes_l {
	width: 100px;
	height: 40px;
	border: 1px solid #d2d2d2;
	background: #f1f1f1;
}

#pay-window .pay-window-box .scopes .scopes_r {
	width: 100px;
	height: 40px;
	border: 1px solid #d2d2d2;
	background: #fff;
}

#pay-window .pay-window-box .scopes .scopes_r input {
	width: 49px;
	height: 38px;
	float: left;
	border: none;
	outline: none;
}

#pay-window .pay-window-box .scopes .lines {
	margin: 19px 14px;
	width: 18px;
	height: 1px;
	background: #cecece;
	float: left;
}

#pay-window .pay-window-box .scopes .scopes_l span,
#pay-window .pay-window-box .scopes .scopes_r span {
	display: block;
	float: left;
	width: 49px;
	height: 38px;
	text-align: center;
	line-height: 38px;
}

#pay-window .pay-window-box .pay-window-sub {
	display: block;
	width: 115px;
	height: auto;
	min-height: 40px;
	line-height: 40px;
	font-size: 16px;
	text-align: right;
	margin-right: 25px;
}

#pay-window .pay-window-box .rlues {
	width: 320px;
	height: 36px;
	border: 1px solid #999;
	text-align: center;
	line-height: 36px;
	position: relative;
	background-color: #fff;
	margin-bottom: 25px;
}

#pay-window .pay-window-box .rlues i {
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

#pay-window .pay-window-box .rlues:hover i {
	display: block;
}

#pay-window .pay-window-box .addclassify {
	width: 212px;
	background-color: #f8941f;
	background-position: 50px center;
}

#pay-window .pay-window-box .related-area {


	background: url('../../res/images/upgray.png') 140px center no-repeat #fff;
	width: 212px;
	height: 40px;
	line-height: 40px;
	background-color: #f8941f;
	color: #fff;
}

#pay-window .regionalCorrelation {
	width: 700px;
	height: auto;
	min-height: 218px;
	border: 1px solid #999;
	background-color: #fff;
	/* margin-left: 50px; */
	padding: 15px 25px;
}

#pay-window .regionalCorrelation .regionalbox {
	width: 100%;
	height: auto;
	padding-bottom: 20px;
	overflow: hidden;
	margin-bottom: 5px;
}

#pay-window .regionalCorrelation .selectbtns span {
	width: auto;
	height: 36px;
	margin-right: 15px;
	margin-bottom: 10px;
}

#pay-window .pay-window-box .signa {
	background: #FFF3E5 !important;
	border: 1px solid #F8931F !important;
	color: #F9911E !important;
}

#pay-window .handle-tips {
	margin-left: 17px;
	height: 40px;
	line-height: 40px;
	text-indent: 25px;
	background: url("../../../src/res/images/prompt.png") 0 center no-repeat;
	color: #999999;
}

#pay-window .rightHalf .prompting {
	display: inline-block;
	width: 40px;
	height: 40px;
	background: url(../../../src/res/icon/orderdetial18.png) no-repeat center;
	position: relative;
	vertical-align: middle;
	cursor: pointer;
}

#pay-window .rightHalf .prompting .detDiv {
	display: inline-block;
	width: 279px;
	background: #45404b;
	position: absolute;
	top: 0px;
	left: 45px;
	padding: 10px;
	box-shadow: 3px 2px 10px #ccc;
	z-index: 100;
}

#pay-window .rightHalf .prompting .detDiv .detI {
	width: 0;
	height: 0;
	line-height: 0;
	position: absolute;
	top: 10px;
	left: -20px;
	right: 30%;
	border-width: 10px;
	border-top: 0px;
	border-style: solid;
	border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
}

#pay-window .rightHalf .prompting .detDiv .detH3 {
	line-height: 22px;
	color: #e6e6e7;
}

#pay-window .rightHalf .prompting .detDiv .triright {
	width: 0;
	height: 0;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-right: 10px solid #45404b;
	border-left: 10px solid transparent;
}
</style>