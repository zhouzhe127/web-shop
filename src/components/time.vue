/**
 * @file
 * 
 * 时分日期选择组件
 *
 * @author zhengu.jiang
 */
<template>
    <div id="timems">
        <section class="tableListInp chairFix" @click="showTime()" ref="selectBtn">
			<span class="extent">{{timeslot}}</span>
			<div class="fr">
				<i></i>
			</div>
		</section>
        <div v-if="show" class="timebox" @click.stop>
            <div class="calendar-time">
                <span class="calendar-hour" :class="{'calendar-seleted': startSel == 'hour'}" @click="chooseStart('hour')">{{startTime.hour}}</span>
                <span style="width: 10% ;">:</span>
                <span class="calendar-minute" :class="{'calendar-seleted': startSel == 'minute'}" @click="chooseStart('minute')">{{startTime.minute}}</span>
            </div>
            <div class="calendar-bar">
                <div class="calendar-barline">
                    <div class="calendar-size"></div>
                    <div ref="start" :style="{left: left.start + 'px'}" class="calendar-handle"></div>
                </div>
            </div>
            <div class="calendar-time">
                <span class="calendar-hour1" :class="{'calendar-seleted': endSel == 'hour'}" @click="chooseEnd('hour')">{{endTime.hour}}</span>
                <span style="width: 10% ;">:</span>
                <span class="calendar-minute1" :class="{'calendar-seleted': endSel == 'minute'}" @click="chooseEnd('minute')">{{endTime.minute}}</span>
            </div>
            <div class="calendar-bar">
                <div class="calendar-barline1">
                    <div class="calendar-size1"></div>
                    <div ref="end" :style="{left: left.end + 'px'}" class="calendar-handle1"></div>
                </div>
            </div>
            <a href="javascript:void(0);" class="yellow" @click="confirm">确认</a>
        </div>
    </div>

