<template>
	<section>
		<div v-if="!isEdit" class="mall-box" id="pro">
			<div v-if="ischain != '1' && ischain != '2'" class="addFun">
				<a href="javascript:void(0);" class="firstBtn fr" style="position:absolute;top: 12px;right: 60px;line-height: 40px;display: block;background-color: #f8931f;color: #fff;width: 150px;" @click="openEdit">添加推广素材</a>
			</div>
			<!-- 下面的表格 -->
			<div class="list_box" style="width:100%;">
				<div class="list_title">
					<div class="list_title_l fl">
						<span>素材列表</span>
						<span></span>
						<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
					</div>
					<div class="list_title_r fr">
					</div>
				</div>
				<el-table :data="proList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
					<el-table-column fixed prop="id" label="序号" width="120" align="center">
					</el-table-column>
					<el-table-column label="素材" prop="name" align="center">
					</el-table-column>
					<el-table-column prop="createTime" label="素材创建时间" align="center">
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button size="medium" type="primary" @click="changeStuas(scope.row.id,scope.row.status)">{{scope.row.status =='1' ? '启用' : '禁用'}}</el-button>
							<el-button size="medium" type="info" @click="proedit(scope.row.id)">编辑</el-button>
							<el-button size="medium" type="danger" @click="dels(scope.row.id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pageWrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="allTotal" :page-sizes="[10, 20, 30]"></el-pagination>
			</div>
			<!-- <div class="fl" style="width: 75%;margin-right: 5%;">
				<com-table :listHeight='80' :showHand="false" :listName="'推广素材列表'" :key="index" :showTitle='2' :listWidth="1300" :introData="proList"
				    :titleData="titleList" :allTotal="allTotal">
					<div slot="con-1" slot-scope="props">
						<div @click="openImg(props.data.imageName)">{{props.data.name}}</div>
					</div>

					<div class="operate" v-if="ischain==3 || ischain == 0" slot="con-3" slot-scope="props">
						<a href="javascript:void(0);" class="fl blue" @click="changeStuas(props.data.id,props.data.status)" v-if="props.data.status == 1">启用</a>
						<a href="javascript:void(0);" class="fl blue" @click="changeStuas(props.data.id,props.data.status)" v-if="props.data.status == 0">禁用</a>
						<a href="javascript:void(0);" class="fl yellow" @click="proedit(props.data.id)">编辑</a>
						<a href="javascript:void(0);" class="fl red" @click="dels(props.data.id)">删除</a>
					</div>
				</com-table>
			</div>
			<div class="linkImgs fl" v-show="seen">
				<img :src="linkImg" v-if="linkImg != null" />
			</div> -->
		</div>
		<mall-pedit @closePedit="closePedit" :position="position" v-if="isEdit">
		</mall-pedit>
	</section>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			isEdit: false, // 是否进入编辑或添加界面
			ischain: '',
			proList: [],
			linkImg: null,
			imgHost: '',
			token: '',
			uid: '',
			index: null,
			position: '',
			allTotal: 1,
			page: 1,
			num: 10,
			pageTotal: 10,
			seen: false,
			count: 0
		};
	},
	methods: {
		closePedit(val) {
			this.isEdit = false;
			if (val) {
				// console.log(val,this.proList)
				this.linkImg = null;
				this.openProList();
			}
		},
		async openProList() {
			let res = await http.Activitymaterial({
				data: {
					page: this.page,
					num: this.num
				}
			});
			// console.log(res);
			this.proList = res.list;
			this.count = res.count;
			this.allTotal = res.total;
			let pros = this.proList;
			// this.allTotal = pros.length;
			// 时间戳转换
			for (let i = 0; i < pros.length; i++) {
				pros[i].createTime = utils.format(
					new Date(Number(pros[i].createTime) * 1000),
					'yyyy.MM.dd/hh:mm'
				);
			}
		},
		openImg(info) {
			console.log(info, 'info');
			this.linkImg = this.imgHost + info;
			this.seen = true;
		},
		closeImg() {
			this.linkImg = '';
			this.seen = false;
		},
		setInter() {
			setInterval(() => {
				this.closeImg();
			}, 5000);
		},

		async changeStuas(id, status) {
			let arr = Number(status);
			arr = Boolean(arr);
			let statu = Number(!arr);
			await http.Shelves({
				data: {
					id: id,
					status: statu,
					uid: this.uid
				}
			});
			this.openProList();
		},
		async proedit(id) {
			let res = await http.getDetail({
				data: {
					id: id
				}
			});
			this.isEdit = true;
			this.position = res;
		},
		dels(id) {
			// debugger
			this.$store.commit('setWin', {
				winType: 'confirm',
				title: '操作提示！',
				content: '确认删除商品？',
				callback: str => {
					str == 'ok' && this.delsMaterial(id);
				}
			});
		},
		async delsMaterial(id) {
			await http.delsMaterial({
				data: {
					id: id,
					uid: this.uid
				}
			});
			this.openProList();
			this.linkImg = null;
		},
		openEdit() {
			this.isEdit = true;
			this.position = null;
		},
		//每页显示多少条数据
		handleSizeChange(p) {
			this.num = p;
			this.openProList();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.openProList();
		},
	},
	mounted() {
		// let widthW = this.$refs.kuang.style.width;
		let innerWidth = window.innerWidth;
		if (innerWidth < 1440) {
			this.setInter();
		}
		let userData = storage.session('userShop');
		this.uid = userData.user.id;
		this.imgHost = userData.uploadUrl;
		this.ischain = userData.currentShop.ischain;
		this.openProList();
	},
	components: {
		'mall-pedit': () =>
			import ( /*webpackChunkName: 'mall_pedit'*/ './mall_pedit'),
		comTable: () =>
			import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table')
	}
};
</script>
<style lang="less" scoped>
.mall-box {
	width: 100%;
	height: auto;
	overflow: hidden;
}

.gooodsTable,
.gooodsContent {
	width: 100%;
	height: auto;
	overflow: hidden;
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
	width: 20%;
	min-width: 90px;
	text-align: center;
	overflow: hidden;
}

.goodsTitle span:last-child,
.gooodsContent span:last-child {
	width: 40%;
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
	overflow: hidden;
}

.gooodsContent span,
.useConcent span {
	height: 55px;
	line-height: 55px;
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
	height: 55px;
	line-height: 55px;
	color: #e7e7e7;
	font-size: 24px;
}

.operate {
	padding: 5px 0;
	box-sizing: border-box;
	height: 80px;
	line-height: 80px;
	align-items: center;
	display: flex;
}

.operate a {
	display: inline-block;
	width: 33.33%;
	height: 45px;
	line-height: 45px;
	text-align: center;
	color: #fff;
}

.linkImgs {
	width: 300px; // background-color: #f2f2f2;
	height: 500px;
	z-index: 19999;
}

.linkImgs img {
	display: block;
	height: 100%;
	width: 100%;
}

.gooodsContent .concent:nth-child(odd) {
	background-color: #f2f2f2;
}

.gooodsContent .concent:nth-child(even) {
	background-color: #ffffff;
}

@media screen and (min-width: 1024px) and (max-width: 1440px) {
	.linkImgs {
		width: 180px;
		height: 300px;
		z-index: 19999;
		position: absolute;
		right: 60px;
		top: 18%;
	}
	.linkImgs img {
		display: block;
		height: 100%;
		width: 100%;
	}
}
</style>