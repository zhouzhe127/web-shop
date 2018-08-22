
<template>
	<div id="shipment">
		<div class="topBox">
			<div class="title">
				<i></i>
				<h3>查看详情</h3>
				<div class="dian" v-for="i in 70" :key="i"></div>
			</div>
			<div class="innerBox">
				<ul>
					<li>
						<span>申请单号：</span>
						<span>{{detailData.code}}</span>
					</li>
					<li>
						<span>审核状态：</span>
						<span>{{auditStatus[detailData.auditStatus-1]}}</span>
					</li>
					<li>
						<span>调度状态：</span>
						<span>{{dispatchStatus[detailData.dispatchStatus-1]}}</span>
					</li>
					<li>
						<span>入货仓库：</span>
						<span>{{detailData.wName}}</span>
						<img src="../../../res/images/examine.jpg" v-if="detailData.wid" @click="examine" alt="">
					</li>
				</ul>
				<ul>
					<li>
						<span>申请人：</span>
						<span>{{detailData.createName}}</span>
					</li>
					<li>
						<span>申请时间：</span>
						<span>{{getTime(detailData.createTime)}}</span>
					</li>
					<li>
						<span>原因：</span>
						<span>{{detailData.reason||"--"}}</span>
					</li>
					<li>
						<span>备注：</span>
						<span>{{detailData.remark||"--"}}</span>
					</li>
				</ul>
				<ul>
					<li>
						<span>审核人：</span>
						<span>{{getUserName(detailData.auditUid)}}</span>
					</li>
					<li>
						<span>审核时间：</span>
						<span>{{getTime(detailData.auditTime)}}</span>
					</li>
					<li>
						<span>原因：</span>
						<span>{{detailData.auditReason||"--"}}</span>
					</li>
					<li>
						<span>备注：</span>
						<span>{{detailData.auditRemark||"--"}}</span>
					</li>
				</ul>
			</div>
		</div>
		<ul class="tebBox">
			<li v-for="(item,index) in tebData" @click="tebClick(index)" :key="index" :class="{active:tabactive==index}">{{item}}</li>
		</ul>
		<!-- 调度单列表 -->
		<com-table v-if="tabactive==1" :listName="'调度单列表'" :titleData="dataList" :allTotal="totalNum" :introData="goodsDetails" :listWidth="1200">
			<div slot="con-0" slot-scope="props">
				<span class="selDetail" @click="detailBtn(props.data.id)">查看详情</span>
				<!-- <span class="middleLine" v-if="!(this.detailData && this.detailData.auditStatus==4)">|</span> -->
				<span class="inGoods" v-if="props.data && props.data.dynamic==2" @click="insertGoods(props.data.id)">
					<i>|</i>入货</span>
				<span class="dele" v-if="detailData && Number(detailData.auditStatus)!==4" @click="delList(props.data.id)">
					<i>|</i>删除</span>
			</div>
			<span slot="con-1" slot-scope="props">{{(props.index+1)+(page-1)*10}}</span>
			<span slot="con-3" slot-scope="props">{{listStatus[props.data.dynamic-1]}}</span>
			<span slot="con-7" slot-scope="props">{{getTime(props.data.createTime)}}</span>
		</com-table>
		<ul class="typeBox" v-if="tabactive==0">
			<li v-for="(item,index) in typeData" :class="{active:typeactive==index}" @click="typeBox(index)" :key="index">{{item}}</li>
		</ul>
		<!-- 总单商品物料列表 -->
		<div v-if="tabactive==0">
			<com-table v-if="typeactive==0" :listName="'商品列表'" :titleData="titleList1" :allTotal="listNum" :introData="introData" :listWidth="1000">
				<span slot="con-0" slot-scope="props">{{(props.index+1)+(page-1)*10}}</span>
				<div slot="con-3" slot-scope="props">
					<span v-if="props.data.type==1">普通商品</span>
					<span v-if="props.data.type==2">物料</span>
					<span v-if="props.data.type==3">称重商品</span>
				</div>
				<span slot="con-4" slot-scope="props">{{props.data.num}}{{props.data.unitName}}</span>
				<span slot="con-5" slot-scope="props">{{props.data.shippingQty}}{{props.data.unitName}}</span>
			</com-table>
			<com-table v-if="typeactive==1" :listName="'物料列表'" :titleData="titleList2" :allTotal="listNum" :introData="introData" :listWidth="1000">
				<span slot="con-0" slot-scope="props">{{(props.index+1)+(page-1)*10}}</span>
				<div slot="con-2" slot-scope="props">
					<span v-if="props.data.type==1">普通商品</span>
					<span v-if="props.data.type==2">物料</span>
					<span v-if="props.data.type==3">称重商品</span>
				</div>
				<div slot="con-3" slot-scope="props">
					<span v-if="props.data && props.data.unitData">{{getNum(props.data.num,props.data.unitData,props.data.unitId)}}</span>
					<span v-if="props.data && !props.data.unitData">{{props.data.num}}</span>
				</div>
				<div slot="con-4" slot-scope="props">
					<span v-if="props.data && props.data.unitData">{{getNum(props.data.shippingQty,props.data.unitData,props.data.unitId)}}</span>
					<span v-if="props.data && !props.data.unitData">{{props.data.shippingQty}}</span>
				</div>
			</com-table>
		</div>
		<div class="page-box">
			<page-turn @pageNum="pageChange" :isNoPaging='true' :total="pageTotal" :page="page"></page-turn>
		</div>
		<waremessage-win v-if="waremessage" :wid="detailData.wid" :width="500" :height="200" :title="'仓库信息'" @winEvent="waremessage=false"></waremessage-win>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';
	let user = storage.session('user') ? storage.session('user') : [];
	export default {
		props: ['type'],
		data() {
			return {
				applyId: '',
				tabactive: 0,
				typeactive: 0,
				tebData: ['总单', '调度单列表'],
				typeData: ['商品', '物料'],
				page: 1,
				pageTotal: 1,
				waremessage: false,
				detailData: '',
				auditStatus: ['审核中', '已取消', '审核未通过', '审核通过'],
				dispatchStatus: ['未调度', '配货中', '未出货', '全部取消', '待入货', '已完成', '已完成（异常）', '配货完成'],
				listStatus: ['未出货', '待入货', '配货中', '已取消', '已完成', '已完成（异常）', '配货完成'],
				introData: [], //商品物料列表所有数据
				goodsDetails: '', //调度单列表所有数据
				totalNum: 0, //调度单条目数
				listNum: 0, //商品，物料列表条目数
				dataList: [{
					titleName: '操作'
				},
				{
					titleName: '序号'
				},
				{
					titleName: '调度单号',
					dataName: 'receiptNumber'
				},
				{
					titleName: '调度状态',
					dataName: 'dynamic'
				},
				{
					titleName: '出货仓库',
					dataName: 'outWname'
				},
				{
					titleName: '入货仓库',
					dataName: 'intoWname'
				},
				{
					titleName: '操作人',
					dataName: 'createName'
				},
				{
					titleName: '操作时间'
				}],
				titleList1: [{
					titleName: '序号'
				},
				{
					titleName: '商品名称',
					dataName: 'itemName'
				},
				{
					titleName: '条形码',
					dataName: 'barCode'
				},
				{
					titleName: '类型'
				},
				{
					titleName: '申请数量'
				},
				{
					titleName: '出货数量'
				}],
				titleList2: [{
					titleName: '序号'
				},
				{
					titleName: '物料名称',
					dataName: 'itemName'
				},
				{
					titleName: '类型'
				},
				{
					titleName: '申请数量',
					dataName: 'num'
				},
				{
					titleName: '出货数量',
					dataName: 'shippingQty'
				}],
			};
		},
		methods: {
			async init() {
				let data = await http.invoic_getApplication({
					data: {
						applyId: this.applyId
					}
				});
				this.detailData = data;
				this.$emit('detailData', this.detailData);
				await this.searItem(0);
				if(this.introData.length==0){
					await this.searItem(1);
					if(this.introData.length>0){
						this.typeactive=1;
					}
				}
			},
			// 单位换算
			getNum(num, unitData, id) {
				let value = null;
				let showName = null;
				let minName = null;
				for (let itemList of unitData) {
					if (itemList.isMin == 1) {
						minName = itemList.name;
					}
					if (itemList.muId == id) {
						showName = itemList.name;
						value = itemList.value;
					}
				}
				//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				return global.comUnit(num, value, showName, minName);
			},
			// 物料商品接口
			async searItem(type) {
				let goodsData = await http.invoic_getApplicationDetail({
					data: {
						applyId: this.applyId,
						page: this.page,
						num: 100,
						choose: type == 0 ? 1 : 2
					}
				});
				this.introData = goodsData.list;
				this.listNum = this.introData.length;
				this.pageTotal = goodsData.total;
			},
			// 总单接口
			async searAll() {
				if (this.tabactive == 1) {
					let myData = await http.invoic_getApplyDispatchRecord({
						data: {
							applyId: this.applyId,
							page: this.page,
							num: 100
						}
					});
					this.goodsDetails = myData.list;
					this.totalNum = this.goodsDetails.length;
					this.pageTotal = myData.total;
				}
			},
			// 总单，调度单按钮
			tebClick(index) {
				this.tabactive = index;
				this.searAll();
				this.searItem(this.typeactive);
			},
			typeBox(index) {
				this.typeactive = index;
				this.introData = '';
				this.searItem(this.typeactive);
			},
			examine() {
				this.waremessage = true;
			},
			pageChange(page) {
				this.page = page.page;
				this.searItem(this.typeactive);
			},
			getlist(type) { //type 1为商品2为物料
				let arr = [];
				for (let item of this.detailData.detail) {
					if (item.type == type) {
						arr.push(item);
					}
				}
				return arr;
			},
			getTime(time) {
				if (time == 0) {
					return '--';
				} else {
					return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd hh:mm');
					//   return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd hh:mm');
				}
			},
			getUserName(id) {
				for (let item of user) {
					if (item.userId == id) {
						return item.userName;
					}
				}
				return '--';
			},
			// 删除操作
			delList(id) {
				this.$store.commit('setWin', {
					winType: 'confirm',
					title: '操作提示！',
					content: '确认删除调度记录？',
					callback: (res) => {
						if (res == 'ok') {
							this.deleteList(id);
						}
					}
				});
			},
			// 调用删除的接口
			async deleteList(id) {
				await http.invoic_deleteDispatchOrder({
					data: {
						id: id
					}
				});
				this.searAll();
				this.init();
			},
			// 入货按钮
			insertGoods(id) {
				this.$router.push({
					path: '/admin/operation/enterGoods',
					query: {
						id: id
					}
				});
			},
			// 删除按钮
			detailBtn(id) {
				storage.session('clusionToOperationDetail', true);
				this.$router.push({
					path: '/admin/operation/operationDetail',
					query: {
						id: id
					}
				});
			},
		},
		mounted() {
			this.applyId = this.$route.query.id;
			this.init();
			if(this.type) {
				this.tabactive = 1;
				this.tebClick(1);
			}
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			pageTurn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			waremessageWin: () =>
				import ( /*webpackChunkName: 'waremessage_win'*/ './waremessage_win'),
		}
	};
