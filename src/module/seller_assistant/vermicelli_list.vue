<template>
	<div id="vermiceli_list">
		<template v-if="showVermicelliList">
			<header class="vermiceli_list_header">
				<span>用户分组</span>
				<select-btn :sorts="sorts" @selOn="selectGroup" :name="defaultName" :width="184"></select-btn>
				<input v-model.trim="recommendNames" type="text" placeholder="推荐人昵称">
				<input v-model.trim="userName" type="text" placeholder="用户昵称">
				<button @click="selectUser('header')" class="select">筛选</button>
				<button @click="resertUser" class="resert">重置</button>
			</header>
			<!-- list表格 -->
			<com-table :listHeight='80' :fixed='2' :listName="'粉丝列表'" :key="index" :showTitle='1' :introData="vermiceList" :listWidth="1437" :titleData="titleList" :allTotal="count" :widthType='true'>
				<div slot="title-0" @click="selectAll" class="content_select_all">全部</div>
				<div class="cli_radios" slot="con-0" slot-scope="props">
					<input :id="index" ref="input" @change="changeSelect($event,props.index)" :value="props.data" v-model="selectInfo" type="checkbox">
				</div>
				<div slot="con-1" slot-scope="props" class="detail_info">
					<span @click="showDetailInfo(props.data,index)">详细信息</span>
					<span @click="()=>{showVermicelliList=false;interData=props.data}">积分记录</span>
					<span @click="adjustRecord(props.data)">调整积分</span>
				</div>
				<div slot="con-2" slot-scope="props">
					<div v-if="props.data.recommendedImageUrl != '' && props.data.recommendedName != ''">
						<div>
							<img v-if="props.data.recommendedImageUrl != ''" :src="props.data.recommendedImageUrl" :alt="props.data.recommendedName" />
						</div>
						<div>
							<span>
								{{props.data.recommendedName}}
							</span>
						</div>
					</div>
					<div v-else>--</div>
				</div>
				<div slot="con-3" slot-scope="props" class="detail_img">
					<div>
						<img v-if="props.data.imageUrl != ''" :src="props.data.imageUrl" :alt="props.data.name" />
					</div>
					<div>
						<span>
							{{props.data.name}}
						</span>
					</div>
				</div>
				<div slot="con-4" slot-scope="props">{{props.data.sex | filterSex}}</div>
				<div slot="con-6" slot-scope="props">{{props.data.tagsStr || '无'}}</div>
				<div slot="con-7" slot-scope="props">{{props.data.memberId > '0' ? props.data.memberPoint : props.data.point}}</div>
			</com-table>
			<!-- 翻页 -->
			<section class="turn-page">
				<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(pageNum)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section>
			<transition name="fade">
				<set-user-group @closeWin="getUserGroup" :showList="list" :index="setType" v-if="isShowGroup"></set-user-group>
				<details-win @closeWin="editUserInfo" v-if="isShowDetailInfo" :detailInfo="detailInfo"></details-win>
				<integral-win @adjustInter="adjustInter" :pointData="pointData" v-if="isShowIntegral"></integral-win>
			</transition>
		</template>
		<template v-else>
			<integral-record :interData="interData" @closeInter="closeInter"></integral-record>
		</template>
	</div>
