<template>
	<div id="card-activation">
		<div class="containter">
			<div class="online-box clearfix">
				<span class="fl online-sub required">卡属门店</span>
				<span class="fl belongshop" v-if="ischain == '0'">{{currentShop.name}}</span>
				<!-- <a class="fl choicebtn" href="javascript:void(0)" @click="choseShop" v-if="ischain == '3'">选择门店</a> -->
				<el-button type="primary" @click="choseShop" v-if="ischain == '3'" class="fl choicebtn">选择门店</el-button>
				<span class="fl choice" v-if="shopIndex != -1">已选择{{shopList[shopIndex].shopName}}</span>
			</div>
			<div class="online-box clearfix">
				<span class="fl online-sub required">激活方式</span>
				<template v-for="(item,index) in goodlist">
					<span class="way" :key="index" :class="{'signa' :type == index}" v-on:click="tabTypes(index,1)" v-if="item.type">{{item.name}}</span>
				</template>
			</div>
			<section v-show="type == '0'">
				<div class="set-line">
					<div class="titles">会员卡信息</div>
					<div class="line"></div>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub required">选择卡类型</span>
					<!-- <a class="fl choicebtn" href="javascript:void(0)" @click="choseCardType">选择卡类型</a> -->
					<el-button type="primary" @click="choseCardType" class="fl choicebtn">选择卡类型</el-button>
					<span class="fl choice" v-if="virtualCard.cradTypeIndex != -1">已选择{{cradTypeList[virtualCard.cradTypeIndex].name}}</span>
				</div>
				<div class="online-box clearfix" v-if="virtualCard.selectCardType != '' ">
					<span class="fl online-sub"></span>
					<div class="fl show">
						<div class="show-box">
							<span class="fl">卡类型</span>
							<div class="fl show-r">
								<p>{{virtualCard.selectCardType.name}}</p>
							</div>
						</div>
						<div class="show-box">
							<span class="fl">购卡金额</span>
							<div class="fl show-r">
								<p>￥{{virtualCard.selectCardType.price}}</p>
							</div>
						</div>
						<div class="show-box">
							<span class="fl">卡内金额</span>
							<div class="fl show-r">
								<p>￥{{virtualCard.selectCardType.cardAmount}}</p>
							</div>
						</div>
						<div class="show-box">
							<span class="fl">卡内积分</span>
							<div class="fl show-r">
								<p>{{virtualCard.selectCardType.cardPoint}}分</p>
							</div>
						</div>
						<div class="show-box">
							<span class="fl">卡包内容</span>
							<div class="fl show-r">
								<p v-if="virtualCard.selectCardType.cardCoupon ==''">无</p>
								<p v-else v-for="(v,i) in virtualCard.selectCardType.cardCoupon" :key="i">{{i + 1 + '.赠送优惠卷: ' + v.name +' ' +
									v.num+ '张'}}</p>
							</div>
						</div>
						<div class="show-box" v-show="virtualCard.selectCardType.discount+'' !== '100'">
							<p class="enjoy">享受【{{virtualCard.selectCardType.name}}】专属折扣 {{~~virtualCard.selectCardType.discount/10}} 折</p>
						</div>
					</div>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub required">填写卡编号</span>
					<!-- <input type="text" class="fl" placeholder="请输入实体卡号" v-model="virtualCard.cardNo" maxlength="8" @change="validateNumber"> -->
					<el-input type="text" style="width:210px;margin-left:-25px" placeholder="请输入实体卡号" v-model="virtualCard.cardNo"
					 maxlength="8" @change="validateNumber"></el-input>
					<a href="javascript:void(0)" class="operation" @click="getCardNo">自动补填</a>
					<span class="Correct" :class="{complete: virtualCard.validateNoLog == 1,err:virtualCard.validateNoLog == 2}">
					</span>
				</div>
				<div class="set-line">
					<div class="titles">会员卡补充</div>
					<div class="line"></div>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub required">手机</span>
					<!-- <input type="text" class="fl" placeholder="请输入手机号码" v-model="virtualCard.consumerPhone"> -->
					<el-input type="text" style="width:210px;" placeholder="请输入手机号码" v-model="virtualCard.consumerPhone"></el-input>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub required">姓名</span>
					<!-- <input type="text" class="fl" placeholder="请输入姓名" v-model="virtualCard.consumerName"> -->
					<el-input type="text" style="width:210px;" placeholder="请输入姓名" v-model="virtualCard.consumerName"></el-input>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub required">性别</span>
					<template v-for="(item,index) in genderList">
						<span class="way" :key="index" :class="{'signa' : virtualCard.genderType == index}" v-on:click="tabTypes(index,2)"
						 v-if="item.type">{{item.name}}</span>
					</template>
				</div>
				<div class="online-box clearfix ">
					<span class="fl online-sub required">生日</span>
					<!-- <input type="text" class="fl" placeholder="如:19940412" v-model="virtualCard.consumerBirthday" maxlength="8"> -->
					<el-input type="text" style="width:210px;" placeholder="如:19940412" v-model="virtualCard.consumerBirthday"
					 maxlength="8"></el-input>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub "></span>
					<div class="fl handle-tips">
						<i></i>
						<p>1、激活卡时无需进行支付,由品牌核发,计入门店实体卡统计,购卡金额0元</p>
						<p>2、虚拟卡激活必须填写会员基本信息否则不予激活</p>
					</div>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub "></span>
					<!-- <a href="javascript:void(0)" class="delete">删除</a> -->
					<el-button type="info" class="delete">删除</el-button>
					<!-- <a href="javascript:void(0)" class="save" @click="activationCard">保存</a> -->
					<el-button type="primary" class="save" @click="activationCard">保存</el-button>

				</div>
			</section>
			<div class="readCard" v-show="entityCard.pageMode == 'readCard' && type == '1'">
				<div class="readBox">
					<img width="260" src="../../res/images/cardActive.png" alt="">
					<p class="readInfo">请放置实体卡保持与读卡机器接触</p>
					<p class="readInfo">在读卡完成前请不要拿走或移动卡</p>
					<p class="readInfo">识别成功后将自动跳转到新的页面</p>
				</div>
			</div>
			<section v-show="(entityCard.pageMode == 'acticeCard' || entityCard.pageMode== 'noCardActive') && type == '1'">
				<div class="set-line">
					<div class="titles">会员卡信息</div>
					<div class="line"></div>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub required">选择卡类型</span>
					<!-- <a class="fl choicebtn" href="javascript:void(0)" @click="choseCardType">选择卡类型</a> -->
					<el-button type="primary" @click="choseCardType" class="fl choicebtn">选择卡类型</el-button>
					<span class="fl choice" v-if="entityCard.cradTypeIndex != -1">已选择{{cradTypeList[entityCard.cradTypeIndex].name}}</span>
				</div>
				<div class="online-box clearfix" v-if="entityCard.selectCardType != '' ">
					<span class="fl online-sub"></span>
					<div class="fl show">
						<div class="show-box">
							<span class="fl">卡类型</span>
							<div class="fl show-r">
								<p>{{entityCard.selectCardType.name}}</p>
							</div>
						</div>
						<div class="show-box">
							<span class="fl">购卡金额</span>
							<div class="fl show-r">
								<p>￥{{entityCard.selectCardType.price}}</p>
							</div>
						</div>
						<div class="show-box">
							<span class="fl">卡内金额</span>
							<div class="fl show-r">
								<p>￥{{entityCard.selectCardType.cardAmount}}</p>
							</div>
						</div>
						<div class="show-box">
							<span class="fl">卡内积分</span>
							<div class="fl show-r">
								<p>{{entityCard.selectCardType.cardPoint}}分</p>
							</div>
						</div>
						<div class="show-box">
							<span class="fl">卡包内容</span>
							<div class="fl show-r">
								<p v-if="entityCard.selectCardType.cardCoupon ==''">无</p>
								<p v-else v-for="(v,i) in entityCard.selectCardType.cardCoupon" :key="i">{{i + 1 + '.赠送优惠卷: ' + v.name +' ' +
									v.num+ '张'}}</p>
							</div>
						</div>
						<div class="show-box" v-show="entityCard.selectCardType.discount+'' !== '100'">
							<p class="enjoy">享受【{{entityCard.selectCardType.name}}】专属折扣 {{~~entityCard.selectCardType.discount/10}} 折</p>
						</div>
					</div>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub required">填写卡编号</span>
					<input type="text" class="fl" placeholder="请输入实体卡号" v-model="entityCard.cardNo" maxlength="8" @change="validateNumber">
					<a href="javascript:void(0)" class="operation fl" @click="getCardNo">自动补填</a>
					<span class="Correct" :class="{complete: entityCard.validateNoLog==1,err:entityCard.validateNoLog == 2}">
					</span>
				</div>
				<div class="set-line">
					<div class="titles">会员卡补充</div>
					<div class="line"></div>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub">手机</span>
					<!-- <input type="text" class="fl" placeholder="请输入手机号码" v-model="entityCard.consumerPhone"> -->
					<el-input type="text" style="width:210px;" placeholder="请输入手机号码" v-model="entityCard.consumerPhone"></el-input>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub">姓名</span>
					<!-- <input type="text" class="fl" placeholder="请输入姓名" v-model="entityCard.consumerName"> -->
					<el-input type="text" style="width:210px;" placeholder="请输入姓名" v-model="entityCard.consumerName"></el-input>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub">性别</span>
					<template v-for="(item,index) in genderList">
						<span class="way" :key="index" :class="entityCard.genderType == index ? 'signa' : ''" v-on:click="tabTypes(index,2)"
						 v-if="item.type">{{item.name}}</span>
					</template>
				</div>
				<div class="online-box clearfix ">
					<span class="fl online-sub " :class="type == '0' ? 'required' : ''">生日</span>
					<!-- <input type="text" class="fl" placeholder="如:19940412" v-model="entityCard.consumerBirthday" maxlength="8"> -->
					<el-input type="text" style="width:210px;" placeholder="如:19940412" v-model="entityCard.consumerBirthday"
					 maxlength="8"></el-input>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub "></span>
					<div class="fl handle-tips">
						<i></i>
						<p>1、激活卡时无需进行支付,由品牌核发,计入门店实体卡统计,购卡金额0元</p>
						<p>2、虚拟卡激活必须填写会员基本信息否则不予激活</p>
					</div>
				</div>
				<div class="online-box clearfix">
					<span class="fl online-sub "></span>
					<!-- <a href="javascript:void(0)" class="delete">删除</a> -->
					<el-button type="info" class="delete">删除</el-button>
					<!-- <a href="javascript:void(0)" class="save" @click="activationCard">保存</a> -->
					<el-button type="primary" class="save" @click="activationCard">保存</el-button>
				</div>
			</section>
		</div>
		<transition name="fade">
			<component :is="showCom" :postObj="comObj" @toClick="getReturnInfo"></component>
		</transition>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage'; 

	export default {
		data() {
			return {
				ischain: '', // 0为单店 3为品牌
				// shopList: (userData.currentShop.ischain == '0') ? shop : [], // 店铺列表
				currentShop: {}, //当前操作的店铺
				shopList: {}, //获取到品牌下面所有店铺信息
				shopInfoIndex: 0, // 默认为第一个
				shopInfo: '', // 已选择的店铺名
				selectShop: '',
				shopIndex: -1,
				goodlist: [{ // 激活方式
					'type': '0',
					'name': '虚拟卡激活'
				}, {
					'type': '1',
					'name': '实体卡激活'
				}],
				genderList: [{ // 性别选择
					'type': '0',
					'name': '女'
				}, {
					'type': '1',
					'name': '男'
				}],
				type: '0', // 激活方式选中的状态
				cradTypeList: [], //卡类型列表 详细的信息
				virtualCard: { //虚拟卡的数据
					selectCardType: '', //选中的卡类型
					cradTypeIndex: -1, //选中的卡类型下标
					cardNo: '', // 实体卡编号
					validateNoLog: 0, // 实体卡 No 验证是否正确， 0 没有验证; 正确；2错误
					memberCardId: '', // 实体卡id（不是nfc，是自己弄出来的）
					cardKey: '', // 卡钥匙（一个 token ）
					consumerPhone: '', // 消费者电话号码
					consumerName: '', // 消费者姓名
					consumerBirthday: '', // 消费者生日
					genderType: '0', //性别选中项
				},
				entityCard: { //实体卡的数据
					pageMode: 'noCardActive', // 页面的模式， readCard 读卡， acticeCard 激活卡 noCardActive 无卡激活
					selectCardType: '', //选中的卡类型
					cradTypeIndex: -1, //选中的卡类型下标
					cardNo: '', // 实体卡编号
					validateNoLog: 0, // 实体卡 No 验证是否正确， 0 没有验证; 正确；2错误
					memberCardId: '', // 实体卡id（不是nfc，是自己弄出来的）
					cardKey: '', // 卡钥匙（一个 token ）
					consumerPhone: '', // 消费者电话号码
					consumerName: '', // 消费者姓名
					consumerBirthday: '', // 消费者生日
					genderType: '0', //性别选中项
				},
				napaStoresOn: [], // 加盟店选中的
				directSaletOn: [], // 直营店选中的
				showCom: '',
				comObj: {},
			};
		},
		methods: {
			//激活方式选择 
			tabTypes: function (index, type) {
				if (type == 1) {
					if (this.ischain == '3' && this.selectShop == '') {
						this.$store.commit('setWin', {
							title: '提示',
							content: '请先选择卡属门店'
						});
						return false;
					}
					this.type = index;
					if (this.type == '1') {
						// 制卡
						this.entityCard.pageMode = 'readCard';
						this.markCard();
					} else {
						this.entityCard.pageMode = 'noCardActive';
					}
				} else if (type == 2) {
					if (this.type == '0') {
						this.virtualCard.genderType = index;
					} else {
						this.entityCard.genderType = index;
					}
				}
			},
			async markCard() { // 获取实体卡的信息，并对不同的情况作出处理
				if (this.ischain == '3' && this.selectShop == '') {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '请选择卡属门店'
					});
					return false;
				}

				let WS = await
				import( /* webpackChunkName:'entity_card_ws' */ 'src/module/member_system/entity_card_ws');

				WS = WS.default;
				let makeCardWebsocket = new WS('openCard', this.selectShop.id ? this.selectShop.id : this.currentShop.shopId, (oid,
					token) => {
					if (oid && token) {
						this.entityCard.memberCardId = oid;
						this.entityCard.cardKey = token;
						// 激活成功，断开连接
						makeCardWebsocket.disconnect();
						this.entityCard.pageMode = 'acticeCard';
					} else {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '不可能出现的错误'


						});
					}
				}, (err) => {
					if (err == 'dataError') {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '数据格式错误'
						});
					} else {
						let msg = (err && err.message) || '当前IC卡有问题或者网络连接错误,读卡失败';
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: msg
						});
					}
					// 安全起见重启连接
					makeCardWebsocket.disconnect();
					makeCardWebsocket.start();
				});
				// this.websocktState = makeCardWebsocket;
				makeCardWebsocket.start();
			},
			choseCardType: function () {
				if (this.ischain == '3' && this.selectShop == '') {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '请选择卡属门店'
					});
					return false;
				}
				if (this.cradTypeList.length == 0) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '暂无卡类型,请去新建卡类型吧'
					});
					return false;
				}
				this.showCom = 'chooseCardType';
				this.comObj = {
					cradTypeList: this.cradTypeList,
					type: this.type,
					virtualCradTypeIndex: this.virtualCard.cradTypeIndex,
					virtualSelectCardType: this.virtualCard.selectCardType,
					entityCradTypeIndex: this.entityCard.cradTypeIndex,
					entitySelectCardType: this.entityCard.selectCardType,
					virtualCardNo: this.virtualCard.cardNo,
					virtualValidateNoLog: this.virtualCard.validateNoLog
				};

			},
			choseShop: function () {
				if (this.shopList.length == 0) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '暂无门店'
					});
					return false;
				}
				this.showCom = 'chooseStores';
				this.comObj = {
					shopList: this.shopList,
					shopIndex: this.shopIndex,
					selectShop: this.selectShop
				};
			},
			getReturnInfo: function (throwObj) {
				if (throwObj.res) {
					if (throwObj.res == 'ok') {
						if (this.showCom == 'chooseCardType') {
							if (this.type == '0') {
								console.log(this.virtualCard.cradTypeIndex);
								this.virtualCard.cradTypeIndex = throwObj.postIndex;
								this.virtualCard.selectCardType = throwObj.postSelectCardType; //获取点击选中的卡类型
							} else {
								this.entityCard.cradTypeIndex = throwObj.postIndex;
								this.entityCard.selectCardType = throwObj.postSelectCardType; //获取点击选中的卡类型
							}
						} else if (this.showCom == 'chooseStores') {
							this.shopIndex = throwObj.postIndex;
							this.selectShop = throwObj.postSelectShop; //获取点击选中的卡类型
							this.openCard(); //获取卡秘钥
							this.getCardType(); //获取卡类型
							this.virtualCard.cradTypeIndex = -1;
							this.virtualCard.selectCardType = '';
							this.entityCard.cradTypeIndex = -1;
							this.entityCard.selectCardType = '';
						}

					}
					this.showCom = '';
				}

			},
			// 编号框 失焦 事件
			validateNumber: function () {
				let data = '';
				if (this.ischain == '3' && this.selectShop == '') {
					this.$store.commit('setWin', {
						title: '提示',
						content: '请先选择卡属门店'
					});
					return false;
				}
				if (this.type == '0' && (!this.virtualCard.selectCardType || !this.virtualCard.selectCardType.cardId)) {
					this.$store.commit('setWin', {
						title: '提示',
						content: '请先选择卡的类型'
					});
					return false;
				}
				if (this.type == '1' && (!this.entityCard.selectCardType || !this.entityCard.selectCardType.cardId)) {
					this.$store.commit('setWin', {
						title: '提示',
						content: '请先选择卡的类型'
					});
					return false;
				}
				// 长度不符合
				if (this.type == '0') {
					if (!/^\d{8}$/.test(this.virtualCard.cardNo)) {
						this.virtualCard.validateNoLog = 2;
						return;
					}
					data = {
						cardId: this.virtualCard.selectCardType.cardId,
						memberCardId: this.virtualCard.memberCardId,
						number: this.virtualCard.cardNo,
						subShopId: this.selectShop.id ? this.selectShop.id : this.currentShop.shopId
					};
				} else {
					if (!/^\d{8}$/.test(this.entityCard.cardNo)) {
						this.entityCard.validateNoLog = 2;
						return;
					}
					data = {
						cardId: this.entityCard.selectCardType.cardId,
						memberCardId: this.entityCard.memberCardId,
						number: this.entityCard.cardNo,
						subShopId: this.selectShop.id ? this.selectShop.id : this.currentShop.shopId
					};
				}
				this.getAutoCardNumber(data);
			},
			async getCardType() {
				// 获取卡类型列表
				let res = await http.entitycardGetCardList({
					data: {
						subShopId: this.selectShop.id ? this.selectShop.id : this.currentShop.shopId
					}
				});
				this.cradTypeList = res; //获取卡类型列表
			},
			getCardNo: function () {
				let data = '';
				if (this.ischain == '3' && this.selectShop == '') {
					this.$store.commit('setWin', {
						title: '提示',
						content: '请先选择卡属门店'
					});
					return false;
				}
				if (this.type == '0' && (!this.virtualCard.selectCardType || !this.virtualCard.selectCardType.cardId)) {
					this.$store.commit('setWin', {
						title: '提示',
						content: '请先选择卡的类型'
					});
					return false;
				}
				if (this.type == '1' && (!this.entityCard.selectCardType || !this.entityCard.selectCardType.cardId)) {
					this.$store.commit('setWin', {
						title: '提示',
						content: '请先选择卡的类型'
					});
					return false;
				}
				if (this.type == '0') {
					data = {
						cardId: this.virtualCard.selectCardType.cardId,
						memberCardId: this.virtualCard.memberCardId,
						subShopId: this.selectShop.id ? this.selectShop.id : this.currentShop.shopId
					};
				} else {
					data = {
						cardId: this.entityCard.selectCardType.cardId,
						memberCardId: this.entityCard.memberCardId,
						subShopId: this.selectShop.id ? this.selectShop.id : this.currentShop.shopId
					};
				}
				this.getAutoCardNumber(data);
			},
			validataData: function () {
				// 有卡激活 会员信息不是必须得，但是必须要填正确
				if (this.type == '1') {
					if (this.entityCard.validateNoLog != 1) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '请先输入正确的卡编号'
						});
						return false;
					}
					if (this.entityCard.selectCardType === null) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '请选择实体卡的类型'
						});
						return false;
					}
					// 手机
					if (this.entityCard.consumerPhone && !/^1[3456789]\d{9}$/.test(this.entityCard.consumerPhone)) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '手机号码格式有误'
						});
						return false;
					}
					// 生日
					if (this.entityCard.consumerBirthday.length == 8) {
						if (!this.formatBirthday) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: '请输入正确的生日格式，正确的格式应该为4位的年份+2位的月份+2位的日期的连续八位数字'
							});
							return false;
						} else if (+new Date() < this.formatBirthday) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: '输入的生日不能大于当前时间,请不要调皮:D'
							});
							return false;
						}

					} else if (this.entityCard.consumerBirthday.length > 0) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '请输入正确的生日格式，正确的格式应该为4位的年份+2位的月份+2位的日期的连续八位数字'
						});
						return false;
					}
					// 姓名
					if (this.entityCard.consumerName && !/^([\u4E00-\u9FA5A-Za-z]+\s?)*$/.test(this.entityCard.consumerName)) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '姓名只能是中文和英文组成'
						});
						return false;
					}
					// 无卡激活，会员的补充信息必须填写
				} else if (this.type == '0') {
					if (this.virtualCard.validateNoLog != 1) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '请先输入正确的卡编号'
						});
						return false;
					}
					if (this.virtualCard.selectCardType === null) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '请选择实体卡的类型'
						});
						return false;
					}
					// 手机
					if (this.virtualCard.consumerPhone.length == 0) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '虚拟卡激活必须填写手机号码'
						});
						return false;
					} else if (!/^1[3456789]\d{9}$/.test(this.virtualCard.consumerPhone)) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '手机号码格式有误'
						});
						return false;
					}
					// 姓名
					if (!this.virtualCard.consumerName) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '虚拟卡激活必须输入姓名'
						});
						return false;
					} else if (!/^([\u4E00-\u9FA5A-Za-z]+\s?)*$/.test(this.virtualCard.consumerName)) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '姓名只能是中文和英文组成'
						});
						return false;
					}
					// 生日
					if (!this.formatBirthday) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '请输入正确的生日格式，正确的格式应该为4位的年份+2位的月份+2位的日期的连续八位数字'
						});
						return false;
					} else if (+new Date() < this.formatBirthday) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '输入的生日不能大于当前时间,请不要调皮:D'
						});
						return false;
					}
				}
				return true;
			},
			async activationCard() { // ---激活卡---
				if (!this.validataData()) return;
				// let _this = this;
				let data = '';
				if (this.type == '0') {
					//let
					data = {
						subShopId: this.selectShop.id ? this.selectShop.id : this.currentShop.shopId,
						memberCardId: this.virtualCard.memberCardId,
						cardKey: this.virtualCard.cardKey,
						cardId: this.virtualCard.selectCardType.cardId,
						number: parseInt(this.virtualCard.cardNo),
						mobile: this.virtualCard.consumerPhone,
						name: this.virtualCard.consumerName,
						gender: Number(this.virtualCard.genderType),
						birthday: this.formatBirthday / 1000 >> 0 // 去除毫秒取整
					};
				} else {
					//let
					data = {
						subShopId: this.selectShop.id ? this.selectShop.id : this.currentShop.shopId,
						memberCardId: this.entityCard.memberCardId,
						cardKey: this.entityCard.cardKey,
						cardId: this.entityCard.selectCardType.cardId,
						number: parseInt(this.entityCard.cardNo),
						mobile: this.entityCard.consumerPhone,
						name: this.entityCard.consumerName,
						gender: Number(this.entityCard.genderType),
						birthday: this.formatBirthday / 1000 >> 0 // 去除毫秒取整
					};
				}
				let res = await http.activateEntityCard({
					data: data
				});
				if (res == true) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '激活成功'
					});
				}
				window.location.reload();
			},
			async openCard() {
				// 获取卡编号
				let res = await http.entitycardOpenCard({
					data: {
						memberCardId: '',
						cardKey: '',
						subShopId: this.selectShop.id ? this.selectShop.id : this.currentShop.shopId
					}
				});
				if (res.memberCardId && res.cardKey) {
					this.virtualCard.memberCardId = res.memberCardId;
					this.virtualCard.cardKey = res.cardKey;
				}
			},
			async getAutoCardNumber(data) {
				// 获取卡编号
				let res = await http.getAutoCardNumber({
					data: data
				});
				if (this.type == '0') {
					this.virtualCard.cardNo = res; //获取卡的编号
					this.virtualCard.validateNoLog = 1;
				} else {
					this.entityCard.cardNo = res; //获取卡的编号
					this.entityCard.validateNoLog = 1;
				}
			},
		},
		mounted() {

			let userData = storage.session('userShop');
			// 单店使用
			let shop = [];
			let shopObj = {
				'shopId': userData.currentShop.id,
				'name': userData.currentShop.name,
				'shopNumber': userData.currentShop.shopNumber,
				'initCardNumber': 0,
				'num': 0
			};
			shop.push(shopObj);
			this.ischain = userData.currentShop.ischain;
			this.currentShop = (userData.currentShop.ischain == '0') ? shopObj : {};
			this.shopList = storage.session('shopList');
			if (this.ischain == '0') {
				this.getCardType();
				this.openCard();
			}

		},
		computed: {
			formatBirthday: function () {
				if (this.type == '0') {
					if (this.virtualCard.consumerBirthday.length == 8) {
						if ((this.virtualCard.consumerBirthday.toString()).indexOf('.') != -1) {
							this.$store.commit('setWin', {
								title: '操作提示',
								content: '请输入正确的生日格式，正确的格式应该为4位的年份+2位的月份+2位的日期的连续八位数字'
							});
							return;
						}
						let strArr = this.virtualCard.consumerBirthday.split('');
						let birthdayStr = strArr[0] + strArr[1] + strArr[2] + strArr[3] + '/' + strArr[4] + strArr[5] + '/' + strArr[6] +
							strArr[7];

						if (!Date.parse(birthdayStr)) {
							return 0;
						} else {
							console.log('生日' + birthdayStr + ':' + Date.parse(birthdayStr));
							return Date.parse(birthdayStr);
						}
					} else {
						return 0;
					}
				} else {
					if (this.entityCard.consumerBirthday.length == 8) {
						if ((this.entityCard.consumerBirthday.toString()).indexOf('.') != -1) {
							this.$store.commit('setWin', {
								title: '操作提示',
								content: '请输入正确的生日格式，正确的格式应该为4位的年份+2位的月份+2位的日期的连续八位数字'
							});
							return;
						}
						let strArr = this.entityCard.consumerBirthday.split('');
						let birthdayStr = strArr[0] + strArr[1] + strArr[2] + strArr[3] + '/' + strArr[4] + strArr[5] + '/' + strArr[6] +
							strArr[7];

						if (!Date.parse(birthdayStr)) {
							return 0;
						} else {
							console.log('生日' + birthdayStr + ':' + Date.parse(birthdayStr));
							return Date.parse(birthdayStr);
						}
					} else {
						return 0;
					}
				}
			}
		},
		components: {
			chooseCardType: () =>
				import( /*webpackChunkName: 'choose_cardType_win'*/ 'src/module/member_system/choose_cardType_win'),
			chooseStores: () =>
				import( /*webpackChunkName: 'card_stores_win'*/ 'src/module/member_system/card_stores_win'),
		}
	};
