(window.webpackJsonp=window.webpackJsonp||[]).push([["handover"],{4012:function(t,e,a){"use strict";var s=a("b562");a.n(s).a},"8a9c":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{attrs:{id:"orHandOver"}},[t.showDetails?a("section",{attrs:{id:"statHaovDetails"}},[a("section",{staticClass:"loginTime yuChairFix"},[a("span",[t._v(t._s(t.hoverDetail.getTime))]),t._v(" "),a("span",[t._v(t._s(t.hoverDetail.giveTime))])]),t._v(" "),a("section",{staticClass:"deInfo"},[a("section",{staticClass:"deInfoBox"},[t._m(0),t._v(" "),a("ul",{staticClass:"basicInfo"},[a("li",{staticClass:"yuChairFix"},[a("span",[t._v("交接人："+t._s(t.hoverDetail.userName))]),t._v(" "),a("span",[t._v("职位："+t._s(t.hoverDetail.roleName))]),t._v(" "),a("span",[t._v("备用金：¥"+t._s(t.hoverDetail.pettyCash))]),t._v(" "),a("span",[t._v("开台数："+t._s(t.hoverDetail.allNum))])]),t._v(" "),a("li",{staticClass:"yuChairFix"},[a("span",[t._v("总订单数："+t._s(t.hoverDetail.havePayNum))]),t._v(" "),a("span",[t._v("挂账单数："+t._s(t.hoverDetail.holdNum))]),t._v(" "),a("span",[t._v("现金找零："+t._s(t.hoverDetail.cashChange))])])])]),t._v(" "),a("section",{staticClass:"deInfoBox yuChairFix"},[a("h1",[a("span",[t._v("总收入：¥"+t._s(t.hoverDetail.totalIncome))])]),t._v(" "),a("ul",{staticClass:"basicInfo"},[a("li",{staticClass:"yuChairFix"},[a("span",[t._v("现金支付：¥"+t._s(t.hoverDetail.cash))]),t._v(" "),a("span",[t._v("微信支付：¥"+t._s(t.hoverDetail.wx))]),t._v(" "),a("span",[t._v("余额支付：¥0.00")]),t._v(" "),a("span",[t._v("服务费：¥"+t._s(t.hoverDetail.chargeIncome))])]),t._v(" "),a("li",{staticClass:"yuChairFix"},[a("span",[t._v("银联支付：¥"+t._s(t.hoverDetail.bank))]),t._v(" "),a("span",[t._v("支付宝支付：¥"+t._s(t.hoverDetail.ali))]),t._v(" "),a("span",[t._v("其他支付：¥"+t._s(t.hoverDetail.other))]),t._v(" "),a("span",[t._v("挂账金额：¥"+t._s(t.hoverDetail.holdIncome))])])])])])]):a("section",[a("section",{staticClass:"orHandOverCon"},[a("section",{staticClass:"orHandOverTime yuChairFix"},[a("section",{staticClass:"orMaRetBox yuChairFix"},[a("calendar",{staticClass:"data-box",attrs:{time:t.startTime,type:t.selectedType,format:"yyyy年MM月dd日"},on:{emit:t.startTimeChange}})],1),t._v(" "),a("span",{staticClass:"zhi"},[t._v("至")]),t._v(" "),a("section",{staticClass:"orMaRetBox yuChairFix"},[a("calendar",{staticClass:"data-box",attrs:{time:t.endTime,type:t.selectedType,format:"yyyy年MM月dd日"},on:{emit:t.endTimeChange}})],1),t._v(" "),a("a",{staticClass:"order-order-searchA",on:{click:t.searInTime}},[a("span",{staticClass:"order-order-search"})])]),t._v(" "),a("table-com",{attrs:{showHand:!1,titleHeight:50,showTitle:2,titleData:t.titleData,allTotal:3,fixed:0,widthType:!0,introData:t.handOverInfo,contentStyle:{color:"#8f8f8f"},listWidth:1200},scopedSlots:t._u([{key:"con-9",fn:function(e){return a("span",{},[a("a",{staticClass:"deepBlue detail-btn",attrs:{href:"javascript:void(0)"},on:{click:function(a){t.showHand(e.data,e.index)}}},[t._v("明细")])])}}])}),t._v(" "),t.total>1?a("div",{staticClass:"pageBox"},[a("page",{attrs:{page:t.page,total:t.total,len:t.total>10?8:5,type:1},on:{pageNum:t.goPage}})],1):t._e()],1)])])};s._withStripped=!0;var i=a("81a2"),n=a("f6ce"),o=a("bbb9");var r=n.a.session("userShop"),l={data:function(){return{handOverInfo:[],hoverDetail:null,startTime:(new Date).setHours(0,0,0,0),endTime:(new Date).setHours(23,59,59,999),page:1,num:10,total:1,showDay:!1,showDetails:!1,selectedType:0,titleData:[{titleName:"接班时间",dataName:"getTime",titleStyle:{width:"150px"}},{titleName:"交班时间",dataName:"giveTime",titleStyle:{width:"150px"}},{titleName:"交班人",dataName:"userName"},{titleName:"交班人职位",dataName:"roleName"},{titleName:"营收总额",dataName:"totalIncome"},{titleName:"开台次数",dataName:"allNum"},{titleName:"挂账金额",dataName:"holdIncome"},{titleName:"备用金",dataName:"pettyCash"},{titleName:"服务费",dataName:"chargeIncome"},{titleName:"操作"}]}},watch:{showDetails:function(){var t=this,e=this.showDetails?{name:"返回",className:["back"],fn:function(){t.returnPage()}}:{};this.$store.commit("setPageTools",[e])}},methods:{startTimeChange:function(t){this.startTime=new Date(t).setHours(0,0,0,0)},endTimeChange:function(t){this.endTime=new Date(t).setHours(23,59,59,999)},checkDate:function(){var t=new Date(Number(this.endTime)).setDate(1);return t=new Date(t).setHours(0,0,0,0),this.startTime<t?(this.$store.commit("setWin",{title:"提示信息:",content:"很抱歉,选择的时间段不能跨月"}),this.startTime=t,!1):parseInt(this.startTime/1e3)>parseInt(this.endTime/1e3)?(this.$store.commit("setWin",{title:"提示信息:",content:"开始时间不能大于结束时间"}),!1):void 0},getChangeShiftsList:function(){var t,e=this;return(t=regeneratorRuntime.mark(function t(){var a,s,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.getChangeShiftsList({data:{shopId:r.currentShop.id,startTime:parseInt(e.startTime/1e3),endTime:parseInt(e.endTime/1e3),page:e.page,num:e.num}});case 2:if(a=t.sent){for(s=a.list,n=0;n<s.length;n++)s[n].getTime=o.a.format(new Date(1e3*s[n].getTime),"yyyy.MM.dd/hh:mm"),s[n].giveTime=o.a.format(new Date(1e3*s[n].giveTime),"yyyy.MM.dd/hh:mm");e.handOverInfo=s,e.total=a.total}case 4:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function s(i,n){try{var o=e[i](n),r=o.value}catch(t){return void a(t)}if(!o.done)return Promise.resolve(r).then(function(t){s("next",t)},function(t){s("throw",t)});t(r)}("next")})})()},init:function(){this.getChangeShiftsList()},searInTime:function(){this.checkDate(),this.startTime=new Date(this.startTime).setHours(0,0,0,0),this.endTime=new Date(this.endTime).setHours(23,59,59,999),this.init()},showHand:function(t){this.hoverDetail=t,this.showDetails=!0,this.showDay=!0},goPage:function(t){this.page=parseInt(t.page),this.init()},returnPage:function(){this.showDay=!1,this.showDetails=!1}},components:{Calendar:function(){return a.e("calendar_type").then(a.bind(null,"f2dd"))},Page:function(){return a.e("page_element").then(a.bind(null,"5921"))},tableCom:function(){return a.e("table").then(a.bind(null,"4360"))}},created:function(){this.init()}},h=(a("4012"),a("7610")),c=Object(h.a)(l,s,[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",[e("span",[this._v("基本信息")])])}],!1,null,"9a33ba1c",null);c.options.__file="src\\module\\statistics\\handover.vue";e.default=c.exports},b562:function(t,e,a){}}]);