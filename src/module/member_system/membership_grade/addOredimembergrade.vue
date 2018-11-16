<!--
    **新建会员等级
    *
    * miaochuan.sha
    * *
    *
-->
<template>
	<div id="sweepCode">
		<!-- 新建会员等级 -->
		<div class="set-line">
			<div class="titles">新建会员等级</div>
			<div class="line"></div>
		</div>
		<!-- 等级名称 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">等级名称</span>
			<div class="rightHalf">
				<el-input v-model="gradeName" placeholder="请输入等级名称" maxlength="20" style="width:179px;"></el-input>
			</div>
		</div>
		<!-- 享有折扣 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">享有折扣</span>
			<div class="rightHalf">
				<el-switch v-model="isDiscount" active-color="#E1BB4A" inactive-color="#dcdfe6">
				</el-switch>
			</div>
		</div>
		<!-- 享有折扣 -->
		<div class="online-box clearfix" v-if="isDiscount">
			<span class="online-sub required fl">折扣率</span>
			<div class="rightHalf">
				<el-input class='fl' v-model="discounts" placeholder="请输入折扣率" maxlength="23" style="width:179px;"></el-input>
				<div class="fl handle-tips">
					<i></i> 折扣率:1-100正整数
				</div>
			</div>
		</div>
		<!-- 积分翻倍 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">积分翻倍</span>
			<div class="rightHalf">
				<el-switch v-model="integral" active-color="#E1BB4A" inactive-color="#dcdfe6">
				</el-switch>
			</div>
		</div>
		<!-- 积分翻倍 -->
		<div class="online-box clearfix" v-if="integral">
			<span class="online-sub fl">积分获取</span>
			<div class="rightHalf">
				<el-radio-group v-model="pointName" class="fl">
					<el-radio v-for="(item,index) in list" :key="index" :label="item.name" border @change.native="isWhether(item)"></el-radio>
				</el-radio-group>
			</div>
		</div>
		<!-- 设置改等级比例 -->
		<div class="online-box clearfix" v-if="integral && result == 0">
			<span class="online-sub required fl">设置改等级比例</span>
			<div class="rightHalf">
				<el-input class="fl" v-model="cashs" placeholder="请输入现金" maxlength="6" style="width:179px;"></el-input>
				<span class="fl colon">:</span>
				<el-input class="fl" v-model="points" placeholder="请输入积分" maxlength="8" style="width:179px;"></el-input>
			</div>
		</div>
		<!-- 获取基础积分 -->
		<div class="online-box clearfix" v-if="integral && result == 1">
			<span class="online-sub required fl">获取基础积分</span>
			<div class="rightHalf">
				<el-input class='fl' placeholder="请输入倍数" v-model="multiples" maxlength="6" onkeyup="value=value.replace(/[^\d.]/g,'')" style="width:179px;" @blur="formatValue('4')">
					<template slot="suffix">倍</template>
				</el-input>
				<div class="fl handle-tips">
					<i></i> 允许输入区间：0.01~99.99
				</div>
			</div>
		</div>
		<!-- 免服务费 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">免服务费</span>
			<div class="rightHalf">
				<el-switch v-model="isService" active-color="#E1BB4A" inactive-color="#dcdfe6">
				</el-switch>
			</div>
		</div>
		<!-- 升级至该等级赠送权益 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">升级至该等级赠送权益</span>
			<div class="rightHalf">
				<el-switch v-model="intereststatus" active-color="#E1BB4A" inactive-color="#dcdfe6">
				</el-switch>
			</div>
		</div>
		<!-- 赠送优惠券 -->
		<div class="online-box clearfix" v-if="intereststatus">
			<span class="online-sub fl">关联优惠券</span>
			<div class="rightHalf">
				<el-button type="primary" icon="el-icon-plus" style="width:179px;" @click="addCoupon">关联优惠券</el-button>
				<span v-if="selectCoupon.length > 0">(已关联{{selectCoupon.length}}张)</span>
			</div>
		</div>
		<!-- 赠送积分 -->
		<div class="online-box clearfix" v-if="intereststatus">
			<span class="online-sub fl">赠送积分</span>
			<div class="rightHalf">
				<el-input v-model="presentIntegral" placeholder="请输入赠送积分" maxlength="6" style="width:179px;" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
			</div>
		</div>
		<!-- 升级规则 -->
		<div class="online-box clearfix" v-if="memberInfo && memberInfo.status != '2'">
			<span class="online-sub fl">升级规则</span>
			<div class="rightHalf">
				<el-switch v-model="isNext" active-color="#E1BB4A" inactive-color="#dcdfe6">
				</el-switch>
			</div>
		</div>
		<!-- 升级后等级 -->
		<div class="online-box clearfix" v-if="isNext">
			<span class="online-sub fl">升级后等级</span>
			<div class="rightHalf">
				<el-button type="primary" icon="el-icon-plus" style="width:179px;" @click="openGrade">选择会员等级</el-button>
				<span v-if="gradeCName != ''">已选择:{{gradeCName}}</span>
			</div>
		</div>
		<!-- 升级后等级 -->
		<div class="online-box clearfix" v-if="isNext">
			<span class="online-sub required fl"></span>
			<div class="rightHalf">
				<span>升至下一级所需活跃值</span>
				<el-input v-model="activeValues" placeholder="请输入活跃值" maxlength="5" style="width:179px;"></el-input>
			</div>
		</div>
		<!-- 会员权益 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">会员权益</span>
			<div class="rightHalf">
				<section class="fl therules">
					<section class="clearfix" v-if="configure.length <= 9">
						<div class="rulebox">
							<input type="text" placeholder="请输入规则" class="fl define-inp" v-model="content" maxlength="30" />
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
		</div>
		<!-- 享有会员价 -->
		<div class="online-box clearfix" v-if="memberInfo && memberInfo.status == '2'">
			<span class="online-sub fl">享有会员价</span>
			<div class="rightHalf">
				<el-switch v-model="memberPrice" active-color="#E1BB4A" inactive-color="#dcdfe6">
				</el-switch>
			</div>
		</div>
		<!-- 设置图片 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">上传图片</span>
			<div class="rightHalf">
				<div class="fl uploadImgs clearfix">
					<el-button type="primary" icon="el-icon-plus" style="width:179px;">上传图片
					</el-button>
					<form enctype="multipart/form-data" id="comForm">
						<input @change="fileNameChange" type="file" id="file_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" />
					</form>
				</div>
				<div class="fl handle-tips">
					<i></i> 图片大小请小于1M(750 x 400最佳)
				</div>
			</div>
		</div>
		<!-- 上传的图片 -->
		<div class="online-box clearfix" v-if="fileName">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<div class="win-imgShow">
					<img :src="imgHost+fileName">
				</div>
				</div>
			</div>
			<!-- 保存 -->
			<div class="online-box clearfix" v-if="ischain == '0' || ischain == '3'">
				<span class="online-sub fl"></span>
				<div class="rightHalf">
					<el-button type="info" plain style="margin-right: 10px;width:190px;" v-if="editState" @click="deleteLevel">删除</el-button>
					<el-button type="primary" style="margin-right: 10px;width:190px;" @click="saveConfig">保存</el-button>
				</div>
			</div>
			<!-- 选择会员等级弹窗 -->
			<member-level v-if="gradeWin" :gid="gid" :grad="gradeId" :gradeCName="gradeCName" @getAppliedWin='getResult'></member-level>
			<!-- 关联优惠券的弹窗 -->
			<addCoupon v-if='showCoupon' :selectCoupon='selectCoupon' @winEvent='winEvent'></addCoupon>
		</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	//import global from 'src/manager/global';

	export default {
		data() {
			return {
				ischain: '', //是否品牌
				editState: false, //是否为编辑状态
				gradeName: '', // 会员等级名称
				discount: '', // 折扣
				activeValue: '', // 升级金额
				isDiscount: false, // 是否开启折扣
				isService: false, //是否开启免服务费
				isNext: false, //下个等级
				memberPrice: false, //粉丝卡 默认享有会员价
				gradeIndex: null, //等级index
				gradeCName: '', //选择的等级名称
				gradeId: '', //等级id
				levelStatus: '', //默认等级状态 1 基础卡 2 粉丝卡
				isDefault: false,
				isDefaultVip: false,
				fileName: '',
				imgHosts: '',
				gradeWin: false, // 是否显示等级弹框
				index: [-1],
				gradeList: [], //等级的列表
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
				pointName: '按比例',
				cash: '', //积分比例现金
				point: '', //积分比例积分
				multiple: '', //倍数	
				gid: '', //自身的id	
				intereststatus: false, //升至该等级赠送权益	
				presentIntegral: '', //升至改等级赠送的积分	
				showCoupon: false, //展示优惠券的弹窗
				selectCoupon: [], //被选中的优惠券数组
				memberInfo: '', //某一个等级的信息
			};
		},
		methods: {
			getResult: function(str, item) { //选择会员等级的弹窗回掉
				//  选择会员等级
				if (str == 'ok') {
					this.gradeId = item.gradeId;
					this.gradeCName = item.gradeCName;
					this.gradeWin = false;
				} else {
					this.gradeWin = false;
				}
			},
			isWhether: function(item) {
				this.result = item.id;
			},
			formatValue(type) {
				switch (type) {
					case '1':
						this.activeValue = utils.toFloatStr(this.activeValue, 2);
						break;
					case '4':
						this.multiple = utils.toFloatStr(this.multiple, 2);
						break;
					default:
						// statements_def
						break;
				}
			},
			chooseGrand() {
				//  选择会员等级
				// if (str == 'ok') {
				// 	this.gradeIndex = this.index;
				// 	this.gradeCName = this.gradeLists[this.index].name;
				// 	this.gradeId = this.gradeLists[this.index].id;
				// 	if (this.gradeId == this.gid) {
				// 		this.$store.commit('setWin', {
				// 			content: '不能选择自身等级！',
				// 			winType: 'alert',
				// 			title: '提示信息'
				// 		});
				// 		this.gradeCName = '';
				// 		this.gradeId = 0;
				// 		return false;
				// 	}
				// 	this.gradeWin = false;
				// } else {
				// 	this.gradeWin = false;
				// }
			},
			validata(content, winType = 'alert', title = '提示信息') {
				// 验证
				this.$store.commit('setWin', {
					content: content,
					title: title,
					winType: winType
				});
			},
			checkForm: function() { //验证表单
				//验证等级名称
				if (this.gradeName == '') {
					this.validata('请输入等级名称！');
					return false;
				}
				//验证折扣
				if (this.isDiscount) {
					if (Number(this.discount < 1) || Number(this.discount) > 100) {
						this.validata('请输入折扣率,折扣率为1-100!');
						return false;
					}
				}
				//积分翻倍
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
				//升至改等级赠送
				if (this.intereststatus) {
					if (this.selectCoupon.length == 0 && this.presentIntegral.length == 0) {
						this.validata('升至该等级时，该赠送些什么给会员呢，不需要赠送请关闭该功能呦~');
						return false;
					}
					if (Number(this.presentIntegral) < 0 || Number(this.presentIntegral) > 999) {
						this.validata('请正确填写赠送积分0-999');
						return false;
					}
				}
				//升级规则
				if (this.isNext) {
					if (this.gradeId == '') {
						this.validata('请选择升级后的等级');
						return false;
					}
					if (Number(this.activeValue) < 1 || Number(this.activeValue) > 10000) {
						this.validata('请正确填写活跃值,1-10000');
						return false;
					}

				}
				//图片
				if (!this.fileName) {
					this.validata('请上传图片');
					return false;
				}
				// if (this.isDefault == true) {
				// 	for (let i = 0; i < this.gradeList.length; i++) {
				// 		if (this.gradeList[i].id != this.gid) {
				// 			if (this.gradeList[i].status == this.levelStatus) {
				// 				this.validata('已有默认等级,不能再次设置！');
				// 				return false;
				// 			}
				// 		}
				// 	}
				// }
				// 关联默认等级提示
				// for (let i = 0; i < this.gradeList.length; i++) {
				// 	if (this.gradeList[i].status == '1') {
				// 		if (this.gradeList[i].id == this.gradeId) {
				// 			this.validata('您关联的为默认等级,该等级不会生效');
				// 		}
				// 		return false;
				// 	}
				// }
				return true;
			},
			saveConfig: function() { //保存
				if (this.editState) {
					this.editLevel();
				} else {
					this.addLevel();
				}
			},
			closeWin(str) {
				// 修改或删除会员等级
				if (str == 'ok') {
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
			deleteLevel: function() { //删除会员等级
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'confirm',
					content: '确定删除该等级',
					callback: (res) => {
						if (res == 'ok') {
							this.delLevel();
						}
					}
				});
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
				if (res) {
					this.$store.commit('setWin', {
						content: '删除成功,1秒后关闭窗口！',
						title: '提示信息',
						winType: 'alert',
						timerPowerOff: 1000
					});
					this.$router.push('/admin/memberLevelManagement');
				}
			},
			async addLevel() {
				if (!this.checkForm()) return;
				// 添加会员等级
				let res = await http.addMemberlevel({
					data: {
						name: this.gradeName, //等级名称
						isDiscount: Number(this.isDiscount), //是否开启折扣
						discount: this.discount, //折扣率
						isService: Number(this.isService), //是否免服务费
						isNext: Number(this.isNext), //开启升级规则
						activeValue: this.activeValue, //升级下个规则的活跃值
						nextLevel: this.gradeId, //升级到下一个等级的id
						imgName: this.fileName, //图片地址
						interests: this.configure.join('!#!'), //权益
						isDouble: Number(this.integral), //积分翻倍
						pointType: this.result, //按比例和按倍数
						point: this.point, //积分
						cash: this.cash, //现金
						pointMultiples: this.multiple, //积分翻倍倍数
						giveCoupons: this.intereststatus ? this.getCoupon(this.selectCoupon) : '', //赠送的优惠券
						givePoints: this.intereststatus ? this.presentIntegral : '' //赠送的积分
					}
				});
				if (res) {
					this.$store.commit('setWin', {
						content: '新建成功,1秒后关闭窗口！',
						title: '提示信息',
						winType: 'alert',
						timerPowerOff: 1000
					});
					this.$router.push('/admin/memberLevelManagement');
				}
			},
			async editLevel() {
				// 编辑会员等级
				// if (Number(this.isDefaultVip) == '1' && this.activeValue != '0.00') {
				// 	this.validata('默认等级升级金额必须为0');
				// 	return false;
				// }
				if (!this.checkForm()) return;
				await http.editMemberlevel({
					data: {
						id: this.gid, //等级id
						name: this.gradeName,
						isDiscount: Number(this.isDiscount), //是否开启折扣
						discount: this.discount, //折扣率
						isService: Number(this.isService), //是否免服务费
						isNext: Number(this.isNext), //开启升级规则
						isVipPrice: Number(this.memberPrice), //粉丝享有会员价
						activeValue: this.activeValue, //升级下个规则的活跃值
						nextLevel: this.gradeId, //升级到下一个等级的id
						imgName: this.fileName, //图片地址
						interests: this.configure.join('!#!'), //权益
						isDouble: Number(this.integral), //积分翻倍
						pointType: this.result, //按比例和按倍数
						point: this.point, //积分
						cash: this.cash, //现金
						pointMultiples: this.multiple, //积分翻倍倍数
						giveCoupons: this.intereststatus ? this.getCoupon(this.selectCoupon) : '', //赠送的优惠券
						givePoints: this.intereststatus ? this.presentIntegral : '' //赠送的积分
					}
				});
				this.$store.commit('setWin', {
					content: '修改成功成功,1秒后关闭窗口！',
					title: '提示信息',
					winType: 'alert',
					timerPowerOff: 1000
				});
				this.$router.push('/admin/memberLevelManagement');
			},
			async getDetail(id) { //获取等级的详情
				let res = await http.getMemberlevelDetail({
					data: {
						id: id
					}
				});
				this.gid = res.id; //等级自身的id
				this.gradeName = res.name; //会员等级的名称
				this.isDiscount = Boolean(Number(res.isDiscount)); //享有折扣的开关
				this.discount = res.discount; //享有折扣率
				this.activeValue = res.activeValue; //升级下一等级所需活跃值
				this.isService = Boolean(Number(res.isService)); ///免服务费的开关
				this.levelStatus = res.status; //0 粉丝 1 基础卡
				//this.isDefault = Boolean(Number(res.status));
				//this.isDefaultVip = res.status == '1' ? true : false;
				// let arr = [];
				// for (let j = 0; j < this.gradeList.length; j++) {
				// 	if (this.gradeList[j].status == '0') {
				// 		arr.push(this.gradeList[j]);
				// 		if (arr.length == this.gradeList.length) {
				// 			this.isDefaultVip = true;
				// 		}
				// 	}
				// }
				this.isNext = Boolean(Number(res.isNext)); //升级规则的开关
				if (res.nextLevel != '') { //下一等级的id
					for (let i = 0; i < this.gradeList.length; i++) {
						if (this.gradeList[i].id == res.nextLevel) {
							this.gradeCName = this.gradeList[i].name; //下一等级的名字
						}
					}
					this.gradeId = res.nextLevel; //下一等级的id
				}
				if (res.interests != '') {
					this.configure = res.interests.split('!#!'); //获取相应的支付规则
				}
				this.integral = Boolean(Number(res.isDouble)); //积分是否翻倍
				this.memberPrice = Boolean(Number(res.isVipPrice)); //粉丝享有会员价
				this.result = Number(res.pointType); //按比例和按积分规则
				this.pointName = this.list[this.result].name; //按比例和按积分规则显示
				this.point = res.point; //积分
				this.cash = res.cash; //现金
				this.multiple = res.pointMultiples; //积分翻倍
				if (res.giveCoupons != '' || (res.givePoints != '' && res.givePoints != '0')) { //升至改等级赠送积分
					this.intereststatus = true;
					if (res.giveCoupons != '') {
						this.selectCoupon = res.giveCoupons; //赠送的优惠券
					}
					this.presentIntegral = res.givePoints; //赠送的积分
				}
				this.fileName = res.imgName; //上传的图片
			},
			getCoupon: function(couponList) {
				let obj = {
					id: '',
					num: ''
				};
				if (couponList.length == 0) {
					return '';
				} else {
					let id = [];
					let num = [];
					for (let item of couponList) {
						id.push(item.id);
						num.push(item.num);
					}
					obj.id = id.join(',');
					obj.num = num.join(',');
					return obj;
				}
			},
			openGrade() {
				//  选出默认被选中的会员等级
				this.gradeWin = true;
				// this.gradeLists = [];
				// let membergrade = this.gradeList;
				// for (let item of membergrade) {
				// 	if (item.status != '2') {
				// 		this.gradeLists.push(item);
				// 	}
				// }
				// for (let i = 0; i < this.gradeLists.length; i++) {
				// 	if (this.gradeLists[i].id == this.gradeId) {
				// 		this.index = [i];
				// 	}
				// }
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
			},
			setTitle: function() { //设置标题
				this.$store.commit('setPageTools', [{
					name: '返回',
					className: 'el-btn-blue',
					fn: () => {
						this.wentBack();
					}
				}]);
			},
			wentBack: function() { //返回
				this.$router.push('/admin/memberLevelManagement');
			},
			addCoupon: function() { //添加优惠券
				this.showCoupon = true;
			},
			winEvent(obj) { //选择优惠券弹窗回掉
				this.showCoupon = false;
				if (obj.status == 'ok') {
					this.selectCoupon = obj.data.select;
				}
			},
			async getLevelist() { //获取等级列表
				let res = await http.memberGetList({
					data: {}
				});
				if (res) {
					this.gradeList = res;
				}
			},
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
			activeValues: {
				get() {
					return this.activeValue;
				},
				set(newValue) {
					this.activeValue = newValue.replace(/[^\d]/g, '');
				}
			},
			discounts: { //折扣率
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
					this.multiple = newValue.replace(/[^\d.]/g, '');
				}
			}

		},
		components: {
			'on-off': () =>
				import ( /*webpackChunkName: 'on_off'*/ 'src/components/on_off'),
			win: () =>
				import ( /* webpackChunkName: 'win' */ 'src/components/win'),
			'mul-select': () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
			singleSelect: () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select'),
			'member-level': () =>
				import ( /*webpackChunkName: 'member-level'*/ './member_level_win'),
			'addCoupon': () =>
				import ( /*webpackChunkName: 'associated_coupons'*/ 'src/components/associated_coupons'),

		},
		beforeDestroy() {
			storage.session('memberlevelInfo', null);
		},
		mounted() {
			this.setTitle();
			this.ischain = storage.session('userShop').currentShop.ischain;
			this.imgHost = storage.session('userShop').uploadUrl; //图片的前缀
			let memberInfo = storage.session('memberlevelInfo');
			if (memberInfo) {
				this.editState = true;
				this.memberInfo = memberInfo;
				this.getLevelist(); //获取等级列表
				this.getDetail(this.memberInfo.id);
			}
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
		max-width: 900px;
		height: auto;
		float: left;
		line-height: 40px;
	}

	/* #sweepCode .online-box .el_input {
		width: 218px
	} */

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

	#sweepCode .colon {
		display: block;
		height: 40px;
		width: 20px;
		line-height: 40px;
		text-align: center;
		font-weight: bold;
	}

	#sweepCode .del {
		position: absolute;
		right: -12px;
		top: -12px;
		display: none;
		width: 25px;
		height: 25px;
		background-image: url(../../../res/images/delete.png);
		background-position: center center;
		background-repeat: no-repeat;
		cursor: pointer;
	}

	#sweepCode .rlues:hover i {
		display: block;
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
		background: url(../../../res/icon/iconright.png) #fff center no-repeat;
	}

	#sweepCode .online-box .online-sub {
		display: block;
		font-size: 16px;
		width: 160px;
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

	#sweepCode .rlues:hover i {
		display: block;
	}

	#sweepCode .handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url("../../../../src/res/images/prompt.png") 0 center no-repeat;
		color: #999999;
		margin: 0 15px;
	}

	#sweepCode .online-box .uploadImgs {
		width: 179px;
		position: relative;
	}

	#sweepCode .uploadImgs input {
		width: 179px;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}

	#sweepCode .online-box .win-imgShow {
		width: 250px;
		height: 150px;
	}

	#sweepCode .online-box .win-imgShow img {
		width: 100%;
		height: 100%;
	}
</style>