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
			<div class="main">
				<div class="head">
					盘库物料列表 · 共<em>{{listLength}}</em>个条目
				</div>
				<div class="scroll-box">
					<div class="title">
						<span>操作</span>
						<span>单位选择</span>
						<span class="wide">盘库数量</span>
						<span>物料名称</span>
						<span>库存数量</span>
						<span>所属仓库</span>
						<span>批次数量</span>
						<span>类型</span>
					</div>
					<div class="list-item" v-for="(item,index) in list" :key="index">
						<!--操作-->
						<div class="cell select-ban">
							<em class="clear" @click="clearItem(index)">清空输入</em>
							<em @click="openBatchWin(index)">批量盘库</em>
						</div>
						<!--单位选择-->
						<div class="cell">
							<drop-down @emit="(res)=>{unitSel(res,index)}" class="sel-box"
								:list="item.unitArr" 
								:value="item.unitIndex" 
								:width="90" 
								:noRepeat="true"></drop-down>
						</div>
						<!--盘库数量-->
						<div class="cell wide">
							<template v-if="item.oneName">
								<div class="input-box">
									<input type="text" v-model="item.oneNum" maxlength="10" placeholder="请输入数量" :disabled="item.haveBatch"/>
									<div class="word">{{item.oneName}}</div>
								</div>
								+
							</template>
							<div class="input-box">
								<input type="text" v-model="item.twoNum" maxlength="10" placeholder="请输入数量" :disabled="item.haveBatch"/>
								<div class="word">{{item.twoName}}</div>
							</div>
						</div>
						<!--物料名称-->
						<div class="cell text-ellipsis" :title="item.name">
							{{item.name}}
						</div>
						<!--库存数量-->
						<div class="cell text-ellipsis" :title="setSuprlus(item.surplus,item.unit)">
							{{setSuprlus(item.surplus,item.unit)}}
						</div>
						<!--所属仓库-->
						<div class="cell text-ellipsis" :title="item.wName+(item.aName?' / '+item.aName:'')">
							{{item.wName}}{{item.aName?' / '+item.aName:''}}
						</div>
						<!--批次数量-->
						<div class="cell">{{item.batch}}</div>
						<!--类型-->
						<div class="cell">{{matTypeHash[item.type]}}</div>
					</div>
					<div class="empty" v-if="!list.length">- 暂无条目 -</div>
				</div>
			</div>
			<div class="page-box">
				<pageBtn @pageNum="pageChange" :total="pageTotal" :page="page" :isNoJump="true"></pageBtn>
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
export default{
	data(){
		return{
			addShow:false,//是否显示添加物料
			list:[],//盘库列表
			selObj:{ //选中物料对象
				list:[],
				search:{},
				storeAll:false,
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
			this.addShow = true;
		}
	},
	methods:{
		initBtn() {
			let arr = [
				{name: '确定盘库',className: 'primary',type:4,
					fn: () => {
						this.checkMaterial();
					}
				},
				{name: '添加物料',className: 'success',type:4,
					fn: () => {
						this.addShow = true;
					}
				},
				{name: '取消盘库',className: 'info',type:4,
					fn: () => {
						window.history.go(-1);
					}
				},
			];
			this.$store.commit('setPageTools', arr);
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
			this.selObj.search={//设置搜索条件
				cid: this.cid,   					//商品类型 0普通商品，1称重商品
				sortOneId: data.content.c1,			//一级分类id
				sortTwoId: data.content.c2,			//二级分类id
				wid : this.wid, 					//仓库id
				areaId : this.areaId, 				//区域id
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
			this.setListData(data);
		},
		unitSel(obj,index){//单位选择 res:单位列表下标 , index:列表下标
			let list = this.list[index];
			let unit = list.unit[obj.value];
			list.oneNum = '';
			list.twoNum = '';
			list.selBatchList = [];
			list.haveBatch = false;
			list.unitIndex = obj.value;
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
			this.setListData(setList);
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
		clearItem(index){//清空输入
			let list = this.list[index];
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
		openBatchWin(index){//打开批次选择弹框
			let list = this.list[index];
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
						this.myAlert(`物料:${item.name}(${item.wName}/${item.aName}),盘库数量必须为数字`);
						return false;
					}
					if(total<0) {
						this.myAlert(`物料:${item.name}(${item.wName}/${item.aName}),盘库数量不能小于0`);
						return false;
					}
					if(total>999999999) {
						this.myAlert(`物料:${item.name}(${item.wName}/${item.aName}),盘库数量过大!`);
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
				this.myAlert('请填写盘库数量');
				return;
			}
			if(!this.veriList()) return;
			this.$store.commit('setWin', {
				winType: 'confirm',
				title: '操作提示',
				content: '确认盘库？',
				callback: (res) => {
					if (res == 'ok') {
						setTimeout(()=>{
							this.checkMatSubmit();
						});
					}
				},
			});
		},
		async checkMatSubmit(){
			let data = await http.GoodsinventoryBatchSetMaterialInventory({data:{
				type:1,
				data:this.checkList,
			}});
			if(data.result){
				this.myAlert('物料盘库成功！');
				delete this.$route.query.id;
				this.$router.push({path:'/admin/materialCountHistory',query:this.$route.query});
			}else{
				this.myAlert('物料盘库失败！');
			}
		},
		async getMatList(){//获取物料列表
			let data = await http.materialGetListByArea({data:{
				page: this.page,
				num: this.pageShow,
				name: '',
				cid: this.cid,
				wid : this.wid,
				areaId : this.areaId,
				type:-1,
			}});
			this.pageTotal = data.total;
			this.listLength = data.count;
			this.setListData(data.list);
		},
		myAlert(content) {
			this.$store.commit('setWin', {
				title: '操作提示',
				content: content,
			});
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
				item.unitArr = unitArr;
				item.unitIndex = unitIndex;
				item.unitId = unitId;
				item.oneNum = '',item.twoNum = '';
				item.oneName = oneName,item.twoName = twoName;
				item.unitValue = value;
			}
			this.eachSaveList(list);
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
		pageChange(obj){//翻页
			this.page = obj.page;
			this.pageShow = obj.num;
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
	.main{border: 1px solid #ccc;
		.head{height: 50px;line-height: 50px;padding: 0 20px;font-size: 16px;
			em{color: #ff3c04;padding: 0 2px;}
		}
		.scroll-box{overflow: auto;}
		.title{overflow:hidden;background: #e6e6e6;min-width: 1300px;
			span{float: left;height: 40px;line-height: 40px;width: 11%;text-align: center;}
			.wide{width:23%}
		}
		.list-item{border-bottom: 1px solid #ddd;min-width: 1300px;
			.cell{float: left;height: 70px;line-height: 70px;width: 11%;text-align: center;
				.sel-box{line-height: normal;}
				em{color: #29a7e1;display: inline-block;height: 40px;line-height: 40px;padding: 0 5px;cursor: pointer;}
				.clear{color: red;}
				.input-box{
					display: inline-block;vertical-align: middle;overflow: hidden;
					input,.word{height: 40px;line-height: 38px;border: 1px solid #ccc;float: left;background: #fff;}
					input{width: 85px;padding: 0 5px;}
					.word{width: 40px;border-left: 0;text-align: center;}
				}
			}
			.wide{width:23%}
			&:last-child{border-bottom: 0;}
			&:after{content: '';zoom: 1;clear: both;display: block;}
		}
		.empty{line-height: 70px;text-align: center;color: #ccc;font-size: 20px;}
	}
	.page-box{padding: 20px 0;padding-bottom: 100px;}
}
</style>