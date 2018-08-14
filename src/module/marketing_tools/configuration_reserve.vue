<template>
	<div id="configuration-reserve">
		<div class="re-title" style="position: relative;">
			<div class="t-text">
				<div class="pl"></div>
				是否预约点餐功能
			</div>
			<on-off :status="order.status==1" @statusChange="funGetOnOff"></on-off>
			<a href="javascript:void(0);" class="yellow head-save" v-if="order.status==0" @click="editSave">保存</a>
		</div>

		<div id="con-hide" v-if="order.status==1">

			<div class="re-content" v-cloak>
				<div class="way" style="height: 100px;">
					<div class="t-text required" style="width: 100px;">
						<div class="pl" style="width: 2px;"></div>
						支付方式:
					</div>
					<div class="pagWay" style="float:left">
						<span v-for="(item,index) in payWays" :key="index" @click="changeRadio(item,'pay')" :class="{'sign':order.payType==item.id}">{{item.name}}</span>
					</div>
					<div style="clear:both;"></div>
					<div class="way-con" v-if="order.payType==5">
						<input type="text" v-model="order.payAttr" :class="{'redi':order.red}" maxlength="2" style="width: 178px;" />
						<div class="wc-p">
							%
						</div>
					</div>
				</div>

				<div class="way">
					<div class="t-text" style="width: 100px;">
						<div class="pl" style="width: 2px;"></div>
						提醒:
					</div>
					<div class="al-con">
						<div class="al-l">
							<div class="ac-text">
								桌台提醒:
							</div>
							<div class="wc-list" style="margin-left:10px;margin-top:10px;display:inline-block;">
								<select-btn :sorts="timeWarn" :name="table.tableRemindTime" @selOn="getDeskTimeRemind"></select-btn>
							</div>
						</div>
						<div class="al-l">
							<div class="ac-text">
								微信提醒:
							</div>
							<div class="wc-list" style="margin-left:10px;float:left;margin-top:10px;display:inline-block;">
								<select-btn :sorts="timeWarn" :name="wei.wechatRemindTime" @selOn="getWeiTimeRemind"></select-btn>
							</div>
							<div class="ac-text" style="width: 120px;margin-left: 18px;">
								提醒顾客到店
							</div>
						</div>
					</div>
				</div>

				<div class="way">
					<div class="t-text" style="width: 100px;">
						<div class="pl" style="width: 2px;"></div>
						预约规则:
					</div>
					<div class="al-con">
						<div class="al-l">
							<div class="ac-text">
								是否允许取消订单:
							</div>
							<div class="way-con" style="margin-left: 10px;">
								<div class="pagWay" style="float:left">
									<span v-for="(item,index) in permit" :key="index" @click="changeRadio(item,'order')" :class="{'sign':cancel.show==item.id}">{{item.name}}</span>
								</div>
							</div>
						</div>

						<div class="al-l" style="height: auto;">


							<div class="ac-text" v-show="cancel.show==1">
								到店前取消规则:
							</div>

							<div class="ac-bordr" v-show="cancel.show==1">
								<template v-for="(item,index) in cancel.arr">
									<div class="ac-options" :key="index">
										<div class="ac-text" style="width: 80px;" v-if="index==0">
											提前
										</div>
										<div class="ac-text" style="width: 80px;" v-if="index!=0 && cancel.arr.length>1">
											{{cancel.arr[index-1].time}}分钟 --
										</div>

										<div class="way-con" style="margin-left: 10px;width: 92px;">
											<input type="text" maxlength="3" v-model="item.time" :class="{'redi':item.red}" style="width: 94px;height: 36px;" />
											<div class="wc-p">
												分钟内
											</div>
										</div>
										<div class="ac-text" style="width: 30px;">
											退
										</div>
										<div class="way-con" style="margin-left: 10px;width: 94px;">
											<input type="text" v-model="item.value" maxlength="3" :class="{'redi':item.red}" style="width: 84px;height: 36px;" />
											<div class="wc-p" style="right:16px;">
												%
											</div>
										</div>

										<div class="ac-icon ac-add" @click="funAddDelTag(false)" v-if="cancel.arr.length<2"></div>
										<div class="ac-icon ac-del" @click="funAddDelTag(true)" v-if="cancel.arr.length>1 && index!=0"></div>
									</div>
								</template>

								<div class="ac-bottom">
									<div class="ac-text" style="width: 102px;margin-top: 10px;margin-left: 80px;text-align: center;">
										{{cancel.arr[cancel.arr.length-1].time}}分钟外
									</div>
									<div class="ac-text" style="width: 30px;">
										退
									</div>
									<div class="way-con" style="margin-left: 10px;width: 94px;">
										<input type="text" style="width: 84px;height: 36px;" v-model="cancel.other" maxlength="3" />
										<div class="wc-p" style="right:16px;">
											%
										</div>
									</div>
								</div>
							</div>
						</div>



						<div class="al-l" style="margin-left: 0px;">
							<div class="ac-text">
								是否延长桌位预留:
							</div>
							<div class="way-con" style="margin-left: 10px;">
								<div class="pagWay" style="float:left">
									<span v-for="(item,index) in delays" :key="index" @click="changeRadio(item,'delay')" :class="{'sign':delay.show==item.id}">{{item.name}}</span>
								</div>
							</div>
							<template v-if="delay.show==1">
								<div class="ac-text" style="width: 50px;margin-left:-10px;">
									预留:
								</div>
								<div class="wc-list" style="margin-left:10px;margin-top:10px;display:inline-block;">
									<select-btn :sorts="reserveTime" :name="delay.isExtendSeat" @selOn="getReserve"></select-btn>
								</div>
							</template>
						</div>
						<div class="al-l" style="margin-left: 0px;">
							<div class="ac-text">
								超出预留时间是否允许退款:
							</div>
							<div class="way-con" style="margin-left: 1px;margin-top:0;">
								<div class="way-con" style="margin-left: 10px;">
									<div class="pagWay" style="float:left">
										<span v-for="(item,index) in permit" :key="index" @click="changeRadio(item,'refund')" :class="{'sign':returnBack.show==item.id}">{{item.name}}</span>
									</div>
								</div>
							</div>
							<template v-if="returnBack.show==1">
								<div class="ac-text" style="width: 50px;">
									过期退:
								</div>
								<div class="way-con" style="margin-left: 10px;">
									<input type="text" maxlength="2" :class="{'redi':returnBack.red}" v-model="returnBack.isReturn" style="width: 184px;" />
									<div class="wc-p">
										%
									</div>
								</div>
							</template>
						</div>
					</div>

				</div>
			</div>
			<a href="javascript:void(0);" class="yellow bottom-save" v-if="order.status==1" @click="editSave">保存</a>
		</div>
	</div>
