(window.webpackJsonp=window.webpackJsonp||[]).push([["mission_system"],{"0fb2":function(t,e,a){"use strict";a.r(e);var s=a("81a2"),n=a("f6ce"),i=a("bbb9"),o={data:function(){return{type:{0:"微信好友",1:"朋友圈"}}},props:{taskdetail:Object,shopsList:Array},methods:{getAppliedWin:function(t){this.$emit("getAppliedWin",t)},getShopname:function(t){var e=[],a=t.split(","),s=!0,n=!1,i=void 0;try{for(var o,r=a[Symbol.iterator]();!(s=(o=r.next()).done);s=!0){var l=o.value,c=!0,p=!1,d=void 0;try{for(var u,m=this.shopsList[Symbol.iterator]();!(c=(u=m.next()).done);c=!0){var h=u.value;if(h.id==l){e.push(h.name);break}}}catch(t){p=!0,d=t}finally{try{!c&&m.return&&m.return()}finally{if(p)throw d}}}}catch(t){n=!0,i=t}finally{try{!s&&r.return&&r.return()}finally{if(n)throw i}}return e.join(",")},formatTime:function(t){return 10==t.length&&(t*=1e3),i.a.format(new Date(t),"yyyy-MM-dd hh:mm:ss")},line2br:function(t){return t.split("\n").join("<br/>")}},computed:{},components:{Win:function(){return Promise.resolve().then(a.bind(null,"f60a"))}},mounted:function(){}},r=(a("d77a"),a("d801"));function l(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function s(n,i){try{var o=e[n](i),r=o.value}catch(t){return void a(t)}if(!o.done)return Promise.resolve(r).then(function(t){s("next",t)},function(t){s("throw",t)});t(r)}("next")})}}var c={data:function(){return{index:null,titleList:[{titleName:"操作",titleStyle:{fontSize:"16px",width:"315.9px",flex:"none"}},{titleName:"任务名称",dataName:"taskName",titleStyle:{fontSize:"16px",width:"201px",flex:"none"}},{titleName:"所属店铺",titleStyle:{fontSize:"16px",width:"143px",flex:"none"}},{titleName:"状态",titleStyle:{fontSize:"16px",width:"129px",flex:"none"}},{titleName:"任务类型",titleStyle:{fontSize:"16px",width:"129px",flex:"none"}},{titleName:"任务量",dataName:"taskNum",titleStyle:{fontSize:"16px",width:"129px",flex:"none"}},{titleName:"完成次数",dataName:"completeNum",titleStyle:{fontSize:"16px",width:"129px",flex:"none"}},{titleName:"完成进度",titleStyle:{fontSize:"16px",width:"129px",flex:"none"}},{titleName:"剩余次数",dataName:"createTime",titleStyle:{fontSize:"16px",width:"129px",flex:"none"}}],allTotal:0,ischain:"",shopId:"",startTime:"",endTime:"",pageNum:"0",page:1,num:10,count:0,expirationTimeList:[{name:"全部",id:-1},{name:"未开始",id:0},{name:"进行中",id:1},{name:"已关闭",id:2},{name:"已结束",id:3}],expirationTimeId:-1,expirationTime:"全部",shopsList:[],taskType:"全部",taskTypeList:[{name:"全部",id:-1},{name:"店内任务",id:0},{name:"消费任务",id:1},{name:"分享任务",id:2}],taskTypeId:-1,showWin:!1,isPopupwindow:"",tasksList:[],taskdetail:"",staticType:{0:"未开始",1:"进行中",2:"已关闭",3:"已结束"},taskTType:{0:"店内任务",1:"消费任务",2:"分享任务"},closeType:{0:"开启",1:"关闭",2:"开启"}}},methods:{startTimeChange:function(t){this.startTime=t},endTimeChange:function(t){this.endTime=new Date(t).setHours(23,59,59,999)},selexpirationTime:function(t){this.expirationTime=this.expirationTimeList[t].name,this.expirationTimeId=this.expirationTimeList[t].id},seltaskType:function(t){this.taskType=this.taskTypeList[t].name,this.taskTypeId=this.taskTypeList[t].id},getShopList:function(){if("3"==this.ischain){this.shopsList=n.a.session("shopList");var t=!0,e=!1,a=void 0;try{for(var s,i=this.shopsList[Symbol.iterator]();!(t=(s=i.next()).done);t=!0){var o=s.value;o.name=o.shopName}}catch(t){e=!0,a=t}finally{try{!t&&i.return&&i.return()}finally{if(e)throw a}}}else"0"==this.ischain&&this.shopsList.push(n.a.session("userShop").currentShop)},pageChange:function(t){this.page=t.page,this.num=t.num,this.getTaskList()},addNewType:function(t,e){"edi"==e&&n.a.session("taskdetail",t),n.a.session("type",e),this.$router.push("/admin/Task/newmission")},openStore:function(t){this.showWin=!0,this.taskdetail=t,this.isPopupwindow="getAppliedWin"},getResult:function(t){"ok"==t&&this.getLabel(),this.showWin=!1},getTaskList:function(t){var e=this;return l(regeneratorRuntime.mark(function a(){var n;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if("header"==t&&(e.page=1),!(e.endTime<e.startTime)){a.next=4;break}return e.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"结束时间应大于开始时间"}),a.abrupt("return",!1);case 4:return a.next=6,s.a.getTaskList({data:{page:e.page,num:e.num,startTime:parseInt(e.startTime/1e3),endTime:parseInt(e.endTime/1e3),status:e.expirationTimeId,type:e.taskTypeId}});case 6:(n=a.sent)&&(e.count=n.count,e.pageNum=n.total,e.tasksList=n.tasksList);case 8:case"end":return a.stop()}},a,e)}))()},reset:function(){this.page=1,this.num=10,this.startTime=(new Date).setHours(0,0,0,0),this.endTime=(new Date).setHours(23,59,59,999),this.expirationTime="全部",this.expirationTimeId=-1,this.taskType="全部",this.taskTypeId=-1,this.getShopList(),this.getTaskList()},getShopname:function(t){var e=[],a=t.split(","),s=!0,n=!1,i=void 0;try{for(var o,r=a[Symbol.iterator]();!(s=(o=r.next()).done);s=!0){var l=o.value,c=!0,p=!1,d=void 0;try{for(var u,m=this.shopsList[Symbol.iterator]();!(c=(u=m.next()).done);c=!0){var h=u.value;if(h.id==l){e.push(h.name);break}}}catch(t){p=!0,d=t}finally{try{!c&&m.return&&m.return()}finally{if(p)throw d}}}}catch(t){n=!0,i=t}finally{try{!s&&r.return&&r.return()}finally{if(n)throw i}}return e.join(",")},percentage:function(t,e){return 0==e?"0%":Math.round(t/e*1e4)/100+"%"},selectionstate:function(t){var e=this;return l(regeneratorRuntime.mark(function a(){var n;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return n="","0"==t.taskStatus||"2"==t.taskStatus?n=0:"1"==t.taskStatus&&(n=1),a.next=4,s.a.changeTaskStatus({data:{status:n,taskId:t.id}});case 4:a.sent&&(e.$store.commit("setWin",{content:e.closeType[t.taskStatus]+"成功",winType:"alert",title:"操作提示"}),e.getTaskList());case 6:case"end":return a.stop()}},a,e)}))()}},components:{calendar:function(){return a.e("calendar_type").then(a.bind(null,"f2dd"))},selectBtn:function(){return a.e("select_btn").then(a.bind(null,"3d41"))},selectStore:function(){return a.e("select_store").then(a.bind(null,"cb83"))},pageElement:function(){return a.e("page_element").then(a.bind(null,"5921"))},comTable:function(){return a.e("table").then(a.bind(null,"4360"))},getAppliedWin:Object(r.a)(o,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Win",{attrs:{width:653,height:588,align:"right"},on:{winEvent:t.getAppliedWin}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("查看详情")]),t._v(" "),a("div",{attrs:{slot:"content",id:"tan"},slot:"content"},[a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[t._v("任务名称:")]),t._v(" "),a("span",[t._v(t._s(t.taskdetail.taskName))])]),t._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[t._v("所属店铺:")]),t._v(" "),a("div",{staticClass:"rightHalf"},[a("span",[t._v(t._s(t.getShopname(t.taskdetail.applyShopIds)))])])]),t._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[t._v("开始时间:")]),t._v(" "),a("span",[t._v(t._s(t.formatTime(t.taskdetail.startTime)))])]),t._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[t._v("结束时间:")]),t._v(" "),a("span",[t._v(t._s(t.formatTime(t.taskdetail.endTime)))])]),t._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[t._v("持续时间:")]),t._v(" "),a("span",[t._v(t._s(t.taskdetail.durationTime)+"分钟")])]),t._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[t._v("任务类型:")]),t._v(" "),a("div",{staticClass:"rightHalf"},["0"==t.taskdetail.type?a("span",[t._v("店内任务")]):t._e(),t._v(" "),"1"==t.taskdetail.type?a("span",[t._v('消费任务 "消费满'+t._s(t.taskdetail.amount)+',达成任务"')]):t._e(),t._v(" "),"2"==t.taskdetail.type?a("span",[t._v('分享任务 "进入该页面'+t._s(t.taskdetail.shareUrl)+",点击右上角分享至"+t._s(t.type[t.taskdetail.shareAddress])+',达成任务"')]):t._e()])]),t._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[t._v("任务介绍:")]),t._v(" "),a("div",{staticClass:"rightHalf"},[a("span",{domProps:{innerHTML:t._s(t.line2br(t.taskdetail.describe))}})])]),t._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[t._v("奖励商品:")]),t._v(" "),a("div",{staticClass:"rightHalf"},[t._l(t.taskdetail.couponIds.coupon,function(e,s){return a("span",{key:s},[t._v(t._s(e.name)+"优惠券"+t._s(e.num)+"张\n\t\t\t\t\t"),s!=t.taskdetail.couponIds.coupon.length-1?[t._v("\n\t\t\t\t\t\t,\n\t\t\t\t\t")]:t._e()],2)}),t._v(" "),t._l(t.taskdetail.couponIds.pointCard,function(e,s){return a("span",{key:s},[t._v(t._s(e.name)+"积分卡"+t._s(e.num)+"张\n\t\t\t\t\t"),s!=t.taskdetail.couponIds.pointCard.length-1?[t._v("\n\t\t\t\t\t\t,\n\t\t\t\t\t")]:t._e()],2)}),t._v(" "),t._l(t.taskdetail.couponIds.pointGoods,function(e,s){return a("span",{key:s},[t._v(t._s(e.name)+"积分商品"+t._s(e.num)+"个\n\t\t\t\t\t"),s!=t.taskdetail.couponIds.pointGoods.length-1?[t._v("\n\t\t\t\t\t\t,\n\t\t\t\t\t")]:t._e()],2)})],2)]),t._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[t._v("任务量:")]),t._v(" "),a("span",[t._v(t._s(t.taskdetail.taskNum))])]),t._v(" "),a("div",{staticClass:"online-box clearfix"},[a("span",{staticClass:"online-sub fl"},[t._v("人均领取次数:")]),t._v(" "),a("span",[t._v(t._s(t.taskdetail.perLimit)+"次")])])])])},[],!1,null,"68a04e4b",null).exports},mounted:function(){var t=this;this.$store.commit("setPageTools",{addNewType:function(){t.addNewType("","add")}}),this.startTime=(new Date).setHours(0,0,0,0),this.endTime=(new Date).setHours(23,59,59,999),this.shopId=n.a.session("userShop").currentShop.id,this.ischain=n.a.session("userShop").currentShop.ischain,this.getShopList(),this.getTaskList()}},p=(a("9d7a"),Object(r.a)(c,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"mission"}},[a("div",{staticClass:"filter"},[a("span",[t._v("创建时间")]),t._v(" "),a("div",{staticClass:"input-box"},[a("calendar",{staticClass:"data-box",attrs:{time:t.startTime,format:"yyyy年MM月dd日"},on:{emit:t.startTimeChange}})],1),t._v(" "),a("span",[t._v("-")]),t._v(" "),a("div",{staticClass:"input-box"},[a("calendar",{staticClass:"data-box",attrs:{time:t.endTime,format:"yyyy年MM月dd日"},on:{emit:t.endTimeChange}})],1),t._v(" "),a("span",{staticClass:"order-order-searchA",on:{click:function(e){t.getTaskList("header")}}},[a("span",{staticClass:"order-order-search",attrs:{href:"javascript:void(0)"}})])]),t._v(" "),a("div",{staticClass:"filter"},[a("span",[t._v("状态")]),t._v(" "),a("select-btn",{attrs:{name:t.expirationTime,sorts:t.expirationTimeList.map(function(t){return t.name}),width:157},on:{selOn:t.selexpirationTime}}),t._v(" "),a("span",[t._v("任务类型")]),t._v(" "),a("select-btn",{attrs:{name:t.taskType,sorts:t.taskTypeList.map(function(t){return t.name}),width:157},on:{selOn:t.seltaskType}}),t._v(" "),a("div",{staticClass:"search-box"},[a("span",{staticClass:"search-btn blue",on:{click:function(e){t.getTaskList("header")}}},[t._v("筛选")]),t._v(" "),a("span",{staticClass:"reset-btn gray",on:{click:t.reset}},[t._v("重置")])])],1),t._v(" "),a("com-table",{key:t.index,attrs:{listHeight:80,listName:"任务列表",showTitle:1,introData:t.tasksList,listWidth:1436,widthType:!0,titleData:t.titleList,allTotal:t.count},scopedSlots:t._u([{key:"con-0",fn:function(e){return a("div",{staticClass:"btnLink"},[a("a",{staticStyle:{color:"#27a8e0",border:"none"},attrs:{href:"javascript:;"},on:{click:function(a){t.openStore(e.data)}}},[t._v("查看详情")]),t._v(" "),a("a",{staticStyle:{color:"#ff8d00"},attrs:{href:"javascript:;"},on:{click:function(a){t.addNewType(e.data,"edi")}}},[t._v("编辑")]),t._v(" "),"1"==e.data.taskStatus||"2"==e.data.taskStatus?a("a",{staticStyle:{color:"#27a8e0"},attrs:{href:"javascript:;"},on:{click:function(a){t.selectionstate(e.data)}}},[t._v(t._s(t.closeType[e.data.taskStatus]))]):t._e()])}},{key:"con-2",fn:function(e){return a("div",{staticClass:"applyShopIds"},[t._v(t._s(t.getShopname(e.data.applyShopIds)))])}},{key:"con-3",fn:function(e){return a("div",{},[t._v(t._s(t.staticType[e.data.taskStatus]))])}},{key:"con-4",fn:function(e){return a("div",{},[t._v(t._s(t.taskTType[e.data.type]))])}},{key:"con-7",fn:function(e){return a("div",{},[t._v(t._s(t.percentage(e.data.completeNum,e.data.taskNum)))])}},{key:"con-8",fn:function(e){return a("div",{},[t._v(t._s(e.data.taskNum-e.data.receiveNum))])}}])}),t._v(" "),a("section",{staticClass:"turn-page"},[a("pageElement",{attrs:{page:Number(t.page),total:Number(t.pageNum),numArr:[10,20,30,40,50],isNoJump:!0},on:{pageNum:t.pageChange}})],1),t._v(" "),t.showWin?a(t.isPopupwindow,{tag:"component",attrs:{taskdetail:t.taskdetail,shopsList:t.shopsList},on:{getAppliedWin:t.getResult}}):t._e()],1)},[],!1,null,"2062ae9c",null));e.default=p.exports},2053:function(t,e,a){},"9d7a":function(t,e,a){"use strict";var s=a("c895");a.n(s).a},c895:function(t,e,a){},d77a:function(t,e,a){"use strict";var s=a("2053");a.n(s).a}}]);