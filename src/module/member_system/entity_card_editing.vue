<template>
	<Win :width='540' :height='300' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">编辑会员信息</span>
		<div id="tan" slot="content" v-cloak>
			<!-- 姓名 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">姓名</span>
				<div class="rightHalf">
					<input type="text" class="name" placeholder="请输入用户姓名" v-model='userName' />
				</div>
			</div>
			<!-- 手机号 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">手机号</span>
				<div class="rightHalf">
					<input type="text" class="name" placeholder="请输入手机号" v-model='mobile' />
					<div class="prompting" @click="isPublicNumber">
						<div class="detDiv" v-if="isPublic">
							<i class="detI triright"></i>
							<h3 class="detH3">
							在此处更换手机号后,原有手机号无法登陆该卡。需要在新手机号登录。微信需要重新登录新手机号方可使用该实体卡。
						</h3>
						</div>
					</div>
				</div>
			</div>
			<!-- 更改卡状态 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">更改卡状态</span>
				<div class="rightHalf">
					<select-btn :name='genderName' :sorts="genderList.map(v=>v.name)" :width="180" @selOn="selegender"></select-btn>
				</div>
			</div>
		</div>
	</Win>
</template>
<script>
import http from 'src/manager/http';
//import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			okStyle: {
				content: '保存',
				style: {
					backgroundColor: '#FF9800',
					color: '#fff'
				}
			},
			cancelStyle: {
				content: '取消',
				style: {
					backgroundColor: '#b3b3b3',
					color: '#fff'
				}
			},
			userName: '', //用户姓名
			mobile: '', //手机号
			genderList: [{
				name: '启用',
				id: 3
			}, {
				name: '停用',
				id: 4
			}], //性别列表
			genderName: '不做任何修改',
			genderId: 0, //性别选中的
			isPublic: false // 点击问好显示与否	
		};
	},
	props: {
		detaiList: Object, //详情数据
	},
	methods: {
		async getAppliedWin(res) {
			if (res == 'ok') {
				await this.changeMember(); //修改会员信息
				this.$emit('modifyBack', res);
			} else {
				this.$emit('modifyBack', res);
			}
		},
		selegender: function(i) { //选择性别的方法
			this.genderName = this.genderList[i].name; //点击门店对应的名字
			this.genderId = this.genderList[i].id; //点击门店对应的id	
		},
		async changeMember() {
			let data = await http.changeCard({
				data: {
					memberCardId: this.detaiList.id, //会员id
					mobile: this.mobile, //手机号
					name: this.userName, //姓名
					status: this.genderId //卡使用状态
				}
			});
			if (data) {
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'alert',
					content: '修改成功'
				});
			}
		},
		isPublicNumber: function() { //提示的状态
			this.isPublic = !this.isPublic;
		},
	},
	components: {
		Win: () =>
			import ( /* webpackChunkName:'win' */ 'src/components/win'),
		selectBtn: () =>
			import ( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
	},
	mounted() {
		let memberInfo = this.detaiList;
		this.userName = memberInfo.name; //姓名
		this.mobile = memberInfo.mobile; //手机号
	}
};
</script>
<style scoped>
#tan {
	padding: 40px 0;
}

#tan .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#tan .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 100px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#tan .online-box .rightHalf {
	width: 250px;
	height: auto;
	float: left;
}

#tan .online-box .rightHalf .name {
	width: 180px;
	height: 40px;
	background-color: #ffffff;
	border: solid 1px #cecdcd;
	text-indent: 15px;
}

#tan .online-box .rightHalf .prompting {
	display: inline-block;
	width: 40px;
	height: 40px;
	background: url(../../../src/res/icon/orderdetial18.png) no-repeat center;
	position: relative;
	vertical-align: middle;
	cursor: pointer;
}

#tan .online-box .rightHalf .prompting .detDiv {
	display: inline-block;
	width: 180px;
	background: #45404b;
	position: absolute;
	top: 0px;
	left: 45px;
	padding: 10px;
	box-shadow: 3px 2px 10px #ccc;
	z-index: 100;
}

#tan .online-box .rightHalf .prompting .detDiv .detI {
	width: 0;
	height: 0;
	line-height: 0;
	position: absolute;
	top: 10px;
	left: -20px;
	right: 30%;
	border-width: 10px;
	border-top: 0px;
	border-style: solid;
	border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
}

#tan .online-box .rightHalf .prompting .detDiv .detH3 {
	line-height: 22px;
	color: #e6e6e7;
}

#tan .online-box .rightHalf .prompting .detDiv .triright {
	width: 0;
	height: 0;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-right: 10px solid #45404b;
	border-left: 10px solid transparent;
}
</style>