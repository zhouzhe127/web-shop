(window.webpackJsonp=window.webpackJsonp||[]).push([["member_recharges_onedetail"],{6958:function(t,e,a){"use strict";a.r(e);var n=a("81a2"),i=a("bbb9");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function n(i,o){try{var r=e[i](o),s=r.value}catch(t){return void a(t)}if(!r.done)return Promise.resolve(s).then(function(t){n("next",t)},function(t){n("throw",t)});t(s)}("next")})}}var r={mixins:[a("c159").a],data:function(){return{page:1,num:10,endTotal:1,index:null,goodsName:"",titleList:[{titleName:"天数",dataName:"days"},{titleName:"充值人数",dataName:"rechargePersonNum"},{titleName:"充值次数",dataName:"rechargeNum"},{titleName:"充值总额",dataName:"totalRecharge"},{titleName:"支付总额 ",dataName:"totalPayment"},{titleName:"现金",dataName:"totalCash"},{titleName:"银行卡",dataName:"totalCard"},{titleName:"微信",dataName:"totalWeChat"},{titleName:"支付宝",dataName:"totalAliPay"},{titleName:"中信微信",dataName:"totalZXWeChat"},{titleName:"中信支付宝",dataName:"totalZXAliPay"},{titleName:"自定义支付",dataName:"totalOtherPay",titleStyle:{fontSize:"16px"},conStyle:{color:"#27a8e0",cursor:"pointer"}},{titleName:"赠送总额",dataName:"totalGiftAmount"},{titleName:"赠送积分",dataName:"totalGiftPoint"},{titleName:"赠送优惠券",dataName:"totalGiftCoupon",conStyle:{color:"#27a8e0",cursor:"pointer"}}],staticLists:[],shoptitleList:[{titleName:"操作 ",conStyle:{color:"#27a8e0",cursor:"pointer"}},{titleName:"时间",dataName:"createTime",titleStyle:{width:"160px",flex:"none"}},{titleName:"卡号",dataName:"cardNumber",titleStyle:{width:"160px",flex:"none"}},{titleName:"卡类型",dataName:"cardTypeName"},{titleName:"手机号 ",dataName:"mobile"},{titleName:"会员姓名",dataName:"memberName"},{titleName:"充值金额",dataName:"recharge"},{titleName:"支付金额",dataName:"payment"},{titleName:"支付方式",dataName:"payType"},{titleName:"操作员",dataName:"staffName"},{titleName:"赠送总额",dataName:"giftAmount"},{titleName:"赠送积分",dataName:"giftPoint"},{titleName:"赠送优惠券",dataName:"giftCoupon",conStyle:{color:"#27a8e0",cursor:"pointer"}}],staticshopLists:[],showWin:!1,isPopupwindow:"",allFormList:[],formList:[],allLists:[],count:"",payTypeList:{},isShow:"all",cardNumber:"",mid:"",shopsId:""}},methods:{getcommodity:function(){var t,e=new RegExp(this.goodsName);t=this.allLists.filter(function(t){return e.test(t.oid)}),this.allFormList=Object.values(t),this.setPage()},reset:function(){this.page=1,this.goodsName="",this.getRechargeData()},returnShopstatic:function(){this.$emit("throwWinResult","all")},getPageNum:function(t){this.page=t.page,this.num=t.num,this.getRechargeData()},getRechargeData:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.getRechargeData({data:{taskId:t.taskId,showDetail:1,showShopId:t.constructionsId,showDay:"",page:t.page,num:t.num}});case 2:(a=e.sent)&&(t.count=a.count,t.endTotal=a.total,t.staticLists=[],t.staticLists.push(a.list.total),t.formList=a.list.list,t.payTypeList=a.list.total.otherPayDetail);case 4:case"end":return e.stop()}},e,t)}))()},formatTime:function(t){return 10==t.length&&(t*=1e3),i.a.format(new Date(t),"yyyy-MM-dd hh:mm:ss")},getpaytypeName:function(t){switch(Number(t)){case 1:return"现金";case 2:return"银联";case 3:return"微信";case 4:return"支付宝";case 5:return"会员卡";case 6:return"中信微信支付";case 7:return"中信支付宝支付";case 23:return"上海中信";case 24:return"上海中信支付宝"}},Export:function(){var t=this;return o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.exportRechargeData({data:{taskId:t.taskId,showDetail:1,showShopId:t.constructionsId,showDay:"",page:t.page,num:t.num,isExport:1}});case 2:case"end":return e.stop()}},e,t)}))()},getDetail:function(){var t=this;this.isShow="all",this.$store.commit("setPageTools",[{name:"返回",className:["fd-blue"],fn:function(){t.returnShopstatic()}},{name:"导出",className:["fd-blue"],fn:function(){t.Export()}}])},openDetail:function(t){""==t.cardNumber?(this.isShow="member",this.mid=t.memberId,this.shopsId=t.shopId):(this.cardNumber=t.cardNumber,this.isShow="detail")}},props:{constructionsName:String,startTime:Number,endTime:Number,constructionsId:String,isOpenTime:Boolean,taskId:Number,shopsList:Array},components:{pageElement:function(){return a.e("page_element").then(a.bind(null,"5921"))},comTable:function(){return a.e("table").then(a.bind(null,"4360"))},"coupon-detail":function(){return a.e("member_recharge_couponwin").then(a.bind(null,"f4a5"))},paymentWin:function(){return a.e("payment_win").then(a.bind(null,"f7ec"))},cardDetail:function(){return a.e("card_queries_detail").then(a.bind(null,"1a010"))},memberDetail:function(){return a.e("member_manage_detail").then(a.bind(null,"7321"))}},created:function(){var t={titleStyle:{fontSize:"16px"}},e={conStyle:{color:"#ff9800"}},a=!0,n=!1,i=void 0;try{for(var o,r=this.titleList[Symbol.iterator]();!(a=(o=r.next()).done);a=!0){var s=o.value;"totalOtherPay"!=s.dataName&&Object.assign(s,t,e)}}catch(t){n=!0,i=t}finally{try{!a&&r.return&&r.return()}finally{if(n)throw i}}var l=!0,c=!1,m=void 0;try{for(var u,d=this.shoptitleList[Symbol.iterator]();!(l=(u=d.next()).done);l=!0){var h=u.value;"cardNumber"!=h.dataName&&"createTime"!=h.dataName&&Object.assign(h,t)}}catch(t){c=!0,m=t}finally{try{!l&&d.return&&d.return()}finally{if(c)throw m}}},mounted:function(){var t=this;this.$store.commit("setPageTools",[{name:"返回",className:["fd-blue"],fn:function(){t.returnShopstatic()}},{name:"导出",className:["fd-blue"],fn:function(){t.Export()}}]),this.getRechargeData()},destroyed:function(){clearInterval(this.timer)}},s=(a("b59a"),a("d801")),l=Object(s.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"membercard"}},["all"==t.isShow?a("section",[a("div",{staticClass:"choiceshop"},[a("div",{staticClass:"choiceshop_l"},[t._v("\n\t\t\t\t选择店铺:\n\t\t\t")]),t._v(" "),a("div",{staticClass:"choiceshop_r"},[t._v("\n\t\t\t\t"+t._s(t.constructionsName)+" | 选择时间:"+t._s(t.formatTime(t.startTime))+" - "+t._s(t.formatTime(t.endTime))+"\n\t\t\t")])]),t._v(" "),a("section",{staticStyle:{"margin-bottom":"20px"}},[a("com-table",{attrs:{listHeight:80,listWidth:1400,showHand:!1,titleData:t.titleList,introData:t.staticLists},scopedSlots:t._u([{key:"con-0",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t1\n\t\t\t\t")])}},{key:"con-11",fn:function(e){return a("div",{on:{click:function(a){t.openPayment(e.data,"one")}}},[t._v("\n\t\t\t\t\t"+t._s(e.data.totalOtherPay)+"\n\t\t\t\t")])}}])})],1),t._v(" "),a("section",[a("com-table",{key:t.index,attrs:{listHeight:80,listWidth:1400,showHand:!1,titleData:t.shoptitleList,introData:t.formList,listName:"会员充值统计",showTitle:1,allTotal:t.count},scopedSlots:t._u([{key:"con-0",fn:function(e){return a("div",{on:{click:function(a){t.openDetail(e.data)}}},[t._v("\n\t\t\t\t\t查看账户\n\t\t\t\t")])}},{key:"con-1",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t"+t._s(t.formatTime(e.data.createTime))+"\n\t\t\t\t")])}},{key:"con-3",fn:function(e){return a("div",{},[""==e.data.cardNumber?a("span",[t._v("电子卡")]):a("span",[t._v(t._s(e.data.cardTypeName))])])}},{key:"con-8",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t"+t._s(t.getpaytypeName(e.data.payType)||t.payTypeList[e.data.payType].paymentName)+"\n\t\t\t\t")])}},{key:"con-12",fn:function(e){return a("div",{on:{click:function(a){t.openDiscount(e.data)}}},[t._v("\n\t\t\t\t\t"+t._s(e.data.giftCoupon)+"\n\t\t\t\t")])}}])})],1),t._v(" "),a("section",{staticClass:"turn-page"},[a("pageElement",{attrs:{page:Number(t.page),total:Number(t.endTotal),numArr:[10,20,30,40,50],isNoJump:!0},on:{pageNum:t.getPageNum}})],1),t._v(" "),t.showWin?a("coupon-detail",{attrs:{CouponDetails:t.CouponDetails},on:{getAppliedWin:t.getResult}}):t._e(),t._v(" "),t.preferentialBounced?a("paymentWin",{attrs:{otherPayDetail:t.otherPayDetail,shopsList:t.shopsList,paymentType:t.paymentType,paymentShopId:t.paymentShopId},on:{toClick:t.whetherToclick}}):t._e()],1):t._e(),t._v(" "),"detail"==t.isShow?a("cardDetail",{attrs:{cardNumber:t.cardNumber},on:{throwWinResult:t.getDetail}}):t._e(),t._v(" "),"member"==t.isShow?a("memberDetail",{attrs:{mid:t.mid,shopsId:t.shopsId},on:{throwWinResult:t.getDetail}}):t._e()],1)},[],!1,null,"361be985",null);e.default=l.exports},b59a:function(t,e,a){"use strict";var n=a("ff4b");a.n(n).a},ff4b:function(t,e,a){}}]);