<!--
    **bom单详情
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div id="bom-detail">
		<div class="headBox">
			<div class="headTitle">BOM单信息</div>
			<div class="innerBox">
				<ul>
					<li>
						<span>商品名称&nbsp;:&nbsp;{{bom.gName}}</span>
					</li>
					<li>
						<span>BOM单编号&nbsp;:&nbsp;</span>
						<span>{{bom.bomNum}}</span>
					</li>
					<li>
						<span>BOM单类型&nbsp;:&nbsp;</span>
						<span>{{bom.isPublic==1 ? '公开' :'保密'}}</span>
					</li>
				</ul>
				<ul>
					<li>
						<span>创建人&nbsp;:&nbsp;</span>
						<span>{{bom.createName}}</span>
					</li>
					<li>
						<span>自动消耗&nbsp;:&nbsp;</span>
						<span>{{bom.isAuto==1 ? "开" :'关'}}</span>
					</li>
					<li>
						<span>库存可以为负数&nbsp;:&nbsp;</span>
						<span>{{bom.isOversold==1 ? "是" :'否'}}</span>
					</li>
				</ul>
				<ul>
					<li>
						<span>备注&nbsp;:&nbsp;{{bom.remark}}</span>
					</li>
				</ul>
			</div>
			<div class="search">
				<div class="blue filter" @click="turnToEdit">修改</div>
				<div class="gray reset" @click="deleteBom">删除</div>
			</div>
		</div>

		<div class="table">
			<div class="table-title">
				批次列表
				<span class="circle"></span>共
				<span class="tips-num">{{bomDetail.length}}</span>个条目
				<a class="showDetail" @click="showDetail=!showDetail">{{!showDetail ? '详细' : '简洁'}}</a>
			</div>
			<div class="scroll-box">
				<div class="table-head">
					<span>序号</span>
					<span>物料名称</span>
					<span>消耗单位</span>
					<span>毛料</span>
					<span>出成率</span>
					<span>净料</span>
					<span>已选仓库数</span>
				</div>
				<div class="table-body">
					<div class="table-row" v-for="(item,index) in bomDetail" :key="index">
						<div class="cell">{{index+1}}</div>
						<div class="cell">{{item.mName}}</div>
						<div class="cell">
							<el-select v-model="item.unitShowId" placeholder="请选择bom单类型" @change="(res)=>{changeUnit(res,item,index)}" style="width:90px;">
							    <el-option
									v-for="unit in item.unit"
									:key="unit.muId"
									:label="unit.name"
									:value="unit.muId">
							    </el-option>
							</el-select>
						</div>
						<div class="cell">{{item.showConsumeNum}}</div>
						<div class="cell">{{parseInt(item.yield*100)}}%</div>
						<div class="cell">{{item.showNetMaterial}}</div>
						<div class="cell">{{item.wids? item.wids.length : ''}}</div>
						<div class="area-detail" v-show="showDetail">
							<div class="area-cell" v-for="(wa,waIndex) in item.host" :key="waIndex">
								<span>{{waIndex+1}}</span>
								<i>{{wa}}</i>
							</div>
						</div>
					</div>
					<div class="bom-tips" v-if="bomDetail.length==0">
						无条目信息
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				bomId: '',
				bom: {}, //bom单详情
				bomDetail: [], //bom物料消耗详情
				showDetail: false, //是否显示详细信息
			};
		},
		methods: {

			//删除bom单
			deleteBom() {
				this.$store.commit('setWin', {
					content: '确认删除该BOM单?',
					winType: 'confirm',
					callback: (flag) => {
						if (flag != 'ok') return;
						this.BillmaterialDelBom(this.bomId).then((res) => {
							if (!res) {
								this.$store.commit('setWin', {
									content: '删除BOM失败!'
								});
								return;
							}
							let obj = this.$route.query;
							storage.session('bomListDestroy', true);
							this.$router.push({
								path: '/admin/bomList',
								query: obj
							});
						});
					}
				});
			},
			//捕捉点击事件
			arrestClickEvent(item, index, event) {
				event.cancelBubble = true;
				this.bomDetail = this.bomDetail.map((ele) => {
					if (item.id == ele.id) {
						ele.toggleUnit = !ele.toggleUnit;
						return ele;
					}
					ele.toggleUnit = false;
					return ele;
				});
			},
			//单位的切换
			changeUnit(res,item,index) {
				let unit={};
				for(let i=0;i<item.unit.length;i++){
					let unitItem = item.unit[i];
					if(unitItem.muId==res){
						unit = unitItem;
					}
				}
				item.showConsumeNum = global.comUnit(item.consumeMinVal, Number(unit.value), unit.name, item.minUnitName);
				item.showNetMaterial = global.comUnit(item.netMaterialMinVal, Number(unit.value), unit.name, item.minUnitName);
				item.consumeUnitName = unit.name;
				item.newConsumeNum = Number(item.consumeMinVal) / Number(unit.value);
				item.unitShowId = unit.muId;
				this.bomDetail.splice(index, 1, item);
			},
			//获取bom单详情
			async BillmaterialGetBomDetail(bid) {
				let res = await http.BillmaterialGetBomDetail({
					data: {
						bid
					}
				});
				return res;
			},
			//删除bom单
			async BillmaterialDelBom(id) {
				let res = await http.BillmaterialDelBom({
					data: {
						id
					}
				});
				return res;
			},
			initData() {
				this.bomId = this.$route.query.id;
			},
			initBtn() {
				this.$store.commit('setPageTools', [{
					name: '返回',
					className: ['back'],
					fn: () => {
						storage.session('bomListDestroy', true);
						delete this.$route.query.id;
						this.$router.push({
							path: '/admin/bomList',
							query: this.$route.query
						});
					}
				}]);
			},
			//跳转到修改bom单页面
			turnToEdit() {
				let obj = this.$route.query;
				obj.id = this.bomId;
				this.$router.push({
					path: 'bomChange',
					query: obj
				});
			},
			domClick() {
				this.bomDetail = this.bomDetail.map((ele) => {
					ele.toggleUnit = false;
					return ele;
				});
			},
		},
		mounted() {
			this.initData();
			this.initBtn();
			this.BillmaterialGetBomDetail(this.bomId).then((res) => {
				if ((res instanceof Array && res.length == 0) || !res) {
					res = [];
					return;
				}
				this.bom = res;

				//添加切换单位,获取所选仓库id,地址名
				res.detail = res.detail.map((ele) => {
					ele.toggleUnit = false;
					ele.wids = ele.wids.split(',');
					ele.host = ele.warehouseName.map((a) => {
						return a.name;
					});
					//获取当前物料的最小单位,默认单位,defaultUnitId,minUnitId
					let [minUnitId, defaultUnitId, minUnitName] = [null, null, null];
					ele.unit.forEach((a) => {
						if (a.isMin == 1) {
							minUnitId = a.muId;
							minUnitName = a.name;
						}
						if (a.isDefault == 1) defaultUnitId = a.muId;
					});
					ele.minUnitId = minUnitId;
					ele.minUnitName = minUnitName;
					ele.defaultUnitId = defaultUnitId;
					ele.unitShowId = defaultUnitId;

					//将当前单位消耗数量转化为最小单位消耗数量,并获取消耗单位的名字
					let [consumeMinVal, consumeUnitName, val,netMaterialMinVal] = [null, null, null,null];
					ele.unit.some((e) => {
						if (e.muId == ele.consumeUnit) {
							// consumeMinVal=Number(ele.consumeNum)*Number(e.value);
							consumeMinVal = Number(ele.consumeNum);
							netMaterialMinVal = Number(ele.netMaterial);
							consumeUnitName = e.name;
							val = e.value;
							return true;
						}
					});
					ele.consumeMinVal = consumeMinVal; //最小单位的消耗数量
					ele.netMaterialMinVal = netMaterialMinVal; //最小单位的消耗数量
					ele.newConsumeNum = ele.consumeNum; //消耗数量
					ele.consumeUnitName = consumeUnitName; //消耗单位

					//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
					ele.showConsumeNum = global.comUnit(ele.consumeMinVal, val, consumeUnitName,minUnitName);
					ele.showNetMaterial = global.comUnit(ele.netMaterialMinVal, val, consumeUnitName,minUnitName);


					//测试数据
					// let arr = [{
					// 	'shopId': '61',
					// 	'mid': '3',
					// 	'muId': '2',
					// 	'isDefault': '0',
					// 	'isMin': '0',
					// 	'value': '10.000',
					// 	'name': '克'
					// },
					// {
					// 	'shopId': '61',
					// 	'mid': '3',
					// 	'muId': '3',
					// 	'isDefault': '0',
					// 	'isMin': '0',
					// 	'value': '20.000',
					// 	'name': '斤'
					// },
					// {
					// 	'shopId': '61',
					// 	'mid': '3',
					// 	'muId': '4',
					// 	'isDefault': '0',
					// 	'isMin': '0',
					// 	'value': '30.000',
					// 	'name': 'g'
					// },
					// {
					// 	'shopId': '61',
					// 	'mid': '3',
					// 	'muId': '5',
					// 	'isDefault': '0',
					// 	'isMin': '0',
					// 	'value': '50.000',
					// 	'name': 'kg'
					// }];
					return ele;
				});
				this.bomDetail = res.detail;
			});

			document.addEventListener('click', this.domClick, false);
		},
		components: {

		},
		beforeDestroy() {
			document.removeEventListener('click', this.domClick);
		},
	};
