<!--
	**改价记录弹窗
	*
	* 胡江
	* *
	*
-->
<template>
	<win @winEvent="clickResult" :align="'center'" :width="800" :height="600" :ok="okStyle" :cancel="cancelStyle">
		<!--标题-->
		<span slot="title">{{title}}</span>
		<!--内容-->
		<div slot="content">
			<section id="detail">
				<div class="top_search">
					<section class="chooseTime">
						<div class="gaiTime">修改时间：</div>
						<div class="input-box">
							<!--日期组件 开始时间-->
							<calendar :time="startTime" class="data-box" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
						</div>
						<span class="input-word">至</span>
						<div class="input-box">
							<!--日期组件 开始时间-->
							<calendar :time="endTime" class="data-box" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
						</div>
					</section>
					<section class="statisticsList">
						<a @click="resetTime" href="javascript:void(0);" class="reset">重置</a>
						<a @click="search" href="javascript:void(0);" class="blue">筛选</a>
					</section>
				</div>
				<section class="box" style="width: 760px;min-width: 0;">
					<section class="content-box">
						<ul class="ulT">
							<li>修改时间</li>
							<li>操作员</li>
							<li>价格</li>
						</ul>
						<ul v-for="(item,i) in currentList" :key="i">
							<li>{{getDate(item.time * 1000)}}</li>
							<li>{{item.name}}</li>
							<li>{{item.price}}</li>
						</ul>
						<ul v-if="list.length == 0">
							<li class="gaiTimeLi" style="width:100%;">该时间段内暂无改价记录</li>
						</ul>
					</section>
				</section>
				<section style="margin-top: 10px">
					<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :isNoJump="true" :numArr="[10,20]"></pageElement>
				</section>
			</section>
		</div>
	</win>
</template>

<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			startTime: new Date().getTime() - 24 * 3600 * 1000 * 7, //开始时间 一周前开始
			endTime: new Date().getTime(), //结束时间
			num: 10, //一页处理多少数据
			total: 0, //总页数
			count: 0, //总记录
			page: 1, //当前的页数
			list: [], //所有数据
			currentList: [], //当前页展示的数据
			okStyle: null,
			cancelStyle: null
		};
	},
	props: {
		userData: Object,
		id: '',
		title: '',
		item: Object
	},
	mounted() {
		this.okStyle = {
			content: '',
			style: {
				backgroundColor: '#FFFFFF'
			}
		};
		this.cancelStyle = {
			content: '',
			style: {
				backgroundColor: '#FFFFFF'
			}
		};
		this.init();
	},
	methods: {
		startTimeChange(time) {
			//开始时间
			this.startTime = time;
		},
		endTimeChange(time) {
			//结束时间
			this.endTime = new Date(time).setHours(23, 59, 59, 999);
		},
		pageChange(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.total = Math.ceil(this.list.length / this.num); //获取总页数
			this.currentList = this.list.slice(
				(this.page - 1) * this.num,
				(this.page - 1) * this.num + this.num
			); //点击下一页
		},
		async init() {
			let res = await http.getLogByPrice({
				data: {
					shopId: this.userData.currentShop.id,
					id: this.id,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000 + 24 * 3600 - 1)
				}
			});
			if (res) {
				this.list = res;
				//获取总页数
				this.total = Math.ceil(this.list.length / this.num);
				//获取总数量
				this.count = this.list.length;
				this.page = 1;
				//截取当前页数据
				this.currentList = this.list.slice(
					(this.page - 1) * this.num,
					(this.page - 1) * this.num + this.num
				);
			}
		},
		//时间戳转日期
		getDate(time, date) {
			return date
				? utils.format(new Date(time), 'yyyy年MM月dd日')
				: utils.format(new Date(time), 'yyyy年MM月dd日 hh:mm:ss');
		},
		//重置
		resetTime() {
			this.startTime = new Date().getTime() - 24 * 3600 * 1000 * 7;
			this.endTime = new Date().getTime();
			this.init();
		},
		//筛选
		search() {
			this.init();
		},
		clickResult(res) {
			this.$emit('throwWinResult', res); //抛出一个事件给父组件
		}
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		calendar: () =>
			import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		pageElement: () =>
			import(/*webpackChunkName:"page_element"*/ 'src/components/page_element')
	}
};
</script>

<style type="text/css" scoped>
#detail {
	margin: 20px;
}
.top_search {
	margin-bottom: 10px;
}
/*日期组件*/
.chooseTime {
	line-height: 40px;
	text-align: center;
	color: #333;
	position: relative;
	display: inline-block;
}
.gaiTime {
	/* display: inline-block; */
	width: 100px;
	font-size: 16px;
	float: left;
}
.input-box {
	width: 200px;
	float: left;
}
.input-word {
	padding: 0 5px;
	height: 40px;
	line-height: 40px;
	float: left;
}
/*搜索重置=================*/
.statisticsList {
	float: right;
}
.statisticsList .reset {
	color: #00adef;
}
.statisticsList a {
	width: 90px;
	height: 40px;
	border: 1px solid #00adef;
	line-height: 40px;
}
/*列表*/
.box .content-box ul {
	width: 100%;
	height: 40px;
	border-bottom: 1px solid #b3b3b3;
}
.box .content-box ul li {
	/* display: inline-block; */
	width: 32%;
	height: 100%;
	line-height: 40px;
	text-align: center;
	float: left;
}
.gaiTimeLi {
	width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	color: orange;
}
.box {
	width: 100%;
	min-width: 1000px;
	border: 1px solid #b3b3b3;
}
</style>