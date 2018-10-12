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
			<section style="padding: 20px;">
				<div style="margin-bottom: 10px;">
					<span style="font-size:16px;">修改时间：</span>
					<el-date-picker
						v-model="startTime"
						type="datetime"
						placeholder="选择日期">
					</el-date-picker>
					<span style="width: 25px;line-height: 40px;text-align: center;">至</span>
					<el-date-picker
						v-model="endTime"
						type="datetime"
						placeholder="选择日期">
					</el-date-picker>
					<el-button v-on:click="search" type="primary">筛选</el-button>
					<el-button v-on:click="resetTime" type="info">重置</el-button>
				</div>
				<section class="box">
					<el-table
						stripe :header-cell-style = "{'background-color':'#f5f7fa'}"
						:data="currentList"
						style="width: 100%">
						<el-table-column  show-overflow-tooltip align="center" prop="returnNum" label="最后修改时间" >
							<template slot-scope="scope">
								<span>{{getDate(scope.row.time*1000)}}</span>
							</template>
						</el-table-column>
						<el-table-column show-overflow-tooltip align="center" prop="name" label="操作员" ></el-table-column>
						<el-table-column show-overflow-tooltip align="center" prop="price" label="价格"></el-table-column>
					</el-table>
				</section>
				<section style="margin-top: 10px">
					<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="Number(page)" :page-count="Number(total)" :page-size ="Number(num)" layout="sizes, prev, pager, next" :page-sizes="[10, 20, 30]"></el-pagination>
					<!-- <pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :isNoJump="true" :numArr="[10,20]"></pageElement> -->
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
			num: 2, //一页处理多少数据
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
		// startTimeChange(time) {
		// 	//开始时间
		// 	this.startTime = time;
		// },
		// endTimeChange(time) {
		// 	//结束时间
		// 	this.endTime = new Date(time).setHours(23, 59, 59, 999);
		// },
		pageChange(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.total = Math.ceil(this.list.length / this.num); //获取总页数
			this.currentList = this.list.slice(
				(this.page - 1) * this.num,
				(this.page - 1) * this.num + this.num
			); //点击下一页
		},
		//分页点击
		pageClick: function(e) {
			this.page = e;
			this.total = Math.ceil(this.list.length / this.num); //获取总页数
			this.currentList = this.list.slice(
				(this.page - 1) * this.num,
				(this.page - 1) * this.num + this.num
			); //点击下一页
		},
		//每页显示多少条点击
		numChange(e){
			this.num = e;
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
		// calendar: () =>
		// 	import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		// pageElement: () =>
		// 	import(/*webpackChunkName:"page_element"*/ 'src/components/page_element')
	}
};
</script>