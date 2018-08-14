<template>
	<div id="supplise">
		<div class="search-module">
			<!-- <input type="text" class="search-input" v-model="goodsName" placeholder="请输入物料名称"> -->
			<!-- <div class="sleBtn">
              <select-store @emit="getDrop" :sorts="oneCate" :isSingle="true" :tipName="'请选择一级分类'"></select-store>
            </div>
            <div class="sleBtn" @click="checkOne">
              <select-store @emit="getNext" :sorts="twoCate" :isSingle="true" :tipName="'请选择二级分类'" ref="twosel"></select-store>
            </div> -->
			<div class="sleType">
				<el-input v-model="goodsName" placeholder="请输入物料名称"></el-input>
			</div>
			<div class="sleType">
				<el-select v-model="typeValue" placeholder="全部类型">
					<el-option v-for="item in typeCate" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</div>
			<!-- <div class="inline-box" v-if="tabactive==1">
				<select-btn :sorts="classfiy" :name="'全部类型'" ref="select"></select-btn>
			</div> -->
			<div class="inline-box" v-if="tabactive==1">
				仓库所属：
				<!-- <select-btn :sorts="wareVal" :name="'全部'" @selOn="selectWare" ref="selects"></select-btn> -->
				<div class="sleType">
					<el-select v-model="selWare" @change="selectWare" placeholder="全部">
						<el-option v-for="item in wareList" :key="item.shopId" :label="item.shopName" :value="item.shopId"></el-option>
					</el-select>
				</div>
			</div>
			<div class="button-box">
				<div @click="search" class="blue filter">筛选</div>
				<div @click="reset" class="gray reset">重置</div>
			</div>
		</div>
		<section class="listBox">
			<div class="listTitle">
				<p>批次列表<span>·</span>共<strong>{{allCount}}</strong>个条目</p>
			</div>
			<div class="homeTitle batchTitle">
				<ul style="width: 100%;float: left;">
					<li>操作</li>
					<li>序号</li>
					<li>物料名称</li>
					<li>分类</li>
					<li>类型</li>
					<li>仓库所属</li>
					<li>库存数量/重量</li>
				</ul>
			</div>
			<!--列表内容 list-->
			<div class="homeList batchTitle" v-for="(item,index) in allList" :key="index">
				<ol>
					<li class="infoDetail">
						<a href="javascript:void(0);" @click="addDetailhouse(item)" style="color:#5ebee8;">查看详情</a>
					</li>
					<li v-if="(1+index)+10*(page-1)<10">{{`0${index+1}`}}</li>
					<li v-else>{{(1+index)+10*(page-1)}}</li>
					<li>{{item.name}}</li>
					<li><span v-for="(cate,i) in item.cate" :key="i"><strong>{{cate.name}}</strong>&nbsp;</span></li>
					<li>{{typeCate[Number(item.type)+1].label}}</li>
					<li>{{item.shopName}}</li>
					<li v-if="item.goodsNum">{{item.goodsNum.surplus}}<span v-for="(unit,i) in item.unit" :key="i"><strong v-if="unit.isMin==1">{{unit.name}}</strong></span></li>
					<li v-else>--</li>
				</ol>
			</div>
			<!--列表表尾 标题--请求不到后台数据时不显示-->
			<div v-if="allList.length == 0" id="emptyData">目前没有可操作数据</div>
		</section>
		<div style="float:right; margin-top:10px">
			<page-turn @pageNum="pageChange" :isNoJump="false" :isNoPaging='true' :total="pageTotal" :page="page"></page-turn>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			allList: '',
			page: 1,
			pageTotal: 0,
			num: 10,
			goodsName: '', //搜索名称
			sleName: '',
			typeCate: ['物料'],
			wareGoods: '全部',
			selWare: '', //选择的仓库
			classfiy: ['全部类型', '物料'],
			shopIds: '',
			allCount: 0,
			typeCate: [{
				value:-1,
				label:'全部类型'
			},{
				value:0,
				label:'成品'
			},{
				value:1,
				label:'半成品'
			},{
				value:2,
				label:'普通物料'
			}],
			typeValue:-1
		};
	},
	props: ['wareList', 'tabactive'],
	methods: {
		async init() {
			let data = await http.invoic_getMaterialListByShopIds({
				data: {
					shopIds: this.shopIds,
					search: this.sleName,
					page: this.page,
					type:this.typeValue
				}
			});
			this.allList = data.list;
			this.pageTotal = data.total;
			this.allCount = data.count;
			for(let item of this.allList) {
				let resNum = await http.invoiv_getMaterialNum({
					data: {
						mids: item.id,
						shopId: item.shopId
					}
				});
				item.goodsNum = resNum[0];
			}
			this.allList = utils.deepCopy(this.allList);
		},
		addDetailhouse(item) {
			storage.session('materialDetailShopId', item.shopId);
			this.$router.push({
				path: 'warehouseMaterialDetail',
				query: {
					id: item.id
				}
			});
			// this.$router.push({ path: 'inventoryManagement/suppliesDetail',query:{id:item.id} });
		},
		batchLose(item) {

			this.$router.push({
				path: 'inventoryManagement/materialsPutinStorage',
				query: {
					id: item.id,
					type: 1
				}
			});
		},
		selectWare(sle){
			this.shopIds = sle==-1? this.wareList[0].all:sle;
			console.log(this.shopIds);
		},
		search() {
			//点击筛选
			this.sleName = this.goodsName;
			this.init();
		},
		reset() {
			this.goodsName = '';
			this.sleName = '';
			this.selWare = '';
			this.typeValue = -1;
			this.shopIds = this.wareList[0].all;
			this.init();
		},
		pageChange(page) {
			this.page = page.page;
			this.init();
		},
		alert(con, title) {
			this.$store.commit('setWin', {
				title: title,
				content: con
			});
		},
	},
	mounted() {
		console.log(this.wareList)
		this.shopIds = this.wareList[0].all;
		this.init();
	},
	components: {
		pageTurn: () =>
			import( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		selectStore: () =>
			import( /*webpackChunkName: 'page'*/ 'src/components/select_store'),
		selectBtn: () =>
			import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
	}
};
</script>
<style lang='less' scoped>
	@media only screen and (max-width:1145px) {
		.button-box {
			margin-top: 10px;
			display: block;
		}
	}
	
	.search-module {
		padding-bottom: 16px;
		.sleType{
			width: 170px;
			display: inline-block;
			margin-right: 15px;
		}
		.inline-box {
			display: inline-block;
			margin-right: 10px;
		}
		.button-box {
			display: inline-block;
		}
		.sleBtn {
			display: inline-block;
			margin-right: 10px;
		}
		.search-select {
			display: inline-block;
			margin-right: 10px;
		}
		.search-btn {
			width: 100px;
			height: 40px;
			line-height: 40px;
			color: #fff;
			font-size: 16px;
			margin-right: 10px;
			display: inline-block;
			text-align: center;
		}
		.filter,
		.reset {
			.search-btn;
		}
	}
	
	.listBox {
		border: 1px #ccc solid;
		width: 100%;
		height: auto;
		float: left;
		.homeTitle {
			background: #e6e6e6;
			overflow: hidden;
			line-height: 50px;
		}
		.homeList {
			border-bottom: 1px solid #fff;
			height: 50px;
			line-height: 50px;
			color: #7f7f7f;
			.infoDetail {
				text-align: center;
				a {
					display: inline-block;
				}
			}
		}
		.homeList ol,
		.homeTitle ul {
			overflow: hidden;
		}
		.homeList ol li {
			overflow: hidden;
			float: left;
			width: 14%;
			height: 50px;
			text-align: center;
			font-size: 12px;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.homeTitle ul li {
			overflow: hidden;
			float: left;
			width: 14%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			font-size: 12px;
		}
		.listTitle {
			padding: 15px 20px;
			p {
				span {
					display: inline-block;
					padding: 0 10px;
					font-size: 30px;
					line-height: 0px;
					position: relative;
					top: 5px;
				}
				strong {
					color: red;
				}
			}
		}
		#emptyData {
			margin: 0 auto;
			text-align: center;
			height: 50px;
			line-height: 50px;
			color: orange;
		}
	}
</style>