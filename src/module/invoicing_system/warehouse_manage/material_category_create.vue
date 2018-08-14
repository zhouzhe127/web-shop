<!--
    @file:新建分类
    @baichuan:曾伟福

-->
<template>
	<div id="material-category">
		<section class="brand">
			<div class="openOneCategoryWin" @click="openOneCategoryAdd">
				<img src="../../../res/images/add.png" alt="添加" />
				<h3>添加一级分类</h3>
			</div>
			<template v-if="ischain == 1 || ischain == 2">
				<span style="background-color: #fcaa30;margin-left: 10px;"></span>
				<span style="margin-left: 5px;">品牌同步</span>
				<span style="background-color: #6cc2e6;margin-left: 10px;"></span>
				<span style="margin-left: 5px;">门店自建</span>
			</template>
		</section>
		<div class="cList" v-for="(item,index) in category" :key="index">
			<div class="borderTop"></div>
			<div class="borderBottom"></div>

			<section class="title">
				<div class="oneTitle" style="word-wrap:break-word">
					<span v-if="ischain == 1 || ischain == 2">
        			<span class="oneName"  v-bind:title = "item.name" style="color: #fcaa30;" v-if="item.id < 100000">{{item.name | sliceStr}}</span>
					<span class="oneName" v-bind:title="item.name" style="color: #6cc2e6;;" v-else>{{item.name | sliceStr}}</span>
					</span>
					<span v-else>
        			<span  v-bind:title = "item.name">{{item.name}}</span>
					</span>
					<div class="openoperation operation">
						<img src="../../../res/icon/iconchange.png" @click="openOnecategoryEdit(item,index)" />
						<img style="margin-left:5px;" @click="deleteOneCategory(item,index)" src="../../../res/icon/icondelete.png" />
					</div>

				</div>
			</section>

			<ul class="oUl">
				<template v-for="(itemChild,chindex) in item.child">
					<li class="oLi" :key="chindex">
						<span v-if="ischain == 1 || ischain == 2">
            			<span style="word-wrap:break-word; color: #fcaa30;" v-bind:title = "itemChild.name" v-if="itemChild.id < 100000">{{itemChild.name}}</span>
						<span style="word-wrap:break-word; color: #6cc2e6;;" v-bind:title="itemChild.name" v-else>{{itemChild.name}}</span>
						</span>
						<span v-else>
            			<span style="word-wrap:break-word" v-bind:title = "itemChild.name" >{{itemChild.name}}</span>
						</span>
						<div class="openoperation" style="margin-top:-35px ;">
							<img src="../../../res/icon/change.png" @click="openTwoCategoryEdit(itemChild,chindex)" />
							<img style="margin-left:5px;" @click="deleteTwoCategory(itemChild,chindex)" src="../../../res/icon/delete.png" />
						</div>
					</li>
				</template>

				<li class="oLi" style="line-height: 30px;">
					<div class="addinput" v-if="item.showAdd">
						<input type="text" class="input second" v-model="childObj.name" maxlength="20" placeholder="输入二级分类" v-cloak/>
						<div class="oDiv" style="border:1px solid #ff00000;" @click="addTwoCategory(item,index)">
							<div class="img_mask"></div>
							<img src="../../../res/icon/iconright.png" alt="" />
						</div>
					</div>
					<img class="addTwo" src="../../../res/images/adds.png" @click="showInput(item,index)" alt="add" />
				</li>
			</ul>
		</div>
		<component @throwCommonWin="closeCommonWin" :pObj="comObj" :is="showCom"></component>
	</div>
</template>

