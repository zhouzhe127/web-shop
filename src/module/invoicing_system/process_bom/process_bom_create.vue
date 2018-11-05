<!--
    **新建加工BOM单
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div>
		<div class="line-title">
			新建加工BOM单<p></p>
		</div>
		<div class="main">
			<div class="form-box">
				<div class="form-name require">bom单类型</div>
				<div class="form-input">
					<el-select v-model="bomType" placeholder="请选择bom单类型" @change="dropSelect" style="width:210px;">
					    <el-option
							v-for="item in bomTypeList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
							:disabled="item.disabled">
					    </el-option>
					</el-select>
				</div>
			</div>
			<div class="form-box">
				<div class="form-name require">库存可以为负数</div>
				<div class="form-input">
					<el-switch
						v-model="isMinus"
						active-color="#E1BB4A"
						inactive-color="#909399"
						style="width:80px;height:40px;"
						@change="getOnoff">
					</el-switch>
				</div>
			</div>
			<div class="form-box">
				<div class="form-name require">产出物料选择</div>
				<div class="form-input">
					<el-button type="primary" icon="el-icon-plus" style="width:210px;" @click="openWin(1)">选择产出物料</el-button>
					<div class="tips">
						已选择：{{productName}}<em>|</em>默认入库仓库：{{pWareObj.warehouse}}-{{pWareObj.warehouseArea}}
						<i class="el-icon-edit" @click="editProductWare"></i>
					</div>
				</div>
			</div>
			<div class="form-box">
				<div class="form-name require">原料物料选择</div>
				<div class="form-input">
					<el-button type="primary" icon="el-icon-plus" style="width:210px;" @click="openWin(2)">选择原料物料</el-button>
				</div>
			</div>
		</div>
		<com-table :listName="'原料物料列表'" :titleData="titleList" :allTotal="matList.length" :listWidth="1000" :introData="matList">
			<span class="detail" slot="con-0" slot-scope="props">
				<em @click="deleteMat(props.data.id,props.index)" class="del">删除</em>
				<em>|</em>
				<em @click="wareSort(props.index)" class="sort">仓库排序</em>
			</span>
		</com-table>
		<div><select-mat :selObj="winObj" v-if="matWinShow" :choiceType="choiceType" @emit="winClose"></select-mat></div>
		<div>
			<component :is="showWin" 
				:winOpen="wareObj"
				@emit="getWareSort"
				
				:wid="pWareObj.wid"
				:areaId="pWareObj.areaId"
				:shopId="shopId"
				:isBrand="isBrand"
				@wareEvent="getProductWare"
			></component>
		</div>
	</div>
	
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

