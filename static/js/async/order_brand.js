(window.webpackJsonp=window.webpackJsonp||[]).push([["order_brand"],{"64d7":function(e,t,r){"use strict";var n=r("a1ff");r.n(n).a},a1ff:function(e,t,r){},b8bc:function(e,t,r){e.exports=r.p+"images/preloader.3e54c692.gif"},fcd8:function(e,t,r){"use strict";r.r(t);var n=r("81a2"),i=r("f6ce"),o=r("bbb9");function s(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){return function n(i,o){try{var s=t[i](o),a=s.value}catch(e){return void r(e)}if(!s.done)return Promise.resolve(a).then(function(e){n("next",e)},function(e){n("throw",e)});e(a)}("next")})}}var a={data:function(){return{userData:null,startTime:(new Date).setHours(0,0,0,0),endTime:(new Date).setHours(23,59,59,999),orderListInDays:[],payTotalNum:{orderNum:0,person:0,goodsNum:0,salesNum:0,returnNum:0,returnPrice:0,discountPrice:0,profit:0,chargePrice:0,paymentList:[{num:0,paymentName:""}],change:0,bitPrice:0,originalPrice:0,waitPrice:0,paidTotalPrice:0,paymentPrice:0,memberRecharge:0},newpayTotalNum:[],exportUrl:"javascript:void(0);",isOpenTime:"",startH:"",startM:"",startS:"",endH:"",endM:"",endS:"",isBrand:null,selectName:null,selectShopList:null,postSelectShopList:null,shopIds:null,taskId:"",agwge:!0,loading:!0,repeat:!0,num:10,currentPage:1,preferentialBounced:!1,transmitId:[],paymentList:[{num:0,paymentName:""}]}},computed:{totalNum:function(){return Math.ceil(this.orderListInDays.length/this.num)},lists:function(){var e=(this.currentPage-1)*this.num,t=this.currentPage*this.num;return this.orderListInDays.slice(e,t)}},mounted:function(){this.initBtn();var e=i.a.session("brandorderDetial"),t=i.a.session("orderBrand");if(this.userData=i.a.session("userShop"),"3"===this.userData.currentShop.ischain){for(var r=i.a.session("shopList"),n=0;n<r.length;n++)r[n].selected=!0;var o="",s="";e&&(r=e.selectShopList);var a=[];r.forEach(function(e){var t={id:e.id,name:e.shopName,selected:e.selected};a.push(t)}),this.postSelectShopList=a,this.transmitId=r.map(function(e){return e.id});for(var l=0;l<r.length;l++)1==r[l].selected&&(o=o+r[l].id+",",s=s+r[l].shopName+",");var c=o.split("").length;""!==o&&(o=o.substring(0,c-1)),this.shopIds=o,this.selectName=""==s?"请选择店铺":s,this.startTime=e?e.startTime:t?t.startTime:(new Date).setHours(0,0,0,0),this.endTime=e?e.endTime:t?t.endTime:(new Date).setHours(23,59,59,999),this.isOpenTime=e?e.isOpenTime:!t||t.isOpenTime,this.isBrand="3"==this.userData.currentShop.ischain,this.selectShopList=e?e.selectShopList:r,0!=this.selectShopList.length?(this.init(),sessionStorage.removeItem("brandorderDetial"),sessionStorage.removeItem("orderBrand")):this.$store.commit("setWin",{title:"操作提示",content:"没有可选店铺"})}else this.$router.push({path:"/admin/orderStatistics/orderMore",query:this.$route.query})},methods:{renderHeader:function(e,t){var r=t.column,n="",i=r.label,o=r.property;if("商品总数"==i&&"goodsNum"==o)n="该时间段的商品总数包含了订单中所有的商品数量（包括赠品和退品）";else if("销量"==i&&"salesNum"==o)n="该时间段已销售的数量（不包含退品数）公式：商品总数-退品数=销量";else{if("优惠总额"==i&&"discountPrice"==o)return e("div",[e("span",{},r.label),e("span",{class:"el-icon-document",slot:"reference",style:"font-size: 18px;margin-left:5px;"})]);"优惠金额"==i&&"discountPrice"==o?n="该店铺所有的优惠金额总计":"消费总额"==i&&"originalPrice"==o?n="该时段内所有商品原价的金额总计（不计入退品金额）":"入账总额"==i&&"paymentPrice"==o?n="该时间段中实际收入的金额（不计入未入实账的支付方式的金额）":"会员充值"==i&&"memberRecharge"==o&&(n="该时段内会员充值总计(不计入消费总额及入账总额中)")}return e("div",[e("span",{},r.label),e("el-popover",{attrs:{effect:"dark",content:n,placement:"bottom",width:"300"}},[e("span",{class:"el-icon-question",slot:"reference",style:"font-size: 18px;margin-left:5px;"})])])},headClick:function(e){"优惠总额"==e.label&&"discountPrice"==e.property&&this.openDiscount(this.payTotalNum)},initBtn:function(){var e=this,t=[{name:"导出",style:{},fn:function(){e.exportOrder()}}];this.$store.commit("setPageTools",t)},pageClick:function(e){this.currentPage=e},numChange:function(e){this.num=e,this.currentPage=1},toTakeout:function(){var e;e={name:"takeoutBrand",startTime:new Date(this.startTime).getTime(),endTime:new Date(this.endTime).getTime(),isOpenTime:this.isOpenTime},i.a.session("takeoutBrand",e),this.$router.push({path:"/admin/orderStatistics/takeawayBrand",query:this.$route.query})},toProprietary:function(){this.$router.push({path:"/admin/orderStatistics/orderProprietaryBrand",query:this.$route.query})},selectBusinessHours:function(){this.isOpenTime=!this.isOpenTime},init:function(){this.getOrderListInDays()},sreachOrderInDays:function(){return this.endTime-this.startTime>80352e5?(this.$store.commit("setWin",{title:"操作提示",content:"最大只能查询三个月时间"}),!1):parseInt(this.startTime/1e3)-parseInt(this.endTime/1e3)>0?(this.$store.commit("setWin",{title:"操作提示",content:"时间选择错误"}),!1):void this.getOrderListInDays()},resetting:function(){this.startTime=(new Date).setHours(0,0,0,0),this.endTime=(new Date).setHours(23,59,59,999),this.isOpenTime=!0,this.selectName="",this.shopIds="";for(var e=0;e<this.selectShopList.length;e++)this.selectShopList[e].selected=!0,this.selectName=this.selectName+this.selectShopList[e].shopName+",",this.shopIds=this.shopIds+this.selectShopList[e].id+",";var t=this.shopIds.split("").length;""!==this.shopIds&&(this.shopIds=this.shopIds.substring(0,t-1)),this.transmitId=this.selectShopList.map(function(e){return e.id}),this.getOrderListInDays()},getOrderListInDays:function(){var e=this;return s(regeneratorRuntime.mark(function t(){var r,i,a,l;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.repeat){t.next=3;break}return e.$store.commit("setWin",{title:"操作提示",content:"当前查询尚未结束，请结束后再进行查询或刷新浏览器重新查询！"}),t.abrupt("return",!1);case 3:if(e.loading=!1,""!=e.shopIds){t.next=7;break}return e.$store.commit("setWin",{title:"操作提示",content:"请选择要查询的店铺"}),t.abrupt("return",!1);case 7:return e.startTime=new Date(e.startTime).getTime(),e.endTime=new Date(e.endTime).getTime(),r=e.startTime,i=e.endTime,e.startH=o.a.format(r,"hh"),e.startM=o.a.format(r,"mm"),e.startS=o.a.format(r,"ss"),e.endH=o.a.format(i,"hh"),e.endM=o.a.format(i,"mm"),e.endS=o.a.format(i,"ss"),a=0,t.next=20,n.a.OrderReport({data:{trueShopId:e.userData.currentShop.id,type:"1",timeType:"1",startTime:parseInt(e.startTime/1e3),endTime:parseInt(e.endTime/1e3),isOpenTime:Number(e.isOpenTime),shopIds:e.shopIds}});case 20:l=t.sent,e.repeat=!1,l.taskId&&(e.taskId=l.taskId,window.timer=setInterval(s(regeneratorRuntime.mark(function t(){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a++,t.next=3,n.a.taskInfo({data:{trueShopId:e.userData.currentShop.id,taskId:e.taskId}});case 3:r=t.sent,e.agwge=!0,e.repeat=!0,2==r.status?(e.$store.commit("setWin",{title:"操作提示",content:"请求失败，请重试！"}),e.loading=!1,clearInterval(window.timer)):3==r.status?(e.loading=!0,e.getrrrrrr(e.taskId),clearInterval(window.timer)):(e.agwge=!1,e.repeat=!1),a>60&&(e.agwge=!1,e.$store.commit("setWin",{title:"操作提示",content:"请求失败，请重试！"}),clearInterval(window.timer));case 8:case"end":return t.stop()}},t,e)})),1e3),0==e.agwge&&clearInterval(window.timer));case 23:case"end":return t.stop()}},t,e)}))()},getrrrrrr:function(e){var t=this;return s(regeneratorRuntime.mark(function r(){var i,o,s,a,l,c,p,u,d,h;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,n.a.reportGet({data:{trueShopId:t.userData.currentShop.id,taskId:e,type:1}});case 2:if(i=r.sent,o={},t.newpayTotalNum=[],0!=i.length){r.next=10;break}return t.orderListInDays=[],(o={orderNum:0,person:0,goodsNum:0,salesNum:0,returnNum:0,returnPrice:0,discountPrice:0,profit:0,chargePrice:0,paymentList:[{num:0,paymentName:""}],change:0,bitPrice:0,originalPrice:0,waitPrice:0,paidTotalPrice:0,paymentPrice:0,memberRecharge:0,settlePrice:0}).discountList={order:[],coupon:[]},r.abrupt("return");case 10:for((o=i.total).discountList={order:[],coupon:[]},s=[],a=0;a<o.paymentList.length;a++)o.paymentList[a].num>0&&s.push(o.paymentList[a]);for(l=0;l<i.shops.length;l++)if(t.$set(i.shops[l],"payLists",[]),i.shops[l].discountList){for(c=0;c<i.shops[l].discountList.order.length;c++)o.discountList.order.push(i.shops[l].discountList.order[c]);for(p=0;p<i.shops[l].discountList.coupon.length;p++)o.discountList.coupon.push(i.shops[l].discountList.coupon[p]);for(u=0;u<s.length;u++)for(d=0;d<i.shops[l].paymentList.length;d++)(h=i.shops[l].paymentList[d]).paymentName==s[u].paymentName&&i.shops[l].payLists.push(h)}t.orderListInDays=i.shops,o.paymentList=s,t.paymentList=s,t.newpayTotalNum.push(o),t.payTotalNum=o;case 20:case"end":return r.stop()}},r,t)}))()},exportOrder:function(){var e=this;return s(regeneratorRuntime.mark(function t(){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(0!=e.orderListInDays.length){t.next=3;break}return e.$store.commit("setWin",{title:"操作提示",content:"没有订单可以导出"}),t.abrupt("return",!1);case 3:if(r=80352e5,!(e.endTime-e.startTime>r)){t.next=9;break}return e.$store.commit("setWin",{title:"操作提示",content:"最大只能查询三个月时间"}),t.abrupt("return",!1);case 9:if(!(parseInt(e.startTime/1e3)-parseInt(e.endTime/1e3)>0)){t.next=12;break}return e.$store.commit("setWin",{title:"操作提示",content:"时间选择错误"}),t.abrupt("return",!1);case 12:return t.next=14,n.a.exportReport({data:{trueShopId:e.userData.currentShop.id,startTime:parseInt(e.startTime/1e3),endTime:parseInt(e.endTime/1e3),isOpenTime:Number(e.isOpenTime),taskId:e.taskId}});case 14:case"end":return t.stop()}},t,e)}))()},toFloatStr:function(e){var t=e+"";return o.a.toFloatStr(t,2)},openDayDetial:function(e){var t={startTime:this.startTime,endTime:this.endTime,allDayPage:this.currentPage,isOpenTime:this.isOpenTime,selectShops:this.isOpenTime,isbrandJoin:!0,itemDetial:e,selectShopList:this.selectShopList,shopId:e.id};i.a.session("brandDetial",t),this.$router.push({path:"/admin/orderStatistics/orderMore",query:this.$route.query})},openDiscount:function(){return null==this.payTotalNum.discountList?(this.$store.commit("setWin",{title:"操作提示",content:"没有优惠信息!"}),!1):0==this.payTotalNum.discountList.coupon.length&&0==this.payTotalNum.discountList.order.length?(this.$store.commit("setWin",{title:"操作提示",content:"没有优惠信息!"}),!1):(this.preferentialBounced=!0,void(this.title="优惠详情"))},whetherToclick:function(e){e&&(this.preferentialBounced=!1)},getSelectShopList:function(e){console.log(this.postSelectShopList),this.transmitId=e;for(var t="",r=0;r<this.postSelectShopList.length;r++)this.transmitId.includes(this.postSelectShopList[r].id)?(this.postSelectShopList[r].selected=!0,t=t+this.postSelectShopList[r].name+","):this.postSelectShopList[r].selected=!1;this.shopIds=e.join(","),this.selectName=""==t?"请选择店铺":t}},destroyed:function(){clearInterval(window.timer)},components:{orderWin:function(){return r.e("order_win").then(r.bind(null,"0460"))},elShopList:function(){return r.e("el_shopList").then(r.bind(null,"60ff"))}}},l=(r("64d7"),r("d801")),c=Object(l.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{"padding-top":"20px"},attrs:{id:"sta-ban"}},[n("div",{staticClass:"button"},[n("a",{staticClass:"select",attrs:{href:"javascript:void(0);"}},[e._v("堂吃")]),e._v(" "),n("a",{attrs:{href:"javascript:void(0);"},on:{click:e.toTakeout}},[e._v("外卖")]),e._v(" "),n("a",{attrs:{id:"returncolor",href:"javascript:void(0);"},on:{click:e.toProprietary}},[e._v("自营外卖")])]),e._v(" "),n("div",{staticClass:"order-order-data"},[n("ul",[n("section",{staticClass:"fl"},[n("el-date-picker",{attrs:{clearable:!1,type:"datetime",placeholder:"选择日期"},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}}),e._v(" "),n("span",{staticStyle:{width:"25px","line-height":"40px","text-align":"center"}},[e._v("至")]),e._v(" "),n("el-date-picker",{attrs:{clearable:!1,type:"datetime",placeholder:"选择日期"},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}})],1),e._v(" "),n("li",{staticStyle:{"line-height":"46px"}},[n("div",{class:{selected:e.isOpenTime},staticStyle:{width:"20px",height:"20px",cursor:"pointer",border:"1px solid #28A8E0",margin:"13px 10px",float:"left"},on:{click:e.selectBusinessHours}}),e._v(" "),n("span",{staticStyle:{"font-size":"16px"}},[e._v("按营业时间")])]),e._v(" "),n("div",{staticStyle:{display:"inline-block"}},[n("li",[n("elShopList",{attrs:{shopIds:e.transmitId},on:{chooseShop:e.getSelectShopList}})],1),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.sreachOrderInDays()}}},[e._v("搜索")]),e._v(" "),n("el-button",{attrs:{type:"info"},on:{click:function(t){e.resetting()}}},[e._v("重置")])],1)])]),e._v(" "),n("section",{staticStyle:{width:"100%",height:"auto","line-height":"20px",overflow:"hidden","margin-top":"10px"}},[n("section",{staticStyle:{width:"80px",height:"20px","line-height":"20px",float:"left"}},[e._v("选择店铺：")]),e._v(" "),n("section",{staticStyle:{"line-height":"20px",float:"left"}},[e._v(e._s(e.selectName))])]),e._v(" "),e.loading?e._e():n("div",{staticStyle:{width:"128px",margin:"200px auto"}},[n("img",{attrs:{src:r("b8bc")}})]),e._v(" "),e.loading?n("section",{staticClass:"allBox"},[n("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"","row-style":{color:"#f8941f"},"header-cell-style":{"background-color":"#f5f7fa"},data:e.newpayTotalNum,border:""},on:{"header-click":e.headClick}},[n("el-table-column",{attrs:{width:"250",align:"center",prop:"totalDay",label:"天数"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"100",align:"center",prop:"orderNum",label:"订单数"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"80",align:"center",prop:"person",label:"人数"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","render-header":e.renderHeader,"show-overflow-tooltip":"",align:"center",prop:"goodsNum",label:"商品总数"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"100","render-header":e.renderHeader,"show-overflow-tooltip":"",align:"center",prop:"salesNum",label:"销量"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"100","show-overflow-tooltip":"",align:"center",prop:"returnNum",label:"退品总数"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","show-overflow-tooltip":"",align:"center",prop:"returnPrice",label:"退品总额"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.returnPrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","render-header":e.renderHeader,"show-overflow-tooltip":"",align:"center",property:"discountPrice",label:"优惠总额"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.discountPrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120",align:"center","show-overflow-tooltip":"",prop:"orderNum",label:"代金券"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.cashCoupon.price).toFixed(2)+"("+t.row.cashCoupon.num+"张)"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120",align:"center","show-overflow-tooltip":"",prop:"profit",label:"利润"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.profit).toFixed(2)))])]}}])}),e._v(" "),e._l(e.paymentList,function(t,r){return[n("el-table-column",{key:r,attrs:{"min-width":"120","show-overflow-tooltip":"",align:"center",label:t.paymentName},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(e.paymentList[r].num).toFixed(2)))])]}}])})]}),e._v(" "),n("el-table-column",{attrs:{"min-width":"100",align:"center","show-overflow-tooltip":"",prop:"chargePrice",label:"服务费"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.chargePrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"100",align:"center","show-overflow-tooltip":"",prop:"change",label:"找零"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.change).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"100",align:"center","show-overflow-tooltip":"",prop:"bitPrice",label:"系统取整"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.bitPrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","render-header":e.renderHeader,align:"center","show-overflow-tooltip":"",prop:"originalPrice",label:"消费总额"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.originalPrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","show-overflow-tooltip":"",align:"center",prop:"paidTotalPrice",label:"实收总额"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.paidTotalPrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","render-header":e.renderHeader,"show-overflow-tooltip":"",align:"center",prop:"paymentPrice",label:"入账总额"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.paymentPrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","render-header":e.renderHeader,align:"center",prop:"memberRecharge",label:"会员充值"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.memberRecharge).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","show-overflow-tooltip":"",align:"center",prop:"settlePrice",label:"挂账结清金额"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.settlePrice).toFixed(2)))])]}}])})],2),e._v(" "),n("section",{staticStyle:{"margin-top":"20px"}},[n("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"","header-cell-style":{"background-color":"#f5f7fa"},data:e.lists,border:""}},[n("el-table-column",{attrs:{fixed:"",width:"250",align:"center",prop:"shopName",label:"店铺名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{color:"#00AAE7",cursor:"pointer"},on:{click:function(r){e.openDayDetial(t.row)}}},[e._v(e._s(t.row.shopName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"100",align:"center",prop:"orderNum",label:"订单数"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"80",align:"center",prop:"person",label:"人数"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","render-header":e.renderHeader,"show-overflow-tooltip":"",align:"center",prop:"goodsNum",label:"商品总数"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"100","render-header":e.renderHeader,"show-overflow-tooltip":"",align:"center",prop:"salesNum",label:"销量"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"100","show-overflow-tooltip":"",align:"center",prop:"returnNum",label:"退品数"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","show-overflow-tooltip":"",align:"center",prop:"returnPrice",label:"退品总额"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.returnPrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","render-header":e.renderHeader,"show-overflow-tooltip":"",align:"center",property:"discountPrice",label:"优惠金额"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.discountPrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120",align:"center","show-overflow-tooltip":"",prop:"orderNum",label:"代金券"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.cashCoupon.price).toFixed(2)+"("+t.row.cashCoupon.num+"张)"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120",align:"center","show-overflow-tooltip":"",prop:"profit",label:"利润"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.profit).toFixed(2)))])]}}])}),e._v(" "),e._l(e.paymentList,function(t,r){return[n("el-table-column",{key:r,attrs:{"min-width":"120","show-overflow-tooltip":"",align:"center",label:t.paymentName},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.payLists[r].num).toFixed(2)))])]}}])})]}),e._v(" "),n("el-table-column",{attrs:{"min-width":"100",align:"center","show-overflow-tooltip":"",prop:"chargePrice",label:"服务费"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.chargePrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"100",align:"center","show-overflow-tooltip":"",prop:"change",label:"找零"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.change).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"100",align:"center","show-overflow-tooltip":"",prop:"bitPrice",label:"系统取整"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.bitPrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","render-header":e.renderHeader,align:"center","show-overflow-tooltip":"",prop:"originalPrice",label:"消费总额"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.originalPrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","show-overflow-tooltip":"",align:"center",prop:"paidTotalPrice",label:"实收总额"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.paidTotalPrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","render-header":e.renderHeader,"show-overflow-tooltip":"",align:"center",prop:"paymentPrice",label:"入账总额"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.paymentPrice).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","render-header":e.renderHeader,align:"center",prop:"memberRecharge",label:"会员充值"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.memberRecharge).toFixed(2)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"min-width":"120","show-overflow-tooltip":"",align:"center",prop:"settlePrice",label:"挂账结清金额"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(parseFloat(t.row.settlePrice).toFixed(2)))])]}}])})],2)],1)],1):e._e(),e._v(" "),n("div",{staticStyle:{margin:"20px 0"}},[n("el-pagination",{attrs:{background:"","current-page":e.currentPage,"page-count":e.totalNum,"page-size":e.num,layout:"sizes, prev, pager, next","page-sizes":[10,20,30]},on:{"size-change":e.numChange,"current-change":e.pageClick}})],1),e._v(" "),e.preferentialBounced?n("order-win",{attrs:{payTotalNum:e.payTotalNum,title:e.title},on:{toClick:e.whetherToclick}}):e._e()],1)},[],!1,null,"65d12db2",null);t.default=c.exports}}]);