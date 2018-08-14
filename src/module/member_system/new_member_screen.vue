<!--
    **会员筛选
    *
    * miaochuan.sha
    * *
    *
-->
<template>
	<div id="screening">
		<!-- 客户基本信息 -->
		<div class="set-line">
			<div class="titles">客户基本信息</div>
			<div class="line"></div>
		</div>
		<div class="info clearfix">
			<mulSelect class='fl' :list.sync="goodsType" :selects.sync="goodsSelect" :styles="{width:'150px',backgroundColor:'#fff',marginRight:'8px'}" :name='"name"' :key='"id"'></mulSelect>
		</div>
		<!-- 客户消费情况 -->
		<div class="set-line">
			<div class="titles">客户消费情况</div>
			<div class="line"></div>
		</div>
		<div class="info clearfix">
			<mulSelect class='fl' :list.sync="consumption" :selects.sync="consumptionSelect" :styles="{width:'150px',backgroundColor:'#fff',marginRight:'8px'}" :name='"name"' :key='"id"'></mulSelect>
		</div>
		<!-- 客户消费情况 -->
		<div class="set-line">
			<div class="titles">客户消费情况</div>
			<div class="line"></div>
		</div>
		<div class="info clearfix" style="margin-bottom:100px;">
			<mulSelect class='fl' :list.sync="situation" :selects.sync="situationSelect" :styles="{width:'150px',backgroundColor:'#fff',marginRight:'8px'}" :name='"name"' :key='"id"'></mulSelect>
		</div>
		<template v-if='showChoose'>
			<!-- 筛选条件 -->
			<div class="set-line">
				<div class="titles">筛选条件</div>
				<div class="line"></div>
			</div>
			<!-- 客户基本信息 -->
			<div class="online-box clearfix" v-for="(item,index) in memberInfo" v-if="item.status">
				<span class="online-sub fl">{{item.name}}</span>
				<div class="rightHalf clearfix">
					<!-- 性别 -->
					<template v-if="item.id == 0">
						<radio-btn :list="customList" :styleObj="{'margin-right':'8px','width':'100px'}" :index="indexCustom" @selOn='radioSel' :name='"name"' class="custom"></radio-btn>
					</template>
					<!-- 年龄区间 -->
					<template v-if="item.id == 1">
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入年龄" maxlength="3" v-model="agestart" onkeyup="value=value.replace(/[^\d]/g,'')" />
							<span>岁</span>
						</section>
						<span class="fl hline">-</span>
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入年龄" maxlength="3" v-model="agend" onkeyup="value=value.replace(/[^\d]/g,'')" />
							<span>岁</span>
						</section>
					</template>
					<!-- 生日范围 -->
					<template v-if="item.id == 2">
						<div class="fl">
							<!--日期组件 开始时间-->
							<calendar-mouth ref='startCal' :pObj='startObj' :tips='tipstart.tips' @throwTime="getStartTime" class="fl"></calendar-mouth>
						</div>
						<span class="hline fl">-</span>
						<div class="fl">
							<!--日期组件 开始时间-->
							<calendar-mouth ref='endCal' :pObj='endObj' :tips='tipsend.tips' @throwTime="getEndTime" class="fl"></calendar-mouth>
						</div>
					</template>
					<!-- 手机号 -->
					<template v-if="item.id == 3">
						<input type="text" class="cumulative" placeholder="请输入手机号" maxlength="11" v-model="phone" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:211px;" />
					</template>
					<!-- 会员等级 -->
					<template v-if="item.id == 4">
						<mulSelect class='fl' :list.sync="levelist" :selects.sync="levelSelect" :styles="{minWidth:'100px',backgroundColor:'#fff',marginRight:'8px',marginBottom:'8px'}" :name='"name"' :key='"id"'></mulSelect>
					</template>
					<!-- 注册日期 -->
					<template v-if="item.id == 5">
						<div class="fl">
							<!--日期组件 开始时间-->
							<calendar :time="registerstartime" class="data-box" @emit="startTimeregisterChange" :format="'yyyy年MM月dd日'"></calendar>
						</div>
						<span class="hline fl">-</span>
						<div class="fl">
							<!--日期组件 开始时间-->
							<calendar :time="registerendtime" class="data-box" @emit="endTimeregisterChange" :format="'yyyy年MM月dd日'"></calendar>
						</div>
					</template>
				</div>
				<a href="javascript:void(0)" class="delet fl" @click="del(item,'1')"></a>
			</div>
			<!-- 2 -->
			<div class="online-box clearfix" v-for="(item,index) in memberSituation" v-if="item.status">
				<span class="online-sub fl">{{item.name}}</span>
				<div class="rightHalf clearfix">
					<!-- 总消费次数 -->
					<template v-if="item.id == 0">
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入次数" maxlength="6" v-model="consumptionStart" onkeyup="value=value.replace(/[^\d]/g,'')" />
							<span>次</span>
						</section>
						<span class="fl hline">-</span>
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入次数" maxlength="6" v-model="consumptionEnd" onkeyup="value=value.replace(/[^\d]/g,'')" />
							<span>次</span>
						</section>
					</template>
					<!-- 累积消费金额 -->
					<template v-if="item.id == 1">
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入金额" maxlength="6" v-model="amountStart" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="formatValue('1')" />
							<span>元</span>
						</section>
						<span class="fl hline">-</span>
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入金额" maxlength="6" v-model="amountEnd" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="formatValue('2')" />
							<span>元</span>
						</section>
					</template>
					<!-- 累计储值金额 -->
					<template v-if="item.id == 2">
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入金额" maxlength="8" v-model="storedStart" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="formatValue('3')" />
							<span>元</span>
						</section>
						<span class="fl hline">-</span>
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入金额" maxlength="8" v-model="storedEnd" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="formatValue('4')" />
							<span>元</span>
						</section>
					</template>
					<!-- 距今未消费天数 -->
					<template v-if="item.id == 3">
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入天数" maxlength="6" v-model="consumptionDays" onkeyup="value=value.replace(/[^\d]/g,'')" />
							<span>天</span>
						</section>
					</template>
				</div>
				<a href="javascript:void(0)" class="delet fl" @click="del(item,'2')"></a>
			</div>
			<!-- 3 -->
			<div class="online-box clearfix" v-for="(item,index) in memberSloution" v-if="item.status">
				<span class="online-sub fl">{{item.name}}</span>
				<div class="rightHalf clearfix">
					<!-- 累计送券数 -->
					<template v-if="item.id == 0">
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入张数" maxlength="6" v-model="sendStampStart" onkeyup="value=value.replace(/[^\d]/g,'')" />
							<span>张</span>
						</section>
						<span class="fl hline">-</span>
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入张数" maxlength="6" v-model="sendStampEnd" onkeyup="value=value.replace(/[^\d]/g,'')" />
							<span>张</span>
						</section>
					</template>
					<!-- 累计销券数 -->
					<template v-if="item.id == 1">
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入张数" maxlength="6" v-model="pinstampStart" onkeyup="value=value.replace(/[^\d]/g,'')" />
							<span>张</span>
						</section>
						<span class="fl hline">-</span>
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入张数" maxlength="6" v-model="pinstampEnd" onkeyup="value=value.replace(/[^\d]/g,'')" />
							<span>张</span>
						</section>
					</template>
					<!-- 可用券数 -->
					<template v-if="item.id == 2">
						<input type="text" class="cumulative" placeholder="请输入名称" maxlength="20" v-model="availableName" style="width:211px;" />
					</template>
					<!-- 已用券名称 -->
					<template v-if="item.id == 3">
						<input type="text" class="cumulative" placeholder="请输入名称" maxlength="20" v-model="haveusedName" style="width:211px;" />
					</template>
					<!-- 可用券张数 -->
					<template v-if="item.id == 4">
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入张数" maxlength="6" v-model="availableStart" onkeyup="value=value.replace(/[^\d]/g,'')" />
							<span>张</span>
						</section>
						<span class="fl hline">-</span>
						<section class="fl">
							<input type="text" class="cumulative" placeholder="请输入张数" maxlength="6" v-model="availableEnd" onkeyup="value=value.replace(/[^\d]/g,'')" />
							<span>张</span>
						</section>
					</template>
				</div>
				<a href="javascript:void(0)" class="delet fl" @click="del(item,'3')"></a>
			</div>
			<!-- 筛选 -->
			<div class="online-box clearfix">
				<span class="online-sub fl"></span>
				<a href="javascript:void(0);" class="blue fl" style="width: 100px;margin-right:10px;height:41px" @click="opengResult">筛选</a>
				<a href="javascript:void(0);" class="gray fl" style="width: 100px;height:41px;" @click='returnStore'>收起</a>
			</div>
		</template>
	</div>
