<!-- 
    @file   调度申请详情
    @百川     曾伟福
-->
<template>
    <div>
        <detail v-if="showCom" :type="tab"  @detailData="getStatus"></detail>
    </div>
</template>
<script>
	import { mapMutations } from 'vuex';
	import storage from 'src/verdor/storage';
	import http from 'src/manager/http';

	export default {
		data() {
			return {
				showCom: false,
				status: {},
				auditStatus:[
					{id:1,name:'审核中'},
					{id:2,name:'已取消'},
					{id:3,name:'审核未通过'},
					{id:4,name:'审核通过'},
				],
				dispatchStatus:[
					{id:1,name:'未调度'},
					{id:2,name:'调度中'},
					{id:3,name:'未出货'},
					{id:4,name:'全部取消'},
					{id:5,name:'待入货'},
					{id:6,name:'已完成'},
					{id:7,name:'已完成（异常）'},
				],
				tab: null,
				btnArr: [],
				/*
				    dispatchCancelApplication:取消申请
				*/
			};
		},
		methods: {
			...mapMutations(['setPageTools', 'setWin']),
			initBtn() {
				let {
					auditStatus,
					dispatchStatus,
					id
				} = this.status;
				let com = {
					width: '100px',
					height: '40px',
					'lineHeight': '38px',
					'fontSize': '16px',
					'textAlign': 'center',
					'backgroundColor': '#fff'
				};
				this.btnArr = [
					{name: '返回',style: {border: '1px solid #ccc',color: '#666'},
						fn: () => {
							storage.session('tab', 1);
							this.$router.go(-1);
						}
					},
					{name: '修改信息',style: {border: '1px solid #ff8d01',color: '#ff8d01'},
						fn: () => {
							let str = '修改后会用新单替换旧单,是否要继续修改信息?';
							this.alert(str, () => {
								let query = this.$route.query;
								query.tab = 1;
								this.$router.push({
									path: './purchaseRequisition',
									query
								});
							});
						}
					},
					{name: '取消申请单',style: {border: '1px solid #ff3d04',color: '#ff3d04'},
						fn: () => {
							let str = '入货申请单取消后废弃,是否取消入货申请单?';
							this.alert(str, () => {
								http['dispatchCancelApplication']({
									data: {
										applyId: id
									}
								}).then((res) => {
									this.showCom = false;
									let strTips = res ? '成功取消申请单!' : '取消失败!';
									this.alert(strTips);
									this.btnArr.splice(1, 2);
									this.$nextTick(() => {
										this.showCom = true;
									});
								});
							});
						}
					},
				];
				for(let ele of this.btnArr) {
					Object.assign(ele.style, com);
				}
				//审核中未调度是显示'修改信息',取消申请单
				if(auditStatus != 1 || dispatchStatus != 1) {
					this.btnArr.splice(1, 2);
				}
				this.setPageTools(this.btnArr);
			},
			alert(str, fn) {
				let obj = {
					content: str,
					title: '操作提醒'
				};
				if(fn) {
					obj = {
						content: str,
						title: '操作提醒',
						winType: 'confirm',
						callback: (res) => {
							if(res == 'ok') fn();
						}
					};
				}
				this.setWin(obj);
			},
			getStatus(obj) {
				this.status = obj;
				this.initBtn();
			}
		},
		computed: {},
		mounted() {
			if(this.$route.query.auditStatus == 4) this.tab = 1;
			this.showCom = true;
		},
		components: {
			detail: () =>
				import( /*webpackChunkName: 'detail_verify'*/ '../conclusion/detail_verify'),
		},
		beforeDestroy() {
			if(this.$route.path != '/admin/schedulingApplication') {
				storage.session('subObj', null);
			}
			let query = this.$route.query;
			delete query.auditStatus;
			delete query.dispatchStatus;
		},
	};
</script>
<style lang='less' scoped>
</style>