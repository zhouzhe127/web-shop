<template>
	<Win @winEvent='winEvent' :width='800' :height='700'>
		<span slot='title'>会员详情</span>
		<div class="member-details" id="details" slot='content'>
			<div class="details-head">
				<div class="head-child">
					<span>手机号码：{{mobile}}</span>
					<span v-if="gender == 1">性别：男</span>
					<span v-if="gender == 2">性别：女</span>
					<span>生日：{{birthday}}</span>
				</div>
				<div class="head-child">
					<span>会员姓名：{{name}}</span>
					<span>年龄：{{age}}</span>
					<span>注册时间：{{createTime}}</span>
				</div>
				<div class="head-child">
					<span class='text-over'>会员等级：{{levelName}}</span>
					<span>余额：{{amount}}</span>
					<span>
						<a href="javascript:void(0)" class="blue recharge-btn fr" @click="lookRecharge">充值</a>
					</span>
				</div>
			</div>
			<div class="details-tit">
				<h2>消费记录</h2>
			</div>
			<div class="details-Conent">
				<div class="details-Conent-head">
					<span style="width: 40%;">操作日期</span>
					<span>操作金额</span>
					<span>操作状态</span>
					<span>余额</span>
				</div>
				<div class="details-box" v-if="consumeList.length >= 1" v-for="(consume,i) in consumeList" :key='i'>
					<!-- <div v-if="consume.type ==1 || consume.type == 2"> -->
					<span style="width: 40%;">{{consume.createTime}}</span>
					<span>{{countInfo(consume)}}</span>
					<span>{{typeObj[consume.type]}}</span>
					<span>{{consume.amount}}</span>
					<!-- </div> -->
				</div>
				<page :total='total' :page="pages" @pageNum='changePage' :isNoPaging="true" v-if="total >= 2"></page>
				<div class="details-box" v-if="consumeList.length <= 0" style="text-align: center;">
					<h2 style="font-size: 16px;color: #999;">暂无消费记录!</h2>
				</div>
			</div>
		</div>
	</Win>
	<!--查看详情-->

</template>
<script>
	import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';
	import http from 'src/manager/http';


	export default {
		props: {
			gid: [Number, String],
			shopsId: [Number, String]
		},
		data() {
			return {
				pages: 1, // 页码
				consumeList: [],
				total: null,
				count: null,
				mobile: '',
				gender: '',
				name: '',
				levelName: '',
				birthday: '',
				amount: '',
				age: null,
				createTime: null,
				mid: null,
				typeObj: {
					1: '店内消费',
					2: '充值',
					3: '积分商城兑换',
					4: '消费获得积分',
					5: '裂变获得积分',
					6: '微信消费',
					9: '积分抵扣',
					10: '积分强制增加',
					11: '积分强制减少',
					12: '余额强制增加',
					13: '余额强制减少',
					14: '退款失败',
					15: '卡激活'
				}
			};
		},
		methods: {
			countInfo(item) {
				return ((item.type | 0) % 2 == 0 ? '+' : '-') + item.operateAmount;
			},
			winEvent() {
				this.$emit('winEvent', 'close');
			},
			changePage(obj) {
				this.pages = obj.page;
				this.getdetailList(this.mid);
			},
			async getdetailList(mid) {

				let data = await http.getRecordList({
					data: {
						mid: mid,
						page: this.pages,
						num: 7,
						shopId: this.shopsId == undefined ? storage.session('userShop').currentShop.id : this.shopsId,
						shopsId: this.shopsId == undefined ? storage.session('userShop').currentShop.id : this.shopsId
					}
				});

				let arr = [];
				this.consumeList = data.list;
				for (let i = 0; i < this.consumeList.length; i++) {
					this.consumeList[i].createTime = utils.format(this.consumeList[i].createTime, 'yyyy-MM-dd hh:mm:ss');
					this.consumeList[i].operateAmount = Number(this.consumeList[i].operateAmount);
					this.consumeList[i].operateGiftAmount = Number(this.consumeList[i].operateGiftAmount);
					// 判断数据类型 type等于1为消费 type等于2为充值
					// if( this.consumeList[i].type == '1' ||  this.consumeList[i].type == '2'){
					arr.push(this.consumeList[i]);
					// }
				}
				this.consumeList = arr;
				this.total = data.total;
				this.count = data.count;

			},
			lookRecharge() {
				this.$emit('winEvent', 'recharge');
			},
			async getMemberDetail() {
				let data = await http.getMemberDetail({
					data: {
						mid: this.gid,
						//shopId 和shopsId 必须要去掉
						shopId: this.shopsId == undefined ? storage.session('userShop').currentShop.id : this.shopsId,
						shopsId: this.shopsId == undefined ? storage.session('userShop').currentShop.id : this.shopsId
					}
				});
				this.mobile = data.mobile;
				this.gender = data.gender;
				this.amount = data.totalAmount;
				this.name = data.name;
				this.levelName = data.levelName;
				this.birthday = data.birthday;
				this.age = data.age;
				this.mid = data.memberId;
				this.createTime = utils.format(data.createTime, 'yyyy-MM-dd');

				this.getdetailList(this.mid);



			}
		},
		mounted() {
			this.getMemberDetail();
		},
		components: {
			page: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			Win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win')
		}
	};
