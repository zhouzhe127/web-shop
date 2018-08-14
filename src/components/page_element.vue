<!--
    **  分页组件，带调节页数，跳转页数
    * 
    * 孔伟研
    * *
    * 
-->
<template>
	<ul class="tab-list page">
        <div v-if="!isNoPaging" :class="{'pageBox':isMaxWidth,'pageBox aPageBox':!isMaxWidth}">
            <span style="float:left;">每页显示</span>
            <div class="select-body">
                <div @click="showSort" class="select-body-btn" ref="selectBtn">
                    <span :title="nums" style="width:40px" class="text-ellipsis">{{nums}}</span>
                    <em class="fi fi-sort-down"></em>
                </div>
                <ul v-if="!isTop" v-show="sortSel" class="tableListUl text-ellipsis">
                    <li v-for="(item,index) in pagenumArr" @click="sortselShow($event,item)"  :title="item" :key="index" :class="{current:item==nums}">{{item}}</li>
                </ul>
                <ul v-if="isTop" v-show="sortSel" class="tableListUl text-ellipsis" :style="{bottom:isMaxWidth ?39 +'px' :30 +'px'}">
                    <li v-for="(item,index) in pagenumArr" @click="sortselShow($event,item)"  :title="item" :key="index" style="border-bottom:0;border-top:1px #b3b3b3 solid;">{{item}}</li>
                </ul>
            </div>
            <span>行</span>
        </div>
		<li :class="{'oLi':isMaxWidth,'oLi aLi':!isMaxWidth}" v-if="total > showpages">
			<a class="fi fi-double-angle-left" href="javascript:void(0)" @click="firstPage" style="font-size: 30px;"></a>
		</li>
		<li :class="{'oLi':isMaxWidth,'oLi aLi':!isMaxWidth}" v-if="total > showpages">
			<a class="fi fi-angle-left" href="javascript:void(0)" @click="prePage(false)" style="font-size: 26px;">
				<!-- &lt; -->
			</a>
		</li>
		<li v-for="i in showpages" :key="i" v-if="i+offset-1 < total" :class="{'oLi':isMaxWidth,'oLi aLi':!isMaxWidth,'active':currentPage == i+offset}">
			<a href="javascript:void(0)" @click="handlePage(i,offset)">{{i+offset}}</a>
		</li>
		<li :class="{'oLi':isMaxWidth,'oLi aLi':!isMaxWidth}" v-if="total > showpages">
			<a class="fi fi-angle-right" href="javascript:void(0)" @click="nextPage(false)" style="font-size: 26px;"></a>
		</li>
		<li :class="{'oLi':isMaxWidth,'oLi aLi':!isMaxWidth}" v-if="total > showpages">
			<a class="fi fi-double-angle-right" href="javascript:void(0)" @click="endPage" style="font-size: 30px;"></a>
		</li>
		<span :class="{'spanTotal':isMaxWidth,'aspanTotal':!isMaxWidth}" style="">共{{total}}页</span>
		<span class="oSpan" v-if="!isNoJump" style="">到第<input class="oInJump" @keyup.enter="jump(jumpnum,0)" v-model="jumpnum" type="text" style="">去</span>
		<a  :class="{'oClick blue':isMaxWidth,'aClick blue':!isMaxWidth}" class="oClick blue" v-if="!isNoJump" href="javascript:void(0);" style="" @click="jump(jumpnum,0)">确定</a>
        
    </ul>
