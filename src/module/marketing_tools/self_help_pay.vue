<template>
	<Win :width='800' :height='520' @winEvent='winEvent'>
		<span slot='title'>{{title}}</span>
		<div slot='content' id="pay-window">
			<!-- 自定义名称 -->
			<div class="pay-window-box">
				<span class="fl pay-window-sub">自定义名称</span>
				<input type="text" class="fl" style="width: 215px;height: 36px;padding: 0;border-color: #999;" placeholder="请输入自定义名称" v-model="name" maxlength="4" />
				<div class="fl handle-tips">
					<i></i> 最多四个字
				</div>
			</div>
			<!-- 关联功能 -->
			<div class="pay-window-box">
				<span class="fl pay-window-sub required">关联功能</span>
				<template v-for="(item,index) in goodlist">
					<span :key='index' :class="type == index ? 'signa' : ''" style="float: left; display: block; width: 98px;height: 36px;border: 1px solid #999;margin-right: 15px;text-align: center;line-height:38px; cursor: pointer;background: #fff;" v-on:click="tabTypes(index)" v-if="item.type">{{item.name}}</span>
				</template>
			</div>
			<!-- 开启关联功能 -->
			<div class="pay-window-box" v-show="opentheFunction == true">
				<span class="fl pay-window-sub">开启功能</span>
				<span :class="payStatus == false?'off check-span' : 'on check-span'" v-on:click="ispayStatus"></span>
			</div>
			<!-- 外卖的支付方式 -->
			<!-- 起送费 -->
			<div class="pay-window-box" v-if="type == '1'">
				<span class="fl pay-window-sub required">起送费</span>
				<input type="text" id="sendingfee" maxlength="5" class="fl" style="width: 149px;height: 36px;padding: 0;border-color: #999;border-right: none;" placeholder="0" v-model="sendingfee" />
				<div style="border:1px solid #999;width: 69px;float: left;height: 36px;border-left: none;text-align: center;line-height: 36px;background-color: #fff;">元</div>
				<div class="fl handle-tips">
					<i></i> 满足费用才允许配送
				</div>
			</div>
			<!-- 配送范围 -->
			<div class="pay-window-box" v-if="type == '1'">
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
			<div class="pay-window-box" v-if="type == '1'">
				<span class="fl pay-window-sub required">预计到达</span>
				<input type="text" id="estimatedtime" maxlength="5" placeholder="0" class="fl" style="width: 149px;height: 36px;padding: 0;border-color: #999;border-right: none;" v-model="estimatedtime" />
				<div style="border:1px solid #999;width: 69px;float: left;height: 36px;border-left: none;text-align: center;line-height: 36px;background-color: #fff;">分钟</div>
			</div>
			<!-- 备餐时间 -->
			<div class="pay-window-box" v-if="type == '0'">
				<span class="fl pay-window-sub required">备餐时间</span>
				<input type="text" id="equipment" maxlength="5" class="fl" placeholder="0" style="width: 149px;height: 36px;padding: 0;border-color: #999;" v-model="equipment" />
				<div style="border:1px solid #999;width: 69px;float: left;height: 36px;border-left: none;text-align: center;line-height: 36px;">分钟</div>
			</div>
			<!-- 快递的支付方式 -->
			<!-- 快递费用 -->
			<div class="pay-window-box" v-if="type == '3'">
				<span class="fl pay-window-sub required">快递费用</span>
				<input type="text" id="shippingfee" maxlength="5" placeholder="0" class="fl" style="width: 149px;height: 36px;padding: 0;border-color: #999;border-right: none;" v-model="shippingfee" />
				<div style="border:1px solid #999;width: 69px;float: left;height: 36px;border-left: none;text-align: center;line-height: 36px;background-color: #fff;">元</div>
				<div class="fl handle-tips">
					<i></i> 无法使用积分抵扣
				</div>
			</div>
			<!-- 支付规则 -->
			<div class="pay-window-box" style="margin-bottom:0;">
				<span class="fl pay-window-sub">支付规则</span>
				<section class="fl" style="width: auto;height: auto;">
					<div style="height: 40px;padding: 0;position: relative;cursor: pointer;margin-bottom:25px;" v-if="configure.length <=4 ">
						<input type="text" placeholder="请输入规则" class="fl" style="width: 320px;height: 36px;padding: 0;border-color: #999;" v-model="content" maxlength="20" />
						<div class='bg' style="border:1px solid #999;width: 68px;float: left;height: 36px;border-left: none;" @click="saveConcont"></div>
						<div class="fl handle-tips">
							<i></i> 最多定义五条
						</div>
					</div>
					<div class="rlues" style="width: 320px;height: 36px;border: 1px solid #999;text-align: center;line-height: 36px;position: relative;background-color:#fff; margin-bottom: 25px;" v-for="(content,i) in configure" :key='i' v-if="configure.length >= 1">{{content}}
						<i @click="delConcont(i)"></i>
					</div>
				</section>
			</div>
			<!-- 可填写内容配置 -->
			<div class="pay-window-box">
				<span class="fl pay-window-sub">可填写内容配置</span>
				<!-- 根据关联功能的type值显示对应的内容配置 -->
				<span class="fl" v-if="type == '0'">
					<mulSelect :list.sync="configurationList" :selects.sync="configurationSelect" :name='"name"' :key='"id"'></mulSelect>
				</span>
				<span class="fl" v-if="type == '1'">
					<mulSelect :list.sync="takeoutList" :selects.sync="takeoutSelect" :name='"name"' :key='"id"'></mulSelect>
				</span>
				<span class="fl" v-if="type == '3'">
					<mulSelect :list.sync="courierList" :selects.sync="courierSelect" :name='"name"' :key='"id"'></mulSelect>
				</span>
			</div>
			<!-- 用餐人数 -->
			<div class="pay-window-box" v-if="type == '0'">
				<span class="fl pay-window-sub">用餐人数</span>
				<span :class="{'check-span':true,fl:true,off:personStatus == false,on:personStatus}" v-on:click="ispersonStatus"></span>
				<span class="fl" style="margin-left: 10px;">关闭后,默认用餐人数为1人</span>
			</div>
			<div class="pay-window-box" v-if="type == '0' && personStatus == true">
				<span class="fl pay-window-sub"></span>
				<span class="required fl" style="display: block;height: auto;min-height: 40px;line-height: 40px;color: #666666;margin-right: 25px;">上限人数</span>
				<input type="text" id="mealsNum" maxlength="5" class="fl" placeholder="0" style="width: 100px;height: 36px;padding: 0;border-color: #999;" v-model="mealsNum" />
				<div style="border:1px solid #999;width: 40px;float: left;height: 36px;border-left: none;text-align: center;line-height: 36px;">人</div>
			</div>
			<!-- 可配送区域 -->
			<div class="pay-window-box" v-if="type == '0'">
				<span class="fl pay-window-sub">可配送范围</span>
				<a href="javascript:void(0);" class="addclassify" v-on:click="isarea" v-show="area == false">添加关联区域</a>
				<a href="javascript:void(0);" class="related-area" v-on:click="isarea" v-show="area == true">关联区域</a>
				<span style="margin-left: 20px;" v-if="areaLength != '' && areaLength != 0 ">已选{{areaLength}}个区域</span>
			</div>
			<!-- 管理区域 -->
			<div class="regionalCorrelation" v-if="type == '0' && area">
				<div style="width: 100%;height: auto;padding-bottom: 20px;overflow: hidden;margin-bottom: 5px;">
					<a href="javascript:void(0)" class="check fl " style="margin-right: 40px;" @click="isCheckAll(true)">全选</a>
					<a href="javascript:void(0)" class="unselect fl" @click="isCheckAll()">全部取消</a>
				</div>
				<!-- 地址 -->
				<mulSelect :list.sync="areaList" :selects.sync="areaSelect" :styles="{backgroundColor:'rgb(240,240,240)','marginRight':'8px','marginBottom':'8px'}" :name='"areaName"' :key='"id"'></mulSelect>
			</div>
		</div>
	</Win>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	props: {
		opentheFunction: Boolean,
		upPayInfo: Object,
		isUpdata: String,
		title: String,
		i: [String, Number],
		wininfo: Object,
		item: Object
	},
	data() {
		return {
			id: '', // 功能id
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
			}]
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
		winEvent(str) {
			if (str == 'ok') {
				let reg = /^([1-9]|(1[0-9])|(2[0]))$/; //匹配1-20
				// 判断自定义名称是否为空 如果为空的话就就显示对应的关联功能的名字
				if (!this.name) {
					// 当输入框的为''时
					this.name = this.goodlist[this.type].name;
				}
				// 当在关联功能为自助时候
				if (this.type == '0') {
					if (document.getElementById('equipment').value == '') {
						// 当输入框的为''时
						this.$store.commit('setWin', {
							content: '请输入备餐时间',
							time: 1000
						});
						return false;
					} else if (isNaN(this.equipment)) {
						// 当输入框的值不为数字时
						this.$store.commit('setWin', {
							content: '请输入正确的数字',
							time: 1000
						});
						return false;
					} else if (this.equipment != '' && parseInt(this.equipment) != this.equipment) {
						// 当未添加关联区域时
						this.$store.commit('setWin', {
							content: '备餐时间不能为小数',
							time: 1000
						});
						return false;
					} else if (Number(this.equipment) < 0) {
						// 当未添加关联区域时
						this.$store.commit('setWin', {
							content: '备餐时间不能为负数',
							time: 1000
						});
						return false;
					}
					if (this.personStatus == true && utils.trim(this.mealsNum) == '') {
						this.$store.commit('setWin', {
							content: '用餐人数不能为空',
							time: 1000
						});
						return false;
					}
					if (this.personStatus == true && !reg.test(this.mealsNum)) {
						this.$store.commit('setWin', {
							content: '用餐人数为1-20的正整数',
							time: 1000
						});
						return false;
					}

				}
				if (this.type == '1') {
					// 起送费的判断
					if (document.getElementById('sendingfee').value == '') {
						// 当输入框的为''时
						this.$store.commit('setWin', {
							content: '请输入起送费',
							time: 1000
						});
						return false;
					} else if (isNaN(this.sendingfee)) {
						// 当输入框不为数字时
						this.$store.commit('setWin', {
							content: '请输入正确的数字',
							time: 1000
						});
						return false;
					} else if (this.sendingfee != '' && parseInt(this.sendingfee) != this.sendingfee) {
						this.$store.commit('setWin', {
							content: '起送费不能为小数',
							time: 1000
						});
						return false;
					} else if (Number(this.sendingfee) < 0) {
						this.$store.commit('setWin', {
							content: '起送费不能为负数',
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
					if (document.getElementById('estimatedtime').value == '') {
						// 当输入框的为''时
						this.$store.commit('setWin', {
							content: '请输入预计到达时间',
							time: 1000
						});
						return false;
					} else if (isNaN(this.estimatedtime)) {
						// 当输入框不为数字时
						this.$store.commit('setWin', {
							content: '请输入正确的数字',
							time: 1000
						});
						return false;
					} else if (this.estimatedtime != '' && parseInt(this.estimatedtime) != this.estimatedtime) {
						this.$store.commit('setWin', {
							content: '到达时间不能为小数',
							time: 1000
						});
						return false;
					} else if (Number(this.estimatedtime) < 0) {
						this.$store.commit('setWin', {
							content: '到达时间不能为负数',
							time: 1000
						});
						return false;
					}
				}
				if (this.type == '3') {
					// 配送费的判断
					if (document.getElementById('shippingfee').value == '') {
						// 当输入框的为''时
						this.$store.commit('setWin', {
							content: '请输入快递费',
							time: 1000
						});
						return false;
					} else if (isNaN(this.shippingfee)) {
						// 当输入框不为数字时
						this.$store.commit('setWin', {
							content: '请输入正确的数字',
							time: 1000
						});
						return false;
					} else if (this.shippingfee != '' && parseInt(this.shippingfee) != this.shippingfee) {
						this.$store.commit('setWin', {
							content: '快递费不能为小数',
							time: 1000
						});
						return false;
					} else if (Number(this.shippingfee) < 0) {
						this.$store.commit('setWin', {
							content: '快递费不能为负数',
							time: 1000
						});
						return false;
					}
				}
				// 结账功能的修改和保存
				// 首先通过传递的type值来判断执行修改还是保存 1 表示修改
				this.setItem();
				if (this.isUpdata == '1') {
					// 修改
					let bool = this.itemInArr(this.needInfo, this.wininfo.updatePay, 'id');
					if (!bool) {
						if (this.needInfo.id) {
							this.wininfo.updatePay.push(this.needInfo);
						} else {
							this.wininfo.addPay.splice(this.getIndex(this.item), 1, this.needInfo);
						}
					} else {
						this.wininfo.updatePay.splice(bool - 1, 1, this.needInfo);
					}
					this.wininfo.pay.splice(this.i, 1, this.needInfo);
				} else {
					// 新增
					this.wininfo.addPay.push(this.needInfo);
					this.wininfo.pay.push(this.needInfo);
				}

			}
			this.$emit('winEvent', str);
		},
		//获取点击对应的index
		getIndex: function(obj) {
			let arr = this.wininfo.addPay;
			for (let i = 0; i < arr.length; i++) {
				if (JSON.stringify(arr[i]) == JSON.stringify(obj)) {
					return i;
				}
			}
		},
		itemInArr: function(item, arr, type) { //遍历寻找 判断是新增还是修改
			let bol = false,
				index;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i][type] == item[type]) {
					bol = true;
					index = i + 1;
				}
			}
			if (bol) {
				return index;
			} else {
				return bol;
			}
		},
		ispayStatus: function() {
			this.payStatus = !this.payStatus;
			// 如果支付方式开启的时候 
			if (this.payStatus == true) {
				// 将状态标记为1
				this.payStatus = 1;
			} else {
				// 否则为0
				this.payStatus = 0;
			}
		},
		ispersonStatus: function() { //开启用餐人数的状态
			this.personStatus = !this.personStatus;
		},
		// 点击对应的功能  获取传递进来的参数
		getItemInfo: function(i, type) {
			let item = this.upPayInfo;
			// 获取传递数组参数
			if (type == '1') {
				this.id = item.id; //功能id
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
				// 可填写内容配置
				if (item.fillContent != undefined && item.fillContent != '') {
					let fillContent = String(item.fillContent);
					if (fillContent.length > 1) {
						for (let i = 0; i < fillContent.length; i++) {
							if (item.type - 1 == '0') {
								this.configurationSelect.push(fillContent[i]);
							} else if (item.type - 1 == '2') {
								this.inviteSelect.push(fillContent[i]);
							}
						}
					} else {
						if (item.type - 1 == '1') {
							this.takeoutSelect.push(fillContent);
						} else {
							this.courierSelect.push(fillContent);
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
			}
		},
		// 保存修改方法
		setItem: function() {
			// 修改信息
			let item = {};
			if (this.isUpdata) {
				item.id = this.id; //功能id
				item.status = Number(this.payStatus); //支付开启或关闭
			}
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

			item.readyMealTime = parseInt(this.equipment); // 备餐时间
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
			item.minFee = parseInt(this.sendingfee); // 起送费
			item.moveFee = parseInt(this.shippingfee); //配送费
			item.preArriveTime = parseInt(this.estimatedtime); //预计送达时间
			// 配送范围
			item.scopeDelivery = [];
			for (let it of this.distances) {
				item.scopeDelivery.push({
					'distance': it.distance,
					'cost': it.cost
				});
			}
			this.needInfo = item;
		},
		// 关联功能切换
		tabTypes: function(index) {
			this.type = index;
		},
		// 是否显示地址的
		isarea: function() {
			this.area = !this.area;
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
		}
	},
	components: {
		Win: () =>
			import ( /* webpackChunkName:'win' */ 'src/components/win'),
		mulSelect: () =>
			import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
	},
	mounted() {
		this.getArea();
		this.getItemInfo(this.i, this.isUpdata);
	}
};
</script>
<style scoped>
input {
	outline: none;
	text-indent: 20px;
	background: #fff;
}

.bg {
	background: url(../../res/icon/iconright.png) #fff center no-repeat;
}

#pay-window {
	background-color: #f7f7f7;
	width: 952px;
	height: 518px;
	padding: 30px 0;
	overflow: auto;
}

#pay-window .pay-window-box {
	height: auto;
	min-height: 40px;
	width: 100%;
	margin-bottom: 25px;
	overflow: hidden;
	clear: both;
	line-height: 40px;
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
	width: 145px;
	height: auto;
	min-height: 40px;
	line-height: 40px;
	color: #666666;
	text-align: right;
	margin-right: 25px;
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
	margin-left: 50px;
	padding: 15px 25px;
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
</style>