<template>
	<div>
		<div class="list-box">
			<div class="title">
				<span class="handle select-ban" @click="openAll">{{isOpenAll? '全部展开':'全部收起'}}</span>
				<span>物料名称</span>
				<span>物料类型</span>
				<span>申请单位</span>
				<span>申请总量</span>
				<span>平均申请量</span>
				<span>申请单数</span>
				<span>库存总量</span>
				<span>出货总量</span>
				<span>配货方式</span>
			</div>
			<div class="list">
				<div class="one" v-for="(item,index) in materialList" :key="index">
					<!--单个展开-->
					<span>
						<i class="fi" :class="{'fi-double-angle-up':item.showList,'up':item.showList,'fi-double-angle-down':!item.showList}" @click="openSingle(item)"></i>
					</span>
					<span>{{item.itemName}}</span>
					<span>{{typeName[item.type]}}</span>
					<span>{{item.unitName}}</span>
					<span>{{calevalue(item.applyAll,item.unitValue)}}</span>
					<span>{{calevalue(item.applyAverage,item.unitValue)}}</span>
					<span>{{item.cil}}</span>
					<span>{{calevalue(item.surplus,item.unitValue)}}</span>
					<span>
						<el-input placeholder="请输入内容" v-model="item.grossOutnum" @change="grosschange(item)">
							<template slot="append">{{item.unitName}}</template>
						</el-input>
					</span>
					<span style="width: 20%;">
						<el-select v-model="item.allot" placeholder="请选择" @change="grosschange(item)">
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
							<span v-if="isBrand">分销价格</span>
							<span v-if="isBrand">价格单位</span>
						</div>
						<div class="list-two" v-for="(list,i) in item.list" :key="i" :class="{'full':list.isSuccess==0}">
							<span class="fail">
								<strong v-if="list.isSuccess==0">
									<em></em>匹配失败</strong>
							</span>
							<span>{{list.warehouse}}</span>
							<span>{{list.shopName}}</span>
							<span>{{calevalue(list.num,list.unitValue)}}</span>
							<template v-if="list.isSuccess!=0">
								<span>{{list.average}}</span>
								<span>{{list.applyScale,list.unitValue}}</span>
								<span>
									<el-input placeholder="请输入内容" v-model="list.outNum" @change="singleChang(item)">
										<template slot="append">{{list.unitName}}</template>
									</el-input>
								</span>
								<span v-if="isBrand">
									<div class="dispice">
										<strong v-if="list.piceValue&&list.distributionId>=0">{{list.piceValue}}</strong>
										<div class="input-num" v-if="list.distributionId==-2">
											<el-input type="text" @change="list.piceValue.replace(/[^\d]/g,'')" placeholder="" maxlength="9" v-model="list.piceValue"></el-input>
										</div>
										<div class="slebox">
											<el-select v-model="list.distributionId" placeholder="分销价格切换" @change="piceChange(list,item)">
												<el-option v-for="(bc,s) in item.distribution" :key="s" :label="bc.distributionName" :value="Number(bc.distributionId)"></el-option>
											</el-select>
										</div>
									</div>
								</span>
								<span v-if="isBrand">
									<el-select v-model="list.piceUnitid" :disabled="list.piceUnitid == '等于进价'" placeholder="单位">
										<el-option v-for="(bc,s) in item.unit" :key="s" :label="bc.name" :value="bc.muId"></el-option>
									</el-select>
								</span>
							</template>
						</div>
					</div>
				</div>
				<div class="empty" v-if="materialList.length<=0">-暂无数据-</div>
			</div>
		</div>
	</div>
