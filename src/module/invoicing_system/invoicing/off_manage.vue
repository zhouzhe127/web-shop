<template>
	<section id="supplier" v-cloak>
		<section v-if="supplyShow">
			<div class="clearfix" style="margin-bottom: 20px;">
				<div class="fl">
					<!--<span class="topName">商品名</span><input v-model="search" type="text" style="width: 170px; height: 34px;" /><span></span>
                    <a style="background-color: #29A7E1;margin-left: -4px;vertical-align: middle;"href="javascript:void(0)"><span class="search"></span></a>-->
					<span class="sel" v-for="(item,index) in buttonList" v-bind:class="{'on':flag == index}" @click="light(index)" :key="index">{{item}}</span>
				</div>
				<div class="fr">
					<!--<h3>创建</h3>-->
					<!--<a @click="add" href="javascript:void(0);" class="blue" style="width: 200px;height: 45px;line-height: 45px;">
                        <img style="width:20px;height:20px;margin-top: 10px;" src="res/images/adds.png" alt="add" />
                        新增下架
                    </a>-->
					<a @click="add" href="javascript:void(0);" class="blue" style="width: 150px;height: 45px;line-height: 45px;position: relative;">
						<img style="width:20px;height:20px;position: absolute;top:12px;left: 20px;" src="../../../res/images/adds.png" alt="add" />
						<i style="position: absolute;left: 50px;top: 0;">新增下架</i>
					</a>
				</div>
			</div>
			<!--====================仓库耗损======================-->
			<div v-if="flag == 0" style="clear:both">
				<div class="homeTitle">
					<ul>
						<li>序号</li>
						<li>商品名</li>
						<li>条形码</li>
						<li>批次编码</li>
						<li>生产日期</li>
						<li>货架下架数量</li>
						<li>下架原因</li>
					</ul>
				</div>
				<!--列表内容 list-->
				<div class="homeList" v-for="(list,index) in newsupplyList" :key="index" v-bind:style="{'background-color': (index % 2 == 0) ? '#f2f2f2' : '#fff'}">
					<ol>
						<li>{{(index+1)+page*10}}</li>
						<li>{{list.goodsName}}</li>
						<li>{{list.barCode}}</li>
						<li v-if="list.code == ''">--</li>
						<li v-else>{{list.code}}</li>
						<li v-if="list.productionTime > 0">{{getTime(list.productionTime)}}</li>
						<li v-else>--</li>
						<li>{{addCount(list.num)}}</li>
						<li>{{list.cause}}</li>
					</ol>
				</div>
				<div v-if="supplyList == 0" id="emptyData">目前没有可操作数据</div>
				<!--列表表尾 标题 请求不到后台数据时不显示-->
				<div class="homeTitle">
					<ul>
						<li>序号</li>
						<li>商品名</li>
						<li>条形码</li>
						<li>批次编码</li>
						<li>生产日期</li>
						<li>货架下架数量</li>
						<li>下架原因</li>
					</ul>
				</div>
				<page-turn :page="page" :total='total' :len="10" style="float: right;margin-top: 10px;" @pageNum="pageChanged" v-if="total > 1"></page-turn>
			</div>

			<div v-else style="clear:both" class="shelfTitle">
				<div class="homeTitle">
					<ul>
						<li>序号</li>
						<li>商品名</li>
						<li>条形码</li>
						<li>下架耗损数量</li>
						<li>下架原因</li>
					</ul>
				</div>
				<!--列表内容list-->
				<div class="homeList" v-for="(list,index) in newshelfList" :key="index" v-bind:style="{'background-color': (index % 2 == 0) ? '#f2f2f2' : '#fff'}">
					<ol>
						<li>{{(index+1)+page1*10}}</li>
						<li>{{list.goodsName}}</li>
						<li v-if="list.barCode == ''">--</li>
						<li v-else>{{list.barCode}}</li>
						<li>{{addCount(list.num)}}</li>
						<li>{{list.cause}}</li>
					</ol>
				</div>
				<div v-if="shelfList == 0" id="emptyData">目前没有可操作数据</div>
				<!--列表表尾 标题--请求不到后台数据时不显示-->
				<div class="homeTitle">
					<ul>
						<li>序号</li>
						<li>商品名</li>
						<li>条形码</li>
						<li>下架耗损数量</li>
						<li>下架原因</li>
					</ul>
				</div>
			</div>
			<page-turn :page="page1" :total='total1' :len="10" style="float: right;margin-top: 10px;" @pageNum="pageChanged1" v-if="total1 > 1 && pageShow"></page-turn>
		</section>

		<!--新增耗损-->

		<section v-if="addSupply" style="margin-top: 20px;margin-left: 50px;min-width: 1100px;padding-bottom: 44px">
			<section class="titleTop" style="width:100%;height:40px;">
				<div style="width:100%;height:40px;margin:10px;line-height: 40px;position: relative;">
					<i style="width:2px;height:28px;position: absolute;top:6px;left:0;background-color:#28A8E0 ;"></i>
					<h3 style="width:73px;height:40px;margin-left: 10px;float: left;">新增下架</h3>
					<div class="dian" v-for="i in 32" :key="i"></div>
				</div>
			</section>
			<div class="info-content userinfo">
				<label v-if="reduce" class="content-box" style="margin-top: 30px;">
					<span class="required">下架类型</span>
					<!--<sd-select :sorts.sync="wearType" :selected.sync="wearId" :name.sync="defaultName" @click="selectWear"></sd-select>-->
					<section id="statisticsList" class="statisticsList" style="display: inline-block;vertical-align: middle;">
						<section @click="typeShow" class="tableListInp chairFix">
							<span style="padding-left: 8px;height: 40px;width: 200px;display: block;float: left;text-align: left;border-right: 1px #B3B3B3 solid;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{defaultName}}</span>
							<div class="fl">
								<i></i>
							</div>
						</section>
						<ul v-if="typeUl" class="tableListUl">
							<li @click="selectWear(index,item)" v-for='(item,index) in wearType' :key="index">{{item}}</li>
						</ul>
					</section>
				</label>
				<label v-else class="content-box" style="margin-top: 10px;">
					<span class="required icon-none" style="color: #ccc;">下架类型</span>
					<section class="tableListInp chairFix" style="border: 1px solid #ccc;">
						<span style="height: 39px;width: 240px;display: block;float: left;padding-left: 10px; color: #ccc;">
							仓库下架
						</span>
					</section>
				</label>

				<label v-if="reduce" class="content-box">
					<span class="required">商品选择</span>
					<section class="tableListInp chairFix" @click="shopSelect">
						<span style="height: 39px;width: 200px;display: block;float: left;padding-left: 10px;border-right: 1px #B3B3B3 solid;">
							{{shopName}}
						</span>
						<div class="fl">
							<span style="font-size: 30px;text-align: center;width: 100%;display: inline-block;color: #b2b2b2;line-height: 30px;">+</span>
						</div>
					</section>
				</label>
				<label v-else class="content-box">
					<span class="required icon-none" style="color: #ccc;">商品选择</span>
					<section class="tableListInp chairFix" style="border: 1px solid #ccc;">
						<span style="height: 39px;width: 240px;display: block;float: left;padding-left: 10px; color: #ccc;">
							{{goodsName}}
						</span>
					</section>
				</label>

				<section v-if="reduce">
					<label v-if="batchShow" class="content-box">
						<span class="required">批次选择</span>
						<section class="tableListInp chairFix" @click="batchSelect">
							<span v-if="batchName == '--'" style="text-align: center;height: 39px;width: 200px;display: block;float: left;padding-left: 10px;border-right: 1px #B3B3B3 solid;">
								{{batchName}}
							</span>
							<span v-else style="height: 39px;width: 200px;display: block;float: left;padding-left: 10px;border-right: 1px #B3B3B3 solid;">
								{{batchName}}
							</span>
							<div class="fl">
								<!--<i></i>-->
								<span style="font-size: 30px;text-align: center;width: 100%;display: inline-block;color: #b2b2b2;line-height: 30px;">+</span>
							</div>
						</section>
					</label>
					<label v-else class="content-box">
						<span class="required icon-none" style="color: #ccc;">批次选择</span>
						<section class="tableListInp chairFix" style="border: 1px solid #ccc;">
							<span style="height: 39px;width: 240px;display: block;float: left;padding-left: 10px; color: #ccc;">
								请选择批次
							</span>
						</section>
					</label>
				</section>
				<section v-else>
					<label class="content-box">
						<span class="required icon-none" style="color: #ccc;">批次选择</span>
						<section class="tableListInp chairFix" style="border: 1px solid #ccc;">
							<span style="height: 39px;width: 240px;display: block;float: left;padding-left: 10px; color: #ccc;">
								{{code}}
							</span>
						</section>
					</label>
				</section>

				<label class="content-box">
					<span class="required">下架数量</span>
					<input v-model="totalNum" class="right" type="text" placeholder="请填写下架数量" maxlength="30" style="width: 233px;" />
					<!--<span v-if="batchShow" style="margin-left: 20px;" >总量：{{shopTotal===''? "0":shopTotal}}</span>-->
					<span style="margin-left: 20px;">总量：{{shelfTotal===''? "0":shelfTotal}}</span>
				</label>
				<label class="content-box">
					<span class="required">下架原因</span>
					<!--<sd-select :sorts.sync="caseList" :selected.sync="selected" :name.sync="selectName"></sd-select>-->
					<section id="statisticsList" class="statisticsList" style="display: inline-block;vertical-align: middle;">
						<section @click="loseShow" class="tableListInp chairFix">
							<span style="padding-left: 8px;height: 40px;width: 200px;display: block;float: left;text-align: left;border-right: 1px #B3B3B3 solid;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{selectName}}</span>
							<div class="fl">
								<i></i>
							</div>
						</section>
						<ul v-if="loseUl" class="tableListUl">
							<li @click="loseSel(item.id,item.name)" v-for='(item,index) in caseAll' :key="index">{{item.name}}</li>
						</ul>
					</section>
				</label>
			</div>
			<div style="margin-top: 50px;margin-left: 120px;">
				<a href="javascript:void(0);" class="gray" style="width: 120px;margin-right: 20px;" @click="cancel">取消</a>
				<a href="javascript:void(0);" class="yellow" style="width: 120px;margin-right: 20px;background: none;color: #f8941f;border: 1px solid #f8941f;" @click="comeon">继续下架</a>
				<a href="javascript:void(0);" class="yellow" style="width: 120px;" @click="save">确认下架</a>
			</div>
		</section>
		<transition name="fade">
			<manage-edit-win @closeWin="closeWin" v-if="editWin" v-bind="shopInfo"></manage-edit-win>
		</transition>

	</section>
