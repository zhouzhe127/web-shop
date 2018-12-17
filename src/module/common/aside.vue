<template>
	<div id="mainNav" ref="mainElent">
		<ul class="mianNav" ref="mainNav" v-iscroll>
			<h1 @click="stretch" v-if="show">收起</h1>
			<h1 @click="stretch" v-if="!show">展开</h1>
			<li v-for="(item,index) in mianNav" :key="index" @click="changeNav(item,index)" :class="{active: isActive == index}">
				<i ref="icon"></i>
				<transition name="textSpan">
					<span v-if="show">{{item.title}}</span>
				</transition>
			</li>
		</ul>
		<div class="menSecond" ref="menSecond" v-if="title!='概况'">
			<h1>{{title}}</h1>
			<ul class="secondBox" v-iscroll>
				<li v-for="(item,index) in menSecond" :key="index">
					<span v-if="item.child&&item.child.length>0" @click="changeCon(item,index)" :class="{active: onActive == index}">
						<i :class="{rotate: openTo.indexOf(index) != -1}"></i>
						{{item.title}}
					</span>
					<span @click="changeCon(item,index)" :class="{active: onActive == index}" v-else-if="item.blockShow">{{item.title}}</span>
					<ul v-if="item.child&&item.child.length>0 && item.blockShow">
						<li v-for="(list,i) in item.child" :key="i">
							<transition name="bounce">
								<span v-if="openTo.indexOf(index) != -1 && list.blockShow" @click="threeList(list,i,index)" :class="{active: soActive == i && check==`${index}`+`${i}`}">{{list.title}}</span>
							</transition>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="imgtab" @click="draw" v-if="title!='概况'">
			<img src="../../res/icon/rightbtn.png" v-if="!showNext" />
			<img src="../../res/icon/leftbtn.png" v-else class="imgTow" />
		</div>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import routeNeed from 'src/config/aside_config';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import timer from 'src/verdor/timer';
	let invoicfig = false;
	export default {
		data() {
			return {
				itemId: '', //店铺ID
				mianNav: '', //主菜单数据
				menSecond: '', //子菜单栏数据
				show: false,
				showNext: false,
				title: '',
				isActive: 0,
				onActive: 0,
				soActive: 0,
				openTo: [],
				check: '00',
				router: '',
				ischain: storage.session('userShop').currentShop.ischain,
				timer: '',
				asideDel: [], //需要移除的模块
			};
		},
		methods: {
			async getData() {
				this.itemId = storage.session('itemId');
				let token = storage.session('token');
				let data = null;
				if (storage.session('aside')) {
					data = storage.session('aside');
				} else {
					data = await http.ChooseShop({
						data: {
							shopId: this.itemId,
							token: token
						}
					});
					storage.session('aside', data);
				}
				for (let i in data) {
					let item = data[i].child;
					for (let j in item) {
						let jtem = item[j].child;
						// console.log(item[j].id+item[j].name+item[j].title)
						if (routeNeed.routerMap[item[j].name]) {
							routeNeed.routerMap[item[j].name].i = i;
							routeNeed.routerMap[item[j].name].o = j;
							routeNeed.routerMap[item[j].name].s = 0;
						}
						item[j].blockShow = true;
						this.checkDel(item[j]);
						if (jtem && jtem.length > 0) {
							for (let k in jtem) {
								if (routeNeed.routerMap[jtem[k].name]) {
									routeNeed.routerMap[jtem[k].name].i = i;
									routeNeed.routerMap[jtem[k].name].o = j;
									routeNeed.routerMap[jtem[k].name].s = k;
								}
								if(jtem[k].name=='inventoryConfig') invoicfig = true;
								
								jtem[k].blockShow = true;
								this.checkDel(jtem[k]);
							}
						}
					}
				}
				this.mianNav = data;
				this.menSecond = data[this.isActive].child;
				this.title = data[this.isActive].title;
				this.changeAside();
				this.nevChange();
			},
			checkDel(item) { //标记不需要显示的模块
				for (let del of this.asideDel) {
					if (item.title == del) {
						item.blockShow = false;
						break;
					}
				}
			},
			findRouter(name) {
				//按路由名字查找
				for (let res in routeNeed.routerMap) {
					let mianData = routeNeed.routerMap[res];
					if (mianData.name === name) {
						this.isActive = mianData.i;
						this.onActive = mianData.o;
						this.soActive = mianData.s;
						this.check = `${this.onActive}` + `${this.soActive}`;
					}
				}
			},
			changeNav: function (item, index) {
				this.menSecond = item.child;
				this.title = item.title;
				// this.$store.commit('setHeaderTil',{type:'splice',params:[0, this.$store.state.headerTil.length,item.title,item.child[0].title]});
				this.openTo = [];
				this.isActive = index;
				this.onActive = 0;
				this.soActive = 0;
				if (item.child[0].child && item.child[0].child.length > 0) {
					this.toRouter(item.child[0].child[0].name);
					this.soActive = 0;
				} else {
					this.toRouter(item.child[0].name);
				}
				this.$nextTick(()=>{
					this.$store.commit('setasideWidth', this.$refs.mainElent.clientWidth);
				});
			},
			changeCon: function (item, index) {
				if (item.child && item.child.length > 0) {
					if (this.openTo.indexOf(index) != -1) {
						this.openTo.splice(this.openTo.indexOf(index), 1);
					} else {
						this.openTo = [];
						this.openTo.push(index);
					}
				} else {
					this.openTo = [];
					this.onActive = index;
					this.toRouter(item.name);
				}
			},
			stretch: function () {
				this.show = !this.show;
			},
			draw: function () {
				this.showNext = !this.showNext;
			},
			toRouter: function (name) {
				document.body.scrollTop = 0;
				if (routeNeed.routerMap[name]) {
					this.$router.push({
						path: '/admin/' + routeNeed.routerMap[name].name,
						query: {
							i: this.isActive,
							o: this.onActive,
							s: this.soActive
						}
					});
				} else {
					console.log(name);
				}
			},
			threeList: function (...argus) {
				let [list, i, index] = argus;
				// this.openTo = [Number(index)];
				this.soActive = i;
				this.onActive = index;
				this.check = `${this.onActive}` + `${this.soActive}`;
				this.toRouter(list.name);
			},
			changeAside: function () {
				if (this.$route.query.i) {
					this.isActive = this.$route.query.i;
					this.onActive = this.$route.query.o;
					this.soActive = this.$route.query.s;
					this.check = `${this.onActive}` + `${this.soActive}`;
					if (this.openTo.length == 0) this.openTo.push(Number(this.onActive));
				} else {
					let name = this.$route.path.match(/^(\/admin\/)(\w+)(\/)?/)[2];
					this.findRouter(name);
				}
			},
			nevChange: function () {
				if (this.mianNav) {
					let a = {
						title: this.mianNav[this.isActive].title
					};
					let twolist = this.mianNav[this.isActive].child[this.onActive];
					let b = {
						title: twolist.title
					};
					let c = null;
					this.menSecond = this.mianNav[this.isActive].child;
					this.title = this.mianNav[this.isActive].title;
					this.$store.commit('setHeaderTil', {
						type: 'splice',
						params: [0, this.$store.state.headerTil.length]
					});
					let treeChild = this.mianNav[this.isActive].child[this.onActive].child;
					if (treeChild && treeChild.length > 0) {
						c = {
							title: treeChild[this.soActive].title
						};
						this.$store.commit('setHeaderTil', {
							type: 'push',
							params: [a, b, c]
						});
					} else {
						this.$store.commit('setHeaderTil', {
							type: 'push',
							params: [a, b]
						});
					}
				} else {
					this.getData();
				}
			},
			animate(dom, start, end) { //动画
				timer.clear(this.timer);
				let t = 0;
				let c = end - start;
				let timeEnd = false;
				this.timer = timer.add(() => {
					t += 10;
					let change = null;
					if (c > 0) {
						change = utils.Ease.easeInFast(t, start, 2, 50);
						if (change >= end) {
							timeEnd = true;
						}
					} else {
						change = utils.Ease.easeInFast(t, start, -2, 50);
						if (change <= end) {
							timeEnd = true;
						}
					}
					this.$store.commit('setasideWidth', this.$refs.mainElent.clientWidth);

					if (timeEnd) {
						dom.style.width = end / 100 + 'rem';
						this.$store.commit('setasideWidth', this.$refs.mainElent.clientWidth);
						timer.clear(this.timer);
						return;
					}
					dom.style.width = change / 100 + 'rem';
				}, 10);
			},
			async setInventConfig() {
				let res = await http.invociGetSupplier();
				let config = 0;
				if (res.isGoods == 1 && res.isMaterial != 1) {
					config = 1;
					this.asideDel = ['领料管理', 'BOM单管理', '单位配置', '物料分类'];
				} else if (res.isGoods != 1 && res.isMaterial == 1) {
					config = 2;
					this.asideDel = ['称重商品配置', '货架管理'];
				}
				if(res.purchaseAudit != 1){
					this.asideDel.push('采购审核');					
				}else{
					if(this.asideDel.includes('采购审核')){
						this.asideDel = this.asideDel.filter((ele)=>{
							return ele != '采购审核';
						});
					}
				}
				this.getData();
				invoicfig = false;
				storage.session('inventConfigure', config);
				storage.session('inventConfigs', res);
				this.$store.commit('setContentDisplay',config);
			}
		},
		mounted: function () {
			routeNeed.routerMap['categoryStatistics'].name = storage.session('userShop').currentShop.industry == 1 ?
				'categoryCount' : 'categoryStatistics', //'分类统计',
			this.getData();

			try{
				if(invoicfig&&this.mianNav&&this.mianNav[this.isActive].title=='进销存系统') this.setInventConfig(); //进销存配置

			}catch(e){
				/* eslint-disable-line*/
			}
		},
		updated() {
			// this.$refs.mainElent.style.height = document.body.clientHeight-65 + 'px';
			let icon = this.$refs.icon;
			for (let i in this.mianNav) {
				let l = routeNeed.setIcon[this.mianNav[i].title] || 0;
				if (icon.length > 0) icon[i].style.backgroundPosition = `${l/100}rem`;
			}
		},
		computed: {
			runHeard() {
				return this.$store.state.runHeard;
			},
			delModule() {
				return this.$store.state.asideDel;
			}
		},
		watch: {
			$route: function () {
				this.$store.commit('setRunheard', '');
				this.changeAside();
				this.nevChange();
				if(invoicfig&&this.mianNav&&this.mianNav[this.isActive].title=='进销存系统') this.setInventConfig(); //进销存配置
			},
			show() {
				let domNav = this.$refs.mainNav;
				if (this.show) {
					this.animate(domNav, 65, 175);
				} else {
					this.animate(domNav, 175, 65);
				}
			},
			showNext: function () {
				let nextNav = this.$refs.menSecond;
				if (this.showNext) {
					this.animate(nextNav, 130, 0);
				} else {
					if (nextNav) {
						this.animate(nextNav, 0, 130);
					}
				}
			},
			runHeard() {
				if (this.runHeard == '') return;
				if (this.runHeard == 1) {
					this.changeNav(this.mianNav[this.isActive], this.isActive);
				}
				if (this.runHeard > 1 && this.runHeard <= 3) {
					let name = this.$route.path.match(/^(\/admin\/)(\w+)(\/)?/)[2];
					this.findRouter(name);
					this.toRouter(name);
				}
			},
			delModule() {
				this.asideDel = this.delModule;
				this.getData();
			}
		}
	};