</template>
<script>
import http from 'src/manager/http';
import global from 'src/manager/global';
export default {
	data() {
		return {
			index: null,
			titleList: [{
				titleName: '',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 147 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '操作',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 363 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '推荐人',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 185.5 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '用户昵称',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 185.5 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '性别',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 136 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '分组',
				dataName: 'groupName',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 146 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '标签',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 136 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '积分',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 136 + 'px',
					flex: 'none'
				}
			},
			],
			allTotal: 0,
			page: 1,
			num: 10,
			pageNum: 1,
			defaultName: '全部',
			showVermicelliList: true, //  粉丝列表与详情的切换
			vermiceList: [], //  数据列表
			selectInfo: [], //  选中的用户
			isShowGroup: false, //  是否展示用户组弹框
			groupList: [], //  用户组数据
			labelList: [], //  设置标签数据
			list: [], //  传递给设置用户组组件的数据
			setType: '', //  1为设置用户组 2 为设置标签
			sorts: [],
			detailInfo: [],
			isShowDetailInfo: false, //  是否展示详细信息弹框
			// isShowLoading: false,                //   暂时不要，以防要
			isShowIntegral: false, //  是否展示积分调整弹框
			tagList: [],
			total: '',
			userList: [],
			pointData: [],
			interData: [],
			recommendNames: '',
			userName: '',
			selects: ['-1'], //  选择的用户分组
			isOwer: '', //  粉丝数据是否来着但一分组
			editIndex: [], //   被编辑的数据下表
			interIndex: '',
			count: 0,
			selAll: false, //  是否全选
			timer: '' //定时器
		};
	},
	methods: {
		selectAll() {
			this.editIndex = [];
			this.selAll = !this.selAll;
			let arr = document.querySelectorAll('.cli_radios input');
			if (arr) {
				for (let i = 0; i < arr.length; i++) {
					arr[i].checked = this.selAll;
					arr[i].className = this.selAll ? 'select_icon' : '';
					this.editIndex.push(i);
				}
				this.selectInfo = this.selAll ? [...this.vermiceList] : [];
				if (this.selAll) {
					this.editIndex = this.editIndex;
				} else {
					this.editIndex = [];
				}
			}
		},
		selectGroup(val) {
			if (val == 0) {
				this.selects = ['-1'];
			} else {
				this.selects = [this.userList[[val - 1]].id];
			}
		},
		pageChange(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.selectInfo = [];
			this.selectUser('foot');
		},
		async selectUser(type) { //  筛选
			if (type == 'header') {
				this.page = 1;
			}
			this.selectInfo = [];
			this.editIndex = [];
			this.selAll = false;
			if (this.$refs.input) {
				for (let i = 0; i < this.$refs.input.length; i++) {
					this.$refs.input[i].className = '';
					this.$refs.input[i].checked = false;
				}
			}
			let res = await http.getAssistantfans({
				data: {
					count: this.num,
					startIndex: this.page,
					groupId: this.selects[0] === '' ? '-1' : this.selects[0],
					nickname: this.userName,
					recommendedName: this.recommendNames
				}
			});
			if (this.page == '1') {
				this.count = res.count;
			}
			this.pageNum = Math.ceil(this.count / this.num);
			this.vermiceList = res.fansList;
		},
		resertUser() { //  重置
			this.recommendNames = '';
			this.userName = '';
			this.defaultName = '全部';
			this.page = 1;
			this.selects = ['-1'];
			this.selectUser(1);
		},
		adjustInter(val) {
			this.isShowIntegral = false;
			if (val) { //   改变积分
				for (let i = 0; i < this.vermiceList.length; i++) {
					if (val.id == this.vermiceList[i].id) {
						if (this.vermiceList[i].memberId > '0') {
							this.vermiceList[i].memberPoint = val.point;
						} else {
							this.vermiceList[i].point = val.point;
						}
					}
				}
			}
		},
		changeSelect(e, i) {
			if (e.target.checked) {
				e.target.className = 'select_icon';
			} else {
				e.target.className = '';
			}
			if (this.editIndex.indexOf(i) != -1) { //   确定哪些下表的数据被修改
				let n = this.editIndex.indexOf(i);
				this.editIndex.splice(n, 1);
			} else {
				this.editIndex.push(i);
			}
		},
		async setGroup() {
			if (!this.selectInfo.length > 0) {
				this.valiData('请选择用户');
				return false;
			}
			this.isShowGroup = true;
			this.list = this.userList;
			this.setType = 1;

		},
		async exportUser() {
			if (!this.selectInfo.length > 0) {
				this.valiData('请选择需要导出的粉丝');
				return false;
			}
			let fansIds = []; //被选中的粉丝的id
			for (let i of this.selectInfo) {
				fansIds.push(i.id);
			}
			await http.exportAssistantfans({
				data: {
					format: 'csv',
					fansIds: fansIds.join(',')
				}
			});
		},
		setLabel() {
			if (!this.selectInfo.length > 0) {
				this.valiData('请选择用户');
				return false;
			}
			this.isShowGroup = true;
			this.list = this.tagList;
			this.setType = 2;
		},
		valiData(content, title, winType) {
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		getUserGroup(val) {
			this.isShowGroup = false;
			if (val) {
				if (this.setType === 1) {
					this.setGroupUser(val.data);
				} else {
					this.setUserLabel(val.data);
				}
			}
		},
		async setUserLabel(val) {
			let fansIds = [];
			let tagName = []; //   被设置的标签
			for (let i of this.selectInfo) {
				fansIds.push(i.id);
			}
			let res = await http.setUserTag({
				data: {
					tagIds: val.join(','),
					fansIds: fansIds.join(',')
				}
			});
			if (res) {
				this.$store.commit('setWin', {
					content: '设置成功',
					title: '操作提示',
					winType: 'alert'
				});
				for (let key = 0; key < this.tagList.length; key++) {
					for (let item of val) {
						if (this.tagList[key].id == item) {
							tagName.push(this.tagList[key].name); //  被选中的标签名
						}
					}
				}
				for (let p of this.editIndex) {
					this.vermiceList[p].tagsStr = tagName.join('、');
				}
			}
		},
		async setGroupUser(val) {
			let openIdList = []; //openid  列表
			let idList = []; //  id  列表
			let groupId = val[0]; /// 用户分组 id
			let groupName = ''; //  被修改的用户分组name
			for (let i of this.userList) {
				if (val[0] == i.id) {
					groupName = i.name;
				}
			}
			for (let key of this.selectInfo) {
				openIdList.push(key.openId);
				idList.push(key.id);
			}
			let res = await http.setGroupAssistant({
				data: {
					groupId: groupId,
					openIdList: openIdList.join(','),
					idList: idList.join(',')
				}
			});
			if (res) {
				this.$store.commit('setWin', {
					content: '设置成功',
					title: '操作提示',
					winType: 'alert'
				});
				for (let p of this.editIndex) {
					this.vermiceList[p].groupName = groupName;
				}
			}

		},
		showDetailInfo(info, index) {
			this.interIndex = index;
			this.isShowDetailInfo = true;
			this.detailInfo = info;
		},
		adjustRecord(item) {
			this.isShowIntegral = true;
			this.pointData = item;
		},
		editUserInfo(val) {
			this.isShowDetailInfo = false;
			if (val) {
				this.vermiceList[this.interIndex].realName = val.name;
				this.vermiceList[this.interIndex].mobile = val.mobile;
			}
		},
		async getUserGroups() { //   用户分组名称
			let res = await http.getUserGroups({
				data: {}
			});
			if (res && res != '') {
				this.userList = Object.values(res);
				let arr = [];
				for (let i of this.userList) {
					arr.push(i.name);
				}
				arr.unshift('全部');
				this.sorts = arr;
				if (this.isOwer) {
					for (let user of this.userList) {
						if (user.id == global.groupFansList.groupId) {
							this.defaultName = user.name;
						}
					}
					this.selectUser(1);
				} else {
					this.selectUser(1);
				}
			}
		},
		async getlabelList() { //   获取标签
			let res = await http.getlabelList({
				data: {}
			});
			this.tagList = res;
		},
		addPublic: function() { //一键同步公众号粉丝
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确定一键同步微信公众号粉丝吗？',
				callback: (res) => {
					if (res == 'ok') {
						this.syncFans();
					}
				}
			});
		},
		async syncFans() { //同步粉丝
			let data = await http.syncFans({
				data: {}
			});
			if (data) {
				this.$store.commit('setWin', {
					content: '正在同步微信用户与用户组,请勿关闭页面...',
					title: '操作提示',
					winType: 'alert'
				});
				let self = this;
				this.timer = setInterval(function() {
					self.getSyncStatus();
				}, 4000);
			}
		},
		async getSyncStatus() {
			let data = await http.getSyncStatus({
				data: {}
			});
			if (data) {
				clearInterval(this.timer);
				this.$store.commit('setWin', {
					content: '同步成功',
					title: '操作提示',
					winType: 'alert'
				});
				this.getUserGroups();
			}
		},
		closeInter: function() {
			this.showVermicelliList = true;
			this.$store.commit('setPageTools', {
				addPublic: () => {
					this.addPublic();
				},
				setGroup: () => {
					this.setGroup();
				},
				exportUser: () => {
					this.exportUser();
				}
			});
		}
	},
	filters: {
		filterSex(val) {
			if (val == 0) {
				return '未知';
			} else if (val == 1) {
				return '男';
			} else {
				return '女';
			}
		}
	},
	mounted() {
		this.$store.commit('setPageTools', {
			addPublic: () => {
				this.addPublic();
			},
			setGroup: () => {
				this.setGroup();
			},
			exportUser: () => {
				this.exportUser();
			}
		});
		this.isOwer = global.groupFansList.isOwer;
		this.selects = [global.groupFansList.groupId];
		this.getUserGroups();
		this.getlabelList();

	},
	components: {
		pageElement: () =>
		import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		'details-win': () =>
		import ( /* webpackChunkName: 'details_win' */ './details_win'),
		'set-user-group': () =>
		import ( /* webpackChunkName: 'set_user_group' */ './set_user_group'),
		'select-btn': () =>
		import ( /* webpackChunkName: 'select_btn' */ 'src/components/select_btn'),
		'integral-win': () =>
		import ( /* webpackChunkName: 'integral_win' */ './integral_win'),
		'integral-record': () =>
		import ( /* webpackChunkName: 'integral_record' */ './integral_record'),
		selectBtn: () =>
		import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		comTable: () =>
		import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
	},
	beforeDestroy() {
		global.groupFansList = {
			isOwer: false,
			data: [],
			groupId: ''
		};
	}
};
</script>
<style lang="less" scoped>
#vermiceli_list {
	position: relative;
	.vermiceli_list_aside {
		position: absolute;
		top: -50px;
		right: 20px;
		.public_number_btn {
			width: 209px;
			height: 40px;
			border: 1px solid RGB(255, 152, 0);
			color: RGB(255, 152, 0);
			background: #fff;
		}
		.user_btn {
			width: 117px;
			height: 40px;
			border: 1px solid RGB(255, 152, 0);
			color: #fff;
			background: RGB(255, 152, 0);
		}
		.export_btn {
			width: 113px;
			height: 40px;
			background: #fff;
			border: 1px solid RGB(40, 168, 224);
			color: RGB(40, 168, 224);
		}
		.set_btn {
			width: 112px;
			height: 40px;
			background: RGB(40, 168, 224);
			border: 1px solid RGB(40, 168, 224);
			color: #fff;
		}
	}
	.vermiceli_list_header {
		margin-top: 10px;
		span {
			font-size: 16px;
			color: #333333;
			margin-right: 20px;
		}
		input {
			width: 184px;
			height: 42px;
			border: 1px solid RGB(179, 179, 179);
			padding: 0 20px;
			margin: 0 10px;
		}
		.select {
			width: 101px;
			height: 42px;
			border: none;
			background: RGB(40, 168, 224);
			margin-right: 20px;
			color: #fff;
		}
		.resert {
			width: 101px;
			height: 42px;
			border: none;
			background: RGB(179, 179, 179);
			margin-right: 20px;
			color: #fff;
		}
	}
	.content_select_all {
		color: #27a8e0;
		text-decoration: underline;
		cursor: pointer;
	}
	.cli_radios {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		input {
			width: 21px;
			height: 21px;
			border: 1px solid RGB(145, 145, 145);
			border-radius: 50%;
			outline: none;
		}
	}
	.detail_info {
		span:nth-child(1) {
			font-size: 16px;
			color: rgb(39, 168, 224);
			padding: 0 10px;
			border-right: 1px solid RGB(206, 206, 206);
		}
		span:nth-child(2) {
			font-size: 16px;
			color: rgb(39, 168, 224);
			border-right: 1px solid RGB(206, 206, 206);
			padding: 0 10px;
		}
		span:nth-child(3) {
			font-size: 16px;
			color: RGB(255, 141, 0);
			padding: 0 10px;
		}
		span {
			cursor: pointer;
		}
	}
	.detail_img {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		div:nth-child(1) {
			width: 80px;
			height: 63px;
			float: left;
			position: relative;
			img {
				display: block;
				width: 49px;
				height: 49px;
				border-radius: 50%;
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				margin: auto;
			}
		}
		div:nth-child(2) {
			width: 105px;
			height: 63px;
			float: left;
			text-align: center;
			line-height: 63px;
			white-space: normal;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
	li {
		border-top: 1px solid RGB(247, 247, 247);
		height: 63px;
		line-height: 62px;
	}
	.turn-page {
		margin: 10px 0 30px 0;
	}
	.vermiceli_list_loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: .5;
		z-index: 100;
		background: #000;
		color: #fff;
		font-size: 20px;
		text-align: center;
		line-height: 100%;
	}
	.btn {
		font-size: 16px;
		margin-left: 18px;
	}
	.content_list {
		width: 1437px;
		background-attachment: RGB(242, 242, 242);
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		text-align: center;
		li:nth-child(1) {
			width: 147px;
		}
		li:nth-child(2) {
			width: 363px;
		}
		li:nth-child(3) {
			width: 185.5px;
			overflow: hidden;
			white-space: nowrap;
		}
		li:nth-child(4) {
			width: 185.8px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		li:nth-child(5) {
			width: 136px;
		}
		li:nth-child(6) {
			width: 146px;
		}
		li:nth-child(7) {
			width: 136px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		li:nth-child(8) {
			width: 136px;
		}
	}
	.nolist {
		width: 1436px;
		text-align: center;
		line-height: 70px;
		font-size: 24px;
		color: #E0E0E0;
	}
	.select_icon {
		background-image: url(../../res/icon/icon-select-blue.png);
		border: none;
	}
}

@media screen and (min-width:1024px) and (max-width:1440px) {
	#vermiceli_list .vermiceli_list_header input {
		width: 144px;
		height: 42px;
		border: 1px solid #b3b3b3;
		padding: 0 20px;
		margin: 0 10px;
	}
	#vermiceli_list .vermiceli_list_header .resert {
		width: 101px;
		height: 42px;
		border: none;
		background: #b3b3b3;
		margin-right: 0px;
		color: #fff;
	}
}
</style>