</template>
<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	let offId = 0;
	export default {
		data() {
			return {
				supplyList: [], //仓库耗损
				shelfList: [], //货架耗损
				buttonList: ['下架到库存', '下架到耗损'],
				flag: 0, //当前选中按钮
				supplyShow: true, //耗损管理列表显示
				addSupply: false, //新增耗损
				wearType: ['下架到库存', '下架到耗损'],
				defaultName: '请选择下架类型',
				typeUl: false, //下架类型下拉框显示
				wearId: '', //选中的耗损类型
				batchShow: true, //批次选择是否可选
				isaddone: true, //商品与批次弹框切换
				caseAll: [], //耗损原因所有数据
				selectName: '请选择下架原因',
				loseUl: false, //原因下拉框显示
				reduce: true, //是否从库存中来耗损
				goodsName: '', //商品名称
				code: '', //批次
				loseNum: '', //耗损数量
				caseId: '', //选中的耗损原因id
				shopId: '', //弹框中选中的商品id
				batchId: '', //弹框选中的批次id
				shopNum: -1, //选中商品的索引
				batchNum: -1, //选中批次的索引
				shopName: '请选择下架商品', //选中的商品名称
				batchName: '请选择批次', //选中的批次 
				shopTotal: 0, //选中的商品批次总量 
				shelfTotal: 0, //选中的商品货架总量
				total: 0, // 总页数
				page: 0,
				count: 0, // 总记录条数
				num: 10, // 当前每页展示数量
				pageNum: 0, //当前页实际展示数量
				currentPage: 0, //当前展示的页数

				total1: 0, // 总页数
				page1: 0,
				count1: 0, // 总记录条数
				num1: 10, // 当前每页展示数量
				pageNum1: 0, //当前页实际展示数量
				currentPage1: 0, //当前展示的页数
				newsupplyList: [], //翻页仓库耗损数据
				newshelfList: [], //翻页货架耗损数据
				pageShow: false, //翻页显示
				goodsType: null, //判断是否为称重商品
				editWin: false, // 是否显示管理编辑弹框
				shopInfo: [],
			};
		},
		computed: {
			totalNum: {
				get() {
					return this.loseNum;
				},
				set(newValue) {
					//						this.loseNum = newValue;
					let pattern = /^[0-9]\d*\.?/;
					if(this.goodsType != 0) {
						this.loseNum = Math.floor(newValue * 1000) / 1000;
					} else {
						this.loseNum = parseInt(newValue);
					}
					if(!pattern.test(newValue)) {
						this.loseNum = 0;
					}
				}
			},
		},
		methods: {
			openBatchWin() {
				let obj = {
					shopNums: utils.deepCopy(this.shopNum), //选中商品的索引
					batchNums: utils.deepCopy(this.batchNum), //选中批次的索引
					batchIds: utils.deepCopy(this.batchId), //选中的批次id
					shopIds: utils.deepCopy(this.shopId), //选择的商品id
					shopNames: utils.deepCopy(this.shopName), //选中的商品名称
					batchNames: utils.deepCopy(this.batchName), //选中的批次名称
					shopTotals: utils.deepCopy(this.shopTotal), //选中的商品批次总量
					shelfTotals: utils.deepCopy(this.shelfTotal), //选中的商品货架总量
					batchShows: utils.deepCopy(this.batchShow), //判断选择的是仓库还是货架
					isaddones: false,
				};
				this.shopInfo = obj;
				this.editWin = true;
			},
			closeWin(val) {
				this.editWin = false;
				if(val) {
					this.shopId = val.shopId;
					this.shopNum = val.shopNum;
					this.batchNum = val.batchNum;
					this.shopName = val.shopName;
					this.batchName = val.batchName;
					this.shopTotal = val.shopTotal;
					this.shelfTotal = val.shelfTotal;
					this.batchId = val.batchId;
					if(val.openWin) {
						setTimeout(() => {
							this.openBatchWin();
						}, 30);
					}
				}
			},
			//获取日期
			getTime(time) {
				return utils.format(new Date(time * 1000), 'yyyy年MM月dd日');
			},
			addCount(num) { //增加小数点后两位
				num += '';
				num = num.replace(/[^0-9|\.]/g, '');
				if(/^0+/.test(num)) num = num.replace(/^0+/, '');
				if(!/\./.test(num)) num += '.000';
				if(/^\./.test(num)) num = '0' + num;
				num += '000';
				num = num.match(/\d+\.\d{3}/)[0];
				return num;
			},
			async init() {
				let res = await http.All([{
					data: {
						type: 2
					},
					httpId: 'getLossList',
					timeout: 20000
				}, {
					data: {
						type: 3
					},
					httpId: 'getLossList',
					timeout: 20000
				}]);
				this.supplyList = res[0].data;
				this.page = 0;
				this.total = Math.ceil(this.supplyList.length / this.num);
				this.count = this.supplyList.length;
				if(this.page >= this.total) {
					this.page = this.total - 1 >= 0 ? this.total - 1 : 0;
				} else {
					this.page = this.page;
				}
				this.newsupplyList = this.supplyList.slice(this.page * 10, this.page * 10 + 10);
				this.shelfList = res[1].data;
				this.page1 = 0;
				this.total1 = Math.ceil(this.shelfList.length / this.num1);
				this.count1 = this.shelfList.length;
				if(this.page1 >= this.total1) {
					this.page1 = this.total1 - 1 >= 0 ? this.total1 - 1 : 0;
				} else {
					this.page1 = this.page1;
				}
				this.newshelfList = this.shelfList.slice(this.page1 * 10, this.page1 * 10 + 10);
			},

			//点击下一页
			pageChanged(obj) {
				this.page = obj.page;
				this.newsupplyList = this.supplyList.slice((obj.page - 1) * 10, obj.page * 10);
			},
			//点击下一页
			pageChanged1(obj) {
				this.page1 = obj.page;
				this.newshelfList = this.shelfList.slice((obj.page - 1) * 10, obj.page * 10);
			},
			//原因列表

			async reason() {
				let res = await http.getCauseList({
					data: {
						type: 1
					}
				});
				this.caseAll.push(...res);
				this.caseAll = this.unique(this.caseAll);
			},
			unique(arr) {
				let result = [],
					isRepeated;
				for(let i = 0, len = arr.length; i < len; i++) {
					isRepeated = false;
					for(let j = 0, len = result.length; j < len; j++) {
						if(arr[i].name == result[j].name) {
							isRepeated = true;
							break;
						}
					}
					if(!isRepeated) {
						result.push(arr[i]);
					}
				}
				return result;
			},
			//耗损列表切换
			light(index) {
				this.flag = index;
				if(index == 1) {
					this.pageShow = true;
				} else {
					this.pageShow = false;
				}
			},
			//新增耗损
			add() {
				this.supplyShow = false;
				this.addSupply = true;
				this.returnInfo();
				this.reason();
			},
			//新增下架--耗损类型选择
			typeShow(e) {
				e.stopPropagation();
				this.loseUl = false;
				this.typeUl = !this.typeUl;
			},
			selectWear(index, name) {
				this.typeUl = false;
				this.wearId = index;
				this.defaultName = name;
				this.$watch('batchShow', function() {
					this.shopNum = -1;
					this.batchNum = -1;
					this.batchId = '';
					this.shopId = '';
					this.shopName = '请选择下架商品';
					this.batchName = '请选择批次';
					this.shopTotal = 0;
					this.shelfTotal = 0;
				});
				if(this.wearId == 1) {
					this.batchShow = false;
				} else {
					this.batchShow = true;
				}
			},
			//商品选择弹框
			shopSelect() {
				let obj = {
					shopNums: utils.deepCopy(this.shopNum), //选中商品的索引
					batchNums: utils.deepCopy(this.batchNum), //选中批次的索引
					batchIds: utils.deepCopy(this.batchId), //选中的批次id
					shopIds: utils.deepCopy(this.shopId), //选择的商品id
					shopNames: utils.deepCopy(this.shopName), //选中的商品名称
					batchNames: utils.deepCopy(this.batchName), //选中的批次名称
					shopTotals: utils.deepCopy(this.shopTotal), //选中的商品批次总量
					shelfTotals: utils.deepCopy(this.shelfTotal), //选中的商品货架总量
					batchShows: utils.deepCopy(this.batchShow), //判断选择的是仓库还是货架
					isaddones: true,
				};
				this.shopInfo = obj;
				this.editWin = true;
			},
			//批次选择弹框
			batchSelect() {
				this.openBatchWin();
			},
			//取消
			cancel() {
				this.supplyShow = true;
				this.addSupply = false;
			},
			//下架原因选择
			loseShow(e) {
				e.stopPropagation();
				this.typeUl = false;
				this.loseUl = !this.loseUl;
			},
			loseSel(id, name) {
				this.caseId = id;
				this.selectName = name;
				this.loseUl = false;
			},
			validata(content, title) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: content,
					title: title,
					timerPowerOff: 1000
				});
			},
			//保存
			async save() {
				if(this.wearId === '') {
					this.validata('请选择下架类型！');
					return false;
				}
				if(this.shopId === '') {
					this.validata('请选择商品！');
					return false;
				}
				if(this.batchShow) {
					if(this.batchId === '') {
						this.validata('请选择批次！');
						return false;
					}
				}
				if(this.loseNum === '' || this.loseNum == 0) {
					this.validata('请填写数量！');
					return false;
				}
				if(this.caseId === '') {
					this.validata('请选择下架原因！');
					return false;
				}

				if(this.wearId == 0) {
					offId = 2;
				}
				if(this.wearId == 1) {
					offId = 3;
				}
				if(this.loseNum > this.shelfTotal) {
					this.validata('下架数量不能大于总量');
					return false;
				}
				await http.getGoodsInventory({
					data: {
						type: offId,
						gid: this.shopId,
						num: this.loseNum,
						causeId: this.caseId,
						inid: this.batchId
					}
				});
				this.validata('您选择的商品下架成功');
				this.supplyShow = true;
				this.addSupply = false;
				this.init();
				this.returnInfo();
			},
			//继续下架
			async comeon() {
				if(this.wearId === '') {
					this.validata('请选择下架类型！');
					return false;
				}
				if(this.shopId === '') {
					this.validata('请选择商品！');
					return false;
				}
				if(this.batchShow) {
					if(this.batchId === '') {
						this.validata('请选择批次！');
						return false;
					}
				}
				if(this.loseNum === '' || this.loseNum == 0) {
					this.validata('请填写数量！');
					return false;
				}
				if(this.caseId === '') {
					this.validata('请选择下架原因！');
					return false;
				}

				if(this.wearId == 0) {
					offId = 2;
				}
				if(this.wearId == 1) {
					offId = 3;
				}
				if(this.loseNum > this.shelfTotal) {
					this.validata('下架数量不能大于总量');
					return false;
				}
				let res = await http.getGoodsInventory({
					data: {
						type: offId,
						gid: this.shopId,
						num: this.loseNum,
						causeId: this.caseId,
						inid: this.batchId
					}
				});
				this.validata('您选择的商品下架成功');
				this.supplyShow = false;
				this.addSupply = true;
				this.init();
				this.shelfTotal = res.shelfAmount;
				this.shopTotal = res.surplus;
				// sd.request({
				//     url: 'goodsinventory/down',
				//     type: 'bc'
				// }, {
				//     type: offId,
				//     gid: integer.shopId,
				//     num: integer.loseNum,
				//     causeId: integer.caseId,
				//     inid: integer.batchId
				// }, false, function(json) {
				//     if(json.error) {
				//         alert('错误提示', json.error.message);
				//     } else {
				//         alert('您选择的商品下架成功')
				//         integer.supplyShow = false;
				//         integer.addSupply = true;
				//         integer.init();
				//         integer.shelfTotal = json.data.shelfAmount;
				//         integer.shopTotal = json.data.surplus;
				//     }
				// }, function(json) {
				//     alert('错误提示', '请求失败');
				// }, 'post');
			},
			//清空数据
			returnInfo() {
				this.flag = 0;
				this.loseNum = '';
				this.shopId = '';
				this.caseId = '';
				this.batchId = '';
				this.shopNum = -1;
				this.batchNum = -1;
				this.shopName = '请选择下架商品';
				this.batchName = '请选择批次';
				this.selectName = '请选择下架原因';
				this.defaultName = '请选择下架类型';
				this.shopTotal = '';
				this.shelfTotal = '';
				this.batchShow = true;
				this.wearId = '';
			},
		},
		components: {
			'page-turn': () =>
				import( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			'manage-edit-win': () =>
				import( /*webpackChunkName: 'manage_edit_win'*/ './manage_edit_win')
		},
		mounted() {
			this.init();
			document.onclick = function() {
				this.typeUl = false;
				this.loseUl = false;
			};
		}
	};
