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
                <!-- <calendar class='fl' :pObj="startObj" @throwTime="getStartTime" style=""></calendar>
				<span class="fl line">-</span>
				<calendar class='fl' :pObj="endObj" @throwTime="getEndTime"></calendar>
				<span class="order-order-searchA fl">
						<span class="order-order-search" href="javascript:void(0)"></span>
				</span> -->
                <el-date-picker class="fl" v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" :clearable="false">
                </el-date-picker>
                <el-button class="fl" type="primary" icon="el-icon-search" @click="searchList"></el-button>
            </div>
            <!-- 选择类型 -->
            <div class="date fl">
                <span style="font-size:16px;">状态</span>
                <!-- <select-btn :name='expirationTime' :sorts="expirationTimeList.map(v=>v.name)" :width="157" @selOn="selexpirationTime"></select-btn> -->
                <el-select v-model="expirationTime" placeholder="请选择" @change="selexpirationTime" style="color:#c0c4cc;width: 179px;">
                    <el-option v-for="item in expirationTimeList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <!-- 选择类型 -->
            <div class="date fl">
                <span style="font-size:16px;">活动名称</span>
                <!-- <input type="text" v-model="activityTitle" placeholder="请输入活动名称" /> -->
                <el-input v-model="activityTitle" maxlength="10" placeholder="请输入活动标题" style="width:179px;"></el-input>
            </div>
            <!-- 保存 -->
            <div class="search-box fl">
                <!-- <span class="search-btn blue" @click="searchList">筛选</span>
				<span class="reset-btn gray" @click="resertFun">重置</span> -->
                <el-button type="primary" @click="searchList">筛选</el-button>
                <el-button type="info" @click="resertFun">重置</el-button>
            </div>
        </div>
        <!-- 表格 -->
        <!-- <com-table :listWidth="1470" :listHeight='80' :listName="'领券列表'" :key="index" :showTitle='1' :introData="userList" :titleData="titleList" :allTotal="count" :widthType='true'>
			<div slot="con-0" slot-scope="props" class="operate_worker">
				<span v-if="!(scope.row.status == '1' && scope.row.startTime < now && scope.row.endTime > now)" @click="modfycoupons(scope.row)">编辑</span>
				<span v-if="scope.row.standStatus" @click="shelves(scope.row)">{{scope.row.downName}}</span>
			</div>
			<div slot="con-1" slot-scope="props" class="download">
				<div class="form">
					<a @click="downloadCode(scope.row)" :href="downloadUrl" class="fl add_btn qRcode" :download="scope.row.name">下载二维码</a>
					<input type="text" class="num inpurl" ref='copyTxt' :value="shortUrlPreFix + scope.row.urlCode " />
				</div>
			</div>
			<div slot="con-2" slot-scope="props" class="download">
				<p @click="copyUrl(props.index)">一键复制</p>
			</div>
			<div slot="con-4" slot-scope="props">
				{{formatTime(scope.row.createTime)}}
			</div>
			<div slot="con-5" slot-scope="props">
				{{formatTime(scope.row.startTime)}} ~ {{formatTime(scope.row.endTime)}}
			</div>
			<div slot="con-8" slot-scope="props">
				{{getStatus(scope.row)}}
			</div>
		</com-table> -->
        <!-- 下面的表格 -->
        <div class="list_box" style="width:100%;">
            <div class="list_title">
                <div class="list_title_l fl">
                    <span>领券活动</span>
                    <span></span>
                    <span>共
                        <a href="javascript:;">{{count}}</a>条记录</span>
                </div>
                <div class="list_title_r fr">
                </div>
            </div>
            <el-table :data="userList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
                <el-table-column fixed prop="id" label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button v-if="!(scope.row.status == '1' && scope.row.startTime < now && scope.row.endTime > now)" size="mini" type="text" @click="modfycoupons(scope.row)" style="color: #ff8d00;">编辑</el-button>
                        <span v-if="!(scope.row.status == '1' && scope.row.startTime < now && scope.row.endTime > now) && scope.row.standStatus" style="padding:0 5px;color: #D2D2D2">|</span>
                        <el-button v-if="scope.row.standStatus" size="mini" type="text" @click="shelves(scope.row)" style="color: rgb(40, 168, 224);">{{scope.row.downName}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="下载二维码" prop="name" align="center" width="120">
                    <template slot-scope="scope">
                        <div class="form">
                            <a @click="downloadCode(scope.row)" :href="downloadUrl" class="fl add_btn qRcode" :download="scope.row.name">下载二维码</a>
                            <input type="text" class="num inpurl" ref='copyTxt' :value="shortUrlPreFix + scope.row.urlCode " />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="生成链接" align="center" width="120">
                    <template slot-scope="scope">
                        <p @click="copyUrl(scope.$index)">一键复制</p>
                    </template>
                </el-table-column>
                <el-table-column label="名称" align="center" prop="name">
                </el-table-column>
                <el-table-column label="创建时间" align="center">
                    <template slot-scope="scope">
                        <span>{{formatTime(scope.row.createTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="活动时间" align="center" width="300">
                    <template slot-scope="scope">
                        <span>{{formatTime(scope.row.startTime)}} ~ {{formatTime(scope.row.endTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="领券总量" align="center" prop="giveTotal" width="80">
                </el-table-column>
                <el-table-column label="销售金额" align="center" prop="priceTotal" width="80">
                </el-table-column>
                <el-table-column label="状态" align="center" width="120">
                    <template slot-scope="scope">
                        <span>{{getStatus(scope.row)}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 翻页 -->
        <!--  <section class="turn-page">
            <pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
        </section> -->
        <div class="pageWrap">
            <el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
        </div>
    </div>
</template>
<script>
    import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
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
			valueTime: [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)], //时间控件
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
			count: 0, //总条数
			userList: [], //数据
			downloadUrl: 'javascript:;',
			qrcode: '',
			name: '', //下载图片的名字
			shortUrlPreFix: '', //二维码前缀
			activityTitle:'', //活动标题
			now: new Date().getTime() / 1000
		};
	},
	methods: {
		selexpirationTime: function(i) { //选择类型
			//this.expirationTime = this.expirationTimeList[i].name;
			this.expirationTimeId = i;
		},
		// pageChange(obj) {
		// 	this.page = obj.page;
		// 	this.num = obj.num;
		// 	this.newgetActivityList();
		// },
		setTitle: function() { //设置标题
			this.$store.commit('setPageTools', [{
				name: '返回',
				className: 'el-btn-blue',
				fn: () => {
					this.returnActivity();
				}
			},
			{
				name: '新建',
				className: 'el-btn-yellow',
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
					fromDate: parseInt(this.valueTime[0] / 1000), //开始日期
					toDate: parseInt(this.valueTime[1] / 1000), //结束日期
					page: this.page, //页数
					num: this.num,
					status: this.expirationTimeId,
					type: 7, //活动类型
					activityName:this.activityTitle
				}
			});
			this.userList = data.list; //活动列表
			this.shortUrlPreFix = data.shortUrlPreFix; //二维码前缀
			this.count = data.count; //条数
			this.total = data.total;
			// this.activityList = data.list;
			// this.pageTotal = data.total;
		},
		async downloadCode(item) { //下载二维码
			//console.log('11111');
			let url = this.shortUrlPreFix + item.urlCode;
			//console.log(url)
			this.downloadUrl = await this.qrcode.getQrBase64(url, {
				padding: 15,
				width: 300,
				height: 300,
				correctLevel: QRErrorCorrectLevel.L
			}); //链接地址 下载的二维码		
			//console.log(this.downloadUrl)			
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
			this.valueTime[0] = new Date().setHours(0, 0, 0, 0);
			this.valueTime[1] = new Date().setHours(23, 59, 59, 999);
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
					item.standStatus = true;
					item.downName = '下架';
					return '已发布';
				}
				if (item.startTime > now && item.endTime > now) {
					item.standStatus = false;
					item.downName = '';
					item.downType = 0;
					return '发布中';
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
			});
			if (data) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: `${item.downName}成功`,
				});
				this.newgetActivityList();
			}
		},
		//每页显示多少条数据
		handleSizeChange(p) {
			this.num = p;
			this.newgetActivityList();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.newgetActivityList();
		},		
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

};
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

    #redemption .filter .date input {
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

    #redemption .form {
        width: 100px;
        height: 40px;
        position: relative;
    }

    #redemption .form input {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }

    #redemption .form a {
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
        z-index: 9;
    }

    #redemption p {
        font-size: 16px;
        color: #28a8e0;
    }
</style>