<template>
	<!--
        @file       新建仓库
        @百川        黄一帆

        -->
	<div id="create-store">
		<div class="create">新建仓库</div>
		<div class="store-content">
			<div class="store-list">
				<label class="store-name required">仓库名称</label>
				<input type="text" placeholder="请输入仓库名称" class="store-input" v-model="param.name" maxlength="10">
			</div>
			<div class="store-list">
				<label class="store-name">仓库编号</label>
				<input type="text" placeholder="请输入仓库编号" maxlength="20" class="store-input" v-model="code" @input="codeInput" @propertychange="codeInput">
				<span class="font-limit" style="display:block;">
                    <img src="../../../res/images/handle-tips.png" alt="">
                    限20字以内,数字/字母
                </span>
			</div>
			<div class="store-list">
				<label class="store-name required">仓库所属</label>
				<div class="add-blong" @click="openStoreBlong">
					<span class="img-span">
                        <img src="../../../res/images/add.png" style="vertical-align:middle;" alt="">
                    </span>添加仓库所属
				</div>
				<em class="now-select" v-if="ownerName">( 已选择：{{ownerName}} )</em>
				<em class="now-select" v-if="!ownerName">( 请选择仓库所属 )</em>
			</div>

			<div class="store-list">
				<label class="store-name required">共享</label>
				<div class="shared-box">
					<on-off :status="booleanShared" @statusChange="getShared"></on-off>
				</div>
			</div>

			<div class="store-list">
				<label class="store-name required">仓库地址</label>
				<div>
					<address-select @emit="getAddress" :width="210" :province="param.province" :city="param.city" :town="param.town"></address-select>
				</div>
				<textarea class="text-area" placeholder="请输入详细地址" v-model="place" maxlength="40"></textarea>
				<span class="font-limit">
                    <img src="../../../res/images/handle-tips.png" alt="">
                    限40字以内
                </span>
			</div>
		</div>

		<div class="create">添加区域</div>
		<div class="store-content">
			<div class="store-list" v-for="(item,index) in area" :key="index" @click="areaHandle">
				<label class="area-name required">{{area.length>9 ? index+1 : '0'+(index+1)}} 区域名称</label>
				<input type="text" placeholder="请输入区域名称" v-model="item.name" class="store-input area-input">
				<span class="opera-img add" :data-index="index" v-if="area.length-1==index" alt="添加"></span>
				<span class="opera-img del" :data-index="index" v-if="area.length!=1" alt="删除"></span>
			</div>
			<div class="bottom-btn">
				<div class="gray cancel-btn" @click="cancel">取消</div>
				<div class="yellow ok-btn" @click="confirm">确定</div>
			</div>
		</div>
		<component :is="showCom" :pObj="comObj" @throwWin="closeWin"></component>
	</div>
