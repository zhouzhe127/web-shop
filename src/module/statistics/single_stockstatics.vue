<!--单品库存统计-->
<template>
	<div class="singleStic">
		<div class="filter">
			<div class="block">
				<div class="input-box input-start">
					<!--开始时间-->
					<calendar :time="startTime" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
				</div>
				<span class="line">-</span>
				<div class="input-box input-end">
					<!--结束时间-->
					<calendar :time="endTime" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
				</div>
			</div>
			<div class="block">
				<!--选择店铺-->
				<div v-if="isBrand" class="input-box input-start">
					<select-store @emit="getDrop" :isSingle="false" :sorts="shopList"></select-store>
				</div>
				<!-- 勾选按钮 -->
				<div v-if="isBrand" class="input-check select-ban">
					<i @click="timeCheck" :class="{active:this.openTime == 1}"></i>
					合并店铺
				</div>
				<div class="search-box">
					<span v-if="!isBrand" class="search-btn" @click="search">搜索</span>
					<span v-if="isBrand" class="reset-btn gray" @click="resetInput">重置</span>
				</div>
			</div>
			<div class="store-show" v-if="isBrand">
				<i>已选择店铺:</i>
				<span v-for="(item,index) in shopList" :key="index" :data-id="item.id" v-if="item.selected">{{item.name}},</span>
			</div>
		</div>
		<div class="tabList" v-if="!isBrand">
			<div class="listBox">
				<ul class="listTitle">
					<!-- <li v-if="isBrand" class="w6">店铺名称</li> -->
					<li class="w6">商品名</li>
					<li class="w8">条码</li>
					<li class="w4">售价</li>
					<li>单位</li>
					<li class="layers w12">
						<span>期初数量</span>
						<ul class="sLayers">
							<li>总量</li>
							<li>货架</li>
							<li>仓库</li>
						</ul>
					</li>
					<li class="w4">入库量</li>
					<li class="layers w12">
						<span>结存</span>
						<ul class="sLayers">
							<li>总量</li>
							<li>货架</li>
							<li>仓库</li>
						</ul>
					</li>
					<li class="layers w15">
						<span>当前库存</span>
						<ul class="sLayers">
							<li>总量</li>
							<li>货架</li>
							<li>仓库</li>
						</ul>
					</li>
					<li class="w4">盘点次数</li>
					<li class="w4">盈亏情况</li>
					<li class="w4">盈亏金额</li>
					<li class="layers">
						<span>耗损</span>
						<ul class="sLayers">
							<li>总量</li>
							<li>货架</li>
							<li>仓库</li>
						</ul>
					</li>
					<li>销量</li>
					<li class="w4">消费金额</li>
					<li class="w4">优惠金额</li>
					<li class="w4">实收金额</li>
				</ul>
				<ul class="listData" v-for="(item,index) in discountList" :key="index">
					<li class="w6 text-ellipsis" :title="item.goodsName">{{item.goodsName}}</li>
					<li class="w8">{{item.barCode}}</li>
					<li :title="item.price">{{item.price}}</li>
					<li class="w3">{{item.unit}}</li>

					<li style="border-left:2px solid #F7F7F7;" :title="item.initialTotal">{{item.initialTotal}}</li>
					<li :title="item.initialShelve">{{item.initialShelve}}</li>
					<li style="border-right:2px solid #F7F7F7;" :title="item.initialInven">{{item.initialInven}}</li>
					<li :title="item.addInventoryNum">{{item.addInventoryNum}}</li>
					<li style="border-left:2px solid #F7F7F7;" :title="item.goodsOnHandTotal">{{item.goodsOnHandTotal}}</li>
					<li :title="item.goodsOnHandShelve">{{item.goodsOnHandShelve}}</li>
					<li style="border-right:2px solid #F7F7F7;" :title="item.goodsOnHandInven">{{item.goodsOnHandInven}}</li>
					<li class="w5" style="border-left:0;" :title="item.totalInven">{{item.totalInven}}</li>
					<li class="w5" :title="item.shelveNum">{{item.shelveNum}}</li>
					<li class="w5" style="border-right:2px solid #F7F7F7;" :title="item.inventory">{{item.inventory}}</li>
					<li>{{item.checkNum}}</li>
					<li :class="Number(item.profitAndLossNum)>0?'w4 tored':'w4 togreen'" :title="item.profitAndLossNum">{{item.profitAndLossNum}}</li>
					<li :class="Number(item.profitAndLossPrice)>0?'w4 tored':'w4 togreen'" :title="item.profitAndLossPrice">{{item.profitAndLossPrice}}</li>
					<li class="w3" style="border-left:2px solid #F7F7F7;" :title="item.lossTotalNum">{{item.lossTotalNum}}</li>
					<li class="w3" :title="item.shelflossNum">{{item.shelflossNum}}</li>
					<li class="w3" style="border-right:2px solid #F7F7F7;" :title="item.warehouseLossNum">{{item.warehouseLossNum}}</li>
					<li class="w3" :title="item.salesNum">{{item.salesNum}}</li>
					<li :title="item.originalPrice">{{item.originalPrice}}</li>
					<li :title="item.discountPrice">{{item.discountPrice}}</li>
					<li :title="item.paidTotalPrice">{{item.paidTotalPrice}}</li>
				</ul>
				<!-- 品牌 -->
				<!-- <ul v-if="isBrand" class="listData" v-for="(item,index) in discountList" :key="index">
					<li class="w6 text-ellipsis" :title="item.shopName">{{item.shopName}}</li>
					<li class="w6 text-ellipsis" :title="item.goodsName">{{item.goodsName}}</li>
					<li class="w8">{{item.barCode}}</li>
					<li>{{item.price}}</li>
					<li class="w3">{{item.unit}}</li>

					<li style="border-left:2px solid #F7F7F7;">{{item.periodBeginAmount}}</li>
					<li>{{item.periodBeginShelf}}</li>
					<li style="border-right:2px solid #F7F7F7;">{{item.periodBeginInventory}}</li>
					<li>{{item.addInventory}}</li>
					<li style="border-left:2px solid #F7F7F7;">{{item.periodEndAmount}}</li>
					<li>{{item.periodEndShelf}}</li>
					<li style="border-right:2px solid #F7F7F7;">{{item.periodEndInventory}}</li>
					<li class="w4" style="border-left:0;">{{item.currentAmount}}</li>
					<li class="w4">{{item.currentShelf}}</li>
					<li class="w4" style="border-right:2px solid #F7F7F7;">{{item.currentInventory}}</li>
					<li>{{item.setShelfCount}}</li>
					<li :class="Number(item.setShelfNum)>0?'w4 tored':'w4 togreen'">{{item.setShelfNum}}</li>
					<li :class="Number(item.setShelfAmount)>0?'w4 tored':'w4 togreen'">{{item.setShelfAmount}}</li>
					<li class="w3" style="border-left:2px solid #F7F7F7;">{{item.lossAmount}}</li>
					<li class="w3">{{item.lossShelf}}</li>
					<li class="w3" style="border-right:2px solid #F7F7F7;">{{item.lossInventory}}</li>
					<li class="w3">{{item.salesVolume}}</li>
					<li class="w3">{{item.consume}}</li>
					<li class="w3">{{item.discount}}</li>
					<li class="w3">{{item.realIncoming}}</li>
				</ul> -->
			</div>
		</div>
		<!-- 分页 -->
		<div class="page-box" v-if="!isBrand">
			<pageBtn @pageNum="pageChange" :total="pageNum" :num="num" :page="page" :isNoJump="true"></pageBtn>
		</div>
	</div>
