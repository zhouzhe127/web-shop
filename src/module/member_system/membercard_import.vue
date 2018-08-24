<template>
	<div id="member-import">
		<!-- 实体会员导入 -->
		<div class="title">
			<form class="theForm" enctype="multipart/form-data" id="uploadForm">
				<a href="javascript:void(0);" style=" background: #28A8E0;
        color: #fff;">电子会员导入</a>
				<input type="file" accept="application/vnd.ms-excel,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="imports('1')" id="file" name="file" style="opacity: 0; position: absolute;top:0;left:0;width: 133px;height: 38px;" />
			</form>
			<form class="theForm" enctype="multipart/form-data" id="uploadForm">
				<a href="javascript:void(0);" style=" background: #28A8E0;
        color: #fff;">实体会员导入</a>
				<input type="file" accept="application/vnd.ms-excel,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="imports('0')" id="file" name="file" style="opacity: 0; position: absolute;top:0;left:0;width: 133px;height: 38px;" />
			</form>
			<a href="javascript:void(0);" @click="filterExport('0')">实体卡样例表格下载</a>
			<a href="javascript:void(0);" @click="filterExport('1')">电子会员样例表格下载</a>
		</div>
		<!-- 进度条 -->
		<div class="progress" style="opacity: 0;" ref="progress">
			<span>进度</span>
			<div class="progressbar">
				<!--用来模仿进度条推进效果的进度条元素-->
				<div class="fill" ref="fill"></div>
			</div>
			<!-- loading 加载 -->
			<div class="spinner" v-if="resultShowed == '' && importStatus == true">
				<div class="spinner-container container1">
					<div class="circle1"></div>
					<div class="circle2"></div>
					<div class="circle3"></div>
					<div class="circle4"></div>
				</div>
				<div class="spinner-container container2">
					<div class="circle1"></div>
					<div class="circle2"></div>
					<div class="circle3"></div>
					<div class="circle4"></div>
				</div>
				<div class="spinner-container container3">
					<div class="circle1"></div>
					<div class="circle2"></div>
					<div class="circle3"></div>
					<div class="circle4"></div>
				</div>
			</div>
			<span v-if="resultShowed == '' && importStatus == true">导入中</span>
			<span v-if="resultShowed != '' && importStatus == true">导入完成</span>
			<span v-if="resultShowed == '' && importStatus == false">导入失败</span>
		</div>
		<!-- 结果显示 -->
		<div class="results" v-if="resultShowed != ''">
			<div class="results_t">
				结果显示
			</div>
			<div class="results_b">
				<div class="results_l">
					<div class="container">
						<div class="container_t">
							<span></span>
							<span>导入成功</span>
							<a href="javascript:void(0);" @click="downloadForm(resultShowed,'1')">下载</a>
						</div>
						<div class="container_b">
							<span>{{resultShowed.successNum}}人</span>
							<span style="margin: 0 15px;">|</span>
							<span>{{resultShowed.successPrice}}元</span>
						</div>
					</div>
				</div>
				<div class="results_r">
					<div class="container">
						<div class="container_t">
							<span></span>
							<span>导入失败</span>
							<a href="javascript:void(0);" @click="downloadForm(resultShowed,'2')">下载</a>
						</div>
						<div class="container_b">
							<span>{{resultShowed.failNum}}人</span>
							<span style="margin: 0 15px;">|</span>
							<span>{{resultShowed.failPrice}}元</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 列表 -->
		<com-table :listHeight='80' :listName="'会员导入'" :showTitle='2' :listWidth="1436" :widthType='true' :introData="formList" :titleData="titleList" :allTotal="allFormList.length">
			<div slot="con-0" slot-scope="props" class="imports">
				<a href="javascript:void(0);" @click="downloadForm(props.data,'1')">已导入表格</a>
				<a href="javascript:void(0);" @click="downloadForm(props.data,'2')">未导入表格</a>
			</div>
			<div slot="con-2" slot-scope="props">{{transFormDates(props.data.createTime)}}</div>
		</com-table>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

