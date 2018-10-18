<template>
	<!--
        @baichuan:曾伟福
        @file:盘库
    -->
	<div id="warehouse-count">
		<div class="head">
			<span>盘库</span>
			<div></div>
		</div>

		<div class="detail">
			<ul class="col">
				<li>物料名称 : {{materialInfo.name}}</li>
				<li>物料编码 : {{materialInfo.barCode}}</li>
				<li>品牌 : {{materialInfo.brandName}}</li>
				<li>保质期 : {{materialInfo.validity}}{{materialInfo.validityType}}</li>
			</ul>

			<ul class="col">
				<li>分类 :  
                    <template v-for="(a,ai) in materialInfo.cate">
                        {{a.name}}
                        <i :key="ai" v-if="ai != materialInfo.cate.length -1 ">&nbsp;,&nbsp;</i>
                    </template>					
				</li>
				<li>物料单位 :  
                    <template v-for="(a,ai) in materialInfo.unit">
                        {{a.name}}
                        <i :key="ai" v-if="ai != materialInfo.unit.length -1 ">&nbsp;,&nbsp;</i>
                    </template>					
				</li>
				<li>默认单位 :  {{unitInfo.defUnitName}}</li>
				<li>最小单位 :  {{unitInfo.minUnitName}}</li>
			</ul>

			<ul class="col">
				<li>备注:
					<el-input clearable v-model="condition.remark" placeholder="请输入备注,限40字以内" style="width:194px"></el-input>
				</li>
				<li>单位换算 :
                    <template v-for="(a,ai) in materialInfo.unit">
                        1{{a.name}}={{a.value}}{{unitInfo.minUnitName}}
                        <i :key="ai" v-if="ai != materialInfo.unit.length -1 ">&nbsp;;&nbsp;</i>
                    </template>					
				</li>
				<li>操作人 : {{otherInfo.opearUser}}</li>
			</ul>
		</div>

		<div class="search-div">
			<!-- <div class="in-block">
				更新日期:
				<el-date-picker
					v-model="condition.time"
					type="daterange"
					:editable="false"
					:unlink-panels="true"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					format="yyyy-MM-dd"
					>
				</el-date-picker>
			</div> -->

			<div class="in-block">
                <el-input clearable v-model="condition.code" placeholder="请输入批次编号" maxlength='30' style="width:194px"></el-input>
			</div>

			<div class="in-block">
                <el-input clearable v-model="condition.supplier" placeholder="请输入供应商" maxlength='30' style="width:194px"></el-input>
			</div>

			<div class="in-block" style="padding-left:10px;padding-right:10px;">
				<el-button type="primary" @click="filterReset('filter',null)">筛选</el-button>
				<el-button type="info" @click="filterReset('reset',null)">重置</el-button>
			</div>

			<div class="in-block">
                <el-select v-model="unitInfo.selUnitId"  placeholder="单位切换" @change="getChangeUnit">
                    <el-option
                    v-for="item in unitList"
                    :key="item.muId"
                    :label="item.name"
                    :value="item.muId">
                    </el-option>
                </el-select>
			</div>

		</div>

		<div class="table">
			<div class="table-head">
				批次列表
				<i class="circle"></i>共 <span class="num">{{pageObj.total}}</span> 个条目
			</div>
            <el-table :data="tableData" stripe border :header-cell-style="{'background-color':'#F5F7FA'}">
                <el-table-column prop="itemIndex" width="100px" label="序号">
                </el-table-column>

                <el-table-column prop="batchCode" width="150px" label="批次编码" >
                </el-table-column>

                <el-table-column prop="customSurplus" min-width="150px" label="现库存数量/重量" >
                </el-table-column>

                <el-table-column  min-width="300px" label="盘点数量/重量" >
					<template slot-scope="{row,column,index}">
						<div class="count-div">
							<el-input placeholder="请输入" clearable maxlength='10' v-model="row.maxNum" @change="()=>{checkNum(row,'maxNum')}">
								<template slot="append">{{unitInfo.selUnitName}}</template>
							</el-input>
						</div>
						<template v-if="unitInfo.selUnitName != unitInfo.minUnitName">
							+
							<div class="count-div">
								<el-input placeholder="请输入" clearable maxlength='10' v-model="row.minNum" @change="()=>{checkNum(row,'minNum')}">
									<template slot="append">{{unitInfo.minUnitName}}</template>
								</el-input>
							</div>
						</template>
						
					</template>	
                </el-table-column>

                <el-table-column prop="customCreateTime" width="150px" label="生产日期" >
                </el-table-column>

                <el-table-column prop="supplier" min-width="150px" label="供应商" >
                </el-table-column>

                <el-table-column  label="进价" width="150px">
					<template slot-scope="{row,column,index}">
						{{row.distributionPrice}}/{{row.distributionUnitName}}
					</template>	                    
                </el-table-column>

                <el-table-column  label="所属仓库" min-width="150px">
					<template slot-scope="{row,column,index}">
						{{row.wName}}/{{row.aName}}
					</template>	                    
                </el-table-column>


            </el-table>
		</div>

		<div class="footer">
			<el-pagination
				:pager-count="pageObj.pagerCount"
				:page-size="pageObj.pageSize"
				layout="total,sizes,prev, pager, next,jumper"
				:background="true"
				:total="pageObj.total"
                :current-page.sync="pageObj.currentPage"
				@size-change="(res)=>{funGetPage('size-change',res)}"
				@current-change="(res)=>{funGetPage('current-change',res)}"
			>
			</el-pagination>
		</div>


	</div>
