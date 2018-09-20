<!--
		多渠道菜单
		胡江
-->
<template>
	<div id="moreMenu">
		<div class="all">
			<a v-for="(item,index) in menu" :key="index" v-on:click="selectPack(item.id)" class="raduobtn" :class="{'selectbtn' : item.id == packMenuId}" href="javascript:void(0);">{{item.name}}</a>
		</div>
		<ul class="neckTab" v-show="packMenuId==3">
			<li v-for="(item,index) in weiXin" :class="{'seleced':weiXinType==item.id}" @click="queryTo(item.id)" :key="index">{{item.name}}</li>
		</ul>
		<div style="height: 40px;line-height: 40px">
			<span style="margin-right:150px">当前渠道：{{name}}</span>
			<span>渠道状态：{{statsName}}</span>
		</div>
		<el-table :data="currentList" stripe>
			<el-table-column label="操作" width="250">
				<template slot-scope="scope">
					<span v-if="status!=-1" style="cursor: pointer">
						<span style="color: #28A8E0;" @click="see()">查看详情</span>
						<span style="padding:0 10px;color: #D2D2D2;">|</span>
						<span style="color: #FE8D2C;" @click="edit()">编辑</span>
						<span style="padding:0 10px;color: #D2D2D2;">|</span>
						<span @click="toOn()">
							<el-switch v-model="on" active-color="#13ce66" inactive-color="#ff4949">
							</el-switch>
						</span>
					</span>
					<span v-else style="cursor: pointer">
						<span style="color:#E5E5E0;font-size: 16px">查看详情</span>
						<span style="padding:0 10px;color: #D2D2D2;">|</span>
						<span style="color:#E5E5E0;font-size: 16px">编辑</span>
						<span style="padding:0 10px;color: #D2D2D2;">|</span>
						<span style="color: #FD3F1F;font-size: 16px" @click="open()">开通</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="市别名称" prop="name"></el-table-column>
			<el-table-column label="时间段" prop="time"></el-table-column>
			<el-table-column label="市别商品" prop="cityGoods"></el-table-column>
			<el-table-column label="人均商品" prop="peopleGoods"></el-table-column>
			<el-table-column label="必点商品" prop="mustGoods"></el-table-column>
			<el-table-column label="必点商品关联子菜" prop="mustSonGoods"></el-table-column>
			<el-table-column label="必点商品起售数量" prop="mustNum"></el-table-column>
		</el-table>

		<!--<comTable style="margin-top: -10px" :showHand="false" :titleData="titleData" :introData="currentList" :bannerStyle="bannerStyle" :contentStyle="contentStyle" :titleHeight="50" :listHeight="70">-->
		<!--<span style="cursor: pointer;display: inline-block" slot="con-0" slot-scope="props">-->
		<!--<span v-if="status!=-1">-->
		<!--<span style="color: #28A8E0;font-size: 16px" @click="see()">查看详情</span>-->
		<!--<span style="padding:0 10px;color: #D2D2D2;">|</span>-->
		<!--<span style="color: #FE8D2C;font-size: 16px" @click="edit()">编辑</span>-->
		<!--<span style="padding:0 10px;color: #D2D2D2;">|</span>-->
		<!--<onOff :status="Boolean(Number(status))" @statusChange="getIsDiscountToggle" style="display: inline-block;top:16px;position:relative;"></onOff>-->
		<!--</span>-->
		<!--<span v-else>-->
		<!--<span style="color:#E5E5E0;font-size: 16px" >查看详情</span>-->
		<!--<span style="padding:0 20px;color: #D2D2D2;">|</span>-->
		<!--<span style="color:#E5E5E0;font-size: 16px" >编辑</span>-->
		<!--<span style="padding:0 20px;color: #D2D2D2;">|</span>-->
		<!--<span style="color: #FD3F1F;font-size: 16px" @click="open()">开通</span>-->
		<!--</span>-->
		<!--</span>-->
		<!--</comTable>-->
		<openMenu v-if="isOpenShow" :pObj="openItem" @throwChannelWin="closeChannelGoods"></openMenu>
		<seeMenu v-if="isSee" :getGoods="getGoods" :getPacks="getPacks" :goodCom="goodCom" :item="currentList[0]" @throwMenuWin="seeMenuBack"></seeMenu>
		<editMenu v-if="isEdit" :getGoods="getGoods" :getPacks="getPacks" :goodCom="goodCom" @goodListWin="editMenuBack"></editMenu>
	</div>
