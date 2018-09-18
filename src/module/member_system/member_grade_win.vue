<template>
	<div>
		<win :width="550" :height="571" :align="'right'" @winEvent="closeWin" :ok="{content: '保存'}" :cancel="cancel">
			<span>{{title}}</span>
			<div class="member-win" slot="content">
				<div class="win-Title">
					<span class="fl required">等级名称</span>
					<input type="text" placeholder="请输入等级" v-model="gradeName" class="fl" maxlength="20" style="width: 380px;" />
				</div>
				<div class="win-concent">
					<!-- 享有折扣 -->
					<div class="win-box">
						<span class="fl">享有折扣</span>
						<div class="fl win-toggle">
							<on-off @statusChange="(val)=> isDiscount = val" :status="isDiscount"></on-off>
						</div>
						<span class="fl" v-if="isDiscount == true">折扣率</span>
						<input type="text" placeholder="请输入折扣率" v-model="discounts" v-if="isDiscount == true" maxlength="3" class="fl" />
					</div>
					<!-- 积分翻倍 -->
					<div class="win-box">
						<span class="fl">积分翻倍</span>
						<div class="fl win-toggle">
							<on-off @statusChange="doubleIntegral" :status="integral"></on-off>
						</div>
						<section v-if="integral == true">
							<span class="fl">积分获取</span>
							<singleSelect :index='result' @selOn='haveIndex' :styles="{border: '1px solid #cecdcd',marginRight: '8px'}" :list="list" :name="'name'" :key='"id"'></singleSelect>
						</section>
					</div>
					<!-- 设置该等级比例 -->
					<div class="win-box" v-if="integral == true && result == 0">
						<span class="fl proportion">设置该等级积分比例</span>
						<input type="text" placeholder="请输入现金" v-model="cashs" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="6" class="fl" />
						<i class="fl colon">:</i>
						<input type="text" placeholder="请输入积分" v-model="points" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="8" class="fl" />
					</div>
					<!-- 获得基础积分 -->
					<div class="win-box" v-if="integral == true && result == 1">
						<span class="fl">获得基础积分</span>
						<section class="sinp">
							<input type="text" class="cumulative" placeholder="请输入倍数" maxlength="6" v-model="multiples" @blur="formatValue('4')" />
							<span>倍</span>
						</section>
						<div class="fl handle-tips">
							<i></i> 允许输入区间：0.01~99.99
						</div>
					</div>
					<div class="win-box">
						<span class="fl">免服务费</span>
						<div class="win-toggle fl">
							<on-off @statusChange="(val)=> isService = val" :status="isService"></on-off>
						</div>
					</div>
					<div class="win-box" v-if="memberInfo && memberInfo.status == '2'">
						<span class="fl">享有会员价</span>
						<div class="win-toggle fl">
							<on-off @statusChange="(val)=> memberPrice = val" :status="memberPrice"></on-off>
						</div>
					</div>
					<div class="win-box" v-if="memberInfo && memberInfo.status != '2'">
						<span class="fl">升级规则</span>
						<div class="win-toggle fl">
							<on-off @statusChange="(val)=> isNext = val" :status="isNext"></on-off>
						</div>
						<span class="fl" v-if="isNext == true">升级金额</span>
						<input type="text" @blur="formatValue('1')" placeholder="请输入充值累计金额" v-model="totalCharges" v-if="isNext == true" maxlength="8" class="fl" />
					</div>
					<div class="win-box" v-if="isNext == true">
						<span class="fl">升级后等级</span>
						<span class="fl" style="width: 400px;background-color: #fff;border: 1px solid #ccc;color: #666;cursor: pointer;" @click="openGrade" v-if="gradeCName == ''">选择会员等级</span>
						<span class="fl" style="width: 270px;background-color: #fff;border: 1px solid #ccc;color: #666;cursor: pointer;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" @click="openGrade" v-else>{{gradeCName}}</span>
						<span class="fl" style="width: 110px;background-color: #fff;border: 1px solid #ccc;color: #666;cursor: pointer;margin-left: 20px;" v-if="gradeCName !=''" @click="clean">清除等级关联</span>
					</div>
					<!-- 规则 -->
					<div class="interests">
						<span class="fl">会员权益</span>
						<section class="fl" style="width: auto;height: auto;">
							<div style="height: 40px;padding: 0;position: relative;cursor: pointer;margin-bottom:10px;" v-if="configure.length <=9 ">
								<input type="text" placeholder="请输入规则,限30字" class="fl" style="width: 220px;height: 36px;padding: 0;border: 1px solid #999; text-indent: 10px;margin-top: 2px;" v-model="content" maxlength="30" />
								<div class='bg' style="border:1px solid #999;width: 68px;float: left;height: 36px;border-left: none;margin-right:10px;margin-top: 2px;" @click="saveConcont"></div>
								<span>最多定义10条</span>
							</div>
							<div class="rlues" style="width: 320px;min-height: 36px;border: 1px solid #999;text-align: center;line-height: 36px;position: relative;background-color:#fff; margin-bottom: 25px;" v-for="(content,i) in configure" :key='i' v-if="configure.length >= 1">{{content}}
								<i @click="delConcont(i)"></i>
							</div>
						</section>
					</div>
					<div class="win-box" style="height: 200px;border-bottom: none;">
						<span class="fl required">设置图片</span>
						<span class="fl" style="width: 110px;background-color: #fff;border: 1px solid #ccc;color: #666;cursor: pointer;position: relative;" id="image">
							提交图片
							<form enctype="multipart/form-data" id="comForm">
								<input @change="fileNameChange" type="file" id="file_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image"
								style="position:absolute;bottom: 0;height: 40px;width: 90px;opacity: 0;cursor: pointer;left: 0;" />
							</form>
						</span>
						<span class="fl" style="width: 250px;color: #666;">图片大小请小于1M(750 x 400最佳)</span>
						<div class="win-imgShow" v-if="fileName">
							<img id="imgs" :src="imgHost+fileName">
						</div>
						<div class="win-imgShow" v-else>
							<img id="imgs">
						</div>
					</div>
				</div>
			</div>
		</win>
		<win v-if="gradeWin" :width="565" :height="300" :align="'center'" @winEvent="chooseGrand" :ok="{content: '保存'}">
			<span slot="title">选择等级</span>
			<div slot="content" style="padding: 20px;">
				<mul-select @selOn="index=arguments[0]" :isradio="true" :list="gradeLists" :selects="index" :name='"name"' :keys='"asdaisdj"' :styles="{backgroundColor: 'rgb(236,236,236)',marginRight: '8px',marginBottom:'8px'}"></mul-select>
			</div>
		</win>
	</div>
