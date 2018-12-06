import http from 'src/manager/http';
import global from 'src/manager/global';
import storage from 'src/verdor/storage';
import gConfig from './goods_total_config';
import mConfig from './material_total_config'

export default {
    data(){
        return{
            valiDate:[
                {id:0,name:'月'},
                {id:1,name:'日'},
                {id:2,name:'年'},
			],
			isBrand:false,
			shopId:null,
        };
    },
    methods:{
        //初始时间
        initTime(){
            let start,end;
            end = new Date();
            start = end.getTime() - global.timeConst.ONEMONTH;
            start = new Date(start);
            return [start,end];
		},
        //初始化分页组件
		initPageObj(){
			this.pageObj = {
				total:0,				//总记录数
				pageSize:10,			//每页显示的记录数
				pagerCount:11,			//每页显示的按钮数
				currentPage:1,          //当前页
			};
        },
        //初始化条件
        initCondition(){
            this.condition = {
                time:[],                    //时间                
                operationType:[],           //操作类型
                goodsName:'',               //物料名称
                code:'',                    //物料简码
                operationUser:'',           //操作人
                category:[],                //分类
                wid:[],                     //仓库
            };
        },
        //获取操作类型
        async getOperationList(type){
            let operationList = [];
            let url = 'invoicing_getInventoryLogType';
            if(type == 'material') url = 'invoic_getType';

            operationList = await this.getHttp(url);
            this.operationList = this.changeOperationType(operationList);
		},
        //获取所有条件
        getSubmitData(){
            let obj = {},
                condition = this.condition;

            obj.type = condition.operationType;
            obj.name = condition.goodsName;
            obj.barCode = condition.code;
            obj.wid = condition.wid;
            obj.page = this.pageObj.currentPage;
            obj.size = this.pageObj.pageSize;
            obj.beginTime = 0;
            obj.endTime = 0;       
            obj.cid = '';
            obj.createUName = condition.operationUser;

            if(Array.isArray(condition.time) && condition.time.length > 0){
                let [start,end] = condition.time;
                start = start.getTime();
                end = end.getTime();
                obj.beginTime = parseInt(start / 1000);
                obj.endTime = parseInt(end / 1000);  
            }
            if(Array.isArray(condition.category) && condition.category.length > 0){
                obj.cid = condition.category[0];
                if(condition.category.length >= 2){
                    obj.cid = condition.category[1];                    
                }   
            }
            return obj;
		},
		initData() {
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
			this.isBrand = userData.currentShop.ischain == 3;              
		},
		async getWarehouseList(){
			let list = [],
				brand = [],
				shop = [];

			list =  await this.getHttp('warehouseList');
			if(!Array.isArray(list)) list = [];

			for(let ele of list){
				if(ele.shopId == 0){
					brand.push(ele);
				}else{
					shop.push(ele);					
				}
			}
			this.warehouseList = this.isBrand ? brand : shop;
			let attr =  this.isBrand ? 'brandId' : 'shopId';
			this.warehouseList = this.warehouseList.filter((ele)=>{
				return ele[attr] == this.shopId;
			});
		},
        //查看记录
        viewHistory(item){
			let config = this.tabFlag == 'goods' ? gConfig : mConfig;
			
            let temp = {};
            temp = this.getEle(config,item.type,'type');
            temp['historyClick'](this,item);
            console.log(temp);
        },
        //查看批次详情
        viewBatchDetail(item){
			let config = this.tabFlag == 'goods' ? gConfig : mConfig;
			
            let temp = {};
            temp = this.getEle(config,item.type,'type');
            temp['batchClick'](this,item);
            console.log(temp);
		},
        //是否可以查看批次详情
        canviewBatchDetail(item){
			let config = this.tabFlag == 'goods' ? gConfig : mConfig;
			
            let temp = null;
			temp = this.getAttr(config,item.type,'type','canViewBatch');
			if(typeof temp == 'function'){
				return !temp(item);
			}else{
				return !temp;				
			}
        },
        //是否可以查看记录
        canViewHistory(item){
			let config = this.tabFlag == 'goods' ? gConfig : mConfig;
			let temp = null;
			temp =  this.getAttr(config,item.type,'type','canViewHistory');
			if(typeof temp == 'function'){
				return !temp(item);
			}else{
				return !temp;				
			}
        },
		

		//计算数值
        calcNum(obj,attrs = []){
            let fixed = 2;
            for(let key of attrs){
                let num = Number(obj[key]);
                if(!num) num = 0;
                num = num.toFixed(fixed);
                obj[key] = num;
            }
        },
        //初始化对象的属性
        initObject(obj,attrs=[],val=0){
            for(let a of attrs){
                if(!obj[a]){
                    obj[a] = val;
                }
            }
        },
		//商品物料导航的切换
        navigateTo(navigate){
			if(navigate == 'goods'){
				this.$router.push({path:'/admin/totalLog/materialTotalLog',query:this.$route.query});
			}else{
				this.$router.push({path:'/admin/totalLog/',query:this.$route.query});				
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
		//获取日志类型字段
		changeOperationType(arr){
			if(!Array.isArray(arr)) arr = [];
			let temp = [] ;
			temp = arr.map((ele)=>{
				ele.id = ele.type;
				ele.name = ele.typeName;
				return ele;
			});
			return temp;
		},
		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
		},
		getAttr(...args){
			let [arr,val,attr='id',getAttr='name'] = args;
			// arr,val,attr='id'
			// let getAttr = 'name';
			if(!Array.isArray(arr)) arr = [];
			for(let ele of arr){
				if(ele[attr] == val) return ele[getAttr];
			}
		},
		getListAttrs(arr,attr='id'){
			if(!Array.isArray(arr)){
				arr = [];
			}
			let temp = [];
			temp = arr.map((ele)=>{
				return ele[attr]
			});
			return temp;
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
    },
    mounted(){

    }
}