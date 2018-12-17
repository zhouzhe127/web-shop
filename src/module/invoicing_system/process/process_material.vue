		
<template>
	<div
		v-loading="comState.showLoading"
		element-loading-text="正在加工,请稍后"
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.4)"
		class="loading"
		:style="{'min-height':comState.loading.height+'px'}"
	>
		<div class="container" v-if="!comState.showAddBom">

			<div class="table">
				<div class="table-thead">
					加工物料列表<span class="circle"></span>共<i class="list-num">{{bomDetails.length}}</i>个条目<span class="reset" @click="resetAll">一键重置</span>
				</div>
				<div class="table-title">
					<li v-for="(title,index) in titles" :key="index" :style="title.style">{{title.name}}</li>
				</div>

				<div class="table-body" v-for="(bom,bomIndex) in bomDetails" :key="bomIndex">
					<div class="body-left" :style="calcStyle(bom.list.length)">  
						<div class="sum">
							<li>
								<span class="word">
									<span class="del" @click="operatorBom('delete',bom,bomIndex)">删除</span>
									<span class="line"></span>
									<span class="reset" @click="operatorBom('reset',bom,bomIndex)">重置</span>
								</span>
							</li>
							<li>
								<span class="word">
									{{bom.material}}
								</span>
							</li>
							<li>
								<span class="word">
									{{bom.warehouse}}-{{bom.warehouseArea}}
									<span class="edit" @click="operatorBom('edit',bom,bomIndex)"></span>
								</span>
							</li>
							<li>
								<span class="word">
									<!-- 产出数量 -->
									<el-input placeholder="请输入" clearable  maxlength="9" @change="()=>{checkNum(bom,'produceNum')}" v-model="bom.produceNum">
										<template slot="append">{{bom.selUnitName}}</template>
									</el-input>
								</span>
							</li>
							<li class="unit">
								<span class="word">
									<el-select @change="(unitId)=>{getSelectUnit(unitId,bom,'bom')}" v-model="bom.selUnitId" placeholder="请选择单位">
										<el-option
											v-for="unit in bom.unit"
											:key="unit.muId"
											:label="unit.name"
											:value="unit.muId"
										>
										</el-option>
									</el-select>
								</span>
							</li>
						</div>
					</div>
					<div class="body-right fr">
						<div class="item" v-for="(ele,i) in bom.list" :key="i">
							<li>
								<span class="word" >
									{{ele.material}}
								</span>
							</li>

							<li>
								<span class="word">
									<!-- 原料数量 -->
									<el-input placeholder="请输入" clearable focus  maxlength="9" v-model="ele.rawNum" @change="()=>{checkNum(ele,'rawNum')}">			  
										<template slot="append">{{ele.selUnitName}}</template>
									</el-input>
								</span>
							</li>

							<li>
								<span class="word">
									<el-select @change="(unitId)=>{getSelectUnit(unitId,ele,'list')}" v-model="ele.selUnitId" placeholder="请选择单位">
										<el-option
											v-for="unit in ele.unit"
											:key="unit.muId"
											:label="unit.name"
											:value="unit.muId"
											:size="'mini'"
										>
										</el-option>
									</el-select>
								</span>
							</li>
						</div>
					</div>
				</div>
				<div class="empty" v-if="bomDetails.length == 0">
					暂无条目
				</div>
			</div>
		</div>

		<div class="component">
			<el-dialog :title="comState.dialogAlert.title" width="500px" :visible.sync="comState.showdialogAlert">
				<el-form :model="comState.dialogAlert">
					<el-form-item label="请输入模板名称" :label-width="'120px'">
					<el-input v-model="template.name" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogEvent('cancel')">取 消</el-button>
					<el-button type="primary" @click="dialogEvent('ok')">确 定</el-button>
				</div>
			</el-dialog>

			<add-bom
				v-if="comState.showAddBom"
				:selObj="comState.addBom"
				@emit="getAddBom"
			></add-bom>

			<warehouse-win
				v-if="comState.showWarehouse"
				:title="comState.warehouse.title"
				:wid="comState.warehouse.wid"
				:areaId="comState.warehouse.areaId"
				:shopId="comState.warehouse.shopId"
				:isBrand="comState.warehouse.isBrand"				
				@wareEvent ="(status,res)=>{closeWin('ware',status,res)}" 
			></warehouse-win>
		</div>
	</div>
