<template>
	<Win :width='751' :height='620' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">编辑会员信息</span>
		<div id="tan" slot="content" v-cloak>
			<!-- 姓名 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">姓名</span>
				<div class="rightHalf">
					<el-input v-model="userName" placeholder="请输入用户姓名" maxlength="20" style="width:179px;"></el-input>
				</div>
			</div>
			<!-- 性别 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">性别</span>
				<div class="rightHalf">
					<el-select v-model="genderName" placeholder="请选择" @change="selegender" style="color:#c0c4cc;width: 179px;">
						<el-option v-for="item in genderList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</div>
			<!-- 生日 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">生日</span>
				<div class="rightHalf">
					<el-date-picker v-model="birthdayTime" type="date" placeholder="请选择生日" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="color:#c0c4cc;width: 179px;">
					</el-date-picker>
				</div>
			</div>
			<!-- 会员等级 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">会员等级</span>
				<div class="rightHalf">
					<el-select v-model="expirationTime" placeholder="请选择" @change="selexpirationTime" style="color:#c0c4cc;width: 179px;">
						<el-option v-for="item in expirationTimeList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</div>
			<!-- 会员标签 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">会员标签</span>
				<div class="rightHalf">
					<mul-select :list.sync="bussiness" :selects.sync="busineselect" :name='"name"' :keys='"id"' :styles="{marginRight:'8px',marginBottom:'8px',borderRadius:'4px'}" :isradio="false"></mul-select>
				</div>
			</div>
		</div>
	</Win>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			okStyle: {
				content: '确认',
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
				name: '男',
				id: 1
			}, {
				name: '女',
				id: 2
			}], //性别列表
			genderName: '男',
			genderId: 0, //性别选中的	
			startObj: {
				time: utils.getTime({
					time: new Date()
				}).start
			},
			expirationTimeList: [], //会员等级
			expirationTimeId: '', //会员等级选中的
			expirationTime: '请选择会员等级', //状态
			busineselect: [], //会员标签选中的
			genderListname: {
				0: '未知',
				1: '男',
				2: '女'
			},
			birthdayTime: '' //生日
		};
	},
	props: {
		memberInfo: Object,
		bussiness: Array
	},
	methods: {
		async getAppliedWin(res) {
			if (res == 'ok') {
				if (!this.checkForm()) return false;
				await this.changeMember(); //修改会员信息
				this.$emit('modifyBack', res);
			} else {
				this.$emit('modifyBack', res);
			}
		},
		selegender: function(i) { //选择性别的方法
			this.genderId = i; //点击门店对应的id	
		},
		selexpirationTime: function(i) {
			this.expirationTimeId = i; //点击卡类型对应的id
		},
		async getMemberList() {
			// 获取所有会员等级
			let data = await http.memberGetList({});
			let membergrade = data;
			this.expirationTimeList = [];
			for (let item of membergrade) {
				if (item.status != '2') {
					this.expirationTimeList.push(item);
				}
			}
		},
		checkForm: function() {
			if (this.startObj.time > new Date().getTime()) {
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'alert',
					content: '生日时间选择错误!'
				});
				return false;
			}
			return true;
		},
		async changeMember() {
			let data = await http.changeMember({
				data: {
					memberId: this.memberInfo.memberId, //会员id
					name: this.userName, //姓名
					gender: this.genderId == '0' ? '' : this.genderId, //性别
					birthday: this.birthdayTime, //生日
					levelId: this.expirationTimeId, //等级id
					tagIds: this.busineselect.join(',') //标签
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
		formatTime(time) {
			if (time.length == 10) {
				time *= 1000;
			}
			return utils.format(new Date(time), 'yyyy-MM-dd');
		},
		changeFormat: function(t) {
			t -= 0;
			if (t < 10) {
				return '0' + t;
			} else {
				return t + '';
			}
		},
		formatDate: function(time) {
			let newDate = new Date(time);
			let y = newDate.getFullYear(); //年
			let m = newDate.getMonth() + 1; //月
			let d = newDate.getDate(); //日
			let obj = {
				tips: y + '年' + this.changeFormat(m) + '月' + this.changeFormat(d) + '日', //格式化的时间
				tipsValue: y + '-' + this.changeFormat(m) + '-' + this.changeFormat(d) //传递后端的值
			};
			return obj;
		},
	},
	components: {
		Win: () =>
			import( /* webpackChunkName:'win' */ 'src/components/win'),
		selectBtn: () =>
			import( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
		'calendar-mouth': () =>
			import( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
		'mul-select': () =>
			import( /*webpackChunkName: 'mul_select' */ 'src/components/mul_select')
	},
	mounted() {
		this.getMemberList(); //获取会员等级
		let memberInfo = this.memberInfo;
		this.userName = memberInfo.name; //姓名
		this.mobile = memberInfo.mobile; //手机号
		this.genderName = this.genderListname[memberInfo.gender]; //性别
		this.genderId = memberInfo.gender; //性别id
		if (memberInfo.birthday == null || memberInfo.birthday == '0000-00-00') {
			this.birthdayTime = '';
		} else {
			this.birthdayTime = memberInfo.birthday;
		} //生日
		this.expirationTimeId = memberInfo.levelId; //等级id
		this.expirationTime = memberInfo.levelName; //等级名称
		for (let item of memberInfo.tagData) { //标签选中的
			this.busineselect.push(item.id);
		}
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
	width: 500px;
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
</style>