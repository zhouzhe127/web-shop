import http from 'src/manager/http';

export default {
    data(){
        return{

        };
    },
    methods:{
		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
		},
		getAttr(arr,val,attr='id'){
			let getAttr = 'name';
			if(!Array.isArray(arr)) arr = [];
			for(let ele of arr){
				if(ele[attr] == val) return ele[getAttr];
			}
		},
		//时间对象转时间戳
        getTimestamp(res){
        },
		//商品物料导航的切换
        navigateTo(navigate){
			if(navigate == 'goods'){
				this.$router.push({path:'/admin/materialTotalLog'});
			}else{
				this.$router.push({path:'/admin/goodsTotalLog'});				
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
		}
    },
    mounted(){

    }
}