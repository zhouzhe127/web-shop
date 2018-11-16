<template>
	<win :width="700" :height="450" @winEvent="winEvent">
		<span slot="title">选择用户</span>
		<div class="user_content" slot="content">
			<header class="user_header">
				<!-- <input type="text" v-model.trim="keyWords" placeholder="输入关键字"> -->
				<el-input v-model="keyWords" maxlength="10" placeholder="输入关键字" style="width:179px;margin-right: 20px;"></el-input>
				<!-- <button @click="selectUser" class="select">筛选</button>
				<button @click="resertUser" class="resert">重置</button> -->
				<el-button type="primary" style="width:100px;" @click="selectUser">筛选</el-button>
				<el-button type="info" style="width:100px;" @click="resertUser">重置</el-button>
			</header>
			<div class="user_list">
				<ul>
					<li @click="chooseUser(item.id)" :class="item.id == showId?'user_color':''" v-for="(item,index) in fansList" :key="index">
						<img :src="item.imageUrl" alt="">
						<span>{{item.name}}</span>
					</li>
				</ul>
			</div>
			<footer class="user_footer">
				<!-- 翻页 -->
				<section class="turn-page">
					<!-- <pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement> -->
					<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
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
				total: 0,
				selects: ''
			};
		},
		props: ['showIds'],
		methods: {
			winEvent(str) {
				if (str == 'ok') {
					if (this.selects == '') {
						this.$store.commit('setWin', {
							content: '请选择用户',
							title: '操作提示',
							winType: 'alert'
						});
						return false;
					} else {
						this.$emit('closeWin', this.selects);
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
				this.fansList = res.fansList;
				if (this.page == '1') {
					this.count = res.count;
				}
				this.total = Math.ceil(this.count / this.num);
				if (type && this.fansList.length == 0) {
					this.$store.commit('setWin', {
						content: '无此用户',
						title: '操作提示',
						winType: 'alert'
					});
				}
			},
			chooseUser(item) {
				this.selects = item;
				this.showId = item;
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
				this.getUserList(true);
			},
			resertUser() {
				this.keyWords = '';
				this.getUserList();
			},
			// pageChange(obj) { //翻页
			// 	this.page = obj.page;
			// 	this.num = obj.num;
			// 	this.getUserList();
			// },
			//每页显示多少条数据
			handleSizeChange(p) {
				this.page = 1;
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
			this.getUserList();
			if (this.showIds) {
				this.showId = this.showIds;
				this.selects = this.showIds;
			}
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
			input {
				width: 183px;
				height: 42px;
				padding: 0 17px;
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
					border: 1px solid RGB(210, 210, 210);
					margin: 10px 10px 0 0;
					display: flex;
					flex-direction: column;
					text-align: center;

					img {
						width: 60px;
						height: 60px;
						border-radius: 50%;
						margin: 17px 20px
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

			.turn-page {
				margin: 10px 0 30px 0;
			}
		}

		.user_color {
			background: RGB(255, 237, 209) !important;
			border: 1px solid RGB(255, 152, 0) !important;
		}
	}
</style>