</template>
<script>
	import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				isOpenAll: false, //是否全部展开
				options: [],
				value: '',
				materialList: [],
				isBrand:false,
				typeName: ['成品', '半成品', '普通物料']
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
			calevalue(num, value) {
				if (value) {
					return parseInt(num / value * 1000) / 1000;
				} else {
					return num;
				}
			},
			setList() {
				this.materialList.map(v => {
					v = this.cargo(v.allot, v, 'num');
				});
				this.goodsList = utils.deepCopy(this.goodsList);
			},
			// allotChang(item) {
			// 	this.cargo(item.allot, item, 'num');
			// },
			cargo(type, item, key) { //key为申请数键名
				let redsend = Number(item.grossOutnum * item.unitValue);
				item.list.map(v => {
					if (v.isSuccess == 1) {
						v.applyScale = this.calevalue((v[key] / item.applyAll) * item.surplus * item.unitValue,
							v.unitValue); //按比例
						v.average = this.calevalue((item.surplus * item.unitValue) / item.cil, v.unitValue); //平均分配量
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
								v.outNum = this.calevalue(redsend > 0 ? v[key] : sdv > 0 ? sdv : 0, v.unitValue);
								break;
							case 4:
								v.outNum = this.calevalue(v[key], v.unitValue);
								break;
							case 5:
								v.outNum = item.grossOutnum * item.unitValue <= item.applyAll ? v.applyScale :
									this.calevalue(v[key], v.unitValue);
								break;
							case 6:
								v.outNum = item.grossOutnum * item.unitValue <= item.applyAll ? v.average :
									this.calevalue(v[key], v.unitValue);
								break;
						}
					}
				});
				if (type == 4) this.singleChang(item);
				return item;
			},
			grosschange(item) { //总量改变
				if (!this.checkNum(item.grossOutnum)) {
					item.grossOutnum = 0;
				}
				this.checkoutNum(item);
				item.grossOutnum = this.getcheckNum(item.grossOutnum);
				item = this.cargo(item.allot, item, 'num');
			},
			checkoutNum(item) {
				if (item.allot != 4) {
					if (Number(item.grossOutnum * item.unitValue) > Number(item.surplus)) {
						this.$message.error('出货总量应小于库存总量');
						item.grossOutnum = this.calevalue(item.surplus, item.unitValue);
						return false;
					}
				}
				return true;
			},
			getcheckNum(num) {
				if (num.toString().includes('.')) {
					return parseInt(num * 1000) / 1000;
				}
				return num;
			},
			singleChang(item) { //单个店出货量改变
				let allNum = 0;
				item.list.map(v => {
					if (!this.checkNum(v.outNum)) {
						v.outNum = 0;
					} else {
						v.outNum = this.getcheckNum(v.outNum);
					}
					allNum += Number(v.outNum * v.unitValue);
				})
				item.grossOutnum = this.calevalue(allNum, item.unitValue);
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
			},
			openSingle(item) {
				this.$set(item, 'showList', !item.showList);
				this.materialList = utils.deepCopy(this.materialList);
			},
			piceChange(data, item) {
				data.piceUnitid = '';
				data.piceValue = '';
				data.isPurchase = 0;
				if (data.distributionId == -1) {
					data.isPurchase = 1;
					data.piceValue = 0;
					data.piceUnitid = '等于进价';
				} else {
					data.isPurchase = 0;
					item.distribution.map(v => {
						if (v.distributionId == data.distributionId) {
							data.piceValue = v.value;
							data.piceUnitid = v.unitId;
						}
					})
				}
				this.materialList = utils.deepCopy(this.materialList);
			},
			setmassage(boolean) { //处理数据
				this.materialList.map(v => {
					v.showList = boolean;
				});
			},
		},
		mounted() {
			this.options = this.$parent.options;
			this.isBrand = storage.session('userShop').currentShop.ischain == '3'? true : false;
			this.materialList = this.proData;
			this.setList();
		},
		watch: {
			allot(news) {
				this.materialList.map(v => {
					v.allot = news;
					v = this.cargo(v.allot, v, 'num');
				});
				this.materialList = utils.deepCopy(this.materialList);
			},
			proData() {
				this.materialList = this.proData;
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
			min-width: 1500px;
			span {
				float: left;
				height: 40px;
				line-height: 40px;
				text-align: center;
				width: 9%;
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
			min-width: 1500px;
			.one {
				overflow: hidden;
				border-bottom: 1px solid #ccc;
				&>span {
					float: left;
					height: 70px;
					text-align: center;
					line-height: 70px;
					width: 9%;
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
							width: 17%;
						}
						&:nth-child(9) {
							width: 7%;
						}
						em {
							width: 14px;
							height: 14px;
						}
						.dispice {
							.input-num {
								width: 60px;
								display: inline-block;
								text-indent: 2px;
								outline: none;
								margin-left: 10px;
								position: relative;
								right: -3px;
							}
							.slebox {
								width: 120px;
								display: inline-block;
							}
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