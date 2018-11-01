/** * @file * * 积分商城 * * @author zhengu.jiang * @author huiling.liu 2018.2.25 */
<template>
	<div class="mall-box" id="inte">
		<div class="firstFun">
			<el-radio-group v-model="commoditySlect">
				<el-radio-button v-for="(item,index) in commodityList" :key="index" :label="item.name" @change.native="selType(item)"></el-radio-button>
			</el-radio-group>
		</div>
		<div v-if="commodityId == 0" class="gooodsTable" style="margin-bottom: 20px;">
			<!-- 下面的表格 -->
			<div class="list_box">
				<div class="list_title">
					<div class="list_title_l fl">
						<span>商品列表</span>
						<span></span>
						<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
					</div>
					<div class="list_title_r fr">
					</div>
				</div>
				<el-table :data="goodLists" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
					<el-table-column fixed prop="id" label="序号" width="100" align="center">
					</el-table-column>
					<el-table-column label="商品类型" width="120" align="center">
						<template slot-scope="scope">
							<span>{{statusType[scope.row.type]}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="商品名称" width="200" align="center">
					</el-table-column>
					<el-table-column prop="imageName" label="展示图片" width="120" align="center">
						<template slot-scope="scope">
							<img :src=" imgHost + scope.row.imageName" style="width: 60px;height: 60px" />
						</template>
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" width="140" align="center">
					</el-table-column>
					<el-table-column prop="price" label="兑换所需积分" width="140" align="center">
					</el-table-column>
					<el-table-column prop="cash" label="兑换所需现金" width="140" align="center">
					</el-table-column>
					<el-table-column prop="inventory" label="库存" width="100" align="center">
					</el-table-column>
					<el-table-column prop="exchangeNum" label="已兑换数量" width="140" align="center">
					</el-table-column>
					<el-table-column prop="sort" label="排序" width="100" align="center">
					</el-table-column>
					<el-table-column prop="showStatus" label="状态" width="100" align="center">
					</el-table-column>
					<el-table-column prop="receiveNum" label="操作" width="200" align="center" v-if="ischain == '0' || ischain == '3'">
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="shelves(scope.$index,scope.row.id,scope.row.status)" style="color: rgb(40, 168, 224);">{{scope.row.status =='0' ? '下架' : '上架'}}</el-button>
							<!-- <el-button size="mini" type="primary" v-if="scope.row.status =='0'" @click="shelves(scope.$index,scope.row.id,scope.row.status)">下架</el-button> -->
							<span style="padding:0 5px;color: #D2D2D2">|</span>
							<el-button size="mini" type="text" @click="edit(scope.$index, scope.row.id)" style="color: #ff8d00;">编辑</el-button>
							<span style="padding:0 5px;color: #D2D2D2">|</span>
							<el-button size="mini" type="text" @click="del(scope.$index, scope.row.id)" style="color: #fd3f1f;">删除</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="receiveNum" label="操作" width="200" align="center" v-if="ischain == '1' || ischain == '2'">
						<template slot-scope="scope">
							<el-button size="mini" type="text" style="color: #ff8d00;">不可操作</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pageWrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
			</div>
		</div>
		<exchange v-if="commodityId == 1" :shopId="shopId" :ischain="ischain" :imgHost="imgHost"></exchange>
		<temset v-if="isTemplate" @getTemplate="templateResult" :shopId="shopId"></temset>
		<addwin v-if="isWin" @winEvent="getAdd" :editInfos="editInfos" :uid="uid" :imgHost="imgHost" :ischain='ischain'></addwin>
	</div>
</template>
<script type="text/javascript">
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
				total: 1,
				num: 10,
				index: null,
				uid: null,
				isTemplate: false, //模板设置弹窗
				isShop: 'shop', //商品管理 兑换管理切换
				isWin: false, //添加积分商品弹窗
				editInfos: '', //保存编辑信息
				allTotal: 100,
				page: 1,
				pageTotal: 10,
				createUser: '', //操作人
				dataList: [],
				count: 0,
				statusType: {
					0: '品牌商品',
					1: '门店商品'
				},
				commoditySlect: '商品管理',
				commodityList: [{
					name: '商品管理',
					id: 0
				}, {
					name: '兑换管理',
					id: 1
				}],
				commodityId: 0 //选中的商品管理
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
				this.commodityId == 0
			) {
				this.initBtn();
			}
		},
		methods: {
			setTemplateType: function() {
				//模板设置
				this.isTemplate = true;
			},
			addIntegral: function() {
				this.editInfos = '';
				this.$router.push('/admin/integralMall/addIntegralMall');
			},
			initBtn() {
				this.$store.commit('setPageTools', [{
					name: '模版设置',
					fn: () => {
						this.setTemplateType();
					},
					className: 'el-btn-yellow'
				}, {
					name: '添加积分商品',
					fn: () => {
						this.addIntegral();
					},
					className: 'el-btn-blue'
				}]);
			},
			//获取列表
			async getActivityGoodsList() {
				let res = await http.getActivityGoodsList({
					data: {
						page: this.page,
						num: this.num
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
					good[i].showStatus = good[i].status == 0 ? '已上架' : '已下架';
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
				arr.showStatus = arr.status == 0 ? '已上架' : '已下架';
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
				//this.goodLists.splice(i, 1);
				this.getActivityGoodsList();
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
			// pageChange(page) {
			// 	this.page = page.page;
			// 	this.getActivityGoodsList();
			// },
			// openUse() {
			// 	this.isShop == 'shop' ?
			// 		(this.isShop = 'exchange') :
			// 		(this.isShop = 'shop');
			// 	if (
			// 		(this.ischain == '0' || this.ischain == '3') &&
			// 		this.isShop == 'shop'
			// 	) {
			// 		setTimeout(() => {
			// 			this.initBtn();
			// 		});
			// 	}
			// },
			//模板选择
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
						storage.session('editInfos', this.editInfos);
						break;
					}
				}
				this.$router.push('/admin/integralMall/addIntegralMall');
				// this.isWin = true;
			},
			//模板选择弹窗回调
			templateResult() {
				this.isTemplate = false;
			},
			//新增积分弹窗回调
			getAdd() {
				// if (res == 'close') {
				// 	return false;
				// }
				// this.isWin = false;
				// if (res == 'ok') {
				// 	if (this.editInfos) {
				// 		this.ActivityGoodsedit(data);
				// 	} else {
				// 		this.ActivityGoodsadd(data);
				// 	}
				// }
			},
			selType(item) { //选择电子卡或者实体卡
				this.commodityId = item.id;
				if (
					(this.ischain == '0' || this.ischain == '3') &&
					this.commodityId == 0
				) {
					setTimeout(() => {
						this.initBtn();
					});
				}
			},
			//每页显示多少条数据
			handleSizeChange(p) {
				this.num = p;
				this.getActivityGoodsList();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.getActivityGoodsList();
			},
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
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
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