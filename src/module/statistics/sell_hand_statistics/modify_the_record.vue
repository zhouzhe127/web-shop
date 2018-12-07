<!--
		**修改记录
		*
		* miaochuan.sha
		* *
		*
-->
<template>
	<div id="record">
		<div class="search_box">
			<!-- 时间控件 -->
			<div class="fl box_child clearfix">
				<span class="fl">修改时间</span>
				<el-date-picker class="fl" v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" :clearable="false" @change="chooseTime">
				</el-date-picker>
			</div>
			<!-- 修改人 -->
			<div class="fl box_child clearfix">
				<span class="fl">修改人</span>
				<el-input class="fl" v-model="handlers" placeholder="请输入内容" style="width:179px;"></el-input>
			</div>
			<!-- 筛选 -->
			<div class="fl box_child clearfix">
				<el-button type="primary" style="width:100px;" @click="searchData">筛选</el-button>
				<el-button type="info" style="width:100px;" @click="resetFun">重置</el-button>
			</div>
		</div>
		<!-- 下面的表格 -->
		<div class="list_box" style="width:100%;">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>调整记录列表</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="proList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="fromId" label="店铺名称" align="center">
					<template slot-scope="scope">
						<span>{{getShopName(scope.row.fromId)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="用户" prop="day" align="center">
					<template slot-scope="scope">
						<span>{{getUserInfo(scope.row.fansId,'1')}}</span>
					</template>
				</el-table-column>
				<el-table-column label="手机号" prop="day" align="center">
					<template slot-scope="scope">
						<span>{{getUserInfo(scope.row.fansId,'2')}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="originalCash" label="原消费金额" align="center">
				</el-table-column>
				<el-table-column prop="point" label="现消费金额" align="center">
				</el-table-column>
				<el-table-column prop="point" label="用户调整积分" align="center">
				</el-table-column>
				<el-table-column prop="coins" label="导购调整金币" align="center">
					<!-- <template slot-scope="scope">
						<span>{{getPersonName(scope.row.createUid)}}</span>
					</template> -->
				</el-table-column>
				<el-table-column prop="coins" label="修改人" align="center">
					<template slot-scope="scope">
						<span>{{getPersonName(scope.row.fansId)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="coins" label="修改时间" align="center">
					<template slot-scope="scope">
						<span>{{formatTime(scope.row.createTime)}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<div class="pageWrap">
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="allTotal" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
	</div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import { mixin } from './mixin.js';

export default {
	mixins: [mixin],
	data() {
		return {
			valueTime: [], //时间控件	
			handlers: '', //修改人
			proList: [], //卖手消费统计数据
			page: 1,
			num: 10,
			count: 0, //条数
			allTotal: 1,
			userData: Object, //用户信息
		};
	},
	props: {
		id: String //单条记录的id
	},
	methods: {
		chooseTime: function(time) { //获取时间
			this.valueTime[1] = new Date(time[1]).setHours(23, 59, 59, 999);
		},
		//每页显示多少条数据
		handleSizeChange(p) {
			this.page = 1;
			this.num = p;
			this.getModifyRecode();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.getModifyRecode();
		},
		setTitle: function() {
			this.$store.commit('setPageTools', [{
				name: '返回',
				className: 'el-btn-blue',
				fn: () => {
					this.returnStore();
				}
			}]);
		},
		returnStore: function() {
			this.$store.commit('setPageTools', {});
			this.$emit('getModify', 'index');
		},
		async getModifyRecode() { //获取修改记录
			let res = await http.getModifyRecode({
				data: {
					id: this.id, //具体某一条的id
					startTime: this.valueTime.length == 0 ? '' : parseInt(this.valueTime[0] / 1000), //开始时间
					endTime: this.valueTime.length == 0 ? '' : parseInt(this.valueTime[1] / 1000), //结束时间
					page: this.page,
					num: this.num,
					modifyUser: this.handlers //修改人
				}
			});
			if (res) {
				if (this.page == 1) {
					this.count = res.count;
					this.allTotal = res.total;
				}
				this.userData = res.userData;
				this.proList = res.list;
			}
		},
		searchData: function() {
			this.page = 1;
			this.getModifyRecode();
		},
		getUserInfo: function(id, type) { //获取用户信息
			//console.log(this.userData)
			let info = '--';
			for (let key in this.userData) {
				if (id == key) {
					if (type == '1') {
						info = this.userData[key].name;
					} else {
						info = this.userData[key].mobile;
					}
					break;
				}
			}
			return info;
		},
		resetFun: function() { //重置
			this.valueTime = [];
			this.handlers = '';
			this.page = 1;
			this.num = 10;
			this.getModifyRecode();
		}
	},
	mounted() {
		this.setTitle();
		this.getAssistantstaff();
		this.getshopIdorshopName();
		this.searchData();
	}
};
</script>
<style type="text/css" scoped>
#record {
	width: 100%;
	height: 100%;
}

#record .search_box {
	width: 100%;
	height: 40px;
	margin-bottom: 20px;
}

#record .search_box .box_child {
	height: 40px;
	margin-right: 20px;
}

#record .search_box .box_child span {
	display: block;
	height: 40px;
	font-size: 16px;
	line-height: 40px;
	margin-right: 10px;
}
</style>