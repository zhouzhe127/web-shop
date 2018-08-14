/** * @file * * 积分商城 * * @author zhengu.jiang * @author huiling.liu 2018.2.25 */
<template>
	<div class="mall-box" id="inte">
		<div class="firstFun">
			<div class="firstTitle fl" @click="openUse">
				<span class="fl" :class="{on: isShop == 'shop'}">商品管理</span>
				<span class="fl" :class="{on: isShop == 'exchange'}">兑换管理</span>
			</div>
		</div>
		<div v-if="isShop == 'shop'" class="gooodsTable" style="margin-bottom: 20px;">
			<com-table :listHeight='80' :listName="'商品列表'" :showTitle='2' :listWidth="1400" :introData="goodLists" :titleData="titleList" :allTotal="count">
				<div slot="con-1" slot-scope="props">
					{{statusType[props.data.type]}}
				</div>
				<div class="imgshow" slot="con-3" slot-scope="props">
					<img :src=" imgHost + props.data.imageName" />
				</div>
				<div slot="con-11" slot-scope="props" class="operateParent">
					<div v-if="ischain == '0' || ischain == '3'" class="operate">
						<a href="javascript:void(0);" class="jun shelves" v-if="props.data.status == 0" @click="shelves(props.index,props.data.id,props.data.status)">下架</a>
						<a href="javascript:void(0);" class="jun shelves" v-if="props.data.status == 1" @click="shelves(props.index,props.data.id,props.data.status)">上架</a>
						<a href="javascript:void(0);" class="jun eit" @click="edit(props.index,props.data.id)">编辑</a>
						<a href="javascript:void(0);" class="jun del" @click="del(props.index,props.data.id)">删除</a>
					</div>
					<div v-if="ischain == '1' || ischain == '2'">
						<a href="javascript:void(0);" style="width:100%;height:100%;color:#333;line-height: 80px;">当前无权限</a>
					</div>
				</div>
			</com-table>
			<page v-if="total > 1 " @pageNum="pageChange" :page="pages" :total='total' :isNoJump='true' :isNoPaging='true' style="float: left;margin-bottom: 100px;"></page>
		</div>
		<exchange v-if="isShop == 'exchange'" :shopId="shopId" :ischain="ischain" :imgHost="imgHost"></exchange>
		<temset v-if="isTemplate" @getTemplate="templateResult" :shopId="shopId"></temset>
		<addwin v-if="isWin" @winEvent="getAdd" :editInfos="editInfos" :uid="uid" :imgHost="imgHost" :ischain='ischain'></addwin>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			shopId: null,
			imgHost: null,
			ischain: null,
			goodLists: [],
			len: null,
			total: null,
			pages: 1,
			index: null,
			uid: null,
			isTemplate: false, //模板设置弹窗
			isShop: 'shop', //商品管理 兑换管理切换
			isWin: false, //添加积分商品弹窗
			editInfos: '', //保存编辑信息
			titleList: [{
				titleName: '序号',
				titleStyle: {
					width: '100px',
					flex: 'none'
				},
				dataName: 'id'
			},
			{
				titleName: '商品类型'
			},
			{
				titleName: '商品名称',
				dataName: 'name'
			},
			{
				titleName: '展示图片',
				dataName: 'imageName'
			},
			{
				titleName: '创建时间',
				dataName: 'createTime'
			},
			{
				titleName: '兑换所需积分',
				dataName: 'price'
			},
			{
				titleName: '兑换所需现金',
				dataName: 'cash'
			},
			{
				titleName: '库存',
				dataName: 'inventory'
			},
			{
				titleName: '已兑换数量',
				dataName: 'exchangeNum'
			},
			{
				titleName: '排序',
				dataName: 'sort'
			},
			{
				titleName: '状态',
				dataName: 'status'
			},
			{
				titleName: '操作'
			}
			],
			allTotal: 100,
			page: 1,
			pageTotal: 10,
			createUser: '', //操作人
			dataList: [],
			count: 0,
			statusType: {
				0: '品牌商品',
				1: '门店商品'
			}
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.imgHost = userData.uploadUrl;
		this.ischain = userData.currentShop.ischain;
		this.uid = userData.user.id;
		this.getActivityGoodsList();
		if (
			(this.ischain == '0' || this.ischain == '3') &&
			this.isShop == 'shop'
		) {
			this.initBtn();
		}
	},
	methods: {
		initBtn() {
			let obj = {
				setTemplateType: () => {
					//模板设置
					this.isTemplate = true;
				},
				addIntegral: () => {
					//添加积分商品
					this.editInfos = '';
					this.isWin = true;
				}
			};
			this.$store.commit('setPageTools', obj);
		},
		//修改商品
		async ActivityGoodsedit(data) {
			await http.ActivityGoodsedit({
				data: data
			});
			this.getActivityGoodsList();
		},
		//添加商品
		async ActivityGoodsadd(data) {
			await http.ActivityGoodsadd({
				data: data
			});
			this.getActivityGoodsList();
		},
		//获取列表
		async getActivityGoodsList() {
			let res = await http.getActivityGoodsList({
				data: {
					page: this.pages,
					num: 10
				}
			});

			this.goodLists = res.list;
			this.total = res.total;
			this.total < 10 ? (this.len = this.total) : (this.len = 10);
			let good = this.goodLists;
			this.count = res.count;
			// 时间戳转换
			for (let i = 0; i < good.length; i++) {
				good[i].createTime = utils.getTime({
					time: good[i].createTime,
					type: true,
					format: 'yyyy.MM.dd'
				}).format;
				good[i].status = good[i].status == 0 ? '已上架' : '已下架';
			}
		},
		//上下架
		async ActivityShelves(i, gid, status) {
			let res = await http.ActivityShelves({
				data: {
					id: gid,
					status: status == 0 ? 1 : 0,
					uid: this.uid
				}
			});
			let arr = res;
			arr.createTime = utils.getTime({
				time: arr.createTime,
				type: true,
				format: 'yyyy.MM.dd'
			}).format;
			this.$set(this.goodLists, i, arr);
		},
		//删除
		async ActivityDel(i, gid) {
			await http.ActivityDel({
				data: {
					id: gid,
					uid: this.uid
				}
			});
			this.goodLists.splice(i, 1);
		},
		//删除
		del(i, gid) {
			this.$store.commit('setWin', {
				title: '提示信息',
				winType: 'confirm',
				content: '确认删除商品',
				callback: res => {
					if (res == 'ok') {
						this.ActivityDel(i, gid);
					}
				}
			});
		},
		//翻页
		pageChange(page) {
			this.pages = page.page;
			this.getActivityGoodsList();
		},
		openUse() {
			this.isShop == 'shop' ?
				(this.isShop = 'exchange') :
				(this.isShop = 'shop');
			if (
				(this.ischain == '0' || this.ischain == '3') &&
				this.isShop == 'shop'
			) {
				setTimeout(() => {
					this.initBtn();
				});
			}
		},
		//模板选择
		setTemplateType() {
			this.isTemplate = true;
		},
		//添加积分商品
		openWin() {
			this.editInfos = '';
			this.isWin = true;
		},
		//上下架
		shelves(i, gid, status) {
			this.ActivityShelves(i, gid, status);
		},
		//编辑
		edit(index, gid) {
			for (let i = 0; i < this.goodLists.length; i++) {
				if (this.goodLists[i].id == gid) {
					this.editInfos = this.goodLists[i];
				}
			}
			this.isWin = true;
		},
		//模板选择弹窗回调
		templateResult() {
			this.isTemplate = false;
		},
		//新增积分弹窗回调
		getAdd(res, data) {
			if (res == 'close') {
				return false;
			}
			this.isWin = false;
			if (res == 'ok') {
				if (this.editInfos) {
					this.ActivityGoodsedit(data);
				} else {
					this.ActivityGoodsadd(data);
				}
			}
		}
	},
	components: {
		page: () =>
			import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		temset: () =>
			import ( /*webpackChunkName: 'template_win'*/ './template_win'),
		exchange: () =>
			import ( /*webpackChunkName: 'exchange'*/ './exchange'),
		addwin: () =>
			import ( /*webpackChunkName: 'addintegral_win'*/ './addintegral_win'),
		comTable: () =>
			import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table')
	},
	destroyed() {
		this.$store.commit('setPageTools', {});
	}
};
</script>
<style type="text/css" scoped>
.operate {
	padding: 0;
}





