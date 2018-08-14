<template>
<!--
	@file   模板列表
	@百川    曾伟福
-->
	<div id="goods-count-template">
		<div class="tab-div">
			<span @click="linkToPage">{{tabObj[0].name}}</span>
			<span class="select-tab">{{tabObj[1].name}}</span>
		</div>
		<div class="content-head">
			<input type="text" class="template-name" maxlength="30" v-model="search" placeholder="请输入模板名称">
			<span class="blue common-btn" @click="clickBtn('filter')">筛选</span><span @click="clickBtn('reset')" class="gray common-btn">重置</span>
		</div>

		<div class="content-body">
			<com-table
				:showHand ="true"
				:listName ="'模板列表'"
				:listHeight ='70'
				:showTitle ="1"
				:titleData ="titleData"
				:introData="nowList"
				:allTotal ="searchList.length"
				:fixed="1"
				:bannerStyle="{'color':'#43414a','fontSize':'16px'}"
				:widthType ="true"
				:listWidth ="1200"            
			>
				<div slot-scope="{data,index}" slot="con-0" class="operation-column">
					<span @click="deleteUse(data,index,'use')" class="operation line">使用</span>
					<span @click="deleteUse(data,index,'edit')" class="operation line edit-color">编辑</span>
					<span @click="deleteUse(data,index,'delete')" class="operation delete-color">删除</span>
				</div>
				<template slot-scope="pro" slot="con-1" class="operation-column">
					{{pro.data.itemIndex}}
				</template>
			</com-table>
			<div>
				<page-element 
					:page="pageObj.page" 
					:total="pageObj.total"  
					@pageNum="getPageNum"
				></page-element>
			</div>
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
				this.getPageNum({
					page: this.pageObj.page,
					num: this.pageObj.num
				});
			},
			async deleteTemplate(path,item) {
				let res = await this.getHttp(path, {
					id: item.id
				});
				if(!res) return;


				this.templateList = this.templateList.filter((ele) => {
					return ele.id != item.id;
				});
				
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
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'confirm',
							content: '确认删除该模板?',
							callback: (res) => {
								if(res == 'ok') this.deleteTemplate(obj.delPath,item);
							}
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
						}
						break;
					case '3':
						url = 'templateGetListTemplates';
						arr = await this.getHttp(url);

						if(Array.isArray(arr)) {
							this.templateList = arr;
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
						style:{height:'40px','color':'#fff'},
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
			getPageNum(obj) {
				//分页
				this.pageObj.page = obj.page;
				this.pageObj.num = obj.num;
				this.pageObj.total = Math.ceil(this.searchList.length / this.pageObj.num);
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
	}
</style>