</script>

<style type="text/css" scoped>
	#supplier {
		min-width: 1000px;
	}
	
	.homeTitle {
		background: #e6e6e6;
		height: 50px;
		line-height: 50px;
	}
	
	.homeList {
		background: #f2f2f2;
		border-bottom: 1px solid #fff;
		height: 50px;
		line-height: 50px;
		color: #7F7F7F;
	}
	
	.homeList ol li,
	.homeTitle ul li {
		overflow: hidden;
		height: 50px;
		float: left;
		width: 10%;
		text-align: center;
		font-size: 12px;
	}
	
	.homeList ol li:nth-child(3),
	.homeTitle ul li:nth-child(3) {
		width: 15%;
	}
	
	.homeList ol li:nth-child(4),
	.homeTitle ul li:nth-child(4) {
		width: 16%;
	}
	
	.homeList ol li:nth-child(5),
	.homeTitle ul li:nth-child(5) {
		width: 17%;
	}
	
	.homeList ol li:nth-child(7),
	.homeTitle ul li:nth-child(7) {
		width: 22%;
	}
	
	#emptyData {
		margin: 0 auto;
		text-align: center;
		height: 50px;
		line-height: 50px;
		color: orange;
	}
	
	.search {
		float: left;
		width: 44px;
		height: 40px;
		background-color: #29A7E1;
		background: url(../../../res/images/search.png) center center no-repeat;
		cursor: pointer;
	}
	
	#supplier .topName {
		display: inline-block;
		width: 50px;
		height: 40px;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 40px;
		border-right: none;
		vertical-align: middle;
	}
	
	.homeList .infoDetail a {
		width: 33.3%;
		float: left;
	}
	
	.dian {
		width: 10px;
		height: 1px;
		border-top: 1px solid #E1E1E1;
		margin: 20px 5px;
		float: left;
	}
	
	.content-box .required {
		display: inline-block;
		font-size: 14px;
		margin-right: 17px;
		width: 150px;
		text-align: right;
	}
	
	.content-box input {
		width: 220px;
		height: 40px;
		font-size: 14px;
		padding-left: 8px;
		outline: none;
		border: 1px solid #b1b1b1;
	}
	
	.content-box {
		min-width: 400px;
		max-width: 1100px;
		/*height: 40px;*/
		line-height: 40px;
		margin-bottom: 15px;
	}
	
	label.content-box {
		display: block;
	}
	
	.content-box .required {
		display: inline-block;
		font-size: 16px;
		margin-right: 17px;
		width: 100px;
		text-align: right;
	}
	
	.content-box .icon-none:after {
		display: none;
	}
	
	.content-box .icon-none {
		padding-right: 9px;
	}
	
	.sel {
		display: inline-block;
		width: 120px;
		height: 40px;
		font-size: 16px;
		background: #f2f2f2;
		border-radius: 3px;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		margin-right: 10px;
	}
	
	.on {
		background: #28a8e0;
		color: #fff;
	}
	
	.shelfTitle ol li,
	.shelfTitle ul li {
		width: 19%;
	}
	
	.shelfTitle ol li:nth-child(5),
	.shelfTitle ul li:nth-child(5) {
		width: 25%;
	}
	
	.shelfTitle ol li:nth-child(3),
	.shelfTitle ul li:nth-child(3) {
		width: 21%;
	}
	
	.tableListInp {
		color: #666666;
		border: #b3b3b3 solid 1px;
		height: 40px;
		cursor: pointer;
		display: inline-block;
		vertical-align: middle;
	}
	
	.tableListInp div {
		width: 41px;
		height: 40px;
		position: relative;
		z-index: 5;
	}
	
	.tableListInp div i {
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
	
	.tableListInp {
		height: 42px;
	}
	
	.tableListInp span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.tableListUl li {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.content-box .statisticsList {
		position: relative;
		line-height: 42px;
		font-size: 16px;
		text-align: left;
	}
	
	.content-box .statisticsList ul {
		width: 100%;
		margin: 0;
		position: absolute;
		top: 44px;
		left: 0;
		z-index: 10;
		background: #fff;
		max-height: 164px;
		overflow: auto;
	}
	
	.content-box .statisticsList .encrypty {
		height: 200px;
		overflow-y: scroll;
	}
	
	.content-box .statisticsList ul li {
		text-align: center;
		height: 41px;
		border: 1px #b3b3b3 solid;
		border-top: 0;
		background: #fff;
		cursor: pointer;
	}
	
	.content-box .statisticsList ul li:hover {
		background: #f1f1f1;
	}
</style>