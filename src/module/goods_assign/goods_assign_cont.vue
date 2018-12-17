<!--
 * @Description: 商品指派
 * @Author: han
 * @Date: 2018-12-06 15:41:13
 * @LastEditTime: 2018-12-17 11:45:30
 * @LastEditors: Please set LastEditors
 -->

<template>
	<div class="gooods_assign">
		<!-- 数据展示部分 -->
		<template v-if="!assignAddShow && !assignDoingShow && !assignDetailShow">
			<!-- 搜索任务 -->
			<div class="task-search">
				<el-input style="width:240px;" v-model="taskSearchKeyWords" @input="handleTaskSearch" suffix-icon="el-icon-search" placeholder="输入任务名称"></el-input>
			</div>
			<!-- 任务状态切换查看 -->
			<div class="task-status">
				<span class="status-btn" 
					v-for="(item,index) in taskCheckList" 
					@click="checkTaskStatus(item)" 
					:key="index" 
					:class="{'active':assignStatus == item.status}" 
					:data-status="item.status">
					{{item.name}}
				</span>
			</div>
			<!-- 任务table -->
			<div class="task-table">
				<!-- {{assignTaskCopyList}} -->
				<el-table  :data="assignTaskCopyList" :header-cell-style="{'background-color':'#f5f7fa'}" border stripe>
					<!-- 序号 -->
					<el-table-column label="序号" align="center">
						<template slot-scope="scope">
							{{scope.$index}}
						</template>
					</el-table-column>
					<!-- 时间 -->
					<el-table-column label="时间" align="center">
						<template slot-scope="scope">
							{{scope.row.createTime | formatCreateTime('yyyy-MM-dd hh:mm:ss')}}
						</template>
					</el-table-column>
					<!-- 名称 -->
					<el-table-column label="名称" align="center">
						<template slot-scope="scope">
							{{scope.row.name}}
						</template>
					</el-table-column>
					<!-- 创建人 -->
					<el-table-column label="创建人" align="center">
						<template slot-scope="scope">
							{{scope.row.createUser}}
						</template>
					</el-table-column>
					<!-- 发布人 -->
					<el-table-column label="发布人" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.status !== '0'">
								{{scope.row.publishUser ? scope.row.publishUser : '--'}}
							</span>
							<span v-else>
								--
							</span>
						</template>
					</el-table-column>
					<!-- 状态 -->
					<el-table-column label="状态" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.status == '0'" style="color:#f56c6c;">未指派</span>
							<span v-else-if="scope.row.status == '1'" style="color:#409eff;">指派中</span>
							<span v-else-if="scope.row.status == '2'" style="color:#67c23a;">已指派</span>
						</template>
					</el-table-column>
					<!-- 操作 -->
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.status == '0'">
								<el-button type="text" @click="handlePublishTask(scope.row)">发布</el-button>
								<el-button type="text" @click="handleEditAssing(scope.row)">编辑</el-button>
							</template>
							<el-button v-else-if="scope.row.status == '1'" type="text" @click="lookAssignDetail(scope.row)">指派中查看详情</el-button>
							<el-button v-else-if="scope.row.status == '2'" type="text" @click="lookAssignDetail(scope.row)">完成的查看详情</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 任务分页 -->
			<div class="task-pagination" >
				<el-pagination 
					background 
					@size-change="sizeChange" 
					@current-change="pageClick" 
					:current-page="Number(currentPage)" 
					:page-count="Number(totalNum)" 
					:page-size="Number(pageSize)" 
					layout="sizes, prev, pager, next, jumper" 
					:page-sizes="[5,10,15,20]">
				</el-pagination>
			</div>
		</template>
		<!-- 添加新任务 -->
		<assignAdd v-if="assignAddShow" @addGoBack="assignAddBack" :editData="editData" :openType="addOenType"></assignAdd>
		<!-- 指派中的详情 -->
		<doingDetail v-if="assignDoingShow" @addGoBack="assignAddBack" @goFinish="goFinish" :detailData="detailData"  :goodList="goodList" :allShop="allShop" :tempTitleList='tempTitleList'></doingDetail>
		<!-- 全部详情 -->
		<assignDetail v-if="assignDetailShow && detailInfoLen>0" @addGoBack="assignAddBack" :filedMsg="filedMsg" :detailInfo="detailInfo" :detailData="detailData" :goodList="goodList" :allShop="allShop" :tempTitleList="tempTitleList"></assignDetail>
	</div>
