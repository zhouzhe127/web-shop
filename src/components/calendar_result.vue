<template>
<!--
    @百川 --  曾伟福
    @file -- 日历组件    
-->
    <div @click.stop id="calendarResult">
        <div class="input-div" v-if="useInput" :style="{'width':(Number(width)+40)+'px'}" @click="clickInput">
            <input type="text" :style="{'width':Number(width)-4+'px'}" class="calendar-input" readonly="true" v-model="timeStr">
            <span class="trangle">
                <img src="../res/icon/icon-point-down.png" alt="" style="display:inline-block;vertical-align:middle;">
            </span>
        </div>
        <!--日历-->
        <div class="calendar" v-show="showCalendar">
            <div class="calendar-title">
                <span class="calendar-left" v-on:click="toggleMonth('pre')">&lt;</span>
                <span class="calendar-center">{{dateTime.year+"-"+dateTime.month}}</span>
                <span class="calendar-right" v-on:click="toggleMonth('next')">&gt;</span>
            </div>

            <div class="calendar-week">
                <span v-for="(day,index) in weekday" :key='index'>{{day}}</span>
            </div>

            <div class="calendar-day" @click="changeDay">
                <!--日历的前几天-->
                <span class="calendar-pre" :key="day+'a'"  v-for="day in calendarBefore" >{{day}}</span>
                <!--日历中设定的月-->
                <span :class="{'calendar-on':true,'calendar-seleted':dateTime.day==date}" :key="date+'b'" v-for="date in calendarNow" >{{date}}</span>
                <!--日历的后几天-->
                <span class="calendar-next" :key="day+'c'" v-for="day in calendarAfter" >{{day}}</span>
                <div style="clear: both;width: 100%; font-size: 0; height: 5px;"></div>
            </div>


            <!--时分秒的显示-->
            <div v-if='show'>
                <div class="calendar-time">
                    <span :class="{'calendar-hour':true, 'calendar-seleted':currentSelect=='hour'}" v-on:click="initBar('hour')" style="width: 27% ;">{{dateTime.hour}}</span>
                    <span style="width: 10% ;">:</span>
                    <span :class="{'calendar-minute':true,'calendar-seleted':currentSelect=='minute'}" v-on:click="initBar('minute')" style="width: 27% ;">{{dateTime.minute}}</span>
                    <span style="width: 10% ;">:</span>
                    <span :class="{'calendar-second':true,'calendar-seleted':currentSelect=='second'}" v-on:click="initBar('second')" style="width: 26% ;">{{dateTime.second}}</span>
                </div>

                <div class="calendar-bar" >
                    <div class='barContainer' ref="barCon" style="position:relative;  width:88%; height: 2px; background-color:#c8cac9; margin: 9px auto 9px auto;">
                        <div class="calendar-size" ref="calenSize" :style="{'width':barSize+'%'}"></div>

                        <div class="calendar-handle" :style="{'left':barSize+'%'}" ref="handler">
                            <div style="width: 80%; height: 2px; background-color:#dddddd; margin: 17% auto 16% auto;"></div>
                            <div style="width: 80%; height: 2px; background-color:#dddddd; margin: 16% auto 17% auto;"></div>
                            <div style="width: 80%; height: 2px; background-color:#dddddd; margin: 16% auto 16% auto;"></div>
                        </div>

                    </div>
                </div>
            </div>

            <!--确认按钮-->
            <div class="calendar-buttons">
                <a  class="green fl" style="height: 40px; line-height: 40px; width:50% ;" @click='funSelectNowTime'>当前时间</a>
                <a  class="yellow fl" style="height: 40px; line-height: 40px;width:50% ;" @click='funSelectTime'>确认</a>
            </div>
            <div style="clear: both;width: 100%;font-size: 0;"></div>
        </div>
    </div>
</template>

