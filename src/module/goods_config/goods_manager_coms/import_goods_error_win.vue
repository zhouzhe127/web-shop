<template>
<div>
	<win :align="'center'" :type="'alert'" @winEvent="closeSelfWin" :height="600" :width="980" :ok="btnOk">
		<span slot="title">商品导入错误信息</span>
		<div id = "goods-sync" slot="content">
			<section  v-for = "(item,index) in errorgoodsList" style="width: 100%;height: auto;" :key="index">
				<div style="width:100%;height: auto;overflow: hidden;">
					<h3 class="sucTitle" :title="item.goodsName">{{item.goodsName}} :</h3>
					<h3 style="width:70%;height: auto;line-height: 40px;text-align: left;float: left;font-size: 14px;">{{item.info}}</h3>
				</div>
			</section> 
		</div>
	</win> 
</div>  
</template>
<script>
	export default {
		data(){
			return {
				errorgoodsList:[],
				errorInfo:'',
				btnOk:{
					content:'确认',
					style:'background-color:#f8941f;'
				}
			};
		},
		props:{
			pObj:null,//导入失败返回的字符串
		},
		mounted(){
			//>斤两菜:商品已存在;>fsfsd:多规格等于100038主商品数据有误或不存在,请检查并纠正;>gg:子商品总数错误,至少两个最多三个,请检查子商品错误并纠正;>实打实:子商品有错误,请检查子商品并纠正;>ccccccc:子商品总数错误,至少两个最多三个,请检查子商品错误并纠正;>22:该规格下子商品有重名,请检查并纠正
			this.initData();
			this.errorgoodsList=this.getGoods(this.errorInfo);
		},
		methods:{
			initData(){
				this.errorInfo=this.pObj.errorInfo;
			},
			getGoods(str){
				let temp=str.split('>');
				let arr=[];
				temp.forEach((ele,index)=>{
					if(index!=0){
						let group=ele.split(':');
						let obj={
							goodsName:group[0],
							info:group[1]
						};
						arr.push(obj);
					}
				});
				return arr;
			},
			closeSelfWin(){
				this.$emit('throwAddGoodsWin','close');
			},
		},
		components:{
			win:()=>import (/*webpackChunkName:'win'*/'src/components/win'),
		}

	};
</script>
<style type="text/css" scoped>
	#goods-sync{padding:10px 30px;padding-bottom: 60px;}
	#goods-sync ul{width:100%;height:auto;overflow: hidden;}
	#goods-sync ul li{
		min-width:120px;
		height:45px;
		line-height: 45px;
		float: left;
		text-align: center;
		padding:0 10px;
		cursor: pointer;
	}
	#goods-sync .sucTitle{width:20%;height: 40px;line-height: 40px;text-align: right;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;float: left;font-size: 14px;color: #ea3b44;}
	#foodDetial input:disabled{background-color: #fff!important;}
</style>

