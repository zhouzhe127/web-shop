<template>
    
    <div id= "global_broadcast">
            <win v-if="show" @winEvent = "winEvent" :type="winType" :isBody='false' :ok='ok' :cancel="cancel" :maskShow='maskShow'>
                <span slot="title">{{title}}</span>
                <div slot="content" class="slotContent">
                    <div>
                        <span>{{content}}</span>
                    </div>
                </div>
            </win>
    </div>
    
</template>
<script>

    import win from "./win.vue";

    export default{
        props:{
            type:null
        },
        data(){
            return {
            }
        },
        methods:{
            winEvent(str){
                this.callback(str);
                this.$store.commit("setWin",{show:false});
            }

        },
        watch:{
            show(val){
                if(val && this.timerPowerOff){
                    setTimeout(()=>{
                        this.callback('ok');
                        this.$store.commit("setWin",{show:false});
                    },this.timerPowerOff)
                }
            }
        },
        computed:{
            timerPowerOff(){
                return this.$store.state.win.time||this.$store.state.win.timerPowerOff
            },
            show(){
                return this.$store.state.win.show;
            },
            title(){
                return this.$store.state.win.title||'提示信息';
            },
            content(){
                return this.$store.state.win.content;
            },
            winType(){
                return this.$store.state.win.winType || 'alert';
            },
            callback(){
                return this.$store.state.win.callback || function(){};
            },
            ok(){
                return this.$store.state.win.ok;
            },
            cancel(){
                return this.$store.state.win.cancel;
            },
            maskShow(){
                return this.$store.state.win.maskShow==undefined?true:false;
            }
        },
        components:{win}
    }

</script>
<style lang=  "less">
    /* #global_broadcast{ */
        div.slotContent{
            height:100%;
            display: table;
            width:100%;
            vertical-align: middle;
            div{
                display: table-cell;
                text-align: center;
                vertical-align: middle;
            	height: 100%;
            	padding: 10px 20px;
            	line-height: 1.5;
            }
            
        }
    /* } */
</style>