</template>
<script type="text/javascript">
	/*
	    1)省市区一定要选全,并且不能为空
	    2)所有的店铺都会有有一个品牌归属
	*/
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';

	export default {
		data() {
			return {
				area: [{
					name: ''
				}], //区域名称
				param: {
					name: '', //仓库名称
					owner: '', //仓库所属-id
					province: '', //省份
					city: '', //城市
					town: '', //区域
				},
				tips: {
					name: '仓库名称',
					owner: '仓库所属',
					province: '省份',
					city: '城市',
					town: '地区',
				},
				code: '', //仓库编号
				place: '', //详细地址
				wid: '', //仓库id
				comObj: {},
				sendObj: {}, //页面加载-存储发送给弹框的参数
				showCom: '',
				ownerName: '', //仓库所属-名称
				isBrand: 0, //1为品牌 0为非品牌
				ischain: '', //店铺类型
				brandId: '', //品牌id
				booleanShared: true,
				isShared: 1, //是否共享
				isClick: false, //是否已经点击提交，防止重复点击
			};
		},
		created() {
			this.userData = storage.session('userShop');
			this.ischain = this.userData.currentShop.ischain;
			this.isBrand = this.ischain == '3' ? 1 : 0; //是否为品牌,
			if(this.ischain == 1 || this.ischain == 2) {
				this.brandId = this.userData.currentShop.brandId;
			} else if(this.ischain == 3) {
				this.brandId = this.userData.currentShop.id;
			}
		},
		mounted() {
			
		},
		destroyed(){
			storage.session('store_owner',null);
		},
		components: {
			addStoreBlong: () =>
				import( /*webpackChunkName:'store_owner'*/ './store_owner'),
			addressSelect: () =>
				import( /*webpackChunkName: 'address_linkage'*/ 'src/components/address_linkage'),
			onOff: () =>
				import( /*webpackChunkName: 'on_off'*/ 'src/components/on_off'),
		},
		methods: {
			areaHandle(event) {
				let target = event.target;
				if(target.className.includes('del')) {
					let index = target.getAttribute('data-index');
					this.area.splice(index, 1);
				} else if(target.className.includes('add')) {
					this.area.push({
						name: ''
					});
				}
			},
			getShared(res) {
				this.booleanShared = res;
				this.isShared = res ? 1 : 0;
			},
			openStoreBlong() {
				this.comObj = this.sendObj;
				this.showCom = 'addStoreBlong';
			},
			closeWin(res, obj) {
				if(res == 'ok') {
					this.ownerName = obj.name;
					if(obj.ischain == '3') { //选中品牌
						this.param.owner = obj.id + ',0';
					} else { //选中单店
						if(obj.ischain != '0') { //有品牌直营店，加盟的
							this.param.owner = this.brandId + ',' + obj.id;
						} else { //无品牌单店
							this.param.owner = '0,' + obj.id;
						}
					}
					this.sendObj.selectId = obj.id;
				}
				this.showCom = null;
			},
			//获取省市区编号
			getAddress(obj) { //获取返回的地址
				this.param.province = obj.province;
				this.param.city = obj.city;
				this.param.town = obj.area;
			},
			codeInput(event) { //限制文本框输入 只能输入数字和字母
				let num = event.target.value;
				num = num.replace(/[^A-Za-z0-9]/g, '');
				if(num.length > 20) {
					num = num.substr(0, 20);
				}
				this.code = num;
				event.target.value = num;
			},
			//校验表单
			checkForm() {
				//这里只验证省份不能为空
				for(let i in this.param) {
					this.param[i] = this.param[i].trim();
					if(i != 'city' && i != 'town') {
						if(this.param[i].length == 0) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								content: `${this.tips[i]}不能为空`
							});
							return false;
						}
					}
				}
				let nameArr = [];
				for(let i in this.area) {
					let name = this.area[i].name.trim();
					if(name.length == 0) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '请输入区域名称'
						});
						return false;
					} else if(this.area.length > 1) {
						if(!nameArr.length) {
							nameArr.push(name);
						} else {
							let isEqual = false;
							for(let item of nameArr) {
								if(item == name) {
									this.$store.commit('setWin', {
										title: '温馨提示',
										content: '区域名称不能相同'
									});
									return false;
								} else {
									isEqual = true;
								}
							}
							if(isEqual) nameArr.push(name);
						}
					}
				}
				return true;
			},
			//格式化数据
			formatData() {
				let areaStr = '',
					areaArr = [];
				for(let item of this.area) {
					areaArr.push(item.name);
				}
				areaStr = areaArr.join(',');
				let obj = {
					name: this.param.name,
					code: this.code,
					isShared: this.isShared,
					place: this.place,
					country: '',
					province: this.param.province,
					city: this.param.city,
					town: this.param.town,
					area: areaStr,
					owner: this.param.owner,
				};
				return obj;
			},
			cancel() {
				this.$router.go(-1);
			},
			//点击确认提交数据
			confirm() {
				if(!this.checkForm()) return;
				let obj = this.formatData();
				this.WarehouseAdd(obj);
			},
			//新建仓库
			async WarehouseAdd(obj) {
				if(this.isClick) {
					this.$store.commit('setWin', {title: '温馨提示',content: '请勿重复点击'});
					return;
				}
				this.isClick = true;//禁止重复点击
				let res=null;
				try{
					res = await http.warehouseAddWarehouse({
						data: obj
					},true);	
				}
				catch(e){
					this.$store.commit('setWin', {title: '错误提示',content: e.error.message});
					this.isClick = false;//接口报错，还能继续点击
				}
				if(res) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '仓库新建成功',
						callback: () => {
							this.$route.query.s = 0;
							this.$router.push({
								path: '/admin/warehouseList',
								query: this.$route.query
							});
						}
					});
				}
			},
		},

	};