</template>
<script>
	/*
		请求:
			盘点数量: GoodsinventorySetInventory
			获取物料批次:InvoicingGetMaterialBatch
			获取物料详情:MaterialGetMaterialDetail

	*/
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				validate:[
					{id: 0,name: '月'},
					{id: 1,name: '日'},
					{id: 2,name: '年'},
				],
				pageObj:{},
				placeholder:'--',

				condition:{},

				unitList:[],
				batchList:[],
				nowList:[],
				tableData:[],

				materialInfo:{
				},
				unitInfo:{},
				otherInfo:{
					opearUser:'',
				},

				mid:'',

			};
		},
		methods: {
			filterReset(flag,page){
				if(flag == 'reset'){
					this.initPageObj();
					this.initCondition();
				}else{
					this.pageObj.currentPage = page || 1;
				}

				this.nowList = this.searchMaterBatch(this.batchList);
				this.pageObj.total = this.nowList.length;

				this.nowList = this.initTableData(this.nowList);
				this.tableData = this.slicePage(this.nowList,this.pageObj.currentPage,this.pageObj.pageSize);
			},
			funGetPage(flag,res){
				//获取页码值
				if(flag == 'size-change'){
					this.pageObj.pageSize = res;				
				}else{
					this.pageObj.currentPage = res;
				}
				this.tableData = this.slicePage(this.nowList,this.pageObj.currentPage,this.pageObj.pageSize);
			},


			initTableData(list){
				let unitInfo = this.unitInfo;
				let temp = list.map((ele,index)=>{
					let temp = '';
					//序号
					index += 1;
					ele.itemIndex = index > 9 ? index : '0'+index;

					//现库存数量/重量
					ele.surplus = Number(ele.surplus);
					ele.customSurplus = global.comUnit(ele.surplus, unitInfo.selUnitVal, unitInfo.selUnitName, unitInfo.minUnitName);

					//盘点数量
					ele.maxNum = '';
					ele.minNum = '';

					return ele;
				});
				return temp;
			},
			searchMaterBatch(list){
				let {start,end,code,supplier} = this.getConditionData();

				let temp = this.searchBatchByWord(list,code,'batchCode');
				temp = this.searchBatchByWord(temp,supplier,'supplier');

				return temp;
			},
			searchBatchByTime(...args){
				let [list,start,end,attr='updateTime'] = args;
				let temp = list.filter((ele)=>{
					let time = ele[attr]+'';
					if(time.length == 10) time *= 1000;
					time = Number(time);
					if(start <= time && time < end){
						return true;
					}
				});
				return temp;				
			},
			searchBatchByWord(list,val,attr){
				val += '';
				val = val.trim();
				if(!val) return list;
				let temp = list.filter((ele)=>{
					return ele[attr].includes(val);
				});
				return temp;
			},
			getConditionData(){
				let cond = this.condition,
					start,
					end;

				if(Array.isArray(cond.time) && cond.time.length >= 2){
					[start,end] = cond.time;
					start = start.getTime();
					end = end.getTime();
				}else{
					start = 0;
					end = Date.now();
				}
				return {
					start,
					end,
					code:cond.code,
					supplier:cond.supplier
				};
			},


			checkNum(item,attr){
				let num = item[attr]+'',
					reg = /([1-9]\d{0,9}|0)(\.?\d{0,2})?/,
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
				}
				temp[0] += '';
				item[attr] = temp[0];
			},
			getChangeUnit(unit){
				let temp = this.getEle(this.unitList,unit,'muId');
				let unitInfo = this.unitInfo;

				unitInfo.selUnitId = temp.muId;
				unitInfo.selUnitName = temp.name;
				unitInfo.selUnitVal = temp.value;

				this.nowList = this.nowList.map((ele)=>{
					ele.customSurplus = global.comUnit(ele.surplus, unitInfo.selUnitVal, unitInfo.selUnitName, unitInfo.minUnitName);
					ele.maxNum = '';
					ele.minNum = '';
					return ele;					
				});
			},




			async getMaterialDetail(){
				let info = await this.getHttp('MaterialGetMaterialDetail',{mid:this.mid});
				if(this.toRaw(info,'Object')){
					info.validityType = this.getEle(this.validate,info.validityType,'id').name;
					this.materialInfo = info;
				}
			},
			async getMaterialBatch(){
				let retData = await this.getHttp('InvoicingGetMaterialBatch',{mid:this.mid});
				if(this.toRaw(retData,'Object')){
					let {list=[],relation=[]} = retData;
					let unitInfo = {};

					this.unitList = relation;
					unitInfo = this.getMaterialUnitInfo(this.unitList,null);	
					
					list = list.map((ele,index)=>{

						let temp = '';

						//盘点数量
						ele.maxNum = '';
						ele.minNum = '';

						//生产日期
						ele.customCreateTime = this.generatorDate(ele.productionTime * 1000).dateTime;

						//分销价单位名
						ele.distributionUnitName = this.getEle(this.unitList,ele.distributionUnit,'muId').name;

						//batchCode,supplier,distributionPrice,distributionUnitName,aName,wName
						temp = 'batchCode,supplier,distributionPrice,distributionUnitName,aName,wName'.split(',');
						this.initObjAttr(ele,temp,this.placeholder);

						return ele;
					});

					this.unitInfo = unitInfo;
					this.batchList = list;									
				}
			},


			formatData(list){
				let obj = {new:[],old:[]},
					unitInfo = this.unitInfo;

				for(let ele of list){
					if(ele.maxNum == undefined) ele.maxNum = '';
					if(ele.minNum == undefined) ele.minNum = '';

					if(ele.maxNum === '' && ele.minNum === ''){
						continue;
					}
					let maxNum = Number(ele.maxNum);
					let minNum = Number(ele.minNum);
					let temp = {};
					let sum = 0;
					sum = maxNum * unitInfo.selUnitVal + minNum;
					sum = sum.toFixed(3);

					temp = {
						batchId: ele.batchId,
						wid: ele.wid,
						areaId: ele.areaId,
						surplus: sum,						
					};
					if(sum == ele.surplus){
						obj.old.push(temp);
					}else{
						obj.new.push(temp);						
					}
				}
				return obj;
			},
			async submitData(data){
				let retData = await this.getHttp('GoodsinventorySetInventory',{
					data,
					mid:this.mid,
					remark:this.condition.remark
				});	
				if(retData.res){
					this.alert('盘库成功!');
					await this.getMaterialBatch();
					this.filterReset('reset',1);
				}else{
					this.alert('盘库失败!');					
				}
							
			},


			initBtn() {
				storage.session('tabactive', 1);
				storage.session('publicDetailReturn', true);
				this.$store.commit('setPageTools',[
					{
						name: '取消',
						type:'5',
						className:'plain',
						fn:()=>{
							this.$router.go(-1);
						}
					},
					{
						name: '确认',
						type:'4',
						className:'primary',
						fn:()=>{
							let obj = {},
								retData = {};

							obj = this.formatData(this.nowList);
							if(obj.new.length == 0 && obj.old.length == 0){
								this.alert('请先盘点数量');
								return;
							}
							if(obj.new.length == 0 && obj.old.length > 0){
								this.$confirm('确认盘库?', '提示信息', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
								}).then(()=>{
									this.alert('盘库成功!');
									this.getMaterialBatch().then(()=>{
										this.filterReset('reset',1);
									});
								}).catch(()=>{});
								return;
							}

							this.$confirm('确认盘库?', '提示信息', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
							}).then(()=>{
								this.submitData(obj.new);
							}).catch(()=>{});
						}
					},
				]);
			},
			initData() {
				let userDate = storage.session('userShop');
				this.otherInfo.opearUser = userDate.user.name;

			},
			initCondition(){
				this.condition = {
					time:this.getTimeDate(),
					supplier:'',
					code:'',
					remark:'',
				};
				
			},
			initPageObj(){
				this.pageObj = {
					total:0,				//总记录数
					pageSize:10,			//每页显示的记录数
					pagerCount:11,			//每页显示的按钮数
					currentPage:1,          //当前页
				};
			},



			alert(content,title='提示信息',fn){
				this.$alert(content, title, {
					confirmButtonText: '确定',
					callback: action => {
						if(action == 'confirm' && typeof fn == 'function') fn();
					}
				});
			},
			initObjAttr(ele,attrs,str){
				for(let attr of attrs){
					if(!ele[attr]) ele[attr] = str;
				}
			},
			generatorDate(time){
				//生成日期对象
				let date = {};
				if(!time){
					time = new Date();
				}else if(typeof time == 'number' || typeof time == 'string'){
					time = Number(time);
					time = new Date(time);
				}
				date = {
					year: time.getFullYear(),
					month: time.getMonth(),
					day: time.getDate(),
					hour: time.getHours(),
					minute: time.getMinutes(),
					second:time.getSeconds(),
					week:0,
					str:'',
					time:'',
					dateTime:'',          
				}
				let {year,month,day,hour,minute} = date;
				month += 1;
				hour = hour > 9 ? hour : '0'+hour;
				minute = minute > 9 ? minute : '0'+minute;
				date.time = `${hour}:${minute}`;
				date.dateTime = `${year}-${month}-${day}`;
				date.str = `${year}-${month}-${day} ${hour}:${minute}`;
				return date;
			},
			getMaterialUnitInfo(unitList,id){
				//获取物料的单位信息
				if(!Array.isArray(unitList)){
					unitList = [];
				}
				let obj = {};
				for(let item of unitList){
					if(item.isMin == 1){
						obj.minUnitName = item.name;
						obj.minUnitId = item.muId;
					}
					if(item.isDefault == 1){
						obj.defUnitName = item.name;
						obj.defUnitId = item.muId;
						obj.defUnitVal = item.value;
					}
					if(id == item.muId){
						obj.selUnitName = item.name;
						obj.selUnitId = item.muId;
						obj.selUnitVal = item.value;
					}
				}

				if(!id){
					obj.selUnitId = obj.defUnitId;
					obj.selUnitName = obj.defUnitName;
					obj.selUnitVal = obj.defUnitVal;
				}
				return obj;			
			},
			toRaw(obj,type){
				return Object.prototype.toString.call(obj).slice(8,-1) === type;
			},
			async getHttp(url,obj={}){
				let res = await http[url]({data:obj});
				return res;
			},
			slicePage(list, page, num) {
				page = Number(page);
				num = Number(num);
				let startIndex = (page - 1) * num;
				let endIndex = page * num;
				return list.slice(startIndex, endIndex);
			},
			getEle(arr,val,attr){
				let temp = {};
				for(let ele of arr){
					if(ele[attr] == val){
						temp = ele;
						break;
					}
				}
				return temp;
			},
			getAttr(...args){
				let [arr,val,attr='id',getAttr='name'] = args;
				if(!Array.isArray(arr)) arr = [];
				for(let ele of arr){
					if(ele[attr] == val) return ele[getAttr];
				}
			},
			getTimeDate(){
				let start,end;
				end = new Date();
				start = end.getTime() - global.timeConst.ONEMONTH;
				start = new Date(start);
				return [start,end];
			},
		},
		async mounted() {
			this.initBtn();
			this.initData();
			this.initPageObj();
			this.initCondition();

			this.mid = Number(this.$route.query.id);
			if(typeof this.mid == 'number'){
				this.getMaterialDetail();
				await this.getMaterialBatch();
				this.filterReset('filter',1);
			}
		},

	};
