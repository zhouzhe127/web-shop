<template>
	<div>
		<div class="shopList">
			<p>请选择
				<span v-if="bandtype==1" style="font-size: 22px;">饿了么</span>
				<span v-if="bandtype==2" style="font-size: 22px;">美团</span>
				<span v-if="bandtype==3" style="font-size: 22px;">百度</span>
				关联店铺
			</p>
			<ul class="title">
				<li>序号</li>
				<li>店铺名称</li>
				<li>选择</li>
			</ul>
			<ul class="eleShop" v-for="(item,index) in shopList" :key="index" @click="shopSelect(item.TakeoutShopId)">
				<li>0{{index+1}}</li>
				<li>{{item.TakeoutShopName}}</li>
				<li style="cursor: pointer;">
					<div class="circle active" v-bind:class="{ 'ele-active': selShopid == item.TakeoutShopId}"></div>
				</li>
			</ul>
		</div>
		<div class="buttenall">
			<a href="javascript:void(0);" class="gray" @click="relieve">解除授权</a>
			<a href="javascript:void(0);" class="border" v-if="bandtype==1" @click="outerVisible = true">补单</a>
			<a href="javascript:void(0);" class="yellow" @click="next">下一步</a>
		</div>
		<meiTuan-warrant v-if="showdel" @show="hidden" :urlData="urlData"></meiTuan-warrant>
		<el-dialog title="补单" :visible.sync="outerVisible" width="60%">
			<el-dialog width="40%" title="" :visible.sync="innerVisible" append-to-body>
				<div class="waring">
					<i class="el-icon-warning"></i>
					<span>请注意，补单功能只用于补录未录入的已完成的订单。</span>
					<p>确定要补录{{getTime(Date.parse(replenTime))}}的订单吗</p>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="innerVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogconif">确定</el-button>
				</div>
			</el-dialog>
			<div>
				<span>请选择补单日期：</span>
				<el-date-picker v-model="replenTime" @change="replenTimechenge" type="date" placeholder="选择日期"></el-date-picker>
			</div>

			<div slot="footer" class="dialog-footer">
				<el-button @click="outerVisible = false">取 消</el-button>
				<el-button type="primary" @click="replenishment">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import Timer from 'src/verdor/timer';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			bandtype: '', //1饿了么 2美团 3百度
			shopList: [],
			brandId: '',
			userData: '',
			selShopid: '', //选中的店铺id
			showdel: false,
			urlData: '',
			timer: '',
			outerVisible: false,
			innerVisible: false,
			replenTime:''//补单时间
		};
	},
	methods: {
		async init() {
			let data = await http.getTakeoutShop({
				data: {
					type: this.bandtype,
					brandId: this.brandId
				}
			});
			this.shopList.push(data);
		},
		shopSelect: function(id) {
			this.selShopid = id;
		},
		replenishment(){//补单
			if(this.replenTime){
				this.innerVisible = true;
			}else{
				this.$message({
					message: '请选择日期',
					type: 'warning'
				});
			}
		},
		replenTimechenge(){
			let date = new Date();
			console.log(Date.parse(this.replenTime));
			let v = 90*24*60*60*1000;
			if(this.replenTime<date-v){
				this.$message({
					message: '请选择90天内的日期',
					type: 'warning'
				});
				this.replenTime = '';
			}
		},
		getTime(time) {
			return utils.format(parseInt(time), 'yyyy-MM-dd');
		},
		async dialogconif(){
			let data = await http.outfoodmakeUpOrder({data:{
				date:Date.parse(this.replenTime)/1000
			}});
			if(data){
				this.$message({
					message: '补单成功！',
					type: 'success'
				});
				this.innerVisible = false;
				this.outerVisible = false;
			}
		},
		relieve: function() {
			if (this.selShopid == '') {
				this.$store.commit('setWin', {
					title: '提示',
					content: '请选择店铺！'
				});
				return false;
			}
			this.$store.commit('setWin', {
				title: '提示',
				content: '是否解除授权',
				winType: 'confirm',
				callback: async res => {
					if (res == 'ok') {
						let data;
						if (this.bandtype == 1) {
							//饿了么解除授权
							data = await http.releaseAuth({
								data: {
									type: this.bandtype
								}
							});
							this.$store.commit('setWin', {
								title: '提示',
								content: '解除授权成功！'
							});
							window.opener.location.reload();
							setTimeout(function() {
								window.close();
							}, 1000);
						} else {
							//百度 美团解除授权
							data = await http.getReleaseAuthUrl({
								data: {
									type: this.bandtype,
									brandId: this.brandId
								}
							});
							this.showdel = true;
							let localUrl = window.location.href;
							this.urlData = data + '&eOrigin=' + localUrl;
							this.timer = Timer.add(
								this.getReturn(this.bandtype, 0),
								1500
							);
						}
					}
				}
			});
		},
		next: function() {
			if(this.selShopid === ''){
				this.$message({
					message: '请选择店铺！',
					type: 'warning'
				});
				return false;
			}
			if (this.bandtype == 2) {
				this.$router.push({
					path: 'relation/config'
				});
			} else {
				if (storage.session('goodList')) {
					this.$router.push({
						path: 'relation/relationele',
						query: { id: this.selShopid }
					});
				} else {
					this.$store.commit('setWin', {
						title: '提示',
						content: '菜品加载中请稍后'
					});
					return false;
				}
			}
		},
		getGoods() {
			// 请求商品列表
			// let res = await http.All([{data: {page: 1,num: 9999,shopId:this.userData.currentShop.id},httpId :'getAllGoods',timeout: 20000},{data: {page: 1,num: 9999,shopId:this.userData.currentShop.id},httpId :'getAllPackage',timeout: 20000}])
			// console.log(res)
			http
				.getAllGoods({
					data: {
						page: 1,
						num: 9999,
						shopIds: this.userData.currentShop.id
					}
				})
				.then(data => {
					console.log(data);
					storage.session('goodList', data);
				});

			http
				.getAllPackage({
					data: {
						page: 1,
						num: 9999,
						shopIds: this.userData.currentShop.id
					}
				})
				.then(data => {
					console.log(data);
					storage.session('packageList', data);
				});
		},
		hidden: function(show) {
			this.showdel = show;
		},
		getReturn: function(id, index, eleme) {
			return () => {
				http
					.getReturnInfo({
						data: {
							type: id
						}
					})
					.then(
						data => {
							if (data == 0) {
								Timer.clear(this.timer);
								window.opener.location.reload();
								this.$store.commit('setWin', {
									title: '提示',
									content: '解除授权成功！'
								});
								window.close();
							}
						},
						err => {
							Timer.clear(this.timer);
							this.$store.commit('setWin', {
								title: '提示',
								content: err
							});
						}
					);
				index += 1;
				if (index > 180) {
					//3分钟内没有操作，关闭授权页面
					eleme.close();
					Timer.clear(this.timer);
				}
			};
		}
	},
	mounted: function() {
		this.bandtype = storage.session('waimai');
		this.userData = storage.session('userShop');
		document.querySelector('#warrant').style.height = 100+'%';
		this.getGoods();
		this.brandId =
			this.userData.currentShop.ischain == 0
				? 0
				: this.userData.currentShop.brandId;
		this.init();
	},
	components: {
		meiTuanWarrant: () =>
			import(/*webpackChunkName: "iframe_warrant"*/ 'src/module/outfood/accredit/iframe_warrant')
	},
	destroyed() {
		Timer.clear(this.timer);
	}
};
</script>
<style type="text/css" lang="less" scoped>
#warrant{
	height: 100%;
}
#warrant .box {
	display: inline-block;
	width: 340px;
	height: 167px;
	background: #fafafa;
	margin-left: 100px;
}
#warrant .box .left,
#warrant .box .right {
	display: inline-block;
	height: 167px;
	vertical-align: middle;
}
#warrant .box .left {
	width: 140px;
}
.waring {
	i {
		color: red;
		font-size: 20px;
	}
	span {
		font-size: 16px;
	}
	p{
		margin-top: 15px;
		font-size: 16px;
	}
}
#warrant .box .right {
	width: 195px;
}
#warrant .right span:nth-of-type(1) {
	display: inline-block;
	width: 100px;
	height: 24px;
	font-size: 24px;
	margin-top: 47px;
	margin-left: 22px;
}
#warrant .right .rant {
	display: inline-block;
	width: 100px;
	height: 30px;
	border: 1px solid #f8931f;
	color: #f8931f;
	border-radius: 15px;
	text-align: center;
	line-height: 27px;
	margin-top: 20px;
	font-size: 14px;
	margin-left: 22px;
	cursor: pointer;
}
#warrant .box .one {
	background: url(../../../res/images/eleme.png) no-repeat 20px 34px;
}
#warrant .box .two {
	background: url(../../../res/images/meituan.png) no-repeat 20px 34px;
}
#warrant .box .three {
	background: url(../../../res/images/baidu.png) no-repeat 20px 34px;
}
#warrant .box .warranted {
	background: url(../../../res/images/warrant.png) no-repeat 80px 108px;
}
#warrant .box .warranted span {
	margin-top: 72px !important;
}

