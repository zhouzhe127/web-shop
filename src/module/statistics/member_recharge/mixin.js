export const mixin = {
	data() {
		return {
			showWin: false, //优惠券弹窗显示
			CouponDetails: {
				couponList: [], // 优惠券列表
				couponCount: 0 // 优惠券张数
			},
			preferentialBounced: false, //其他支付方式弹窗
			otherPayDetail: '', //自定义支付方式的详情
			paymentType: '', //自定义支付的方式区分
			paymentShopId: '' //自定义支付的店铺的id			
		};
	},
	methods: {
		//查看优惠点击
		openDiscount: function(item) {
			//点击查看优惠券的方法
			this.showWin = true;
			this.CouponDetails.couponCount = item.totalGiftCoupon;
			this.CouponDetails.couponList = item.couponData;
		},
		getResult: function(res) {
			//选择业务类型
			if (res == 'ok') {
				//this.bussinessselect = item;
			}
			this.showWin = false;
		},
		valiData(content, title, winType) {
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		setPage: function() {
			this.endTotal = Math.ceil((this.allFormList.length) / (this.num));
			let pageStart = (this.page - 1) * (this.num);
			let pageEnd = (this.page) * (this.num);
			let pageContent = this.allFormList.slice(pageStart, pageEnd);
			this.formList = pageContent;
		},
		whetherToclick: function(res) {
			if (res) {
				this.preferentialBounced = false;
			}
		},
		openPayment: function(index,item, type) { //打开其他支付方式的弹窗
			this.preferentialBounced = true;
			this.paymentShopId = item.shopId;
			this.otherPayDetail = item.otherPayDetail;
			this.paymentType = type; //区分汇总还是单店
		}
	}
};