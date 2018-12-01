<template>
	<win :width="width" :height="height" @winEvent="winEvent" :align="'center'" :ok="btnOK" :cancel="btnCancel">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" slot-scope="props">
			<div class="ware-area">
				<div class="main">
					<div class="title">
						<span>选择仓库</span>
						<p></p>
					</div>
					<div class="ware-box">
						<el-radio-group v-model="selWareId" >
							<span class="radio-span" v-for="item in list" :key="item.id" @change="selWare">
								<el-radio :label="item.id" border>{{item.name}}</el-radio>
							</span>
						</el-radio-group>
					</div>
					<div class="title">
						<span>选择区域</span>
						<p></p>
					</div>
					<div class="area-box">
						<el-radio-group v-model="selAreaId" >
							<span class="radio-span" v-for="item in areaList" :key="item.id" @change="selArea">
								<el-radio :label="item.id" border>{{item.areaName}}</el-radio>
							</span>
						</el-radio-group>
					</div>
				</div>
			</div>
		</div>
	</win>
</template>
<script>
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				btnOK:{
					content:'确定',
				},
				btnCancel:{
					content:'取消',
				},
				width: 800,
				height: 400,
				searchText: '',
				list:[],//列表
				areaList:[],//区域列表
				selWareId:'',
				selAreaId:'',
			};
		},
		props: {
			title:{
				type:String,
				default:'选择仓库-区域'
			},
			wid:{
				type:String,
				default:''
			},
			areaId:{
				type:String,
				default:''
			},
			shopId:{
				type:String,
				default:'0'
			},
			isBrand:{
				type:Boolean,
				default: false,
			},
		},
		methods: {
			async init() {
				let data = await http.warehouseList({
					data: {
						shopId: this.shopId,
					}
				});
				let filterName = '';
				if (this.isBrand) {
					filterName = 'brandId';
				} else {
					filterName = 'shopId';
				}
				this.list = this.filterList(filterName, this.shopId,data);
				this.$nextTick(() => {
					if(this.wid){
						this.selWareId = this.wid;
						this.selWare();
					}
					if(this.areaId) this.selAreaId = this.areaId;
				});
			},
			//筛选出本店的仓库
			filterList(idName, shopId,list) {
				let arr = [];
				if (idName == 'brandId') {
					for (let item of list) {
						if (item[idName] == shopId && item.owner.split(',')[1] == 0) {
							arr.push(item);
						}
					}
				} else if (idName == 'shopId') {
					for (let item of list) {
						if (item[idName] == shopId) {
							arr.push(item);
						}
					}
				}
				return arr;
			},
			//选择仓库时
			selWare(){
				let obj = this.list.filter((res)=>{
					return res.id==this.selWareId;
				})[0];
				this.areaList = obj.area;
				this.wareName = obj.name;
			},
			//选取区域时
			selArea(){
				this.areaName = this.areaList.filter((res)=>{
					return res.id==this.selAreaId;
				})[0].areaName;
			},
			winEvent(str) {
				if (str == 'ok') {
					if(!this.selWareId){
						this.$message({message: '请选择仓库!',type: 'error'});
						return;
					}
					if (!this.selAreaId) {
						this.$message({message: '请选择区域!',type: 'error'});
						return;
					}
					let obj = {
						wid: this.selWareId,
						areaId: this.selAreaId,
						warehouse: this.wareName,
						wArea: this.areaName,
					};
					this.$emit('wareEvent',obj);
				} else {
					this.$emit('wareEvent',false);
				}
			},
		},
		mounted() {
			this.init();
		},
		components: {
			mulSelect: () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win_element')

		}
	};
</script>
<style lang="less" scoped>
	.ware-area{
		padding: 20px;
		padding-bottom: 0;
		.title{
			position: relative;
			height: 20px;
			span{
				position: absolute;
				left: 0;
				top: 0;
				z-index: 2;
				display: inline-block;
				height: 20px;
				line-height: 20px;
				background: #fff;
				border-left: 3px solid #e7c96e;
				padding: 0 10px;
				font-size: 16px;
			}
			p{border-bottom: 1px dashed #ccc;height: 10px;}
		}
		.main{
			height: 380px;
			overflow: auto;
			.radio-span{
				display: inline-block;margin-right: 10px;margin-bottom: 10px;
			}
			.ware-box{
				padding-bottom: 20px;
				margin-top: 20px;
			}
			.area-box{
				margin-top: 20px;
			}
		}
	}
	
</style>