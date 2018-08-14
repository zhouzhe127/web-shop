<template>
	<!--
        @百川  曾伟福
        @file 商品标识
    -->
	<div id="goodTags">
		<!--总图标===============================================================-->
		<ul class="tagsList" v-show="toggle">
			<li v-on:click="toggleTag(item)" v-for="(item,index) in marker" :key="index" style="width:30%;">
				<div class="split-line">
				</div>
				<div>
					<span class="img-span">
						{{item.name}}
						<img v-if="item.id ==1" src="../../res/icon/goods-tag-three.png" alt="星星图片" class="img">
						<img v-if="item.id ==2" src="../../res/icon/goods-tag-one.png" alt="点赞图片">
						<img v-if="item.id ==3" src="../../res/icon/goods-tag-two.png" alt="辣椒图片">
					</span>
					<span class="tag-index">{{index+1}}</span>
				</div>
			</li>
		</ul>
		<!--星星图标======================================================================-->
		<div v-if="!toggle">
			<ul class="tagsList">
				<li v-on:click="openTagWin(tag)" v-for="(tag,tagIndex) in nowMarker" :key="tagIndex">
					<div class="split-line"></div>
					<div>
						<span class="tag-container">
							{{tag.tagName}}
							<span v-if="tag.markerType==1" v-for="i in parseInt(tag.markerNum)" :key="i">
								<img src="../../res/icon/goods-tag-three.png" alt="星星" class="tag-img">
							</span>

							<span v-if="tag.markerType==2" v-for="i in parseInt(tag.markerNum)" :key="i">
								<img src="../../res/icon/goods-tag-one.png" alt="点赞" class="tag-img">
							</span>

							<span v-if="tag.markerType==3" v-for="i in parseInt(tag.markerNum)" :key="i">
								<img src="../../res/icon/goods-tag-two.png" alt="辣椒" class="tag-img">
							</span>
						</span>
						<span class="tag-markerNum">
							{{tag.markerNum}}
						</span>
					</div>
					<div class="relative-goods">关联商品：{{tag.goodsNum}}</div>
					<div class="relative-packages">关联套餐：{{tag.packageNum}}</div>
				</li>
			</ul>
		</div>
		<transition name="fade">
			<component :pObj="addObj" :is="showCom" @throwAddWin="closeAddWin"></component>
		</transition>

	</div>

