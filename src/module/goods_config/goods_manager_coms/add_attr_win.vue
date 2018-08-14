<template>
	<win :align="'center'" @winEvent="closeSelfWin" :height="500" :width="600" >
		<span slot="title">{{title}}</span>
		<section slot="content" class="flavor">
			<section class="flavor-type">
			   <span :class="{'sign':item.isSelect}" v-for="(item,index) in attr" :key="index" v-on:click="funSelectAttr(item,index)">{{item.name}}</span>
			</section>
		</section>
	</win>    
</template>
<script>

	import utils from 'src/verdor/utils';
	export default {
		data(){
			return {
				attr:[],           //口味列表
				selectAttr:null,     // Array[obj] 选中的口味
				shopId:null,    
				radio:false,        //单选
				height:500,
				width:600,
				title:'标题'
			};   
		},
		props:{
			pObj:null,
			/*
				{
					radio:              //false:单选(默认) true:多选     
					selectAttr:null,    //Array 选中的,数组元素可以是选中的id,或者是包含id的对象 
					attr:               //Array 所有         
					title:              //标题
					height:
					width:
				}
			*/
		},
		mounted(){
			this.initData();
		},
		methods:{
			//-----------win-----
			closeSelfWin(res){
				let temp=[];
				if(res=='ok'){
					this.attr.forEach((ele)=>{
						if(ele.isSelect) temp.push(ele);
					});
				}else{
					temp=this.mapToObj(this.attr,this.pObj.selectAttr);
				}
				temp=utils.deepCopy(temp);
				this.$emit('throwCommonWin',temp,res);
			},
			//-------------event---------
			//点击口味的选中与否
			funSelectAttr(item,index){
				if(this.radio){
					item.isSelect=!item.isSelect;
					this.attr.splice(index,1,item);
				}else{
					let arr=[];
					arr.push(item);
					this.attr=this.initAttrSelect(this.attr,arr);
				}
			},
			//---------util-------------
			//获取数组中对象的id
			getObjectId(arr){
				let ids=[];
				arr.forEach((ele)=>{
					ids.push(parseInt(ele.id));
				});
				return ids;
			},
			//初始化选中的口味 返回选中的口味
			initAttrSelect(attr,sel){
				let selId=[];                   //选中的id
				if(typeof sel[0]=='object'){
					selId=this.getObjectId(sel);
				}else{
					selId=sel;
				}
				attr=attr.map((ele) => {
					let flag=true;
					for(let i=0,len=selId.length;i<len;i++){
						if(ele.id==selId[i]){
							ele.isSelect=true;
							flag=false;
							break;
						}
					}
					if(flag) ele.isSelect=false;
					return ele;
				});
				return attr;
			},
			//将选中的口味转化为对象
			mapToObj(attr,sel){
				let arr=[];
				let temp=[];
				if(typeof sel[0]=='object'){
					arr=this.getObjectId(sel);
				}else{
					arr=sel;
				}           
				attr.forEach((ele)=>{
					for(let i=0,len=arr.length;i<len;i++){
						if(ele.id==arr[i]) temp.push(ele);
					}
				});
				return temp;
			},
			//初始化数据
			initData(){
				for(let attr in this.pObj){
					this[attr]=this.pObj[attr];
				}
				if(!this.height) this.height=500;
				if(!this.width)  this.width=600;
				if(!this.radio)  this.radio=false; 
				this.attr=this.initAttrSelect(this.attr,this.selectAttr);
			},
		},
		components:{
			win:()=>import (/*webpackChunkName:'win'*/'src/components/win'),
		}
	};
</script>
<style scoped>

</style>
