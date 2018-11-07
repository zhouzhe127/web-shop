/** * 新建话术组 * *miaochuan.sha */
<template>
	<win :width="653" :height="695" :align="'right'" @winEvent="winEvent" :cancel="cancelType">
		<span slot="title">新建话术组</span>
		<div class="speech_content" slot="content">
			<header class="content_header">
				<span>话术组名称</span>
				<!-- <input type="text" maxlength="4" v-model.trim="speechNames" placeholder="输入名称"> -->
				<el-input v-model="speechNames" maxlength="10" placeholder="输入名称" style="width:179px;"></el-input>
			</header>
			<section class="content_body">
				<ul>
					<li v-for="(item,index) in speechList" :key="index">
						<span>{{index + 1}}</span>
						<!-- <input maxlength="100" type="text" v-model.trim="item.value" placeholder="请输入话术内容" v-if="type == 'new' || type == 'oldnew'"> -->
						<el-input v-model="item.value" v-if="type == 'new' || type == 'oldnew'" placeholder="请输入话术内容" style="width:179px;"></el-input>
						<div class="pathname" v-if="type == 'path'|| type == 'oldpath'" @click="chooseFun(item)">{{item.name}}</div>
						<img @click="delSpeech(index)" src="../../../res/icon/icondelete.png">
					</li>
				</ul>
				<!-- <div @click="createSpeech" class="add_win" v-if="type == 'new' || type == 'oldnew'">
					<img src="../../../res/images/add.png" />新建话术内容</div> -->
				<div class="add_win" v-if="type == 'new' || type == 'oldnew'">
					<el-button type="primary" icon="el-icon-plus" @click="createSpeech" style="width:179px;">新建话术内容</el-button>
				</div>
				<div class="add_win" v-if="type == 'path' || type == 'oldpath'">
					<el-button type="primary" icon="el-icon-plus" @click="chooseFun('')" style="width:179px;">选择功能</el-button>
				</div>
				<!-- <div @click="chooseFun('')" class="add_win" v-if="type == 'path' || type == 'oldpath'">
					<img src="../../../res/images/add.png" />选择功能</div> -->
			</section>
			<!-- 选择路径的弹窗 -->
			<transition name="fade">
				<path-win :speechList="speechList" :detail="chooseMenu" :menuList="menuList" @getAppliedWin="getResult" v-if="showPath"></path-win>
			</transition>
		</div>
	</win>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				speechList: [],
				speechNames: this.speechName,
				showPath: false, //路径弹窗默认false
				chooseMenu: '',
				menuList: [] //菜单的列表
			};
		},
		props: {
			speechs: {
				type: Array,
				default () {
					return [];
				}
			},
			speechName: {
				type: String
			},
			speechId: '',
			speechType: '', //话术的类型
			type: '' //类型
		},
		computed: {
			isEdit() { ///  是编辑还是添加
				if (this.speechs.length == 0 && this.speechName == '') { //  表示添加
					return false;
				} else {
					return true;
				}
			},
			cancelType() {
				if (this.isEdit) {
					return {
						content: '删除'
					};
				} else {
					return {
						content: '取消'
					};
				}
			}
		},
		methods: {
			winEvent(str) {
				if (str == 'ok') {
					if (!this.isEdit) {
						this.addSpeech();
					} else {
						this.editSpeech();
					}
				} else {
					if (str == 'cancel' && this.isEdit) {
						this.$store.commit('setWin', {
							title: '操作提示',
							winType: 'confirm',
							content: '确认删除话术组',
							callback: (str) => {
								if (str == 'ok') {
									this.deleteSpeech();
								}
							}
						});
					} else {
						this.$emit('closeWin');
					}
				}
			},
			async addSpeech() {
				if (this.speechNames.trim() == '') {
					this.valiData('话术组名称不能为空');
					return false;
				}
				let arr = [];
				if (this.type == 'new') {
					for (let i of this.speechList) {
						if (i.value == '') {
							this.valiData('话术内容不能为空');
							return false;
						}
					}

					for (let item of this.speechList) {
						arr.push(item.value);
					}
					arr = arr.join('&');
				}
				await http.addBaltrick({
					data: {
						name: this.speechNames,
						content: this.type == 'new' ? arr : JSON.stringify(this.speechList),
						type: this.type == 'new' ? 0 : 1
					}
				});
				this.$emit('closeWin', 'success');
			},
			async editSpeech() {
				if (this.speechNames.trim() == '') {
					this.valiData('话术组名称不能为空');
					return false;
				}
				let arr = [];
				if (this.type == 'oldnew') {
					for (let i of this.speechList) {
						if (i.value == '') {
							this.valiData('话术内容不能为空');
							return false;
						}
					}

					for (let item of this.speechList) {
						arr.push(item.value);
					}
					arr = arr.join('&');
				}
				await http.editBaltrick({
					data: {
						id: this.speechId,
						name: this.speechNames,
						content: this.type == 'oldnew' ? arr : JSON.stringify(this.speechList),
						type: this.type == 'oldnew' ? 0 : 1
					}
				});
				this.$emit('closeWin', 'success');
			},
			async deleteSpeech() {
				await http.delVerBaltrick({
					data: {
						id: this.speechId
					}
				});
				this.$emit('closeWin', 'success');
			},
			valiData(content) {
				this.$store.commit('setWin', {
					content: content,
					winType: 'alert',
					title: '操作提示'
				});
			},
			createSpeech() {
				if (this.speechList.length > 19) {
					this.$store.commit('setWin', {
						content: '话术不能多于20条',
						winType: 'alert',
						title: '操作提示'
					});
					return false;
				}
				this.speechList.push({
					value: ''
				});
			},
			delSpeech(i) {
				this.speechList.splice(i, 1);
				this.speechList.length - 1;
			},
			delOldSpeech(i) {
				this.oldSpeech.splice(i, 1);
				this.oldSpeech.length - 1;
			},
			chooseFun: function(item) { //选择功能
				if (this.speechList.length > 19) {
					this.$store.commit('setWin', {
						content: '话术不能多于20条',
						winType: 'alert',
						title: '操作提示'
					});
					return false;
				}
				this.showPath = true;
				this.chooseMenu = item;
			},
			getResult: function(res, item) {
				if (res == 'ok') {
					this.speechList = item;
				}
				this.showPath = false;
			},
			async getMeun() { //如果添加路径话术 请求菜单列表
				let data = await http.getSelfMenu({
					data: {}
				});
				for (let item of data) {
					if (item.flag && item.flag != '') {
						this.menuList.push(item);
					}
				}
			}
		},
		mounted() {

			if (this.type == 'path' || this.type == 'oldpath') {
				this.getMeun();
			}
			if (this.speechType && this.speechType == '0') {
				for (let item of this.speechs) {
					let obj = {};
					obj.value = item;
					this.speechList.push(obj);
				}
			} else {
				this.speechList = utils.deepCopy(this.speechs);
			}
		},
		components: {
			'win': () =>
				import ( /* webpackChunkName: 'win' */ 'src/components/win'),
			'path-win': () =>
				import ( /* webpackChunkName: 'speech_win' */ './speech_path')
		}
	};
