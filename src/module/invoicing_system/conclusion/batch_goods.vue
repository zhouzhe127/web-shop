<template>
	<div>
		<div class="list-box">
			<div class="title">
				<span class="handle select-ban" @click="openAll">{{isOpenAll?'全部展开':'全部收起'}}</span>
				<span>商品名称</span>
				<span>申请单位</span>
				<span>申请总量</span>
				<span>平均申请量</span>
				<span>申请单数</span>
				<span>库存总量</span>
				<span>出货总量</span>
				<span>配货方式</span>
			</div>
			<div class="list">
				<div class="one" v-for="(item,index) in goodsList" :key="index">
					<!--单个展开-->
					<span>
						<i class="fi" :class="{'fi-double-angle-up':item.showList,'up':item.showList,'fi-double-angle-down':!item.showList}" @click="openSingle(item)"></i>
					</span>
					<span>{{item.itemName}}</span>
					<span>{{item.unit}}</span>
					<span>{{item.applyAll}}</span>
					<span>{{item.applyAverage}}</span>
					<span>{{item.cil}}</span>
					<span>{{item.surplus}}</span>
					<span>
						<el-input placeholder="请输入内容" @change="grosschange(item)" v-model="item.grossOutnum">
							<template slot="append">{{item.unit}}</template>
						</el-input>
					</span>
					<span style="width: 20%;">
						<el-select v-model="item.allot" @change="grosschange(item)" placeholder="请选择">
							<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</span>
					<!-- <template>
                        <span class="fail"><em></em>失败原因：递四方速递</span>
                    </template> -->
					<div class="two" v-if="item.showList">
						<div class="title-two">
							<span></span>
							<span>仓库名称</span>
							<span>仓库所属</span>
							<span>申请量</span>
							<span>平均量</span>
							<span>按比例量</span>
							<span>实际出货量</span>
						</div>
						<div class="list-two" v-for="(list,i) in item.list" :key="i" :class="{'full':list.isSuccess==0}">
							<span class="fail">
								<strong v-if="list.isSuccess==0">
									<em></em>匹配失败</strong>
							</span>
							<span>{{list.warehouse}}</span>
							<span>{{list.shopName}}</span>
							<span>{{list.num}}</span>
							<template v-if="list.isSuccess!=0">
								<span>{{list.average}}</span>
								<span>{{list.applyScale}}</span>
								<span>
									<el-input placeholder="请输入内容" v-model="list.outNum" @change="singleChang(item)">
										<template slot="append">{{item.unit}}</template>
									</el-input>
								</span>
							</template>
						</div>
					</div>
				</div>
				<div class="empty" v-if="goodsList.length<=0">-暂无数据-</div>
			</div>
		</div>
	</div>
