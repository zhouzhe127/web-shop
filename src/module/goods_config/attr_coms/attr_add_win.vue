<template>
	<div>
		<!--添加,编辑口味弹框-->
		<win :height="556" :width="556" @winEvent="funGetSelfWin" :ok="btnOk" :cancel="btnCancel" :align="'right'">
			<span slot="title">{{title}}</span>
			<!--一级弹窗-->
			<div id="attr_add" class="tas-addtas" slot="content" v-cloak>
				<div class="tas-type">
					<p class="tas-text required fl" style="text-align: left;">类型</p>
					<span v-bind:class='{"sign":( attr == 0)}' v-on:click="attr=0">单选口味</span>
					<span v-bind:class='{"sign":( attr == 1)}' v-on:click="attr=1">多选口味</span>
					<p class="tas-text required fl" style="width: 70px;">排序</p>
				</div>
				<span class="attr-sort" style="float:right;margin-top:-40px;margin-right:40px;">
					<sub-add :minnum='1' :bindnum="sort" :sign='false' @toClick="getSort"></sub-add>
				</span>
				<div class="taste-max">
					<!--添加口味 一級彈窗-->
					<div class="taste-addAttr" v-cloak>
						<div class="tas-inputname">
							<label class="tas-text2 required fl">口味分組</label>
							<input type="text" placeholder="请输入口味分组名称" v-model="tasteGroup" maxlength='10' />
						</div>
						<!--        缺口味区间         -->
						<div class="tas-change" v-for="(value,index) in newObj" :key='index'>
							<span class="tas-text2 required fl">口味名称</span>
							<input type="text" placeholder="请输入口味名称" v-model="value[0]" maxlength='10' />
							<span class="tas-text2  fl" style="width: 64px;text-indent: 14px;">价格</span>
							<input type="text" placeholder="请输入价格" v-model="value[1]" style="width: 100px;margin-left: 0px;" maxlength='6' />
							<span v-if="newObj.length > 1" style="font-size: 14px;" class="cata-delete" v-on:click="deleteTaste(index)"></span>
						</div>
					</div>
				</div>

				<!--添加口味属性与关联菜品-->
				<div class="tas-second" style="margin-top:20px;">
					<div class="tas-tastype" id="tas-tastype">
						<span class="tas-secondWindow">
							<a class="addclassify fl" style="width:490px;background-position: 190px;" v-on:click="append">添加口味属性</a>
						</span>
					</div>
					<!--显示关联的菜品-->
					<div class="tas-add-text">
						<div class="tas-add-content">
							<template v-for="(item,index) in relativeGoods">
								<span :key="index">{{item.goodsName}};</span>
							</template>
						</div>
					</div>

					<div class="tas-tastype" style="margin-top: -10px">
						<a class="addclassify fl" style="width:490px;background-position: 190px;margin-top: 10px;" v-on:click="funAddReleative">添加关联菜品</a>
					</div>
				</div>
			</div>
		</win>

		<transition name="fade">
			<component :pGoodsList="comObj" :is="showCom" @throwGoodListWin="funGetAddRelative"></component>
		</transition>
	</div>
