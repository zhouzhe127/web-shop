/** * 用户评价统计 * *miaochuan.sha */
<template>
	<div id="evaluation">
		<loading v-if="loading"></loading>
		<section v-if="type == 'index'">
			<div class="filter clearfix">
				<div class="filbox fl">
					<div class="input-box input-start">
						<!--日期组件 开始时间-->
						<calendar :time="startTime" class="data-box" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
					</div>
					<span>-</span>
					<div class="input-box input-start">
						<!--日期组件 开始时间-->
						<calendar :time="endTime" class="data-box" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
					</div>
					<span class="order-order-searchA" @click="getStatistics">
					<span class="order-order-search" href="javascript:void(0)"></span>
					</span>
				</div>

				<!--品牌店铺选择-->
				<div class="filbox fl">
					<span style="font-size:16px;" v-if="ischain == '3'">选择店铺</span>
					<section class="top-box" style="display:inline-block;" v-if="ischain == '3'"> 
						<selectstore @returnShop="getShop" :reset="hide"></selectstore>
					</section>
				</div>
				<!--下拉框组件-->
				<div class="filbox fl">
					<span style="font-size:16px;">选择渠道</span>
					<select-btn :name='expirationTime' :sorts="expirationTimeList.map(v=>v.name)" :width="157" @selOn="selexpirationTime"></select-btn>
				</div>
				<!-- 保存 -->
				<div class="search-box fl">
					<span class="search-btn blue" @click="getStatistics">筛选</span>
					<span class="reset-btn gray" @click="resetFun">重置</span>
				</div> 
			</div>
            <!-- 已经选择的店铺 -->
            <!-- <div class="choiceshop"  v-if="ischain == '3'">
                <div class="choiceshop_l" >
                    选择店铺:   
                        <span @click="stretch" v-if="show">收起</span>
                        <span @click="stretch" v-if="!show">展开</span>  
                </div> 
                <div class="choiceshop_r" v-if="show"> 
                    {{selShopid}}
                </div> 
            </div> -->
            <div class="store-show" :style="{'height':storeShowH}">
				<i>已选择店铺：</i>
				<div class="store-block">
					<em @click='openStore' class="select-ban">{{isShowStore?'收起':'展开'}}</em>
					<div>{{shopName}}</div>
				</div>
			</div>
 
			<!-- 环比 同比 -->
			<div class="compared">
				<span v-for="(item,index) in payWays" :key="index" @click="changeRadio(item)" :class="{'effect':payType==item.id}">{{item.name}}</span>
				<div class="prompting" @click="isPublicNumber">
					<div class="detDiv" v-if="publicNumber">
						<i class="detI triright"></i>
						<h3 class="detH3">
							环比:跟上一个周期比;同比:跟去年周期比;
						</h3>
					</div>
				</div>
			</div>
			<!-- 总评分 -->
			<!--  <section class="loading"> -->
			<div class="totalScore">
				<div class="totalScore_l fl">
					<div class="totalScore_l_l">
						<div class="total_t">
							{{score.scoreTotal}}
						</div>
						<div class="total_b">
							总评分
						</div>
					</div>
					<div class="totalScore_l_r">
						<img :src="getImage(score.scoreTotal,score.scoreTotalPast)">
					</div>
				</div>
				<div class="totalScore_r fl">
					<div class="totalScore_r_t">
						<span>用户评价</span>
						<span>{{returnEvaluation(score.scoreTotal,'1')}}</span>
					</div>
					<div class="totalScore_r_b">
						<p>建议:{{returnEvaluation(score.scoreTotal,'2')}}</p>
						<p>口味:{{returnEvaluation(score.scoreTotal,'3')}}</p>
					</div>
				</div>
			</div>
			<!-- 环境评分 -->
			<div class="totalScore">
				<div class="environment">
					<div class="environment_t">环境评分</div>
					<div class="environment_b">
						<div class="environment_b_l">
							{{score.scoreEnviron}}
						</div>
						<div class="environment_b_r">
							<img :src="getImage(score.scoreEnviron,score.scoreEnvironPast)">
						</div>
					</div>
				</div>
				<div class="environment">
					<div class="environment_t">口味评分</div>
					<div class="environment_b">
						<div class="environment_b_l">
							{{score.scoreTaste}}
						</div>
						<div class="environment_b_r">
							<img :src="getImage(score.scoreTaste,score.scoreTastePast)">
						</div>
					</div>
				</div>
				<div class="environment">
					<div class="environment_t">服务评分</div>
					<div class="environment_b">
						<div class="environment_b_l">
							{{score.scoreService}}
						</div>
						<div class="environment_b_r">
							<img :src="getImage(score.scoreService,score.scoreServicePast)">
						</div>
					</div>
				</div>
			</div>
			<!-- 列表 -->
			<div class="list">
				<com-table :listHeight='70' :listWidth="1310" :showHand="true" :titleData="titleList" :introData="charComment" :widthType='true'>
					<!-- 标题 -->
					<div class="list_title" slot="title">
						<div class="list_title_l fl">
							<span>用户点评</span>
							<span></span>
							<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
						</div>
						<div class="list_title_r fr">
							<span @click="getrevieDetail()">查看全部>></span>
						</div>
					</div>
					<div slot="con-0" slot-scope="props" class="user_img">
						<img class='user' v-if="props.data.isAnonymous == '0'" :src="props.data.imageUrl" :alt="props.data.name" />
						<img class='user' v-if="props.data.isAnonymous == '1'" src="../../res/images/nimingyonghu.png" />
					</div>
					<div slot="con-1" slot-scope="props">
						<span v-if="props.data.isAnonymous == '0'">{{props.data.nickName}}</span>
						<span v-if="props.data.isAnonymous == '1'">匿名用户</span>
					</div>
					<div slot="con-3" slot-scope="props">
						{{transFormDates(props.data.createTime)}}发布了一条点评
					</div>
				</com-table>
			</div>
			<!-- 列表 -->
			<div class="list">
				<com-table :listHeight='70' :listWidth="1310" :showHand="true" :titleData="showuptitleList" :introData="showup" :widthType='true'>
					<!-- 标题 -->
					<div class="list_title" slot="title">
						<div class="list_title_l fl">
							<span>TOP商品好评榜</span>
							<span></span>
							<span>共
								<a href="javascript:;">{{updata.length}}</a>条记录(根据筛选时间统计结果)</span>
						</div>
						<div class="list_title_r fr">
							<span @click="gethighlowDetail('up')">查看全部>></span>
						</div>
					</div>
					<div slot="con-0" slot-scope="props" class="user_img">
						<img class="shop" v-bind:src="uploadUrl  + props.data.imageName" />
					</div>
					<div slot="con-1" slot-scope="props">
						<span v-if="props.data.id < 100000">{{props.data.name}}</span>
						<span v-else>{{props.data.name}}({{props.data.shopName}})</span>
					</div>
				</com-table>
			</div>
			<!-- 列表 -->
			<div class="list">
				<com-table :listHeight='70' :listWidth="1310" :showHand="true" :titleData="showdowntitleList" :introData="showdown" :widthType='true'>
					<!-- 标题 -->
					<div class="list_title" slot="title">
						<div class="list_title_l fl">
							<span>TOP商品差评榜</span>
							<span></span>
							<span>共
								<a href="javascript:;">{{downdata.length}}</a>条记录(根据筛选时间统计结果)</span>
						</div>
						<div class="list_title_r fr">
							<span @click="gethighlowDetail('down')">查看全部>></span>
						</div>
					</div>
					<div slot="con-0" slot-scope="props" class="user_img">
						<img class="shop" v-bind:src="uploadUrl  + props.data.imageName" />
					</div>
					<div slot="con-1" slot-scope="props">
						<span v-if="props.data.id < 100000">{{props.data.name}}</span>
						<span v-else>{{props.data.name}}({{props.data.shopName}})</span>
					</div>
				</com-table>
			</div>
			<!--  </section> -->
		</section>
		<!-- 查看全部的用户点评 -->
		<userviewDetail v-if="type =='userview'" @throwWinResult="getDetailShow" :conditions='conditions'>
		</userviewDetail>
		<upOrdown v-if="type == 'updown'" @updownResult="getupdown" :reviewList="reviewList" :uploadUrl="uploadUrl" :updownType="updownType"></upOrdown>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			page: 1,
			num: 10,
			count: '0', //条数
			ischain: '', //单店 或品牌
			uploadUrl: '', //图片前缀
			shopId: '',
			shopList: [],
			expirationTimeList: [{
				//过期时间
				name: '全部',
				id: 0
			},
			{
				name: '在线点单',
				id: 1
			},
			{
				name: '自助点单',
				id: 2
			},
			{
				name: '扫码支付',
				id: 3
			}
			],
			expirationTimeId: 0,
			expirationTime: '全部', //状态
			payWays: [{
				id: 0,
				name: '环比'
			},
			{
				id: 1,
				name: '同比'
			}
			], //类型
			payType: 0,
			startTime: '',
			endTime: '',
			hide: 0, //头部选项切换隐藏其他
			ChartShopName: [], //选中的店铺
			shopName: '请选择店铺', //选中的店铺名称
			selShopid: [], //传给后台的 选中的店铺id
			publicNumber: false, //公众号标题提醒
			timer: '', //定时器
			timeout: '', //延时定时器
			updata: [], // 好评的数据
			showup: [], //好评展现
			downdata: [], //差评的数据
			showdown: [], //差评展现
			charComment: [], //用户评价展示在页面的数据
			score: {
				scoreTotal: 0,
				scoreTotalPast: 0,
				scoreEnviron: 0,
				scoreEnvironPast: 0,
				scoreTaste: 0,
				scoreTastePast: 0,
				scoreService: 0,
				scoreServicePast: 0
			}, //评分数据
			type: 'index', //类型
			conditions: '', //筛选条件
			reviewList: [], //传给点评榜的列表
			updownType: '', //商品好评差评的type
			loading: false, //loading的状态
			isloadingstatus: false,
			titleList: [{
				titleName: '用户头像',
				dataName: 'imageUrl',
				titleStyle: {
					width: 196.5 + 'px'
				}
			},
			{
				titleName: '用户名',
				dataName: 'nickName',
				titleStyle: {
					width: 196.5 + 'px'
				}
			},
			{
				titleName: '门店来源',
				dataName: 'shopName',
				titleStyle: {
					width: 196.5 + 'px'
				}
			},
			{
				titleName: '时间',
				dataName: 'createTime',
				titleStyle: {
					width: 262 + 'px'
				}
			},
			{
				titleName: '内容',
				dataName: 'comment',
				titleStyle: {
					width: 458.5 + 'px'
				}
			}
			],
			showuptitleList: [{
				titleName: '商品图片',
				dataName: 'imageName'
			},
			{
				titleName: '商品名称',
				dataName: 'name'
			},
			{
				titleName: '排行',
				dataName: 'top'
			},
			{
				titleName: '赞',
				dataName: 'num'
			}
			],
			showdowntitleList: [{
				titleName: '商品图片',
				dataName: 'imageName'
			},
			{
				titleName: '商品名称',
				dataName: 'name'
			},
			{
				titleName: '排行',
				dataName: 'top'
			},
			{
				titleName: '踩',
				dataName: 'num'
			}
			],
			timerqueue: [],
			isShowStore:false,//已选中店铺列表 是否展开
			storeShowH:'20px', 
		};
	},
	methods:{
		openStore(){//展开收起-已选中店铺列表
			if(this.isShowStore==true){//展开时点击
				this.storeShowH = '20px';
			}else{
				this.storeShowH = 'auto';
			}
			this.isShowStore = !this.isShowStore;
		},
		startTimeChange(time) {
			//开始时间
			this.startTime = time;
		},
		endTimeChange(time) {
			//结束时间
			this.endTime = new Date(time).setHours(23, 59, 59, 999);
		},
		selexpirationTime: function(i) {
			this.expirationTime = this.expirationTimeList[i].name; //点击卡类型对应的名字
			this.expirationTimeId = this.expirationTimeList[i].id; //点击卡类型对应的id
		},
		//根据店铺id匹配店铺名
		getShopname: function() {
			if (this.shopName != '请选择店铺') {
				let list = this.shopName.split(',');
				let arr = [];
				for (let i = 0; i < list.length; i++) {
					let obj = {};
					if (i === 0) {
						obj.className = 'chyellow';
						obj.name = list[i];
					} else if (i === 1) {
						obj.className = 'chblue';
						obj.name = list[i];
					} else if (i === 2) {
						obj.className = 'chgreen';
						obj.name = list[i];
					} else {
						obj.className = '';
						obj.name = list[i];
					}
					arr.push(obj);
				}
				this.ChartShopName = arr;
				// this.ChartSelShop = arr.slice(0,3);
			} else {
				this.shopName = '请选择店铺';
			}
		},
		getShop(id, name) {
			if (id || name) {
				this.selShopid = id;
				this.shopName = name;
			}
			this.getShopname();
		},
		fadeAway() {
			this.hide++;
		},
		changeRadio: function(item) {
			//选择渠道
			let id = item.id;
			this.payType = id;
			this.getStatistics();
		},
		isPublicNumber: function() {
			//关注公众号标题提示
			this.publicNumber = !this.publicNumber;
		},
		getrevieDetail: function() {
			let conditions = {
				shopIds: this.ischain == '3' ? this.selShopid.join() : this.shopId,
				startTime: parseInt(this.startTime / 1000),
				endTime: parseInt(this.endTime / 1000),
				channel: this.expirationTimeId
			};
			this.conditions = conditions;
			this.type = 'userview';
		},
		gethighlowDetail: function(type) {
			this.updownType = type;
			if (type == 'up') {
				this.reviewList = this.updata;
			} else if (type == 'down') {
				this.reviewList = this.downdata;
			}
			this.type = 'updown';
		},
		async getStatistics() {
			if (this.startTime - this.endTime > 0) {
				this.$store.commit('setWin', {
					content: '时间选择错误',
					title: '操作提示',
					winType: 'alert'
				});
				return false;
			}
			if (this.ischain == '3' && this.selShopid == '') {
				this.$store.commit('setWin', {
					content: '请选择店铺',
					title: '操作提示',
					winType: 'alert'
				});
				return false;
			}
			this.loading = true;
			this.isloadingstatus = false;
			let data = null;
			try {
				data = await http.getStatisticsDatas({
					data: {
						shopIds: this.ischain == '3' ?
							this.selShopid.join() : this.shopId, //店铺id
						startTime: parseInt(this.startTime / 1000), //开始时间
						endTime: parseInt(this.endTime / 1000), //结束时间
						channel: this.expirationTimeId,
						ratioType: this.payType
					}
				},
				true
				);
			} catch (e) {
				this.loading = false; //蒙层状态
				this.$store.commit('setWin', {
					content: e.error.message,
					title: '操作提示',
					winType: 'alert'
				});
				return false;
			}
			if (data) {
				this.timer = setInterval(() => {
					this.getTaskStatus(data);
				}, 2000);
			}
		},
		async getTaskStatus(id) {
			let data = await http.getTaskStatus({
				data: {
					taskId: id
				}
			});
			this.timeout = setTimeout(() => {
				if (!this.isloadingstatus) {
					this.loading = false; //蒙层状态
					clearTimeout(this.timeout);
					this.$store.commit('setWin', {
						content: '页面加载失败,请重新加载',
						title: '操作提示',
						winType: 'alert'
					});
					clearInterval(this.timer);
					while (this.timerqueue.length) {
						clearTimeout(this.timerqueue.pop());
					}
					return false;
				}
			}, 10000);
			this.timerqueue.push(this.timeout);
			if (data == true) {
				clearInterval(this.timer);
				while (this.timerqueue.length) {
					clearTimeout(this.timerqueue.pop());
				}
				this.getFinalData(id);
			}
		},
		async getFinalData(id) {
			//筛选的数据
			let data = await http.getFinalData({
				data: {
					taskId: id
				}
			});
			this.isloadingstatus = true;
			if (data == '') {
				this.loading = false; //蒙层状态
				this.score = {
					scoreTotal: 0,
					scoreTotalPast: 0,
					scoreEnviron: 0,
					scoreEnvironPast: 0,
					scoreTaste: 0,
					scoreTastePast: 0,
					scoreService: 0,
					scoreServicePast: 0
				};
				this.count = 0;
				this.charComment = [];
				this.showup = [];
				this.showdown = [];
				this.updata = [];
				this.downdata = [];
			}
			if (data != '') {
				this.loading = false;
				this.charComment = data.charComment; //获取展示页面的用户评价
				this.updata = data.up; //好评数据
				if (this.updata != '') {
					this.updata = utils.sortByAll(this.updata, 'num', false); //将其倒序排列
					for (let i = 0; i < this.updata.length; i++) {
						this.updata[i].top = 'TOP.' + (i + 1);
					}
				}
				if (this.updata.length > 3) {
					this.showup = this.updata.slice(0, 3);
				} else {
					this.showup = this.updata;
				}
				this.downdata = data.down; //差评数据
				if (this.downdata != '') {
					this.downdata = utils.sortByAll(
						this.downdata,
						'num',
						false
					); //将其倒序排列
					for (let i = 0; i < this.downdata.length; i++) {
						this.downdata[i].top = 'TOP.' + (i + 1);
					}
				}
				if (this.downdata.length > 3) {
					this.showdown = this.downdata.slice(0, 3);
				} else {
					this.showdown = this.downdata;
				}
				if (data.score != null) {
					this.score = data.score; //获取评分
				}
				this.getCommentList();
			}
		},
		changeFormat: function(t) {
			t -= 0;
			if (t < 10) {
				return '0' + t;
			} else {
				return t + '';
			}
		},
		transFormDates: function(time) {
			time += '';
			if (time.length == 10) {
				time -= 0;
				time *= 1000;
			} else {
				time -= 0;
			}
			let date = new Date(time);
			return (
				date.getFullYear() +
				'-' +
				(date.getMonth() + 1) +
				'-' +
				date.getDate() +
				' ' +
				date.getHours() +
				':' +
				this.changeFormat(date.getMinutes())
			);
		},
		returnEvaluation: function(score, type) {
			let totalscore = Number(score);
			let attitude = '';
			let advice = '';
			let taste = '';
			if (totalscore <= 3) {
				attitude = '一般';
				advice =
					'您的提升空间巨大！请您根据用户评价检视是否在环境，口味，服务等环节存在缺陷，按需提升店铺服务';
				taste = '一般般,加油';
			} else if (totalscore > 3 && totalscore <= 4.5) {
				attitude = '满意';
				advice =
					'您还有提升空间，请继续努力！您可以根据环境，口味，服务等环节稍作调整。';
				taste = '味道不错,很喜欢';
			} else if (totalscore > 4.5 && totalscore <= 5) {
				attitude = '超赞';
				advice = '您已超出了99%的同类型店铺！请您继续保持！';
				taste = '超级棒';
			}
			if (type == '1') {
				return attitude;
			} else if (type == '2') {
				return advice;
			} else if (type == '3') {
				return taste;
			}
		},
		getImage: function(newval, oldval) {
			let imgUrl = '';
			let newvalue = Number(newval);
			let oldvalue = Number(oldval);
			/* eslint-disable */
			if (newvalue < oldvalue) {
				imgUrl = require('../../res/images/fall.png');
			} else if (newvalue == oldvalue) {
				imgUrl = require('../../res/images/flat.png');
			} else if (newvalue > oldvalue) {
				imgUrl = require('../../res/images/rose.png');
			}
			/* eslint-enable */
			return imgUrl;
		},
		getDetailShow(res) {
			//子组件评价列表返给父组件的
			this.type = res;
		},
		getupdown: function(res) {
			//点评榜
			this.type = res;
		},
		async getCommentList() {
			let data = await http.getCommentList({
				data: {
					shopIds: this.ischain == '3' ?
						this.selShopid.join() : this.shopId, //查找的店铺
					startTime: parseInt(this.startTime / 1000), //开始时间
					endTime: parseInt(this.endTime / 1000), //结束时间
					channel: this.expirationTimeId, //点单方式
					page: this.page,
					num: this.num
				}
			});
			if (data) {
				this.count = data.count;
			}
		},
		resetFun: function() {
			//重置
			this.startTime =
				new Date().setDate(1) -
				(new Date().getTime() - new Date().setHours(0, 0, 0, 0)); //获取当月一号的零点时间戳
			this.endTime = new Date().getTime();
			this.expirationTimeId = 0;
			this.expirationTime = '全部'; //状态
			this.hide++;
			this.selShopid = [];
			for (let item of this.shopList) {
				this.selShopid.push(item.id);
			}
			this.getStatistics();
		}
	},
	components: {
		calendar: () =>
			import ( /*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		selectBtn: () =>
			import ( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
		selectstore: () =>
			import ( /*webpackChunkName: "mission_selectshop"*/ './mission_selectshop'),
		detailsDes: () =>
			import ( /*webpackChunkName: "details_des"*/ 'src/components/details_des'),
		userviewDetail: () =>
			import ( /*webpackChunkName: "evaluation_usereview"*/ './evaluation_usereview'),
		upOrdown: () =>
			import ( /*webpackChunkName: "evaluation_highpraise"*/ './evaluation_highpraise'),
		loading: () =>
			import ( /*webpackChunkName: "scancode_loading"*/ './scancode_loading'),
		comTable: () =>
			import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table')
	},
	created() {
		let obj = {
			fontSize: 16 + 'px',
			flex: 'none'
		};
		let obj2 = {
			titleStyle: {
				fontSize: 16 + 'px'
			}
		};
		for (let item of this.titleList) {
			Object.assign(item.titleStyle, obj);
		}
		for (let item of this.showuptitleList.concat(this.showdowntitleList)) {
			Object.assign(item, obj2);
		}
	},
	mounted() {
		this.startTime =
			new Date().setDate(1) -
			(new Date().getTime() - new Date().setHours(0, 0, 0, 0)); //获取当月一号的零点时间戳
		this.endTime = new Date().getTime();
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.shopList = storage.session('shopList');
		this.ischain = userData.currentShop.ischain;
		this.uploadUrl = userData.uploadUrl;
		for (let item of this.shopList) {
			this.selShopid.push(item.id);
		}
		this.getStatistics();
	},
	destroyed() {
		clearInterval(this.timer);
		clearTimeout(this.timeout);
	}
};
</script>
<style type="text/css" scoped>
#evaluation {
	padding-bottom: 40px;
	min-width: 1245px;
}

