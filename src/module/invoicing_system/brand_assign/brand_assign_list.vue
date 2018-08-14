<!--
    **品牌指派
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div id="brand-assign">
		<div class="tab">
			<span :class="{active:tabIndex==1}" @click="tabClick(1)">进销存指派</span>
			<span :class="{active:tabIndex==2}" @click="tabClick(2)">进销存权限指派</span>
		</div>
		<div class="main" v-if="tabIndex==1">
			<div class="cell add" @click="createAuth(1)">
				<em></em>
				<p>新建指派方案</p>
			</div>
			<div class="cell item" v-for="(item,index) of tempList" :key="index">
				<p class="name text-ellipsis">{{item.name}}</p>
				<p class="num">{{index+1}}</p>
				<div class="btn-box">
					<span class="assign" @click="appoint(item)">指派</span>
					<span class="del" @click="delmolde(item,index)">删除</span>
				</div>
			</div>
		</div>
		<div class="main" v-if="tabIndex==2">
			<div class="cell add" @click="createAuth(2)">
				<em></em>
				<p>新建权限指派方案</p>
			</div>
			<div class="cell item" v-for="(item,index) of authList" :key="index">
				<p class="name text-ellipsis">{{item.name}}</p>
				<p class="num">{{index+1}}</p>
				<div class="btn-box">
					<span class="assign" @click="appoint(item)">指派</span>
					<span class="del" @click="delmolde(item,index)">删除</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

let tabIndex = 1;

export default{
	data(){
		return {
			tabIndex:1,//tab下标
			tempList:[],//指派模板列表
			authList:[],//权限指派模板列表
		};
	},
	mounted(){
		console.log('1');
		this.initBtn();
		this.getTemplateList();
		this.getAuthorityList();
		this.tabIndex = tabIndex;
	},
	beforeRouteLeave(to,from,next){
		if(to.path!='/admin/brandAssign/setNewjurisdiction'){
			tabIndex = 1;
		}
		next();
	},
	methods:{
		initBtn() {
			let arr = [
				{name: '指派日志',style: 'background: #29a7e1;border: 1px solid #29a7e1;color: #fff;',
					fn: () => {
						this.$router.push({path: '/admin/brandAssign/jurisdictionRecord',});
					}
				},
			];
			this.$store.commit('setPageTools', arr);
		},
		async getTemplateList(){//获取模板列表
			let data = await http.InventoryassignGetAssignTemplates();
			this.tempList = data;
		},
		async getAuthorityList(){//获取权限模板列表
			let data = await http.InventoryassignGetPowerTemplates();
			this.authList = data;
		},
		tabClick(index){
			this.tabIndex = index;
			tabIndex = index;
		},
		createAuth(type){//新建权限指派
			if(type==1){
				this.$router.push({path: '/admin/brandAssign/create',});
			}else if(type==2){
				this.$router.push({path: '/admin/brandAssign/setNewjurisdiction',});
			}
		},
		delmolde(item,index){
			this.$store.commit('setWin',{
				title: '提示信息',
				winType: 'confirm',
				content: '确定删除',
				callback: async res =>{
					if(res=='ok'){
						let data = await http.InventordeleteTemplate({
							data:{
								id:item.id
							}
						});
						if(data) this.tabIndex==1? this.tempList.splice(index,1):this.authList.splice(index,1);
					}
				}
			});
		},
		appoint(item){
			storage.session('brandAssignId',item.id);
			let path =this.tabIndex==1? 'brandAssign/create':'brandAssign/setNewjurisdiction';
			this.$router.push({
				path: path
			});
		}
	}
};
</script>

<style lang="less" scoped>
	#brand-assign{
		.tab{overflow: hidden;
			span{width: 135px;height: 40px;line-height: 38px;text-align: center;float: left;border: 1px solid #fe8d01;color: #fe8d01;
				font-size: 16px;cursor: pointer;
				&.active{color: #fff;background: #fe8d01;}
			}
		}
		.main{margin-top: 20px;
			.cell{width: 300px;float: left;height: 200px;margin-right: 15px;margin-bottom: 15px;}
			.add{
				border: 1px solid #ccc;text-align: center;cursor: pointer;padding-top: 50px;
				em{display: inline-block;width: 47px;height: 47px;background: url(../../../res/images/comadd.png) center no-repeat;opacity: 0.7;}
				p{text-align: center;color: #ccc;font-size: 20px;padding-top: 10px;}
			}
			.item{border-top: 8px solid #69c2ea;background: #f2f2f2;overflow: hidden;padding: 15px;padding-top: 0;position: relative;
				p{float: left;height: 80px;line-height: 80px;
					&.name{width: 75%;font-size: 24px;color: #333;position: absolute;left: 15px;top: 0;}
					&.num{width: 100%;font-size: 70px;color: #c9e4ef;text-align: right;}
				}
				.btn-box{text-align: right;width: 100%;float: left;margin-top: 60px;
					span{font-size: 20px;height: 25px;display: inline-block;margin-left: 20px;cursor: pointer;
						&.assign{color: #69c2ea;border-bottom: 1px solid #69c2ea; }
						&.del{color: #fc643f;border-bottom: 1px solid #fc643f; }
					}
				}
			}
		}
	}
</style>