</template>
<script>
/*
	接口:
		ProcessbomGetProcessBomDetailList		   //获取加工bom单详情
		ProcessbomGetProcessList					//获取加工时选择的bom单
		templateGetListTemplate					 //获取模板详情
		templateAddListTemplate					 //保存加工模板
		templateEditListTemplate					//修改加工模板
		MaterIalMachiningMachiningBegin			 //保存加工
		invoicing_taskInfo						  //获取任务状态
	
	问题:
		1.产出物料与原料的输入问题,小数(两位),长度
		2.模板名是否可以修改
	
	注意:
		1.每次最多操作100条bom单
*/
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import Timer from 'src/verdor/timer';

export default {
	data () {
		return {
			titles:[
				{name:'操作',style:{width:'12.5%'}},
				{name:'产出物料',style:{width:'12.5%'}},
				{name:'仓库/区域',style:{width:'12.5%'}},
				{name:'产出数量',style:{width:'12.5%'}},
				{name:'物料单位',style:{width:'12.5%'}},
				{name:'原料物料',style:{width:'12.5%'}},
				{name:'原料数量',style:{width:'12.5%'}},
				{name:'物料单位',style:{width:'12.5%'}},
			],
			template:{					  //模板数据
				id:undefined,			   //模板id
				name:'',					//模板名
				userName:'',				//用户名
			},
			bomDetails:[],				   //当前展示的加工bom
			pageObj:{
				total:0,					 //总页数
				count:0,					 //总记录数
				currentPage:1,			   //当前页
				num:100,					  //每页加载的数量
				flag:true,				   //是否搜索,true:搜索
				rest:[],					 //选择的所有的加工bom单
			},
			comState:{							  //组件状态
				addBom:{	
					list:[],
					search:{
						cid: '',   					//??????
						matType: '-1',			//bom单物料类型
						sortOneId: '',				//一级分类id
						sortTwoId: '',				//二级分类id
						page: 1,					//当前页
						num: 10,					//每页显示
						material: '',				//物料名称搜索
					},
					storeAll:false,					
				},
				dialogAlert:{
					title:'新建模板'
				},
				loading:{
					height:0,
				},
				warehouse:{},
				showAddBom :false,
				showdialogAlert: false,			 //prompt框的展示
				showLoading:false,				  //显示加载组件
				showWarehouse:false,				//显示选择仓库组件
			},
			timer:'',							   //定时器,开启任务时的定时器
			MAXBOMNUM:100,						  //每次最多加工的BOM单数
			shopId:'',
			isBrand:false,
			route:{}								//路由信息
		};
	},
	methods: {
		closeWin(flag,status,res){
			//关闭弹窗
			switch(flag){
				case 'ware':
					this.comState.showWarehouse = false;
					if(status == 'ok'){
						this.bomDetails = this.bomDetails.map((ele)=>{
							if(ele.id == this.comState.warehouse.nowBom.id){
								ele.areaId = res.areaId;
								ele.warehouseArea = res.wArea;
								ele.wid = res.wid;
								ele.warehouse = res.warehouse;
								this.comState.warehouse.wid = ele.wid;
								this.comState.warehouse.areaId = ele.areaId;
							}
							return ele;
						});
					}
					this.comState.warehouse.nowBom = {};
					break;
			}
		},
		async dialogEvent(flag){ 
			//保存,修改模板
			if(flag == 'ok'){
				let content = [],
					subObj = {},
					tips = '';
				this.template.name = this.template.name.trim();

				if(!this.template.name){
					this.alert('请输入模板名称!');			   
					return;			   
				}
				if(this.template.name.length > 20){
					this.alert('模板名称最多20字!');			   
					return;			   
				}
			
				if(this.bomDetails.length == 0){
					this.alert('请先添加需要加工的BOM单!');
					return;					  
				}
				if(!this.checkForm(this.bomDetails)){
					return;
				}
				content = this.formatData(this.bomDetails);

				subObj = {
					userName:this.template.userName,
					name:this.template.name,
					content,
				};
				if(this.template.id){
					subObj.id = this.template.id;
					await this.getHttp('templateEditListTemplate',subObj);
					tips = '修改模板成功!';
				}else{
					this.template.id = await this.getHttp('templateAddListTemplate',subObj);
					tips = '新建模板成功!'; 
				} 
				this.alert(tips); 
				this.pageObj.count -= this.MAXBOMNUM;   

				if(this.pageObj.count > 0){
					//继续新建模板
					this.template.id = undefined;
					this.template.name = '';
				}					 
				this.initBtn();
				this.getRestBomdetails({path:'/admin/processtemplate',query:this.$route.query});
			}
			this.comState.showdialogAlert = false;										
		},
		getSelectUnit(unitId,bom,flag){
			//单位切换
			bom.unit = bom.unit.map((ele)=>{
				if(ele.muId == unitId){
					bom.selUnitId = ele.muId;
					bom.selUnitVal = ele.value;
					bom.selUnitName = ele.name;
				}
				return ele;
			});
			if(flag == 'bom'){
				bom.produceNum = '';
			}else{
				bom.rawNum = '';				
			}
		},
		checkNum(item,attr='produceNum'){
			let num = item[attr]+'',
				reg = /([1-9]\d{0,9}|0)\.?(\d{0,2})?/g,
				temp = [];

			num = num.trim();
			num = num.slice(0,30);

			temp = num.match(reg);

			if(!temp){
				temp = [];
				temp[0] = '';
			} 

			if(temp[0]){
				temp[0] = Number(temp[0]);
				if(temp[0] < 0){
					temp[0] = 0;
				}

			}
			temp[0] += '';
			item[attr] = temp[0];
		},
		operatorBom(flag,bom,bomIndex){
			//删除,重置
			switch(flag){
				case 'reset':
					this.asignDefUnitToSelUnit(bom,'produceNum');
					bom.list = bom.list.map((ele)=>{
						this.asignDefUnitToSelUnit(ele,'rawNum');
						return ele;
					});
					break;
				case 'delete':
					this.bomDetails.splice(bomIndex,1);
					this.comState.addBom.storeAll = false;
					break;
				case 'edit':
					this.comState.showWarehouse = true;
					this.comState.warehouse.nowBom = bom;
					break;
			}
		},
		resetAll(){
			//一键重置
			this.bomDetails = this.bomDetails.map((ele)=>{
				this.asignDefUnitToSelUnit(ele,'produceNum');
				for(let e of ele.list){
					this.asignDefUnitToSelUnit(e,'rawNum');
				}
				return ele;
			});
		},
		async getAddBom(res){
			//初始化BOM单来源
			this.comState.showAddBom = false;
			this.initBtn(); 
			
			if(!res) return;
			let {list=[],search={}} = res;
			let ids = [],
				sub = {},
				retData = {},
				details = [];

			this.comState.addBom = res;
			this.pageObj.currentPage = 1;

			if(list.length == 0){
				//筛选条件
				sub = {
					page:this.pageObj.currentPage,
					num:this.pageObj.num,
					material:search.material,
					type:search.matType,
					cid:search.sortTwoId ? search.sortTwoId : search.sortOneId,
				};
				retData = await this.getHttp('ProcessbomGetProcessList',sub);
				if(Array.isArray(retData.list)){
					list = retData.list;
				}

				this.pageObj.flag = false;									  //后台搜索
				this.pageObj.count = retData.count;
				this.pageObj.total = retData.total;
			}else{
				this.pageObj.flag = true;									   //前端分页
				this.pageObj.count = list.length;
				this.pageObj.total = Math.ceil(this.pageObj.count / this.pageObj.num);
			}

			ids = this.getListAttr(list,'id');								  //获取所有bom单id
			ids = ids.join(',');
			details = await this.getHttp('ProcessbomGetProcessBomDetailList',{id:ids});
			details = this.initBomDetail(details);

			if(this.pageObj.flag){
				this.bomDetails = details.splice(0,this.MAXBOMNUM);
				this.pageObj.rest = details;										 //余下的bom单
			}else{
				this.pageObj.rest = [];  
				this.bomDetails = [...details];
			}
		},
		
		

		async getTemplateDetail(id){
			//获取模板详情,模板中产出物料数量最多为100个
			let content = [],
				detail = {},
				ids = [],
				template = {};

			template = await this.getHttp('templateGetListTemplate',{id});
			this.template.name = template.name;
			this.template.id = id;

			content = template.content;
			ids = this.getListAttr(content,'bomId');
			ids = ids.join(',');
			detail = await this.getHttp('ProcessbomGetProcessBomDetailList',{id:ids});

			detail = this.initBomDetailsNum(detail,content);
			this.pageObj.count = detail.length;
			this.bomDetails = detail.splice(0,this.MAXBOMNUM);
			this.pageObj.rest = detail;								 //余下BOM单
		},

		async startTask(taskId){
			let retData = await this.getHttp('invoicing_taskInfo',{taskId});
			switch(retData.status+''){
				case '2'://失败
					this.alert('加工失败!');
					Timer.clear(this.timer);					
					this.comState.showLoading = false;
					this.timer = '';
					break;
				case '3'://成功
					this.alert('加工成功!');
					Timer.clear(this.timer);					
					this.comState.showLoading = false;  
					this.pageObj.count -= this.MAXBOMNUM;	   
					this.comState.addBom.storeAll = false;				 
					this.getRestBomdetails({path:'/admin/processHistory',query:this.$route.query});
					this.timer = '';
					break;
			}
		},
		initBtn(){
			let style = {height:'40px','color':'#fff','width':'100px'};
			let line = {height:'40px','line-height':'38px','text-align':'center','background-color':'#fff','min-width':'100px','width':'auto'};
			this.$store.commit('setPageTools',[
				{
					name: '确认加工',
					className:'yellow',
					style,
					fn:async ()=>{
						let content = [],
							retData = null;

						if(this.timer){
							this.alert('正在加工,请稍后!');
							return;
						}

						if(this.bomDetails.length == 0){
							this.alert('请先添加需要加工的BOM单!');
							return;					  
						}
						if(!this.checkForm(this.bomDetails)){
							return;
						}
						content = this.formatData(this.bomDetails);

						retData = await this.getHttp('MaterIalMachiningMachiningBegin',{content});
						this.comState.showLoading = true;

						this.timer = Timer.add(
							()=>{this.startTask(retData)},5000,0,true,
							()=>{
								this.alert('加工失败!');
								Timer.clear(this.timer);
								this.comState.showLoading = false;
							}
						);
					}
				},
				{
					name: '打印',
					style,
					className:'blue',
					fn:()=>{
						if(this.timer){
							this.alert('正在加工,请稍后!');
							return;
						}
						if(this.bomDetails.length == 0){
							this.alert('请先选择需要打印的BOM单!');
							return;
						}
						this.$router.push({path:'/admin/processMaterialPrint',query:this.$route.query});
					}
				},
				{
					name: this.template.id ? '修改模板' : '保存模板',
					className:'gray',
					style:Object.assign({'color':'#ff8d01','border':'1px solid #ff8d01'},line),
					fn:async ()=>{
						if(this.timer){
							this.alert('正在加工,请稍后!');
							return;
						}
						this.comState.showdialogAlert = true;
					}
				},
				{
					name: '添加加工BOM单',
					className:'gray',
					style:Object.assign({'color':'#29a8e0','border':'1px solid #29a8e0','padding':'0 15px'},line),
					fn:()=>{
						if(this.timer){
							this.alert('正在加工,请稍后!');
							return;
						}
						let arr = [...this.bomDetails,...this.pageObj.rest];
						this.comState.showAddBom = true;
						this.comState.addBom.list = arr;
					}
				},
				{
					name: '取消加工',
					className:'gray',
					style,
					fn:()=>{
						let obj = {path:''};
						if(this.route.from.path == '/admin/processTemplate'){
							obj.path = '/admin/processTemplate';
						}else{
							obj.path = '/admin/processHistory';							
						}
						this.$router.push({path:obj.path});
					}
				},

			]);			
		},
		initBomDetailsNum(material=[],template=[]){
			//通过BOM单详情与模板内容初始化bom单单位与数量
			for(let ele of material){
				for(let item of template){
					if(ele.id == item.bomId){
						ele.s_target = item.target;
						ele.s_materials = item.materials;
						break;
					}
				}
			}

			for(let ele of material){
				this.getMaterialUnitInfo(ele,'unit',ele.s_target.unitId);
				ele.produceNum = (ele.s_target.num / ele.selUnitVal)+'';							 //将最小单位换算成提交模板时选择的单位
				for(let item of ele.list){
					for(let e of ele.s_materials){
						if(item.mid == e.id){
							this.getMaterialUnitInfo(item,'unit',e.unitId);
							item.rawNum = (e.num / item.selUnitVal)+'';
							break;
						}
					}
				}
			}
			return [...material];
		},
		initBomDetail(list){
			//初始化单位信息
			for(let ele of list){
				ele.produceNum = '';										//产出数量									
				this.getMaterialUnitInfo(ele);
				if(Array.isArray(ele.list)){
					for(let item of ele.list){
						item.rawNum = '';								   //原料数量							   
						this.getMaterialUnitInfo(item,'unit');
					}
				}
			}
			return [...list];
		},
		asignDefUnitToSelUnit(ele,attr){
			//将默认单位赋值与选中单位
			ele[attr] = '';
			ele.selUnitVal = ele.defUnitVal;
			ele.selUnitId = ele.defUnitId;
			ele.selUnitName = ele.defUnitName;		  
		},
		getMaterialUnitInfo(ele,attr='unit',id){
			//获取物料的单位信息
			if(!Array.isArray(ele[attr])){
				ele[attr] = [];
			}
			for(let item of ele.unit){
				if(item.isMin == 1){
					ele.minUnitName = item.name;
					ele.minUnitId = item.muId;
				}
				if(item.isDefault == 1){
					ele.defUnitName = item.name;
					ele.defUnitId = item.muId;
					ele.defUnitVal = item.value;
				}
				if(id == item.muId){
					ele.selUnitName = item.name;
					ele.selUnitId = item.muId;
					ele.selUnitVal = item.value;
				}
			}
			if(!id){
				ele.selUnitId = ele.defUnitId;
				ele.selUnitName = ele.defUnitName;
				ele.selUnitVal = ele.defUnitVal;
			}
		},
		convertUnit(a,b){
			//换算单位使用
			let sum = 0;
			a = Number(a);
			b = Number(b);

			sum = a * b;
			sum = sum.toFixed(2);
			return sum;
		},
		checkForm(list){
			let tips = '';
			for(let ele of list){
				let produceNum = Number(ele.produceNum);
				if(!produceNum){
					tips = `请填写产出物料\t${ele.material}\t的产出数量!`;
					this.alert(tips);												
					return false;
				}
				for(let e of ele.list){
					let rawNum = Number(e.rawNum);
					if(!rawNum){
						tips = `请填写原料物料\t${e.material}\t的原料数量!`;
						this.alert(tips);												
						return false;
					}
					
				}
			}
			return true;
		},
		formatData(list){
			//换算成最小单位
			let arr = [];
			for(let ele of list){
				let produceNum = this.convertUnit(ele.produceNum,ele.selUnitVal);
				let obj = {
					bomId:ele.id,
					target:{
						id:ele.mid,
						num:produceNum,
						unitId:ele.selUnitId,
						wid:ele.wid,
						areaId:ele.areaId,
						mName : ele.material,		   // 物料名
						uName : ele.selUnitName,		// 单位名
						wName : ele.warehouse,		  //仓库名
						aName: ele.warehouseArea,	   //区域名						
					},
					materials:[]
				};
				for(let e of ele.list){
					let rawNum = this.convertUnit(e.rawNum,e.selUnitVal);
					let temp ={
						id:e.mid,
						num:rawNum,
						unitId:e.selUnitId,
						mName:e.material,
						uName:e.selUnitName
					};
					obj.materials.push(temp);
				}
				arr.push(obj);
			}
			return arr;
		},
		async getRestBomdetails(obj){
			//获取余下的BOM单
			if( this.pageObj.count > 0){
				//当还剩余未填写的BOM单时
				if(this.pageObj.flag){
					this.pageObj.total = Math.ceil(this.pageObj.count / this.pageObj.num);
					this.bomDetails = this.pageObj.rest.splice(0,this.MAXBOMNUM);
				}else{
					this.bomDetails = await this.getBomDetails();
				}   
			}else{
				this.$router.push({path:obj.path,query:obj.query});
			}
		},
		async getBomDetails(){
			//根据搜索条件获取bom单
			this.pageObj.currentPage += 1;
			let search = this.comState.addBom.search;
			let retData = null,
				ids = [],
				details = [];

			let sub = {
				page:this.pageObj.currentPage,
				num:this.pageObj.num,
				material:search.material,
				type:search.matType,
				cid:search.sortTwoId ? search.sortTwoId : search.sortOneId,				
			};
			retData = await this.getHttp('ProcessbomGetProcessList',sub);
			console.log(retData);
			if(!Array.isArray(retData.list)){
				retData.list = [];
			}   
			this.pageObj.count = retData.count;
			this.pageObj.total = retData.total;
			ids = this.getListAttr(retData.list,'id');								  //获取所有bom单id
			ids = ids.join(',');
			details = await this.getHttp('ProcessbomGetProcessBomDetailList',{id:ids});
			details = this.initBomDetail(details);
			return details;

		},
		calcStyle(len){
			//计算产料物料的居中
			console.log(len);
			let h = 0,
				height = 70;
			if(len > 1){
				h = len/2*height-(height/2);
			}
			return {'padding-top':h+'px','height':len*height+'px'};
		},
		alert(obj){
			let {content='',title='温馨提示',} = obj;
			if(typeof obj == 'string') content = obj;
			this.$alert(content,title,{
				confirmButtonText:'确定',
				closeOnPressEscape:true,
				closeOnClickModal:true,
				confirmButtonClass:'el-button--primary',
				callback:()=>{
					//
				}
			});
		},
		getListAttr(arr=[],attr='id'){
			//获取所有属性值
			let temp = arr.map((ele)=>{
				return ele[attr];
			});
			return temp;
		},
		isPrimitive(val){
			return typeof val == 'string' || typeof val == 'number';
		},
		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
		},
		initData(){
			//初始化操作人
			let userShop = storage.session('userShop');
			let {user={},currentShop={}} = userShop;
			this.template.userName = user.name;   
			this.isBrand = currentShop.ischain == 3;
			this.shopId = currentShop.id;
		},
		initCom(){
			this.comState.warehouse = {
				title:'修改仓库区域',
				wid:'',
				areaId:'',
				shopId:this.shopId,
				isBrand:this.isBrand,
				nowBom:{},				  //当前操作的bom单
			};

			let h = document.querySelector('.details_con');
			if(h){
				this.comState.loading.height = h.offsetHeight;
			}
		},
	},
	async mounted(){
		this.initData();
		this.initCom();
		let id = this.$route.query.id;
		if(this.isPrimitive(id)){
			await this.getTemplateDetail(id);
		}else{
			this.comState.showAddBom = true;
		}
		this.initBtn();   
		
		// let count = 6;
		// while(count>0){
		//	 count -= 1;
		//	 this.bomDetails.push(...this.bomDetails);
		// }
	},
	beforeRouteLeave(to,from,next){
		if(to.path == '/admin/processMaterialPrint'){
			storage.session('processBom',this.bomDetails);
		}
		next();
	},
	beforeRouteEnter(to,from,next){
		next((vm)=>{
			vm.route.from = from;
		});
	},
	components:{
		addBom:()=>
			import ( /*webpackChunkName: 'add_bom'*/ 'src/module/invoicing_system/process/add_bom'),
		warehouseWin:()=>
			import ( /*webpackChunkName: 'warehouse_win_enter'*/ 'src/module/invoicing_system/invoicing/warehouse_win_enter'),
	}
};	 
</script>
<style lang='less' scoped>
	@import url('../warehouse_manage/z_less.less');
	@tw:1436px;		 //表格的
	@lgb:2px solid #f7f7f7;
	@lg:#f7f7f7;
	@border:1px solid #d5d5d5;

	/*
	.input-div{
		border:@border;
		background-color: #fff;
		display: inline-block;
		vertical-align: middle;
		max-width:110px;
		.count-num{
			.whb(55%,38px);
			max-width: 70px;
			float:left;
			outline: none;
			padding:0 5px;
		}
		.unit{
			.whb(40px,38px);
			float:right;
			border-left:@border;
			text-align: center;
			line-height: 38px;
		}
	}
	*/
	.inline-middle{
		display: inline-block;
		vertical-align: middle;
	}
	.word{
		position: absolute;
		top:50%;
		margin:auto;
		transform: translate(0,-50%);
		padding:0 10px;
		word-break: break-all;
		display: inline-block;
		width: 100%;
		text-align: center;
	} 

	//加载动画
	.loading{
		height: 100%;
		width:100%;
	}
	//表格容器
	.container{
		border:1px solid #ccc;
		overflow-x: auto;
		max-width: 1438px;
	}



	.table{
		width: @tw;	 
		.table-thead{
			height:45px;
			padding-left:20px;
			.lfc(#333,45px,16px);
			.circle{
				display: inline-block;
				height:5px;
				width:5px;
				margin:0 7px;
				margin-top:-2px;
				vertical-align: middle;
				background-color: #333;
				border-radius:50%;
			}
			.list-num{
				color:@r;
				font-size:16px;
			}
			.reset{
				color:@b;
				font-size:16px;
				text-decoration: underline @b;
				margin-left:5px;
				cursor: pointer;
			}
		}
		.table-title{
			height:40px;
			background-color: #f2f2f2;
			li{
				list-style: none;
				float: left;
				height:100%;
				text-align: center;
				vertical-align: middle;
				.lfc(#333,40px,14px);
				.text-ellipsis;
			}
		}
		.table-body{
			border-bottom:2px solid #f7f7f7;
			&:after{
				.clear;
			}
			.body-left{
				width:62.5%;
				display: inline-block;
				.sum{
					width: 100%;
					display: inline-block;
					&:after{	
						.clear;
					}

					li{
						list-style: none;
						float: left;
						position: relative;
						.whb(20%,68px,none);
						.del-reset{
							font-size:16px;
							display: inline-block;
							vertical-align: middle;
							cursor: pointer;
						}
						.del{
							color:@r;
							padding-right:5%;
							.del-reset;
						}
						.line{
							border:1px solid #ccc;
							height:20px;
							.inline-middle;
						}
						.reset{
							.del-reset;
							padding-left:10%;
							color:@b;
						}
						.edit{
							display: inline-block;
							vertical-align: middle;
							.whb(34px,34px);
							cursor: pointer;
							background: url('../../../res/images/evret.jpg') no-repeat center;
						}
					}
				}
			}
			.body-right{
				border-left:@lgb;
				width:37.5%;
				.item{
					&:after{
						.clear;
					}
					border-bottom:@lgb;
					&>li{
						width:33.33%;
						height:68px;	  
						list-style: none;  
						float:left;
						position: relative;
					}
				}
				.item:last-child{
					border-bottom:none;
				}
			}
		}
		.empty{
			height:100px;
			text-align: center;
			.lfc(#999,100px,20px);
		}
	}
	
</style>