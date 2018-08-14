<template>
	<div id="cardType">
		<div class="solutionCard">
			<p class="headLine">方案设置
				<span class="borderLine"></span>
			</p>
			<ul class="setBox">
				<li class="setItem">
					<span class="itemLeft">卡性质</span>
					<section class="storeType">
						<span v-if="ischain == 3" v-for="(item,index) in cardAttrList" :key="index" :class="{'active':indexOn == index }" @click="isFlag&&chooseCardAttr(index)">{{item.name}}</span>
						<span v-if="ischain == 0" v-for="(item,index) in cardAttrList2" :key="index" class='active' @click="isFlag&&chooseCardAttr(index)">{{item.name}}</span>
					</section>
				</li>
				<li class="setItem">
					<span class="itemLeft">卡类型名称</span>
					<input type="text" placeholder="请输入卡类型名称" class="inp" v-model="names" maxlength="15" :disabled="disabled" />
					<span class="tips">限15字符</span>
				</li>
				<li class="setItem">
					<span class="itemLeft">卡类型缩写</span>
					<input type="text" placeholder="请输入卡类型缩写" class="inp" v-model="abbr" maxlength="4" :disabled="disabled" />
					<span class="tips">限4字符</span>
				</li>
				<li class="setItem">
					<span class="itemLeft">适用门店</span>
					<section class="applyStore">
						<span :class="{ active: isActive }" @click="isClick && applyShop()">仅发卡门店</span>
						<button class="increase" @click="isClick && choseShop('1')" v-if="ischain != 0">选择关联门店</button>
						<span v-if="sum >= 1">已选择{{sum}}个门店</span>
					</section>
				</li>
				<li class="setItem" style="margin-bottom: 15px;">
					<span class="itemLeft">储值门店</span>
					<section class="applyStore">
						<span :class="{ active: isUi }" @click="isClick && depositShop()">仅发卡门店</span>
						<button class="increase" @click="isClick && choseShop('2')" v-if="ischain != 0">选择关联门店</button>
						<span v-if="total >= 1">已选择{{total}}个门店</span>
					</section>
				</li>
				<!-- 积分翻倍 -->
				<li class="setItem" style="margin-bottom: 15px;">
					<span class="itemLeft">积分翻倍</span>
					<div class="fl">
						<on-off @statusChange="doubleIntegral" :status="integral"></on-off>
					</div>
				</li>
				<!-- 积分获取 -->
				<li class="setItem" style="margin-bottom: 15px;" v-if="integral == true">
					<span class="itemLeft">积分获取</span>
					<div class="fl">
						<singleSelect :index='result' @selOn='haveIndex' :styles="{width:'108px',border: '1px solid #cecdcd',marginRight: '8px'}"
						    :list="list" :name="'name'" :key='"id"'></singleSelect>
					</div>
				</li>
				<!-- 设置该等级比例 -->
				<li class="setItem" style="margin-bottom: 15px;" v-if="integral == true && result == 0">
					<span class="itemLeft">设置该等级积分比例</span>
					<div class="fl setinp">
						<input type="text" placeholder="请输入现金" v-model="cashs" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="6" class="fl"
						/>
						<i class="fl colon">:</i>
						<input type="text" placeholder="请输入积分" v-model="points" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="8" class="fl"
						/>
					</div>
				</li>
				<!-- 获得基础积分 -->
				<li class="setItem" style="margin-bottom: 15px;" v-if="integral == true && result == 1">
					<span class="itemLeft">获得基础积分</span>
					<div class="fl">
						<section class="sinp">
							<input type="text" class="cumulative" placeholder="请输入倍数" maxlength="6" v-model="multiples" @blur="formatValue('4')" />
							<span>倍</span>
						</section>
						<div class="fl handle-tips">
							<i></i>
							允许输入区间：0.01~99.99
						</div>
					</div>
				</li>
				<!-- 会员权益 -->
				<li class="setItem" style="margin-bottom: 15px;">
					<span class="itemLeft">会员权益</span>
					<section class="fl therules">
						<section class="clearfix" v-if="configure.length <= 9">
							<div class="rulebox">
								<input type="text" placeholder="请输入规则" class="fl" v-model="content" maxlength="30" />
								<div class='bg' @click="saveConcont"></div>
							</div>
							<div class="fl handle-tips">
								<i></i>
								最多输入10条,每条限制30字符
							</div>
						</section>
						<div class="rlues" v-for="(content,i) in configure" :key='i' v-if="configure.length >= 1">{{content}}
							<i class="del" @click="delConcont(i)"></i>
						</div>
					</section>
				</li>
				<!-- 上传图片 -->
				<li class="setItem" style="margin-bottom: 15px;">
					<span class="itemLeft">会员卡背景</span>
					<div class="uploadImgs fl">
						<a href="javascript:void(0);" class="addclassify fl" style="margin-right: 15px;">提交图片</a>
						<form enctype="multipart/form-data" id="endImage">
							<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''"
							    @change="bgNameChange()" />
						</form>
					</div>
					<div class="fl handle-tips">
						<i></i>
						图片大小请小于1M(750*450最佳)
					</div>
				</li>
				<!-- 效果 -->
				<li class="setItem" style="margin-bottom: 15px;">
					<span class="itemLeft">效果</span>
					<div class="uploadImg fl">
						<img v-if="endingImage != ''" alt="logo" v-bind:src="uploadUrl  + endingImage" />
						<span v-else class="defaultImg"></span>
						<span class="logo">LOGO</span>
						<span class="nox">NO.XXXXXXXXXXX</span>
						<span class="cardtype">卡类型</span>
						<span class="balance">余额:X.XX</span>
						<img src="../../res/images/qrcode.png" class="qrcode">
					</div>
					<a href="javascript:;" class="gray fl" style="width:100px;height: 40px;line-height: 40px;" @click="reset">重置</a>
				</li>
			</ul>
		</div>
		<ul class="btnList">
			<li class="fl operate" @click="cancel">取消</li>
			<li class="fl operate" @click="addCard">保存</li>
			<li class="fl operate" v-if="status != 2" @click="addCard('1')">去制卡</li>
		</ul>
		<!--关联门店弹窗-->
		<transition name="fade">
			<card-chain-win @closeWin="closeWin" v-bind="objInfo" v-if="isShowChain"></card-chain-win>
		</transition>
	</div>