</script>
<style lang='less' scoped>
	#shipment {
		.selDetail {
			color: #5ebee8;
			cursor: pointer;
			margin-right: 10px;
		}
		.dele {
			color: #ff3c04;
			cursor: pointer;
			i {
				color: #B3B3B3;
				margin-right: 10px;
			}
		}
		.inGoods {
			color: orange;
			cursor: pointer;
			i {
				color: #B3B3B3;
				margin-right: 10px;
			}
		}
		.topBox {
			.title {
				width: 98%;
				height: 40px;
				margin: 10px;
				line-height: 40px;
				position: relative;
				overflow: hidden;
				i {
					width: 2px;
					height: 28px;
					position: absolute;
					top: 6px;
					left: 0;
					background-color: #28a8e0;
				}
				h3 {
					width: 70px;
					height: 40px;
					margin-left: 10px;
					float: left;
					font-size: 16px;
					font-family: "微软雅黑";
				}
			}
			.innerBox {
				padding-left: 50px;
				ul {
					display: inline-block;
					width: 32%;
					vertical-align: top;
					li {
						margin-bottom: 20px;
						span {
							display: inline-block;
							max-width: 70%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 16px;
						}
						img {
							cursor: pointer;
						}
					}
				}
			}
			.dian {
				width: 10px;
				height: 1px;
				border-top: 1px solid #e1e1e1;
				margin: 20px 5px;
				float: left;
			}
		}
		.page-box {
			margin-top: 10px;
		}
		.tebBox {
			display: inline-block;
			color: orange;
			cursor: pointer;
			li {
				width: 120px;
				height: 35px;
				line-height: 35px;
				text-align: center;
				border: 1px orange solid;
				display: inline-block;
			}
			.active {
				background-color: orange;
				color: #ffffff;
			}
		}
		.typeBox {
			margin-top: 15px;
			li {
				width: 100px;
				height: 35px;
				text-align: center;
				line-height: 35px;
				display: inline-block;
				margin-right: 10px;
				cursor: pointer;
				background-color: #eeeeee;
				border-radius: 5px;
			}
			.active {
				background-color: #5ebee8;
				color: #ffffff;
			}
		}
	}
</style>