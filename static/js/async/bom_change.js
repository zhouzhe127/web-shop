(window.webpackJsonp=window.webpackJsonp||[]).push([["bom_change"],{"4e12":function(t,e,i){"use strict";var s=i("b9ed");i.n(s).a},b9ed:function(t,e,i){},e863:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"create-bom"}},[i("div",{staticClass:"scroll-box"},[t.addWlShow?t._e():[i("div",{staticClass:"create"},[t._v("修改BOM单")]),t._v(" "),i("div",{staticClass:"store-content"},[i("div",{staticClass:"store-list"},[i("label",{staticClass:"store-name required"},[t._v("创建人")]),t._v(" "),i("span",{staticClass:"word"},[t._v(t._s(t.createName))])]),t._v(" "),i("div",{staticClass:"store-list"},[i("label",{staticClass:"store-name required"},[t._v("BOM单类型")]),t._v(" "),i("div",{staticClass:"tab-box",on:{click:t.tabClick}},[i("span",{class:{active:1==t.isPublic},attrs:{"data-index":"1"}},[t._v("公开")]),t._v(" "),i("span",{class:{active:-1==t.isPublic},attrs:{"data-index":"-1"}},[t._v("私密")])])]),t._v(" "),i("div",{staticClass:"store-list"},[i("label",{staticClass:"store-name"},[t._v("BOM单编号")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.bomNum,expression:"bomNum"}],staticClass:"store-input",attrs:{type:"text",placeholder:"请输入BOM单编号",maxlength:"20"},domProps:{value:t.bomNum},on:{input:[function(e){e.target.composing||(t.bomNum=e.target.value)},t.codeInput],propertychange:t.codeInput}}),t._v(" "),t._m(0)]),t._v(" "),i("div",{staticClass:"store-list"},[i("label",{staticClass:"store-name required"},[t._v("商品名称")]),t._v(" "),i("div",{staticClass:"word"},[t._v("\n\t\t\t\t\t\t"+t._s(t.goodsName)+"\n\t\t\t\t\t")])]),t._v(" "),i("div",{staticClass:"store-list"},[i("label",{staticClass:"store-name required"},[t._v("自动消耗")]),t._v(" "),i("div",{staticClass:"shared-box"},[i("on-off",{attrs:{status:t.isAutoBool},on:{statusChange:t.getAuto}})],1)]),t._v(" "),i("div",{staticClass:"store-list"},[i("label",{staticClass:"store-name required"},[t._v("库存可以为负数")]),t._v(" "),i("div",{staticClass:"shared-box"},[i("on-off",{attrs:{status:t.isOversoldBool},on:{statusChange:t.getOversold}})],1)]),t._v(" "),i("div",{staticClass:"store-list"},[i("label",{staticClass:"store-name"},[t._v("备注")]),t._v(" "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.remark,expression:"remark"}],staticClass:"text-area",attrs:{placeholder:"请输入备注信息",maxlength:"40"},domProps:{value:t.remark},on:{input:function(e){e.target.composing||(t.remark=e.target.value)}}}),t._v(" "),t._m(1)]),t._v(" "),i("div",{staticClass:"store-list"},[i("label",{staticClass:"store-name required"},[t._v("物料消耗")]),t._v(" "),i("div",{staticClass:"add-blong",on:{click:t.addWlClick}},[i("em",{staticClass:"img-span"}),t._v("添加物料\n\t\t\t\t\t")])])]),t._v(" "),t.wlListEach.length?i("div",{staticClass:"consume-list"},[i("div",{staticClass:"head"},[t._v("物料消耗列表 · 共\n\t\t\t\t\t"),i("em",[t._v(t._s(t.wlListEach.length))]),t._v(" 个条目")]),t._v(" "),i("div",{staticClass:"list"},[t._m(2),t._v(" "),t._l(t.wlListEach,function(e,s){return i("div",{key:s,staticClass:"item",attrs:{"data-index":s},on:{click:t.listHandle}},[i("div",{staticClass:"unit select-ban"},[e.id?i("em",{staticClass:"handle-btn delete deletePre",class:{ban:t.wlListEach.length<=1},attrs:{"data-id":e.id}},[t._v("删除")]):t._e(),t._v(" "),e.id?t._e():i("em",{staticClass:"handle-btn delete",class:{ban:t.wlListEach.length<=1},attrs:{"data-mid":e.mid}},[t._v("删除")]),t._v(" "),i("em",{staticClass:"handle-btn sort"},[t._v("仓库消耗排序")])]),t._v(" "),i("div",{staticClass:"unit pad"},[t._v("\n\t\t\t\t\t\t\t"+t._s(e.name)+"\n\t\t\t\t\t\t")]),t._v(" "),i("div",{staticClass:"unit"},[i("select-btn",{staticClass:"select-btn",attrs:{sorts:e.unitName,index:e.unitIndex,width:90},on:{emit:t.selectUnit}})],1),t._v(" "),i("div",{staticClass:"unit wide"},[e.def?[i("div",{staticClass:"input-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.defNum,expression:"item.defNum"}],attrs:{type:"text",placeholder:"输入数字",maxlength:"10"},domProps:{value:e.defNum},on:{input:function(i){i.target.composing||t.$set(e,"defNum",i.target.value)}}}),t._v(" "),i("em",{attrs:{title:e.def}},[t._v(t._s(e.def))])])]:t._e(),t._v(" "),e.def&&e.min?i("span",[t._v(" + ")]):t._e(),t._v(" "),e.min?[i("div",{staticClass:"input-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.minNum,expression:"item.minNum"}],attrs:{type:"text",placeholder:"输入数字",maxlength:"10"},domProps:{value:e.minNum},on:{input:function(i){i.target.composing||t.$set(e,"minNum",i.target.value)}}}),t._v(" "),i("em",{attrs:{title:e.min}},[t._v(t._s(e.min))])])]:t._e()],2),t._v(" "),i("div",{staticClass:"unit pad"},[t._v("\n\t\t\t\t\t\t\t"+t._s(e.wids.length)+"\n\t\t\t\t\t\t")])])})],2)]):t._e(),t._v(" "),i("div",{staticClass:"store-content"},[i("div",{staticClass:"bottom-btn"},[i("div",{staticClass:"gray cancel-btn",on:{click:t.cancel}},[t._v("取消")]),t._v(" "),i("div",{staticClass:"yellow ok-btn",on:{click:t.confirm}},[t._v("确定")])])]),t._v(" "),i(t.showWin,{tag:"component",attrs:{winOpen:t.sortSend,pGoodsList:t.sortSend},on:{emit:t.getSortArr,throwGoodListWin:t.getSelectGoods}})],t._v(" "),t.addWlShow?i("add-material",{attrs:{sleSupplies:t.sleSupplies},on:{select:t.getWlSelect}}):t._e()],2)])};s._withStripped=!0;var n=i("81a2"),a=i("bbb9"),r=i("05dd"),o=i("f6ce");function l(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function s(n,a){try{var r=e[n](a),o=r.value}catch(t){return void i(t)}if(!r.done)return Promise.resolve(o).then(function(t){s("next",t)},function(t){s("throw",t)});t(o)}("next")})}}var u={data:function(){return{bomId:"",createUid:"",createName:"",detail:[],param:{gid:""},tips:{gid:"请选择商品"},bomNum:"",materialInfo:"",remark:"",page:1,wid:"",gList:[],goodsList:[],goodsEnd:!1,goodsName:"",goodsType:"",timerId:"",sortSend:{},showWin:null,type:1,ownerName:"",isBrand:0,isPublic:1,isAuto:1,isAutoBool:!0,isOversold:1,isOversoldBool:!0,booleanShared:!0,isShared:1,addWlShow:!1,index:0,wlList:[],wlListEach:[],wlListEachPrev:[],warehouse:[],sendWlList:[],alreadyGoods:[],isVeryLarge:!1,bidArr:[],isClick:!1}},created:function(){this.userData=o.a.session("userShop")},mounted:function(){this.initData(),this.getWarehouseList()},components:{selectBtn:function(){return i.e("select_btn").then(i.bind(null,"3d41"))},onOff:function(){return i.e("on_off").then(i.bind(null,"034b"))},addMaterial:function(){return i.e("output_select_supplies").then(i.bind(null,"0c3f"))},warehouseSort:function(){return i.e("bom_create_sort").then(i.bind(null,"a987"))},goodsPackage:function(){return Promise.all([i.e("goods_package_win"),i.e("good_package_win")]).then(i.bind(null,"f163"))}},methods:{initData:function(){var t=this.$route.query.id;this.bomId=t,this.getBomDetail()},getWarehouseList:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.warehouseWarehouseList();case 2:i=e.sent,t.warehouse=i;case 4:case"end":return e.stop()}},e,t)}))()},bomEdit:function(t){var e=this;return l(regeneratorRuntime.mark(function i(){var s;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(!e.isClick){i.next=3;break}return e.$store.commit("setWin",{title:"温馨提示",content:"请勿重复点击"}),i.abrupt("return");case 3:return e.isClick=!0,s=null,i.prev=5,i.next=8,n.a.bomBillmaterialEditBom({data:t},!0);case 8:s=i.sent,i.next=15;break;case 11:i.prev=11,i.t0=i.catch(5),e.$store.commit("setWin",{title:"错误提示",content:i.t0.error.message}),e.isClick=!1;case 15:s&&e.$store.commit("setWin",{title:"温馨提示",content:"BOM修改成功",callback:function(){e.$router.push({path:"/admin/bomList",query:e.$route.query})}});case 16:case"end":return i.stop()}},i,e,[[5,11]])}))()},getBomDetail:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.BillmaterialGetBomDetail({data:{bid:t.bomId}});case 2:i=e.sent,t.wlListEachPrev=t.setChangeBom(i),t.wlListEach=a.a.deepCopy(t.wlListEachPrev);case 5:case"end":return e.stop()}},e,t)}))()},getBomListByShopId:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i,s,a,r,o,l,u,c,d,m,v,h,f,p;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.getBomListByShopId();case 2:i=e.sent,s=[],a=!0,r=!1,o=void 0,e.prev=7,l=i[Symbol.iterator]();case 9:if(a=(u=l.next()).done){e.next=33;break}for(c=u.value,d=!0,m=!1,v=void 0,e.prev=14,h=t.goodsList[Symbol.iterator]();!(d=(f=h.next()).done);d=!0)p=f.value,c!=p.id&&1!=p.isInvoicing&&s.push(p);e.next=22;break;case 18:e.prev=18,e.t0=e.catch(14),m=!0,v=e.t0;case 22:e.prev=22,e.prev=23,!d&&h.return&&h.return();case 25:if(e.prev=25,!m){e.next=28;break}throw v;case 28:return e.finish(25);case 29:return e.finish(22);case 30:a=!0,e.next=9;break;case 33:e.next=39;break;case 35:e.prev=35,e.t1=e.catch(7),r=!0,o=e.t1;case 39:e.prev=39,e.prev=40,!a&&l.return&&l.return();case 42:if(e.prev=42,!r){e.next=45;break}throw o;case 45:return e.finish(42);case 46:return e.finish(39);case 47:t.goodsList=s;case 48:case"end":return e.stop()}},e,t,[[7,35,39,47],[14,18,22,30],[23,,25,29],[40,,42,46]])}))()},setChangeBom:function(t){for(var e in t)"gid"==e?this.param[e]=t[e]:"gName"==e?this.goodsName=t[e]:"isAuto"==e?(this.isAuto=t[e],this.isAutoBool=1==this.isAuto):"isOversold"==e?(this.isOversold=t[e],this.isOversoldBool=1==this.isOversold):this[e]=t[e];var i=[],s=!0,n=!1,a=void 0;try{for(var r,o=t.detail[Symbol.iterator]();!(s=(r=o.next()).done);s=!0){var l=r.value,u={id:l.id,wids:l.wids.split(","),mid:l.mid,unit:l.unit,name:l.mName,minId:l.minUnit,defId:l.consumeUnit,isPrev:!0},c=this.editUnit(l);for(var d in c)u[d]=c[d];i.push(u)}}catch(t){n=!0,a=t}finally{try{!s&&o.return&&o.return()}finally{if(n)throw a}}return i},editUnit:function(t){var e="",i="",s=1,n=0,a=[];for(var o in t.unit){var l=t.unit[o];a.push(l.name),t.minUnit==t.consumeUnit&&t.minUnit==l.muId&&(e=l.name,i=l.name,s=l.value,n=o),t.minUnit!=t.consumeUnit&&(t.minUnit==l.muId&&(e=l.name),t.consumeUnit==l.muId&&(i=l.name,s=l.value,n=o))}var u,c,d=r.a.comUnit(t.consumeNum,s,i,e,!0);return c=d.oNull||0,u=d.tNull||0,i=d.oNull?i:"",{minNum:u,defNum:c,min:e=d.tNull?e:"",def:i,unitName:a,value:s,consumeNum:t.consumeNum,unitIndex:n}},cancel:function(){o.a.session("bomListDestroy",!0),this.$router.push({path:"bomDetail",query:this.$route.query})},confirm:function(){if(this.checkForm()){var t=this.formatData();if(this.isVeryLarge)return this.$store.commit("setWin",{title:"温馨提示",content:"物料消耗量数量太大"}),!1;this.bomEdit(t)}},getAuto:function(t){this.isAutoBool=t,this.isAuto=t?1:0},getOversold:function(t){this.isOversoldBool=t,this.isOversold=t?1:0},openGoods:function(){this.$store.commit("setWin",{title:"提示信息",content:"关联过的商品无法修改"})},getSelectGoods:function(t,e){"ok"==t?e.goodArr.length?(this.param.gid=e.goodArr[0].id,this.goodsName=e.goodArr[0].goodsName,this.goodsType=e.goodArr[0].type,this.showWin=null):this.$store.commit("setWin",{title:"提示信息",content:"请选择要关联的商品"}):this.showWin=null},setGoodsList:function(){var t=a.a.deepCopy(this.goodsList),e=!0,i=!1,s=void 0;try{for(var n,r=t[Symbol.iterator]();!(e=(n=r.next()).done);e=!0){var o=n.value;o.id=o.id,o.goodsName=o.goodsName,o.cids=o.cids}}catch(t){i=!0,s=t}finally{try{!e&&r.return&&r.return()}finally{if(i)throw s}}return t},selectUnit:function(t){var e=this.wlListEach[this.index],i=e.unit[t],s=e.min,n=e.def;if(1==i.isMin?(s=i.name,e.minId=i.muId,n=i.name,e.defId=i.muId):(n=i.name,e.defId=i.muId),e.value=i.value,e.isPrev){var a=r.a.comUnit(e.consumeNum,i.value,n,s,!0);e.defNum=a.oNull||0,e.minNum=a.tNull||0,e.def=a.oNull?n:"",e.min=a.tNull?s:""}else n==s?(e.def="",e.defNum=""):e.def=n,e.min=s},addWlClick:function(){var t=[],e=!0,i=!1,s=void 0;try{for(var n,a=this.wlListEachPrev[Symbol.iterator]();!(e=(n=a.next()).done);e=!0){var r={id:n.value.mid,noPrev:!0};t.push(r)}}catch(t){i=!0,s=t}finally{try{!e&&a.return&&a.return()}finally{if(i)throw s}}this.sleSupplies=t.concat.apply(t,function(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}(this.wlList)),this.addWlShow=!0},getWlSelect:function(t){t&&(this.wlList=t,this.setWlList()),this.addWlShow=!1},setWlList:function(){var t,e=[],i=!0,s=!1,n=void 0;try{for(var a,r=this.wlList[Symbol.iterator]();!(i=(a=r.next()).done);i=!0){var o=a.value,l={wids:[],mid:o.id,unit:o.unit,name:o.name,minNum:0,defNum:0},u=this.unitConv(o);for(var c in u)l[c]=u[c];e.push(l)}}catch(t){s=!0,n=t}finally{try{!i&&r.return&&r.return()}finally{if(s)throw n}}this.wlListEach=(t=this.wlListEachPrev).concat.apply(t,e)},unitConv:function(t){var e=[],i=0,s="",n="",a="",r="",o=1;for(var l in t.unit){var u=t.unit[l];e.push(u.name),1==u.isMin?(n=u.name,a=u.muId,1==u.isDefault&&(r=u.muId,i=l)):1==u.isDefault&&(s=u.name,r=u.muId,o=u.value,i=l)}return{unitName:e,min:n,minId:a,def:s,defId:r,value:o,uninIndex:i,id:0}},unitComp:function(){var t=[],e=!0,i=!1,s=void 0;try{for(var n,a=this.wlListEach[Symbol.iterator]();!(e=(n=a.next()).done);e=!0){var r=n.value,o=Number(r.minNum)+Number(r.defNum*r.value);this.isVeryLarge=o>999999999;var l={mid:r.mid,consumeUnit:r.defId,consumeNum:o,wids:r.wids.join(","),minUnit:r.minId,id:r.id};t.push(l)}}catch(t){i=!0,s=t}finally{try{!e&&a.return&&a.return()}finally{if(i)throw s}}return JSON.stringify(t)},listHandle:function(t){var e=t.target;this.index=t.currentTarget.getAttribute("data-index");var i=e.className;if(i.includes("delete"))if(this.wlListEach.length<=1)this.$store.commit("setWin",{title:"提示信息",content:"物料消耗不能为空"});else if(i.includes("deletePre")){var s=e.getAttribute("data-id"),n=!0,a=!1,r=void 0;try{for(var o,l=this.wlListEach[Symbol.iterator]();!(n=(o=l.next()).done);n=!0){var u=o.value;u.id==s&&(this.bidArr.push(u.id),this.deletePrevList(s))}}catch(t){a=!0,r=t}finally{try{!n&&l.return&&l.return()}finally{if(a)throw r}}}else{var c=e.getAttribute("data-mid");this.deleteList(this.wlListEach,c,"mid"),this.deleteList(this.wlListEachPrev,c,"mid"),this.deleteList(this.wlList,c,"id")}else i.includes("sort")&&(this.showWin="warehouseSort",this.sortSend={list:this.warehouse,widList:this.wlListEach[this.index].wids})},deletePrevList:function(t){this.deleteList(this.wlListEach,t,"id"),this.deleteList(this.wlListEachPrev,t,"id"),this.deleteList(this.wlList,t,"id")},deleteList:function(t,e,i){for(var s in t)t[s][i]==e&&t.splice(s,1)},getSortArr:function(t){t&&(this.wlListEach[this.index].wids=t),this.showWin=null},tabClick:function(t){var e=t.target;if("span"==e.tagName.toLocaleLowerCase()){var i=e.getAttribute("data-index");this.isPublic=i}},codeInput:function(t){var e=t.target.value;(e=e.replace(/[^A-Za-z0-9]/g,"")).length>20&&(e=e.substr(0,20)),this.bomNum=e,t.target.value=e},checkForm:function(){for(var t in this.tips)if(this.param[t]=this.param[t].trim(),0==this.param[t].length){var e=this.tips[t];return this.$store.commit("setWin",{title:"温馨提示",content:e}),!1}if(!this.wlListEach.length)return this.$store.commit("setWin",{title:"温馨提示",content:"请选择物料消耗"}),!1;for(var i in this.wlListEach){var s=this.wlListEach[i],n=Number(s.defNum),a=Number(s.minNum);if(0==s.wids.length)return this.checkTips(s.name,"请选择仓库消耗排序");if(isNaN(n)||isNaN(a))return this.checkTips(s.name,"物料消耗量必须为数字"),!1;if(n+a<=0)return this.checkTips(s.name,"物料消耗量必须大于0")}return!0},checkTips:function(t,e){var i="("+t+") "+e;return this.$store.commit("setWin",{title:"温馨提示",content:i}),!1},formatData:function(){return this.materialInfo=this.unitComp(),{id:this.bomId,createUid:this.createUid,isPublic:this.isPublic,gid:this.param.gid,isAuto:this.isAuto,isOversold:this.isOversold,type:this.goodsType,bomNum:this.bomNum,remark:this.remark,materialInfo:this.materialInfo,bids:this.bidArr.join(",")}}}},c=(i("4e12"),i("7610")),d=Object(c.a)(u,s,[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"font-limit"},[e("em"),this._v("限20字以内,数字/字母\n\t\t\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"font-limit"},[e("em"),this._v("限40字以内\n\t\t\t\t\t")])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"title"},[i("span",[t._v("操作")]),t._v(" "),i("span",[t._v("物料名称")]),t._v(" "),i("span",[t._v("消耗单位")]),t._v(" "),i("span",{staticClass:"wide"},[t._v("消耗量(一份商品)")]),t._v(" "),i("span",[t._v("已选仓库数")])])}],!1,null,"43babf8f",null);d.options.__file="src\\module\\invoicing_system\\invoicing\\bom_change.vue";e.default=d.exports}}]);