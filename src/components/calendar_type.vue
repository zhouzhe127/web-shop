<!--
    **日历选择组件-日周月季度年
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="calendar">
		<div class="str-btn" :class="{active:calendarShow}" :style="calStyle" ref="calendarInput" @click="inputClick">
			<span>{{timestr}}</span>
			<em><i></i></em>
		</div>
		<div class="shadow-hide">
			<div class="calendar-main" v-show="calendarShow" @click.stop>
 				<div class="head" @click="flip">
 					<div class="prev">&lt;</div>
 					<span class="title">{{titleContent}}</span>
 					<div class="next">&gt;</div>
 				</div>
 				<ul class="week" v-if="weekShow">
 					<li v-for="(item,index) in weekList" :key="index">{{item}}</li>
 				</ul>
 				<ul class="list" ref="listBox" :class="listStyle" @click="selectList">
 					<li v-for="(item,index) in dateList" :data-time="item.time" :key="index"
 						:class="[item.offsetStyle,item.selected]">{{item.value}}</li>
 				</ul>
 				<div class="btn-box">
 					<div class="green" @click="currentTime">当前时间</div>
 					<div class="yellow" @click="confirm">确认</div>
 				</div>
 			</div>
		</div>
	</div>
</template>

<script>
	import utils from "src/verdor/utils";
	
    export default{
        props: {
                'time': [Number,String], //时间戳 只精确到每天的00:00:00
                'type': [Number,String], // 默认0,日历类型  0天 1周 2月 3季度 4年
                'format': String, //yyyy-MM-dd,格式化时间戳,只能格式type=0
				'show': Boolean, //true,展示传递过来的日期(initial) 默认显示日期
				'calStyle':Object,
				'tips':String,//默认展示的提示
        },
        data: function() {
            return {
				timestr:'请选择时间',//文本框显示的内容
				weekList:['一','二','三','四','五','六','日'], //星期
				dateList:[], //日历循环列表
				titleContent:'', //日历头部显示年份，月份
				calendarShow: Boolean,
				weekShow:false,
				currentSelect:'',//当前默认选中的日期
				
				timeDate:null, //Date对象
				day:0, //日
				week:0, //周
				month:0, //月
				quarter:0, //季度
				year:0, //年
				
				listStyle:'',
				oneDayStamp:1000*3600*24, //一天的时间戳
				oneWeekStamp:1000*3600*24*7, //一周的时间戳
				yearStart:0, //年日历 每个12年开始的年份
            };
        },
        watch:{
			'time':'timeChange',
        	'type':'typeChange',
        	'tips':'inputShow',
        },
		mounted: function() {
			this.timeChange();
			if(!this.tips){//这里的初始化抛出其实不应该有，为了兼容暂时不删除
				this.$emit('emit',this.timeDate.getTime(),this.timestr);
			}
       	},
        methods: { //重要操作排在前面，功能方法排在后面
        	initCalendar(){ //初始化日历
            	this.getTime(); //首先获取各个时间具体数据
            	this.weekShow = false;
        		switch (this.type){
        			case 1://周
        				this.setWeek();
        				break;
        			case 2://月
        				this.setMonth();
        				break;
        			case 3://季度
        				this.setQuarter();
        				break;
        			case 4://年
        				this.setYear();
        				break;
        			default://日
        				this.weekShow = true;
        				this.setDay();
        				break;
        		}
				this.setTitle(); //设置日历头部标题
            },
			close(event){//关闭日历 同时移除document的click事件
				var banDom = this.$refs.calendarInput.getElementsByTagName('*'),
					isBan = true;
				for(var i=0;i<banDom.length;i++){
					if(event.target == banDom[i]) isBan = false;
				}
				if(isBan){
					this.calendarShow = false;
					document.removeEventListener('click',this.close);
				}
        	},
			inputClick(event){ //文本框点击事件 显示隐藏日历
            	if(!this.calendarShow){ //显示日历
            		this.calendarShow = true;
            		document.addEventListener("click",this.close);
            	}else{ //隐藏日历
            		this.calendarShow = false;
        			document.removeEventListener("click",this.close);
				}
            },
            stopProp(event){
            	event.stopPropagation();
            },
            timeChange(){
            	this.timeDate = this.time ? new Date(this.time) : new Date();
				this.timeDate.setHours(0,0,0,0);//取当天的凌晨0点
				this.calendarShow = this.show ? this.show : false; //默认不显示
	           	this.initCalendar(); //初始化日历
	           	this.inputShow(); //初始化文本框
            },
        	typeChange(){
        		this.timeDate = new Date();
				this.timeDate.setHours(0,0,0,0);//取当天的凌晨0点
        		this.initCalendar();
        		this.inputShow();
        		this.$emit('emit',this.currentSelect,this.timestr);
        	},
        	prevMonth(day){//上一月  这里封装了一下，用于flip() selectList()
        		if(this.month==0){
    				this.timeDate.setFullYear(this.year-1,1);
    				this.timeDate.setMonth(11,day);
    			}else{
    				this.timeDate.setMonth(this.month-1,day);
    			}
        	},
        	nextMonth(day){//下一月 这里封装了一下，用于flip() selectList()
        		if(this.month==11){
    				this.timeDate.setFullYear(this.year+1,1);
    				this.timeDate.setMonth(0,day);
    			}else{
    				this.timeDate.setMonth(this.month+1,day);
    			}
        	},
        	flip(event){
        		var target = event.target;
        		if(target.className == "prev"){//点击上一页
        			//月翻页 用于:每天日历,每周日历
        			if(!this.type || this.type == 1){
	        			this.prevMonth(1);//上一月1号
	        		}else if(this.type == 2 || this.type == 3){//年翻页 用于:月日历,季度日历
	        			this.timeDate.setFullYear(this.year-1);
	        		}else if(this.type == 4){ //一次12年翻页
	        			this.timeDate.setFullYear(this.year-12,1);
	        		}
        		}else if(target.className == "next"){//点击下一页
					//月翻页 用于:每天日历,每周日历
					if(!this.type || this.type == 1){
	        			this.nextMonth(1);//下一月1号
	        		}else if(this.type == 2 || this.type == 3){//年翻页 用于:月日历,季度日历
	        			this.timeDate.setFullYear(this.year+1);
	        		}else if(this.type == 4){ //一次12年翻页
	        			this.timeDate.setFullYear(this.year+12,1);
	        		}
        		}
        		this.initCalendar();
        	},
        	selectList(event){//选择日期
				var target = event.target;
        		if(target.tagName.toLocaleLowerCase() == 'li'){
        			var dataTime = parseInt(target.getAttribute("data-time"));
        			var day = new Date(dataTime).getDate();
        			if(target.className == "prev-month"){//点击上个月日期
        				this.prevMonth(day);
        			}else if(target.className == "next-month"){//点击上个月日期
        				this.nextMonth(day);
        			}else if(target.className != "active"){//点击没选中的
        				this.timeDate.setTime(dataTime);
        			}
        			this.initCalendar();
				}
        	},
        	currentTime(){//当前时间
        		this.timeDate = new Date(new Date().setHours(0,0,0,0));
        		this.initCalendar();
        	},
			confirm(event){//确定
				this.$emit('emit',this.timeDate.getTime(),this.timestr);
        		this.inputShow();
        		this.close(event);
        	},
        	inputShow(){//文本框显示
        		switch (this.type){
        			case 1: //周
        				this.timestr = this.year + '年 第 ' + this.week + ' 周';
        				break;
        			case 2: //月
        				this.timestr = this.year + '年 ' + (this.month+1) + ' 月';
        				break;
        			case 3: //季度
        				this.timestr = this.year + '年 第 ' + this.quarter + ' 季度';
        				break;
        			case 4: //年
        				this.timestr = this.year + ' 年'
        				break;
        			default: //天 默认 
        				this.timestr = utils.format(this.timeDate,this.format);
        				break;
        		}
        		if(this.tips){
        			this.timestr = this.tips;
        		}
        	},
        	getTime(){ //获取基础时间数据
        		this.year = this.timeDate.getFullYear();
        		this.month = this.timeDate.getMonth();//获取到的月份0~11
        		this.day = this.timeDate.getDate();
        		this.week = this.timeDate.getDay();
        	},
        	setTitle(){ //设置日历标题
        		if(!this.type || this.type == 1){//天 周
        			this.titleContent = this.year + '-' + (this.month+1);
        		}else if(this.type == 2 || this.type == 3){//月 季度
        			this.titleContent = this.year;
        		}else if(this.type == 4){//年
        			this.titleContent = this.yearStart + '-' + (this.yearStart+11);
        		}
        	},
        	getWeekOne(weekNum,oneDay){//获取每年第一周第一天(周一)的时间戳,周一之前的天数算作上一年。同理每月
				if(weekNum==1){//如果已经是周一,则直接返回
	        		return oneDay;
	        	}else{ //如果不是
	        		if(weekNum==0){ //周日则+1天
	        			return oneDay + 1000*3600*24;
	        		}else{ //其他时间
	        			return oneDay + ((7-weekNum+1)*1000*3600*24);
	        		}
	        	}
			},
        	setDay(){ //设置每天日历
        		var offset = this.week - this.day % 7;
        		offset = offset < 0 ? offset+7 : offset;
        		var	monthOneDay = Date.parse(this.year + '/' + (this.month+1) + '/01 00:00:00'),
        			listArr=[],
        			startDay = monthOneDay - offset * this.oneDayStamp;
        			
        		this.listStyle = 'list-day';
        		for(var i=0;i<42;i++){
        			var obj={
        				time:startDay,
        				value:new Date(startDay).getDate(),
        			};
        			var offsetMonth = new Date(startDay).getMonth(),
        				offsetYear = new Date(startDay).getFullYear();
        			//上个月预显示
        			if(offsetYear < this.year || offsetYear == this.year && offsetMonth < this.month){
        				obj.offsetStyle = 'prev-month';
        			}
        			//下个月预显示
        			if(offsetYear > this.year || offsetYear == this.year && offsetMonth > this.month){
        				obj.offsetStyle = 'next-month';
        			}
        			if(obj.time == Date.parse(this.timeDate)){//默认选中当前日期
        				obj.selected = "active";
        				this.currentSelect = obj.time;
        			}
        			listArr.push(obj);
        			startDay += this.oneDayStamp;
        		}
        		this.dateList = listArr;
        	},
        	setWeek(){//设置每周日历
        		var yearOne = Date.parse(this.year + '/01/01 00:00:00'),//每年的第一天
        			monthOne =  Date.parse(this.year + '/' + (this.month+1) + '/01 00:00:00');//每月的第一天
        			
        		var yearOneWeek = this.getWeekOne(new Date(yearOne).getDay(),yearOne),//每年第一周的周一
        			monthOneWeek = this.getWeekOne(new Date(monthOne).getDay(),monthOne)//每月第一周的周一
        			
        		var currentWeek = Math.floor((this.timeDate.getTime() - yearOneWeek) / this.oneWeekStamp)+1; //今年的第几周
        		var monthWeek = ((monthOneWeek-yearOneWeek) / this.oneWeekStamp) + 1; //这个月开始为第几周
        		
        		//下个月的第一天 用于计算该月包含几周
        		var nextMonthOne='',listArr=[];
        		if(this.month>=11){//刚好为12月时
	        		nextMonthOne = (this.year+1) + '/01/01 00:00:00';//第二年第一天
	        	}else{
	        		nextMonthOne = this.year + '/' + (this.month+2) + '/01 00:00:00';//下个月第一天
	        	}
	        	//这个月包含周数
        		var monthWeekNum = Math.ceil((Date.parse(nextMonthOne) - monthOneWeek)/this.oneWeekStamp);
        		var loopNum = monthWeek; //用于循环

				this.listStyle = 'list-week';//列表样式
        		for(var i=0;i<monthWeekNum;i++){
        			var obj={
        				time:yearOneWeek + (loopNum-1)*this.oneWeekStamp,
        				value:"第 "+loopNum+" 周",
        			};
        			if((currentWeek < monthWeek || currentWeek > monthWeek+monthWeekNum) && i==0){//当前周不在这个月
        				obj.selected = "active";
        				this.week = loopNum;
        			}else if(currentWeek == loopNum){//当前周在这个月
        				obj.selected = "active";
        				this.week = loopNum;
        				this.currentSelect = obj.time;
        			}
        			listArr.push(obj);
        			loopNum++;
        		}
        		this.dateList = listArr;
        	},
        	setMonth(){//设置每月日历
        		var currentMonth = this.year + '/' + this.month + '/01 00:00:00',//当前月第一天
        			listArr=[];
        		this.listStyle = 'list-month';
        		for(var i=0;i<12;i++){
        			var monthTime = this.year + '/' + (i+1) + '/01 00:00:00';//每个月第一天
        			var obj={value : (i+1)+" 月"};
					if(this.month == i){
						obj.time = Date.parse(currentMonth);
						obj.selected = "active";
						this.currentSelect = obj.time;
					}else{
						obj.time = Date.parse(monthTime);
					}
					listArr.push(obj);
        		}
        		this.dateList = listArr;
        	},
        	setQuarter(){ //设置季度日历
        		var listArr=[];
        		this.listStyle = 'list-week';
        		for(var i=0;i<4;i++){
        			var currentOne,
        				month = this.month+1,
        				obj={value :"第 " + (i+1) +" 季度"};
             		for(var n=0;n<4;n++){//取当前季度第一月第
             			if(month >= (n*3+1) && month < ((n+1)*3+1)) currentOne = n*3+1;
             		}
             		//取每个季度第一月
	             	var eachOne = i*3+1;
	             	var currentQuarter = this.year + '/' + currentOne + '/01 00:00:00',//当前季度第一天
						eachQuarter = this.year + '/' + eachOne + '/01 00:00:00';//每个季度第一天
					
					if(currentOne == eachOne){//当前季度
						obj.time = Date.parse(currentQuarter);
						obj.selected = "active";
						this.quarter = i+1;
						this.currentSelect = obj.time;
					}else{
						obj.time = Date.parse(eachQuarter);
					}
					listArr.push(obj);
        		}
        		this.dateList = listArr;
        	},
        	setYear(){//设置每年日历
        		this.timeDate
        		var listArr=[],
        			loop = (this.year - 1970) % 12;//用于计算12年区间
        		var loopStart = loop == 0 ? this.year : this.year - loop;
        		this.yearStart = loopStart;
        		this.listStyle = 'list-month';
        		for(var i=0;i<12;i++){
					var yearOneDay = this.year + '/01/01 00:00:00',//当前年份第一天
						yearTime = (loopStart+i) + '/01/01 00:00:00',//每个年份第一天
						obj={value : loopStart+i};
					if((loopStart+i) == this.year){
						obj.time = Date.parse(yearOneDay);
						obj.selected = "active";
						this.currentSelect = obj.time;
					}else{
						obj.time = Date.parse(yearTime);
					}
					listArr.push(obj);
        		}
        		this.dateList = listArr;
        	}
        },
    }
