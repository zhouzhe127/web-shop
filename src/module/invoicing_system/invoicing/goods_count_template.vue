<template>
<!--
	@file   模板列表
	@百川    曾伟福
-->
	<div id="goods-count-template">
		<div class="tab-div">
			<el-button-group>
				<el-button @click="linkToPage">{{tabObj[0].name}}</el-button>
				<el-button type="primary">{{tabObj[1].name}}</el-button>
			</el-button-group>
		</div>
		<div class="content-head">
			<div class="in-block">
				<el-input  maxlength="30" v-model="search" placeholder="请输入模板名称"></el-input>
			</div>
			<div class="in-block">
				<el-button @click="clickBtn('filter')" type="primary">筛选</el-button>
				<el-button @click="clickBtn('reset')" type="info">重置</el-button>
			</div>
		</div>

		<div class="content-body">
			<el-table :data="nowList" stripe border style="width: 100%;">
				<el-table-column type="index" :index="indexMethod" label="序号" width="200">
				</el-table-column>
				<el-table-column label="模板名称" prop="name" >
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="200">
					<template slot-scope="scope">
						<el-button type="text" @click="deleteUse(scope.row,scope.$index,'use')">使用</el-button>
						<el-button type="text" @click="deleteUse(scope.row,scope.$index,'edit')" style="color:#34A9AA;">编辑</el-button>
						<el-button type="text" @click="deleteUse(scope.row,scope.$index,'delete')" style="color:#D34A2B;">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div>
			<el-pagination background @current-change="pageChange"
				@size-change="sizeChange"
				:current-page="pageObj.page"
				:page-sizes="[10, 20, 50]"
				layout="sizes, total, prev, pager, next, jumper"
				:total="pageObj.listNum">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	
	/*
		getInventoryGoodsTemplates:模板列表
		TemplateDeleteTemplate:删除模板
	*/
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				titleData: [
					{titleName: '操作',titleStyle:{'text-align':'center'}},
					{titleName: '序号',dataName: 'itemIndex'},
					{titleName: '模板名称',dataName: 'name'}
				],
				pageObj: {
					page: 1,
					total: 0,
					num: 10, 				//每页显示多少条
					listNum:0,
				},
				templateList: [], 			//模板列表
				nowList: [], 				//当前展示的模板
				searchList: [],				//搜索出来的list
				search: '', 				//搜索
				tabObj:[{},{}],				//tab切换							
				tableObj:{},				//表格数据
			};
		},
		props:{
			tab:{
				type:[String,Number],
			}
		},
		methods: {
			indexMethod(index){
				return this.pageObj.num*(this.pageObj.page-1)+index+1;
			},
			linkToPage(){
				//tab切换
				let query = this.$route.query,
					arr = [],
					obj = {};
				
				arr = [
					{id:1,path:'/admin/goodsCountHistory'},
					{id:2,path:'/admin/materialCountHistory'},
					{id:3,path:'/admin/processHistory'},
				];
				obj = this.matchList(arr,this.tab,'id');
				this.$router.push({path:obj.path,query});
			},
			clickBtn(flag) {
				//筛选重置
				if(flag == 'reset') {
					this.search = '';
				}
				this.pageObj.page = 1;
				this.filterList();
			},
			filterList(){
				this.searchList = this.fnSearch(this.templateList, this.search);
				this.pageChange(this.pageObj.page);
			},
			async deleteTemplate(path,item) {
				let res = await this.getHttp(path, {
					id: item.id
				});
				if(!res) return;


				this.templateList = this.templateList.filter((ele) => {
					return ele.id != item.id;
				});
				this.pageObj.listNum = this.templateList.length;
				this.filterList();

				if(this.nowList.length == 0 && this.pageObj.page > 1){
					this.pageObj.page -= 1;
					this.filterList();
				}

			},

			async deleteUse(item, index, flag) {
				//删除,编辑,使用模板
				let obj = {},
					arr = [],
					query = this.$route.query;
				
				arr = [
					{id:1,delPath:'TemplateDeleteTemplate',usePath:'/admin/goodsCount',editPath:'/admin/editGoodsCountTemplate'},
					{id:2,delPath:'TemplateDeleteTemplate',usePath:'/admin/materialCount',editPath:'/admin/editMaterialCountTemplate'},
					{id:3,delPath:'templateDeleteTemplate',usePath:'/admin/processMaterial',editPath:'/admin/processMaterial'},
				];

				obj = this.matchList(arr,this.tab,'id');

				switch(flag){
					case 'delete':
						this.$confirm('确认删除该模板?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.deleteTemplate(obj.delPath,item);
							this.$message({type: 'success',message: '删除成功!'});
						}).catch(() => {
							//         
						});
						break;
					case 'use':
						query.id = item.id;
						this.$router.push(
							{path:obj.usePath,query}
						);
						break;
					case 'edit':
						query.id = item.id;
						this.$router.push(
							{path:obj.editPath,query}
						);	
						break;
				}
			},
			async getTemplates(){
				let arr = [],
					url =  '';
				switch(this.tab+''){
					case '1':
					case '2':
						url = this.tab == 1 ? 'getInventoryGoodsTemplates' : 'getInventoryMaterialTemplates';
						arr = await this.getHttp(url,{
							startTime:0,
							endTime:Math.ceil(Date.now() / 1000)
						});

						if(Array.isArray(arr)) {
							this.templateList = arr;
							this.pageObj.listNum = this.templateList.length;
						}
						break;
					case '3':
						url = 'templateGetListTemplates';
						arr = await this.getHttp(url);

						if(Array.isArray(arr)) {
							this.templateList = arr;
							this.pageObj.listNum = this.templateList.length;
						}						
						break;
				}

			},
			initBtn(){
				let obj = {
					name:'',
					url:'',
				};
				let arr = [
					{id:1,name:'批量盘库',path:'/admin/goodsCount'},
					{id:2,name:'批量盘库',path:'/admin/materialCount'},
					{id:3,name:'立即加工',path:'/admin/processMaterial'},
				];
				
				obj = this.matchList(arr,this.tab,'id');
				
				this.$store.commit('setPageTools',[
					{
						name: obj.name,
						type:4,
						className:'primary',
						fn:()=>{
							this.$router.push({path:obj.path,query:this.$route.query});
						}
					}
				]);            
			},
			initTab(){
				switch(this.tab+''){
					case '1':
						this.tabObj = [
							{name:'商品盘库'},
							{name:'模板列表'}
						];
						break;
					case '2':
						this.tabObj = [
							{name:'物料盘库'},
							{name:'模板列表'}
						];
						break;
					case '3':
						this.tabObj = [
							{name:'加工记录'},
							{name:'加工模板'}
						];
						break;
				}
			},
			pageChange(res) {
				//分页
				this.pageObj.page = res;
				this.pageObj.total = Math.ceil(this.searchList.length / this.pageObj.num);
				this.nowList = this.initPage(this.searchList, this.pageObj.page, this.pageObj.num);
				this.nowList = this.addItemIndex(this.nowList);
			},
			sizeChange(size){
				this.pageObj.num = size;
				this.nowList = this.initPage(this.searchList, this.pageObj.page, this.pageObj.num);
				this.nowList = this.addItemIndex(this.nowList);
			},
			initPage(list, page, num) {
				//分页
				let sIndex = (page - 1) * num;
				let eIndex = page * num;
				let arr = list.slice(sIndex, eIndex);
				return arr;
			},
			matchList(arr=[],val,attr='id'){
				//匹配数据
				let retData = {};
				for(let ele of arr){
					if(ele[attr] == val){
						retData = ele;
						break;
					}
				}
				return retData;
			},
			addItemIndex(list) {
				//给列表添加序号
				for(let i = 0; i < list.length; i++) {
					let itemIndex = (this.pageObj.page - 1) * this.pageObj.num + 1 + i;
					list[i].itemIndex = itemIndex >= 10 ? itemIndex : '0' + itemIndex;
				}
				return list;
			},
			fnSearch(list, search = '') {
				//根据name字段搜索模板
				search = search.trim();
				if(!search) return list;
				let arr = list.filter((ele) => {
					if(typeof ele.name == 'string' && ele.name.includes(search)) return true;
				});
				return arr;
			},
			async getHttp(url, obj = {}) {
				let res = await http[url]({
					data: obj
				});
				return res;
			},
		},
		async mounted() {
			this.initBtn();
			this.initTab();
			await this.getTemplates();
			this.clickBtn('reset');
		},
		watch:{
			'tab':async function(){
				this.initBtn();
				this.initTab();
				await this.getTemplates();
				this.clickBtn('reset');				
			}
		},
		components: {
			comTable: () =>
				import( /*webpackChunkName:'com_table'*/ 'src/components/com_table'),
			pageElement: () =>
				import( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		},
	};
</script>
<style lang='less' scoped>
	@import url('../warehouse_manage/z_less.less');
	#goods-count-template {
		.content-head {
			/*padding-top:20px;*/
			.template-name {
				.input-text(180px);
				font-size:14px;
			}
			.common-btn {
				.whb(100px,40px);
				.lfc(#fff,40px,14px);
				display: inline-block;
				text-align: center;
				margin-right: 10px;
			}
		}
		.in-block{
			display: inline-block;
			margin-right:15px;
			margin-bottom:20px;
		}
		.operation-column {
			text-align: center;
			vertical-align: middle;
			.operation{
				color:#22aae0;
				font-size: 14px;
				cursor: pointer;
				display: inline-block;
				height:40px;
				width:40px;
				line-height: 40px;
				vertical-align: middle;
			}
			.line:after{
				content:'';
				display: inline-block;
				margin:0px 7px;
				.whb(1px,18px);
				vertical-align: middle;
				border-right:1px solid #aaa;
			}
			.edit-color{
				color:@y;
			};
			.delete-color{
				color:@r;
			}
		}
		.content-body{
			margin-bottom: 20px;
		}
	}
</style>