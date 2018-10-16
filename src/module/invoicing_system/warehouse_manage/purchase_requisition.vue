<!--
	百川	   曾伟福
	file 入货申请单
 -->
<template>
    <div id="purchase-requisition">
        <div v-show="toggleCom">
            <div class="content-head">
                入货申请单
            </div>
            <div class="content-body">
                <div class="list-div">
                    <label>
                        原因
                        <span class="required-no"></span>
                    </label>
                    <input type="text" maxlength="20" v-model="subObj.reason" class="input-txt" placeholder="请输入原因">
                </div>
                <div class="tips-div">
                    <span class="icon"></span>
                    <span>限20字以内</span>
                </div>
                <div class="list-div">
                    <label>
                        申请单号
                        <span class="required-no"></span>
                    </label>
                    <input type="text"  maxlength="20" v-model="subObj.code" placeholder="请输入申请单号" class="input-txt">
                </div>
                <div class="tips-div marginB-10">
                    <span class="icon"></span>
                    <span>限20字以内,数字&nbsp;/&nbsp;字母</span>
                </div>
                <div class="list-div">
                    <label>
                        备注
                        <span class="required-no"></span>
                    </label>
                    <textarea  maxlength="40" v-model="subObj.remark" class="note" placeholder="请输入备注"></textarea>
                </div>       
                <div class="tips-div marginB-10">
                    <span class="icon"></span>
                    <span>限40字以内</span>
                </div>
                <div class="list-div marginB-20">
                    <label>
                        入货仓库
                        <span class="required"></span>
                    </label>
                    <div class="blue add-input input-txt" @click="openWin('chooseWarehouse')">
                        <span class="img"></span>
                        <span class="font">添加仓库</span>                       
                    </div>
                    <span class="select-tips" v-show="selectStore.id">(已选择的仓库&nbsp;:&nbsp;{{selectStore.name}})</span>
                </div>
                <div class="list-div marginB-20">
                    <label>
                        申请商品
                        <span class="required-no"></span>
                    </label>
                    <div class="blue add-input input-txt" @click="openWin('goods')">
                        <span class="img"></span>
                        <span class="font">添加商品</span>                     
                    </div>
                </div>
                <div class="list-div marginB-20">
                    <label>
                        申请物料
                        <span class="required-no"></span>
                    </label>
                    <div class="blue add-input input-txt" @click="openWin('material')">
                        <span class="img"></span>
                        <span class="font">添加物料</span> 
                    </div>
                </div>
            </div>
            <div class="tab-div" v-if="selectGoods.length>0 || selectMaterial.length>0">
                <span :class="{'select-tab':toggle}" @click="toggle=true">商品</span>
                <span :class="{'select-tab':!toggle}" @click="toggle=false">物料</span>
            </div>

            <div class="table-container" ref = "table" v-show="selectGoods.length>0 || selectMaterial.length>0">
                <div class="table-goods" v-show="toggle">
                    <div class="table-head">
                        商品列表
                        <span class="circle"></span>
                        共<span class="red-font">{{selectGoods.length}}</span>个条目
                    </div>
                    <div class="table-title">
                        <li v-for="(title,index) in goodsTitle" :key="index">{{title.titleName}}</li>
                    </div>
                    <div class="table-body">
                        <div v-for="(item,index) in selectGoods" :key="index" class="table-row" 
                        :style="{'box-shadow':item.errorBorder ? '0 0 5px 0 #ff3d04' :''}">
                            <li>
                                <span class="table-delete" @click="deleteItem(item,index)" >删除</span> 
                            </li>
                            <li>{{index>10 ? index+1 : '0'+(index+1)}}</li>
                            <li class="text-ellipsis" :title="item.goodsName">{{item.goodsName}}</li>
                            <li>{{item.storeNum}}</li>
                            <li>
                                <div class="table-col-div">
                                    <input type="text" placeholder="输入数字" v-model="item.needsNum">
                                    <span>{{item.unit}}</span>
                                </div>                                
                            </li>
                            <li>{{item.barCode}}</li>
                            <li>{{item.goodsType}}</li>
                        </div>
                    </div>
                    <div class="table-footer" v-show="selectGoods.length==0"></div>
                </div>

                <div class="table-material" v-show="!toggle">
                    <div class="table-head">
                        物料列表
                        <span class="circle"></span>
                        共<span class="red-font">{{selectMaterial.length}}</span>个条目
                    </div>
                    <div class="table-title">
                        <li v-for="(title,index) in materialTitle" :key="index">{{title.titleName}}</li>
                    </div>
                    <div class="table-body">
                        <div v-for="(item,index) in selectMaterial" :key="index" class="table-row" 
                        :style="{'box-shadow':item.errorBorder ? '0 0 5px 0 #ff3d04' :''}">
                            <li>
                                <span class="table-delete" @click="deleteItem(item,index)" >删除</span> 
                            </li>
                            <li>{{index>10 ? index+1 : "0"+(index+1)}}</li>
                            <li class="text-ellipsis" :title="item.name">{{item.name}}</li>
                            <li>{{item.storeNum}}</li>
                            <li>
                                <div class="table-col-div">
                                    <input type="text" placeholder="输入数字" v-model="item.needsNum">
                                    <span class="text-ellipsis" :title="item.unitTips.selUnitName">{{item.unitTips ? item.unitTips.selUnitName : '--'}}</span>
                                </div>                            
                            </li>
							<li>
								<el-select style="width:110px" v-model="item.unitTips.selUnitId" @change="(unitId)=>{getSelect(unitId,item)}"  placeholder="请选择">
									<el-option
									v-for="u in item.unit"
									:key="u.muId"
									:label="u.name"
									:value="u.muId">
									</el-option>
								</el-select>								
							</li>


                            <li>{{item.materialType}}</li>
                        </div>
                    </div>     
                    <div class="table-footer" v-show="selectMaterial.length==0"></div>
                </div>
            </div>

            <div class="footer-btn">
                <div class="gray btn-com" @click="clickBtn('cancel')">取消</div><div  @click="openWin('templateWin')" class="save"  v-if="selectGoods.length>0 || selectMaterial.length>0">{{subObj.templateId ? '覆盖模板' : '保存模板'}}</div><div class="yellow btn-com"  @click="clickBtn('ok')">确定</div>
            </div>

        </div>
        <div>
            <component
                :is="showCom"
                :pObj="comObj"
                @throwWin = "closeWin"
                @throwCommonWin = "closeWin"
            ></component>
            <goods-com  @select ="(res)=>{closeGoodsMaterial('goods',res)}" v-if="tabCom=='goods' && !toggleCom" :shopId="shopId" :sleCommodity ="selectGoods" :addBtn="false"></goods-com>
            <material-com  @select ="(res)=>{closeGoodsMaterial('material',res)}" v-if="tabCom=='material' && !toggleCom" :shopId="shopId" :sleSupplies ="selectMaterial" :addBtn="false"></material-com>
        </div>
    </div>
