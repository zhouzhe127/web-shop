<!-- *余额调整记录详情
	 *
	 *miaochuan.sha
	 *
	 * -->
<template>
	<div id="membercard">
		<section v-if="isShow == 'all'">
			<!-- 条件筛选 -->
			<div class="filter clearfix">
				<span>选择时间:{{formatTime(conditions.startTime)}}</span>
				<span>卡种类:{{conditions.cardType}}</span>
				<span>条件:{{conditions.addOreduce}}</span>
				<span>调整结果:{{conditions.result}}</span>
			</div>
			<!-- 表格一 -->
			<section style="margin-bottom:20px;">
				<com-table :listHeight='80' :listWidth="1000" :showHand="false" :titleData="titleList" :introData="staticLists" :widthType='false'>
				</com-table>
			</section>
			<!-- 表格2 -->
			<com-table :listWidth="1470" :listHeight='80' :listName="'调整记录'" :key="index" :showTitle='1' :introData="userList" :titleData="titleList_l" :allTotal="total">
				<div slot="con-0" slot-scope="props" class="operate_worker">
					{{formatTime(props.data.createTime)}}
				</div>
				<div slot="con-1" slot-scope="props">
					<span class="operate_worker" v-if="props.data.memberCardId == '0'">电子卡</span>
					<span class="operate_worker" v-else>实体卡</span>
				</div>
				<div slot="con-3" slot-scope="props" @click="openDetail(props.data)">
					<span class="operate_worker" v-if="props.data.memberCardId == '0'">{{props.data.mobile}}</span>
					<span class="operate_worker" v-else>{{props.data.cardNumber}}</span>
				</div>
				<div slot="con-4" slot-scope="props">
					<span class="operate_worker" v-if="conditions.type == '0'">{{judgeType(props.data)}}{{props.data.operateAmount}}</span>
					<span class="operate_worker" v-else>{{judgeType(props.data)}}{{props.data.operatePoint}}</span>
				</div>
				<div slot="con-5" slot-scope="props" class="operate_worker">
					{{getStatus(props.data)}}
				</div>
				<div slot="con-6" slot-scope="props" class="remark">
					<span v-if="props.data.remark == ''">暂无备注</span>
					<span v-else>{{props.data.remark}}</span>
				</div>
			</com-table>
			<!-- 翻页 -->
			<section class="turn-page">
				<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section>
		</section>
		<!-- 卡号详情实体卡 -->
		<cardDetail v-if="isShow == 'detail'" @throwWinResult="getDetail" :cardNumber="cardNumber"></cardDetail>
		<!-- 会员信息详情电子卡 -->
		<memberDetail v-if="isShow == 'member'" :mid='mid' :shopsId='shopsId' @throwWinResult="getDetail"></memberDetail>
	</div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