</template>
<script type='text/javascript'>
	/*
				    1)添加关联商品:显示上架的普通菜,多规格子菜,称重商品;多规格主菜不显示
				*/
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				attr: 0, //默认显示单选口味0,多选口味为1
				tasteGroup: '', //口味分组的名字
				newObj: [
					['', '']
				], //添加的口味 
				sort: 1, //排序

				shopId: null, //店铺id
				brandId: null,
				taste: [], //所有的口味列表
				editId: null, //口味的Id
				title: null, //弹窗名

				relativeGoods: [], //关联的商品id

				goodsList: [], //存储所有的商品列表
				showCom: null, //展示添加关联商品弹框
				comObj: null,

				btnOk: {},
				btnCancel: {}

			};
		},
		props: {
			pObj: null,
			/*
			 {
			     title:null,             //添加口味弹窗标题
			     editId:null,       //当前编辑的口味
			     taste:null,             //所有的口味
			 }
			*/
		},
		methods: {
			//初始化
			initData() {
				//店铺id,口味,编辑的id,标题名,商品            
				for (let ele in this.pObj) {
					this[ele] = this.pObj[ele];
				}
				let userData = storage.session('userShop');
				this.brandId = userData.currentShop.brandId;
				this.shopId = userData.currentShop.id;
				if (!this.editId) {
					this.attr = 0,
					this.sort = 1;
					this.tasteGroup = '';
					this.newObj = [
						['', '']
					];
				} else {
					this.funGetOneAttr().then((res) => {
						this.attr = res.attr;
						this.tasteGroup = res.name;
						this.sort = res.sort;
						this.newObj = this.formatOptions(res.options);
						(res.goods) || (res.goods = []);
						this.relativeGoods = res.goods.map((ele) => {
							let obj = {
								id: ele.gid,
								goodsName: ele.goodsName
							};
							return obj;
						});

					});
				}
			},
			//初始化按钮
			initBtn() {
				if (this.editId) {
					this.btnOk = {
						content: '保存',
						style: 'background-color:#f8941f'
					};
					this.btnCancel = {
						content: '删除',
						style: 'background-color:#c33'
					};
				} else {
					this.btnOk = {
						content: '添加',
						style: 'background-color:#f8941f'
					};
					this.btnCancel = {
						content: '取消',
						style: 'background-color:#a0a0a0'
					};
				}
			},
			//获取点击排序的结果
			getSort(num) {
				this.sort = num;
			},

			//--------------------弹窗----------
			//(弹框显示)----添加关联商品
			funAddReleative() {
				this.showCom = 'addRelative';
				//1)添加关联商品:显示上架的普通菜,多规格子菜,称重商品;多规格主菜不显示
				let goods = [];
				goods = this.goodsList.filter((ele) => {
					if (ele.status == 0 || ele.status == 1) {
						if ((ele.type == 0 && !Number(ele.groupId) && !Number(ele.isGroup)) || (ele.type == 0 && Number(ele.groupId) >
								0 && !Number(ele.isGroup)) || (ele.type == 1)) {
							return true;
						}
					}
				});


				let selGoods = this.relativeGoods.map((ele) => {
					return ele.id;
				});
				this.comObj = {
					goodsList: goods,
					selGoods: selGoods,
					title: '添加关联菜品',
					type: 1,
				};
			},
			//(弹框显示)----获取关联菜品的点击结果
			funGetAddRelative(res, obj) {
				this.showCom = '';
				// let goods = obj.goodArr;
				this.relativeGoods = obj.goodArr;
			},
			//(弹框结果)-----本弹框
			funGetSelfWin(res) {
				if (res == 'ok') {
					if (this.checkForm()) {
						let data = this.formatData();
						if (this.editId) {
							this.editAttr(data).then((ret) => {
								this.$emit('throwAddAttrWin', 'edit', ret);
							});
						} else {
							this.createAttr(data).then((ret) => {
								this.$emit('throwAddAttrWin', 'add', ret);
							});
						}

					} else {
						return;
					}
				} else if (res == 'cancel') {
					if (this.editId) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'confirm',
							content: '确定删除该口味',
							callback: (res) => {
								if (res == 'ok') {
									this.delAttr().then((flag) => {
										if (flag) this.$emit('throwAddAttrWin', 'delete', this.editId);
									});
								} else {
									return;
								}
							}
						});
					} else {
						this.$emit('throwAddAttrWin', res, null);
					}
				} else {
					this.$emit('throwAddAttrWin', res, null);
				}
			},

			//删除口味名称
			deleteTaste(index) {
				this.$store.commit('setWin', {
					winType: 'confirm',
					title: '提示信息',
					content: '确定删除该口味？',
					callback: (str) => {
						if (str == 'ok') this.newObj.splice(index, 1);
					},
				});
			},
			//添加口味属性
			append() {
				for (let i = 0, len = this.newObj.length; i < len; i++) {
					let temp = this.newObj[i];
					for (let j = i + 1; j < len; j++) {
						let temp2 = this.newObj[j];
						let attrName = temp2[0].trim().length;
						if (attrName == 0) {
							this.$store.commit('setWin', {
								title: '提示信息',
								content: '请输入口味名称!'
							});
							return false;
						}
						if (temp[0] == temp2[0]) {
							this.$store.commit('setWin', {
								title: '提示信息',
								content: '口味名称不能重复!'
							});
							return false;
						}
					}
				}
				this.newObj.push(['', '']);
			},

			//校验是否有一样的口味
			// checkSameAttr(str, attr) {

			// },
			//校验一级窗口口味表单
			checkForm() {
				if (this.newObj.length == 0) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '至少要有一个口味!'
					});
					return false;
				}

				if (!this.tasteGroup) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '请输入口味分组名称!'
					});
					return false;
				}
				let regTasteGroup = /[&'\s]+/g;	// let regTasteGroup = /[\|&'\'\s]+/g;
				this.tasteGroup = this.tasteGroup.trim();
				if (regTasteGroup.test(this.tasteGroup)) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '口味分组名称不能含有特殊符号'
					});
					return false;
				}

				for (let i = 0, len = this.newObj.length; i < len; i++) {
					let temp = this.newObj[i];
					if (!temp[0]) {
						this.$store.commit('setWin', {
							title: '提示信息',
							content: '请输入口味名称!'
						});
						return false;
					}
					let regTasteName = /[''&:\s]+/g;
					if (regTasteName.test(temp[0].trim())) {
						this.$store.commit('setWin', {
							title: '提示信息',
							content: '口味名称不能含有特殊字符!'
						});
						return false;
					}
					temp[1] = temp[1].trim();
					if (temp[1].length > 0) {
						let regPrice = /((^([1-9]\d*))|^0)(\.\d{1,2})?$|(^[-]0\.\d{1,2}$)/;
						if (!regPrice.test(temp[1].trim())) {
							this.$store.commit('setWin', {
								title: '提示信息',
								content: '价格最多含有两位小数且不能为负数!'
							});
							return false;
						}
						if (Number(temp[1]) > 100000) {
							this.$store.commit('setWin', {
								title: '提示信息',
								content: '价格不能大于10万!'
							});
							return false;
						}
					}

				}
				return true;

			},
			//格式化提交的数据
			formatData() {
				let options = [];
				let obj = {};
				let arrGoodsId = [];
				let optionsStr = null;

				for (let i = 0, len = this.newObj.length; i < len; i++) {
					let temp = this.newObj[i];
					if (!temp[1]) {
						temp[1] = '0.0';
					}
					let str = temp.join(':');
					options.push(str);
				}
				optionsStr = options.join('|'); //最终提交的options(口味名称)

				this.relativeGoods.forEach((ele) => {
					arrGoodsId.push(ele.id);
				});
				if (this.editId) {
					obj.id = this.editId;
				}
				obj.goods = arrGoodsId.join(','); //最终提交的关联菜品的id
				obj.shopId = this.shopId;
				obj.name = this.tasteGroup; //口味分组名称
				obj.options = optionsStr; //口味名称
				obj.sort = this.sort; //排序
				obj.attr = this.attr; //属性，多选还是单选
				obj.optionsType = 0; //该口味区间对应的口味名称个数
				obj.optionsRange = ''; //口味区间                 
				return obj;
			},

			//格式化口味属性
			formatOptions(str) {
				if (!str) return '';

				let options = str.split('|');
				let arr = [];
				options.forEach((ele) => {
					let temp = ele.split(':');
					let arr2 = [];
					arr2.push(...temp);
					arr.push(arr2);
				});

				return arr;
			},
			//获取单个口味的信息
			async funGetOneAttr() {
				let res = await http.getOneAttr({
					data: {
						id: this.editId,
						shopId: this.shopId
					}
				});
				return res;
			},
			//提交添加口味的数据
			async createAttr(obj) {
				let res = await http.createAttr({
					data: obj
				});
				res.goodsNum = this.relativeGoods.length;
				res.optionsNum = this.newObj.length;
				return res;
			},
			//提交编辑口味的数据
			async editAttr(obj) {
				let res = await http.editAttr({
					data: obj
				});
				//由于返回的数据不含goodsNum与optionsNum，手动添加
				res.goodsNum = this.relativeGoods.length; //关联菜品
				res.optionsNum = this.newObj.length; //口味属性
				return res;
			},
			async delAttr() {
				let res = await http.delAttr({
					data: {
						shopId: this.shopId,
						brandId: this.brandId,
						id: this.editId
					}
				});
				return res;
			},
			//获取版本号
			async ShopGetExtra() {
				let res = await http.ShopGetExtra({
					data: {}
				});
				return res;
			},
			//获取商品
			async getGoods() {
				let goods = null;
				let temp = await http.getGoodsList({
					data: {
						shopId: this.shopId,
						page: 1,
						num: 9999,
						specification: 1
					}
				});
				goods = temp.list;
				storage.session('goodList', goods);
				return goods;
			},
			async getGoodsList(flag, goodVer) {
				let goods = null;
				if (flag) {
					goods = await this.getGoods();
				} else {
					let httpGoodVersion = storage.session('httpGoodVersion');
					if (!httpGoodVersion) {
						goods = await this.getGoods();
					} else {
						if (httpGoodVersion.goodsConfigVer == goodVer) {
							goods = storage.session('goodList');
							if (!goods) goods = await this.getGoods();
						} else {
							goods = await this.getGoods();
						}
					}
				}
				return goods;
			},
			async syncRequest() {
				let res = await this.ShopGetExtra();
				let good = await this.getGoodsList(false, res.goodsConfigVer);
				this.goodsList = good;
				storage.session('httpGoodVersion', res);
			},

		},
		mounted() {
			this.initData();
			this.initBtn();
			this.syncRequest();
		},
		components: {
			addRelative: () =>
				import ( /*webpackChunkName:"goods_package_win"*/ '../common/good_package_win'),
			subAdd: () =>
				import ( /*webpackChunkName:"subadd"*/ 'src/components/subadd'),
			win: () =>
				import ( /*webpackChunkName:"win"*/ 'src/components/win')
		}
	};
