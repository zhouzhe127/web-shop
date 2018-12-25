<!--
    **仓库列表
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="warehouse-lists">
        <div class="choose-btn">
            <el-radio-group v-model="toggleCom">
			    <el-radio-button label="0">仓库列表</el-radio-button>
			    <el-radio-button label="1">操作记录</el-radio-button>
			</el-radio-group>
        </div>
		<div v-if="toggleCom==0">
			<div class="filter">
				<div class="block">
					<div class="inline-box">
						<el-input v-model='code' placeholder="请输入仓库编号" class="el-input"></el-input>
					</div>
					<div class="inline-box">
						<el-input v-model='name' placeholder="请输入仓库名称" class="el-input"></el-input>
					</div>
					<div class="inline-box">
						<span class="inline-span">仓库所属：</span>
						<el-popover
							placement="bottom"
							width="500"
							v-model="visible"
							@hide="ownerClose"
							trigger="click">
							<div class="btn-box">
								<el-checkbox-group v-model="ownerSel">
									<div class="btn-cell" v-for="(item,index) in owner" :key="index">
										<el-checkbox :label="item.id" border>{{item.name}}</el-checkbox>
									</div>
								</el-checkbox-group>
							</div>
							<div class="sel-all">
								<el-button type="info" size="mini" @click="selOwnerAll">取消全部</el-button>
								<el-button type="primary" size="mini" @click="selOwnerAll(1)">选择全部</el-button>
							</div>
							<div class="handle">
								<el-button type="text" @click="ownerHandle">取消</el-button>
								<el-button type="primary" size="mini" @click="ownerHandle(1)">确认</el-button>
							</div>
							<el-input slot="reference" suffix-icon="el-icon-arrow-down" v-model="ownerName"
								 placeholder="请选择所属" class="el-input"></el-input>
						</el-popover>
					</div>
				</div>
				<div class="block">
					<div class="inline-box">
						仓库地址：
						<addressLinkage @emit="getAddress" :province="province" :city="city" :area="town"></addressLinkage>
					</div>
					<div class="inline-box">
						<el-input v-model='place' placeholder="请输入详细地址" class="el-input"></el-input>
					</div>
					<div class="inline-box input-check select-ban">
						<i @click="clickCheck" :class="{active:this.isShared === '0'}"></i>
						非共享
					</div>
					<div class="inline-box button-box">
						<el-button type="primary" @click="filterClick">筛选</el-button>
						<el-button type="info" @click="reset">重置</el-button>
					</div>
				</div>
			</div>
			<div class="main">
				<div class="list">
					<el-table :data="list" stripe border style="width:100%" :header-cell-style="{'background-color':'#f5f7fa'}">
					    <el-table-column prop="name" label="仓库名称" width="200">
					    </el-table-column>
					    <el-table-column label="共享状态" width="100">
					    	<template slot-scope="scope">
					        	{{setShared(scope.row.isShared)}}
					      	</template>
					    </el-table-column>
					    <el-table-column prop="code" label="仓库编号" width="200">
					    </el-table-column>
					    <el-table-column prop="ownerName" label="仓库所属" min-width="200">
					    </el-table-column>
					    <el-table-column prop="area.length" label="区域总数" width="100">
					    </el-table-column>
					    <el-table-column label="商品种类" width="100">
					    	<template slot-scope="scope">
					        	{{Number(scope.row.KindWeightKg||scope.row.kindWeightKg) + Number(scope.row.kindGoods) + Number(scope.row.kindWeightG)}}
					      	</template>
					    </el-table-column>
					    <el-table-column prop="kindMaterial" label="物料种类" width="100">
					    </el-table-column>
					    <el-table-column label="仓库地址" min-width="200">
					    	<template slot-scope="scope">
					        	{{scope.row.provinceName}} {{scope.row.cityName}} {{scope.row.townName}} {{scope.row.place}}
					      	</template>
					    </el-table-column>
					    <el-table-column label="操作" fixed="right" width="150">
					    	<template slot-scope="scope">
					        	<el-button @click="listHandle(scope.row)" type="text">查看详情</el-button>
					      	</template>
					    </el-table-column>
				  	</el-table>
				</div>
				<div class="page-box">
					<el-pagination @current-change="(res)=>{pageChange(res,1)}" @size-change="pageChange"
						:current-page="page"
						background
						layout="sizes,total,prev, pager, next"
						:page-sizes="[10, 20, 50]"
						:total="listLength">
					</el-pagination>
				</div>
			</div>
		</div>
		<operation-com v-if="toggleCom==1"></operation-com>
	</div>
