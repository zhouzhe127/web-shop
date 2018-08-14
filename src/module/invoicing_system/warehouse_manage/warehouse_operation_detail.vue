<!--
    @file     仓库操作详情
    @百川      褚子龙
-->
<template>
	<section>
		<div class="titleBox">
			<div></div>
			<span>仓库操作详情</span>
			<i>----------------------------------------------------------------</i>
		</div>
		<div class="deliveryOrder">
			<ul>
				<li>操作类型 ：{{warehouseDetail.type}}</li>
				<li>操作时间 ：{{warehouseDetail.createTime}}</li>
			</ul>
			<ul>
				<li>操作人 ：{{warehouseDetail.createUser}}</li>
			</ul>
		</div>
		<ul class="chooseBtn">
			<li :class="{select:editType==0}" @click="clickTurn1">修改前</li>
			<li :class="{select:editType==1}" @click="clickTurn2">修改后</li>
		</ul>
		<div class="titleBox">
			<div></div>
			<span>仓库信息</span>
			<i>----------------------------------------------------------------</i>
		</div>
		<div class="deliveryOrder">
			<ul>
				<li>仓库名称 ：{{name}}</li>
				<li>仓库编号 ：{{code}}</li>
			</ul>
			<ul>
				<li>仓库所属 ：{{owner}}</li>
				<li>仓库地址 ：{{province+city+town+place}}</li>
			</ul>
		</div>
		<div class="titleBox">
			<div></div>
			<span>区域信息</span>
			<i>----------------------------------------------------------------</i>
		</div>
		<ul class="area" v-for="(item,index) in area" :key="index">
			<li><span>{{index+1}}</span>仓库区域 ：{{item}}</li>
		</ul>
	</section>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	let areaCn = null;
	export default {
		data() {
			return {
				editType: 0, //修改前后
				warehouseDetailPost: {}, //传过来的数据
				selectBtn: 1,
				warehouseDetail: {}, //接口获取仓库详情
				warehouseDetailInfo: [], //接口获取仓库详情信息
				warehouseDetailInfoArea: {}, //接口获取仓库详情信息区域
				name: '',
				code: '',
				owner: '',
				address: '',
				place: '',
				area: [],
				province: '',
				city: '',
				town: '',
				addressShow: false, //是否显示地址
				detail: {
					province: '',
					city: '',
					town: ''
				}
			};
		},
		methods: {
			clickTurn1: function() {
				this.editType = 0;
				this.init();
			},
			clickTurn2: function() {
				this.editType = 1;
				this.init();
			},
			async getAreaCn() { //异步加载 省市区插件
				let data = await import( /*webpackChunkName: 'area_cn'*/ 'src/verdor/area_cn');
				areaCn = data.default;
				this.province = areaCn.getNameByCode(this.detail.province);
				this.city = areaCn.getNameByCode(this.detail.city);
				this.town = areaCn.getNameByCode(this.detail.town);
				this.addressShow = true;
			},
			async init() {
				let res = await http.getOperationDetail({
					data: {
						id: this.warehouseDetailPost.id
					}
				});
				this.warehouseDetail = res;
				this.name = this.editType == 0 ? res.content[0].modifyBefore : res.content[0].modifyAfter;
				this.code = this.editType == 0 ? res.content[1].modifyBefore : res.content[1].modifyAfter;
				this.place = this.editType == 0 ? res.content[4].modifyBefore : res.content[4].modifyAfter;
				if(res.content[9]) {
					let ownerBefore = '';
					for(let item of res.content[9].modifyBefore) {
						ownerBefore = item + ',';
					}
					let ownerAfter = '';
					for(let item of res.content[9].modifyAfter) {
						ownerAfter = item + '';
					}
					this.owner = this.editType == 0 ? ownerBefore : ownerAfter;
				}

				this.address = this.editType == 0 ? res.content[5].modifyBefore : res.content[5].modifyAfter;
				this.detail.province = this.address.split('|')[1];
				this.detail.city = this.address.split('|')[2];
				this.detail.town = this.address.split('|')[3];
				if(res.content[7]) {
					this.area = this.editType == 0 ? res.content[7].modifyBefore : res.content[7].modifyAfter;
				}
				this.getAreaCn();
			},
		},
		mounted() {
			this.$store.commit('setPageTools', [{
				name: '返回',
				className: ['back'],
				fn: () => {
					sessionStorage.removeItem('warehouseDetailList');
					this.warehouseDetailPost.selectBtn = 0;
					storage.session('warehouseManagerTab', 1);
					storage.session('warehouseDetailList', this.warehouseDetailPost);
					this.$router.push({
						path: '/admin/warehouseList',
						query: this.$route.query
					});
				}
			}]);
			this.warehouseDetailPost = storage.session('warehouseOperationDetail');
			this.init();
		},
	};
</script>

<style type='text/css' scoped>
	.return {
		width: 90px;
		border: 1px solid #b3b3b3;
		color: #b3b3b3;
		position: absolute;
		top: 10px;
		left: 1750px;
		line-height: 40px;
		cursor: pointer;
		margin-right: 8px;
		text-align: center;
		float: left
	}
	
	.titleBox {
		width: 100%;
		height: 30px;
		line-height: 30px;
		float: left
	}
	
	.titleBox div {
		width: 3px;
		height: 100%;
		background: #29abe2;
		float: left
	}
	
	.titleBox span {
		margin-left: 20px;
		font-size: 14px
	}
	
	;
	.titleBox i {
		margin-left: 40px;
		color: #d9d9d9
	}
	
	.deliveryOrder {
		width: 100%;
		height: auto;
		margin-top: 10px;
		float: left;
		margin-bottom: 30px;
	}
	
	.deliveryOrder ul {
		width: 400px;
		float: left
	}
	
	.deliveryOrder ul li {
		width: 100%;
		height: 20px;
		line-height: 20px;
		margin-top: 20px;
		margin-left: 30px;
		font-size: 15px;
	}
	
	.chooseBtn {
		width: 240px;
		height: 34px;
		cursor: pointer;
		margin-bottom: 30px;
		margin-left: 5px;
		float: left
	}
	
	.chooseBtn li {
		width: 50%;
		height: 100%;
		text-align: center;
		line-height: 34px;
		color: #fe8d01;
		border: 1px solid #fe8d01;
		float: left;
		margin-left: -1px
	}
	
	.chooseBtn .select {
		background: #fe8d01;
		color: #ffffff
	}
	
	.area {
		width: 100%;
		height: auto;
		margin-top: 20px
	}
	
	.area li {
		width: 100%;
		height: 50px;
		line-height: 50px;
		margin-left: 30px;
		font-size: 15px;
		float: left;
	}
	
	.area li>span {
		margin-right: 20px
	}
</style>