export default {
	data() {
		return {
			isMinus: true, //库存可以为负数
			matList:[],//原料物料列表
			titleList:[
				{titleName: '操作',titleStyle:{width:200+'px',}},
				{titleName:'原料物料',dataName: 'name'},
				{titleName: '物料单位',dataName: 'unitStr'},
				{titleName: '已选仓库',dataName: 'wareNum'},
			],
			bomTypeList:[
				{value:'0',label:'手动填写bom单'},
				{value:'1',label:'自动填写bom单',disabled: true},
			],
			bomType:'0',
			shopId:'',
			isBrand:true,//是否是品牌，默认品牌
			pWareObj:{//成品物料-仓库对象
				wid:'',
				areaId:'',
				warehouse:'',
				warehouseArea:'',
			},
			winObj:{//物料选择-弹框数据
				search:{},
				list:[],
				banList:[],
			},
			productObj:{//成品对象
				search:{},
				list:[],
			},
			productName:'',//成品物料名称
			matObj:{//原料对象
				search:{},
				list:[],
			},
			showWin:null,//弹框显示
			matWinShow:false,
			choiceType:'single',//选择物料模式，single单选 more多选
			wareSortShow:false,//仓库消耗排序显示
			wareObj:{//仓库排序
				list:[],
				widList:[],
			},
			handleIndex:1,//当前操作的列表下标
			warehouse:[],//仓库列表
			subMitObj:{//提交对象
				mid:'',//物料id
				type:'',//bom单类型
				wid:'',//仓库id
				areaId:'',//区域id
				isNegative:1,
				list:[],//原理物料排序
			},
			bomId:'',//bom单id
			isClick: false, //是否已经点击提交，防止重复点击
			delList:[],//删除id的列表
			oldList:[],//原列表
		};
	},
	mounted(){
		this.initBtn();
		let userShop = storage.session('userShop');
		this.shopId = userShop.currentShop.id;
		this.isBrand = userShop.currentShop.ischain == '3' ? true : false; //是否为品牌
		this.bomId = this.$route.query.id;
		if(this.bomId){
			this.getBomDetail();
		}
		this.getWarehouseList();
	},
	components:{
		dropDown: () =>
			import ( /*webpackChunkName: 'drop_down'*/ 'src/components/drop_down'),
		onOff: () =>
			import ( /*webpackChunkName: 'on_off'*/ 'src/components/on_off'),
		selectMat: () =>
			import ( /*webpackChunkName: 'select_material'*/ './select_material'),
		// selectMat: () =>
		// 	import ( /*webpackChunkName: 'select_material'*/ '../data_center/add_column'),
		comTable: () =>
			import ( /*webpackChunkName: 'table'*/ 'src/components/com_table'),
		warehouseSort: () =>
			import ( /*webpackChunkName: 'bom_create_sort'*/ 'src/module/invoicing_system/invoicing/bom_create_sort'),
		warehouseWin: () =>
			import( /*webpackChunkName: 'warehouse_win_enter'*/ 'src/module/invoicing_system/invoicing/warehouse_win_enter'),
	},
	methods:{
		initBtn() {
			let arr = [
				{name: '确认',className: 'primary',type:4,
					fn: () => {
						if(this.bomId){
							this.editBom();
						}else{
							this.confirmBom();
						}
					}
				},
				{name: '取消',className:'info',type:4,
					fn: () => {
						window.history.go(-1);
					}
				},
			];
			this.$store.commit('setPageTools', arr);
		},
		async getBomDetail(){//编辑bom单
			let data = await http.ProcessbomGetProcessBomDetail({data:{
				id:this.bomId,
			}});
			for(let key in this.subMitObj){
				this.subMitObj[key] = data[key];
			}
			for(let key in this.pWareObj){
				this.pWareObj[key] = data[key];
			}
			this.productName = data.material;
			this.bomType = data.type;
			this.isMinus = Number(data.isNegative)?true:false;
			this.productObj.list = [{id:data.mid}];
			this.matList = this.subMitObj.list.map((res)=>{
				let unitArr = [];
				for(let unit of res.unit){
					unitArr.push(unit.name);
				}
				return {
					id:res.mid,
					itemId:res.id,
					wids:res.wids.split(','),
					name:res.material,
					unitStr:unitArr.join(','),
					unit:res.unit,
					wareNum:res.wids.split(',').length,
					pid:res.pid,
					isOld:true,
				};
			});
			this.oldList = this.matList.map((res)=>{
				return {id:res.id,itemId:res.itemId};
			});
			this.matObj.list = this.matList;
		},
		async editBom(){//编辑bom单
			if(!this.veriSubmit()) return;
			let list = this.matList.map((res)=>{
				return {
					id:res.isOld?res.itemId:0,
					pid:this.bomId,
					mid:res.id,
					wids:res.wids.join(','),
				}
			});
			let data = await http.ProcessbomEditProcessBom({data:{
				id:this.bomId,
				mid:this.subMitObj.mid,
				type:this.subMitObj.type,
				isNegative:this.subMitObj.isNegative,
				wid:this.subMitObj.wid,
				areaId:this.subMitObj.areaId,
				list:list,
				ids:this.delList.join(','),
			}});
			if(data){
				this.$message({message: '修改成功!',type: 'success'});
				delete this.$route.query.id;
				this.$router.push({
					path: '/admin/processBomList',
					query: this.$route.query
				});
			}else{
				this.$message({message: '修改失败!',type: 'error'});
			}
		},
		setDelId(id){//设置删除list-id
			if(id){//增加删除id
				this.delList.push(id);
			}else{//去除删除id
				for(let i=0;i<this.delList.length;i++){
					let item = this.delList[i];
					//删除多个
					for(let mat of this.matList){
						if(item==mat.itemId){
							this.delList.splice(i,1);
							i--;
							break;
						}
					}
				}
			}
		},
		getOnoff(res){//开关组件
			this.subMitObj.isNegative = res?1:0;
		},
		dropSelect(res){//bom类型
			this.bomType = res;
			this.subMitObj.type = res;
		},
		editProductWare(){//默认仓库操作
			this.showWin = 'warehouseWin';
		},
		getProductWare(res,obj){//关闭弹窗-获取默认仓库数据
			if(res=='ok'){
				this.pWareObj = {
					wid:obj.wid,
					areaId:obj.areaId,
					warehouse:obj.warehouse,
					warehouseArea:obj.wArea,
				};
				this.subMitObj.wid = obj.wid;
				this.subMitObj.areaId = obj.areaId;
			}
			this.showWin = null;
		},
		deleteMat(id,index){//删除原料列表
			this.$confirm('是否删除该原料?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.setDelId(this.matList[index].itemId);
				this.matList.splice(index,1);
				this.matObj.list = this.matList;//原料列表
			}).catch();
		},
		wareSort(index){//打开弹框-仓库消耗排序
			this.handleIndex = index;
			let item = this.matList[index];
			this.wareObj = {
				list:this.warehouse,
				widList:item.wids?item.wids:[],
				isBrand:this.isBrand,
				shopId:this.shopId,
			}
			this.showWin = 'warehouseSort';
		},
		getWareSort(res){//关闭弹窗-获得仓库排序结果
			if(res){
				let item = this.matList[this.handleIndex];
				item.wids = res;
				item.wareNum = res.length;
			}
			this.showWin = null;
		},
		openWin(type){//打开弹窗-选择物料弹框
			if(type==1){//单选
				this.choiceType = 'single';
				this.winObj = this.productObj;
				this.winObj.banList = this.matObj.list;
			}else if(type==2){//多选
				this.choiceType = 'more';
				this.winObj = this.matObj;
				this.winObj.banList = this.productObj.list;
			}
			this.matWinShow = true;
		},
		async winClose(obj){//关闭物料弹窗
			if(obj){
				if(this.choiceType == 'single'){//单选-选择成品物料
					this.productObj = obj;
					this.productName = obj.list.length?obj.list[0].name:'';
					this.subMitObj.mid = obj.list.length?obj.list[0].id:'';
					if(this.subMitObj.mid && !this.bomId){
						let data = await http.ProcessbomCheckProcessBomExits({data:{
							mid:this.subMitObj.mid
						}})
						if(!data){
							this.$message({message: '该物料已生成加工bom单，无法重复加工!'});
							return;
						}
					}
					//如果还没选仓库
					if(!this.pWareObj.wid){
						this.showWin = 'warehouseWin';
					}
				}else{//多选原料物料
					this.matObj = obj;
					this.setMatList();
					this.setDelId();
				}
			}
			this.matWinShow = false;
		},
		setMatList(){//设置物料列表
			for(let item of this.matObj.list){
				let isEqual = false;
				for(let mat of this.matList){//去已有列表中的值，添加到新列表
					if(mat.id==item.id){
						this.$set(item,'wids',mat.wids);
						this.$set(item,'wareNum',mat.wareNum);
						this.$set(item,'unitStr',mat.unitStr);
						isEqual = true;
						break;
					}
				}
				if(!isEqual){//没有相同物料 则为新加物料
					let unitArr = [];
					for(let unit of item.unit){
						unitArr.push(unit.name);
					}
					this.$set(item,'wids',[]);
					this.$set(item,'wareNum',0);
					this.$set(item,'unitStr',unitArr.join(','));
				}
				for(let old of this.oldList){//如果是原物料，加上标识
					if(item.id==old.id){
						item.isOld = true;
						item.itemId = old.itemId;
					}
				}
			}
			this.matList = this.matObj.list;
		},
		veriSubmit(){//提交验证
			if(!this.subMitObj.mid){
				this.$message({message: '请选择成品物料!',type: 'error'});
				return false;
			}
			if(!this.pWareObj.wid){
				this.$message({message: '请选择默认仓库!',type: 'error'});
				return false;
			}
			if(!this.matList.length){
				this.$message({message: '请选择原料物料!',type: 'error'});
				return false;
			}
			for(let item of this.matList){
				if(!item.wids.length){
					this.$message({message:`原料(${item.name}),仓库消耗排序不能为空`,type: 'error'});
					return false;
				}
			}
			return true;
		},
		async confirmBom(){//确认新建bom单
			if(!this.veriSubmit()) return;
			if(this.isClick) {
				this.$message({message: '请勿重复点击!'});
				return;
			}
			this.isClick = true;
			let data=null;
			try{
				this.subMitObj.list = this.matList.map((res)=>{
					return {
						mid:res.id,
						wids:res.wids.join(','),
					}
				});
				data = await http.ProcessbomAddProcessBom({data:
					this.subMitObj
				},true);
			}
			catch(e){
				this.$message({message: e.error.message,type: 'error'});
				this.isClick = false;//接口报错，还能继续点击
			}
			if(data){
				this.$message({message: '加工bom单新建成功!',type: 'success'});
				delete this.$route.query.id;
				this.$router.push({
					path: '/admin/processBomList',
					query: this.$route.query
				});
			}else{
				this.$message({message: '加工bom单新建失败!',type: 'error'});
				this.isClick = false;//接口报错，还能继续点击
			}
		},
		async getWarehouseList() { //请求仓库列表
			let data = await http.warehouseWarehouseList();
			this.warehouse = data;
		},
	}
};
</script>

