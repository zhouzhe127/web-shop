<!--
    **新建指派
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div id="create-assign">
		<template v-if="!isSelBom">
			<div class="create">
				<div class="line-title">
					新建指派<p></p>
				</div>
				<div class="form">
					<div class="block">
						<div class="name required">方案名称</div>
						<div class="cell">
							<input type="text" placeholder="请输入方案名称" v-model="tempName" maxlength="20"/>
							<div class="tips"><i></i>限20字以内</div>
						</div>
					</div>
					<div class="block" v-for="(item,index) of formList" :key="index">
						<div class="name" :class="{required:item.required}">{{item.name}}</div>
						<div class="cell">
							<div class="add-btn" @click="openWin(item.param)">
								<em class="img-span"></em>选择指派内容
							</div>
							<span class="word" v-if="item.selStr">已选择：{{item.selStr}}</span>
							<div class="tips" v-if="item.tips"><i></i>{{item.tips}}</div>
						</div>
					</div>
				</div>
			</div>
			<!--选择适用店铺-->
			<div class="create store">
				<div class="line-title">
					适用店铺<p></p>
				</div>
				<div class="form">
					<div class="block">
						<div class="name required">适用店铺</div>
						<div class="cell">
							<div class="add-btn" @click="openWin('store')">
								<em class="img-span"></em>选择店铺
							</div>
							<div class="store-tips">
								<em>直营店：</em>
								<span v-for="(item,index) of storeSel" :key="index" v-if="item.ischain==1">{{item.name}},</span>
							</div>
							<div class="store-tips">
								<em>加盟店：</em>
								<span v-for="(item,index) of storeSel" :key="index" v-if="item.ischain==2">{{item.name}},</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--指派方式-table-->
			<div class="create mode">
				<div class="line-title">
					指派方式<p></p>
				</div>
				<div class="form">
					<div class="block">
						<div class="name required">适用店铺</div>
						<div class="cell">
							<div class="radio-box">
								<span v-for="(item,index) of tabList" :key="index" :class="{active:assignType==index+1}" @click="assignType=index+1">{{item}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="table">
					<div class="title">
						<span class="name">指派类型</span>
						<span class="word">指派规则</span>
					</div>
					<div class="content" v-for="(item,index) of tableList" :key="index">
						<div class="name">
							<div class="item">
								<span>{{item.name}}</span>
								<span class="tips" v-if="item.tips">（{{item.tips}}）</span>
							</div>
						</div>
						<div class="word">
							<ul>
								<li v-for="(list,index) of item.list" :key="index">{{list.word}}<em v-if="list.tips">（{{list.tips}}）</em></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<component 
				:is="showWin"
				
				@selGoods="selMaterialWin"
				:pSelGoods="matListSel"
				:pGoodsList="matList"
				:pCategory="matCate"
				:pSelCategory="matCateSel"
				:pSelBtn="matBtnSel"
				
				:showMenus="comMenus"
				:title="comTitle"
				:list="comList"
				:fieldName="'name'"
				:relAttr="'ischain'"
				:selectList="comSel"
				@throwCommonWin="comWin"
				>
			</component>
		</template>
		<sel-bom v-if="isSelBom" @emit="getSelBom" :isAll="bomStore" :selBom="selectBom"></sel-bom>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import Timer from 'src/verdor/timer';



export default{
	data(){
		return {
			tempId:'',//模板id
			tempName:'',//模板名称
			userName:'',//用户名
			isSelBom:false,//选择bom单指派
			selectBom:[],//选中的bom单id
			bomStore:false,//bom单全选本店 1自定义选择  2全选
			assignType:1,//指派方式
			showWin:null,//弹框实例
			isSearch:false,//是否是搜索状态
			winParam:'',//打开弹框参数-用于判断是哪个弹框抛出的
			matList:[],//物料列表
			matListSel:[],//选中的物料列表
			matPage:1,//物料当前页码
			matCid:'',//物料分类id
			matName:'',//物料按名称搜索
			matCate:[],//物料分类列表
			matCateSel:[],//已选中的分类id
			matBtnSel:'',//选中按钮的id
			comTitle:'',//公共弹框title
			comList:[],//公共弹框列表
			comMenus:false,//是否需要切换按钮
			comSel:[],//公共弹框-已选中
			storeSel:[],//店铺已选择
			isSaveClick:false,//是否点击过提交按钮-防止重复点击
			taskId:'',//任务id
			checkAlert:false,
			timeId:'',//定时器id
			cateList:'',//所有分类列表
			formList:[
				{name:'物料指派',param:'material',selStr:''},
				{name:'供应商指派',param:'supplier',selStr:''},
				{name:'BOM单指派',param:'bom',tips:'指派BOM单未匹配消耗仓库',selStr:''},
				{name:'物料单位指派',param:'unit',selStr:''},
				{name:'物料分类指派',param:'cate',selStr:''},
				{name:'商品品牌指派',param:'brand',selStr:''},
			],
			tabList:['只新增指派','覆盖指派（请慎重选择）','更新指派（请慎重选择）'],
			tableList:[
				{
					name:'只新增指派',
					list:[
						{word:'1.以重名的被指派内容（品牌、分类、单位、供应商、BOM单商品名、物料）为比较依据：'},
						{word:'A、待指派的内容中有，被指派的店铺没有的内容：新增到店铺内。'},
						{word:'B、待指派内容中有，被指派的店铺也有的内容：保留原内容不变。'},
						{word:'C、待指派内容中没有，被指派的店铺有的内容：保留原内容不变。'},
						{word:'2.指派物料到店铺中时，若该店铺中没有该物料的分类或单位或商品品牌时，则该条目指派失败。'},
						{word:'3.指派BOM单到店铺中时，若该店铺中没有该BOM单的物料时，则该条目指派失败。若被指派店铺中没有这个BOM单中的商品，则该条目指派失败。'},
						{word:'4.指派BOM单时，若果所选物料跟单店物料的单位不一样，则指派失败。'},
					]
				},
				{
					name:'覆盖指派',
					tips:'请慎重选择',
					list:[
						{word:'1.以重名的被指派内容（品牌、分类、单位、供应商、BOM单商品名、物料）为比较依据：'},
						{word:'A、待指派的内容中有，被指派的店铺没有的内容：新增到店铺内。'},
						{word:'B、待指派内容中有，被指派的店铺也有的内容：覆盖掉原内容。',tips:'库存数据和销售数据全部删除'},
						{word:'C、待指派内容中没有，被指派的店铺有的内容：保留原内容不变。'},
						{word:'2.指派物料到店铺中时，若该店铺中没有该物料的分类或单位或商品品牌时，则指派失败。'},
						{word:'3.指派BOM单到店铺中时，若该店铺中没有该BOM单的物料时，则该条目指派失败。若被指派店铺中没有这个BOM单中的商品，则该条目指派失败。'},
						{word:'4.指派BOM单时，若果所选物料跟单店物料的单位不一样，则指派失败。'},
					]
				},
				{
					name:'更新指派',
					tips:'请慎重选择',
					list:[
						{word:'1.以重名的被指派内容（品牌、分类、单位、供应商、BOM单商品名、物料）为比较依据：'},
						{word:'A、待指派的内容中有，被指派的店铺没有的内容：新增到店铺内。'},
						{word:'B、待指派内容中有，被指派的店铺也有的内容：覆盖掉原内容。',tips:'库存数据和销售数据全部删除'},
						{word:'C、待指派内容中没有，被指派的店铺有的内容：删除掉原内容。',tips:'库存数据和销售数据全部删除'},
						{word:'2.指派物料到店铺中时，若该店铺中没有该物料的分类或单位或商品品牌时，则指派失败。'},
						{word:'3.指派BOM单到店铺中时，若该店铺中没有该BOM单的物料时，则该条目指派失败。若被指派店铺中没有这个BOM单中的商品，则该条目指派失败。'},
						{word:'4.指派BOM单时，若果所选物料跟单店物料的单位不一样，则指派失败。'},
					]
				}
			],
			_shopList:[],
			//设置要发送的数据
			_sendObj:{
				mids:[],//物料列表
				mType:1,//选中方式 1物料 2分类 3全部
				supplierIds:[],//供应商
				bomIds:[],//bom单
				bType:1,//bom单类型
				muIds:[],//单位
				mcIds:[],//分类
				brandIds:[],//品牌
				shopIds:'',//店铺id集合
			},
			_selList:{//已选择列表
				material:[],
				supplier:[],
				bom:[],
				unit:[],
				cate:[],
				brand:[],
				store:[],
			},
			_reqData:{//进入页面就请求的数据，为了选择物料后，匹配相应的单位/分类/品牌
				unit:[],
				cate:[],
				brand:[],
			},
			//关联选中 与 请求参数的对应关系
			_relationParam:[
				{sel:'cate',send:'mcIds'},
				{sel:'unit',send:'muIds'},
				{sel:'brand',send:'brandIds'},
			],
			//设置默认参数时-需要的参数对应关系
			_defRelParam:[
				{sel:'material',send:'mids'},
				{sel:'supplier',send:'supplierIds'},
				{sel:'bom',send:'bomIds'},
				{sel:'cate',send:'mcIds'},
				{sel:'unit',send:'muIds'},
				{sel:'brand',send:'brandIds'},
			],
		};
	},
	created() {
		this.$data._shopList = storage.session('shopList');
	},
	mounted(){
		console.log('2');
		this.initBtn();
		this.requiredData();
		this.userName = storage.session('userShop').user.name;
		this.tempId = storage.session('brandAssignId');
		if(this.tempId){//存在id 则改为修改模板接口
			this.setDefault();
		}
	},
	destroyed(){
		storage.session('brandAssignId',null);
	},
	components:{
		onOff: () => import ( /*webpackChunkName: 'on_off'*/ 'src/components/on_off'),
		selBom: () => import ( /*webpackChunkName: 'select_bom_assign'*/ './select_bom_assign'),
		selMaterial: () => import ( /*webpackChunkName: 'page_select_all'*/ './page_select_all'),
		selWin: () => import ( /*webpackChunkName: 'assign_list_win'*/ './assign_list_win'),
		selCate: () => import ( /*webpackChunkName: 'add_category_com'*/ 'src/components/add_category_com'),
	},
	methods:{
		initBtn() {
			let arr = [
				{name: '返回',style: 'background: none;border: 1px solid #b3b3b3;color: #b3b3b3;',
					fn: () => {
						window.history.go(-1);
					}
				},
				{name: '保存',style: 'background: none;border: 1px solid #fe8d01;color: #fe8d01;',
					fn: () => {
						if(this.tempId){
							//修改
							this.editTemplate();
						}else{
							//新建
							this.addTemplate();
						}
					}
				},
				{name: '指派',style: 'background: #fe8d01;border: 1px solid #fe8d01;color: #fff;',
					fn: () => {
						this.brandAssign();
					}
				},
			];
			this.$store.commit('setPageTools', arr);
		},
		async setDefault(){//修改模板-设置默认数据
			let data = await http.InventorgetPowerTemplate({data:{
				id:this.tempId,
			}});
			this.assignType = data.content.assignType;
			this.userName = data.createUName;
			this.tempName = data.name;
			//发送数据遍历
			for(let key in this.$data._sendObj){
				if(key == 'shopIds'){
					this.$data._sendObj.shopIds = data.content.shopIds.join(',');
				}else{
					this.$data._sendObj[key] = data.content[key];
				}
			}
			//已选中数据遍历
			if(data.content.mType>1){
				this.matBtnSel = data.content.mType-1;
			}else{
				this.matBtnSel = '';
			}
			this.bomStore = data.content.bType==2? true:false;
			let shopArr=[];
			for(let sIds of data.content.shopIds){
				for(let item of this.$data._shopList){
					if(item.id == sIds){
						shopArr.push({id:item.id,name:item.shopName,ischain:item.ischain});
						break;
					}
				}
			}
			this.storeSel = shopArr;
			this.$data._selList.store = shopArr;
			for(let item of this.$data._defRelParam){
				if(item.sel=='bom'){
					this.selectBom = this.$data._sendObj.bomIds;
				}
				this.$data._selList[item.sel] = this.$data._sendObj[item.send];
			}
			if(data.content.mType==2){//物料-如果默认选中的是分类
				this.matCateSel = this.$data._selList.material;
			}else{
				this.matListSel = this.$data._selList.material;
			}
			this.setSelTips();//设置默认文字提示
			this.setNotAllow();
		},
		setSelTips(){//设置选中文字提示
			//物料提示
			let sendObj = this.$data._sendObj;
			if(sendObj.mType==2){//选分类
				this.formList[0].selStr = sendObj.mids[0].name+'(分类)';
			}else if(sendObj.mType==3){//选全部
				this.formList[0].selStr = '全部';
			}else{
				this.formList[0].selStr = sendObj.mids.length? sendObj.mids.length+'个':'';
			}
			//bom单提示
			if(sendObj.bType==2){//选全部
				this.formList[2].selStr = '全部';
			}else if(sendObj.bType==1){
				this.formList[2].selStr = sendObj.bomIds.length?sendObj.bomIds.length+'个':'';
			}
			//其他提示
			for(let form of this.formList){
				if(form.param!='material' && form.param!='bom'){
					let selList = this.$data._selList;
					form.selStr = selList[form.param].length?selList[form.param].length+'个':'';
				}
			}
		},
		setNotAllow(){//设置禁止选择样式
			let arr=['cate','unit','brand'];
			for(let key of arr){
				for(let req of this.$data._selList[key]){
					for(let send of this.$data._reqData[key]){
						if(req.id==send.id && req.notAllow){
							send.notAllow = true;
							break;
						}
					}
				}
			}
		},
		saveVeri(){//保存模板验证
			if(!this.tempName.trim()){
				this.myAlert('请填写方案名称');
				return false;
			}
			if(!this.$data._sendObj.shopIds){
				this.myAlert('请选择适用店铺');
				return false;
			}
			return true;
		},
		setSendParam(isId){//设置请求接口的参数
			let sendObj = this.$data._sendObj;
			let obj = {
				name: this.tempName,
				userName: this.userName,
				shopIds: sendObj.shopIds,
				type: this.assignType,
				mids: sendObj.mids,//物料列表
				mType: sendObj.mType,//选中方式 1物料 2分类 3全部
				supplierIds: sendObj.supplierIds,//供应商
				bomIds: sendObj.bomIds,//bom单
				bType: sendObj.bType,//bom类型
				muIds: sendObj.muIds,//单位
				mcIds: sendObj.mcIds,//分类
				brandIds: sendObj.brandIds,//品牌
			};
			if(isId){//模板id只在修改模板，跟指派时用到。新增模板无需id，后台不会识别
				obj.id = this.tempId?this.tempId:0;
			}
			return obj;
		},
		async addTemplate(){//新增指派模板
			if(!this.saveVeri()) return;
			if(this.isSaveClick) {
				this.myAlert('请勿重复点击');
				return;
			}
			this.isSaveClick = true;
			let res=null;
			let sendObj = this.setSendParam();
			try{
				res = await http.addAssignTemplate({data:sendObj},true);
			}
			catch(e){
				this.$store.commit('setWin', {title: '错误提示',content: e.error.message});
				this.isSaveClick = false;//接口报错，还能继续点击
			}
			if(res){
				this.myAlert('模板保存成功');
				this.isSaveClick = false;//保存成功，还能继续点击
				this.tempId = res;
			}
		},
		async editTemplate(){//修改指派模板
			if(!this.saveVeri()) return;
			let sendObj = this.setSendParam(true);
			let	res = await http.editAssignTemplate({data:sendObj});
			if(res){
				this.myAlert('模板修改成功');
			}
		},
		async brandAssign(){//指派
			if(!this.saveVeri()) return;
			let sendObj = this.setSendParam(true);
			let	res = await http.InventoryassignAssignStart({data:sendObj});
			if(res){
				this.taskId = res.taskId;
				this.timeId = Timer.add(this.checkUp, 2000, 200);
				this.$store.commit('setWin', {
					title: '提示',
					winType: 'alert',
					content: '正在指派....',
					maskShow: false,
					callback: (str) => {
						if (str != 'ok') {
							Timer.clear(this.timeId);
						} else {
							this.checkAlert = true;
						}
					}
				});
			}
		},
		async checkUp() {
			let data = await http.invoicing_taskInfo({
				data: {
					taskId: this.taskId
				}
			});
			if (data.status == 3) {
				let words = '品牌指派成功！请前往指派日志查看结果。';
				if (this.checkAlert) {
					this.myAlert(words);
					this.checkAlert = false;
				} else {
					this.$store.commit('setWinContent', words);
				}
				Timer.clear(this.timeId);
			}
			if (data.status == 2) {
				let words = '品牌指派失败！请前往指派日志查看结果。';
				if (this.checkAlert) {
					this.myAlert(words);
					this.checkAlert = false;
				} else {
					this.$store.commit('setWinContent', words);
				}
				Timer.clear(this.timeId);
			}
		},
		requiredData(){//提前获取单位/分类/品牌
			http.MaterialGetUnitList().then((res)=>{
				this.$data._reqData.unit = res;
			});
			http.MaterialGetCategoryList().then((res)=>{
				this.$data._reqData.cate = res;
			});
			http.InvoicingBrandList().then((res)=>{
				this.$data._reqData.brand = res;
			});
		},
		//open************************************以下为打开弹窗事件*******************************
		async openMatWin(){//打开选择弹框-物料
			let category = await http.MaterialGetCategoryList();
			this.matCate = category;
			this.showWin = 'selMaterial';
		},
		async openSupWin(){//打开选择弹框-供应商
			this.showWin = 'selWin';
			this.comTitle = '选择供应商';
			let data = await http.suppierList();
			if(data){	
				this.comList = data;
			}
		},
		openBomWin(){//打开选择组件-bom单
			this.isSelBom = true;
		},
		async openStoreWin(){//打开选择弹框-店铺
			this.showWin = 'selWin';
			this.comTitle = '选择店铺';
			this.comList = this.$data._shopList.map((item)=>{
				return {id:item.id,name:item.shopName,ischain:item.ischain};
			});
		},
		openReqWin(title,param){//打开选择弹框-单位/品牌/分类
			if(title=='选择分类'){
				this.showWin = 'selCate';
			}else{
				this.showWin = 'selWin';
			}
			this.comTitle = title;
			for(let key in this.$data._reqData){
				if(param==key){
					this.comList = this.$data._reqData[param];
				}
			}
		},
		openWin(param){//打开弹框-公共方法
			this.winParam = param;
			this.comSel = this.$data._selList[param];
			switch (param){
				case 'material'://物料
					this.openMatWin();
					break;
				case 'supplier'://供应商
					this.comMenus = false;
					this.openSupWin();
					break;
				case 'bom'://bom单
					this.openBomWin();
					break;
				case 'unit'://单位
					this.comMenus = false;
					this.openReqWin('选择单位','unit');
					break;
				case 'cate'://分类
					this.comMenus = false;
					this.openReqWin('选择分类','cate');
					break;
				case 'brand'://品牌
					this.comMenus = false;
					this.openReqWin('选择品牌','brand');
					break;
				case 'store'://店铺
					this.comMenus = true;
					this.openStoreWin();
					break;
				default:
					break;
			}
		},
		//close************************************以下为关闭弹窗事件**********************************
		selMaterialWin(res,obj){//关闭物料弹框
			if (res == 'ok') {
				this.matListSel = obj.pSelGoods;
				if(obj.pSelBtn.id==2){//选择全部
					this.$data._sendObj.mids=[];
					this.$data._sendObj.mType = 3;
					this.matBtnSel = obj.pSelBtn.id;
					this.formList[0].selStr = '全部';
					this.relationList(3);//分类/单位/品牌
					this.matCateSel=[];//非分类，则清空已选分类
				}else if(obj.pSelBtn.id==1){//选中分类
					this.$data._sendObj.mType = 2;
					this.matBtnSel = obj.pSelBtn.id;
					let relCid=[];//需要关联的分类id
					let cateObj={};
					if(obj.parent.length){//只选了一级分类
						cateObj = {
							id:obj.parent[0].id,
							name:obj.parent[0].name,
						};
						relCid.push(cateObj);
					}
					if(obj.child.length){//选了二级分类-这里会覆盖掉一级分类的id
						cateObj = {
							id:obj.child[0].id,
							name:obj.child[0].name,
						};
						relCid.push(cateObj);
					}
					this.$data._sendObj.mids = [cateObj];
					this.matCateSel = [cateObj];
					this.formList[0].selStr = cateObj.name+'(分类)';
					this.relationList(2,relCid);//分类/单位/品牌
				}else{//单独选择，或者全选本页
					this.$data._sendObj.mType = 1;
					let arr = [];
					for(let item of obj.pSelGoods){
						arr.push({
							id:item.id,
							name:item.name,
						});
					}
					this.matBtnSel = -1;
					this.$data._sendObj.mids = arr;
					this.formList[0].selStr = this.$data._sendObj.mids.length+'个';
					this.relationList(1,'',obj.pSelGoods);//分类/单位/品牌
					this.matCateSel=[];//非分类，则清空已选分类
				}
				this.showWin = null;
			}else{
				this.showWin = null;
			}
		},
		relationList(type,cid,arr){//选择物料时关联分类/单位/品牌
			this.clearAllow();//先清空已关联选中
			if(type==3){//选择全部
				for(let rel of this.$data._relationParam){
					let arr = this.$data._reqData[rel.sel].map((item)=>{
						return {id:item.id,name:item.name,notAllow:true};
					});
					this.$data._selList[rel.sel] = arr;
					this.$data._sendObj[rel.send] = arr;
				}
				this.setSelTips();
				this.setNotAllow();
			}else if(type==2){//选择本类
				let cateArr=[];
				for(let item of cid){
					cateArr.push({id:item.id,name:item.name,notAllow:true});
				}
				this.notRepeatContact(this.$data._selList.cate,cateArr);
				let sendCid = cid.length>1?cid[1].id:cid[0].id;
				let unitPromise = http.MaterialGetUnitidsBycid({data:{
					cids:sendCid+'',
				}}).then((res)=>{
					let unitArr=[];
					for(let item of res){
						for(let reqUnit of this.$data._reqData.unit){
							if(item.id==reqUnit.id){
								unitArr.push({id:item.id,name:item.name,notAllow:true});
								break;
							}
						}
					}
					this.notRepeatContact(this.$data._selList.unit,unitArr);
				});
				let brandPromise = http.MaterialGetBrandIdByCids({data:{
					cids:cid[0].id+'',
				}}).then((res)=>{
					let brandArr=[];
					for(let item of res){
						for(let reqBrand of this.$data._reqData.brand){
							if(item==reqBrand.id){
								brandArr.push({id:reqBrand.id,name:reqBrand.name,notAllow:true});
								break;
							}
						}
					}
					this.notRepeatContact(this.$data._selList.brand,brandArr);
				});
				Promise.all([unitPromise,brandPromise]).then(()=>{
					this.setSelTips();
					this.setNotAllow();
				});
			}else{//自定义选择
				let relObj={cate:[],unit:[],brand:[],};
				for(let arrItem of arr){
					//匹配分类
					for(let cate of arrItem.cate){
						let isExist = this.isArrayItem(relObj.cate,cate.cid);//去重验证
						for(let reqCate of this.$data._reqData.cate){
							if(cate.cid==reqCate.id && !isExist){
								relObj.cate.push({id:reqCate.id,name:reqCate.name,notAllow:true});
								break;
							}
						}
					}
					//匹配单位
					for(let unit of arrItem.unit){
						let isExist = this.isArrayItem(relObj.unit,unit.muId);//去重验证
						for(let reqUnit of this.$data._reqData.unit){
							if(unit.muId==reqUnit.id && !isExist){
								relObj.unit.push({id:reqUnit.id,name:reqUnit.name,notAllow:true});
								break;
							}
						}
					}
					//匹配品牌
					for(let brand of this.$data._reqData.brand){
						let isExist = this.isArrayItem(relObj.brand,brand.id);//去重验证
						if(arrItem.brandId==brand.id && !isExist){
							relObj.brand.push({id:brand.id,name:brand.name,notAllow:true});
							break;
						}
					}
				}
				for(let item of this.$data._relationParam){
					//设置已选中
					this.notRepeatContact(this.$data._selList[item.sel],relObj[item.sel]);
					//设置发送参数
					let sendArr = relObj[item.sel].map((res)=>{
						return {id:res.id,name:res.name,notAllow:true};
					});
					this.notRepeatContact(this.$data._sendObj[item.send],sendArr);
				}
				this.setSelTips();
				this.setNotAllow();
			}
		},
		notRepeatContact(orgArr,arr){//对象数组去重复合并
			for(let item of arr){//需要合并的数组
				let isEqual = false;
				for(let org of orgArr){//原数组
					if(item.id==org.id){
						isEqual = true;
						org.notAllow = true;
						break;
					}
				}
				if(!isEqual){
					orgArr.push(item);
				}
			}
		},
		isArrayItem(arr,id){//判断对象数组中某个元素是否存在
			for(let item of arr){
				if(item.id==id){
					return true;//存在
				}
			}
			return false;
		},
		clearAllow(){//清除关联选中
			for(let rel of this.$data._relationParam){
				let selArr = this.$data._selList[rel.sel];
				let sendArr = this.$data._sendObj[rel.send];
				for(let req of this.$data._reqData[rel.sel]){//清除总列表notAllow
					delete req.notAllow;
				}
				for(let i=0;i<selArr.length;i++){//清除已选中
					if(selArr[i].notAllow){
						selArr.splice(i,1);
						i--;
					}
				}
				for(let i=0;i<sendArr.length;i++){//清除发送参数
					if(sendArr[i].notAllow){
						sendArr.splice(i,1);
						i--;
					}
				}
			}
		},
		closeSupWin(...args){//关闭弹框-供应商/单位/分类/品牌
			let [arr,res,word,param] = args;//word=发送的数据参数，param=循环的数据参数
			if(res=='ok'){
				this.$data._selList[param] = arr;
				this.$data._sendObj[word] = arr.map((item)=>{
					return item.notAllow ? {id:item.id,name:item.name,notAllow:item.notAllow} : {id:item.id,name:item.name};
				});
				this.setSelTips();
			}
			this.showWin = null;
		},
		getSelBom(res,bomStore){//关闭bom单组件
			this.isSelBom = false;
			this.initBtn();
			if(res){
				this.bomStore = bomStore;
				if(this.bomStore){//全部bom单
					this.selectBom = [];
					this.$data._sendObj.bomIds = [];
					this.$data._sendObj.bType = 2;
					this.formList[2].selStr = '全部';
				}else{
					this.selectBom = res;
					this.$data._sendObj.bomIds = res.map((item)=>{
						return {id:item.id,name:item.name};
					});
					this.$data._sendObj.bType = 1;
					if(this.$data._sendObj.bomIds.length){
						this.formList[2].selStr = this.$data._sendObj.bomIds.length+'个';
					}else{
						this.formList[2].selStr = '';
					}
				}
			}
		},
		closeStoreWin(arr,res){//关闭弹窗-店铺选择
			if(res=='ok'){
				this.storeSel = arr;
				this.$data._selList.store = arr;
				let idArr = arr.map((item)=>{
					return item.id;
				});
				this.$data._sendObj.shopIds = idArr.join(',');
				this.showWin = null;
			}else if(res=='close' || res=='cancel'){
				this.showWin = null;
			}
		},
		comWin(arr,res){//公用弹框抛出事件
			this.comList = [];//清空公用列表
			switch (this.winParam){
				case 'supplier'://供应商
					this.closeSupWin(arr,res,'supplierIds',this.winParam);
					break;
				case 'unit'://单位
					this.closeSupWin(arr,res,'muIds',this.winParam);
					break;
				case 'cate'://分类
					this.closeSupWin(arr,res,'mcIds',this.winParam);
					break;
				case 'brand'://品牌
					this.closeSupWin(arr,res,'brandIds',this.winParam);
					break;
				case 'store'://店铺
					this.closeStoreWin(arr,res);
					break;
				default:
					break;
			}
		},
		myAlert(content) {
			this.$store.commit('setWin', {
				title: '操作提示',
				content: content,
			});
		},
		async getMaterialList(){
			let data = await http.getMaterialList({data:{
				page:this.matPage,
				name:this.matName,
				cid:this.matCid,
				num:50,
			}});
			this.matList = data.list;
			this.matPageObj = {
				totalNum:data.total,
			};
		},
	}
};
</script>

<style lang="less" scoped>
	#create-assign{
		.create{padding-bottom: 30px;
			.line-title{
				height: 28px;line-height: 28px;border-left: 3px solid #27a8df;position: relative;overflow: hidden;
				padding-left: 10px;font-size: 16px;
				p{position: absolute;height: 16px;border-bottom: 2px dashed #ddd;left: 80px;top: 0;width: 100%;}
			}
			.form{padding-top: 20px;
				.block{overflow: hidden;margin-bottom: 20px;
					.name{float: left;width: 130px;text-align: right;padding-right: 10px;height: 40px;line-height: 40px;}
					.required{position: relative;
						&:after{content: '*';position: absolute;top: 0;right: 0;color: #ff1212;}
					}
					.cell{padding-left: 20px;float: left;
						input{height: 40px;border: 1px solid #ccc;line-height: 38px;width: 210px;padding: 0 10px;}
						.tips{color: #999;margin-top: 10px;width: 100%;float: left;
							i{vertical-align: middle;margin-right: 10px;width: 18px;height: 18px;display: inline-block;
							background: url(../../../res/images/handle-tips.png) center no-repeat;}
						}
						.on-off{margin-right: 15px;float: left;}
						.add-btn {background: #29a8e0;width: 210px;height: 40px;line-height: 40px;border: 1px solid #29a8e0;
							font-size: 14px;text-align: center;color: #ffffff;cursor: pointer;float: left;
							em {vertical-align: middle;width: 18px;height: 18px;
								text-align: center;display: inline-block;margin-top: -3px;margin-right: 10px;
								background: url(../../../res/images/add.png) center no-repeat;
							}
						}
						.word{float: left;height: 40px;line-height: 40px;color: #999;padding: 0 10px;}
						.store-tips{margin-top: 15px;float: left;
							width: 100%;position: relative;min-height: 20px;padding-left: 50px;
							em{position: absolute;left: 0;top: 0;color: #999;}
							span{color: #999;padding-right: 5px;}
						}
					}
				}
			}
		}
		.mode{
			.radio-box{
				overflow: hidden;
				span{float: left;padding: 0 15px;height: 40px;line-height: 38px;
					border: 1px solid #bebebe;margin-right: 15px;cursor: pointer;}
				.active{border: 1px solid #f7921e;color: #f7921e;background: #fff3e5;}
			}
			.table{width: 100%;margin-top: 30px;border: 1px solid #d2d2d2;
				.title{overflow: hidden;background: #f2f2f2;
					span{text-align: center;height: 40px;line-height: 40px;}
					.name{width: 20%;float: left;}
					.word{width: 80%;float: left;}
				}
				.content{display: flex;border-bottom: 2px solid #f2f2f2;
					.name{justify-content: center; align-items: center;flex: 0 0 20%;display: flex;
						border-right:2px solid #f2f2f2;
						span{width: 100%;padding-bottom: 10px;display: block;color: #333;text-align: center;}
						.tips{color: #ff5824;}
					}
					.word{flex: 0 0 80%;padding: 20px 10%;display: flex;
						ul{max-width: 800px;
							li{padding: 7px 0;color: #666;line-height: 1.5;
								em{color: #ff5824;display: inline-block;}
							}
						}
					}
					&:last-child{border-bottom: 0;}
				}
			}
		}
	}
</style>