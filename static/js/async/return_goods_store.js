(window.webpackJsonp=window.webpackJsonp||[]).push([["return_goods_store"],{"0bcf":function(t,e,a){},7751:function(t,e,a){"use strict";a.r(e);var s=a("81a2"),i=a("bbb9"),r=a("f6ce");function n(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function s(i,r){try{var n=e[i](r),o=n.value}catch(t){return void a(t)}if(!n.done)return Promise.resolve(o).then(function(t){s("next",t)},function(t){s("throw",t)});t(o)}("next")})}}var o={props:["store","order","otherData","step","loading"],data:function(){return{returnData:"",returnList:[],returnOrderList:[],returnDetailList:[],orderStoreList:"",shopId:"",dayData:"",dayList:[],sendData:{},total:{returnNum:0,returnPrice:0,orderNum:0,totalDay:1,recordNum:0},orderTotal:{totalNum:0,totalPrice:0,totalDay:1},dayTotal:{returnNum:0,returnPrice:0},detailTotal:{oid:"",returnNum:0,createTime:"",returnPrice:0,areaName:"",tableName:""},page:1,pageNum:1,pageShow:10,showStep:"",showPageList:[10,20],showDetail:!1,loadShow:!1,listIndex:0,returnListGoodsName:"",singleTime:"",titleList1:[{titleName:"操作",titleStyle:{width:"150px"}},{titleName:"订单号",titleStyle:{width:"190px"}},{titleName:"订单时间",dataName:"createTime"},{titleName:"区域",dataName:"areaName"},{titleName:"桌台",dataName:"tableName"},{titleName:"退品数量",dataName:"returnNum"},{titleName:"退品金额(元)",dataName:"returnPrice"},{titleName:"退品原因",dataName:"reasonL"}],titleList2:[{titleName:"商品类型",dataName:"typeName"},{titleName:"商品名称",dataName:"itemName"},{titleName:"退品数量",dataName:"totalNum"},{titleName:"退品金额",dataName:"totalPrice"},{titleName:"退品时间",dataName:"time"},{titleName:"退品原因",dataName:"reasonName"},{titleName:"操作人",dataName:"staffName"}],mainBox:{"margin-top":0},isNames:-2,reasonList:[]}},watch:{store:"setStore",step:"setStep",order:"setOrder",loading:"setLoad",pageShow:"initData",otherData:{deep:!0,handler:function(){this.setSingleStore()}}},mounted:function(){this.orderStoreList=this.store?this.store:[],this.returnList=this.order.list?this.order.list:[],this.sendData=this.otherData,this.showStep=this.step,this.setStore(),this.setOrder(),this.$nextTick(function(){this.getOrderListCache()}),document.addEventListener("click",this.remove)},components:{selectBtn:function(){return a.e("select_btn").then(a.bind(null,"3d41"))},pageBtn:function(){return a.e("page_element").then(a.bind(null,"5921"))},tableCom:function(){return a.e("table").then(a.bind(null,"4360"))}},destroyed:function(){document.removeEventListener("click",this.remove)},methods:{remove:function(){this.isNames=-1},showNames:function(t,e){t==this.isNames&&(t=-1),this.isNames=t,this.reasonList=e.split(",")},toDay:function(t){var e=t.target;e.className.indexOf("light")>=0&&(this.orderTotal.totalDay<=1?(this.shopId=e.getAttribute("data-id"),this.singleTime=this.sendData.brand.startTime/1e3,r.a.session("deleteSingleTime",this.singleTime),this.getMoreShop()):(this.shopId=e.getAttribute("data-id"),this.page=1,this.pageNum=1,this.getDayData(),r.a.session("deleteShopId",this.shopId)))},toSingle:function(t){var e=t.target;e.className.indexOf("light")>=0&&(this.singleTime=e.getAttribute("data-time"),r.a.session("deleteSingleTime",this.singleTime),this.getMoreShop())},getMoreShop:function(){this.showStep=3,this.page=1,this.pageNum=1;var t={step:this.showStep,id:this.shopId,pageShow:this.pageShow,time:1e3*this.singleTime,isOneDay:this.orderTotal.totalDay<=1};this.$emit("emit",t)},getDayData:function(){var t=this;return n(regeneratorRuntime.mark(function e(){var a,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.moreReturn({data:{startTime:parseInt(t.sendData.brand.startTime/1e3),endTime:parseInt(t.sendData.brand.endTime/1e3),isOpenTime:t.sendData.brand.openTime,page:t.page,num:t.pageShow,trueShopId:t.shopId}});case 2:(a=e.sent).pageShow=t.pageShow,t.setDayData(a,!1),r.a.session("dayData",a),t.showStep=2,i={step:t.showStep},t.$emit("emit",i);case 9:case"end":return e.stop()}},e,t)}))()},toDetail:function(t,e,a){var i=this;return n(regeneratorRuntime.mark(function r(){var n,o,l,d,h,u,c,v,p,m,_,g,f,N,L,S,w,D;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(2==a&&(n={step:0,id:t.oid},i.$emit("emit",n)),1!=a){r.next=51;break}return r.next=4,s.a.getReturnDetail({data:{oid:i.returnOrderList[e].oid,trueShopId:i.sendData.store.shopId}});case 4:for(o=r.sent,l=!0,d=!1,h=void 0,r.prev=8,u=o[Symbol.iterator]();!(l=(c=u.next()).done);l=!0)(v=c.value).totalPrice=i.toFloatStr(v.totalPrice);r.next=16;break;case 12:r.prev=12,r.t0=r.catch(8),d=!0,h=r.t0;case 16:r.prev=16,r.prev=17,!l&&u.return&&u.return();case 19:if(r.prev=19,!d){r.next=22;break}throw h;case 22:return r.finish(19);case 23:return r.finish(16);case 24:for(_ in i.returnDetailList=o,p=0,m=0,i.returnOrderList[e])"returnNum"==_&&"returnPrice"==_||(i.detailTotal[_]=i.returnOrderList[e][_]);for(g=!0,f=!1,N=void 0,r.prev=30,L=o[Symbol.iterator]();!(g=(S=L.next()).done);g=!0)w=S.value,p+=1*w.totalNum,m+=1*w.totalPrice;r.next=38;break;case 34:r.prev=34,r.t1=r.catch(30),f=!0,N=r.t1;case 38:r.prev=38,r.prev=39,!g&&L.return&&L.return();case 41:if(r.prev=41,!f){r.next=44;break}throw N;case 44:return r.finish(41);case 45:return r.finish(38);case 46:i.detailTotal.returnNum=p,i.detailTotal.returnPrice=m,i.showStep=5,D={step:i.showStep},i.$emit("emit",D);case 51:case"end":return r.stop()}},r,i,[[8,12,16,24],[17,,19,23],[30,34,38,46],[39,,41,45]])}))()},showOrderDetail:function(t){var e=t.target;e.className.indexOf("show-order")>=0&&(this.listIndex=e.getAttribute("data-index"),this.page=1,this.showOrder())},showOrder:function(){var t=this;return n(regeneratorRuntime.mark(function e(){var a,i,n,o,l,d;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=new Date(t.sendData.store.endTime).setHours(23,59,59,0),e.next=3,s.a.getReturnList({data:{startTime:parseInt(t.sendData.store.startTime/1e3),endTime:parseInt(a/1e3),isOpenTime:t.sendData.store.openTime,page:t.page,num:t.pageShow,trueShopId:t.sendData.store.shopId,areaId:t.sendData.store.areaId,tableId:t.sendData.store.tableId,reasonId:t.sendData.store.reasonId,goodsName:t.returnList[t.listIndex].goodsName,gid:t.returnList[t.listIndex].gid,packageId:t.returnList[t.listIndex].packageId}});case 3:for(i=e.sent,t.showStep=4,t.returnOrderList=i.list?i.list:[],t.pageNum=i.pageNum?i.pageNum:1,n=0;n<t.returnOrderList.length;n++)for(t.returnOrderList[n].reasonL="",o=0;o<t.returnOrderList[n].returnReason.length;o++)t.returnOrderList[n].reasonL=t.returnOrderList[n].reasonL+t.returnOrderList[n].returnReason[o].reasonName+",";for(l in i.total)i.total?t.total[l]=i.total[l]:t.total[l]=0;t.returnListGoodsName=t.returnList[t.listIndex].goodsName,i.listIndex=t.listIndex,r.a.session("orderListCache",i),r.a.session("returnListGoodsName",t.returnListGoodsName),d={step:t.showStep,goodsName:t.returnList[t.listIndex].goodsName,gid:t.returnList[t.listIndex].gid,packageId:t.returnList[t.listIndex].packageId},t.$emit("emit",d);case 15:case"end":return e.stop()}},e,t)}))()},getOrderListCache:function(){var t=r.a.session("orderListCache");if(t)for(var e in this.page=t.page,this.pageNum=t.pageNum,this.listIndex=t.listIndex,this.returnListGoodsName=r.a.session("returnListGoodsName"),this.returnOrderList=t.list?t.list:[],t.total)t.total?this.total[e]=t.total[e]:(this.total[e]=0,this.total.totalDay=1)},pageChange:function(t){var e=this.page;this.page=t.page,this.pageShow=t.num,e!=t.page&&this.initData()},showPageChange:function(t){this.page=1,this.pageShow=this.showPageList[t]},initData:function(){var t=r.a.session("deleteShopId"),e=void 0;switch(t&&(this.shopId=t),this.showStep){case 2:this.getDayData();break;case 3:this.showStep=3,e={step:this.showStep,id:this.sendData.store.shopId,page:this.page,pageShow:this.pageShow,time:1e3*this.singleTime},this.$emit("emit",e);break;case 4:this.showOrder()}},setSingleStore:function(){this.sendData.store.isRequest&&this.showOrder()},setDayData:function(t,e){t&&(e&&(this.page=t.page,this.pageShow=t.pageShow),this.pageNum=t.pageNum,this.dayList=t.list?t.list:[],this.dayTotal.returnNum=t.total.returnNum,this.dayTotal.returnPrice=t.total.returnPrice)},setStep:function(){this.showStep=this.step,2==this.showStep&&this.setDayData(r.a.session("dayData"),!0)},setStore:function(){if(this.store){this.orderStoreList=this.store,this.sendData=this.otherData;for(var t=0,e=0,a=0;a<this.orderStoreList.length;a++)t+=this.orderStoreList[a].totalNum,e+=this.orderStoreList[a].totalPrice;this.orderTotal.totalNum=t,this.orderTotal.totalPrice=e,this.orderTotal.totalDay=Math.ceil((this.sendData.brand.endTime-this.sendData.brand.startTime)/864e5)}},setOrder:function(){this.returnList=this.order.list?this.order.list:[];for(var t=0;t<this.returnList.length;t++){for(var e="",a=0;a<this.returnList[t].returnReason.length;a++)e=e+this.returnList[t].returnReason[a].reasonName+"("+this.returnList[t].returnReason[a].reasonNum+"),";this.returnList[t].reasonL=e}for(var s in this.pageNum=this.order.pageNum?this.order.pageNum:1,this.page=this.order.page?this.order.page:1,this.total)this.order.total?this.total[s]=this.order.total[s]:(this.total[s]=0,this.total.totalDay=1)},toFloatStr:function(t){var e=t+"";return i.a.toFloatStr(e,2)},setLoad:function(){this.loadShow=this.loading},formatTime:function(t){return i.a.format(new Date(1e3*t),"yyyy年MM月dd日")}}},l=(a("99c1"),a("d801")),d=Object(l.a)(o,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"step-container"},[1!=t.showStep||t.loadShow?t._e():[s("div",{staticClass:"total"},[t._m(0),t._v(" "),s("div",{staticClass:"total-data"},[s("span",[t._v(t._s(t.orderTotal.totalDay))]),t._v(" "),s("span",[t._v(t._s(t.orderTotal.totalNum))]),t._v(" "),s("span",[t._v(t._s(t.orderTotal.totalPrice))])])]),t._v(" "),s("div",{staticClass:"store-list"},[s("div",{staticClass:"length"},[t._v("\n\t\t\t\t退品统计 · 共\n\t\t\t\t"),s("span",[t._v(" "+t._s(t.orderStoreList.length)+" ")]),t._v("条记录\n\t\t\t")]),t._v(" "),t._m(1),t._v(" "),s("ul",{on:{click:t.toDay}},[t._l(t.orderStoreList,function(e,a){return s("li",{key:a},[s("span",{staticClass:"light",attrs:{"data-id":e.shopId,title:e.shopName}},[t._v(t._s(e.shopName))]),t._v(" "),s("span",{attrs:{title:e.totalNum}},[t._v(t._s(e.totalNum))]),t._v(" "),s("span",{attrs:{title:e.totalPrice}},[t._v(t._s(e.totalPrice))])])}),t._v(" "),t.orderStoreList.length?t._e():s("li",{staticClass:"list-empty"},[t._v("- 暂无条目 -")])],2)])],t._v(" "),t.loadShow?s("div",{staticClass:"loading"},[s("img",{attrs:{src:a("b8bc")}})]):t._e(),t._v(" "),2==t.showStep?[s("div",{staticClass:"total"},[t._m(2),t._v(" "),s("div",{staticClass:"total-data"},[s("span",[t._v(t._s(t.orderTotal.totalDay))]),t._v(" "),s("span",[t._v(t._s(t.dayTotal.returnNum))]),t._v(" "),s("span",[t._v(t._s(t.dayTotal.returnPrice))])])]),t._v(" "),s("div",{staticClass:"store-list"},[t._m(3),t._v(" "),s("ul",{on:{click:t.toSingle}},[t._l(t.dayList,function(e,a){return s("li",{key:a,staticClass:"day"},[s("span",{staticClass:"light",attrs:{"data-time":e.date}},[t._v("查看详情")]),t._v(" "),s("span",{attrs:{title:t.formatTime(e.date)}},[t._v(t._s(t.formatTime(e.date)))]),t._v(" "),s("span",{attrs:{title:e.returnNum}},[t._v(t._s(e.returnNum))]),t._v(" "),s("span",{attrs:{title:e.returnPrice}},[t._v(t._s(e.returnPrice))])])}),t._v(" "),t.dayList.length?t._e():s("li",{staticClass:"list-empty"},[t._v("- 暂无条目 -")])],2)])]:t._e(),t._v(" "),3==t.showStep?[s("div",{staticClass:"total goods"},[t._m(4),t._v(" "),s("div",{staticClass:"total-data"},[s("span",[t._v(t._s(t.total.totalDay))]),t._v(" "),s("span",[t._v(t._s(t.total.orderNum))]),t._v(" "),s("span",[t._v(t._s(t.total.returnNum))]),t._v(" "),s("span",[t._v(t._s(t.total.returnPrice))])])]),t._v(" "),s("div",{staticClass:"list goods"},[s("div",{staticClass:"length"},[t._v("\n\t\t\t\t退品统计 · 共\n\t\t\t\t"),s("span",[t._v(" "+t._s(t.total.recordNum)+" ")]),t._v("条记录\n\t\t\t")]),t._v(" "),t._m(5),t._v(" "),s("ul",{on:{click:t.showOrderDetail}},[t._l(t.returnList,function(e,a){return s("li",{key:a},[s("span",{staticClass:"show-order light",attrs:{"data-index":a}},[t._v("查看详情")]),t._v(" "),s("span",{attrs:{title:e.goodsName}},[t._v(t._s(e.goodsName))]),t._v(" "),s("span",{attrs:{title:e.returnNum}},[t._v(t._s(e.returnNum))]),t._v(" "),s("span",{attrs:{title:e.returnPrice}},[t._v(t._s(e.returnPrice))]),t._v(" "),s("div",{staticStyle:{position:"relative",display:"inline-block",width:"20%"}},[s("span",{staticStyle:{cursor:"pointer",width:"100%",height:"100%"},attrs:{title:e.reasonL},on:{click:[function(t){t.stopPropagation()},function(s){t.showNames(a,e.reasonL)}]}},[t._v(t._s(e.reasonL))]),t._v(" "),t.isNames==a?s("div",{staticClass:"detLi"},[s("div",{staticClass:"detDiv"},[s("i",{staticClass:"detI"}),t._v(" "),s("div",{staticClass:"detH3"},t._l(t.reasonList,function(e,a){return s("div",{key:a+"-"},[t._v(t._s(e)+"\n\t\t\t\t\t\t\t\t\t\t"),a!=t.reasonList.length-1?s("i",[t._v(";")]):t._e()])}))])]):t._e()])])}),t._v(" "),t.returnList.length?t._e():s("li",{staticClass:"list-empty"},[t._v("- 暂无条目 -")])],2)])]:t._e(),t._v(" "),4==t.showStep?[s("div",{staticClass:"total goods"},[t._m(6),t._v(" "),s("div",{staticClass:"total-data"},[s("span",[t._v(t._s(t.total.totalDay))]),t._v(" "),s("span",[t._v(t._s(t.total.orderNum))]),t._v(" "),s("span",[t._v(t._s(t.total.returnNum))]),t._v(" "),s("span",[t._v(t._s(t.total.returnPrice))])])]),t._v(" "),s("tableCom",{attrs:{listHeight:50,listName:t.returnListGoodsName,allTotal:t.total.orderNum,fixed:2,introData:t.returnOrderList,titleData:t.titleList1,listWidth:1200},scopedSlots:t._u([{key:"con-0",fn:function(e){return s("div",{staticStyle:{color:"#f8941f",cursor:"pointer"},on:{click:function(a){t.toDetail(e.data,e.index,1)}}},[t._v("\n\t\t\t\t查看详情\n\t\t\t")])}},{key:"con-1",fn:function(e){return s("div",{staticStyle:{color:"#29abe2",cursor:"pointer"},on:{click:function(a){t.toDetail(e.data,e.index,2)}}},[t._v("\n\t\t\t\t"+t._s(e.data.oid)+"\n\t\t\t")])}}])})]:t._e(),t._v(" "),5==t.showStep?[s("div",{staticClass:"detail"},[s("div",{staticClass:"detail-head"},[s("span",[t._v("订单详情")]),t._v(" "),s("ul",[s("li",[s("em",[t._v("订单号：")]),t._v(t._s(t.detailTotal.oid))]),t._v(" "),s("li",[s("em",[t._v("订单时间：")]),t._v(t._s(t.detailTotal.createTime))]),t._v(" "),s("li",[s("em",[t._v("桌台号：")]),t._v(t._s(t.detailTotal.areaName)+" -- "+t._s(t.detailTotal.tableName))])]),t._v(" "),s("ul",[s("li",[s("em",[t._v("退品数量：")]),t._v(t._s(t.detailTotal.returnNum))]),t._v(" "),s("li",[s("em",[t._v("退品总额：")]),t._v(t._s(t.detailTotal.returnPrice))])])]),t._v(" "),s("tableCom",{attrs:{listHeight:50,showHand:!1,fixed:0,introData:t.returnDetailList,titleData:t.titleList2,mainBox:t.mainBox,listWidth:1200}})],1)]:t._e(),t._v(" "),1!=t.step&&5!=t.step?s("div",{staticClass:"page-box"},[s("pageBtn",{attrs:{total:t.pageNum,page:t.page,isNoJump:!0},on:{pageNum:t.pageChange}})],1):t._e()],2)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("span",[this._v("天数")]),this._v(" "),e("span",[this._v("退品总数")]),this._v(" "),e("span",[this._v("退品总额")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("span",[this._v("店铺名称")]),this._v(" "),e("span",[this._v("退品总数")]),this._v(" "),e("span",[this._v("退品总额")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("span",[this._v("天数")]),this._v(" "),e("span",[this._v("退品总数")]),this._v(" "),e("span",[this._v("退品总额")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title day"},[e("span",[this._v("查看详情")]),this._v(" "),e("span",[this._v("时间")]),this._v(" "),e("span",[this._v("退品数量")]),this._v(" "),e("span",[this._v("退品金额")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("span",[this._v("天数")]),this._v(" "),e("span",[this._v("订单数")]),this._v(" "),e("span",[this._v("退品总数")]),this._v(" "),e("span",[this._v("退品总额")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"title"},[a("span",[t._v("操作")]),t._v(" "),a("span",[t._v("商品名称")]),t._v(" "),a("span",[t._v("退品数量")]),t._v(" "),a("span",[t._v("退品金额")]),t._v(" "),a("span",[t._v("退品原因")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("span",[this._v("天数")]),this._v(" "),e("span",[this._v("订单数")]),this._v(" "),e("span",[this._v("退品总数")]),this._v(" "),e("span",[this._v("退品总额")])])}],!1,null,"a78ff466",null);e.default=d.exports},"99c1":function(t,e,a){"use strict";var s=a("0bcf");a.n(s).a},b8bc:function(t,e,a){t.exports=a.p+"images/preloader.3e54c692.gif"}}]);