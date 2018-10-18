<template>
    
    <div class= "winContainer-el" :style="{'z-index':1000+win_id}">
        <div class= 'win-el center' :style="{'width': width +'px','height': 'auto','z-index':1000+win_id,'transform':align=='center'?'translate(-50%,-50%)':null,'left':(align == 'left'?'0':(align == 'center'?'50%':null)),'right':align=='right'?'0':null}">
            <div class= 'win-el-head'>
                <span class= 'win-el-head-title noselect'>
                    <slot name="title">提示信息</slot>
                </span>
                <span class= 'win-el-head-close el-icon-close noselect' @click="closeFun"></span>
            </div>
            <div class= 'win-el-body' ref='winBody' :style="{'width':'auto','min-height':'100px','height':typeof(height) == 'number' ? (height +'px') : 'auto'}">
                <slot name="content"></slot>
            </div>
            <div class= 'win-el-bottom'>
                <el-button class="win-el-cancel" type="info" @click="cancelFun" v-if="type === 'confirm'">
                    {{cancel?cancel.content:'取消'}}
                </el-button>
                <el-button class="win-el-ok" type="primary" @click="okFun" :style="ok?ok.style:''">
                    {{ok?ok.content:'确定'}}
                </el-button>
            </div>
        </div>
        <div ref = "mask" class="win-el-mask" v-show = "maskShow" @click="closeMask" :style="{'z-index':1000 + win_id - 1}"></div>
    </div>
    
</template>
<script>
 
    import global from "src/manager/global";
    import utils from 'src/verdor/utils';

    export default{
        props:{
            type:{
                type:String,
                default:"confirm"
            },
            align:{
                type:String,
                default:"center"
            },
            width:{
                type:[Number,String],
                default:300
            },
            height:{
                type:[Number,String],
                default:'80'
            },
            okCallback:{
                type:Function,
                default:function(){}
            },
            cancelCallBack:{
                type:Function,
                default:function(){}
            },
            maskStr:{
                type:String,
                default:"close"
            },
            ok:[Object],//单独给按钮设立样式和内容
            cancel:[Object],
            closeHandle:{
                type:Function,
                default:function(){}
            },
            autoHideTime:[Number,String],
            isBody:{
                type:Boolean,
                default:true
            },//是否需要将弹框分离到body中
            maskShow:{
                type:Boolean,
                default:true
            }
            
        },
        data(){
            return {
                win_id:global.win_id,
                sourceHeight:0,
                sourceEle:null//保留原始dom节点
            }
        },
        methods:{
            okFun(){
                this.okCallback();
                this.$emit("winEvent","ok");
            },
            cancelFun(){
                this.cancelCallBack();
                this.$emit("winEvent","cancel")
            },
            closeFun(){
                this.closeHandle();
                this.$emit("winEvent","close")
            },
            closeMask(){
                this.closeHandle();
                this.$emit("winEvent",this.maskStr)
            },
            changeView(){
                this.$refs.winBody.style.height = utils.getWindowWH().h - 100 +'px';
            }
        },
        beforeDestroy(){
            if(!--global.win_num){
                global.win_id=0;

                let dom =  document.querySelector('#maincon');
               if(dom) dom.style.borderRight = 'none';
                document.body.style.overflow = document.documentElement.style.overflow = ''; 
                
            }
            
            window.removeEventListener('resize',this.changeView);

        },
        destroyed(){

            // if(this.isBody){
                
                document.body.appendChild(this.$el);
                
                if(global.win_num==0){
                    this.$el.className = 'winContainer-el hide';
                
                    setTimeout(()=>{
                        this.$el&&this.$el.parentNode&&document.body.removeChild(this.$el);
                    },300)
                }
                else{
                    this.$el&&this.$el.parentNode&&document.body.removeChild(this.$el);
                } 
                
                let d = [...document.querySelectorAll(".win-el-mask")].pop();
                d&&(d.style.opacity = "1");
            // }   

        },
        mounted(){
            
            if(!global.win_id){
                document.body.style.overflow = document.documentElement.style.overflow = 'hidden'; 
                let dom =  document.querySelector('#maincon');
               if(dom&&document.body.scrollHeight > utils.getWindowWH().h) dom.style.borderRight = '17px solid transparent';
            }
            let arr = document.querySelectorAll(".win-el-mask");
            for(let item of arr){
                item.style.opacity = "0";
            }
            this.$refs.mask.style.opacity = "1";
            this.win_id = global.win_id+=2;
            global.win_num++;

            window.addEventListener('resize',this.changeView)


            // this.$nextTick(()=>{

            //     this.sourceHeight = this.height == 'auto'?this.$refs.winBody.offsetHeight:this.height;
            //     this.$refs.winBody.style['max-height'] = this.sourceHeight  + 'px';

            //     if(this.sourceHeight+100 > utils.getWindowWH().h){
            //         this.$refs.winBody.style.height = utils.getWindowWH().h - 100 +'px';
            //     }
                
            // })
            let num = 30;
            this.timer = setInterval(()=>{
                if(this.$refs.winBody.children){
                    this.sourceHeight = this.height == 'auto'?this.$refs.winBody.offsetHeight:this.height;
                    this.$refs.winBody.style['max-height'] = this.sourceHeight  + 'px';

                    if(this.sourceHeight+100 > utils.getWindowWH().h){
                        this.$refs.winBody.style.height = utils.getWindowWH().h - 100 +'px';
                    }
                    clearInterval(this.timer);
                }
                num--;
                if(num<0){
                    clearInterval(this.timer);
                }
            },30)

            // if(this.isBody){
                this.sourceEle = this.$el.parentNode;
                document.body.appendChild(this.$el);
                if(global.win_num==1) this.$el.className = 'winContainer-el show';
            // } 
            
        }
    }

