<template>
	<div id="shipment">
		<detail-verify v-if="hackReset" :type="null" ref="detail" @detailData="detailevt"></detail-verify>
		<pass-win v-if="showPass" :width="500" :height="200" :title="'审核不通过'" @winEvent="passEvent"></pass-win>
		<add-store :pObj="comObj" v-if="addShow" @throwWin="throwWin"></add-store>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				showPass: false,
				applyId: '',
				hackReset: true,
				addShow: false,
				comObj: '',
				detailData: '',
				type: '', //按钮判断
				shopId: storage.session('shopId'),

			};
		},
		methods: {
			async passEvent(str, data) {
				this.showPass = false;
				if (str == 'ok') {
					await http.invoic_disapproveApplication({
						data: {
							id: this.applyId,
							reason: data[0],
							remark: data[1]
						}
					});
					window.history.go(-1);
				}
			},
			throwWin(str, res) {
				this.addShow = false;
				if (str == 'ok') {
					if (!res) {
						this.addShow = true;
						this.alert('请选择出货仓库');
						return false;
					} else {
						if (res.id == this.detailData.wid) {
							this.alert('出货仓库不能与入货仓库重复,请重新选择');
							this.addShow = true;
						} else {
							this.comObj.owner = res;
							this.detailData.outWare = res;
							this.detailData.comObj = this.comObj;
							storage.session('details', this.detailData);
							this.$router.push({
								path: 'newSchedule',
								query: this.$route.query
							});
						}
					}

				}
			},
			detailevt(data) {
				if (data.auditStatus == 1 && data.dispatchStatus <= 2) {
					this.type = 1;
				} else if (data.auditStatus == 4 && data.dispatchStatus == 3) {
					this.type = 2;
				} else if(data.auditStatus == 4 && data.dispatchStatus == 5){
					this.type = 3;
				}else{
					this.type = '';
				}
				this.titleBtn();
			},
			titleBtn() {
				let arr = [{
					name: '返回',
					className: ['back'],
					fn: () => {
						this.$router.push({
							path: '/admin/conclusionList'
						});
					}
				}];
				if (this.type == 1) {
					arr = arr.concat([{
						name: '新建调度',
						className: ['wearhouse create'],
						fn: async () => {
							// storage.session('details',this.$refs.detail.detailData);
							this.detailData = this.$refs.detail.detailData;
							this.addShow = true;
						}
					},
					{
						name: '审核不通过',
						className: ['recheck'],
						fn: async () => {
							this.showPass = true;
						}
					},
					{
						name: '审核通过',
						className: ['printer-btn'],
						fn: async () => {
							let data = await http.invoic_approveApplication({
								data: {
									id: this.applyId
								}
							});
							if (data) {
								this.alert('审核通过成功');
								window.history.go(-1);
							}
						}
					}]);
				}
				if (this.type == 2) {
					arr = arr.concat({
						name: '重新审核',
						className: ['wearhouse all'],
						fn: async () => {
							let data = await http.invoic_reAudit({
								data: {
									id: this.applyId
								}
							});
							if (data) {
								this.titleBtn();
								this.hackReset = false;
								this.$nextTick(() => {
									this.hackReset = true;
								});
							}
						}
					});
				}
				if(this.type == 3){
					arr = arr.concat({
						name: '入货',
						className: ['wearhouse all'],
						fn: async () => {
							this.$router.push({
								path: '/admin/operation'
							});
						}
					});
				}
				this.$store.commit('setPageTools', arr);
			},
			alert(con, title) {
				this.$store.commit('setWin', {
					title: title,
					winType: 'alert',
					content: con
				});
			},
			async getWarehouse() {
				//获取仓库列表
				let data = await http.warehouseList();
				let arr = [];
				if (data) {
					for (let item of data) {
						// let shopId = item.owner.split(',')[1];
						let obj = {
							id: item.id,
							name: item.name
							// shopId:this.ischain==3? item.brandId:item.shopId==0? item.brandId:item.shopId
						};
						if (item.shopId != 0) { //单店
							obj.ischain = 0;
							obj.shopId = item.shopId;
						} else { //品牌
							obj.ischain = 1;
							obj.shopId = item.brandId;
						}
						// if(Number(obj.shopId)===Number(this.shopId)){
						//   }
						arr.push(obj);
					}
					this.comObj = {
						allList: arr,
					};
				}
			},
		},
		mounted() {
			this.applyId = this.$route.query.id;
			this.titleBtn();
			this.getWarehouse();
		},
		components: {
			passWin: () =>
				import ( /*webpackChunkName: 'pass_win'*/ './pass_win'),
			detailVerify: () =>
				import ( /*webpackChunkName: 'detail_verify'*/ './detail_verify'),
			addStore: () =>
				import ( /*webpackChunkName:'choose_warehouse__win'*/
					'src/module/invoicing_system/warehouse_manage/choose_warehouse_win'),
		}
	};
</script>
<style lang='less' scoped>
	#shipment {
		.topBox {
			.title {
				width: 98%;
				height: 40px;
				margin: 10px;
				line-height: 40px;
				position: relative;
				overflow: hidden;
				i {
					width: 2px;
					height: 28px;
					position: absolute;
					top: 6px;
					left: 0;
					background-color: #28a8e0;
				}
				h3 {
					width: 70px;
					height: 40px;
					margin-left: 10px;
					float: left;
					font-size: 16px;
					font-family: "微软雅黑";
				}
			}
			.innerBox {
				padding-left: 50px;
				ul {
					display: inline-block;
					width: 32%;
					vertical-align: top;
					li {
						margin-bottom: 20px;
						span {
							display: inline-block;
							max-width: 70%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 16px;
						}
						img {
							cursor: pointer;
						}
					}
				}
			}
			.dian {
				width: 10px;
				height: 1px;
				border-top: 1px solid #e1e1e1;
				margin: 20px 5px;
				float: left;
			}
		}
		.page-box {
			margin-top: 10px;
		}
		.tebBox {
			display: inline-block;
			color: orange;
			cursor: pointer;
			li {
				width: 120px;
				height: 35px;
				line-height: 35px;
				text-align: center;
				border: 1px orange solid;
				display: inline-block;
			}
			.active {
				background-color: orange;
				color: #ffffff;
			}
		}
		.typeBox {
			margin-top: 15px;
			li {
				width: 100px;
				height: 35px;
				text-align: center;
				line-height: 35px;
				display: inline-block;
				margin-right: 10px;
				cursor: pointer;
				background-color: #eeeeee;
				border-radius: 5px;
			}
			.active {
				background-color: #5ebee8;
				color: #ffffff;
			}
		}
	}
</style>