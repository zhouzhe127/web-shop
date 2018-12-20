<!--
    **物料盘库
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div id='check-material'>
		<template v-if='!addShow'>
			<div class="main" v-loading="loading">
				<div class="head">
					盘库物料列表 · 共<em>{{listLength}}</em>个条目
					<div class="check-div">
					<el-checkbox v-model="selObj.isUpdateZero">未选中的物料库存消耗至0</el-checkbox>
						<el-tooltip 
							class="item" 
							effect="dark" 
							placement="bottom">
							<div slot="content"><i class="el-icon-warning"> 说明</i>
							<br/><br/>
							该条目被勾选后，所有未选中的商品，库存统一变更为0
							<br/>
							操作日志及进销存统计中记录类型为批盘消耗。</div>
							<i class="check-icon el-icon-info"></i>
						</el-tooltip>
					</div>
				</div>
				<el-table :data="list" stripe border style="width:100%" :header-cell-style="{'background-color':'#f5f7fa'}">
					<el-table-column label="单位选择" width="150">
						<template slot-scope="scope">
							<el-select v-model="scope.row.unitIndex" placeholder="请选择仓库" @change="unitSel(scope.row)">
								<el-option
									v-for="item in scope.row.unitArr"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="盘库数量" width="320" align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.oneName">
								<div class="input-box">
									<input type="text" v-model="scope.row.oneNum" maxlength="10" placeholder="请输入数量" :disabled="scope.row.haveBatch"/>
									<div class="word">{{scope.row.oneName}}</div>
								</div>
								+
							</template>
							<div class="input-box">
								<input type="text" v-model="scope.row.twoNum" maxlength="10" placeholder="请输入数量" :disabled="scope.row.haveBatch"/>
								<div class="word">{{scope.row.twoName}}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="物料名称" min-width="200">
					</el-table-column>
					<el-table-column label="库存数量" min-width="200">
						<template slot-scope="scope">
							{{setSuprlus(scope.row.surplus,scope.row.unit)}}
						</template>
					</el-table-column>
					<el-table-column label="所属仓库" width="200">
						<template slot-scope="scope">
							{{scope.row.wName}}{{scope.row.aName?' / '+scope.row.aName:''}}
						</template>
					</el-table-column>
					<el-table-column prop="batch" label="批次数量" min-width="100">
					</el-table-column>
					<el-table-column label="类型" width="120">
						<template slot-scope="scope">
							{{matTypeHash[scope.row.type]}}
						</template>
					</el-table-column>
					<el-table-column label="操作" fixed="left" width="160">
						<template slot-scope="scope" >
							<el-button type="text" style='color:#D34A2B' @click="clearItem(scope.row)">清空输入</el-button>
							<el-button type="text" @click="openBatchWin(scope.row,scope.$index)">批次盘库</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="page-box">
				<el-pagination @current-change="pageChange"
					:current-page="page"
					background
					layout="prev, pager, next"
					:page-count="pageTotal">
				</el-pagination>
			</div>
		</template>
		<!--<add-goods v-if="addShow" :selItem='selMatItem'></add-goods>-->
		<add-material v-if="addShow" @emit="matClose" :selObj='selObj' ></add-material>
		<batch-win v-if="batchShow" @emit="batchClose" :material="batchObj" :selItem="batchList"></batch-win>
	</div>
</template>