</template>

<script>
	import storage from 'src/verdor/storage'; 
	import http from 'src/manager/http';
	import utils from  'src/verdor/utils'; //全局提示框
	export default {
		name: 'goods_assign_cont',
		data() {
			return {
				taskSearchKeyWords:'', // 任务搜索字段
				searchList:[],
				taskCheckList:[
					{
						id:0,
						status:-1,
						name:"全部"
					},
					{
						id:1,
						status:2,
						name:"已完成"
					},
					{
						id:2,
						status:0,
						name:"未指派"
					},
				],
				assignTaskList:[], // 指派任务列表
				assignType:1,
				assignStatus:-1,

				assignAddShow:false,// 添加模板页面
				assignDetailShow:false,
				assignDoingShow:false,
				
				currentPage:1,
				pageSize:5,

				editData:{}, // 编辑修改的数据
				addOenType:'add',

				detailData:{},

				goodList:[],
				shopId:'',
				allShop:[],
				version:'',

				tempTitleList:[],
				detailInfo:{},
				detailInfoLen:'',
				filedMsg:[]
			};
		},
		created(){
			this.initToolsBtn();
		},
		computed:{
			totalNum(){
				let num = this.searchList.length > 0 ? Math.ceil(this.searchList.length / this.pageSize) : Math.ceil(this.assignTaskList.length / this.pageSize);
				if (num == 0) {
					//如果数组为空，总页数为0，则将总数置为1，
					num = 1;
				}
				if (num < this.currentPage) {
					//如果总页数小于当前页码数，
					this.currentPage = num;
				}
				return num;
			},
			assignTaskCopyList(){
				return this.searchList.length > 0 ? this.pagination(this.currentPage,this.pageSize,this.searchList) :this.pagination(this.currentPage,this.pageSize,this.assignTaskList);
			}	
		},
		methods:{
			// 初始化添加按钮
			initToolsBtn(){
				let arr = [
					{
						name: '新建指派任务',
						type: 7,
						icon: 'el-icon-plus',
						className: 'primary',
						fn: () => {
							this.addNewAssignTask();
						}
					}
				];
				this.$store.commit('setPageTools', arr);
			},
			// 添加模板
			addNewAssignTask(){
				this.assignAddShow = true;
				this.addOenType = 'add'
			},
			// 添加模板返回
			assignAddBack(res){
				this.assignAddShow = false;
				this.assignDetailShow =false;
				this.assignDoingShow = false;
				this.detailInfo={};
				this.detailInfoLen = '';
				this.initToolsBtn();
				this.getAssignTaskList();
			},
			// 切换模板状态
			checkTaskStatus(item){
				this.assignStatus = item.status;
				console.log(item.status,'item.status')
				this.assignTaskList = [];
				this.searchList = [];
				this.taskSearchKeyWords = '';
				this.getAssignTaskList();
			},
			// 获取任务列表数据
			async getAssignTaskList(){
				console.log(this.assignStatus,'assignStatus')
				let data = await http.AssignGetlist({
					data:{
						type:this.assignType || 1,
						status:Number(this.assignStatus)
					}
				})
				let list = utils.deepCopy(data);
				list.map(item => {
					item.conditions = JSON.parse(item.conditions)
				});

				this.assignTaskList = list;
			},
			// 查看详情
			lookAssignDetail(row){
				this.detailData = [];
				let data = utils.deepCopy(row)
				this.detailData = data;
				let status = row.status;
				if(status == '1'){
					this.assignDoingShow = true;
				}else if(status == '2'){
					this.assignDetailShow = true;
					this.getTaskDetail(data)
				}
				
			},
			goFinish(){
				this.assignDoingShow =false;
				this.assignDetailShow =true;
				this.getTaskDetail(this.detailData);
				this.getAssignTaskList()
			},	
			// 编辑任务
			handleEditAssing(row){
				let data = utils.deepCopy(row);
				this.editData = data;
				this.assignAddShow = true;	
				this.addOenType = 'edit'		
			},
			// 发布任务
			async handlePublishTask(row){
				console.log(row,'row')
				let data = await http.AssigntaskPublish({
					data:{
						id:Number(row.id),
						type:Number(row.type)
					}
				})
				if(data){
					this.getAssignTaskList()
				}
				console.log(data,'dataPublish')
			},
			// 搜索
			handleTaskSearch(){
				let arr = [];
				this.assignTaskList.forEach(item=>{
					if(item.name.indexOf(this.taskSearchKeyWords) != -1){
						arr.push(item);
					}
				})
				this.searchList= arr;
			},

			// -------------分页-----
		 	pagination(pageNo, pageSize, array) {
				var offset = (pageNo - 1) * pageSize;
				return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
			},
			sizeChange(num){
				this.pageSize = num;
				this.currentPage = 1;
			},
			pageClick(page){
				this.currentPage = page;
			},
			//------------------
			  // 获取商品列表
			async getShopAllList(){
				let goodLists = storage.session('goodList');
						let version = storage.session('httpGoodVersion');
						let res = false;
						this.version = await this.ShopGetExtra();
						if (version && this.version.goodsConfigVer == version.goodsConfigVer) {
							res = true;
						} else {
							res = false;
								storage.session('httpGoodVersion', this.version);
					}
				//如果存在保存的商品数据
						if (goodLists && res) {
							this.goodList = goodLists;
						} else {
							//如果不存在保存的商品数据
								let good = await http.getGoodsList({
							data: {
							shopId: this.shopId,
							page: 1,
							num: 9999,
							specification: 1
							}
						});
							storage.session('goodList', good.list);
							this.goodList = good.list;
				}
			},
			// 获取价格模板
			async getTempModel(){
				let data = await http.getPriceTemplateTitle();
				if(data){
					console.log(data,'模板')
					this.tempTitleList = data;
				}
			},
		//获取版本号
			async ShopGetExtra() {
				let res = await http.ShopGetExtra({ data: {} });
				return res;
			},
			async getTaskDetail(row){
				let data = await http.AssigntaskGetDetail({data:{id:Number(row.id),type:row.type }})
				if(data){
					this.detailInfo = data;
					let arr = Object.keys(this.detailInfo)
					this.detailInfoLen = arr.length
					console.log(this.detailInfoLen	,'detailInfoLen')
				}
			},
			// 获取错误信息
			async handelGetAssignError(){
			let data = await http.getAssignError({
				data:{type:1}
			})
			if(data){
			this.filedMsg = data
			}
			}
		},
		filters:{
			formatCreateTime(time,format){
				if(time != '0'){
					return utils.format(time,format)
				}else{
					return '--';
				}
			},
		},
		async mounted(){
			this.getAssignTaskList();
			this.allShop = await http.getShopList();
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
			this.getShopAllList();
			this.getTempModel()
			this.handelGetAssignError()
		},
		components:{
			assignAdd: () => import(/* webpackChunkName:'goods_assign_add' */ './goods_assign_com/goods_assign_add'),
			assignDetail: () => import(/* webpackChunkName:'goods_assign_detail' */ './goods_assign_com/goods_assign_detail'),
			doingDetail: () => import(/* webpackChunkName:'goods_assign_doing_detail' */ './goods_assign_com/goods_assign_doing_detail'),
    	}
	};
</script>

<style lang="less" scoped>
.task-status{
	height: 40px;
	border-bottom: 1px solid #E3E7EA;
	margin:20px 0;
	.status-btn{
		display: inline-block;
		padding: 0 15px;
		line-height: 40px;
		color: #3c3c3c;
		position: relative;
		margin-right: 10px;
		cursor: pointer;
		&:after{
			content: '';
			display: block;
			width: 100%;
			height: 2px;
			background: #DDBD4A;
			position: absolute;
			left: 0;
			bottom: 0;
			opacity: 0;
		}
		&.active,&:hover{
			color: #DDBD4A;
			&:after{
				opacity: 1;
			}
		}
	}
}
.task-pagination{
	margin-top: 30px;
}
</style>