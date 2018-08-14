<!--
	**添加-修改挂账账户
	*
	* 孔伟研
	* *
	*
-->
<template>
	<win @winEvent="clickResult" :align="'right'" :width="600" :height="500">
		<!--标题-->
		<span slot="title">{{title}}</span>
		<!--内容-->
		<div slot="content">
			<div class="recMan" id="recMan">
				<h2 class="required tag">账户类型</h2>
				<div class="mes">
					<span v-if="isAdd" class="ospan" :class="{'signa':manDetial.type == i+1}" @click="typeClick(i)" v-for="(item,i) in accountType" :key="i">{{item.name}}</span>
					<span v-if="!isAdd"  class="ospan signa">
						<span v-if="manDetial.type =='2'">企业账户</span>
						<span v-if="manDetial.type =='1'">个人账户</span>
					</span>
				</div>
				<div class="clear"></div>
				<h2 class="required tag">账户名称</h2>
				<div class="mes">
					<input type="text" class="input" maxlength="15" v-model="manDetial.name" placeholder="请输入账户名称">
				</div>
				<div class="clear"></div>
				<h2 class="required tag">联系人</h2>
				<div class="mes">
					<input type="text" class="input" maxlength="14" v-model="manDetial.contactMan" placeholder="请输入联系人">
				</div>
				<div class="clear"></div>
				<h2 class="required tag">手机号</h2>
				<div class="mes">
					<input type="text" class="input" maxlength="11" v-model="manDetial.mobile" placeholder="请输入账户手机号">
				</div>
				<div class="clear"></div>
				<h2 v-if="manDetial.type == 2" class="required tag">挂账人</h2>
				<div v-if="manDetial.type == 2&&manDetial.billPerson.length>0" class="mes oBox" style="max-height:130px;overflow-y:auto">
					<!-- <div></div> -->
					<section class="obox" v-for="(item,index) in manDetial.billPerson" :key="index">
						<input v-if="item.isEdit" type="text" class="input" maxlength="14" style="width: 90px;margin-right:20px;" v-model="item.name" placeholder="挂账人姓名">
						<input v-if="item.isEdit" type="text" class="input" maxlength="11" style="width: 150px; " v-model="item.mobile" placeholder="挂账人手机号">
						<span v-if="!item.isEdit">{{item.name}}:</span><span v-if="!item.isEdit">{{item.mobile}}</span>
						<img @click.stop @click="editDet(item)" src="../../../../src/res/images/gray-revise.png">
						<img @click="delMan(item,index)" src="../../../../src/res/images/gray-del.png">
					</section>
					
				</div>
				<section v-if="manDetial.type == 2" class="mes">
					<h2 class="tag" v-if="manDetial.billPerson.length>0"></h2>
					<a @click="addMan" class="blue" style="margin:10px 0;" href="javascript:void(0);">添加挂账人</a>
				</section>
				<div class="clear"></div>
				<h2 class="required tag">挂账额度(单笔)</h2>
				<div class="mes">
					<span class="ospan" :class="{'signa':oneType == i}" @click="oneClick(i)" v-for="(item,i) in oneMax" :key="i">{{item.name}}</span>
					<input v-show="oneType == 0" type="text" class="input" maxlength="7" style="width: 180px;margin-left:10px;height: 42px;" v-model="manDetial.singlePrice" placeholder="请输入单笔挂账额度">
				</div>
				<div class="clear"></div>
				<h2 class="required tag">挂账额度(总额)</h2>
				<div class="mes">
					<span class="ospan" :class="{'signa':allType == i}" @click="allClick(i)" v-for="(item,i) in allMax" :key="i">{{item.name}}</span>
					<input v-show="allType == 0" type="text" class="input" maxlength="7" style="width: 180px;margin-left:10px;height: 42px;" v-model="manDetial.allPrice" placeholder="请输入总挂账额度">
				</div>
				<div class="clear" style="height: 120px;"></div>
			</div>
		</div>
	</win>