</script>
<style scoped>
	.member-details {
		height: 700px;
		width: 800px;
		overflow: hidden;
	}

	.details-head {
		padding: 10px;
		padding-bottom: 0;
		width: 100%;
		height: 170px;
		border-bottom: 10px solid #e6e6e6;
	}

	.head-child,
	.details-tit {
		height: 50px;
		line-height: 50px;
		width: 100%;
	}

	.head-child:nth-child(2) {
		border-bottom: 1px solid #F2DEDE;
	}

	.head-child span {
		width: 33.33%;
		height: 50px;
		float: left;
	}

	.head-child input {
		padding-left: 10px;
		border: 1px solid #C6C6C6;
		outline: none;
		color: #666;
		height: 46px;
		width: 150px;
	}

	.head-child span:nth-child(1n) {
		padding-left: 20px;
	}

	.head-child span:nth-child(2n) {
		text-align: left;
		text-indent: 50px;
	}

	.head-child span:nth-child(3n) {
		padding-right: 20px;
		text-align: right;
	}

	.recharge-btn {
		height: 40px;
		line-height: 40px;
		margin-top: 5px;
	}

	.details-tit {
		text-align: center;
	}

	.details-tit h2 {
		position: relative;
		left: 50%;
		margin-left: -50px;
		font-size: 16px;
		width: 100px;
		height: 50px;
	}

	.manage-Conent,
	.details-Conent {
		width: 100%;
		height: auto;
		line-height: 50px;
		overflow: hidden;
	}

	.conent-head,
	.concent-tip,
	.details-Conent-head {
		height: 50px;
		width: 100%;
		background-color: #e6e6e6;
		text-align: center;
	}

	.conent-head span,
	.member-manage-box span,
	.details-Conent span {
		display: inline-block;
		width: 10%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		float: left;
	}

	.details-Conent span {
		width: 20%;
	}

	.concent-tip {
		background-color: #f2f2f2;
		font-size: 14px;
		color: #7f7f7f;
	}

	.main-concent div,
	.details-Conent div {
		height: 50px;
		line-height: 50px;
		width: 100%;
	}

	.details-tit h2:after,
	.details-tit h2:before {
		content: '';
		position: absolute;
		top: 50%;
		width: 10px;
		height: 10px;
		background-color: #000000;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		transform: translate(-50%, 0);
		/* IE 9 */
		-ms-transform: translate(-50%, -50%);
		/* Firefox */
		-moz-transform: translate(-50%, -50%);
		/* Safari 和 Chrome */
		-webkit-transform: translate(-50%, -50%);
		/* Opera */
		-o-transform: translate(-50%, -50%);
	}

	.details-tit h2:after {
		right: -5px;
	}

	.details-tit h2:before {
		left: 5px;
	}

	.main-concent .member-manage-box:nth-child(odd),
	.details-box:nth-child(odd) {
		background-color: #f2f2f2;
	}

	.main-concent .member-manage-box:nth-child(even),
	.details-box:nth-child(even) {
		background-color: #FFFFFF;
	}
</style>