/* #evaluation .choiceshop {
    width: 100%;
    overflow: hidden;
    margin-bottom: 20px;
}

#evaluation .choiceshop .choiceshop_l {
    float: left;
    font-size: 16px;
    line-height: 24px;
}
#evaluation .choiceshop .choiceshop_l span{
    color:#29abe2; 
    padding:0 5px;
    display: inline-block;
}
#evaluation .choiceshop .choiceshop_r {
    float: left;
    width: 900px;
    font-size: 16px;
    line-height: 24px;
} */
#evaluation .store-show {
	width: 100%;
	margin-bottom: 10px;
	display: block;
	overflow: hidden;
	line-height: 20px;
	position: relative; 
}
#evaluation .store-show i {
	float: left;
	position: absolute;
	left: 0;
	top: 0;

}
#evaluation .store-show .store-block{
	overflow: hidden;
	width: 100%;
	padding-left: 84px;
}
#evaluation .store-show .store-block em{
	float: left;
	color: #09f;
	margin-right: 5px;
	cursor: pointer;
	text-decoration: underline;
}
#evaluation .store-show .store-block 	span {
	float: left;
	color: #333;
}

#evaluation .filter {
	margin-bottom: 20px;
}

#evaluation .filter .filbox {
	margin: 0 20px 20px 0;
}

