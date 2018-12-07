<!--
	**添加修改通知信息——下一步
	*
	* 孔伟研
	* *
	*
-->
<template>
	<win @winEvent="selectJobWin" :align="'center'" :width="440" :height="300">
		<!--标题-->
		<span slot="title">选择职位</span>
		<!--内容-->
		<div slot="content" style="padding:10px">
			<section>
				<el-radio-group v-if="!jobtype" v-model="brandType" @change="chooseJob">
					<el-radio-button :label="'brand'">品牌职位</el-radio-button>
					<el-radio-button :label="'shop'" >门店职位</el-radio-button>
				</el-radio-group>
				<div v-if="brandType=='brand'" style="max-height:170px;overflow-y:auto;margin-top:15px;">
					<!-- <el-button @click="selallJob('brand')" border class="labItem" style="height:28px;">全部</el-button> -->
					<el-checkbox  v-model="jobIds.brand" v-for="item in showJobList"  class="labItem" :key="item.id" :label="item.id" border>{{item.name}}</el-checkbox>
				</div>
				<div v-if="brandType=='shop'" style="max-height:170px;overflow-y:auto;margin-top:15px;">
					<!-- <el-button @click="selallJob('shop')" class="labItem">全部</el-button> -->
					<el-checkbox v-model="jobIds.shop" v-for="item in showJobList"  class="labItem" :key="item.id" :label="item.id" border>{{item.name}}</el-checkbox>
				</div>
				<div style="margin-top:5px;">
					<el-button type="info" @click="selallJob(brandType,true)">取消全部</el-button>
					<el-button type="primary" @click="selallJob(brandType,false)" >选择全部</el-button>
				</div>
			</section>
		</div>
	</win>
</template>

<script>
// import http from 'src/manager/http';
// import global from 'src/manager/global';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			brandType: 'brand',
			showJobList:[],

			type: 0, //类型0：正文，1：草稿箱
			ischain:'',
			rules: {
				title: [
					{ required: true, message: '请输入通知标题', trigger: 'blur' },
				],
				time: [
					{ required: true, message: '请选择时间', trigger: 'blur' },
				],
			},
		};
	},
	props: {
		// jobIds: {
		// 	brand: [],
		// 	shop: []
		// }, //选中的品牌/门店职位id
		jobtype:String,////品牌/门店 'shop'、'brand'
		jobList: Array,
		jobIds: Object //详情
	},
	mounted() {
		let userData = storage.session('userShop');
		this.ischain = userData.currentShop.ischain;
		if(this.jobtype){
			this.brandType = this.jobtype;
			this.chooseJob(this.brandType);
		}else{
			this.chooseJob('brand');
		}
	},
	methods: {
		selectJobWin(res){
			if (res == 'ok') {
				this.$emit('selectBack', res, this.jobIds);
			} else {
				this.$emit('selectBack', res);
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
			// this.isAll(this.showJobList) ? this.allJob = true : this.allJob = false;
		},
		selallJob(type,bel){
			let arr = [];
			for(let i=0;i<this.showJobList.length;i++){
				arr.push(this.showJobList[i].id);
			}
			if(type == 'brand'){
				if(bel){
					this.jobIds.brand = [];
				}else{
					this.jobIds.brand = arr;
				}
				// if(this.jobIds.brand.length == this.showJobList.length){
				// 	this.jobIds.brand = [];
				// }else{
				//	this.jobIds.brand = arr;
				// }
			}else{
				if(bel){
					this.jobIds.brand = [];
				}else{
					this.jobIds.brand = arr;
				}
				// if(this.jobIds.shop.length == this.showJobList.length){
				// 	this.jobIds.shop = [];
				// }else{
				//	this.jobIds.shop = arr;
				// }
			}
		},
		//职位/门店选择确定
		ensure(type) {
			this.showJob = false;
			if (type == 'all') {
				this.selectedJob = '';
				for (let i = 0; i < this.jobList.length; i++) {
					// for(let j=0;j<this.jobIds.brand.length)
					if(this.jobIds.brand.indexOf(this.jobList[i].id) != -1){
						this.selectedJob += this.jobList[i].name + ',';
					}else if(this.jobIds.shop.indexOf(this.jobList[i].id) != -1){
						this.selectedJob += this.jobList[i].name + ',';
					}
				}
				if (!this.selectedJob) this.selectedJob = '全部职位';
			}else{
				// this.selectedJob = '全部职位';
				// this.jobIds.brand = [];
				// this.jobIds.shop = [];
			}
		},
	},
	components: {
		win: () => import(/*webpackChunkName:'win'*/ 'src/components/win'),
		shopNoticeTwo: () =>import(/*webpackChunkName: "shop_notice_two"*/ './shop_notice_two')
	},
};
</script>

<style lang="less" scoped>

.labItem {
	margin-bottom: 5px;
	margin-left: 0!important;
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
