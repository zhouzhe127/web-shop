(window.webpackJsonp=window.webpackJsonp||[]).push([["custom_statistics"],{2802:function(t,e,i){"use strict";var s=i("62d3");i.n(s).a},"62d3":function(t,e,i){},c3fe:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"stat-com"}},["all"==t.showDet?i("section",{staticClass:"top"},[i("div",{staticClass:"input-box"},[i("calendar",{staticClass:"data-box",attrs:{time:t.startTime,format:"yyyy年MM月dd日"},on:{emit:t.startTimeChange}})],1),t._v(" "),i("span",{staticClass:"input-word"},[t._v("至")]),t._v(" "),i("div",{staticClass:"input-box"},[i("calendar",{staticClass:"data-box",attrs:{time:t.endTime,format:"yyyy年MM月dd日"},on:{emit:t.endTimeChange}})],1),t._v(" "),i("section",{staticClass:"isTimeOne"},[i("div",{class:{act:t.isOpenTime},on:{click:t.selectBusinessHours}}),t._v(" "),i("span",[t._v("按营业时间")])]),t._v(" "),i("a",{staticClass:"fl yellow searchOne",attrs:{href:"javascript:void(0)"},on:{click:function(e){t.selects()}}},[t._v("搜索")]),t._v(" "),i("a",{staticClass:"fl gray backOne",attrs:{href:"javascript:void(0)"},on:{click:function(e){t.resetting()}}},[t._v("重置")])]):t._e(),t._v(" "),"all"==t.showDet?i("section",[i("div",{staticClass:"oidList"},[t._m(0),t._v(" "),i("ul",{staticClass:"tUl"},[i("li",{staticStyle:{width:"20%"}},[t._v(t._s(t.total.totalDay))]),t._v(" "),i("li",[t._v(t._s(t.total.goodsNum))]),t._v(" "),i("li",[t._v(t._s(t.total.salesNum))]),t._v(" "),i("li",[t._v(t._s(t.total.freeNum))]),t._v(" "),i("li",[t._v(t._s(t.total.freeAmount))]),t._v(" "),i("li",[t._v(t._s(t.total.returnNum))]),t._v(" "),i("li",[t._v(t._s(t.total.returnAmount))]),t._v(" "),i("li",[t._v(t._s(t.total.consumptionAmount))]),t._v(" "),i("li",[t._v(t._s(t.total.paidAmount))])])]),t._v(" "),i("ul",{staticClass:"orMaReMainList"},[i("section",[i("h3",[t._v("自定义商品统计 共\n\t\t\t\t\t"),i("span",[t._v(t._s(t.withoutOrder.length))]),t._v("条记录")])]),t._v(" "),i("li",[i("span",{staticClass:"allSpan",on:{click:t.allSel}},[t._v("全选")]),t._v(" "),i("span",{staticStyle:{width:"18%"}},[t._v("商品名称")]),t._v(" "),i("span",[t._v("商品总数")]),t._v(" "),i("span",{staticStyle:{width:"8%"}},[t._v("销量")]),t._v(" "),i("span",[t._v("赠品总数")]),t._v(" "),i("span",[t._v("赠品金额")]),t._v(" "),i("span",{staticStyle:{width:"8%"}},[t._v("退品数量")]),t._v(" "),i("span",[t._v("退品金额")]),t._v(" "),i("span",[t._v("消费金额")]),t._v(" "),i("span",[t._v("实收金额")])]),t._v(" "),0==t.withoutOrder.length?i("li",{staticStyle:{width:"100%","background-color":"#F2F2F2",color:"#F8931F"}},[t._v("没有自定义商品")]):t._e(),t._v(" "),t._l(t.withoutOrder,function(e,s){return i("li",{key:s},[i("span",{staticStyle:{cursor:"pointer",position:"relative",width:"6%"},on:{click:function(i){t.ocSelOne(e)}}},[i("div",{class:{"active circle":e.selected,circle:!e.selected}})]),t._v(" "),i("span",{staticStyle:{width:"18%"}},[t._v(t._s(e.goodsName))]),t._v(" "),i("span",{staticClass:"cursorAll",on:{click:function(i){t.openGoodSel(e,"goodsNum",s)}}},[t._v(t._s(e.goodsNum))]),t._v(" "),i("span",{staticClass:"cursorAll",staticStyle:{width:"8%"},on:{click:function(i){t.openGoodSel(e,"salesNum",s)}}},[t._v(t._s(e.salesNum))]),t._v(" "),i("span",{staticClass:"cursorAll",on:{click:function(i){t.openGoodSel(e,"freeNum",s)}}},[t._v(t._s(e.freeNum))]),t._v(" "),i("span",[t._v(t._s(e.freeAmount))]),t._v(" "),i("span",{staticClass:"cursorAll",staticStyle:{width:"8%"},on:{click:function(i){t.openGoodSel(e,"returnNum",s)}}},[t._v(t._s(e.returnNum))]),t._v(" "),i("span",[t._v(t._s(e.returnAmount))]),t._v(" "),i("span",[t._v(t._s(e.consumptionAmount))]),t._v(" "),i("span",[t._v(t._s(e.paidAmount))])])})],2)]):t._e(),t._v(" "),t.isShow?i("custom-detail",{attrs:{userData:t.userData,showDet:t.showDet,itemdetial:t.itemdetial},on:{throwWinResult:t.doThrowWinResult}}):t._e()],1)};s._withStripped=!0;var n=i("81a2"),a=i("f6ce"),r=i("bbb9");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function s(n,a){try{var r=e[n](a),o=r.value}catch(t){return void i(t)}if(!r.done)return Promise.resolve(o).then(function(t){s("next",t)},function(t){s("throw",t)});t(o)}("next")})}}var l={data:function(){return{userData:Object,isShow:!1,startTime:(new Date).setHours(0,0,0,0),endTime:(new Date).setHours(23,59,59,999),isOpenTime:!0,withoutTotal:{freeTotalNum:0,orderNum:0,returnTotalNum:0,returnTotalPrice:0},withoutOrder:[],total:{totalDay:"0",goodsNum:"0",salesNum:"0",freeNum:"0",freeAmount:"0",returnNum:"0",consumptionAmount:"0",paidAmount:"0",returnAmount:"0"},allselect:!1,itemdetial:{},itemIndex:0,showDet:"all"}},mounted:function(){this.initBtn(),this.userData=a.a.session("userShop"),this.init()},methods:{initBtn:function(){var t=this,e={name:"导出",className:["fd-yellow"],fn:function(){t.importDet()}};this.$store.commit("setPageTools",[e])},startTimeChange:function(t){this.startTime=t},endTimeChange:function(t){this.endTime=new Date(t).setHours(23,59,59,999)},selectBusinessHours:function(){this.isOpenTime=!this.isOpenTime},selects:function(){this.init()},resetting:function(){this.isOpenTime=!0,this.startTime=(new Date).setHours(0,0,0,0),this.endTime=(new Date).setHours(23,59,59,999),this.selects()},init:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var i,s,a,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(i=80352e5,!(t.endTime-t.startTime>i)){e.next=6;break}return t.$store.commit("setWin",{title:"温馨提示",winType:"alert",content:"最大只能查询三个月时间"}),e.abrupt("return",!1);case 6:if(!(parseInt(t.startTime/1e3)-parseInt(t.endTime/1e3)>0)){e.next=9;break}return t.$store.commit("setWin",{title:"温馨提示",winType:"alert",content:"时间选择错误"}),e.abrupt("return",!1);case 9:return e.next=11,n.a.getStatisticsData({data:{shopId:t.userData.currentShop.id,startYear:t.formatTime(new Date(t.startTime),"yyyy"),startMonth:t.formatTime(new Date(t.startTime),"MM"),startDay:t.formatTime(new Date(t.startTime),"dd"),endYear:t.formatTime(new Date(t.endTime),"yyyy"),endMonth:t.formatTime(new Date(t.endTime),"MM"),endDay:t.formatTime(new Date(t.endTime),"dd"),isOpenTime:Number(t.isOpenTime)}});case 11:if(s=e.sent)if(0==s.length)t.total={totalDay:"0",goodsNum:"0",salesNum:"0",freeNum:"0",freeAmount:"0",returnNum:"0",consumptionAmount:"0",paidAmount:"0",returnAmount:"0"},t.withoutOrder=[];else{for(a=0;a<s.list.length;a++)for(s.list[a].selected=!1,r=0;r<s.list[a].list.length;r++)s.list[a].list[r].itemNum=parseInt(s.list[a].list[r].itemNum),s.list[a].list[r].returnNum=parseInt(s.list[a].list[r].returnNum),s.list[a].list[r].freeNum=parseInt(s.list[a].list[r].freeNum),s.list[a].list[r].salesNum=s.list[a].list[r].itemNum-s.list[a].list[r].returnNum,s.list[a].list[r].freeAmount=parseFloat(s.list[a].list[r].freeNum*s.list[a].list[r].itemPrice).toFixed(2),s.list[a].list[r].consumptionAmount=parseFloat((s.list[a].list[r].itemNum-s.list[a].list[r].returnNum)*s.list[a].list[r].itemPrice).toFixed(2),s.list[a].list[r].returnAmount=parseFloat(s.list[a].list[r].returnNum*s.list[a].list[r].itemPrice).toFixed(2);t.total=s.total,t.withoutOrder=s.list}case 13:case"end":return e.stop()}},e,t)}))()},formatTime:function(t,e){return r.a.format(new Date(t),e)},allSel:function(){var t=this.withoutOrder;if(0==this.allselect)for(var e=0;e<t.length;e++)t[e].selected=!0,this.allselect=!0;else for(var i=0;i<t.length;i++)t[i].selected=!1,this.allselect=!1},ocSelOne:function(t){t.selected=!t.selected,t.selected||(this.allselect=!1)},openGoodSel:function(t,e,i){this.itemIndex=i,0!=t.freeNum||"freeNum"!=e?0!=t.returnNum||"returnNum"!=e?0!=t.salesNum||"salesNum"!=e?(this.showDet=e,this.itemdetial=t,this.isShow=!0):this.$store.commit("setWin",{title:"温馨提示",winType:"alert",content:"没有销量"}):this.$store.commit("setWin",{title:"温馨提示",winType:"alert",content:"没有退品"}):this.$store.commit("setWin",{title:"温馨提示",winType:"alert",content:"没有赠品"})},importDet:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var i,s,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(i=t.withoutOrder,s="",a=0;a<i.length;a++)1==i[a].selected&&(s=s+i[a].goodsId+",");if(""!=s&&","!=s){e.next=6;break}return t.$store.commit("setWin",{title:"温馨提示",winType:"alert",content:"请选择要导出的选项"}),e.abrupt("return",!1);case 6:return e.next=8,n.a.exportCustomStatistics({data:{shopId:t.userData.currentShop.id,startYear:t.formatTime(new Date(t.startTime),"yyyy"),startMonth:t.formatTime(new Date(t.startTime),"MM"),startDay:t.formatTime(new Date(t.startTime),"dd"),endYear:t.formatTime(new Date(t.endTime),"yyyy"),endMonth:t.formatTime(new Date(t.endTime),"MM"),endDay:t.formatTime(new Date(t.endTime),"dd"),exportIds:s,isOpenTime:Number(t.isOpenTime)}});case 8:case"end":return e.stop()}},e,t)}))()},doThrowWinResult:function(t){this.showDet=t,this.isShow=!1,this.initBtn()}},components:{calendar:function(){return i.e("calendar_type").then(i.bind(null,"f2dd"))},customDetail:function(){return i.e("custom_detail").then(i.bind(null,"ce69"))}}},u=(i("2802"),i("6ceb")),c=Object(u.a)(l,s,[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",{staticClass:"oUl"},[i("li",{staticStyle:{width:"20%"}},[t._v("天数")]),t._v(" "),i("li",[t._v("商品总数")]),t._v(" "),i("li",[t._v("销量")]),t._v(" "),i("li",[t._v("赠品总数")]),t._v(" "),i("li",[t._v("赠品金额")]),t._v(" "),i("li",[t._v("退品数量")]),t._v(" "),i("li",[t._v("退品金额")]),t._v(" "),i("li",[t._v("消费金额")]),t._v(" "),i("li",[t._v("实收金额")])])}],!1,null,"81dd4adc",null);c.options.__file="src\\module\\statistics\\custom_statistics.vue";e.default=c.exports}}]);