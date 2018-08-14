/* * @Author: zhouzhe * @Date: 2018-05-07 17:57:15 */

<template>
	<div id="newlose">
		<div class="titleTop">
			<div class="topbox">
				<i></i>
				<h3>新增下架</h3>
				<div class="dian" v-for="i in 32" :key="i"></div>
			</div>
		</div>
		<div class="conBox" v-if="type!=2">
			<label class="content-box">
				<span class="required">下架类型</span>
				<select-btn :sorts="soldType" @selOn="selectList" :width="240" ref="select"></select-btn>
			</label>
			<label class="content-box" v-if="type==1">
				<span class="required">批次选择</span>
				<section @click="showWar" class="tableListInp chairFix" style="vertical-align: middle;">
					<span class="inptext">{{selectWar.batchCode}}</span>
					<div class="fl">
						<span class="addstyle">+</span>
					</div>
				</section>
			</label>
			<label class="content-box">
				<span class="required">下架数量</span>
				<input class="right" v-model="soldNum" type="text" placeholder="请填写下架数量" @input="changeNum" maxlength="9" />
			</label>
			<label class="content-box">
				<span class="req">下架原因</span>
				<input class="right" v-model="resion" type="text" placeholder="选填" maxlength="40" />
			</label>
		</div>
		<soldout-new ref="soldoutNew" @sleType="selectList" v-else></soldout-new>
		<div style="margin-top: 50px;margin-left: 120px;">
			<a href="javascript:void(0);" class="gray" style="width: 120px;margin-right: 20px" @click="cancel">取消</a>
			<a href="javascript:void(0);" class="yellow" style="width: 120px;margin-right: 20px;background: none;color: #f8941f;border: 1px solid #f8941f;"
			    @click="comeon(false)">继续下架</a>
			<a href="javascript:void(0);" class="yellow" style="width: 120px;;" @click="save">确定</a>
		</div>
		<manageEdit :detail="detail" :gid="gid" v-if="batchSle" @winEvent="chooseBatch"></manageEdit>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	export default {
		data() {
			return {
				soldNum: '',
				resion: '',
				soldType: ['下架到耗损', '下架到库存', '下架到库存(新增批次)'],
				selectWar: '',
				batchSle: false,
				type: 0,
				checkHttp: true,
				totalSurplus: 0,
				surplus: 0,
				price: '' //价格
			};
		},
		props: ['detail', 'gid', 'allNum'],
		methods: {
			cancel() {
				this.$emit('soldBack', false);
			},
			changeNum() {
				if (this.soldNum.includes('.')) {
					this.soldNum = this.soldNum.substr(0, this.soldNum.indexOf('.') + 4);
				}
			},
			async comeon(type) {
				if (this.type != 2) {
					if (!this.allNum) {
						this.alert('无上架数量');
						return false;
					}
					if (!this.soldNum || this.soldNum == 0) {
						this.alert('下架架数量有误');
						return false;
					}
					if (this.checkNum()) return false;
					let res = {};
					res.gid = this.gid;
					res.num = this.soldNum;
					res.cause = this.resion;

					if (this.type == 0) {
						res.type = 1;
					} else {
						if (!this.selectWar) {
							this.alert('请选择批次');
							return false;
						}
						// if (this.soldNum > Number(this.selectWar.surplus)) {
						//   this.alert('下架数大于批次数');
						//   return false;
						// }
						res.type = 2;
						res.wid = this.selectWar.wid;
						res.areaId = this.selectWar.areaId;
						res.batchId = this.selectWar.batchId;
						res.surplus = this.surplus;
						res.totalSurplus = this.totalSurplus;
					}
					if (this.checkHttp) {
						http
							.invoicing_loss({
								data: res
							})
							.then(res => {
								this.$emit('soldBack', res);
								this.totalSurplus = res.totalSurplus;
								this.surplus = res.surplus;
								if (type) this.cancel();
								this.setNone();
								// this.checkHttp = true;
								this.alert('下架成功');
							});
					}
				} else {
					await this.soldNew();
					if (type) this.cancel();
					this.setNone();
				}
			},
			async soldNew() {
				let res = this.$refs.soldoutNew;
				this.soldNum = res.soldNum;
				this.price = res.price;
				if (this.checkNum()) return false;
				if (res.wid == '') {
					this.alert('请选择仓库');
					return false;
				}
				if (!res.win.selects[0]) {
					this.alert('请选择供应商');
					return false;
				}
				if (!global.checkData({
					price: {
						reg: /^([+]?)\d*\.?\d+$/,
						pro: '价格输入有误'
					},
				}, this)) return false;
				let data = await http.invoicing_shelveNewBatch({
					data: {
						gid: this.gid,
						wid: res.wid,
						areaId: res.areaId,
						supplierId: res.win.selects[0],
						num: res.soldNum,
						purchasePrice: res.price,
						productionTime: parseInt(res.startTime / 1000),
						expiryTime: parseInt(res.endTime / 1000),
						batchCode: res.batchCode,
						articleNo: res.artNo,
						cause: res.remarks
					}
				});
				this.$emit('soldBack', data);
				this.setNone();
				this.alert('下架成功');
			},
			checkNum() {
				return !global.checkData({ 
					// soldNum: {
					// 	cond: '$$<=Number(this.allNum)',
					// 	pro: '下架数大于上架数'
					// },
					// soldNum: {
					// 	cond: '$$>=0',
					// 	pro: '数量输入有误'
					// },
					// soldNum: {
					// 	reg: /^([+]?)\d*\.?\d+$/,
					// 	pro: '数量输入有误'
					// },
					soldNum:{
						pro: '数量输入有误',
						fn:function(){
							if(this.soldNum<=Number(this.allNum)&&this.soldNum>=0) return true;
							if(/^([+]?)\d*\.?\d+$/.test(this.soldNum)) return true;
							return false;
						}
					}
				}, this);
			},
			save() {
				this.comeon(true);
			},
			selectList(sle) {
				this.type = sle;
			},
			setNone() {
				this.soldNum = '';
				this.resion = '';
				if (this.type == 2) this.$refs.soldoutNew.soldNum = '';
			},
			showWar() {
				this.batchSle = true;
			},
			chooseBatch(str, list) {
				this.batchSle = false;
				if (str == 'ok') {
					console.log(list);
					if (list) {
						this.selectWar = list;
						this.totalSurplus = list.totalSurplus;
						this.surplus = list.surplus;
					}
				}
			},
			alert(con, title) {
				this.$store.commit('setWin', {
					title: title,
					winType: 'alert',
					content: con
				});
			}
		},
		components: {
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			manageEdit: () =>
				import ( /*webpackChunkName: 'manage_edit_win'*/ './manage_edit_win'),
			soldoutNew: () =>
				import ( /*webpackChunkName: 'soldout_new'*/ './soldout_new'),
		}
	};
