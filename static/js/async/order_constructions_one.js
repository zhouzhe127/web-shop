(window.webpackJsonp=window.webpackJsonp||[]).push([["order_constructions_one"],{7244:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"membercard"}},[a("section",{staticStyle:{"margin-bottom":"20px"}},[a("com-table",{attrs:{listHeight:80,listWidth:1400,showHand:!1,titleData:t.titleList,introData:t.staticLists},on:{tableEvent:t.tableEvent},scopedSlots:t._u([{key:"con-0",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t1\n\t\t\t")])}},{key:"con-6",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t"+t._s(e.data.totalVouchersPain)+"("+t._s(e.data.totalVouchersNum)+"张)\n\t\t\t")])}}])})],1),t._v(" "),a("section",[a("com-table",{attrs:{listHeight:80,listWidth:1400,showHand:!1,titleData:t.shoptitleList,introData:t.formList},on:{tableEvent:t.tableEvent},scopedSlots:t._u([{key:"con-0",fn:function(e){return a("div",{on:{click:function(a){t.openStore(e.data)}}},[t._v("\n\t\t\t\t"+t._s(e.data.oid)+"\n\t\t\t")])}},{key:"con-1",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t"+t._s(t.getstatus(t.payType))+"\n\t\t\t")])}},{key:"con-7",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t"+t._s(e.data.vouchersPain)+"("+t._s(e.data.vouchersNum)+"张)\n\t\t\t")])}}])})],1),t._v(" "),a("section",{staticClass:"turn-page"},[a("pageElement",{attrs:{page:Number(t.page),total:Number(t.endTotal),numArr:[10,20,30,40,50],isNoJump:!0},on:{pageNum:t.getPageNum}})],1)])};i._withStripped=!0;var n=a("81a2");var o={data:function(){return{page:1,num:10,endTotal:1,titleList:[{titleName:"天数",dataName:"days"},{titleName:"订单数",dataName:"totalOrderNum"},{titleName:"销量",dataName:"totalSales"},{titleName:"赠品数",dataName:"totalGift"},{titleName:"配送总额",dataName:"totalMoveFee"},{titleName:"优惠总额",dataName:"totalDiscount"},{titleName:"代金券"},{titleName:"消费总额",dataName:"totalConsumption"},{titleName:"微信支付",dataName:"totalWeChatPain"},{titleName:"会员支付",dataName:"totalMemberPain"},{titleName:"积分抵扣总额",dataName:"totalPointCash"},{titleName:"实收总额",dataName:"totalPain"}],staticLists:[],shoptitleList:[{titleName:"订单号",dataName:"oid",conStyle:{color:"#27a8e0",cursor:"pointer"},titleStyle:{width:"200px",flex:"none",fontSize:"16px"}},{titleName:"状态"},{titleName:"下单时间",dataName:"createTime",titleStyle:{width:"200px",flex:"none",fontSize:"16px"}},{titleName:"销量 ",dataName:"sales"},{titleName:"赠品数",dataName:"gift"},{titleName:"配送金额",dataName:"moveFee"},{titleName:"优惠总额",dataName:"discount"},{titleName:"代金券"},{titleName:"消费金额",dataName:"consumption"},{titleName:"微信支付",dataName:"weChatPain"},{titleName:"会员支付",dataName:"memberPain"},{titleName:"实收金额",dataName:"pain"},{titleName:"顾客电话号码",dataName:"phone"}],staticshopLists:[],isPopupwindow:"",allFormList:[],formList:[],allLists:[],oid:"",showdetail:!1}},methods:{returnShopstatic:function(){this.$emit("scanorderResult","moreday"),this.$store.commit("setPageTools",{})},tableEvent:function(){},getPageNum:function(t){this.page=t.page,this.num=t.num,this.setPage()},openStore:function(t){this.oid=t.oid,this.showdetail=!0;var e={oid:this.oid,showdetail:this.showdetail};this.$emit("scanorderResult","oneday",e)},getTakeoutData:function(){var t,e=this;return(t=regeneratorRuntime.mark(function t(){var a;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.getTakeoutData({data:{taskId:e.taskId,showDetail:1,showShopId:e.constructionsId,showDay:e.oneData}});case 2:(a=t.sent)&&(e.staticLists=[],e.staticLists.push(a.total),e.allFormList=a.list,e.allLists=e.allFormList,e.$nextTick(function(){e.setPage()}));case 4:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function i(n,o){try{var s=e[n](o),r=s.value}catch(t){return void a(t)}if(!s.done)return Promise.resolve(r).then(function(t){i("next",t)},function(t){i("throw",t)});t(r)}("next")})})()},setPage:function(){this.endTotal=Math.ceil(this.allFormList.length/this.num);var t=(this.page-1)*this.num,e=this.page*this.num,a=this.allFormList.slice(t,e);this.formList=a},getstatus:function(t){switch(t){case 0:return"已完成";case 1:return"已取消/退单"}}},props:{constructionsId:String,oneData:String,taskId:Number,payType:Number},watch:{},components:{pageElement:function(){return a.e("page_element").then(a.bind(null,"5921"))},comTable:function(){return a.e("table").then(a.bind(null,"4360"))}},created:function(){var t={titleStyle:{fontSize:"16px"}},e={conStyle:{color:"#ff9800"}},a=!0,i=!1,n=void 0;try{for(var o,s=this.titleList[Symbol.iterator]();!(a=(o=s.next()).done);a=!0){var r=o.value;Object.assign(r,t,e)}}catch(t){i=!0,n=t}finally{try{!a&&s.return&&s.return()}finally{if(i)throw n}}var l=!0,c=!1,u=void 0;try{for(var m,d=this.shoptitleList[Symbol.iterator]();!(l=(m=d.next()).done);l=!0){var h=m.value;"oid"!=h.dataName&&"createTime"!=h.dataName&&Object.assign(h,t)}}catch(t){c=!0,u=t}finally{try{!l&&d.return&&d.return()}finally{if(c)throw u}}},mounted:function(){var t=this;this.$store.commit("setPageTools",[{name:"返回",className:["fd-blue"],fn:function(){t.returnShopstatic()}}]),this.getTakeoutData()},destroyed:function(){clearInterval(this.timer)}},s=(a("baed"),a("7610")),r=Object(s.a)(o,i,[],!1,null,"7fdd4d4e",null);r.options.__file="src\\module\\statistics\\order_constructions_one.vue";e.default=r.exports},baed:function(t,e,a){"use strict";var i=a("ef2c");a.n(i).a},ef2c:function(t,e,a){}}]);