</script>
<style type="text/css" scoped>
	#card-activation {
		width: 100%;
		height: 100%;
	}

	#card-activation .containter {
		width: 1200px;
		height: auto;
	}

	#card-activation .containter .set-line {
		width: 1000px;
		height: 28px;
		line-height: 28px;
		border-left: 4px solid #28a8e0;
		margin: 15px 0 35px;
		position: relative;
	}

	#card-activation .containter .set-line .titles {
		float: left;
		margin-left: 12px;
		width: 80px;
		font-size: 16px;
		text-align: left;
	}

	#card-activation .containter .set-line .line {
		display: inline-block;
		width: 900px;
		border-bottom: 1px dashed #d9d9d9;
		margin-bottom: 5px;
	}

	#card-activation .containter .online-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 14px;
	}

	#card-activation .containter .online-box .belongshop {
		line-height: 40px;
	}

	#card-activation .containter .online-box .choicebtn {
		display: block;
		width: 211px;
		/* height: 40px; */
		text-align: center;
		/* line-height: 40px; */
		color: #fff;
		/* background: #2FA8DC; */
		margin-right: 11px;
	}

	#card-activation .containter .online-box .choice {
		line-height: 40px;
	}

	#card-activation .containter .online-box .online-sub {
		display: block;
		width: 120px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
	}

	#card-activation .containter .clearfix::before,
	#card-activation .containter .clearfix::after {
		display: table;
		content: “”;
	}

	#card-activation .containter .clearfix::after {
		clear: both;
	}

	#card-activation .containter .signa {
		background: #FFF3E5 !important;
		border: 1px solid #F8931F !important;
		color: #F9911E !important;
	}

	#card-activation .containter .online-box .way {
		float: left;
		display: block;
		width: 98px;
		height: 38px;
		border: 1px solid #999;
		margin-right: 15px;
		text-align: center;
		line-height: 38px;
		cursor: pointer;
		background: #fff;
	}

	#card-activation .containter .online-box input {
		text-indent: 25px;
		width: 209px;
		height: 38px;
		border: 1px solid #D2D2D2;
		margin-right: 8px;
	}

	#card-activation .containter .online-box .operation {
		line-height: 40px;
		color: #FF9200;
		text-decoration: underline;
	}

	#card-activation .containter .online-box .show {
		width: 816px;
		height: auto;
		border: 1px solid #D2D2D2;
		padding: 41px 0 0 78px;
	}

	#card-activation .containter .online-box .show .show-box {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-bottom: 18px;
	}

	#card-activation .containter .online-box .show .show-box span {
		width: 60px;
		height: 20px;
		text-align: right;
		line-height: 20px;
		margin-right: 24px;
	}

	#card-activation .containter .online-box .show .show-box .show-r {
		height: auto;
		line-height: 20px;
	}

	#card-activation .containter .online-box .show .show-box .p {}

	#card-activation .containter .online-box .show .show-box .enjoy {
		line-height: 20px;
		color: #FF9200;
	}

	#card-activation .containter .online-box .handle-tips {
		height: 40px;
		line-height: 20px;
		text-indent: 25px;
		background: url("../../res/images/handle-tips.png") 0 0 no-repeat;
		color: #999999;
	}

	#card-activation .containter .online-box .delete,
	#card-activation .containter .online-box .save {
		float: left;
		width: 210px;
		/* height: 50px; */
		margin-right: 10px;
		text-align: center;
		/* line-height: 50px; */
		color: #fff;
	}

	/*验证成功或者失败的小圆点*/
	#card-activation .containter .online-box .Correct {
		display: inline-block;
		float: left;
		width: 20px;
		height: 20px;
		margin: 10px 0 0 7px;
		border-radius: 50%;
	}

	#card-activation .containter .online-box .Correct.complete {
		background-image: url('../../res/images/validate-complete.png');
	}

	#card-activation .containter .online-box .Correct.err {
		width: 14px;
		height: 14px;
		margin-top: 15px;
		background-image: url('../../res/images/validate-err.png');
	}

	/* 读卡模式的样式 */

	#card-activation .containter .readCard {
		height: 400px;
		padding: 20px;
		margin-left: 134px;
		width: 400px;
		border-radius: 10px;
		border: 1px solid #f39900;
		background-color: #fefef3;
	}

	#card-activation .containter .readCard .readBox {
		text-align: center;
	}

	#card-activation .containter .readCard .readBox p {
		line-height: 35px;
		font-weight: 700;
		margin: 10px 0;
	}

	#card-activation .containter .readCard .readInfo {
		color: #666;
		font-size: 20px;
	}

	#card-activation .containter .readCard .readMes {
		background-color: #f8f8f8;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		color: #f66;
	}

	/*#card-activation .containter .online-box .sendcode{
	display: inline-block;
	width: 125px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	background: #2FA8DC;
	color: #fff;
	}*/

	.cardType span,
	.shopList span {
		display: inline-block;
		color: #333;
		min-width: 100px;
		text-align: center;
		line-height: 38px;
		height: 38px;
		border: 1px solid #D2D2D2;
		margin-right: 10px;
		margin-bottom: 10px;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.cardType span.sign,
	.shopList span.sign {
		color: #FF9200;
		border: 1px solid #FF9200;
	}

	.cardType span:hover,
	.shopList span:hover {
		background-color: #FFFFFF;
	}

	@media screen and (min-width:1024px) and (max-width:1440px) {
		#card-activation .containter {
			width: 100%;
			height: auto;
		}

		#card-activation .containter .set-line {
			width: 100%;
			height: 28px;
			line-height: 28px;
			border-left: 4px solid #28a8e0;
			margin: 15px 0 35px;
			position: relative;
		}

		#card-activation .containter .set-line .line {
			display: inline-block;
			width: 88%;
			border-bottom: 1px dashed #d9d9d9;
			margin-bottom: 5px;
			position: absolute;
			top: 14px;
			margin-left: 1%;
		}
	}
</style>