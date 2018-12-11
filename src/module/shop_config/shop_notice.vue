<template>
	<div>
		<section v-if="!showWin" style="margin-top:20px;">
			<el-radio-group v-if="!isTy" v-model="active" @change="actypeType" style="margin:10px 0;">
				<el-radio-button label="0">上架通知</el-radio-button>
				<el-radio-button label="1">下架通知</el-radio-button>
			</el-radio-group>
			<el-table
				stripe border :header-cell-style = "{'background-color':'#f5f7fa'}"
				:data="noticeList"
				style="width: 100%">
				<el-table-column min-width="160" align="center" label="操作">
					<template slot-scope="scope">
						<span style="color: #FE8D2C;cursor:pointer" @click="editElm(scope.row)">编辑</span>
						<span style="padding:0 20px;color: #D2D2D2">|</span>
						<span v-if="!isTy" style="color: #2ea7e0;cursor:pointer" @click="updownWin(scope.row)">{{scope.row.status=='1'?'上架':'下架'}}</span>
						<span v-if="!isTy" style="padding:0 20px;color: #D2D2D2">|</span>
						<span style="color: #FD3F1F;cursor:pointer" @click="delElm(scope.row,scope.$index)">删除</span>
					</template>
				</el-table-column>
				<el-table-column min-width="200" align="center" prop="time" label="发布时间"></el-table-column>
				<el-table-column min-width="200" align="center" prop="sendToSource" label="发布渠道">
					<template slot-scope="scope">
						<span style="">sendToSource</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip min-width="150" align="center" prop="title" label="标题" ></el-table-column>
			</el-table>
		</section>
		<shopNoticeWin v-if="showWin" @openTwo="winResult" :redDetial="redDetial" :isAdd="isAdd" :jobList="jobList"></shopNoticeWin>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			ischain: '', //店铺id 品牌店/单店
			noticeList: [], //通知列表
			copyNoticeList: [], //copy的通知列表，区分草稿箱使用
			showWin: false, //弹窗是否打开
			isAdd: true,
			redDetial: { title: '', time: parseInt(new Date().getTime()/1000),content:''}, //详情
			isTy: false,//草稿箱或列表默认列表
			active:'0',//上架，下架通知
			jobList:[],//职位列表
		};
	},
	components: {
		comTable: () =>
			import(/*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		shopNoticeWin: () =>
			import(/*webpackChunkName: "shop_notice_win"*/ './shop_notice_win'),
		
		
	},
	methods: {
		actypeType(){
			this.init();
			// this.active = re;
			// let arr = [];
			// for(let i=0;i<this.copyNoticeList.length;i++){
			// 	if(this.copyNoticeList[i].status == re){
			// 		arr.push(this.copyNoticeList[i]);
			// 	}
			// }
			// this.noticeList = arr;
		},
		init() {
			this.isTy = false;
			this.noticeList = [];
			for (let i = 0; i < this.copyNoticeList.length; i++) {
				let item = this.copyNoticeList[i];
				if (this.copyNoticeList[i].type == '0' && this.copyNoticeList[i].status == this.active) {
					this.noticeList.push(item);
				}
			}
		},
		getdraft() {
			this.noticeList = [];
			this.$store.commit('setPageTools', []);
			for (let i = 0; i < this.copyNoticeList.length; i++) {
				let item = this.copyNoticeList[i];
				if (this.copyNoticeList[i].type == '1') {
					this.noticeList.push(item);
				}
			}
			this.isTy = true;
		},
		add() {
			this.isAdd = true;
			this.showWin = true;
			this.redDetial = { title: '', time: new Date().getTime()/1000,content:''};
			this.$store.commit('setPageTools', []);
		},
		async editElm(item) {
			this.redDetial = await http.getNoticeOne({ data: {id:item.id} });
			this.isAdd = false;
			this.showWin = true;
		},
		async delNoticeOne(item) {
			await http.delNoticeOne({ data: {id:item.id} });
		},
		delElm(item, index) {
			console.log(index);
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确定删除此通知吗？',
				callback: delRes => {
					if (delRes == 'ok') {
						this.delNoticeOne(item);
						this.noticeList.splice(index,1);
						// this.isStopman(detial, index);
					}
				}
			});
		},
		async updownNotice(item) {
			await http.updownNotice({ data: {id:item.id,status:item.status=='1'?'0':'1' }});
			// this.getdraft();
			// this.init();
		},
		//下架通知
		updownWin(item){
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确定'+item.status=='1'?'上架':'下架'+'此通知吗？',
				callback: delRes => {
					if (delRes == 'ok') {
						this.updownNotice(item);
						this.getList();
					}
				}
			});
		},
		isTatle() {
			let rools = [];
			if (!this.isTy) {
				rools = [
					{
						name: '草稿箱',
						type:4,
						className: '',
						fn: this.getdraft
					},
					{
						name: '新建内容',
						type:4,
						className: 'primary',
						fn: this.add
					}
				];
			} else {
				rools = [
					{
						name: '返回',
						type:4,
						className: 'info',
						fn: this.init
					}
				];
			}
			this.$store.commit('setPageTools', rools);
		},
		winResult(res) {
			this.showWin = false;
			this.isTatle();
			if(res == 'add' || res=='back'){
				this.getList();
			}
		},
		//获取通知列表
		async getList(){
			this.copyNoticeList = await http.getNoticeList({ data: {} });
			this.jobList = await http.newGetJobInfoList();
			for (let i = 0; i < this.copyNoticeList.length; i++) {
				let item = this.copyNoticeList[i];
				item.time = utils.format(new Date(item.time*1000), 'yyyy-MM-dd hh:mm:ss');
			}
			this.init();
		},
		//获取一条通知详情
		async getOne(){
			this.copyNoticeList = await http.getNoticeOne({ data: {id:this.id} });
		},
	},
	mounted() {
		// this.copyNoticeList = [
		// 	{ title: '啊wgewgwgwewgwegwe', time: 1527816360, type: 0,content:'<p>围观围观<img src="https://cdn.ishandian.com.cn/upload/10010/8/bc3d2234d867b9f057d138bd6c8aa495.jpg" style="max-width: 100%;">围观围观围观围观</p>'},
		// 	{ title: 'wgewgwgwegwegwe', time: 1527816360, type: 0 },
		// 	{ title: '围观围观围观', time: 1531411199, type: 1 },
		// 	{ title: '噩噩噩噩噩噩噩噩噩噩噩', time: 1531411199, type: 1 }
		// ];
		this.getList();
		this.ischain = storage.session('userShop').currentShop.ischain;
		this.isTatle();
	},
	watch: {
		isTy: 'isTatle'
	}
};
</script>
<style type="text/css" scoped>
</style>