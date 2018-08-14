<!--
    **领券活动
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="redemption">
		<div class="filter clearfix">
			<!-- 日期选择 -->
			<div class="fl date">
				<calendar class='fl' :pObj="startObj" @throwTime="getStartTime" style=""></calendar>
				<span class="fl line">-</span>
				<calendar class='fl' :pObj="endObj" @throwTime="getEndTime"></calendar>
				<span class="order-order-searchA fl">
						<span class="order-order-search" href="javascript:void(0)"></span>
				</span>
			</div>
			<!-- 选择类型 -->
			<div class="date fl">
				<span style="font-size:16px;">状态</span>
				<select-btn :name='expirationTime' :sorts="expirationTimeList.map(v=>v.name)" :width="157" @selOn="selexpirationTime"></select-btn>
			</div>
			<!-- 选择类型 -->
			<div class="date fl">
				<span style="font-size:16px;">活动名称</span>
				<input type="text" v-model="activityTitle" placeholder="请输入活动名称" />
			</div>
			<!-- 保存 -->
			<div class="search-box fl">
				<span class="search-btn blue" @click="searchList">筛选</span>
				<span class="reset-btn gray" @click="resertFun">重置</span>
			</div>
		</div>
		<!-- 表格 -->
		<com-table :listWidth="1470" :listHeight='80' :listName="'领券列表'" :key="index" :showTitle='1' :introData="userList" :titleData="titleList" :allTotal="count" :widthType='true'>
			<div slot="con-0" slot-scope="props" class="operate_worker">
				<span @click="modfycoupons(props.data)">编辑</span>
				<span v-if="props.data.standStatus" @click="shelves(props.data)">{{props.data.downName}}</span>
			</div>
			<div slot="con-1" slot-scope="props" class="download">
				<div class="form">
					<a @click="downloadCode(props.data)" :href="downloadUrl" class="fl add_btn qRcode" :download="props.data.name">下载二维码</a>
					<input type="text" class="num inpurl" ref='copyTxt' :value="shortUrlPreFix + props.data.urlCode " />
				</div>
			</div>
			<div slot="con-2" slot-scope="props" class="download">
				<p @click="copyUrl(props.index)">一键复制</p>
			</div>
			<div slot="con-4" slot-scope="props">
				{{formatTime(props.data.createTime)}}
			</div>
			<div slot="con-5" slot-scope="props">
				{{formatTime(props.data.startTime)}} ~ {{formatTime(props.data.endTime)}}
			</div>
			<div slot="con-8" slot-scope="props">
				{{getStatus(props.data)}}
			</div>
		</com-table>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
	</div>