</template>
<script>
	/*
	        1:每种标识的id在前台固定,非后台生成
	    */
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';


	export default {
		data() {
			return {
				grade: 5, //等级数
				shopId: null, //店铺id

				marker: null, //所有的标识      Array
				nowMarker: null, //当前展示的标识   Array

				markerId: null, //当前编辑的某个标识类型的id

				toggle: true, //标识菜单和单种标识的切换 true:显示标识菜单
				showCom: null, //是否展示组件
				addObj: {}, //flag:'推荐' id:'11'    markerNum:'1'    markerType:1   shopId:'61'
				sumMarker: [{
					id: '11',
					markerNum: 1,
					markerType: 1,
					goodsNum: 0,
					packageNum: 0,
					tagName: '推荐'
				},
				{
					id: '12',
					markerNum: 2,
					markerType: 1,
					goodsNum: 0,
					packageNum: 0,
					tagName: '推荐'
				},
				{
					id: '13',
					markerNum: 3,
					markerType: 1,
					goodsNum: 0,
					packageNum: 0,
					tagName: '推荐'
				},
				{
					id: '14',
					markerNum: 4,
					markerType: 1,
					goodsNum: 0,
					packageNum: 0,
					tagName: '推荐'
				},
				{
					id: '15',
					markerNum: 5,
					markerType: 1,
					goodsNum: 0,
					packageNum: 0,
					tagName: '推荐'
				},

				{
					id: '21',
					markerNum: 1,
					markerType: 2,
					goodsNum: 0,
					packageNum: 0,
					tagName: '点赞'
				},
				{
					id: '22',
					markerNum: 2,
					markerType: 2,
					goodsNum: 0,
					packageNum: 0,
					tagName: '点赞'
				},
				{
					id: '23',
					markerNum: 3,
					markerType: 2,
					goodsNum: 0,
					packageNum: 0,
					tagName: '点赞'
				},
				{
					id: '24',
					markerNum: 4,
					markerType: 2,
					goodsNum: 0,
					packageNum: 0,
					tagName: '点赞'
				},
				{
					id: '25',
					markerNum: 5,
					markerType: 2,
					goodsNum: 0,
					packageNum: 0,
					tagName: '点赞'
				},

				{
					id: '31',
					markerNum: 1,
					markerType: 3,
					goodsNum: 0,
					packageNum: 0,
					tagName: '辣椒'
				},
				{
					id: '32',
					markerNum: 2,
					markerType: 3,
					goodsNum: 0,
					packageNum: 0,
					tagName: '辣椒'
				},
				{
					id: '33',
					markerNum: 3,
					markerType: 3,
					goodsNum: 0,
					packageNum: 0,
					tagName: '辣椒'
				},
				{
					id: '34',
					markerNum: 4,
					markerType: 3,
					goodsNum: 0,
					packageNum: 0,
					tagName: '辣椒'
				},
				{
					id: '35',
					markerNum: 5,
					markerType: 3,
					goodsNum: 0,
					packageNum: 0,
					tagName: '辣椒'
				}
				],
			};
		},
		methods: {
			//编辑标识弹框
			openTagWin(tag) {
				this.addObj = {
					markerNum: tag.markerNum, //子标识等级
					id: tag.id, //子标识id
					shopId: this.shopId,
					flag: tag.tagName, //子标识名
					markerType: this.markerId //该标识的父标识id(同时也作为该子标识的标识类型)
				};
				this.showCom = 'markerAdd';
			},
			//关闭弹框
			closeAddWin(res) {
				this.showCom = '';
				if (res == 'edit') {
					this.toggleTag({
						id: this.markerId
					});
				}
			},
			//总标识菜单的切换
			toggleTag(item) {
				this.markerId = item.id;
				this.toggle = false;
				this.getAllMarker().then((res) => {
					this.nowMarker = this.sumMarker.filter((ele) => {
						return ele.markerType == this.markerId;
					});
					this.nowMarker = this.nowMarker.map((ele) => {
						res.some((e) => {
							if (e.id == ele.id) {
								ele.goodsNum = e.goodsNum;
								ele.packageNum = e.packageNum;
								return true;
							}
						});
						return ele;
					});
				});
			},

			//获取菜单标识类型
			async getMarker() {
				let res = await http.getMarker({
					data: {
						shopId: this.shopId,
					}
				});
				return res;
			},
			//获取某个菜单标识的所有信息
			async getAllMarker() {
				let res = await http.getAllMarker({
					data: {
						shopId: this.shopId,
						id: this.markerId
					}
				});
				return res;
			},
			//初始化
			initData() {
				let userData = storage.session('userShop');
				this.shopId = userData.currentShop.id;
			},
		},
		mounted() {
			this.initData();
			this.getMarker().then((res) => {
				res || (res = []);
				this.marker = res;
			});
		},
		watch: {
			'toggle': function () {
				let obj = this.toggle ? [] : [{
					name: '返回',
					className: ['back'],
					fn: () => {
						this.toggle = true;
					}
				}];
				this.$store.commit('setPageTools', obj);
			}
		},
		components: {
			markerAdd: () =>
				import ( /* webpackChunkName:'marker_add_win' */ './marker/marker_add_win'),
		}
	};
</script>
<style lang="less" scoped>
	#goodTags {
		padding-top: 30px;
		.detail-container {
			color: #B3B3B3;
			border: 1px solid #B3B3B3;
			width: 102px;
			height: 42px;
			text-align: center;
			line-height: 42px;
			font-size: 16px;
			position: absolute;
			right: 150px;
			top: 12px;
			cursor: pointer;
		}
		ul.tagsList li {
			vertical-align: middle;
			max-width: 300px;
			height: 200px;
			width: 18%;
			min-width: 240px;
			background-color: #efefef;
			display: inline-block;
			margin-right: 10px;
			margin-bottom: 20px;
			color: #898989;
			cursor: pointer;
			.split-line {
				background-color: #2EA8DC;
				height: 9px;
				opacity: 0.7
			}
			.img-span {
				float: left;
				margin: 20px 0 0 20px;
				color: #333333;
				font-size: 26px;
				height: 29px;
				.img {
					vertical-align: bottom;
					height: 29px;
				}
			}
			.tag-index {
				float: right;
				margin: 15px;
				font-size: 72px;
				color: #2EA8DC;
				opacity: 0.2;
			}
		}

		.split-line {
			background-color: #00a0e9;
			height: 9px;
			opacity: 0.7;
		}
		.tag-container {
			float: left;
			margin: 20px 0 0 12px;
			color: #333333;
			font-size: 26px;
			.tag-img {
				height: 29px;
				width: 30px;
				vertical-align: text-bottom;
			}
		}
		.tag-markerNum {
			float: right;
			margin: 10px;
			font-size: 72px;
			color: #008ed6;
			opacity: 0.2;
		}
		.relative-goods {
			font-size: 18px;
			clear: both;
			margin-left: 10px;
			color: #333333;
			margin-bottom: 5px;
		}
		.relative-packages {
			font-size: 18px;
			clear: both;
			margin-left: 10px;
			color: #333333;
		}
	}
</style>