(window.webpackJsonp=window.webpackJsonp||[]).push([["reservation"],{"30df":function(t,e,a){t.exports=a.p+"images/res-wechat.a97ec1e7.png"},"73c8":function(t,e,a){"use strict";var n=a("f97b");a.n(n).a},8024:function(t,e,a){t.exports=a.p+"images/res-phone.f1c22ee3.png"},da37:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"reservation"},[n("div",{staticClass:"filter"},[n("div",{staticClass:"input-box"},[n("calendar",{attrs:{time:t.startTime,format:"yyyy年MM月dd日"},on:{emit:t.startTimeChange}})],1),t._v(" "),n("span",{staticClass:"input-word"},[t._v("至")]),t._v(" "),n("div",{staticClass:"input-box search-div"},[n("calendar",{staticClass:"left-box",attrs:{time:t.endTime,format:"yyyy年MM月dd日"},on:{emit:t.endTimeChange}}),t._v(" "),n("em",{staticClass:"search-btn",on:{click:t.search}})],1),t._v(" "),n("selectBtn",{attrs:{sorts:t.sourceList,index:0,width:150},on:{emit:t.sourceSelect}}),t._v(" "),n("selectBtn",{attrs:{sorts:t.payList[t.payIndex],index:0,width:150},on:{emit:t.paySelect}}),t._v(" "),n("div",{staticClass:"search-input"},[n("input",{attrs:{type:"text",placeholder:"请输入手机号码"},on:{input:t.orderInput,propertychange:t.orderInput}}),t._v(" "),n("em",{on:{click:t.searchPhone}})])],1),t._v(" "),n("com-table",{attrs:{listHeight:80,showHand:!1,showTitle:2,listWidth:1400,introData:t.reserveList,titleData:t.titleList},scopedSlots:t._u([{key:"con-0",fn:function(e){return n("div",{staticClass:"btnLink",on:{click:t.openDetail}},[n("span",[n("i",{staticClass:"show-detail",attrs:{"data-index":e.index}},[t._v("查看详情")])])])}},{key:"con-4",fn:function(e){return n("div",{},[n("span",[t._v(t._s(""==e.data.tableName||null==e.data.tableName?"无":e.data.tableName))])])}},{key:"con-6",fn:function(e){return n("div",{},[n("span",[t._v(t._s(t.formatTime(e.data.createTime)))])])}},{key:"con-7",fn:function(e){return n("div",{},[n("span",[t._v(t._s(t.setStatusName(e.data.status)))])])}},{key:"con-8",fn:function(e){return n("div",{},[n("span",[t._v(t._s(""==e.data.remark?"无":e.data.remark))])])}},{key:"con-9",fn:function(e){return n("div",{},[n("span",[3==e.data.from?n("img",{attrs:{src:a("8024")}}):t._e(),t._v(" "),1==e.data.from||2==e.data.from?n("img",{attrs:{src:a("30df")}}):t._e()])])}}])}),t._v(" "),n("div",{staticClass:"page-box"},[n("pageBtn",{attrs:{total:t.pageNum,page:t.page,isNoJump:!0},on:{pageNum:t.pageChange}})],1),t._v(" "),n(t.showWin,{tag:"component",attrs:{detailList:t.detailList},on:{emit:t.getEmitWin}})],1)};n._withStripped=!0;var s=a("f6ce"),i=a("81a2"),r=a("bbb9");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function n(s,i){try{var r=e[s](i),o=r.value}catch(t){return void a(t)}if(!r.done)return Promise.resolve(o).then(function(t){n("next",t)},function(t){n("throw",t)});t(o)}("next")})}}var c={data:function(){return{index:null,titleList:[{titleName:"操作",titleStyle:{width:"160px",flex:"none"}},{titleName:"姓名",dataName:"name"},{titleName:"手机号",dataName:"phone"},{titleName:"预定人数",dataName:"person"},{titleName:"预定桌台"},{titleName:"预付款",dataName:"price"},{titleName:"预定时间",dataName:"createTime"},{titleName:"预定状态",dataName:"status"},{titleName:"备注",dataName:"remark"},{titleName:" "}],allTotal:0,reserveList:[],startTime:(new Date).setHours(0,0,0,0),endTime:(new Date).setHours(0,0,0,0),sourceList:["全部来源","电话","微信"],sourceStatus:[0,3,1],payList:[["全部数据","已支付","预定中","已到店","已退款"],["全部数据","预定中","已到店","已过期"]],payStatus:[[0,5,2,3,8],[0,2,3,-3]],payIndex:0,page:1,pageShow:10,pageNum:1,status:0,statusFrom:0,phone:"",userData:"",shopId:"",detailList:[],showWin:null}},components:{selectBtn:function(){return a.e("select_btn").then(a.bind(null,"3d41"))},calendar:function(){return a.e("calendar_type").then(a.bind(null,"f2dd"))},detailWin:function(){return a.e("reservation_win").then(a.bind(null,"7426"))},pageBtn:function(){return a.e("page_element").then(a.bind(null,"5921"))},comTable:function(){return a.e("table").then(a.bind(null,"4360"))}},created:function(){this.userData=s.a.session("userShop")},mounted:function(){this.shopId=this.userData.currentShop.id,this.search()},methods:{search:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var a,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.validate()){e.next=2;break}return e.abrupt("return");case 2:return a=new Date(t.endTime).setHours(23,59,59,0),e.next=5,i.a.getReserveList({data:{shopId:t.shopId,startTime:parseInt(t.startTime/1e3),endTime:parseInt(a/1e3),page:t.page,num:t.pageShow,status:t.status,from:t.statusFrom,phone:t.phone}});case 5:n=e.sent,console.log(n,"data"),t.reserveList=n.list?n.list:[],console.log(t.reserveList,"reserve"),t.pageNum=n.pages,console.log(t.pageNum);case 11:case"end":return e.stop()}},e,t)}))()},openDetail:function(t){var e=this;return o(regeneratorRuntime.mark(function a(){var n,s,r;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if("show-detail"!=(n=t.target).className){a.next=8;break}return s=n.getAttribute("data-index"),a.next=5,i.a.getReserveDetail({data:{roid:e.reserveList[s].roid,shopId:e.shopId}});case 5:r=a.sent,e.detailList=r,e.showWin="detailWin";case 8:case"end":return a.stop()}},a,e)}))()},pageChange:function(t){this.page=t.page,this.pageShow=t.num,this.search()},getEmitWin:function(t){"close"==t&&(this.showWin=null)},orderInput:function(t){var e=t.target.value;e=e.replace(/[^\d]/g,""),isNaN(e)&&(e=""),this.phone=e,t.target.value=e},searchPhone:function(){var t=this.phone;t&&/^1[\d]{10,10}$/.test(t)?this.search():this.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"请输入正确的手机号码"})},startTimeChange:function(t){this.startTime=t},endTimeChange:function(t){this.endTime=new Date(t).setHours(23,59,59,999)},validate:function(){var t=!0;return parseInt(this.startTime/1e3/3600/24)>parseInt(this.endTime/1e3/3600/24)&&(this.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"开始时间不能大于结束时间"}),t=!1),t},sourceSelect:function(t){this.statusFrom=this.sourceStatus[t],this.payIndex=1==t?1:0,this.search()},paySelect:function(t){this.status=this.payStatus[this.payIndex][t],this.search()},setStatusName:function(t){var e="";switch(t=parseInt(t)){case-3:e="已过期";break;case-2:e="已取消";break;case 1:e="待确定";break;case 2:e="已确认";break;case 3:e="已到店";break;case 4:e="待付款";break;case 5:e="已支付";break;case 6:e="已完成";break;case 7:e="退款中";break;case 8:e="已退款"}return e},formatTime:function(t){return r.a.format(new Date(1e3*t),"yyyy-MM-dd hh:mm")}}},u=(a("73c8"),a("6ceb")),l=Object(u.a)(c,n,[],!1,null,"70ed6e26",null);l.options.__file="src\\module\\statistics\\reservation.vue";e.default=l.exports},f97b:function(t,e,a){}}]);