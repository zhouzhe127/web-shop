(window.webpackJsonp=window.webpackJsonp||[]).push([["purchase_requisition"],{b60d:function(e,t,i){"use strict";var a=i("c1f7");i.n(a).a},c1f7:function(e,t,i){},f1c5:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"purchase-requisition"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.toggleCom,expression:"toggleCom"}]},[i("div",{staticClass:"content-head"},[e._v("\n            入货申请单\n        ")]),e._v(" "),i("div",{staticClass:"content-body"},[i("div",{staticClass:"list-div"},[e._m(0),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.subObj.reason,expression:"subObj.reason"}],staticClass:"input-txt",attrs:{type:"text",maxlength:"20",placeholder:"请输入原因"},domProps:{value:e.subObj.reason},on:{input:function(t){t.target.composing||e.$set(e.subObj,"reason",t.target.value)}}})]),e._v(" "),e._m(1),e._v(" "),i("div",{staticClass:"list-div"},[e._m(2),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.subObj.code,expression:"subObj.code"}],staticClass:"input-txt",attrs:{type:"text",maxlength:"20",placeholder:"请输入申请单号"},domProps:{value:e.subObj.code},on:{input:function(t){t.target.composing||e.$set(e.subObj,"code",t.target.value)}}})]),e._v(" "),e._m(3),e._v(" "),i("div",{staticClass:"list-div"},[e._m(4),e._v(" "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:e.subObj.remark,expression:"subObj.remark"}],staticClass:"note",attrs:{maxlength:"40",placeholder:"请输入备注"},domProps:{value:e.subObj.remark},on:{input:function(t){t.target.composing||e.$set(e.subObj,"remark",t.target.value)}}})]),e._v(" "),e._m(5),e._v(" "),i("div",{staticClass:"list-div marginB-20"},[e._m(6),e._v(" "),i("div",{staticClass:"blue add-input input-txt",on:{click:function(t){e.openWin("chooseWarehouse")}}},[i("span",{staticClass:"img"}),e._v(" "),i("span",{staticClass:"font"},[e._v("添加仓库")])]),e._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:e.selectStore.id,expression:"selectStore.id"}],staticClass:"select-tips"},[e._v("(已选择的仓库 : "+e._s(e.selectStore.name)+")")])]),e._v(" "),i("div",{staticClass:"list-div marginB-20"},[e._m(7),e._v(" "),i("div",{staticClass:"blue add-input input-txt",on:{click:function(t){e.openWin("goods")}}},[i("span",{staticClass:"img"}),e._v(" "),i("span",{staticClass:"font"},[e._v("添加商品")])])]),e._v(" "),i("div",{staticClass:"list-div marginB-20"},[e._m(8),e._v(" "),i("div",{staticClass:"blue add-input input-txt",on:{click:function(t){e.openWin("material")}}},[i("span",{staticClass:"img"}),e._v(" "),i("span",{staticClass:"font"},[e._v("添加物料")])])])]),e._v(" "),e.selectGoods.length>0||e.selectMaterial.length>0?i("div",{staticClass:"tab-div"},[i("span",{class:{"select-tab":e.toggle},on:{click:function(t){e.toggle=!0}}},[e._v("商品")]),e._v(" "),i("span",{class:{"select-tab":!e.toggle},on:{click:function(t){e.toggle=!1}}},[e._v("物料")])]):e._e(),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.selectGoods.length>0||e.selectMaterial.length>0,expression:"selectGoods.length>0 || selectMaterial.length>0"}],ref:"table",staticClass:"table-container"},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.toggle,expression:"toggle"}],staticClass:"table-goods"},[i("div",{staticClass:"table-head"},[e._v("\n                    商品列表\n                    "),i("span",{staticClass:"circle"}),e._v("\n                    共"),i("span",{staticClass:"red-font"},[e._v(e._s(e.selectGoods.length))]),e._v("个条目\n                ")]),e._v(" "),i("div",{staticClass:"table-title"},e._l(e.goodsTitle,function(t,a){return i("li",{key:a},[e._v(e._s(t.titleName))])})),e._v(" "),i("div",{staticClass:"table-body"},e._l(e.selectGoods,function(t,a){return i("div",{key:a,staticClass:"table-row",style:{"box-shadow":t.errorBorder?"0 0 5px 0 #ff3d04":""}},[i("li",[i("span",{staticClass:"table-delete",on:{click:function(i){e.deleteItem(t,a)}}},[e._v("删除")])]),e._v(" "),i("li",[e._v(e._s(a>10?a+1:"0"+(a+1)))]),e._v(" "),i("li",{staticClass:"text-ellipsis",attrs:{title:t.goodsName}},[e._v(e._s(t.goodsName))]),e._v(" "),i("li",[e._v(e._s(t.storeNum))]),e._v(" "),i("li",[i("div",{staticClass:"table-col-div"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.needsNum,expression:"item.needsNum"}],attrs:{type:"text",placeholder:"输入数字"},domProps:{value:t.needsNum},on:{input:function(i){i.target.composing||e.$set(t,"needsNum",i.target.value)}}}),e._v(" "),i("span",[e._v(e._s(t.unit))])])]),e._v(" "),i("li",[e._v(e._s(t.barCode))]),e._v(" "),i("li",[e._v(e._s(t.goodsType))])])})),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0==e.selectGoods.length,expression:"selectGoods.length==0"}],staticClass:"table-footer"})]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!e.toggle,expression:"!toggle"}],staticClass:"table-material"},[i("div",{staticClass:"table-head"},[e._v("\n                    物料列表\n                    "),i("span",{staticClass:"circle"}),e._v("\n                    共"),i("span",{staticClass:"red-font"},[e._v(e._s(e.selectMaterial.length))]),e._v("个条目\n                ")]),e._v(" "),i("div",{staticClass:"table-title"},e._l(e.materialTitle,function(t,a){return i("li",{key:a},[e._v(e._s(t.titleName))])})),e._v(" "),i("div",{staticClass:"table-body"},e._l(e.selectMaterial,function(t,a){return i("div",{key:a,staticClass:"table-row",style:{"box-shadow":t.errorBorder?"0 0 5px 0 #ff3d04":""}},[i("li",[i("span",{staticClass:"table-delete",on:{click:function(i){e.deleteItem(t,a)}}},[e._v("删除")])]),e._v(" "),i("li",[e._v(e._s(a>10?a+1:"0"+(a+1)))]),e._v(" "),i("li",{staticClass:"text-ellipsis",attrs:{title:t.name}},[e._v(e._s(t.name))]),e._v(" "),i("li",[e._v(e._s(t.storeNum))]),e._v(" "),i("li",[i("div",{staticClass:"table-col-div"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.needsNum,expression:"item.needsNum"}],attrs:{type:"text",placeholder:"输入数字"},domProps:{value:t.needsNum},on:{input:function(i){i.target.composing||e.$set(t,"needsNum",i.target.value)}}}),e._v(" "),i("span",{staticClass:"text-ellipsis",attrs:{title:t.unitTips.selUnitName}},[e._v(e._s(t.unitTips?t.unitTips.selUnitName:"--"))])])]),e._v(" "),i("li",[i("div",{staticClass:"table-col-div"},[i("input",{staticClass:"small-input",attrs:{type:"text",readonly:"readonly"},domProps:{value:t.unitTips?t.unitTips.selUnitName:"--"}}),e._v(" "),i("span",{on:{click:function(i){i.stopPropagation(),e.showSelect(t,a)}}},[i("i",{staticClass:"icon"}),e._v(" "),i("ul",{directives:[{name:"show",rawName:"v-show",value:t.toggle,expression:"item.toggle"}],staticClass:"select-unit"},e._l(t.unit,function(a,n){return i("li",{key:n,on:{click:function(i){e.getSelect(a,n,t)}}},[e._v(e._s(a.name))])}))])])]),e._v(" "),i("li",[e._v(e._s(t.materialType))])])})),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0==e.selectMaterial.length,expression:"selectMaterial.length==0"}],staticClass:"table-footer"})])]),e._v(" "),i("div",{staticClass:"footer-btn"},[i("div",{staticClass:"gray btn-com",on:{click:function(t){e.clickBtn("cancel")}}},[e._v("取消")]),e.selectGoods.length>0||e.selectMaterial.length>0?i("div",{staticClass:"save",on:{click:function(t){e.openWin("templateWin")}}},[e._v(e._s(e.subObj.templateId?"覆盖模板":"保存模板"))]):e._e(),i("div",{staticClass:"yellow btn-com",on:{click:function(t){e.clickBtn("ok")}}},[e._v("确定")])])]),e._v(" "),i("div",[i(e.showCom,{tag:"component",attrs:{pObj:e.comObj},on:{throwWin:e.closeWin,throwCommonWin:e.closeWin}}),e._v(" "),"goods"!=e.tabCom||e.toggleCom?e._e():i("goods-com",{attrs:{shopId:e.shopId,sleCommodity:e.selectGoods,addBtn:!1},on:{select:function(t){e.closeGoodsMaterial("goods",t)}}}),e._v(" "),"material"!=e.tabCom||e.toggleCom?e._e():i("material-com",{attrs:{shopId:e.shopId,sleSupplies:e.selectMaterial,addBtn:!1},on:{select:function(t){e.closeGoodsMaterial("material",t)}}})],1)])};a._withStripped=!0;var n=i("81a2"),s=i("f6ce"),r=i("05dd"),o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var i=[],a=!0,n=!1,s=void 0;try{for(var r,o=e[Symbol.iterator]();!(a=(r=o.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){n=!0,s=e}finally{try{!a&&o.return&&o.return()}finally{if(n)throw s}}return i}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();function u(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}function c(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,i){return function a(n,s){try{var r=t[n](s),o=r.value}catch(e){return void i(e)}if(!r.done)return Promise.resolve(o).then(function(e){a("next",e)},function(e){a("throw",e)});e(o)}("next")})}}var d={data:function(){return{isBrand:"",brandId:"",shopId:"",userName:"",comObj:{},showCom:"",tabCom:"",goodsType:["普通商品","称重商品","自定义商品"],toggle:!0,toggleCom:!0,goodsTitle:[{titleName:"操作"},{titleName:"序号"},{titleName:"商品名称"},{titleName:"当前库存"},{titleName:"调度数量"},{titleName:"条形码"},{titleName:"类型"}],materialTitle:[{titleName:"操作"},{titleName:"序号"},{titleName:"物料名称",dataName:"name"},{titleName:"当前库存",dataName:"storeNum"},{titleName:"调度数量/重量",dataName:"name"},{titleName:"单位选择",dataName:"name"},{titleName:"类型",dataName:"materialtype"}],subObj:{reason:"",code:"",remark:"",templateName:"",templateId:"",applicationId:""},testObj:{},warehoustList:[],selectStore:{},selectGoods:[],selectMaterial:[]}},methods:{hideSelect:function(){this.selectMaterial=this.selectMaterial.map(function(e){return e.toggle=!1,e}),document.removeEventListener("click",this.hideSelect)},showSelect:function(e,t){e.toggle=!e.toggle,e.toggle&&document.addEventListener("click",this.hideSelect,!1);var i=!0,a=!1,n=void 0;try{for(var s,r=this.selectMaterial[Symbol.iterator]();!(i=(s=r.next()).done);i=!0){var o=s.value;o.id!=e.id&&(o.toggle=!1)}}catch(e){a=!0,n=e}finally{try{!i&&r.return&&r.return()}finally{if(a)throw n}}this.selectMaterial.splice(t,1,e)},getSelect:function(e,t,i){if(i.unitTips.selUnitId!=e.muId){i.needsNum="";var a=i.goodsNum?i.goodsNum.surplus:0;i.unitTips.selUnitId=e.muId,i.unitTips.selUnitVal=e.value,i.unitTips.selUnitName=e.name,i.storeNum=r.a.comUnit(a,i.unitTips.selUnitVal,i.unitTips.selUnitName,i.unitTips.minName)}},createApplication:function(){for(var e=this,t=arguments.length,i=Array(t),a=0;a<t;a++)i[a]=arguments[a];return c(regeneratorRuntime.mark(function t(){var a,n,s,r,o,u;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=l(i,4),n=a[0],s=a[1],r=a[2],o=a[3],t.next=3,e.getHttp(n,r);case 3:u=t.sent,o?o(u,s):"number"==typeof Number(u)&&(e.subObj.applicationId=u,e.alert(s),e.$router.push({path:"/admin/schedulingApplication",query:e.$route}));case 5:case"end":return t.stop()}},t,e)}))()},clickBtn:function(e){var t=this;return c(regeneratorRuntime.mark(function i(){var a,n;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:i.t0=e,i.next="cancel"===i.t0?3:"ok"===i.t0?9:16;break;case 3:return t.subObj.templateId&&s.a.session("tab",2),t.subObj.applicationId&&s.a.session("tab",1),delete(a=t.$route.query).id,t.$router.push({path:"/admin/schedulingApplication",query:a}),i.abrupt("break",16);case 9:if(t.checkForm()){i.next=11;break}return i.abrupt("return");case 11:(n=t.formatData()).createName=t.userName,n.userName=t.userName,n.supplierId=t.brandId,t.subObj.applicationId?(n.applyId=t.subObj.applicationId,t.alert("确认修改申请?",function(){t.createApplication("editApplication","修改申请成功!",n)})):t.createApplication("submitApplication","新建申请成功!",n);case 16:case"end":return i.stop()}},i,t)}))()},openWin:function(e){var t=this;return c(regeneratorRuntime.mark(function i(){return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:i.t0=e,i.next="templateWin"===i.t0?3:"chooseWarehouse"===i.t0?8:"goods"===i.t0?11:"material"===i.t0?11:14;break;case 3:if(t.checkForm()){i.next=5;break}return i.abrupt("return");case 5:return t.comObj={title:t.subObj.templateId?"修改模板":"新建模板",tagName:"模板名称",name:t.subObj.templateId?t.subObj.templateName:"",len:20,tips:"请输入模板名称",btnOk:{content:"确认",style:"backgroundColor:#f8931f"},btnCancel:{content:"取消",style:"backgroundColor:#a0a0a0"}},t.showCom=e,i.abrupt("break",14);case 8:return t.comObj={allList:t.warehoustList,owner:t.selectStore.id?t.selectStore:""},t.showCom=e,i.abrupt("break",14);case 11:return t.toggleCom=!1,t.tabCom=e,i.abrupt("break",14);case 14:case"end":return i.stop()}},i,t)}))()},closeWin:function(e,t){var i=this;return c(regeneratorRuntime.mark(function a(){var n,s,r,l;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:a.t0=i.showCom,a.next="chooseWarehouse"===a.t0?3:"templateWin"===a.t0?10:27;break;case 3:if("ok"!=e||t){a.next=6;break}return i.$store.commit("setWin",{content:"请选择仓库",title:"温馨提示"}),a.abrupt("return");case 6:return"ok"==e&&t&&"object"==(void 0===t?"undefined":o(t))&&(i.selectStore=t),i.showCom="",i.toggleCom=!0,a.abrupt("break",27);case 10:if("ok"==t&&e&&i.checkForm()){a.next=13;break}return i.showCom="",a.abrupt("return");case 13:if(n=e.name.trim()){a.next=18;break}return i.alert("请输入模板名称!"),i.showCom="",a.abrupt("return");case 18:return(s=i.formatData()).name=n,s.userName=i.userName,s.createName=i.userName,r=void 0,l=void 0,s.supplierId=i.brandId,i.subObj.templateId?(s.id=i.subObj.templateId,r="editApplicationTemplate",l="模板修改成功!"):(r="addApplicationTemplate",l="模板保存成功!"),i.createApplication(r,l,s,function(e,t){"object"!=(void 0===e?"undefined":o(e))&&(i.subObj.templateName=n,i.subObj.templateId=e,i.showCom="",i.alert(t))}),a.abrupt("break",27);case 27:case"end":return a.stop()}},a,i)}))()},closeGoodsMaterial:function(e,t){switch(e){case"goods":if(Array.isArray(t)){this.selectGoods=t;var i=!0,a=!1,n=void 0;try{for(var s,o=this.selectGoods[Symbol.iterator]();!(i=(s=o.next()).done);i=!0){var l=s.value;l.needsNum||(l.goodsType=this.goodsType[Number(l.type)],l.needsNum="",l.storeNum=l.goodsNum?l.goodsNum.surplus+l.unit:0)}}catch(e){a=!0,n=e}finally{try{!i&&o.return&&o.return()}finally{if(a)throw n}}}this.toggle=!0;break;case"material":if(Array.isArray(t)){this.selectMaterial=t;var u=!0,c=!1,d=void 0;try{for(var m,p=this.selectMaterial[Symbol.iterator]();!(u=(m=p.next()).done);u=!0){var v=m.value;if(v.materialType="物料",v.toggle=!1,v.needsNum||(v.needsNum=""),v.unitTips&&v.unitTips.minId||this.getUnitInfo(v),!v.unitTips.selUnitId){v.unitTips.selUnitId=v.unitTips.defaultId,v.unitTips.selUnitName=v.unitTips.defaultName,v.unitTips.selUnitVal=v.unitTips.defaultVal;var h=v.goodsNum?v.goodsNum.surplus:0;v.storeNum=r.a.comUnit(h,v.unitTips.selUnitVal,v.unitTips.selUnitName,v.unitTips.minName)}}}catch(e){c=!0,d=e}finally{try{!u&&p.return&&p.return()}finally{if(c)throw d}}}this.toggle=!1}this.toggleCom=!0,this.tabCom="",this.initBtn()},deleteItem:function(e){var t=this.toggle?"selectGoods":"selectMaterial";this[t]=this[t].filter(function(t){return t.id!=e.id})},alert:function(e,t){var i={content:e,title:"温馨提示"};t&&(i={content:e,title:"温馨提示",winType:"confirm",callback:function(e){"ok"==e&&t()}}),this.$store.commit("setWin",i)},checkTips:function(e,t,i){e.errorBorder=t,e.errorBorder&&(this.toggle="selectGoods"==i),this[i].push(this[i].pop())},check:function(e){var t=!0,i=!1,a=void 0;try{for(var n,s=this[e][Symbol.iterator]();!(t=(n=s.next()).done);t=!0){var o=n.value;o.needsNum=o.needsNum.trim(),this.testObj=o;var l=void 0,u=void 0;if("selectGoods"==e?0==o.type?(l=/^[1-9]\d{0,8}$/,u="请输入1-9位的整数!"):1==o.type&&(l=/((^[1-9]\d{0,8})|^0)(\.\d{1,3})?$/,u="请输入1-9位的数字,最多可含三位小数!"):"selectMaterial"==e&&0==o.type&&(l=/((^[1-9]\d{0,8})|^0)(\.\d{1,3})?$/,u="请输入1-9位的数字,最多可含三位小数!"),!r.a.checkData({needsNum:{reg:l,pro:u}},this.testObj))return void this.checkTips(o,!0,e);if(Number(o.needsNum)<=0)return this.alert("请填写调度数量!"),void this.checkTips(o,!0,e);if(Number(o.needsNum)>9e8)return this.alert("您所填写的数量过大,请重新填写!"),void this.checkTips(o,!0,e);this.checkTips(o,!1,e)}}catch(e){i=!0,a=e}finally{try{!t&&s.return&&s.return()}finally{if(i)throw a}}return!0},checkForm:function(){for(var e=["code","remark","reason"],t=0;t<e.length;t++){var i=e[t];this.subObj[i]=this.subObj[i].trim()}if(r.a.checkData({code:{reg:/^[0-9a-zA-Z]{0,20}$/,pro:"单号由0-20个英文或数字组成"},remark:{cond:"$$.length<=40",pro:"备注40字以内!"}},this.subObj))if(this.selectStore.id)if(0!=this.selectGoods.length||0!=this.selectMaterial.length){if(this.check("selectGoods")&&this.check("selectMaterial"))return!0}else this.alert("请选择商品或物料!");else this.alert("请选择仓库!")},format:function(e,t){var i=[],a=!0,n=!1,s=void 0;try{for(var r,o=this[e][Symbol.iterator]();!(a=(r=o.next()).done);a=!0){var l=r.value,u={itemId:l.id};if(t)u.unit="",u.unitName=l.unit,1==l.type?u.type=3:0==l.type&&(u.type=1),u.barCode=l.barCode,u.itemName=l.goodsName,u.num=l.needsNum;else{u.unit=l.unitTips.selUnitId,u.unitName=l.unitTips.selUnitName,u.type=2,u.barCode="",u.itemName=l.name;var c=l.needsNum*l.unitTips.selUnitVal;u.num=c.toFixed(3)}i.push(u)}}catch(e){n=!0,s=e}finally{try{!a&&o.return&&o.return()}finally{if(n)throw s}}return i},formatData:function(){var e=[];e.push.apply(e,u(this.format("selectGoods",!0))),e.push.apply(e,u(this.format("selectMaterial")));for(var t={},i={},a=["code","remark","reason"],n=0;n<a.length;n++){var s=a[n];i[s]=this.subObj[s]}return Object.assign(t,{wid:this.selectStore.id,detail:e,type:1},i),t},getHttp:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return c(regeneratorRuntime.mark(function a(){var s;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a[e]({data:i});case 2:return s=t.sent,t.abrupt("return",s);case 4:case"end":return t.stop()}},a,t)}))()},initBtn:function(){this.$store.commit("setPageTools",[])},initSubObj:function(){var e=this;return c(regeneratorRuntime.mark(function t(){var i,a,n,s,r,o,l,u,c,d,m;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(i=e.$route.query,a=i.id,n=i.tab,s="",!a){t.next=12;break}if(2!=n){t.next=7;break}return s="templateId",t.next=7,e.initTemplate({id:a},"getApplicationTemplate");case 7:if(1!=n){t.next=11;break}return s="applicationId",t.next=11,e.initApplication({applyId:a},"invoic_getApplication");case 11:a&&n&&(e.subObj[s]=a);case 12:return t.next=14,e.getHttp("warehouseList");case 14:if(e.warehoustList=t.sent,r=e.isBrand?"brandId":"shopId",e.warehoustList=e.filterStore(e.warehoustList,e.shopId,r),!e.selectStore.id){t.next=46;break}o=!0,l=!1,u=void 0,t.prev=21,c=e.warehoustList[Symbol.iterator]();case 23:if(o=(d=c.next()).done){t.next=32;break}if((m=d.value).id!=e.selectStore.id){t.next=29;break}return e.selectStore=m,e.selectStore.selected=!0,t.abrupt("break",32);case 29:o=!0,t.next=23;break;case 32:t.next=38;break;case 34:t.prev=34,t.t0=t.catch(21),l=!0,u=t.t0;case 38:t.prev=38,t.prev=39,!o&&c.return&&c.return();case 41:if(t.prev=41,!l){t.next=44;break}throw u;case 44:return t.finish(41);case 45:return t.finish(38);case 46:case"end":return t.stop()}},t,e,[[21,34,38,46],[39,,41,45]])}))()},getUnitInfo:function(e){e.unitTips={minId:"",minName:"",defaultName:"",defaultId:"",defaultVal:"",selUnitId:"",selUnitName:"",selUnitVal:""},e.unit=Array.isArray(e.unit)?e.unit:[];var t=!0,i=!1,a=void 0;try{for(var n,s=e.unit[Symbol.iterator]();!(t=(n=s.next()).done);t=!0){var r=n.value;1==r.isMin&&(e.unitTips.minId=r.muId,e.unitTips.minName=r.name),1==r.isDefault&&(e.unitTips.defaultId=r.muId,e.unitTips.defaultName=r.name,e.unitTips.defaultVal=r.value)}}catch(e){i=!0,a=e}finally{try{!t&&s.return&&s.return()}finally{if(i)throw a}}},initSelectGoodsMaterial:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=!0,i=!1,a=void 0;try{for(var n,s=e[Symbol.iterator]();!(t=(n=s.next()).done);t=!0){var o=n.value;if(o.id=o.itemId,o.select=!0,o.needsNum=o.num,o.goodsNum={surplus:o.surplus,batch:o.batchNum},1==o.type||3==o.type){o.goodsName=o.itemName,o.gName=o.itemName;o.goodsType=["普通商品","物料","称重商品"][Number(o.type)-1],1==o.type&&(o.type=0),3==o.type&&(o.type=1),0==o.type?o.needsNum=Number(o.num).toFixed()+"":1==o.type&&(o.needsNum=Number(o.num).toFixed(3)+""),o.unit=o.unitName,o.storeNum=o.goodsNum.surplus+o.unit,this.selectGoods.push(o)}else if(2==o.type){o.materialType="物料",o.type=0,o.name=o.itemName;var l=o.unit;o.unit=[],Array.isArray(o.unitRelation)&&(o.unit=o.unitRelation),this.getUnitInfo(o);var u=!0,c=!1,d=void 0;try{for(var m,p=o.unit[Symbol.iterator]();!(u=(m=p.next()).done);u=!0){var v=m.value;v.muId==l&&(o.unitTips.selUnitId=v.muId,o.unitTips.selUnitName=v.name,o.unitTips.selUnitVal=v.value)}}catch(e){c=!0,d=e}finally{try{!u&&p.return&&p.return()}finally{if(c)throw d}}var h=Number(o.num)/o.unitTips.selUnitVal;o.needsNum=h.toFixed(3)+"",o.storeNum=r.a.comUnit(o.surplus,o.unitTips.selUnitVal,o.unitTips.selUnitName,o.unitTips.minName),this.selectMaterial.push(o)}}}catch(e){i=!0,a=e}finally{try{!t&&s.return&&s.return()}finally{if(i)throw a}}},copyAttrs:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];0==i.length&&(i=Object.keys(e));var a=!0,n=!1,s=void 0;try{for(var r,o=i[Symbol.iterator]();!(a=(r=o.next()).done);a=!0){var l=r.value;t[l]=e[l]}}catch(e){n=!0,s=e}finally{try{!a&&o.return&&o.return()}finally{if(n)throw s}}},initTemplate:function(e,t){var i=this;return c(regeneratorRuntime.mark(function a(){var n,s;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,i.getHttp(t,e);case 2:(n=a.sent)&&"object"==(void 0===n?"undefined":o(n))&&(i.copyAttrs(n.content,i.subObj,["remark","reason"]),i.selectStore.id=n.content.wid,i.subObj.templateName=n.name,s=[],Array.isArray(n.content.detail)&&(s=n.content.detail),i.initSelectGoodsMaterial(s));case 4:case"end":return a.stop()}},a,i)}))()},initApplication:function(e,t){var i=this;return c(regeneratorRuntime.mark(function a(){var n,s,r,l,c,d,m;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,i.getHttp(t,e);case 2:if((n=a.sent)&&"object"==(void 0===n?"undefined":o(n))){a.next=5;break}return a.abrupt("return");case 5:i.copyAttrs(n,i.subObj,["code","remark","reason"]),i.selectStore.id=n.wid,n.itemList||(n.itemList={}),s=n.itemList,r=s.goods,l=void 0===r?[]:r,c=s.material,d=void 0===c?[]:c,(m=[]).push.apply(m,u(l)),m.push.apply(m,u(d)),i.initSelectGoodsMaterial(m);case 13:case"end":return a.stop()}},a,i)}))()},initData:function(){var e=s.a.session("userShop");switch(this.userName=e.user.name,this.isBrand=3==e.currentShop.ischain,this.shopId=e.currentShop.id,e.currentShop.ischain+""){case"1":case"2":this.brandId=e.currentShop.brandId;break;case"0":case"3":this.brandId=e.currentShop.id}},filterStore:function(e,t,i){return e.filter(function(e){return"brandId"==i&&0==e.shopId?(e.ischain=1,e[i]==t):"shopId"==i&&0!=e.shopId?(e.ischain=0,e[i]==t):void 0})}},computed:{},mounted:function(){var e=this;return c(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.initData(),e.initSubObj();case 2:case"end":return t.stop()}},t,e)}))()},destroyed:function(){delete this.$route.query.tab,delete this.$route.query.id},components:{templateWin:function(){return i.e("unit_edit_create_win").then(i.bind(null,"7cf9"))},chooseWarehouse:function(){return i.e("choose_warehouse_win").then(i.bind(null,"f8b9"))},MaterialCom:function(){return i.e("output_select_supplies").then(i.bind(null,"0c3f"))},goodsCom:function(){return i.e("output_select_goods").then(i.bind(null,"1fb0"))}}},m=(i("b60d"),i("7610")),p=Object(m.a)(d,a,[function(){var e=this.$createElement,t=this._self._c||e;return t("label",[this._v("\n                    原因\n                    "),t("span",{staticClass:"required-no"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tips-div"},[t("span",{staticClass:"icon"}),this._v(" "),t("span",[this._v("限20字以内")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",[this._v("\n                    申请单号\n                    "),t("span",{staticClass:"required-no"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tips-div marginB-10"},[t("span",{staticClass:"icon"}),this._v(" "),t("span",[this._v("限20字以内,数字 / 字母")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",[this._v("\n                    备注\n                    "),t("span",{staticClass:"required-no"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tips-div marginB-10"},[t("span",{staticClass:"icon"}),this._v(" "),t("span",[this._v("限40字以内")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",[this._v("\n                    入货仓库\n                    "),t("span",{staticClass:"required"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",[this._v("\n                    申请商品\n                    "),t("span",{staticClass:"required-no"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",[this._v("\n                    申请物料\n                    "),t("span",{staticClass:"required-no"})])}],!1,null,"af88fc4a",null);p.options.__file="src\\module\\invoicing_system\\warehouse_manage\\purchase_requisition.vue";t.default=p.exports}}]);