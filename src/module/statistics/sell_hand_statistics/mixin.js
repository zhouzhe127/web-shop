import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export const mixin = {
	data() {
		return {
			ischain: storage.session('userShop').currentShop.ischain,
			staffList: Object, //工作人员
			postSelectShopList: [], //所有的店铺列表
		};
	},
	methods: {
		//每页显示多少条数据
		handleSizeChange(p) {
			this.page = 1;
			this.num = p;
			this.getConsumeStatistics();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.getConsumeStatistics();
		},
		errorShow(content) {
			this.$store.commit('setWin', {
				title: '提示信息',
				winType: 'alert',
				content: content
			});
		},
		async getAssistantstaff() { //获取工作人员
			let res = await http.getAssistantstaff();
			if (res) {
				this.staffList = res;
			}
		},
		getShopName: function(id) {
			let shopName = '--';
			for (let item of this.postSelectShopList) {
				if (id == item.id) {
					shopName = item.name;
					break;
				}
			}
			return shopName;
		},
		getPersonName: function(id) {
			let name = '--';
			for (let key in this.staffList) {
				if (id == this.staffList[key].staffId) {
					name = this.staffList[key].staffName;
					break;
				}
			}
			return name;
		},
		getshopIdorshopName: function() {
			//默认全部选中
			if (this.ischain == '3') {
				let selectShopList = storage.session('shopList');
				let shopIds = [];
				let selectName = [];
				for (let item of selectShopList) {
					item.selected = true;
					item.name = item.shopName;
					shopIds.push(item.id);
					selectName.push(item.name);
				}
				this.shopIds = shopIds.join(',');
				this.selectName = selectName.join(',');
				this.postSelectShopList = selectShopList;
				this.transmitId = selectShopList.map((v) => {
					return v.id;
				});
			} else {
				this.shopIds = storage.session('userShop').currentShop.id;
				this.selectName = storage.session('userShop').currentShop.name;
				this.postSelectShopList.push(
					storage.session('userShop').currentShop
				);
			}
		},
		formatTime: function(time) {
			if (time && time.length == 10) {
				time *= 1000;
			}
			return utils.format(new Date(time), 'yyyy-MM-dd');
		},
	}
};