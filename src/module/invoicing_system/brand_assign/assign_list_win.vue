<template>
	<win :align="'center'" :width="winDesc.width || 920" :height="winDesc.height || 560" :ok="btnOk" :cancel="btnCancel" @winEvent="closeSelfWin" >
		<span slot="title">{{title}}</span>
		<div slot="content" id="paging-list">

			<div class="menu" v-if="showMenus">
				<div v-for="(item,index) in buttons" :key="index" @click="toggleMenu(item,index)" :class="{'select-btn':item.relAttr == selectMenu.relAttr}" class="button">{{item.name}}</div>
			</div>

			<div class="list" :style="{'max-height':listDivHeight+'px'}">
				<span :class="{'radio':(selects[0] && selects[0].id == item.id) && !radio,'checkbox':item.isSelect && radio,'none-select':item.notAllow}" :style="eleStyle" @click="chooseItem(item,index)" v-for="(item,index) in nowList" :key="index">{{item[fieldName]}}</span>
			</div>

            <div class="bottom" v-if="showTips">
				<template v-if="radio">
					<span class="btn" style="margin-left:20px;" :class="{'select-btn':selectRadio == 1}" @click="operationAll('checkbox')">全选</span>
					<span class="btn" :class="{'select-btn':selectRadio == 2}" @click="operationAll('radio')">反选</span>  
				</template>
                <span class="tips-word">已选择&nbsp;:&nbsp;{{selects.length>1 ? selects.length+'个'  : selects[0] &&selects[0][fieldName]}}</span>              
            </div>

			<div class="none-tips" v-if="dataList.length == 0">
				{{tips}}
			</div>
		</div>
	</win>
</template>
<script>
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				btnOk:{},				//弹窗的确认按钮
				btnCancel:{},			//弹窗的取消按钮
				selectRadio:0,			//全选,反选
				selects:[],				//选中的项
				dataList:[],			//所有的项
				nowList:[],				//当前展示的项
				buttons:[],
				selectMenu:{},
				listDivHeight:300,
			};
		},
		props: {
			btns:{
				type:Array,
				default:Array				//切换的按钮
			},
			winDesc:{
				type:Object,
				default:Object				//弹窗的宽高
			},
			ok:{
				type:Object,
				default:Object				//确认按钮
			},
			cancel:{
				type:Object,
				default:Object				//取消按钮
			},
			showTips:{
				type:Boolean,				//是否展示底部的信息
				default:true
			},
			showMenus:{
				type:Boolean,				//是否展示切换按钮
				default:true				
			},
			list:{
				type:Array,					//全部数据
				default:Array
			},
			selectList:{
				type:Array,					//选中的数据
				default:Array
			},
			radio:{
				type:Boolean,				//多选还是单选,默认多选
				default:true
			},
			tips:{
				type:String,
				default:'没有该数据信息!'		//没有数据展示时的提示信息
			},
			title:{
				type:String,
				default:'添加单位'			  //弹窗标题
			},
			fieldName:{
				type:String,
				default:'goodsName'				//要展示的字段名
			},
			relAttr:{
				type:String,
				default:'type'				//数组中的元素与按钮的关联字段
			},
			eleStyle:{
				type:Object,				//禁止选中样式
				default:Object
			}
		},
		watch:{
			selectList:function(){
				this.initData();
			},
			list:function(){
				this.initData();
			},
			ok:function(){
				this.initBtn();
			},
			cancel:function(){
				this.initBtn();
			}
		},
		methods: {
			closeSelfWin(res) {
				let arr = [];
				if(res == 'ok'){
					arr = this.selects;
				}else{
					arr = [];
				}
				arr = utils.deepCopy(arr);
				this.$emit('throwCommonWin', arr, res);

			},

			operationAll(flag){
				if(!this.radio) return;
				let obj = {};		
				if(flag == 'checkbox'){
					this.selectRadio = 1;
					obj = this.initSelect(this.nowList,[],false,true);
				}else{
					this.selectRadio = 2;
					obj = this.initSelect(this.nowList,this.selects,false,true);
				}

				this.nowList = [...obj.arr];

				this.selects = this.getSelects(this.dataList);
			},
			chooseItem(item){
				if(item.notAllow) return;				//当字符中含有该字符时,不可以取消

				item.isSelect = !item.isSelect;
				if(this.radio){
					if(item.isSelect){
						this.selects.push(item);
					}else{
						for(let i = 0,len = this.selects.length;i < len;i += 1){
							if(item.id == this.selects[i].id){
								this.selects.splice(i,1);
								break;
							}
						}
					}
				}else{
					this.selects = item.isSelect ? [item] : [];
				}
			},
			toggleMenu(item){
				let relAttr = item.relAttr;
				this.selectMenu = item;

				if(relAttr == 0){
					this.nowList = [...this.dataList];
				}else{
					this.nowList = this.dataList.filter((ele)=>{
						return ele[this.relAttr] == relAttr;
					});
				}
			},


			getSelects(list=[]){
				let arr = [];
				for(let ele of list){
					if(ele.isSelect){
						arr.push(ele);
					}
				}
				return arr;
			},
			listGetAttr(arr,attr = 'id'){
				let attrs = [];
				arr.forEach((ele,index)=>{
					attrs[index] = ele[attr]+'';
				});
				return attrs;
			},
			listAddAttr(category,attr='toggle',val = true){
				let arr = category.map((ele)=>{
					ele[attr] = val;
					return ele;
				});
				return arr;
			},
			initSelect(...reset){
				let [list=[],selList=[],ok=true,cancel=false] = reset,
					ids = [],
					obj = {arr:[],sel:[],no:[]};

				if(selList.length ==0 ){
					ids = [null];
				}else{
					if(selList[0] && typeof selList[0] == 'object'){
						ids = this.listGetAttr(selList,'id');
					}else{
						ids = selList;
					}
				}

				for(let ele of list){
					for(let i = 0;i < ids.length; i+=1){
						if(ele.id == ids[i]){
							ele.isSelect = ok;
							obj.sel.push(ele);
							if(ids.length > 1){
								ids.splice(i,1);
							}
							break;
						}else{
							ele.isSelect = cancel;
						}
					}
					if(ele.isSelect == cancel) obj.no.push(ele);
				}

				obj.arr = [...list];

				return obj;
			},
			initBtn(){
				let h = this.winDesc.height || 560,
					offset = this.showMenus ? h - 60 : h;
				
				if(this.showTips) offset = offset - 50;
				this.listDivHeight = offset - 50;

				if(!this.ok.content) this.btnOk = {content:'确认',style:'background-color:#ff8d01'};
				if(!this.cancel.content) this.btnCancel = {content:'取消',style:'background-color:#9fa0a0'};

				this.buttons = [
					{relAttr:0,name:'全部'},
					{relAttr:1,name:'直营店'},
					{relAttr:2,name:'加盟店'}
				];
				if(this.btns.length>0) this.buttons = this.btns;
				
			},
			initData(){
				let obj = {};
				this.dataList = this.list;
				this.selects = this.selectList;
				obj = this.initSelect(this.dataList,this.selects,true,false);
				this.selects = obj.sel;
				this.dataList = obj.arr;


				//测试数据

				// this.dataList.forEach((ele)=>{
				// 	let ran = Math.random()*10;
				// 	ran = ran.toFixed();
				// 	ran = ran%2+1;
				// 	ele[this.relAttr] = ran;
				// });
				
				this.selectMenu = this.buttons[0];
				this.toggleMenu(this.selectMenu);
			}

		},
		mounted() {
			this.initBtn();
			this.initData();
		},
		components: {
			win: () =>
				import( /*webpackChunkName:'win'*/ 'src/components/win'),
		}
	};