#evaluation .filter .input-box {
	display: inline-block;
	vertical-align: middle;
}



/* 搜索图标的公共样式 */

#evaluation .order-order-searchA,
#evaluation .order-order-search {
	display: inline-block;
	width: 40px;
	height: 40px;
	background-color: #29a7e1;
	cursor: pointer;
	vertical-align: middle;
}

#evaluation .order-order-searchA {
	margin-left: -4px;
}

#evaluation .order-order-search {
	background: url(../../res/images/search.png) center center no-repeat;
}

#evaluation .order-order-searchA:hover {
	background-color: #1878a5;
	transition: background-color ease-in-out 0.2s;
}

#evaluation .order-order-searchA:active {
	background-color: #154961;
}

#evaluation .filter .search-box {
	display: inline-block;
	vertical-align: middle;
	width: 200px;
	height: 40px;
}

#evaluation .filter .search-box span {
	width: 80px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border: 0;
	color: #fff;
	display: inline-block;
	cursor: pointer;
}

#evaluation .filter .search-box .search-btn {
	margin-right: 20px;
}

#evaluation .compared {
	height: 40px;
	margin-bottom: 28px;
}

#evaluation .compared span {
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

#evaluation .compared .effect {
	background-color: #28a8e0;
	color: #ffffff;
}

