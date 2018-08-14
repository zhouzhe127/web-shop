<template>
<!--
    @file   模板列表
    @百川    曾伟福
-->
    <div id="template-list">
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
                :fixed="0"
                :bannerStyle="{'color':'#43414a','fontSize':'16px'}"
                :widthType ="true"
                :listWidth ="1435"            
            >
            <div slot-scope="pro" slot="con-0" class="operation-column">
                <span class="delete" @click="deleteUse(pro.data,pro.index,'delete')">删除</span><span @click="deleteUse(pro.data,pro.index,'use')" class="use">使用</span>
            </div>
            <template slot-scope="pro" slot="con-1" class="operation-column">
                {{pro.data.itemIndex}}
            </template>
            </com-table>
            <div>
                <page-element :page="pageObj.page" :total="pageObj.total"  @pageNum="getPageNum"></page-element>
            </div>
        </div>
    </div>
</template>
<script>
	/*
	    模板序号:
	*/
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				/*
				    getApplicationTemplates:模板列表
				*/
				titleData: [
					{titleName: '操作'},
					{titleName: '序号'},
					{titleName: '模板名称',dataName: 'name'}
				],
				introData: [],
				pageObj: {
					page: 1,
					total: 0,
					num: 10, //每页显示多少条
				},
				templateList: [], //模板列表
				nowList: [], //当前展示的模板
				searchList: [],
				search: '', //搜索
			};
		},
		methods: {
			//--------event-------
			clickBtn(flag) {
				if(flag == 'reset') {
					this.search = '';
				}
				this.searchList = this.fnSearch(this.templateList, this.search);
				this.pageObj.total = Math.ceil(this.searchList.length / this.pageObj.num);
				this.getPageNum({
					page: 1,
					num: this.pageObj.num
				});
			},
			addItemIndex(list) {
				for(let i = 0; i < list.length; i++) {
					let itemIndex = (this.pageObj.page - 1) * this.pageObj.num + 1 + i;
					list[i].itemIndex = itemIndex >= 10 ? itemIndex : '0' + itemIndex;
				}
				return list;
			},
			async deleteTemplate(item) {
				let res = await this.getHttp('deleteApplicationTemplate', {
					id: item.id
				});
				if(!res) return;

				this.templateList = this.templateList.filter((ele) => {
					return ele.id != item.id;
				});
				this.searchList = this.searchList.filter((ele) => {
					return ele.id != item.id;
				});

				this.pageObj.total = Math.ceil(this.searchList.length / this.pageObj.num);
				this.getPageNum({
					page: this.pageObj.page,
					num: this.pageObj.num
				});

				if(this.pageObj.page > 1 && this.nowList.length == 0) {
					this.pageObj.page -= 1;
					this.getPageNum({
						page: this.pageObj.page,
						num: this.pageObj.num
					});
				}
			},
			async deleteUse(item, index, flag) {
				if(flag == 'delete') {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'confirm',
						content: '确认删除该模板?',
						callback: (res) => {
							if(res == 'ok') this.deleteTemplate(item, index);
						}
					});
				} else {
					let query = this.$route.query;
					query.id = item.id;
					query.tab = 2; //修改模板,使用模板
					this.$router.push({
						path: 'schedulingApplication/purchaseRequisition',
						query: query
					});
				}
			},
			//--------page---------
			initPage(list, page, num) {
				let sIndex = (page - 1) * num;
				let eIndex = page * num;
				let arr = list.slice(sIndex, eIndex);
				return arr;
			},
			getPageNum(obj) {
				this.pageObj.page = obj.page;
				if(obj.num != this.pageObj.num) {
					this.pageObj.num = obj.num;
					this.pageObj.total = Math.ceil(this.searchList.length / this.pageObj.num);
				}
				this.nowList = this.initPage(this.searchList, this.pageObj.page, this.pageObj.num);
				this.nowList = this.addItemIndex(this.nowList);
			},
			//-------utils---------------
			fnSearch(list, search = '') {
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
			//---------------- init ------------
		},
		computed: {

		},
		async mounted() {
			let arr = await this.getHttp('getApplicationTemplates', {
				type: 1
			});
			if(Array.isArray(arr)) {
				this.templateList = arr;
				this.searchList.push(...arr);
				this.pageObj.total = Math.ceil(this.searchList.length / this.pageObj.num);
				this.getPageNum({
					page: 1,
					num: 10
				});
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
	@import url('./z_less.less');
	#template-list {
		.content-head {
			/*padding-top:20px;*/
			.template-name {
				.input-text(180px);
			}
			.common-btn {
				.whb(100px,
				40px);
				.lfc(#fff,
				40px,
				16px);
				display: inline-block;
				text-align: center;
				margin-right: 10px;
			}
		}
		.content-body {
			/*padding-top:20px;*/
		}
		.operation-column {
			text-align: center;
			.delete {
				padding-right: 20px;
				cursor: pointer;
				.lfc(#ff8b68,
				70px,
				16px);
				&:after {
					content: '';
					position: relative;
					left: 20px;
					top: 0;
					.whb(1px,
					20px,
					1px solid #ccc);
				}
			}
			.use {
				padding-left: 20px;
				cursor: pointer;
				.lfc(#ffa433,
				70px,
				16px);
			}
		}
	}
</style>