</template>

<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';

	export default {
		data() {
			return {
				startTime: '',//开始时间
				endTime: '',//结束时间
				reqStartTime: '',//转换后的开始时间
				reqEndTime: '',//转换后的结束时间
				isBrand: '', //是否为品牌,true/false
				pageNum: 0,//分页，多少页
				discountList: [],//内容列表
				userData: '',
				shopId: '',//店铺id(单店)
				page: 1,//页码
				num: 10,//每页显示数
				openTime: 0,//是否开启合并店铺
				shopList: [], //店铺列表
				userShopList: '',
				userShopIdStr: '',
				shopSelectStr: '', //选中店铺名称拼接
				storeName: '', //选中店铺按钮 显示,
				shopIds: '',//品牌内多店id
			};
		},
		created(){
			// 品牌
			this.userData = storage.session('userShop');
			let shopIdArr = [];
			let	shopListArr = [];
			if (this.userData.currentShop.ischain == '3') {
				this.userShopList = storage.session('shopList');
				this.userShopList.unshift(storage.session('userShop').currentShop);
				this.userShopList.forEach((item, index) => {
					shopIdArr[index] = item.id;
					let obj = {
						id: item.id,
						name: item.shopName||item.name
					};
					shopListArr.push(obj);
				});
				this.userShopIdStr = shopIdArr.join(','); //品牌下店铺id拼接
				this.userShopList = shopListArr;
			}
			this.$store.commit('setPageTools', [
				{
					name: '导出',
					className: ['export-btn'],
					fn: ()=>{
						this.turnTo();
					}
				}
			]);
		},
		mounted() {
			//判断
			this.isBrand = this.userData.currentShop.ischain == '3' ? true : false; //是否为品牌,
			this.shopId = storage.session('shopId');
			// this.shopIds = this.isBrand ? this.userShopIdStr : this.userData.currentShop.id;
			for (let i in this.userShopList) {
				//店铺默认全部选中
				this.userShopList[i].selected = false;
			}
			this.shopList = this.userShopList; //店铺列表
			this.storeName =this.userShopList.length > 0 ? this.userShopList[0].name : '选择店铺'; //选中店铺按钮 显示,
			this.startTime = utils.getTime({time:new Date()}).start;
			this.endTime = utils.getTime({time:new Date()}).end;
			if(!this.isBrand){
				this.search();
			}
		},
		methods: {
			// 合并店铺
			timeCheck() {
				this.openTime = this.openTime == 0 ? 1 : 0;
			},
			//开始时间
			startTimeChange(time) {
				this.startTime = time;
			},
			//结束时间
			endTimeChange(time) {
				this.endTime = time;
			},
			// 店铺选择
			getDrop(res) { 
				this.shopList = res;
				let selectNameStr = '';
				let arr = [];
				for (let i = 0; i < res.length; i++) {
					if (res[i].selected == true) {
						arr.push(res[i].id);
						selectNameStr = selectNameStr + res[i].name;
					}
				}
				this.shopIds = arr.join(',');
				// let shopIdsStrEnd = shopIdsStr.split('').length;
				// if (shopIdsStr !== '') {
				// 	shopIdsStr = shopIdsStr.substring(0, shopIdsStrEnd - 1);
				// }
				// this.selectName = selectNameStr == '' ? '请选择店铺' : selectNameStr;
			},
			//时间验证，开始时间不能大于结束时间
			validate() {
				let isPass = true;
				let	start = parseInt(this.startTime / 1000 / 3600 / 24);
				let	end = parseInt(this.endTime / 1000 / 3600 / 24);
				if (start > end) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '开始时间不能大于结束时间'
					});
					isPass = false;
				}
				return isPass;
			},
			// 搜素
			search(){
				if (!this.validate()) return;
				this.reqStartTime = parseInt(this.startTime/1000);
				this.reqEndTime = parseInt(this.endTime/1000);
				this.getDetail();
			},
			// 单品库存统计店铺接口
			async getDetail(){
				let data = await http.getGoodsInvenStatList({
					data:{
						startTime:this.reqStartTime,
						endTime:this.reqEndTime,
						shopId:this.shopId,
						trueShopId:this.shopIds||this.shopId,
						page:this.page,
						num:this.num
					}
				});
				this.discountList = data.list;
				this.pageNum = data.total;
			},
			// 单品库存统计品牌接口
			// async getMoredetail(){
			// 	let data = await http.getInventoryStat({
			// 		data:{
			// 			beginTime:this.reqStartTime,
			// 			endTime:this.reqEndTime,
			// 			shopId:this.shopId,
			// 			shopIds:this.shopIds,
			// 			page:this.page,
			// 			size:this.num,
			// 			isMerge:this.openTime
			// 		}
			// 	});
			// 	this.discountList = data.list;
			// 	this.pageNum = data.total;
			// },
			// 重置
			resetInput() {
				this.startTime = utils.getTime({time:new Date()}).start;
				this.endTime = utils.getTime({time:new Date()}).end;
				this.openTime = 0;
				if (this.isBrand) {
					let list = utils.deepCopy(this.shopList);
					for (let item of list) {
						item.selected = false;
						// this.$set(item,"selected",false);
					}
					this.shopList = list;
					this.shopIds = '';
				}
			},
			// 页码改变，每页显示条目数改变
			pageChange(page) {
				this.page = page.page;
				this.num = page.num;
				this.search();
			},
			// 导出
			turnTo(){
				let details = {
					beginTime: this.startTime,
					endTime: this.endTime,
					shopId: this.shopId,
					shopIds: this.isBrand?this.shopIds:this.shopId,
					isMerge: this.openTime
				};
				if(details.shopIds){
					storage.session('single_stockstatics',details);
					this.$router.push({
						path: '/admin/exportTemplate',
						query: this.$route.query
					});
				}else{
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '请选择店铺'
					});
				}
			},

		},
		components: {
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			selectStore: () =>
				import ( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
			pageBtn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		},
	};
