(window.webpackJsonp=window.webpackJsonp||[]).push([["enter_goods"],{7755:function(t,e,s){},cd0c:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"output-shipper"}},[s("div",{staticClass:"scroll-box"},[s("div",{staticClass:"head-line"},[t._v("入货")]),t._v(" "),s("div",{staticClass:"detail"},[s("div",{staticClass:"block"},[s("div",{staticClass:"item"},[s("span",[t._v("调度单号：")]),t._v(t._s(t.details.receiptNumber)+"\n\t\t\t\t\t")]),t._v(" "),s("div",{staticClass:"item"},[s("span",[t._v("调度状态：")]),t._v(t._s(t.allStatus[t.details.dynamic])+"\n\t\t\t\t\t")]),t._v(" "),s("div",{staticClass:"item ware"},[s("span",[t._v("入货仓库：")]),t._v(" "),s("p",[t._v(t._s(t.details.intoWname)),s("em",{on:{click:function(e){t.openWareWin(t.details.intoWarehouse)}}})])]),t._v(" "),s("div",{staticClass:"item ware"},[s("span",[t._v("出货仓库：")]),t._v(" "),s("p",[t._v(t._s(t.details.outWname)),s("em",{on:{click:function(e){t.openWareWin(t.details.outWarehouse)}}})])])]),t._v(" "),s("div",{staticClass:"block"},[s("div",{staticClass:"item"},[s("span",[t._v("创建时间：")]),t._v(t._s(t.timeConversion(t.details.createTime,1))+"\n\t\t\t\t\t")]),t._v(" "),s("div",{staticClass:"item"},[s("span",[t._v("创建人：")]),t._v(t._s(t.details.createName)+"\n\t\t\t\t\t")]),t._v(" "),s("div",{staticClass:"item narrow"},[s("span",[t._v("原因：")]),t._v(t._s(t.details.cause||"--")+"\n\t\t\t\t\t")]),t._v(" "),s("div",{staticClass:"item narrow"},[s("span",[t._v("备注：")]),t._v(t._s(t.details.remark||"--")+"\n\t\t\t\t\t")])]),t._v(" "),s("div",{staticClass:"block"},[s("div",{staticClass:"item"},[s("span",[t._v("出货时间：")]),t._v(t._s(t.operate.time)+"\n\t\t\t\t\t")]),t._v(" "),s("div",{staticClass:"item"},[s("span",[t._v("出货人：")]),t._v(t._s(t.operate.name)+"\n\t\t\t\t\t")])])]),t._v(" "),s("div",{staticClass:"tab-box"},[s("span",{class:{active:0==t.tabIndex},on:{click:function(e){t.tabIndex=0}}},[t._v("商品")]),t._v(" "),s("span",{class:{active:1==t.tabIndex},on:{click:function(e){t.tabIndex=1}}},[t._v("物料")])]),t._v(" "),0==t.tabIndex?s("div",{staticClass:"consume-list"},[s("div",{staticClass:"head"},[t._v("商品列表 · 共 "),s("em",[t._v(t._s(t.enterGoods.success.list.length))]),t._v(" 个条目")]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"scroll-box"},[s("div",{staticClass:"title"},[s("span",{staticClass:"narrow"},[t._v("操作")]),t._v(" "),s("span",[t._v("商品名称")]),t._v(" "),s("span",[t._v("出货数量")]),t._v(" "),s("span",[t._v("已入货")]),t._v(" "),s("span",[t._v("已耗损")]),t._v(" "),s("span",[t._v("入货"),s("em",{staticClass:"select-ban",on:{click:function(e){t.surplusAll("goods","into")}}},[t._v("剩余全部")])]),t._v(" "),s("span",[t._v("耗损"),s("em",{staticClass:"select-ban",on:{click:function(e){t.surplusAll("goods","consume")}}},[t._v("剩余全部")])]),t._v(" "),s("span",{staticClass:"ware"},[t._v("入货仓库")])]),t._v(" "),t._l(t.enterGoods.success.list,function(e,n){return s("div",{key:n,staticClass:"item",attrs:{"data-index":n},on:{click:t.goodsHandle}},[s("div",{staticClass:"unit narrow"},[e.isSurplus?[s("em",{staticClass:"handle-btn sel-batch select-ban"},[t._v("选择批次")])]:[s("em",{staticClass:"handle-btn init-end select-ban"},[t._v("入货完毕")])]],2),t._v(" "),s("div",{staticClass:"unit",attrs:{title:e.name}},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"unit"},[t._v(t._s(e.outNum)+t._s(e.unit))]),t._v(" "),s("div",{staticClass:"unit"},[t._v(t._s(e.overIntoNum)+t._s(e.unit))]),t._v(" "),s("div",{staticClass:"unit"},[t._v(t._s(e.overConsumeNum)+t._s(e.unit))]),t._v(" "),s("div",{staticClass:"unit"},[e.isSurplus?[s("div",{staticClass:"input-box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.intoNum,expression:"item.intoNum"}],attrs:{type:"text",placeholder:"输入数字",disabled:e.haveBatch,maxlength:"10"},domProps:{value:e.intoNum},on:{input:[function(s){s.target.composing||t.$set(e,"intoNum",s.target.value)},function(s){t.intoInput(e,"into")}]}}),t._v(" "),s("em",[t._v(t._s(e.unit))])])]:[t._v("--")]],2),t._v(" "),s("div",{staticClass:"unit"},[e.isSurplus?[s("div",{staticClass:"input-box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.consumeNum,expression:"item.consumeNum"}],attrs:{type:"text",placeholder:"输入数字",disabled:e.haveBatch,maxlength:"10"},domProps:{value:e.consumeNum},on:{input:[function(s){s.target.composing||t.$set(e,"consumeNum",s.target.value)},function(s){t.intoInput(e,"consume")}]}}),t._v(" "),s("em",[t._v(t._s(e.unit))])])]:[t._v("--")]],2),t._v(" "),s("div",{staticClass:"unit ware"},[s("span",[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(e.warehouse)),e.wArea?[t._v("-"+t._s(e.wArea))]:t._e(),t._v(" "),e.isSurplus?[s("em",{staticClass:"change-ware"})]:t._e()],2)])])}),t._v(" "),t._l(t.enterGoods.error,function(e,n){return s("div",{key:n,staticClass:"item error"},[t._m(0,!0),t._v(" "),s("div",{staticClass:"unit",attrs:{title:e.itemName}},[t._v(t._s(e.itemName))]),t._v(" "),s("div",{staticClass:"unit reason",attrs:{title:e.reason}},[t._v("\n\t\t\t\t\t\t\t\t失败原因：\n\t\t\t\t\t\t\t\t"),s("div",{staticClass:"error-icon"},[t._v("!")]),t._v("\n\t\t\t\t\t\t\t\t"+t._s(e.reason)+"\n\t\t\t\t\t\t\t")])])}),t._v(" "),t.enterGoods.success.list.length||t.enterGoods.error.length?t._e():s("div",{staticClass:"empty"},[t._v("- 暂无条目 -")])],2)])]):t._e(),t._v(" "),1==t.tabIndex?s("div",{staticClass:"consume-list"},[s("div",{staticClass:"head"},[t._v("物料列表 · 共 "),s("em",[t._v(t._s(t.enterMaterial.success.list.length))]),t._v(" 个条目")]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"scroll-box"},[s("div",{staticClass:"title"},[s("span",{staticClass:"narrow"},[t._v("操作")]),t._v(" "),s("span",[t._v("物料名称")]),t._v(" "),s("span",[t._v("出货数量")]),t._v(" "),s("span",[t._v("已入货")]),t._v(" "),s("span",[t._v("已耗损")]),t._v(" "),s("span",[t._v("入货"),s("em",{staticClass:"select-ban",on:{click:function(e){t.surplusAll("mat","into")}}},[t._v("剩余全部")])]),t._v(" "),s("span",[t._v("耗损"),s("em",{staticClass:"select-ban",on:{click:function(e){t.surplusAll("mat","consume")}}},[t._v("剩余全部")])]),t._v(" "),s("span",{staticClass:"ware"},[t._v("入货仓库")])]),t._v(" "),t._l(t.enterMaterial.success.list,function(e,n){return s("div",{key:n,staticClass:"item",attrs:{"data-index":n},on:{click:t.materialHandle}},[s("div",{staticClass:"unit narrow"},[e.isSurplus?[s("em",{staticClass:"handle-btn sel-batch select-ban"},[t._v("选择批次")])]:[s("em",{staticClass:"handle-btn init-end select-ban"},[t._v("入货完毕")])]],2),t._v(" "),s("div",{staticClass:"unit",attrs:{title:e.name}},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"unit"},[t._v(t._s(e.outNumShow)+t._s(e.unit))]),t._v(" "),s("div",{staticClass:"unit"},[t._v(t._s(e.overIntoNumShow)+t._s(e.unit))]),t._v(" "),s("div",{staticClass:"unit"},[t._v(t._s(e.overConsumeNumShow)+t._s(e.unit))]),t._v(" "),s("div",{staticClass:"unit"},[e.isSurplus?[s("div",{staticClass:"input-box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.intoNum,expression:"item.intoNum"}],attrs:{type:"text",placeholder:"输入数字",disabled:e.haveBatch,maxlength:"10"},domProps:{value:e.intoNum},on:{input:[function(s){s.target.composing||t.$set(e,"intoNum",s.target.value)},function(s){t.intoInput(e,"into")}]}}),t._v(" "),s("em",[t._v(t._s(e.unit))])])]:[t._v("--")]],2),t._v(" "),s("div",{staticClass:"unit"},[e.isSurplus?[s("div",{staticClass:"input-box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.consumeNum,expression:"item.consumeNum"}],attrs:{type:"text",placeholder:"输入数字",disabled:e.haveBatch,maxlength:"10"},domProps:{value:e.consumeNum},on:{input:[function(s){s.target.composing||t.$set(e,"consumeNum",s.target.value)},function(s){t.intoInput(e,"consume")}]}}),t._v(" "),s("em",[t._v(t._s(e.unit))])])]:[t._v("--")]],2),t._v(" "),s("div",{staticClass:"unit ware"},[s("span",[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(e.warehouse)),e.wArea?[t._v("-"+t._s(e.wArea))]:t._e(),t._v(" "),e.isSurplus?[s("em",{staticClass:"change-ware"})]:t._e()],2)])])}),t._v(" "),t._l(t.enterMaterial.error,function(e,n){return s("div",{key:n,staticClass:"item error"},[t._m(1,!0),t._v(" "),s("div",{staticClass:"unit",attrs:{title:e.name}},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"unit reason",attrs:{title:e.reason}},[t._v("\n\t\t\t\t\t\t\t\t失败原因：\n\t\t\t\t\t\t\t\t"),s("div",{staticClass:"error-icon"},[t._v("!")]),t._v("\n\t\t\t\t\t\t\t\t"+t._s(e.reason)+"\n\t\t\t\t\t\t\t")])])}),t._v(" "),t.enterMaterial.success.list.length||t.enterMaterial.error.length?t._e():s("div",{staticClass:"empty"},[t._v("- 暂无条目 -")])],2)])]):t._e(),t._v(" "),s(t.showWareWin,{tag:"component",attrs:{wid:t.wareId,width:500,height:200,errorList:t.errorList},on:{winEvent:t.wareWin,errorEmit:t.errorEmit}})],1),t._v(" "),t.wareShow?s("warehouse-win",{attrs:{title:"选择仓库-区域",wid:t.chooseWare,shopId:t.intoShopId,isBrand:t.intoIsBrand,areaId:t.chooseArea},on:{wareEvent:t.wareEvent}}):t._e(),t._v(" "),t.batchShow?s("goods-batch",{attrs:{goods:t.goodsItem,material:t.materialItem,selGoods:t.selGoodsBatch,selMat:t.selMatBatch,type:t.batchType},on:{goods:t.goodsWinClose,mat:t.materialWinClose}}):t._e()],1)};n._withStripped=!0;var a=s("81a2"),i=s("f6ce"),r=s("bbb9"),o=function(){return function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var s=[],n=!0,a=!1,i=void 0;try{for(var r,o=t[Symbol.iterator]();!(n=(r=o.next()).done)&&(s.push(r.value),!e||s.length!==e);n=!0);}catch(t){a=!0,i=t}finally{try{!n&&o.return&&o.return()}finally{if(a)throw i}}return s}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();function u(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,s){return function n(a,i){try{var r=e[a](i),o=r.value}catch(t){return void s(t)}if(!r.done)return Promise.resolve(o).then(function(t){n("next",t)},function(t){n("throw",t)});t(o)}("next")})}}function c(t){if(Array.isArray(t)){for(var e=0,s=Array(t.length);e<t.length;e++)s[e]=t[e];return s}return Array.from(t)}var l={data:function(){return{showWareWin:null,details:{},allStatus:{1:"未出货",2:"待入货",3:"调度中",4:"已取消",5:"已完成",6:"已完成(异常)"},outWareId:"",detailObj:{},outGoods:[],outMaterial:[],enterList:[],enterGoods:{error:[],success:{list:[]}},enterMaterial:{error:[],success:{list:[]}},selGoodsBatch:[],selMatBatch:[],goodsItem:{},materialItem:{},batchType:0,listIndex:0,operate:{name:"",time:""},wareId:"",tabIndex:0,dispatchId:"",batchShow:!1,wareShow:!1,chooseWare:"",chooseArea:"",handleType:1,exportShopId:"",eachProps:["intoNum","consumeNum"],intoShopId:"",intoIsBrand:!1,isClick:!1,errorList:{goods:[],material:[]}}},components:{warehouseDetail:function(){return s.e("waremessage_win").then(s.bind(null,"39f2"))},goodsBatch:function(){return s.e("enter_goods_batch").then(s.bind(null,"500a"))},errorWin:function(){return s.e("enter_goods_batch").then(s.bind(null,"d2b4"))},warehouseWin:function(){return s.e("warehouse_win_enter").then(s.bind(null,"11fb"))}},mounted:function(){var t=this;this.initBtn(),this.dispatchId=this.$route.query.id,this.init();var e=this.getGoods(),s=this.getMaterial();Promise.all([e,s]).then(function(){t.initTabIndex()})},methods:{initBtn:function(){var t=this;this.btnArr=[{name:"确认",style:"background: #f8931f;border: 1px solid #f8931f;color: #fff;",fn:function(){t.confirm()}},{name:"取消",style:"background: #B3B3B3;border: 1px solid #B3B3B3;color: #fff;",fn:function(){i.a.session("operationRequestDestroy",!0),t.$router.go(-1)}}],this.$store.commit("setPageTools",this.btnArr)},initTabIndex:function(){var t=this.enterGoods.error.length>0||this.enterGoods.success.list.length>0,e=this.enterMaterial.error.length>0||this.enterMaterial.success.list.length>0;!t&&e&&(this.tabIndex=1)},openWareWin:function(t){this.wareId=t,this.showWareWin="warehouseDetail"},wareWin:function(){this.showWareWin=null},surplusAll:function(t,e){if("goods"==t){this.goodsItem.haveBatch=!1;var s=r.a.deepCopy(this.enterGoods.success.list);this.enterGoods.success.list=this.surplusAllCom(s,e,"goods")}else{this.materialItem.haveBatch=!1;var n=r.a.deepCopy(this.enterMaterial.success.list);this.enterMaterial.success.list=this.surplusAllCom(n,e,"mat")}},surplusAllCom:function(t,e,s){for(var n in t){var a=t[n],i=0;"goods"==s?i=1e3*a.outNum-1e3*a.overIntoNum-1e3*a.overConsumeNum:"mat"==s&&(i=1e3*a.outNumShow-1e3*a.overIntoNumShow-1e3*a.overConsumeNumShow),"into"==e?(a.intoNum=(i-1e3*a.consumeNum)/1e3,this.autoGoodsBatch(a,a.intoNum,"intoNum","consumeNum",s)):(a.consumeNum=(i-1e3*a.intoNum)/1e3,this.autoGoodsBatch(a,a.consumeNum,"consumeNum","intoNum",s))}return t},autoGoodsBatch:function(){for(var t=arguments.length,e=Array(t),s=0;s<t;s++)e[s]=arguments[s];var n=o(e,5),a=n[0],i=n[1],r=n[2],u=n[3],c=n[4],l=!0,m=!1,v=void 0;try{for(var d,h=a.batchInfo[Symbol.iterator]();!(l=(d=h.next()).done);l=!0){d.value[r]=""}}catch(t){m=!0,v=t}finally{try{!l&&h.return&&h.return()}finally{if(m)throw v}}var _=!0,p=!1,f=void 0;try{for(var y,b=a.batchInfo[Symbol.iterator]();!(_=(y=b.next()).done);_=!0){var N=y.value,w=0;if(!(i>(w="mat"==c?Number(N.num/a.unitValue)-Number(N[u]):Number(N.num)-Number(N[u])))){N[r]=i;break}N[r]=w,i-=w}}catch(t){p=!0,f=t}finally{try{!_&&b.return&&b.return()}finally{if(p)throw f}}},intoInput:function(t,e){"into"==e?this.autoGoodsBatch(t,t.intoNum,"intoNum","consumeNum"):this.autoGoodsBatch(t,t.consumeNum,"consumeNum","intoNum")},setUnit:function(t,e,s){var n="",a=!0,i=!1,r=void 0;try{for(var o,u=s[Symbol.iterator]();!(a=(o=u.next()).done);a=!0){var c=o.value;if(e==c.name){n=Number(t)/Number(c.value);break}}}catch(t){i=!0,r=t}finally{try{!a&&u.return&&u.return()}finally{if(i)throw r}}return n},confirmVeri:function(t){var e="",s=/^[0-9]*$/,n=/^[0-9]*\.?[0-9]{0,3}$/;return-1==t.gType?e="物料":0==t.gType?e="普通商品":1!=t.gType&&2!=t.gType||(e="称重商品"),isNaN(t.intoNum)||isNaN(t.consumeNum)?(this.myAlert(e+"（"+t.name+"）只能输入数字"),!1):"普通商品"!=e||s.test(t.intoNum)?"普通商品"!=e||s.test(t.consumeNum)?"称重商品"!=e||n.test(t.intoNum)?"称重商品"!=e||n.test(t.consumeNum)?!(1e3*t.intoNum+1e3*t.consumeNum>1e3*t.outNum-1e3*t.overIntoNum-1e3*t.overConsumeNum)||(this.myAlert(e+"（"+t.name+"）可入货数量不足"),!1):(this.myAlert(e+"（"+t.name+"）耗损量只能输入小数点后三位"),!1):(this.myAlert(e+"（"+t.name+"）入货量只能输入小数点后三位"),!1):(this.myAlert(e+"（"+t.name+"）耗损量只能输入整数"),!1):(this.myAlert(e+"（"+t.name+"）入货量只能输入整数"),!1)},confirmVeriMat:function(t){var e=/^[0-9]*\.?[0-9]{0,3}$/;return e.test(t.intoNum)?!!e.test(t.consumeNum)||(this.myAlert("物料（"+t.name+"）耗损量只能输入小数点后三位"),!1):(this.myAlert("物料（"+t.name+"）入货量只能输入小数点后三位"),!1)},confirm:function(){if(this.enterGoods.success.list.length||this.enterMaterial.success.list.length){var t=[],e=0,s=r.a.deepCopy(this.enterGoods.success.list),n=!0,a=!1,i=void 0;try{for(var o,u=s[Symbol.iterator]();!(n=(o=u.next()).done);n=!0){var l=o.value;l.intoNum=Number(l.intoNum),l.consumeNum=Number(l.consumeNum);var m=!0,v=!1,d=void 0;try{for(var h,_=l.batchInfo[Symbol.iterator]();!(m=(h=_.next()).done);m=!0){var p=h.value;p.intoNum=Number(p.intoNum),p.consumeNum=Number(p.consumeNum)}}catch(t){v=!0,d=t}finally{try{!m&&_.return&&_.return()}finally{if(v)throw d}}if(!this.confirmVeri(l))return;e+=l.intoNum+l.consumeNum}}catch(t){a=!0,i=t}finally{try{!n&&u.return&&u.return()}finally{if(a)throw i}}t.push.apply(t,c(s));var f=r.a.deepCopy(this.enterMaterial.success.list),y=!0,b=!1,N=void 0;try{for(var w,g=f[Symbol.iterator]();!(y=(w=g.next()).done);y=!0){var C=w.value,I=r.a.deepCopy(C);if(!this.confirmVeriMat(I))return;C.intoNum=Number(C.intoNum)*C.unitValue,C.consumeNum=Number(C.consumeNum)*C.unitValue;var x=!0,S=!1,W=void 0;try{for(var k,A=C.batchInfo[Symbol.iterator]();!(x=(k=A.next()).done);x=!0){var B=k.value;B.intoNum=Number(B.intoNum)*C.unitValue,B.consumeNum=Number(B.consumeNum)*C.unitValue}}catch(t){S=!0,W=t}finally{try{!x&&A.return&&A.return()}finally{if(S)throw W}}if(!this.confirmVeri(C))return;e+=C.intoNum+C.consumeNum}}catch(t){b=!0,N=t}finally{try{!y&&g.return&&g.return()}finally{if(b)throw N}}t.push.apply(t,c(f)),e<=0?this.myAlert("入货/耗损 数量不能为空"):this.confirmSubmit(t)}else this.myAlert("没有可入货列表")},confirmSubmit:function(t){var e=this;return u(regeneratorRuntime.mark(function s(){var n;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(!e.isClick){s.next=3;break}return e.$message({message:"请勿重复点击",type:"error"}),s.abrupt("return");case 3:return e.isClick=!0,n=null,s.prev=5,s.next=8,a.a.DispatchrecordItemSubmit({data:{id:e.dispatchId,exportShopId:e.exportShopId,importShopId:e.intoShopId,list:t}},!0);case 8:n=s.sent,s.next=15;break;case 11:s.prev=11,s.t0=s.catch(5),e.$message({message:s.t0.error.message,type:"error"}),e.isClick=!1;case 15:"OK"==n?(e.$message({message:"入货成功",type:"success"}),i.a.session("operationRequestDestroy",!0),window.history.go(-1)):n&&(e.showWareWin="errorWin",e.errorList.goods=n.goodsError,e.errorList.material=n.materialError,e.isClick=!1);case 16:case"end":return s.stop()}},s,e,[[5,11]])}))()},init:function(){var t=this;return u(regeneratorRuntime.mark(function e(){var s,n,i,r,o,u,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.getDispatchRecordDetailList({data:{id:t.dispatchId}});case 2:for(s=e.sent,n=!0,i=!1,r=void 0,e.prev=6,o=s.invoiceList[Symbol.iterator]();!(n=(u=o.next()).done);n=!0)1==(c=u.value).type&&(t.operate.name=c.operateUname,t.operate.time=t.timeConversion(c.operateTime,1));e.next=14;break;case 10:e.prev=10,e.t0=e.catch(6),i=!0,r=e.t0;case 14:e.prev=14,e.prev=15,!n&&o.return&&o.return();case 17:if(e.prev=17,!i){e.next=20;break}throw r;case 20:return e.finish(17);case 21:return e.finish(14);case 22:t.details=s,t.outWareId=s.outWarehouse,t.getWareDetail(t.details.intoWarehouse);case 25:case"end":return e.stop()}},e,t,[[6,10,14,22],[15,,17,21]])}))()},getGoods:function(){var t=this;return a.a.DispatchrecordGetGoodsList({data:{id:this.dispatchId}}).then(function(e){var s=!0,n=!1,a=void 0;try{for(var i,r=e.success.list[Symbol.iterator]();!(s=(i=r.next()).done);s=!0){var o=i.value;o.intoNum="",o.consumeNum="";var u=!0,c=!1,l=void 0;try{for(var m,v=o.batchInfo[Symbol.iterator]();!(u=(m=v.next()).done);u=!0){var d=m.value;d.numShow=d.num,d.intoNum="",d.consumeNum=""}}catch(t){c=!0,l=t}finally{try{!u&&v.return&&v.return()}finally{if(c)throw l}}var h=o.outNum-o.overIntoNum-o.overConsumeNum;o.isSurplus=h>0}}catch(t){n=!0,a=t}finally{try{!s&&r.return&&r.return()}finally{if(n)throw a}}t.enterGoods=e,e.success.exportShopId&&(t.exportShopId=e.success.exportShopId)})},getMaterial:function(){var t=this;return a.a.DispatchrecordGetMaterialList({data:{id:this.dispatchId}}).then(function(e){var s=!0,n=!1,a=void 0;try{for(var i,r=e.success.list[Symbol.iterator]();!(s=(i=r.next()).done);s=!0){var o=i.value;o.outNumShow=t.setUnit(o.outNum,o.unit,o.unitData),o.overIntoNumShow=t.setUnit(o.overIntoNum,o.unit,o.unitData),o.overConsumeNumShow=t.setUnit(o.overConsumeNum,o.unit,o.unitData),o.intoNum="",o.consumeNum="";var u=!0,c=!1,l=void 0;try{for(var m,v=o.batchInfo[Symbol.iterator]();!(u=(m=v.next()).done);u=!0){var d=m.value;d.numShow=t.setUnit(d.num,o.unit,o.unitData),d.intoNum="",d.consumeNum=""}}catch(t){c=!0,l=t}finally{try{!u&&v.return&&v.return()}finally{if(c)throw l}}var h=!0,_=!1,p=void 0;try{for(var f,y=o.unitData[Symbol.iterator]();!(h=(f=y.next()).done);h=!0){var b=f.value;if(o.unit==b.name){o.unitValue=Number(b.value);break}}}catch(t){_=!0,p=t}finally{try{!h&&y.return&&y.return()}finally{if(_)throw p}}var N=o.outNum-o.overIntoNum-o.overConsumeNum;o.isSurplus=N>0}}catch(t){n=!0,a=t}finally{try{!s&&r.return&&r.return()}finally{if(n)throw a}}t.enterMaterial=e,e.success.exportShopId&&(t.exportShopId=e.success.exportShopId)})},getWareDetail:function(t){var e=this;return u(regeneratorRuntime.mark(function s(){var n,i,r;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,a.a.warehouseGetWarehouse({data:{id:t}});case 2:n=s.sent,i=n.owner.split(",")[0],0!=(r=n.owner.split(",")[1])?(e.intoShopId=r,e.intoIsBrand=!1):(e.intoShopId=i,e.intoIsBrand=!0);case 6:case"end":return s.stop()}},s,e)}))()},errorEmit:function(t){t&&(this.showWareWin=null,this.$store.commit("setWin",{title:"操作提示",content:"匹配成功的商品或物料，入货成功",callback:function(){i.a.session("operationRequestDestroy",!0),window.history.go(-1)}}))},goodsHandle:function(t){var e=t.target,s=t.currentTarget.getAttribute("data-index"),n=this.enterGoods.success.list[s];e.className.includes("sel-batch")?this.openBatchWinGoods(n,"goods"):e.className.includes("change-ware")&&(this.chooseWare=n.wid,this.chooseArea=n.areaId,this.handleType=1,this.goodsItem=n,this.wareShow=!0),"input"==e.tagName.toLocaleLowerCase()&&"disabled"==e.getAttribute("disabled")&&this.myAlert("请先清空该批次数据,再进行修改")},materialHandle:function(t){var e=t.target,s=t.currentTarget.getAttribute("data-index"),n=this.enterMaterial.success.list[s];e.className.includes("sel-batch")?this.openBatchWinGoods(n,"mat"):e.className.includes("change-ware")&&(this.chooseWare=n.wid,this.chooseArea=n.areaId,this.handleType=2,this.materialItem=n,this.wareShow=!0)},openBatchWinGoods:function(t,e){"goods"==e?(this.batchType=0,this.goodsItem=t,this.selGoodsBatch=r.a.deepCopy(this.goodsItem.batchInfo)):(this.batchType=1,this.materialItem=t,this.selMatBatch=r.a.deepCopy(this.materialItem.batchInfo)),this.batchShow=!0},goodsWinClose:function(t,e){if("ok"==t){this.goodsItem.batchInfo=e;var s=0,n=0,a=!0,i=!1,r=void 0;try{for(var o,u=e[Symbol.iterator]();!(a=(o=u.next()).done);a=!0){var c=o.value;s+=Number(c.intoNum),n+=Number(c.consumeNum)}}catch(t){i=!0,r=t}finally{try{!a&&u.return&&u.return()}finally{if(i)throw r}}this.goodsItem.intoNum=s,this.goodsItem.consumeNum=n,this.goodsItem.haveBatch=s>0||n>0,this.numberVeri(this.goodsItem)}this.batchShow=!1},materialWinClose:function(t,e){if("ok"==t){this.materialItem.batchInfo=e;var s=0,n=0,a=!0,i=!1,r=void 0;try{for(var o,u=e[Symbol.iterator]();!(a=(o=u.next()).done);a=!0){var c=o.value;s+=Number(c.intoNum),n+=Number(c.consumeNum)}}catch(t){i=!0,r=t}finally{try{!a&&u.return&&u.return()}finally{if(i)throw r}}if(this.materialItem.intoNum=s,this.materialItem.consumeNum=n,this.materialItem.haveBatch=s>0||n>0,!this.numberVeri(this.materialItem))return}this.batchShow=!1},numberVeri:function(t){var e=Number(t.outNum)-Number(t.overIntoNum)-Number(t.overConsumeNum);if(Number(t.intoNum)+Number(t.consumeNum)>e){t.noPass=!0;var s="("+t.name+") 剩余可入货数量不足";return this.myAlert(s),!1}return!0},wareEvent:function(t,e){if("ok"==t)if(1==this.handleType)for(var s in e)this.goodsItem[s]=e[s];else for(var n in e)this.materialItem[n]=e[n];this.wareShow=!1},myAlert:function(t){this.$store.commit("setWin",{title:"操作提示",content:t})},listClick:function(t){this.listIndex=t},timeConversion:function(t,e){return e?r.a.format(new Date(1e3*t),"yyyy-MM-dd hh:mm:ss"):r.a.format(new Date(1e3*t),"yyyy年MM月dd日")}}},m=(s("eddc"),s("6ceb")),v=Object(m.a)(l,n,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"unit narrow"},[e("em",{staticClass:"handle-btn error select-ban"},[this._v("匹配失败")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"unit narrow"},[e("em",{staticClass:"handle-btn error select-ban"},[this._v("匹配失败")])])}],!1,null,"589b28c2",null);v.options.__file="src\\module\\invoicing_system\\warehouse_manage\\enter_goods.vue";e.default=v.exports},eddc:function(t,e,s){"use strict";var n=s("7755");s.n(n).a}}]);