</script>
<style lang="less" scoped>
	#bom-detail {
		margin-top: 15px;
		.mixin(@color, @height, @size) {
			color: @color;
			height: @height;
			line-height: @height;
			font-size: @size;
		}
		;
		.headBox {
			padding-bottom: 6px;
			border: 1px #ccc solid;
			position: relative;
			.headTitle {
				padding: 10px 20px;
				background-color: #eeeeee;
				font-size: 16px;
				color: #333;
			}
			.innerBox {
				padding: 20px 0 20px 40px;
				ul {
					display: inline-block;
					width: 33%;
					vertical-align: top;
					li {
						margin-bottom: 15px;
						span {
							display: inline-block;
							max-width: 70%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 16px;
							color: #333;
						}
					}
				}
			}
			.search {
				display: inline-block;
				position: absolute;
				top: 130px;
				right: 0;
				.search-btn {
					width: 100px;
					height: 40px;
					line-height: 40px;
					color: #fff;
					font-size: 16px;
					margin-right: 10px;
					display: inline-block;
					text-align: center;
					border-radius: 5px;
				}
				.filter,
				.reset {
					.search-btn;
				}
			}
		}
		.table {
			margin-top: 25px;
			border: 1px solid #ccc;
			.table-title {
				.mixin(#333, 45px, 16px);
				text-indent: 15px;
				.circle {
					border: 2px solid #000;
					width: 1px;
					height: 1px;
					border-radius: 50%;
					display: inline-block;
					margin: 0 10px;
					vertical-align: middle;
					margin-top: -2px;
				}
				.tips-num {
					color: #ff0000;
					font-size: 16px;
				}
				.showDetail {
					font-size: 16px;
					text-decoration: #29a8e0 underline;
					color: #29a8e0;
					cursor: pointer;
				}
			}
			.scroll-box{
				overflow: auto;
			}
			.table-head {
				height: 40px;
				min-width: 1000px;
				background-color: #f2f2f2;
				overflow: hidden;
				span {
					.mixin(#333, 40px, 16px);
					min-width: 100px;
					width: 14.28%;
					float: left;
					text-align: center;
					vertical-align: middle;
				}

			}
			.table-row {
				min-width: 1000px;
				border: 1px solid #f2f2f2;
				overflow: hidden;
				.cell {
					.mixin(#666666, 70px, 14px);
					float: left;
					width: 14.28%;
					border-bottom: 2px solid #f7f7f7;
					text-align: center;
					vertical-align: middle;
					&:last-child {
						border: none;
					}
					.unit-div {
						display: inline-block;
						vertical-align: middle;
						cursor: pointer;
						position: relative;
						.block-btn {
							border: 1px solid #ccc;
							width: 80px;
							height: 40px;
						}
						.unit-trangile {
							width: 40px;
							height: 38px;
							font-size: 14px;
							color: #333;
							line-height: 38px;
						}
						.unit {
							.unit-trangile;
							border-right: 1px solid #ccc;
							float: left;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						.trangile {
							.unit-trangile;
							width: 38px;
							float: right;
							i {
								border: 6px solid transparent;
								border-top: 10px solid #bbb;
								display: inline-block;
								margin-top: 15px;
							}
						}
						ul {
							background: #fff;
							margin: 0;
							border: 1px solid #ccc;
							border-top: 0;
							position: absolute;
							z-index: 2;
							left: 0;
							top: 40px;
							width: 80px;
							background-color: #fff;
							li {
								width: 100% !important;
								display: block;
								padding: 0;
								margin: 0;
								min-width: 78px;
								height: 38px;
								border-bottom: 1px solid #ccc;
								cursor: pointer;
								.mixin(#333, 38px, 14px);
								text-align: center;
								&:last-child {
									border-bottom: none;
								}
								text-overflow: ellipsis;
								overflow: hidden;
							}
						}
					}
				}
				@store-width: 33.2%;
				.area-detail {
					display: block;
					.area-cell {
						line-height: 75px;
						text-align: left;
						vertical-align: middle;
						display: inline-block;
						border: none;
						padding-left: 8%;
						span {
							border-radius: 50%;
							display: inline-block;
							vertical-align: middle;
							height: 33px;
							width: 33px;
							background-color: #f2f2f2;
							color: #333;
							vertical-align: middle;
							line-height: 33px;
							margin-right: 10px;
							text-align: center;
						}
						width:@store-width;
						color:#999999;
						font-size:16px;
					}
				}
			}
			.bom-tips {
				text-align: center;
				height: 70px;
				line-height: 70px;
				font-size: 20px;
				color: #999;
			}
		}
	}
</style>