#evaluation .compared .prompting {
	display: inline-block;
	width: 40px;
	height: 40px;
	background: url(../../../src/res/icon/orderdetial18.png) no-repeat left center;
	position: relative;
	vertical-align: middle;
}

#evaluation .compared .prompting .detDiv {
	display: inline-block;
	width: 317px;
	background: #45404b;
	position: absolute;
	top: 0px;
	left: 45px;
	padding: 10px;
	box-shadow: 3px 2px 10px #ccc;
	z-index: 5;
}

#evaluation .compared .prompting .detDiv .detI {
	width: 0;
	height: 0;
	line-height: 0;
	position: absolute;
	top: 10px;
	left: -20px;
	right: 30%;
	border-width: 10px;
	border-top: 0px;
	border-style: solid;
	border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
}

#evaluation .compared .prompting .detDiv .detH3 {
	line-height: 30px;
	color: #e6e6e7;
	text-align: center;
}

#evaluation .compared .prompting .detDiv .triright {
	width: 0;
	height: 0;
	border-top: 10px solid transparent !important;
	border-bottom: 10px solid transparent !important;
	border-right: 10px solid #45404b !important;
	border-left: 10px solid transparent !important;
}

#evaluation .totalScore {
	width: 738px;
	height: 147px;
	border: solid 1px #68c2e9;
	margin-bottom: 20px;
	overflow: hidden;
}