</script>
<style lang="less" scoped>
	.speech_content {
		margin-top: 27px;

		.content_header {
			span {
				margin-left: 56px;
				font-size: 14px;
				margin-right: 14px;
			}

			input {
				width: 183px;
				height: 43px;
				padding: 0 17px;
			}
		}

		.content_body {
			ul li {
				padding-left: 144px;
				margin-top: 30px;
				display: flex;
				flex-direction: row;
				align-items: center;

				span:nth-child(1) {
					background: #E1BB4A;
					width: 27px;
					height: 27px;
					border-radius: 50%;
					color: #fff;
					margin-right: 19px;
					display: inline-block;
					text-align: center;
					line-height: 26px;
				}

				span:nth-child(2) {
					font-size: 14px;
					color: RGB(102, 102, 102);
					width: 268px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				img {
					margin-left: 18px;
					margin-top: 1px;
				}

				input {
					width: 183px;
					height: 43px;
					padding: 0 17px;
					border: 1px solid RGB(179, 179, 179);
				}

				.pathname {
					width: 130px;
					height: 43px;
					line-height: 43px;
					cursor: pointer;
				}
			}

			.add_win {
				width: 210px;
				height: 40px;
				border: none;
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 20px;
				margin-left: 144px;
				font-size: 14px;
				color: #fff;
				cursor: pointer;

				img {
					width: 19px;
					height: 19px;
					margin-right: 13px;
				}
			}
		}
	}
</style>