(window.webpackJsonp=window.webpackJsonp||[]).push([["delete"],{3138:function(t,e,i){"use strict";var s=i("dc19");i.n(s).a},ce89:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"delete"},[t.detailShow?t._e():[i("div",{staticClass:"filter"},[i("div",{staticClass:"block"},[1==t.showStep?[i("div",{staticClass:"input-box"},[i("calendar",{attrs:{time:t.timeObj.startTime,format:"yyyy年MM月dd日"},on:{emit:t.startTimeChange}})],1),t._v(" "),i("span",{staticClass:"input-word"},[t._v("至")]),t._v(" "),i("div",{staticClass:"input-box mr-right"},[i("calendar",{attrs:{time:t.timeObj.endTime,format:"yyyy年MM月dd日"},on:{emit:t.endTimeChange}})],1)]:t._e(),t._v(" "),3!=t.showStep||t.isBrand?t._e():[i("div",{staticClass:"input-box"},[i("calendar",{attrs:{time:t.timeObj.startTimeStore,format:"yyyy年MM月dd日"},on:{emit:t.startTimeChange}})],1),t._v(" "),i("span",{staticClass:"input-word"},[t._v("至")]),t._v(" "),i("div",{staticClass:"input-box mr-right"},[i("calendar",{attrs:{time:t.timeObj.endTimeStore,format:"yyyy年MM月dd日"},on:{emit:t.endTimeChange}})],1)]],2),t._v(" "),i("div",{staticClass:"block"},[3==t.showStep?[i("selectBtn",{attrs:{sorts:t.areas,index:t.areaIndex,width:150},on:{emit:t.areaSelect}}),t._v(" "),i("selectBtn",{attrs:{sorts:t.table,index:t.tableIndex,width:150},on:{emit:t.tableSelect}})]:t._e(),t._v(" "),2!=t.showStep?i("div",{staticClass:"input-check select-ban"},[i("i",{class:{active:1==this.openTime},on:{click:t.timeCheck}}),t._v("\n\t\t\t\t\t按营业时间\n\t\t\t\t")]):t._e(),t._v(" "),3==t.showStep?i("div",{staticClass:"search-input mr-right"},[i("input",{attrs:{type:"text",placeholder:"请输入订单号"},on:{input:t.orderInput,propertychange:t.orderInput}}),t._v(" "),i("em",{on:{click:t.searchOrder}})]):t._e()],2),t._v(" "),i("div",{staticClass:"block"},[t.isBrand&&1==t.showStep?i("div",{staticClass:"search-box"},[i("selectStore",{attrs:{sorts:t.shopList,tipName:t.dropName},on:{emit:t.getDrop}})],1):t._e(),t._v(" "),2!=t.showStep?i("div",{staticClass:"search-box"},[i("span",{staticClass:"search-btn yellow",on:{click:t.search}},[t._v("搜索")]),t._v(" "),i("span",{staticClass:"reset-btn gray",on:{click:t.reset}},[t._v("重置")])]):t._e()]),t._v(" "),t.isBrand&&1==t.showStep||2==t.showStep?i("div",{staticClass:"store-show"},[i("i",[t._v("已选择店铺：")]),t._v(" "),t._l(t.shopList,function(e,s){return e.selected?i("span",{key:s,attrs:{"data-id":e.id}},[t._v(t._s(e.name)+"，")]):t._e()}),t._v(" "),2==t.showStep?i("span",{staticClass:"time-span"},[t._v(t._s(t.formatTime(t.timeObj.startTime))+" ~ "+t._s(t.formatTime(t.timeObj.endTime)))]):t._e()],2):t._e()]),t._v(" "),i("div",{staticClass:"main"},[i("deleteStore",{attrs:{store:t.orderStoreList,order:t.deleteData,otherData:t.orderStoreSend,step:t.showStep,loading:t.loading},on:{emit:t.getStep}})],1)],t._v(" "),t.detailShow?i("orderDetail",{attrs:{detail:t.detail,isDelete:!0},on:{detailShow:t.getDetailShow}}):t._e()],2)};s._withStripped=!0;var a=i("f6ce"),r=i("81a2"),n=i("44e7"),o=i("bbb9");function h(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function s(a,r){try{var n=e[a](r),o=n.value}catch(t){return void i(t)}if(!n.done)return Promise.resolve(o).then(function(t){s("next",t)},function(t){s("throw",t)});t(o)}("next")})}}var d={data:function(){return{deleteData:"",orderStoreList:"",orderStoreSend:{},total:{orderNum:0,totalPrice:0,totalDay:1},areas:[],table:[],areaIndex:0,tableIndex:0,areasList:[],tableList:[],areaId:"",tableId:"",areasDefault:"全部区域",tableDefault:"全部桌台",shopList:[],brandId:"",shopId:"",shopIds:"",isBrand:"",storeName:"",storeListShow:"",allSelected:!0,timeObj:{startTime:"",endTime:"",startTimeStore:"",endTimeStore:""},page:1,pageNum:0,pageShow:10,openTime:1,orderInputValue:"",detail:null,detailShow:!1,showStep:"",userData:"",userShopList:"",userShopIdStr:"",repeat:!0,taskId:"",timerId:"",loading:!1,dropName:"请选择店铺"}},watch:{showStep:"initBtn"},components:{selectBtn:function(){return i.e("select_btn").then(i.bind(null,"3d41"))},calendar:function(){return i.e("calendar_type").then(i.bind(null,"f2dd"))},orderDetail:function(){return i.e("order_detail").then(i.bind(null,"603c"))},deleteStore:function(){return i.e("delete_store").then(i.bind(null,"f81a"))},selectStore:function(){return i.e("win").then(i.bind(null,"cb83"))}},created:function(){this.userData=a.a.session("userShop");var t=[],e=[];"3"==this.userData.currentShop.ischain&&(this.userShopList=a.a.session("shopList"),this.userShopList.forEach(function(i,s){t[s]=i.id;var a={id:i.id,name:i.shopName};e.push(a)}),this.userShopIdStr=t.join(","),this.userShopList=e)},mounted:function(){this.brandId=this.userData.currentShop.id,this.shopId=this.userData.currentShop.id,this.shopIds=this.userShopIdStr;var t=!0,e=!1,i=void 0;try{for(var s,a=this.userShopList[Symbol.iterator]();!(t=(s=a.next()).done);t=!0){s.value.selected=!0}}catch(t){e=!0,i=t}finally{try{!t&&a.return&&a.return()}finally{if(e)throw i}}this.shopList=this.userShopList,this.storeName=this.userShopList.length>0?this.userShopList[0].name:"选择店铺",this.isBrand="3"==this.userData.currentShop.ischain?1:0,this.resetDate(),0==this.isBrand?(this.showStep=3,this.getCondition()):this.showStep=1,this.search()},destroyed:function(){a.a.session("deleteShopId",null),a.a.session("dayData",null),a.a.session("deleteSingleTime",null),n.a.clear(this.timerId)},methods:{initBtn:function(){var t=this,e=[];3==this.showStep&&e.push({name:"导出",className:["fd-yellow"],fn:function(){t.exportFile()}}),1!=this.showStep&&this.isBrand&&e.push({name:"返回",className:["fd-blue"],fn:function(){t.back()}}),this.$store.commit("setPageTools",e)},getData:function(){var t=this;return h(regeneratorRuntime.mark(function e(){var i,s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.validate()){e.next=2;break}return e.abrupt("return");case 2:return i=new Date(t.timeObj.endTimeStore).setHours(23,59,59,0),e.next=5,r.a.getDelOrder({data:{trueShopId:t.shopId,startTime:parseInt(t.timeObj.startTimeStore/1e3),endTime:parseInt(i/1e3),areaId:t.areaId,tableId:t.tableId,page:t.page,num:t.pageShow,isOpenTime:t.openTime}});case 5:s=e.sent,t.deleteData=s,t.pageNum=s.pageNum;case 8:case"end":return e.stop()}},e,t)}))()},getCondition:function(){var t=this;return h(regeneratorRuntime.mark(function e(){var i,s,a,n,o,h,d,c,u,p,l,m,f,S,v;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.a.getCondition({data:{trueShopId:t.shopId}});case 2:for(i=e.sent,s=[],a=[],n=!0,o=!1,h=void 0,e.prev=7,d=i.areaList[Symbol.iterator]();!(n=(c=d.next()).done);n=!0)u=c.value,s.push(u.name);e.next=15;break;case 11:e.prev=11,e.t0=e.catch(7),o=!0,h=e.t0;case 15:e.prev=15,e.prev=16,!n&&d.return&&d.return();case 18:if(e.prev=18,!o){e.next=21;break}throw h;case 21:return e.finish(18);case 22:return e.finish(15);case 23:for(p=!0,l=!1,m=void 0,e.prev=26,f=i.tableList[Symbol.iterator]();!(p=(S=f.next()).done);p=!0)v=S.value,a.push(v.name);e.next=34;break;case 30:e.prev=30,e.t1=e.catch(26),l=!0,m=e.t1;case 34:e.prev=34,e.prev=35,!p&&f.return&&f.return();case 37:if(e.prev=37,!l){e.next=40;break}throw m;case 40:return e.finish(37);case 41:return e.finish(34);case 42:s.unshift("全部区域"),a.unshift("全部桌台"),t.areas=s,t.areasList=i.areaList,t.table=a,t.tableList=i.tableList;case 47:case"end":return e.stop()}},e,t,[[7,11,15,23],[16,,18,22],[26,30,34,42],[35,,37,41]])}))()},getStoreOrder:function(){var t=this;return h(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(i=new Date(t.timeObj.endTime).setHours(23,59,59,0),t.repeat){e.next=4;break}return t.$store.commit("setWin",{title:"提示信息",content:"当前查询尚未结束，请结束后再进行查询或刷新浏览器重新查询！"}),e.abrupt("return");case 4:if(t.validate()){e.next=6;break}return e.abrupt("return");case 6:r.a.OrderReport({data:{type:2,timeType:1,startTime:parseInt(t.timeObj.startTime/1e3),endTime:parseInt(i/1e3),isOpenTime:t.openTime,shopIds:t.shopIds,shopId:t.brandId}}).then(function(e){t.taskId=e.taskId,t.repeat=!1,t.loading=!0,t.timerId=n.a.add(function(){r.a.taskInfo({data:{shopId:t.brandId,taskId:t.taskId}}).then(function(e){3==e.status?(n.a.clear(t.timerId),t.repeat=!0,r.a.ReportGet({data:{shopId:t.brandId,taskId:t.taskId}}).then(function(e){t.loading=!1,t.orderStoreList=e,t.orderStoreSend={startTime:t.timeObj.startTime,endTime:i,openTime:t.openTime,shopId:t.brandId}})):2==e.status&&(n.a.clear(t.timerId),t.loading=!1,t.repeat=!0,t.$store.commit("setWin",{title:"提示信息",content:"请求失败，请重试！"}))})},1e3,60,!1,function(){n.a.clear(t.timerId),t.repeat=!0,t.loading=!1})});case 7:case"end":return e.stop()}},e,t)}))()},exportFile:function(){var t=this;return h(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.deleteData){e.next=4;break}t.$store.commit("setWin",{title:"提示信息",content:"没有订单可以导出"}),e.next=7;break;case 4:return i=new Date(t.timeObj.endTimeStore).setHours(23,59,59,0),e.next=7,r.a.exportDelOrder({data:{trueShopId:t.shopId,startTime:parseInt(t.timeObj.startTimeStore/1e3),endTime:parseInt(i/1e3),areaId:t.areaId,tableId:t.tableId,isOpenTime:t.openTime}});case 7:case"end":return e.stop()}},e,t)}))()},getDetail:function(t){var e=this;return h(regeneratorRuntime.mark(function i(){var s;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,r.a.deleteBillDelite({data:{trueShopId:e.shopId,oid:t}});case 2:s=i.sent,e.detailShow=!0,e.detail=s;case 5:case"end":return i.stop()}},i,e)}))()},resetDate:function(){for(var t in this.timeObj)this.timeObj[t]=(new Date).setHours(0,0,0,0)},back:function(){this.showStep=this.showStep-1,3==this.showStep&&(this.page=1,this.getData())},search:function(){1==this.isBrand?3==this.showStep?this.getData():this.getStoreOrder():this.getData()},getStep:function(t){t.step>0?(this.showStep=t.step,3==this.showStep&&(this.shopId=t.id?t.id:this.shopId,t.time&&(this.timeObj.startTimeStore=t.time,this.timeObj.endTimeStore=t.time),t.page?(this.page=t.page,this.pageShow=t.pageShow,this.getData()):(this.page=1,this.pageShow=t.pageShow,this.getCondition(),this.getData()))):this.getDetail(t.id)},setIsOneStore:function(t){this.isOneStore=1==t},getDrop:function(t){this.shopList=t;var e=[],i=0;this.shopList.forEach(function(t){1==t.selected&&(e.push(t.id),i++)}),this.shopIds=e.join(","),this.setIsOneStore(i)},searchOrder:function(){var t=this.orderInputValue;t?this.getDetail(t):this.$store.commit("setWin",{title:"提示信息",content:"订单号不能为空"}),this.orderInputValue=""},toDetail:function(){var t=event.target;if("light"==t.className){var e=t.textContent;this.getDetail(e)}},getDetailShow:function(t){this.detailShow=t,this.initBtn()},orderInput:function(t){var e=t.target.value;e=e.replace(/[^\d]/g,""),isNaN(e)&&(e=""),this.orderInputValue=e,t.target.value=e},reset:function(){var t=(new Date).setHours(0,0,0,0);if(3==this.showStep)this.openTime=1,this.areaIndex=0,this.tableIndex=0,this.areaId="",this.tableId="",this.isBrand||(this.timeObj.startTimeStore=t,this.timeObj.endTimeStore=t);else if(this.timeObj.startTime=t,this.timeObj.endTime=t,this.isBrand){var e=o.a.deepCopy(this.shopList),i=[];e.forEach(function(t){t.selected=!0,i.push(t.id)}),this.shopList=e,this.shopIds=i.join(","),this.setIsOneStore(this.shopList.length)}this.search()},timeCheck:function(){this.openTime=0==this.openTime?1:0},areaSelect:function(t){this.areaIndex=t,this.areaId=this.areaIndex>0?this.areasList[this.areaIndex-1].id-0:"",this.getData()},tableSelect:function(t){this.tableIndex=t,this.tableId=this.tableIndex>0?this.tableList[this.tableIndex-1].id-0:"",this.getData()},startTimeChange:function(t){3==this.showStep?this.timeObj.startTimeStore=t:this.timeObj.startTime=t},endTimeChange:function(t){3==this.showStep?this.timeObj.endTimeStore=t:this.timeObj.endTime=t},formatTime:function(t){return o.a.format(new Date(t),"yyyy年MM月dd日")},validate:function(){var t=!0,e=void 0,i=void 0;return 3==this.showStep?(e=this.timeObj.startTimeStore,i=this.timeObj.endTimeStore):(e=this.timeObj.startTime,i=this.timeObj.endTime),e/864e5>i/864e5?(this.$store.commit("setWin",{title:"提示信息",content:"开始时间不能大于结束时间"}),t=!1):i-e>=80352e5&&(this.$store.commit("setWin",{title:"提示信息",content:"最大只能查询三个月时间"}),t=!1),this.isBrand&&""==this.shopIds&&(this.$store.commit("setWin",{title:"提示信息",content:"没有可选店铺"}),t=!1),t}}},c=(i("3138"),i("7610")),u=Object(c.a)(d,s,[],!1,null,"7d593ecc",null);u.options.__file="src\\module\\statistics\\delete.vue";e.default=u.exports},dc19:function(t,e,i){}}]);