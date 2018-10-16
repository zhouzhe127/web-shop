<!--
    **采购单详情
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="purchase-detail">
		<div class="head">
			<span>采购单详情</span>
			<div class="line"></div>
		</div>
		<div class="detail">
			<div class="detail-box">
				<p><em>采购单状态：</em><span>{{statusHash[detail.status]}}</span></p>
				<p><em>采购单号：</em><span>{{detail.code}}</span></p>
				<p><em>提交时间：</em><span>{{timeConversion(detail.createTime)}}</span></p>
				<p><em>提交人：</em><span>{{detail.createUser}}</span></p>
			</div>
			<div class="detail-box">
				<p><em>采购单总金额：</em><span>{{totalPrice}} 元</span></p>
				<p><em>审核时间：</em><span>{{timeConversion(detail.auditTime)}}</span></p>
				<p><em>审核人：</em><span>{{detail.auditUser}}</span></p>
				<p><em>备注：</em><span>{{detail.remark}}</span></p>
			</div>
		</div>
		<div class="tab-box">
			<el-radio-group v-model="tabIndex">
			    <el-radio-button label="0">商品</el-radio-button>
			    <el-radio-button label="1">物料</el-radio-button>
			</el-radio-group>
		</div>
		<div class="list" v-show="tabIndex==0">
			<el-table :data="goodsList" stripe border style="width:100%" max-height="1000" :header-cell-style="{'background-color':'#f5f7fa'}">
				<el-table-column fixed="left" label="商品名称" width="150">
					<template slot-scope="scope">
						<span class="name-btn" @click="showDetail(scope.row,1)">{{scope.row.name}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="barCode" label="条形码" width="200">
				</el-table-column>
				<el-table-column prop="numStr" label="采购量" width="100">
				</el-table-column>
				<el-table-column prop="wareName" label="入库仓库" width="150">
				</el-table-column>
				<el-table-column prop="totalPriceStr" label="采购总价(选填)" width="150">
				</el-table-column>
				<el-table-column prop="unitPriceStr" label="采购单价(选填)" width="150">
				</el-table-column>
				<el-table-column prop="productionTimeStr" label="生产日期" min-width="150">
				</el-table-column>
				<el-table-column prop="expiryTimeStr" label="失效日期" min-width="150">
				</el-table-column>
				<el-table-column prop="supplierStr" label="供应商(选填)" min-width="200">
				</el-table-column>
				<el-table-column prop="articleNo" label="货号(选填)" min-width="100">
				</el-table-column>
				<el-table-column prop="remark" label="备注(选填)" min-width="200">
				</el-table-column>
			</el-table>
		</div>
		<div class="list" v-show="tabIndex==1">
			<el-table :data="matList" stripe border style="width:100%" max-height="1000" :header-cell-style="{'background-color':'#f5f7fa'}">
				<el-table-column fixed="left" label="物料名称" width="150">
					<template slot-scope="scope">
						<span class="name-btn" @click="showDetail(scope.row,2)">{{scope.row.name}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="barCode" label="物料编码" width="200">
				</el-table-column>
				<el-table-column prop="unitName" label="单位选择" width="100">
				</el-table-column>
				<el-table-column prop="numStr" label="采购量" width="100">
				</el-table-column>
				<el-table-column prop="wareName" label="入库仓库" width="150">
				</el-table-column>
				<el-table-column prop="totalPriceStr" label="采购总价(选填)" width="150">
				</el-table-column>
				<el-table-column prop="unitPriceStr" label="采购单价(选填)" width="150">
				</el-table-column>
				<el-table-column prop="productionTimeStr" label="生产日期" min-width="150">
				</el-table-column>
				<el-table-column prop="expiryTimeStr" label="失效日期" min-width="150">
				</el-table-column>
				<el-table-column prop="supplierStr" label="供应商(选填)" min-width="200">
				</el-table-column>
				<el-table-column prop="articleNo" label="货号(选填)" min-width="100">
				</el-table-column>
				<el-table-column prop="remark" label="备注(选填)" min-width="200">
				</el-table-column>
			</el-table>
		</div>
		<detail-win :winObj="winObj" ref="detailWin" v-if="winShow" @close="winShow=false"></detail-win>
	</div>
</template>
<script>

import http from 'src/manager/http';
import utils from 'src/verdor/utils';

export default {
	data(){
		return {
			tabIndex:0,//商品/物料 切换
			detail:{},//详情
			goodsList:[],//商品列表
			matList:[],//物料列表
			supplierList:[],//供应商列表
			btnArr:[],
			id:'',//详情id
			statusHash:{
				0:'待审核',
				1:'审核不通过',
				2:'审核通过',
				3:'已完成',
				4:'已取消',
			},
			totalPrice:'',//采购单总金额
			winObj:{
				id:'',
				type:'',
			},
			winShow:false,
			isExamine:false,//是否审核页面
		};
	},
	components:{
		detailWin: () => 
			import( /*webpackChunkName:'purchase_detail_win'*/ './purchase_detail_win'),
	},
	beforeRouteEnter (to, from, next) {
		if(from.path=='/admin/purchaseAudit'){
			next(function(self){
				self.isExamine = true;
			});
		}else{
			next();	
		}
	},
	mounted(){
		this.initBtn();
		this.id = this.$route.query.id;
		if(this.id){
			this.getSupplierList().then(()=>{
				this.getDetailList();
			});
		}else{
			this.$message({message: '未获取到采购单id',type: 'error'});
		}
	},
	methods:{
		initBtn() {
			this.btnArr = [
				{name: '返回',className: 'info',type:4,
					fn: () => {
						window.history.go(-1);
					}
				},
			];
			this.$store.commit('setPageTools', this.btnArr);
		},
		//显示商品物料详情
		showDetail(res,type){
			this.winObj={
				id:res.itemId,
				type:type,
			};
			this.winShow = true;
		},
		setBtnShow(){
			let arr=[];
			if(this.detail.status=='0'){//未审核
				arr = [
					{name: '取消申请',className: 'primary',type:4,
						fn: () => {
							this.setOrderStatus(4,'取消申请');
						}
					},
					
				];
				if(this.isExamine){
					arr.push({name: '审核通过',className: 'primary',type:4,
						fn: () => {
							this.setOrderStatus(2,'审核通过');
						}
					},
					{name: '审核不通过',className: 'primary',type:4,
						fn: () => {
							this.setOrderStatus(1,'审核不通过');
						}
					});
				}
			}else if(this.detail.status=='2'){//审核通过
				arr = [
					{name: '确认入库',className: 'primary',type:4,
						fn: () => {
							this.intoStorege();
						}
					},
					{name: '重新提交',className: 'primary',type:4,
						fn: () => {
							this.resetSubmit();
						}
					}
				];
			}else if(this.detail.status=='1' || this.detail.status=='4'){//审核不通过 已取消
				arr = [
					{name: '重新提交',className: 'primary',type:4,
						fn: () => {
							this.resetSubmit();
						}
					}
				];
			}
			this.btnArr.splice(1);
			this.btnArr.push(...arr);
			this.$store.commit('setPageTools', this.btnArr);
		},
		//重新提交
		resetSubmit(){
			this.$route.query.resetId = this.id;
			this.$router.push({
				path: 'create',
				query: this.$route.query
			});
		},
		//设置采购单状态 审核通过 审核不通过 取消采购单
		setOrderStatus(status,name){
			this.$confirm(`是否${name}？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let type = status==4? 0:1;//0取消操作 1审核操作
				http.editPurchaseOrderStatus({data:{
					id:this.id,
					status: status,
					type: type,
				}}).then((data)=>{
					if(data){
						this.getDetailList();
						this.$message({message: '成功',type: 'success'});
					}
				});
			}).catch();
		},
		//采购单入库
		intoStorege(){
			this.$confirm(`是否确认入库？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				http.putPurchaseOrderStorage({data:{
					id:this.id,
				}}).then((data)=>{
					if(data){
						this.getDetailList();
						this.$message({message: '采购单入库成功',type: 'success'});
					}
				});
			}).catch();
		},
		//获取采购单详情
		async getDetailList(){
			let data = await http.purchaseorderGetDetail({data:{
				id:this.id,
			}});
			this.detail = data;
			this.setBtnShow();
			for(let item of data.content.goodsList){
				item.numStr = item.num+item.unitName;
				this.setDetailObj(item);
			}
			for(let item of data.content.materialList){
				let unitValue='',unitName='';
				for(let uItem of item.unitList){
					if(item.unit==uItem.muId){
						unitValue = uItem.value;
						unitName = uItem.name;
					}
				}
				item.unitName = unitName;
				item.numStr = item.num/unitValue+unitName;
				item.numRes = item.num/unitValue;
				this.setDetailObj(item);
			}
			this.goodsList = data.content.goodsList;
			this.matList = data.content.materialList;
			this.computeTotalPrice();
			if(!this.goodsList.length && this.matList.length){
				this.tabIndex = 1;
			}
		},
		//设置保存的日期
		setDetailObj(item){
			item.totalPriceStr = item.totalPrice+' 元';
			item.unitPriceStr = item.unitPrice+' 元/'+item.unitName;
			item.wareName = item.warehouse + ' / ' + item.warehouseArea;
			item.productionTimeStr = this.timeConversion(item.productionTime);
			item.expiryTimeStr = this.timeConversion(item.expiryTime);
			item.supplierStr = this.getSupplierName(item.supplierId);
		},
		//计算采购单总金额
		computeTotalPrice(){
			let gTotal=0,mTotal=0;
			for(let item of this.goodsList){
				gTotal = gTotal+Number(item.unitPrice*item.num);
			}
			for(let item of this.matList){
				mTotal = mTotal+Number(item.unitPrice*item.numRes);
			}
			this.totalPrice = gTotal+mTotal;
		},
		getSupplierName(id){
			for(let item of this.supplierList){
				if(id==item.id){
					return item.name;
				}
			}
			return '';
		},
		//供应商列表
		async getSupplierList(){
			let data = await http.suppierList();
			for(let item of data){
				item.value = item.id;
				item.label = item.name;
			}
			this.supplierList = data;
		},
		timeConversion(time) {
			if(time && time!='0'){
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm');
			}else{
				return '--';
			}
		},
	}
};
</script>
<style lang='less' scoped>
	.purchase-detail{
		.head{
			width: 100%;height: 20px;
			margin-top: 10px;
			position: relative;
			overflow: hidden;
			border-left: 3px solid #e1bb4a;
			span{
				height: 20px;font-size: 16px;padding-left: 10px;
				display: inline-block;
				line-height: 20px;
				color: #333;
			}
			.line{
				position: absolute;
				top: 9px;
				left: 100px;
				width: 100%;
				border-bottom: 1px dashed #dcdfe6;
			}
		}
		.detail{
			display: flex;
			padding: 20px;
			padding-left: 3%;
			.detail-box{
				flex: 0 0 33%;
				padding-right: 15px;
				p{line-height: 1.5;font-size: 16px;
					padding-bottom: 10px;
					display: flex;
					em,span{font-size: inherit;color: #444;}
					em{white-space: nowrap;}
				}
			}
			@media screen and(max-width:1366px) {
				.detail-box{
					flex: 0 0 50%;
				}
			}
		}
		.list{
			padding-top: 20px;
			.name-btn{
				cursor: pointer;color: #E1BB4A;display: inline-block;
				padding: 0 5px;
			}
		}
	}
</style>