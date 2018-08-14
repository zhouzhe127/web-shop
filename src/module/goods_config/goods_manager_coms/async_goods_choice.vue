
<template>
	<div>
	   <win @winEvent="goodListWin" :align="'center'" :width="600" :height="200" :ok="okStyle">
		<span slot="title">{{title}}</span>
		<div  slot="content" >
			<section id="configTan">
				<section style = "border-bottom: 1px solid #ccc;">
					<span @click="choseAll" class="aLi" :class="{'shoName-select':isAll}">{{goIncom == 'goods'?'商品':'套餐'}}完整信息</span>
					<span style="display: inline-block;color:#b3aeae;">
						<img style = "margin: -4px 5px;" src = "../../../res/images/prompt.png">
						如需同步门店尚未同步过的{{goIncom == 'goods'?'商品':'套餐'}}必须选择'{{goIncom == 'goods'?'商品':'套餐'}}完整信息'
					</span>
				</section>
				<section>
					   <span v-on:click="choseGood(item)" v-for="(item,index) in typeArr" :key="index" class="aLi"
							 :class="{'shoName-select':item.selected}">{{item.name}}</span>
				</section>
				<!--
				<div style="width:100%;height: 40px;background-color: #f7f7f7;position: fixed;bottom: 50px;left: 0;">
					<section v-on:click = "allGoods(0)" class="isallselect"  :class="{'allselect':!allSelect}">取消全部</section>
					<section v-on:click = "allGoods(1)" class="isallselect"  :class="{'allselect':allSelect}">选择全部</section>
					<h3 style="width: 160px;height: 40px;line-height: 40px;float: right;color: #FF9700;">已选择{{selectArr.length}}个</h3>
				</div>
				-->
			</section>
		</div>
	   </win>
		<goodListWin
				v-if="showTan"
				@goodListWin="doThrowTanResult"
				:goodsIds="[]"
				:isGoods="true"
				:goInName="goInName"
				:isOnlyGoods="true"
				:asyncGoods="asyncGoods"
				:isAllOrOther="(selectArr.length==4)?true:false"
				:categoryList="categoryList"
		></goodListWin>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage  from 'src/verdor/storage';
	export default{
		data(){
			return{
				okStyle:{
					content:'下一步',
					style:'background-color:#f8941f'
				},
				typeArr:[{name:'商品名称',selected:false,type:'1'},{name:'商品价格',selected:false,type:'2'},
					{name:'商品图片',selected:false,type:'3'},{name:'其他信息',selected:false,type:'4'}],
				selectArr:[],    //选中的
				allSelect:true,    //是否选择全部
				showTan:false,
				brandId:'',
				asyncGoods:[],    //商品或套餐
				
				title:'同步商品',
				isAll:false,//是否全选
				goodArr:[], //选择好同步的商品id
				categoryList:[],//品牌分类
				goInName:'goodsChoice',
				packArr:[],//选择好同步的品牌id
			};
		},
		mounted(){
			let userData=storage.session('userShop');
			this.brandId=userData.currentShop.brandId;
			// console.log(userData.currentShop);
			if(this.goIncom == 'goods'){
				this.goInName ='goodsChoice';
				this.title = '同步商品';
				this.typeArr=[{name:'商品名称',selected:false,type:'1'},{name:'商品价格',selected:false,type:'2'},
					{name:'商品图片',selected:false,type:'3'},{name:'其他信息',selected:false,type:'4'}];
				this.getGoodsStatus().then((res)=>{
					for(let obj of res){
						obj.selected=false;
						obj.isSynOk=false;
						this.asyncGoods.push(obj);
					}
					this.asyncGoods=this.filterGoodsByGroup(this.asyncGoods);
				});
				this.getBrandCategory();//获取品牌分类列表
			}else if(this.goIncom == 'packs'){
				this.goInName ='packsChoice';
				this.title = '同步套餐';
				this.typeArr=[{name:'套餐名称',selected:false,type:'1'},{name:'套餐价格',selected:false,type:'2'},
					{name:'套餐图片',selected:false,type:'3'},{name:'其他信息',selected:false,type:'4'}];
				this.getPacksStatus().then((res)=>{
					for(let obj of res){
						obj.selected=false;
						obj.isSynOk=false;
						this.asyncGoods.push(obj);
					}
				});
			}		
		},
		props:{
			goIncom:String,//从商品或套餐进入，goods商品，packs套餐
		},
		methods:{
			//商品完整信息点击
			choseAll(){
				this.isAll = !this.isAll;
				if(this.isAll){
					for (let i=0;i<this.typeArr.length;i++){
						this.typeArr[i].selected = true;
					}
				}else{
					for (let i=0;i<this.typeArr.length;i++){
						this.typeArr[i].selected = false;
					}
				}
				
			},
			isAllSec(){
				for (let i=0;i<this.typeArr.length;i++){
					if(!this.typeArr[i].selected){
						return false;
					}
				}
				return true;
			},
			//获取品牌的商品
			async getGoodsStatus(){
				let res=await http.GetGoodsStatus({
					data:{
						brandId:this.brandId
					}
				});
				return res;
			},
			//获取品牌套餐
			async getPacksStatus(){
				let res=await http.newGetBrandPackage({
					data:{
						brandId:this.brandId
					}
				});
				return res;
			},
			//过滤掉子菜,子菜不显示
			filterGoodsByGroup(goods){
				let temp=goods.filter((ele)=>{
					//大神，你这是只过滤子菜吗
					// if(ele.type==0 && Number(ele.groupId)>0 && !Number(ele.isGroup)){
					//     return false;
					// }else{
					//     return true;
					// }
					if(Number(ele.groupId)>0){
						return false;
					}else{
						return true;
					}
				});
				return temp;
			},
			//选择同步的类型
			choseGood(item){
				item.selected = !item.selected;
				this.isAll = this.isAllSec()?true:false;
			},
			// //选择全部
			// allGoods(index){
			//     for (let i=0;i<this.typeArr.length;i++){
			//         this.typeArr[i].selected=Number(index)?true:false;
			//     }
			//     this.allSelect=Number(index)?false:true;
			// },
			goodListWin(res){
				if(res=='ok'){
					if(this.selectArr.length==0){
						this.$store.commit('setWin',{
							title:'温馨提示',
							winType:'alter',
							content:'至少选择一项',
						});
						return;
					}
					this.showTan=true;
				}else{
					if(this.goIncom == 'goods'){
						this.$emit('throwAddGoodsWin',res);
					}else if(this.goIncom == 'packs'){
						this.$emit('throwSyncWin',res);
					}
				}
			},
			//商品选择弹窗返回的事件
			doThrowTanResult(res,item){
				if(res=='ok'){
					this.goodArr = item.goodArr;
					this.packArr = item.packArr;
					this.synchronousGoods();
				}
				this.showTan=false;
			},
			//确认同步
			async synchronousGoods(){
				let type = '';
				for(let i=0;i<this.typeArr.length;i++){
					if(this.typeArr[i].selected){
						type = type + this.typeArr[i].type+',';
					}
				}
				let arr = '';
				let res ;
				if(this.goIncom == 'goods'){
					if(this.goodArr.length==0){
						this.$store.commit('setWin',{
							title:'温馨提示',
							winType:'alter',
							content:'所要同步的商品为空，至少选择一项',
						});
						return false;
					}
					for(let i = 0;i<this.goodArr.length;i++){
						arr = arr + this.goodArr[i]+',';
					}
					res=await http.SynchronousGoods({
						data:{
							brandId:this.brandId,
							type:type,
							gids:arr
						}
					});
				}else if(this.goIncom == 'packs'){
					if(this.packArr.length==0){
						this.$store.commit('setWin',{
							title:'温馨提示',
							winType:'alter',
							content:'所要同步的套餐为空，至少选择一项',
						});
						return false;
					}
					for(let i = 0;i<this.packArr.length;i++){
						arr = arr + this.packArr[i]+',';
					}
					res=await http.synchronousPackage({
						data:{
							brandId:this.brandId,
							type:type,
							pids:arr
						}
					});
				}
				let taskId = res.taskId;
				let aTime = 0;
				this.$store.commit('setWin',{
					title:'温馨提示',
					winType:'alter',
					content:'同步中，请稍候！',
				});
				window.timer = setInterval(async ()=>{
					aTime++;
					let task = await http.taskInfoGoods({data:{taskId:taskId}});
					let status = task.status;
					if(status == '3'){
						this.$store.commit('setWin',{
							title:'温馨提示',
							winType:'alter',
							content:'同步成功,请刷新页面获取最新商品数据！',
						});
						this.$emit('throwSyncWin','ok');   //商品页面重新请求接口
						clearInterval(window.timer);
					}
					if(aTime>=60){
						this.$store.commit('setWin',{
							title:'温馨提示',
							winType:'alter',
							content:'同步超时',
						});
						clearInterval(window.timer);
					}
				},1000);
				// this.$emit('throwAddGoodsWin');   //商品页面重新请求接口
			},
			async taskInfoGoods(taskId){
				let task = await http.taskInfoGoods({data:{taskId:taskId}});
				return task;
			},
			async getBrandCategory(){
				this.categoryList = await http.getBrandCategory({data:{}});
			}
		},
		watch:{
			'typeArr':{
				deep: true,
				handler: function(val) {
					this.selectArr=val.filter((item)=>{
						return item.selected;
					});
				}
			},
		},
		components:{
			win:()=>import (/*webpackChunkName:'win'*/'src/components/win'),
			goodListWin: ()=> import (/*webpackChunkName: 'good_list_win'*/ 'src/components/good_list_win'),
		}
	};
</script>

<style type="text/css" scoped>
	#configTan{width:550px;height: 100%;padding:30px 15px;background-color:#fff;}
	.aLi{padding:0 15px;height: 40px;line-height: 40px;cursor: pointer;color:#b3aeae;
		text-align: center;margin:5px 10px;display: inline-block;border: 1px solid #D2D2D2}
	.shoName-select{border-color: #FF9800;color:#FF9800;background: url(../../../res/images/sign.png?18274) right bottom no-repeat;}
	.allselect{border-color: #FF9800!important;color: #FF9700!important;}
	.isallselect{cursor: pointer;width: 100px;height: 30px;float: left;line-height: 30px;
		text-align: center;margin:5px;border:1px solid #A0A0A0;color: #A0A0A0;}
</style>