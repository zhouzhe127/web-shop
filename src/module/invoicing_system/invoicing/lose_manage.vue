<template>
	<section id="materials-putin-storage">
		<div class="new-inventory">
			<div class="topbox">
				<i></i>
				<h3>新增耗损</h3>
				<div class="dian" v-for="i in 32" :key="i"></div>
			</div>
			<ul class="new-inventory-body">
				<li>
					<section>
						<h6>操作类型:</h6>
						<span>耗损</span>
					</section>
					<section>
						<h6>批次编码:</h6>
						<span>{{detail.batchCode||"--"}}</span>
					</section>
				</li>
				<li>
					<section>
						<h6>仓库:</h6>
						<span>{{detail.wName||"暂无"}}-{{detail.aName||"暂无"}}</span>
					</section>
					<section>
						<h6>进价:</h6>
						<span>{{detail.purchasePrice||"--"}}</span>
					</section>
				</li>
				<li>
					<section>
						<h6>生产日期:</h6>
						<span>{{getTime(detail.productionTime)}}</span>
					</section>
					<section>
						<h6>失效日期:</h6>
						<span>{{getTime(detail.expiryTime)}}</span>
					</section>
				</li>
				<li>
					<section>
						<h6>供应商:</h6>
						<span>{{detail.supplier||"--"}}</span>
					</section>
					<section>
						<h6>货号:</h6>
						<span>{{detail.articleNo||"--"}}</span>
					</section>
				</li>
				<li>
					<section class="weightNum">
						<h6 class="required">耗损数量/重量:</h6>
						<input type="text" placeholder="请输入耗损数量" maxlength="10" @input="changeNum" v-model="loseNum">
						<span>（当前批次库存：{{totalSurplus}}）</span>
					</section>
				</li>
				<div class="note">
					<p>备注</p>
					<textarea placeholder="请输入备注" v-model="resion" maxlength="40"></textarea>
				</div>
				<div class="prompt">
					<img src="../../../res/icon/prompt.png" alt="">
					<span>限40字以内</span>
				</div>
			</ul>
		</div>
		<ul class="btn">
			<li class="gray" @click="cancal">取消</li>
			<li @click="continueLoss(false)">继续耗损</li>
			<li class="orange" @click="confirm">确定</li>
		</ul>
	</section>
</template>

<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	import global from 'src/manager/global';
	export default {
		data() {
			return {
				checkHttp: true,
				resion: '',
				loseNum: '',
				totalSurplus: 0,
				surplus: 0
			};
		},
		props: ['detail', 'gid'],
		mounted() {
			this.totalSurplus = this.detail.totalSurplus;
			this.surplus = this.detail.surplus;
		},
		methods: {
			cancal() {
				this.$emit('loseBack', false);
			},
			changeNum() {
				if(Number(this.detail.type)==0){
					this.loseNum = parseInt(this.loseNum);
				}else{
					if (this.loseNum.includes('.')) {
						this.loseNum = this.loseNum.substr(0, this.loseNum.indexOf('.') + 4);
					}
				}
			},
			async continueLoss(type) {
				if (Number(this.loseNum) > Number(this.detail.surplus)) {
					this.$store.commit('setWin', {
						winType: 'alert',
						content: '耗损数量应小于当前批次库存'
					});
					return false;
				}
				if (!global.checkData({
					// loseNum: {
					// 	reg: /^([+]?)\d*\.?\d+$/,
					// 	pro: '数量输入有误'
					// },
					// loseNum: {
					// 	cond: '$$>0',
					// 	pro: '数量输入有误'
					// },
					loseNum:{
						pro: '数量输入有误',
						fn:function(){
							if(this.loseNum>0) return true;
							if(/^([+]?)\d*\.?\d+$/.test(this.loseNum)) return true;
							return false;
						}
					}
				}, this)) return false;
				let res = {
					gid: this.gid,
					type: 0,
					num: this.loseNum,
					cause: this.resion,
					wid: this.detail.wid,
					areaId: this.detail.areaId,
					batchId: this.detail.batchId,
					surplus: this.surplus,
					totalSurplus: this.totalSurplus
				};
				if (this.checkHttp) {
					http
						.invoicing_loss({
							data: res
						})
						.then(res => {
							this.totalSurplus = res.totalSurplus;
							this.surplus -= this.loseNum;
							this.$emit('loseBack', res);
							if (type) this.cancal();
							this.setNone();
							// this.checkHttp = true;
							this.$store.commit('setWin', {
								title: '提示',
								winType: 'alert',
								content: '耗损成功'
							});
						});
				}
				// this.checkHttp = false;
			},
			confirm() {
				this.continueLoss(true);
			},
			setNone() {
				this.loseNum = '';
				this.resion = '';
			},
			getTime(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd');
			}
		}
	};