#evaluation .totalScore .totalScore_l {
	width: 177px;
	height: 147px;
	background-color: rgba(40, 168, 224, 0.7);
	padding: 30px;
}

#evaluation .totalScore .totalScore_l .totalScore_l_l {
	width: 66.66%;
	height: 100%;
	float: left;
}

#evaluation .totalScore .totalScore_l .totalScore_l_l .total_t,
#evaluation .totalScore .totalScore_l .totalScore_l_l .total_b {
	width: 100%;
	height: 50%;
	text-align: center;
	line-height: 43.5px;
	color: #fff;
}

#evaluation .totalScore .totalScore_l .totalScore_l_l .total_t {
	font-size: 36px;
}

#evaluation .totalScore .totalScore_l .totalScore_l_l .total_b {
	font-size: 24px;
}

#evaluation .totalScore .totalScore_l .totalScore_l_r {
	width: 33.33%;
	height: 100%;
	float: left;
	position: relative;
}

#evaluation .totalScore .totalScore_r {
	width: 559px;
	height: 147px;
	padding: 20px 40px 22px 42px;
}

#evaluation .totalScore .totalScore_r .totalScore_r_t {
	width: 100%;
	height: 36px;
	line-height: 36px;
	margin-bottom: 9px;
}

#evaluation .totalScore .totalScore_r .totalScore_r_t span:nth-child(1) {
	display: block;
	width: 72px;
	height: 36px;
	line-height: 36px;
	font-size: 18px;
	color: #333;
	float: left;
}