let amount_h = [{
	titleName: '天数',
	dataName: 'days'
},
{
	titleName: '总增加余额',
	dataName: 'actualAdd'
},
{
	titleName: '总减少余额 ',
	dataName: 'actualReduce'
}
];
let point_h = [{
	titleName: '天数',
	dataName: 'days'
},
{
	titleName: '总增加积分',
	dataName: 'actualAdd'
},
{
	titleName: '总减少积分 ',
	dataName: 'actualReduce'
}
];
let amount_b = [{
	titleName: '时间',
	titleStyle: {
		width: '200px',
		flex: 'none',
	}
}, {
	titleName: '卡种类'
}, {
	titleName: '姓名 ',
	dataName: 'name'
}, {
	titleName: '卡号',
	dataName: 'cardNumber',
	titleStyle: {
		width: '250px',
		flex: 'none',
	},
	conStyle: {
		color: '#27a8e0',
		cursor: 'pointer'
	}
}, {
	titleName: '操作余额'
}, {
	titleName: '调整结果',
	dataName: 'reduceFail'
}, {
	titleName: '备注',
	dataName: 'remark',
	titleStyle: {
		width: '350px',
		flex: 'none',
		overflow: 'visible',
		whiteSpace: 'normal',
		textOverflow: 'clip'
	}
}, {
	titleName: '操作人',
	dataName: 'staffName'
}];
export default {
	data() {
		return {
			index: null,
			page: 1, //页数
			total: 0, //记录条数
			num: 10, //一页请求的数量
			endTotal: 0,
			titleList: [],
			staticLists: [], //表格一的数据
			titleList_l: [],
			userList: [], //列表二的数据
			result: {
				'1': '店内消费',
				'2': '店内充值',
				'3': '积分商城兑换',
				'4': '消费获得积分',
				'5': '裂变获得积分',
				'6': '微信消费',
				'7': '微信充值',
				'8': '积分过期',
				'9': '积分抵扣',
				'10': '积分调整',
				'11': '积分调整',
				'12': '余额调整',
				'13': '余额调整',
				'14': '退款失败',
				'15': '卡激活',
				'16': '金币记录',
				'17': '积分卡券'
			},
			isShow: 'all',
			cardNumber: '',
			mid: '',
			shopsId: ''
		};
	},
	props: {
		conditions: Object //筛选条件
	},
	methods: {
		getPageNum: function(obj) { //翻页
			this.page = obj.page;
			this.num = obj.num;
			this.adjustRecord();
		},
		setTitle: function() { //设置标题
			this.$store.commit('setPageTools', [{
				name: '返回',
				className: ['fd-white'],
				fn: () => {
					this.returnStore();
				}
			},
			{
				name: '导出',
				className: ['fd-blue'],
				fn: () => {
					this.Export();
				}
			}
			]);
		},
		async adjustRecord() {
			let data = await http.adjustRecord({
				data: {
					startTime: parseInt(this.conditions.startTime / 1000), //开始时间
					endTime: parseInt(this.conditions.endTime / 1000), //结束时间
					type: this.conditions.type, //类型
					cardTypeId: this.conditions.cardTypeId, //卡种类
					isAdd: this.conditions.isAdd, //条件
					result: this.conditions.resultId,
					isDetail: 1, //是否查看详情
					page: this.page,
					num: this.num,
					export: 0
				}
			});
			if (data) {
				if (this.page == 1) {
					this.total = data.count;
					this.endTotal = data.total;
					this.staticLists = [];
					data.statistic.days = data.days;
					this.staticLists.push(data.statistic);
				}
				this.userList = data.consumeList;
			}
		},
		formatTime(time) {
			if (time.length == 10) {
				time *= 1000;
			}
			return utils.format(new Date(time), 'yyyy-MM-dd');
		},
		returnStore: function() {
			this.$store.commit('setPageTools', {});
			this.$emit('throwWinResult', false);
		},
		//子组件返回的事件
		getDetail() { //从卡详情返回回来
			this.isShow = 'all';
			this.setTitle();
		},
		openDetail: function(item) { //点击查看详情
			if (item.cardNumber == '') {
				this.isShow = 'member';
				this.mid = item.memberId;
				this.shopsId = item.shopId;
			} else {
				this.cardNumber = item.cardNumber;
				this.isShow = 'detail';
			}
		},
		async Export() {
			await http.ExportadjustRecord({
				data: {
					startTime: parseInt(this.conditions.startTime / 1000), //开始时间
					endTime: parseInt(this.conditions.endTime / 1000), //结束时间
					type: this.conditions.type, //类型
					cardTypeId: this.conditions.cardTypeId, //卡种类
					isAdd: this.conditions.isAdd, //条件
					result: this.conditions.resultId,
					isDetail: 1, //是否查看详情
					page: this.page,
					num: this.num,
					export: 1
				}
			});
		},
		getStatus: function(item) { //调整结果
			console.log(item.type);
			if (item.type == 19 || item.type == 20 || item.type == 21 || item.type == 22) {
				return '失败';
			} else {
				return '成功';
			}
		},
		judgeType: function(item) {
			// 判断操作类型 是否加还是减
			let operate;
			if (item.type == '10' || item.type == '12') {
				operate = '+';
			} else {
				operate = '-';
			}
			return operate;
		},
	},
	components: {
		comTable: () =>
			import( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		pageElement: () =>
			import( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		//详情
		cardDetail: () =>
			import( /*webpackChunkName: 'card_queries_detail'*/ './../member_system/card_queries_detail'),
		memberDetail: () =>
			import( /*webpackChunkName: 'member_manage_detail'*/ './../member_system/member_management/member_manage_detail'),
	},
	created: function() {
		let obj1 = {
			fontSize: 16 + 'px'
		};
		for (let item of amount_h.concat(amount_b, point_h)) {
			item.titleStyle = Object.assign({}, item.titleStyle, obj1);
		}
	},
	mounted() {
		console.log(JSON.stringify(this.conditions));
		this.setTitle();
		this.titleList_l = amount_b;
		if (this.conditions.type == 0) {
			this.titleList = amount_h;
		} else {
			this.titleList = point_h;
			let obj = {
				titleName: '操作积分',
				titleStyle: {
					fontSize: 16 + 'px'
				}
			};
			this.titleList_l[4] = obj;
		}
		this.adjustRecord();
	}
};
</script>
<style type="text/css" scoped>
#membercard .plate {
	width: 100%;
	height: 45px;
	margin: 20px 0px;
}

#membercard .plate .diel {
	display: inline-block;
	width: 136px;
	height: 42px;
	font-size: 16px;
	background: #FFF;
	border: 1px solid #E9C048;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	color: #F8931F;
}

#membercard .plate .on {
	background: #F8931F;
	color: #fff;
}

#membercard .filter {
	margin-bottom: 20px;
	height: 40px;
}

#membercard .filter span {
	display: block;
	height: 40px;
	float: left;
	margin-right: 15px;
	line-height: 40px;
	font-size: 16px;
}

#membercard .filter .filbox {
	height: 40px;
	margin: 0 20px 20px 0;
	line-height: 40px;
}

#membercard .filter .filbox .line {
	margin: 0 5px;
}

#membercard .filter .filbox a {
	width: 80px;
	height: 40px;
	line-height: 40px;
}

#membercard .operate_worker {
	font-size: 16px;
}

#membercard .remark {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	line-height: 1.5;
}
</style>