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
			<div class="detail-info">
				<ul>
					<li>
						<span class="name">商品名称：</span>
						<span class="content">{{bom.gName}}</span>
					</li>
					<li>
						<span class="name">BOM单编号：</span>
						<span class="content">{{bom.bomNum}}</span>
					</li>
					<li>
						<span class="name">BOM单类型：</span>
						<span class="content">{{bom.isPublic==1 ? '公开' :'保密'}}</span>
					</li>
				</ul>
				<ul>
					<li>
						<span class="name">创建人：</span>
						<span class="content">{{bom.createName}}</span>
					</li>
					<li>
						<span class="name">自动消耗：</span>
						<span class="content">{{bom.isAuto==1 ? "开" :'关'}}</span>
					</li>
					<li>
						<span class="name">库存可以为负数：</span>
						<span class="content">{{bom.isOversold==1 ? "是" :'否'}}</span>
					</li>
				</ul>
				<ul>
					<li>
						<span class="name">备注：</span>
						<span class="content">{{bom.remark}}</span>
					</li>
				</ul>
			</div>
			
			<div class="search">
				<el-button type='primary' @click="turnToEdit">修改</el-button>
				<el-button type='danger' @click="deleteBom">删除</el-button>
			</div>
		</div>

		<div class="table">
			<div class="table-title">
				物料列表 · 共
				<span class="tips-num">{{bomDetail.length}}</span>个条目
				<a class="showDetail select-ban" @click="showDetailClick">{{!showDetail ? '详细' : '简洁'}}</a>
			</div>
			<el-table :data="bomDetail" stripe border style="width: 100%" ref="myTable"
				:header-cell-style="{'background-color':'#f5f7fa'}" @expand-change="showRow">
				<el-table-column type="expand">
					<template slot-scope="scope">
						<div class="ware-sort">
							<div v-for="item in scope.row.host" :key="item.index" class="ware-box">
								<em>{{item.index+1}}</em>
								<span>{{item.name}}</span>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column type="index" label="序号" width="100">
				</el-table-column>
				<el-table-column prop="mName" label="物料名称" min-width="150">
				</el-table-column>
				<el-table-column label="商品类型" width="150">
					<template slot-scope="scope">
						<el-select v-model="scope.row.unitShowId" placeholder="请选择bom单类型" 
							@change="(res)=>{changeUnit(res,scope.row,scope.$index)}">
							<el-option
								v-for="unit in scope.row.unit"
								:key="unit.muId"
								:label="unit.name"
								:value="unit.muId">
							</el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column prop="showConsumeNum" label="毛料" min-width="150">
				</el-table-column>
				<el-table-column label="出成率" min-width="150">
					<template slot-scope="scope">
						{{parseInt(scope.row.yield*100)}}%
					</template>
				</el-table-column>
				<el-table-column prop="showNetMaterial" label="净料" min-width="150">
				</el-table-column>
				<el-table-column label="已选仓库数" min-width="100">
					<template slot-scope="scope">
						{scope.row.host.length}}
					</template>
				</el-table-column>
			</el-table>
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
			showRow(res,row){
				this.showDetail = row.length >= this.bomDetail.length;
			},
			showDetailClick(){
				this.showDetail = !this.showDetail;
				this.$nextTick(()=>{
					let isShow = this.showDetail;//这里不能直接用 this.showDetail 因为showRow()方法改变其值 导致展开不全
					for(let item of this.bomDetail){
						console.log(item);
						this.$refs.myTable.toggleRowExpansion(item,isShow);
					}
				});
			},
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
					className: '',
					type:4,
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
					ele.wids = ele.wids.split(',');
					ele.host = ele.warehouseName.map((a,index) => {
						return {name:a.name,index:index};
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
					ele.unitShowId = ele.consumeUnit;

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
					return ele;
				});
				this.bomDetail = res.detail;
			});
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
		.headBox {
			padding-bottom: 10px;
			border: 1px #ebeef5 solid;
			position: relative;
			.headTitle {
				padding: 10px 20px;
				background-color: #f5f7fa;
				font-size: 16px;
				color: #333;
			}
			.detail-info{
				padding: 20px;
				padding-bottom: 0;
				overflow: hidden;
				ul{
					width: 33.33%;
					float: left;
					li{
						display: flex;
						padding: 10px;
						span{color: #333;font-size: 16px;}
						.name{
							white-space: nowrap;
						}
						.content{
							word-break: break-all;
							white-space: normal;
						}
					}
				}
			}
			.search {
				display: block;
				text-align: right;
				padding: 0 10px;
			}
		}
		.table {
			margin-top: 25px;
			.table-title {
				.mixin(#333, 45px, 16px);
				border: 1px solid #ebeef5;
				border-bottom: 0;
				text-indent: 15px;
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
			.ware-sort{
				overflow: hidden;
				.ware-box{
					float: left;
					width: 33.33%;
					margin-bottom: 10px;
					em{
						color: #666;
						text-align: center;
						height: 24px;
						line-height: 22px;
						width: 24px;
						border-radius: 50%;
						border: 1px solid #ccc;
						background: #f5f7fa;
						display: inline-block;
						font-size: 12px;
					}
					span{
						display: inline-block;
						margin-left: 10px;
						height: 24px;
						line-height: 24px;
					}
				}
			}
		}
	}
</style>