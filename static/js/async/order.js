(window.webpackJsonp=window.webpackJsonp||[]).push([["order"],{"17a1":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"sta-or-one"}},[t.isBrand?t._e():a("div",{staticClass:"button"},[a("a",{staticClass:"select",attrs:{href:"javascript:void(0);"}},[t._v("堂吃")]),t._v(" "),a("a",{attrs:{id:"returncolor",href:"javascript:void(0);"},on:{click:t.toTakeout}},[t._v("外卖")]),t._v(" "),a("a",{attrs:{id:"returncolor",href:"javascript:void(0);"},on:{click:t.toProprietary}},[t._v("自营外卖")])]),t._v(" "),t.isBrand?a("section",{staticStyle:{width:"100%",overflow:"hidden"}},[a("section",{staticStyle:{width:"80px",height:"40px","line-height":"40px",float:"left","font-size":"16px"}},[t._v("选择店铺：")]),t._v(" "),a("section",{staticStyle:{height:"40px","line-height":"40px",float:"left",margin:"0 5px","font-size":"16px"}},[t._v(t._s(t.dataDetial.itemDetial.shopName)+" |")]),t._v(" "),a("section",{staticStyle:{width:"80px",height:"40px","line-height":"40px",float:"left","font-size":"16px"}},[t._v("选择时间：")]),t._v(" "),a("section",{staticStyle:{height:"40px","line-height":"40px",float:"left","font-size":"16px"}},[t._v(t._s(t.timeToday(t.startTime))+"--"+t._s(t.timeToday(t.endTime)))])]):t._e(),t._v(" "),a("div",{staticClass:"order-order-data",staticStyle:{margin:"15px 0"}},[a("ul",{staticStyle:{height:"auto"}},[t.isBrand?t._e():a("li",[a("section",{staticClass:"statisticsList fl"},[a("section",{staticClass:"tableListInp"},[a("calendar",{staticStyle:{width:"245px",height:"41px",float:"left"},attrs:{pObj:t.startObj},on:{throwTime:t.getStartTime}})],1)]),t._v(" "),a("span",{staticStyle:{float:"left",width:"25px","line-height":"40px","text-align":"center"}},[t._v("至")]),t._v(" "),a("section",{staticClass:"statisticsList fl"},[a("section",{staticClass:"tableListInp"},[a("calendar",{staticStyle:{width:"245px",height:"41px",float:"left"},attrs:{pObj:t.endObj},on:{throwTime:t.getEndTime}})],1)]),t._v(" "),a("span",{staticClass:"order-order-searchA",staticStyle:{"margin-right":"15px"}},[a("span",{staticClass:"order-order-search",attrs:{href:"javascript:void(0)"},on:{click:t.sreachOrderInDays}})])]),t._v(" "),t.isBrand?t._e():a("li",{staticStyle:{"line-height":"46px"}},[a("div",{class:{selected:t.isOpenTime},staticStyle:{width:"20px",height:"20px",cursor:"pointer",border:"1px solid #28A8E0",margin:"13px 10px",float:"left"},on:{click:t.selectBusinessHours}}),t._v(" "),a("span",{staticStyle:{"font-size":"16px"}},[t._v("按营业时间")])]),t._v(" "),a("div",{staticStyle:{display:"inline-block"}},[t.isBrand?t._e():a("li",[a("span",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.orderNumber,expression:"orderNumber"}],staticStyle:{height:"40px","line-height":"40px"},attrs:{type:"text",placeholder:"请输入订单号",maxlength:"18"},domProps:{value:t.orderNumber},on:{input:function(e){e.target.composing||(t.orderNumber=e.target.value)}}}),t._v(" "),a("a",{staticClass:"order-order-searchA",on:{click:t.getInfoByOrder}},[a("span",{staticClass:"order-order-search"})])])]),t._v(" "),a("li",[a("section",{staticClass:"staList fl"},[a("section",{staticClass:"tableList",on:{click:t.showAreaList}},[a("span",{staticClass:"oSpan"},[t._v(t._s(t.allArea))]),t._v(" "),t._m(0)]),t._v(" "),t.areaBtn?a("section",{staticClass:"tableListUl"},t._l(t.areaList,function(e,i){return a("section",{key:i,staticClass:"tableListLi",on:{click:function(a){t.selectUlArea(i,e)}}},[t._v(t._s(e.name))])})):t._e()])]),t._v(" "),a("li",[a("section",{staticClass:"staList fl"},[a("section",{staticClass:"tableList",on:{click:t.showAreaList2}},[a("span",{staticClass:"oSpan"},[t._v(t._s(t.allArea2))]),t._v(" "),t._m(1)]),t._v(" "),t.areaBtn2?a("section",{staticClass:"tableListUl"},t._l(t.areaList2,function(e,i){return a("section",{key:i,staticClass:"tableListLi",on:{click:function(a){t.selectUlArea2(i,e)}}},[t._v(t._s(e.name))])})):t._e()])]),t._v(" "),t.isBrand?a("li",{staticStyle:{"margin-left":"20px"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.orderNumber,expression:"orderNumber"}],staticStyle:{width:"170px",height:"41px","line-height":"40px",float:"left","padding-left":"10px"},attrs:{type:"text",maxlength:"18",placeholder:"请输入订单号"},domProps:{value:t.orderNumber},on:{input:function(e){e.target.composing||(t.orderNumber=e.target.value)}}}),t._v(" "),a("a",{staticClass:"order-order-searchA",on:{click:t.getInfoByOrder}},[a("span",{staticClass:"order-order-search"})])]):t._e()])])]),t._v(" "),a("section",{staticClass:"oCont",staticStyle:{width:"100%",height:"60px"}},[a("div",{staticClass:"Box",staticStyle:{float:"left"}},[a("section",{staticClass:"oDe",class:{act:4==t.status},staticStyle:{"border-left":"none"},on:{click:function(e){t.getOidList(4)}}},[t._v("已结账")]),t._v(" "),a("section",{staticClass:"oDe",class:{act:3==t.status},on:{click:function(e){t.getOidList(3)}}},[t._v("未结账")]),t._v(" "),a("section",{staticClass:"oDe",class:{act:6==t.status},on:{click:function(e){t.getOidList(6)}}},[t._v("挂账")])])]),t._v(" "),a("section",{staticClass:"table-container"},[a("div",{staticClass:"aLeft"},[t._m(2),t._v(" "),a("ul",{staticClass:"aUl",staticStyle:{"background-color":"#ffffff"}},[a("li",{staticClass:"aLi",staticStyle:{color:"#F8941F",float:"none"}},[t._v(t._s(t.payTotalNum.totalDay))])]),t._v(" "),a("div",{staticStyle:{width:"100%",height:"50px","text-align":"center","line-height":"50px","border-top":"1px solid #d2d2d2","margin-top":"30px"}},[t._v("订单统计·共\n\t\t\t\t"),a("span",{staticStyle:{color:"red"}},[t._v(t._s(t.oneDayOrderList.length))]),t._v("条记录")]),t._v(" "),a("div",{staticStyle:{width:"100%",height:"auto"}},[t._m(3),t._v(" "),a("section",{staticStyle:{width:"100%",height:"auto"}},[0==t.oneDayOrderList.length?a("ul",{staticClass:"aUl",staticStyle:{"background-color":"#ffffff"}},[a("li",{staticClass:"aLi",staticStyle:{width:"250px","border-bottom":"1px solid #d2d2d2"}})]):t._e(),t._v(" "),a("ul",{staticClass:"aUl",staticStyle:{color:"#333333",overflow:"hidden",width:"100%",height:"auto"}},t._l(t.oneDayOrderList,function(e,i){return a("li",{key:i,staticClass:"aLi",staticStyle:{color:"#29A7E1",cursor:"pointer",width:"250px",background:"#ffffff","border-bottom":"1px solid #d2d2d2"},on:{click:function(i){t.getOrderDetailInfo(e.oid)}}},[t._v(t._s(e.oid))])}))])])]),t._v(" "),a("div",{staticClass:"aRight",staticStyle:{width:"100%",height:"auto","padding-left":"250px",overflow:"auto"}},[a("section",{style:{width:t.showWidth+"px"}},[a("ul",{staticClass:"aUl",staticStyle:{"background-color":"#f2f2f2"}},[a("li",{staticClass:"width70"},[t._v("订单数")]),t._v(" "),a("li",{staticClass:"width70"},[t._v("人数")]),t._v(" "),a("li",{staticClass:"width100",staticStyle:{position:"relative"}},[t._v("商品总数\n\t\t\t\t\t\t"),a("detailsDes",{attrs:{title:"该时间段的商品总数包含了订单中所有的商品数量（包括赠品和退品）"}})],1),t._v(" "),a("li",{staticClass:"width70",staticStyle:{position:"relative"}},[t._v("销量\n\t\t\t\t\t\t"),a("detailsDes",{attrs:{title:"该时间段已销售的数量（不包含退品数）公式：商品总数-退品数=销量"}})],1),t._v(" "),a("li",{staticClass:"width70"},[t._v("退品数")]),t._v(" "),a("li",{staticClass:"width100"},[t._v("退品总额")]),t._v(" "),a("li",{staticClass:"width100 detLi",on:{click:function(e){t.openDiscount(t.payTotalNum)}}},[t._v("优惠总额\n\t\t\t\t\t\t"),a("img",{staticClass:"detImg",attrs:{src:i("261f")}})]),t._v(" "),a("li",{staticClass:"width100"},[t._v("代金券")]),t._v(" "),a("li",{staticClass:"width100"},[t._v("利润")]),t._v(" "),t.payLsZero?[t._l(t.allPayList,function(e){return[t.isZero(e.id)?t._e():a("li",{key:e.id,staticClass:"width100 overHid"},[t._v(t._s(e.paymentName))])]})]:t._e(),t._v(" "),a("li",{staticClass:"width100"},[t._v("服务费")]),t._v(" "),a("li",{staticClass:"width100"},[t._v("找零")]),t._v(" "),a("li",{staticClass:"width100"},[t._v("系统取整")]),t._v(" "),3!==t.status?a("li",{staticClass:"width100 detLi"},[t._v("消费总额\n\t\t\t\t\t\t"),a("detailsDes",{attrs:{title:"该时段内所有商品原价的金额总计（不计入退品金额）"}})],1):t._e(),t._v(" "),6!=t.status?a("li",{staticClass:"width100 "},[t._v("实收总额")]):t._e(),t._v(" "),3==t.status&&t.payTotalNum&&1*t.payTotalNum.waitPrice!=0?a("li",{staticClass:"width100"},[t._v("未结账金额")]):t._e(),t._v(" "),a("li",{staticClass:"width100 detLi"},[t._v("入账总额\n\t\t\t\t\t\t"),a("detailsDes",{attrs:{title:"该时间段中实际收入的金额（不计入未入实账的支付方式的金额）"}})],1),t._v(" "),a("li",{staticClass:"width100 detLi"},[t._v("会员充值\n\t\t\t\t\t\t"),a("detailsDes",{attrs:{title:"该时段内会员充值总计(不计入消费总额及入账总额中)"}})],1),t._v(" "),a("li",{staticClass:"width100 detLi"},[t._v("挂账结清金额\n\t\t\t\t\t\t")])],2),t._v(" "),a("ul",{staticClass:"order-content-show",staticStyle:{color:"#333333",overflow:"hidden",width:"100%",background:"#ffffff"}},[a("li",{staticClass:"width70",staticStyle:{color:"#F8941F"}},[t._v(t._s(t.payTotalNum.orderNum))]),t._v(" "),a("li",{staticClass:"width70",staticStyle:{color:"#F8941F"}},[t._v(t._s(t.payTotalNum.person))]),t._v(" "),a("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(t.payTotalNum.goodsTotalNum))]),t._v(" "),a("li",{staticClass:"width70",staticStyle:{color:"#F8941F"}},[t._v(t._s(t.payTotalNum.salesNum))]),t._v(" "),a("li",{staticClass:"width70",staticStyle:{color:"#F8941F"}},[t._v(t._s(t.payTotalNum.returnNum))]),t._v(" "),a("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(parseFloat(t.payTotalNum.returnPrice).toFixed(2)))]),t._v(" "),a("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(parseFloat(t.payTotalNum.discount).toFixed(2)))]),t._v(" "),t.payTotalNum.cashCoupon?a("li",{staticClass:"width100",staticStyle:{color:"#F8941F",cursor:"pointer","vertical-align":"middle","text-overflow":"ellipsis","white-space":"nowrap",overflow:"hidden"},attrs:{title:parseFloat(t.payTotalNum.cashCoupon.price).toFixed(2)+"("+t.payTotalNum.cashCoupon.num+"张)"}},[t._v(t._s(parseFloat(t.payTotalNum.cashCoupon.price).toFixed(2)+"("+t.payTotalNum.cashCoupon.num+"张)"))]):t._e(),t._v(" "),a("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(parseFloat(t.payTotalNum.profit).toFixed(2)))]),t._v(" "),t.payLsZero?[t._l(t.payTotalNum.paymentList,function(e){return[t.isZero(e.id)?t._e():a("li",{key:e.id,staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(parseFloat(e.num).toFixed(2)))])]})]:t._e(),t._v(" "),a("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(parseFloat(t.payTotalNum.chargePrice).toFixed(2)))]),t._v(" "),a("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(parseFloat(t.payTotalNum.change).toFixed(2)))]),t._v(" "),a("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(parseFloat(t.payTotalNum.bitPrice).toFixed(2)))]),t._v(" "),3!==t.status?a("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(parseFloat(t.payTotalNum.originalPrice).toFixed(2)))]):t._e(),t._v(" "),6!=t.status?a("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(parseFloat(t.payTotalNum.waitPrice).toFixed(2)))]):t._e(),t._v(" "),3==t.status&&t.payTotalNum&&1*t.payTotalNum.waitPrice!=0?a("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(parseFloat(t.payTotalNum.waitPrice).toFixed(2)))]):t._e(),t._v(" "),a("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(parseFloat(t.payTotalNum.paymentPrice).toFixed(2)))]),t._v(" "),a("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(parseFloat(t.payTotalNum.memberRecharge).toFixed(2)))]),t._v(" "),a("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(parseFloat(t.payTotalNum.settlePrice).toFixed(2)))])],2)]),t._v(" "),a("div",{style:{width:t.showWidth+"px"}},[a("div",{staticStyle:{width:"100%",height:"50px","border-top":"1px solid #d2d2d2","margin-top":"30px"}}),t._v(" "),a("ul",{staticClass:"first",staticStyle:{color:"#333333",width:"100%",background:"#f2f2f2"},style:{width:t.showWidth+"px"}},[a("li",{staticClass:"width70"},[t._v("状态")]),t._v(" "),a("li",{staticClass:"width150"},[t._v("开单时间")]),t._v(" "),a("li",{staticClass:"width150"},[t._v("结账时间")]),t._v(" "),a("li",{staticClass:"width150"},[t._v("桌台号")]),t._v(" "),a("li",{staticClass:"width70"},[t._v("人数")]),t._v(" "),a("li",{staticClass:"width100 detLi"},[t._v("商品总数\n\t\t\t\t\t\t"),a("detailsDes",{attrs:{title:"该订单商品总数包含了订单中所有的商品数量（包括赠品和退品）"}})],1),t._v(" "),a("li",{staticClass:"width70 detLi"},[t._v("销量\n\t\t\t\t\t\t"),a("detailsDes",{attrs:{title:"该订单中已销售的数量（不包含退品数）公式：商品总数-退品数=销量"}})],1),t._v(" "),a("li",{staticClass:"width70"},[t._v("赠品数")]),t._v(" "),a("li",{staticClass:"width70"},[t._v("赠品总价")]),t._v(" "),a("li",{staticClass:"width70"},[t._v("退品数")]),t._v(" "),a("li",{staticClass:"width70"},[t._v("退品总价")]),t._v(" "),a("li",{staticClass:"width100 detLi"},[t._v("优惠总额\n\t\t\t\t\t\t"),a("detailsDes",{attrs:{title:"该订单所有的优惠金额总计"}})],1),t._v(" "),a("li",{staticClass:"width100"},[t._v("代金券")]),t._v(" "),a("li",{staticClass:"width70"},[t._v("利润")]),t._v(" "),t.payLsZero?[t._l(t.allPayList,function(e){return[t.isZero(e.id)?t._e():a("li",{key:e.id,staticClass:"width100 overHid"},[t._v(t._s(e.paymentName))])]})]:t._e(),t._v(" "),a("li",{staticClass:"width100"},[t._v("服务费")]),t._v(" "),a("li",{staticClass:"width70"},[t._v("找零")]),t._v(" "),a("li",{staticClass:"width70"},[t._v("系统取整")]),t._v(" "),a("li",{staticClass:"width100 detLi"},[t._v("消费金额\n\t\t\t\t\t\t"),a("detailsDes",{attrs:{title:"该订单所有消费总额的金额总计（不计入退品金额）"}})],1),t._v(" "),a("li",{staticClass:"width100 "},[t._v(t._s("6"==t.status?"挂账":"实收")+"金额")]),t._v(" "),a("li",{staticClass:"width100 detLi"},[t._v("入账金额\n\t\t\t\t\t\t"),a("detailsDes",{attrs:{title:"该订单实际收入的金额（不计入未入实账的支付方式的金额）"}})],1)],2),t._v(" "),t.oneDayOrderList.length>0?[t._l(t.oneDayOrderList,function(e,i){return[a("ul",{key:i,staticClass:"order-content-show detialList",staticStyle:{color:"#333333",overflow:"hidden",width:"100%",background:"#ffffff","border-bottom":"1px solid #d2d2d2"},style:{width:t.showWidth+"px"}},[a("li",{staticClass:"width70"},[t._v(t._s(e.status))]),t._v(" "),a("li",{staticClass:"width150"},[t._v(t._s(e.createTime))]),t._v(" "),a("li",{staticClass:"width150"},[t._v(t._s(e.updateTime))]),t._v(" "),a("li",{staticClass:"width150"},[t._v(t._s(e.areaName)+"\n\t\t\t\t\t\t\t\t"),""!==e.areaName?a("span",[t._v("--")]):t._e(),t._v(" "+t._s(e.tableName)+"\n\t\t\t\t\t\t\t")]),t._v(" "),a("li",{staticClass:"width70"},[t._v(t._s(e.person))]),t._v(" "),a("li",{staticClass:"width100"},[t._v(t._s(e.goodsNum))]),t._v(" "),a("li",{staticClass:"width70"},[t._v(t._s(e.salesNum))]),t._v(" "),a("li",{staticClass:"width70"},[t._v(t._s(e.freeNum))]),t._v(" "),a("li",{staticClass:"width70"},[t._v(t._s(parseFloat(e.freePrice).toFixed(2)))]),t._v(" "),a("li",{staticClass:"width70"},[t._v(t._s(e.returnNum))]),t._v(" "),a("li",{staticClass:"width70"},[t._v(t._s(parseFloat(e.returnPrice).toFixed(2)))]),t._v(" "),a("li",{staticClass:"width100"},[t._v(t._s(parseFloat(e.discount).toFixed(2)))]),t._v(" "),a("li",{staticClass:"width100",staticStyle:{cursor:"pointer","vertical-align":"middle","text-overflow":"ellipsis","white-space":"nowrap",overflow:"hidden"},attrs:{title:parseFloat(e.cashCoupon.price).toFixed(2)+"("+e.cashCoupon.num+"张)"}},[t._v(t._s(parseFloat(e.cashCoupon.price).toFixed(2)+"("+e.cashCoupon.num+"张)"))]),t._v(" "),a("li",{staticClass:"width70"},[t._v(t._s(parseFloat(e.profit).toFixed(2)))]),t._v(" "),t._l(e.paymentList,function(e){return[t.isZero(e.id)?t._e():a("li",{key:e.id,staticClass:"width100"},[t._v(t._s(parseFloat(e.num).toFixed(2)))])]}),t._v(" "),a("li",{staticClass:"width100"},[t._v(t._s(parseFloat(e.chargePrice).toFixed(2)))]),t._v(" "),a("li",{staticClass:"width70"},[t._v(t._s(parseFloat(e.change).toFixed(2)))]),t._v(" "),a("li",{staticClass:"width70"},[t._v(t._s(parseFloat(e.bitPrice).toFixed(2)))]),t._v(" "),a("li",{staticClass:"width100"},[t._v(t._s(parseFloat(e.originalPrice).toFixed(2)))]),t._v(" "),a("li",{staticClass:"width100"},[t._v(t._s(parseFloat(e.waitPrice).toFixed(2)))]),t._v(" "),a("li",{staticClass:"width100"},[t._v(t._s(parseFloat(e.paymentPrice).toFixed(2)))])],2)]})]:a("ul",{style:{width:t.showWidth+"px"}},[a("li",{staticStyle:{width:"100%","background-color":"#FFFFFF",color:"#F8931F"}},[t._v("没有订单")])])],2)])]),t._v(" "),a("div",{staticStyle:{float:"left","margin-left":"30px","margin-top":"20px"}},[a("pageElement",{attrs:{page:t.dayPage.page,total:t.dayPage.pageNum,num:t.dayPage.num,isNoJump:!0},on:{pageNum:t.getOrderListInDayPage}})],1),t._v(" "),t.preferentialBounced?a("order-win",{attrs:{payTotalNum:t.payTotalNum,title:t.title},on:{toClick:t.whetherToclick}}):t._e()],1)};a._withStripped=!0;var s=i("81a2"),r=i("f6ce"),n=i("bbb9");function l(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function a(s,r){try{var n=e[s](r),l=n.value}catch(t){return void i(t)}if(!n.done)return Promise.resolve(l).then(function(t){a("next",t)},function(t){a("throw",t)});t(l)}("next")})}}var o={data:function(){return{order:null,userData:null,dataDetial:null,isBrand:null,startTime:"",endTime:"",newStartTime:"",newEndTime:"",isOpenTime:"",orderNumber:null,allArea:"选择区域",areaBtn:!1,allArea2:"选择桌台",areaBtn2:!1,status:4,payTotalNum:{},oneDayOrderList:[],showWidth:1940,payLsZero:!1,exportUrl:"javascript:void(0);",areaList:[{id:"",name:"全部区域"}],index:-1,areaList2:[{id:"",name:"全部桌台"}],index2:-1,dayPage:{page:1,num:0},newDayPage:null,preferentialBounced:!1,isZeroPays:[],dateTime:[],startObj:{},endObj:{}}},methods:{initBtn:function(t){var e=this,i=[{name:"返回",style:{backgroundColor:"#fff",border:"1px solid #ff8c01",color:"#ff8c01"},fn:function(){e.returnPage()}},{name:"打印",style:{backgroundColor:"#fff",border:"1px solid #20a7dd",color:"#20a7dd"},fn:function(){e.printOrder()}},{name:"导出",style:{},fn:function(){e.exportOrder()}}];t&&i.shift(),this.$store.commit("setPageTools",i)},toTakeout:function(){var t;t={name:"takeout",startTime:this.startTime,endTime:this.endTime,isOpenTime:this.isOpenTime},r.a.session("orderTakeout",t),this.$router.push({path:"/admin/orderStatistics/orderTakeaway",query:this.$route.query})},toProprietary:function(){this.$router.push({path:"/admin/orderStatistics/orderProprietary",query:this.$route.query})},getStartTime:function(t){this.newStartTime=t},getEndTime:function(t){this.newEndTime=t},sreachOrderInDays:function(){if(this.newEndTime-this.newStartTime>80352e5)return this.$store.commit("setWin",{title:"操作提示",content:"最大只能查询三个月时间!"}),!1;if(parseInt(this.newStartTime/1e3)-parseInt(this.newEndTime/1e3)>0)return this.$store.commit("setWin",{title:"操作提示",content:"时间选择错误!"}),!1;this.startTime=this.newStartTime,this.endTime=this.newEndTime;var t;t={name:"order-more",startTime:this.startTime,endTime:this.endTime,isOpenTime:this.isOpenTime,allDayPage:{page:0,num:10,pageNum:1}},r.a.session("orderMore",t),this.$router.push({path:"/admin/orderStatistics/orderMore",query:this.$route.query})},selectBusinessHours:function(){this.isOpenTime=!this.isOpenTime},getInfoByOrder:function(){var t=this.orderNumber;return null==t||void 0==t||""==t?(this.$store.commit("setWin",{title:"操作提示",content:"请输入订单号码!"}),!1):t.split("").length<18||!/\d+/g.test(t)?(this.$store.commit("setWin",{title:"操作提示",content:"请输入正确的订单号!"}),!1):void this.getOrderDetailInfo(t)},showAreaList:function(t){t.stopPropagation(),this.areaBtn2=!1,this.areaBtn=!this.areaBtn},showAreaList2:function(t){t.stopPropagation(),this.areaBtn=!1,this.areaBtn2=!this.areaBtn2,-1!=this.index&&0!=this.index||(this.areaList2=this.tableList)},getOrderDetailInfo:function(t){var e=this;return l(regeneratorRuntime.mark(function i(){var a;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,s.a.billDelite({data:{trueShopId:e.dataDetial?e.dataDetial.itemDetial.shopId:e.userData.currentShop.id,oid:t}});case 2:(a=i.sent).oidDetial="order-one",a.titleDetial={startTime:e.startTime,endTime:e.endTime,dayPage:e.dayPage,isOpenTime:e.isOpenTime},r.a.session("orderDetial",a),e.$router.push({path:"/admin/orderStatistics/orderDetail",query:e.$route.query});case 7:case"end":return i.stop()}},i,e)}))()},getOidList:function(t){this.dayPage.page=1,this.status=t,this.getOrderListInDay(this.dateTime)},getOrderListInDay:function(t){var e=this;return l(regeneratorRuntime.mark(function i(){var a,r,l,o,d,c,h,u,m,p,v,_;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return e.orderNumber="",e.dateTime=t,e.startH=new Date(e.startTime).getHours(),e.startM=new Date(e.startTime).getMinutes(),e.startS=new Date(e.startTime).getSeconds(),e.endH=new Date(e.endTime).getHours(),e.endM=new Date(e.endTime).getMinutes(),e.endS=new Date(e.endTime).getSeconds(),a=t+" "+e.startH+":"+e.startM+":"+e.startS,r=t+" "+e.endH+":"+e.endM+":"+e.endS,l=n.a.format(new Date(e.startTime),"yyyy-MM-dd"),o=n.a.format(new Date(e.endTime),"yyyy-MM-dd"),i.next=14,s.a.oneDayOrderData({data:{trueShopId:e.dataDetial?e.dataDetial.itemDetial.shopId:e.userData.currentShop.id,startTime:t==l?e.getTime(a):e.getTime(t+" 00:00:00"),endTime:t==o?e.getTime(r):e.getTime(t+" 23:59:59"),isOpenTime:Number(e.isOpenTime),page:e.dayPage.page,num:e.dayPage.num,oid:e.orderNumber,areaId:-1==e.index?"":e.areaList[e.index].id,tableId:-1==e.index2?"":e.areaList2[e.index2].id,status:e.status}});case 14:if(d=i.sent,e.payTotalNum=d.total,e.payTotalNum.totalDay=1,e.dayPage.pageNum=d.pageNum,d){for(e.showDay=!0,c=d.list,h=0;h<c.length;h++)"1970-01-01 08:00:00"==c[h].updateTime&&(c[h].updateTime="0000-00-00 00:00:00");e.oneDayOrderList=c}if(d&&d.total&&d.total.paymentList){for(u=[],m=[],p=[],v=d.total.paymentList,_=0;_<v.length;_++)0==v[_].num?(u.push(v[_].id),m.push(v[_])):v[_].num>0&&(p.push(v[_]),e.payLsZero=!0);e.isZeroPays=u,e.allPayList=p,e.showWidth=100*p.length+1940}case 20:case"end":return i.stop()}},i,e)}))()},getTime:function(t){var e=/(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/.exec(t);return new Date(e[1],(e[2]||1)-1,e[3]||1,e[4]||0,e[5]||0,e[6]||0).getTime()/1e3},timeToday:function(t){return n.a.format(new Date(t),"yyyy年MM月dd日")},openDiscount:function(){return null==this.payTotalNum.discountList?(this.$store.commit("setWin",{title:"操作提示",content:"没有优惠信息!"}),!1):0==this.payTotalNum.discountList.coupon.length&&0==this.payTotalNum.discountList.order.length?(this.$store.commit("setWin",{title:"操作提示",content:"没有优惠信息!"}),!1):(this.preferentialBounced=!0,void(this.title="优惠详情"))},whetherToclick:function(t){t&&(this.preferentialBounced=!1)},init:function(){this.getOrderListInDay(this.order.day)},getPayAreaTableList:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i,a,r,n,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.areaList=[{id:"",name:"全部区域"}],t.areaList2=[{id:"",name:"全部桌台"}],t.tableList=[{id:"",name:"全部桌台"}],e.next=5,s.a.getCondition({data:{trueShopId:t.dataDetial?t.dataDetial.itemDetial.shopId:t.userData.currentShop.id}});case 5:for(i=e.sent,t.allPayList=i.paymentList,a=i.areaList,r=0;r<a.length;r++)t.areaList.push(a[r]);for(n=i.tableList,l=0;l<n.length;l++)t.areaList2.push(n[l]),t.tableList.push(n[l]);case 11:case"end":return e.stop()}},e,t)}))()},isZero:function(t){for(var e=this.isZeroPays,i={},a=0;a<e.length;a++)i[e[a]]||(i[e[a]]="110");return!!i[t]},returnPage:function(){r.a.session("orderMore",this.order),this.$router.push({path:"/admin/orderStatistics/orderMore",query:this.$route.query})},printOrder:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i,a,r,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=n.a.format(new Date(t.startTime),"yyyy-MM-dd"),a=n.a.format(new Date(t.endTime),"yyyy-MM-dd"),r=t.dateTime+" "+t.startH+":"+t.startM+":"+t.startS,l=t.dateTime+" "+t.endH+":"+t.endM+":"+t.endS,e.next=6,s.a.printMore({data:{trueShopId:t.dataDetial?t.dataDetial.itemDetial.shopId:t.userData.currentShop.id,startTime:t.dateTime==i?t.getTime(r):t.getTime(t.dateTime+" 00:00:00"),endTime:t.dateTime==a?t.getTime(l):t.getTime(t.dateTime+" 23:59:59"),isOpenTime:Number(t.isOpenTime)}});case 6:t.$store.commit("setWin",{title:"操作提示",content:"打印数据已发送！!"});case 7:case"end":return e.stop()}},e,t)}))()},exportOrder:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i,a,r,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(i=t.dateTime+" "+t.startH+":"+t.startM+":"+t.startS,a=t.dateTime+" "+t.endH+":"+t.endM+":"+t.endS,r=n.a.format(new Date(t.startTime),"yyyy-MM-dd"),l=n.a.format(new Date(t.endTime),"yyyy-MM-dd"),0!=t.oneDayOrderList.length){e.next=7;break}return t.$store.commit("setWin",{title:"操作提示",content:"没有订单可以导出!"}),e.abrupt("return",!1);case 7:return e.next=9,s.a.exportOneDayOrder({data:{trueShopId:t.dataDetial?t.dataDetial.itemDetial.shopId:t.userData.currentShop.id,status:t.status,startTime:t.dateTime==r?t.getTime(i):t.getTime(t.dateTime+" 00:00:00"),endTime:t.dateTime==l?t.getTime(a):t.getTime(t.dateTime+" 23:59:59"),isOpenTime:Number(t.isOpenTime)}},"csv");case 9:t.exportUrl=e.sent;case 10:case"end":return e.stop()}},e,t)}))()},selectUlArea2:function(t,e){this.allArea2=e.name,this.areaBtn2=!1,this.index2=t,this.dayPage.page=1,this.getOrderListInDay(this.order.day)},selectUlArea:function(t,e){this.allArea=e.name,this.areaBtn=!1,this.index=t,this.index2=-1,this.allArea2="选择桌台",this.areaList2=[{id:"",name:"全部桌台"}];for(var i=this.tableList,a=0;a<i.length;a++)e.id==i[a].areaId&&this.areaList2.push(i[a]);this.dayPage.page=1,this.getOrderListInDay(this.order.day)},getOrderListInDayPage:function(t){this.dayPage.page=t.page,this.dayPage.num=t.num,this.getOrderListInDay(this.dateTime)},contactTime1:function(){this.$refs.triggerStartTime.showCalendar=!this.$refs.triggerStartTime.showCalendar},contactTime2:function(){this.$refs.triggerEndTime.showCalendar=!this.$refs.triggerEndTime.showCalendar}},mounted:function(){var t=this,e=r.a.session("userShop"),i=r.a.session("orderOne"),a=r.a.session("titleDetial"),s={page:1,num:10,pageNum:1},n=r.a.session("brandDetial");a&&(s=a.dayPage),this.dataDetial=n,this.isBrand="3"==e.currentShop.ischain,this.startTime=i?i.startTime:(new Date).setHours(0,0,0,0),this.endTime=i?i.endTime:(new Date).setHours(23,59,59,999),this.newStartTime=i?i.startTime:(new Date).setHours(0,0,0,0),this.newEndTime=i?i.endTime:(new Date).setHours(23,59,59,999),this.startObj={time:this.startTime},this.endObj={time:this.endTime},this.isOpenTime=!i||i.isOpenTime,this.dayPage=s,this.userData=e,this.order=i,this.getPayAreaTableList(),this.init(),document.onclick=function(){t.areaBtn=!1,t.areaBtn2=!1},1==this.$route.query.arear?this.initBtn():this.initBtn(!0),sessionStorage.removeItem("order"),sessionStorage.removeItem("titleDetial")},components:{calendar:function(){return i.e("calendar_result").then(i.bind(null,"9265"))},orderWin:function(){return i.e("order_win").then(i.bind(null,"0460"))},detailsDes:function(){return i.e("details_des").then(i.bind(null,"33d1"))},pageElement:function(){return i.e("page_element").then(i.bind(null,"5921"))}}},d=(i("4051"),i("7610")),c=Object(d.a)(o,a,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl"},[e("i")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl"},[e("i")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"aUl",staticStyle:{"background-color":"#f2f2f2","text-align":"center"}},[e("li",{staticClass:"aLi",staticStyle:{float:"none"}},[this._v("天数")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"aUl",staticStyle:{"background-color":"#f2f2f2"}},[e("li",{staticClass:"aLi",staticStyle:{width:"250px"}},[this._v("订单号")])])}],!1,null,"674f562f",null);c.options.__file="src\\module\\statistics\\order.vue";e.default=c.exports},"261f":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjYyM0UzMTQ4NTkxMTFFNzlBRDhBMkNGNUZBRUVBMkMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjYyM0UzMTU4NTkxMTFFNzlBRDhBMkNGNUZBRUVBMkMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGNjIzRTMxMjg1OTExMUU3OUFEOEEyQ0Y1RkFFRUEyQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGNjIzRTMxMzg1OTExMUU3OUFEOEEyQ0Y1RkFFRUEyQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj/mrqgAAAO6SURBVHjajFRLbxtVFL5zZzxje+w4fsZtnMRN46KYOCmtlQqaBLWK06JK7YIFEkL9CyxIgSUPiQ0Sahcs2ID6A+iiEkggBUpLjJukEPeNELR1bMuVx57ajmdsz4tzHILiBqpeazSee2e+853vfOcwJ1Jn9q9nV27phu4QeDsxTYM872IYhjCUknr9CZmIv/QeMzI8+lutJifmZlNhwzAk0zSfHwwuwW4nd+5mL5ZKhbNUbakHBweHv6AMlVRVIYahE5Zln3nh6nTapA1Xs9kko/tin3I2G+E4llN1XafAithgQ1GarxWKuZeJBYGZ/6BjEctud9T9/uB5yEInlkV03RgAMoSDY8wL792omtY5XqlIi//m8TQWyODxeAvBYPjzLhjuWRYl2yDbS1EU0t/vO3d0cOTc9h4WpN1uIywFwY0de90C7AzYAyYIAmiweWIj/2gC88FUeV7QQqE9FwTBbiCIZVqEtwmgrQnpaT2se8BY2k0zVamU30EkrKw/EFoDjS7du3/zk3qj9hYSAbHTL8RefNfpdC23oGjbgvSAQWVJX5938cj07KIJBYFXeEqpsJxekoAWPxSJnodnuVx+/HY6c+Xn6eTR191uzyXIht3NbKsAg41GLcLzfMHnC+bXbqRvdzSNTR0/5dB0vYWpHhiLf5RZubq0nl39+tW5BfAtLeH3dCeYzcYT8NqHv/9xJ1OVK1+1Wqqv0ajHJhOH34T/rc3NOp4T+UmFTE4cOo3B84XcPOha3AWGRnQ6xfenEsnxvXsib1Sr5QQwJKJTXEGDdqsHa8uTfBO0hII1JlmWM3eBgV/AxZzkEt33wcxVUXTlMUBjs34MP8Rz/ME76H5/V2O3ZxW6Rmy1W71gUH5o2tqF1RvL1sPcX9eDgfCfXq9/JZtd+xJSGgCxgaWLePr6ya/r17+FwfBgaGjfNZDAEQqGDe4fM2o76F8O+EOSU3TlwAokPj51DF7OXbn6fSmyd/g7sIVSlh6fkqsS73L3KVqnE7UL9nuxsfH9FPrSAVEpC9TRhA6HYykaHfvY5w1cBBAMoCQPvxKA6fKZLFcS5XJpFtK/vDB/egb0LSz9+M0DyrIRwHjEREfGMrIsHZmbSY2Ylpl7ep6hTgw0MWqGBdh6ZnAgYMfYfsn8lFNVNTw3Mz/KnFw4E8neXLsFvdaPHxjPGI5Qyw42NUhhHIjFk6DxbUhRuJb+oQIDQOQgan5qMhkvFjfOaro2AM9Wd9D877IYsIIO7CTQC5m2Dx2cThSKGx/8LcAAbkfTnNpYWOAAAAAASUVORK5CYII="},4051:function(t,e,i){"use strict";var a=i("faa1");i.n(a).a},faa1:function(t,e,i){}}]);