</script>
<style lang="less" scoped>
	@media only screen and (max-width:1024px) {
		#mainNav span {
			font-size: 12px !important;
		}
	}

	#mainNav {
		height: 100%;
		cursor: pointer;
		background-color: #44404A;
		display: flex;
		.mianNav {
			width: 0.65rem;
			height: 100%;
			background-color: #44404A;
			overflow: hidden;
			.little {
				width: 0.75rem;
			}
			h1 {
				width: 100%;
				height: 0.40rem;
				line-height: 0.40rem;
				color: #ffffff;
				background-color: #35313A;
				text-align: center;
			}
			li {
				color: #ffffff;
				width: 100%;
				height: 0.65rem;
				line-height: 0.65rem;
				text-align: left;
				position: relative;
				text-indent: 0.30rem;
				overflow: hidden;
				i {
					display: block;
					width: 0.21rem;
					height: 0.23rem;
					background-image: url(../../res/icon/icon-menu.png);
					background-size: 3.6rem 0.23rem;
					background-repeat: no-repeat;
					position: absolute;
					top: 0.21rem;
					left: 0.21rem;
				}
				span {
					display: inline-block;
				}
				&:hover {
					background-color: #35313A;
					color: #ffffff
				}
			}
			.active {
				background-color: #E1BB4A !important;
				color: #44404A !important;
			}
		}
		.menSecond {
			width: 1.30rem;
			height: 100%; // padding-bottom: 65px;
			min-height: 5rem;
			background-color: #ecedf2;
			color: #333;
			overflow-y: hidden;
			h1 {
				height: 0.80rem;
				line-height: 0.80rem;
				background-color: #e5e5e5;
				font-weight: bold;
				text-align: left;
				padding-left: 0.15rem;
				white-space: nowrap;
			}
			.secondBox{
				height: 90%;
			}
			ul {
				li {
					text-align: left;
					width: 100%;
					line-height: 0.60rem;
					position: relative;
					i {
						display: inline-block;
						width: 0.16rem;
						height: 0.10rem;
						position: absolute;
						top: 0.22rem;
						left: 0.04rem;
						background: url(../../res/icon/bottomimg.png) no-repeat;
						background-size: 0.16rem 0.1rem;
						transform: rotate(-90deg);
						transition: all 0.3s ease-out;
					}
					.rotate {
						transform: rotate(0deg);
					}
					span {
						display: block;
						/*height: 60px;*/
						white-space: nowrap;
						padding-left: 0.25rem;
						overflow: hidden;
						text-overflow: ellipsis;
						&:hover {
							background-color: #ffffff;
						}
					}
					ul {
						overflow: hidden;
					}
				}
			}
			.active {
				background-color: #ffffff;
			}
		}
		.imgtab {
			position: absolute;
			top: 3rem;
			right: -0.03rem;
			img {
				width: 0.25rem;
				height: 0.70rem;
			}
			.imgTow {
				position: relative;
				left: 0.19rem;
			}
		}
	}

	.bounce-enter-active {
		animation: bounce-in 0.5s;
	}

	.bounce-leave-active {
		animation: bounce-out 0.5s;
	}

	@keyframes bounce-in {
		0% {
			height: 0rem;
		}
		100% {
			height: 0.60rem;
		}
	}

	@keyframes bounce-out {
		0% {
			height: 0.60rem;
		}
		100% {
			height: 0rem;
		}
	}

	.textSpan-enter-active {
		transition: all .3s ease;
	}

	.textSpan-leave-active {
		transition: all .3s ease;
	}

	.textSpan-enter,
	.textSpan-leave-to {
		opacity: 0;
	}
</style>