</template>
<script>
	/*
		    http:请求
		        warehouseList:仓库列表
		        addApplicationTemplate:进货申请模板
		        submitApplication:新建进货申请
		        getApplicationTemplate:根据模板Id获取模板详情
		        editApplicationTemplate:修改进货申请模板
		    1.当query对象中含有id字段时表示修改模板或修改申请,含tab时,tab=2表示修改模板,tab=1表示修改申请
		    2.物料,称重商品保留三位小数
		*/
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';
	export default {
		data() {
			return {
				isBrand: '',
				brandId: '', //品牌id
				shopId: '',
				userName: '', //当前操作人
				comObj: {},
				showCom: '',
				tabCom: '',											//组件的切换

				goodsType: ['普通商品', '称重商品', '自定义商品'],
				toggle: true, //选择物料,选择商品表格的切换				//true时展示商品
				toggleCom: true, //选择物料,选择商品页面的切换
				goodsTitle:[
					{titleName:'操作'},
					{titleName:'序号'},
					{titleName:'商品名称'},
					{titleName:'当前库存'},
					{titleName:'调度数量',},
					{titleName:'条形码'},
					{titleName:'类型'},
				],
				materialTitle:[
					{titleName:'操作'},
					{titleName:'序号'},
					{titleName:'物料名称',dataName:'name'},
					{titleName:'当前库存',dataName:'storeNum'},
					{titleName:'调度数量/重量',dataName:'name'},
					{titleName:'单位选择',dataName:'name'},
					{titleName:'类型',dataName:'materialtype'},
				],
				subObj: {
					reason: '', //原因
					code: '', //调度编号
					remark: '', //备注
					templateName: '', //模板名
					templateId: '', //模板id
					applicationId: '', //申请id(新建申请之后可以在本页面修该申请)
				},

				testObj: {}, //正则校验对象             
				warehoustList: [], //仓库列表

				selectStore: {}, //选择的仓库
				selectGoods: [], //选择的商品
				selectMaterial: [], //选择的物料

			};
		},
		methods: {
			//-----------------event---------------
			//获取选中的单位
			getSelect(unitId,ele) {
				let item = {};
				for(let e of ele.unit){
					if(e.muId == unitId){
						item = e;
						break;
					}
				}
				
				ele.needsNum = '';
				let goodsNum = ele.goodsNum ? ele.goodsNum.surplus : 0; //库存数量
				ele.unitTips.selUnitId = item.muId;
				ele.unitTips.selUnitVal = item.value;
				ele.unitTips.selUnitName = item.name;
				ele.storeNum = global.comUnit(goodsNum, ele.unitTips.selUnitVal, ele.unitTips.selUnitName, ele.unitTips.minName);
				this.selectMaterial.push(this.selectMaterial.pop());
			},
			//提交请求时的提示信息
			async createApplication(...args) {
				let [httpStr, strTips, tempObj, fn] = args;
				let result = await this.getHttp(httpStr, tempObj);
				if(fn) {
					fn(result, strTips);
				} else {
					if(typeof Number(result) == 'number') {
						this.subObj.applicationId = result;
						this.alert(strTips);
						this.$router.push({
							path: '/admin/schedulingApplication',
							query: this.$route
						});
					}
				}
			},
			async clickBtn(flag) {
				switch(flag) {
					case 'cancel':
						if(this.subObj.templateId) storage.session('tab', 2);
						if(this.subObj.applicationId) storage.session('tab', 1);
						let query = this.$route.query;
						delete query.id;
						this.$router.push({
							path: '/admin/schedulingApplication',
							query
						});
						break;
					case 'ok':
						if(!this.checkForm()) return;
						let tempObj = this.formatData();
						tempObj.createName = this.userName;
						tempObj.userName = this.userName;
						tempObj.supplierId = this.brandId;
						//修改申请
						if(this.subObj.applicationId) {
							tempObj.applyId = this.subObj.applicationId;
							this.alert('确认修改申请?', () => {
								this.createApplication('editApplication', '修改申请成功!', tempObj);
							});
						} else {
							//新建申请 
							this.createApplication('submitApplication', '新建申请成功!', tempObj);
						}

				}
			},
			async openWin(flag) {
				switch(flag) {
					case 'templateWin':
						if(!this.checkForm()) return;
						this.comObj = {
							title: this.subObj.templateId ? '修改模板' : '新建模板',
							tagName: '模板名称',
							name: this.subObj.templateId ? this.subObj.templateName : '',
							len: 20,
							tips: '请输入模板名称',
							btnOk: {
								content: '确认',
								style: 'backgroundColor:#f8931f'
							},
							btnCancel: {
								content: '取消',
								style: 'backgroundColor:#a0a0a0'
							},
						};
						this.showCom = flag;
						break;
					case 'chooseWarehouse': //选择仓库弹窗
						this.comObj = {
							allList: this.warehoustList,
							owner: this.selectStore.id ? this.selectStore : ''
						};
						this.showCom = flag;
						break;
					case 'goods': //添加商品                   
					case 'material': //选择物料
						this.toggleCom = false;
						this.tabCom = flag;
						break;
				}
			},
			async closeWin(res, obj) {
				switch(this.showCom) {
					case 'chooseWarehouse':
						if(res == 'ok' && !obj) {
							this.$store.commit('setWin', {
								content: '请选择仓库',
								title: '温馨提示'
							});
							return;
						}
						if(res == 'ok' && obj && typeof obj == 'object') this.selectStore = obj;
						this.showCom = '';
						this.toggleCom = true;
						break;
					case 'templateWin':
						if(obj != 'ok' || !res || !this.checkForm()) {
							this.showCom = '';
							return;
						}
						let templateName = res.name.trim();
						if(!templateName) {
							this.alert('请输入模板名称!');
							this.showCom = '';
							return;
						}
						let tempObj = this.formatData();
						tempObj.name = templateName;
						tempObj.userName = this.userName;
						tempObj.createName = this.userName;
						let httpStr, strTips;
						tempObj.supplierId = this.brandId;
						if(this.subObj.templateId) {
							tempObj.id = this.subObj.templateId;
							httpStr = 'editApplicationTemplate';
							strTips = '模板修改成功!';
						} else {
							httpStr = 'addApplicationTemplate';
							strTips = '模板保存成功!';
						}
						this.createApplication(httpStr, strTips, tempObj, (result, str) => {
							if(typeof result != 'object') {
								this.subObj.templateName = templateName;
								this.subObj.templateId = result;
								this.showCom = '';
								this.alert(str);
							}
						});
						break;
				}

			},
			closeGoodsMaterial(flag, res) {
				switch(flag) {
					case 'goods':
						if(Array.isArray(res)) {
							this.selectGoods = res;
							for(let ele of this.selectGoods) {
								if(!ele.needsNum) {
									ele.goodsType = this.goodsType[Number(ele.type)]; //商品类型     
									ele.needsNum = ''; //输入的申请数量           
									ele.storeNum = ele.goodsNum ? ele.goodsNum.surplus + ele.unit : 0; //库存数量+单位     
								}
							}
						}
						this.toggle = true;
						break;
					case 'material':
						if(Array.isArray(res)) {
							this.selectMaterial = [...res];
							for(let ele of this.selectMaterial) {
								ele.materialType = '物料';
								ele.toggle = false; //物料单位的切换
								if(!ele.needsNum) ele.needsNum = ''; //输入的申请数量
								//获取该物料的最小单位,默认单位,选中单位
								if(!ele.unitTips) {
									this.getUnitInfo(ele);
								}
								//当没有选择单位的时候,默认选择默认单位
								if(!ele.unitTips.selUnitId) {
									ele.unitTips.selUnitId = ele.unitTips.defaultId;
									ele.unitTips.selUnitName = ele.unitTips.defaultName;
									ele.unitTips.selUnitVal = ele.unitTips.defaultVal;

									let goodsNum = ele.goodsNum ? ele.goodsNum.surplus : 0;
									ele.storeNum = global.comUnit(goodsNum, ele.unitTips.selUnitVal, ele.unitTips.selUnitName, ele.unitTips.minName);
								}
							}
						}
						this.toggle = false;
						break;
				}
				this.toggleCom = true;
				this.tabCom = '';
				this.initBtn();
			},
			deleteItem(item) {
				let str = this.toggle ? 'selectGoods' : 'selectMaterial';
				this[str] = this[str].filter((ele) => {
					return ele.id != item.id;
				});
			},
			//-----------------     utils   ---------------
			alert(str, fn) {
				let obj = {
					content: str,
					title: '温馨提示'
				};
				if(fn) {
					obj = {
						content: str,
						title: '温馨提示',
						winType: 'confirm',
						callback: (res) => {
							if(res == 'ok') fn();
						}
					};
				}
				this.$store.commit('setWin', obj);
			},
			//校验时的提示信息
			checkTips(ele, bool, str) {
				ele.errorBorder = bool;
				if(ele.errorBorder) this.toggle = str == 'selectGoods';
				this[str].push(this[str].pop());
			},
			check(str) {
				for(let ele of this[str]) {
					ele.needsNum = ele.needsNum.trim();
					this.testObj = ele;
					let reg, pro;
					if(str == 'selectGoods') {
						if(ele.type == 0) {
							reg = /^[1-9]\d{0,8}$/;
							pro = '请输入1-9位的整数!';
						} else if(ele.type == 1) {
							reg = /((^[1-9]\d{0,8})|^0)(\.\d{1,3})?$/;
							pro = '请输入1-9位的数字,最多可含三位小数!';
						}
					} else if(str == 'selectMaterial') {
						reg = /((^[1-9]\d{0,8})|^0)(\.\d{1,3})?$/;
						pro = '请输入1-9位的数字,最多可含三位小数!';
					}
					if(!global.checkData({
						needsNum: {
							reg,
							pro
						}}, this.testObj)) {
						this.checkTips(ele, true, str);
						return;
					}

					if(Number(ele.needsNum) <= 0) {
						this.alert('请填写调度数量!');
						this.checkTips(ele, true, str);
						return;
					}
					if(Number(ele.needsNum) > 900000000) {
						this.alert('您所填写的数量过大,请重新填写!');
						this.checkTips(ele, true, str);
						return;
					}
					this.checkTips(ele, false, str);
				}
				return true;
			},
			checkForm() {
				for(let attr of ['code', 'remark', 'reason']) {
					this.subObj[attr] = this.subObj[attr].trim();
				}

				if(!global.checkData({
					code: {
						reg: /^[0-9a-zA-Z]{0,20}$/,
						pro: '单号由0-20个英文或数字组成',
					},
					remark: {
						cond: '$$.length<=40',
						pro: '备注40字以内!'
					}
				}, this.subObj)) return;

				if(!this.selectStore.id) {
					this.alert('请选择仓库!');
					return;
				}

				if(this.selectGoods.length == 0 && this.selectMaterial.length == 0) {
					this.alert('请选择商品或物料!');
					return;
				}

				if(!this.check('selectGoods') || !this.check('selectMaterial')) {
					return;
				}
				return true;
			},
			format(str, unitArr) {
				let arr = [];
				for(let ele of this[str]) {
					let temp = {
						itemId: ele.id,
					};
					// 1商品、2物料，3称重商品，
					if(unitArr) {
						temp.unit = '';
						temp.unitName = ele.unit;
						if(ele.type == 1) {
							temp.type = 3;
						} else if(ele.type == 0) {
							temp.type = 1;
						}
						temp.barCode = ele.barCode;
						temp.itemName = ele.goodsName;
						temp.num = ele.needsNum;
					} else {
						temp.unit = ele.unitTips.selUnitId;
						temp.unitName = ele.unitTips.selUnitName;
						temp.type = 2;
						temp.barCode = ele.barCode;
						temp.itemName = ele.name;
						let num = ele.needsNum * ele.unitTips.selUnitVal;
						temp.num = num.toFixed(3);
					}
					arr.push(temp);
				}
				return arr;
			},
			formatData() {
				let detail = [];
				detail.push(...this.format('selectGoods', true));
				detail.push(...this.format('selectMaterial'));

				let obj = {};
				let subObj = {};
				for(let key of ['code', 'remark', 'reason']) {
					subObj[key] = this.subObj[key];
				}
				Object.assign(obj, {
					wid: this.selectStore.id,
					detail,
					type: 1
				}, subObj);
				return obj;
			},
			async getHttp(url, obj = {}) {
				let res = await http[url]({
					data: obj
				});
				return res;
			},
			initBtn() {
				this.$store.commit('setPageTools', []);
			},
			async initSubObj() {
				let {
					id,
					tab
				} = this.$route.query;
				let str = '';
				if(id) {
					if(tab == 2) {
						str = 'templateId';
						await this.initTemplate({
							id
						}, 'getApplicationTemplate');
					}
					if(tab == 1) {
						str = 'applicationId';
						await this.initApplication({
							applyId: id
						}, 'invoic_getApplication');
					}
					if(id && tab) this.subObj[str] = id;
				}
				//获取与匹配仓库
				this.warehoustList = await this.getHttp('warehouseList');
				let brand = this.isBrand ? 'brandId' : 'shopId';
				this.warehoustList = this.filterStore(this.warehoustList, this.shopId, brand);
				if(this.selectStore.id) {
					for(let ele of this.warehoustList) {
						if(ele.id == this.selectStore.id) {
							this.selectStore = ele;
							this.selectStore.selected = true;
							break;
						}
					}
				}
			},
			//获取物料的单位信息
			getUnitInfo(ele) {
				ele.unitTips = {
					minId: '',
					minName: '',
					defaultName: '',
					defaultId: '',
					defaultVal: '',
					selUnitId: '', //选中的单位id
					selUnitName: '', //选中的单位名
					selUnitVal: '', //选中单位的换算     
				};
				ele.unit = Array.isArray(ele.unit) ? ele.unit : [];
				for(let u of ele.unit) {
					if(u.isMin == 1) {
						ele.unitTips.minId = u.muId;
						ele.unitTips.minName = u.name;
					}
					if(u.isDefault == 1) {
						ele.unitTips.defaultId = u.muId;
						ele.unitTips.defaultName = u.name;
						ele.unitTips.defaultVal = u.value;
					}
				}
			},
			//初始化模板,申请
			initSelectGoodsMaterial(arr = []) {
				for(let ele of arr) {
					ele.id = ele.itemId;
					ele.select = true;
					ele.needsNum = ele.num;

					ele.goodsNum = {
						surplus: ele.surplus,
						batch: ele.batchNum
					};
					if(ele.type == 1 || ele.type == 3) {
						ele.goodsName = ele.itemName;
						ele.gName = ele.itemName;
						let goodsType = ['普通商品', '物料', '称重商品'];
						ele.goodsType = goodsType[Number(ele.type) - 1];

						if(ele.type == 1) ele.type = 0;
						if(ele.type == 3) ele.type = 1;
						if(ele.type == 0) {
							ele.needsNum = Number(ele.num).toFixed() + '';
						} else if(ele.type == 1) {
							ele.needsNum = Number(ele.num).toFixed(3) + '';
						}
						ele.unit = ele.unitName;
						ele.storeNum = ele.goodsNum.surplus + ele.unit;

						this.selectGoods.push(ele);
					} else if(ele.type == 2) {
						ele.materialType = '物料';
						ele.type = 0;
						ele.name = ele.itemName;
						let selUnitId = ele.unit; //单位id
						ele.unit = [];
						if(Array.isArray(ele.unitRelation)) ele.unit = ele.unitRelation;
						this.getUnitInfo(ele);
						for(let u of ele.unit) {
							if(u.muId == selUnitId) {
								ele.unitTips.selUnitId = u.muId;
								ele.unitTips.selUnitName = u.name;
								ele.unitTips.selUnitVal = u.value;
							}
						}
						let needsNum = Number(ele.num) / ele.unitTips.selUnitVal;
						ele.needsNum = needsNum.toFixed(3) + '';
						ele.storeNum = global.comUnit(ele.surplus, ele.unitTips.selUnitVal, ele.unitTips.selUnitName, ele.unitTips.minName);
						this.selectMaterial.push(ele);
					}
				}
			},
			copyAttrs(genuine = {}, copy = {}, attrs = []) {
				if(attrs.length == 0) attrs = Object.keys(genuine);
				for(let key of attrs) {
					copy[key] = genuine[key];
				}
			},
			async initTemplate(submitObj, httpStr) {
				//修改,使用模板
				let res = await this.getHttp(httpStr, submitObj);
				if(res && typeof res == 'object') {
					this.copyAttrs(res.content, this.subObj, ['remark', 'reason']);
					this.selectStore.id = res.content.wid;
					this.subObj.templateName = res.name;
					let detail = [];
					if(Array.isArray(res.content.detail)) detail = res.content.detail;
					this.initSelectGoodsMaterial(detail);
					this.watchToggle();
				}
			},
			async initApplication(submitObj, httpStr) {
				//修改申请
				let res = await this.getHttp(httpStr, submitObj);
				if(!res || typeof res != 'object') return;
				this.copyAttrs(res, this.subObj, ['code', 'remark', 'reason']);
				this.selectStore.id = res.wid;
				if(!res.itemList) res.itemList = {};
				let {
					goods = [], material = []
				} = res.itemList;
				let detail = [];
				detail.push(...goods);
				detail.push(...material);
				this.initSelectGoodsMaterial(detail);
				this.watchToggle();
			},
			initData() {
				let userData = storage.session('userShop');
				this.userName = userData.user.name;
				this.isBrand = userData.currentShop.ischain == 3;
				this.shopId = userData.currentShop.id;
				let ischain = userData.currentShop.ischain;

				switch(ischain + '') {
					case '1':
					case '2':
						this.brandId = userData.currentShop.brandId;
						break;
					case '0':
					case '3':
						this.brandId = userData.currentShop.id;
						break;
				}
			},
			//品牌店铺的时候brandId匹配shopId,品牌店铺的shopId为0
			filterStore(list, id, str) {
				let arr = list.filter((ele) => {
					if((str == 'brandId') && (ele.shopId == 0)) {
						ele.ischain = 1;
						return ele[str] == id;
					} else if((str == 'shopId') && (ele.shopId != 0)) {
						ele.ischain = 0;
						return ele[str] == id;
					}
				});
				return arr;
			},
			watchToggle(){
				//监听显示物料,还是商品
				if(this.selectGoods.length == 0){
					this.toggle = false;
				}
				if(this.selectMaterial.length == 0){
					this.toggle = true;
				}
			},
		},
		async mounted() {
			this.initData();
			this.initSubObj();
		},
		destroyed() {
			delete this.$route.query.tab;
			delete this.$route.query.id;
		},
		components: {
			templateWin:
				() =>
				import( /*webpackChunkName:'unit_edit_create_win'*/ 'src/module/invoicing_system/warehouse_manage/unit_edit_create_win'),
			chooseWarehouse:
				() =>
				import( /*webpackChunkName:'choose_warehouse_win'*/ './choose_warehouse_win'),
			MaterialCom:
				() =>
				import( /*webpackChunkName:'output_select_supplies'*/ './output_select_supplies'),
			goodsCom:
				() =>
				import( /*webpackChunkName:'output_select_goods'*/ './output_select_goods'),
		},
	};
