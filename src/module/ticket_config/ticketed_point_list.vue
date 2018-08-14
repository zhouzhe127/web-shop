<template>
	<div>
		<div v-if="!showTicket" class="list">
			<div class="top">
				<div class="title">
					<span>销方名称</span>
					<input type="text" placeholder="请输入销方名称" v-model="sellName">
				</div>
				<div class="title">
					<span>开票点名称</span>
					<input type="text" placeholder="请输入开票名称" v-model="ticketName">
				</div>
				<a href="javascript: ;" class="blue" @click="search">筛选</a>
				<a href="javascript: ;" class="gray" @click="reset">重置</a>
			</div>
			<section v-if="!loading">
				<comTable :titleData="titleData" :listName="'开票点管理'" :introData="introData" :allTotal="list.length">
					<div class="btn" slot="con-0" slot-scope="props">
						<!-- <span class="detail">查看详情</span> -->
						<span class="edit" @click="edit(props.data)">编辑</span>
					</div>
					<span slot="con-1" slot-scope="props">{{props.index + 1 +  (page-1)*10}}</span>
				</comTable>
				<page v-if="total" @pageNum="pageNum" :page="page" :total="total" :num="num"></page>
			</section>
			<section class="load" v-else>
				<img src="../../res/images/preloader.gif" />
			</section>
		</div>
		<ticketPoin v-else @ticket="getTicket" :detail="detail" :dataList="sellList"></ticketPoin>
	</div>	
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			showTicket: false,
			titleData: [],//头部标题
			introData: [],//列表数据
			list: [], //全部数据
			detail: '', //编辑详情
			page:1,
			num: 10,
			total: 0,
			ticketName: '',
			sellName: '',
			dataList: '', //原始列表数据
			loading: false,
			sellList: [],
		};
	},
	created(){
		this.titleData = [
			{
				'titleName': '操作',
				'titleStyle': {
					width: 200 + 'px'
				}
			},
			{
				'titleName': '序号',
				'titleStyle': {
					width: 40 + 'px'
				}
			},
			{'titleName': '销方名称','dataName': 'sellName'},
			// {'titleName': '开票点代码','dataName': 'name'},
			{'titleName': '开票名称','dataName': 'name'},
			{'titleName': '税控盘密码','dataName': 'taxDiskPass'},
			{'titleName': '证书密码','dataName': 'certiCipher'},
			{'titleName': '税控设备号','dataName': 'equipNum'},
			// {'titleName': '开票人','dataName': 'name'},
		];
	},
	mounted() {
		this.initBtn();
		this.ticketPointGetlist();
	},
	components: {
		comTable: () => import(/*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		ticketPoin: () => import(/*webpackChunkName: 'ticketed_point'*/ './ticketed_point'),
		page: () => import(/*webpackChunkName: 'page_element'*/ 'src/components/page_element')
	},
	methods: {
		initBtn() {
			this.$store.commit('setPageTools', [
				{
					name: '新建',
					style: {},
					fn: () => {
						if(this.sellList.length == 0){
							this.$store.commit('setWin', {winType: 'alter',content: '当前暂无销方,无法新建开票点'});
						}else{
							this.showTicket = true;
						}
					}
				}
			]);
		},
		async ticketPointGetlist(){
			this.loading = true;
			let data = await http.ticketPointGetlist();
			let ticketList = [];
			this.sellList = [];
			this.list = [];
			for(let i = 0; i < data.length; i++){
				this.sellList.push(data[i].commData);
				if(data[i].commData.client[0].clientNO){
					ticketList.push(data[i].commData);
				}
			}
			for(let i = 0; i < ticketList.length; i++){
				for(let j = 0; j < ticketList[i].client.length; j++){
					ticketList[i].client[j]['sellName'] = ticketList[i].name; //为每个开票点加入销方名称
					ticketList[i].client[j]['identifier'] = ticketList[i].identifier; //为每个开票点加入销方税号
				}
				this.list = this.list.concat(ticketList[i].client);
			}
			this.loading = false;
			this.dataList = utils.deepCopy(this.list);
			this.pageNum({page:1,num:10});
		},
		getTicket(res){
			this.showTicket = false;
			this.detail = '';
			this.initBtn();
			if(res == 'ok'){
				this.ticketPointGetlist();
			}
		},
		pageNum(res){
			this.page = res.page;
			this.total = Math.ceil(this.dataList.length/10);
			this.introData = this.dataList.slice((res.page-1)*res.num,(res.page-1)*res.num + res.num);
		},
		edit(item){
			this.detail = item;
			this.showTicket = true;
		},
		search(){
			this.dataList = this.list.filter(v => {
				if((v.sellName.indexOf(this.sellName) >= 0 && this.sellName !== '') || (v.name.indexOf(this.ticketName) >= 0 && this.ticketName !== '')){
					return v;
				}else if(this.sellName === '' && this.ticketName === ''){
					return v;
				}else{
					return false;
				}
			});
			this.pageNum({page:1,num:10});
		},
		reset(){
			this.ticketName = '';
			this.sellName = '';
			this.pageNum({page:1,num:10},this.dataList);
		},
	}
};
</script>
<style lang="less" scoped>
.list{
	.load{
		width: 128px;
		margin: 200px auto;
	}
	.top{
		.title{
			display: inline-block;
			width: 300px;
			margin-bottom: 10px;
			input{
				width: 200px;
				height: 40px;
				margin-left: 10px;
				padding-left: 5px;
			}
		}
		a{
			width: 100px;
			height: 39px;
			line-height: 39px;
			margin-right: 5px;
		}
	}
	.btn{
		.edit{
			cursor: pointer;
			color:#FE8D2C
		}
	}
}
</style>
