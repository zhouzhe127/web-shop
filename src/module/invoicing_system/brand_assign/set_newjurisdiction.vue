/* * @Author: zhouzhe * @Date: 2018-06-25 17:15:28 */

<template>
	<div id="jurisdiction">
		<div class="topbox">
			<i></i>
			<h3>新建权限指派</h3>
			<div class="dian" v-for="i in 72" :key="i"></div>
		</div>
		<div class="inputBox" style="line-height:40px;">
			<h1 class="base required">方案名称</h1>
			<div class="base right">
				<input type="text" placeholder="请输入方案名称" v-model="projectName" maxlength="20">
				<div class="clearfix">
					<span>
						<img src="../../../res/icon/prompt.png">
					</span>
					<p>限20字以内</p>
				</div>
			</div>
		</div>
		<div class="butten">
			<div class="childBox" v-for="(item,i) in childBox" :key="i">
				<div class="inputBox" v-for="(list,index) in item" :key="index">
					<h1>{{list.name}}</h1>
					<div class="right middle">
						<on-off :status="list.selter" @statusChange="getSwitch(list)"></on-off>
					</div>
				</div>
			</div>
		</div>
		<div class="topbox">
			<i></i>
			<h3>适用店铺</h3>
			<div class="dian" v-for="i in 72" :key="i"></div>
		</div>
		<div class="inputBox" style="line-height:40px;">
			<h1 class="required" style="vertical-align: top;">适用店铺</h1>
			<div class="right base" style="width: 240px;">
				<div class="add" @click="selShop">选择店铺</div>
				<div class="shoplist">
					<div class="details">
						<h2>直营店:</h2>
						<div class="list">{{shopNames1}}</div>
					</div>
					<div class="details">
						<h2>加盟店:</h2>
						<div class="list">{{shopNames2}}</div>
					</div>
				</div>
			</div>
		</div>
		<paging-list v-if="win.show" :winDesc="win.style" :title="'选择店铺'" :relAttr="'ischain'" :selectList="win.selectlist" :list="win.list" :fieldName="'shopName'" @throwCommonWin="winEvent"></paging-list>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				childBox: [
					[{
						name: '物料单位修改',
						bind:'updateUnit',
						selter: false
					},
					{
						name: '物料分类修改',
						bind:'updateCategory',
						selter: false
					},
					{
						name: '商品品牌修改',
						bind:'updateBrand',
						selter: false
					},
					{
						name: '物料修改',
						bind:'updateMaterial',
						selter: false
					},
					{
						name: '供应商修改',
						bind:'updateSupplier',
						selter: false
					},
					{
						name: 'BOM单修改',
						bind:'updateBom',
						selter: false
					}],
					[{
						name: '物料单位新建',
						bind:'createUnit',
						selter: false
					},
					{
						name: '物料分类新建',
						bind:'createCategory',
						selter: false
					},
					{
						name: '商品品牌新建',
						bind:'createBrand',
						selter: false
					},
					{
						name: '物料新建',
						bind:'createMaterial',
						selter: false
					},
					{
						name: '供应商新建',
						bind:'createSupplier',
						selter: false
					},
					{
						name: 'BOM单新建',
						bind:'createBom',
						selter: false
					}]
				],
				projectName:'',
				win:{
					style:{
						width:900,
						height:500
					},
					list:'',
					show:false,
					selectlist:[]
				},
				shopNames1:'--',
				shopNames2:'--',
				shopIds:[],
				userName:'',
				sellist:''
			};
		},
		methods: {
			async init() {
				let data = await http.InvoicingetPowerConfig();
				for(let list of this.childBox){
					for(let item of list){
						for(let res of data){
							for(let i of this.sellist){
								if(i==res.id){
									res.isOpen = 1;
									break;
								}
							}
							if(item.name == res.name){
								item.id = res.id;
								item.selter = res.isOpen==0? false:true;
								break;
							}
						}
					}
				}
			},
			async getDdetail() {
				let data = await http.InventorgetPowerTemplate({
					data:{
						id:this.id
					}
				});
				this.projectName = data.name;
				this.sellist = data.content.powerIds;
				if(data.content.shopIds){
					this.win.list.map(v=>{
						for(let i of data.content.shopIds){
							if(v.id==i) {
								this.win.selectlist.push(v);
								break;
							}
						}
					});
					this.winEvent(this.win.selectlist,'ok');
				}
				console.log(data);
			},
			getSwitch(list) {
				list.selter = !list.selter;
				// let child1 = this.childBox[0];
				// if(list.selter){
				// 	switch(list.name) {
				// 		case 'BOM单修改':
				// 		case 'BOM单新建':
				// 			child1[3].selter = true;
				// 			child1[0].selter = true;
				// 			child1[1].selter = true;
				// 			break;
				// 		case '物料新建':
				// 		case '物料修改':
				// 			child1[0].selter = true;
				// 			child1[1].selter = true;
				// 			break;
				// 	}
				// }
			},
			selShop(){
				this.win.show = true;
			},
			winEvent(arr,res){
				this.win.show = false;
				if(res=='ok'){
					let arr1 = [];
					let arr2 = [];
					this.shopIds = [];
					for(let item of arr){
						if(item.ischain==1){
							arr1.push(item.shopName);
						}else if(item.ischain==2){
							arr2.push(item.shopName);
						}
						this.shopIds.push(item.id);
					}
					this.win.selectlist = arr;
					this.shopNames1 = arr1.join(',');
					this.shopNames2 = arr2.join(',');
				}
			},
			setButton() {
				this.$store.commit('setPageTools', [{
					name: '返回',
					className: ['back'],
					fn: () => {
						window.history.go(-1);
						storage.session('brandAssignId',null);
					}
				},
				// {
				// 	name: '保存',
				// 	className: ['wearhouse all'],
				// 	fn:async () => {
				// 		if(!this.checkData()) return;
						
				// 	}
				// },
				{
					name: '指派',
					className: ['printer-btn'],
					fn: async () => {
						if(!this.checkData()) return;
						this.conserve();
						let obj = {};
						for(let list of this.childBox){
							for(let item of list){
								obj[item.bind] = item.selter? 1:0;
							}
						}
						Object.assign(obj,{
							shopIds:this.shopIds.join(','),
							planName:this.projectName
						});
						let data =await http.InventorassignInventoryConfig({
							data:obj
						});
						if(data) this.alert('指派成功');
						this.$router.push({path: '/admin/brandAssign/jurisdictionRecord',});
					}
				}]);
			},
			async conserve(){//保存
				let powerIds = [];
				for(let list of this.childBox){
					for(let item of list){
						if(item.selter) powerIds.push(item.id);
					}
				}
				let url = this.id? 'InvoicingeditPowerTemplate':'InvoicingaddPowerTemplate';
				let obj = {
					name:this.projectName,
					powerIds:powerIds,
					shopIds:this.shopIds,
					userName:this.userName
				};
				if(this.id) obj.id = this.id;
				await http[url]({data:obj});
			},
			checkData(){
				if(this.projectName.trim()==''){
					this.alert('请填写方案名称');
					return false;
				}
				if(this.shopIds.length==0){
					this.alert('请选择店铺');
					return false;
				}
				return true;
			},
			alert(con, title) {
				this.$store.commit('setWin', {
					title: title,
					winType: 'alert',
					content: con
				});
			},
		},
		async mounted() {
			this.win.list = storage.session('shopList');
			this.userName = storage.session('userShop').user.name;
			if(storage.session('brandAssignId')) {
				this.id = storage.session('brandAssignId');
				await this.getDdetail();
			}
			this.setButton();
			this.init();
		},
		components: {
			onOff: () =>
				import( /*webpackChunkName: 'on_off'*/ 'src/components/on_off'),
			pagingList: () =>
				import( /*webpackChunkName: 'assign_list_win'*/ './assign_list_win')	
		},
		destroyed() {
			storage.session('brandAssignId',null);
		},
	};
