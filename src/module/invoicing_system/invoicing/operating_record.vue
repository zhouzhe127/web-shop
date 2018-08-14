<template>
	<div style="margin:20px 0 30px 0;">
		<div class="serBox">
			<h1>操作时间：</h1>
			<div class="timer">
				<calendar :only="false" :time="startTime" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
			</div>
			<div class="timer">
				<calendar :only="false" :time="endTime" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
			</div>
			<div style="display:inline-block;vertical-align: top;margin:0 10px">
				<select-btn :sorts="typeList" :name="allGoods" @selOn="selectList" ref="select"></select-btn>
			</div>
			<div class="setSpeen">
				<a @click="searchReset" href="javascript:void(0);" class="gray" style="width: 100px;height: 40px;line-height: 40px;margin-right: 8px;">重置</a>
				<a @click="searchList" href="javascript:void(0);" class="blue" style="width: 100px;height: 40px;line-height: 40px;">筛选</a>
			</div>
		</div>
		<section class="listBox" style="width:100%;height:auto;margin-top: 20px;">
			<com-table :listName="'操作记录列表'" :titleData="titleList" :allTotal="numTotle" :introData="dataList">
				<span slot="con-0" slot-scope="props">{{typeList[props.data.logType]}}</span>
				<span slot="con-5" slot-scope="props">{{changTime(props.data.createTime)}}</span>
			</com-table>
		</section>
		<page-turn :total="pageTotal" :isNoJump="false" :isNoPaging='true' :page="page" @pageNum="changePage" ref="pageTurn"></page-turn>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				startTime: new Date().setHours(0, 0, 0, 0),
				endTime: utils.getTime({
					time: new Date()
				}).end,
				typeList: ['全部操作类型'],
				allGoods: '全部操作类型',
				type: 0,
				dataList: '',
				createTime: '',
				numTotle: 0,
				pageTotal: 1,
				page: 1,
				num: 10,
				titleList: [{
					titleName: '操作类型'
				},
				{
					titleName: '库存变化量',
					dataName: 'invenChange'
				},
				{
					titleName: '货架变化量',
					dataName: 'shelfChange'
				},
				{
					titleName: '库存余量',
					dataName: 'invenTotal'
				},
				{
					titleName: '货架余量',
					dataName: 'shelfTotal'
				},
				{
					titleName: '操作时间'
				},
				{
					titleName: '操作人',
					dataName: 'createUname'
				}],
			};
		},
		props: ['gid'],
		methods: {
			async init(page) {
				this.page = 1;
				let data = await http.getInventoryLogByGid({
					data: {
						gid: this.gid,
						begin: this.startTime / 1000,
						end: this.endTime / 1000,
						type: this.type,
						page: page ? page : this.page
					}
				});
				this.dataList = data.list;
				this.pageTotal = data.total;
				this.numTotle = data.count;
			},
			async getType() {
				let data = await http.invoicing_getInventoryLogType();
				for (let i in data) {
					this.typeList.push(data[i].typeName);
				}
			},
			changTime(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd hh:mm');
			},
			startTimeChange(time) {
				this.startTime = utils.getTime({
					time: time
				}).start;
			},
			endTimeChange(time) {
				this.endTime = utils.getTime({
					time: time
				}).end;
			},
			selectList(index) {
				this.type = index;
			},
			searchReset() {
				this.$refs.select.sortName = '全部操作类型';
				this.$refs.select.selected = 0;
				this.type = 0;
				this.startTime = new Date().setHours(0, 0, 0, 0);
				this.endTime = utils.getTime({
					time: new Date()
				}).end;
				this.init(1);
			},
			searchList() {
				this.init();
			},
			changePage: function (currentPage) {
				this.page = currentPage.page;
				this.init(currentPage.page+'');
			}
		},
		mounted() {
			this.getType();
			this.init();
		},
		components: {
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			pageTurn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			comTable: () =>
				import ( /*webpackChunkName: 'table'*/ 'src/components/com_table')
		}
	};
</script>
<style lang="less" scoped>
	@media only screen and (max-width:1250px) {
		.setSpeen {
			margin-top: 10px;
			display: block !important;
		}
	}

	.infoDetail {
		display: inline-block;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		text-align: center;
	}

	.setSpeen {
		display: inline-block;
	}

	.tebBox {
		display: inline-block;
		border: 1px orange solid;
		color: orange;
		cursor: pointer;
		li {
			display: inline-block;
			padding: 10px 30px;
		}
		.active {
			background-color: orange;
			color: #ffffff;
		}
	}

	.serBox {
		h1 {
			display: inline-block;
			line-height: 42px;
		}
		.timer {
			display: inline-block;
			width: 200px;
			margin-left: 10px;
		}
	}
</style>