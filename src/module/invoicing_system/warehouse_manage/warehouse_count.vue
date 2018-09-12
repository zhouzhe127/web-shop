<template>
	<!--
        @baichuan:曾伟福
        @file:盘库
    -->
	<div id="warehouse-count">
		<div class="split-title">
			盘库
			<span class="slide-up" @click="slideUp=!slideUp">{{slideUp ? '收起' : '展开'}}</span>
		</div>
		<div class="detail-body">
			<li class="small-li">物料名称&nbsp;:&nbsp;{{material.name}}</li>
			<li>分类&nbsp;:&nbsp;
				<i v-for="(cate,index) in material.cate" :key="index">{{cate.name}}<i v-if="index!=material.cate.length-1">,</i></i>
			</li>
			<li>备注
				<input type="text" class="note" placeholder="请填写备注信息,限40字以内" v-model="remark" maxlength="40">
			</li>
			<template v-if="slideUp">
				<li class="small-li">物料简码&nbsp;:&nbsp;{{material.BC}}</li>
				<li>物料单位&nbsp;:&nbsp;
					<i v-for="(unit,index) in material.unit" :key="index">{{unit.name}}<i v-if="index!=material.unit.length-1">,</i></i>
				</li>
				<li :class="{'to-block':material.unit.length>2}">单位换算&nbsp;:&nbsp;
					<i v-for="(unit,index) in material.unit" :key="index" v-if="material.unit.length>1 ">
                        1{{unit.name}}={{unit.value}}{{material.minUnit}}
                        <i v-if="index!=material.unit.length-1">|</i>
					</i>
					<i v-for="(unit,index) in material.unit" :key="index" v-if="material.unit.length==1">
                        1{{unit.name}}={{unit.value}}{{unit.name}}
                    </i>
				</li>
				<li class="small-li">品牌&nbsp;:&nbsp;{{material.brandName}}</li>
				<li>默认单位&nbsp;:&nbsp;
					<i v-for="(unit,index) in material.unit" :key="index" v-if="unit.isDefault==1">{{unit.name}}</i>
				</li>
				<li>操作人&nbsp;:&nbsp;{{userName}}</li>
				<li class="small-li">保质期&nbsp;:&nbsp;{{material.validity}}{{material.validityName}}</li>
				<li>最小单位&nbsp;:&nbsp;
					<i v-for="(unit,index) in material.unit" :key="index" v-if="unit.isMin==1">{{unit.name}}</i>
				</li>
			</template>
		</div>
		<div class="filter-condition">
			<div class="hide-content">
				<div class="inline-block">
					{{cond[selectCond]}}:
					<calendar :pObj="startTime" @throwTime="(res)=>{getTime('startTime',res)}" style="vertical-align:middle;"></calendar>
					&nbsp;-&nbsp;
					<calendar :pObj="endTime" @throwTime="(res)=>{getTime('endTime',res)}" style="vertical-align:middle;"></calendar>
				</div>
				<div class="inline-block">
					<mul-select :width="180" :sorts="cond" :name="cond[selectCond]" @emit="getCondIndex"></mul-select>
					<input type="text" class="input input-common" v-model="searchCode" placeholder="请输入批次编号">
					<input type="text" class="input input-common" v-model="searchSupplier" placeholder="请输入供应商">
				</div>
				<div class="inline-block">
					<span class="blue btn-common filter-btn" @click="filterMaterialList(null)">筛选</span>
					<span class="gray btn-common" @click="resetData">重置</span>
					<div class="unit-change">
						<mul-select :width="180" :sorts="relationUnitName" :name="'单位切换'" @emit="getSelectUnit"></mul-select>
					</div>
				</div>
			</div>
		</div>
		<div style="overflow:auto;">
			<div class="table">
				<div class="table-title">
					批次列表<span class="circle"></span>共<span class="tips-num">{{tempList.length}}</span>个条目
				</div>
				<div class="table-head">
					<li>序号</li>
					<li>批次编码</li>
					<li class="big-li">现库存数量/重量</li>
					<li class="big-li">盘点数量/重量</li>
					<li>生产日期</li>
					<li class="big-li">供应商</li>
					<li>进价</li>
					<li>所属仓库</li>
				</div>
				<div class="table-body">
					<div class="table-row" v-for="(item,index) in nowList" :key="index" :class="{'error-flag':item.errorFlag}">
						<li>{{item.itemIndex}}</li>
						<li>{{item.batchCode}}</li>
						<li class="big-li">{{item.NewSurplus}}</li>
						<li class="big-li">
							<div class="input-div">
								<input type="text" v-model="item.maxNum" maxlength="9" placeholder="输入数字">
								<span :title="selectUnit.name">{{selectUnit.name}}</span>
							</div>
							<template v-if="materialMinUnit.id!=selectUnit.id">
								+
							</template>
							<div class="input-div" v-show="materialMinUnit.id!=selectUnit.id">
								<input type="text" v-model="item.minNum" maxlength="9" placeholder="输入数字">
								<span :title="materialMinUnit.name">{{materialMinUnit.name}}</span>
							</div>
						</li>
						<li>{{item.productionTime | formatTimeStamp}}</li>
						<li class="big-li">{{item.supplier}}</li>
						<li>{{item.purchasePrice}}&nbsp;/&nbsp;{{item.purchaseUnit ? item.purchaseUnit.name : '--'}}</li>
						<li>{{item.wName}}&nbsp;/&nbsp;{{item.aName}}</li>
					</div>
				</div>
				<div class="tip-div" v-if="tempList.length==0">
					无批次信息
				</div>
			</div>
		</div>
		
		<div class="page-container">
			<pageElement @pageNum="funGetPageNum" :page="currentPage" :total="total" :num="num" :isNoPaging='false' :isNoJump="true"></pageElement>
		</div>
	</div>
