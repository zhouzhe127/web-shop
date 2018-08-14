<template>
	<win :width="980" :height="510" @winEvent="winEvent">
		<span slot="title">{{title}}</span>
		<div slot="content" id="tan" style="padding: 20px 40px;">
			<section class="batch" style="clear:both">
				<section class="topTitle">
					<span>商品名称：</span>
					<span>{{detail.gName}}</span>
				</section>
				<section class="topTitle">
					<span>条码：</span>
					<span>{{detail.barCode}}</span>
				</section>
				<section class="topTitle">
					<span>规格：</span>
					<span>{{detail.specifications}}</span>
				</section>
				<section class="topTitle">
					<span>分类：</span>
					<span>{{goodsCate}}</span>
				</section>
				<div class="awaySet" style="margin-top: 20px;">
					<div class="awaySet-left">
						<input type="text" id="" placeholder="输入供应商" v-model="searchText" />
						<input type="text" id="" placeholder="输入批次编号" v-model="searchCade" />
						<div style="width: 210px; height: 40px;border: 1px solid #CECDCD;line-height: 40px; float: left;">
							<div style="width: 100%; height: 40px; line-height: 40px;cursor: pointer;" @click="showCalendar">
								<div style="float: left;width: 45%; height: 40px;text-align: center;">{{transFormDate(startTime)}}</div>
								<div style="float: left;width: 10%; height: 40px;text-align: center;">-</div>
								<div style="float: left;width: 45%; height: 40px;text-align: center;">{{transFormDate(endTime)}}</div>
							</div>
							<can-multi @closeCan="()=>{isShowCa=false}" v-if="isShowCa" :sideStart="startTime" :sideEnd="endTime" @castTime="getAddAlltime"></can-multi>
							<div class="fl calendar-ctr" onclick="$('#mycalendar2').mouseup();">
								<i></i>
							</div>
						</div>
					</div>
					<div class="awaySet-right">
						<a @click="searchReset" href="javascript:void(0);" class='blueBor' style="width: 100px;height: 40px;line-height: 40px;margin-right: 5px;">重置</a>
						<a @click="searchNum" href="javascript:void(0);" class="blue" style="width: 100px;height: 40px;line-height: 40px;">筛选</a>
					</div>
				</div>
				<div class="homeTitle" style="border-top: 1px solid #ccc;padding: 10px 0;margin-top: 20px;">
					<ul>
						<li>序号</li>
						<li>批次编码</li>
						<li>生产日期</li>
						<li style="width: 30%;">供应商</li>
						<li>数量</li>
					</ul>
				</div>
				<!--列表内容 list-->
				<div class="homeList" v-for="(list,index) in showList" :key="index" style="padding: 2px 0;height: 54px;">
					<ol style="cursor: pointer;" @click="batchSel(list,index)" :class="{selon: batchNum == index}">
						<li>{{index+1}}</li>
						<li>{{list.batchCode}}</li>
						<li>{{getTime(list.productionTime)}}</li>
						<li style="width: 30%;">{{list.supplier}}</li>
						<li>{{list.surplus}}</li>
					</ol>
				</div>
				<div v-if="batchDetail == 0" id="emptyData">目前没有可操作数据</div>
				<page-turn ref="pageEdit" :isNoJump="false" :isNoPaging='true' :page="page" :total='total' :len="10" style="float: right;margin-top: 10px;"
				    @pageNum="pageChanged" v-if="total > 1"></page-turn>
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
				title: '批次选择',
				titleList: null,
				startTime: utils.getTime({
					time: new Date()
				}).start, //日期组件的开始时间
				endTime: utils.getTime({
					time: new Date()
				}).end, //日期组件的结束时间
				page: 1,
				total: 0, // 总页数
				count: 0, // 总记录条数
				num: 10, // 当前每页展示数量
				isShowCa: false,
				searchCade: '',
				searchText: '',
				newDetail: '',
				batchDetail: 0,
				batchNum: null,
				goodsCate: [], //分类
				showList: '',
				batchItem: ''
			};
		},
		props: ['detail', 'gid'],
		methods: {
			getAddAlltime(time) {
				this.startTime = new Date(time.startTime).getTime();
				this.endTime = new Date(time.endTime).getTime();
				this.isShowCa = false;
			},
			winEvent(str) {
				this.$emit('winEvent', str, this.batchItem);
			},
			async init() {
				let res = await http.getGoodsBatch({
					data: {
						gid: this.gid
					}
				});
				this.batchDetail = res.list;
				this.newDetail = utils.deepCopy(this.batchDetail);
				this.resetGoods();
			},
			//点击下一页
			pageChanged(page) {
				this.page = page.page;
				this.resetGoods();
			},
			batchSel(list, index) {
				this.batchNum = index;
				this.batchItem = list;
			},
			searchReset() {
				this.searchText = '';
				this.searchCade = '';
				this.startTime = utils.getTime({
					time: new Date()
				}).start;
				this.endTime = utils.getTime({
					time: new Date()
				}).end;
				this.page = 1;
				this.newDetail = this.batchDetail;
				this.resetGoods();
			},
			searchNum() {
				let searchText = this.searchText;
				let searchCade = this.searchCade;
				let arr = [];
				for (let i = 0; i < this.batchDetail.length; i++) {
					let list = this.batchDetail[i];
					let createTime = list.createTime * 1000;
					let endTime = new Date(this.endTime);
					endTime.setDate(endTime.getDate() + 1);
					if (
						list.supplier.indexOf(searchText) != -1 &&
						list.batchCode.indexOf(searchCade) == 0 &&
						this.startTime <= createTime &&
						createTime <= endTime
					) {
						arr.push(list);
					}
				}
				this.newDetail = arr;
				this.resetGoods();
			},
			resetGoods: function () {
				this.total = Math.ceil(this.newDetail.length / this.num);
				this.showList = this.newDetail.slice(
					(this.page - 1) * 10,
					this.page * 10
				);
			},
			showCalendar() {
				//打开日期插件
				this.isShowCa = !this.isShowCa;
			},
			//获取日期
			getTime(time) {
				return utils.format(new Date(time * 1000), 'yyyy年MM月dd日');
			},
			transFormDate(t) {
				return utils.format(new Date(t), 'yyyy-MM-dd');
			}
		},
		mounted() {
			for (let item of this.detail.cate) {
				this.goodsCate.push(item.name);
			}
			this.goodsCate = this.goodsCate.join(',');
			this.init();
		},
		components: {
			'page-turn': () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
			'can-multi': () =>
				import ( /*webpackChunkName: 'can_multi'*/ 'src/components/can_multi')
		}
	};