#evaluation .totalScore .totalScore_r .totalScore_r_t span:nth-child(2) {
	display: block;
	height: 36px;
	line-height: 36px;
	font-size: 36px;
	color: #ff9800;
	float: right;
}

#evaluation .totalScore .totalScore_r .totalScore_r_b {
	width: 100%;
	height: auto;
}

#evaluation .totalScore .totalScore_r .totalScore_r_b p {
	width: 100%;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: normal;
	font-size: 16px;
	color: #a5a5a5;
	margin-bottom: 8px;
}

#evaluation .totalScore .totalScore_l .totalScore_l_r img {
	display: block;
	width: 18px;
	height: 32px;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}

#evaluation .totalScore .environment {
	width: 33.33%;
	height: 100%;
	float: left;
	padding: 20px 60px;
}

#evaluation .totalScore .environment .environment_t,
#evaluation .totalScore .environment .environment_b {
	width: 100%;
	height: 50%;
}

#evaluation .totalScore .environment .environment_t {
	text-align: center;
	line-height: 52.5px;
	font-size: 18px;
	color: #333;
}

#evaluation .totalScore .environment .environment_b .environment_b_l,
#evaluation .totalScore .environment .environment_b .environment_b_r {
	width: 50%;
	height: 100%;
	float: left;
	position: relative;
}

