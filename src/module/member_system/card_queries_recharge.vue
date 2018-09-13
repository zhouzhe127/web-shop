<!--
    **实体卡查询——卡查询--批量修改余额
    *
    * 胡江
    * *
    *
-->
<template>
	<win @winEvent="clickResult" :align="'center'" :width="801" :height="400">
		<!--标题-->
		<span slot="title"> 批量修改余额 </span>
		<!--内容-->
		<div slot="content">
			<div class="modifyBalance" id="recharges">
				<div class="choice">
					当前已经选中
					<span v-for="(item,index) in cardList" :key="index">
						<span>{{item.number}}张</span>{{item.cardTypeId}}
					<template v-if="index != cardList.length -1">
						,
					</template>
					</span>
				</div>
				<!-- 修改方案 -->
				<div class="modifyBox">
					<div class="leftHalf required">
						修改方案
					</div>
					<div class="rightHalf compared">
						<span v-for="(item,index) in payWays" :key="index" @click="changeRadio(item)" :class="{'effect':payType==item.id}">{{item.name}}</span>
					</div>
				</div>
				<!-- 批量修改余额至 -->
				<div class="modifyBox">
					<div class="leftHalf required">
						{{showTip}}
					</div>
					<div class="rightHalf">
						<input type="text" class="txt" placeholder="请输入金额" v-model="amount" maxlength="5" />
					</div>
					<span class="fl" style="line-height: 40px;">元</span>
				</div>
				<!-- 原因 -->
				<div class="modifyBox" style="margin-bottom: 0;">
					<div class="leftHalf">
						原因
					</div>
					<div class="rightHalf">
						<textarea class="text fl" v-model="behavior" placeholder="请输入变动原因" maxlength="30"></textarea>
					</div>
				</div>
				<!-- 备注 -->
				<div class="modifyBox" style="margin-bottom: 0;">
					<div class="leftHalf">
					</div>
					<div class="rightHalf handle-tips">
						<i></i> 最佳10个字,最多30个字,在余额详情显示
					</div>
				</div>
				<div class="modifyBox">
					<div class="leftHalf">
						备注
					</div>
					<div class="rightHalf">
						<textarea class="text fl" v-model="remark" placeholder="操作余额备注" maxlength="30"></textarea>
					</div>
				</div>
			</div>
		</div>
	</win>
</template>
<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			amount: '', //批量修改的金额
			behavior: '', //原因
			remark: '', //备注
			cardList: [],
			cardId: '',
			regu: /^[0-9]\d*$/,
			payWays: [{
				id: 0,
				name: '批量修改余额',
				tip: '批量修改余额至'
			},
			{
				id: 1,
				name: '批量充值余额',
				tip: '批量充值'
			}, {
				id: 2,
				name: '批量减少余额',
				tip: '批量减少'
			}
			], //类型
			payType: 0, //批量选中的
			showTip: '批量修改余额至' //显示
		};
	},
	props: {
		userData: Object,
		selectedList: Array,
		cardTypeList: Array
	},
	mounted() {
		this.cardList = this.parseBrr(this.selectedList);
		this.cardId = this.getcardId(this.selectedList);
	},
	methods: {
		clickResult(res) {
			if (res == 'ok') {
				if (this.amount.trim() == '') {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '请填写修改余额'
					});
					return false;
				}
				if (!this.regu.test(this.amount)) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '余额为正整数'
					});
					return false;
				}
				this.changeBalance(res); //批量修改余额
			} else {
				this.$emit('throwWinResult', res); //抛出一个事件给父组件
			}
		},
		parseBrr(arr) {
			let nameArr = [];
			let result = [];
			let that = this;
			arr.forEach(function(item) {
				let i;
				if ((i = nameArr.indexOf(item.cardTypeId)) > -1) {
					result[i].number = Number(result[i].number) + Number(item.num);
				} else {
					nameArr.push(item.cardTypeId);
					result.push({
						cardTypeId: that.getcardName(item.cardTypeId),
						number: item.num
					});
				}
			});
			return result;
		},
		//获取卡类型的名称
		getcardName(id) {
			let cardname;
			for (let i = 0; i < this.cardTypeList.length; i++) {
				if (id == this.cardTypeList[i].id) {
					cardname = this.cardTypeList[i].name;
				}
			}
			return cardname;
		},
		//获取向后端发送的卡id
		getcardId(arr) {
			let id = '';
			for (let i = 0; i < arr.length; i++) {
				id += arr[i].id + ',';
			}
			return id.substring(0, id.length - 1);
		},
		//批量修改金额
		async changeBalance(backRes) {
			let res = await http.changeAmountAndPoint({
				data: {
					amount: Number(this.amount), //修改余额
					memberCardIds: this.cardId, //卡的id
					behavior: this.behavior, //原因
					remark: this.remark, //备注
					type: this.payType //充值类型
				}
			});
			if (res == true) {
				this.$emit('throwWinResult', backRes); //抛出一个事件给父组件
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '批量修改成功！'
				});
			}else{
				this.exportFailCard(res);
				this.$emit('throwWinResult', backRes); //抛出一个事件给父组件
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '此次批量减少余额由于部分卡余额不足,扣款失败.扣款失败的卡片详情已下载.'
				});
			}
		},
		async exportFailCard(id) {//下载失败人数
			await http.exportFailCard({
				data: {
					memberCardIds: id
				}
			});
		},
		changeRadio: function(item) {
			//选择渠道
			let id = item.id;
			this.payType = id;
			this.showTip = item.tip;
			//this.getStatistics();
		},
	},
	components: {
		win: () =>
			import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
	}
};
</script>
<style type="text/css" scoped>
.modifyBalance {
	margin: 20px 0 0 34px;
	box-sizing: border-box;
}

.modifyBalance .choice {
	width: 100%;
	height: 40px;
	line-height: 40px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-bottom: 15px;
}

.modifyBalance .choice span {
	color: #F69337;
}

.modifyBalance .modifyBox {
	width: 100%;
	height: auto;
	overflow: hidden;
	margin-bottom: 18px;
}

.modifyBalance .modifyBox .leftHalf {
	width: 113px;
	height: 40px;
	text-align: right;
	line-height: 40px;
	float: left;
	margin-right: 12px;
}

.modifyBalance .modifyBox .rightHalf {
	width: auto;
	height: auto;
	float: left;
}

.modifyBalance .modifyBox .rightHalf .txt {
	width: 217px;
	height: 38px;
	border: 1px solid #D2D2D2;
	text-indent: 17px;
	margin-right: 6px;
	outline: none;
}

.modifyBalance .modifyBox .rightHalf .text {
	width: 452px;
	height: 68px;
	box-sizing: border-box;
	text-indent: 17px;
	resize: none;
	padding: 7px;
	border: 1px solid #D2D2D2;
	outline: none;
}

.modifyBalance .modifyBox .handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 25px;
	background: url("../../res/images/handle-tips.png") 0 center no-repeat;
	color: #999999;
}

.modifyBalance .modifyBox .compared .effect {
	background-color: #28a8e0;
	color: #ffffff;
}

.modifyBalance .modifyBox .compared span {
	width: 120px;
	height: 40px;
	display: inline-block;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	background-color: #f2f2f2;
	border-radius: 4px;
	margin-right: 15px;
}
</style>