</template>
<script>
export default {
	data() {
		return {
			title: '添加挂账账户',
			accountType: [
				{ name: '个人用户', id: 1 },
				{ name: '企业用户', id: 2 },
			],
			oneMax: [{ name: '指定', id: 1 }, { name: '无上限', id: 2 }],
			oneType: -1, //单笔额度下标
			allMax: [{ name: '指定', id: 1 }, { name: '无上限', id: 2 }],
			allType: -1, //总额度下标
			rectype: -1
		};
	},
	mounted() {
		if (this.isAdd) {
			this.title = '添加挂账账户';
		} else {
			this.title = '修改挂账账户';
		}
		if(this.manDetial.singlePrice*1>=1){
			this.oneType = 0;
		}else{
			this.oneType = 1;
		}
		if(this.manDetial.allPrice*1>=1){
			this.allType = 0;
		}else{
			this.allType = 1;
		}
		console.log(this.oneType);
		document.addEventListener('click', this.remove);
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
	},
	props: {
		manDetial: Object,
		isAdd: Boolean
	},
	destroyed() {
		document.removeEventListener('click', this.remove);
	},
	methods: {
		remove() {
			for(let i=0;i<this.manDetial.billPerson.length;i++){
				this.manDetial.billPerson[i].isEdit = false;
			}
		},
		//抛出一个事件给父页面传值
		clickResult(res) {
			if(res == 'ok'){
				// this.manDetial.isAppoint = 0;
				if(this.manDetial.singlePrice*1<1 && this.oneType ==0){
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '挂账额度最小为1!'
					});
					return false;
				}
				if(this.manDetial.allPrice*1==0 && this.allType ==0){
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '挂账总额度最小为1!'
					});
					return false;
				}
				if(this.oneType == 1){
					this.manDetial.singlePrice = '';
				}
				if(this.allType == 1){
					this.manDetial.allPrice = '';
				}
				if(this.manDetial.singlePrice*1 == 0){
					this.manDetial.allPrice = '';
				}
			}
			this.$emit('winResult', res,this.manDetial); 
		},
		//账户类型选择
		typeClick(i) {
			this.manDetial.type = i+1;
		},
		//单笔额度点击
		oneClick(i) {
			this.oneType = i;
			if (this.oneType == 1) {
				this.allType = 1;
			}
		},
		//总额度点击
		allClick(i) {
			if (this.oneType == 1 && i == 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '单笔限额无上限，则总额也无上限！'
				});
				return;
			}
			this.allType = i;
		},
		//修改企业挂账人
		editDet(item){
			document.removeEventListener('click', this.remove);
			console.log(this.manDetial.billPerson);
			for(let i=0;i<this.manDetial.billPerson.length;i++){
				if(this.manDetial.billPerson[i].name.trim().length ==0 ||this.manDetial.billPerson[i].mobile.trim().length ==0){
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '挂账人姓名和手机号号不能为空！请先将修改项完成'
					});
					return false;
				}
				this.manDetial.billPerson[i].isEdit = false;
			}
			// item.isEdit = true;
			this.$set(item, 'isEdit', !item.isEdit);
			console.log(this.manDetial.billPerson);
		},
		//添加挂账人
		addMan(){
			document.removeEventListener('click', this.remove);
			for(let i=0;i<this.manDetial.billPerson.length;i++){
				if(this.manDetial.billPerson[i].name.trim().length ==0||this.manDetial.billPerson[i].mobile.trim().length ==0){
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '挂账人姓名和手机号号不能为空！'
					});
					return false;
				}
			}
			
			if(this.manDetial.billPerson.length>=10){
				this.$store.commit('setWin', {
					title: 'alert',
					winType: 'confirm',
					content: '挂账人数最多为10个！'
				});
				return false;
			}
			let item = {name:'',mobile:'',isEdit:true};
			this.manDetial.billPerson.push(item);
			console.log(this.manDetial.billPerson);
		},
		//删除挂账人
		delMan(item,i){
			console.log(item);
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确定删除挂账人为“' + item.name + '”的帐号吗?如果确定，还需保存后才能生效',
				callback: delRes => {
					if (delRes == 'ok') {
						this.manDetial.billPerson.splice(i,1);
					}
				}
			});
		}
	}
};
</script>
<style lang="less" scoped>
#recMan {
	width: 600px;
	height: auto;
	min-height: 480px;
	padding-top: 20px;
	background-color: #f2f2f2;
	.input{
		width: 280px;border:1px solid #ccc;
	}
}
#recMan .tag {
	float: left;
	width: 125px;
	height: 40px;
	margin-right: 10px;
	line-height: 40px;
	text-align: right;
	
}

#recMan .mes {
	font-size: 0;
	line-height: 40px;
	overflow: hidden;
	width: auto;
	height: auto;
	.ospan {
		font-size: 14px;
		display: inline-block;
		width: auto;
		height: 42px;
		margin-bottom: 2px;
		margin-left: 5px;
		padding: 0 20px;
		cursor: pointer;
		text-align: center;
		border: 1px solid #e3e3e3;
		background-color: #fff;
	}
	.signa {
		background: #fff3e5 !important;
		border: 1px solid #f8931f !important;
		color: #f9911e !important;
	}
	.blue{
		width: 201px;
		height: 40px;
		margin: 10px 0px;
		line-height: 40px;
	}
	
}
#recMan .oBox{
		max-height: 204px;
		overflow-y: auto;
		padding: 10px;
		width: 445px;
		border: 1px solid #ccc;
		.obox{
			span{
				margin:0 10px;
			}
			img{
				margin:0 10px;
			}
		}
	}
#recMan .clear {
	clear: both;
	font-size: 0;
	line-height: 0;
	height: 15px;
	width: 100%;
}
</style>