let userDate = storage.session('userShop');
let timer;
export default {
	data() {
		return {
			page: 1,
			num: 10,
			endTotal: 1,
			exportUrl: 'javascript:void(0);', //样例表格下载
			allFormList: [], //总数据 前端自行分页
			formList: [], //以往过期表格列表
			sucexportUrl: 'javascript:void(0);', //成功的表格下载
			failexportUrl: 'javascript:void(0);', //失败的表格下载
			resultShowed: '', //显示结果
			progressTotal: 100,
			curN: 0,
			importStatus: true, //导入成功失败状态
			shopId: '', //店铺id
			titleList: [{
					titleName: '表格下载',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 287 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '序号',
					dataName: 'id',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 229.5 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '导入时间',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 229.5 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '成功人数',
					dataName: 'successNum',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 229.5 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '失败人数',
					dataName: 'failNum',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 229.5 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '共计导入金额',
					dataName: 'successPrice',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 229.5 + 'px',
						flex: 'none'
					}
				}
			],
		};
	},
	methods: {
		init: function() {
			let fill = document.getElementsByClassName('fill')[0];
			let total = 100; //总数
			let curN = 30; //当前值
			//通过间隔定时器实现百分比文字效果,通过计算CSS动画持续时间进行间隔设置
			let timer = setInterval(function() {
				curN++;
				fill.style.width = ((curN / total) * 421) + 'px'; //200是外框的宽度
				fill.innerHTML = (curN / total) * 100 + '%';
				if (curN >= total) clearInterval(timer);
			}, 1);
		},
		//选择页数
		selectPage: function(item) {
			this.page = 1;
			this.num = item.name;
			this.getPastform();
			this.pageBtn = !this.pageBtn;
		},
		//一页显示多少行
		showPageList: function() {
			this.pageBtn = !this.pageBtn;
		},
		//导入
		imports: function(type) {
			this.importsForm(type);
		},
		async importsForm(type) {
			let info = await http.importCard({
				data: {
					ischain: userDate.currentShop.ischain,
					shopId: this.shopId,
					type: 1,
					importType: type
				},
				formId: 'uploadForm'
			});
			if (info) {
				this.$refs.progress.style.opacity = '1';
				this.curN = 0;
				this.resultShowed = '';
				let self = this;
				timer = setInterval(function() {
					if (self.curN < 90) {
						self.curN += Math.floor(Math.random() * 10 + 1);
					}
					self.$refs.fill.style.width = ((self.curN / self.progressTotal) * 421) + 'px'; //200是外框的宽度
					self.$refs.fill.innerHTML = parseInt((self.curN / self.progressTotal) * 100) + '%';
					self.getProgress(info);
				}, 2000);
			}
		},
		async getProgress(data) { //获取导入进度
			let date = null;
			try {
				date = await http.getImportCardExcel({
					data: {
						createTime: data,
						type: 0
					}
				}, true);
			} catch (e) {
				this.importStatus = false;
				clearInterval(timer);
				this.$store.commit('setWin', {
					content: e.error.message,
					title: '操作提示',
					winType: 'alert'
				});
				return false;
			}
			if (date !== false) {
				this.importStatus = true;
				clearInterval(timer);
				this.$refs.fill.style.width = 421 + 'px'; //421是外框的宽度
				this.$refs.fill.innerHTML = 100 + '%';
				this.resultShowed = date;
				this.getPastform();
			}
		},
		filterExport: function(type) {
			this.getsampleForm(type);
		},
		async getsampleForm(type) {
			//0 实体卡  1会员
			await http.importCardSample({
				data: {
					type:type
				}
			});
		},
		async getPastform() {
			let data = await http.getImportCardList({
				data: {

				}
			});
			this.allFormList = data;
			this.allFormList = this.allFormList.sort(this.sortList('id'));
			this.$nextTick(() => {
				this.setPage();
			});
		},
		changeFormat: function(t) {
			t -= 0;
			if (t < 10) {
				return ('0' + t);
			} else {
				return (t + '');
			}
		},
		transFormDates: function(time) { //日期格式化方法
			time += '';
			if (time.length == 10) {
				time -= 0;
				time *= 1000;
			} else {
				time -= 0;
			}
			let date = new Date(time);
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '/' + date.getHours() + ':' +
				this.changeFormat(date.getMinutes());
		},
		downloadForm: function(item, type) {
			this.donloadsForm(item, type);
		},
		async donloadsForm(item, type) {
			await http.getImportCardExcels({
				data: {
					createTime: item.createTime,
					type: type
				},
				type: 'file'
			});
		},
		setPage: function() {
			this.endTotal = Math.ceil((this.allFormList.length) / (this.num));
			let pageStart = (this.page - 1) * (this.num);
			let pageEnd = (this.page) * (this.num);
			let pageContent = this.allFormList.slice(pageStart, pageEnd);
			this.formList = pageContent;
		},
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.setPage();
		},
		sortList: function(key) {
			return function(a, b) {
				let value1 = parseInt(a[key]);
				let value2 = parseInt(b[key]);
				if (value1 > value2) {
					return -1;
				} else if (value1 < value2) {
					return 1;
				} else {
					return 0;
				}
			};
		}
	},
	// watch: {
	//     'page': 'setPage'
	// },
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.getPastform();
	},
	components: {
		pageElement: () =>
			import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		comTable: () =>
			import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
	}
};
</script>
<style type="text/css" scoped>
#member-import .title {
	width: 100%;
	height: 40px;
	margin-bottom: 16px;
}

