(window.webpackJsonp=window.webpackJsonp||[]).push([["order_ordersearch"],{7007:function(t,e,a){},ee93:function(t,e,a){"use strict";a.r(e);var n=a("81a2");var i={data:function(){return{page:1,num:10,endTotal:1,goodsName:"",phone:"",titleList:[{titleName:"天数",dataName:"days"},{titleName:"订单数",dataName:"totalOrderNum"},{titleName:"销量",dataName:"totalSales"},{titleName:"赠品数",dataName:"totalGift"},{titleName:"配送总额",dataName:"totalMoveFee"},{titleName:"优惠总额",dataName:"totalDiscount"},{titleName:"代金券"},{titleName:"消费总额",dataName:"totalConsumption"},{titleName:"微信支付",dataName:"totalWeChatPain"},{titleName:"会员支付",dataName:"totalMemberPain"},{titleName:"积分抵扣总额",dataName:"totalPointCash"},{titleName:"实收总额",dataName:"totalPain"}],staticLists:[],shoptitleList:[{titleName:"订单号",dataName:"oid",conStyle:{color:"#27a8e0",cursor:"pointer"},titleStyle:{width:"200px",flex:"none",fontSize:"16px"}},{titleName:"状态"},{titleName:"下单时间",dataName:"createTime",titleStyle:{width:"200px",flex:"none",fontSize:"16px"}},{titleName:"销量 ",dataName:"sales"},{titleName:"赠品数",dataName:"gift"},{titleName:"配送金额",dataName:"moveFee"},{titleName:"优惠总额",dataName:"discount"},{titleName:"代金券"},{titleName:"消费金额",dataName:"consumption"},{titleName:"微信支付",dataName:"weChatPain"},{titleName:"会员支付",dataName:"memberPain"},{titleName:"积分抵扣总额",dataName:"pointCash"},{titleName:"实收金额",dataName:"pain"},{titleName:"顾客电话号码",dataName:"phone"}],staticshopLists:[],isPopupwindow:"",allFormList:[],formList:[],allLists:[],oid:"",showdetail:!1}},methods:{getcommodity:function(){var t,e=new RegExp(this.goodsName),a=new RegExp(this.phone);t=this.allLists.filter(function(t){return e.test(t.oid)&&a.test(t.phone)}),this.allFormList=Object.values(t),this.setPage()},reset:function(){this.page=1,this.goodsName="",this.phone="",this.getTakeoutData()},returnShopstatic:function(){this.$emit("scanorderResult","static")},tableEvent:function(){},getPageNum:function(t){this.page=t.page,this.num=t.num,this.setPage()},openStore:function(t){this.oid=t.oid,this.showdetail=!0},getTakeoutData:function(){var t,e=this;return(t=regeneratorRuntime.mark(function t(){var a;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.getTakeoutData({data:{taskId:e.taskId,showDetail:1,showShopId:e.constructionsId,showDay:e.oneData}});case 2:(a=t.sent)&&(e.staticLists=[],e.staticLists.push(a.total),e.allFormList=a.list,e.allLists=e.allFormList,e.$nextTick(function(){e.setPage()}));case 4:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function n(i,o){try{var s=e[i](o),r=s.value}catch(t){return void a(t)}if(!s.done)return Promise.resolve(r).then(function(t){n("next",t)},function(t){n("throw",t)});t(r)}("next")})})()},setPage:function(){this.endTotal=Math.ceil(this.allFormList.length/this.num);var t=(this.page-1)*this.num,e=this.page*this.num,a=this.allFormList.slice(t,e);this.formList=a},changeFormat:function(t){return("00"+t).substr(-2)},transFormDates:function(t){10==(t+="").length?(t-=0,t*=1e3):t-=0;var e=new Date(t);return e.getFullYear()+"年"+(e.getMonth()+1)+"月"+e.getDate()+"日"},getdetailresult:function(t){var e=this;this.showdetail=t,this.$store.commit("setPageTools",[{name:"返回",className:["fd-blue"],fn:function(){e.returnShopstatic()}}])},getstatus:function(t){switch(t){case 0:return"已完成";case 1:return"已取消/退单"}}},props:{constructionsName:String,startTime:Number,endTime:Number,constructionsId:String,isOpenTime:Boolean,oneData:String,taskId:Number,payTypes:Number},watch:{},components:{pageElement:function(){return a.e("page_element").then(a.bind(null,"5921"))},comTable:function(){return a.e("table").then(a.bind(null,"4360"))},"order-detail":function(){return a.e("delivery_detail").then(a.bind(null,"c15a"))}},created:function(){var t={titleStyle:{fontSize:"16px"}},e={conStyle:{color:"#ff9800"}},a=!0,n=!1,i=void 0;try{for(var o,s=this.titleList[Symbol.iterator]();!(a=(o=s.next()).done);a=!0){var r=o.value;Object.assign(r,t,e)}}catch(t){n=!0,i=t}finally{try{!a&&s.return&&s.return()}finally{if(n)throw i}}var l=!0,c=!1,m=void 0;try{for(var u,d=this.shoptitleList[Symbol.iterator]();!(l=(u=d.next()).done);l=!0){var h=u.value;"oid"!=h.dataName&&"createTime"!=h.dataName&&Object.assign(h,t)}}catch(t){c=!0,m=t}finally{try{!l&&d.return&&d.return()}finally{if(c)throw m}}},mounted:function(){var t=this;this.$store.commit("setPageTools",[{name:"返回",className:["fd-blue"],fn:function(){t.returnShopstatic()}}]),this.getTakeoutData()},destroyed:function(){clearInterval(this.timer)}},o=(a("fe05"),a("d801")),s=Object(o.a)(i,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"membercard"}},[t.showdetail?a("order-detail",{attrs:{oid:t.oid,constructionsId:t.constructionsId},on:{orderdetailResult:t.getdetailresult}}):a("section",[a("div",{staticClass:"search"},[a("span",[t._v("订单查询")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.goodsName,expression:"goodsName"}],attrs:{type:"text",placeholder:"请输入订单号"},domProps:{value:t.goodsName},on:{input:function(e){e.target.composing||(t.goodsName=e.target.value)}}}),t._v(" "),a("span",[t._v("手机号查询")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],attrs:{type:"text",placeholder:"请输入订单号"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value)}}}),t._v(" "),a("a",{staticClass:"blue",attrs:{href:"javascript:;"},on:{click:t.getcommodity}},[t._v("筛选")]),t._v(" "),a("a",{staticClass:"gray",attrs:{href:"javascript:;"},on:{click:t.reset}},[t._v("重置")])]),t._v(" "),a("div",{staticClass:"choiceshop"},[a("div",{staticClass:"choiceshop_l"},[t._v("\n\t\t\t\t选择店铺:\n\t\t\t")]),t._v(" "),a("div",{staticClass:"choiceshop_r"},[t._v("\n\t\t\t\t"+t._s(t.constructionsName)+" | 选择时间:"+t._s(t.transFormDates(t.startTime))+" - "+t._s(t.transFormDates(t.endTime))+"\n\t\t\t")])]),t._v(" "),a("section",{staticStyle:{"margin-bottom":"20px"}},[a("com-table",{attrs:{listHeight:80,listWidth:1400,showHand:!1,titleData:t.titleList,introData:t.staticLists},on:{tableEvent:t.tableEvent},scopedSlots:t._u([{key:"con-0",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t1\n\t\t\t\t")])}},{key:"con-6",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t"+t._s(e.data.totalVouchersPain)+"("+t._s(e.data.totalVouchersNum)+"张)\n\t\t\t\t")])}}])})],1),t._v(" "),a("section",[a("com-table",{attrs:{listHeight:80,listWidth:1400,showHand:!1,titleData:t.shoptitleList,introData:t.formList},on:{tableEvent:t.tableEvent},scopedSlots:t._u([{key:"con-0",fn:function(e){return a("div",{on:{click:function(a){t.openStore(e.data)}}},[t._v("\n\t\t\t\t\t"+t._s(e.data.oid)+"\n\t\t\t\t")])}},{key:"con-1",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t"+t._s(t.getstatus(t.payTypes))+"\n\t\t\t\t")])}},{key:"con-7",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t"+t._s(e.data.vouchersPain)+"("+t._s(e.data.vouchersNum)+"张)\n\t\t\t\t")])}}])})],1),t._v(" "),a("section",{staticClass:"turn-page"},[a("pageElement",{attrs:{page:Number(t.page),total:Number(t.endTotal),numArr:[10,20,30,40,50],isNoJump:!0},on:{pageNum:t.getPageNum}})],1)])],1)},[],!1,null,"21b287bb",null);e.default=s.exports},fe05:function(t,e,a){"use strict";var n=a("7007");a.n(n).a}}]);