</template>
<script type="text/javascript">
    import store from "src/manager/store";
	export default{
		props: {
            page:Number, // 当前第几页 必传
            total:Number, // 总页数 必传
            num:Number,//每页显示的数量,可不传，默认10，若自己的页面不想显示10条，必传
            numArr:Array, //每页显示多少的数组，可不传，有默认值 格式[10,20,30,40]
            isNoJump:Boolean,//是否显示跳页 默认显示
            isNoPaging:Boolean,//是否显示每页显示 默认显示
            showPageNum:Number,//页面可显示的页--数量 可不传 默认10页按钮
        },
        watch:{
        	"currentPage":function(){
        		this.$emit('pageNum',{page:this.currentPage,num:this.nums});
            },
            "nums":function(){
                this.jumpnum = '';
                this.currentPage = 1;//改变每页显示数，让页数置为一,跳转页为空
                this.$emit('pageNum',{page:this.currentPage,num:this.nums});
            },
            'page':function(){
                this.currentPage = this.page;
                //如果传的页码比偏移量大，说明是非正常途径（不是操作组件信息），让所传页码🐎🐎排第一
                if(this.currentPage<this.offset){
                    this.offset = this.currentPage-1;
                }
            },
            'total':function(){//搜索时，初始话偏移量为0，页码选择为1
                this.offset = 0;
            }
        },
        beforeMount:function(){
            if(this.numArr){
                this.pagenumArr = this.numArr;
            }
        },
        components: {
            // selectBtn: ()=> import( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'), // 下拉
        },
        mounted: function() {
            if(this.num) {
                this.nums = this.num;
            }else{
            }
            var result = window.matchMedia('(max-width: 1280px)');
            if (result.matches) {
                this.isMaxWidth = false;
            } else {
                this.isMaxWidth = true;
            }
            if(this.showPageNum){
                this.showpages = this.showPageNum;
            }
            this.currentPage = this.page;
        },
        data: function() {
            return {
                showpages: 10, // 默认显示10页
                offset: 0, // 当前页面偏移量
                jumpnum: '',//输入跳转
                currentPage:1,
                pagenumArr: [10,20,50],
                nums:10,//默认一页显示10条

                isTop:false,//是否超过一定值，顶上
                sortSel:false,
                isMaxWidth:true,
            };
        },
        methods: {
            showSort(e) {
				if(!this.sortSel){
					this.sortSel = true;
					document.addEventListener('click',this.close);
				}else{
					this.sortSel = false;
					document.removeEventListener('click',this.close);
                }
                e=e||window.event;
                var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
                var y=e.pageY||(e.clientY+scrollY);
                var pingY =  window.innerHeight;
                if(pingY - y < (this.isMaxWidth?40:29)*(this.pagenumArr.length+1)){
                        this.isTop = true;
                        this.pagenumArr = this.pagenumArr.reverse()
                }else{
                        this.isTop = false;
                        this.pagenumArr = this.pagenumArr.sort()
                }
			},
			sortselShow(event,item) {
				event.stopPropagation();
                this.nums = item;
                this.close(event);
			},
			close(event){
				var banDom = this.$refs.selectBtn.getElementsByTagName('*'),
					isBan = true;
				for(var i=0;i<banDom.length;i++){
					if(event.target == banDom[i]) isBan = false;
				}
				if(isBan){
					this.sortSel = false;
					document.removeEventListener('click',this.close);
				}
			},
            firstPage: function() {
                this.offset = 0;
                this.currentPage = 1;
            },
            endPage: function() {
                this.offset = this.total - this.showpages;
                if(this.offset < 0) {
                    this.offset = 0;
                }
                this.currentPage = this.total;
            },
            prePage: function(b) {
                var offset = this.offset;
                var newoffset = this.offset;
                newoffset -= Math.ceil(this.showpages / 2);
                if(newoffset < 0) {
                    newoffset = 0;
                }
                this.offset = newoffset;
                if(!b) this.currentPage += newoffset - offset;
            },
            nextPage: function(b) {
                var offset = this.offset;
                var newoffset = this.offset;
                newoffset += Math.ceil(this.showpages / 2);
                if(newoffset > this.total - this.showpages) {
                    newoffset = this.total - this.showpages;
                    if(newoffset < 0) newoffset = 0;
                }
                this.offset = newoffset;
                if(!b) this.currentPage += newoffset - offset;
            },
            handlePage:function(i, offset) {
                var cpage = i + offset;
                var offset = cpage - this.page;
                if(cpage <= this.offset + Math.ceil(this.showpages / 2)-1) {
                    this.prePage(true);
                } else if(cpage >= this.offset + this.showpages - 1) {
                    this.nextPage(true);
                }
                this.currentPage = cpage;
            },
            jump: function(i,offset){
            	var g = /^[1-9][0-9]*$/;
            	if(!g.test(i)){
                    this.$store.commit("setWin",{content:"跳转页请输入正整数,且不为0！"});
            		return false;
                }
                if(i=='')return;
            	var cpage = parseInt(i) + offset;
                var newoffset = this.offset;
                if(newoffset < -5){
                	return false;
                } 
                	
                newoffset = i - 5;
                if(newoffset>this.total-5) {
					return false;
                }
                this.offset = newoffset
                if(newoffset<0){
                	this.offset = 0
                }
                this.currentPage = cpage;
                if(i>this.total){
                	this.page = this.total
                }
            }
        },
	}