<style lang="less" scoped>
	.line-title{
		height: 28px;line-height: 28px;border-left: 3px solid #E1BB4A;position: relative;overflow: hidden;
		padding-left: 10px;font-size: 16px;
		p{position: absolute;height: 16px;border-bottom: 2px dashed #ddd;left: 140px;top: 0;width: 100%;}
	}
	.main{
		padding-top: 20px;
		.form-box{margin-bottom: 20px;
			.form-name{float: left;width: 120px;height: 40px;line-height: 40px;text-align: right;padding-right: 10px;}
			.require{position: relative;
				&:after{content: '*';position: absolute;top: 0;right: 0;color: red;}
			}
			.form-input{float: left;padding-left: 15px;
				.add-btn {background: #29a8e0;width: 210px;height: 40px;line-height: 40px;border: 1px solid #29a8e0;
					font-size: 14px;text-align: center;color: #ffffff;cursor: pointer;
					em {vertical-align: middle;width: 18px;height: 18px;
						text-align: center;display: inline-block;margin-top: -3px;margin-right: 10px;
						background: url(../../../res/images/add.png) center no-repeat;
					}
				}
				.tips{color: #999;margin-top: 10px;font-size: 16px;
					em{color: #ccc;padding: 0 20px;}
					i{margin-left: 10px;cursor: pointer;display: inline-block;font-size: 18px;}
				}
			}
			&:after{content: '';zoom: 1;display: block;clear: both;}
		}
		.detail{overflow: hidden;display: inline-block;
			em{float: left;padding: 0 10px;vertical-align: middle;cursor: pointer;color: #ccc;}
			.del{color: #ff3c08;}
			.sort{color: #26a7e0;}
		}
	}
</style>