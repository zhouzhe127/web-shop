(window.webpackJsonp=window.webpackJsonp||[]).push([["operation_detail"],{2708:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"output-shipper"}},[i("div",{staticClass:"scroll-box"},[t.mainShow?[i("div",{staticClass:"head"},[t._v("调度单详情")]),t._v(" "),i("div",{staticClass:"detail"},[i("div",{staticClass:"block"},[i("div",{staticClass:"item"},[i("span",[t._v("调度单号：")]),t._v(t._s(t.details.receiptNumber)+"\n\t\t\t\t\t\t\t")]),t._v(" "),i("div",{staticClass:"item"},[i("span",[t._v("调度状态：")]),t._v(t._s(t.allStatus[t.details.dynamic])+"\n\t\t\t\t\t\t\t")]),t._v(" "),i("div",{staticClass:"item ware"},[i("span",[t._v("入货仓库：")]),t._v(" "),i("p",[t._v(t._s(t.details.intoWname)),i("em",{on:{click:function(e){t.openWareWin(t.details.intoWarehouse)}}})])]),t._v(" "),i("div",{staticClass:"item ware"},[i("span",[t._v("出货仓库：")]),t._v(" "),i("p",[t._v(t._s(t.details.outWname)),i("em",{on:{click:function(e){t.openWareWin(t.details.outWarehouse)}}})])])]),t._v(" "),i("div",{staticClass:"block"},[i("div",{staticClass:"item"},[i("span",[t._v("创建时间：")]),t._v(t._s(t.timeConversion(t.details.createTime,1))+"\n\t\t\t\t\t\t\t")]),t._v(" "),i("div",{staticClass:"item"},[i("span",[t._v("创建人：")]),t._v(t._s(t.details.createName)+"\n\t\t\t\t\t\t\t")]),t._v(" "),i("div",{staticClass:"item narrow"},[i("span",[t._v("原因：")]),t._v(t._s(t.details.cause||"--")+"\n\t\t\t\t\t\t\t")]),t._v(" "),i("div",{staticClass:"item narrow"},[i("span",[t._v("备注：")]),t._v(t._s(t.details.remark||"--")+"\n\t\t\t\t\t\t\t")])]),t._v(" "),i("div",{staticClass:"block"},[2==t.dynamic||5==t.dynamic||6==t.dynamic?[i("div",{staticClass:"item"},[1==t.disType?i("span",[t._v("出货时间：")]):t._e(),t._v(" "),2==t.disType?i("span",[t._v("入货时间：")]):t._e(),t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.operate.time)+"\n\t\t\t\t\t\t\t\t")]),t._v(" "),i("div",{staticClass:"item"},[1==t.disType?i("span",[t._v("出货人：")]):t._e(),t._v(" "),2==t.disType?i("span",[t._v("入货人：")]):t._e(),t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.operate.name)+"\n\t\t\t\t\t\t\t\t")])]:t._e(),t._v(" "),4==t.dynamic?[i("div",{staticClass:"item"},[i("span",[t._v("取消时间：")]),t._v(t._s(t.operate.time)+"\n\t\t\t\t\t\t\t\t")]),t._v(" "),i("div",{staticClass:"item"},[i("span",[t._v("取消人：")]),t._v(t._s(t.operate.name)+"\n\t\t\t\t\t\t\t\t")])]:t._e()],2)]),t._v(" "),t.enterList.length?i("div",{staticClass:"tab-box",on:{click:t.tabClick}},[i("span",{class:{active:-1==t.selIndex},attrs:{"data-type":"1"}},[t._v("出货单")]),t._v(" "),t._l(t.enterList,function(e,n){return i("span",{key:n,class:{active:t.selIndex==n},attrs:{"data-type":"2","data-index":n}},[t._v("\n\t\t\t\t\t\t入货单"+t._s(n+1)+"\n\t\t\t\t\t")])})],2):t._e(),t._v(" "),i(t.showWareWin,{tag:"component",attrs:{wid:t.wareId,width:550,height:200},on:{winEvent:t.wareWin}}),t._v(" "),i("detail-list",{attrs:{detail:t.detailObj,detailInto:t.detailObjInto,type:t.disType},on:{emit:t.getDetailObj}})]:t._e(),t._v(" "),t.printShow?i("output-print",{attrs:{detail:t.details,goods:t.outGoods,material:t.outMaterial,isOpen:t.showCom},on:{emit:t.getEmit}}):t._e(),t._v(" "),t.printShowInto?i("output-print-into",{attrs:{detail:t.details,goods:t.enterGoods,material:t.enterMaterial,isOpen:t.showCom},on:{emit:t.getEmit}}):t._e()],2)])};n._withStripped=!0;var a=i("81a2"),r=i("f6ce"),s=i("bbb9");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function n(a,r){try{var s=e[a](r),o=s.value}catch(t){return void i(t)}if(!s.done)return Promise.resolve(o).then(function(t){n("next",t)},function(t){n("throw",t)});t(o)}("next")})}}var u={data:function(){return{showCom:!1,showWareWin:null,details:{},allStatus:{1:"未出货",2:"待入货",3:"调度中",4:"已取消",5:"已完成",6:"已完成(异常)"},detailObj:{},detailObjInto:{},outGoods:[],outMaterial:[],enterList:[],enterGoods:[],enterMaterial:[],printShow:!1,printShowInto:!1,mainShow:!0,enterShow:!0,detailId:"",dispatchId:"",dynamic:"",disType:1,selIndex:-1,operate:{name:"",time:""},wareId:"",btnArr:[],outDetails:{},uid:"",isExamine:!1}},components:{detailList:function(){return i.e("operation_detail_list").then(i.bind(null,"0777"))},outputPrint:function(){return i.e("output_shipper_print").then(i.bind(null,"ba23"))},outputPrintInto:function(){return i.e("output_shipper_print").then(i.bind(null,"62ac"))},warehouseWin:function(){return i.e("waremessage_win").then(i.bind(null,"39f2"))},enterGoods:function(){return i.e("enter_goods").then(i.bind(null,"cd0c"))}},mounted:function(){this.initBtn(),this.detailId=this.$route.query.id;var t=r.a.session("userShop"),e=r.a.session("clusionToOperationDetail");e&&(this.isExamine=e,r.a.session("clusionToOperationDetail",null)),this.uid=t.user.id,this.init()},methods:{initBtn:function(){var t=this;this.btnArr=[{name:"返回",className:["back"],fn:function(){r.a.session("operationRequestDestroy",!0),t.$router.go(-1)}},{name:"打印",className:["wearhouse all"],fn:function(){1==t.disType?t.printShow=!0:2==t.disType&&(t.printShowInto=!0),t.mainShow=!1,t.$store.commit("setPageTools",[])}}],this.$store.commit("setPageTools",this.btnArr)},setInitBtn:function(){var t=this;if(this.btnArr.splice(2),!this.isExamine){if(1==this.dynamic){var e,i=[{name:"取消调度",style:"border: 1px solid #f03c3d;color: #f03c3d;background: #fff;",fn:function(){t.cancelMethod()}},{name:"确认出货",style:"border: 1px solid #fe8d01;color: #fff;background: #fe8d01;",fn:function(){t.confirmMethod()}}];(e=this.btnArr).push.apply(e,i)}if(2==this.dynamic){var n,a=[{name:"入货",style:"color: #fff;background: #22aae0;",fn:function(){t.$router.push({path:"/admin/operation/enterGoods",query:t.$route.query})}}];(n=this.btnArr).push.apply(n,a)}this.$store.commit("setPageTools",this.btnArr)}},openWareWin:function(t){this.wareId=t,this.showWareWin="warehouseWin"},wareWin:function(){this.showWareWin=null},getEmit:function(){this.printShow=!1,this.printShowInto=!1,this.mainShow=!0,1==this.disType?this.setOrderDetail(this.outDetails,1):this.setOrderDetail(this.enterList[this.selIndex],2),this.$store.commit("setPageTools",this.btnArr)},getDetailObj:function(t){this.showCom=t.showCom},tabClick:function(t){var e=t.target;if("span"==e.tagName.toLocaleLowerCase()){var i=e.getAttribute("data-type"),n=e.getAttribute("data-index");if(1==i)this.selIndex=-1,this.setOrderDetail(this.outDetails,i);else if(2==i){this.selIndex=n;var a=this.enterList[n];this.setOrderDetail(a,i)}}},setOrderDetail:function(t,e){if(1==e){this.outGoods=this.setGoodsList(t.itemDetail.goodsDetail),this.outMaterial=this.setMaterialList(t.itemDetail.materialDetail);var i={goods:this.outGoods,material:this.outMaterial};this.detailObj=i,this.disType=e}if(2==e){this.enterGoods=this.setGoodsListInto(t.itemDetail.goodsDetail),this.enterMaterial=this.setMaterialListInto(t.itemDetail.materialDetail);var n={goods:this.enterGoods,material:this.enterMaterial};this.detailObjInto=n,this.disType=e}this.operate.name=t.operateUname,this.operate.time=this.timeConversion(t.operateTime,1)},init:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var i,n,r,s,o,u,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.getDispatchRecordDetailList({data:{id:t.detailId}});case 2:for(i=e.sent,t.details=i,t.dynamic=t.details.dynamic,n=!0,r=!1,s=void 0,e.prev=8,o=i.invoiceList[Symbol.iterator]();!(n=(u=o.next()).done);n=!0)1==(c=u.value).type?(t.dispatchId=c.id,t.setOrderDetail(c,c.type),t.outDetails=c):2==c.type&&t.enterList.push(c);e.next=16;break;case 12:e.prev=12,e.t0=e.catch(8),r=!0,s=e.t0;case 16:e.prev=16,e.prev=17,!n&&o.return&&o.return();case 19:if(e.prev=19,!r){e.next=22;break}throw s;case 22:return e.finish(19);case 23:return e.finish(16);case 24:t.setInitBtn();case 25:case"end":return e.stop()}},e,t,[[8,12,16,24],[17,,19,23]])}))()},cancelMethod:function(){var t=this;this.$store.commit("setWin",{title:"操作提示",winType:"confirm",content:"是否取消调度？",ok:{content:"是"},cancel:{content:"否"},callback:function(e){"ok"==e&&t.cancelShipment()}})},confirmMethod:function(){var t=this;this.$store.commit("setWin",{title:"操作提示",winType:"confirm",content:"是否确认出货？",ok:{content:"是"},cancel:{content:"否"},callback:function(e){"ok"==e&&t.confirmShipment()}})},cancelShipment:function(){var t=this;return o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.DispatchrecordCancelShipment({data:{id:t.detailId,dispatchId:t.dispatchId}});case 2:e.sent&&t.init();case 4:case"end":return e.stop()}},e,t)}))()},confirmShipment:function(){var t=this;return o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.DispatchrecordConfirmShipment({data:{id:t.detailId,uid:t.uid,type:t.details.applyId>0?1:0}});case 2:e.sent&&t.init();case 4:case"end":return e.stop()}},e,t)}))()},myAlert:function(t){this.$store.commit("setWin",{title:"操作提示",content:t})},setGoodsList:function(t){var e=s.a.deepCopy(t);for(var i in e){var n=e[i];for(var a in n.serialNumCus=Number(i)+1,n.typeNameCus=0==n.type?"普通商品":"称重商品",n.outGoodsNumCus=n.num+n.unit,n.batchInfo){var r=n.batchInfo[a];r.serialNumCus="批次 "+(Number(a)+1),r.timeCus=this.timeConversion(r.productionTime),r.priceAndName=r.purchasePrice+"元/"+n.unit,r.outGoodsNumCus=r.num+n.unit}}return e},setMaterialList:function(t){var e=s.a.deepCopy(t);for(var i in e){var n=e[i],a=[],r=!0,o=!1,u=void 0;try{for(var c,l=n.cateData[Symbol.iterator]();!(r=(c=l.next()).done);r=!0){var m=c.value;a.push(m.name)}}catch(t){o=!0,u=t}finally{try{!r&&l.return&&l.return()}finally{if(o)throw u}}for(var d in n.serialNumCus=Number(i)+1,n.cateCus=a.join(","),n.outMatNumCus=this.setUnit(n.unitData,n.num,n.selectUnitName),n.batchInfo){var h=n.batchInfo[d];h.serialNumCus="批次 "+(Number(d)+1),h.timeCus=this.timeConversion(h.productionTime),h.priceAndName=h.purchasePrice+"元/"+h.purchaseUnitName,h.outMatNumCus=this.setUnit(n.unitData,h.num,n.selectUnitName)}}return e},spliceArr:function(t){for(var e=0;e<t.length;e++){var i=t[e],n=0,a=0;for(var r in i.batchInfo){var s=i.batchInfo[r];n+=Number(s.intoNum),a+=Number(s.consumeNum)}n<=0&&a<=0&&t.splice(e,1)}},setGoodsListInto:function(t){var e=s.a.deepCopy(t);this.spliceArr(e);for(var i=0;i<e.length;i++){var n=e[i];n.serialNumCus=Number(i)+1,n.num=n.num+n.unit;var a=0,r=0;for(var o in n.batchInfo){var u=n.batchInfo[o];u.serialNumCus="批次 "+(Number(o)+1),u.timeCus=this.timeConversion(u.productionTime),u.priceAndName=u.purchasePrice+"元/"+n.unit,u.outGoodsNumCus=u.num+n.unit,u.intoNumDetail=u.intoNum+n.unit,u.consumeNumDetail=u.consumeNum+n.unit,a+=Number(u.intoNum),r+=Number(u.consumeNum)}n.intoNum=a+n.unit,n.consumeNum=r+n.unit,n.wName=n.newWname;var c=!0,l=!1,m=void 0;try{for(var d,h=n.newArea[Symbol.iterator]();!(c=(d=h.next()).done);c=!0){var v=d.value;v.id==n.areaId&&(n.aName=v.areaName)}}catch(t){l=!0,m=t}finally{try{!c&&h.return&&h.return()}finally{if(l)throw m}}}return e},setMaterialListInto:function(t){var e=s.a.deepCopy(t);this.spliceArr(e);for(var i=0;i<e.length;i++){var n=e[i];n.serialNumCus=Number(i)+1,n.num=this.setUnit(n.unitData,n.num,n.unit);var a=0,r=0;for(var o in n.batchInfo){var u=n.batchInfo[o];u.serialNumCus="批次 "+(Number(o)+1),u.timeCus=this.timeConversion(u.productionTime),u.priceAndName=u.purchasePrice+"元/"+u.purchaseUnitName,u.outMatNumCus=this.setUnit(n.unitData,u.num,n.selectUnitName),u.intoNumDetail=this.setUnit(n.unitData,u.intoNum,n.unit),u.consumeNumDetail=this.setUnit(n.unitData,u.consumeNum,n.unit),a+=Number(this.setUnitNum(n.unitData,u.intoNum,n.unit)),r+=Number(this.setUnitNum(n.unitData,u.consumeNum,n.unit))}n.intoNum=a+n.unit,n.consumeNum=r+n.unit,n.wName=n.newWname;var c=!0,l=!1,m=void 0;try{for(var d,h=n.newArea[Symbol.iterator]();!(c=(d=h.next()).done);c=!0){var v=d.value;v.id==n.areaId&&(n.aName=v.areaName)}}catch(t){l=!0,m=t}finally{try{!c&&h.return&&h.return()}finally{if(l)throw m}}}return e},setUnitNum:function(t,e,i){var n=0,a=!0,r=!1,s=void 0;try{for(var o,u=t[Symbol.iterator]();!(a=(o=u.next()).done);a=!0){var c=o.value;c.name==i&&(n=Number(e)/Number(c.value))}}catch(t){r=!0,s=t}finally{try{!a&&u.return&&u.return()}finally{if(r)throw s}}return n},setUnit:function(t,e,i){var n=0,a=!0,r=!1,s=void 0;try{for(var o,u=t[Symbol.iterator]();!(a=(o=u.next()).done);a=!0){var c=o.value;c.name==i&&(n=Number(e)/Number(c.value)+i)}}catch(t){r=!0,s=t}finally{try{!a&&u.return&&u.return()}finally{if(r)throw s}}return n},timeConversion:function(t,e){return e?s.a.format(new Date(1e3*t),"yyyy-MM-dd hh:mm:ss"):s.a.format(new Date(1e3*t),"yyyy-MM-dd")}}},c=(i("6d23"),i("7610")),l=Object(c.a)(u,n,[],!1,null,"764ad2a6",null);l.options.__file="src\\module\\invoicing_system\\warehouse_manage\\operation_detail.vue";e.default=l.exports},"6d23":function(t,e,i){"use strict";var n=i("fd0c");i.n(n).a},fd0c:function(t,e,i){}}]);