</template>
<script>
	/*
	    "id": "2",
	    "shopId": "61",
	    "status": "1",                  //是否开启预约管理  1:开启
	    "isCancel": "",                 //是否允许取消订单  1:允许
	    "refund": "0",                //是否允许退款      1:允许
	    "payType": "5",                 //支付类型   payType=1全额支付 payType=5定金支付             
	    "payAttr": "11",                //定金支付
	    "isExtendSeat": "20",           //预留时间      0:不预留
	    "tableRemindTime": "-1",        //桌台提醒      -1:关闭提醒
	    "wechatRemindTime": "-1",       //微信提醒      -1:关闭提醒
	    "updateTime": "0",
	    "updateUid": "29"

	*/
	import storage from 'src/verdor/storage';
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	export default {
		data() {
			return {
				shopId: null,
				timeWarn: ['关闭提醒', '10分钟', '20分钟', '30分钟'],
				reserveTime: ['10分钟', '20分钟', '30分钟'],
				payWays: [
					{
						id: 5,
						name: '定金支付'
					}, 
					{
						id: 1,
						name: '全额支付'
					}
				], //支付方式
				delays: [
					{
						id: 0,
						name: '不延长'
					}, 
					{
						id: 1,
						name: '延长'
					}
				], //是否延长桌位预留
				permit: [
					{
						id: 0,
						name: '不允许'
					}, 
					{
						id: 1,
						name: '允许'
					}
				], //是否允许取消订单
				order: {
					status: '', //是否开启预约管理
					payType: 5, //支付类型
					payAttr: '', //定金支付百分比
					red: false
				},
				table: {
					tableRemindTime: '关闭提醒', //桌台提醒
					show: 0 //是否开启提醒
				},
				wei: {
					wechatRemindTime: '关闭提醒', //微信提醒
					show: 0
				},
				delay: {
					show: 0,
					isExtendSeat: '10分钟', //预留
					red: false
				},
				cancel: {
					show: 0,
					isCancel: '', //取消订单
					arr: [
						{
							time: '',
							value: '',
							red: false
						}
					],
					other: ''
				},
				returnBack: {
					show: 0,
					isReturn: '', //退款百分比
					red: false
				}
			};
		},
		methods: {
			//开关
			changeRadio(item, flag) {
				let id = item.id;
				switch (flag) {
					case 'pay':
						//支付方式
						this.order.payType = id;
						break;
					case 'order':
						//是否允许取消订单
						this.cancel.show = id;
						break;
					case 'delay':
						//是否延长预留
						this.delay.show = id;
						break;
					case 'refund':
						//是否允许退款
						this.returnBack.show = id;
						break;
				}
			},
			//是否预约点餐功能
			funGetOnOff(res) {
				this.order.status = res ? 1 : 0;
			},
			//添加取消时间段
			funAddDelTag(flag) {
				if (flag) {
					this.cancel.arr.pop();
				} else {
					this.cancel.arr.push({
						time: '',
						value: '',
						red: false
					});
				}
			},
			//获取桌台提醒时间
			getDeskTimeRemind(res) {
				this.table.tableRemindTime = this.timeWarn[res];
			},
			//获取微信提醒时间
			getWeiTimeRemind(res) {
				this.wei.wechatRemindTime = this.timeWarn[res];
			},
			//获取桌台预留时间
			getReserve(res) {
				this.delay.isExtendSeat = this.reserveTime[res];
			},
			//保存
			editSave() {
				if (this.order.status == 1)
					if (!this.checkData()) return;
				let obj = this.formatData();
				this.updateReserveConfig(obj).then(() => {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '保存成功!'
					});
				});
			},
			//获取提醒时间文字
			getRemind(flag) {
				let str = null;
				switch ('' + flag) {
					case '-1':
					case '0':
					case '':
						str = '关闭提醒';
						break;
					default:
						str = flag + '分钟';
				}
				return str;
			},
			//根据提醒文字获取时间
			formatRemind(flag) {
				let str = null;
				switch ('' + flag) {
					case '关闭提醒':
						str = '-1';
						break;
					default:
						str = flag.slice(0, -2);
				}
				return str;
			},

			checkData() {
				if (this.order.payType == 5) {
					if (!global.checkData(
						{
							payAttr: {
								reg: /^[1-9]\d{0,1}$/,
								pro: '请输入请输入正确的定金支付折扣率 1-99!'
							}
						},this.order)) {
						this.order.red = true;
						return false;
					}
					this.order.red = false;
				}
				if (this.cancel.show) {
					let flag = false;
					flag = this.cancel.arr.some((ele, index) => {
						let reg_time = /^[1-9]\d{0,2}$/;
						let reg_value = /^[1-9]\d{0,1}$/;
						let pro_time = '请输入1-3位的数字时间!';
						let pro_value = '请输入1-2位的数字百分比!';
						if (!reg_time.test(ele.time)) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: pro_time
							});
							ele.red = true;
							return true;
						}
						if (index == 0) {
							reg_value = /^((?!0)\d{1,2}|100)$/;
							pro_value = '请输入1-3位的数字百分比!';
						}

						if (!reg_value.test(ele.value)) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: pro_value
							});
							ele.red = true;
							return true;
						}
						ele.red = false;
					});
					if (flag) return false;
				}
				if (this.returnBack.show) {
					if (!global.checkData(
						{
							isReturn: {
								reg: /^[1-9]\d{0,1}$/,
								pro: '请输入请输入1-2位的整数订单折扣率!'
							}
						},this.returnBack)) {
						this.returnBack.red = true;
						return false;
					}
					this.returnBack.red = false;
				}

				return true;
			},
			formatData() {
				let obj = {};
				obj.shopId = this.shopId;
				if (this.order.status == 0) {
					obj.status = 0;
				} else {
					obj.status = 1;
					obj.payType = this.order.payType;
					obj.payAttr = this.order.payType == 5 ? this.order.payAttr : '';
					obj.tableRemindTime = this.formatRemind(this.table.tableRemindTime);
					obj.wechatRemindTime = this.formatRemind(this.wei.wechatRemindTime);
					if (this.cancel.show) {
						//0_100,10_80,60_10     0_100,10_10
						let temp = [];
						temp[0] = 0;
						let str = '';
						this.cancel.arr.forEach((ele) => {
							temp.push('_' + ele.value + ',');
							temp.push(ele.time);
						});
						temp.push('_' + this.cancel.other);
						str = temp.join('');
						obj.isCancel = str;
					} else {
						obj.isCancel = '';
					}
					obj.isExtendSeat = this.delay.show == 1 ? this.delay.isExtendSeat : 0;
					obj.isReturn = this.returnBack.show == 1 ? this.returnBack.isReturn : 0;
				}
				return obj;
			},
			//初始化数据
			initData() {
				let userData = storage.session('userShop');
				this.shopId = userData.currentShop.id;
			},
			async getReserveConfig() {
				let res = await http.getReserveConfig({
					data: {
						shopId: this.shopId
					}
				});
				return res;
			},
			async updateReserveConfig(obj) {
				let res = await http.updateReserveConfig({
					data: obj
				});
				return res;
			}
		},
		mounted() {
			this.initData();
			this.getReserveConfig().then(res => {
				this.order.status = res.status == 1 ? 1 : 0;
				this.order.payType = res.payType;
				this.order.payAttr = res.payType == 5 ? res.payAttr : '';
				if (this.order.payType == 0) this.order.payType = 1;
				this.cancel.show = !res.isCancel ? 0 : 1; //isCancel=0代表不允许
				if (this.cancel.show) {
					this.cancel.isCancel = res.isCancel;
					//0_100,10_80,60_10     0_100,10_10
					let arr = res.isCancel.split(',');
					if (arr.length > 1) {
						this.funAddDelTag(false);
					}
					let temp = [];
					arr.forEach(ele => {
						let str = ele.split('_');
						temp.push(...str);
					});
					this.cancel.other = temp.pop();
					temp.shift();
					temp.forEach((ele, index) => {
						let i = Math.floor(index / 2);
						index % 2 ?
							(this.cancel.arr[i].time = ele) :
							(this.cancel.arr[i].value = ele);
						this.cancel.arr[i].red = false;
					});
				}

				this.delay.show = res.isExtendSeat == 0 ? 0 : 1;
				if (this.delay.show) this.delay.isExtendSeat = res.isExtendSeat + '分钟';

				this.returnBack.show = res.isReturn == 0 ? 0 : 1;
				if (this.returnBack.show) this.returnBack.isReturn = res.isReturn;

				this.table.tableRemindTime = this.getRemind(res.tableRemindTime);
				this.wei.wechatRemindTime = this.getRemind(res.wechatRemindTime);
			});
		},
		components: {
			onOff: () =>
				import ( /*webpackChunkName:'on_off'*/ 'src/components/on_off'),
			radio: () =>
				import ( /*webpackChunkName:'radio'*/ 'src/components/radio_btn'),
			selectBtn: () =>
				import ( /*webpackChunkName:'select_btn'*/ 'src/components/select_btn')
		}
	};
