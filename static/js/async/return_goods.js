(window.webpackJsonp=window.webpackJsonp||[]).push([["return_goods"],{cbed:function(e,t,s){},dfbf:function(e,t,s){"use strict";var i=s("cbed");s.n(i).a},feae:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"delete"},[e.detailShow?e._e():[s("div",{staticClass:"filter"},[5!=e.showStep?[s("div",{staticClass:"block"},[1==e.showStep?[s("div",{staticClass:"input-box"},[s("calendar",{attrs:{time:e.timeObj.startTime,format:"yyyy年MM月dd日"},on:{emit:e.startTimeChange}})],1),e._v(" "),s("span",{staticClass:"input-word"},[e._v("至")]),e._v(" "),s("div",{staticClass:"input-box mr-right"},[s("calendar",{attrs:{time:e.timeObj.endTime,format:"yyyy年MM月dd日"},on:{emit:e.endTimeChange}})],1)]:e._e(),e._v(" "),!e.isBrand&&3==e.showStep||!e.isBrand&&4==e.showStep?[s("div",{staticClass:"input-box"},[s("calendar",{attrs:{time:e.timeObj.startTimeStore,format:"yyyy年MM月dd日"},on:{emit:e.startTimeChange}})],1),e._v(" "),s("span",{staticClass:"input-word"},[e._v("至")]),e._v(" "),s("div",{staticClass:"input-box mr-right"},[s("calendar",{attrs:{time:e.timeObj.endTimeStore,format:"yyyy年MM月dd日"},on:{emit:e.endTimeChange}})],1)]:e._e()],2),e._v(" "),s("div",{staticClass:"block"},[3==e.showStep||4==e.showStep?[s("selectBtn",{attrs:{sorts:e.areas,index:e.areaIndex,width:150},on:{emit:e.areaSelect}}),e._v(" "),s("selectBtn",{attrs:{sorts:e.table,index:e.tableIndex,width:150},on:{emit:e.tableSelect}}),e._v(" "),s("selectBtn",{attrs:{sorts:e.reasonList.map(function(e){return e.reasonName}),index:e.reasonIndex,width:150},on:{emit:e.reasonSelect}})]:e._e(),e._v(" "),2!=e.showStep?s("div",{staticClass:"input-check select-ban"},[s("i",{class:{active:1==this.openTime},on:{click:e.timeCheck}}),e._v("\n\t\t\t\t\t\t按营业时间\n\t\t\t\t\t")]):e._e(),e._v(" "),4==e.showStep?s("div",{staticClass:"search-input mr-right"},[s("input",{attrs:{type:"text",placeholder:"请输入订单号"},on:{input:e.orderInput,propertychange:e.orderInput}}),e._v(" "),s("em",{on:{click:e.searchOrder}})]):e._e()],2),e._v(" "),s("div",{staticClass:"block"},[e.isBrand&&1==e.showStep?s("div",{staticClass:"search-box"},[s("elShopList",{attrs:{shopIds:e.shopList},on:{chooseShop:e.getDrop}})],1):e._e(),e._v(" "),2!=e.showStep?s("div",{staticClass:"search-box"},[s("span",{staticClass:"search-btn yellow",on:{click:e.search}},[e._v("搜索")]),e._v(" "),s("span",{staticClass:"reset-btn gray",on:{click:e.reset}},[e._v("重置")])]):e._e()]),e._v(" "),e.isBrand&&1==e.showStep||2==e.showStep?s("div",{staticClass:"store-show"},[s("i",[e._v("已选择店铺：")]),e._v(" "),e._l(e.shopNameB,function(t,i){return s("span",{key:i},[e._v(e._s(t.name)+"，")])}),e._v(" "),2==e.showStep?s("span",{staticClass:"time-span"},[e._v(e._s(e.formatTime(e.timeObj.startTime))+" ~ "+e._s(e.formatTime(e.timeObj.endTime)))]):e._e()],2):e._e()]:e._e()],2),e._v(" "),s("div",{staticClass:"main"},[s("returnStore",{attrs:{store:e.orderStoreList,order:e.goodsData,otherData:e.orderStoreSend,step:e.showStep,loading:e.loading},on:{emit:e.getStep}})],1)],e._v(" "),e.detailShow?s("orderDetail",{attrs:{detail:e.detail,isDelete:!0},on:{detailShow:e.getDetailShow}}):e._e()],2)};i._withStripped=!0;var r=s("f6ce"),a=s("81a2"),n=s("44e7"),o=s("bbb9");function h(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,s){return function i(r,a){try{var n=t[r](a),o=n.value}catch(e){return void s(e)}if(!n.done)return Promise.resolve(o).then(function(e){i("next",e)},function(e){i("throw",e)});e(o)}("next")})}}var d={data:function(){return{goodsData:"",deleteData:"",orderStoreList:"",orderStoreSend:{store:{},brand:{}},isOneDay:!1,areas:[],table:[],reasonList:[],areaIndex:0,tableIndex:0,reasonIndex:0,areasList:[],tableList:[],areaId:"",tableId:"",reasonId:"",areasDefault:"全部区域",tableDefault:"全部桌台",shopList:[],brandId:"",shopId:"",shopIds:"",isBrand:"",storeName:"",storeListShow:"",allSelected:!0,timeObj:{startTime:"",endTime:"",startTimeStore:"",endTimeStore:""},page:1,pageNum:0,pageShow:10,openTime:1,orderInputValue:"",detail:null,detailShow:!1,showStep:"",userData:"",userShopList:"",userShopIdStr:"",repeat:!0,taskId:"",timerId:"",loading:!1,goodsName:"",gid:"",packageId:"",dropName:"请选择店铺",shopNameB:[]}},watch:{showStep:"initBtn"},components:{selectBtn:function(){return s.e("select_btn").then(s.bind(null,"3d41"))},calendar:function(){return s.e("calendar_type").then(s.bind(null,"f2dd"))},orderDetail:function(){return s.e("order_detail").then(s.bind(null,"603c"))},returnStore:function(){return s.e("return_goods_store").then(s.bind(null,"7751"))},selectStore:function(){return s.e("win").then(s.bind(null,"cb83"))},elShopList:function(){return s.e("el_shopList").then(s.bind(null,"60ff"))}},created:function(){this.userData=r.a.session("userShop");var e=[],t=[];"3"==this.userData.currentShop.ischain&&(this.userShopList=r.a.session("shopList"),this.userShopList.forEach(function(s,i){e[i]=s.id;var r={id:s.id,name:s.shopName};t.push(r)}),this.userShopIdStr=e.join(","),this.userShopList=t)},mounted:function(){for(var e in this.isBrand="3"==this.userData.currentShop.ischain?1:0,this.brandId=this.userData.currentShop.id,this.shopId=this.userData.currentShop.id,this.shopIds=this.userShopIdStr,this.userShopList)this.userShopList[e].selected=!0;this.isBrand&&(this.shopNameB=o.a.deepCopy(this.userShopList),this.shopList=this.userShopList.map(function(e){return e.id})),this.storeName=this.userShopList.length>0?this.userShopList[0].name:"选择店铺",this.resetDate(),0==this.isBrand?(this.showStep=3,this.getCondition()):this.showStep=1,this.search()},destroyed:function(){r.a.session("deleteShopId",null),r.a.session("dayData",null),r.a.session("orderListCache",null),r.a.session("deleteSingleTime",null),r.a.session("moreReturnCache",null),n.a.clear(this.timerId)},methods:{initBtn:function(){var e=this,t=[];(this.isBrand&&1!=this.showStep||!this.isBrand&&3!=this.showStep)&&t.push({name:"返回",className:["gray"],fn:function(){e.back()}}),3!=this.showStep&&4!=this.showStep||t.push({name:"导出",className:["fd-yellow"],fn:function(){e.exportMethods()}}),this.$store.commit("setPageTools",t)},getGoods:function(){var e=this;return h(regeneratorRuntime.mark(function t(){var s,i,n,o;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.validate()){t.next=2;break}return t.abrupt("return");case 2:return s=new Date(e.timeObj.endTimeStore).setHours(23,59,59,0),t.next=5,a.a.moreReturnByName({data:{trueShopId:e.shopId,startTime:parseInt(e.timeObj.startTimeStore/1e3),endTime:parseInt(s/1e3),areaId:e.areaId,tableId:e.tableId,reasonId:e.reasonId,page:e.page,num:e.pageShow,isOpenTime:e.openTime}});case 5:for(o in i=t.sent,r.a.session("moreReturnCache",i),n={startTime:e.timeObj.startTimeStore,endTime:e.timeObj.endTimeStore,areaId:e.areaId,tableId:e.tableId,reasonId:e.reasonId,openTime:e.openTime,shopId:e.shopId,isRequest:!1})e.setNewObj(e.orderStoreSend.store,o,n[o]);e.showStep=3,e.goodsData=i;case 11:case"end":return t.stop()}},t,e)}))()},getCondition:function(){var e=this;return h(regeneratorRuntime.mark(function t(){var s,i,r,n,o,h,d,p,u,c,m,l,S,I,f,b;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.a.getCondition({data:{trueShopId:e.shopId}});case 2:for(s=t.sent,i=s.reasonList,r=[],n=[],o=!0,h=!1,d=void 0,t.prev=9,p=s.areaList[Symbol.iterator]();!(o=(u=p.next()).done);o=!0)c=u.value,r.push(c.name);t.next=17;break;case 13:t.prev=13,t.t0=t.catch(9),h=!0,d=t.t0;case 17:t.prev=17,t.prev=18,!o&&p.return&&p.return();case 20:if(t.prev=20,!h){t.next=23;break}throw d;case 23:return t.finish(20);case 24:return t.finish(17);case 25:for(m=!0,l=!1,S=void 0,t.prev=28,I=s.tableList[Symbol.iterator]();!(m=(f=I.next()).done);m=!0)b=f.value,n.push(b.name);t.next=36;break;case 32:t.prev=32,t.t1=t.catch(28),l=!0,S=t.t1;case 36:t.prev=36,t.prev=37,!m&&I.return&&I.return();case 39:if(t.prev=39,!l){t.next=42;break}throw S;case 42:return t.finish(39);case 43:return t.finish(36);case 44:r.unshift("全部区域"),n.unshift("全部桌台"),i.unshift({reasonName:"全部原因",id:"0"}),e.areas=r,e.areasList=s.areaList,e.table=n,e.tableList=s.tableList,e.reasonList=i;case 52:case"end":return t.stop()}},t,e,[[9,13,17,25],[18,,20,24],[28,32,36,44],[37,,39,43]])}))()},getStoreOrder:function(){var e=this;return h(regeneratorRuntime.mark(function t(){var s;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(s=new Date(e.timeObj.endTime).setHours(23,59,59,0),e.repeat){t.next=4;break}return e.$store.commit("setWin",{title:"提示信息",content:"当前查询尚未结束，请结束后再进行查询或刷新浏览器重新查询！"}),t.abrupt("return");case 4:if(e.validate()){t.next=6;break}return t.abrupt("return");case 6:a.a.OrderReport({data:{type:4,timeType:1,startTime:parseInt(e.timeObj.startTime/1e3),endTime:parseInt(s/1e3),isOpenTime:e.openTime,shopIds:e.shopIds,shopId:e.brandId}}).then(function(t){e.taskId=t.taskId,e.repeat=!1,e.loading=!0,e.timerId=n.a.add(function(){a.a.taskInfo({data:{shopId:e.brandId,taskId:e.taskId}}).then(function(t){3==t.status?(n.a.clear(e.timerId),e.repeat=!0,a.a.ReportGet({data:{shopId:e.brandId,taskId:e.taskId}}).then(function(t){e.loading=!1,e.orderStoreList=t;var i={startTime:e.timeObj.startTime,endTime:s,openTime:e.openTime,shopId:e.brandId};for(var r in i)e.setNewObj(e.orderStoreSend.brand,r,i[r])})):2==t.status&&(n.a.clear(e.timerId),e.loading=!1,e.repeat=!0,e.$store.commit("setWin",{title:"提示信息",content:"请求失败，请重试！"}))})},1e3,60,!1,function(){n.a.clear(e.timerId),e.repeat=!0,e.loading=!1})});case 7:case"end":return t.stop()}},t,e)}))()},exportMethods:function(){3==this.showStep?this.exportGoods():4==this.showStep&&this.exportOrder()},exportGoods:function(){var e=this;return h(regeneratorRuntime.mark(function t(){var s;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.goodsData){t.next=4;break}e.$store.commit("setWin",{title:"提示信息",content:"没有订单可以导出"}),t.next=7;break;case 4:return s=new Date(e.timeObj.endTimeStore).setHours(23,59,59,0),t.next=7,a.a.exportMoreReturnByName({data:{trueShopId:e.shopId,startTime:parseInt(e.timeObj.startTimeStore/1e3),endTime:parseInt(s/1e3),areaId:e.areaId,tableId:e.tableId,reasonId:e.reasonId,isOpenTime:e.openTime}});case 7:case"end":return t.stop()}},t,e)}))()},exportOrder:function(){var e=this;return h(regeneratorRuntime.mark(function t(){var s;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s=new Date(e.timeObj.endTimeStore).setHours(23,59,59,0),t.next=3,a.a.exportReturnList({data:{trueShopId:e.shopId,startTime:parseInt(e.timeObj.startTimeStore/1e3),endTime:parseInt(s/1e3),areaId:e.areaId,tableId:e.tableId,reasonId:e.reasonId,isOpenTime:e.openTime,goodsName:e.goodsName,gid:e.gid,packageId:e.packageId}});case 3:case"end":return t.stop()}},t,e)}))()},getDetail:function(e){var t=this;return h(regeneratorRuntime.mark(function s(){var i;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,a.a.orderBillDelite({data:{trueShopId:t.shopId,oid:e}});case 2:i=s.sent,t.detailShow=!0,t.detail=i;case 5:case"end":return s.stop()}},s,t)}))()},setNewObj:function(e,t,s){this.$set(e,t,s)},resetDate:function(){for(var e in this.timeObj)this.timeObj[e]=(new Date).setHours(0,0,0,0)},back:function(){if(this.showStep<4&&(this.areaIndex=0,this.areaId=0,this.tableIndex=0,this.tableId=0,this.reasonIndex=0,this.reasonId=0),3==this.showStep&&this.isOneDay)this.showStep=this.showStep-2;else if(this.showStep=this.showStep-1,3==this.showStep){var e=r.a.session("moreReturnCache");e&&(this.goodsData=e)}},search:function(){1==this.isBrand&&(1==this.showStep||2==this.showStep)?this.getStoreOrder():this.getGoods()},getStep:function(e){e.step>0?(this.showStep=e.step,3==this.showStep?(this.shopId=e.id?e.id:this.shopId,this.orderStoreSend.store.isRequest=!1,e.time&&(this.timeObj.startTimeStore=e.time,this.timeObj.endTimeStore=e.time),e.page?(this.page=e.page,this.pageShow=e.pageShow,this.getGoods()):(this.page=1,this.pageShow=e.pageShow,this.getCondition(),this.getGoods(),this.isOneDay=e.isOneDay)):4==this.showStep&&(this.goodsName=e.goodsName,this.gid=e.gid,this.packageId=e.packageId)):this.getDetail(e.id)},setIsOneStore:function(e){this.isOneStore=1==e},getDrop:function(e){console.log(e),this.shopList=e,this.shopIds=this.shopList.join(","),this.setIsOneStore(this.shopList.length),this.shopNameB=o.a.deepCopy(this.userShopList);for(var t=0;t<this.shopNameB.length;t++)this.shopList.includes(this.shopNameB[t].id)||(this.shopNameB.splice(t,1),t--);console.log(this.shopNameB)},searchOrder:function(){var e=this.orderInputValue;e?this.getDetail(e):this.$store.commit("setWin",{title:"提示信息",content:"订单号不能为空"}),this.orderInputValue=""},toDetail:function(){var e=event.target;if("light"==e.className){var t=e.textContent;this.getDetail(t)}},getDetailShow:function(e){this.detailShow=e,this.initBtn()},orderInput:function(e){var t=e.target.value;t=t.replace(/[^\d]/g,""),isNaN(t)&&(t=""),this.orderInputValue=t,e.target.value=t},reset:function(){var e=(new Date).setHours(0,0,0,0);3==this.showStep||4==this.showStep?(this.openTime=1,this.areaIndex=0,this.tableIndex=0,this.reasonIndex=0,this.areaId="",this.tableId="",this.reasonId="",3==this.showStep?(this.isBrand||(this.timeObj.startTimeStore=e,this.timeObj.endTimeStore=e),this.search()):(this.orderStoreSend.store.areaId="",this.orderStoreSend.store.tableId="")):(this.timeObj.startTime=e,this.timeObj.endTime=e,this.isBrand&&(this.shopList=this.userShopList.map(function(e){return e.id}),this.shopIds=this.shopList.join(","),this.shopNameB=o.a.deepCopy(this.userShopList),this.setIsOneStore(this.shopList.length)),this.search())},timeCheck:function(){this.openTime=0==this.openTime?1:0},areaSelect:function(e){this.areaIndex=e,this.areaId=this.areaIndex>0?this.areasList[this.areaIndex-1].id:"",3==this.showStep?this.getGoods():4==this.showStep&&(this.orderStoreSend.store.isRequest=!0,this.orderStoreSend.store.areaId=this.areaId)},tableSelect:function(e){this.tableIndex=e,this.tableId=this.tableIndex>0?this.tableList[this.tableIndex-1].id:"",3==this.showStep?this.getGoods():4==this.showStep&&(this.orderStoreSend.store.isRequest=!0,this.orderStoreSend.store.tableId=this.tableId)},reasonSelect:function(e){this.reasonIndex=e,this.reasonId=this.reasonList[this.reasonIndex].id},startTimeChange:function(e){3==this.showStep?this.timeObj.startTimeStore=e:this.timeObj.startTime=e},endTimeChange:function(e){3==this.showStep?this.timeObj.endTimeStore=e:this.timeObj.endTime=e},formatTime:function(e){return o.a.format(new Date(e),"yyyy年MM月dd日")},validate:function(){var e=!0,t="",s="";return 3==this.showStep?(t=this.timeObj.startTimeStore,s=this.timeObj.endTimeStore):(t=this.timeObj.startTime,s=this.timeObj.endTime),parseInt(t/864e5)>parseInt(s/864e5)?(this.$store.commit("setWin",{title:"提示信息",content:"开始时间不能大于结束时间"}),e=!1):s-t>=80352e5&&(this.$store.commit("setWin",{title:"提示信息",content:"最大只能查询三个月时间"}),e=!1),this.isBrand&&""==this.shopIds&&(this.$store.commit("setWin",{title:"提示信息",content:"没有可选店铺"}),e=!1),e}}},p=(s("dfbf"),s("6ceb")),u=Object(p.a)(d,i,[],!1,null,"3e5e2336",null);u.options.__file="src\\module\\statistics\\return_goods.vue";t.default=u.exports}}]);