</template>
<script>
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
export default {
	data() {
		return {
			gradeName: '', // 会员等级名称
			discount: '', // 折扣
			totalCharge: '', // 升级金额
			isDiscount: false, // 是否开启折扣
			isService: false, //是否开启免服务费
			isNext: false, //下个等级
			memberPrice: false, //粉丝卡 默认享有会员价
			gradeIndex: null, //等级index
			gradeCName: '', //选择的等级名称
			gradeId: null, //等级id
			levelStatus: '', //默认等级状态 1 基础卡 2 粉丝卡
			isDefault: false,
			isDefaultVip: false,
			fileName: this.wfileName,
			imgHosts: this.imgHost,
			gradeWin: false, // 是否显示等级弹框
			index: [-1],
			gradeLists: [],
			ischain: '',
			content: '', // 规则内容
			configure: [], // 支付规则
			integral: false,
			result: 0, //积分获取选中的
			list: [{
				name: '按比例',
				id: 0
			},
			{
				name: '按积分规则',
				id: 1
			}
			],
			cash: '', //积分比例现金
			point: '', //积分比例积分
			multiple: '', //倍数
		};
	},
	props: {
		addEidteWin: {
			type: Boolean,
			default: false
		},
		gid: null,
		memberInfo: null,
		gradeList: null,
		imgHost: {
			type: String,
			default: ''
		},
		wfileName: null,
		type: null,
		title: String,
		brandId: null
	},
	computed: {
		cancel() {
			if (this.type === 'edit') {
				return {
					content: '删除',
					style: {
						background: '#c33'
					}
				};
			} else {
				return {
					content: '取消'
				};
			}
		},
		totalCharges: {
			get() {
				return this.totalCharge;
			},
			set(newValue) {
				this.totalCharge = newValue.replace(/[^\d]/g, '');
			}
		},
		discounts: {
			get() {
				return this.discount;
			},
			set(newValue) {
				this.discount = newValue.replace(/[^\d]/g, '');
			}
		},
		cashs: {
			get() {
				return this.cash;
			},
			set(newValue) {
				this.cash = newValue.replace(/[^\d]/g, '');
			}
		},
		points: {
			get() {
				return this.point;
			},
			set(newValue) {
				this.point = newValue.replace(/[^\d]/g, '');
			}
		},
		multiples: {
			get() {
				return this.multiple;
			},
			set(newValue) {
				this.multiple = newValue.replace(/[^\d]/g, '');
			}
		}
	},
	methods: {
		formatValue(type) {
			switch (type) {
				case '1':
					this.totalCharge = utils.toFloatStr(this.totalCharge, 2);
					break;
				case '4':
					this.multiple = utils.toFloatStr(this.multiple, 2);
					break;
				default:
					// statements_def
					break;
			}
		},
		chooseGrand(str) {
			//  选择会员等级
			if (str == 'ok') {
				this.gradeIndex = this.index;
				this.gradeCName = this.gradeLists[this.index].name;
				this.gradeId = this.gradeLists[this.index].id;
				if (this.gradeId == this.gid) {
					this.$store.commit('setWin', {
						content: '不能选择自身等级！',
						winType: 'alert',
						title: '提示信息'
					});
					this.gradeCName = '';
					this.gradeId = 0;
					return false;
				}
				this.gradeWin = false;
			} else {
				this.gradeWin = false;
			}
		},
		validata(content, winType = 'alert', title = '提示信息') {
			// 验证
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		closeWin(str) {
			// 修改或删除会员等级
			if (str == 'ok') {
				if (this.gradeName == '' || this.gradeName.length <= 0) {
					this.validata('请输入等级名称！');
					return false;
				}
				if (this.isDiscount == true && this.discount.length <= 0) {
					this.validata('请输入折扣率！');
					return false;
				}
				if (Number(this.discount) > 100) {
					this.validata('折扣率不能大于100！');
					return false;
				}
				if (this.integral && this.result == 0) {
					if (this.cash.length <= 0) {
						this.validata('请输入等级积分比例现金!');
						return false;
					}
					if (Number(this.cash) <= 0) {
						this.validata('等级积分比例现金应大于0');
						return false;
					}
					if (this.point.length <= 0) {
						this.validata('请输入等级积分比例积分!');
						return false;
					}
					if (Number(this.point) <= 0) {
						this.validata('等级积分比例积分应大于0');
						return false;
					}
				}
				if (this.integral && this.result == 1) {
					if (this.multiple.length <= 0) {
						this.validata('请输入积分倍数!');
						return false;
					}
					if (Number(this.multiple) <= 0 || Number(this.multiple) > 99.99) {
						this.validata('积分倍数输入区间0.01~99.99!');
						return false;
					}
				}
				if (this.isNext == true && this.totalCharge.length <= 0) {
					this.validata('请输入升级金额！');
					return false;
				}
				if (!this.fileName) {
					this.validata('请上传图片');
					return false;
				}
				if (this.isDefault == true) {
					for (let i = 0; i < this.gradeList.length; i++) {
						if (this.gradeList[i].id != this.gid) {
							if (this.gradeList[i].status == this.levelStatus) {
								this.validata('已有默认等级,不能再次设置！');
								return false;
							}
						}
					}
				}
				// 关联默认等级提示
				for (let i = 0; i < this.gradeList.length; i++) {
					if (this.gradeList[i].status == '1') {
						if (this.gradeList[i].id == this.gradeId) {
							this.validata('您关联的为默认等级,该等级不会生效');
						}
					}
				}
				if (this.type == 'add') {
					// 新建会员等级
					this.addLevel();
				} else {
					this.editLevel();
				}
			} else {
				if (
					this.type == 'edit' &&
					str == 'cancel' &&
					(this.brandId == '0' || this.brandId == '3')
				) {
					this.$store.commit('setWin', {
						content: '确认删除会员等级？',
						winType: 'confirm',
						title: '提示信息',
						callback: (res) => {
							if (res == 'ok') {
								this.delLevel();
							}
						}
					});
				} else {
					this.$emit('isChangeEdit'); // 触发事件关闭弹框
				}
			}
		},
		async delLevel() {
			//console.log('1111')
			// 删除会员等级
			// if (this.memberInfo.status == '1') {
			// 	this.validata('该会员等为默认等级,不可删除');
			// 	return false;
			// } else {
			//console.log('2222')
			let res = await http.delMemberlevel({
				data: {
					id: this.gid
				}
			});
			this.$emit('isChangeEdit', {
				type: 'splice',
				payload: {
					data: res
				}
			});
			this.$store.commit('setWin', {
				content: '删除成功,1秒后关闭窗口！',
				title: '提示信息',
				winType: 'alert',
				timerPowerOff: 1000
			});
			// }
		},
		async addLevel() {
			// 添加会员等级
			let res = await http.addMemberlevel({
				data: {
					name: this.gradeName,
					isDiscount: Number(this.isDiscount),
					discount: Number(this.isDiscount) == 0 ? '100' : this.discount,
					isService: Number(this.isService),
					isNext: Number(this.isNext),
					totalCharge: this.totalCharge,
					nextLevel: this.gradeId,
					isDefault: Number(this.isDefault),
					imgName: this.fileName,
					interests: this.configure.join('!#!'), //权益
					isDouble: Number(this.integral), //积分翻倍
					pointType: this.result, //按比例和按倍数
					point: this.point, //积分
					cash: this.cash, //现金
					pointMultiples: this.multiple //积分翻倍倍数
				}
			});
			this.$emit('isChangeEdit', {
				type: 'push',
				payload: {
					data: res
				}
			});
			this.$store.commit('setWin', {
				content: '新建成功,1秒后关闭窗口！',
				title: '提示信息',
				winType: 'alert',
				timerPowerOff: 1000
			});
		},
		async editLevel() {
			// 编辑会员等级
			if (this.ischain == '0' || this.ischain == '3') {
				if (Number(this.isDefaultVip) == '1' && this.totalCharge != '0.00') {
					this.validata('默认等级升级金额必须为0');
					return false;
				}
				await http.editMemberlevel({
					data: {
						id: this.gid,
						name: this.gradeName,
						isDiscount: Number(this.isDiscount),
						discount: Number(this.isDiscount) == 0 ? '100' : this.discount,
						isService: Number(this.isService),
						isNext: Number(this.isNext),
						isVipPrice: Number(this.memberPrice), //粉丝享有会员价
						totalCharge: this.totalCharge,
						nextLevel: this.gradeId,
						isDefault: Number(this.isDefault),
						imgName: this.fileName,
						interests: this.configure.join('!#!'), //权益
						isDouble: Number(this.integral), //积分翻倍
						pointType: this.result, //按比例和按倍数
						point: this.point, //积分
						cash: this.cash, //现金
						pointMultiples: this.multiple //积分翻倍倍数
					}
				});
			}
			this.$emit('isChangeEdit');
		},
		async getDetail(id) {
			// 获取会员详情
			let res = await http.getMemberlevelDetail({
				data: {
					id: id
				}
			});
			this.gradeName = res.name;
			this.discount = res.discount;
			this.totalCharge = res.totalCharge;
			this.isDiscount = Boolean(Number(res.isDiscount));
			this.isService = Boolean(Number(res.isService));
			this.levelStatus = res.status; //0 粉丝 1 基础卡
			this.isDefault = Boolean(Number(res.status));
			this.isDefaultVip = res.status == '1' ? true : false;
			let arr = [];
			for (let j = 0; j < this.gradeList.length; j++) {
				if (this.gradeList[j].status == '0') {
					arr.push(this.gradeList[j]);
					if (arr.length == this.gradeList.length) {
						this.isDefaultVip = true;
					}
				}
			}
			this.isNext = Boolean(Number(res.isNext));
			if (res.nextLevel != '') {
				for (let i = 0; i < this.gradeList.length; i++) {
					if (this.gradeList[i].id == res.nextLevel) {
						this.gradeCName = this.gradeList[i].name;
					}
				}
				this.gradeId = res.nextLevel;
			}
			if (res.interests != '') {
				this.configure = res.interests.split('!#!'); //获取相应的支付规则
			}
			this.integral = Boolean(Number(res.isDouble)); //积分是否翻倍
			this.memberPrice = Boolean(Number(res.isVipPrice)); //粉丝享有会员价
			this.result = Number(res.pointType); //按比例和按积分规则
			this.point = res.point; //积分
			this.cash = res.cash; //现金
			this.multiple = res.pointMultiples; //积分翻倍
		},
		openGrade() {
			//  选出默认被选中的会员等级
			this.gradeWin = true;
			this.gradeLists = [];
			let membergrade = this.gradeList;
			for (let item of membergrade) {
				if (item.status != '2') {
					this.gradeLists.push(item);
				}
			}
			for (let i = 0; i < this.gradeLists.length; i++) {
				if (this.gradeLists[i].id == this.gradeId) {
					this.index = [i];
				}
			}
			//console.log(JSON.stringify(this.gradeLists));
		},
		clean() {
			// 取消会员等级
			this.gradeCName = '';
			this.gradeId = 0;
			this.gradeIndex = null;
		},
		async fileNameChange() {
			//  上传图片
			let res = await http.fileUpload({
				data: {
					type: 8,
					shopId: storage.session('shopId')
				},
				formId: 'comForm'
			});
			this.fileName = res;
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
			// 保存
		},
		// 删除规则配置
		delConcont: function(i) {
			// 将对应的下标的规则从数组里面删除掉
			this.configure.splice(i, 1);
			this.content = '';
			// 将输入的规则保存下来
			// square.rulesList = this.configure;
		},
		doubleIntegral: function(res) {
			//开启积分翻倍
			this.integral = res;
		},
		haveIndex(i) {
			//积分获取
			this.result = i;
		}
	},
	mounted() {
		if (this.type == 'edit') {
			this.getDetail(this.gid);
		}
		this.ischain = storage.session('userShop').currentShop.ischain;
	},
	components: {
		'on-off': () =>
			import ( /*webpackChunkName: 'on_off'*/ 'src/components/on_off'),
		win: () =>
			import ( /* webpackChunkName: 'win' */ 'src/components/win'),
		'mul-select': () =>
			import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
		singleSelect: () =>
			import ( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select')
	}
};
</script>
<style type="text/css" scoped>
.member-win {
	height: auto;
	width: 550px;
	background-color: #f2f2f2;
	overflow: hidden;
	padding-bottom: 40px;
}

.win-Title {
	width: 100%;
	height: 70px;
	line-height: 70px;
	padding: 10px 20px;
	border-bottom: 10px solid #e6e6e6;
}

.member-win span {
	width: 100px;
	height: 40px;
	line-height: 40px;
	text-align: center;
}

.member-win .proportion {
	width: 140px;
}

.member-win input {
	outline: none;
	height: 38px;
	background-color: #fff;
	padding-left: 20px;
	color: #333;
	border: none;
	width: 160px;
}

.member-win .win-concent {
	height: auto;
	width: 100%;
	padding: 0 20px;
	overflow: hidden;
}

.win-box .colon {
	display: block;
	height: 40px;
	width: 20px;
	line-height: 40px;
	text-align: center;
	font-weight: bold;
}

.win-box .sinp {
	width: 190px;
	height: 38px;
	border: 1px solid #cecdcd;
	margin-right: 16px;
	float: left;
}

.win-box .sinp .cumulative {
	width: 150px;
	height: 36px;
	border: 1px solid #eaeaea;
	float: left;
	outline: none;
	text-indent: 17px;
}

.win-box .sinp span {
	display: block;
	float: left;
	width: 37px;
	height: 36px;
	text-align: center;
	line-height: 38px;
	border-left: 1px solid #cecdcd;
	background: #fff;
}

.win-box .handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 25px;
	background: url("../../../src/res/images/prompt.png") 0 center no-repeat;
	color: #999999;
}

.win-concent .win-box {
	padding: 10px 0;
	width: 100%;
	height: auto;
	min-height: 60px;
	border-bottom: 1px solid #e6dcdc;
}

.interests {
	padding: 10px 0;
	width: 100%;
	height: auto;
	overflow: hidden;
	border-bottom: 1px solid #e6dcdc;
}

.win-toggle {
	width: 100px;
	height: 40px;
}

.check-span {
	width: 88px !important;
}

.win-imgShow {
	width: 250px;
	height: 150px;
	float: left;
	margin-top: 20px;
	margin-left: 100px;
}

.win-imgShow img {
	width: 100%;
	height: 100%;
}

.interests .rlues i {
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

.interests .rlues:hover i {
	display: block;
}

.interests .bg {
	background: url(../../res/icon/iconright.png) #fff center no-repeat;
}
</style>