</script>
<style lang='less' scoped>
@import url('./z_less.less');
#purchase-requisition{
    .marginB-20{margin-bottom: 20px;}
    .marginB-10{margin-bottom: 10px;}
    @comWidth:113px;
    .content-head{
        .split-div;
    }

    //商品表格
    .table-container{
        overflow-x: auto;
    }
    .table-delete{
        .lfc(@r,70px,16px);
        text-align:center;
        cursor: pointer;
    }
    .table-col-div{
        display: inline-block;
        .whb(auto,40px,1px solid #ccc);
        background-color: #fff;
        vertical-align: middle;
        position: relative;
        input{
            .input-text(68px,38px,none);
            padding:0;
            padding-left:5px;
            margin:0;
            float:left;
            font-size: 14px;
            .text-ellipsis;
        }
        .small-input{
            width:38px;text-align:center;padding-left:0;
            color:#666;
        }
        span{
            .whb(40px,38px);
            border-left:1px solid #ccc;
            float:right;
            line-height: 38px;
            ul{
                margin:0;
                padding:0;
                position: absolute;
                margin-left:-40px;
                z-index:2;
                .whb(80px,auto);
                border-bottom: none;
                background: #f2f2f2;
                border-bottom:1px solid #ccc;
                &>li{
                    height:40px;
                    border:1px solid #ccc;
                    border-bottom:none;
                    text-align: center;
                    .lfc(#333,38px,14px);
                    cursor: pointer;
                }
                &>li:hover{
                    box-shadow: 0 0 3px 0 #ccc;
                }
            }
        }
        .icon{
            border:6px solid transparent;
            border-top:10px solid #ccc;
            position: relative;
            top: 14px;
        }
    }
    .table-head{
        height:45px;
        padding-left:20px;
        .lfc(#333,45px,16px);
        .circle{
            border-radius: 50%;
            display:inline-block;
            .whb(4px,4px);
            vertical-align: middle;
            background: #333;
            margin:0 3px;
        }
        .red-font{
            color:@r;
            font-size:16px;
        }
    }
    .title-common(@w:14.28%){
        .table-title{
            height:40px;
            background: #f2f2f2;
            &>li{
                float:left;
                .lfc(#333,40px,16px);
                list-style: none;
                width:@w;
                text-align: center;
                .text-ellipsis;
            }
            &:after{
                .clear;
            }
        }
    }
    .row-common(@w:14.28%){
        &>li{
            list-style: none;
            float:left;
            height:70px;
            .lfc(#666,70px,14px);
            list-style: none;
            text-align: center;
            width:@w;
        }
    }
    .table-footer{
        height:70px;
        text-align: center;
        &:after{
            content:'';
            display: inline-block;
            line-height: 70px;
            color: #666;
            font-size: 20px;
        }
    }
    .table-goods{
        width:1436px;
        border:1px solid #ccc;
        .title-common;
        .table-body{
            .table-row{
                &:hover{
                    background: #efefef;
                }
                .row-common;
                border-bottom:2px solid #f2f2f2;
                &:after{
                    .clear;
                }
            }
        }
    }
    .table-material{
        width:1436px;
        border:1px solid #ccc;
        .title-common;
        .table-body{
            .table-row{
                &:hover{
                    background: #efefef;
                }
                .row-common;
                border-bottom:2px solid #f2f2f2;
                &:after{
                    .clear;
                }
            }
        }        
    }
    //主体
    .content-body{
        margin-top:30px;
        .list-div{
            label{
                float: left;
                .whb(@comWidth,40px);
                .lfc(#333,40px,14px);
                padding-right:20px;
                text-align: right;
            }
            .input-txt{
                .input-text(210px);
                font-size:14px;
            }
            .note{
                .whb(210px,100px,1px solid #ccc);
                font-size:14px;
                resize: none;
                outline: none;
            }
            .add-input{
                display: inline-block;
                cursor: pointer;
                padding-left:50px;
                border:none;
                .img{
                    display: inline-block;
                    .whb(38px,38px);
                    margin-right:3px;
                    background: url('../../../res/images/add.png') center center no-repeat;
                }
                .font{
                    display: inline-block;
                    vertical-align: top;
                    .lfc(#fff,38px,14px);
                }
            }
            .select-tips{
                .whb(auto,40px);
                .lfc(#333,40px,14px);
            }
            &:after{
                .clear;
            }
        }
        .tips-div{
            height:40px;
            padding-left:@comWidth;
            .lfc(#a5a5a5,40px,14px);
            .icon{
                display: inline-block;
                height:38px;
                width:38px;
                vertical-align: middle;
                background: url('../../../res/images/handle-tips.png') center center no-repeat;
            }
        }
    }

    .footer-btn{
        padding-left:@comWidth;
        padding-top:15px;
        .save{
            .btn(200px,50px,16px,@y,1px solid @y);
            vertical-align: bottom;
        }
        .btn-com{
            .btn(200px,50px,16px,#fff);
        }
    }
}
</style>