</template>
<script>
export default {    
    data(){
        return {
            startTime: {
                hour: '00',
                minute: '00'
            },
            endTime: {
                hour: '15',
                minute: '59'
            },
            startSel: 'hour',
            endSel: 'hour',
            timeslot: '',
            show: false, //时间选择展开
            type: null, //区分滑块
            left: {
                start: 0,
                end: 0
            }, //滑块距离左侧的距离
            leftCopy: {
                start: 0,
                end: 0
            }, //鼠标点击时记录距离左侧的距离
            default: {
                start: 0,
                end: 0,
            }, //鼠标点击时滑块的位置
            type: true, //点击滑块
            // startLeft: '', //开始时间距离
            // endLeft: '', // 结束时间距离
            // startLeftCopy: '',
            // endLeftCopy: '',
            // defaultStart: '', //开始滑动时的位置
            // defaultEnd: '',
        }
    },
    watch: {
        index: function(){
            this.timeslot = this.start.hour + ':' + this.start.minute + '-' + this.end.hour + ':' + this.end.minute;
            this.showTime('isReset');
            this.show = false;
        }
    },
    props: {
        start: Object, //{hour: '00',minute: '00'}形式
        end: Object,//{hour: '00',minute: '00'}形式
        index: Number //用于重置数据，需要重置时可index++，没有用到重置可不加
    },
    mounted(){
        this.timeslot = this.start.hour + ':' + this.start.minute + '-' + this.end.hour + ':' + this.end.minute;
    },
    methods: {
        close(event){
            var banDom = this.$refs.selectBtn.getElementsByTagName('*'),
                isBan = true;
            for(var i=0;i<banDom.length;i++){
                if(event.target == banDom[i]) isBan = false;
            }
            if(isBan){
                this.show = false;
                document.removeEventListener('click',this.close);
            }
        },
        showTime(type){
            if(!this.show && type != 'isReset'){
                this.show = true;
                document.addEventListener("click",this.close);
                this.$nextTick(()=>{
                    let pc = !("ontouchend" in document);
                    if(pc){
                        this.$refs.start.addEventListener('mousedown',this.documentStart);
                        this.$refs.end.addEventListener('mousedown',this.documentStart);
                    }else{
                        this.$refs.start.addEventListener('touchstart',this.documentStart);
                        this.$refs.end.addEventListener('touchstart',this.documentStart);
                    }
                })
            }else{
                this.show = false;
                document.removeEventListener("click",this.close);
            }
            let start = this.timeslot.split('-')[0],
                end = this.timeslot.split('-')[1];
            this.startTime.hour = start.split(':')[0];
            this.startTime.minute = start.split(':')[1];
            this.endTime.hour = end.split(':')[0];
            this.endTime.minute = end.split(':')[1];
            this.$nextTick(()=>{
                if(this.show){
                    this.startSel = 'hour';
                    this.endSel = 'hour';
                    this.left.start = Math.round(this.startTime.hour / 23 * 160)
                    this.left.end = Math.round(this.endTime.hour / 23 * 160)
                }
            })
        },
        chooseStart(type) {
            this.startSel = type;
            if(type == 'hour'){
                this.left.start = Math.round(this.startTime.hour / 23 * 160)
            }else{
                this.left.start = Math.round(this.startTime.minute / 59 * 160)
            }
            
        },
        chooseEnd(type){
            this.endSel = type;
            if(type == 'hour'){
                this.left.end = Math.round(this.endTime.hour / 23 * 160)
            }else{
                this.left.end = Math.round(this.endTime.minute / 59 * 160)
            }
            
        },
        offset(obj) {
            var left = 0;
            while (obj) {
                left += obj.offsetLeft;
                obj = obj.offsetParent;
            }
            return left;
        },
        documentStart(event){
            let pc = !("ontouchend" in document);
            let e = pc ? event : event.targetTouches[0];
            event.preventDefault()
            this.default.start = e.pageX;
            this.default.end = e.pageX;
            this.leftCopy.start = this.left.start;
            this.leftCopy.end = this.left.end;
            e.target.className == 'calendar-handle' ? this.type = true : this.type = false;
            if(pc){
                document.addEventListener('mousemove', this.documentMove,false);
                document.addEventListener('mouseup', this.documentUp,false);
            }else{
                document.addEventListener('touchmove', this.documentMove,false);
                document.addEventListener('touchend', this.documentUp,false);
            }
        },
        documentMove(event){
            let type;
            let pc = !("ontouchend" in document);
            let e = pc ? event : event.targetTouches[0];
            event.preventDefault()
            if(this.type){
                this.left.start = this.leftCopy.start + (e.pageX - this.default.start);
            }else {
                this.left.end = this.leftCopy.end + (e.pageX - this.default.end);
            }
            if(this.left.start < 0){
                this.left.start = 0;
                // this.documentUp()
            }
            if(this.left.end < 0){
                this.left.end = 0;
                // this.documentUp()
            }
            if(this.left.start > 160){
                this.left.start = 160;
                // this.documentUp()
            }
            if(this.left.end > 160){
                this.left.end = 160;
                // this.documentUp()
            }
            if (this.type) {
                if(this.startSel == 'hour'){
                    this.startTime.hour = Math.round((this.left.start)/160*23);
                    if(this.startTime.hour < 10){
                        this.startTime.hour = "0" + this.startTime.hour;
                    }
                }else {
                    this.startTime.minute = Math.round((this.left.start)/160*59);
                    if(this.startTime.minute < 10){
                        this.startTime.minute = "0" + this.startTime.minute;
                    }
                }
                
            } else {
                if(this.endSel == 'hour'){
                    this.endTime.hour = Math.round((this.left.end)/160*23);
                    if(this.endTime.hour < 10){
                        this.endTime.hour = "0" + this.endTime.hour;
                    }
                }else{
                    this.endTime.minute = Math.round((this.left.end)/160*59);
                    if(this.endTime.minute < 10){
                        this.endTime.minute = "0" + this.endTime.minute;
                    }
                }
            }

        },
        documentUp(e){
            let pc = !("ontouchend" in document);
            if(pc){
                document.removeEventListener('mousemove', this.documentMove,false);
                document.removeEventListener('mouseup', this.documentUp,false);
            }else{
                document.removeEventListener('touchmove', this.documentMove,false);
                document.removeEventListener('touchend', this.documentUp,false);
            }
        },
        confirm(){
            this.show = false;
            this.timeslot = this.startTime.hour + ':' + this.startTime.minute + '-' + this.endTime.hour + ':' + this.endTime.minute;
            let time = {
                start: {
                    hour: '',
                    minute: ''
                },
                end: {
                    hour: '',
                    minute: ''
                }
            };
            time.start.hour = this.startTime.hour;
            time.start.minute = this.startTime.minute;
            time.end.hour = this.endTime.hour;
            time.end.minute = this.endTime.minute;
            this.$emit('timeChoose',time)
        }
    }
}
</script>
<style lang="less" scoped>
    #timems{
		font-size: 16px;
		text-align: left;
		vertical-align: middle;
		display: inline-block;
        position: relative;
        .tableListInp {
            color: #666666;
            border: #b3b3b3 solid 1px;
            height: 40px;
            cursor: pointer;
            display: inline-block;
            background-color: #ffffff;
            .extent {
                width: 157px;
                height: 39px;
                line-height: 39px;
                display: block;
                float: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
                border-right: 1px #B3B3B3 solid;
            }
            div {
                width: 41px;
                height: 38px;
                position: relative;
                z-index: 5;
                i {
                    height: 10px;
                    width: 10px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-top: -5px;
                    margin-left: -5px;
                    border-top: 10px solid #b3b3b3;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    box-sizing: border-box;
                }
            }
        }
        .timebox {
            top: 39px;
            width: 200px;
            height: auto;
            border: 1px #CCCCCC solid;
            border-top: 0;
            font-family: "微软雅黑","宋体",Arial,STHeiti,"WenQuanYi Micro Hei",sans-serif;
            font-size: 14px;
            box-sizing: border-box;
            background-color: #fff;
            z-index: 1000;
            position: absolute;
            .yellow{
                width: 100%;
                height: 40px;
                line-height: 40px;
            }
            .calendar-time {
                width: 100%;
                height: 40px;
                box-sizing: border-box;
                clear: both;
                span {
                    float: left;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    text-align: center;
                    border-top: 1px solid #ccc;
                    border-bottom: 1px solid #ccc;
                    box-sizing: border-box;
                    &.calendar-hour,
                    &.calendar-hour1{
                        border-right: 1px solid #ccc;
                        width: 45%;
                        cursor: pointer;
                        &:hover{
                            background-color: #eee;
                        }
                    }
                    &.calendar-minute,
                    &.calendar-minute1{
                        border-left: 1px solid #ccc;
                        width: 45%;
                        cursor: pointer;
                        &:hover{
                            background-color: #eee;
                        }
                    }
                    &.calendar-seleted {
                        background: url(../res/images/topright.png) no-repeat right -62px;
                    }
                }
            }
            .calendar-bar {
                width: 100%;
                height: 40px;
                text-align: center;
                clear: both;
                padding-top: 10px;
                .calendar-barline,
                .calendar-barline1{
                    position:relative;  
                    width:88%; 
                    height: 2px; 
                    background-color:#c8cac9; 
                    margin: 9px auto 9px auto;
                    .calendar-size,
                    .calendar-size1 {
                        position: absolute;
                        left: 0;
                        top: -9px;
                        width: 0;
                        height: 2px;
                        background-color: #727071;
                        margin: 9px 0 9px 0;
                    }
                    .calendar-handle,
                    .calendar-handle1 {
                        cursor: pointer;
                        position: absolute;
                        right: 50%;
                        top: -10px;
                        width: 20px;
                        height: 20px;
                        border: 2px solid #b3b3b3;
                        background-color: #fff;
                        .calendar-handleline,
                        .calendar-handleline1{
                            width: 80%; 
                            height: 2px; 
                            background-color:#dddddd; 
                            margin: 17% auto 16% auto;
                        }
                    }
                }
            }
        }
    }
</style>
