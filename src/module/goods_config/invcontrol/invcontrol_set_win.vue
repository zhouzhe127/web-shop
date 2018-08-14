<template>
	<div>

		<win :align="'center'" :width="winWidth" :height="200" @winEvent="closeSelfWin">
			<!--库存设置表单-->
			<span slot="title">库存设置</span>
			<section slot="content" id="invcontro_win" class="lContForm">
				<section v-if="good.isGroup==0">
					<section class="group">
						<div class="oBox">
							<span style="margin-right: 10px;">库存</span>
							<input style="margin-right: 20px;width:120px;" maxlength="9" type="text" placeholder="输入库存数量" v-model="groupData[0].goodsNum" />
							<span style="margin-right: 10px;">库存预警</span>
							<input style="margin-right: 20px;width:120px;" placeholder="输入库存预警数量" type="text" maxlength="9" v-model="groupData[0].goodsThreshold" />
						</div>
						<div v-if="good.type == '0'" class="oBox">
							<div style="margin-right: 10px;float:left;">每日限售</div>
							<div style="margin-right: 10px;float:left;">
								<span :class="{'check-span off':groupData[0].isLimit=='0','check-span on':groupData[0].isLimit=='1'}" v-on:click="onLimit(groupData[0])"></span>
							</div>
							<input v-show="groupData[0].isLimit=='1'" style="width:120px;float:left;margin-top:5px;" type="text" maxlength="9" placeholder="每日限售数量" v-model="groupData[0].limitNum" />
							<div v-show="groupData[0].isLimit=='1'&&groupData[0].oldisLimit=='1'" class="gray ret" @click="reset(groupData[0])">余量重置</div>
						</div>
					</section>
				</section>

				<section v-if="good.isGroup==1">
					<section v-for="(item,index) in groupData" :key="index">
						<section class="group">
							<div class="aBox" style="width:146px;">
								<span class="aSpan" v-if="index === 0">规格一：</span>
								<span class="aSpan" v-if="index === 1">规格二：</span>
								<span class="aSpan" v-if="index === 2">规格三：</span>
								<span class="aSpan" style="width:80px;" :title="item.goodsName">{{item.goodsName | hide}}</span>
							</div>
							<div class="aBox" style="width: 240px;">
								<span style="margin-right: 10px;">库存</span>
								<input style="margin-right: 20px;" maxlength="9" type="text" v-model="item.goodsNum" />
								<span style="margin-right: 10px;">库存预警</span>
								<input type="text" maxlength="9" v-model="item.goodsThreshold" />
							</div>
							<div v-if="good.type == '0'" class="aBox" style="width:370px;">
								<div style="margin-right: 10px;float:left;">每日限售</div>
								<div style="margin-right: 10px;float:left;">
									<span class="check-span" :class="{off:item.isLimit=='0',on:item.isLimit=='1'}" v-on:click="onLimit(item)"></span>
								</div>
								<input v-show="item.isLimit=='1'" style="width:100px;float:left;margin-top:5px;" type="text" maxlength="9" placeholder="每日限售数量" v-model="item.limitNum" />
								<div v-show="item.isLimit=='1'&&item.oldisLimit=='1'" class="gray ret" @click="reset(item)">余量重置</div>
							</div>

						</section>
					</section>
				</section>
			</section>
		</win>

	</div>