<script>

    let list = null;

    export default{
        props: {
                tips:undefined,
                pObj:null,
                /*
                    {
                        time:               //需要展示的时间(时间戳)(默认展示当前时间)
                        show:               //是否展示时分秒控件(默认显示)
                        detail:             //是否显示精确到时分秒    true:不显示时分秒,false:显示时分秒(默认)
                        width:              //输入框的宽  默认200px
                    }
                */
                //1)this.$emit('throwTime',this.time);
                //2)最终抛出的是时间戳
                
        },
        data() {
            return {
                weekday:['一','二','三','四','五','六','日'],
                calendarBefore:[],      //需要显示的上一个月的日期
                calendarAfter:[],       //需要显示的下一个月的日期
                calendarNow:[],         //本月需要显示的日期

                dateTime:{
                    year:'',
                    month:'',
                    day:'',
                    hour:'',
                    minute:'',
                    second:'',
                    week:'',                //周几
                },
                platform:true,          //平台   true:移动端      
                barSize:0,              //进度条的长度
                pos:0,                  //点击的位置
                len:0,                  //滑条的长
                currentSelect:'hour',   //当前选择的滑块 
                timeStr:'',             //展示的时间
                showCalendar:false,     //日历组件的显示与隐藏                

                show:true,              //是否展示时分秒控件(默认显示)
                detail:true,            //是否精确到时分秒(默认)
                time:'',                //时间戳
                width:200,              //输入框的宽

                useInput:true,          //是否显示输入框
            };
        },

        methods: {
            //----------        event   ----------------
            //月的切换
            toggleMonth(flag){
                let {year,month} = this.dateTime; 
                if(flag=='pre'){
                    month -= 1;
                    if(month==0){
                        month=12;
                        year=year-1;
                    }
                }else{
                    month+=1;
                    if(month==13){
                        month=1;
                        year=year+1;
                    }
                }

                this.dateTime.month=month;
                this.dateTime.day=1;
                this.dateTime.year=year;
                let time = this.toTimeStamp(this.dateTime);
                let week = new Date(time).getDay()
                this.dateTime.week = week == 0 ? 7 : week;
                this.initCalendar();
            },
            //选择日
            changeDay(event){
                let target = event.target;
                if(event.target.className=='calendar-pre') this.toggleMonth('pre');
                if(event.target.className=='calendar-next') this.toggleMonth('next');
                this.dateTime.day=target.innerText;
            },
            //抛出选择的时间
            funSelectTime(){
                this.time=this.toTimeStamp(this.dateTime);
                this.timeStr=this.formatTime(this.dateTime,this.detail);
                this.initTimeStr();
                this.$emit('throwTime',this.time);
                this.showCalendar=false;
            },
            //选择当前时间
            funSelectNowTime(){
                this.time=(new Date()).getTime();
                this.dateTime = this.initDate(this.time);
                this.initCalendar();
                this.initBar(this.currentSelect);
            },
            //点击输入,日历的显示与隐藏
            clickInput(){
                if(list&&list.$el!==this.$el) list.showCalendar = false;
                list = this;
                this.showCalendar=!this.showCalendar;
            },
            //dom事件
            domEvent(){
                this.showCalendar=false;
            },
            //----------        utils   ---------------
            //格式化dateTime对象,返回时间戳
            toTimeStamp(date){
                let str=''+date.year+'/'+date.month+'/'+date.day+' '+date.hour+':'+date.minute+':'+date.second;
                let time=new Date(str).getTime();
                return time;
            },

            //格式化
            formatTime(date,flag){
                let str=date.year+'年'+date.month+'月'+date.day+'日';
                let hour=parseInt(date.hour)<10 ? '0'+date.hour :date.hour;
                let minute=parseInt(date.minute)<10 ? '0'+date.minute :date.minute;
                let second=parseInt(date.second)<10 ? '0'+date.second :date.second;
                let st=" "+hour+":"+minute+":"+second;
                let fin=flag ? str+st : str;
                return fin;
            },
            //初始化数据
            //---------         init    --------------
            initData(){
                if(typeof this.pObj=='object'){ 
                    if(this.pObj.show) this.show = false;
                    if(this.pObj.detail) this.detail = false;
                    if(this.pObj.useInput) this.useInput = false;
                    if(this.pObj.width)  this.width=this.pObj.width;
                    if(this.pObj.time) this.time = this.pObj.time;
                }
                if(!this.time) this.time=new Date().getTime();
            },
            //根据时间戳获取日期
            initDate(time){
                let date=new Date(time);
                return {
                    year:date.getFullYear(),
                    month:date.getMonth()+1,
                    day:date.getDate(),
                    hour:date.getHours(),
                    minute:date.getMinutes(),
                    second:date.getSeconds(),
                    week:date.getDay() == 0 ? 7 : date.getDay(),                
                };        
            },
            //初始化日历的日
            initCalendar(){
                this.calendarAfter=[];
                this.calendarNow=[];
                this.calendarBefore=[];

                //计算上一个月显示的天数
                let offsetDay = this.dateTime.week - this.dateTime.day % 7;
                if(offsetDay < 0) offsetDay += 7;

                //计算本月的天数
                let max = (new Date(this.dateTime.year, this.dateTime.month, 0)).getDate();
                
                //计算上一个月的最后一天
                let previousMax = this.dateTime.month == 1 ? (new Date(this.dateTime.year - 1, 12, 0)).getDate() : (new Date(this.dateTime.year, this.dateTime.month - 1, 0)).getDate();
                for(let i=1;i<=offsetDay;i++){
                    this.calendarBefore.push(previousMax-offsetDay+i);
                }
                for(let i=1;i<=max;i++){
                    this.calendarNow.push(i);
                }
                for(let i=1,len=42-offsetDay-max;i<=len;i++){
                    this.calendarAfter.push(i);
                }
            },
            //初始化进度条
            initBar(flag){
                this.currentSelect = flag;
                let base = this.currentSelect == 'hour' ? 23 : 59 ;   
                this.barSize = this.dateTime[this.currentSelect]/base*100;
            },
            
            //true:绑定  事件的绑定与解除
            domEventBind(obj,flag,dom){
                if(!dom) dom = document;
                let keys= Object.keys(obj);
                let way = flag ? 'addEventListener' : 'removeEventListener';
                for(let key of keys){
                    dom[way](key,obj[key],false);
                }
            },
            //dom移动事件
            domMousemove(e){
                let pageX = e.pageX ? e.pageX : e.targetTouches[0].pageX; 
                let move = Math.round(pageX) - this.pos;
                this.pos = Math.round(pageX);
                let percentage = (move/this.len)*100;
                this.barSize += percentage;
                if(this.barSize<0) this.barSize = 0;
                if(this.barSize>100) this.barSize = 100;
                let base = this.currentSelect == 'hour' ? 23 : 59 ; 
                this.dateTime[this.currentSelect] = parseInt(this.barSize * base/100);
                
            },
            //dom事件的移除
            removeDomMoveEvent(){
                let obj={};
                if(this.platform){
                    obj={
                        touchmove:this.domMousemove,
                        touchend:this.removeDomMoveEvent
                    }
                }else{
                     obj={
                        mousemove:this.domMousemove,
                        mouseup:this.removeDomMoveEvent
                    }                   
                }
                this.domEventBind(obj,false,document);
            },
            //滑块事件
            handlerMousedown(e){
                e.preventDefault();
                let pageX = e.pageX ? e.pageX : e.targetTouches[0].pageX; 
                this.pos = Math.round(pageX);                     //第一次点击的位置
                this.len = this.$refs.barCon.offsetWidth;           //获取滑块的总长
                let obj={};
                if(this.platform){
                    obj={
                        touchmove:this.domMousemove,
                        touchend:this.removeDomMoveEvent
                    }
                }else{
                     obj={
                        mousemove:this.domMousemove,
                        mouseup:this.removeDomMoveEvent
                    }                   
                }
                this.domEventBind(obj,true,document);
            },
            initTimeStr(){
                if(typeof this.tips !== 'undefined'){
                    this.timeStr = this.tips;
                }                
            }
        },
        mounted(){
            this.platform = 'ontouchstart' in document;
            this.initData();
            this.dateTime = this.initDate(this.time);
            this.initCalendar();
            this.timeStr=this.formatTime(this.dateTime,this.detail);
            this.initTimeStr();
            this.initBar(this.currentSelect);
            if(this.platform){
                this.$refs.handler.addEventListener('touchstart',this.handlerMousedown,false);
            }else{
                this.$refs.handler.addEventListener('mousedown',this.handlerMousedown,false);
            }
        },
        watch:{
            pObj:{
                handler(){
                    this.initData();
                    this.dateTime = this.initDate(this.time);
                    this.initCalendar();
                    this.initBar(this.currentSelect);    
                    this.timeStr=this.formatTime(this.dateTime,this.detail);
                    this.initTimeStr();
                },
                deep:true
            },
            "showCalendar":function(){
                if(this.showCalendar){
                    document.addEventListener('click',this.domEvent,false);
                }else{
                    document.removeEventListener('click',this.domEvent,false);
                }
            },
            tips:function(){
                this.initTimeStr(); 
            }
        },
    }