</script>

<style lang="less" scoped>
	.singleStic {
		padding-bottom: 40px;
		.text-ellipsis {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.align {
			display: inline-block;
			vertical-align: middle;
		}
		.filter {
			padding-bottom: 10px;
			.block {
				display: inline-block;
				padding-bottom: 10px;
				.line {
					color: #ccc;
				}
				.select_btn {
					margin-left: 10px;
				}
				.input-box {
					display: inline-block;
					vertical-align: middle;
				}
				.input-check {
					font-size: 16px;
					color: #333;
					display: inline-block;
					vertical-align: middle;
					height: 40px;
					line-height: 40px;
					margin-left: 10px;
					i {
						height: 20px;
						width: 20px;
						border-radius: 2px;
						margin-right: 5px;
						color: #444;
						cursor: pointer;
						display: inline-block;
						border: 1px solid #bbb;
						vertical-align: middle;
						&.active {
							background: url(../../res/icon/white_select.png) #28a8e0 center no-repeat;
							border: 1px solid #28a8e0;
						}
					}
				}
				.search-box {
					width: 200px;
					height: 40px;
					margin-left: 10px;
					display: inline-block;
					vertical-align: middle;
					span {
						width: 80px;
						height: 40px;
						line-height: 40px;
						text-align: center;
						border: 0;
						color: #fff;
						display: inline-block;
						cursor: pointer;
					}
					.search-btn {
						cursor: pointer;
						background-color: #28a8e0;
						margin-right: 10px;
					}
					.reset-btn {
						cursor: pointer;
					}
				}
			}
			.store-show {
				width: 100%;
				margin-bottom: 10px;
				display: block;
				overflow: hidden;
				line-height: 20px;
				span {
					float: left;
					color: #333;
				}
				i {
					float: left;
				}
			}
		}
		.tabList {
			overflow:auto;
			width:100%;
			border: 1px solid #ccc;
			.listBox {
				font-size: 14px;
				overflow: hidden;
				min-width: 2100px;
				box-sizing: border-box;
			}
			.listTwo {
				font-size: 14px;
				overflow: hidden;
				min-width: 2600px;
				box-sizing: border-box;
			}
			.listTitle {
				height: 80px;
				background-color: #f2f2f2;
				li {
					width: 3%;
					float: left;
					height: 80px;
					line-height: 80px;
					text-align: center;
					padding: 0 10px;
					font-size: 14px;
				}
				.w4 {
					width: 4%;
				}
				.w5 {
					width: 5%;
				}
				.w6 {
					width: 6%;
				}
				.w7 {
					width: 7%;
				}
				.w8 {
					width: 8%;
				}
				.w10 {
					width: 10%;
				}
				.w12{
					width: 12%;
				}
				.layers {
					width: 9%;
					height: 80px;
					line-height: 40px;
					span {
						font-size: 16px;
						height: 40px;
						line-height: 40px;
						width: 100%;
					}
					ul {
						width: 100%;
						height: 40px;
						line-height: 40px;
						li {
							float: left;
							height: 40px;
							width: 33.3%;
							line-height: 40px;
							text-align: center;
							font-size: 14px;
							color: gray;
						}
					}
				}
				.w12{
					width:12%;
				}
				.w15{
					width: 15%;
				}
			}
			.listData {
				height: 62px;
				line-height: 62px;
				color: gray;
				border-bottom: 2px solid #F7F7F7;
				li {
					width: 4%;
					height: 60px;
					line-height: 60px;
					float: left;
					text-align: center;
					padding: 0 10px;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
				.w3{
					width: 3%;
				}
				.w4 {
					width: 4%;
				}
				.w5 {
					width: 5%;
				}
				.w6 {
					width: 6%;
				}
				.w7 {
					width: 7%;
				}
				.w8 {
					width: 8%;
				}
				.w10 {
					width: 10%;
				}
			}
		} 
		.page-box {
			margin-top: 10px;
			text-align: right;
		}
		.tored{
			color:red;
		}
		.togreen{
			color:rgb(17, 187, 179);
		}
		.nofeed{
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>