#warrant .box .eleJump {
	display: inline-block;
	width: 340px;
	height: 167px;
	position: relative;
	bottom: 167px;
	z-index: 100;
}
#jumpShop {
	background: #ededed;
	/*position: absolute;
	top: 0;
	left: 0;*/
	padding-top: 1px;
	width: 100%;
	height: 100%;
	z-index: 100;
}
#warrant #jumpShop .shopBox {
	width: 1441px;
	/*height: 796px;*/
	margin: 0 auto;
	margin-top: 60px;
	z-index: 1000;
}
#warrant #jumpShop .shopBox .shopList {
	width: 100%;
	height: 700px;
	background: #ffffff;
}
#warrant #jumpShop .shopBox .shopList p {
	width: 100%;
	height: 60px;
	line-height: 60px;
	font-size: 22px;
	color: #43414a;
	text-align: center;
}
#jumpShop .title {
	background: #f7f7f7;
	height: 60px;
	line-height: 60px;
	font-size: 16px;
}
#jumpShop ul li {
	display: inline-block;
	width: 33%;
	text-align: center;
}
#jumpShop .eleShop li {
	height: 100px;
	line-height: 100px;
	font-size: 16px;
	color: #43414a;
	border-bottom: 4px solid #f7f7f7;
}
.circle {
	display: inline-block;
	width: 21px;
	height: 21px;
	border: 1px #c7c7c7 solid;
	border-radius: 50%;
	margin-left: 5px;
	background: #fff;
	vertical-align: middle;
}
.ele-active {
	background: url(../../../res/icon/eleicon.png) center center no-repeat;
}
#warrant .shopBox a {
	margin-top: 30px;
}
#warrant .shopBox i {
	display: inline-block;
	width: 44px;
	height: 44px;
	background: url(../../../res/icon/success.png) center center no-repeat;
	vertical-align: middle;
	margin-right: 16px;
}
#warrant .gray {
	// margin-left: 500px;
	width: 150px;
}
.buttenall{
	width: 600px;
	margin: 0 auto
}
#warrant .border {
	margin-left: 70px;
	cursor: pointer;
	color: #f8931f;
	height: 49px;
	line-height: 49px;
	background-color: #ffffff;
	border:1px #f8931f solid;
	width: 150px;
}
#warrant .yellow {
	margin-left: 70px;
	width: 150px;
}
#jumpShop .tip-icon {
	margin-top: 20px;
}
#jumpShop .tip-icon i {
	display: inline-block;
	width: 18px;
	height: 18px;
	background: url(../../../res/icon/prompt.png) center center no-repeat;
}
#warrant .shopList .content {
	border-bottom: 4px solid #f7f7f7;
}
#warrant .shopList .content .category {
	display: inline-block;
	width: 210px;
	height: 60px;
	line-height: 60px;
	vertical-align: top;
	text-align: center;
}
#warrant .shopList .content .sdgoods {
	display: inline-block;
	width: 1200px;
}
#warrant .shopList .content .sdgoods i {
	display: inline-block;
	width: 20px;
	height: 20px;
}
#warrant .shopList .content .sdgoods .edit {
	background: url(../../../res/icon/iconchange.png) no-repeat;
}
#warrant .shopList .content .sdgoods .delete {
	background: url(../../../res/icon/icondelete.png) no-repeat;
}
#warrant .shopList .content .sdgoods a {
	width: 100px;
	color: #ff9800;
	text-decoration: underline;
	margin-top: 0;
}
#warrant .shopList .content .sdgoods .goodsicon {
	display: inline-block;
	width: 120px;
	height: 44px;
	background: url(../../../res/images/bind.png) center center no-repeat;
	vertical-align: middle;
}
#warrant .shopList .content .sdgoods .goodsName {
	display: inline-block;
	width: 120px;
	height: 44px;
	line-height: 44px;
	margin-right: 20px;
	vertical-align: middle;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
#warrant .shopList .content .sdgoods ul li {
	width: 590px;
	height: 60px;
	line-height: 60px;
	border-bottom: 4px solid #f7f7f7;
}
#warrant .shopList .content .sdgoods ul:last-child li {
	border-bottom: 0;
}
#warrant .shopList .contentBox {
	height: 580px;
	overflow-x: scroll;
}
</style>