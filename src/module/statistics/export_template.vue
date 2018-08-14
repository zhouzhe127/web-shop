<template>
	<div id="export-template">
		<div class="head">
			导出
		</div>
		<div class="body">
			<div class="body-title">
				已选择  {{selectTemp.name}} 
				<span v-if="selectTemp.name" class="edit" @click="addDelete('edit',null,null)">
					<img src="../../res/images/gray-revise.png" alt="">
				</span> 
			</div>

			<div class="template-list">
				<li :class="{'bgdark':item.id==selectTemp.id,'list':true}" v-for="(item,index) in tempList" :key="index"  @click.stop="addDelete('select',item,index)">
					<div class="word text-ellipsis">{{item.name}}</div>
					<i class="delete" v-show="item.id==selectTemp.id" @click.stop="addDelete('delete',item,index)">×</i>
				</li>

				<span class="add-template fl" @click="addDelete('add',null,null)">
					<img src="../../res/images/gray-add.png" alt="">
					新建模板
				</span>
			</div>

			<div class="template-content">
				<div class="content-title">选择要导出的数据:</div>
				<div class="list-container" v-if="configList.length>0">
					<li v-for="(item,index) in configList" @click="changeSelect(item,index)" :class="{'item':true, 'select-item':item.must == 1 || item.isSelect,'sign':item.isSelect}"  :key="index">{{item.name}}</li>
				</div>
				<div class="data-bottom">
					<span @click="opeartionAll('cancel')" :class="{'select-item':selectFlag == 1}">取消全部</span>
					<span @click="opeartionAll('all')" :class="{'select-item':selectFlag ==2 }">选择全部</span>
					<i>已选择&nbsp;:&nbsp;{{selectList.sum}}个</i>
				</div>
			</div>
		</div>

		<div class="footer">
			<div class="gray cancel" @click="saveCancel('cancel')">取消</div>
			<div class="save" @click="saveCancel('save')">保存模板</div>
			<div class="yellow sure" @click="saveCancel('export')">确认导出</div>
		</div>
		<component
			:is="showCom"
			:pObj="comObj"
			@throwCommonWin="closeCommonWin"
		></component>
	</div>
</template>
<script>
/*
	请求:
		InvoicingstatGetTemplateConfig:		//导出配置文件
		InvoicingstatGetTemplates:			//获取导出模板列表
		InvoicingstatGetTemplate:			//获取单个模板内容
		InvoicingstatAddTemplate:			//新建模板
		InvoicingstatDeleteTemplate:		//删除模板
		InvoicingstatEditTemplate:			//编辑模板
		InvoicingstatExportInventoryStat:	//导出模板
		invoicing_taskInfo:					//获取轮训任务状态
		InvoicingstatGetExportInventoryStat://获取导出文件名

*/
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import Timer from 'src/verdor/timer';
import exportFile from 'src/verdor/exportFile';

