<template>
	<div id="depot">
		<div class="clearfix">
			<div class="fl top">
				<span class="topName">名称</span>
				<input v-model="searchlist" type="text" />
				<span></span>
				<a @click="searchList" href="javascript:void(0)">
					<span class="search"></span>
				</a>
			</div>
			<div @click="addDepot" class="addclassification fr">
				<h3>{{addbutton}}</h3>
			</div>
		</div>
		<div class="cList" v-for="(item, index) in classifyInfo" :key="index">
			<div class="borderTop"></div>
			<div class="borderBottom"></div>
			<section class="title">
				<div class="titleOne">
					<span>{{item.name}}</span>
					<div class="openoperation">
						<img @click="editclassification(item)" src="../../../res/icon/iconchange.png" />
						<img @click="delateclassification(item.id)" style="margin-left:5px;" src="../../../res/icon/icondelete.png" />
					</div>
				</div>
			</section>
			<ul class="oUl">
				<li class="oLi" v-for="(itemChild,i) in item.area" :key="i">
					<span>{{itemChild.name}}</span>
					<div class="openoperation" style="margin-top:-35px ;">
						<img @click="editTwo(itemChild,item.id)" src="../../../res/icon/change.png" />
						<img @click="delateTwo(itemChild.id)" style="margin-left:5px;" src="../../../res/icon/delete.png" />
					</div>
				</li>
				<li class="oLi" style="line-height: 30px;" @click.stop>
					<div ref="addinput" class="addinput">
						<input v-model="twoName" type="text" class="input" maxlength="10" placeholder="输入区域" v-cloak/>
						<div @click="addTwodetial(index,item)" class="oDiv">
							<img src="../../../res/icon/iconright.png" alt="" />
						</div>
					</div>
					<section class="shelfAddarea" @click="addTwo(index,item.id)">
						<img src="../../../res/images/adds.png" alt="add" />
						<span>新建区域</span>
					</section>
				</li>
			</ul>
		</div>
		<div v-if="classifyInfo.length == 0" class="dataNone">目前没有可操作数据</div>
		<addwin @addhouse="getAddhouse" v-if="showAddhouse" :pTitleName="name" :pType="type" :houseType="houseType"></addwin>

	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				shopId: null,
				classifyInfo: [], //数据列表
				initInfo: [], //保存原始数据列表
				add: false,
				addbutton: '', //右上角按钮名称
				searchlist: '', //查询名称
				twoName: '', // 增加的区域名
				showAddhouse: false, //弹窗
				name: '',
				type: -1, //0为新增仓库 1为编辑仓库 2为编辑区域
				houseId: -1, //仓库id
				areaId: -1, //区域id
			};
		},
		props: {
			houseType: Number
		},
		methods: {
			async getList() {
				let res = null;
				if (this.houseType == 1) {
					res = await http.getShelvesList({
						data: {}
					});
				}
				this.classifyInfo = res;
				this.initInfo = res;
			},
			//查询
			searchList() {
				let newInfo = [];
				for (let i = 0; i < this.initInfo.length; i++) {
					let newname = this.initInfo[i].name;
					if (newname.indexOf(this.searchlist) != -1) {
						newInfo.push(this.initInfo[i]);
					}
				}
				this.classifyInfo = newInfo;
				if (this.searchlist == '') {
					this.classifyInfo = this.initInfo;
				}
			},
			//新增仓库
			addDepot() {
				this.showAddhouse = true;
				this.addwin = 'addwin';
				this.type = 0;
			},
			//编辑仓库
			editclassification(item) {
				this.showAddhouse = true;
				this.addwin = 'addwin';
				this.name = item.name;
				this.houseId = item.id;
				this.type = 1;
			},
			//删除仓库
			delateclassification(id) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'confirm',
					content: '确认删除?',
					callback: (res) => {
						if (res == 'ok') {
							let res = http.deleteWarehouse({
								data: {
									id: id
								}
							});
							res.then(() => {
								this.getList();
							});
						}
					}
				});
			},
			//编辑区域
			editTwo(item) {
				this.showAddhouse = true;
				this.addwin = 'addwin';
				this.type = 2;
				this.name = item.name;
				this.houseId = item.shelfId;
				this.areaId = item.id;
			},
			//删除区域
			delateTwo(id) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'confirm',
					content: '确认删除?',
					callback: (res) => {
						if (res == 'ok') {
							let res = http.deleteWarehousearea({
								data: {
									id: id
								}
							});
							res.then(() => {
								this.getList();
							});
						}
					}
				});
			},
			addTwodetial() {
				if (this.twoName == '') {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '区域名称不能为空'
					});
					return false;
				}
				this.addWarehousearea(this.twoName);
				let area = this.$refs.addinput;
				for (let i = 0; i < area.length; i++) {
					area[i].style.display = 'none';
				}
				this.twoName = '';
			},
			//新增区域 点击显示输入框
			addTwo(index, id) {
				this.houseId = id;
				let area = this.$refs.addinput;
				for (let i = 0; i < area.length; i++) {
					if (index == i) {
						area[i].style.display = 'block';
					} else {
						area[i].style.display = 'none';
					}
				}

			},
			//添加货架
			async addCategory(name) {
				await http.addShelves({
					data: {
						name: name
					}
				});
				this.getList();
			},
			//编辑货架
			async editWarehouse(titleName) {
				if (titleName == this.name) return false;
				await http.editShelves({
					data: {
						name: titleName,
						id: this.houseId
					}
				});
				this.getList();
			},
			//新建区域
			async addWarehousearea(titleName) {
				await http.addWarehousearea({
					data: {
						name: titleName,
						shelfId: this.houseId
					}
				});
				this.getList();
			},
			//编辑区域
			async editWarehousearea(titleName) {
				if (titleName == this.name) return false;
				await http.editShelvesArea({
					data: {
						name: titleName,
						id: this.areaId,
						shelfId: this.houseId
					}
				});
				this.getList();
			},
			//编辑弹窗
			getAddhouse(res, titleName) {
				this.showAddhouse = false;
				if (res == 'ok') {
					if (this.type == 0) {
						this.addCategory(titleName);
					}
					if (this.type == 1) {
						this.editWarehouse(titleName);
					}
					if (this.type == 2) {
						this.editWarehousearea(titleName);
					}
				}
			}

		},
		mounted() {
			this.houseType === 0 ? this.addbutton = '新增仓库' : this.addbutton = '新增货架';
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
			this.getList();
			// this.$nextTick(()=>{
			//     document.addEventListener('click', ()=>{
			//         let area = this.$refs.addinput
			//         for(let i = 0; i < area.length; i++){
			//             area[i].style.display = 'none'
			//         }
			//     })
			// })
		},
		components: {
			addwin: () =>
				import ( /*webpackChunkName: 'addhouse_win'*/ './addhouse_win')
		}
	};