</template>
<script>
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
export default {
	data() {
		return {
			tipstart: {},
			tipsend: {},
			goodsType: [{
				'name': '生日范围',
				'id': 2
			},{
				name: '注册日期',
				'id': 5
			}], //基本信息
			goodsSelect: [], //基本信息选中的
			consumption: [{
				'name': '总消费次数',
				'id': 0
			}, {
				'name': '累积消费金额',
				'id': 1
			}, {
				'name': '累积储值金额',
				'id': 2
			}, {
				'name': '距今未消费天数',
				'id': 3
			}], //固定支付方式
			consumptionSelect: [], //客户消费情况
			situation: [{
				'name': '累积送券数',
				'id': 0
			}, {
				'name': '累积销券数',
				'id': 1
			}, {
				'name': '可用券名称',
				'id': 2
			}, {
				'name': '已用券名称',
				'id': 3
			}, {
				'name': '可用券张数',
				'id': 4
			}], //固定支付方式
			situationSelect: [], //固定支付方式选中
			memberInfo: [{
				name: '生日范围',
				id: 2
			},{
				name: '注册日期',
				'id': 5
			}],
			indexCustom: 0, //性别选中的
			customList: [{
				'name': '未知'
			},
			{
				'name': '男'
			},
			{
				'name': '女'
			},
			],
			startObj: {
				time: utils.getTime({
					time: new Date()
				}).start,
				show: 1,
				detail: 1
			},
			endObj: {
				time: new Date().getTime(),
				show: 1,
				detail: 1
			},
			levelist: [],
			levelSelect: [], //等级
			memberSituation: [{
				name: '总消费次数',
				id: 0
			}, {
				name: '累积消费金额',
				id: 1
			}, {
				name: '累计储值金额',
				id: 2
			}, {
				name: '距今未消费天数',
				id: 3
			}],
			memberSloution: [{
				name: '累积送券数',
				id: 0
			}, {
				name: '累积消券数',
				id: 1
			}, {
				name: '可用券名称',
				id: 2
			}, {
				name: '已用券名称',
				id: 3
			}, {
				name: '可用券张数',
				id: 4
			}],
			showWin: false, //结果弹窗
			agestart: '', //开始年龄
			agend: '', //结束年龄
			phone: '', //手机号码
			registerstartime: new Date().setHours(0, 0, 0, 0), //注册的开始时间
			registerendtime: new Date().setHours(23, 59, 59, 999), //注册的结束时间
			consumptionStart: '', //总消费次数开始
			consumptionEnd: '', //总消费次数结束
			amountStart: '', //消费金额开始
			amountEnd: '', //消费金额结束
			storedStart: '', //储值金额开始
			storedEnd: '', //储值金额结束
			consumptionDays: '', //消费天数
			sendStampStart: '', //送券数开始
			sendStampEnd: '', //送券结束
			pinstampStart: '', //销券数开始
			pinstampEnd: '', //销券数结束
			haveusedName: '', //已用券名称
			availableName: '', //可用券民称
			availableStart: '', //可用券张数开始
			availableEnd: '', //可用券结束
			chooseData: {},
			showChoose: false
		};
	},
	methods: {
		returnStore: function() {
			this.$emit('selectVip', '');
		},
		radioSel(index) {
			this.indexCustom = index;
		},
		getStartTime(str) { //生日范围的开始时间
			this.startObj.time = str;
			this.tipstart = this.formatDate(this.startObj.time);
		},
		getEndTime(str) { //生日范围的结束时间
			this.endObj.time = str;
			this.tipsend = this.formatDate(this.endObj.time);
		},
		startTimeChange(time) { //开始时间
			this.startTime = time;
		},
		endTimeChange(time) { //结束时间
			this.endTime = new Date(time).setHours(23, 59, 59, 999);
		},
		startTimeregisterChange(time) { //开始时间
			this.registerstartime = time;
		},
		endTimeregisterChange(time) { //结束时间
			this.registerendtime = new Date(time).setHours(23, 59, 59, 999);
		},
		async getMemberList() {
			// 获取所有会员等级
			let data = await http.memberGetList({});
			this.levelist = utils.deepCopy(data);
		},
		opengResult: function(type) {
			if (!this.checkForm(type)) return;
			let obj = {
				status: 'ok',
				chooseData: this.chooseData
			};
			this.$emit('selectVip', obj);
		},
		del: function(item, type) {
			let select = [];
			switch (type) {
				case '1':
					select = this.goodsSelect;
					break;
				case '2':
					select = this.consumptionSelect;
					break;
				case '3':
					select = this.situationSelect;
					break;
			}
			for (let i = 0; i < select.length; i++) {
				if (select[i] == item.id) {
					select.splice(i, 1);
					break;
				}
			}
		},
		valiData(content, title, winType) {
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		checkForm: function(type) {
			// let chooseData = {
			// 	gender: '', //性别
			// 	age: { //年龄区间
			// 		start: '',
			// 		age: '',
			// 	},
			// 	birthday: { //生日范围
			// 		start: '',
			// 		end: ''
			// 	},
			// 	mobile: '', //手机号包含
			// 	level: '', //会员等级
			// 	createTime: { //注册日期
			// 		start: '',
			// 		end: ''
			// 	},
			// 	totalConsumeNum: { //总消费次数
			// 		start: '',
			// 		end: ''
			// 	},
			// 	totalConsume: { //累积消费金额
			// 		start: '',
			// 		end: ''
			// 	},
			// 	totalCharge: { //累计储值金额
			// 		start: '',
			// 		end: ''
			// 	},
			// 	notConsumeDays: '', //距今未消费天数
			// 	totalCouponNum: { //累计送券数
			// 		start: '',
			// 		end: ''
			// 	},
			// 	usedCouponNum: { //累计销券数
			// 		start: '',
			// 		end: ''
			// 	},
			// 	couponName: '', //可用券名称
			// 	usedCouponName: '', //已用券名称
			// 	couponNum: { //可用券数量
			// 		start: '',
			// 		end: ''
			// 	},
			// 	time: '' //时间戳
			// };
			this.chooseData = {};
			if (type == '1') {
				this.chooseData.time = parseInt((new Date().getTime()) / 1000);
			}
			for (let item of this.memberInfo) {
				if (item.id == 0 && item.status) { //性别选择
					this.chooseData.gender = this.indexCustom;
				}
				//年龄区间判断
				if (item.id == 1 && item.status) {
					if (this.agestart == '' || this.agend == '') {
						this.valiData('请完善年龄区间信息!');
						return false;
					}
					let obj = {
						start: this.agestart,
						end: this.agend
					};
					this.chooseData.age = obj;
				}
				//生日范围区间判断
				if (item.id == 2 && item.status) {
					if (this.startObj.time - this.endObj.time > 0) {
						this.valiData('生日范围时间选择错误！');
						return false;
					}
					let obj = {
						start: this.tipstart.tipsValue,
						end: this.tipsend.tipsValue
					};
					this.chooseData.birthday = obj;
				}
				//手机号码的判断
				if (item.id == 3 && item.status) {
					if (this.phone == '') {
						this.valiData('请填写手机号码');
						return false;
					}
					this.chooseData.mobile = this.phone;
				}
				//会员等级的判断
				if (item.id == 4 && item.status) {
					if (this.levelSelect.length <= 0) {
						this.valiData('请选择会员等级！');
						return false;
					}
					this.chooseData.level = this.levelSelect.join(',');
				}
				//注册日期
				if (item.id == 5 && item.status) {
					if (this.registerstartime - this.registerendtime > 0) {
						this.valiData('注册时间选择错误！');
						return false;
					}
					let obj = {
						start: parseInt(this.registerstartime / 1000),
						end: parseInt(this.registerendtime / 1000)
					};
					this.chooseData.createTime = obj;
				}
			}
			for (let item of this.memberSituation) {
				if (item.status) {
					//总消费次数的判断
					if (item.id == 0) {
						if (this.consumptionStart == '' || this.consumptionEnd == '') {
							this.valiData('请完善总消费次数信息！');
							return false;
						}
						let obj = {
							start: this.consumptionStart,
							end: this.consumptionEnd
						};
						this.chooseData.totalConsumeNum = obj;
					}
					if (item.id == 1) { //累计消费金额
						if (this.amountStart == '' || this.amountEnd == '') {
							this.valiData('请完善消费金额信息！');
							return false;
						}
						let obj = {
							start: this.amountStart,
							end: this.amountEnd
						};
						this.chooseData.totalConsume = obj;
					}
					//储值金额信息判断
					if (item.id == 2) {
						if (this.storedStart == '' || this.storedEnd == '') {
							this.valiData('请完善储值金额信息！');
							return false;
						}
						let obj = {
							start: this.storedStart,
							end: this.storedEnd
						};
						this.chooseData.totalCharge = obj;
					}
					//消费天数判断
					if (item.id == 3) {
						if (this.consumptionDays == '') {
							this.valiData('请完善消费天数！');
							return false;
						}
						this.chooseData.notConsumeDays = this.consumptionDays;
					}
				}
			}
			for (let item of this.memberSloution) {
				if (item.status) {
					//送券数
					if (item.id == 0) {
						if (this.sendStampStart == '' || this.sendStampEnd == '') {
							this.valiData('请完善累积送券数！');
							return false;
						}
						let obj = {
							start: this.sendStampStart,
							end: this.sendStampEnd
						};
						this.chooseData.totalCouponNum = obj;
					}
					//销券数
					if (item.id == 1) {
						if (this.pinstampStart == '' || this.pinstampEnd == '') {
							this.valiData('请完善累积销券数！');
							return false;
						}
						let obj = {
							start: this.pinstampStart,
							end: this.pinstampEnd
						};
						this.chooseData.usedCouponNum = obj;
					}
					//已用券名称
					if (item.id == 2) {
						if (this.availableName == '') {
							this.valiData('请输入可用券名称！');
							return false;
						}
						this.chooseData.couponName = this.availableName;
					}
					//已用券名称
					if (item.id == 3) {
						if (this.haveusedName == '') {
							this.valiData('请输入已用券名称！');
							return false;
						}
						this.chooseData.usedCouponName = this.haveusedName;
					}
					//可用券张数
					if (item.id == 4) {
						if (this.availableStart == '' || this.availableEnd == '') {
							this.valiData('请完善可用券张数');
							return false;
						}
						let obj = {
							start: this.availableStart,
							end: this.availableEnd
						};
						this.chooseData.couponNum = obj;
					}
				}
			}
			return true;
		},
		formatValue: function(type) {
			switch (type) {
				case '1':
					this.amountStart = utils.toFloatStr(this.amountStart, 2);
					break;
				case '2':
					this.amountEnd = utils.toFloatStr(this.amountEnd, 2);
					break;
				case '3':
					this.storedStart = utils.toFloatStr(this.storedStart, 2);
					break;
				case '4':
					this.storedEnd = utils.toFloatStr(this.storedEnd, 2);
					break;
			}
		},
		changeFormat: function(t) {
			t -= 0;
			if (t < 10) {
				return '0' + t;
			} else {
				return t + '';
			}
		},
		formatDate: function(time) {
			let newDate = new Date(time);
			let m = newDate.getMonth() + 1; //月
			let d = newDate.getDate(); //日
			let obj = {
				tips: this.changeFormat(m) + '月' + this.changeFormat(d) + '日', //格式化的时间
				tipsValue: this.changeFormat(m) + '' + this.changeFormat(d) //传递后端的值
			};
			return obj;
		},
		chooseChange: function() {
			if (this.goodsSelect.length == 0 && this.consumptionSelect.length == 0 && this.situationSelect.length == 0) {
				this.showChoose = false;
			} else {
				this.showChoose = true;
			}
		}
	},
	created() {
		let obj = {
			status: false
		};
		for (let item of this.memberInfo) {
			Object.assign(item, obj);
		}
		for (let item of this.memberSituation) {
			Object.assign(item, obj);
		}
		for (let item of this.memberSloution) {
			Object.assign(item, obj);
		}
	},
	components: {
		mulSelect: () =>
			import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
		'radioBtn': () =>
			import ( /* webpackChunkName:'radio_btn' */ 'src/components/radio_btn'),
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
		'calendar-mouth': () =>
			import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result')
	},
	watch: {
		goodsSelect: function() {
			this.chooseChange();
			let select = this.goodsSelect.join(',');
			for (let int of this.memberInfo) {
				if (select.indexOf(int.id) != -1) {
					int.status = true;
				} else {
					int.status = false;
				}
			}
		},
		consumptionSelect: function() {
			this.chooseChange();
			let select = this.consumptionSelect.join(',');
			for (let int of this.memberSituation) {
				if (select.indexOf(int.id) != -1) {
					int.status = true;
				} else {
					int.status = false;
				}
			}
		},
		situationSelect: function() {
			this.chooseChange();
			let select = this.situationSelect.join(',');
			for (let int of this.memberSloution) {
				if (select.indexOf(int.id) != -1) {
					int.status = true;
				} else {
					int.status = false;
				}
			}
		},
	},
	mounted() {
		this.tipstart = this.formatDate(this.startObj.time);
		this.tipsend = this.formatDate(this.endObj.time);
	}
};
</script>
<style type="text/css" scoped>
#screening .info {
	padding-left: 15px;
}

#screening .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0;
	position: relative;
}

#screening .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

#screening .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#screening .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#screening .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 120px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#screening .online-box .rightHalf {
	max-width: 600px;
	height: auto;
	float: left;
	margin-right: 12px;
}

#screening .online-box .delet {
	display: block;
	width: 16px;
	height: 19px;
	background: url(../../../src/res/icon/icondelete.png) no-repeat center;
	margin: 10px 25px 10px 0;
}

#screening .online-box .rightHalf .hline {
	display: block;
	height: 38px;
	line-height: 38px;
	margin: 0 10px;
}

#screening .online-box .rightHalf section {
	height: 38px;
	border: 1px solid #CECDCD;
	float: left;
}

#screening .online-box .rightHalf .cumulative {
	width: 100px;
	height: 36px;
	border: 1px solid #eaeaea;
	float: left;
	outline: none;
	text-indent: 17px;
}

#screening .online-box .rightHalf section span {
	display: block;
	float: left;
	width: 37px;
	height: 37px;
	font-size: 16px;
	text-align: center;
	line-height: 38px;
	border-left: 1px solid #CECDCD;
}
</style>