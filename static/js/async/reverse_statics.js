(window.webpackJsonp=window.webpackJsonp||[]).push([["reverse_statics"],{"8c06":function(t,e,i){"use strict";var n=i("b6b5");i.n(n).a},b6b5:function(t,e,i){},d19b:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"revSta"}},[t.isShow?t._e():i("section",[t.isAll?i("div",{staticClass:"order-order-data"},[i("ul",[i("section",{staticClass:" fl"},[i("calendar",{attrs:{pObj:t.startObj},on:{throwTime:t.getStartTime}})],1),t._v(" "),i("span",{staticClass:"to"},[t._v("至")]),t._v(" "),i("section",{staticClass:" fl"},[i("calendar",{attrs:{pObj:t.endObj},on:{throwTime:t.getEndTime}})],1),t._v(" "),i("li",[i("div",{staticClass:"checkBox",class:{selected:t.isOpenTime},on:{click:t.selectBusinessHours}}),t._v(" "),i("span",{staticStyle:{"font-size":"16px"}},[t._v("按营业时间")])]),t._v(" "),i("li",[i("span",{staticStyle:{"font-size":"16px"}},[t._v("反结账原因：")]),t._v(" "),i("selectBtn",{attrs:{sorts:t.reasonList.map(function(t){return t.reasonName}),name:t.busisName,selected:t.busisNatureSel},on:{emit:t.changeWxType,"update:selected":function(e){t.busisNatureSel=e}}})],1),t._v(" "),i("li",[i("a",{staticClass:"fl blue secBtn",attrs:{href:"javascript:void(0)"},on:{click:function(e){t.getReverList()}}},[t._v("筛选")]),t._v(" "),i("a",{staticClass:"fl gray recBtn",attrs:{href:"javascript:void(0)"},on:{click:function(e){t.resetting()}}},[t._v("重置")])]),t._v(" "),i("li",[i("span",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.orderOid,expression:"orderOid"}],attrs:{type:"text",placeholder:"请输入订单号",maxlength:"20"},domProps:{value:t.orderOid},on:{input:function(e){e.target.composing||(t.orderOid=e.target.value)}}}),t._v(" "),i("a",{staticClass:"order-order-searchA fi fi-search",on:{click:function(e){t.searchOid()}}})])])])]):t._e(),t._v(" "),t.isAll?i("section",{staticStyle:{"margin-bottom":"20px"}},[i("com-table",{attrs:{listHeight:50,listWidth:1100,showHand:!1,fixed:1,titleData:t.titleList,introData:t.reverseList},on:{tableEvent:t.tableEvent},scopedSlots:t._u([{key:"con-0",fn:function(e){return i("div",{on:{click:function(i){t.openOid(e.data.oid)}}},[t._v(t._s(e.data.oid))])}}])})],1):t._e(),t._v(" "),t.isAll?t._e():i("section",{staticStyle:{"margin-bottom":"20px"}},[i("com-table",{attrs:{listHeight:50,listWidth:1100,showHand:!1,fixed:1,titleData:t.shoptitleList,introData:t.reverseOneList},on:{tableEvent:t.tableEvent},scopedSlots:t._u([{key:"title-0",fn:function(e){return i("div",{staticStyle:{color:"#29abe2",cursor:"pointer"},on:{click:function(e){t.openOidDetial(t.oid)}}},[t._v(t._s(t.oid))])}},{key:"con-0",fn:function(e){return i("div",{},[t._v(t._s("第"+(e.index+1)+"次"))])}}])})],1),t._v(" "),t.isAll?i("section",{staticClass:"turn-page"},[i("pageElement",{attrs:{page:Number(t.page),total:Number(t.totalNum),isNoJump:!0},on:{pageNum:t.getPageNum}})],1):t._e()]),t._v(" "),t.isShow?i("orderDetail",{attrs:{detail:t.oidDetial,isDelete:!1},on:{detailShow:t.retOidDetial}}):t._e()],1)};n._withStripped=!0;var s=i("81a2"),a=i("f6ce"),r=i("05dd");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function n(s,a){try{var r=e[s](a),o=r.value}catch(t){return void i(t)}if(!r.done)return Promise.resolve(o).then(function(t){n("next",t)},function(t){n("throw",t)});t(o)}("next")})}}var l={data:function(){return{page:1,num:10,totalNum:1,startObj:{time:(new Date).setHours(0,0,0,0),width:170},endObj:{time:(new Date).setHours(23,59,59,999),width:170},isOpenTime:!1,titleList:[{titleName:"订单号",dataName:"oid",titleStyle:{width:"15%"},conStyle:{color:"#29abe2",cursor:"pointer"}},{titleName:"反结账次数",dataName:"times",titleStyle:{width:"10%"}},{titleName:"反结账前(消费/实收)",dataName:"oldPrice",titleStyle:{width:"15%"}},{titleName:"反结账后(消费/实收)",dataName:"newPrice",titleStyle:{width:"15%"}},{titleName:"反结账时间",dataName:"time",titleStyle:{width:"15%"}},{titleName:"反结账原因",dataName:"reason",titleStyle:{width:"15%"}},{titleName:"操作人",dataName:"createUser",titleStyle:{width:"10%"}}],shoptitleList:[{titleName:"订单号",dataName:"oid",titleStyle:{width:"15%"}},{titleName:"反结账前(消费/实收)",dataName:"oldPrice",titleStyle:{width:"15%"}},{titleName:"反结账后(消费/实收)",dataName:"newPrice",titleStyle:{width:"15%"}},{titleName:"反结账时间",dataName:"time",titleStyle:{width:"15%"}},{titleName:"反结账原因",dataName:"reason",titleStyle:{width:"15%"}},{titleName:"操作人",dataName:"createUser",titleStyle:{width:"10%"}}],isAll:!0,reverseList:[],reasonList:[],busisName:"请选择",busisNatureSel:-1,reasonId:0,reverseOneList:[],oid:"",orderOid:"",isShow:!1,oidDetial:null}},mounted:function(){var t=a.a.session("titleDetial");t&&null!=t&&(this.page=t.page,this.startObj.time=t.startTime,this.endObj.time=t.endTime,this.isOpenTime=t.isOpenTime),this.$store.commit("setPageTools",[]),this.init()},watch:{isAll:"getBack"},components:{calendar:function(){return i.e("calendar_result").then(i.bind(null,"9265"))},pageElement:function(){return i.e("page_element").then(i.bind(null,"5921"))},comTable:function(){return i.e("table").then(i.bind(null,"4360"))},selectBtn:function(){return i.e("select_btn").then(i.bind(null,"3d41"))},orderDetail:function(){return i.e("delete_detail").then(i.bind(null,"603c"))}},methods:{getBack:function(){var t=this;t.isAll?t.$store.commit("setPageTools",[]):this.$store.commit("setPageTools",[{name:"返回",className:["back"],fn:function(){t.isAll=!0}}])},retOidDetial:function(){this.isShow=!1,this.getBack()},searchOid:function(){var t=this.orderOid;return null==t||void 0==t||""==t?(this.$store.commit("setWin",{content:"请输入订单号码!"}),!1):t.split("").length<18||!/\d+/g.test(t)?(this.$store.commit("setWin",{content:"请输入正确订单号码!"}),!1):void this.openOid(this.orderOid)},resetting:function(){this.startObj.time=(new Date).setHours(0,0,0,0),this.endObj.time=(new Date).setHours(23,59,59,999),this.isOpenTime=!1,this.reasonId=0,this.busisName="请选择",this.init()},init:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var i,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.getReasonList({data:{type:1}});case 2:(i=e.sent)&&(n={id:0,reasonName:"全部"},i.unshift(n),t.reasonList=i),t.getReverList();case 5:case"end":return e.stop()}},e,t)}))()},getReverList:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var i,n,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.checkData()){e.next=3;break}return e.abrupt("return",!1);case 3:return e.next=5,s.a.getReverseList({data:{startTime:parseInt(t.startObj.time/1e3),endTime:parseInt(t.endObj.time/1e3),isOpenTime:Number(t.isOpenTime),page:t.page,num:t.num,reasonId:t.reasonId}});case 5:for(i=e.sent,n=i.list,t.totalNum=i.totalNum,a=0;a<n.length;a++)n[a].oldPrice=n[a].oldOrigPrice+"/"+n[a].oldPrice,n[a].newPrice=n[a].nowOrigPrice+"/"+n[a].nowPrice;t.reverseList=n;case 10:case"end":return e.stop()}},e,t)}))()},changeWxType:function(t){this.busisNatureSel=t,this.reasonId=this.reasonList[t].id,this.busisName=this.reasonList[t].reasonName},openOid:function(t){var e=this;return o(regeneratorRuntime.mark(function i(){var n,a;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return e.oid=t,i.next=3,s.a.getReverseDetail({data:{oid:t}});case 3:if(n=i.sent){for(a=0;a<n.length;a++)n[a].oldPrice=n[a].oldOrigPrice+"/"+n[a].oldPrice,n[a].newPrice=n[a].nowOrigPrice+"/"+n[a].nowPrice;e.reverseOneList=n,e.isAll=!1}case 5:case"end":return i.stop()}},i,e)}))()},openOidDetial:function(){var t=this;return o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.orderBillDelite({data:{oid:t.oid}});case 2:t.oidDetial=e.sent,t.oidDetial&&(t.isShow=!0);case 5:case"end":return e.stop()}},e,t)}))()},getStartTime:function(t){this.startObj.time=new Date(t).getTime()},getEndTime:function(t){this.endObj.time=new Date(t).getTime()},selectBusinessHours:function(){this.isOpenTime=!this.isOpenTime},checkData:function(){return this.endObj.time-this.startObj.time>r.a.timeConst.THREEMONTHS?(this.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"只能查询间隔三个月的数据"}),!1):!(this.startObj.time-this.endObj.time>0)||(this.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"查询时间选择错误"}),!1)},tableEvent:function(){},getPageNum:function(t){this.page=t.page,this.num=t.num,this.getReverList()}}},c=(i("8c06"),i("7610")),d=Object(c.a)(l,n,[],!1,null,"270d3bee",null);d.options.__file="src\\module\\statistics\\reverse_statics.vue";e.default=d.exports}}]);