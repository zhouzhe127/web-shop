(window.webpackJsonp=window.webpackJsonp||[]).push([["output_shipper_print"],{"524f":function(s,t,a){},"5ac0":function(s,t,a){"use strict";var e=a("524f");a.n(e).a},"62ac":function(s,t,a){"use strict";a.r(t);var e=a("bbb9"),i=function(){return function(s,t){if(Array.isArray(s))return s;if(Symbol.iterator in Object(s))return function(s,t){var a=[],e=!0,i=!1,n=void 0;try{for(var _,v=s[Symbol.iterator]();!(e=(_=v.next()).done)&&(a.push(_.value),!t||a.length!==t);e=!0);}catch(s){i=!0,n=s}finally{try{!e&&v.return&&v.return()}finally{if(i)throw n}}return a}(s,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n={data:function(){return{goodsList:[],materialList:[],gLength:0,mLength:0,open:!0,orderDetail:{},pageList:[],pIndex:0,prevType:"",prevTypeName:"",gEach:[],mEach:[],coverShow:!0,opacity:"opacity:0"}},props:["detail","goods","material","isOpen"],created:function(){this.orderDetail=e.a.deepCopy(this.detail)},mounted:function(){this.setDomSign(),this.open=this.isOpen},methods:{printOrder:function(){var s=this.$refs.printHtml,t=this.$refs.outputPrint,a=document.body,e=a.querySelector("#app");e.style.display="none",a.appendChild(s),window.print(),e.style.display="",t.appendChild(s)},timeFormat:function(s){return e.a.format(new Date(1e3*s),"yyyy-MM-dd hh:mm:ss")},back:function(){this.$emit("emit",!1)},setPage:function(){var s=this,t=this.$refs.initPage;this.$nextTick(function(){for(var a=Math.ceil(t.offsetHeight/936),i=t.querySelectorAll(".sign-dom"),n=e.a.getDOMPosition(t).y,_=[],v=1;v<=a;v++){var r=!0,o=!1,l=void 0;try{for(var p,c=i[Symbol.iterator]();!(r=(p=c.next()).done);r=!0){var m=p.value;if(e.a.getDOMPosition(m).y-n>936*v){var d=m.getAttribute("data-sign");_.push(d);break}}}catch(s){o=!0,l=s}finally{try{!r&&c.return&&c.return()}finally{if(o)throw l}}}s.splicePage(_)})},splicePage:function(s){for(var t=!0,a=0;a<s.length;a++){var e=s[a],i=s[a+1]||"",n=e.split("-")[0];"g"==n?this.spliceMethod(this.gEach,this.goodsList,e,i,"goods"):"m"==n&&(t=!1,this.spliceMethod(this.mEach,this.materialList,e,i,"material"))}var _=this.materialList.length;if(_&&t){var v="m-"+_;this.spliceMethod(this.mEach,this.materialList,v,"","material")}},spliceMethod:function(){for(var s=arguments.length,t=Array(s),a=0;a<s;a++)t[a]=arguments[a];var n=i(t,5),_=n[0],v=n[1],r=n[2],o=n[3],l=n[4],p=e.a.deepCopy(_),c=r.length>4,m=r.substr(2),d=o?o.substr(2):p.length+"",u=r.substr(0,1),h=o?o.substr(0,1):"",g=Number(m.split("-")[0]),f=Number(m.split("-")[1]||0),C=Number(d.split("-")[0]),y=Number(d.split("-")[1]||0);c?v.length>g&&(v.splice(g+1),v[g].batchInfo.splice(f)):v.length>g+1&&v.splice(g);var b=m.split("-").length,N=d.split("-").length,w=[];if(b<=1)"g"==u&&"m"==h?w=p.slice(g):N<=1?w=p.slice(g,C):(w=p.slice(g,C+1))[w.length-1].batchInfo.splice(y);else{"g"==u&&"m"==h?w=p.slice(g+1):N<=1?w=p.slice(g+1,C):(w=p.slice(g+1,C+1))[w.length-1].batchInfo.splice(y);var L={};L.batchInfo=p[g].batchInfo.slice(f),w.unshift(L)}var D="goods"==l?[{goods:w}]:[{material:w}];w.length&&this.pageList.push(D),"g"==this.prevType&&"m"==u&&this.pageList[this.pIndex-1].push({material:v,isTitle:!0}),this.pIndex++,this.prevType=u,this.prevTypeName=l},setDomSign:function(){for(var s in this.goods){var t=this.goods[s];for(var a in t.domSign="g-"+s,t.batchInfo){t.batchInfo[a].domSign="g-"+s+"-"+a}}for(var i in this.material){var n=this.material[i];for(var _ in n.domSign="m-"+i,n.batchInfo){n.batchInfo[_].domSign="m-"+i+"-"+_}}this.goodsList=e.a.deepCopy(this.goods),this.materialList=e.a.deepCopy(this.material),this.gEach=e.a.deepCopy(this.goods),this.mEach=e.a.deepCopy(this.material),this.gLength=this.goods.length,this.mLength=this.material.length,this.setPage()}}},_=(a("baa8"),a("d801")),v=Object(_.a)(n,function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{ref:"outputPrint",staticClass:"output-print"},[a("div",{staticClass:"handle"},[a("span",{on:{click:s.printOrder}},[s._v("打印")]),s._v(" "),a("span",{staticClass:"back",on:{click:s.back}},[s._v("返回")])]),s._v(" "),a("div",{ref:"printHtml",staticClass:"printHtml"},[a("div",{ref:"initPage",staticClass:"print-page one-page"},[a("div",{staticClass:"page-box"},[s._v("第1页，共"+s._s(s.pageList.length+1)+"页")]),s._v(" "),a("div",{staticClass:"head"},[a("div",{staticClass:"order-num"},[s._v(s._s(s.orderDetail.receiptNumber))]),s._v(" "),a("div",{staticClass:"name"},[s._v("入货单")]),s._v(" "),a("ul",[a("li",[a("span",[s._v("出货仓库：")]),s._v(s._s(s.orderDetail.outWname))]),s._v(" "),a("li",{staticClass:"three"},[a("span",[s._v("操作人：")]),s._v(s._s(s.orderDetail.operate.name))])]),s._v(" "),a("ul",[a("li",[a("span",[s._v("入货仓库：")]),s._v(s._s(s.orderDetail.intoWname))]),s._v(" "),a("li",[a("span",[s._v("入货时间：")]),s._v(s._s(s.orderDetail.operate.time))])])]),s._v(" "),s.goodsList.length?a("div",{staticClass:"main"},[a("div",{staticClass:"head"},[s._v("商品列表·共 "+s._s(s.gLength)+" 条 (详细)")]),s._v(" "),s._m(0),s._v(" "),s._l(s.goodsList,function(t,e){return a("div",{key:e,staticClass:"list-one"},[a("div",{staticClass:"item-one sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.itemName))])]),s._v(" "),a("span",[s._v(s._s(t.num))]),s._v(" "),a("span",[s._v(s._s(t.intoNum))]),s._v(" "),a("span",[s._v(s._s(t.consumeNum))]),s._v(" "),a("span",[s._v(s._s(t.wName)+"-"+s._s(t.aName))])]),s._v(" "),s.open&&t.batchInfo.length?a("div",{staticClass:"list-two"},[s._m(1,!0),s._v(" "),s._l(t.batchInfo,function(t,e){return a("div",{key:e,staticClass:"item-two sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[s._v(s._s(t.batchCode))]),s._v(" "),a("span",[s._v(s._s(t.timeCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.supplier))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.priceAndName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.intoNumDetail))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.consumeNumDetail))])])])})],2):s._e()])})],2):s._e(),s._v(" "),s.materialList.length?a("div",{staticClass:"main"},[a("div",{staticClass:"head"},[s._v("物料列表·共 "+s._s(s.mLength)+" 条 (详细)")]),s._v(" "),s._m(2),s._v(" "),s._l(s.materialList,function(t,e){return a("div",{key:e,staticClass:"list-one material"},[a("div",{staticClass:"item-one sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.itemName))])]),s._v(" "),a("span",[s._v(s._s(t.num))]),s._v(" "),a("span",[s._v(s._s(t.intoNum))]),s._v(" "),a("span",[s._v(s._s(t.consumeNum))]),s._v(" "),a("span",[s._v(s._s(t.wName)+"-"+s._s(t.aName))])]),s._v(" "),s.open&&t.batchInfo.length?a("div",{staticClass:"list-two"},[s._m(3,!0),s._v(" "),s._l(t.batchInfo,function(t,e){return a("div",{key:e,staticClass:"item-two sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[s._v(s._s(t.batchCode))]),s._v(" "),a("span",[s._v(s._s(t.timeCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.supplier))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.priceAndName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.intoNumDetail))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.consumeNumDetail))])])])})],2):s._e()])})],2):s._e()]),s._v(" "),s._l(s.pageList,function(t,e){return s.pageList.length?a("div",{key:e,staticClass:"print-page",style:{height:t.hei}},[a("div",{staticClass:"page-box"},[s._v("第"+s._s(e+2)+"页，共"+s._s(s.pageList.length+1)+"页")]),s._v(" "),s._l(t,function(t){return[t.goods?a("div",{staticClass:"main"},[s._m(4,!0),s._v(" "),s._l(t.goods,function(t,e){return a("div",{key:e,staticClass:"list-one"},[t.serialNumCus?a("div",{staticClass:"item-one sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.itemName))])]),s._v(" "),a("span",[s._v(s._s(t.num))]),s._v(" "),a("span",[s._v(s._s(t.intoNum))]),s._v(" "),a("span",[s._v(s._s(t.consumeNum))]),s._v(" "),a("span",[s._v(s._s(t.wName)+"-"+s._s(t.aName))])]):s._e(),s._v(" "),s.open&&t.batchInfo.length?a("div",{staticClass:"list-two"},[s._m(5,!0),s._v(" "),s._l(t.batchInfo,function(t,e){return a("div",{key:e,staticClass:"item-two sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[s._v(s._s(t.batchCode))]),s._v(" "),a("span",[s._v(s._s(t.timeCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.supplier))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.priceAndName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.intoNumDetail))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.consumeNumDetail))])])])})],2):s._e()])})],2):s._e(),s._v(" "),t.material?a("div",{staticClass:"main"},[t.isTitle?a("div",{staticClass:"head"},[s._v("物料列表·共 "+s._s(s.materialList.length)+" 条 (详细)")]):s._e(),s._v(" "),s._m(6,!0),s._v(" "),s._l(t.material,function(t,e){return a("div",{key:e,staticClass:"list-one material"},[t.serialNumCus?a("div",{staticClass:"item-one sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.itemName))])]),s._v(" "),a("span",[s._v(s._s(t.num))]),s._v(" "),a("span",[s._v(s._s(t.intoNum))]),s._v(" "),a("span",[s._v(s._s(t.consumeNum))]),s._v(" "),a("span",[s._v(s._s(t.wName)+"-"+s._s(t.aName))])]):s._e(),s._v(" "),s.open&&t.batchInfo.length?a("div",{staticClass:"list-two"},[s._m(7,!0),s._v(" "),s._l(t.batchInfo,function(t,e){return a("div",{key:e,staticClass:"item-two sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[s._v(s._s(t.batchCode))]),s._v(" "),a("span",[s._v(s._s(t.timeCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.supplier))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.priceAndName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.intoNumDetail))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.consumeNumDetail))])])])})],2):s._e()])})],2):s._e()]})],2):s._e()})],2)])},[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-one"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("商品名")]),s._v(" "),a("span",[s._v("出货数量")]),s._v(" "),a("span",[s._v("入货数量")]),s._v(" "),a("span",[s._v("耗损数量")]),s._v(" "),a("span",[s._v("入货仓库")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-two"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("批次号")]),s._v(" "),a("span",[s._v("生产日期")]),s._v(" "),a("span",[s._v("供应商")]),s._v(" "),a("span",[s._v("进价")]),s._v(" "),a("span",[s._v("入货数量")]),s._v(" "),a("span",[s._v("耗损数量")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-one"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("物料名")]),s._v(" "),a("span",[s._v("出货数量")]),s._v(" "),a("span",[s._v("入货数量")]),s._v(" "),a("span",[s._v("耗损数量")]),s._v(" "),a("span",[s._v("入货仓库")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-two"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("批次编码")]),s._v(" "),a("span",[s._v("生产日期")]),s._v(" "),a("span",[s._v("供应商")]),s._v(" "),a("span",[s._v("进价")]),s._v(" "),a("span",[s._v("入货数量")]),s._v(" "),a("span",[s._v("耗损数量")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-one"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("商品名")]),s._v(" "),a("span",[s._v("出货数量")]),s._v(" "),a("span",[s._v("入货数量")]),s._v(" "),a("span",[s._v("耗损数量")]),s._v(" "),a("span",[s._v("入货仓库")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-two"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("批次编码")]),s._v(" "),a("span",[s._v("生产日期")]),s._v(" "),a("span",[s._v("供应商")]),s._v(" "),a("span",[s._v("进价")]),s._v(" "),a("span",[s._v("入货数量")]),s._v(" "),a("span",[s._v("耗损数量")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-one"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("物料名")]),s._v(" "),a("span",[s._v("出货数量")]),s._v(" "),a("span",[s._v("入货数量")]),s._v(" "),a("span",[s._v("耗损数量")]),s._v(" "),a("span",[s._v("入货仓库")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-two"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("批次编码")]),s._v(" "),a("span",[s._v("生产日期")]),s._v(" "),a("span",[s._v("供应商")]),s._v(" "),a("span",[s._v("进价")]),s._v(" "),a("span",[s._v("入货数量")]),s._v(" "),a("span",[s._v("耗损数量")])])}],!1,null,"61181222",null);t.default=v.exports},"8c13":function(s,t,a){},ba23:function(s,t,a){"use strict";a.r(t);var e=a("bbb9"),i=function(){return function(s,t){if(Array.isArray(s))return s;if(Symbol.iterator in Object(s))return function(s,t){var a=[],e=!0,i=!1,n=void 0;try{for(var _,v=s[Symbol.iterator]();!(e=(_=v.next()).done)&&(a.push(_.value),!t||a.length!==t);e=!0);}catch(s){i=!0,n=s}finally{try{!e&&v.return&&v.return()}finally{if(i)throw n}}return a}(s,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n={data:function(){return{goodsList:[],materialList:[],gLength:0,mLength:0,open:!0,orderDetail:{},pageList:[],pIndex:0,prevType:"",prevTypeName:"",gEach:[],mEach:[],coverShow:!0,opacity:"opacity:0"}},props:["detail","goods","material","isOpen"],created:function(){this.orderDetail=e.a.deepCopy(this.detail)},mounted:function(){this.setDomSign(),this.open=this.isOpen},methods:{printOrder:function(){var s=this.$refs.printHtml,t=this.$refs.outputPrint,a=document.body,e=a.querySelector("#app");e.style.display="none",a.appendChild(s),window.print(),e.style.display="",t.appendChild(s)},timeFormat:function(s){return e.a.format(new Date(1e3*s),"yyyy-MM-dd hh:mm")},back:function(){this.$emit("emit",!1)},setPage:function(){var s=this,t=this.$refs.initPage;this.$nextTick(function(){for(var a=Math.ceil(t.offsetHeight/936),i=t.querySelectorAll(".sign-dom"),n=e.a.getDOMPosition(t).y,_=[],v=1;v<=a;v++){var r=!0,o=!1,l=void 0;try{for(var p,c=i[Symbol.iterator]();!(r=(p=c.next()).done);r=!0){var m=p.value;if(e.a.getDOMPosition(m).y-n>936*v){var d=m.getAttribute("data-sign");_.push(d);break}}}catch(s){o=!0,l=s}finally{try{!r&&c.return&&c.return()}finally{if(o)throw l}}}s.splicePage(_)})},splicePage:function(s){for(var t=!0,a=0;a<s.length;a++){var e=s[a],i=s[a+1]||"",n=e.split("-")[0];"g"==n?this.spliceMethod(this.gEach,this.goodsList,e,i,"goods"):"m"==n&&(t=!1,this.spliceMethod(this.mEach,this.materialList,e,i,"material"))}var _=this.materialList.length;if(_&&t){var v="m-"+_;this.spliceMethod(this.mEach,this.materialList,v,"","material")}},spliceMethod:function(){for(var s=arguments.length,t=Array(s),a=0;a<s;a++)t[a]=arguments[a];var n=i(t,5),_=n[0],v=n[1],r=n[2],o=n[3],l=n[4],p=e.a.deepCopy(_),c=r.length>4,m=r.substr(2),d=o?o.substr(2):p.length+"",u=r.substr(0,1),h=o?o.substr(0,1):"",g=Number(m.split("-")[0]),f=Number(m.split("-")[1]||0),C=Number(d.split("-")[0]),y=Number(d.split("-")[1]||0);c?v.length>g&&(v.splice(g+1),v[g].batchInfo.splice(f)):v.length>g+1&&v.splice(g);var b=m.split("-").length,N=d.split("-").length,w=[];if(b<=1)"g"==u&&"m"==h?w=p.slice(g):N<=1?w=p.slice(g,C):(w=p.slice(g,C+1))[w.length-1].batchInfo.splice(y);else{"g"==u&&"m"==h?w=p.slice(g+1):N<=1?w=p.slice(g+1,C):(w=p.slice(g+1,C+1))[w.length-1].batchInfo.splice(y);var L={};L.batchInfo=p[g].batchInfo.slice(f),w.unshift(L)}var D="goods"==l?[{goods:w}]:[{material:w}];w.length&&this.pageList.push(D),"g"==this.prevType&&"m"==u&&this.pageList[this.pIndex-1].push({material:v,isTitle:!0}),this.pIndex++,this.prevType=u,this.prevTypeName=l},setDomSign:function(){for(var s in this.goods){var t=this.goods[s];for(var a in t.domSign="g-"+s,t.batchInfo){t.batchInfo[a].domSign="g-"+s+"-"+a}}for(var i in this.material){var n=this.material[i];for(var _ in n.domSign="m-"+i,n.batchInfo){n.batchInfo[_].domSign="m-"+i+"-"+_}}this.goodsList=e.a.deepCopy(this.goods),this.materialList=e.a.deepCopy(this.material),this.gEach=e.a.deepCopy(this.goods),this.mEach=e.a.deepCopy(this.material),this.gLength=this.goods.length,this.mLength=this.material.length,this.setPage()}}},_=(a("5ac0"),a("d801")),v=Object(_.a)(n,function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{ref:"outputPrint",staticClass:"output-print"},[a("div",{staticClass:"handle"},[a("span",{on:{click:s.printOrder}},[s._v("打印")]),s._v(" "),a("span",{staticClass:"back",on:{click:s.back}},[s._v("返回")])]),s._v(" "),a("div",{ref:"printHtml",staticClass:"printHtml"},[a("div",{ref:"initPage",staticClass:"print-page one-page"},[a("div",{staticClass:"page-box"},[s._v("第1页，共"+s._s(s.pageList.length+1)+"页")]),s._v(" "),a("div",{staticClass:"head"},[a("div",{staticClass:"order-num"},[s._v(s._s(s.orderDetail.receiptNumber))]),s._v(" "),a("div",{staticClass:"name"},[s._v("出货单")]),s._v(" "),a("ul",[a("li",[a("span",[s._v("出货原因：")]),s._v(s._s(s.orderDetail.cause))]),s._v(" "),s.orderDetail.operate?a("li",[a("span",[s._v("操作人：")]),s._v(s._s(s.orderDetail.operate.name))]):a("li",{staticClass:"three"},[a("span",[s._v("操作人：")]),s._v(s._s(s.orderDetail.createName))])]),s._v(" "),a("ul",[a("li",[a("span",[s._v("出货仓库：")]),s._v(s._s(s.orderDetail.outWname))]),s._v(" "),s.orderDetail.operate?a("li",[a("span",[s._v("出货时间：")]),s._v(s._s(s.orderDetail.operate.time))]):a("li",[a("span",[s._v("创建时间：")]),s._v(s._s(s.timeFormat(s.orderDetail.createTime)))])]),s._v(" "),a("ul",[a("li",[a("span",[s._v("入货仓库：")]),s._v(s._s(s.orderDetail.intoWname))]),s._v(" "),a("li",{staticClass:"tow"},[a("span",[s._v("备注：")]),s._v(s._s(s.orderDetail.remark))])])]),s._v(" "),s.goodsList.length?a("div",{staticClass:"main"},[a("div",{staticClass:"head"},[s._v("商品列表·共 "+s._s(s.gLength)+" 条 (详细)")]),s._v(" "),s._m(0),s._v(" "),s._l(s.goodsList,function(t,e){return a("div",{key:e,staticClass:"list-one"},[a("div",{staticClass:"item-one sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.itemName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.barCode))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.typeNameCus))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.outGoodsNumCus))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.costTotal))])])]),s._v(" "),s.open&&t.batchInfo.length?a("div",{staticClass:"list-two"},[s._m(1,!0),s._v(" "),s._l(t.batchInfo,function(t,e){return a("div",{key:e,staticClass:"item-two sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.batchCode))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.timeCus))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.supplier))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.priceAndName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.wName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.outGoodsNumCus))])])])})],2):s._e()])})],2):s._e(),s._v(" "),s.materialList.length?a("div",{staticClass:"main"},[a("div",{staticClass:"head"},[s._v("物料列表·共 "+s._s(s.mLength)+" 条 (详细)")]),s._v(" "),s._m(2),s._v(" "),s._l(s.materialList,function(t,e){return a("div",{key:e,staticClass:"list-one material"},[a("div",{staticClass:"item-one sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.itemName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.cateCus))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.matType))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.outMatNumCus))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.costTotal))])])]),s._v(" "),s.open&&t.batchInfo.length?a("div",{staticClass:"list-two",class:{brand:s.orderDetail.isBrand}},[a("div",{staticClass:"title-two"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("批次编码")]),s._v(" "),a("span",[s._v("生产日期")]),s._v(" "),a("span",[s._v("供应商")]),s._v(" "),s.orderDetail.isBrand?a("span",[s._v("分销价")]):s._e(),s._v(" "),a("span",[s._v("进价")]),s._v(" "),a("span",[s._v("所属仓库")]),s._v(" "),a("span",[s._v("数量/重量")])]),s._v(" "),s._l(t.batchInfo,function(t,e){return a("div",{key:e,staticClass:"item-two sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[s._v(s._s(t.batchCode))]),s._v(" "),a("span",[s._v(s._s(t.timeCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.supplier))])]),s._v(" "),s.orderDetail.isBrand?a("span",[s._v(s._s(t.distributionStr))]):s._e(),s._v(" "),a("span",[a("em",[s._v(s._s(t.priceAndName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.wName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.outMatNumCus))])])])})],2):s._e()])})],2):s._e()]),s._v(" "),s._l(s.pageList,function(t,e){return s.pageList.length?a("div",{key:e,staticClass:"print-page",style:{height:t.hei}},[a("div",{staticClass:"page-box"},[s._v("第"+s._s(e+2)+"页，共"+s._s(s.pageList.length+1)+"页")]),s._v(" "),s._l(t,function(t){return[t.goods?a("div",{staticClass:"main"},[s._m(3,!0),s._v(" "),s._l(t.goods,function(t,e){return a("div",{key:e,staticClass:"list-one"},[t.serialNumCus?a("div",{staticClass:"item-one sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.itemName))])]),s._v(" "),a("span",[s._v(s._s(t.barCode))]),s._v(" "),a("span",[s._v(s._s(t.typeNameCus))]),s._v(" "),a("span",[s._v(s._s(t.outGoodsNumCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.costTotal))])])]):s._e(),s._v(" "),s.open&&t.batchInfo.length?a("div",{staticClass:"list-two"},[s._m(4,!0),s._v(" "),s._l(t.batchInfo,function(e,i){return a("div",{key:i,staticClass:"item-two sign-dom",attrs:{"data-sign":e.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(e.serialNumCus))]),s._v(" "),a("span",[s._v(s._s(e.batchCode))]),s._v(" "),a("span",[s._v(s._s(e.timeCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(e.supplier))])]),s._v(" "),a("span",[a("em",[s._v(s._s(e.priceAndName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.wName)+"-"+s._s(t.aName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(e.outGoodsNumCus))])])])})],2):s._e()])})],2):s._e(),s._v(" "),t.material?a("div",{staticClass:"main"},[t.isTitle?a("div",{staticClass:"head"},[s._v("物料列表·共 "+s._s(s.materialList.length)+" 条 (详细)")]):s._e(),s._v(" "),s._m(5,!0),s._v(" "),s._l(t.material,function(t,e){return a("div",{key:e,staticClass:"list-one material"},[t.serialNumCus?a("div",{staticClass:"item-one sign-dom",attrs:{"data-sign":t.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(t.serialNumCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(t.itemName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.cateCus))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.matType))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.outMatNumCus))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.costTotal))])])]):s._e(),s._v(" "),s.open&&t.batchInfo.length?a("div",{staticClass:"list-two",class:{brand:s.orderDetail.isBrand}},[a("div",{staticClass:"title-two"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("批次编码")]),s._v(" "),a("span",[s._v("生产日期")]),s._v(" "),a("span",[s._v("供应商")]),s._v(" "),s.orderDetail.isBrand?a("span",[s._v("分销价")]):s._e(),s._v(" "),a("span",[s._v("进价")]),s._v(" "),a("span",[s._v("所属仓库")]),s._v(" "),a("span",[s._v("数量/重量")])]),s._v(" "),s._l(t.batchInfo,function(e,i){return a("div",{key:i,staticClass:"item-two sign-dom",attrs:{"data-sign":e.domSign}},[a("span",{staticClass:"narrow"},[s._v(s._s(e.serialNumCus))]),s._v(" "),a("span",[s._v(s._s(e.batchCode))]),s._v(" "),a("span",[s._v(s._s(e.timeCus))]),s._v(" "),a("span",[a("em",[s._v(s._s(e.supplier))])]),s._v(" "),s.orderDetail.isBrand?a("span",[s._v(s._s(e.distributionStr))]):s._e(),s._v(" "),a("span",[a("em",[s._v(s._s(e.priceAndName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(t.wName)+"-"+s._s(t.aName))])]),s._v(" "),a("span",[a("em",[s._v(s._s(e.outMatNumCus))])])])})],2):s._e()])})],2):s._e()]})],2):s._e()})],2)])},[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-one"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("商品名")]),s._v(" "),a("span",[s._v("条形码")]),s._v(" "),a("span",[s._v("类型")]),s._v(" "),a("span",[s._v("出货数量/重量")]),s._v(" "),a("span",[s._v("成本总额")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-two"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("批次号")]),s._v(" "),a("span",[s._v("生产日期")]),s._v(" "),a("span",[s._v("供应商")]),s._v(" "),a("span",[s._v("进价")]),s._v(" "),a("span",[s._v("所属仓库")]),s._v(" "),a("span",[s._v("数量/重量")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-one"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("物料名")]),s._v(" "),a("span",[s._v("分类")]),s._v(" "),a("span",[s._v("类型")]),s._v(" "),a("span",[s._v("出货数量/重量")]),s._v(" "),a("span",[s._v("成本总额")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-one"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("商品名")]),s._v(" "),a("span",[s._v("条形码")]),s._v(" "),a("span",[s._v("类型")]),s._v(" "),a("span",[s._v("出货数量/重量")]),s._v(" "),a("span",[s._v("成本总额")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-two"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("批次号")]),s._v(" "),a("span",[s._v("生产日期")]),s._v(" "),a("span",[s._v("供应商")]),s._v(" "),a("span",[s._v("进价")]),s._v(" "),a("span",[s._v("所属仓库")]),s._v(" "),a("span",[s._v("数量/重量")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"title-one"},[a("span",{staticClass:"narrow"},[s._v("序号")]),s._v(" "),a("span",[s._v("物料名")]),s._v(" "),a("span",[s._v("分类")]),s._v(" "),a("span",[s._v("类型")]),s._v(" "),a("span",[s._v("出货数量/重量")])])}],!1,null,"30f4134f",null);t.default=v.exports},baa8:function(s,t,a){"use strict";var e=a("8c13");a.n(e).a}}]);