</template>
<script>
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				isOpenAll: false, //是否全部展开
				goodsList: [],
				options: []
			};
		},
		props: {
			proData: Array,
			allot: Number
		},
		methods: {
			openAll() { //全部展开
				if (this.isOpenAll) {
					this.isOpenAll = false;
					this.setmassage(true);
				} else {
					this.isOpenAll = true;
					this.setmassage(false);
				}
			},
			openSingle(item) {
				this.$set(item, 'showList', !item.showList);
				this.goodsList = utils.deepCopy(this.goodsList);
			},
			setmassage(boolean) { //处理数据
				this.goodsList.map(v => {
					v.showList = boolean;
				});
			},
			setList() {
				this.goodsList.map(v => {
					v = this.cargo(v.allot, v, 'num');
				});
				this.goodsList = utils.deepCopy(this.goodsList);
			},
			cargo(type, item, key) { //key为申请数键名
				let redsend = Number(item.grossOutnum);
				item.list.map(v => {
					if (v.isSuccess == 1) {
						v.applyScale = Math.floor((v[key] / item.applyAll) * item.grossOutnum); //按比例
						v.average = Math.floor(item.grossOutnum / item.cil); //平均分配量
						switch (type) {
							case 1:
								v.outNum = v.applyScale;
								break;
							case 2:
								v.outNum = v.average;
								break;
							case 3:
								let sdv = redsend;
								redsend -= v[key];
								v.outNum = redsend > 0 ? v[key] : sdv > 0 ? sdv : 0;
								break;
							case 4:
								v.outNum = v[key];
								break;
							case 5:
								v.outNum = item.grossOutnum <= item.applyAll ? v.applyScale : v[key];
								break;
							case 6:
								v.outNum = item.grossOutnum <= item.applyAll ? v.average : v[key];
								break;
						}
					}
				});
				if (type == 4) this.singleChang(item);
				return item;
			},
			// allotChang(item) {
			// 	this.cargo(item.allot, item, 'num');
			// },
			grosschange(item) { //总量改变
				if (!this.checkNum(item.grossOutnum)) {
					item.grossOutnum = 0;
				}
				this.checkoutNum(item);
				item.grossOutnum = this.getcheckNum(item.type, item.grossOutnum)
				item = this.cargo(item.allot, item, 'num');
			},
			getcheckNum(type, num) {
				if (type == 0) { //普通商品取整
					return parseInt(num);
				} else {
					if (num.toString().includes('.')) {
						return parseInt(item.outNum * 1000) / 1000;
					}
				}
				return num;
			},
			checkoutNum(item) {
				if (item.allot != 4) {
					if (Number(item.grossOutnum) > Number(item.surplus)) {
						this.$message.error('出货总量应小于库存总量');
						item.grossOutnum = item.surplus;
						return false;
					}
				}
				return true;
			},
			singleChang(item) { //单个店出货量改变
				let allNum = 0;
				item.list.map(v => {
					if (!this.checkNum(v.outNum)) {
						v.outNum = 0;
					} else {
						console.log(this.getcheckNum(item.type, v.outNum))
						v.outNum = this.getcheckNum(item.type, v.outNum);
					}
					allNum += Number(v.outNum);
				})
				item.grossOutnum = allNum;
				this.checkoutNum(item) ? this.cargo(0, item, 'num') : this.cargo(item.allot, item, 'num');
			},
			checkNum(num) { //验证数字
				let reg = /^([+-]?)\d*\.?\d+$/;
				if (!reg.test(num)) {
					this.$message({
						message: '请输入正确数字！',
						type: 'warning'
					});
					return false;
				}
				return true
			}
		},
		mounted() {
			this.options = this.$parent.options;
			this.goodsList = this.proData;
			this.setList();
		},
		watch: {
			allot(news) {
				this.goodsList.map(v => {
					v.allot = news;
					v = this.cargo(v.allot, v, 'num');
				});
				this.goodsList = utils.deepCopy(this.goodsList);
			},
			proData() {
				this.goodsList = this.proData;
				this.setList();
			}
		}
	}
</script>
<style lang='less' scoped>
	.list-box {
		margin-top: 20px;
		overflow: auto;
		max-height: 6.3rem;
		border: 1px solid #ccc;
		.title {
			overflow: hidden;
			background: #f2f2f2;
			min-width: 1300px;
			span {
				float: left;
				height: 40px;
				line-height: 40px;
				text-align: center;
				width: 10%;
				&:first-child {
					width: 7%;
				}
				&:last-child {
					width: 20%;
				}
			}
			.handle {
				color: #E1BB4A;
				cursor: pointer;
				&:hover {
					text-decoration: underline;
				}
			}
		}
		.list {
			min-width: 1300px;
			.one {
				overflow: hidden;
				border-bottom: 1px solid #ccc;
				&>span {
					float: left;
					height: 70px;
					text-align: center;
					line-height: 70px;
					width: 10%;
					&:first-child {
						width: 7%;
					}
					&:last-child {
						width: 20%;
					}
					i.fi {
						font-size: 30px;
						color: #666;
						height: 50px;
						width: 50px;
						line-height: 50px;
						text-align: center;
						cursor: pointer;
						vertical-align: middle;
					}
					i.up {
						color: #E1BB4A;
					}
					em {
						height: 18px;
						width: 18px;
					}

				}
				span {
					em {
						display: inline-block;
						vertical-align: middle;
						margin-right: 5px;
						background: url(../../../res/images/tip.png);
						background-size: cover;
					}
				}
				.two {
					border-top: 1px solid #ccc;
					float: left;
					width: 100%;
					padding-bottom: 10px;
					color: #777;
					.full {
						color: red;
					}
					span {
						float: left;
						width: 10%;
						text-align: center;
						height: 40px;
						line-height: 40px;
						&:first-child {
							width: 7%;
							height: 5px;
						}
						&:nth-child(2) {
							width: 13%;
						}
						&:nth-child(8) {
							width: 20%;
						}
						&:nth-child(9) {
							width: 15%;
						}
						em {
							width: 14px;
							height: 14px;
						}
					}
					.title-two {
						overflow: hidden;
						padding: 10px 0;
					}
					.list-two {
						overflow: hidden;
						padding: 5px 0;
					}
				}
			}
			&:last-child {
				border-bottom: 0;
			}
			.empty {
				height: 70px;
				line-height: 70px;
				text-align: center;
				font-size: 16px;
				color: #999;
			}
		}
	}
</style>