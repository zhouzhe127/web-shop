<template>
<!--
	@百川-曾伟福
-->
<!-- 口味显示列表 -->
<div id="attr_manager">

	<section>
		<el-table ref="multipleTable" stripe :header-cell-style = "{'background-color':'#f5f7fa'}" :data="showTaste" border style="width:90%">
			<el-table-column fixed min-width = "100" align="center" label="操作">
				<template slot-scope="scope">
					<span style="color: #FE8D2C;cursor:pointer" @click="openAttrWin(scope.row)">编辑</span>
					<span style="padding:0 5px;color: #D2D2D2">|</span>
					<span style="color: #FD3F1F;cursor:pointer" @click="del(scope.row)">删除</span>
				</template>
			</el-table-column>
			<el-table-column show-overflow-tooltip min-width = "50" align="center" prop="sort" label="排序"></el-table-column>
			<el-table-column show-overflow-tooltip min-width = "120" align="center" prop="name" label="口味分组"></el-table-column>
			<el-table-column show-overflow-tooltip min-width = "50"  align="center" prop="optionsNum"  label="口味属性（个）"> </el-table-column>
			<el-table-column show-overflow-tooltip min-width = "50"  align="center" prop="goodsNum"  label="关联菜品（个）"> </el-table-column>
			<el-table-column  min-width="50" align="center" label="来源" v-if="ischain == 1 || ischain == 2">
				<template slot-scope="scope">
					<span v-if="scope.row.id <100000">品牌</span>
					<span v-else>门店</span>
				</template>
			</el-table-column>
		</el-table>
	</section>

	<section style="margin-top: 10px">
		<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="page" :page-size = "num"
					   layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
	</section>



	<!--<div class="taste-show">-->
		<!--<ul class="tas-variety" v-cloak>-->
			<!--<div class="media-div" ref="addGoods" >-->
				<!--<li :style="{'height':listHeight+'px'}" class="first-list" v-on:click="openAttrWin">-->
					<!--<div>-->
						<!--<span class="tas-add">-->
							<!--<img src="../../res/images/comadd.png"/>-->
						<!--</span>-->
						<!--<i class="taste-i">新建口味</i>-->
					<!--</div>-->
				<!--</li>-->
			<!--</div>-->

			<!--<div class="media-div" v-for="(value,index)  in taste" :key="index">-->
				<!--<li :style="{'height':listHeight+'px'}" class="taste-list" v-on:click="openAttrWin(value)">-->
					<!--<div class="split-line"></div>-->

					<!--<div class="attr-container">-->
						<!--<span class="attr-name" :title="value.name">{{value.name}}</span>    -->
						<!--<span class="attr-num">{{index+1}}</span>-->
						<!--<section class="shopTag" v-if="ischain == 1 || ischain == 2">-->
							<!--<span style="background-color: #fcaa30;color: #fff;" v-if="value.id < 100000">品牌</span>-->
							<!--<span style="background-color: #6cc2e6;color: #fff;" v-else>门店</span>-->
						<!--</section>  -->
						<!--<div class="attr-details">-->
							<!--<div class="attr-options">-->
									<!--<div>-->
										<!--口味属性（个）-->
									<!--</div>-->
								<!--<div class="attr-options-num">-->
									<!--{{value.optionsNum}}-->
								<!--</div>-->
							<!--</div>-->
							<!--<div class="attr-relative">-->
								<!--<div>-->
									<!--关联菜品（个）-->
								<!--</div>-->
								<!--<div class="attr-options-num">-->
									<!--{{value.goodsNum}}-->
								<!--</div>-->
							<!--</div>-->
						<!--</div>-->
					<!--</div>-->
				<!--</li>-->
			<!--</div>-->
		<!--</ul>-->
	<!--</div>-->

	  <component
		:is="showCom"
		@throwAddAttrWin='closeGetAddAttrWin'
		@throwSyncAttr="funGetSyncAttr"
		:pObj="comObj"
	  ></component>