/* @import url("./warecom"); */

.mall-box {
	width: 100%;
	height: auto;
	/* min-width: 1024px; */
	overflow: hidden;
}

.operateParent {
	height: 100%;
}

.firstFun {
	height: 40px;
	line-height: 40px;
	float: left;
	margin-bottom: 15px;
}

.firstTitle {
	width: 250px;
	height: 40px;
	overflow: hidden;
}

.firstTitle span,
.firstBtn {
	display: inline-block;
	text-align: center;
	width: 125px;
	height: 40px;
	cursor: pointer;
}

.firstTitle span {
	color: #333;
	background-color: #f2f2f2;
}

.firstTitle span.on {
	color: #fff;
	background-color: #2a80b9;
}

.firstTitle span.ons {
	color: #fff;
	background-color: #29a7e1;
}

.firstBtn {
	background-color: #f8931f;
	color: #fff;
}

.mar {
	margin-right: 5px;
}

.integralInfo {
	background-color: #f2f2f2;
	width: 100%;
	height: 40px;
	margin-bottom: 10px;
}

.integralInfo span {
	display: inline-block;
	width: 150px;
	line-height: 40px;
	text-align: center;
	color: #f7921e;
}

.gooodsTable,
.gooodsContent {
	width: 100%;
	height: auto;
	overflow: hidden;
}