</template>
<script>
import http from "src/manager/http";
import storage from "src/verdor/storage";
import utils from "src/verdor/utils";
// import global from 'src/manager/global';
export default {
	data() {
		return {
			page: 1, //页数
			total: 0, //记录条数
			num: 10, //一页请求的数量
			startObj: {
				time: new Date().setHours(0, 0, 0, 0),
				// width: 170
			}, //日期组件的开始时间
			endObj: {
				time: new Date().setHours(23, 59, 59, 999),
				// width: 170
			}, //日期组件的结束时间
			expirationTimeList: [{
					//过期时间
					name: '全部',
					id: 3
				},
				{
					name: '未发布',
					id: 0
				},
				{
					name: '已发布',
					id: 1
				},
				{
					name: '发布中',
					id: 2
				},
				{
					name: '已下架',
					id: -1
				},
				{
					name: '已结束',
					id: -2
				}
			],
			expirationTimeId: 3,
			expirationTime: '全部', //状态
			index: null,
			titleList: [{
					titleName: '操作',
					titleStyle: {
						width: '180px',
						flex: 'none',
					}
				},
				{
					titleName: '下载二维码'
				},
				{
					titleName: '生成链接'
				},
				{
					titleName: '名称',
					dataName: 'name'
				},
				{
					titleName: '创建时间'
				},
				{
					titleName: '活动时间',
					titleStyle: {
						width: '300px',
						flex: 'none',
					}
				},
				{
					titleName: '领券总量',
					dataName: 'giveTotal'
				},
				{
					titleName: '销售金额',
					dataName: 'priceTotal'
				},
				{
					titleName: '状态',
					dataName: 'shopNames'
				},
			],
			count: 0, //总条数
			userList: [], //数据
			downloadUrl: 'javascript:;',
			qrcode: '',
			name: '', //下载图片的名字
			shortUrlPreFix: '', //二维码前缀
			activityTitle:'' //活动标题
		}
	},
	created: function() {
		let obj1 = {
			fontSize: 16 + 'px'
		};
		for (let item of this.titleList) {
			item.titleStyle = Object.assign({}, item.titleStyle, obj1);
		}
	},
	methods: {
		//选择开始时间
		getStartTime: function(receiveTime) {
			this.startObj.time = new Date(receiveTime).getTime(); //毫秒
		},
		//选择结束时间
		getEndTime: function(receiveTime) {
			this.endObj.time = new Date(receiveTime).getTime(); //毫秒
		},
		selexpirationTime: function(i) { //选择类型
			this.expirationTime = this.expirationTimeList[i].name;
			this.expirationTimeId = this.expirationTimeList[i].id;
		},
		pageChange(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.newgetActivityList();
		},
		setTitle: function() { //设置标题
			this.$store.commit('setPageTools', [{
					name: '返回',
					className: ['fd-white'],
					fn: () => {
						this.returnActivity();
					}
				},
				{
					name: '新建',
					className: ['fd-blue'],
					fn: () => {
						this.addActivity();
					}
				}
			]);
		},
		returnActivity: function() { //返回活动首页
			this.$router.push('/admin/activity');
		},
		addActivity: function() {
			this.$router.push('/admin/activity/couponActivity/coupon');
		},
		async newgetActivityList() {
			let data = await http.newgetActivityList({
				data: {
					fromDate: parseInt(this.startObj.time / 1000), //开始日期
					toDate: parseInt(this.endObj.time / 1000), //结束日期
					page: this.page, //页数
					num: this.num,
					status: this.expirationTimeId,
					type: 7, //活动类型
					activityName:this.activityTitle
				}
			})
			this.userList = data.list; //活动列表
			this.shortUrlPreFix = data.shortUrlPreFix; //二维码前缀
			this.count = data.count; //条数
			this.total = data.total;
			// this.activityList = data.list;
			// this.pageTotal = data.total;
		},
		downloadCode: function(item) { //下载二维码
			console.log('11111')
			let url = this.shortUrlPreFix + item.urlCode;
			this.downloadUrl = this.qrcode.getQrBase64(url, {
				padding: 15,
				width: 300,
				height: 300,
				correctLevel: QRErrorCorrectLevel.L
			}); //链接地址 下载的二维码						
		},
		formatTime(time) { //日期格式化
			if (time.length == 10) {
				time *= 1000;
			}
			return utils.format(new Date(time), 'yyyy-MM-dd hh:mm:ss');
		},
		copyUrl: function(index) { //复制链接
			let t = document.getElementsByClassName('inpurl')[index];
			t.select();
			document.execCommand('copy');
			this.$store.commit('setWin', {
				content: '复制成功',
				time: 1000
			});
		},
		searchList: function() { //筛选
			this.page = 1;
			this.newgetActivityList();
		},
		resertFun: function() { //重置
			this.startObj.time = new Date().setHours(0, 0, 0, 0);
			this.endObj.time = new Date().setHours(23, 59, 59, 999);
			this.expirationTimeId = 3;
			this.expirationTime = '全部';
			this.newgetActivityList();
		},
		modfycoupons: function(item) { //编辑活动
			//当前点击的对象的数据保存起来
			storage.session('activityInfo', item);
			this.addActivity();
		},
		getStatus: function(item) { //根据status和时间判断状态
			let now = new Date().getTime() / 1000; //获取当前的时间
			if (item.status == '0') {
				item.standStatus = false;
				item.downName = '';
				return '未发布';
			}
			if (item.status == '1') {
				if (item.startTime < now && item.endTime > now) {
					item.standStatus = false;
					item.downName = '';
					return '已发布';
				}
				if (item.startTime > now && item.endTime > now) {
					item.standStatus = true;
					item.downName = '下架';
					item.downType = 0;
					return '发布中'
				}
			}
			if (item.status == '-1') {
				item.standStatus = true;
				item.downName = '上架';
				item.downType = 1;
				return '已下架';
			}
			if (item.startTime < now && item.endTime < now) {
				item.standStatus = false;
				item.downName = '';
				return '已结束';
			}
		},
		shelves: function(item) { //活动的上架或下架
			this.$store.commit('setWin', {
				type: 'confirm',
				content: `确定要${item.downName}吗`,
				callback: (str) => {
					if (str == 'ok') {
						this.releaseOrDown(item);
					}
				}
			});
		},
		async releaseOrDown(item) { //活动上架或者下架
			let data = await http.releaseOrDownActivity({
				data: {
					activityId: item.id,
					type: item.type,
					mouldType: item.mouldType,
					isRelease: item.downType //1代表上架 0代表下架
				}
			})
			if (data) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: `${item.downName}成功`,
				});
				this.newgetActivityList();
			}
		}
	},
	components: {
		calendar: () =>
			import ( /*webpackChunkName: "calendar_result"*/ 'src/components/calendar_result'),
		selectBtn: () =>
			import ( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
		comTable: () =>
			import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		pageElement: () =>
			import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
	},
	async mounted() {
		this.setTitle();
		this.qrcode = await
		import ( /* webpackChunkName:'qrcode' */ 'src/verdor/jr-qrcode.js');
		QRErrorCorrectLevel = this.qrcode.QRErrorCorrectLevel;
		this.newgetActivityList(); //获取活动列表
	}

}
</script>
<style type="text/css" scoped>
#redemption .filter {
	min-height: 40px;
}