</template>
<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	export default {
		data() {
			return {
				userData: storage.session('userShop'),
				cardAttrList: [{
					name: '通用'
				}, {
					name: '直营店'
				}, {
					name: '加盟店'
				}], //卡性质列表
				cardAttrList2: [{
					name: '通用'
				}],
				indexOn: 0, //默认卡类型
				isFlag: true, //按钮是否可点击
				isClick: true,
				applyActivityList: [], //选择活动范围列表
				depositActivityList: [],
				sum: '', //已选择的适用门店数量
				total: '', //已选择的储值门店数量
				id: '', //卡ID
				cardAttr: '', //卡性质
				name: '', //卡类型名称
				abbr: '', //卡类型缩写
				status: '', //是否已制卡
				applyShopIds: '', //适用门店
				depositShopIds: '', //储值门店
				isActive: false, //适用门店仅发卡门店
				isUi: false, //储值门店仅发卡门店
				ischain: '', //判断是单店还是品牌
				editCardDetail: this.editCards ? this.editCards : null, //编辑卡类型
				disabled: false,
				shopList: [], // 店铺列表
				selects: [], // 选中的优惠券
				directSaletOn: [], // 直营店选中的
				napaStoresOn: [], // 加盟店选中的
				StoresOn: [],
				SaletOn: [],
				currentShop: {}, //当前操作的店铺
				shopInfoIndex: 0, // 默认为第一个
				isShowChain: false,
				objInfo: '',
				integral: false, //积分翻倍
				result: 0, //积分获取选中的
				list: [{
					name: '按比例',
					id: 0
				}, {
					name: '按积分规则',
					id: 1
				}],
				cash: '', //积分比例现金
				point: '', //积分比例积分
				multiple: '', //倍数
				configure: [], // 支付规则
				content: '', // 规则内容 
				endingImage: '', //背景图片
				endingImageName: '', //背景图片名称
				uploadUrl: '',
				shopId: '' //店铺的id
			};
		},
		props: ['editCards', 'titleDetial'],
		computed: {
			names: {
				get() {
					return this.name;
				},
				set(newValue) {
					this.name = this.emoji2Str(newValue);
				}
			},
			cashs: {
				get() {
					return this.cash;
				},
				set(newValue) {
					this.cash = newValue.replace(/[^\d.]/g, '');
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
			},
		},
		methods: {
			doubleIntegral: function (res) { //开启积分翻倍
				this.integral = res;
			},
			haveIndex(i) { //积分获取
				this.result = i;
			},
			closeWin(val) {
				this.isShowChain = false;
				if (val) {
					this.shopList = val.shopList;
					this.currentShop = this.shopList[0];
					if (val.index == 1) {
						// 适用门店
						this.napaStoresOn = val.napaStoresOn;
						this.directSaletOn = val.directSaletOn;
						this.sum = this.shopList.length;
						this.applyShopIds = this.shopList;
						this.isActive = false;

					} else {
						this.StoresOn = val.StoresOn;
						this.SaletOn = val.SaletOn;
						this.total = this.shopList.length;
						this.depositShopIds = this.shopList;
						this.isUi = false;
					}
				}
			},
			//方案列表点击选择方案
			chooseCardAttr(index) {
				this.indexOn = index;
			},
			//适用门店仅发卡门店
			applyShop() {
				this.isActive = !this.isActive;
				if (this.isActive == false) {
					this.applyShopIds = '';
				} else {
					this.applyShopIds = '0';
					this.napaStoresOn = [];
					this.directSaletOn = [];
					this.sum = '';
				}
			},
			//储值门店仅发卡门店
			depositShop() {
				this.isUi = !this.isUi;
				if (this.isUi == false) {
					this.depositShopIds = '';
				} else {
					this.depositShopIds = '0';
					this.StoresOn = [];
					this.SaletOn = [];
					this.total = '';
				}
			},
			emoji2Str(str) { //过滤特殊表情符号
				return unescape(escape(str).replace(/%uD.{3}/g, ''));
			},
			//取消制卡
			cancel() {
				this.$emit('closeCard');
			},
			checkData(content, title = '操作提示', winType = 'alert') {
				this.$store.commit('setWin', {
					content: content,
					title: title,
					winType: winType
				});
			},
			checkForm: function () {
				let reg = /^[A-Z]+$/;
				//选择适用门店
				for (let i = 0; i < this.applyShopIds.length; i++) {
					this.applyShopIds = this.applyShopIds.toString(this.applyShopIds[i]);
				}
				//选择储值门店
				for (let i = 0; i < this.depositShopIds.length; i++) {
					this.depositShopIds = this.depositShopIds.toString(this.depositShopIds[i]);
				}
				if (this.name == '') {
					this.checkData('请输入卡类型名称');
					return false;
				}
				if (this.abbr == '') {
					this.checkData('请输入卡类型缩写');
					return false;
				}
				if (!reg.test(this.abbr)) {
					this.checkData('卡类型缩写必须是大写字母');
					return false;
				}
				if (this.integral && this.result == 0) {
					if (this.cash.length <= 0) {
						this.checkData('请输入等级积分比例现金!');
						return false;
					}
					if (Number(this.cash) <= 0) {
						this.checkData('等级积分比例现金应大于0');
						return false;
					}
					if (this.point.length <= 0) {
						this.checkData('请输入等级积分比例积分!');
						return false;
					}
					if (Number(this.point) <= 0) {
						this.checkData('等级积分比例积分应大于0');
						return false;
					}
				}
				if (this.integral && this.result == 1) {
					if (this.multiple.length <= 0) {
						this.checkData('请输入积分倍数!');
						return false;
					}
					if (Number(this.multiple) <= 0 || Number(this.multiple) > 99.99) {
						this.checkData('积分倍数输入区间0.01~99.99!');
						return false;
					}
				}
				return true;
			},
			//保存卡类型
			async addCard(type) {
				if (!this.checkForm()) return;
				let url = (this.editCardDetail == null) ? 'cardType/add' : 'cardType/update';
				// let res = 
				await http.editCardDetail({
					data: {
						id: this.id ? this.id : '',
						cardAttr: this.indexOn + 1,
						name: this.name,
						abbr: this.abbr,
						applyShopIds: this.applyShopIds == '' ? -1 : this.applyShopIds,
						depositShopIds: this.depositShopIds == '' ? -1 : this.depositShopIds,
						interests: this.configure.join('!#!'), //权益
						isDouble: Number(this.integral), //积分翻倍
						pointType: this.result, //按比例和按倍数
						point: this.point, //积分
						cash: this.cash, //现金
						pointMultiples: this.multiple, //积分翻倍倍数
						image: this.endingImage //背景图片
					},
					url: global.host['wx'] + url
				});
				if (type == 1) {
					storage.session('isCardType', true);
					if (this.ischain == 3) {
						this.$router.push({
							path: 'addCardType?i=6&o=5&s=1'
						});
					} else {
						this.$router.push({
							path: 'addCardType?i=5&o=6&s=1'
						});
					}

				} else {
					this.$emit('closeCard', 'change');
				}
			},
			//编辑卡类型时数据回填
			editCard() {
				this.name = this.editCardDetail.name;
				this.abbr = this.editCardDetail.abbr;
				this.id = this.editCardDetail.id;
				this.cardAttr = this.editCardDetail.cardAttr;
				this.indexOn = this.cardAttr - 1;
				this.status = this.editCardDetail.status;
				this.applyShopIds = this.editCardDetail.applyShopIds;
				let a = this.applyShopIds.split(',');
				if (this.applyShopIds == '0') {
					this.isActive = true;
					this.sum = '';
				} else if (this.applyShopIds == '-1') {
					this.isActive = false;
					this.sum = '';
				} else {
					this.sum = a.length;
				}
				this.depositShopIds = this.editCardDetail.depositShopIds;
				let b = this.depositShopIds.split(',');
				if (this.depositShopIds == '0') {
					this.isUi = true;
					this.total = '';
				} else if (this.depositShopIds == '-1') {
					this.isUi = false;
					this.total = '';
				} else {
					this.total = b.length;
				}
				if (this.status == 2) {
					this.isFlag = !this.isFlag;
					this.disabled = true;
				}
				//处理弹窗，区分是适用门店还是储值门店
				if (this.userData.currentShop.ischain == 3) {
					let dir = this.userData.currentShop.direct; //直营
					for (let i = 0; i < dir.length; i++) {
						//区分是直营还是加盟
						if (dir[i].status == '0' && this.applyShopIds.match(dir[i].id)) {
							this.directSaletOn.push(dir[i].id);
						}
						if (dir[i].status == '0' && this.depositShopIds.match(dir[i].id)) {
							this.SaletOn.push(dir[i].id);
						}
					}
					let nap = this.userData.currentShop.franchise; //加盟
					for (let i = 0; i < nap.length; i++) {
						if (nap[i].status == '0' && this.applyShopIds.match(nap[i].id)) {
							this.napaStoresOn.push(nap[i].id);
						}
						if (nap[i].status == '0' && this.depositShopIds.match(nap[i].id)) {
							this.StoresOn.push(nap[i].id);
						}
					}
				}
				this.integral = Boolean(Number(this.editCardDetail.isDouble)); //积分是否翻倍
				this.result = Number(this.editCardDetail.pointType); //按比例和按积分规则
				this.point = this.editCardDetail.point; //积分
				this.cash = this.editCardDetail.cash; //现金
				this.multiple = this.editCardDetail.pointMultiples; //积分翻倍
				this.endingImage = this.editCardDetail.image; //会员背景图片
				if (this.editCardDetail.interests != '') {
					this.configure = this.editCardDetail.interests.split('!#!');
				}
				console.log(this.editCardDetail.interests);
			},
			choseShop(index) {
				// 选择店铺
				// let title = 
				index == 1 ? '选择适用门店' : '选择储值门店';
				this.isShowChain = true;
				let obj = {
					indexs: index,
					napaStoresOns: index == 1 ? this.napaStoresOn || [] : this.StoresOn || [], // 加盟店选中的
					directSaletOns: index == 1 ? this.directSaletOn || [] : this.SaletOn || [], // 直营店选中的
					StoresOn: this.StoresOn || [],
					SaletOn: this.SaletOn || [],
				};
				this.objInfo = obj;
			},
			formatValue(type) {
				switch (type) {
					case '4':
						this.multiple = utils.toFloatStr(this.multiple, 2);
						break;
					default:
						// statements_def
						break;
				}
			},
			delConcont: function (i) { //删除任务规则
				// 将对应的下标的规则从数组里面删除掉
				this.configure.splice(i, 1);
				this.content = '';
			},
			// 保存规则配置
			saveConcont: function () {
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
			async bgNameChange() {
				// 上传图片 背景图片回调
				let res = await http.uploadImg({
					data: {
						type: 8,
						shopId: this.shopId
					},
					formId: 'endImage',
				});
				this.endingImage = res;
				let bgName = this.endingImage.lastIndexOf('/');
				this.endingImageName = this.endingImage.substring(bgName + 1, this.endingImage.length);

			},
			reset: function () { //重置会员卡背景图片
				this.endingImage = '';
			}
		},
		mounted() {
			this.ischain = storage.session('userShop').currentShop.ischain;
			this.shopId = storage.session('userShop').currentShop.id;
			// this.editCardDetail = storage.session('editCard');
			this.uploadUrl = storage.session('userShop').uploadUrl;
			if (this.editCardDetail) {
				this.editCard();
			}
		},
		components: {
			'card-chain-win': () =>
				import ( /*webpackChunkName: 'card_chain_win'*/ './card_chain_win'),
			'on-off': () =>
				import ( /*webpackChunkName: 'on_off'*/ 'src/components/on_off'),
			'singleSelect': () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select')
		}
	};
</script>
<style type="text/css" scoped>
	#cardType .solutionCard {
		width: 680px;
	}

	#cardType .headLine {
		width: 580px;
		border-left: 3px #28A8E0 solid;
		padding-left: 9px;
		font-size: 16px;
		position: relative;
		margin-bottom: 20px;
	}

	#cardType .headLine .borderLine {
		border-top: 2px #B3B3B3 dashed;
		display: block;
		width: 476px;
		position: absolute;
		top: 50%;
		right: 0;
	}

	#cardType .setBox {
		width: 680px;
		margin-bottom: 52px;
	}

	#cardType .setBox .setItem {
		width: 100%;
		margin-bottom: 15px;
		/*height: 40px;*/
		line-height: 40px;
		display: table;
		position: relative;
	}

	#cardType .setBox .setItem .setinp input {
		outline: none;
		height: 38px;
		background-color: #fff;
		padding-left: 20px;
		color: #333;
		width: 160px;
	}

	#cardType .setBox .setItem .colon {
		display: block;
		height: 40px;
		width: 20px;
		line-height: 40px;
		text-align: center;
		font-weight: bold;
	}

	#cardType .inp {
		width: 211px;
		height: 38px;
		text-indent: 10px;
	}

	#cardType .inp::-webkit-input-placeholder {
		font-size: 14px;
		color: #A5A5A5;
		outline: none;
	}

	#cardType .setBox .setItem .itemLeft {
		width: 25%;
		display: table-cell;
		padding-right: 18px;
		text-align: end;
		vertical-align: top;
	}

	#cardType .setBox .setItem .storeType span {
		display: inline-block;
		width: 100px;
		height: 41px;
		border: 1px #D2D2D2 solid;
		text-align: center;
		line-height: 41px;
	}

	#cardType .setBox .setItem .storeType span:nth-of-type(2) {
		margin: 0 10px;
	}

	#cardType .setBox .setItem .storeType span.active {
		border: 1px #FF9200 solid;
		background: #FFEDD3;
		color: #FF9200;
	}

	#cardType .setBox .setItem .tips {
		width: 90px;
		display: inline-block;
		background: url(../../res/images/prompt.png) left center no-repeat;
		margin: 0 12px;
		padding-left: 30px;
		color: #A5A5A5;
	}

	#cardType .setBox .setItem .applyStore span:nth-of-type(1) {
		display: inline-block;
		width: 100px;
		height: 41px;
		border: 1px #D2D2D2 solid;
		text-align: center;
		line-height: 41px;
	}

	#cardType .setBox .setItem .applyStore span:nth-of-type(1).active {
		border: 1px #FF9200 solid;
		background: #FFEDD3;
		color: #FF9200;
	}

	#cardType .increase {
		width: 210px;
		height: 40px;
		background-position: 40px 10px;
		line-height: 40px;
		text-indent: 23px;
		border: none;
		color: #fff;
		font-size: 16px;
		background-color: #2FA8DC;
		cursor: pointer;
		margin: 0px 21px 0px 14px;
	}

	#cardType .btnList {
		width: 100%;
		margin-left: 6%;
	}

	#cardType .btnList .operate {
		width: 200px;
		height: 51px;
		text-align: center;
		line-height: 51px;
		font-size: 16px;
		cursor: pointer;
	}

	#cardType .btnList .operate:nth-of-type(1) {
		background: #B3B3B3;
		color: #fff;
	}

	#cardType .btnList .operate:nth-of-type(2) {
		background: #f78800;
		color: #fff;
		margin: 0 10px;
	}

	#cardType .btnList .operate:nth-of-type(3) {
		border: 1px #FF9200 solid;
		color: #FF9200;
	}

	.activity_scope .check {
		background: #ff9701;
		text-indent: 0;
	}

	.activity_scope .unselect {
		background: #cacaca;
		text-indent: 0;
	}

	.activity_scope .shopName span {
		width: auto;
		height: 41px;
		border: 1px #D2D2D2 solid;
		text-align: center;
		line-height: 41px;
		color: #333;
		display: inline-block;
		padding: 0 10px;
	}

	.activity_scope .shopName span.active {
		border: 1px #FF9200 solid;
		background: #FFEDD3;
		color: #FF9200;
	}

	#cardType .clearfix::before,
	#cardType .clearfix::after {
		display: table;
		content: “”;
	}

	#cardType .clearfix::after {
		clear: both;
	}

	#cardType .setBox .setItem .sinp {
		width: 190px;
		height: 38px;
		border: 1px solid #CECDCD;
		margin-right: 16px;
		float: left;
	}

	#cardType .setBox .setItem .sinp .cumulative {
		width: 150px;
		height: 36px;
		border: 1px solid #eaeaea;
		float: left;
		outline: none;
		text-indent: 17px;
	}

	#cardType .setBox .setItem .sinp span {
		display: block;
		float: left;
		width: 37px;
		height: 36px;
		text-align: center;
		line-height: 38px;
		border-left: 1px solid #CECDCD;
		background: #fff;
	}

	#cardType .setBox .setItem .handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url("../../../src/res/images/prompt.png") 0 center no-repeat;
		color: #999999;
	}

	#cardType .setBox .setItem .therules {
		width: auto;
		height: auto;
	}

	#cardType .setBox .setItem .therules .rulebox {
		min-height: 40px;
		padding: 0;
		position: relative;
		cursor: pointer;
	}

	#cardType .setBox .setItem .therules .rulebox input {
		width: 320px;
		height: 36px;
		padding: 0;
		border-color: #999;
		text-indent: 12px;
	}

	#cardType .setBox .setItem .therules .rulebox .bg {
		border: 1px solid #999;
		width: 68px;
		float: left;
		height: 36px;
		border-left: none;
		background: url(../../res/icon/iconright.png) #fff center no-repeat;
	}

	#cardType .setBox .setItem .therules .rlues {
		width: 390px;
		height: 36px;
		border: 1px solid #999;
		text-align: center;
		line-height: 36px;
		position: relative;
		font-size: 12px;
		background-color: #fff;
		margin-bottom: 25px;
	}

	#cardType .setBox .setItem .therules .del {
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

	#cardType .setBox .setItem .therules .rlues:hover i {
		display: block;
	}

	#cardType .setBox .setItem .uploadImgs {
		position: relative;
	}

	#cardType .setBox .setItem .uploadImgs input {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}

	#cardType .setBox .setItem .uploadImg {
		width: 375px;
		height: 255px;
		border: 1px solid #b0b0b0;
		overflow: hidden;
		margin-right: 10px;
		border-radius: 20px;
		position: relative;
	}

	#cardType .setBox .setItem .uploadImg img,
	#cardType .setBox .setItem .uploadImg .defaultImg {
		display: block;
		width: 100%;
		height: 100%;
	}

	#cardType .setBox .setItem .uploadImg .defaultImg {
		background: #f8c8c9;
	}

	#cardType .setBox .setItem .uploadImg .logo {
		width: 85px;
		height: 22px;
		font-family: PingFang-SC-Heavy;
		font-size: 28px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 28px;
		letter-spacing: 0px;
		color: #303030;
		position: absolute;
		top: 25px;
		left: 27px;
	}

	#cardType .setBox .setItem .uploadImg .nox,
	#cardType .setBox .setItem .uploadImg .balance {
		font-family: PingFang-SC-Bold;
		font-size: 18px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 18px;
		letter-spacing: 0px;
		color: #303030;
		position: absolute;
	}

	#cardType .setBox .setItem .uploadImg .nox {
		width: 162px;
		height: 15px;
		top: 78px;
		left: 25px;
	}

	#cardType .setBox .setItem .uploadImg .cardtype {
		width: 150px;
		height: 48px;
		font-family: PingFang-SC-Bold;
		font-size: 50px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 50px;
		letter-spacing: 0px;
		color: rgba(255, 255, 255, 0.4);
		position: absolute;
		left: 26px;
		bottom: 19px;
	}

	#cardType .setBox .setItem .uploadImg .balance {
		width: 94px;
		height: 17px;
		bottom: 27px;
		right: 33px;
	}

	#cardType .setBox .setItem .uploadImg .qrcode {
		width: 34px;
		height: 34px;
		position: absolute;
		top: 25px;
		right: 28px;
	}
</style>