</template>
<script>
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
export default {
	data() {
		return {
			shopId: null,
			gid: null, //商品id
			good: {}, //编辑的商品
			groupData: [{}], //存储库存数据
			copyData: null, //grooupData的副本
			winWidth: 800,//弹窗宽度
			isOpen:false
		};
	},
	props: {
		pObj: Object
		/*
				单个商品对象
			*/
	},
	methods: {
		//重置限售商品
		reset(item) {
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确认重置“' + item.goodsName + '”今日限购余量?',
				callback: res => {
					if (res == 'ok') {
						this.newRe(item);
					}
				}
			});
		},
		async newRe(item) {
			let isture = await http.resetLimitNum({
				data: {
					gid: item.gid
				}
			});
			if (isture) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					content: '限购商品“' + item.goodsName + '”重置成功!'
				});
			}
		},
		//限售开关
		onLimit(item) {
			item.isLimit = item.isLimit=='0'?'1':'0';
		},
		//返回true表示校验合格
		checkForm() {
			let flag = false;
			flag = this.groupData.some(ele => {
				let goodsNum = ele.goodsNum;
				let limitNum = ele.limitNum;
				let goodsThreshold = ele.goodsThreshold;
				if (!goodsNum) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '请输入库存数量!'
					});
					return true;
				}

				let regNum = null;
				let content = null;
				if (this.good.type == 1) {
					regNum = /(^[1-9]\d*(\.\d{0,2})?$)|(^0\.\d{0,2}$)/;
					content = '库存数和库存预警为数字!';
				} else {
					regNum = /^[1-9]\d{0,}$/g;
					content = '商品库存和库存预警为整数且不能为0!';
				}
				
				if (!regNum.test(goodsNum)) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: content
					});
					return true;
				}
				
				if (goodsThreshold) {
					if (this.good.type == 1) {
						regNum = /(^[1-9]\d*(\.\d{0,2})?$)|(^0\.\d{0,2}$)/;
						content = '库存数和库存预警为数字!';
					} else {
						regNum = /^[1-9]\d{0,}$/g;
						content = '商品库存和库存预警为整数且不能为0!';
					}

					if (!regNum.test(ele.goodsThreshold)) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: content
						});
						return true;
					}
				}
				let reglimitNum = /^[1-9]\d{0,}$/g;
				if(ele.isLimit == '1'&&!reglimitNum.test(limitNum)){
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '开启限售，每日限售数量只能为整数!'
					});
					return true;
				}
			});

			if (flag) return false;

			flag = this.groupData.some(ele => {
				let goodsThreshold = ele.goodsThreshold;
				if (!ele.goodsThreshold) goodsThreshold = 0;
				if (parseInt(ele.goodsNum) <= parseInt(goodsThreshold)) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '库存数量不能小于预警数量!'
					});
					return true;
				}
			});
			if (flag) return false;
			return true;
		},
		//返回需要提交的数据
		formarData() {
			// [{'gid':'6570','shopId':'61','goodsNum':'10','goodsThreshold':'1','isWarn':'0'},{'gid':'6571','shopId':'61','goodsNum':'10','goodsThreshold':'1','isWarn':'0'}]
			// inventoryData:[{'gid':'3873','shopId':'61','goodsNum':'3','goodsThreshold':'2','isWarn':'0'}]
			let arr = [];
			if (this.good.isGroup == 0) {
				let obj = {
					gid: this.groupData[0].gid,
					shopId: this.groupData[0].shopId,
					goodsNum: this.groupData[0].goodsNum,
					goodsThreshold: this.groupData[0].goodsThreshold,
					isWarn: this.groupData[0].isWarn,
					isLimit: Number(this.groupData[0].isLimit),
					limitNum: this.groupData[0].limitNum
				};
				arr.push(obj);
			} else {
				this.groupData.forEach(ele => {
					let obj = {
						gid: ele.gid,
						shopId: ele.shopId,
						goodsNum: ele.goodsNum,
						goodsThreshold: ele.goodsThreshold,
						isWarn: ele.isWarn,
						isLimit: Number(ele.isLimit),
						limitNum: ele.limitNum
					};
					arr.push(obj);
				});
			}
			return arr;
		},
		//返回true表示数据没有发生更改
		// checkCopy() {
		// 	let flag = true;
		// 	for (let i = 0, len = this.groupData.length; i < len; i++) {
		// 		let arr = this.groupData[i];
		// 		let arr2 = this.copyData[i];
		// 		if ((arr.goodsNum != arr2.goodsNum) || (arr.goodsThreshold != arr2.goodsThreshold)) {
		// 			flag = false;
		// 			break;
		// 		}
		// 	}
		// 	return flag;
		// },
		//获取弹框的点击结果
		closeSelfWin(res) {
			if (res == 'ok') {
				if (!this.checkForm()) return;
				// if (this.checkCopy()) {
				// 	this.$emit('throwInvcontrolWin', 'same');
				// } else {
				let data = this.formarData();
				this.InventorySet(data).then(result => {
					if (result)
						this.$emit(
							'throwInvcontrolWin',
							'edit',
							this.groupData
						);
				});
				// }
				return;
			}
			this.$emit('throwInvcontrolWin', 'close');
		},
		//初始化groupData
		initGroupData(res) {
			if (res) {
				if (res[0] && res[0].gid) {
					this.groupData = [];
					this.groupData = res;
					this.groupData = this.groupData.map(ele => {
						ele.oldisLimit = ele.isLimit?ele.isLimit:'0';
						ele.isLimit = ele.isLimit?ele.isLimit:'0';
						ele.limitNum = parseInt(ele.limitNum);
						if (ele.goodsNum == 0) ele.goodsNum = '';
						if (ele.goodsThreshold == 0) ele.goodsThreshold = '';
						return ele;
					});
				} else {
					this.groupData = [];
					let obj = {
						goodsNum: '',
						goodsThreshold: '',
						isLimit: '0',
						limitNum: '',
						oldisLimit:'0'
					};
					this.groupData.push(obj);
				}
				let temp = JSON.stringify(this.groupData);
				this.copyData = JSON.parse(temp);
			}
		},
		//初始化数据
		initData() {
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
			this.gid = this.pObj.good.id;
			this.good = this.pObj.good;
		},
		//获取库存
		async InventoryGet() {
			let res = await http.InventoryGet({
				data: {
					shopId: this.shopId,
					gid: this.good.id
				}
			});
			return res;
		},
		//设置库存
		async InventorySet(obj) {
			let res = await http.InventorySet({
				data: {
					inventoryData: JSON.stringify(obj),
					shopId: this.shopId,
					id: this.gid //是否需要??
				}
			});
			return res;
		}
	},
	mounted() {
		this.initData();
		this.InventoryGet().then(res => {
			this.initGroupData(res);
		});
		if (this.good.isGroup == 0) {
			this.winWidth = 500;
		} else {
			this.winWidth = 800;
		}
	},
	components: {
		win: () => import(/* webpackChunkName:'win' */ 'src/components/win'),
		onOff: () =>
			import(/*webpackChunkName:'on_off'*/ 'src/components/on_off')
	},
	filters: {
		hide: val => {
			let temp = val + '';
			if (temp.length < 6) {
				return temp;
			} else {
				return temp.slice(0, 6) + '...';
			}
		}
	}
};
</script>
<style lang="less" scoped>
#invcontro_win {
	// width: 450px;
	height: 200px;
	padding: 20px;
	.group {
		width: 100%;
		margin-bottom: 20px;
		height: 40px;
		input {
			width: 50px;
			height: 30px;
			padding-left: 10px;
		}
		.ret {
			width: 80px;
			float: left;
			height: 40px;
			line-height: 40px;
			text-align: center;
			color: #e3e3e3;
			margin-left: 20px;
		}
		.oBox {
			width: 100%;
			height: 40px;
			margin: 20px;
			line-height: 40px;
		}
		.aBox{
			width: 120px;float:left;line-height:40px;
			.aSpan{
				display: inline-block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	.stock-container {
		margin-bottom: 10px;
		width: 100%;
		.stock {
			width: 30%;
			height: 40px;
			line-height: 40px;
			text-align: center;
		}
	}
	.warn-container {
		margin-bottom: 10px;
		width: 100%;
		.a {
			width: 30%;
			height: 40px;
			line-height: 40px;
			text-align: center;
		}
	}
}
</style>