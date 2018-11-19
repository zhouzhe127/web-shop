<!--
    **抢购历史详情
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="rushedHistoryDetail">
		<div class="rushedstatus">
			温馨提示:疯抢状态为{{statusType[status]||"未开始"}}...
		</div>
		<!-- 列表 -->
		<com-table :listHeight='80' :listName="'疯抢历史'" :key="index" :showTitle='1' :introData="detailist" :listWidth="1436" :titleData="titleList"
		    :allTotal="count" :widthType='true'>
			<div slot="con-0" slot-scope="props" class="btnLink">
				<a href="javascript:;" @click="getRecord(props.data)">抢购记录</a>
			</div>
			<div slot="con-2" slot-scope="props" class="list_img">
				<img alt="logo" v-bind:src="uploadUrl  + props.data.showImage" />
			</div>
			<div slot="con-3" slot-scope="props">￥{{props.data.price}}</div>
			<div slot="con-4" slot-scope="props">￥{{props.data.originalPrice}}</div>
			<div slot="con-8" slot-scope="props">{{transFormDates(props.data.createTime)}}</div>
		</com-table>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(pageNum)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				page: 1,
				num: 10,
				count: 0,
				pageNum: 1,
				detailist: [], //详情列表
				uploadUrl: '',
				activityId: '',
				status: '', //状态
				index: null,
				titleList: [
					{
						titleName: '操作',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 143 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '名称',
						dataName: 'name',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 143 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '商品图片',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 143 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '卖价',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 143 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '原价',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 143 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '库存',
						dataName: 'stock',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 143 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '抢购数量',
						dataName: 'grabNum',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 143 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '已领取',
						dataName: 'receiveNum',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 143 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '创建时间',
						dataName: 'createTime',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 287 + 'px',
							flex: 'none'
						}
					}
				],
				allTotal: 0,
				statusType:{
					0:'已结束',
					1:'进行中'
				}
			};
		},
		methods: {
			pageChange(obj) { //翻页
				this.page = obj.page;
				this.num = obj.num;
				this.getdetailist();
			},
			returnStore: function () {
				this.$router.push('/admin/Assistanthistory');
			},
			async getdetailist() {
				let data = await http.getHistorydetail({
					data: {
						page: this.page,
						num: this.num,
						activityId: this.activityId
					}
				});
				this.detailist = data.list; //获取详情列表数据
				this.pageNum = data.total;
				this.count = data.count;
			},
			changeFormat: function (t) {
				t -= 0;
				if (t < 10) {
					return ('0' + t);
				} else {
					return (t + '');
				}
			},
			transFormDates: function (time) {
				time += '';
				if (time.length == 10) {
					time -= 0;
					time *= 1000;
				} else {
					time -= 0;
				}
				let date = new Date(time);
				return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' +
					this.changeFormat(date.getMinutes());
			},
			getRecord: function (item) { //获取抢购记录
				storage.session('historyrecord', item);
				this.$router.push('/admin/Assistanthistory/detail/record');
			}
		},
		watch: {

		},
		components: {
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			pageElement: () =>
				import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		},
		mounted() {
			this.$store.commit('setPageTools', {
				back: () => {
					this.returnStore();
				}
			});
			this.uploadUrl = storage.session('userShop').uploadUrl;
			this.activityId = storage.session('historydetail').id;
			this.status = storage.session('historydetail').status;
			this.getdetailist();
		}
	};
</script>
<style type="text/css" scoped>
	#rushedHistoryDetail {
		width: 1437px;
		height: auto;
	}

	#rushedHistoryDetail .rushedstatus {
		margin-bottom: 31px;
		color: #1DA527;
	}

	#rushedHistoryDetail .btnLink a {
		cursor: pointer;
		display: inline-block;
		width: 80px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #28A8E0;
	}

	#rushedHistoryDetail .list_img {
		height: 80px;
	}

	#rushedHistoryDetail .list_img img {
		width: 45px;
		height: 45px;
		margin: 17.5px auto;
	}

	#rushedHistoryDetail .turn-page {
		margin: 10px 0 30px 0;
	}
</style>