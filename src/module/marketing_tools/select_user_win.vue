<template>
	<win :width="700" :height="500" @winEvent="winEvent">
		<span slot="title">选择微信粉丝</span>
		<div class="user_content" slot="content">
			<header class="user_header">
				<el-input class="input" style="padding-left: 0;" v-model.trim="keyWords" clearable placeholder="输入关键字"></el-input>
				<el-button v-on:click="selectUser" type="primary">筛选</el-button>
				<el-button v-on:click="resertUser" type="info">重置</el-button>
			</header>
			<div class="user_list">
				<ul>
					<li @click="chooseUser(item)" :class="{'user_color': item.selected}" v-for="(item,index) in fansList" :key="index">
						<i :class="item.selected?'point':'unpoint'"></i>
						<img :src="item.imageUrl" alt="">
						<span>{{item.name}}</span>
					</li>
				</ul>
			</div>

			<footer class="user_footer">
				<!-- 翻页 -->

				<section class="turn-page">
					<!-- <pageElement background layout="prev, pager, next" @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :numArr="[10,20,30,40,50]" :isNoJump="true">
					</pageElement> -->
					<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
					<!-- <pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement> -->
				</section>
			</footer>
		</div>
	</win>
</template>
<script>
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				fansList: [],
				showId: '',
				keyWords: '',
				page: 1,
				num: 10,
				count: '',
				userselects: [],
				total: 1,
				seachValue: ''
			};
		},
		props: {
			selectedList: Array //选中
		},
		methods: {
			winEvent(str) {
				if (str == 'ok') {
					if (this.userselects == '') {
						this.$store.commit('setWin', {
							content: '请选择用户',
							title: '操作提示',
							winType: 'alert'
						});
						return false;
					} else {
						this.$emit('closeWin', this.userselects);
					}
				} else {
					this.$emit('closeWin');
				}
			},
			async getUserList(type) {
				let res = await http.getAssistantfans({
					data: {
						count: this.num,
						startIndex: this.page,
						nickname: this.keyWords,
						groupId: -1
					}
				});
				for (let i = 0; i < res.fansList.length; i++) {
					if (this.userselects.length == 0) {
						res.fansList[i].selected = false;
					} else {
						for (let j = 0; j < this.userselects.length; j++) {
							if (this.userselects[j].id == res.fansList[i].id) {
								res.fansList[i].selected = this.userselects[j].selected;
								break;
							} else {
								res.fansList[i].selected = false;
							}
						}
					}
				}
				this.fansList = res.fansList;
				if (this.page == '1') {
					this.count = res.count;
				}
				this.total = Math.ceil(this.count / 10);
				if (type && this.fansList.length == 0) {
					this.$store.commit('setWin', {
						content: '无此用户',
						title: '操作提示',
						winType: 'alert'
					});
				}
			},
			chooseUser: function(item) {
				if (this.userselects.length >= 10) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '最多可选十个工作人员'
					});
					return false;
				}
				item.selected = !item.selected;
				if (item.selected) {
					this.userselects.push(item);
					for (let i = 0; i < this.fansList.length; i++) {
						if (this.fansList[i].selected != true) {
							return;
						}
					}
				} else {
					for (let j = 0; j < this.userselects.length; j++) {
						if (this.userselects[j].id == item.id) {
							this.userselects.splice(j, 1);
						}
					}
				}
			},
			selectUser() {
				if (this.keyWords == '') {
					this.$store.commit('setWin', {
						content: '请选择用户',
						title: '操作提示',
						winType: 'alert'
					});
					return false;
				}
				this.page = 1;
				this.getUserList(1, true);
			},

			resertUser() {
				this.keyWords = '';
				this.getUserList(1);
			},
			// pageChange(obj) { //翻页
			// 	this.page = obj.page;
			// 	this.num = obj.num;
			// 	this.getUserList();
			// },
			//每页显示多少条数据
			handleSizeChange(p) {
				this.num = p;
				this.getUserList();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.getUserList();
			},			
		},
		mounted() {
			this.userselects = [];
			for (let item of this.selectedList) {
				this.userselects.push(item);
			}
			this.getUserList(1);
		},
		components: {
			pageElement: () =>
				import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
			'win': () =>
				import ( /* webpackChunkName: 'win' */ 'src/components/win'),
		}
	};
</script>
<style lang="less" scoped>
	.user_content {
		padding: 15px 24px 0;

		.user_header {
			.input {
				width: 183px;
				height: 42px;
				// padding: 0 17px;
				margin-right: 20px;
			}

			.select {
				width: 101px;
				height: 42px;
				background: RGB(40, 168, 224);
				border: none;
				margin-right: 20px;
				color: #fff;
				font-size: 16px;
			}

			.resert {
				width: 101px;
				height: 42px;
				background: RGB(179, 179, 179);
				border: none;
				font-size: 16px;
				color: #fff
			}
		}

		.user_list {
			ul {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-items: center;

				li {
					width: 94px;
					height: 121px;
					border: 1px solid #eaeaea;
					margin: 10px 10px 0 0;
					display: flex;
					flex-direction: column;
					text-align: center;

					img {
						width: 60px;
						height: 60px;
						border-radius: 50%;
						margin: 10px 20px;
					}

					span {
						text-align: center;
						color: RGB(51, 51, 51);
						font-size: 14px;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}

		.user_footer {
			text-align: left;
			margin-top: 36px;
			// margin-left: 50px;

			.turn-page {
				margin: 10px 0 30px 0;
			}
		}

		.user_color {
			border: 1px solid #e9c048 !important;
		}

		.point {
			display: block;
			width: 4px;
			height: 4px;
			background: #fff;
			position: relative;
			left: 38px;
			top: 4px;
			border-radius: 100px;
			border: 4px solid #f4dfa3;
			padding: 2px;
		}

		.unpoint {
			display: block;
			width: 4px;
			height: 4px;
			background: #fff;
			position: relative;
			left: 38px;
			top: 4px;
			border-radius: 100px;
			border: 4px solid #fff;
			padding: 2px;
		}
	}
</style>