</script>
<style lang='less' scoped>
	#create-store {
		padding-bottom: 50px;
		padding-top: 10px;
		.vertical-line {
			line-height: 40px;
			height: 40px;
		}
		.create {
			text-indent: 15px;
			border-left: 2px solid #20a7dc;
			margin-bottom: 30px;
			font-size: 16px;
			color: #333;
		}
		.create:after {
			content: '';
			width: 479px;
			display: inline-block;
			margin-left: 40px;
			border-bottom: 2px dashed #ddd;
			top: -4px;
			position: relative;
		}
		.store-content {
			padding-left: 28px;
			.store-list {
				position: relative;
				margin-bottom: 20px;
				padding-left: 100px;
				.store-name {
					font-size: 14px;
					width: 80px;
					display: inline-block;
					text-align: right;
					color: #333;
					.vertical-line;
					position: absolute;
					top: 0;
					left: 0;
				}
				.store-input {
					height: 40px;
					width: 210px;
					border: 1px solid #d2d2d2;
					display: inline-block;
					padding: 0 10px;
					outline: none;
					font-size: 14px;
					vertical-align: top;
				}
				.area-input {
					margin-left: 0;
				}
				.now-select {
					font-size: 14px;
					color: #707077;
				}
				.add-blong {
					background: #29a8e0;
					width: 210px;
					border: 1px solid #29a8e0;
					display: inline-block;
					font-size: 14px;
					text-align: center;
					color: #ffffff;
					cursor: pointer;
					.vertical-line;
					.img-span {
						vertical-align: middle;
						width: 30px;
						display: inline-block;
						text-align: left;
						margin-top: -3px;
					}
				}
				.active {
					border: 1px solid #eb9e60;
					background: #fff3e4;
					color: #eb9e60;
				}
				.text-area {
					width: 210px;
					height: 100px;
					border: 1px solid #bebebe;
					resize: none;
					outline: none;
					padding: 10px;
					margin-top: 20px;
					box-sizing: border-box;
					font-size: 14px;
					display: block;
				}
				.font-limit {
					color: #c3c3c3;
					font-size: 14px;
					margin-top: 15px;
					display: inline-block;
					vertical-align: middle;
					img {
						vertical-align: middle;
					}
				}
				.tips {
					display: block;
					img {
						margin-right: 10px;
					}
				}
				.address-box {
					display: inline-block;
					vertical-align: top;
					margin-bottom: 20px;
				}
				.opera-img {
					vertical-align: middle;
					display: inline-block;
					width: 40px;
					.vertical-line;
					text-align: center;
					cursor: pointer;
					img {
						vertical-align: middle;
						display: inline-block;
					}
					&.del {
						background: url(../../../res/images/gray-del.png) center no-repeat;
					}
					&.add {
						background: url(../../../res/images/gray-add.png) center no-repeat;
					}
				}
				.area-name {
					width: 100px;
					display: inline-block;
					color: #333;
					font-size: 14px;
					color: #333;
					text-align: left;
					position: absolute;
					top: 0;
					left: 0;
					.vertical-line;
				}
			}
			.bottom-btn {
				padding-left: 100px;
				margin-top: 40px;
				margin-bottom: 100px;
				div {
					width: 210px;
					height: 50px;
					line-height: 50px;
					text-align: center;
					margin-right: 10px;
					display: inline-block;
					color: #f1f1f1;
					font-size: 16px;
				}
			}
		}
	}
</style>