#evaluation .totalScore .environment .environment_b .environment_b_l {
	text-align: center;
	line-height: 52.5px;
	font-size: 36px;
	color: #333;
}

#evaluation .totalScore .environment .environment_b .environment_b_r img {
	display: block;
	width: 18px;
	height: 32px;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
}

#evaluation .list {
	margin-bottom: 20px;
}

#evaluation .list .user_img {
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
}

#evaluation .list .user_img .user {
	width: 49px;
	height: 49px;
	border-radius: 50%;
}

#evaluation .list .user_img .shop {
	width: 44px;
	height: 44px;
}

#evaluation .list .list_title {
	width: 100%;
	height: 50px;
}

#evaluation .list .list_title .list_title_l,
#evaluation .list .list_title .list_title_r {
	width: 50%;
	height: 100%;
	float: left;
	line-height: 45px;
}

#evaluation .list .list_title .list_title_l span {
	font-size: 16px;
	color: #333;
	font-weight: bold;
}

#evaluation .list .list_title .list_title_l span:first-child {
	margin-right: 11px;
}

#evaluation .list .list_title .list_title_l span:nth-child(2) {
	display: inline-block;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background: #000;
	margin-right: 11px;
	vertical-align: middle;
}

#evaluation .list .list_title .list_title_l span:last-child a {
	font-size: 16px;
	color: #ff3c05;
}

#evaluation .list .list_title .list_title_r span {
	color: #28a8e0;
	font-size: 16px;
	float: right;
	padding-right: 46px;
	cursor: pointer;
}
</style>