</div>
</template>
<script>
	/*
		1)同步口味之后,再次同步时,状态checkStatus还是1???
		
		1)每个口味至少有一个口味属性,不能添加重复的口味属性
		2)添加关联商品去除自定义菜
	*/
	import storage  from 'src/verdor/storage';
	import http from 'src/manager/http';
	export default{
		data:function(){
			return {
				showTaste:[],               //当前展示的口味列表
				taste: [],                  //存储所有的口味
				isBrand: null,              //判断是否是品牌,是否有同步功能
				ischain:null,                 
				shopId:null,                //店铺id 
				showCom:null,               //展示弹窗
				comObj:{
					title:null,             //添加口味弹窗标题
					editTasteId:null,       //当前编辑的口味
					taste:null,             //所有的口味
				},
//				listHeight:200,

				num: 10, //一页处理多少数据
				total: 0, //总页数
				page: 1, //当前第几页

				userData:{},
			};
		},
		created(){
			let arr = [{name:'新建口味',className:'pick',fn:()=>{
				this.openAttrWin();
			}}];
			this.$store.commit('setPageTools',arr);
		},
		mounted:function(){
			this.initData();
			this.funGetAttr();
//			this.windowResize();
//			window.addEventListener('resize',this.windowResize,false);
		},
		methods:{
			//删除
			del(item){
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'confirm',
					content: `确认删除该口味？`,
					callback: delRes => {
						if (delRes == 'ok') {
							this.delAttr(item)
						}
					}
				});
			},
			async delAttr(item) {
				let res = await http.delAttr({
					data: {
						shopId: this.userData.currentShop.id,
						brandId: this.userData.currentShop.brandId,
						id:item.id
					}
				});
				if(res){
					this.taste=this.taste.filter((ele)=>{
						return ele.id!=item.id;
					});
					this.paging();
				}
			},
			//分页
			paging() {
				this.total = Math.ceil(this.taste.length / this.num); //获取总页数
				this.showTaste = this.taste.slice((this.page - 1) * this.num, (this.page - 1) * this.num + this.num
				); //截取当前页数据
			},
			//每页显示几条数据
			numChange(e){
				this.num=e;
				this.paging();
				console.log(e);
			},
			//切换到第几页
			pageClick(e){
				this.page=e;
				this.paging();
				console.log(e)
			},
			//获取--编辑口味弹窗的结果
			closeGetAddAttrWin(res,ret){
				switch(res){
					case 'edit':
						this.taste=this.taste.map((ele)=>{
							if(ele.id==ret.id){
								return ret;
							}else{
								return ele;
							}
						});
						this.taste=this.sortAttr(this.taste);
						break;
					case 'add':
						this.taste.push(ret);
						this.taste=this.sortAttr(this.taste);
						break;
					case 'delete':
						this.taste=this.taste.filter((ele)=>{
							return ele.id!=ret;
						});
				}
				this.paging();
				this.showCom='';
			},
			//关闭-----同步窗口
			funGetSyncAttr(res){
				this.showCom='';
				if(res=='update') this.funGetAttr();
			},
			//添加,编辑口味
			openAttrWin(item){
				console.log(item);
				this.showCom='attrAdd';
				let id=null;
				let title=null;
				if(item){
					id=item.id;
					title='编辑口味';
				}else{
					title='添加口味';
					id=null;
				}
				this.comObj={
					title:title,
					editId:id,
					taste:this.taste,
				};

			},
			sortAttr(attr){
				let temp=[];
				temp=attr.sort((x,y)=>{
					if(x.sort==y.sort){
						return x.id-y.id;
					}else{
						return Number(x.sort)-Number(y.sort);
					}
				});
				return temp;
			},
			//初始化数据
			initData(){
				//获取登录信息
				this.userData = storage.session('userShop');
				this.shopId=this.userData.currentShop.id;
				this.ischain=this.userData.currentShop.ischain;
				this.isBrand=(this.userData.currentShop.ischain =='1' || this.userData.currentShop.ischain =='2') ? true: false;

				if(this.isBrand){
					this.$store.commit('setPageTools',{
						sync:()=>{this.showCom='attrAsync'}
					});
				}
			},
			//获取口味列表
			async funGetAttr(){
				let res=await http.getAttr({data:
					{shopId:this.shopId}
				});
				console.log(res);
				this.taste=res;
				this.taste=this.sortAttr(this.taste);
				this.paging();
			},
//			windowResize(){
//				let width = this.$refs.addGoods.offsetWidth-10;
//				this.listHeight = width*2/3;
//			}
		},
		components:{
			attrAdd:()=>import (/*webpackChunkName:'attr_add_win'*/'./attr_coms/attr_add_win'),
			attrAsync:()=>import (/*webpackChunkName:'attr_sync_win'*/'./attr_coms/attr_sync_win'),

		},
		filters:{
			divide(str){
				if(str.length<7){
					return str;
				}else{
					return str.substr(0,7)+'...';
				}
			}
		},
//		beforeDestroy(){
//			window.removeEventListener('resize',this.windowResize);
//		}
	};
</script>
<style lang="less" scoped>
#attr_manager{
	/*padding-top:30px;*/
	position: relative;
	.whb(@width,@height,@border:none){
		height:@height;
		width:@width;
		border:@border;
	}
	.lfc(@line,@font,@color){
		line-height: @line;
		font-size:@font;
		color:@color;
	};	
	.media-div{
		width:20%;
		float:left;
		max-width: 310px;
		padding:0 10px 20px 0;;
		@media screen  and (max-width:1400px){
			width:25%;
		}
		@media screen  and (max-width:1200px){
			width:33.33%;
		}
		@media screen  and (max-width:1024px){
			width:50%;
		}
	}
	ul.tas-variety{
		&:after{
			content:'';
			display: block;
			visibility: hidden;
			line-height: 0;
			clear:both;
		}
		.list-common{
			width:100%;
			background-color: #efefef;
			cursor: pointer;
		}
		.first-list{
			.list-common;
			text-align: center;
			font-size: 14px;
			padding-top:20%;
			span {
				display: block;
				margin-bottom: 10px;
			}
			.taste-i{
				font-size:20px;
				color:#898989;
			}
		}
		.taste-list{
			.list-common;
			position: relative;
			.split-line{
				background-color: #00a0e9;
				height:10px;
				opacity:0.7;
				position: relative;
			}
			.attr-name{
				color: #353535;
				display: block;
				font-size: 24px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width:70%;
			}
			.attr-container{
				padding:7% 5% 5%;
			}
			.attr-num{
				position: absolute;
				top:8%;
				right:0;
				padding-right:5%;
				font-size: 72px;
				color:#008ed6;
				opacity: 0.2;
			}
			.attr-details{
				position: absolute;
				bottom:0;
				width:90%;
				padding-bottom:5%;
				.attr-options{
					float:left;
					font-size: 16px;
					width:50%;
					border-right: 1px solid #7a7a7a;
				}
				.attr-options-num{
					margin-top: 5px;
				}
				.attr-relative{
					float:right;
				}
			}
		}
	}
	.shopTag {
		position: absolute;
		top:50%;
		span{
			background: rgba(127,127,127,0.6);
			border-radius: 30px;
			padding: 7px 11px;
			display: inline-block;
		}
	}

}

</style>