</template>
<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';

	let areaCn = null;

	export default {
		data() {
			return {
				allList: [], //仓库列表
				filterList: [], //筛选后的列表
				list: [], //处理后的最终列表
				listLength: 0, //列表长度
				page: 1,
				showNum: 10, //每页显示多少条数据
				pageTotal: 1, //总页数
				province: '',
				city: '',
				town: '',
				provinceName: '',
				cityName: '',
				townName: '',
				place: '', //详细地址
				isShared: '', //是否共享 ''都有 1共享 0非共享
				owner: '', //仓库所属
				ownerName:'',//选择的所属名称
				ownerSel:[],//选择仓库所属
				ownerArr:[],//用于筛选的仓库所属
				visible:false,//选择所属是否显示
				dropName: '请选择所属', //选择所属提示
				code: '', //仓库编号
				name: '', //仓库名称
				filterObj: '', //缓存参数
				userData: '', //店铺数据
				brandId: '', //品牌id
				toggleCom: 0, //默认展示仓库列表
			};
		},
		components: {
			pageBtn: () =>
				import( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			addressLinkage: () =>
				import( /*webpackChunkName: 'address_linkage'*/ 'src/components/address_linkage'),
			operationCom: () =>
				import( /*webpackChunkName: 'operation'*/ './warehouse_operation')
		},
		created() {
			this.userData = storage.session('userShop');
		},
		mounted() {
			if(this.userData.currentShop.ischain == '3') {
				this.brandId = this.userData.currentShop.id;
			}
			this.initBtn();
			this.getRequest();
			this.getList();

			let tab = storage.session('warehouseManagerTab');
			if(tab == 1) {
				this.toggleCom = tab;
				storage.session('warehouseManagerTab', null);
			}
		},
		methods: {
			initBtn() {
				let arr = [
					{name: '查看全部',className: 'primary',type:5,
						fn: () => {
							storage.session('warehouseListsRequest', this.filterObj);
							this.$router.push({
								path: 'warehouseList/searchGoods',
								query: this.$route.query
							});
						}
					},
					{name: '新建仓库',className: 'primary',type:4,
						fn: () => {
							this.$router.push({
								path: 'warehouseList/create',
								query: this.$route.query
							});
						}
					},
				];
				this.$store.commit('setPageTools', arr);
			},
			listHandle(item) { //列表点击操作
				storage.session('warehouseListsRequest', this.filterObj);
				this.$route.query.id = item.id; //带上仓库id
				this.$router.push({
					path: 'warehouseList/warehouseDetail',
					query: this.$route.query
				});
			},
			async getOwners() { //获取仓库所属列表
				let data = await http.invoicing_getOwners();
				let arr = [];
				if(data) {
					for(let item of data) {
						let obj = {
							selected: true
						};
						if(item.ischain == 3) { //只有品牌
							obj.id = item.brandId + ',0';
							obj.name = item.brandName;
						} else {
							if(item.brandId) { //品牌-单店
								obj.id = item.brandId + ',' + item.shopId;
								obj.name = item.brandName + '-' + item.shopName;
							} else { //只有单店
								obj.id = '0' + ',' + item.shopId;
								obj.name = item.shopName;
							}
						}
						arr.push(obj);
					}
				}
				this.owner = arr;
				this.ownerSel = this.owner.map((res)=>{
					return res.id;
				});
				this.ownerArr = [...this.ownerSel];
				this.ownerName =` 已选中${this.ownerSel.length}个`;
			},
			ownerClose(){
				this.visible = false;
				this.ownerSel = [...this.ownerArr];
			},
			selOwnerAll(type){
				if(type===1){//全选
					this.ownerSel = this.owner.map((res)=>{
						return res.id;
					});
				}else{//取消全选
					this.ownerSel = [];
				}
			},
			ownerHandle(type){
				this.visible = false;
				if(type===1){//确定
					this.ownerArr = [...this.ownerSel];
					this.page = 1;
					this.filter();
					if(this.ownerSel.length>1){
						this.ownerName =` 已选中${this.ownerSel.length}个`;
					}else if(this.ownerSel.length==1){
						this.ownerName = this.owner.filter((res)=>{
							return this.ownerSel[0]==res.id;
						})[0].name;
					}else{
						this.ownerName = '';
					}
				}else{//取消
					this.ownerSel = [...this.ownerArr];
				}
			},
			async getList() { //获取仓库列表
				let data = await http.warehouseWarehouseList();
				this.allList = data;
				this.listLength = data.length;
				this.filter();
			},
			getRequest() { //获取缓存的请求参数
				let isDestroy = storage.session('warehouseListsDestroy');
				let backRequest = storage.session('warehouseListsRequest');
				if(isDestroy) { //确定是从详情页返回时 才读取缓存数据
					if(backRequest) {
						for(let i in backRequest) {
							this[i] = backRequest[i];
						}
					}
				}
				this.getOwners();
				storage.session('warehouseListsDestroy', null);
				storage.session('warehouseListsRequest', null);
			},
			filterClick() { //点击筛选按钮
				this.page = 1;
				this.filter();
			},
			filter() { //筛选方法
				let obj = { //筛选条件 只适用于一级筛选 筛选key对应列表key
					code: this.code,
					name: this.name,
					owner: this.ownerSel,
					province: this.province,
					city: this.city,
					town: this.town,
					place: this.place,
					isShared: this.isShared,
				};
				this.filterObj = utils.deepCopy(obj);
				this.filterObj.page = this.page;
				this.filterObj.showNum = this.showNum;
				this.condition(obj);
				this.paging();
			},
			reset() { //重置
				let empty = ['code','name','province','city','town','place'];
				for(let item of empty){
					this[item] = '';
				}
				let list = this.owner.map((res)=>{
					return res.id;
				});
				this.ownerSel = list;
				this.ownerArr = list;
				this.isShared = '';
				this.page = 1;
				this.showNum = 10;
				this.ownerName =` 已选中${this.ownerSel.length}个`;
				this.filter();
			},
			paging() { //分页
				this.pageTotal = Math.ceil(this.filterList.length / this.showNum);
				this.listLength = this.filterList.length;
				let start = (this.page - 1) * this.showNum;
				let end = this.page * this.showNum;
				if(end > this.filterList.length) end = this.filterList.length;
				this.list = this.filterList.slice(start, end);
				this.getAreaCn();
			},
			condition(obj) { //筛选条件匹配
				let list = utils.deepCopy(this.allList);
				for(let key in obj) { //遍历筛选条件
					let newList = [];
					console.log(key,obj.owner);
					if(obj[key] !== '') {
						if(key == 'owner') { //店铺所属匹配
							for(let item1 of obj.owner) {
								for(let item2 of list) {
									//条件匹配 推进新数组
									if(item2.owner == item1) newList.push(item2);
								}
							}
						} else {
							for(let item of list) {
								//模糊匹配 丢进新数组
								if(item[key].includes(obj[key])) newList.push(item);
							}
						}
						list = newList;
					}
				}
				this.filterList = list;
			},
			setShared(num) { //点击 非共享 checkbox
				if(num == 0) {
					return '非共享';
				} else if(num == 1) {
					return '共享';
				}
			},
			clickCheck() { //改变共享状态 这里用'1'/'0'表示，便于筛选
				if(this.isShared === '0') {
					this.isShared = '';
				} else {
					this.isShared = '0';
				}
				this.page = 1;
				this.filter();
			},
			pageChange(res,type) { //点击翻页 触发
				if(type){
					this.page = res;
				}else{
					this.showNum = res;
				}
				this.filter();
			},
			async getAreaCn() { //异步加载 省市区插件
				let data = await import( /*webpackChunkName: 'area_cn'*/ 'src/verdor/area_cn');
				areaCn = data.default;
				let list = utils.deepCopy(this.list);
				for(let item of list) {
					item.provinceName = areaCn.getNameByCode(item.province);
					item.cityName = areaCn.getNameByCode(item.city);
					item.townName = areaCn.getNameByCode(item.town);
				}
				this.list = list;
			},
			getAddress(obj) { //选中省市区 触发
				this.province = obj.province;
				this.city = obj.city;
				this.town = obj.area;
				this.page = 1;
				this.filter();
			}
		}
	};
</script>
<style lang='less' scoped>
	.el-popper{
		.handle{text-align: right;}
		.btn-box{padding-bottom: 5px;overflow: hidden;
			.btn-cell{padding-bottom: 10px;padding-right: 10px;float: left;}
		}
	}
	.warehouse-lists{
		.choose-btn{height: 40px;margin-bottom:20px;}
		.el-input{width: 210px;}
		.filter{width: 100%;
			.block{display: inline-block;}
			.inline-box{display: inline-block;vertical-align: middle;margin-right: 10px;padding-bottom: 20px;
				.inline-span{display: inline-block;}
			}
			.input-check{font-size: 16px;color: #333;
				i{height: 20px;width: 20px;border-radius: 2px;margin-right: 5px;color: #444;cursor: pointer;display: inline-block;
					border: 1px solid #bbb;vertical-align: middle;margin-top: -3px;
					&.active{background: url(../../../res/icon/white_select.png)#28a8e0 center no-repeat;border: 1px solid #28a8e0;}	
				}
			}
		}
		.main{
			.list{position: relative;}
			.page-box{text-align: left;margin-top: 20px;padding-bottom: 80px;}
		}
	}
</style>