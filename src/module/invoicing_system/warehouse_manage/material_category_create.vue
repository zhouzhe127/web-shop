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
		</section>
		<div class="cList" v-for="(item,index) in category" :key="index">
			<div class="borderTop"></div>
			<div class="borderBottom"></div>

			<section class="title">
				<div class="oneTitle" style="word-wrap:break-word">
					<span>
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
						<span>
							<span style="word-wrap:break-word" v-bind:title = "itemChild.name" >{{itemChild.name}}</span>
						</span>
						<div class="openoperation" style="margin-top:-35px ;">
							<img src="../../../res/icon/change.png" @click="openTwoCategoryEdit(itemChild,item)" />
							<img style="margin-left:5px;" @click="deleteTwoCategory(itemChild,chindex)" src="../../../res/icon/delete.png" />
						</div>
					</li>
				</template>

				<li class="oLi" style="line-height: 30px;">
					<!--
					<div class="addinput" v-if="item.showAdd">
						<input type="text" class="input second" v-model="childObj.name" maxlength="20" placeholder="输入二级分类" v-cloak/>
						<div class="oDiv" style="border:1px solid #ff00000;" @click="addTwoCategory(item,index)">
							<div class="img_mask"></div>
							<img src="../../../res/icon/iconright.png" alt="" />
						</div>
					</div>
					-->
					<img class="addTwo" src="../../../res/images/adds.png" @click="openTwoCategoryAdd(item)" alt="add" />
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
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			originCategory: [], //原始的分类
			category: [], //所有的分类 已经组织的分类
			showCom: '',
			comObj: {},
			flag: {}, //当前编辑的状态
			winName:{
				oneAdd:'oneAdd',
				oneEdit:'oneEdit',
				twoEdit:'twoEdit',
				twoAdd:'twoAdd'
			},

			childObj: {//二级分类的名字
				sort: 255,
				name: ''
			}, 
		};
	},
	methods: {
		async closeCommonWin(res, obj) {
			if(res != 'ok'){
				this.initFlag();
				this.showCom = '';
				return;			
			} 

			let result = null;
			let temp = {};
			let winName = this.winName;

			switch(this.flag.win) {
				case winName.twoAdd://添加二级分类				
				case winName.oneAdd: //添加一级分类
					if(this.checkSame(this.originCategory,'name', obj.categoryName)) {
						this.alert('分类名重名!');
						return;
					}
					if(this.checkSame(this.originCategory,'barCode', obj.barCode)) {
						this.alert('分类编码重复!');
						return;
					}
					temp = {
						name: obj.categoryName,
						pid: this.flag.pid,
						sort: obj.sort,
						barCode:obj.barCode
					};
					result = await this.MaterialAddCategory(temp);
					if(result) {
						result.child = [];
						this.originCategory.push(result);
						this.category = this.organizeCategory(this.originCategory);
						this.category = this.sortCategory(this.category);
					}
					break;
				case winName.oneEdit: //修改一级分类
				case winName.twoEdit: //修改二级分类
					if(this.checkSame(this.originCategory,'name', obj.categoryName, this.flag.id)) {
						this.alert('分类名重名!');
						return;
					}
					if(this.checkSame(this.originCategory,'barCode', obj.barCode,this.flag.id)) {
						this.alert('分类编码重复!');
						return;
					}
					temp = {
						name: obj.categoryName,
						cid: this.flag.id,
						sort: obj.sort,
						barCode:obj.barCode						
					};
					if(this.flag.name != obj.categoryName || this.flag.sort != obj.sort || this.flag.barCode != obj.barCode) {
						result = await this.MaterialEditCategory(temp);
						if(result) {
							result.child = [];
							this.originCategory = this.filterCategoryById(this.originCategory, result.id);
							this.originCategory.push(result);
							this.category = this.organizeCategory(this.originCategory);
							this.category = this.sortCategory(this.category);
						}
					}
					break;

			}
			this.initFlag();
			this.showCom = '';
		},
		//添加一级分类
		openOneCategoryAdd() {
			this.comObj = {
				categoryName: '',
				sort: 1,
				title: '添加一级分类',
				barCode:'',
				id:0,
			};
			this.flag = {
				id: '',
				name: '',
				sort: 1,
				win: this.winName.oneAdd,
				pid: 0,
				barCode:'',				
			};
			this.showCom = 'categoryWin';
		},
		//编辑一级分类
		openOnecategoryEdit(item) {
			this.comObj = {
				categoryName: item.name,
				sort: item.sort,
				title: '修改一级分类',
				barCode: item.barCode,
				id:0,	
			};
			this.flag = {
				id: item.id,
				name: item.name,
				sort: item.sort,
				win: this.winName.oneEdit,
				pid: 0,
				barCode: item.barCode,				
			};
			this.showCom = 'categoryWin';

		},
		//编辑二级分类
		openTwoCategoryEdit(item,parItem) {
			this.comObj = {
				categoryName: item.name,
				sort: item.sort,
				title: '修改二级分类',
				barCode: item.barCode,
				id: parItem.id,							
			};
			this.flag = {
				id: item.id,
				name: item.name,
				sort: item.sort,
				win: this.winName.twoEdit,
				pid: item.pid,
				barCode: item.barCode,								
			};
			this.showCom = 'categoryWin';
		},
		//添加二级分类
		openTwoCategoryAdd(item){
			this.comObj = {
				categoryName: '',
				sort: 1,
				title: '添加二级分类',
				barCode: '',
				id:item.id,						
			};
			this.flag = {
				id: '',
				name: '',
				sort: 1,
				win: this.winName.twoAdd,
				pid: item.id,
				barCode: '',												
			};
			this.showCom = 'categoryWin';
		},


		//删除分类
		delCategory(item){
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
		//删除一级分类
		deleteOneCategory(item) {
			if(item.child && item.child.length > 0) {
				this.alert('该分类下存在二级分类,不能删除!');
				return;
			}
			this.delCategory(item);

		},
		//删除二级分类
		deleteTwoCategory(item) {
			this.delCategory(item);
		},




		initFlag(){
			this.flag = {
				id: '',
				name: '',
				sort: 1,
				win: '',
				barCode:'',
			};
		},





		//组织分类数据
		organizeCategory(cate) {
			let temp = cate;
			let arr = [];
			cate.forEach((ele) => {
				ele.child = [];
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
		checkSame(...args) {
			let [category, attr='name',value,id] = args;
			let temp = [...category];
			if(id) temp = this.filterCategoryById(temp, id);

			let flag = temp.some((ele) => {
				if(ele[attr] == value) {
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
		alert(content,fn,title='提示信息',){
			this.$alert(content, title, {
				confirmButtonText: '确定',
				callback: action => {
					action = action == 'confirm' ? 'ok' :'cancel';
					if(typeof fn == 'function') fn(action);
				}
			});
		},
		//获取物料分类
		async MaterialGetCategoryList() {
			let res = await http.MaterialGetCategoryList();
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
		this.initFlag();


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