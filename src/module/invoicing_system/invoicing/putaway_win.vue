/* * @Author: zhouzhe * @Date: 2018-05-07 18:36:09 */

<template>
	<div>
		<win :width="width" :height="height" @winEvent="winEvent" :align="'center'">
			<span slot="title">上架</span>
			<div id="tan" slot="content" slot-scope="props">
				<div id="putaway">
					<div class="awayTop">
						<div class="awayTitle">
							<div class="awayText">
								<h3 class="showBefore awayText">商品名称:</h3>
								<div class="showAfter awayText">{{goods.gName}}</div>
							</div>
							<div class="awayText">
								<h3 class="showBefore awayText">条码:</h3>
								<div class="showAfter awayText">{{goods.barCode||"--"}}</div>
							</div>
							<div class="awayText">
								<h3 class="showBefore awayText">规格:</h3>
								<div class="showAfter awayText">{{goods.specifications||"--"}}</div>
							</div>
							<div class="awayText">
								<h3 class="showBefore awayText">分类:</h3>
								<div class="showAfter awayText">{{goodsCate}}</div>
							</div>
						</div>

						<!--选择货架-->
						<div class="awayBtn">
							<h3>上架到货架:</h3>
							<section style="margin-right:40px; position: relative;">
								<!--v-on:click="showAreaList"-->
								<section class="tableListInp" @click="awaySetBtn" style="overflow: hidden;height: 42px;border-color:#ccc ;">
									<span style="height: 40px;width: 160px;display: block;float: left;text-align: center;border-right: 1px #B3B3B3 solid;line-height: 40px;font-size: 14px;">{{selRant}}</span>
									<div v-if="newwareGoods.length > 1" class="fl" style="border-right: 1px #ccc solid;">
										<i></i>
									</div>
									<div class="fl" v-if="newwareGoods.length < 3">
										<p @click="putRant" style="width: 40px;height: 40px;font-size: 30px;text-align: center;line-height: 37px;">+</p>
									</div>
								</section>
								<ul v-if="classifyBtn" class="tableListUl" style="width: 203px;background-color: #fff; border: 1px #ccc solid;position: absolute;top:42px;border-top: none;border-bottom: none;">
									<li v-for='(item,index) in newwareGoods' @click="selectBtn(item)" :key="index" style="text-align: center;border-bottom: 1px #ccc solid;cursor: pointer;">{{item.shelfName}}-{{item.areaName}}</li>
								</ul>
							</section>
						</div>

					</div>
					<div class="awaySet">
						<div class="awaySet-left">
							<input type="text" id="" placeholder="输入供应商" v-model="searchText" />
							<input type="text" id="" placeholder="输入批次编号" v-model="searchCade" />
							<div style="width: 250px; height: 40px;border: 1px solid #CECDCD;line-height: 40px; float: left;">
								<div style="width: 100%; height: 40px; line-height: 40px;cursor: pointer;" @click="showCalendar">
									<div style="float: left;width: 45%; height: 40px;text-align: center;">{{transFormDate(startTime)}}</div>
									<div style="float: left;width: 10%; height: 40px;text-align: center;">-</div>
									<div style="float: left;width: 45%; height: 40px;text-align: center;">{{transFormDate(endTime)}}</div>
								</div>
								<can-multi v-if="open" :sideStart="startTime" :sideEnd="endTime" ref="canMulti" @closeCan="closeCan" @castTime="getAlltime"></can-multi>
							</div>
						</div>
						<div class="awaySet-right">
							<a @click="searchReset" href="javascript:void(0);" class='blueBor' style="width: 100px;height: 40px;line-height: 40px;">重置</a>
							<a @click="searchList" href="javascript:void(0);" class="blue" style="width: 100px;height: 40px;line-height: 40px;">筛选</a>
						</div>
					</div>

					<div class="awayBottom">
						<ul class="awayForm">
							<li style="width: 80px;">
								<span>序号</span>
							</li>
							<li style="width: 160px;">
								<span>批次号</span>
							</li>
							<li style="width: 160px;">
								<span>生产日期</span>
							</li>
							<li style="width: 235px;">
								<span>供应商</span>
							</li>
							<li style="width: 80px;">
								<span>数量</span>
							</li>
							<li style="width: 160px;">
								<span>上架数</span>
							</li>
						</ul>
						<div class="awayList">
							<ul v-for="(item,i) in searList" class="awayListUl" :key="i">
								<li style="width: 80px;">
									<span>{{i+1}}</span>
								</li>
								<li style="width: 160px;" v-if="item.batchCode == ''">
									<span>--</span>
								</li>
								<li style="width: 160px;" v-else>
									<span>{{item.batchCode}}</span>
								</li>
								<li style="width: 160px;">
									<span>{{getTime(item.productionTime)||"--"}}</span>
								</li>
								<li style="width: 235px;">
									<span>{{item.supplier}}</span>
								</li>
								<li style="width: 80px;" :title="item.surplus">
									<span>{{item.surplus}}</span>
								</li>
								<li style="width: 160px;" ref="clickIpt">
									<p @click="showInput(i)">添加数量</p>
									<input type="text" name="" v-model="awayNum[i]" @input="inpChange(i)" />
								</li>
							</ul>
						</div>
						<div v-if="list.length == 0" id="emptyData">目前没有可操作数据</div>
					</div>

				</div>
			</div>
		</win>
		<warehouse-win ref="warehouse" :title="'货架选择'" :wareType="1" v-if="wareshow" @wareEvent="wareEvent"></warehouse-win>
	</div>
