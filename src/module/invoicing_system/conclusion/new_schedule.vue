/* * @Author: zhouzhe * @Date: 2018-05-17 15:28:45 */

<template>
	<div>
		<div id="shipment" v-if="!slegoods">
			<div class="topBox">
				<div class="title">
					<i></i>
					<h3>新建调度</h3>
					<div class="dian" v-for="i in 70" :key="i"></div>
				</div>
				<div class="innerBox">
					<ul>
						<li>
							<span>申请单号：</span>
							<span>{{detailData.code}}</span>
						</li>
						<li>
							<span>审核状态：</span>
							<span>{{auditStatus[detailData.auditStatus-1]}}</span>
						</li>
						<li>
							<span>调度状态：</span>
							<span>{{dispatchStatus[detailData.dispatchStatus-1]}}</span>
						</li>
						<li>
							<span>入货仓库：</span>
							<span>{{detailData.wName}}</span>
							<img src="../../../res/images/examine.jpg" @click="examine(false)" alt="">
						</li>
						<li>
							<span>出货仓库：</span>
							<span>{{outWare.name}}</span>
							<img src="../../../res/images/examine.jpg" v-if="outWare" @click="examine(outWare)" alt="">
							<img src="../../../res/images/evret.jpg" @click="addShow = true" alt="">
						</li>
					</ul>
					<ul>
						<li>
							<span>申请人：</span>
							<span>{{detailData.createName||"--"}}</span>
						</li>
						<li>
							<span>申请时间：</span>
							<span>{{getTime(detailData.createTime)}}</span>
						</li>
						<li>
							<span>原因：</span>
							<span>{{detailData.reason||"--"}}</span>
						</li>
						<li>
							<span>备注：</span>
							<span>{{detailData.remark||"--"}}</span>
						</li>
					</ul>
				</div>
			</div>
			<ul class="tebBox">
				<li v-for="(item,index) in tebData" @click="tebClick(index)" :key="index" :class="{active:tabactive==index}">{{item}}</li>
				<div class="piceType" v-if="tabactive==1&&isBrand">
					<el-select v-model="picestyle" @change="picestyleChange" placeholder="分销价格切换">
						<el-option v-for="item in dispiceArr" :key="item.distributionId" :label="item.name" :value="Number(item.distributionId)"></el-option>
					</el-select>
				</div>
			</ul>

			<com-table :listName="`${tabactive?'物料':'商品'}列表`" :listWidth="1300" :listHeight="60" :titleData="titleList" :allTotal="introData.length" :introData="introData">
				<span slot="title-1" slot-scope="props">{{tabactive?'物料':'商品'}}名称</span>
				<span slot="list-4" slot-scope="props" class="detailsBtn" @click="autoFill">自动填充</span>
				<div slot="con-0" slot-scope="props">
					<span class="detailsBtn" :class="{'errbtn':props.data.errResion}" @click="chooseBatch(props.data)" style="text-decoration:none;">批次选择</span>
					<div class="delBtn" v-if="!props.data.noPrev">
						<span>|</span>&nbsp;
						<span class="del" @click="delData(props.index)">删除</span>
					</div>
				</div>
				<div class="inputBox" slot="con-4" slot-scope="props">
					<div v-if="props.data.errResion" class="errStyle">
						<span>!</span>{{props.data.errResion}}</div>
					<div class="inputBox" v-else>
						<div class="input-num">
							<el-input type="text" placeholder="" maxlength="9" :disabled="props.data.batchList.length>0&&props.data.outNum>0" v-model="props.data.outNum"
							    @input="outNumChange($event,props.data)"></el-input>
						</div>
						<div style="width:90px; display:inline-block;" v-if="props.data.unitList&&props.data.batchList.length==0">
							<el-select v-model="props.data.sleunitId" @change="getUnit(props.data)" :placeholder="props.data.selectName">
								<el-option v-for="item in props.data.unitArr" :key="item.muId" :label="item.name" :value="item.muId"></el-option>
							</el-select>
						</div>

						<!-- <selectBtn v-if="props.data.unitList&&props.data.batchList.length==0" :name="props.data.selectName" style="backgroundColor:#ffffff"
							@selOn="(res)=>getUnit(res,props.index)" :sorts="props.data.unitList" :width="'90'"></selectBtn> -->
						<span v-else :class="{active:props.data.batchList.length>0&&props.data.outNum>0}" class="unitBox">{{props.data.selectName}}</span>
					</div>
				</div>
				<!-- <span slot="con-3" slot-scope="props">{{parseInt(props.data.num/props.data.selectValue)}}{{props.data.selectName}}</span> -->
				<div slot="con-3" slot-scope="props" class="surplusBox">
					<span v-if="tabactive===0">{{props.data.num}}{{props.data.selectName}}</span>
					<span :title="setUnit(props.data.num,props.data.unitArr)" v-else>{{setUnit(props.data.num,props.data.unitArr,props.data.unitName)}}</span>
				</div>
				
				<div slot="con-5" slot-scope="props" class="surplusBox" v-if="isBrand&&tabactive==1">
					<div class="dispice">
						<span v-if="props.data.piceValue&&props.data.distributionId>=0">{{props.data.piceValue}}</span>
						<div class="input-num moveright" v-if="props.data.distributionId==-2">
							<el-input type="text" @change="props.data.piceValue.replace(/[^\d]/g,'')" placeholder="" maxlength="9" v-model="props.data.piceValue"></el-input>
						</div>
						<div class="slebox">
							<el-select v-model="props.data.distributionId" @change="piceChange(props.data)" placeholder="分销价格切换">
								<el-option v-for="item in props.data.rela" :key="item.distributionId" :label="item.distributionName" :value="Number(item.distributionId)"></el-option>
							</el-select>
						</div>
					</div>
				</div>
				<div slot="con-6" slot-scope="props" class="boxpice" v-if="isBrand&&tabactive==1">
					<el-select v-model="props.data.piceUnitid" :disabled="props.data.distributionId != -2" placeholder="单位">
						<el-option v-for="item in props.data.unitArr" :key="item.muId" :label="item.name" :value="item.muId"></el-option>
					</el-select>
				</div>
				<div :slot="isBrand&&tabactive===1? 'con-7':'con-5'" slot-scope="props" class="surplusBox">
					<span v-if="tabactive===0">{{props.data.surplus}}{{props.data.selectName}}</span>
					<span :title="setUnit(props.data.surplus,props.data.unitArr,props.data.unitName)" v-else>{{setUnit(props.data.surplus,props.data.unitArr,props.data.unitName)}}</span>
				</div>
			</com-table>
			<ul class="bottomBtn">
				<li @click="back">取消</li>
				<li @click="continued">继续添加调度单</li>
				<li @click="confirm">确定</li>
			</ul>
			<waremessage-win v-if="waremessage" :wid="sleWid" :width="500" :height="200" :title="'仓库信息'" @winEvent="waremessage=false"></waremessage-win>
			<add-store :pObj="comObj" v-if="addShow" @throwWin="throwWin"></add-store>
			<batchWin :needItem='checkList' :wid="outWare.id" :shopId="outWare.shopId" @throwWin="goodsthrowWin" v-if="showgoodswin"></batchWin>
			<clusion-supplies v-if="showsupplieswin" :wid="outWare.id" :shopId="outWare.shopId" :needItem='checkList' @throwWin="goodsthrowWin"></clusion-supplies>
		</div>
		<component :is="componentId" :dstShopId="detailData.shopId" :srcShopId="outWare.shopId" :shopId="outWare.shopId" :wid="outWare.id"
		    :sleCommodity="goodsArr" :sleSupplies="suppliesArr" @select="selectGoods" v-else></component>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import global from 'src/manager/global';
	export default {
		data() {
			return {
				componentId: '',
				tabactive: 0,
				tebData: ['商品', '物料'],
				waremessage: false,
				auditStatus: ['待审核', '已取消', '审核未通过', '审核通过'],
				dispatchStatus: ['未调度', '调度中', '未出货', '全部取消', '带入货', '已完成', '已完成（异常）'],
				titleList: [{
						titleName: '操作'
					},
					{
						titleName: '',
						dataName: 'itemName'
					},
					{
						titleName: '已出数量',
						dataName: 'eliteNum'
					},
					{
						titleName: '需求数量',
						dataName: 'num',
						sort: true
					},
					{
						titleName: '出货量',
						titleStyle: {
							'overflow': 'visible',
							'minWidth': '200px'
						}
					},
					{
						titleName: '库存余量',
						dataName: 'surplus',
						sort: true
					}
				],
				shoptitleList: [],
				introData: '', //列表显示数据
				detailData: '',
				slegoods: false, //显示选择商品物料
				comObj: '',
				addShow: false,
				sleWid: '',
				outWare: '',
				goodsArr: [], //商品数组
				suppliesArr: [], //物料数组
				getGoods: [], //已有商品
				getSupplies: [], //已有物料
				checkList: '', //选择的批次的商品或物料
				showgoodswin: false,
				showsupplieswin: false,
				itemList: {}, //传给后台的商品物料数据
				goodsoutedNum: '', //商品出货数据
				suppliesoutedNum: '', //物料出货数据
				dispiceArr: [], //分销价
				isBrand: false,
				picestyle: '' //选择的分销价
			};
		},
		methods: {
			async init() {
				if (this.detailData.itemList) {
					this.getSupplies = [];
					this.getGoods = [];
					let getGoods = this.detailData.itemList.goods;
					let getSupplies = this.detailData.itemList.material;
					let loseGoods = [];
					let loseSupplies = [];
					let data = await http.invoic_matchItemListWithOutgoingNum({
						data: {
							itemList: this.itemList,
							srcShopId: this.detailData.shopId,
							dstShopId: this.outWare.shopId,
							applyId: this.detailData.id
						}
					});
					if (data.goods && getGoods) { //处理商品数据
						for (let item of getGoods) {
							let check = true;
							for (let list of data.goods) {
								if (list.importId == item.itemId) {
									item.id = list.exportId;
									this.getGoods.push(item);
									check = false;
									break;
								}
							}
							if (check) {
								item.errResion = '无法匹配';
								this.setErr(data.goodsError, item, '商品');
								loseGoods.push(item);
							}
						}
						this.setOutNum(this.getGoods, false, 'itemName');
						await this.getgoodsSurplus(this.getGoods, 1);
						this.goodsArr = [...this.getGoods, ...loseGoods];
					}
					if (data.material && getSupplies) { //处理物料数据
						for (let item of getSupplies) {
							let check = true;
							item.selectValue = 1;
							for (let list of data.material) {
								if (list.importId == item.itemId) {
									item.itemId = list.exportId;
									check = false;
									if (item.unitRelation) {
										for (let unit of item.unitRelation) { //处理单位换算
											if (item.unitName == unit.name) {
												item.selectValue = unit.value;
											}
										}
									}
									this.getSupplies.push(item);
									break;
								}
							}
							if (check) {
								item.errResion = '无法匹配';
								this.setErr(data.materialError, item, '物料');
								loseSupplies.push(item);
							}
						}
						this.setOutNum(this.getSupplies, true, 'itemName');
						await this.getgoodsSurplus(this.getSupplies, 2);
						this.suppliesArr = [...this.getSupplies, ...loseSupplies];
					}
				}
			},
			setErr(obj, item, name) {
				let idType = name == '商品' ? 'goodsId' : 'id';
				let setErr = function (arr, item, str) {
					for (let list of arr) {
						if (list[idType] == item.itemId) {
							item.errResion = str;
							break;
						}
					}
				};
				for (let key in obj) {
					switch (key) {
						case 'nameError':
							setErr(obj[key], item, name + '无法匹配');
							break;
						case 'unitError':
							setErr(obj[key], item, '单位无法匹配');
							break;
						case 'typeError':
							setErr(obj[key], item, name + '类型匹配错误');
							break;
					}
				}
			},
			tebClick(index) {
				this.tabactive = index;
				if (index == 0) {
					this.introData = this.goodsArr;
					if(this.isBrand)this.titleList = this.shoptitleList;
				} else {
					this.introData = this.suppliesArr;
					if(this.isBrand)this.brandSettitle();
				}
			},
			examine(res) { //选择入货出货仓库点击事件
				if (res) {
					this.sleWid = res.id;
				} else {
					this.sleWid = this.detailData.wid;
				}
				this.waremessage = true;
			},
			selectGoods(sle) {
				this.slegoods = false;
				if (sle) this.setlistData(sle);
				this.titleBtn();
			},
			throwWin(str, res) {
				this.addShow = false;
				if (str == 'ok') {
					if (res.id == this.detailData.wid) {
						this.alert('出货仓库不能与入货仓库重复,请重新选择');
						this.addShow = true;
					} else {
						this.comObj.owner = res;
						this.outWare = res;
						this.detailData.outWare = this.outWare;
						storage.session('details',this.detailData);
						this.comObj = this.detailData.comObj;
						this.init();
					}
				}
			},
			back() {
				window.history.go(-1);
			},
			titleBtn() {
				this.$store.commit('setPageTools', [{
						name: '添加商品',
						className: ['wearhouse handle'],
						fn: () => {
							if (this.outWare) {
								this.slegoods = true;
								this.componentId = 'selectGoods';
							} else {
								this.alert('请选择出货仓库');
							}
						}
					},
					{
						name: '添加物料',
						className: ['wearhouse handle'],
						fn: () => {
							if (this.outWare) {
								this.slegoods = true;
								this.componentId = 'selectSupplies';
							} else {
								this.alert('请选择出货仓库');
							}
						}
					}
				]);
			},
			chooseBatch(item) { //批次选择
				if (item.errResion) return;
				if (this.tabactive == 0) {
					this.showgoodswin = true;
				} else {
					this.showsupplieswin = true;
				}
				this.checkList = item;
			},
			delData(index) {
				this.introData.splice(index, 1);
			},
			getTime(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd hh:mm');
			},
			setlistData(sle) { //选择的商品物料数据处理
				if (this.componentId == 'selectGoods') {
					for (let item of sle) {
						item.itemName = item.goodsName;
						item.id = item.gid;
						item.outNum = '';
						item.num = 0;
						item.selectName = item.unit;
						item.batchList = [];
						item.eliteNum = 0;
						item.eNum = 0;
					}
					this.setOutNum(sle, false, 'goodsName');
					this.goodsArr = [...this.getGoods, ...sle];
					if (this.tabactive == 0) {
						this.introData = this.goodsArr;
					}
				} else if (this.componentId == 'selectSupplies') {
					for (let item of sle) {
						item.itemName = item.name;
						item.outNum = '';
						item.num = 0;
						item.unitList = [];
						item.batchList = [];
						item.unitArr = item.unit;
						item.eNum = 0;
						item.itemId = item.id;
						item.eliteNum = 0;
						item.piceValue = 0;
						let newUnit = [];
						for (let arrUnit of item.unitArr) { //默认单位放在前面
							if (arrUnit.isDefault == 1) {
								newUnit.unshift(arrUnit);
								item.unitList.unshift(arrUnit.name);
							} else {
								newUnit.push(arrUnit);
								item.unitList.push(arrUnit.name);
							}
						}
						item.unit = newUnit;
						// for(let arr of item.unit){
						//   item.unitList.push(arr.name);
						// }
						item.selectName = item.unit[0].name;
						item.selectValue = item.unit[0].value;
					}
					console.log(sle);
					this.setOutNum(sle, true, 'name');
					this.suppliesArr = [...this.getSupplies, ...sle];
					this.getsuppliespice();
					this.picestyle = '';
					if (this.tabactive == 1) {
						this.introData = this.suppliesArr;
					}
				}
			},
			// getUnit(index, listIndex) { //物料单位选择下拉
			// 	let item = this.introData[listIndex];
			// 	// item.outNum = '';
			// 	this.$set(item, 'outNum', '');
			// 	item.selectName = this.introData[listIndex].unit[index].name;
			// 	item.selectValue = this.introData[listIndex].unit[index].value;
			// },
			getUnit(item) { //物料单位选择下拉
				// let item = this.introData[listIndex];
				// item.outNum = '';
				this.$set(item, 'outNum', '');
				for (let u of item.unitArr) {
					if (item.sleunitId == u.muId) {
						item.selectName = u.name;
						item.selectValue = u.value;
					}
				}
			},
			goodsthrowWin(str, list) { //商品批次选择
				this.showgoodswin = false;
				this.showsupplieswin = false;
				if (str == 'ok') {
					let total = 0;
					this.checkList.batchList = [];
					list.map(item => {
						if (item.outNum && Number(item.outNum) > 0) {
							this.checkList.batchList.push(item);
							total += Number(item.outNum);
						}
					});
					this.checkList.outNum = total;
				}
			},
			autoFill() { //自动填充
				for (let item of this.introData) {
					item.batchList = '';
					if (Number(item.num) > Number(item.surplus)) {
						if (item.outNum <= 0 || !item.outNum) item.outNum = this.tabactive == 1 ? parseInt((Number(item.surplus) -
							Number(item.eNum)) / Number(item.selectValue)) : Number(item.surplus) - Number(item.eNum);
					} else {
						if (item.outNum <= 0 || !item.outNum) item.outNum = this.tabactive == 1 ? parseInt((Number(item.num) -
							Number(item.eNum)) / Number(item.selectValue)) : Number(item.num) - Number(item.eNum);
					}
					if (item.outNum < 0 || isNaN(item.outNum)) item.outNum = 0;
				}
			},
			setUnit(num, unit, name) { //单位计算
				let def = '',
					min = '',
					value = 1;
				for (let item of unit) {
					if (item.isMin == 1) { //最小单位
						min = item.name;
					}
					if (typeof name === 'string' || typeof name === 'number') {
						if (item.name == name) { //选择单位
							def = item.name;
							value = item.value;
						}
					} else {
						if (item.isDefault == 1) { //选择单位
							def = item.name;
							value = item.value;
						}
					}
				}
				//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				return global.comUnit(num, value, def, min);
			},
			async getgoodsSurplus(adArr, type) { //获取库存余量
				let url = type == 1 ? 'invent_getGoodsNum' : 'invoiv_getMaterialNum';
				let arr = [];
				for (let item of adArr) {
					arr.push(item.id);
				}
				let sendObj = type == 1 ? {
					gids: arr.join(',')
				} : {
					mids: arr.join(',')
				};
				if (arr.length > 0) {
					let resNum = await http[url]({
						data: Object.assign(sendObj, {
							wid: this.outWare.id,
							shopId: this.outWare.shopId
						})
					});
					for (let i in adArr) {
						for (let item of resNum) {
							if (adArr[i].id == item.id) {
								adArr[i].surplus = item.surplus;
								if(type!=1) adArr[i].unitArr = item.unitData
							}
						}
					}
				}
				return adArr;
			},
			async getOutedNum() { //获取出货数量物料1 商品0
				let data = await http.All([{
						httpId: 'invoic_getItemNum',
						data: {
							applyId: this.detailData.id,
							choose: 0
						}
					},
					{
						httpId: 'invoic_getItemNum',
						data: {
							applyId: this.detailData.id,
							choose: 1
						}
					}
				]);
				this.goodsoutedNum = data[0].data;
				this.suppliesoutedNum = data[1].data;
			},
			setOutNum(needArr, type, str) { //匹配出货数量
				let numList = type ? this.suppliesoutedNum : this.goodsoutedNum;
				for (let item of needArr) {
					if (numList[item[str]]) {
						if (type) {
							item.eliteNum = this.setUnit(numList[item[str]].num, numList[item[str]].unitData, item.unitName);
							item.eNum = numList[item[str]].num;
						} else {
							item.eliteNum = `${numList[item[str]].num}${numList[item[str]].unit}`;
							item.eNum = numList[item[str]].num;
						}
					}
				}
			},
			outNumChange(e, item) {
				let res = /^\d*\.?\d+$/;
				item.outNum = res.test(item.outNum) ? item.outNum : 0;
				if (item.outNum != '') {
					if (this.tabactive == 0) {
						if (Number(item.outNum) > Number(item.surplus)) {
							item.outNum = item.surplus;
						}
					} else {
						if (Number(item.outNum) * Number(item.selectValue) > Number(item.surplus)) {
							item.outNum = parseInt(item.surplus / Number(item.selectValue));
						}
					}
					if (item.noPrev) {
						if (item.type == 1) {
							item.outNum = parseInt(item.outNum);
						} else {
							item.outNum = (item.outNum + '').replace(/^(\d*)\.?\d{4}$/g, parseInt(item.outNum * 1000) / 1000);
						}
					} else {
						if (item.unitList || item.type == 1) {
							item.outNum = (item.outNum + '').replace(/^(\d*)\.?\d{4}$/g, parseInt(item.outNum * 1000) / 1000);
						} else {
							item.outNum = parseInt(item.outNum);
						}
					}
					// item.outNum = e.target.value;
					// if(isNaN(item.outNum)) item.outNum = 0;
				}
				// console.dir(item)
				// e.target.value = item.outNum;
			},
			alert(con, title) {
				this.$store.commit('setWin', {
					title: title,
					winType: 'alert',
					content: con
				});
			},
			async continued() { //继续添加
				let check = await this.processingData();
				if (check) {
					for (let item of this.getSupplies) {
						item.outNum = '';
					}
					for (let item of this.getGoods) {
						item.outNum = '';
					}
					this.suppliesArr = this.getSupplies;
					this.goodsArr = this.getGoods;
					this.introData = this.tabactive == 0 ? this.goodsArr : this.suppliesArr;
					await this.getOutedNum();
					this.init();
				}
			},
			async confirm() { //确定
				let check = await this.processingData();
				if (check) {
					// this.$router.push({
					// 	path: '/admin/conclusionList'
					// });
					window.history.go(-1);
				}
			},
			processingData() {
				let goodsDetail = [];
				let materialDetail = [];
				for (let gitem of this.goodsArr) { //处理商品的数据
					if (gitem.outNum && Number(gitem.outNum) > 0) {
						let goodsObj = {
							id: gitem.id || gitem.gid,
						};
						if (gitem.batchList && gitem.batchList.length > 0) {
							for (let list of gitem.batchList) {
								if (Number(list.outNum) > 0) {
									Object.assign(goodsObj, {
										batchId: list.batchId,
										num: list.outNum
									});
									goodsDetail.push(utils.deepCopy(goodsObj));
								}
							}
						} else {
							Object.assign(goodsObj, {
								batchId: 0,
								num: gitem.outNum
							});
							goodsDetail.push(goodsObj);
						}
					}
				}
				for (let item of this.suppliesArr) { //处理物料的数据
					if (item.outNum && Number(item.outNum) > 0) {
						if(!item.piceValue&&this.isBrand&&item.isPurchase!==1&&item.piceValue!==0){
							this.$message.error('请选择分销价！');
							return;
						}
						if(!item.piceUnitid&&this.isBrand&&item.isPurchase!==1){
							this.$message.error('请选择分销价单位！');
							return;
						}
						if(!/^([+-]?)\d*\.?\d+$/.test(item.piceValue)){
							this.$message({
                                message: '请输入正确的分销价格！',
                                type: 'warning'
							});
							return;
						}
						let goodsObj = {
							mid: item.itemId,
							type: 0,
							selectUnitName: item.selectName
						};
						if(this.isBrand){
							Object.assign(goodsObj,{
								distributionPrice:item.piceValue,
								distributionUnit:item.piceUnitid== '等于进价'? 0:item.piceUnitid||0,
								isPurchase:item.isPurchase
							})
						}
						if (item.batchList && item.batchList.length > 0) {
							for (let list of item.batchList) {
								if (Number(list.outNum) > 0) {
									Object.assign(goodsObj, {
										batchId: list.batchId,
										num: list.outNum * Number(item.selectValue)
									});
									materialDetail.push(utils.deepCopy(goodsObj));
								}
							}
						} else {
							Object.assign(goodsObj, {
								batchId: 0,
								num: item.outNum * Number(item.selectValue)
							});
							materialDetail.push(goodsObj);
						}
					}
				}
				if (goodsDetail.length == 0 && materialDetail.length == 0) {
					this.alert('请选择调度商品');
					return false;
				}
				let obj = {
					receiptNumber: '',
					reason: this.detailData.reason,
					remark: this.detailData.remark,
					outWarehouse: this.outWare.id,
					intoWarehouse: this.detailData.wid,
					applyId: this.detailData.id,
					goodsDetail: goodsDetail,
					materialDetail: materialDetail
				};
				return this.addDispatch(obj);
			},
			async addDispatch(obj) {
				await http.invoic_addDispatchOrder({
					data: obj
				});
				this.alert('调度成功！');
				return true;
			},
			brandSettitle() {
				this.shoptitleList = utils.deepCopy(this.titleList);
				this.titleList.splice(5, 0, {
					titleName: '分销价格',
					titleStyle: {
						'minWidth': '200px'
					}
				}, {
					titleName: '价格单位',
					titleStyle: {
						'minWidth': '200px'
					}
				});
			},
			//获取分销价
			async getDistr() {
				let res = await http.invoicingGetDistributionConfig();
				res.map(v => {
					let obj = {};
					Object.assign(obj, {
						distributionId: v.id,
						value: '',
						name: v.name,
						unitId: ''
					});
					this.dispiceArr.push(obj);
				});
				this.dispiceArr = this.dispiceArr.concat([{
					distributionId: -1,
					value: 0,
					name: '等于进价',
					unitId: ''
				}, {
					distributionId: -2,
					value: 0,
					name: '自定义价格',
					unitId: ''
				}]);
			},
			//获取物料分销价
			async getsuppliespice() {
				let arr = [];
				this.suppliesArr.map(v => {
					arr.push(v.itemId);
				});
				let data = await http.materialGetDistributionByMids({
					data: {
						mids: arr.join(',')
					}
				});
				for (let item of data) {
					item.rela = item.rela.concat([{
						distributionId: -1,
						value: 0,
						distributionName: '等于进价',
						unitId: ''
					}, {
						distributionId: -2,
						value: 0,
						distributionName: '自定义价格',
						unitId: ''
					}]);

					for (let v of this.suppliesArr) {
						if (item.id == v.itemId) v.rela = item.rela;
					}
				}
			},
			picestyleChange(sle) {
				console.log(sle);
				this.suppliesArr.map(v => {
					let check = true;
					v.distributionId = Number(sle);
					v.piceUnitid = '';
					v.piceValue = 0;
					v.isPurchase = 0;
					if(sle!=-1){
						v.rela.map(s => {
							if (s.distributionId == v.distributionId) {
								check = false;
								v.piceValue = s.value;
								v.piceUnitid = s.unitId;
							}
						});
					}else{
						check = false;
						v.isPurchase = 1;
						v.piceValue = 0;
						v.piceUnitid = '等于进价';
					}
					
					if(check) v.distributionId = -2;//没有匹配到位自定义价格
				});
			},
			piceChange(data) {
				data.piceUnitid = '';
				data.piceValue = 0;
				data.isPurchase = 0;
				if (data.distributionId == -1) {
					data.isPurchase = 1;
					data.piceValue = 0;
					data.piceUnitid = '等于进价';
				} else {
					data.isPurchase = 0;
					data.rela.map(v => {
						if (v.distributionId == data.distributionId) {
							data.piceValue = v.value;
							data.piceUnitid = v.unitId;
						}
					})
				}
				console.log(data.piceUnitid);
				this.introData = utils.deepCopy(this.introData);
				this.suppliesArr = this.introData;
			}
		},
		async mounted() {
			this.detailData = storage.session('details');
			this.isBrand = storage.session('userShop').currentShop.ischain == '3'? true : false;
			if(this.isBrand) this.getDistr();
			this.outWare = this.detailData.outWare;
			this.comObj = this.detailData.comObj;
			this.itemList.goods = [];
			this.itemList.material = [];
			if (this.detailData.itemList) {
				if (this.detailData.itemList.goods) {
					for (let item of this.detailData.itemList.goods) {
						Object.assign(item, {
							noPrev: true,
							outNum: '',
							selectName: item.unitName,
							surplus: 0,
							batchList: [],
							id: item.itemId,
							eliteNum: 0,
							eNum: 0
						});
						let obj = {
							goodsId: item.itemId,
							itemName: item.itemName,
							unit: item.unitName,
							type: item.type == 1 ? 0 : 1,
							barCode: item.barCode
						};
						this.itemList.goods.push(obj);
					}
				}
				if (this.detailData.itemList.material) {
					for (let item of this.detailData.itemList.material) {
						Object.assign(item, {
							noPrev: true,
							outNum: '',
							selectName: item.unitName,
							surplus: 0,
							batchList: [],
							unitArr: item.unitRelation || [],
							id: item.itemId,
							eliteNum: 0,
							eNum: 0,
							piceValue:0
						});
						let obj = {
							id: item.itemId,
							name: item.itemName
						};
						this.itemList.material.push(obj);
					}
				}
			}
			this.titleBtn();
			await this.getOutedNum();
			await this.init();
			if(this.goodsArr.length>0){
				this.introData = this.goodsArr;
			}else{
				this.introData = this.suppliesArr;
				this.tabactive = 1;
				if(this.isBrand)this.brandSettitle();
			}
			if(this.isBrand) this.getsuppliespice();
		},
		destroyed() {
			// sessionStorage.removeItem('details');
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			// pageTurn: () =>
			//   import(/*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			waremessageWin: () =>
				import ( /*webpackChunkName: 'waremessage_win'*/ './waremessage_win'),
			batchWin: () =>
				import ( /*webpackChunkName: 'clusion_store_batch_win'*/ './clusion_store_batch_win'),
			clusionSupplies: () =>
				import ( /*webpackChunkName: 'clusion_supplies'*/ './clusion_supplies'),
			selectGoods: () =>
				import ( /*webpackChunkName: 'output_select_goods_ware'*/
					'src/module/invoicing_system/warehouse_manage/output_select_goods_ware'),
			selectSupplies: () =>
				import ( /*webpackChunkName: 'output_select_supplies_ware'*/
					'src/module/invoicing_system/warehouse_manage/output_select_supplies_ware'),
			addStore: () =>
				import ( /*webpackChunkName:'choose_warehouse__win'*/
					'src/module/invoicing_system/warehouse_manage/choose_warehouse_win'),
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		}
	};
