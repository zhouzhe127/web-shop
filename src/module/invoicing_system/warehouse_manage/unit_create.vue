<template>
	<!--
        @百川:新建单位
        @file:曾伟福
    -->
	<div id="invoicing-unit-create">
		<div class="unit-add" @click="openUnitWin(null)">
			<div class="add-content">
				<img src="../../../res/images/comadd.png" alt="添加单位">
				<span>新建单位</span>
			</div>
		</div>
		<div class="unit-list-content">
			<li v-for="(item,index) in units" class="unit-list" :key="index" @click="openUnitWin(item)">
				<div class="split-line"></div>
				<div class="unit-content">
					<span class="font">{{item.name}}</span>
					<span class="num">{{index+1}}</span>
				</div>
			</li>
		</div>

		<component :is="showCom" :pObj="comObj" @throwCommonWin="closeCommonWin"></component>
	</div>
</template>
<script>
	/*
	    1)单位长度
	    2)修改单位
	*/
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				units: [], //所有物料单位
				showCom: '',
				comObj: {},
				subObj: {
					name: '',
					id: ''
				}, //记录当前单位的状态
			};
		},
		methods: {
			async closeCommonWin(obj, res) {
				let tempObj = {};
				obj.name = obj.name.trim();
				if(res == 'close') {
					this.showCom = '';
				} else if(res == 'ok') {
					if(this.subObj.id) {
						//修改单位

						if(!obj.name || obj.name.length > 10) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: '单位名称由1-10个字符组成!'
							});
							return;
						}
						let regUnit = /^\d+$/;
						if(regUnit.test(obj.name)) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: '单位名称不能是纯数字!'
							});
							return;
						}
						if(this.checkUnitName(this.units, obj.name, this.subObj.id)) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: '单位重名!'
							});
							return;
						}
						tempObj = {
							id: this.subObj.id,
							name: obj.name
						};
						let result = await this.MaterialEditUnit(tempObj);
						if(result) {
							this.units = this.units.map(ele => {
								if(ele.id == tempObj.id) {
									ele.name = tempObj.name;
								}
								return ele;
							});
						}
						this.showCom = '';
					} else {
						//新建单位
						if(!obj.name || obj.name.length > 10) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: '单位名称由1-10个字符组成!'
							});
							return;
						}
						let regUnit = /^\d+$/;
						if(regUnit.test(obj.name)) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: '单位名称不能是纯数字!'
							});
							return;
						}
						if(this.checkUnitName(this.units, obj.name)) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: '单位重名!'
							});
							return;
						}
						let result = await this.MaterialAddUnit(obj);
						if(result) this.units.push(result);
						this.showCom = '';
					}
				} else if(res == 'cancel') {
					if(this.subObj.id) {
						//删除单位
						let result = await this.MaterialDeleteUnit(this.subObj.id);
						if(result) this.units = this.filterUnitsById(this.units, this.subObj.id);
						this.showCom = '';
					} else {
						//取消新建
						this.showCom = '';
					}
				}

			},
			openUnitWin(item) {
				this.showCom = 'unitWin';
				if(item) {
					this.subObj = {
						id: item.id,
						name: item.name
					};
					this.comObj = {
						name: item.name,
						len: 10,
						title: '修改单位',
						btnOk: {
							content: '确定',
							style: 'background-color:#f8931f'
						},
						btnCancel: {
							content: '删除',
							style: 'background-color:#f13c3c;'
						},
					};
				} else {
					this.subObj = {
						id: '',
						name: ''
					};
					this.comObj = {
						name: '',
						len: 10,
						title: '新建单位',
						tips: '请输入单位名称',
						btnOk: {
							content: '确定',
							style: 'background-color:#f8931f'
						},
						btnCancel: {
							content: '取消',
							style: 'background-color:#a0a0a0;'
						},
					};
				}
			},
			//------------utils----------
			//通过单位id过滤该单位
			filterUnitsById(list, id) {
				list = list.filter((ele) => {
					return ele.id != id;
				});
				return list;
			},
			//返回true表示有重名
			checkUnitName(list, name, id) {
				if(id) list = this.filterUnitsById(list, id);
				let flag = list.some((ele) => {
					if(ele.name == name) return true;
				});
				return flag;
			},
			//---------------event---------
			//获取物料单位
			async MaterialGetUnitList() {
				let res = await http.MaterialGetUnitList({
					data: {}
				});
				return res;
			},
			async MaterialAddUnit(obj) {
				let res = await http.MaterialAddUnit({
					data: {
						name: obj.name
					}
				});
				return res;
			},
			async MaterialDeleteUnit(id) {
				let res = await http.MaterialDeleteUnit({
					data: {
						muId: id
					}
				});
				return res;
			},
			async MaterialEditUnit(obj) {
				let res = await http.MaterialEditUnit({
					data: obj
				});
				return res;
			},
		},
		async mounted() {
			this.units = await this.MaterialGetUnitList();
		},
		components: {
			unitWin: () =>
				import( /*webpackChunkName:'unit_edit_create_win'*/ './unit_edit_create_win'),

		},
	};
</script>
<style lang='less' scoped>
	#invoicing-unit-create {
		max-width: 1260px;
		min-width: 310px;
		.unit-list-content {
			display: inline;
		}
		.item {
			width: 2.7rem;
			height: 2rem;
			margin-bottom: 0.15rem;
			margin-right: 0.15rem;
			box-sizing: border-box;
			float: left;
			cursor: pointer;
		}
		.unit-add {
			.item;
			border: 1px solid #ccc;
			text-align: center;
			.add-content {
				height: 1.05rem;
				width: 0.88rem;
				display: inline-block;
				margin-top: 0.55rem;
				img {
					opacity: 0.7;
					display: inline-block;
				}
				span {
					display: block;
					color: #b3b3b3;
					font-size: 0.2rem;
					text-align: center;
					margin-top: 0.2rem;
				}
			}
		}
		.unit-list {
			list-style: none;
			background-color: #f2f2f2;
			padding: 0;
			.item;
			.split-line {
				background-color: #68c2e9;
				height: 0.1rem;
				width: 2.7rem;
			}
			.unit-content {
				height: 0.6rem;
				padding: 0.2rem;
				.font {
					font-size: 0.26rem;
					color: #333;
					line-height: 0.6rem;
				}
				.num {
					color: #cae3ee;
					font-size: 0.72rem;
					float: right;
				}
			}
		}
	}
</style>