#member-import .title .theForm {
	position: relative;
	float: right;
	margin-right: 14px;
}

#member-import .title a {
	min-width: 133px;
	padding: 0 10px;
	height: 38px;
	display: block;
	font-size: 16px;
	border: 1px solid #28A8E0;
	text-align: center;
	line-height: 38px;
}

#member-import .title>a {
	float: right;
	margin-right: 14px;
	color: #28A8E0;
}

#member-import .progress {
	width: 100%;
	height: 24px;
	margin-bottom: 22px;
	line-height: 24px;
}

#member-import .progress span {
	float: left;
	font-size: 16px;
}

#member-import .progress span:nth-child(1) {
	margin-left: 41px;
	margin-right: 21px;
}

#member-import .progress .progressbar {
	float: left;
	width: 421px;
	height: 24px;
	border-radius: 12px;
	background: #E6E6E6;
	overflow: hidden;
	margin-right: 20px;
}

#member-import .progress .progressbar .fill {
	/*animation: move 2s;*/
	text-align: center;
	background-color: #FE982E;
	float: left;
	width: 0px;
	height: 24px;
	border: 0px;
}

#member-import .results {
	width: 742px;
	height: 211px;
	border: 1px solid #D2D2D2;
	margin-bottom: 44px;
	background: #F2F2F2;
}

#member-import .results .results_t {
	width: 100%;
	height: 41px;
	line-height: 41px;
	font-size: 16px;
	padding-left: 38px;
}

#member-import .results .results_b {
	width: 100%;
	height: 168px;
}

#member-import .results .results_b .container {
	width: 248px;
	height: auto;
	margin: 0 auto;
}

#member-import .results .results_b .container .container_t {
	width: 100%;
	height: 55px;
	line-height: 55px;
}

#member-import .results .results_b .container .container_t span:first-child {
	display: inline-block;
	width: 10px;
	height: 10px;
	background: #FF8D09;
	margin-right: 11px;
}

#member-import .results .results_b .container .container_t span:nth-child(2) {
	font-size: 16px;
	margin-right: 120px;
}

#member-import .results .results_b .container .container_t a {
	display: inline-block;
	width: 32px;
	height: 18px;
	text-align: center;
	line-height: 18px;
	color: #2FA8DC;
	border-bottom: 1px solid #2FA8DC;
}

#member-import .results .results_b .container .container_b {
	width: 100%;
	height: 96px;
	background: #F2F2F2;
	text-align: center;
	line-height: 96px;
}

#member-import .results .results_b .container .container_b span {
	font-size: 16px;
}

#member-import .results .results_b .results_l {
	width: 366px;
	height: 168px;
	background: #fff;
	float: left;
}

#member-import .results .results_b .results_r {
	width: 366px;
	height: 168px;
	background: #fff;
	float: right;
}