</template>

<script>
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			menu: [
				{ id: 1, name: '桌台模式' },
				{ id: 2, name: '电子菜单' },
				{ id: 3, name: '微店' },
				{ id: 4, name: '先付模式' }
			],
			weiXin: [
				{ id: 7, name: '在线点单' },
				{ id: 8, name: '自助点单' },
				{ id: 9, name: '外卖' },
				//				{ id: 10, name: '自提' },
				{ id: 11, name: '快递' }
			],
			packMenuId: 1, //选中渠道类型，默认桌台模式
			weiXinType: 7, //微信子渠道类型，默认在线点单

			currentList: [], //展示的列表数据
			allList: [], //所有渠道数据

			isOpenShow: false, //是否显示开通渠道的弹窗
			openItem: {}, //传给开通渠道页面的数据

			isSee: false, //查看详情
			isEdit: false, //编辑

			version: {}, //版本号

			goodCom: {}, //传给编辑页面的数据
			getGoods: [], //传给编辑页面的商品
			getPacks: [], //传给编辑页面的套餐
			copyGoods: [], //备份所有商品
			copyPacks: [], //

			name: '', //渠道名称
			statsName: '', //渠道状态名称
			status: -1, //渠道状态
			id: '', //渠道id

			on: false, //开关

			allGoodX: [], //所有下架商品
			allPackX: [] //所有下架套餐
		};
	},
	created() {
		this.getpackagelist(); //获取套餐列表
		this.getGoodsList(); //获取商品列表
		//		this.titleData = [
		//			{ titleName: '操作', titleStyle: { width: '300px' } },
		//			{ titleName: '市别名称', dataName: 'name' },
		//			{ titleName: '时间段', dataName: 'time' },
		//			{ titleName: '市别商品', dataName: 'cityGoods' },
		//			{ titleName: '人均商品', dataName: 'peopleGoods' },
		//			{ titleName: '必点商品', dataName: 'mustGoods' },
		//			{ titleName: '必点商品关联子菜', dataName: 'mustSonGoods' },
		//			{ titleName: '必点商品起售数量', dataName: 'mustNum' }
		//		];
		//		this.bannerStyle = {
		//			backgroundColor: '#F2F2F2',
		//			color: '#434149',
		//			fontSize: '16px'
		//		};
		//		this.contentStyle = {
		//			color: '#666666',
		//			fontSize: '14px'
		//		};
		this.getList();
	},
	methods: {
		//获取渠道列表
		async getList() {
			let res = await http.ChannelGetList({
				data: {}
			});
			this.allList = res;
			console.log(this.allList);
			this.difference();
		},
		//选择渠道
		selectPack(id) {
			this.packMenuId = id;
			this.difference();
		},
		//选择子渠道
		queryTo(id) {
			this.weiXinType = id;
			this.difference();
		},
		//开关组件返回
		//        getIsDiscountToggle(res) {
		//		    console.log(res);
		//            this.status=Number(res);
		//            this.statsName=this.status == 0 ? '关闭' : '开启';
		//            this.ChannelEdit();
		//        },
		//开关组件改变
		toOn() {
			console.log(this.on);
			this.status = Number(this.on);
			this.statsName = this.on ? '开启' : '关闭';
			this.ChannelEdit();
		},
		//给列表赋不同渠道的值
		difference() {
			let id = this.packMenuId == 3 ? this.weiXinType : this.packMenuId;
			for (let i = 0; i < this.allList.length; i++) {
				if (this.allList[i].id == id) {
					let v = this.allList[i];
					this.name = v.name;
					this.status = v.status;
					this.id = v.id;
					this.statsName =
						v.status == -1
							? '未开通'
							: v.status == 0 ? '关闭' : '开启';
					if (v.status == -1) {
						this.currentList = [
							{
								name: '全时段',
								time: '--',
								cityGoods: 0,
								peopleGoods: 0,
								mustGoods: 0,
								mustSonGoods: 0,
								mustNum: 0
							}
						];
					} else {
						this.on = Boolean(Number(v.status));
						this.currentList = [
							{
								name: '全时段',
								time: '--',
								cityGoods:
									(v.goodsIds == ''
										? 0
										: v.goodsIds.split(',').length) +
									(v.packageIds == ''
										? 0
										: v.packageIds.split(',').length),
								peopleGoods: v.perGoodsIds.length,
								mustGoods:
									(v.mustGids == ''
										? 0
										: v.mustGids.split(',').length) +
									(v.mustPids == ''
										? 0
										: v.mustPids.split(',').length),
								mustSonGoods:
									(v.mustSonGids == ''
										? 0
										: v.mustSonGids.split(',').length) +
									(v.mustSonPids == ''
										? 0
										: v.mustSonPids.split(',').length),
								mustNum: v.mustNum
							}
						];
					}
				}
			}
		},
		//处理发送给子组件的数据
		handleData() {
			let id = this.packMenuId == 3 ? this.weiXinType : this.packMenuId;
			for (let i = 0; i < this.allList.length; i++) {
				if (this.allList[i].id == id) {
					let v = this.allList[i];
					this.goodCom = {
						id: v.id, //渠道id
						goodsIds: v.goodsIds == '' ? [] : v.goodsIds.split(','), //市别菜品
						packageIds:
							v.packageIds == '' ? [] : v.packageIds.split(','), //市别套餐
						mustGids: v.mustGids == '' ? [] : v.mustGids.split(','), //必点商品id集合
						mustPids: v.mustPids == '' ? [] : v.mustPids.split(','), //必点套餐id集合
						mustNum: v.mustNum, //必点数量
						mustSonGids:
							v.mustSonGids == '' ? [] : v.mustSonGids.split(','), //必点商品子菜id集合
						mustSonPids:
							v.mustSonPids == '' ? [] : v.mustSonPids.split(','), //必点商品子套餐id集合
						perGoodsIds: v.perGoodsIds.map(v => {
							return v.gid;
						}) //人均商品
					};
				}
			}
			this.addXia();
		},
		//添加选择过的下架商品
		addXia() {
			this.getGoods = utils.deepCopy(this.copyGoods);
			this.getPacks = utils.deepCopy(this.copyPacks);
			for (let i = 0; i < this.goodCom.mustGids.length; i++) {
				//添加必点选择过的下架商品
				for (let j = 0; j < this.allGoodX.length; j++) {
					if (this.goodCom.mustGids[i] == this.allGoodX[j].id) {
						if (!this.allGoodX[j].goodsName.includes('(已下架)')) {
							this.allGoodX[j].goodsName += '(已下架)';
						}
						this.getGoods.unshift(this.allGoodX[j]);
						console.log(this.allGoodX[j].goodsName);
						break;
					}
				}
			}

			for (let i = 0; i < this.goodCom.mustPids.length; i++) {
				//添加必点选择过的下架套餐
				for (let j = 0; j < this.allPackX.length; j++) {
					if (this.goodCom.mustPids[i] == this.allPackX[j].id) {
						if (
							!this.allPackX[j].packageName.includes('(已下架)')
						) {
							this.allPackX[j].packageName += '(已下架)';
						}
						this.getPacks.unshift(this.allPackX[j]);
						console.log(this.allPackX[j].packageName);
						break;
					}
				}
			}
			//电子菜单和微店过滤自定义商品
			if (this.packMenuId == 2 || this.packMenuId == 3) {
				console.log('电子菜单和微店');
				for (let i = 0; i < this.getGoods.length; i++) {
					if (this.getGoods[i].type == '2') {
						this.getGoods.splice(i, 1);
						i--;
					}
				}
			}
		},
		//查看详情
		see() {
			this.handleData();
			this.isSee = true;
		},
		//查看详情返回
		seeMenuBack() {
			this.isSee = false;
		},
		//编辑
		edit() {
			this.handleData();
			this.isEdit = true;
		},
		//编辑返回
		editMenuBack(res) {
			if (res == 'ok') {
				this.getList();
			}
			this.isEdit = false;
		},
		//开通
		open() {
			this.openItem = {
				id: this.id,
				name: this.name,
				status: this.status
			};
			this.isOpenShow = true;
		},
		//开通渠道返回的事件
		closeChannelGoods(res) {
			if (res == 'update') {
				this.getList();
			}
			this.isOpenShow = false;
		},
		//获取商品列表
		async getGoodsList() {
			let goodLists = storage.session('goodList');
			let goodList = [];
			let version = storage.session('httpGoodVersion');
			let res = false;
			this.version = await this.ShopGetExtra();
			if (
				version &&
				this.version.goodsConfigVer == version.goodsConfigVer
			) {
				res = true;
			} else {
				res = false;
				storage.session('httpGoodVersion', this.version);
			}
			//如果存在保存的商品数据
			if (goodLists && res) {
				goodList = goodLists;
			} else {
				//如果不存在保存的商品数据
				let good = await http.getGoodsList({
					data: {
						page: 1,
						num: 9999,
						specification: 1
					}
				});
				storage.session('goodList', good.list);
				goodList = good.list;
			}
			//过滤下架
			for (let i = 0; i < goodList.length; i++) {
				if (goodList[i].status == '2') {
					this.allGoodX.push(goodList[i]); //所有下架的商品
					goodList.splice(i, 1);
					i--;
				}
			}
			//给多规格主菜添加myId属性，myId即其所有子菜id。
			for (let j = 0; j < goodList.length; j++) {
				if (goodList[j].isGroup == 1) {
					goodList[j].myId = [];
					for (let i = 0; i < goodList.length; i++) {
						if (goodList[i].groupId == goodList[j].id) {
							goodList[j].myId.push(goodList[i].id);
							// console.log(goodList[j].myId);
						}
					}
				}
			}
			this.copyGoods = utils.deepCopy(goodList);
			this.getGoods = utils.deepCopy(goodList);
		},
		//获取套餐列表
		async getpackagelist() {
			let packLists = storage.session('packList');
			let packlist = [];
			let version = storage.session('httpGoodVersion');
			let res = false;
			this.version = await this.ShopGetExtra();
			if (
				version &&
				this.version.otherConfigVer == version.otherConfigVer
			) {
				res = true;
			} else {
				res = false;
				storage.session('httpGoodVersion', this.version);
			}
			if (packLists && res) {
				packlist = packLists;
			} else {
				packlist = await http.getpackagelist({
					data: { page: 1, num: 9999 }
				});
				storage.session('packList', packlist);
			}
			//过滤下架套餐
			for (let i = 0; i < packlist.length; i++) {
				if (packlist[i].status == '2') {
					this.allPackX.push(packlist[i]); //所有下架的套餐
					packlist.splice(i, 1);
					i--;
				}
			}
			this.copyPacks = utils.deepCopy(packlist);
			this.getPacks = utils.deepCopy(packlist);
		},
		//获取版本号
		async ShopGetExtra() {
			let res = await http.ShopGetExtra({ data: {} });
			return res;
		},
		//开启
		async ChannelEdit() {
			let res = await http.ChannelEdit({
				data: {
					id: this.id,
					status: this.status
				}
			});
			if (res) {
				this.getList();
			}
		}
	},
	components: {
		//		comTable: () =>
		//			import(/*webpackChunkName:'com_table'*/ 'src/components/com_table'),
		openMenu: () =>
			import(/* webpackChunkName:'open_menu_win' */ './multi_channel/open_menu_win'),
		seeMenu: () =>
			import(/* webpackChunkName:'see_menu_win' */ './multi_channel/see_menu_win'),
		editMenu: () =>
			import(/*webpackChunkName:'edit_menu_win'*/ './multi_channel/edit_menu_win')
		//        onOff: () =>
		//            import(/* webpackChunkName:"on_off" */ 'src/components/on_off'),
	}
};
</script>

<style lang='less' scoped>
#moreMenu {
	.all {
		height: 50px;
		overflow: hidden;
		display: inline-block;
		.raduobtn {
			width: 100px;
			height: 40px;
			line-height: 40px;
			float: left;
			border-radius: 5px;
			margin-right: 10px;
			background-color: #f2f2f2;
			color: #333;
		}
		.selectbtn {
			background-color: #2fa8dd;
			color: #fff;
		}
	}
	.neckTab {
		cursor: pointer;
		width: 100%;
		height: 26px;
		min-width: 600px;
		border-bottom: 1px solid #d4d4d4;
		margin-bottom: 10px;
		li {
			height: 27px;
			line-height: 27px;
			float: left;
			padding: 0 10px;
			margin: 0 28px -1px;
			color: #585757;
		}
		li.seleced {
			color: #00a1ea;
			border-bottom: 2px solid #00a1ea;
		}
	}
}
</style>