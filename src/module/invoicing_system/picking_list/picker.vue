/**
 * @file
 * 
 * 领料人
 *
 * @author zhengu.jiang
 */
 <template>
	<section id="picker">
		<div class="filter">
			<div class="inline-box">
				<el-input v-model="name" placeholder="请输入领料人"></el-input>
			</div>
			<div class="inline-box">
				<el-button type="primary" @click="search">筛选</el-button>
				<el-button type="info" @click="reset">重置</el-button>
			</div>
		</div>
		<el-table :data="pickerList" stripe border style="width: 100%" :header-cell-style="{'background-color':'#f5f7fa'}">
		    <el-table-column type="index" label="序号" width="100">
		    </el-table-column>
		    <el-table-column prop="name" label="领料人">
		    </el-table-column>
		    <el-table-column label="操作" fixed="right" width="150">
		    	<template slot-scope="scope">
		        	<el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
		      	</template>
		    </el-table-column>
	  	</el-table>
	</section>
 </template>

 <script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				allList:[],
				pickerList: [],
				isShow: false,
				item:null,
				name:'',//领料人
			};
		},
		mounted(){
			this.getPicker();
		},
		components:{
			pickerDetail: ()=> import (/*webpackChunkName: 'picker_details'*/ './picker_details'),
			// selectobj: ()=> import (/*webpackChunkName: 'picker_details'*/ 'src/components/select_obj'),
		},
		methods: {
			//获取列表
			async getPicker(){
				let res = await http.getPickerList();
				let userId = storage.session('userShop').user.id;
				let user = null;
				for(let i = 0; i < res.length; i++){
					if(res[i].id == userId){
						user = res[i];
						res.splice(i,1);
						i--;
					}
				}
				res.unshift(user);
				this.allList = res;
				this.pickerList = res;
			},
			search(){//搜索
				let arr = [];
				for(let item of this.allList){
					if(item.name.includes(this.name)){
						arr.push(item);
					}
				}
				this.pickerList = arr;
			},
			reset(){//重置
				this.name = '';
				this.pickerList = this.allList;
			},
			//获取详情
			showDetail(item){
				storage.session('info',item);
				this.$router.push({path:'pickingList/checkDetails',query:this.$route.query});
			},
			getResult(res){
				this.isShow = res;
				this.$emit('throwWinResult',this.isShow);
			}
		},
		
	};
 </script>

 <style scoped lang="less">
	#picker{
		margin-top: 15px;
		.filter{margin-bottom: 15px;
			.inline-box{
				display: inline-block;margin-right: 10px;
			}
		}
	}
	#picker .box{
		width: 300px;
		height: 192px;
		margin-right: 15px;
		margin-bottom:15px;
		border-top: 8px solid #28A8E0;
		background: #F2F2F2;
		position: relative;
	}
	#picker .box .name{
		display: block;
		font-size: 26px;
		height: 26px;
		color: #333;
		margin-top: 30px;
		margin-left: 19px;
		width: 200px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	#picker .box .num{
		position: absolute;
		width:70px;
		height:56px; 
		text-align: center;
		font-size:56px;
		color: #28A8E0;
		right: 0;
		top: 20px;
	}
	#picker .box .detail {
		position: absolute;
		color: #6AC2E9;
		bottom: 30px;
		right: 10px;
		text-align: center;
		width: 90px;
		cursor: pointer;
	}
	#picker .box .detail i{
		border-bottom: 1px solid #6AC2E9;
		font-size: 20px
	}
 </style>
 
 
 