</script>
<style lang='less' scoped>
	#configuration-reserve {
		padding-bottom: 88px;
		.head-save {
			width: 166px;
			position: absolute;
			top: 0;
			left: 300px;
			height: 40px;
			line-height: 40px;
		}
		.bottom-save {
			width: 200px;
			margin-left: 212px;
			margin-top: 40px;
		}
		.re-title {
			margin-top: 10px;
			width: 100%;
			height: 40px;
		}
		.t-text {
			width: 160px;
			float: left;
			text-indent: 10px;
			line-height: 40px;
			position: relative;
			.pl {
				width: 4px;
				height: 20px;
				background-color: #00bfff;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translate(0, -50%);
			}
		}
		.re-content {
			width: 100%;
			float: left;
			margin-left: 20px;
			.way {
				margin-top: 20px;
				float: left;
				width: 100%;
				.way-con {
					width: 174px;
					float: left;
					margin-left: 100px;
					margin-top: 10px;
					position: relative;
					input {
						width: 100px;
						height: 38px;
						line-height: 38px;
						padding: 0;
						outline-color: #29abe2;
						padding-left: 10px;
						position: relative;
					}
					.wc-p {
						position: absolute;
						right: 0;
						top: 50%;
						transform: translate(0, -50%);
					}
					.wc-sele {
						height: 40px;
						border: 1px solid #ecedf2;
						width: 186px;
						position: relative;
						cursor: pointer;
					}
					.wc-text {
						text-align: center;
						width: 146px;
						height: 38px;
						line-height: 38px;
						border-right: 1px solid #ecedf2;
					}
					.triangle {
						position: absolute;
						right: 14px;
						top: 56%;
						transform: translate(0, -50%);
						width: 0;
						height: 0;
						border-left: 5px solid transparent;
						border-right: 5px solid transparent;
						border-top: 10px solid #b3b3b3;
					}
					.wc-list {
						top: 40px;
						left: 0;
						z-index: 8888;
						position: absolute;
						div {
							height: 40px;
							border: 1px solid #ecedf2;
							width: 186px;
							text-align: center;
							line-height: 40px;
							border-top: none;
							background-color: #f1f1f1;
							z-index: 99;
							cursor: pointer;
						}
					}
				}
			}
		}
		.redi {
			border: 1px solid red !important;
		}
		.selectbtns {
			width: auto;
		}
		.al-con {
			height: 120px;
			margin-top: 40px;
			margin-left: 0px;
			.al-l {
				width: 100%;
				height: 60px;
				float: left;
				.icon {
					width: 30px;
					height: 30px;
					background: url(../../res/icon/alert.jpg) center center no-repeat;
					float: left;
					margin-left: 166px;
				}
				.c-text {
					float: left;
					margin-top: 10px;
					width: 46px;
					height: 42px;
					line-height: 42px;
					color: #f8931f;
					text-align: center;
					cursor: pointer;
				}
			}
			.ac-text {
				float: left;
				height: 40px;
				text-align: right;
				width: 180px;
				line-height: 40px;
				margin-top: 10px;
			}
		}
		.ac-bordr {
			width: 450px;
			border: 1px solid #9fa0a0;
			float: left;
			margin-left: 10px;
			padding-bottom: 60px;
			position: relative;
			cursor: pointer;
		}

		.ac-bottom {
			position: absolute;
			bottom: 10px;
			left: 0;
		}

		.ac-icon {
			width: 40px;
			height: 30px;
			float: left;
			margin-left: 20px;
			margin-top: 15px;
			text-align: center;
			line-height: 30px;
		}

		.ac-add {
			background: url(../../res/images/grayadd.png) center center no-repeat;
		}

		.ac-del {
			background: url(../../res/icon/delete.png) center center no-repeat;
		}

		.ac-options {
			width: 100%;
			float: left;
			height: 50px;
		}

		/* 单选按钮 */
		.pagWay {
			display: inline-block;
		}
		.pagWay span {
			width: auto;
			height: 40px;
			display: inline-block;
			padding: 0 15px;
			line-height: 40px;
			border: 1px solid #ccc;
			cursor: pointer;
			margin-right: 3px;
		}
	}

	/*
	#configuration-reserve .re-title {
		margin-top: 10px;
		width: 100%;
		height: 40px;
	}
	
	#configuration-reserve .t-text {
		width: 160px;
		float: left;
		text-indent: 10px;
		line-height: 40px;
		position: relative;
	}
	
	#configuration-reserve .t-text .pl {
		width: 4px;
		height: 20px;
		background-color: #00BFFF;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translate(0, -50%);
	}
	
	#configuration-reserve .re-content {
		width: 100%;
		float: left;
		margin-left: 20px;
	}
	
	#configuration-reserve .re-content .way {
		margin-top: 20px;
		float: left;
		width: 100%;
	}
	
	#configuration-reserve .re-content .way .way-con {
		width: 174px;
		float: left;
		margin-left: 100px;
		margin-top: 10px;
		position: relative;
	}
	
	#configuration-reserve .re-content .way .way-con input {
		width: 100px;
		height: 38px;
		line-height: 38px;
		padding: 0;
		outline-color: #29abe2;
		padding-left: 10px;
        position: relative;
        &{
            -webkit-appearance: none !important;
        }
	}
	
	#configuration-reserve .re-content .way .way-con input::-webkit-outer-spin-button,
	#configuration-reserve .re-content .way .way-con input::-webkit-inner-spin-button {
		-webkit-appearance: none !important;
	}
	
	#configuration-reserve .re-content .way .way-con .wc-p {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(0, -50%);
	}
	
	#configuration-reserve .re-content .way .way-con .wc-sele {
		height: 40px;
		border: 1px solid #ECEDF2;
		width: 186px;
		position: relative;
		cursor: pointer;
	}
	
	#configuration-reserve .re-content .way .way-con .wc-text {
		text-align: center;
		width: 146px;
		height: 38px;
		line-height: 38px;
		border-right: 1px solid #ECEDF2;
	}
	
	#configuration-reserve .re-content .way .way-con .triangle {
		position: absolute;
		right: 14px;
		top: 56%;
		transform: translate(0, -50%);
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 10px solid #b3b3b3;
	}
	
	#configuration-reserve .re-content .way .way-con .wc-list {
		top: 40px;
		left: 0;
		z-index: 8888;
		position: absolute;
	}
	
	#configuration-reserve .re-content .way .way-con .wc-list div {
		height: 40px;
		border: 1px solid #ECEDF2;
		width: 186px;
		text-align: center;
		line-height: 40px;
		border-top: none;
		background-color: #f1f1f1;
		z-index: 99;
		cursor: pointer;
	}
	
	#configuration-reserve .redi {
		border: 1px solid red!important;
	}
	
	#configuration-reserve .selectbtns {
		width: auto;
	}
	
	#con-hide {
        display: block;
    }
    

    

    .al-con {
        height: 120px;
        margin-top: 40px;
        margin-left: 0px;
    }
    
    .al-con .al-l {
        width: 100%;
        height: 60px;
        float: left;
    }
    
    .al-con .al-l .icon {
        width: 30px;
        height: 30px;
        background: url(../../res/icon/alert.jpg) center center no-repeat;
        float: left;
        margin-left: 166px;
    }
    
    .al-con .al-l .c-text {
        float: left;
        margin-top: 10px;
        width: 46px;
        height: 42px;
        line-height: 42px;
        color: #F8931F;
        text-align: center;
        cursor: pointer;
    }
    
    .al-con .ac-text {
        float: left;
        height: 40px;
        text-align: right;
        width: 180px;
        line-height: 40px;
        margin-top: 10px;
    }



    .ac-bordr {
        width: 450px;
        border: 1px solid #9FA0A0;
        float: left;
        margin-left: 10px;
        padding-bottom: 60px;
        position: relative;
        cursor: pointer;
    }
    
    .ac-bottom {
        position: absolute;
        bottom: 10px;
        left: 0;
    }
    
    .ac-icon {
        width: 40px;
        height: 30px;
        float: left;
        margin-left: 20px;
        margin-top: 15px;
        text-align: center;
        line-height: 30px;
    }
    
    .ac-add {
        background: url(../../res/images/grayadd.png) center center no-repeat;
    }
    
    .ac-del {
        background: url(../../res/icon/delete.png) center center no-repeat;
    }
    
    .ac-options {
        width: 100%;
        float: left;
        height: 50px;
    }
*/
</style>