</script>

<style v-if="isMaxWidth" lang="less" scoped>
    .tab-list {
        display: inline-block;
        vertical-align: middle;
        height: 40px;
        list-style: none;
        .oLi {
            width: 40px;
            height: 40px;
            box-sizing: border-box;
            text-align: center;
            line-height: 40px;
            float: left;
            border: 1px solid #ccc;
            background: #fff;
            margin: 0 5px;
            &.active{
                width: 40px;
                height: 40px;
                line-height: 40px;
            }
            a {
                display: inline-block;
                width: 40px;
                height: 40px;
                box-sizing: border-box;
                text-align: center;
                line-height: 40px;
                text-decoration: none;
                color: #28a8e0;
            }
            &:hover{
                width: 40px;
                height: 40px;
                line-height: 40px;
                color: #fff;
            }   
        }
        .oLi.active {
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: #29AAE3;
            box-sizing: border-box;
            border: 1px solid #29AAE3;
            color: #FFFFFF;
        }
        .oLi:hover {
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: #ccc;
            box-sizing: border-box;
            border: 1px solid #ccc;
            color: #FFFFFF;
        }
        .oLi:hover a,
        .oLi.active a {
            box-sizing: border-box;
            color: #FFFFFF;
        }
        .aLi {
            width: 30px;
            height: 30px;
            line-height: 30px;
            margin: 0px 2px;
            &.active{
                width: 30px;
                height: 30px;
                line-height: 30px;
            }
            a {
                width: 30px;
                height: 30px;
                line-height: 30px;
            }
            &:hover{
                width: 30px;
                height: 30px;
                line-height: 30px;
            }   
        }
        .aLi.active {
            width: 30px;
            height: 30px;
            line-height: 30px;
        }
        .aLi:hover {
            width: 30px;
            height: 30px;
            line-height: 30px;
        }
        .spanTotal{line-height: 40px;}
        .aspanTotal{line-height: 30px;}
        .oSpan{margin-left: 5px;margin-right: 5px}
        .oInJump{text-align: center;width: 30px;height: 25px;margin: 0 3px;}
        .oClick{width: 60px;height: 40px;line-height: 40px;}
        .aClick{width: 40px;height: 30px;line-height: 30px;}
    }
    input{
        -webkit-appearance: none; 
        -moz-appearance: none;
        -o-appearance: none;
        border: 1px solid #ccc;
        padding: 0;
    } 
    .tab-list .pageBox{float: left;padding: 0 10px;}
    .tab-list .pageBox span{
            display: inline;
            line-height: 40px;
            vertical-align: middle;
        }
    .tab-list .pageBox .pageSelect{
            vertical-align: middle;
            display: inline-block;
        }
    .tab-list .pageBox  .paging{
            vertical-align: middle;
        }
    .pageBox .select-body{
		position: relative;display: inline-block;line-height: normal;
		.select-body-btn {
			vertical-align: middle;display: inline-block;border: #b3b3b3 solid 1px;overflow: hidden;cursor: pointer;
            em{width: 35px;height: 40px;float: right;text-align: center;
                line-height: 28px;border-left: 1px solid #ccc;font-size:24px;
                color: #b3b3b3;
			}
			span {
				width: 150px;height: 38px;line-height: 38px;
				text-align: center;color: #666666;float: left;
			}
		}
		ul{width: 100%;overflow: auto;overflow-x: hidden;margin: 0;position: absolute;z-index: 10;
			background: #fff;border: 1px #b3b3b3 solid;border-top: 0;
			li{width: 100%;text-align: center;height: 39px;line-height: 38px;border-bottom: 1px #b3b3b3 solid;background: #fff;cursor: pointer;
				&:hover {
					background: #f1f1f1;
				}
			}
			li:last-child{border-bottom: 0;}
		}
    }
    .tab-list .aPageBox span{line-height: 30px;}      
    .tab-list .aPageBox .select-body{
		.select-body-btn {
            em{width: 35px;height: 30px;
                line-height: 23px;font-size:20px;
			}
			span {
				width: 150px;height: 28px;line-height: 28px;
			}
		}
		ul{
			li{height: 29px;line-height: 28px;
			}
		}
    }
</style>