</script>

<style lang="less" scoped>
	#materials-putin-storage {
		.new-inventory {
			width: 100%;
			margin-top: 10px;
			height: auto;
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
			.new-inventory-head {
				width: 100%;
				height: 30px;
				line-height: 30px;
				span {
					margin-left: 10px;
					float: left;
				}
				i {
					margin-left: 10px;
					color: #ccc;
				}
			}
			.new-inventory-body {
				width: 1000px;
				height: auto;
				margin-top: 10px;
				margin-left: 80px;
				li {
					margin-top: 20px;
					height: 40px;
					section {
						width: 400px;
						font-size: 20px;
						float: left;
						p {
							width: 100px;
							height: 40px;
							line-height: 40px;
							float: left;
							text-align: right;
						}
						h6 {
							height: 40px;
							line-height: 40px;
							float: left;
							text-align: right;
						}
						h6:after {
							content: "";
							color: red;
							margin: 0 5px;
						}
						span {
							height: 40px;
							line-height: 40px;
							float: left;
						}
						input {
							height: 40px;
							float: left;
							padding-left: 10px;
						}
						.tableListInp {
							color: #666666;
							border: #b3b3b3 solid 1px;
							height: 40px;
							width: 233px;
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
								width: 190px;
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
						.priceUnit {
							width: 300px;
							float: left;
						}
					}
					.dateBox {
						list-style: none;
						width: 200px;
						height: 40px;
						float: left;
					}
				}
				.weightNum {
					width: 100%;
					height: 40px;
					h6 {
						&::after {
							content: "*";
							color: red;
							margin: 0 5px;
						}
					}
					input {
						height: 40px;
						width: 200px;
						float: left;
					}
					span {
						margin: 10px 5px 0 5px;
						float: left;
					}
					.weightNum-unit {
						width: 40px;
						height: 40px;
						border: 1px solid #ccc;
						border-left: none;
						text-align: center;
						line-height: 40px;
						float: left;
					}
				}
				.note {
					width: 100%;
					margin-top: 30px;
					height: 100px;
					p {
						height: 40px;
						line-height: 40px;
						float: left;
						text-align: right;
					}
					p:after {
						content: "";
						color: red;
						margin: 0 5px;
					}
					textarea {
						resize: none;
						width: 530px;
						height: 100px;
						vertical-align: middle;
						padding: 10px;
						font-size: 14px;
					}
				}
				.prompt {
					width: 100%;
					height: 40px;
					img {
						margin-left: 36px;
						vertical-align: middle;
					}
					span {
						line-height: 40px;
						color: #ccc;
					}
				}
			}
		}
		.btn {
			width: 100%;
			height: 50px;
			margin-left: 100px;
			margin-top: 20px;
			li {
				width: 10%;
				height: 50px;
				margin-right: 30px;
				line-height: 50px;
				text-align: center;
				float: left;
				color: #fff;
				&:nth-child(2) {
					background: #fff;
					border: 1px solid orange;
					color: orange;
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
</style>