</template>
<script>
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				width: 980,
				height: 515,
				selRant: '选择货架',
				classifyBtn: false,
				willAway: '', //选择货架
				wareshow: false,
				searchText: '',
				searchCade: '',
				startTime: utils.getTime({
					time: new Date()
				}).start,
				endTime: utils.getTime({
					time: new Date()
				}).end,
				awayNum: [], //上架数量
				indexArr: [], //点击确认上架商品index值
				searList: '',
				newwareGoods: '',
				open: false,
				goodsCate: [], //分类
				selArr: []
			};
		},
		props: ['goods', 'wareType', 'wareGoods', 'list'],
		methods: {
			awaySetBtn(e) {
				e.stopPropagation();
				this.classifyBtn = !this.classifyBtn;
			},
			putRant(e) {
				e.stopPropagation();
				this.wareshow = true;
			},
			selectBtn(data) {
				this.selRant = data.shelfName + '-' + data.areaName;
				this.classifyBtn = false;
				this.willAway = data;
			},
			showCalendar() {
				this.open = !this.open;
			},
			searchReset() {
				this.searchCade = '';
				this.searchText = '';
				this.startTime = utils.getTime({
					time: new Date()
				}).start;
				this.endTime = utils.getTime({
					time: new Date()
				}).end;
				this.searList = this.selArr;
			},
			searchList() {
				let searchText = this.searchText;
				let searchCade = this.searchCade;
				let arr = [];
				for (let i = 0; i < this.searList.length; i++) {
					let list = this.searList[i];
					let productionTime = list.productionTime * 1000;
					if (
						list.supplier.indexOf(searchText) != -1 &&
						list.batchCode.indexOf(searchCade) == 0 &&
						this.startTime <= productionTime &&
						productionTime <= this.endTime + 24 * 60 * 60 * 1000 - 1
					) {
						arr.push(list);
					}
				}
				this.searList = arr;
			},
			showInput(i) {
				let parent = this.$refs.clickIpt;
				if (this.indexArr.length >= 5) {
					this.putAlert('最多上架5个商品');
					parent[i].firstChild.style.display = 'block';
					parent[i].lastChild.style.display = 'none';
					return;
				}
				parent[i].firstChild.style.display = 'none';
				parent[i].lastChild.style.display = 'block';
				this.awayNum[i] = this.selArr[i].surplus;
				if (this.awayNum[i] <= 0) {
					this.putAlert('上架商品数必须大于0');
					parent[i].firstChild.style.display = 'block';
					parent[i].lastChild.style.display = 'none';
					return;
				}
				this.indexArr.push(i);
			},
			inpChange(i) {
				let parent = this.$refs.clickIpt;
				let pattern = /^[0-9]\d*\.?/;
				if (+this.awayNum[i] > +this.selArr[i].surplus) {
					this.putAlert('上架商品数应小于总量');
					this.awayNum[i] = this.selArr[i].surplus;
					parent[i].lastChild.value = this.awayNum[i];
					return;
				}
				if (this.awayNum[i] <= 0) {
					this.awayNum[i] = this.selArr[i].surplus;
					parent[i].lastChild.value = this.awayNum[i];
					parent[i].firstChild.style.display = 'block';
					parent[i].lastChild.style.display = 'none';
					//删除准备上架的商品
					this.indexArr = this.indexArr.filter(function (a) {
						return a != i;
					});
					return;
				}
				if (!pattern.test(this.awayNum[i])) {
					this.putAlert('请重新输入');
					this.awayNum[i] = this.selArr[i].surplus;
					parent[i].lastChild.value = this.awayNum[i];
					parent[i].firstChild.style.display = 'block';
					parent[i].lastChild.style.display = 'none';
					//删除准备上架的商品
					this.indexArr = this.indexArr.filter(function (a) {
						return a != i;
					});
					return;
				}
				if (this.selArr[i].type == 0) {
					parent[i].lastChild.value = parseInt(this.awayNum[i]);
					this.awayNum[i] = parseInt(this.awayNum[i]);
					if (this.awayNum[i] <= 0) {
						this.awayNum[i] = this.selArr[i].surplus;
						parent[i].lastChild.value = this.awayNum[i];
						parent[i].firstChild.style.display = 'block';
						parent[i].lastChild.style.display = 'none';
						//删除准备上架的商品
						this.indexArr = this.indexArr.filter(function (a) {
							return a != i;
						});
						return;
					}
				} else {
					if (this.awayNum[i].includes('.')) {
						this.awayNum[i] = utils.deepCopy(
							this.awayNum[i].substr(0, this.awayNum[i].indexOf('.') + 4)
						);
					}
					// parent[i].lastChild.value = Math.floor(this.awayNum[i] * 1000) / 1000;
					// this.awayNum[i] = Math.floor(this.awayNum[i] * 1000) / 1000;
					if (this.awayNum[i] <= 0) {
						this.awayNum[i] = this.selArr[i].surplus;
						parent[i].lastChild.value = this.awayNum[i];
						parent[i].firstChild.style.display = 'block';
						parent[i].lastChild.style.display = 'none';
						//删除准备上架的商品
						this.indexArr = this.indexArr.filter(function (a) {
							return a != i;
						});
						return;
					}
				}
			},
			wareEvent(str) {
				this.wareshow = false;
				if (str == 'ok') {
					this.wareClose();
				}
			},
			closeCan() {
				this.open = false;
			},
			wareClose() {
				let sel = this.$refs.warehouse;
				let newAway = new Object();
				if(sel.chooseWare.id==undefined){
					this.wareshow = true;
					this.$store.commit('setWin', {
						title: '提示！',
						winType: 'alert',
						content: '请选择区域'
					});
					return;
				}
				this.checkPush = false;
				newAway.shelfId = sel.chooseWare.shelfId;
				newAway.areaName = sel.chooseWare.name;
				newAway.areaId = sel.chooseWare.id;
				newAway.shelfName = sel.searchList[sel.homeSel].name;
				for (let i in this.newwareGoods) {
					if (this.newwareGoods[i].areaId != sel.chooseWare.id) {
						this.checkPush = true;
					} else {
						this.checkPush = false;
					}
				}
				if (this.checkPush) this.newwareGoods.push(newAway);
				this.selRant =
					sel.searchList[sel.homeSel].name + '-' + sel.chooseWare.name;
				this.willAway = newAway;
			},
			winEvent(str) {
				this.$emit('putawayEvent', str);
			},
			transFormDate(t) {
				return utils.format(new Date(t), 'yyyy-MM-dd');
			},
			getTime(time) {
				return utils.format(new Date(time * 1000), 'yyyy年MM月dd日');
			},
			putAlert(con = '错误', title = '提示信息') {
				this.$store.commit('setWin', {
					title: title,
					winType: 'alert',
					content: con
				});
			},
			getAlltime(time) {
				this.startTime = utils.getTime({
					time: time.startTime
				}).start;
				this.endTime = utils.getTime({
					time: time.endTime
				}).end;
				this.open = false;
			}
		},
		mounted: function () {
			for (let item of this.list) {
				if (Number(item.surplus) > 0) {
					this.selArr.push(item);
				}
			}
			this.searList = utils.deepCopy(this.selArr);
			this.newwareGoods = utils.deepCopy(this.wareGoods);
			for (let item of this.goods.cate) {
				this.goodsCate.push(item.name);
			}
			this.goodsCate = this.goodsCate.join(',');
			for (let i in this.selArr) {
				this.awayNum[i] = this.selArr[i].surplus;
			}
			document.onclick = () => {
				this.classifyBtn = false;
			};
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
			warehouseWin: () =>
				import ( /*webpackChunkName: 'warehouse_win'*/ './warehouse_win'),
			canMulti: () =>
				import ( /*webpackChunkName: 'can_multi'*/ 'src/components/can_multi')
		}
	};