</script>
<style lang='less' scoped>
	#jurisdiction {
		.topbox {
			width: 100%;
			height: 40px;
			margin: 10px;
			line-height: 40px;
			position: relative;
			overflow: hidden;
			i {
				width: 2px;
				height: 28px;
				position: absolute;
				top: 6px;
				left: 0;
				background-color: #28a8e0;
			}
			h3 {
				height: 40px;
				margin-left: 10px;
				float: left;
				font-size: 16px;
			}
			.dian {
				width: 10px;
				height: 1px;
				border-top: 1px solid #e1e1e1;
				margin: 20px 5px;
				float: left;
			}
		}
		.inputBox {
			height: 40px;
			margin-top: 15px;
			h1 {
				width: 130px;
				text-align: right;
				vertical-align: middle;
				display: inline-block;
			}
			.base {
				vertical-align: baseline;
			}
			.middle {
				vertical-align: middle;
			}
			.right {
				display: inline-block;
				margin-left: 10px;
				input {
					display: inline-block;
					width: 200px;
					height: 35px;
					padding-left: 5px;
				}
				.clearfix {
					span {
						float: left;
						margin-top: 4px;
						padding-right: 6px;
						img {
							width: 17px;
							height: 17px;
							display: inline-block;
						}
					}
					p {
						float: left;
						color: #a0a0a0;
					}
				}
				.add {
					display: inline-block;
					background-color: #29a8e0;
					width: 210px;
					height: 40px;
					background-position: 30% 50%;
					padding-left: 90px;
					line-height: 40px;
					height: 40px;
					vertical-align: top;
					margin-left: -3px;
					color: #fff;
					cursor: pointer;
					.img-span {
						vertical-align: middle;
					}
				}
				.details {
					color: #cccccc;
					width: 500px;
					h2 {
						display: inline-block;
						vertical-align: top;
					}
					.list {
						width: 430px;
						display: inline-block;
					}
				}
			}
		}
		.butten {
			margin-top: 30px;
			.childBox {
				width: 35%;
				display: inline-block;
			}
		}
	}
</style>