</script>
<style lang="less" scoped>
#calendarResult{
    user-select: none;
    display:inline-block;
    position: relative;
    .whb(@width,@height,@border:none){
        width:@width;
        height:@height;
        border:@border;
    };
    input{
        padding: 0;
        outline: none;
        cursor:pointer;
    }
    .input-div{
        float:left;
        .whb(240px,40px,1px solid #ccc);
        .calendar-input {
            line-height: 38px;
            .whb(200px,38px,none);
            cursor:pointer;
            text-align:center;
            vertical-align: top;
            float:left;
        }
        .trangle{
            .whb(40px,38px);
            border-left:1px solid #ccc;
            text-align:center;
            line-height:38px;
            float:right;
        }
    }
    /*日历*/
    .calendar {
        .whb(200px,auto,1px #CCCCCC solid);
        font-family: "微软雅黑","宋体",Arial,STHeiti,"WenQuanYi Micro Hei",sans-serif;
        font-size: 14px;
        position: absolute;
        margin-top:39px;
        background-color: #fff;
        z-index: 10;
        .calendar-title {
            .whb(100%,35px,none);
            line-height: 35px;
            .calendar-left {
                text-align: left;
                float: left;
                width: 25%;
                padding-left: 10px;
                cursor: pointer;
            }
    
            .calendar-center {
                text-align: center;
                float: left;
                width: 50%;
                cursor:pointer;
            }
    
            .calendar-right {
                text-align: right;
                float: left;
                width: 25%;
                cursor: pointer;
                padding-right: 10px;
            }
    
            .calendar-left:hover,.calendar-right:hover{
                background-color: #eee;
                user-select: none;
            }
    
    
        }
    
        .calendar-week,.calendar-day{
            text-align: center;
            width: 100%;
            padding: 2px;
            span {
                .whb(14.2857%,24px,1px solid transparent);
                float: left;
                line-height: 24px;
                color: #898989;
                font-size: 12px;
            }
    
            span.calendar-on:hover {
                background-color: #eee;
                cursor: pointer;
            }
    
            span.calendar-next,span.calendar-pre{
                color: #ddd;
            }
    
            span.calendar-seleted {
                border: 1px solid #ccc;
                background: url(../res/images/topright.png) no-repeat right -70px;
            }
    
        }
    
        .calendar-time {
            width: 100%;
            height: 40px;
            .whb(100%,40px);
            clear: both;
            span {
                float: left;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                text-align: center;
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
            }
    
            span.calendar-hour {
                border-right: 1px solid #ccc;
                cursor: pointer;
            }
    
            span.calendar-minute {
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
                cursor: pointer;
            }
    
            span.calendar-second {
                border-left: 1px solid #ccc;
                cursor: pointer;
            }
            span.calendar-hour:hover,span.calendar-second:hover，.calendar-time{
                background-color: #eee;
            }
    
             span.calendar-seleted {
                background: url(../res/images/topright.png) no-repeat right -62px;
            }
    
        }
    
        .calendar-bar {
            .whb(100%,40px);
            text-align: center;
            clear: both;
            padding-top: 10px;
            .calendar-size {
                position: absolute;
                left: 0;
                top: -9px;
                height: 2px;
                background-color: #727071;
                margin: 9px 0 9px 0;
            }
    
            .calendar-handle {
                cursor: pointer;
                position: absolute;
                right: 0%;
                top: -10px;
                .whb(20px,20px,2px solid #b3b3b3);
                background-color: #fff;
                margin-left: -10px;
            }
        }
    
        .calendar-buttons {
            width: 100%;
            height: 40px;
            .whb(100%,40px);
            font-size: 0;
            clear: both;
        }
    
    }

}

</style>