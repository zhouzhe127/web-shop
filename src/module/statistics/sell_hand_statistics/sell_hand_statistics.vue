<!--活动统计-->
<template>
	<div id="sell_hand">
		<div class="search_box">
			<!-- 时间控件 -->
			<div class="fl box_child clearfix">
				<span class="fl">消费时间</span>
				<el-date-picker class="fl" v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" :clearable="false" @change="chooseTime">
				</el-date-picker>
			</div>
			<!-- 按天/按详情 -->
			<div class="fl box_child clearfix">
				<el-select class="fl" v-model="viewName" placeholder="请选择" @change="selData" style="color:#c0c4cc">
					<el-option v-for="item in viewList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</div>
			<!-- 筛选 -->
			<div class="fr box_child clearfix">
				<el-button type="primary">筛选</el-button>
				<el-button type="info">重置</el-button>
				<el-button type="warning">查看修改记录</el-button>
			</div>
		</div>
		<div class="search_box">
			<div class="fl box_child clearfix">
				<span class="fl">选择门店</span>
				<elShopList @chooseShop="getSelectShopList" :shopIds="transmitId"></elShopList>
			</div>
			<div class="fl box_child clearfix">
				<span class="fl">经手人</span>
				<el-input class="fl" v-model="handlers" placeholder="请输入内容" style="width:179px;"></el-input>
			</div>
			<div class="fl box_child clearfix">
				<span class="fl">核准人</span>
				<el-input class="fl" v-model="approvedPerson" placeholder="请输入内容" style="width:179px;"></el-input>
			</div>
		</div>
		<div class="search_box">
			<span style="font-size: 16px;line-height:1.5;">选择门店:{{selectName}}</span>
		</div>
		<!-- 下面的表格 -->
		<div class="list_box" style="width:100%;">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>卖手消费列表</span>
					<span></span>
					<span>共
								<a href="javascript:;">12</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="proList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="id" label="店铺名称" width="120" align="center">
				</el-table-column>
				<el-table-column label="用户昵称" prop="name" align="center">
				</el-table-column>
				<el-table-column prop="createTime" label="手机号" align="center">
				</el-table-column>
				<el-table-column prop="createTime" label="消费金额" align="center">
				</el-table-column>
				<el-table-column prop="createTime" label="获得积分" align="center">
				</el-table-column>
				<el-table-column prop="createTime" label="经手人" align="center">
				</el-table-column>
				<el-table-column prop="createTime" label="核准人" align="center">
				</el-table-column>
				<el-table-column prop="createTime" label="消费时间" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center" width="200">
					<template slot-scope="scope">
						<el-button size="medium" type="text">修改</el-button>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button size="medium" type="text" style="color: #ff8d00;">退回</el-button>
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
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';

export default {
	data() {
		return {
			page: 1,
			num: 10,
			allTotal: 1,
			valueTime: [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)], //时间控件
			viewList: [{
				name: '按天数',
				id: 0
			}, {
				name: '按详情',
				id: 1
			}],
			viewName: '按天数',
			viewId: 0,
			transmitId: [], //传递给选择店铺页面的id 
			postSelectShopList: [], //所有的店铺列表
			shopIds: null, //选择查看的店铺的id
			selectName: null,
			ischain: '',
			handlers: '', //经手人
			approvedPerson: '', //核准人
			proList: [], //卖手消费统计数据
		};
	},
	components: {
		elShopList: () =>
			import( /*webpackChunkName: "el_shopList"*/ 'src/components/el_shopList')
	},
	created() {
		this.ischain = storage.session('userShop').currentShop.ischain;
	},
	mounted() {
		this.getshopIdorshopName();
	},
	methods: {
		chooseTime: function(time) { //获取时间
			this.valueTime[1] = new Date(time[1]).setHours(23, 59, 59, 999);
		},
		selData: function(value) { //选择按天还是按详情
			this.viewId = value;
		},
		getSelectShopList: function(res) {
			this.transmitId = res;
			let selectNameStr = '';
			for (let i = 0; i < this.postSelectShopList.length; i++) {
				if (this.transmitId.includes(this.postSelectShopList[i].id)) {
					this.postSelectShopList[i].selected = true;
					selectNameStr = selectNameStr + this.postSelectShopList[i].name + ',';
				} else {
					this.postSelectShopList[i].selected = false;
				}
			}
			this.shopIds = res.join(',');
			this.selectName = selectNameStr == '' ? '请选择店铺' : selectNameStr;
		},
		getshopIdorshopName: function() {
			//默认全部选中
			if (this.ischain == '3') {
				let selectShopList = storage.session('shopList');
				let shopIds = [];
				let selectName = [];
				for (let item of selectShopList) {
					item.selected = true;
					item.name = item.shopName;
					shopIds.push(item.id);
					selectName.push(item.name);
				}
				this.shopIds = shopIds.join(',');
				this.selectName = selectName.join(',');
				this.postSelectShopList = selectShopList;
				this.transmitId = selectShopList.map((v) => {
					return v.id;
				});
			} else {
				this.shopIds = storage.session('userShop').currentShop.id;
				this.selectName = storage.session('userShop').currentShop.name;
				this.postSelectShopList.push(
					storage.session('userShop').currentShop
				);
			}
		},
		//每页显示多少条数据
		handleSizeChange(p) {
			this.page = 1;
			this.num = p;
			//this.openProList();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			//this.openProList();
		},
	}
};
</script>
<style scoped>
#sell_hand {
	width: 100%;
	height: 100%;
}

#sell_hand .search_box {
	width: 100%;
	height: 40px;
	margin-bottom: 20px;
}

#sell_hand .search_box .box_child {
	height: 40px;
	margin-right: 20px;
}

#sell_hand .search_box .box_child span {
	display: block;
	height: 40px;
	font-size: 16px;
	line-height: 40px;
	margin-right: 10px;
}
</style>