</script>

<style type="text/css" scoped>
	.awaySet {
		height: 40px;
	}

	.awaySet .awaySet-left {
		float: left;
		margin-right: 30px;
	}

	.awaySet .awaySet-right {
		float: left;
		height: 40px;
		overflow: hidden;
	}

	#emptyData {
		margin: 0 auto;
		text-align: center;
		height: 50px;
		line-height: 50px;
		color: orange;
	}

	.awaySet .awaySet-left input {
		width: 200px;
		height: 38px;
		text-indent: 5px;
		margin-right: 10px;
		float: left;
	}

	.blueBor {
		box-sizing: border-box;
		border: 1px #28a8e0 solid;
		color: #28a8e0;
	}

	.blueBor:hover {
		background-color: #eee;
	}

	#tan .homeTitle ul li {
		border-right: 1px solid #ccc;
		height: 30px;
		line-height: 30px;
		float: left;
	}

	#tan .homeList ol:hover {
		background-color: #f2f6f8;
		height: 50px;
	}

	#tan .homeList,
	#tan .homeTitle {
		border-bottom: 1px solid #ccc;
		background: none;
	}

	#tan .homeList ol li:nth-child(2),
	#tan .homeTitle ul li:nth-child(2) {
		width: 20%;
	}

	#tan .homeList ol li:nth-child(3),
	#tan .homeTitle ul li:nth-child(3) {
		width: 30%;
	}

	#tan .homeList ol li:nth-child(4),
	#tan .homeTitle ul li:nth-child(4) {
		width: 20%;
	}

	#tan .homeList ol li:nth-child(5),
	#tan .homeTitle ul li:nth-child(5) {
		width: 20%;
		border-right: none;
	}

	#tan .batch .homeList ol li:nth-child(3),
	#tan .batch .homeTitle ul li:nth-child(3) {
		width: 20%;
	}

	.topTitle {
		display: inline-block;
		width: 24%;
	}

	.topTitle span {
		font-size: 16px;
	}

	.selon {
		background: #f2f6f9;
		height: 50px;
	}

	.circle {
		width: 20px;
		height: 20px;
		border: 1px #c7c7c7 solid;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -10px;
		margin-top: -10px;
		background: #fff;
	}

	.circle.active {
		background: url(../../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
	}

	.topTitle {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.homeTitle {
		background: #e6e6e6;
		height: 50px;
		line-height: 50px;
	}

	.homeList {
		background: #f2f2f2;
		border-bottom: 1px solid #fff;
		height: 50px;
		line-height: 50px;
		color: #7f7f7f;
	}

	.homeList ol li,
	.homeTitle ul li {
		overflow: hidden;
		height: 50px;
		float: left;
		width: 10%;
		text-align: center;
		font-size: 12px;
	}
</style>