</script>
<style lang='less' scoped>
@import url('./z_less.less');
	.head{
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		max-width: 1436px;
		span{
			height:23px;
			line-height: 23px;
			font-size: 16px; 
			border-left:2px solid @ey;
			padding-left:10px;
			padding-right:5px;
			flex-grow: 0;			
		}
		div{
			flex-grow: 1;
			border-bottom:2px dashed #ddd;
			height:13px;
		}
	}
	li{
		list-style: none;
	}
	.fc(@size:14px,@color:#606266){
		font-size:@size;
		color:@color;
	}
	.in-block{
		margin-bottom:20px;
		display: inline-block;             
	}
	.inline-middle{
		display: inline-block;
		vertical-align: middle;
		text-align: center;
	}

	.count-div{
		display: inline-block;
		width:130px;
	}

	.detail{
		display: flex;
		flex-flow: row wrap;
		.col{
			padding: 20px 50px;
			min-width: 210px;
			width:33%;
			li{
				margin-bottom:20px;
				.fc;
			}
		}
	}
	.table{
		@table-border:1px solid #ebeef5;
		max-width: 1436px;
		border:@table-border;
		border-bottom:none;
		border-radius:4px;
		.table-head{
			height:40px;
			padding-left:20px;
			.lfc(#333,40px,16px);
			.circle{
				.inline-middle;
				.whb(5px,5px,none);
				background-color: #666;
				border-radius: 50%;
				margin: 0 5px;
			}
			.num{
				color:@r;
				font-size:16px;
			}
		}
	}
	.footer{
		padding-top:30px;
	}

</style>