#redemption .filter .date {
	height: 40px;
	margin-bottom: 20px;
	line-height: 40px;
	margin-right: 25px;
}

#redemption .filter .date .line {
	margin: 0 5px;
}
#redemption .filter .date input{
	width: 200px;
	height: 40px;
	text-indent: 15px;
}
#redemption .order-order-searchA,
#redemption .order-order-search {
	display: inline-block;
	width: 40px;
	height: 40px;
	background-color: #29a7e1;
	cursor: pointer;
	vertical-align: middle;
}

#redemption .order-order-search {
	background: url(../../../res/images/search.png) center center no-repeat;
}

#redemption .order-order-searchA:hover {
	background-color: #1878a5;
	transition: background-color ease-in-out 0.2s;
}

#redemption .order-order-searchA:active {
	background-color: #154961;
}

#redemption .filter .search-box {
	display: inline-block;
	vertical-align: middle;
	width: 200px;
	height: 40px;
}

#redemption .filter .search-box span {
	width: 80px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border: 0;
	color: #fff;
	display: inline-block;
	cursor: pointer;
}

#redemption .filter .search-box .search-btn {
	margin-right: 20px;
}

#redemption .operate_worker {
	height: 100%;
	align-items: center;
	display: flex;
	justify-content: center;
}

#redemption .operate_worker span {
	cursor: pointer;
	display: block;
	height: 18px;
	text-align: center;
	line-height: 18px;
	border-left: 1px solid #cecece;
	float: left;
	padding: 0 10%;
}

#redemption .operate_worker span:nth-child(1) {
	border: none;
	color: #ff8d00;
	/* padding: 0 25px; */
	/* border-right: 1px solid RGB(206, 206, 206); */
	/* cursor: pointer; */
}

#redemption .operate_worker span:nth-child(2) {
	color: #28a8e0;
	/* padding: 0 25px;
	cursor: pointer; */
}

#redemption .download {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

#redemption .download .form {
	width: 100px;
	height: 40px;
	position: relative;
}

#redemption .download .form input {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
}

#redemption .download a {
	position: absolute;
	display: block;
	width: 100px;
	height: 40px;
	background-color: #28a8e0;
	border: solid 1px #28a8e0;
	text-align: center;
	line-height: 40px;
	font-size: 16px;
	color: #fff;
	z-index: 999;
}

#redemption .download p {
	font-size: 16px;
	color: #28a8e0;
}
</style>