</script>
<style lang="less" scoped>
	#putaway {
		padding: 15px 20px;
		height: 100%;
		.awayTop {
			height: 54px;
			margin-bottom: 15px;
			.awayTitle {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				float: left;
				width: 50%;
				border-right: 1px #ccc solid;
				.awayText {
					display: flex;
					font-size: 18px;
					font-family: MicrosoftYaHei;
					color: #333333;
					white-space: nowrap;
					padding-bottom: 2px;
					&:nth-child(3),
					&:nth-child(4) {
						margin-top: 10px;
					}
				}
				.showAfter {
					width: 138px;
					display: inline-block;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
			.awayBtn {
				width: 50%;
				height: 44px;
				float: left;
				display: -webkit-box;
				display: -moz-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				margin-top: 5px;
				line-height: 44px;
				padding-left: 35px;
				.tableListInp {
					color: #666666;
					border: #b3b3b3 solid 1px;
					height: 40px;
					cursor: pointer;
					div {
						width: 41px;
						height: 40px;
						position: relative;
						z-index: 5;
						i {
							height: 10px;
							width: 10px;
							position: absolute;
							top: 50%;
							left: 50%;
							margin-top: -5px;
							margin-left: -5px;
							border-top: 10px solid #b3b3b3;
							border-left: 5px solid transparent;
							border-right: 5px solid transparent;
							box-sizing: border-box;
						}
					}
				}
				ul li:hover {
					background-color: #ccc;
				}
				h3 {
					font-size: 18px;
					display: inline-block;
					margin-right: 5px;
				}
			}
		}
		.awayListUl li {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.awaySet {
			min-width: 890px;
			height: 40px;
			.awaySet-left {
				float: left;
				input {
					width: 180px;
					height: 38px;
					text-indent: 5px;
					margin-right: 10px;
					float: left;
				}
			}
			.awaySet-right {
				float: right;
				height: 40px;
				overflow: hidden;
				.blueBor {
					box-sizing: border-box;
					border: 1px #28a8e0 solid;
					color: #28a8e0;
					&:hover {
						background-color: #eee;
					}
				}
			}
		}
		.awayBottom {
			min-width: 890px;
			padding-top: 20px;
			ul {
				padding: 10px 0;
				height: 59px;
				overflow: hidden;
				border-bottom: 1px #eee solid;
				&:hover {
					background-color: #f2f6f8;
				}
				li {
					text-align: center;
					height: 41px;
					line-height: 40px;
					font-size: 16px;
					float: left;
					p {
						color: #28a8e0;
						text-decoration: underline;
						cursor: pointer;
					}
					input {
						width: 90px;
						height: 30px;
						text-indent: 5px;
						margin: 5px auto;
						display: none;
					}
				}
			}
			.awayForm {
				border-top: 1px #eee solid;
				display: flex;
				width: 102%;
				&:hover {
					background-color: #fff;
				}
			}
			.awayList {
				width: 102%;
				max-height: 295px;
				overflow-y: auto;
				li {
					border-right: 1px #eee solid;
					&:last-child {
						border-right: none;
					}
				}
			}
		}
	}

	#emptyData {
		margin: 0 auto;
		text-align: center;
		height: 50px;
		line-height: 50px;
		color: orange;
	}
</style>