</script>
<style lang="less" scoped>
	#newlose {
		margin-top: 20px;
		min-width: 1100px;
		.conBox {
			margin-left: 50px;
			margin-top: 10px;
		}
		.titleTop {
			width: 100%;
			height: 40px;
			overflow: hidden;
			.topbox {
				width: 100%;
				height: 40px;
				margin: 10px;
				line-height: 40px;
				position: relative;
				i {
					width: 2px;
					height: 28px;
					position: absolute;
					top: 6px;
					left: 0;
					background-color: #28a8e0;
				}
				h3 {
					width: 73px;
					height: 40px;
					margin-left: 10px;
					float: left;
					font-size: 16px;
				}
			}
		}
		.content-box {
			min-width: 400px;
			max-width: 1100px;
			display: block;
			line-height: 40px;
			margin-bottom: 15px;
			.required {
				display: inline-block;
				font-size: 16px;
				margin-right: 17px;
				width: 100px;
				text-align: right;
			}
			.req {
				display: inline-block;
				font-size: 16px;
				margin-right: 17px;
				width: 100px;
				text-align: right;
			}
			input {
				width: 240px;
				height: 37px;
				font-size: 14px;
				padding-left: 8px;
				outline: none;
			}
			.tableListInp {
				color: #666666;
				border: #b3b3b3 solid 1px;
				height: 40px;
				display: inline-block;
				cursor: pointer;
				div {
					width: 41px;
					height: 40px;
					position: relative;
					z-index: 5;
				}
				.inptext {
					height: 39px;
					width: 198px;
					display: block;
					float: left;
					border-right: 1px #b3b3b3 solid;
					padding-left: 10px;
				}
				.addstyle {
					font-size: 30px;
					text-align: center;
					width: 100%;
					display: inline-block;
					color: #b2b2b2;
					line-height: 30px;
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
</style>