#member-import .list {
	width: 1436px;
	min-height: 156px;
	border: 1px solid #D2D2D2;
}

#member-import .list .list_title {
	width: 1436px;
	height: 45px;
	line-height: 45px;
	padding-left: 17px;
}

#member-import .list .list_title span {
	font-size: 16px;
	color: #333;
	font-weight: bold;
}

#member-import .list .list_title span:first-child {
	margin-right: 11px;
}

#member-import .list .list_title span:nth-child(2) {
	display: inline-block;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background: #000;
	margin-right: 11px;
	vertical-align: middle;
}

#member-import .list .list_title span:last-child a {
	font-size: 16px;
	color: #FF3C05;
}

#member-import .imports a {
	color: #00AAE5;
	cursor: pointer;
	display: inline-block;
	width: 80px;
	height: 18px;
	text-align: center;
	line-height: 18px;
	border-bottom: 1px solid #2EA8DC;
	margin: 0 21px;
}


/*loading加载的css*/

.spinner {
	float: left;
	width: 20px;
	height: 20px;
	position: relative;
	margin-right: 17px;
}

.container1>div,
.container2>div,
.container3>div {
	width: 6px;
	height: 6px;
	background-color: #FE982E;
	border-radius: 100%;
	position: absolute;
	-webkit-animation: bouncedelay 1.2s infinite ease-in-out;
	animation: bouncedelay 1.2s infinite ease-in-out;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
}

.spinner .spinner-container {
	position: absolute;
	width: 100%;
	height: 100%;
}

.container2 {
	-webkit-transform: rotateZ(45deg);
	transform: rotateZ(45deg);
}

.container3 {
	-webkit-transform: rotateZ(90deg);
	transform: rotateZ(90deg);
}

.circle1 {
	top: 0;
	left: 0;
}

.circle2 {
	top: 0;
	right: 0;
}

.circle3 {
	right: 0;
	bottom: 0;
}

.circle4 {
	left: 0;
	bottom: 0;
}

.container2 .circle1 {
	-webkit-animation-delay: -1.1s;
	animation-delay: -1.1s;
}

.container3 .circle1 {
	-webkit-animation-delay: -1.0s;
	animation-delay: -1.0s;
}

.container1 .circle2 {
	-webkit-animation-delay: -0.9s;
	animation-delay: -0.9s;
}

.container2 .circle2 {
	-webkit-animation-delay: -0.8s;
	animation-delay: -0.8s;
}

.container3 .circle2 {
	-webkit-animation-delay: -0.7s;
	animation-delay: -0.7s;
}

.container1 .circle3 {
	-webkit-animation-delay: -0.6s;
	animation-delay: -0.6s;
}

.container2 .circle3 {
	-webkit-animation-delay: -0.5s;
	animation-delay: -0.5s;
}

.container3 .circle3 {
	-webkit-animation-delay: -0.4s;
	animation-delay: -0.4s;
}

.container1 .circle4 {
	-webkit-animation-delay: -0.3s;
	animation-delay: -0.3s;
}

.container2 .circle4 {
	-webkit-animation-delay: -0.2s;
	animation-delay: -0.2s;
}

.container3 .circle4 {
	-webkit-animation-delay: -0.1s;
	animation-delay: -0.1s;
}

@-webkit-keyframes bouncedelay {
	0%,
	80%,
	100% {
		-webkit-transform: scale(0.0)
	}
	40% {
		-webkit-transform: scale(1.0)
	}
}

@keyframes bouncedelay {
	0%,
	80%,
	100% {
		transform: scale(0.0);
		-webkit-transform: scale(0.0);
	}
	40% {
		transform: scale(1.0);
		-webkit-transform: scale(1.0);
	}
}

.calendar-ctr {
	width: 38px;
	height: 40px;
	position: relative;
	z-index: 5;
	border-left: #b3b3b3 solid 1px;
}

.calendar-ctr i {
	height: 10px;
	width: 10px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -5px;
	margin-left: -5px;
	border-top: 10px solid #b3b3b3;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	box-sizing: border-box;
}


/*翻页================================*/

.turn-page {
	margin: 10px 0 30px 0;
}
</style>