.gooodsTable .imgshow {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.gooodsTable .imgshow img {
	width: 70px;
	height: 70px;
}

.goodsTitle,
.useManage {
	background-color: #e6e6e6;
	height: 50px;
	line-height: 50px;
	min-width: 920px;
}

.goodsTitle span,
.gooodsContent span {
	float: left;
	width: 10%;
	min-width: 90px;
	text-align: center;
	overflow: hidden;
}

.goodsTitle span:last-child,
.gooodsContent span:last-child {
	width: 20%;
}

.useManage span,
.useConcent span {
	float: left;
	width: 12.5%;
	text-align: center;
}

.gooodsContent .concent,
.useConcent .concent {
	width: 100%;
	border-bottom: 1px solid #e6e6e6;
	overflow: hidden;
}

.gooodsContent span,
.useConcent span {
	height: 80px;
	line-height: 80px;
}

.gooodsContent span.notConsume,
.useConcent span.notConsume {
	color: #08a019;
}

.gooodsContent span.aConsume,
.useConcent span.aConsume {
	color: #ec1415;
}

.tips {
	text-align: center;
	height: 80px;
	line-height: 80px;
	color: #e7e7e7;
	font-size: 24px;
}

.operate {
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}

.operate a {
	display: inline-block;
	height: 45px;
	line-height: 45px;
	text-align: center;
	color: #fff;
	flex: 1;
}

.del {
	background-color: #ec1415;
}

.eit {
	background-color: #00adef;
}

.shelves {
	background-color: #2a80b9;
}

textarea:focus {
	outline: none;
}

.disNone {
	display: none !important;
}

.style-template {
	width: 250px;
	height: auto;
	overflow: hidden;
}

.template-title {
	text-indent: 30px;
	width: 150px;
	height: 30px;
	line-height: 30px;
	margin-bottom: 30px;
	cursor: pointer;
}

.template-checkOn {
	background: url(../../../res/images/checkbox-on.png) left center no-repeat;
	background-size: 20px 20px;
}

.template-checkOff {
	background: url(../../../res/images/checkbox-off.png) left center no-repeat;
	background-size: 20px 20px;
}
</style>