export default {
	data () {
		return {
			showCom:'',
			comObj:{},
			selectFlag:0,			//1:取消全部,2:选择全部	

			uploadUrl:'',			//上传地址
			token:'',
			userName:'',			//操作人姓名
			selectList:{sum:0,isSelect:[],must:[]},			//选中的对象			
			count:-1,				//新建模板计数器

			tempList:[],			//模板列表
			configList:[],			//配置数据
			selectTemp:{
				name:'',
				oldName:'',
				content:[],
				oldContent:[]
			},						//选择的模板
			timer:null,				//定时器
			retData:{},				//请求接口的返回值

		};
	},
	methods: {

		async saveCancel(flag){
			let subObj = {},
				retData = {},
				temp = {},
				arr = [],
				obj = {},
				tips = '';
			switch(flag){
				case 'save':
					if(this.tempList.length == 0 ){
						this.alert('请先建模板!');
						return;
					}
					if(!this.checkSelectTemp(true)){
						this.alert('模板保存成功!');
						return;
					}
					this.submitTemplate(this.selectTemp.id,this.selectTemp.name);
					break;
				case 'export':

					if(this.checkSelectTemp(true)){
						tips = this.getOperationTips();
						this.alert(tips);
						return ;
					}

					if(this.retData.taskId){
						this.alert('正在导出,请稍后...');
						return;
					}

					temp = storage.session('single_stockstatics');
					if(!temp || temp.flag){
						this.alert('当前没有可导出数据');
						return;
					}

					obj = this.getAttrsVal(this.selectList.isSelect,'id');
					arr = this.getAttrsVal(this.selectList.must,'id');
					arr = arr.concat(obj);
					subObj = {
						shopId:temp.shopId,
						beginTime:parseInt(temp.beginTime/1000),
						endTime:parseInt(temp.endTime/1000),
						isMerge:temp.isMerge,
						shopIds:temp.shopIds,
						templateIds:arr.join(','),
						templateName:this.selectTemp.name
					};
					retData = await this.getHttp('InvoicingstatExportInventoryStat',subObj);
					this.retData = retData;
					this.alert('正在导出,请稍后...',null,true);
					this.timer = Timer.add(
						()=>{this.exportTemplate({taskId:retData.taskId})},
						5000,
						0,
						true,
						()=>{
							this.alert('导出失败');
							Timer.clear(this.timer);
						}
					);
					break;
				case 'cancel':
					this.$router.go(-1);
					break;
			}
		},
		async exportTemplate(obj){
			let retData = {},
				temp = {};
			try{
				retData = await http['invoicing_taskInfo']({data:obj},true);
			}catch(e){
				Timer.clear(this.timer);
				this.alert('导出失败,请重新导出!');
				return;
			}
			switch(retData.status){
				case '1'://进行中
					break;
				case '2'://失败
					this.alert('导出失败,请重新导出!');
					this.retData = {};
					Timer.clear(this.timer);
					break;
				case '3'://成功
					Timer.clear(this.timer);
					try{
						temp = await http['InvoicingstatGetExportInventoryStat']({data:{taskId:this.retData.taskId}},true);
						this.alert('导出成功!');						
					}catch(e){
						this.alert('导出失败,请重新导出!');
						return;
					}
					exportFile({
						url:this.uploadUrl+temp.fileName,
						data:{
							token:this.token,
							shopId:this.shopId
						}
					});
					this.retData = {};					
					break;
			}
		},
		addDelete(flag,item,index){
			let tips = '';
			switch(flag){
				case 'add'://打开模板弹窗
					if(this.checkSelectTemp(true)){
						tips = this.getOperationTips();
						this.alert(tips);
						return;
					}
					this.selectTemp.flag = 'add';
					this.openTemplateWin({title:'新建模板',name:''});
					break;
				case 'edit'://编辑模板
					this.selectTemp.flag = 'edit';
					this.openTemplateWin({title:'修改模板',name:this.selectTemp.name});
					break;
				case 'delete'://删除模
					this.alert('确认删除该模板?',(res)=>{
						if(res == 'ok'){
							if(item.id > 0){
								this.getHttp('InvoicingstatDeleteTemplate',{id:item.id}).then((result)=>{
									if(result === false){
										this.alert('删除失败');
									}else if(result === true){
										this.deleteTemp(index);
									}
								});
							}else{
								this.deleteTemp(index);
							}
						}
					});
					break;
				case 'select'://模板的切换
					if(item.id == this.selectTemp.id){
						this.selectTemp = {
							name:'',
							oldName:'',
							content:[],
							oldContent:[]							
						};
						this.selectList = this.getSelectItem(this.configList);
						item.content = this.getAttrsVal(this.selectList.isSelect);

						this.configList = this.initSelect(this.configList,[]);
						this.selectList = this.getSelectItem(this.configList);

						this.tempList.splice(index,1,item);
						return;
					}
					if(this.checkSelectTemp(true)){
						this.saveOrDeleteTemplate(item);
					}else{
						this.changeSelectTemp(item);
					}
					break;
			}
		},

		async closeCommonWin(result,flag){
			let id;		
			switch(this.showCom){
				case 'templateWin':
					if(flag == 'ok'){
						result.name = result.name.trim();
						if(!result.name){
							this.alert('请输入模板名称!');
							return;
						}
						if(result.name.length>20){
							this.alert('模板名称由1-20个字符组成!');
							return;
						}

						if(this.selectTemp.flag == 'add'){
							id = null;
						}else if(this.selectTemp.flag == 'edit'){
							id = this.selectTemp.id;
						}
						this.addEditTempName(result.name,id);
					}
					this.selectTemp.flag = null;
					break;
			}
			this.showCom = '';
		},
		async submitTemplate(id,name){
			let	subObj = {},
				retData = {},
				httpStr = 'InvoicingstatAddTemplate',
				successTips = '模板新建成功!',
				userName = this.userName;
			
			if(Number(id) > 0){
				subObj.id = id;
				httpStr = 'InvoicingstatEditTemplate';
				successTips = '模板编辑成功!';	
			}

			subObj.name= name;
			subObj.userName = userName;
			subObj.selectedIds = this.getAttrsVal(this.selectList.isSelect,'id');

			retData = await this.getHttp(httpStr,subObj);

			this.tempList = this.tempList.map((ele)=>{
				if(ele.id == id){
					ele.name = subObj.name;
					ele.oldName = subObj.name;
					ele.content = subObj.selectedIds;
					ele.oldContent = [...subObj.selectedIds];
					ele.id = id > 0 ? subObj.id : retData;
					this.selectTemp = utils.deepCopy(ele); 
				}
				return ele;
			});
			this.alert(successTips);
		},
		saveOrDeleteTemplate(item){
			//保存或取消
			let {name,id} = this.selectTemp;
			let tips = this.getOperationTips(true);
			this.alert(tips,(res)=>{
				if(res == 'ok'){
					this.submitTemplate(id,name).then(()=>{
						this.changeSelectTemp(item);
					});
				}else{
					//回退
					if(id > 0){
						this.tempList = this.tempList.map((ele)=>{
							if(ele.id == this.selectTemp.id){
								ele.name = ele.oldName;
								ele.content = ele.oldContent;
							}
							return ele;
						});
					}else{
						this.tempList = this.tempList.filter((ele)=>{
							return (ele.id != id);
						});
					}
					this.changeSelectTemp(item);
				}
			});
		},
		changeSelectTemp(item){
			//切换选中的模板
			if(!item) return;
			this.selectTemp = utils.deepCopy(item);
			this.configList = this.initSelect(this.configList,this.selectTemp.content,'id');
			this.selectList = this.getSelectItem(this.configList);
		},
		addEditTempName(name,id){
			//根据模板id修改模板名字
			let temp = {};
			if(id){
				this.tempList = this.tempList.map((ele)=>{
					if(ele.id == id){
						ele.name = name;
						temp = ele;
					}
					return ele;
				});
			}else{
				if(this.tempList.length > 0){
					this.configList = this.initSelect(this.configList);
				}
				this.count -= 1;
				temp = {
					id:this.count,
					content:[],
					oldContent:[],
					name,
					oldName:'',
				};
				this.tempList.push(temp);
				this.selectList= this.getSelectItem(this.configList);
			}
			this.selectTemp = utils.deepCopy(temp);
		},
		deleteTemp(index){
			this.tempList.splice(index,1);
			if(index > this.tempList.length-1){
				index = this.tempList.length-1;
			}
			if(this.tempList[index]){
				this.changeSelectTemp(this.tempList[index]);
			}else{
				this.selectTemp = {
					name:'',
					oldName:'',
					content:[],
					oldContent:[]
				};
				this.configList = this.initSelect(this.configList,[]);
			}		
		},
		openTemplateWin(temp={}){
			let obj = {
				title: '新建模板',
				tagName: '模板名称',
				name: '',
				len: 20,
				tips: '请输入模板名称',
				btnOk: {
					content: '确认',
					style: 'backgroundColor:#f8931f'
				},
				btnCancel: {
					content: '取消',
					style: 'backgroundColor:#a0a0a0'
				},
				win:'templateWin'
			};
			Object.assign(obj,temp);
			this.comObj = obj;
			this.showCom = 'templateWin';
		},
		checkSelectTemp(flag){
			//校验当前选中的要导出数据是否与原先的一样,不一样返回true
			let dirty = false,
				arr = [],
				arr2 = [];
			if(this.selectTemp.name != this.selectTemp.oldName){
				dirty = true;
			}
			if(!this.selectTemp.name && !this.selectTemp.oldName){
				return dirty;
			}
			if(flag){
				arr = this.fnSort(this.selectTemp.oldContent);
				arr2 = this.getAttrsVal(this.selectList.isSelect,'id');
				arr2 = this.fnSort(arr2);
				if(arr.length != arr2.length){
					dirty = true;
				}else{
					for(let i = 0,len = arr.length;i<len;i+=1){
						if(arr[i] != arr2[i]){
							dirty = true;
							break;
						}
					}
				}
			}
			return dirty;
		},
		getOperationTips(flag){
			//获取提示信息
			let {id,name,tips} = this.selectTemp;
			if(flag){
				tips = id > 0 ? `${name} 模板已修改,是否保存?` : `${name} 模板已新建,是否保存?`;
			}else{
				tips = id > 0 ? `${name} 模板已修改,请先保存!` : `${name} 模板已新建,请先保存!`;
			}
			return tips;
		},


		//导出数据的选中
		changeSelect(item,index){
			if(item.must == 1){
				this.alert('该导出数据为必选数据!');
				return;
			} 
			item.isSelect = !item.isSelect; 
			this.configList.splice(index,1,item);
			this.selectList = this.getSelectItem(this.configList);
		},
		opeartionAll(flag){
			this.selectFlag = 1;
			let selectList = [];

			if(flag == 'all'){
				this.selectFlag = 2;
				selectList = this.getAttrsVal(this.configList,'id');				
			}
			this.configList = this.initSelect(this.configList,selectList,'id');
			this.selectList = this.getSelectItem(this.configList);
		},

		getSelectItem(list){
			let obj = {must:[],isSelect:[],sum:0};
			for(let ele of list){
				if(ele.must == 1){
					obj.must.push(ele);
				}else if(ele.isSelect){
					obj.isSelect.push(ele);
				}
			}
			obj.sum = obj.must.length + obj.isSelect.length;
			return obj;
		},
		fnSort(list){
			let arr = list.sort((x,y)=>{
				return Number(x) - Number(y);
			});
			return arr;
		},
		initSelect(list=[],arr=[],attr='id'){
			let ids = arr;
			if(ids[0] && typeof ids[0] == 'object'){
				ids = this.getAttrsVal(ids,attr);
			}
			if(ids.length == 0) ids[0] = null;
			for(let ele of list){
				for(let e of ids){
					if(ele.must == 1 ){
						break;
					}
					if(ele[attr] == e){
						ele.isSelect = true;
						break;
					}else{
						ele.isSelect = false;
					}
				}
			}
			return [...list];
		},
		getAttrsVal(list,attr='id'){
			let arr = list.map((ele)=>{
				return ele[attr];
			});
			return arr;
		},
		alert(content,fn=null,maskShow=false){
			let obj = {
				content,
				title:'温馨提示',
			};
			if(typeof fn == 'function'){
				obj.callback = (res)=>{
					fn(res);
				};
				obj.winType = 'confirm';
			}
			if(maskShow){
				obj.maskShow = false;
			}
			this.$store.commit('setWin',obj);
		},
		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
		},
		initData(){
			let userData = storage.session('userShop');
			this.userName = userData.user.name;
			this.shopId = userData.currentShop.id;
			this.uploadUrl = userData.uploadUrl;
			this.token = userData.accessToken;
		},
	},
	async mounted(){
		let retData = {},
			res = {};

		this.initData();

		retData = await this.getHttp('InvoicingstatGetTemplateConfig');
		if(Array.isArray(retData)){			
			this.configList = retData;
		}

		res = await this.getHttp('InvoicingstatGetTemplates');
		if(Array.isArray(res)){
			this.tempList = res;
			for(let ele of this.tempList){
				ele.content = JSON.parse(ele.content);
				ele.oldContent = [...ele.content];
				ele.oldName = ele.name;
			}
			this.selectList = this.getSelectItem(this.configList);
		}
	},
	beforeRouteLeave(to,from,next){
		let {id,name} = this.selectTemp;
		if(this.checkSelectTemp(true)){
			let tips = this.getOperationTips(true);
			this.alert(tips,(res)=>{
				if(res == 'ok'){
					this.submitTemplate(id,name).then(()=>{
						next(true);
					});
				}else{
					next(true);
				}
			});
		}else{
			next(true);
		}
	},
	beforeDestroy(){
		storage.session('single_stockstatics',null);
	},
	components: {
		templateWin:
			() =>import( /*webpackChunkName:'unit_edit_create_win'*/ 'src/module/invoicing_system/warehouse_manage/unit_edit_create_win'),
	},
};
</script>
<style lang='less' scoped>
@y:#ff8d01;
@b:#29a8e0;
@r:#ff3d04;
.whb(@width:200px,@height:40px,@border:none){
    width:@width;
    height:@height;
    border:@border;
}
.lfc(@color:#333,@lh:38px,@size:14px){
    line-height: @lh;
    color:@color;
    font-size:@size;
}
.split-div(@w:483px){
    height:23px;
    border-left:2px solid @b;
    padding-left:10px;
    .lfc(#333,23px,16px);
    &:after{
        content:"";
        display:inline-block;
        .whb(@w,5px);
        border-top:2px dashed #ccc;
        margin-left:5px;
    }
}
//清除浮动
.clear{
    content:"";
    display: block;
    line-height: 0;
    visibility: hidden;
    clear: both;
}
//省略显示
.text-ellipsis{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.btn(@w:100px,@h:40px,@f:16px,@c:#fff,@b:none){
    .whb(@w,@h);
    .lfc(@c,@h,@f);
    display:inline-block;
    text-align: center;
    margin-right:10px;
    border:@b;
    cursor: pointer;
}
#export-template{
	.select-item{
		color:@y !important;
		border:1px solid @y !important;
	}
	.head{
		.split-div(538px);
	}
	.body{
		padding-left:20px;
		.body-title{
			color: #333;
			font-size:14px;
			padding-top:30px;
			padding-bottom:20px;
			img{
				vertical-align: sub;
				margin-left: 15px;
				cursor: pointer;
			}
		}
		.template-list{
			max-width: 870px;
			&:after{
				.clear;
			}
			.template-common{
				min-width: 100px;
				padding:0 10px;
				.lfc(#333,40px,14px);
				text-align: center;
			};
			.list{
				.template-common;
				color:#333;
				float:left;
				list-style: none;
				margin-right: 10px;
				margin-bottom:10px;
				cursor: pointer;
				background-color: #f2f2f2;
				.word{
					.whb(80px,100%);
				}
				.delete{
					float:right;
					margin-top:-50px;
					margin-right: -20px;
					.whb(20px,20px);
					.lfc(#fff,20px,15px);
					background-color: @r;
					text-align: center;
					border-radius: 50%;
				}
			}
			.bgdark{
				background-color: #b3b3b3;
			}
			.add-template{
				.template-common;
				display:inline-block;
				background-color: #f2f2f2;
				cursor: pointer;
				img{
					float:left;
					margin-top:12px;
				}
			}
		}
		.template-content{
			border:1px solid #b3b3b3;
			max-width: 870px;
			min-height:414px;
			padding:25px;
			position: relative;
			.content-title{
				padding-bottom:15px;
			}
			.list-container{
				padding-bottom:50px;
				&:after{
					.clear;
				}
			}
			.item{
				list-style: none;
				min-width: 150px;
				height:40px;
				text-align: center;
				.lfc(#333,38px,14px;);
				border:1px solid #ccc;
				float: left;
				cursor: pointer;
				margin-right:10px;
				margin-bottom:10px;
			}
			.data-bottom{
				padding-bottom:20px;
				position: absolute;
				width:calc(~"100% - 50px");
				bottom:0;
				span{
					.whb(80px,26px,1px solid #b3b3b3);
					text-align: center;
					.lfc(#9fa0a0,24px,14px);
					display: inline-block;
					margin-right: 10px;
					cursor: pointer;
				}
				i{
					color:@y;
					float:right;
					line-height: 26px;
				}
			}
		}
	}
	.footer{
		padding-left:20px;
		padding-top:50px;
		div{
			.btn(200px,50px,@f:16px,#fff,none)
		}
		.save{
			.select-item;
		}
	}
}

</style>