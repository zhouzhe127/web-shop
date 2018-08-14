
<template>
	<win @winEvent="goodListWin" :align="'center'" :width="860" :height="560">
		<span slot="title">关联商品配置</span>
		<div id="tan" slot="content">
			<section id="configTan">
				<div class="top" :style="{width:goodCom.id!=4?'270px':'180px'}">
					<section @click="changeType(2)" class="topT" :class="{'act' : typeC==2}" style="width:88px">必点商品</section>
					<section v-if="goodCom.id!=4" @click="changeType(1)" class="topT" :class="{'act' : typeC==1}" style="border-right:1px solid #ff9801;">人均商品</section>
					<section @click="changeType(0)" class="topT" :class="{'act' : typeC==0}" style="border-right:1px solid #ff9801;">市别商品</section>
				</div>
				<div class="tas-change">
					<span class="tas-text">必点起售数量</span>
					<input type="text" placeholder="请输入数量" maxlength="3" style="width:150px;padding-left:20px;"
						   :onkeyup="minNum=minNum.replace(/\D/,'')" v-model="minNum" />
				</div>
				<div style="clear: both"></div>
				<ul class="neckTab" v-show="typeC==2">
					<li :class="{'seleced':!mustSon}" @click="queryTo(false)">必点商品</li>
					<li :class="{'seleced':mustSon}" @click="queryTo(true)">必点商品关联子商品</li>
				</ul>
				<section class="oCont">
					<div v-show="!isOnlyGoods" class="Box">
						<section v-on:click="getGoodList(0)" class="oDe" :class="{'act' : !isPackage}" style="border-left: none;width:50%;">商品</section>
						<section v-on:click="getGoodList(1)" class="oDe" :class="{'act' : isPackage}">套餐</section>
					</div>
					<ul v-if="!isPackage" class="noPackage">
						<li style="width:210px;float: left;">
							<!--一级分类选择框-->
							<section class="staList fl detLi">
								<section v-on:click="showOneArea" class="tableList">
									<span class="oSpan">{{oneArea.oneAreaName}}</span>
									<div class="fl">
										<i></i>
									</div>
								</section>
								<div v-if="oneArea.oneAreaBtn" class="detDiv">
									<i class="detI"></i>
									<div style="width:100%;height: 100%;overflow-y: auto;z-index: 16;">
										<section v-for="(item,index) in oneArea.oneAreaList" :key="index" v-on:click='selectOneArea(index,item)' class="shoName" :class="{'shoName-select-one':item && item.selected}">{{item.name}}</section>
									</div>
								</div>
							</section>
						</li>
						<li style="width:210px;margin-left: 20px;float: left;">
							<!--二级级分类选择框-->
							<section class="staList fl detLi">
								<section v-on:click="showTwoArea" class="tableList">
									<span class="oSpan">{{twoArea.twoAreaName}}</span>
									<div class="fl">
										<i></i>
									</div>
								</section>
								<div v-if="twoArea.twoAreaBtn" class="detDiv" style="left: -180px;">
									<i class="detI" style="left: 290px;"></i>
									<div style="width:100%;height: 100%;overflow-y: auto;z-index: 16;">
										<section v-for="(item,index) in twoArea.twoAreaList" :key="index" v-on:click='selectTwoArea(index,item)' class="shoName" :class="{'shoName-select-one':item && item.selected}">{{item.name}}</section>
									</div>
								</div>
							</section>
						</li>
						<!--搜索-->
						<li style="width:180px;margin-left: 20px;float: left;">
							<div class='search'>
								<input type="text" placeholder="请输入名称" class="search-input" v-model="search" />
								<a href="javascript:void(0);" class="search-btn" @click="searchGoods()" style="background-color:#29A7E1;"></a>
							</div>
						</li>
					</ul>
					<div v-if="isPackage" class="isPackages">
						<a @click="selectPack(-1)" class="raduobtn" :class="{'selectbtn' : packBtn == -1}" href="javascript:void(0);">全部</a>
						<a @click="selectPack(0)" class="raduobtn" :class="{'selectbtn' : packBtn == 0}" href="javascript:void(0);">固定套餐</a>
						<a @click="selectPack(1)" class="raduobtn" :class="{'selectbtn' : packBtn == 1}" href="javascript:void(0);">可选套餐</a>
					</div>
				</section>
				<ul class="aUl">
					<section v-if="allGood">
						<li v-if="!isPackage" v-for="(item,index) in goodsCom" :key='index' v-on:click="choseGood(item)" class="aLi" :class="{'shoName-select':item.selected}">{{item.goodsName}}</li>
						<li v-if="isPackage" v-for="(item,index) in packCom" :key='index' v-on:click="choseGood(item)" class="aLi" :class="{'shoName-select':item.selected}">{{item.packageName}}</li>
					</section>
					<section v-if="!allGood">
						<div class="onecate" v-if="oneGoodList.goodsList.length > 0">
							<section class="onecataTitle">
								<i class="twoI" :class="{'oneI':L2ID == '0'}"></i>
								<li class="twoTitle " :class="{'oneTitle':L2ID == '0'}">{{oneGoodList.name}}</li>
							</section>
							<section style="width:600px;float: left;">
								<li v-on:click="choseGood(item)" v-for="(item,index) in oneGoodList.goodsList" :key="index" class="aLi" :class="{'shoName-select':item.selected}">{{item.goodsName ? item.goodsName : item.packageName}}</li>
							</section>
						</div>
						<div v-if="category.goodsList.length > 0" class="onecate" v-for="(category,index) in oneGoodList.child" :key="index">
							<section class="onecataTitle">
								<i class="twoI"></i>
								<li class="twoTitle">{{category.name}}</li>
							</section>
							<section style="width:600px;float: left;">
								<li v-on:click="choseGood(item)" v-for="(item,index) in category.goodsList" :key="index" class="aLi" :class="{'shoName-select':item.selected}">{{item.goodsName ? item.goodsName : item.packageName}}</li>
							</section>
						</div>
					</section>
				</ul>
				<div v-if="isGoods" class="allX">
					<section v-on:click="allGoods(0)" class="isallselect" :class="{'allselect':!allSelect}">取消全部</section>
					<section v-on:click="allGoods(1)" class="isallselect" :class="{'allselect':allSelect}">选择全部</section>
					<h3 style="width: 160px;height: 40px;line-height: 40px;float: right;color: #FF9700;">已选择{{isPackage?selectPackNum:selectNum}}个</h3>
				</div>
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
			oneArea: {
				oneAreaBtn: false, //一级分类
				oneAreaName: '请选择一级分类',
				oneAreaIndex: -1, //分类下标
				oneAreaList: [{ id: '0', name: '全部' }] //一级分类列表
			},
			twoArea: {
				twoAreaBtn: false, //二级分类
				twoAreaName: '请选择二级分类',
				twoAreaIndex: -1, //分类下标
				twoAreaList: [{ id: '0', name: '全部二级分类' }] //二级分类列表
			},
			L1ID: 0, // 1级分类 id
			L2ID: 0, // 2级分类id

			packlist: [], //所有的套餐列表
			goodList: [], // 所有商品
			packCom: [], //要展示的套餐列表
			goodsCom: [], // 当前展示的商品
			isPackage: false, //商品或套餐显示的控制，默认是显示商品

			allSelect: false, //全部选择
			oneGoodList: {}, //选择一级分类页面的所有数据
			newOneGoodList: {}, //新建一个，选择二级分类时渲染数据
			allGood: true, //是否显示所有商品，默认显示
			packBtn: -1, //套餐选择按钮，-1：全部，0：固定，1：可选。默认全部
			selectNum: 0, //选中的商品数量
			selectPackNum: 0, //选中套餐的数量

			oneG: [], //市别商品，被选中的id
			oneP: [], //市别套餐，被选中的id
			twoG: [], //人均
			threeG: [], //必点
			threeP: [],
			fourG: [], //必点子商品
			fourP: [],

			goodsIds: [], //已选商品id
			packages: [], //已选套餐id
			isGoods: true, //单选或者多选  true多选，false单选
			isOnlyGoods: false, //是否显示套餐

			typeC: 0, //切换人均、市别、必点
			mustSon: false, //是否为必点子
			minNum: '', //必点起售数量
			search: '', //搜索

			objGoods: {}, //对市别商品id做处理，避免多重循环
            peoGoods: {}, //人均商品id做处理，避免多重循环
			mustGoods:{},//必点商品id做处理，避免多重循环

			fatherGoods: [],
			fatherPacks: [],
		};
	},
	props: ['getGoods', 'getPacks', 'goodCom'],
	created() {
		document.addEventListener('click', this.myClick);
		this.getOneAreaList(); //获取分类列表
		//初始化数据
		this.init();
		console.log(this.getGoods);
	},
	methods: {
		init() {
			console.log('初始化数据');
			//商品
			this.fatherGoods = utils.deepCopy(this.getGoods);
			//往列表里塞selected，单选全选点击用
			for (let i = 0; i < this.fatherGoods.length; i++) {
				this.$set(this.fatherGoods[i], 'selected', false);
			}
			//套餐
			this.fatherPacks = utils.deepCopy(this.getPacks);
			for (let i = 0; i < this.fatherPacks.length; i++) {
				this.fatherPacks[i].selected = false;
			}

			if (this.goodCom) {
				let v = this.goodCom;
				this.oneG = v.goodsIds;
				this.oneP = v.packageIds;
				this.twoG = v.perGoodsIds;
				this.threeG = v.mustGids;
				this.threeP = v.mustPids;
				this.fourG = v.mustSonGids;
				this.fourP = v.mustSonPids;
				this.minNum = v.mustNum == 0 ? '' : v.mustNum;
			}
			this.fuData();
		},
		changeType(i) {
			this.saveData();
			this.typeC = i;
			this.fuData();
		},
		queryTo(v) {
			this.saveData();
			this.mustSon = v;
			this.fuData();
		},
		//切换前保存数据
		saveData() {
			console.log('保存');
			let item = {};
			item.goodArr = [];
			item.packArr = [];
			let goodList = this.goodList;
			let packlist = this.packlist;
			for (let i = 0; i < goodList.length; i++) {
				if (goodList[i].selected) {
					item.goodArr.push(goodList[i].id);
				}
			}
			for (let i = 0; i < packlist.length; i++) {
				if (packlist[i].selected) {
					item.packArr.push(packlist[i].id);
				}
			}
			switch (this.typeC + '') {
				case '0':
					this.oneG = item.goodArr;
					this.oneP = item.packArr;
					break;
				case '1':
					this.twoG = item.goodArr;
					break;
				case '2':
					if (!this.mustSon) {
						this.threeG = item.goodArr;
						this.threeP = item.packArr;
					} else {
						this.fourG = item.goodArr;
						this.fourP = item.packArr;
					}
					break;
			}
		},
		//切换后进行赋值
		fuData() {
			this.search = ''; //清空搜索数据
			this.isPackage = false; //切回默认的商品
			if (this.L1ID != 0) {
				this.L1ID = 0;
				this.L2ID = 0;
				this.oneArea.oneAreaName = '请选择一级分类';
				this.twoArea = {
					twoAreaBtn: false, //二级分类
					twoAreaName: '请选择二级分类',
					twoAreaIndex: -1, //分类下标
					twoAreaList: [{ id: '0', name: '全部二级分类' }] //二级分类列表
				};
				this.allGood = true;
				for (let i = 0; i < this.oneArea.oneAreaList.length; i++) {
					this.oneArea.oneAreaList[i].selected = false;
				}
			}
			console.log('切换时复制');
			let nowGoods = utils.deepCopy(this.fatherGoods);
			let nowPacks = utils.deepCopy(this.fatherPacks);
			switch (this.typeC + '') {
				case '0':
					this.isOnlyGoods = false;
					this.goodsIds = this.oneG;
					this.packages = this.oneP;

                    //过滤多规格子菜
                    for (let i = 0; i < nowGoods.length; i++) {
                        if (nowGoods[i].groupId != '0') {
                            nowGoods.splice(i, 1);
                            i--;
                        }
                    }
                    //对商品id做处理，避免多重循环
                    if (JSON.stringify(this.objGoods) == '{}') {
                        for (let i = 0; i < nowGoods.length; i++) {
                            if (this.objGoods[nowGoods[i].id]) {
                                console.log('有重复id');
                            } else {
                                this.objGoods[nowGoods[i].id] = i;
                            }
                        }
                    }
                    //
                    for (let j = 0; j < this.goodsIds.length; j++) {
                        let index = this.objGoods[this.goodsIds[j]];
                        if (index || index != undefined) {
                            nowGoods[index].selected = true;
                        }
                    }
					break;
				case '1':
					this.isOnlyGoods = true;
					this.goodsIds = this.twoG;

                    //过滤多规格主菜、斤两菜、自定义菜,及市别未选择的菜和下架的菜
                    for (let i = 0; i < nowGoods.length; i++) {
                        if (nowGoods[i].isGroup == '1' || nowGoods[i].type != '0'||this.oneG.indexOf(nowGoods[i].id)==-1||nowGoods[i].status == '2') {
                            nowGoods.splice(i, 1);
                            i--;
                        }
                    }
                    //对人均商品id做处理，避免多重循环
                    this.peoGoods={};
					for (let i = 0; i < nowGoods.length; i++) {
                            if (this.peoGoods[nowGoods[i].id]) {
                                console.log('有重复id');
                            } else {
                                this.peoGoods[nowGoods[i].id] = i;
                            }
					}
                    //设置选中的为true
                    for (let j = 0; j < this.goodsIds.length; j++) {
                        let index = this.peoGoods[this.goodsIds[j]];
                        if (index || index != undefined) {
                            nowGoods[index].selected = true;
                        }
                    }
					break;
				case '2':
					this.isOnlyGoods = false;
					if (!this.mustSon) {//必点
						this.goodsIds = this.threeG;
						this.packages = this.threeP;
					} else {//必点子
						this.goodsIds = this.fourG;
						this.packages = this.fourP;
					}
                    //过滤多规格主菜，及市别未选择的菜
                    for (let i = 0; i < nowGoods.length; i++) {
                        if (nowGoods[i].isGroup == '1'||this.oneG.indexOf(nowGoods[i].id)==-1) {
                            nowGoods.splice(i, 1);
                            i--;
                        }
                    }
                    if (!this.mustSon) {
                        for (let i = 0; i < nowGoods.length; i++) {//过滤必点子选择过的
                            if (this.fourG.includes(nowGoods[i].id)) {
                                nowGoods.splice(i, 1);
                                i--;
                            }
                        }
                    } else {
                        for (let i = 0; i < nowGoods.length; i++) {//过滤下架,及必点选择过的
                            if (nowGoods[i].status == '2'||this.threeG.includes(nowGoods[i].id)) {
                                nowGoods.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    //对商品id做处理，避免多重循环
                    this.mustGoods={};
					for (let i = 0; i < nowGoods.length; i++) {
                            if (this.mustGoods[nowGoods[i].id]) {
                                console.log('有重复id');
                            } else {
                                this.mustGoods[nowGoods[i].id] = i;
                            }
					}
					//
                    for (let j = 0; j < this.goodsIds.length; j++) {
                        let index = this.mustGoods[this.goodsIds[j]];
                        if (index || index != undefined) {
                            nowGoods[index].selected = true;
                        }
                    }
					break;
			}

			//不能深度复制，利用的就是浅复制的特性，当goodsCom属性改变时goodList也跟着改变
			this.goodsCom = nowGoods;
			this.goodList = nowGoods;

			if (this.typeC==2) {
                for (let i = 0;i < nowPacks.length; i++) {
                    if (!this.oneP.includes(nowPacks[i].id)) {//过滤市别中未选择的
                        nowPacks.splice(i, 1);
                        i--;
                    }
                }
                if (!this.mustSon) {
                    for (let i = 0; i < nowPacks.length; i++) {//过滤必点子选择过的
                        if (this.fourP.includes(nowPacks[i].id)) {
                            nowPacks.splice(i, 1);
                            i--;
                        }
                    }
                } else {
                    for (let i = 0;i < nowPacks.length; i++) {//过滤下架的,及必点选择过的
                        if (nowPacks[i].status == '2'||this.threeP.includes(nowPacks[i].id)) {
                            nowPacks.splice(i, 1);
                            i--;
                        }
                    }
                }
			}
			if(this.typeC!=1){
                for (let j = 0; j < nowPacks.length; j++) { //设置选择过的为true
                    if(this.packages.includes(nowPacks[j].id)){
                        nowPacks[j].selected = true;
					}
                }
                this.packlist= nowPacks;
                this.packCom= nowPacks;
			}
		},
		//确定
		async channelEditGoods() {
			let temp = [];
			this.twoG.forEach(ele => {
				let obj = {};
				obj.gid = ele;
				obj.goodsNum = '1';
				temp.push(obj);
			});
			for(let i=0;i<this.oneG.length;i++){
			    for(let j=0;j<this.getGoods.length;j++){
			        if(this.oneG[i]==this.getGoods[j].id&&this.getGoods[j].myId&&this.getGoods[j].myId.length>0){
			            this.oneG=this.oneG.concat(this.getGoods[j].myId);
			            break;
					}
				}
			}
			console.log(this.oneG);
			let res = await http.ChannelEditGoods({
				data: {
					id: this.goodCom.id,
					goodsIds: this.oneG.toString(),
					packageIds: this.oneP.toString(),
					mustGids: this.threeG.toString(),
					mustPids: this.threeP.toString(),
					mustNum: Number(this.minNum),
					mustSonGids: this.fourG.toString(),
					mustSonPids: this.fourP.toString(),
					perGoodsIds: temp
				}
			});
			return res;
		},
		//处理数据
		chuDate(){
		    let [two,three,four,threeT,fourT]=[utils.deepCopy(this.twoG),utils.deepCopy(this.threeG),utils.deepCopy(this.fourG),utils.deepCopy(this.threeP),utils.deepCopy(this.fourP)];
            this.twoG=two.filter((v)=>{
		        return this.oneG.includes(v);
			});
			this.threeG=three.filter((v)=>{
		        return this.oneG.includes(v);
			});
            this.fourG=four.filter((v)=>{
                return this.oneG.includes(v);
            });
            this.threeP=threeT.filter((v)=>{
                return this.oneP.includes(v);
            });
            this.fourP=fourT.filter((v)=>{
                return this.oneP.includes(v);
            });
		},
		//弹窗
		goodListWin(res) {
			if (res == 'ok') {
				this.saveData();//保存数据
                this.chuDate();//处理数据
				if (
					Number(this.minNum) < 1 &&
					this.threeG.length + this.threeP.length > 0
				) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alter',
						content: '请输入大于0的必点起售数量'
					});
					return false;
				}
                if (
                    Number(this.minNum) > 0&&
					((this.threeG.length + this.threeP.length)==0||(this.fourG.length + this.fourP.length)==0)
                ) {
                    this.$store.commit('setWin', {
                        title: '提示信息',
                        winType: 'alter',
                        content: '当起售数量大于0须配置必点商品及必点子商品'
                    });
                    return false;
                }
				if (
					this.threeG.length == 0 &&
					this.threeP.length == 0 &&
					(this.fourG.length != 0 || this.fourP.length != 0)
				) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alter',
						content: '必须选择一个必点商品'
					});
					return false;
				}
				this.channelEditGoods().then(v => {
					if (v) {
						this.$emit('goodListWin', res);
					}
				});
			} else {
				this.$emit('goodListWin', res);
			}
		},

		//商品和套餐的切换，商品index =0 ；套餐index = 1
		getGoodList(index) {
			this.allGood = true;
			this.search='';
			if (index == 0) {
				this.isPackage = false;
				this.goodsCom = this.goodList;
			} else if (index == 1) {
				this.isPackage = true;
				this.goodsCom = this.packlist;
			}
		},
		//选择商品或者套餐
		choseGood(item) {
			if (this.isGoods) {//多选
				item.selected = !item.selected;
			} else {//单选
				for (let i = 0; i < this.goodsCom.length; i++) {
					this.goodsCom[i].selected = false;
				}
				if (this.isPackage) {
					//单选的话，如果切换的是套餐，则将所选择的商品清空
					for (let i = 0; i < this.goodList.length; i++) {
						this.goodList[i].selected = false;
					}
				} else {
					for (let i = 0; i < this.packlist.length; i++) {
						this.packlist[i].selected = false;
					}
				}
				item.selected = true;
			}
		},
		//套餐选择，-1 全部，0：固定，1：可选
		selectPack(index) {
			this.packBtn = index;
			this.packCom = [];
			let packlist = this.packlist;
			if (index == -1) {
				this.packCom = packlist;
			} else {
				for (let i = 0; i < packlist.length; i++) {
					if (packlist[i].type == index) {
						this.packCom.push(packlist[i]);
					}
				}
			}
		},
		//分类全部选择或全部取消
		allGoods(index) {
			//index为0，取消全部，为1，选择全部
			if (index == 0) {
				this.allSelect = false;
				if (this.isPackage) {
					for (let i = 0; i < this.packCom.length; i++) {
						this.packCom[i].selected = false;
					}
				} else {
					if (this.allGood) {
						for (let i = 0; i < this.goodsCom.length; i++) {
							this.goodsCom[i].selected = false;
						}
					} else {
						if (this.oneGoodList.goodsList.length > 0) {
							for (let m = 0; m < this.goodsCom.length; m++) {
								for (let i = 0; i < this.oneGoodList.goodsList.length; i++) {
									this.oneGoodList.goodsList[i].selected = false;
									if (this.goodsCom[m].id == this.oneGoodList.goodsList[i].id) {
										this.goodsCom[m].selected = false;
									}
								}
							}
						}
						if (this.oneGoodList.child && this.oneGoodList.child.length > 0) {
							for (let m = 0; m < this.goodsCom.length; m++) {
								for (let i = 0; i < this.oneGoodList.child.length; i++) {
									for (
										let j = 0;
										j < this.oneGoodList.child[i].goodsList.length;
										j++
									) {
										this.oneGoodList.child[i].goodsList[j].selected = false;
										if (
											this.goodsCom[m].id ==
											this.oneGoodList.child[i].goodsList[j].id
										) {
											this.goodsCom[m].selected = false;
										}
									}
								}
							}
						}
					}
				}
			} else if (index == 1) {
				this.allSelect = true;
				if (this.isPackage) {
					for (let i = 0; i < this.packCom.length; i++) {
						this.packCom[i].selected = true;
					}
				} else {
					if (this.allGood) {
						for (let i = 0; i < this.goodsCom.length; i++) {
							this.goodsCom[i].selected = true;
						}
					} else {
						if (this.oneGoodList.goodsList.length > 0) {
							for (let m = 0; m < this.goodsCom.length; m++) {
								for (let i = 0; i < this.oneGoodList.goodsList.length; i++) {
									this.oneGoodList.goodsList[i].selected = true;
									if (this.goodsCom[m].id == this.oneGoodList.goodsList[i].id) {
										this.goodsCom[m].selected = true;
									}
								}
							}
						}
						if (this.oneGoodList.child && this.oneGoodList.child.length > 0) {
							for (let m = 0; m < this.goodsCom.length; m++) {
								for (let i = 0; i < this.oneGoodList.child.length; i++) {
									for (
										let j = 0;
										j < this.oneGoodList.child[i].goodsList.length;
										j++
									) {
										this.oneGoodList.child[i].goodsList[j].selected = true;
										if (
											this.goodsCom[m].id ==
											this.oneGoodList.child[i].goodsList[j].id
										) {
											this.goodsCom[m].selected = true;
										}
									}
								}
							}
						}
					}
				}
			}
		},
		//显示一级分类
		showOneArea(e) {
			e.stopPropagation();
			this.twoArea.twoAreaBtn = false;
			this.oneArea.oneAreaBtn = !this.oneArea.oneAreaBtn;
		},
		//显示二级分类
		showTwoArea(e) {
			e.stopPropagation();
			if (this.L1ID == 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '请先选择一个一级分类'
				});
				return false;
			}
			this.oneArea.oneAreaBtn = false;
			this.twoArea.twoAreaBtn = !this.twoArea.twoAreaBtn;
		},
		//选择一级分类
		selectOneArea(index, item) {
			this.search = '';
			//判断选择的是否是全部商品
			for (let i = 0; i < this.oneArea.oneAreaList.length; i++) {
				this.oneArea.oneAreaList[i].selected = false;
			}
			item.selected = true;
			this.oneArea.oneAreaBtn = false;
			//选择一级，清空所选二级
			this.twoArea.twoAreaName = '请选择二级分类';
			this.L1ID = item.id;
			this.L2ID = 0;
			if (index == 0) {
				//若选择一级分类下的全部，为选择全部商品，包含一级分类下的和二级分类下的商品
				this.allGood = true;
				this.goodsCom = this.goodList;
				this.oneArea.oneAreaName = '全部';
			} else {
				this.allGood = false;
				this.oneArea.oneAreaName = item.name;
				this.oneArea.oneAreaIndex = index;
				let goodList = this.goodList;
				item.goodsList = [];
				//初始化二级分类，且让一级分类中的菜品为空
				this.twoArea.twoAreaList = [{ id: '0', name: '全部二级分类' }];
				for (let i = 0; i < item.child.length; i++) {
					item.child[i].selected = false; //让所有的二级分类都处于未选中状态
					this.twoArea.twoAreaList.push(item.child[i]);
					item.child[i].goodsList = [];
				}
				//引入一级分类和二级分类的数据，把对应的菜品加入到各个分类中
				for (let j = 0; j < goodList.length; j++) {
					for (let k = 0; k < goodList[j].cids.length; k++) {
						//如果一级id等于商品中的所属分类id，加入一级分类的goodsList中
						if (item.id == goodList[j].cids[k]) {
							item.goodsList.push(goodList[j]);
						}
						for (let i = 0; i < item.child.length; i++) {
							//如果二级级id等于商品中的所属分类id，加入二级级分类的goodsList中
							if (item.child[i].id == goodList[j].cids[k]) {
								item.child[i].goodsList.push(goodList[j]);
							}
						}
					}
				}
				this.oneGoodList = item;
				this.newOneGoodList = item; //复制一个显示的列表，搜索二级分类时使用
			}
		},
		//选择二级分类
		selectTwoArea(index, item) {
			this.search = '';
			this.twoArea.twoAreaName = item.name;
			//单选
			let twoList = this.twoArea.twoAreaList;
			for (let i = 0; i < twoList.length; i++) {
				twoList[i].selected = false;
			}
			item.selected = true;
			this.twoArea.twoAreaBtn = false;
			let dowArr = this.newOneGoodList;
			let selectArr = {};
			if (item.id == 0) {
				dowArr.goodsList = [];
				this.oneGoodList = dowArr;
			} else {
				for (let i = 0; i < dowArr.child.length; i++) {
					if (item.id == dowArr.child[i].id) {
						selectArr = dowArr.child[i];
					}
				}
				this.oneGoodList = selectArr;
			}
			this.L2ID = item.id;
		},
		//获取分类列表
		async getOneAreaList() {
			this.oneArea.oneAreaList = [{ id: '0', name: '全部' }]; //分类列表
			let oneAreaList = [{ id: '0', name: '全部' }];
			//			let twoAreaList = [{ id: '0', name: '全部二级分类' }];
			let list;
			let areaList = storage.session('areaList');
			//如果存在保存的分类信息
			if (areaList) {
				list = areaList;
			} else {
				list = await http.getCategoryList({
					data: {}
				});
				storage.session('areaList', list);
			}
			//加上selected字段且把二级和一级各自放在各自的列表中
			for (let i = 0; i < list.length; i++) {
				list[i].selected = false;
				oneAreaList.push(list[i]);
			}
			this.oneArea.oneAreaList = oneAreaList;
		},

		myClick() {
			this.oneArea.oneAreaBtn = false;
			this.twoArea.twoAreaBtn = false;
		},
		//搜索功能
		searchGoods() {
			let secGoods = [];
			let list = this.goodList;
			for (let i = 0; i < list.length; i++) {
				let name = list[i].goodsName.toLowerCase();
				let search = this.search;
				if (name && name.indexOf(search) > -1) {
					secGoods.push(list[i]);
				}
			}
			this.goodsCom = secGoods;
			if (this.L1ID != 0) {
				this.L1ID = 0;
				this.L2ID = 0;
				this.oneArea.oneAreaName = '请选择一级分类';
				this.twoArea = {
					twoAreaBtn: false, //二级分类
					twoAreaName: '请选择二级分类',
					twoAreaIndex: -1, //分类下标
					twoAreaList: [{ id: '0', name: '全部二级分类' }] //二级分类列表
				};
				this.allGood = true;
				for (let i = 0; i < this.oneArea.oneAreaList.length; i++) {
					this.oneArea.oneAreaList[i].selected = false;
				}
			}
		}
	},
	watch: {
		goodList: {
			deep: true,
			handler: function(val) {
				let goodsCom = val;
				let arr = [];
				for (let i = 0; i < goodsCom.length; i++) {
					if (goodsCom[i].selected == true) {
						arr.push(goodsCom[i]);
					}
				}
				this.selectNum = arr.length;
			}
		},
		packlist: {
			deep: true,
			handler: function() {
				let newArr = [];
				let packlist = this.packlist;
				for (let i = 0; i < packlist.length; i++) {
					if (packlist[i].selected == true) {
						newArr.push(packlist[i]);
					}
				}
				this.selectPackNum = newArr.length;
			}
		}
	},
	destroyed() {
		document.removeEventListener('click', this.myClick); //去除绑定
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
	}
};
</script>
<style lang="less" scoped>
#configTan {
	width: 100%;
	height: 100%;
	padding: 30px 15px;
	background-color: #f2f2f2;
	min-height: 560px;
	.top {
		border: 1px solid #ff9801;
		cursor: pointer;
		box-sizing: border-box;
		margin-bottom: 20px;
		height: 42px;
		display: inline-block;
		.topT {
			width: 90px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			box-sizing: border-box;
			color: #ff9801;
			float: right;
		}
		.act {
			background-color: #ff9801;
			color: #fff;
		}
	}
	.tas-change {
		height: 40px;
		float: right;
		.tas-text {
			font-size: 16px;
			line-height: 40px;
			text-align: center;
		}
		input {
			display: inline-block;
			border: 1px solid #d4d4d4;
			height: 40px;
			outline: none;
			padding: 0;
			width: 65px;
		}
	}
	.neckTab {
		cursor: pointer;
		width: 100%;
		height: 26px;
		min-width: 600px;
		border-bottom: 1px solid #d4d4d4;
		margin-bottom: 20px;
		li {
			height: 27px;
			line-height: 27px;
			float: left;
			padding: 0 10px;
			margin: 0 28px -1px;
			color: #585757;
		}
		li.seleced {
			color: #00a1ea;
			border-bottom: 2px solid #00a1ea;
		}
	}
	.oCont{
		width: 100%;
		.Box {
			height: 42px;
			border: 1px solid #ff9801;
			cursor: pointer;
			box-sizing: border-box;
			width:160px;
			float: left;
			.oDe {
				width: 50%;
				height: 40px;
				line-height: 40px;
				text-align: center;
				float: left;
				border-left: 1px solid #ff9801;
				box-sizing: border-box;
				color: #ff9801;
			}
			.act {
				background-color: #ff9801;
				color: #fff;
			}
		}
		.noPackage{
			float: left;margin-left: 20px;
			.staList {
				position: relative;
				line-height: 41px;
				width: 210px;
			}
			.detLi {
				position: relative;
				cursor: pointer;
				/*.detImg {*/
					/*position: absolute;*/
					/*right: 0px;*/
					/*top: 15px;*/
				/*}*/
				.tableList {
					height: 40px;
					color: #666666;
					border: #b3b3b3 solid 1px;
					cursor: pointer;
					background: #fff;
					.oSpan {
						height: 39px;
						line-height: 39px;
						width: 165px;
						display: block;
						float: left;
						text-align: center;
						border-right: 1px solid #b3b3b3;
						overflow: hidden;
					}
					div {
						width: 40px;
						height: 40px;
						position: relative;
						z-index: 5;
						i {
							height: 10px;
							width: 10px;
							position: absolute;
							top: 50%;
							left: 50%;
							margin-top: -5px;
							margin-left: -5px;
							border-top: 10px solid #b3b3b3;
							border-left: 5px solid transparent;
							border-right: 5px solid transparent;
							box-sizing: border-box;
						}
					}
				}
				.detDiv {
					width: 450px;
					height: 250px;
					position: absolute;
					top: 45px;
					left: 0;
					padding: 10px;
					box-shadow: 3px 2px 10px #ccc;
					z-index: 15;
					background-color: #45404b;
					.detI {
						width: 0;
						height: 0;
						line-height: 0;
						position: absolute;
						top: -10px;
						left: 80px;
						border-width: 10px;
						border-top: 0px;
						border-style: solid;
						border-color: #fff #fff #45404b #fff;
					}
					/*.detH3 {*/
						/*height: 30px;*/
						/*line-height: 30px;*/
						/*text-align: left;*/
						/*color: #e6e6e7;*/
					/*}*/
					.shoName {
						height: 40px;
						line-height: 40px;
						border: 1px solid #f2f2f2;
						float: left;
						margin: 5px;
						color: #fff;
						padding: 0 10px;
					}
					.shoName-select-one {
						border-color: #ff9800;
						color: #ff9800;
					}
				}
			}
		}
		.isPackages{
			width:100%;height: 50px;overflow: hidden;padding-top:10px;
			.raduobtn {
				width: 100px;
				height: 40px;
				line-height: 40px;
				float: left;
				border-radius: 5px;
				margin-left: 10px;
				background-color: #fff;
				color: #333;
			}
			.selectbtn{
				background-color: #2fa8dd;
				color: #fff;
			}
		}

	}
	.aUl{
		width: 100%;
		height: auto;
		overflow: auto;
		padding: 10px;
		.aLi{
			padding: 0 15px;
			height: 40px;
			line-height: 40px;
			cursor: pointer;
			text-align: center;
			background-color: #fff;
			margin: 5px 10px;
			float: left;
			border: 1px solid #d2d2d2;
			color: #919191;
		}
		.shoName-select {
			border-color: #ff9800;
			background: url(../../../res/images/sign.png?18274) right bottom no-repeat;
		}
		.onecate {
			width: 100%;
			border-bottom: 1px solid #e3e3e3;
			height: auto;
			overflow: hidden;
			.onecataTitle {
				width: 115px;
				float: left;
				overflow: hidden;
				.oneI {
					background-color: #049fef;
				}
				.oneTitle {
					color: #049fef;
				}
				.twoI {
					width: 10px;
					height: 10px;
					background-color: #9f9f9f;
					margin: 20px 10px;
					float: left;
				}
				.twoTitle {
					width: 70px;
					height: 50px;
					line-height: 50px;
					float: left;
					font-weight: 800;
					color: #9f9f9f;
					overflow: hidden;
					vertical-align: middle;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
	.allX{
		width:100%;height: 40px;background-color: #f7f7f7;position: fixed;bottom: 50px;left: 0;
		.isallselect {
			cursor: pointer;
			width: 100px;
			height: 30px;
			float: left;
			line-height: 30px;
			text-align: center;
			margin: 5px;
			border: 1px solid #a0a0a0;
			color: #a0a0a0;
			float: left;
		}
		.allselect {
			border: 1px solid #ff9700;
			color: #ff9700;
		}
	}
}


/*.statisticsList ul {*/
	/*width: 100%;*/
	/*margin: 0;*/
	/*position: absolute;*/
	/*top: 43px;*/
	/*left: 0;*/
	/*z-index: 10;*/
	/*background: #fff;*/
/*}*/
/*.statisticsList ul li {*/
	/*text-align: center;*/
	/*height: 41px;*/
	/*border: 1px #b3b3b3 solid;*/
	/*border-top: 0;*/
	/*background: #fff;*/
	/*cursor: pointer;*/
/*}*/


/*.overHid {*/
	/*white-space: nowrap;*/
	/*overflow: hidden;*/
	/*text-overflow: ellipsis;*/
/*}*/

/*.selected {*/
	/*background: url(../../../res/icon/selected.png) center center no-repeat,*/
		/*#28a8e0;*/
/*}*/



/*.return {*/
	/*position: absolute;*/
	/*right: 100px;*/
	/*top: -50px;*/
	/*z-index: 2;*/
	/*width: 100px;*/
	/*line-height: 40px;*/
	/*text-align: center;*/
	/*border: 1px solid #ff8c01;*/
	/*color: #ff8c01;*/
	/*cursor: pointer;*/
	/*height: 40px;*/
/*}*/






/*.dis-type {*/
	/*background-color: #f2f2f2 !important;*/
	/*border: none !important;*/
/*}*/
</style>