<script>
import http from 'src/manager/http';
import global from 'src/manager/global';
import utils from 'src/verdor/utils';
import Timer from 'src/verdor/timer';
export default{
	data(){
		return{
			addShow:false,//是否显示添加物料
			list:[],//盘库列表
			selObj:{ //选中物料对象
				list:[],
				search:{},
				storeAll:false,
				isUpdateZero:false,//未选中的商品/物料库存消耗至0
			},
			selMatItem:[],//已选择物料列表
			selMatSearch:null,
			listLength:0,//物料列表长度
			batchShow:false,//显示批次弹框
			pageTotal:0,
			page:1,
			pageShow:10,
			batchObj:{
				mid:'',
				wid:'',
				areaId:'',
				unitId:'',
			},
			batchList:[],
			checkList:[],//盘库列表-最终提交结果
			openIndex:0,//当前打开的批次弹框
			useList:[],//使用模板-物料列表
			isUse:false,//是否使用模板
			pageSaveList:[],//每次翻页保存的数据
			matTypeHash:{
				0:'成品',
				1:'半成品',
				2:'普通物料',
			},
			timerId:'',
			loading:false,
		};
	},
	components:{
		addMaterial: () => import ( /*webpackChunkName: 'add_material'*/ './add_material'),
		batchWin: () => import ( /*webpackChunkName: 'material_batch_win'*/ './material_batch_win'),
		pageBtn: () => import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		dropDown: () => import ( /*webpackChunkName: 'drop_down'*/ 'src/components/drop_down'),
	},
	mounted(){
		let tempId = this.$route.query.id;
		this.isUse = tempId?true:false;
		this.initBtn();
		if(this.isUse){
			this.initBtn();
			this.setDefault(tempId);
		}else{
			this.$store.commit('setFixButton', []);
			this.addShow = true;
		}
	},
	destroyed(){
		this.stopRepeat();
	},
	methods:{
		initBtn() {
			let arr = [
				{name: '取消',className: 'info',type:1,
					fn: () => {
						window.history.go(-1);
					}
				},
				{name: '添加物料',className: 'success',type:1,
					fn: () => {
						this.$store.commit('setFixButton', []);
						this.addShow = true;
					}
				},
				{name: '确定盘库',className: 'primary',type:1,
					fn: () => {
						this.checkMaterial();
					}
				},
			];
			this.$store.commit('setFixButton', arr);
		},
		async setDefault(tempId){//设置默认数据-使用模板时调用
			let data = await http.getInventoryMaterialTemplate({data:{
				id:tempId,
			}});
			let wids = data.content.wids;
			let aids = data.content.aids;
			this.wid = wids?wids.join(','):'';
			this.areaId = aids?aids.join(','):'';
			this.cid = data.content.c2 ? data.content.c2 : data.content.c1;
			this.selObj.isUpdateZero = data.content.isUpdateZero==1;
			this.selObj.search={//设置搜索条件
				cid: this.cid,   					//商品类型 0普通商品，1称重商品
				sortOneId: data.content.c1,			//一级分类id
				sortTwoId: data.content.c2,			//二级分类id
				wid : this.wid, 					//仓库id
				areaId : this.areaId, 				//区域id
				materialName: data.content.materialName,
				barCode: data.content.barCode,
			};
			this.selObj.name = data.name;
			let param = ['cid','wid','areaId'],paramNum=0;
			for(let key in param){
				if(!this[key]){
					paramNum++;
				}
			}
			if(data.content.items.length && paramNum==3){//没有筛选条件时
				this.useList = data.content.items.map((res)=>{
					return {mid:res.mid,areaId:res.aid};
				});
				this.getUseList();
				this.selObj.storeAll = false;
			}
			if(!data.content.items.length && paramNum>0){//有筛选条件时
				this.getMatList();
				this.selObj.storeAll = true;
			}
		},
		async getUseList(){//根据物料id,区域id获取物料列表
			let data = await http.getListByMidsAndAreaId({data:{
				param:this.useList,
			}});
			this.pageTotal = Math.floor(data.length/this.pageShow);
			this.listLength = data.length;
			this.selObj.list = data;
			this.eachSaveList(this.setListData(data));
		},
		unitSel(list){//单位选择 res:单位列表下标 , index:列表下标
			let unit = list.unit[list.unitIndex];
			list.oneNum = '';
			list.twoNum = '';
			list.selBatchList = [];
			list.haveBatch = false;
			if(unit.isMin==1){
				list.oneName = '';
				list.unitValue = 1;
			}else{
				list.oneName = unit.name;
				list.unitValue = unit.value;
			}
			list.unitId = unit.muId;
		},
		matClose(res){//物料选中完毕
			this.initBtn();
			if(res){
				this.page = 1;
				this.selObj = res;
				this.pageSaveList = [];
				this.checkList = [];
				if(res.list.length){
					this.pageTotal = Math.ceil(res.list.length/this.pageShow);
					this.listLength = res.list.length;
					this.webPage();//前端分页
				}else{
					this.selMatSearch = res.search;
					for(let key in this.selMatSearch){
						this[key] = this.selMatSearch[key];
					}
					this.getMatList();
				}
			}
			this.addShow = false;
		},
		webPage(){//前端分页
			let start = (this.page-1)*this.pageShow;
			let end = this.page*this.pageShow;
			let list = this.selObj.list.slice(start,end);
			let setList = utils.deepCopy(list);
			this.eachSaveList(this.setListData(setList));
		},
		setSuprlus(num,unit){//换算库存数量
			let def='',min='',value=1;
			for(let item of unit){
				if(item.isMin == 1){//最小单位
					min = item.name;
					if(item.isDefault == 1){//默认单位
						def = item.name;
						value = item.value;
					}
				}else if(item.isDefault == 1){//默认单位
					def = item.name;
					value = item.value;
				}
			}
			//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
			return global.comUnit(num,value,def,min);
		},
		clearItem(list){//清空输入
			list.oneNum = '';
			list.twoNum = '';
			list.selBatchList = [];
			list.haveBatch = false;
			for(let i=0;i++;i<this.pageSaveList.length){
				let item = this.pageSaveList[i];
				if(item.id==list.id && item.areaId==list.areaId){
					this.pageSaveList.splice(i,1);
					i--;
				}
			}
		},
		openBatchWin(list,index){//打开批次选择弹框
			this.batchShow = true;
			this.openIndex = index;
			this.batchObj = {
				mid:list.id,
				wid:list.wid,
				areaId:list.areaId,
				unitId:list.unitId,
			};
			this.batchList = list.selBatchList?list.selBatchList:[];
		},
		batchClose(res){//关闭批次选择弹窗
			if(res){
				let list = this.list[this.openIndex];
				if(res.list.length){
					list.selBatchList = res.list;
					list.haveBatch = true;
					let num = res.allNum,
						value = list.unitValue,
						def = list.oneName?list.oneName:list.twoName,
						min = list.twoName;
					let	numObj = global.comUnit(num,value,def,min,true);
					list.oneNum = numObj.oNull;
					list.twoNum = numObj.tNull;
					
					let sendList = [];
					for(let item of list.selBatchList){
						let obj={
							batchId:item.batchId,
							wid:item.wid,
							areaId:item.areaId,
							surplus:item.totalItem,
							itemId:list.id,
							unitId:list.unitId,
						};
						sendList.push(obj);
					}
					this.spliceArr(this.checkList,list);
					this.checkList.push(...sendList);
				}else{
					list.haveBatch = false;
				}
			}
			this.batchShow = false;
		},
		spliceArr(list,checkItem){//删除重复的数组 list原数组，checkItem需要检查的对象
			for(let i=0;i<list.length;i++){
				let item = list[i];
				if(item.itemId == checkItem.id && item.areaId == checkItem.areaId){
					list.splice(i,1);
					i--;
				}
			}
		},
		setSendList(){//设置发送数据
			let list = [];
			if(this.pageSaveList.length){
				list = this.pageSaveList;
			}else{
				list = this.list;
			}
			for(let item of list){
				let total = Number(item.oneNum)*Number(item.unitValue) + Number(item.twoNum);
				if(!item.haveBatch){
					if(item.oneNum!=='' || item.twoNum!==''){//不选批次，不为空
						let obj={
							batchId:0,
							wid:item.wid,
							areaId:item.areaId,
							surplus: total,
							itemId:item.id,
							unitId:item.unitId,
						};
						this.spliceArr(this.checkList,item);
						this.checkList.push(obj);
					}
				}
			}
		},
		veriList(){//验证
			for(let item of this.list){
				if(item.oneNum!=='' || item.twoNum!==''){
					let total = Number(item.oneNum)*Number(item.unitValue) + Number(item.twoNum);
					if(isNaN(item.oneNum) || isNaN(item.twoNum)) {
						this.$message({message: `物料:${item.name}(${item.wName}/${item.aName}),盘库数量必须为数字`,type: 'error'});
						return false;
					}
					if(total<0) {
						this.$message({message: `物料:${item.name}(${item.wName}/${item.aName}),盘库数量不能小于0`,type: 'error'});
						return false;
					}
					if(total>999999999) {
						this.$message({message: `物料:${item.name}(${item.wName}/${item.aName}),盘库数量过大!`,type: 'error'});
						return false;
					}
				}
			}
			return true;
		},
		checkMaterial(){//物料盘库
			this.setPageSave();//翻页操作才能触发保存，所以这里调用一下，存入最后一次返回后填写的数据
			this.setSendList();//设置发送数据
			if(!this.checkList.length){
				this.$message({message: '请填写盘库数量',type: 'error'});
				return;
			}
			if(!this.veriList()) return;
			let tips='是否确认盘库?';
			if(this.selObj.isUpdateZero){
				tips = '是否确认盘库? 注意：未选中的物料库存将消耗至0，减少量日志记录为批盘消耗量';
			}
			this.$confirm(tips, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
				setTimeout(()=>{
					this.checkMatSubmit();
				});
			}).catch(()=>{
				//
			});
		},
		checkMatSubmit(){
			http.GoodsinventoryBatchSetMaterialInventory({data:{
				type:1,
				data:this.checkList,
				isUpdateZero:Number(this.selObj.isUpdateZero),
			}}).then(data => {
				let taskId = data;
				this.loading = true; //开始加载动画
				//轮询请求taskId
				this.timerId = Timer.add(() => {
					http.taskInfo({data: {taskId:taskId}})
						.then(data => {
							if (data.status == 3) {
								//轮询完成
								this.stopRepeat();
								
								this.$message({message: '物料盘库成功！',type: 'success'});
								delete this.$route.query.id;
								this.$router.push({path:'/admin/materialCountHistory',query:this.$route.query});
							} else if (data.status == 2) {
								//失败
								this.stopRepeat();
								this.$message({message: `请求失败，请重试！`,type: 'error'});
							}
						});
				},1000,600,false,() => {
					this.stopRepeat();
					this.$message({message: `请求超时，请重试！`,type: 'error'});
				});
			});
		},
		stopRepeat(){//停止轮询
			Timer.clear(this.timerId);
			this.loading = false; //停止加载动画
		},
		async getMatList(){//获取物料列表
			let data = await http.materialGetListByArea({data:{
				page: this.page,
				num: this.pageShow,
				cid: this.cid,
				wid : this.wid,
				areaId : this.areaId,
				type:-1,
				name: this.selObj.search.materialName,
				barCode:this.selObj.search.barCode,
			}});
			this.pageTotal = data.total;
			this.listLength = data.count;
			this.eachSaveList(this.setListData(data.list));
		},
		setListData(list){//设置列表数据
			for(let item of list){
				let unitArr = [],unitIndex=0;
				let oneName='',twoName='',value=1,unitId='';
				for(let i=0;i<item.unit.length;i++){
					let unit = item.unit[i];
					unitArr.push({value:i,label:unit.name});
					if(unit.isMin==1){
						twoName = unit.name;
					}else if(unit.isDefault==1){
						oneName = unit.name;
						value = unit.value;
					}
					if(unit.isDefault==1){
						unitIndex = i;
						unitId = unit.muId;
					}
				}
				this.$set(item,'haveBatch',false);
				this.$set(item,'unitArr',unitArr);
				this.$set(item,'unitIndex',unitIndex);
				this.$set(item,'unitId',unitId);
				this.$set(item,'oneNum',''),this.$set(item,'twoNum','');
				this.$set(item,'oneName',oneName),this.$set(item,'twoName',twoName);
				this.$set(item,'unitValue',value);
			}
			return list;
		},
		eachSaveList(list){//遍历保存的数据，翻页时填入列表
			if(this.pageSaveList.length){
				for(let save of this.pageSaveList){
					for(let item of list){
						if(item.id==save.id && item.areaId==save.areaId){
							for(let key in save){
								this.$set(item,key,save[key]);
							}
							break;
						}
					}
				}
			}
			this.list = list;
		},
		setPageSave(){//翻页保存数据方法
			for(let item of this.list){
				if(item.oneNum!=='' || item.twoNum!==''){
					this.checkListRepeat(item);
					this.pageSaveList.push(item);
				}
			}
		},
		checkListRepeat(newSave){//删除重复的缓存列表
			for(let i=0;i<this.pageSaveList.length;i++){
				let item = this.pageSaveList[i];
				if(item.id==newSave.id && item.areaId==newSave.areaId){
					this.pageSaveList.splice(i,1);
					i--;
				}
			}
		},
		pageChange(res){//翻页
			this.page = res;
			this.setPageSave();//设置翻页后保存的数据
			if(this.selObj.list.length){
				this.webPage();
			}else{
				this.getMatList();
			}
		},
	},
};
</script>

<style lang="less" scoped>
#check-material{
	padding-top: 10px;overflow:auto;
	.main{
		.head{
			height: 50px;line-height: 50px;padding: 0 10px;font-size: 14px;
			border: 1px solid #ebeef5;border-bottom: 0;
			overflow: hidden;
			em{color: #ff3c04;padding: 0 2px;}
			.check-div{
				float: right;
				height: 49px;
				line-height: 49px;
				.check-icon{
					margin-left: 10px;
					color: #666;
				}
			}
		}
		.input-box{
			display: inline-block;vertical-align: middle;overflow: hidden;
			input,.word{
				height: 40px;line-height: 38px;border: 1px solid #dcdfe6;float: left;background: #fff;
			}
			input{
				width: 85px;padding: 0 5px;
				border-top-left-radius: 4px;
				border-bottom-left-radius: 4px;
				&:focus{outline: none;}
			}
			.word{
				width:50px;border-left: 0;text-align: center;
				border-top-right-radius: 4px;
				border-bottom-right-radius: 4px;
				background: #f5f7fa;
			}
		}
	}
	.page-box{padding: 20px 0;}
}
</style>