<!--
    **调度申请
    *
    * 
    * *
    *
-->
<template>
	<div class="warehouse-lists">
		<ul class="choose-btn">
			<li :class="{'select':toggleCom==0}" @click="toggleCom=0">调度申请</li>
			<li :class="{'select':toggleCom==1}" @click="toggleCom=1">模板列表</li>
		</ul>
		<div v-if="toggleCom==0">
			<div class="filter">
				<div class="block">
					<calendar class="inline-box" :time="startTime" :type="0" @emit="(time)=>timeChange(time,1)" :format="'yyyy年MM月dd日'"></calendar>
					<span>-</span>
					<calendar class="inline-box" :time="endTime" :type="0" @emit="(time)=>timeChange(time,2)" :format="'yyyy年MM月dd日'"></calendar>
				</div>
				<div class="block">
					<div class="inline-box">
						<input type="text" placeholder="请输入仓库编号" v-model='code' @input="codeInput" @propertychange="codeInput" />
					</div>
					<div class="inline-box">
						<input type="text" placeholder="请输入仓库名称" v-model="name" />
					</div>
					<div class="inline-box">
						仓库所属：
						<selectStore @emit="getDrop" :sorts="owner" :tipName="dropName" :isConfirm="true"></selectStore>
					</div>
				</div>
				<div class="block">
					<div class="inline-box">
						仓库地址：
						<addressLinkage @emit="getAddress" :province="province" :city="city" :area="town"></addressLinkage>
					</div>
					<div class="inline-box">
						<input type="text" placeholder="请输入详细地址" v-model="place" />
					</div>
					<div class="inline-box input-check select-ban">
						<i @click="clickCheck" :class="{active:this.isShare === '0'}"></i> 非共享
					</div>
					<div class="inline-box button-box">
						<span class="blue" @click="filterClick">筛选</span>
						<span class="gray" @click="reset">重置</span>
					</div>
				</div>
			</div>
			<div class="main">
				<div class="list">
					<div class="head">
						仓库列表 · 共<em> {{allList.length}} </em>条数据
					</div>
					<div class="list-box">
						<div class="title">
							<span class="narrow">操作</span>
							<span>仓库名称</span>
							<span class="narrow">共享状态</span>
							<span>仓库编号</span>
							<span>仓库所属</span>
							<span>区域总数</span>
							<span>商品种类</span>
							<span>物料种类</span>
							<span>仓库地址</span>
						</div>
						<ul @click="listHandle">
							<li v-for="(item,index) in list" :key="index">
								<!--操作-->
								<span class="narrow handle">
									<em class="detail" :data-id="item.id" :data-sid="item.owner">查看详情</em>
								</span>
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
			startTime: '',
			endTime: '',
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
			import( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
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
			this.$store.commit('setPageTools', {
				allWearhouse: () => { //查看全部
					storage.session('warehouseListsRequest', this.filterObj);
					this.$router.push({
						path: 'warehouseList/searchGoods',
						query: this.$route.query
					});
				},
				outWearhouse: () => { //快速出库
					this.$router.push({
						path: 'warehouseList/outputStore',
						query: this.$route.query
					});
				},
				createWearhouse: () => { //新建仓库
					this.$router.push({
						path: 'warehouseList/create',
						query: this.$route.query
					});
				},
			});
		},
		timeChange(time, type) {
			if(type == 1) { //开始时间
				this.startTime = time;
			} else if(type == 2) { //结束时间
				this.endTime = time;
			}
		},
		listHandle(event) { //列表点击操作
			var target = event.target;
			if(target.className.includes('detail')) { //进入详情
				let id = target.getAttribute('data-id');
				let sid = target.getAttribute('data-sid');
				storage.session('warehouseListsRequest', this.filterObj);
				this.$route.query.id = id; //带上仓库id
				this.$route.query.sid = sid.split(',')[1]; //带上店铺id
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
				owner: this.owner,
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
								if(item1.selected && item2.owner.includes(item1.id)) newList.push(item2);
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
		codeInput(event) { //限制文本框输入 只能输入数字和字母
			var num = event.target.value;
			num = num.replace(/[^A-Za-z0-9]/g, '');
			this.code = num;
			event.target.value = num;
		},
		setShared(num) { //点击 非共享 checkbox
			if(num == 0) {
				return '非共享'
			} else if(num == 1) {
				return '共享'
			}
		},
		getDrop(arr) { //获取 选择所属 选中列表
			this.owner = arr;
			this.page = 1;
			this.filter();
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
			let data = await
			import( /*webpackChunkName: 'area_cn'*/ 'src/verdor/area_cn');
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
	.warehouse-lists{padding-top: 15px;
		.choose-btn{width: 240px;height: 40px;cursor: pointer;margin-bottom:15px;
			li{width:50%;height:100%;text-align:center;line-height:38px;
			color:#fe8d01;border: 1px solid #fe8d01;float: left;}
			.select{background: #fe8d01;color: #ffffff}
		}
		.filter{width: 100%;
			.block{display: inline-block;padding-bottom: 20px;}
			.inline-box{display: inline-block;vertical-align: middle;margin-right: 10px;
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
			.list{border: 1px solid #ccc;border-bottom: 2px solid #ddd;
				.head{height: 50px;line-height: 50px;padding: 0 10px;font-size: 16px;
					em{color: #ff3c04;font-size: inherit;}
				}
				.list-box{max-width: 100%;overflow: auto;}
				.title{background: #e6e6e6;overflow: hidden;min-width: 1400px;width: 100%;
					span{float: left;height: 40px;line-height: 40px;text-align: center;width: 12%;}
					.narrow{width: 8%;}
				}
				ul{min-width: 1400px;width: 100%;
					li{overflow: hidden;border-bottom: 2px solid #ddd;
						&:last-child{border-bottom: 0;}
						span{float: left;height: 70px;line-height: 70px;text-align: center;width: 12%;color: #555;padding: 0 5px;
							.warp{line-height: normal;display: inline-block;vertical-align: middle;max-width: 100%;max-height: 38px;overflow: hidden;}
							.warp-three{max-height: 57px;}
						}
						.narrow{width: 8%;}
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