</script>
<style lang='less' scoped>
	#paging-list {
		@bg:#f7f7f7;
		@fc:#999;
		@y:#ff8d01;
		@blue:#28a8e0;
		@pd:50px;
		padding: 20px 0px;
		background-color: @bg;
		min-height:250px;
		height:100%;
		.none-tips {
			color: #f7ab53;
			font-size: 20px;
			text-align: center;
			margin-top: 50px;
		}
		.whb(@width,@height,@border:none){
			height:@height;
			width:@width;
			border:@border;
		}
		.lfc(@line,@font,@color){
			line-height: @line;
			font-size:@font;
			color:@color;
		}
		.clear{
			content:"";
			display: block;
			line-height: 0;
			visibility: hidden;
			clear: both;
		}
		.menu{
			padding-left:@pd;
			padding-bottom:20px;
			.button{
				.whb(120px,40px);
				.lfc(40px,16px,#333);
				border-radius:5px;
				background-color: #fff;
				display: inline-block;
				margin-right:12px;
				text-align: center;
				cursor: pointer;
			}
			.select-btn{
				background-color: @blue;
				color:#fff;
				text-align: center
			}
		}

		.list{
			padding: 0 50px;
			overflow: auto;
			&:after{
				.clear;
			}
			span {
				margin-right: 10px;
				margin-bottom: 10px;
				height: 40px;
				min-width: 100px;
				padding: 0 15px;
				float: left;
				text-align: center;
				line-height: 38px;
				vertical-align: middle;
				border: 1px solid #d2d2d2;
				color: #333;
				font-size: 14px;
				cursor: pointer;
				background-color: #fff;
			}
			.radio {
				border: 1px solid #f8931f;
				color: #f8931f;
			}
			.checkbox {
				.radio;
				background: url('../../../res/images/sign.png') #fff right bottom no-repeat
			}
			.none-select{
				color: #333;
				cursor: not-allowed;
				border:1px solid #ccc;
			}
		}

        .bottom{
            position: absolute;
            bottom:50px;
            .whb(100%,50px,none);
            background: #fff;
			line-height: 50px;
            .btn{
                .whb(80px,25px,1px solid #9fa0a0);
                .lfc(23px,14px,#9fa0a0);
                cursor: pointer;
                text-align: center;
                display: inline-block;
                margin-right:7px;
                user-select: none;
            }
            .select-btn{
                border:1px solid @y;
                color:@y;
            }
            .tips-word{
                color:@y;
                font-size:14px;
				float:right;
				margin-right: 20px;
            }
        }
	}
</style>