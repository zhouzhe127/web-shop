<template>
	<div class="pm-detail" id="messageHtml">
		<div class="pd-line">
			<div class="left">
				推送标题
			</div>
			<div class="center">
				:
			</div>
			<div class="right">
				{{detail.title}}
			</div>
		</div>
		<div class="pd-line">
			<div class="left">筛选项</div>
			<div class="center">:</div>
			<div class="right" v-html="detail.screenCondition">
			</div>
		</div>
		<div class="pd-line">
			<div class="left">推送人数</div>
			<div class="center">:</div>
			<div class="right">{{detail.num}}</div>
		</div>
		<div class="pd-line">
			<div class="left">推送方式</div>
			<div class="center">:</div>
			<div class="right">{{detail.msgChannel == "12" ? "短信/微信" : detail.msgChannel == "1" ? "微信" : "短信"}}</div>
		</div>
		<div class="pd-line" v-if="detail.msgChannel == 12 || detail.msgChannel == 1">
			<div class="left">微信内容</div>
			<div class="center">:</div>
			<div class="right">{{detail.wxMessage}}
			</div>
		</div>
		<div class="pd-line" v-if="detail.msgChannel == 12 || detail.msgChannel == 2">
			<div class="left">短信内容</div>
			<div class="center">:</div>
			<div class="right">{{detail.message}}</div>
		</div>
		<div class="pd-line" v-if="detail.msgChannel == 12 || detail.msgChannel == 2">
			<div class="left">短信数量</div>
			<div class="center">:</div>
			<div class="right">{{detail.messageNum}}</div>
		</div>
		<div class="pd-line" v-if="detail.msgChannel == 12 || detail.msgChannel == 1">
			<div class="left">微信数量</div>
			<div class="center">:</div>
			<div class="right">{{detail.wxNum}}</div>
		</div>
		<div class="pd-line">
			<div class="left">推送状态</div>
			<div class="center">:</div>
			<div class="right">{{detail.status == 1 ? "已推送" : "推送中"}}</div>
		</div>
		<div class="pd-line">
			<div class="left">推送时间</div>
			<div class="center">:</div>
			<div class="right">{{changeTimeShow(detail.createTime,"type")}}</div>
		</div>
	</div>
</template>

<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	let userData = storage.session('userShop');
	export default {
		data() {
			return {
				detail: this.details
			};
		},
		props: {
			'details': {
				type: null
			},
			'levelListObj': {
				type: null,
				default: {}
			},
			'shopListObj': {
				type: null,
				default: {}
			},
			'tagListObj': {
				type: null,
				default: {}
			}
		},
		methods: {
			changeTimeShow(t, type) {
				t += '';
				if (t.length == 10) t += '000';
				t -= 0;
				if (type) {
					return utils.format(new Date(t), 'yyyy-MM-dd hh:mm:ss');
				}
				return utils.format(new Date(t), 'yyyy-MM-dd');
			},
			getPushContent: function () {
				let d = utils.deepCopy(this.detail);
				let ht =''; 
				if (d.registerStartTime) {
					let st = this.changeTimeShow(d.registerStartTime);
					let et = this.changeTimeShow(d.registerEndTime);
					ht = ('注册日期:' + st + '至' + et + '<br />');
				}
				let gen = '';
				if (d.gender == '' || d.gender == '12' || d.gender == '0' || d.gender == '21') {
					gen = '不限制';
				} else {
					gen = d.gender == 1 ? '男' : '女';
				}
				ht += ('性别:' + gen + '<br />');
				if (d.startAge.length > 0 || d.endAge.length > 0) {
					if (d.startAge && d.endAge) {
						ht += ('年龄:' + d.startAge + '岁-' + d.endAge + '岁<br />');
					}
					if (!d.startAge && d.endAge) {
						ht += ('年龄:' + d.endAge + '岁以下' + '<br />');
					}
					if (d.startAge && !d.endAge) {
						ht += ('年龄:' + d.startAge + '岁以上' + '<br />');
					}
				}

				if (d.levelIds.length > 0) {
					ht += ('会员等级:' + d.levelIds + '<br />');
				}
				if (d.shopIds.length > 0) {
					ht += ('店铺:' + d.shopIds + '<br />');
				}
				d.mobile += '';
				if (d.mobile.length > 0) {
					if (d.mobile.length < 11) {
						ht += ('手机号:' + d.mobile + '(包含用户)<br />');
					} else {
						ht += ('手机号:' + d.mobile + '<br />');
					}

				}
				if (d.tagIds.length > 0) {
					ht += ('会员标签:' + d.tagIds + '<br />');
				}
				d.screenCondition = ht;
				this.detail = d;
			},
			idToGetName: function () {
				let d = this.detail;
				if (d.levelIds.length > 0) {
					d.levelIds = this.getName(1, d);
				}
				if (d.shopIds.length > 0) {
					d.shopIds = userData.currentShop.ischain == 3 ? this.getName(2, d) : userData.currentShop.name;
				}
				if (d.tagIds.length > 0) {
					d.tagIds = this.getName(3, d);
				}
			},
			getName(type, d) {
				let obj = type == 1 ? this.levelListObj : type == 2 ? this.shopListObj : this.tagListObj;
				let str = type == 1 ? d.levelIds : type == 2 ? d.shopIds : d.tagIds;
				let name = '';
				if (str.length > 0) {
					let arr = str.split(',');
					for (let i = 0; i < arr.length; i++) {
						if (type == 2) {
							if (obj[arr[i]]) {
								name += obj[arr[i]].shopName;
							} else {
								name += userData.currentShop.name;
							}
						} else {
							name += obj[arr[i]].name;
						}
						if (i < arr.length - 1) {
							name += ', ';
						}
					}
				} else {
					return '';
				}
				return name;
			}
		},
		mounted() {
			this.idToGetName();
			this.getPushContent();
		}
	};
</script>


<style type="text/css" scoped>
	.pm-detail {
		padding: 40px 60px;
		width: 640px;
	}

	.pm-detail .pd-line {
		float: left;
		width: 100%;
		height: auto;
		line-height: 36px;
	}

	.pm-detail .pd-line div {
		float: left;
	}

	.pm-detail .pd-line .left {
		width: 66px;
		height: 36px;
		text-align: right;
	}

	.pm-detail .pd-line .center {
		width: 8px;
		height: 36px;
		text-align: center;
	}

	.pm-detail .pd-line .right {
		width: 416px;
		height: auto;
		line-height: 36px;
	}
</style>