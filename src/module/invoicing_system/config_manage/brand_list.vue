/** * @file * * 商品品牌管理 * * @author zhengu.jiang */
<template>
	<div style="text-align:left;" id="brand">
		<div class="clearfix" style="margin-bottom: 20px;">
			<div class="fl top">
				<span class="topName">名称</span>
				<input v-model="searchName" type="text" />
				<span></span>
				<a @click="searchList" href="javascript:void(0)">
					<span class="search"></span>
				</a>
			</div>
		</div>
		<div class="all">
			<ul class="oUl">
				<li v-on:click="add">
					<i></i>
					<h2>新增品牌</h2>
				</li>
				<section v-for="(list, index) in contractList" :key="index">
					<li class="oLi">
						<section v-if="list.status == 0">
							<h3 v-if='list.edit'>{{list.name}}</h3>
							<textarea v-else v-model="editname" autofocus="autofocus" maxlength="20"></textarea>
							<!-- <span class="detail" @click='detailsee(list.id)'>查看商品&gt;&gt;</span> -->
							<p class="index">{{index+1}}</p>
							<div class="delete" @click="deleteOff(list.id,index)">删除</div>
							<div class="edit" v-if="list.edit" @click="edit(list)">编辑</div>
							<div class="edit" v-else @click="editsave(list)">完成</div>
						</section>
						<section v-else>
							<h3 v-if='list.edit'>{{list.name}}</h3>
							<textarea v-else v-model="editname" autofocus="autofocus" maxlength="20"></textarea>
							<!-- <span class="detail" @click='detailsee(list.id)'>查看商品&gt;&gt;</span> -->
							<p class="index">{{index+1}}</p>
						</section>
					</li>
				</section>
			</ul>
		</div>
		<addwin v-if="showWin" @add-brand="addBrand" :type="type" :id="bid"></addwin>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				shopId: null, //门店id
				contractList: [], //商品品牌管理列表
				initList: [], //原始列表数据
				searchName: '', //搜索名称
				editname: '', //品牌名称
				showWin: false, //新增品牌弹窗
				type: -1, //1表示新增品牌， 2表示查看商品
				bid: '-1', //查看商品 当前品牌id
			};
		},
		methods: {
			//获取品牌列表
			async brandList() {
				let res = await http.InvoicingBrandList({
					data: {
						shopId: this.shopId
					}
				});
				for (let i = 0; i < res.length; i++) {
					res[i].edit = true;
				}
				this.contractList = res;
				this.initList = res;
			},
			searchList() {
				let newInfo = [];
				for (let i = 0; i < this.initList.length; i++) {
					let newname = this.initList[i].name;
					if (newname.indexOf(this.searchName) != -1) {
						newInfo.push(this.initList[i]);
					}
				}
				this.contractList = newInfo;
				if (this.searchName == '') {
					this.brandList();
				}
			},
			//新增品牌
			add() {
				this.type = 1;
				this.showWin = true;
			},
			//查看商品
			detailsee(id) {
				this.type = 2;
				this.bid = id;
				this.showWin = true;
			},
			//删除品牌
			deleteOff(id, index) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '确认删除?',
					callback: (res) => {
						if (res == 'ok') {
							let res = http.InvoicingDeleteBrand({
								data: {
									shopId: this.shopId,
									id: id
								}
							});
							res.then(() => {
								this.contractList.splice(index, 1);
							});
						}
					}
				});
			},
			//编辑
			edit(list) {
				this.contractList.map(v=>{
					v.edit = true;
				});
				list.edit = false;
				this.editname = list.name;
			},
			//编辑完成
			editsave(list) {
				if (!this.editname || this.editname == '0') {
					this.$store.commit('setWin', {
						winType: 'alert',
						content: '品牌名称不能为空且不能为0'
					});
					return false;
				}
				http.InvoicingEditBrand({
					data: {
						shopId: this.shopId,
						id: list.id,
						name: this.editname
					}
				}).then(() => {
					list.name = this.editname;
					list.edit = true;
				});
			},
			//弹窗操作
			addBrand(res, name) {
				this.showWin = false;
				if (res == 'ok' && this.type == 1) {
					http.InvoicingAddBrand({
						data: {
							shopId: this.shopId,
							name: name
						}
					}).then((value) => {
						value.edit = true;
						value.status = 0;
						this.contractList.push(value);
					});
				}
			}

		},
		mounted() {
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
			this.brandList();
		},
		components: {
			addwin: () =>
				import ( /*webpackChunkName: 'brand_win'*/ './brand_win')
		}
	};
</script>

<style lang="less" scoped>
	#brand {
		text-align: left;
		.top {
			display: flex;
			.topName {
				display: inline-block;
				width: 50px;
				height: 40px;
				border: 1px solid #ccc;
				text-align: center;
				line-height: 40px;
				border-right: none;
				vertical-align: middle;
			}
			input {
				width: 170px;
				height: 40px;
				outline: none;
				text-indent: 10px;
			}
			a {
				background-color: #29A7E1;
				margin-left: -4px;
				vertical-align: middle;
			}
			.search {
				display: inline-block;
				float: left;
				width: 44px;
				height: 40px;
				background-color: #29A7E1;
				background: url(../../../res/images/search.png) center center no-repeat;
				cursor: pointer;
			}
		}
		.all {
			width: 100%;
		}
		.oUl {
			width: 100%;
			height: auto;
			.oLi {
				.delete {
					background: gray;
				}
				.edit {
					background: #f8941f;
					right: 0;
				}
				h3 {
					width: 180px;
					height: 60px;
					line-height: 30px;
					font-size: 18px;
					margin: 10px 10px;
					word-wrap: break-word;
					color: gray;
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
					display: block;
				}
				.detail {
					display: inline-block;
					width: 100px;
					height: 20px;
					cursor: pointer;
					color: #2F91D0;
					margin-left: 10px;
				}
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
					background: url(../../../res/images/comadd.png) no-repeat;
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
		}
	}
</style>