</script>
<style lang=  "less">


@keyframes hide{
    from{opacity:1}
    to{
        opacity:0
    }
}
@keyframes show{
    from{opacity:0}
    to{
        opacity:1
    }
}
    .winContainer-el{
        position:fixed;
        &.hide{
            animation: hide 0.3s;
            animation-fill-mode: forwards;
        }
        &.show{
            animation: show 0.3s ;
            animation-fill-mode: forwards;
        }
        .win-el {
            position:fixed;
            background-color: #fff;
            overflow: hidden;
            z-index: 4998;
            border-radius: 4px;
            .win-el-head {
                position: relative;
                background-color: #fff;
                width: 100%;
                height: 50px;
                line-height: 50px;
                overflow: hidden;
                text-align: center;
                border-bottom: 1px solid #e4e7ed;
            }
            .win-el-head-logo {
                float: left;
                width: 3px;
                height: 50px;
                background-color: #fbb03b;
                cursor: default;
            }
            .win-el-head-title {
                width: 100%;
                height: 50px;
                line-height: 50px;
                cursor: default;
                span{
                    font-size: 16px;color: #333;
                }
            }
            .win-el-head-close {
                position: absolute;
                right: 0;
                top: 0;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 20px;
                color: #666;
                cursor: pointer;
                &:hover{
                    background: #f5f7fa;
                    color: #333;
                }
            }
             .win-el-body {
                width: 100%;
                overflow:auto;
                height:auto;
                overflow-x:hidden;
            }
            .win-el-body-str {
                padding: 15px;
                width: auto;
                height: auto;
                line-height: 25px;
                font-size: 14px;
            }
            .win-el-bottom {
                width: 100%;
                text-align: right;
                overflow: hidden;
                padding: 20px;
                display: block;
                .win-el-cancel,.win-el-ok{
                    width: 20%;
                    min-width: 100px;
                }
            }
        }
        .win-el.center{
            top: 50%;
            transform: translate(0, -50%);
        }
        .win-el.right{
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
        }
        .win-el-mask {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(27, 21, 21,.6);
            /* background: url(../res/images/a50.png) repeat; */
            z-index: 997;
            opacity: 1;
        }
    }
    
</style>

