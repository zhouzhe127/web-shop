<template>
	<win :width="width" :height="height" @winEvent="winEvent" :align="'center'">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" slot-scope="props" style="height:100%">
			<section id="getGoods" style="padding: 20px;">
				<section>
					<section class="search fr" style="margin-right: 20px;">
						<input type="text" placeholder="请输入名称" class="search-input" v-on:keyup="keyUp" v-model="search" />
						<a href="javascript:void(0);" v-on:click="keyUp" class="search-btn" style="background-color:#29A7E1;"></a>
					</section>
					<section class="place fl">
						<section class="class-Parent">
							<template v-for="(item,i) in category">
								<span v-if="item.id == L1ID" :key="i" class="on" v-on:click="changeL1ID(item.id,i)">{{item.name}}</span>
								<span v-else :key="i" v-on:click="changeL1ID(item.id,i)">{{item.name}}</span>
							</template>
						</section>
						<section class="class-Child">
							<template v-if="child.length > 0 " v-for="(item,i) in child">
								<span v-if="item.id == L2ID" :key="i" v-on:click="changeL2ID(item.id)" class="second-on">{{item.name}}</span>
								<span v-else v-on:click="changeL2ID(item.id)" :key="i">{{item.name}}</span>
							</template>
						</section>
					</section>
					<section class="fl" style="width: 100%;height: auto;margin-bottom: 10px;">
						<a href="javascript:void(0)" class="allsome">全部</a>
					</section>
				</section>
				<section class="comList" v-if="selectgoods.length>0">
					<mul-select @selOn="listChange" :styles="{backgroundColor: '#F1F1F1'}" :list="selectgoods" :name="'goodsName'"
					 :isradio="true" :selects="goodsIndex" :keys="'id'"></mul-select>
				</section>
				<section class="place fl">
					<span class="on">固定套餐</span>
				</section>
				<section class="fl" style="width: 100%;height: auto;margin-bottom: 10px;">
					<a href="javascript:void(0)" class="allsome">全部</a>
				</section>
				<section class="comList" v-if="fixed.length>0">
					<mul-select @selOn="packChange" :styles="{backgroundColor: '#F1F1F1'}" :list="fixed" :name="'packageName'"
					 :isradio="true" :selects="fixedIndex" :keys="'id'"></mul-select>
				</section>
			</section>
		</div>
	</win>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				L1ID: 0,
				L2ID: 0,
				category: [],
				child: [],
				selectgoods: [], //显示的菜品
				goodsCom: [], //所有菜品
				goodsIndex: [], //选中的菜品id
				search: '', //商品搜索名
				goodsArr: [], //保存选中分类下的商品
				fixed: [], //固定套餐
				ispack: false, //判断是不是套餐
				fixedIndex: [],
				newfixed: ''
			};
		},
		props: ['width', 'height', 'title'],
		mounted() {
			this.init();
			let goodList = storage.session('goodList');
			if (goodList) {
				for (let i = 0; i < goodList.length; i++) {
					//过滤掉称重商品下架商品
					if (
						goodList[i].type == 1 ||
						goodList[i].type == 2 ||
						goodList[i].status == 2 ||
						goodList[i].isGroup == 1
					) {
						goodList.splice(i, 1);
						i--;
					}
				}
			}
			this.goodsCom = goodList;
			this.goodReady();
			let packageGoods = storage.session('packageList');
			for (let i = 0; i < packageGoods.length; i++) {
				if (packageGoods[i].type == 0 && packageGoods[i].status != 2) {
					this.fixed.push(packageGoods[i]);
				}
			}
			this.newfixed = utils.deepCopy(this.fixed);
		},
		methods: {
			async init() {
				let data = await http.getCategoryList({
					data: {}
				});
				this.category = data;
				this.category.unshift({
					name: '全部',
					id: 0
				});
			},
			listChange(id) {
				this.ispack = false;
				this.goodsIndex = id;
			},
			packChange(id) {
				this.ispack = true;
				this.fixedIndex = id;
			},
			keyUp: function () {
				this.search = this.search.toUpperCase();
				this.searchGoods();
			},
			//选中的分类
			changeL1ID: function (id, i) {
				this.L1ID = id;
				this.L2ID = 0;
				this.child = this.category[i].child ? this.category[i].child : [];
				this.goodReady(id);
			},
			//选中的菜品
			changeL2ID: function (id) {
				this.L2ID = id;
				this.goodReady(id);
			},
			incategory: function (cids) {
				if (this.L1ID == 0) return true;
				if (cids.indexOf(this.L1ID) >= 0 && this.L2ID == 0) {
					return true;
				} else if (cids.indexOf(this.L2ID) >= 0) {
					return true;
				}
				return false;
			},
			//判断是否为套餐
			changefix: function (boolean, e) {
				if (e.target.className == 'sign') {
					this.ispack = boolean;
					if (boolean) {
						this.goodsIndex = [];
						// this.openTo.splice(this.openTo.indexOf(index), 1);
					} else {
						this.fixedIndex = [];
					}
				}
			},
			//根据选中的分类显示商品
			goodReady: function (id) {
				let arr = [];
				for (let i = 0; i < this.goodsCom.length; i++) {
					if (id === undefined || id === 0) {
						let item = utils.deepCopy(this.goodsCom[i]);
						if (!(item.cids instanceof Array)) {
							console.log(item.id + ' cids不是数组');
						} else {
							if (this.incategory(item.cids)) {
								arr.push(item);
							}
						}
					} else {
						for (let j = 0; j < this.goodsCom[i].cids.length; j++) {
							if (this.goodsCom[i].cids[j] == id) {
								arr.push(this.goodsCom[i]);
							}
						}
					}
				}
				this.selectgoods = arr;
				//保存当前分类下的商品，商品搜索需要用到
				this.goodsArr = arr;
			},

			//商品搜索
			searchGoods: function () {
				let arr = [];
				let res = [];
				for (let i = 0; i < this.goodsCom.length; i++) {
					if (
						this.goodsCom[i].goodsName.toUpperCase().indexOf(this.search) != -1
					) {
						arr.push(this.goodsCom[i]);
					}
				}
				for (let i = 0; i < this.newfixed.length; i++) {
					if (
						this.newfixed[i].packageName.toUpperCase().indexOf(this.search) != -1
					) {
						res.push(this.newfixed[i]);
					}
				}
				if (!this.search) {
					this.selectgoods = this.goodsArr;
					this.fixed = utils.deepCopy(this.newfixed);
				} else {
					this.selectgoods = arr;
					this.fixed = res;
				}
			},
			winEvent(str) {
				this.$emit('relationEvent', str);
			}
		},
		components: {
			win: () =>
				import( /*webpackChunkName: "win"*/ 'src/components/win'),
			mulSelect: () =>
				import( /*webpackChunkName: "mul_select"*/ 'src/components/mul_select')
		}
	};
</script>
<style scoped>
	.comList {
		width: 100%;
	}

	#getGoods .comList .selectbtns {
		width: 100%;
	}
</style>