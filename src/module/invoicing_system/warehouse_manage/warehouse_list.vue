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
						<i @click="clickCheck" :class="{active:this.isShare === '0'}"></i>
						非共享
					</div>
					<div class="inline-box button-box">
						<el-button type="success" @click="filterClick">筛选</el-button>
						<el-button type="info" @click="reset">重置</el-button>
					</div>
				</div>
			</div>
			<div class="main">
				<div class="list">
					<div class="head">
						仓库列表 · 共<em> {{allList.length}} </em>条数据
					</div>
					<div class="list-box">
						<div class="fixed" @click="listHandle">
							<span class="fixed-title">操作</span>
							<div class="fixed-list" v-for="(item,index) in list" :key="index">
								<span class="detail" :data-index="index">查看详情</span>
							</div>
						</div>
						<div class="title">
							<span>仓库名称</span>
							<span class="narrow">共享状态</span>
							<span>仓库编号</span>
							<span>仓库所属</span>
							<span>区域总数</span>
							<span>商品种类</span>
							<span>物料种类</span>
							<span>仓库地址</span>
						</div>
						<ul>
							<li v-for="(item,index) in list" :key="index">
								<!--仓库名称-->
								<span>{{item.name}}</span>
								<!--共享状态-->
								<span class="narrow">{{setShared(item.isShared)}}</span>
								<!--仓库编号-->
								<span class="text-ellipsis" :title="item.code">{{item.code}}</span>
								<!--仓库所属-->
								<span class="text-ellipsis" :title="item.ownerName">{{item.ownerName}}</span>
								<!--区域总数-->
								<span>{{item.area.length}}</span>
								<!--商品种类-->
								<span>{{Number(item.KindWeightKg||item.kindWeightKg) + Number(item.kindGoods) + Number(item.kindWeightG)}}</span>
								<!--物料种类-->
								<span>{{item.kindMaterial}}</span>
								<!--仓库地址-->
								<span><em class="warp warp-three">{{item.provinceName}} {{item.cityName}} {{item.townName}} {{item.place}}</em></span>
							</li>
							<li class="empty" v-if="!list.length">- 暂无条目 -</li>
						</ul>
					</div>
				</div>
				<div class="page-box">
					<pageBtn @pageNum="pageChange" :total="pageTotal" :page="page" :isNoJump="true"></pageBtn>
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
				isShare: '', //是否共享 ''都有 1共享 0非共享
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
			selectStore: () =>
				import( /*webpackChunkName: 'select_store'*/ 'src/components/el_shopList'),
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
					{name: '查看全部',className: 'success',type:5,
						fn: () => {
							storage.session('warehouseListsRequest', this.filterObj);
							this.$router.push({
								path: 'warehouseList/searchGoods',
								query: this.$route.query
							});
						}
					},
					{name: '新建仓库',className: 'success',type:4,
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
			listHandle(event) { //列表点击操作
				let target = event.target;
				if(target.className.includes('detail')) { //进入详情
					let index = target.getAttribute('data-index');
					let id = this.list[index].id; //仓库id
					storage.session('warehouseListsRequest', this.filterObj);
					this.$route.query.id = id; //带上仓库id
					this.$router.push({
						path: 'warehouseList/warehouseDetail',
						query: this.$route.query
					});
				}
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
				this.ownerArr = this.ownerSel;
			},
			ownerClose(){
				this.visible = false;
				this.ownerSel = this.ownerArr;
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
					this.ownerArr = this.ownerSel;
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
					this.ownerSel = this.ownerArr;
				}
			},
			async getList() { //获取仓库列表
				let data = await http.warehouseWarehouseList();
				this.allList = data;
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
				} else {
					this.getOwners();
				}
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
					owner: this.ownerArr,
					province: this.province,
					city: this.city,
					town: this.town,
					place: this.place,
					isShared: this.isShare,
				};
				this.filterObj = obj;
				this.condition(obj);
				this.paging();
			},
			reset() { //重置
				for(let i in this.filterObj) {
					if(i == 'owner') {
						let list = utils.deepCopy(this.owner);
						for(let item of list) {
							item.selected = true;
						}
						this.owner = list;
					} else {
						this[i] = '';
					}
				}
				this.filter();
			},
			paging() { //分页
				this.pageTotal = Math.ceil(this.filterList.length / this.showNum);
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
					if(obj[key] != '') {
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
				if(this.isShare === '0') {
					this.isShare = '';
				} else {
					this.isShare = '0';
				}
				this.page = 1;
				this.filter();
			},
			pageChange(obj) { //点击翻页 触发
				this.page = obj.page;
				this.showNum = obj.num;
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
		.choose-btn{width: 100%;height: 40px;cursor: pointer;margin-bottom:15px;
			li{width:50%;height:100%;text-align:center;line-height:38px;
			color:#fe8d01;border: 1px solid #fe8d01;float: left;}
			.select{background: #fe8d01;color: #ffffff}
		}
		.el-input{width: 210px;}
		.filter{width: 100%;
			.block{display: inline-block;}
			.inline-box{display: inline-block;vertical-align: middle;margin-right: 10px;padding-bottom: 15px;
				.inline-span{display: inline-block;}
				input{width: 180px;height: 40px;padding: 0 10px;font-size: 14px;vertical-align: top;
					&:focus{outline: none;}
				}
			}
			.button-box{
				span{display: inline-block;height: 40px;line-height: 40px;width: 80px;color: #fff;text-align: center;}
				.blue{margin-right: 10px;}
			}
			.input-check{font-size: 16px;color: #333;
				i{height: 20px;width: 20px;border-radius: 2px;margin-right: 5px;color: #444;cursor: pointer;display: inline-block;
					border: 1px solid #bbb;vertical-align: middle;margin-top: -3px;
					&.active{background: url(../../../res/icon/white_select.png)#28a8e0 center no-repeat;border: 1px solid #28a8e0;}	
				}
			}
		}
		.main{
			.list{border: 1px solid #ccc;border-bottom: 2px solid #ddd;position: relative;
				.head{height: 50px;line-height: 50px;padding: 0 10px;font-size: 16px;
					em{color: #ff3c04;font-size: inherit;}
				}
				.list-box{max-width: 100%;overflow: auto;}
				.fixed{position: absolute;left: 0;top: 50px;background: #fff;
					.fixed-title{display: block;width: 150px;height: 40px;line-height: 40px;text-align: center;background: #e6e6e6;}
					.fixed-list{border-bottom: 2px solid #ddd;
						&:last-child{border-bottom: 0;}
						span{display: block;height: 70px;line-height: 70px;line-height: 70px;text-align: center;color: #27a8e0;
						cursor: pointer;}
					}
				}
				.title{background: #e6e6e6;overflow: hidden;min-width: 1400px;width: 100%;padding-left: 150px;
					span{float: left;height: 40px;line-height: 40px;text-align: center;width: 13%;}
					.narrow{width: 9%;}
				}
				ul{min-width: 1400px;width: 100%;
					li{overflow: hidden;border-bottom: 2px solid #ddd;padding-left: 150px;
						&:last-child{border-bottom: 0;}
						span{float: left;height: 70px;line-height: 70px;text-align: center;width: 13%;color: #555;padding: 0 5px;
							.warp{line-height: normal;display: inline-block;vertical-align: middle;max-width: 100%;max-height: 38px;overflow: hidden;}
							.warp-three{max-height: 57px;}
						}
						.narrow{width: 9%;}
						.handle{
							.detail{display: inline-block;padding: 0 5px;line-height: normal;cursor: pointer;vertical-align: middle;color: #27a8e0;
								&:hover{text-decoration: underline;}
							}
						}
					}
					.empty{
						line-height: 70px;text-align: center;color: #ccc;font-size: 20px;
					}
				}
			}
			.page-box{text-align: left;margin-top: 20px;padding-bottom: 80px;}
		}
	}
</style>