</template>
<script>
	/*
		1)顺序
	*/
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				validityTypeArr: [
					{id: 0,name: '月'},
					{id: 1,name: '日'},
					{id: 2,name: '年'},
				],
				startTime: {
					show: true,
					detail: true,
					width: 160,
					time: '',
				},
				endTime: {
					show: true,
					detail: true,
					width: 160,
					time: '',
				},
				slideUp: true,
				materialId: '', //物料id  371,40
				userName: '', //操作人
				remark: '', //备注

				//物料详情
				material: {
					brand: {}, //品牌名
					cate: [], //物料分类
					unit: []
				}, 

				cond: ['更新日期', '生产日期'], //过滤条件
				selectCond: 0, //选中的过滤条件索引

				selectBrand: {}, //选择的品牌

				//物料批次列表
				materialList: [], //物料列表
				nowList: [], //当前展示的物料
				tempList: [], //筛选之后的批次列表

				searchCode: '', //搜索编码
				searchSupplier: '', //搜索供应商

				currentPage: 1, // 当前第几页 必传
				total: 0, // 总页数 必传
				num: 10, //每页显示的数量,可不传，默认10，若自己的页面不想显示10条，必传
				numArr: [10, 20, 30, 40], //每页显示多少的数组，可不传，有默认值 格式[10,20,30,40]

				relationUnit: [], //该物料可选的单位
				relationUnitName: [], //该物料可选的单位的名字,只是起显示作用
				selectUnit: {
					id: '',
					name: '',
					value: ''
				}, //当前选择的单位
				materialMinUnit: {
					id: '',
					name: '',
					value: ''
				} //最小单位
			};
		},
		methods: {
			//获取单位切换中的单位
			getSelectUnit(index) {
				let unitName = this.relationUnitName[index];
				this.relationUnit.some((ele) => {
					if(ele.name == unitName) {
						this.selectUnit = {
							id: ele.muId,
							name: ele.name,
							value: ele.value
						};
						return true;
					}
				});
				//格式化库存数量
				this.materialList = this.initSurplus(this.materialList);
			},
			//获取搜索条件索引
			getCondIndex(index) {
				this.selectCond = Number(index);
			},
			getTime(flag,time){
				this[flag].time = Number(time);
			},

			//搜索物料批次
			filterMaterialList(flag) {
				let tempList = [];
				this.currentPage = 1;
				if(!flag){
					tempList = this.filterMaterialListByTime(this.materialList, this.startTime.time, this.endTime.time);
				}else{
					tempList.push(...this.materialList);
				}
				this.searchCode = this.searchCode.trim();
				this.searchSupplier = this.searchSupplier.trim();
				if(this.searchCode) {
					tempList = this.filterMaterialListByCode(tempList, this.searchCode);
				}
				if(this.searchSupplier) {
					tempList = this.filterMaterialListBySupplier(tempList, this.searchSupplier);
				}
				this.tempList = tempList;
				this.tempList = this.markItemIndex(this.tempList);			
				this.initPage(this.tempList, this.currentPage, this.num);
			},
			filterMaterialListByTime(list, startTime, endTime) {
				let tempList = list.filter((ele) => {
					let attr = '';
					attr = !this.selectCond ? 'updateTime' : 'productionTime';
					let productionTime = Number(ele[attr]) * 1000;
					if(startTime <= productionTime && productionTime < endTime) {
						return true;
					}
				});
				return tempList;
			},
			filterMaterialListByCode(list, code) {
				code = code.trim();
				if(!code) return list;
				let tempList = list.filter((ele) => {
					if(ele.batchCode.includes(code)) {
						return true;
					}
				});
				return tempList;
			},
			filterMaterialListBySupplier(list, supplier) {
				supplier = supplier.trim();
				if(!supplier) return list;
				let tempList = list.filter((ele) => {
					if(ele.supplier.includes(supplier)) {
						return true;
					}
				});
				return tempList;
			},
			//重置
			resetData() {
				this.initTime();
				this.searchCode = '';
				this.searchSupplier = '';
				this.selectCond = 0;
				this.filterMaterialList(true);
				this.currentPage = 1;
			},
			//---------------------------分页---------------------------
			funGetPageNum(obj) {
				this.currentPage = Number(obj.page);
				if(this.num != obj.num){
					this.num = Number(obj.num);
					this.total = Math.ceil(this.tempList/this.num);
				}
				this.initPage(this.tempList, this.currentPage, this.num);
			},
			initPage(list, page, num) {
				page = Number(page);
				num = Number(num);
				this.total = Math.ceil(list.length / this.num);
				let startIndex = (page - 1) * num;
				let endIndex = page * num;
				this.nowList = list.slice(startIndex, endIndex);
			},

			//-------------------utils---------------------
			filterValidyList(list){
				let arr = list.filter((ele) => {
					ele.maxNum = ele.maxNum.trim();
					ele.minNum = ele.minNum.trim();
					if(ele.maxNum != '' || ele.minNum != '') return true;
				});
				return arr;
			},
			//true表示数据不合格
			checkForm(list) {
				this.materialList = this.materialList.map((ele)=>{
					ele.errorFlag = false;
					return ele;
				});

				let arr = this.filterValidyList(list);
				let flag = arr.some((ele) => {
					let reg = /(^[-]?\d{1,9}(\.\d{1,3})?$)|(^[-]?0\.\d{1,3}$)/,
						reg2 = /(^[-]?\d{1,9}(\.\d{1,3})?$)|(^[-]?0\.\d{1,3}$)/,
						page = 0,//eslint-disable-line
						index = 0,
						bigNum = 0;
					index = Number(ele.itemIndex) -1;
					page = Math.ceil((index+1)/this.num);
					if( (ele.maxNum && !reg.test(ele.maxNum)) || (ele.minNum && !reg2.test(ele.minNum)) ) {
						ele.errorFlag = true;
						this.alert(`请输入数字,且最多含三位小数!`);

						this.initPage(this.tempList,page,this.num);
						this.currentPage = page;

						return true;
					}
					bigNum = Number(ele.maxNum)*this.selectUnit.value+Number(ele.minNum);
					if(bigNum > 999999999){
						ele.errorFlag = true;
						this.alert(`盘点数量过大!`);

						this.initPage(this.tempList,page,this.num);
						this.currentPage = page;

						
						return true;						
					}
					ele.errorFlag = false;
				});
				this.nowList.push(this.nowList.pop());
				return flag;
			},
			formatData(list) {
				let subData = {old:[],new:[]},
					arr = this.filterValidyList(list);
				
				for(let i = 0, len = arr.length; i < len; i++) {
					let temp = arr[i];
					let maxNum = Number(temp.maxNum);
					let minNum = Number(temp.minNum);
					let sum = maxNum * Number(this.selectUnit.value) + minNum;
					let {surplus} = temp;
					let obj = {
						batchId: temp.batchId,
						wid: temp.wid,
						areaId: temp.areaId,
						surplus: sum,
					};
					if(Number(sum) != Number(surplus)){
						subData.new.push(obj);
					}else{
						subData.old.push(obj);
					}
				}
				return subData;
			},

			async syncRequestMaterialDetail() {
				//material对象新增brandName(品牌名),validityName(保质期类型),minUnit(最小单位名)字段,只做显示
				let material = await this.getHttp('MaterialGetMaterialDetail',{mid:this.materialId});
				if((Array.isArray(material) && material.length == 0) || !material) {
					this.alert('该物料不存在!');
					return false;
				}
				//映射物料品牌名
				let brandList = await this.getHttp('InvoicingBrandList');
				brandList.some((ele) => {
					if(ele.id == material.brandId) {
						material.brandName = ele.name;
						return true;
					}
				});

				//映射保质期
				this.validityTypeArr.some((ele) => {
					if(ele.id == material.validityType) {
						material.validityName = ele.name;
						return true;
					}
				});

				//映射最小单位名,最小单位id
				material.unit || (material.unit = []);
				material.unit.some((ele) => {
					if(ele.isMin == 1) {
						material.minUnit = ele.name;
						material.minId = ele.muId;
						return true;
					}
				});

				this.material = material;

			},
			async syncInvoicingGetMaterialBatch() {
				let res = await this.getHttp('InvoicingGetMaterialBatch',{mid:this.materialId});
				if(!res) {
					return;
				}

				let {list=[],relation=[]} = res;
				this.relationUnit = relation;
				this.materialList = list;

				//生成唯一id
				this.materialList.map((ele,index)=>{
					ele.onlyId = index;
					return ele;
				});


				//映射可选单位名
				this.relationUnitName = this.relationUnit.map((ele) => {
					return ele.name;
				});

				//获取默认单位
				this.relationUnit.some((ele) => {
					if(ele.isDefault == 1) {
						this.selectUnit = {
							id: ele.muId,
							name: ele.name,
							value: ele.value
						};
						return true;
					}
				});

				//获取最小单位
				this.relationUnit.some((ele) => {
					if(ele.isMin == 1) {
						this.materialMinUnit = {
							id: ele.muId,
							name: ele.name,
							value: ele.value
						};
						return true;
					}
				});

				//格式化库存数量
				this.materialList = this.initSurplus(this.materialList);

				//筛选物料
				this.filterMaterialList(true);
			},
			markItemIndex(list){
				for(let i = 0,len = list.length;i<len;i++){
					let num = i+1;
					list[i].itemIndex = num< 10 ? '0'+num : num;
				}
				return list;
			},
			async getHttp(url,obj={}){
				let res = await http[url]({data:obj});
				return res;
			},
			initSurplus(materialList) {
				for(let i = 0, len = materialList.length; i < len; i++) {
					let temp = materialList[i];
					temp.NewSurplus = global.comUnit(temp.surplus, this.selectUnit.value, this.selectUnit.name, this.materialMinUnit.name);
					temp.maxNum = '';
					temp.minNum = '';
				}
				return materialList;
			},
			initBtn() {
				storage.session('tabactive', 1);
				storage.session('publicDetailReturn', true);

				this.$store.commit('setPageTools', [
					{name: '确定',className: ['btn-ok', 'yellow'],
						fn: () => {
							if(this.checkForm(this.tempList)) return;
							let obj = this.formatData(this.tempList);

							if(obj.new.length == 0 && obj.old.length > 0) {
								this.alert('盘点数量与库存数量一致!');
								return;
							}

							if(obj.new.length == 0 && obj.old.length == 0){
								this.alert('请先盘点数量!');
								return;
							}
							
							let subData = {
								mid:this.materialId,
								remark: this.remark,
								data:obj.new
							};

							this.getHttp('GoodsinventorySetInventory',subData).then((result) => {
								if(!result.res) {
									this.alert('盘库失败!');return;
								}
								let arr = obj.new;
								for(let i = 0, len = this.materialList.length; i < len; i++) {
									let temp = this.materialList[i];
									for(let j = 0, le = arr.length; j < le; j++) {
										if(temp.batchId == arr[j].batchId) {
											temp.surplus = arr[j].surplus;
											break;
										}
									}
								}
								this.materialList = this.initSurplus(this.materialList);
								let tempEle = this.nowList.pop();
								this.nowList.push(tempEle);
								this.alert('盘库成功!');
							});
						}
					},
					{
						name: '取消',
						className: ['btn-cancel', 'gray'],
						fn: () => {
							this.$router.go(-1);
						}
					},
				]);
			},
			initTime() {
				let date = new Date();
				let arr = [];
				arr[0] = date.getFullYear();
				arr[1] = date.getMonth();
				arr[2] = date.getDate();
				this.startTime.time = new Date(Number(arr[0]), Number(arr[1]), Number(arr[2]), 0, 0, 0).getTime();
				this.endTime.time = new Date(Number(arr[0]), Number(arr[1]), Number(arr[2]), 23, 59, 59).getTime();
			},
			initData() {
				let userDate = storage.session('userShop');
				this.userName = userDate.user.name;
				this.materialId = this.$route.query.id;
				this.initTime();
			},
			alert(content){
				this.$store.commit('setWin',{content,title:'温馨提示'});
			},
		},
		mounted() {
			this.initBtn();
			this.initData();
			this.syncRequestMaterialDetail();
			this.syncInvoicingGetMaterialBatch();
		},
		filters: {
			formatTimeStamp(time) {
				time = Number(time) * 1000;
				let date = new Date(time);
				let arr = [];
				arr[0] = date.getFullYear();
				arr[1] = date.getMonth();
				arr[2] = date.getDate();
				return arr[0] + '年' + (arr[1] + 1) + '月' + arr[2] + '日';
			},
		},
		components: {
			mulSelect: () =>
				import( /*webpackChunkName:'select_btn'*/ 'src/components/select_btn'),
			calendar: () =>
				import( /*webpackChunkName:'calendar_result'*/ 'src/components/calendar_result'),
			pageElement: () =>
				import( /*webpackChunkName:'page_element'*/ 'src/components/page_element')
		}
	};