<script>
/*
    1)当分类名称过长时的截取显示
    2)物料是否有品牌的限制

*/
import http from 'src/manager/http';
import global from 'src/manager/global';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			isBrand: null, //是否是品牌 
			ischain: null, //直营还是单店

			originCategory: [], //原始的分类
			category: [], //所有的分类 已经组织的分类
			childObj: {//二级分类的名字
				sort: 255,
				name: ''
			}, 
			showCom: '',
			comObj: {},
			flag: {
				id: '',
				name: '',
				sort: '',
				win: ''
			}, //当前编辑的状态
		};
	},
	methods: {
		async closeCommonWin(res, obj) {
			this.showCom = '';
			if(res != 'ok') return;
			let result = null;
			let temp = {};
			switch(this.flag.win) {
				case 'oneAdd': //添加一级分类
					if(this.checkSame(this.originCategory, obj.categoryName)) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '分类名重名!'
						});
						break;
					}
					temp = {
						name: obj.categoryName,
						pid: this.flag.pid,
						sort: obj.sort
					};
					result = await this.MaterialAddCategory(temp);
					if(result) {
						result.showAdd = false;
						result.child = [];
						this.originCategory.push(result);
						this.category = this.organizeCategory(this.originCategory);
						this.category = this.sortCategory(this.category);
					}
					break;
				case 'oneEdit': //修改一级分类
					if(this.checkSame(this.originCategory, obj.categoryName, this.flag.id)) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '分类名重名!'
						});
						break;
					}
					temp = {
						name: obj.categoryName,
						cid: this.flag.id,
						sort: obj.sort
					};
					if(this.flag.name != obj.categoryName || this.flag.sort != obj.sort) {
						result = await this.MaterialEditCategory(temp);
						if(result) {
							result.showAdd = false;
							result.child = [];
							this.originCategory = this.filterCategoryById(this.originCategory, result.id);
							this.originCategory.push(result);
							this.category = this.organizeCategory(this.originCategory);
							this.category = this.sortCategory(this.category);
	
						}
					}
					break;
				case 'twoEdit': //修改二级分类
					if(this.checkSame(this.originCategory, obj.categoryName, this.flag.id)) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '分类名重名!'
						});
						break;
					}
					temp = {
						name: obj.categoryName,
						cid: this.flag.id,
						sort: obj.sort
					};
					if(this.flag.name != obj.categoryName || this.flag.sort != obj.sort) {
						result = await this.MaterialEditCategory(temp);
						this.originCategory = this.filterCategoryById(this.originCategory, result.id);
						this.originCategory.push(result);
						this.category = this.organizeCategory(this.originCategory);
					}
					break;
			}

			this.flag = {
				id: '',
				name: '',
				sort: '',
				win: ''
			};
		},
		//添加一级分类
		openOneCategoryAdd() {
			this.comObj = {
				categoryName: '',
				sort: 1,
				title: '添加一级分类'
			};
			this.flag = {
				id: '',
				name: '',
				sort: '',
				win: 'oneAdd',
				pid: 0
			};
			this.showCom = 'categoryWin';
		},
		//编辑一级分类
		openOnecategoryEdit(item) {
			this.comObj = {
				categoryName: item.name,
				sort: item.sort,
				title: '修改一级分类',
			};
			this.flag = {
				id: item.id,
				name: item.name,
				sort: item.sort,
				win: 'oneEdit',
				pid: item.pid
			};
			this.showCom = 'categoryWin';

		},
		//编辑二级分类
		openTwoCategoryEdit(item) {
			this.comObj = {
				categoryName: item.name,
				sort: item.sort,
				title: '修改二级分类',
			};
			this.flag = {
				id: item.id,
				name: item.name,
				sort: item.sort,
				win: 'twoEdit',
				pid: item.pid
			};
			this.showCom = 'categoryWin';
		},

		//添加二级分类
		addTwoCategory(item) {
			let temp = {
				name: this.childObj.name,
				pid: item.id,
				sort: this.childObj.sort
			};
			if(this.checkSame(this.originCategory, this.childObj.name)) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					content: '分类名重名!'
				});
				return;
			}
			if(!global.checkData({
				name: {
					reg: /^[^!@#$%^&*.,.;,]{1,20}$/,
					pro: '分类名最多20字且不包含特殊字符!'
				}
			}, this.childObj)) return;

			this.MaterialAddCategory(temp).then((result) => {
				if(result) {
					this.originCategory.push(result);
					this.category = this.organizeCategory(this.originCategory);
					this.childObj = {
						sort: 255,
						name: ''
					}; //二级分类的名字
				}
			});
		},
		//删除一级分类
		deleteOneCategory(item) {
			if(item.child && item.child.length > 0) {
				this.$store.commit('setWin', {
					winType: 'alert',
					title: '温馨提示',
					content: '该分类下存在二级分类,不能删除!'
				});
				return false;
			}
			this.$store.commit('setWin', {
				winType: 'confirm',
				title: '温馨提示',
				content: '确认删除该分类吗?',
				callback: (res) => {
					if(res == 'ok') {
						this.MaterialDelCategory(item.id).then((result) => {
							if(result) {
								this.originCategory = this.filterCategoryById(this.originCategory, item.id);
								this.category = this.organizeCategory(this.originCategory);
							}
						});
					}
				}
			});
		},
		//删除二级分类
		deleteTwoCategory(item) {
			this.$store.commit('setWin', {
				winType: 'confirm',
				title: '温馨提示',
				content: '确认删除该分类吗?',
				callback: (res) => {
					if(res == 'ok') {
						this.MaterialDelCategory(item.id).then(() => {
							this.originCategory = this.filterCategoryById(this.originCategory, item.id);
							this.category = this.organizeCategory(this.originCategory);
						});
					}
				}
			});
		},

		//---------function---------
		//输入框的展示
		showInput(item) {
			this.childObj.name = '';
			this.category = this.category.map((ele) => {
				if(item.id == ele.id) {
					ele.showAdd = true;
				} else {
					ele.showAdd = false;
				}
				return ele;
			});
		},
		//组织分类数据
		organizeCategory(cate) {
			let temp = cate;
			let arr = [];
			cate.forEach((ele) => {
				ele.child = [];
				ele.showAdd = false;
				if(ele.pid == 0) {
					for(let i = 0, len = temp.length; i < len; i++) {
						if(ele.id == temp[i].pid && ele.id != temp[i].id) {
							ele.child.push(temp[i]);
						}
					}
					arr.push(ele);
				}
			});
			return arr;
		},
		//根据分类id过滤分类
		filterCategoryById(category, id) {
			let temp = category.filter((ele) => {
				return ele.id != id;
			});
			return temp;
		},
		//校验是否有相同的分类名
		checkSame(category, name, id) {
			if(id) category = this.filterCategoryById(category, id);

			let flag = category.some((ele) => {
				if(ele.name == name) {
					return true;
				}
			});
			return flag;
		},
		sortCategory(arr) {
			let temp = arr.sort((x, y) => {
				if(x.sort == y.sort) {
					return x.id - y.id;
				} else {
					return x.sort - y.sort;
				}
			});
			return temp;
		},

		//获取物料分类
		async MaterialGetCategoryList() {
			let res = await http.MaterialGetCategoryList({
				data: {}
			});
			return res;
		},
		async MaterialAddCategory(obj) {
			let res = await http.MaterialAddCategory({
				data: obj
			});
			return res;
		},
		async MaterialEditCategory(obj) {
			let res = await http.MaterialEditCategory({
				data: obj
			});
			return res;
		},
		async MaterialDelCategory(id) {
			let res = await http.MaterialDelCategory({
				data: {
					cid: id
				}
			});
			return res;
		},
	},
	mounted() {
		this.MaterialGetCategoryList().then((res) => {
			this.originCategory = utils.deepCopy(res);
			this.category = this.organizeCategory(res);
			this.category = this.sortCategory(this.category);
		});

	},
	components: {
		categoryWin: () =>
			import( /*webpackChunkName:'material_category_win'*/ './material_category_win'),
	},
};
</script>
<style lang='less' scoped>
	#material-category {
		width: 97%;
		padding-bottom: 50px;
		.cList {
			width: 100%;
			border: 1px solid #cdcdcd;
			border-left: 120px solid #F8F8F8;
			position: relative;
			margin-top: 20px;
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
				-ms-transform: translateY(-50%);
				-moz-transform: translateY(-50%);
				-webkit-transform: translateY(-50%);
				-o-transform: translateY(-50%);
				padding: 5px 10px;
				z-index: 5;
			}
			.oneTitle {
				width: 100%;
				height: 60px;
				margin-top: 40px;
				cursor: pointer;
				.opeartion {
					background: url(../../../res/icon/icon-hover-bg.png) no-repeat;
					margin: 5px 10px;
					padding-top: 12px;
					width: 80px;
					height: 40px;
				}
			}
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
					display: block;
					.second {
						width: 125px;
						height: 30px;
						line-height: 30px;
						outline: none;
					}
				}
				.addTwo {
					width: 20px;
					height: 20px;
					margin-top: 22px;
					margin-left: 20px;
				}
				.oDiv {
					width: 34px;
					height: 32px;
					border-left: 1px solid #cdcdcd;
					float: right;
				}
				.img_mask {
					position: absolute;
					width: 34px;
					height: 32px;
					background-color: #ff0000;
					opacity: 0;
					filter: alpha(opacity=0);
				}
			}
		}
		.openoperation {
			display: none;
		}
		.title:hover .openoperation {
			display: block;
		}
		.oLi:hover .openoperation {
			display: block;
		}
		.openOneCategoryWin {
			width: 210px;
			height: 45px;
			background-color: #29A7E1;
			cursor: pointer;
			display: inline-block;
			vertical-align: middle;
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
		.cList .oneName {
			word-wrap: break-word;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.brand span:nth-child(2),
		.brand span:nth-child(4) {
			display: inline-block;
			width: 20px;
			height: 20px;
			text-align: center;
			border-radius: 20px;
			vertical-align: middle;
		}
	}
</style>