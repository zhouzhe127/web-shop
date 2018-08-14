<template>
	<div id="memberLabel">
		<div class="btn-concent">
			<button class="increase" @click="addMemberlabel('0','')" v-show="isFlag">添加会员标签</button>
		</div>
		<com-table :listHeight='80' :showHand="false" :showTitle='1' :listWidth="1000" :introData="labelList" :titleData="titleList">
			<div slot="con-0" slot-scope="props" class="dolist_btn">
				<span @click="addMemberlabel('1',props.data)" v-show="isFlag">编辑</span>
				<span @click="hintSwitch(props.data)" v-if="props.data.status == 0">开启</span>
				<span @click="hintSwitch(props.data)" v-if="props.data.status == 1">关闭</span>
			</div>
			<div></div>
		</com-table>
		<transition name="fade">
			<win v-if="isShowAddWin" @winEvent="closeWin" :width="540" :height="250">
				<span slot="title">{{title}}</span>
				<div slot="content" id="addLabel">
					<ul class="creatLabel">
						<li>
							<span class="labelLeft required">标签名称</span>
							<section class="labelRight">
								<input type="text" placeholder="请输入标签名称" class="inp" maxlength="20" v-model.trim="name" />
							</section>

						</li>
						<li>
							<span class="labelLeft">排序</span>
							<section class="labelRight subadd">
								<!-- <sd-subadd :num.sync="num" :maxnum="1000" :minnum="1"></sd-subadd> -->
								<sub-add @toClick="num=arguments[0]" :bindnum="num" :maxnum="1000" :minnum="1"></sub-add>
							</section>
						</li>
					</ul>
				</div>
			</win>
		</transition>
		<transition name="fade">
			<win v-if="isShowMemberWin" @winEvent="closeMemberWin" :width="540" :height="300">
				<span slot="title">提示</span>
				<div slot="content" id="hintPop">
					<p class="content">确定
						<template v-if="textOn == 1">关闭</template>
						<template v-if="textOn == 0">开启</template>该会员标签？</p>
				</div>
			</win>
		</transition>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import global from 'src/manager/global';
	export default {
		data() {
			return {
				labelList: [], //会员标签列表
				tagDetail: '', //会员标签信息
				tagOn: 0, //开启或是关闭
				name: '', //标签名称
				sort: '', //标签排序
				id: '', //标签id
				isFlag: false, //添加和编辑是否能够点击
				userShop: '',
				currentShop: '', //店鋪信息
				title: '',
				num: 1, //排序默认数字
				// id: '',
				isShowAddWin: false, // 会员配置弹框
				item: '',
				isShowMemberWin: false, //  是否显示会员关闭或打开弹框
				textOn: '',
				memberItem: '',
				titleList: [{
					titleName: '操作',
					titleStyle: {
						width: '100px',
						flex: 'none'
					}
				},
				{
					titleName: '名称',
					dataName: 'name'
				},
				{
					titleName: '已贴标签数量',
					dataName: 'relevanceNum'
				},
				{
					titleName: '排序',
					dataName: 'sort'
				},
				],
			};
		},
		methods: {
			closeMemberWin(str) {
				if (str == 'ok') {
					// this.isShowMemberWin = true
					this.hintLabel(this.memberItem);
					this.changeTag(this.memberItem);
				} else {
					this.isShowMemberWin = false;
				}
			},
			closeWin(str) {
				if (str == 'ok') {
					this.addLabel();
				} else {
					this.isShowAddWin = false;
				}

			},
			//添加或编辑会员标签
			addMemberlabel(index, item) {
				this.isShowAddWin = true;
				this.item = item || '';
				if (this.item) {
					this.name = item.name; //标签名称
					this.id = item.id;
					this.num = item.sort;
				} else {
					this.name = null; //标签名称
					this.id = null;
					this.num = 1;
				}
				this.title = index == '0' ? '新建会员标签' : '编辑会员标签';
				if (index == '1') {
					this.getDetail(item);
				}
			},
			async addLabel() {
				//判断是添加还是编辑
				if (!global.checkData({
					name: {
						cond: `$$.trim() != ''`,
						pro: '请输入标签名字'
					}
				}, this)) {
					return false;
				}
				this.isShowAddWin = false; // 关闭弹框
				let url = this.item == '' ? 'MemberTag/addTag' : 'MemberTag/updateTag';
				// let res = 
				await http.changeMemberTag({
					data: {
						id: this.id,
						name: this.name,
						sort: this.num
					},
					url: global.host['wx'] + url
				});
				this.getLabelList();
			},
			//获取会员列表
			async getLabelList() {
				let res = await http.getMemberTag({
					data: {}
				});
				this.labelList = res;
				this.labelList = utils.sortByAll(this.labelList);
			},
			//获取会员标签详情
			async getDetail(item) {
				let res = await http.getMemberTag({
					data: {
						id: item.id
					}
				});
				this.name = res.name;
				this.id = res.id;
				this.sort = res.sort;
			},

			//会员标签开启关闭状态改变
			changeTag(item) {
				if (item.status == 0) {
					item.status = 1;
				} else {
					item.status = 0;
				}
			},
			//是否开启会员标签
			hintSwitch(item) {
				this.id = item.id;
				this.memberItem = item || '';
				this.isShowMemberWin = true;
				this.textOn = item.status == 0 ? 1 : 0;
			},
			async hintLabel(item) {
				// let res = 
				await http.changeTagStatus({
					data: {
						id: item.id,
						flag: item.status == 0 ? 1 : 0
					}
				});
				this.isShowMemberWin = false;
			}
		},
		mounted() {
			this.getLabelList();
			this.userShop = storage.session('userShop');
			this.currentShop = this.userShop.currentShop;
			if (this.currentShop.ischain == 0 || this.currentShop.ischain == 3) {
				this.isFlag = !this.isFlag;
			}
		},
		components: {
			'win': () =>
				import ( /* webpackChunkName: 'win' */ 'src/components/win'),
			'sub-add': () =>
				import ( /* webpackChunkName: 'subadd' */ 'src/components/subadd'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		}
	};
</script>

<style type="text/css" scoped>
	#memberLabel .btn-concent {
		margin-bottom: 19px;
	}

	#memberLabel .increase {
		width: 210px;
		height: 40px;
		background-position: 40px 10px;
	}

	#memberLabel .tagList {
		width: 100%;
		border: 1px #D2D2D2 solid;
		padding-bottom: 20px;
	}

	#memberLabel .tagList .listTop {
		width: 100%;
		height: 40px;
		background: #F2F2F2;
		line-height: 40px;
		text-align: center;
	}

	#memberLabel .tagList .labelLi li {
		width: 25%;
		float: left;
	}

	#memberLabel .tagList .listBottom {
		width: 100%;
		height: 70px;
		line-height: 70px;
		text-align: center;
		border-bottom: 3px #F7F7F7 solid;
		overflow: hidden;
	}

	#memberLabel .tagList .listBottom li:nth-of-type(1) span {
		color: #00AAE5;
		margin: 0px 9px;
		font-size: 16px;
		padding-bottom: 2px;
		border-bottom: 1px #00AAE5 solid;
		cursor: pointer;
	}

	.dolist_btn span {
		color: #00AAE5;
		margin: 0px 9px;
		font-size: 16px;
		padding-bottom: 2px;
		border-bottom: 1px #00AAE5 solid;
		cursor: pointer;
	}


	#addLabel .creatLabel {
		width: 100%;
		height: 100%;
		padding: 50px 70px;
	}

	#addLabel .creatLabel li {
		width: 100%;
		height: auto;
		display: table;
		margin-bottom: 20px;
	}

	#addLabel .creatLabel li .labelLeft {
		width: 20%;
		display: table-cell;
		vertical-align: middle;
		font-size: 16px;
		text-align: end;
	}

	#addLabel .creatLabel li .labelRight {
		width: 70%;
		display: table-cell;
		padding-left: 20px;
	}

	#addLabel .creatLabel li .labelRight .inp {
		width: 215px;
		height: 41px;
		text-indent: 21px;
		line-height: 21px;
	}

	#addLabel .creatLabel li .labelRight .inp::-webkit-input-placeholder {
		font-size: 14px;
		color: #A5A5A5;
		outline: none;
	}

	#addLabel .creatLabel li .subadd .on-span {
		background-color: #B3B3B3;
	}

	#addLabel .creatLabel li .subadd .input-content {
		border: 1px #D2D2D2 solid;
		border-left: none;
		border-right: none;
		width: 56px;
	}

	#hintPop .content {
		width: 100%;
		height: 200px;
		text-align: center;
		line-height: 200px;
		font-size: 18px;
		color: #333;
	}
</style>