</script>
<style lang='less' scoped>
	#warehouse-count {
		@b: 1px solid #ff0000;
		padding-bottom: 50px;
		@max-width: 1436px;
		/*颜色,高度,字体大小的设置*/
		.mixin(@color, @height, @size) {
			color: @color;
			height: @height;
			line-height: @height;
			font-size: @size;
		};
		.inline-block{
			display: inline-block;
			margin-top:12px;
		}
		.split-title {
			max-width: @max-width;
			text-indent: 15px;
			border-left: 2px solid #29a8e0;
			margin-bottom: 30px;
			min-width: 1300px;
			.mixin(#333, 30px, 16px);
			&:after {
				content: '';
				display: inline-block;
				border: 1px dashed #ddd;
				width: 90%;
				position: relative;
				left: 20px;
				top: -4px;
			}
			.slide-up {
				color: #29a8e0;
				margin-left: 10px;
				cursor: pointer;
				font-size: 16px;
			}
		}
		.detail-body {
			max-width: @max-width;
			padding: 0 0 25px 45px;
			overflow: auto;
			.to-block {
				display: inline-block;
				overflow: hidden;
				width: 100%;
			}
			li {
				padding: 0;
				margin: 0;
				height: 45px;
				color: #333;
				font-size: 16px;
				list-style: none;
				float: left;
				overflow: hidden;
				min-width: 300px;
				line-height: 45px;
				vertical-align: middle;
				overflow: hidden;
				width: 38%;
				i {
					font-size: 16px;
					color: #333;
				}
				.note {
					padding: 0;
					.mixin(#333, 40px, 16px);
					margin-left: 10px;
					max-width: 420px;
					min-width: 200px;
					width: 80%;
					display: inline-block;
					outline: none;
					text-indent: 15px;
				}
			}
			.small-li {
				width: 20%;
			}
		}
		.filter-condition {
			line-height: 40px;
			height: auto;
			color: #333;
			font-size: 16px;
			vertical-align: text-top;
			.input-common {
				width: 180px;
				margin-left: 12px;
				border: 1px solid #ccc;
				color: #333;
				font-size: 14px;
				vertical-align: bottom;
			}
			.btn-common {
				width: 100px;
				text-align: center;
				.mixin(#fff, 40px, 16px);
				display: inline-block;
				vertical-align: bottom;
			}
			.filter-btn {
				margin-right: 12px;
			}
			.unit-change {
				margin-left: 12px;
				display: inline-block;
			}
		}
		.table {
			max-width: @max-width;
			border: 1px solid #ccc;
			margin-top: 20px;
			width:@max-width;
			.table-title {
				.mixin(#333, 45px, 16px);
				text-indent: 15px;
				.circle {
					border: 2px solid #000;
					width: 1px;
					height: 1px;
					border-radius: 50%;
					display: inline-block;
					margin: 0 10px;
					vertical-align: middle;
					margin-top: -2px;
				}
				.tips-num {
					color: #ff0000;
					font-size: 16px;
				}
			}
			.table-head {
				height: 40px;
				background-color: #f2f2f2;
				overflow: hidden;
				li {
					list-style: none;
					.mixin(#333, 40px, 16px);
					min-width: 100px;
					width: 9.5%;
					display: inline-block;
					;
					text-align: center;
					vertical-align: middle;
					margin-left: -2px;
				}
				.big-li {
					min-width: 244px;
					width: 13%;
				}
			}
			.table-row {
				border-bottom: 2px solid #f2f2f2;
				height:70px;
				li {
					list-style: none;
					.mixin(#666666, 70px, 14px);
					display: inline-block;
					min-width: 100px;
					width: 9.5%;
					text-align: center;
					vertical-align: middle;
					margin-left: -2px;
					&:last-child {
						border: none;
					}
				}
				.big-li {
					min-width: 244px;
					width: 14%;
					line-height: 70px;
					color: #666666;
					font-size: 14px;
					.input-div {
						border: 1px solid #ccc;
						height: 40px;
						width: 110px;
						display: inline-block;
						vertical-align: middle;
						text-align: left;
						line-height: 40px;
						input {
							width: 70px;
							padding: 0;
							text-indent: 10px;
							.mixin(#333, 40px, 14px);
							height: 38px;
							vertical-align: top;
							outline: none;
							border: none;
						}
						span {
							float: right;
							height: 40px;
							width: 38px;
							text-align: center;
							.mixin(#666, 40px, 16px);
							border-left: 1px solid #ccc;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}
			.error-flag{
				box-shadow: rgb(255, 61, 4) 0px 0px 5px 0px;
			}
			.tip-div {
				height: 60px;
				line-height: 60px;
				text-align: center;
				vertical-align: middle;
				font-size: 18px;
				color: #999;
			}
		}
		.page-container {
			padding-top: 30px;
			padding-bottom: 30px;
		}
	}
</style>