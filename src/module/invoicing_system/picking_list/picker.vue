/**
 * @file
 * 
 * 领料人
 *
 * @author zhengu.jiang
 */
 <template>
	<section id="picker">
		<div>
			<div class="box fl" v-for="(item,index) in pickerList" :key="index">
				<span class="name">{{item.name}}</span>
				<span class="num">{{index+1}}</span>
				<span class="detail" @click="showDetail(item)"><i>查看详情</i></span>
			</div>
		</div>
		<!-- <pickerDetail v-else @throwWinResult="getResult" :info="item"></pickerDetail> -->
	</section>
 </template>

 <script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				pickerList: [],
				isShow: false,
				item:null,
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
				this.pickerList = res;
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

 <style scoped>
	#picker{
		margin-top: 20px;
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
 
 
 