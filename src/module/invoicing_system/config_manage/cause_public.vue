<template>
	<div class="all" style="text-align:left;" id="off">
		<ul class="oUl">
			<li @click="add">
				<i class="add"></i>
				<h2>新增原因</h2>
			</li>
			<section v-for="(list, index) in contractList" :key="index">
				<li class="oLi">
					<section v-if="list.status == 0">
						<section>
							<h3 v-if='list.edit' style="color:gray;">{{list.name}}</h3>
							<textarea v-else v-model="editName" autofocus="autofocus" maxlength="30"></textarea>
						</section>
						<p class="index">{{index+1}}</p>
						<section>
							<div style="background:gray;" @click="deleteOff(list,index)">删除</div>
							<div v-if="list.edit" style="background:#f8941f;right: 0;" @click="edit(index,list)">编辑</div>
							<div v-else style="background:#f8941f;right: 0;" @click="editsave(list)">完成</div>
						</section>
					</section>
					<section v-else>
						<h3 v-if='list.edit' style="color:gray;">{{list.name}}</h3>
						<textarea v-else v-model="editname" autofocus="autofocus" maxlength="30"></textarea>
						<p class="index">{{index+1}}</p>
					</section>
				</li>
			</section>
		</ul>
		<addwin @add-cause="addnewcause" v-if="showcause" :type="type"></addwin>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				shopId: null,
				contractList: [], //原因列表 
				editName: '', //修改原因
				showcause: false, //新增原因弹窗
			};
		},
		props: {
			type: Number
		},
		methods: {
			//获取耗损原因列表
			async getList() {
				let res = await http.causeList({
					data: {
						shopId: this.shopId,
						type: this.type
					}
				});
				for (let i = 0; i < res.length; i++) {
					res[i].edit = true;
				}
				this.contractList = res;
			},
			//新增耗损原因
			async addCause(titleName) {
				let res = await http.addCause({
					data: {
						shopId: this.shopId,
						name: titleName
					}
				});
				res.edit = true;
				res.status = 0;
				this.contractList.push(res);
			},
			//新增原因
			add() {
				this.showcause = true;
			},
			//删除原因
			deleteOff(item, index) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'confirm',
					content: '确认删除?',
					callback: (res) => {
						if (res == 'ok') {
							http.deleteCause({
								data: {
									shopId: this.shopId,
									id: item.id
								}
							});
							this.contractList.splice(index, 1);
						}
					}
				});
			},
			//编辑原因
			edit(index, list) {
				for (let i = 0; i < this.contractList.length; i++) {
					if (i == index) {
						this.contractList[i].edit = false;
					}
				}
				this.editName = list.name;
			},
			//修改完成
			editsave(list) {
				http.editCause({
					data: {
						shopId: this.shopId,
						id: list.id,
						name: this.editName
					}
				});
				list.name = this.editName;
				list.edit = !list.edit;
			},
			//弹窗点击
			addnewcause(res, titleName) {
				this.showcause = false;
				if (res == 'ok') {
					this.addCause(titleName);
				}
			}
		},
		mounted() {
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
			this.getList();
		},
		components: {
			addwin: () =>
				import ( /*webpackChunkName: 'addcause_win'*/ './addcause_win')
		}
	};
</script>


<style lang="less" scoped>
	#off {
		.all {
			width: 100%;
			text-align: left
		}
		.oUl {
			width: 100%;
			height: auto;
			.add {
				background: url(../../../res/images/comadd.png) no-repeat;
			}
			li {
				width: 250px;
				height: 150px;
				border: 1px solid #ccc;
				border-radius: 2px;
				float: left;
				margin-right: 20px;
				margin-bottom: 15px;
				position: relative;
				cursor: pointer;
				&.oLi {
					background: #eee;
				}
				i {
					width: 47px;
					height: 47px;
					position: absolute;
					top: 0;
					left: 0;
					bottom: 50px;
					right: 0;
					margin: auto;

				}
				h2 {
					width: 100%;
					color: #999;
					font-size: 18px;
					text-align: center;
					position: absolute;
					bottom: 45px;
				}
				.index {
					font-size: 38px;
					color: #dddddd;
					position: absolute;
					top: 10px;
					right: 10px;
				}
			}
			.oLi {
				h3 {
					width: 180px;
					line-height: 30px;
					font-size: 18px;
					margin: 10px 10px;
					word-wrap: break-word
				}
				img {
					position: absolute;
					bottom: 40px;
					right: 21px;
				}
				div {
					width: 50%;
					height: 35px;
					line-height: 35px;
					text-align: center;
					position: absolute;
					bottom: 0;
					color: #efefef;
				}
				textarea {
					height: 60px;
					margin-top: 20px;
					margin-left: 10px;
				}
			}
		}
	}
</style>