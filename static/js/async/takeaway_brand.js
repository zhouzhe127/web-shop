(window.webpackJsonp=window.webpackJsonp||[]).push([["takeaway_brand"],{"302b":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticStyle:{"padding-top":"20px"},attrs:{id:"statistics-order"}},[s("div",{staticClass:"button"},[s("a",{attrs:{href:"javascript:void(0);"},on:{click:t.toOrder}},[t._v("堂吃")]),t._v(" "),s("a",{staticClass:"select",attrs:{href:"javascript:void(0);"}},[t._v("外卖")]),t._v(" "),s("a",{attrs:{id:"returncolor",href:"javascript:void(0);"},on:{click:t.toProprietary}},[t._v("自营外卖")])]),t._v(" "),s("div",{staticClass:"order-order-data"},[s("ul",[s("section",{staticClass:"tableListInp",staticStyle:{display:"inline-block"}},[s("calendar",{attrs:{pObj:t.startObj},on:{throwTime:t.getStartTime}})],1),t._v(" "),s("span",{staticStyle:{width:"23px","vertical-align":"top",height:"40px","line-height":"40px","text-align":"center",display:"inline-block"}},[t._v("至")]),t._v(" "),s("section",{staticClass:"tableListInp",staticStyle:{display:"inline-block"}},[s("calendar",{attrs:{pObj:t.endObj},on:{throwTime:t.getEndTime}})],1),t._v(" "),s("div",{staticStyle:{display:"inline-block"}},[s("li",{staticStyle:{"line-height":"40px"}},[s("div",{class:{selected:t.isOpenTime},staticStyle:{width:"20px",height:"20px",cursor:"pointer",border:"1px solid #28A8E0",margin:"10px 10px",float:"left"},on:{click:t.selectBusinessHours}}),t._v(" "),s("span",{staticStyle:{"font-size":"16px"}},[t._v("按营业时间")])]),t._v(" "),s("li",{staticStyle:{"line-height":"40px"}},[s("selectstore",{attrs:{sorts:t.postSelectShopList,tipName:t.selectName},on:{emit:t.getSelectShopList}})],1)]),t._v(" "),s("div",{staticStyle:{display:"inline-block"}},[s("li",{staticStyle:{"line-height":"40px"}},[s("selectBtn",{attrs:{sorts:t.takeawaytypeList,name:t.allTakeawaytype},on:{selOn:t.getTakeawayType}})],1),t._v(" "),s("a",{staticClass:"fl blue",staticStyle:{width:"80px",height:"40px","line-height":"40px","margin-left":"20px"},attrs:{href:"javascript:void(0)"},on:{click:function(e){t.sreachOrderInDays()}}},[t._v("搜索")]),t._v(" "),s("a",{staticClass:"fl gray",staticStyle:{width:"80px",height:"40px","line-height":"40px","margin-left":"20px"},attrs:{href:"javascript:void(0)"},on:{click:function(e){t.resetting()}}},[t._v("重置")])])])]),t._v(" "),s("section",{staticStyle:{width:"100%",overflow:"hidden",height:"auto","line-height":"40px","margin-top":"10px"}},[s("section",{staticStyle:{width:"80px",height:"20px","line-height":"20px",float:"left"}},[t._v("选择店铺：")]),t._v(" "),s("section",{staticStyle:{height:"auto","line-height":"20px",float:"left"}},[t._v(t._s(t.selectName))])]),t._v(" "),t.loading?t._e():s("div",{staticStyle:{width:"128px",margin:"200px auto"}},[s("img",{attrs:{src:i("b8bc")}})]),t._v(" "),t.loading?s("section",{staticClass:"allBox"},[s("div",{staticClass:"aLeft"},[t._m(0),t._v(" "),s("ul",{staticClass:"aUl",staticStyle:{"background-color":"#fff","border-bottom":"1px solid #D2D2D2","border-left":"1px solid #D2D2D2","box-sizing":"border-box",width:"100%"}},[s("li",{staticClass:"aLi",staticStyle:{width:"100px"}}),t._v(" "),s("li",{staticClass:"aLi",staticStyle:{color:"#F8941F",width:"150px"}},[t._v(t._s(t.payTotalNum.days?t.payTotalNum.days:"1"))])]),t._v(" "),s("div",{staticStyle:{width:"100%",height:"50px","text-align":"center","line-height":"50px","border-top":"1px solid #d2d2d2","border-left":"1px solid #d2d2d2","margin-top":"30px"}},[t._v("订单统计·共\n\t\t\t\t"),s("span",{staticStyle:{color:"red"}},[t._v(t._s(t.lists.length))]),t._v("条记录")]),t._v(" "),s("div",[s("section",{staticStyle:{width:"100%",overflow:"auto","border-left":"1px solid #D2D2D2"}},[t._m(1),t._v(" "),t._l(t.lists,function(e,i){return t.lists.length>0?[s("ul",{key:i,staticClass:"aUl",staticStyle:{"background-color":"#fff","box-sizing":"border-box",width:"100%","border-bottom":"3px solid #F7F7F7"}},[s("li",{staticStyle:{width:"250px",color:"#00AAE7",cursor:"pointer"},on:{click:function(i){t.openDayDetial(e)}}},[t._v(t._s(e.shopName))])])]:t._e()}),t._v(" "),0==t.lists.length?[t._m(2)]:t._e()],2)])]),t._v(" "),s("div",{staticClass:"aRight",staticStyle:{width:"100%",height:"auto","padding-left":"250px",overflow:"auto"}},[s("section",{style:{width:t.showWidth+"px"}},[s("ul",{staticClass:"aUl",staticStyle:{"background-color":"#f2f2f2"}},[s("li",{staticClass:"width70"},[t._v("订单数")]),t._v(" "),s("li",{staticClass:"width100 detLi"},[t._v("商品总数\n\t\t\t\t\t\t"),s("detailsDes",{attrs:{title:"该时间段的商品总数包含了订单中所有的商品数量（包括赠品和退品）"}})],1),t._v(" "),s("li",{staticClass:"width70 detLi"},[t._v("销量\n\t\t\t\t\t\t"),s("detailsDes",{attrs:{title:"该时间段已销售的数量（不包含退品数）公式：商品总数-退品数=销量"}})],1),t._v(" "),s("li",{staticClass:"width70"},[t._v("赠品数")]),t._v(" "),s("li",{staticClass:"width100"},[t._v("配送总额")]),t._v(" "),s("li",{staticClass:"width100"},[t._v("优惠总额")]),t._v(" "),s("li",{staticClass:"width100 detLi"},[t._v("消费总额\n\t\t\t\t\t\t"),s("detailsDes",{attrs:{title:"该时段内所有商品原价的金额总计（不计入退品金额）"}})],1),t._v(" "),s("li",{staticClass:"width100 detLi"},[t._v("入账总额\n\t\t\t\t\t\t"),s("detailsDes",{attrs:{title:"该时间段中实际收入的金额（不计入未入实账的支付方式的金额）"}})],1)]),t._v(" "),s("ul",{staticClass:"order-content-show",staticStyle:{"background-color":"#fff","border-bottom":"1px solid #D2D2D2","border-left":"1px solid #D2D2D2","box-sizing":"border-box",width:"100%","border-right":"1px solid #D2D2D2",overflow:"hidden"}},[s("li",{staticClass:"width70",staticStyle:{color:"#F8941F"}},[t._v(t._s(t.payTotalNum.orderNum))]),t._v(" "),s("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(t.payTotalNum.totalNum))]),t._v(" "),s("li",{staticClass:"width70",staticStyle:{color:"#F8941F"}},[t._v(t._s(t.payTotalNum.goodsNum))]),t._v(" "),s("li",{staticClass:"width70",staticStyle:{color:"#F8941F"}},[t._v(t._s(t.payTotalNum.discountNum))]),t._v(" "),s("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(t.payTotalNum.deliverFee.toFixed(2)))]),t._v(" "),s("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(t.payTotalNum.activityFee.toFixed(2)))]),t._v(" "),s("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(t.payTotalNum.goodsTotalPrice.toFixed(2)))]),t._v(" "),s("li",{staticClass:"width100",staticStyle:{color:"#F8941F"}},[t._v(t._s(t.payTotalNum.income.toFixed(2)))])])]),t._v(" "),s("div",{style:{width:t.showWidth+"px"}},[s("section",{staticStyle:{width:"100%",overflow:"auto","min-height":"130px"}},[s("div",{staticStyle:{width:"100%",height:"50px","text-align":"center","line-height":"50px","border-top":"1px solid #d2d2d2","margin-top":"30px"}}),t._v(" "),s("ul",{staticStyle:{"background-color":"#f2f2f2","border-left":"1px solid #D2D2D2","box-sizing":"border-box",width:"100%"}},[s("li",{staticClass:"width70"},[t._v("订单数")]),t._v(" "),s("li",{staticClass:"width100 detLi"},[t._v("商品总数\n\t\t\t\t\t\t\t"),s("detailsDes",{attrs:{title:"该日商品总数包含了订单中所有的商品数量（包括赠品和退品）"}})],1),t._v(" "),s("li",{staticClass:"width70 detLi"},[t._v("销量\n\t\t\t\t\t\t\t"),s("detailsDes",{attrs:{title:"该日已销售的数量（不包含退品数）公式：商品总数-退品数=销量"}})],1),t._v(" "),s("li",{staticClass:"width70"},[t._v("赠品数")]),t._v(" "),s("li",{staticClass:"width100"},[t._v("配送金额")]),t._v(" "),s("li",{staticClass:"width100 detLi"},[t._v("优惠总额\n\t\t\t\t\t\t\t"),s("detailsDes",{attrs:{title:"该日所有的优惠金额总计"}})],1),t._v(" "),s("li",{staticClass:"width100 detLi"},[t._v("消费总额\n\t\t\t\t\t\t\t"),s("detailsDes",{attrs:{title:"该日所有商品原价的金额总计（不计入退品金额）"}})],1),t._v(" "),s("li",{staticClass:"width100 detLi"},[t._v("入账金额\n\t\t\t\t\t\t\t"),s("detailsDes",{attrs:{title:"该日实际收入的金额（不计入未入实账的支付方式的金额）"}})],1)]),t._v(" "),t.lists.length>0?[t._l(t.lists,function(e,i){return[s("ul",{key:i,staticStyle:{"background-color":"#fff","border-left":"1px solid #D2D2D2","box-sizing":"border-box",width:"100%","border-bottom":"3px solid #F7F7F7",overflow:"hidden"}},[s("li",{staticClass:"width70"},[t._v(t._s(e.orderNum))]),t._v(" "),s("li",{staticClass:"width100"},[t._v(t._s(e.totalNum))]),t._v(" "),s("li",{staticClass:"width70"},[t._v(t._s(e.goodsNum))]),t._v(" "),s("li",{staticClass:"width70"},[t._v(t._s(e.discountNum))]),t._v(" "),s("li",{staticClass:"width100"},[t._v(t._s(e.deliverFee.toFixed(2)))]),t._v(" "),s("li",{staticClass:"width100"},[t._v(t._s(e.activityFee.toFixed(2)))]),t._v(" "),s("li",{staticClass:"width100"},[t._v(t._s(e.goodsTotalPrice.toFixed(2)))]),t._v(" "),s("li",{staticClass:"width100"},[t._v(t._s(e.income.toFixed(2)))])])]})]:s("ul",{staticStyle:{width:"100%",height:"80px"}},[s("li",{staticStyle:{color:"orange","text-align":"left",width:"100%","padding-left":"200px"}},[t._v("该时间段并没有订单数据")])])],2)])])]):t._e(),t._v(" "),s("div",{staticStyle:{float:"left","margin-left":"30px","margin-top":"20px"}},[s("pageElement",{attrs:{page:t.currentPage,total:t.totalNum,num:t.num,isNoJump:!0},on:{pageNum:t.pageClick}})],1)])};s._withStripped=!0;var a=i("81a2"),r=i("f6ce"),n=i("bbb9");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function s(a,r){try{var n=e[a](r),o=n.value}catch(t){return void i(t)}if(!n.done)return Promise.resolve(o).then(function(t){s("next",t)},function(t){s("throw",t)});t(o)}("next")})}}var l={data:function(){return{userData:{},startTime:"",endTime:"",newStartTime:"",newEndTime:"",orderListInDays:[],isZeroPays:[],payTotalNum:{orderNum:0,totalNum:0,goodsNum:0,discountNum:0,deliverFee:0,activityFee:0,goodsTotalPrice:0,income:0},showWidth:1378,payLsZero:!1,exportUrl:"javascript:void(0);",dateTime:[],isOpenTime:"",startH:"",startM:"",startS:"",endH:"",endM:"",endS:"",isBrand:"",selectName:"",shopListBtn:!1,selectShopList:null,postSelectShopList:null,shopIds:"",taskId:"",allTrue:!0,agwge:!0,loading:!0,takeawaytypeList:["全部","饿了么","美团","百度外卖"],allTakeawaytype:"请选择类型",takeawaytypeBtn:!1,countList:[{name:10},{name:50}],paginationList:[],page:0,num:10,total:1,currentPage:1,shopInfo:null,selectTypeNum:null,startObj:{},endObj:{}}},computed:{totalNum:function(){return Math.ceil(this.orderListInDays.length/this.num)},lists:function(){var t=(this.currentPage-1)*this.num,e=this.currentPage*this.num;return this.orderListInDays.slice(t,e)}},methods:{initBtn:function(){var t=this,e=[{name:"导出",style:{},fn:function(){t.exportOrder()}}];this.$store.commit("setPageTools",e)},pageClick:function(t){this.currentPage=t.page,this.num=t.num},toOrder:function(){var t;t={name:"orderBrand",startTime:this.startTime,endTime:this.endTime,isOpenTime:this.isOpenTime},r.a.session("orderBrand",t),this.$router.push({path:"/admin/orderStatistics",query:this.$route.query})},toProprietary:function(){this.$router.push({path:"/admin/orderStatistics/orderProprietaryBrand",query:this.$route.query})},selectBusinessHours:function(){this.isOpenTime=!this.isOpenTime},getStartTime:function(t){this.newStartTime=t},getEndTime:function(t){this.newEndTime=t},showtakeawaytypeList:function(t){t.stopPropagation(),this.takeawaytypeBtn=!this.takeawaytypeBtn},openDayDetial:function(t){var e={startTime:this.startTime,endTime:this.endTime,allDayPage:this.currentPage,isOpenTime:this.isOpenTime,selectShops:this.isOpenTime,isbrandJoin:!0,itemDetial:t,selectShopList:this.selectShopList,shopId:t.id,type:this.selectTypeNum};r.a.session("brandDetial",e),this.$router.push({path:"/admin/orderStatistics/orderTakeaway",query:this.$route.query})},init:function(){this.getOrderListInDays()},openShop:function(t){t.stopPropagation(),this.shopListBtn=!this.shopListBtn},sreachOrderInDays:function(){return this.newEndTime-this.newStartTime>80352e5?(this.$store.commit("setWin",{title:"操作提示",content:"最大只能查询三个月时间"}),!1):parseInt(this.newStartTime/1e3)-parseInt(this.newEndTime/1e3)>0?(this.$store.commit("setWin",{title:"操作提示",content:"时间选择错误"}),!1):(this.startTime=this.newStartTime,this.endTime=this.newEndTime,void this.getOrderListInDays())},resetting:function(){this.startTime=(new Date).setHours(0,0,0,0),this.endTime=(new Date).setHours(23,59,59,999),this.startObj={time:this.startTime},this.endObj={time:this.endTime},this.isOpenTime=!0,this.selectName="",this.allTakeawaytype="请选择类型",this.selectTypeNum=0;for(var t=0;t<this.selectShopList.length;t++)this.selectShopList[t].selected=!0,this.selectName=this.selectName+this.selectShopList[t].shopName+",";this.getOrderListInDays()},getOrderListInDays:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var i,s,r,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.loading=!1,""!=t.shopIds){e.next=4;break}return t.$store.commit("setWin",{title:"操作提示",content:"请选择要查询的店铺"}),e.abrupt("return",!1);case 4:return i=new Date(t.startTime),s=new Date(t.endTime),t.startH=n.a.format(i,"hh"),t.startM=n.a.format(i,"mm"),t.startS=n.a.format(i,"ss"),t.endH=n.a.format(s,"hh"),t.endM=n.a.format(s,"mm"),t.endS=n.a.format(s,"ss"),r=0,void 0==t.selectTypeNum&&(t.selectTypeNum=0),e.next=16,a.a.OrderReport({data:{trueShopId:t.userData.currentShop.id,type:"7",timeType:"1",startTime:parseInt(t.startTime/1e3),endTime:parseInt(t.endTime/1e3),takeoutType:t.selectTypeNum,isOpenTime:Number(t.isOpenTime),shopIds:t.shopIds}});case 16:(l=e.sent).taskId&&(t.taskId=l.taskId,window.timer=setInterval(o(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r++,e.next=3,a.a.taskInfo({data:{trueShopId:t.userData.currentShop.id,taskId:t.taskId}});case 3:i=e.sent,t.agwge=!0,2==i.status?(t.$store.commit("setWin",{content:"请求失败，请重试！"}),t.loading=!1,clearInterval(window.timer)):3==i.status?(t.loading=!0,t.getrrrrrr(t.taskId),clearInterval(window.timer)):t.agwge=!1,r>60&&(t.agwge=!1,clearInterval(window.timer));case 7:case"end":return e.stop()}},e,t)})),1e3),0==t.agwge&&clearInterval(window.timer));case 18:case"end":return e.stop()}},e,t)}))()},getrrrrrr:function(t){var e=this;return o(regeneratorRuntime.mark(function i(){var s,r,n,o,l,c,d;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,a.a.getOrderManyShopsStat({data:{taskId:t,type:7,brandId:e.userData.currentShop.id}});case 2:if(0!=(s=i.sent).length){i.next=7;break}return e.orderListInDays=[],e.payTotalNum.discountList={order:[],coupon:[]},i.abrupt("return");case 7:for(e.orderListInDays=s.list,e.payTotalNum=s.total,e.payTotalNum.discountList={order:[],coupon:[]},r=0;r<s.list.length;r++)if(s.list[r].discountList){for(n=0;n<s.list[r].discountList.order.length;n++)e.payTotalNum.discountList.order.push(s.list[r].discountList.order[n]);for(o=0;o<s.list[r].discountList.coupon.length;o++)e.payTotalNum.discountList.coupon.push(s.list[r].discountList.coupon[o])}for(l={},c=0;c<e.orderListInDays.length;c++)for(d=0;d<e.selectShopList.length;d++)e.selectShopList[d].id==e.orderListInDays[c].shopId&&(e.orderListInDays[c].shopName=e.selectShopList[d].shopName,l[e.selectShopList[d].id]=e.orderListInDays[c].shopName,e.shopInfo=l);e.shopInfo=l;case 14:case"end":return i.stop()}},i,e)}))()},getOrderListMonPage:function(){this.getOrderListInDays()},exportOrder:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0!=t.orderListInDays.length){e.next=3;break}return t.$store.commit("setWin",{title:"操作提示",content:"没有订单可以导出"}),e.abrupt("return",!1);case 3:if(i=80352e5,!(t.endTime-t.startTime>i)){e.next=9;break}return t.$store.commit("setWin",{title:"操作提示",content:"最大只能查询三个月时间"}),e.abrupt("return",!1);case 9:if(!(parseInt(t.startTime/1e3)-parseInt(t.endTime/1e3)>0)){e.next=12;break}return t.$store.commit("setWin",{title:"操作提示",content:"时间选择错误"}),e.abrupt("return",!1);case 12:return e.next=14,a.a.exportManyShopsOrderStat({data:{brandId:t.userData.currentShop.id,taskId:t.taskId,type:7,shopInfo:JSON.stringify(t.shopInfo),format:"csv"}});case 14:case"end":return e.stop()}},e,t)}))()},getSelectShopList:function(t){this.postSelectShopList=t;for(var e="",i="",s=0;s<t.length;s++)1==t[s].selected&&(e=e+t[s].id+",",i=i+t[s].name+",");var a=e.split("").length;""!==e&&(e=e.substring(0,a-1)),this.shopIds=e,this.selectName=""==i?"请选择店铺":i},getTakeawayType:function(t){this.selectTypeNum=t}},destroyed:function(){clearInterval(window.timer)},mounted:function(){this.initBtn();for(var t=r.a.session("userShop"),e=r.a.session("brandorderDetial"),i=r.a.session("takeoutBrand"),s=r.a.session("shopList"),a=0;a<s.length;a++)s[a].selected=!0;var n="",o="";e&&(s=e.selectShopList);var l=[];s.forEach(function(t){var e={id:t.id,name:t.shopName,selected:t.selected};l.push(e)});for(var c=0;c<s.length;c++)1==s[c].selected&&(n=n+s[c].id+",",o=o+s[c].shopName+",");var d=n.split("").length;""!==n&&(n=n.substring(0,d-1)),this.startTime=e?e.startTime:i?i.startTime:(new Date).setHours(0,0,0,0),this.endTime=e?e.endTime:i?i.endTime:(new Date).setHours(23,59,59,999),this.newStartTime=e?e.startTime:i?i.startTime:(new Date).setHours(0,0,0,0),this.newEndTime=e?e.endTime:i?i.endTime:(new Date).setHours(23,59,59,999),this.isOpenTime=e?e.isOpenTime:!i||i.isOpenTime,this.isBrand="3"==t.currentShop.ischain,this.userData=t,this.selectShopList=e?e.selectShopList:s,this.postSelectShopList=l,this.selectTypeNum=e?e.type:null,this.shopIds=n,this.selectName=""==o?"请选择店铺":o,0!=this.selectShopList.length?(this.startObj={time:this.startTime},this.endObj={time:this.endTime},"3"===t.currentShop.ischain?(this.init(),sessionStorage.removeItem("brandorderDetial"),sessionStorage.removeItem("takeoutBrand")):this.$router.push({path:"/admin/orderStatistics/orderTakeaway",query:this.$route.query})):this.$store.commit("setWin",{title:"操作提示",content:"没有可选店铺"})},components:{calendar:function(){return i.e("calendar_result").then(i.bind(null,"9265"))},selectstore:function(){return i.e("win").then(i.bind(null,"cb83"))},selectBtn:function(){return i.e("select_btn").then(i.bind(null,"3d41"))},detailsDes:function(){return i.e("details_des").then(i.bind(null,"33d1"))},pageElement:function(){return i.e("page_element").then(i.bind(null,"5921"))}}},c=(i("b3d2"),i("7610")),d=Object(c.a)(l,s,[function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"aUl",staticStyle:{"background-color":"#f2f2f2","border-left":"1px solid #D2D2D2","box-sizing":"border-box",width:"100%"}},[e("li",{staticClass:"aLi",staticStyle:{width:"100px"}}),this._v(" "),e("li",{staticClass:"aLi",staticStyle:{width:"150px"}},[this._v("天数")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"aUl",staticStyle:{"background-color":"#f2f2f2","box-sizing":"border-box",width:"100%"}},[e("li",{staticClass:"aLi",staticStyle:{width:"250px"}},[this._v("店铺名称")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticStyle:{height:"80px"}},[e("li",{staticClass:"width100"})])}],!1,null,"5a87d9ac",null);d.options.__file="src\\module\\statistics\\takeaway_brand.vue";e.default=d.exports},"81df4":function(t,e,i){},b3d2:function(t,e,i){"use strict";var s=i("81df4");i.n(s).a},b8bc:function(t,e,i){t.exports=i.p+"images/preloader.3e54c692.gif"}}]);