</script>
<style lang="less" scoped>
	.overFlow{width: 100%;overflow: hidden;}
	.calendar{
		position: relative;background: #fff;height: 40px;display: inline-block;
		*{
			-webkit-user-select: none;
			-moz-user-select: none;
			-o-user-select: none;
			user-select: none;
		}
		.str-btn{
			vertical-align: middle;display: inline-block;border: #b3b3b3 solid 1px;overflow: hidden;cursor: pointer;
			span {
				width: 158px;height: 38px;line-height: 38px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
				text-align: center;float: left;font-size: 14px;color: #333;
			}
			em{width: 40px;height: 38px;float: right;text-align: center;line-height: 38px;border-left: 1px solid #ccc;
				i {height: 10px;width: 10px;display: inline-block;
					border-top: 10px solid #b3b3b3;border-left: 5px solid transparent;border-right: 5px solid transparent;box-sizing: border-box;
				}
			}
			&.active{box-shadow: 0 1px 2px #999;}
		}
		.shadow-hide{position: absolute;left: -3px;margin-top: -1px;width: 206px;z-index: 10;padding: 3px;padding-top: 0;overflow: hidden;}
		.calendar-main{
			width: 200px;border: 1px solid #b3b3b3;background: #fff;box-shadow: 0 1px 2px #999;
			.head{
				.overFlow;
				div,span{float: left;height: 35px;line-height: 35px;text-align: center;}
				span{color: #333;}
				.title{width: 50%;}
				.prev,.next{width: 25%;color: #666;}
				.prev:hover,.next:hover{background: #f1f1f1;cursor: pointer;color: #333;}
			}
			ul{
				.overFlow;
				li{float: left;text-align: center;}
			}
			.week{
				li{padding: 6px 0;width: 14.28%;color: #666;font-size: 12px;cursor: default;}
			}
			.list{
				padding: 5px 2px;
				li{height: 26px;line-height: 24px;font-size: 12px;color: #666;border: 1px solid #fff;cursor: pointer;}
				li:hover{background: #f1f1f1;border: 1px solid #f1f1f1;}
				li.prev-month,li.next-month{color: #ccc;}
				li.prev-month:hover,li.next-month:hover{color: #999;}
				li.active{border: 1px solid #ccc;
					background: url(../res/images/topright.png)#fafafa no-repeat right -70px;
				}
				
			}
			.list-day li{width: 14.28%;}
			.list-week{
				padding: 10px;padding-top: 5px;
				li{width: 50%;height: 40px;line-height: 38px;}
			} 
			.list-month{
				padding: 10px 5px;padding-top: 5px;
				li{width: 25%;height: 40px;line-height: 38px;}
			} 
			.btn-box{
				.overFlow;
				div{width: 50%;float: left;height: 40px;line-height: 40px;text-align: center;color: #fff;}
			}
		}
	}
</style>