</script>
<style type="text/css" scoped>
	/*  一级弹框   */

	.tas-addtas {
		height: auto;
		min-height: 620px;
		background-color: #F2F2F2;
		padding: 30px;
		color: #333;
		width: 600px;
	}

	.tas-type {
		width: 100%;
		height: 40px;
		font-size: 0;
	}

	.tas-text,
	.tas-text2 {
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		width: 54px;
	}

	.tas-text2 {
		width: 85px;
		text-align: left;
	}

	.tas-type span {
		width: 100px;
		height: 40px;
		background-color: #FFFFFF;
		/* display: inline-block; */
		float: left;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
	}

	.tas-type:first-child span {
		border: 1px solid #F1F1F1;
		cursor: pointer;
	}

	.tas-inputname,
	.tas-change {
		margin-top: 10px;
		overflow: hidden;
	}

	.tas-inputname input,
	.tas-change input,
	.tas-tastype a {
		border: none;
		width: 404px;
		height: 38px;
		outline: none;
		/* margin-left: 14px;*/
		padding: 0;
		text-indent: 16px;


	}

	.tas-tastype a {
		cursor: pointer;

	}

	.tas-change input {
		width: 180px;
		float: left;
		padding: 0;
	}

	.tas-tastype {
		margin: 10px;
		width: 504px;

	}

	.tas-add-text {

		background-color: #E7E7E7;
		width: 490px;
		clear: both;

	}

	.tas-add-content {
		line-height: 24px;
		margin-top: 10px;
	}


	.tas-tastype a {
		margin-left: -10px;

	}

	.cata-delete {
		display: inline-block;
		cursor: pointer;
		background: url(../../../res/icon/delete.png) center center no-repeat;
		height: 40px;
		width: 60px;
	}

	.attr-sort {
		/* position:absolute; */
		width: auto;
		top: 80px;
		vertical-align: center;
		right: 30px;
	}
</style>