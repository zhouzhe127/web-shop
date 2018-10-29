<!--
    **疯抢商品
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="spikingCommodity">
		<!-- 筛选 -->

		<div class="search">
			<span>创建时间</span>

			<el-date-picker v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
			 value-format="timestamp" :clearable="false">
			</el-date-picker>
			<!-- <el-date-picker
			v-model="valueTime"
			type="datetimerange"
			range-separator="至"
			start-placeholder="开始日期"
			end-placeholder="结束日期" 
			>
			</el-date-picker> -->

			<span>关键字</span>
			<el-input v-model="goodsName" type="" name="" placeholder="请输入商品名称" style="width:200px"></el-input>
			<!-- <input type="" name="" placeholder="请输入商品名称" v-model="goodsName"> -->
			<!-- <a href="javascript:;" class="blue" @click="getcommodity">筛选</a> -->
			<!-- <a href="javascript:;" class="gray" @click="reset">重置</a> -->
			<div class="right">
				<el-button type="primary" @click="getcommodity">筛选</el-button>
				<el-button type="info" @click="reset">重置</el-button>
			</div>

		</div>

		<!-- 当前商品、历史商品 -->
		<div class="searchList">
			<el-radio-group v-model="searchName">
				<el-radio-button v-for="(item,index) in searchList" :key="index" :label="item.name" border @change.native="clicktheRadio(item)"></el-radio-button>
			</el-radio-group>
		</div>

		<!-- 列表(当前商品) -->
		 <!-- v-if="typeId = 0" -->
		<com-table :listHeight='80' :listName="'疯抢商品列表'" :showHand="false" :key="index" :listWidth="1436" :introData="goodslist"
		 :titleData="titleList" :widthType='true'>
			<div slot="con-0" slot-scope="props" class="btnLink">
				<a href="javascript:;" @click="addNewGoods(props.data,'edi')">编辑</a>
				<a href="javascript:;" @click="updateStatus(props.data)">{{type[props.data.status]}}</a>
			</div>
			<div slot="con-1" slot-scope="props" :class="props.data.status == '1' ? '' : props.data.status == '0' ? 'start':'end' ">{{statusType[props.data.status]}}</div>
			<div slot="con-3" slot-scope="props">
				<img style="height:80px;" v-bind:src="uploadUrl  + props.data.listImage" />
			</div>
			<div slot="con-4" slot-scope="props">￥{{props.data.price}}</div>
			<div slot="con-5" slot-scope="props">￥{{props.data.originalPrice}}</div>
			<div slot="con-7" slot-scope="props">{{props.data.stock - props.data.spareStock}}</div>
			<div slot="con-8" slot-scope="props">{{transFormDates(props.data.createTime)}}</div>
		</com-table>


		<!-- 列表(历史商品) --> 
		<!-- v-if="typeId = 1" -->
		<!-- <com-table :listHeight='80' :listName="'疯抢商品列表'" :showHand="false" :key="index" :listWidth="1436" :introData="goodslist"
		 :titleData="titleList" :widthType='true'>
			<div slot="con-0" slot-scope="props" class="btnLink">
				<a href="javascript:;" @click="updateStatus(props.data)">重新上架</a>
			</div>
			<div slot="con-1" slot-scope="props" :class="props.data.status == '1' ? '' : props.data.status == '0' ? 'start':'end' ">{{statusType[props.data.status]}}</div>
			<div slot="con-3" slot-scope="props">
				<img style="height:80px;" v-bind:src="uploadUrl  + props.data.listImage" />
			</div>
			<div slot="con-4" slot-scope="props">￥{{props.data.price}}</div>
			<div slot="con-5" slot-scope="props">￥{{props.data.originalPrice}}</div>
			<div slot="con-7" slot-scope="props">{{props.data.stock - props.data.spareStock}}</div>
			<div slot="con-8" slot-scope="props">{{transFormDates(props.data.createTime)}}</div>
		</com-table> -->

		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(pageNum)" :numArr="[10,20,30,40,50]"
			 :isNoJump="true"></pageElement>
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
				count: '0', //记录总条数
				pageNum: '',
				goodslist: [], //商品列表
				uploadUrl: '', //图片前缀
				index: null,
				shopstock: '', //商品的库存
				goodsimageList: '', //商品图片集合
				goodsName: '', //商品名称
				type: {
					0: '下架',
					1: '上架',
					2: '上架',
				},
				statusType: {
					0: '上架中',
					1: '待上架',
					2: '已下架',
				},
				titleList: [
					{
						titleName: '操作',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 244 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '状态',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 129 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '名称',
						dataName: 'name',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 129 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '列表图',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 129 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '卖价',
						dataName: 'price',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 129 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '原价',
						dataName: 'originalPrice',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 129 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '库存',
						dataName: 'stock',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 129 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '订单数',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 129 + 'px',
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
					},
				],
				valueTime: [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)], //时间控件
				startTime: '',
				endTime: '',
				searchList: [
					{
						'type': '0',
						'name': '当前商品'
					}, {
						'type': '1',
						'name': '历史商品'
					}
				],
				typeId:0,
				searchName: '当前商品',
			};
		},
		methods: {
			//选择开始时间
			getStartTime(receiveTime) {
				this.startTime = (new Date(receiveTime)).getTime(); //毫秒
			},
			//选择结束时间
			getEndTime(receiveTime) {
				this.endTime = (new Date(receiveTime)).getTime(); //毫秒
			},
			clicktheRadio: function (item) {
				this.typeId = item.type;
				this.getcommodity();
			},
			async addNewGoods(item, type) {
				if (type == 'edi') {
					await this.getGoodsStocks(item.id);
					let allshopstock = [];
					for (let i = 0; i < this.shopstock.length; i++) {
						if (item.id == this.shopstock[i].goodsId) {
							allshopstock.push(this.shopstock[i]);
						}
					} 
					storage.session('shopstock', allshopstock);
					await this.getGoodsImages(item.id);
					let shufflingimg = []; //轮播图
					let detailimg = []; //详情图片
					for (let i = 0; i < this.goodsimageList.length; i++) {
						if (item.id == this.goodsimageList[i].goodsId) {
							if (this.goodsimageList[i].type == '1') {
								detailimg.push(this.goodsimageList[i]);
							} else if (this.goodsimageList[i].type == '0') {
								shufflingimg.push(this.goodsimageList[i]);
							}
						}
					}

					storage.session('detailimg', detailimg);
					storage.session('shufflingimg', shufflingimg);
					storage.session('detail', item);
					storage.session('type', type);
				} else if (type == 'add') {
					storage.session('type', type);
				}
				this.$router.push('/admin/Assistantgood/newgoods');
			},
			pageChange(obj) { //翻页
				this.page = obj.page;
				this.num = obj.num;
				this.getcommodity();
			},
			async getcommodity() { //获取商品列表
				let data = await http.getcommodities({
					data: {
						startTime: parseInt(this.valueTime[0] / 1000), //开始时间
						endTime: parseInt(this.valueTime[1] / 1000), //结束时间 
						goodsName:this.goodsName,//关键字
						type:this.typeId, //0当期商品 1配置商品
						page: this.page, //请求的页数
						num: this.num, //请求的数据的条数
					}
				});

				this.goodslist = data.goodsList; //获取列表
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
			async getGoodsStocks(id) { //获取商品库存
				let data = await http.getGoodsStock({
					data: {
						goodsId: id
					}
				});
				if (data) {
					this.shopstock = data;
					return this.shopstock;
				}
			},
			async getGoodsImages(id) { //获取商品的图片
				let data = await http.getGoodsImage({
					data: {
						goodsId: id
					}
				});
				if (data) {
					this.goodsimageList = data;
					return this.goodsimageList;
				}
			},
			async updateStatus(item) {
				if (item.stock == '0') {
					this.$store.commit('setWin', {
						content: `无法上架,请添加库存`,
						winType: 'alert',
						title: '操作提示',
					});
					return false;
				}
				let data = await http.updateStatus({
					data: {
						activityId: item.activityId,
						goodsId: item.id
					}
				});
				if (data) {
					this.$store.commit('setWin', {
						content: `${this.type[item.status]}成功`,
						winType: 'alert',
						title: '操作提示',
					});
					this.getcommodity();
				}

			},
			reset: function () {
				this.goodsName = '';
				this.getcommodity();
			}
		},
		watch: {

		},
		components: {
			selectBtn: () =>
				import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			pageElement: () =>
				import( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
			comTable: () =>
				import( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		},
		mounted() {
			this.$store.commit('setPageTools', {
				addnewgoods: () => {
					this.addNewGoods('', 'add');
				}
			});
			// if(this.Type.index == '1'){
			//     this.searchName = '指定时间';
			// }
			this.uploadUrl = storage.session('userShop').uploadUrl;
			this.getcommodity();
			// console.log(this.Type)
		}
	};
</script>
<style type="text/css" scoped>
	#spikingCommodity {
		width: 1437px;
		height: auto;
	}

	#spikingCommodity .search {
		width: 100%;
		height: 42px;
		margin-bottom: 18px;
	}

	#spikingCommodity .search span {
		font-size: 16px;
		margin-right: 8px;
	}

	#spikingCommodity .search input {
		width: 183px;
		height: 41px;
		text-indent: 10px;
	}

	#spikingCommodity .search a {
		width: 101px;
		height: 42px;
		text-align: center;
		line-height: 42px;
		margin-right: 15px;
	}

	#spikingCommodity .search .right {
		float: right;
	}

	#spikingCommodity .searchList {
		width: 100%;
		height: 42px;
		margin-bottom: 18px;
		margin-left: 78px;
	}

	#spikingCommodity .start {
		color: #0d9f18;
	}

	#spikingCommodity .end {
		color: #ff3c04;
	}

	#spikingCommodity .btnLink a {
		cursor: pointer;
		display: inline-block;
		width: 80px;
		height: 18px;
		text-align: center;
		line-height: 18px;
	}

	#spikingCommodity .btnLink a:nth-child(1) {
		border-right: 1px solid #CECECE;
		color: #FF8D00;
	}

	#spikingCommodity .btnLink a:nth-child(2) {
		color: #28a8e0;
	}

	#spikingCommodity .turn-page {
		margin: 10px 0 30px 0;
	}
</style>