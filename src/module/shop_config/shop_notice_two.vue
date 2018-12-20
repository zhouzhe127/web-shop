<!--
	**添加修改通知信息——下一步
	*
	* 孔伟研
	* *
	*
-->
<template>
	<win @winEvent="selectJobWin" :align="'center'" :width="650" :height="500">
		<!--标题-->
		<span slot="title">选择职位</span>
		<!--内容-->
		<div slot="content" style="padding:10px">
			<section>
				<!-- <el-radio-group v-if="!jobtype" v-model="brandType" @change="chooseJob">
					<el-radio-button :label="'brand'">品牌职位</el-radio-button>
					<el-radio-button :label="'shop'" >门店职位</el-radio-button>
				</el-radio-group> -->
				<el-radio-group v-if="jobtype == 'shop'" v-model="isSelf" @change="chooseSelf">
					<el-radio-button :label="'1'">品牌指派</el-radio-button>
					<el-radio-button :label="'0'">门店自建</el-radio-button>
				</el-radio-group>
				<div v-if="brandType=='brand'" style="max-height:170px;overflow-y:auto;margin-top:15px;">
					<!-- <el-button @click="selallJob('brand')" border class="labItem" style="height:28px;">全部</el-button> -->
					<el-checkbox v-model="jobIds.brand" v-for="item in showJobList" class="labItem" :key="item.id" :label="item.id" border>{{item.name}}</el-checkbox>
				</div>
				<div v-if="brandType=='shop'" style="max-height:170px;overflow-y:auto;margin-top:15px;">
					<!-- <el-button @click="selallJob('shop')" class="labItem">全部</el-button> -->
					<el-checkbox v-model="jobIds.shop" v-for="item in showJobList" class="labItem" :key="item.id" :label="item.id" border>{{item.name}}</el-checkbox>
				</div>
				<div v-if="isSelf == '1'" style="margin-top:5px;">
					<el-button type="info" @click="selallJob(brandType,true)">取消全部</el-button>
					<el-button type="primary" @click="selallJob(brandType,false)">选择全部</el-button>
				</div>
			</section>
		</div>
	</win>
</template>

<script>
import http from 'src/manager/http';
// import global from 'src/manager/global';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			brandType: 'brand',
			showJobList: [],

			type: 0, //类型0：正文，1：草稿箱
			ischain: '',
			rules: {
				title: [
					{
						required: true,
						message: '请输入通知标题',
						trigger: 'blur'
					}
				],
				time: [
					{ required: true, message: '请选择时间', trigger: 'blur' }
				]
			},
			isSelf: '1',
			newshopJobList: [] //单店下的职位
		};
	},
	props: {
		jobtype: String, ////品牌/门店 'shop'、'brand'
		jobList: Array,
		jobIds: Object, //详情
		shopIds: Array
	},
	mounted() {
		let userData = storage.session('userShop');
		this.ischain = userData.currentShop.ischain;
		let shopid = userData.currentShop.id;
		this.brandType = this.jobtype;
		this.chooseJob(this.brandType);
		if(this.ischain=='3'){
			if (this.jobtype == 'shop' && this.shopIds.length == 1) {
				this.getShopJobList(this.shopIds[0]);
			}
		}else{
			this.getShopJobList(shopid);
		}
	},
	methods: {
		selectJobWin(res) {
			if (res == 'ok') {
				this.$emit('selectBack', res, this.jobIds);
			} else {
				this.$emit('selectBack', res);
			}
		},
		async getShopJobList(id) {
			this.newshopJobList = await http.newGetJobInfoList({
				data: { shopId: id }
			});
		},
		//指派和自建切换
		chooseSelf() {
			if (this.isSelf == '1') {
				this.chooseJob('shop');
			} else {
				if (this.shopIds.length == 1) {
					this.showJobList = this.newshopJobList;
				} else {
					this.showJobList = [{ id: '99999999', name: '全部' }];
				}
			}
		},
		//职位切换
		chooseJob(type) {
			this.brandType = type;
			this.showJobList = [];
			for (let i = 0; i < this.jobList.length; i++) {
				if (type == 'brand' && this.jobList[i].type === '1') {
					this.showJobList.push(this.jobList[i]);
				} else if (type == 'shop' && this.jobList[i].type === '0') {
					this.showJobList.push(this.jobList[i]);
				}
			}
			let item = { id: '0', name: '超级管理员' };
			this.showJobList.unshift(item);
			// this.isAll(this.showJobList) ? this.allJob = true : this.allJob = false;
		},
		selallJob(type, bel) {
			let arr = [];
			for (let i = 0; i < this.showJobList.length; i++) {
				arr.push(this.showJobList[i].id);
			}
			if (type == 'brand') {
				if (bel) {
					this.jobIds.brand = [];
				} else {
					this.jobIds.brand = arr;
				}
			} else {
				if (bel) {
					this.jobIds.shop = [];
				} else {
					this.jobIds.shop = arr;
				}
			}
		},
		//职位/门店选择确定
		ensure(type) {
			this.showJob = false;
			if (type == 'all') {
				this.selectedJob = '';
				for (let i = 0; i < this.jobList.length; i++) {
					// for(let j=0;j<this.jobIds.brand.length)
					if (this.jobIds.brand.indexOf(this.jobList[i].id) != -1) {
						this.selectedJob += this.jobList[i].name + ',';
					} else if (
						this.jobIds.shop.indexOf(this.jobList[i].id) != -1
					) {
						this.selectedJob += this.jobList[i].name + ',';
					}
				}
				if (!this.selectedJob) this.selectedJob = '全部职位';
			} else {
				// this.selectedJob = '全部职位';
				// this.jobIds.brand = [];
				// this.jobIds.shop = [];
			}
		}
	},
	components: {
		win: () => import(/*webpackChunkName:'win'*/ 'src/components/win'),
		shopNoticeTwo: () =>
			import(/*webpackChunkName: "shop_notice_two"*/ './shop_notice_two')
	}
};
</script>

<style lang="less" scoped>
.labItem {
	margin-bottom: 5px;
	margin-left: 0 !important;
	margin-right: 10px;
	float: left;
}
#noticeWin {
	.noticeWin {
		width: 100%;
		position: relative;
		height: 60px;
		.tag {
			float: left;
			width: 102px;
			height: 40px;
			line-height: 40px;
			text-align: right;
		}
		.mes {
			float: left;
			padding-left: 15px;
			text-indent: 0;
			line-height: 30px;
		}
		.wearhouse {
			color: #28a8e0;
			border: 1px #28a8e0 solid;
			width: 100px;
			height: 40px;
			line-height: 38px;
			text-align: center;
			float: left;
			margin-left: 5px;
		}
	}
}
</style>
