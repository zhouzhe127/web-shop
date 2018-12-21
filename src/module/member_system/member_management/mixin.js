import utils from 'src/verdor/utils';
export const mixin = {
	data() {
		return {
			trantypeList: [{ //消费类型
				name: '店内消费',
				id: 1
			}, {
				name: '充值',
				id: 2
			}, {
				name: '积分商城兑换',
				id: 3
			}, {
				name: '消费获得积分',
				id: 4
			}, {
				name: '裂变获得积分',
				id: 5
			}, {
				name: '微信消费',
				id: 6
			}, {
				name: '微信充值',
				id: 7
			}, {
				name: '积分过期',
				id: 8
			}, {
				name: '积分抵扣',
				id: 9
			}, {
				name: '积分调整(强制增加)',
				id: 10
			}, {
				name: '积分调整(强制减少)',
				id: 11
			}, {
				name: '余额调整(强制增加)',
				id: 12
			}, {
				name: '余额调整(强制减少)',
				id: 13
			}, {
				name: '退款失败',
				id: 14
			}, {
				name: '积分卡券',
				id: 17
			}, {
				name: '评论获得积分',
				id: 18
			}, {
				name: '积分强制增加(失败)',
				id: 19
			}, {
				name: '积分强制减少(失败)',
				id: 20
			}, {
				name: '余额强制增加(失败)',
				id: 21
			}, {
				name: '余额强制减少(失败)',
				id: 22
			}, {
				name: '订单取消返还余额',
				id: 23
			}, {
				name: '订单取消返还抵扣积分',
				id: 24
			}, {
				name: '订单取消扣除获赠积分',
				id: 25
			}, {
				name: '升级获得积分',
				id: 33
			}, {
				name: '有赞获得积分',
				id: 34
			}, {
				name: '有赞减少积分',
				id: 35
			}, {
				name: '修改确认消费操作的积分',
				id: 36
			}],
		};
	},
	methods: {
		judgeType: function(item) {
			// 判断操作类型 是否加还是减
			let operate;
			if (item.type == '1' || item.type == '3' || item.type == '6' || item.type == '9' || item.type == '11' || item.type ==
				'13' || item.type == '25' || item.type == '28') {
				operate = '-';
			} else {
				operate = '+';
			}
			// 36: "修改确认消费操作的积分" status 0 减 status 1 加
			if (item.type == '36') {
				if (item.status == '0') {
					operate = '-';
				} else {
					operate = '+';
				}
			}
			if (item.type == '3' || item.type == '4' || item.type == '5' || item.type == '8' || item.type == '9' || item.type ==
				'10' || item.type == '11' || item.type == '33' || item.type == '36') {
				return operate + item.operatePoint;
			} else {
				if (item.type == '1' || item.type == '6') {
					return operate + (parseInt(Number(item.operateAmount) * 100) + parseInt(Number(item.operateGiftAmount) * 100)) / 100;
				} else if (item.type == '2') {
					if (this.bannerIndex == 2) {
						return operate + (Number(item.operatePoint));
					} else {
						return operate + (parseInt(Number(item.rechargeAmount) * 100) + parseInt(Number(item.operateGiftAmount) * 100)) / 100;
					}
				} else {
					if (this.bannerIndex == 2) {
						return operate + (Number(item.operatePoint));
					} else {
						return operate + (Number(item.operateAmount));
					}
				}
			}
		},
		translateTime: function(time, type) {
			//转换时间
			if (type) {
				return utils.format(time, 'yyyy-MM-dd hh:mm:ss');
			} else {
				return utils.format(time, 'yyyy-MM-dd');
			}
		},
		filterType: function(type) {
			let objType = '--';
			for (let item of this.trantypeList) {
				if (type == item.id) {
					objType = item.name;
				}
			}
			return objType;
		},
	}
};