</script>
<style lang='less' scoped>
	#shipment {
		.input-num {
			width: 60px; // height: 40px;
			display: inline-block;
			text-indent: 2px;
			outline: none;
			margin-left: 10px;
			
		}
		.moveright{
			position: relative;
			right: -3px;
		}
		.topBox {

			.title {
				width: 98%;
				height: 40px;
				margin: 10px;
				line-height: 40px;
				position: relative;
				overflow: hidden;
				i {
					width: 2px;
					height: 28px;
					position: absolute;
					top: 6px;
					left: 0;
					background-color: #28a8e0;
				}
				h3 {
					width: 70px;
					height: 40px;
					margin-left: 10px;
					float: left;
					font-size: 16px;
					font-family: "微软雅黑";
				}
			}
			.innerBox {
				padding-left: 50px;
				ul {
					display: inline-block;
					width: 32%;
					vertical-align: top;
					li {
						margin-bottom: 20px;
						span {
							display: inline-block;
							max-width: 70%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 16px;
						}
						img {
							cursor: pointer;
							margin-right: 10px;
							width: 18px;
							height: 18px;
							display: inline-block;
						}
					}
				}
			}
			.dian {
				width: 10px;
				height: 1px;
				border-top: 1px solid #e1e1e1;
				margin: 20px 5px;
				float: left;
			}
		}
		.tebBox {
			display: inline-block;
			color: orange;
			cursor: pointer;
			li {
				width: 120px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				border: 1px orange solid;
				display: inline-block;
			}
			.active {
				background-color: orange;
				color: #ffffff;
			}
			.piceType {
				display: inline-block;
				width: 200px;
				margin-left: 15px;
			}
		}
		.inputBox {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			.errStyle {
				color: red;
				span {
					display: inline-block;
					width: 14px;
					height: 14px;
					border-radius: 7px;
					background-color: red;
					color: #ffffff;
					text-align: center;
					margin-right: 5px;
					line-height: 14px;
				}
			}

			.active {
				background-color: #e5e5e0;
			}
			span {
				background-color: #ffffff;
			}
			.unitBox {
				display: inline-block;
				width: 40px;
				height: 40px;
				border: 1px #dcdfe6 solid;
				border-radius: 0 4px 0 4px;
				text-align: center;
				line-height: 36px;
				border-left: none;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		.boxpice {
			display: inline-block;
			width: 100px;
		}
		.surplusBox {
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;

		}
		.dispice {
			.slebox {
				width: 120px;
				display: inline-block;
			}
		}
		.line {
			text-decoration: underline;
			cursor: pointer;
		}
		.detailsBtn {
			color: #29abe2;
			.line;
		}
		.errbtn {
			color: #D1EDF9;
			.line;
		}
		.delBtn {
			display: inline-block;
			.del {
				color: red;
				cursor: pointer;
			}
		}
		.bottomBtn {
			margin-top: 40px;
			li {
				display: inline-block;
				width: 150px;
				height: 40px;
				margin-right: 10px;
				text-align: center;
				line-height: 40px;
				cursor: pointer;
				&:first-child {
					background-color: #dddddd;
					color: #ffffff;
				}
				&:nth-child(2) {
					border: 1px orange solid;
					color: orange;
				}
				&:nth-child(3) {
					background-color: orange;
					color: #ffffff;
				}
			}
		}
	}
</style>