</script>

<style lang="less" scoped>
	#depot {
		width: 97%;
		min-width: 800px;
		margin-bottom: 50px;
		.top {
			display: flex;
			.search {
				background: #29A7E1 url(../../../res/images/search.png) center center no-repeat;
				display: inline-block;
				width: 44px;
				height: 40px;
				cursor: pointer;
			}
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
				padding-left: 5px;
			}
		}
		.cList {
			width: 100%;
			border: 1px solid #cdcdcd;
			border-left: 120px solid #F8F8F8;
			position: relative;
			margin-top: 20px;
			.oUl {
				width: 100%;
				min-height: 120px;
				padding: 26px 20px;
				overflow: hidden;
				border-left: 1px solid #cdcdcd;
			}
			.oLi {
				height: 65px;
				min-width: 80px;
				line-height: 65px;
				float: left;
				text-align: center;
				padding: 0 10px;
				color: #555555;
				cursor: pointer;
				.addinput {
					width: 165px;
					height: 34px;
					float: left;
					border: 1px solid #cdcdcd;
					margin-top: 15px;
					display: none;
				}
				.oDiv {
					width: 34px;
					height: 32px;
					border-left: 1px solid #cdcdcd;
					float: right;
				}
				&:hover .openoperation {
					display: block;
				}
				.input {
					width: 115px;
					height: 30px;
					line-height: 30px;
				}
				.shelfAddarea {
					display: inline-block;
					img {
						width: 20px;
						height: 20px;
						margin-top: 22px;
						margin-left: 20px;
					}
					span {
						height: 65px;
						display: inline-block;
						line-height: 50px;
						margin-left: 10px;
						vertical-align: middle;
					}
				}
			}
			.title {
				width: 120px;
				color: #323232;
				text-align: center;
				position: absolute;
				top: 50%;
				left: -120px;
				line-height: 100%;
				font-size: 18px;
				transform: translateY(-50%);
				padding: 5px 10px;
				z-index: 5;
				&:hover .openoperation {
					display: block;
				}
				.titleOne {
					width: 100%;
					height: 60px;
					margin-top: 40px;
					cursor: pointer;
					word-wrap: break-word
				}
				.openoperation {
					background: url(../../../res/icon/icon-hover-bg.png) no-repeat;
					margin: 5px 10px;
					padding-top: 12px;
					width: 80px;
					height: 40px;
				}
			}
			.borderTop {
				width: 122px;
				height: 100%;
				border-left: 1px solid #cdcdcd;
				position: absolute;
				top: -1px;
				left: -120px;
				border-top: 1px solid #cdcdcd;
			}
			.borderBottom {
				width: 122px;
				height: 100%;
				border-left: 1px solid #cdcdcd;
				position: absolute;
				bottom: -1px;
				left: -120px;
				border-bottom: 1px solid #cdcdcd;
			}
		}
		.openoperation {
			display: none;
		}
		.addclassification {
			width: 120px;
			height: 45px;
			background-color: #29A7E1;
			cursor: pointer;
			img {
				width: 22px;
				height: 22px;
				margin-top: 9px;
				margin-left: 34px;
				float: left;
			}
			h3 {
				width: 120px;
				height: 45px;
				line-height: 45px;
				color: #fff;
				text-align: center;
				float: left;
			}
		}
		.dataNone {
			margin: 0 auto;
			text-align: center;
			height: 50px;
			line-height: 50px;
			color: orange;
		}
	}
</style>