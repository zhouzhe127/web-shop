(window.webpackJsonp=window.webpackJsonp||[]).push([["supplies_list"],{2570:function(t,n,i){},2939:function(t,n,i){"use strict";var e=i("2570");i.n(e).a},"8ab69":function(t,n,i){"use strict";i.r(n);var e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"supplies"},[i("div",{staticClass:"list"},[i("div",{staticClass:"head"},[t._v("\n\t\t\t批次列表 · 共\n\t\t\t"),i("em",[t._v(t._s(t.goodsList.length))]),t._v("条数据\n\t\t")]),t._v(" "),t._m(0),t._v(" "),i("ul",t._l(t.showList,function(n,e){return i("li",{key:e},[i("div",{staticClass:"infoDetail"},[i("a",{staticStyle:{color:"#5ebee8"},attrs:{href:"javascript:void(0);"},on:{click:function(i){t.showDetail(n)}}},[t._v("入库")]),t._v("|\n\t\t\t\t\t"),i("a",{staticStyle:{color:"red"},attrs:{href:"javascript:void(0);"},on:{click:function(i){t.addListhouse(n)}}},[t._v("耗损")]),t._v("|\n\t\t\t\t\t"),i("a",{staticStyle:{color:"orange"},attrs:{href:"javascript:void(0);"},on:{click:function(i){t.openBar(n)}}},[t._v("修改")])]),t._v(" "),i("span",{staticClass:"wide handle"},[t._v("\n\t\t\t\t\t"+t._s(e+1+10*(t.page-1))+"\n\t\t\t\t")]),t._v(" "),i("span",[t._v(t._s(n.batchCode))]),t._v(" "),i("span",[t._v(t._s(t.getTime(n.productionTime)))]),t._v(" "),i("span",[t._v(t._s(n.supplier||"--"))]),t._v(" "),t.goodsData.relation.length>0?i("span",[t._v(t._s(t.comUnit(n.surplus,t.goodsData.relation[t.selUnit].value,t.goodsData.relation[t.selUnit].name,t.isMin.name)))]):i("span",[t._v("--")]),t._v(" "),i("span",[t._v(t._s(n.purchasePrice)+"元/"+t._s(t.getpiceunit(n.purchaseUnit)))]),t._v(" "),i("span",[t._v(t._s(n.wName||"暂无")+"-"+t._s(n.aName||"暂无"))])])})),t._v(" "),0==t.showList.length?i("div",{attrs:{id:"emptyData"}},[t._v("目前没有显示数据")]):t._e()]),t._v(" "),i("div",{staticClass:"page-box"},[i("page-btn",{attrs:{isNoJump:!1,isNoPaging:!0,total:t.pageTotal,page:t.page},on:{pageNum:t.pageChange}})],1)])};e._withStripped=!0;var a=i("bbb9"),s=i("f6ce"),o=i("05dd"),r=function(){return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,n){var i=[],e=!0,a=!1,s=void 0;try{for(var o,r=t[Symbol.iterator]();!(e=(o=r.next()).done)&&(i.push(o.value),!n||i.length!==n);e=!0);}catch(t){a=!0,s=t}finally{try{!e&&r.return&&r.return()}finally{if(a)throw s}}return i}(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l={data:function(){return{goodsList:"",page:1,pageTotal:0,num:10,showList:"",relation:"",isMin:""}},props:["goodsData","selUnit"],methods:{getTime:function(t){return a.a.format(1e3*parseInt(t),"yyyy年MM月dd日")},pageChange:function(t){this.page=t.page,this.resetGoods(this.goodsList)},resetGoods:function(t){this.listTotal=t.length,this.pageTotal=Math.ceil(t.length/this.num),this.showList=t.slice(10*(this.page-1),10*this.page)},getpiceunit:function(t){var n="",i=!0,e=!1,a=void 0;try{for(var s,o=this.goodsData.relation[Symbol.iterator]();!(i=(s=o.next()).done);i=!0){var r=s.value;t==r.muId&&(n=r.name)}}catch(t){e=!0,a=t}finally{try{!i&&o.return&&o.return()}finally{if(e)throw a}}return n},showDetail:function(t){s.a.session("putstoreInfo",t),this.$router.push({path:"/admin/inventoryManagement/materialsPutinStorage",query:{type:2}})},addListhouse:function(t){console.log(t),s.a.session("lossInfo",t),this.$router.push({path:"/admin/inventoryManagement/materialLoss"})},openBar:function(t){s.a.session("editInfo",t),this.$router.push({path:"/admin/inventoryManagement/materialModifyBatch"})},comUnit:function(){for(var t=arguments.length,n=Array(t),i=0;i<t;i++)n[i]=arguments[i];var e=r(n,5),a=e[0],s=e[1],l=e[2],u=e[3],c=e[4];return o.a.comUnit(a,s,l,u,c)},init:function(){this.goodsList=this.goodsData.list,this.relation=this.goodsData.relation;var t=!0,n=!1,i=void 0;try{for(var e,a=this.relation[Symbol.iterator]();!(t=(e=a.next()).done);t=!0){var s=e.value;1==s.isMin&&(this.isMin=s)}}catch(t){n=!0,i=t}finally{try{!t&&a.return&&a.return()}finally{if(n)throw i}}this.resetGoods(this.goodsList)}},mounted:function(){this.goodsData&&this.init()},watch:{goodsData:function(){this.init()}},components:{pageBtn:function(){return i.e("page_element").then(i.bind(null,"5921"))},selectBtn:function(){return i.e("select_btn").then(i.bind(null,"3d41"))}}},u=(i("2939"),i("6ceb")),c=Object(u.a)(l,e,[function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"title"},[i("span",[t._v("操作")]),t._v(" "),i("span",[t._v("序号")]),t._v(" "),i("span",[t._v("批次编码")]),t._v(" "),i("span",[t._v("生产日期")]),t._v(" "),i("span",[t._v("供应商")]),t._v(" "),i("span",[t._v("数量/重量")]),t._v(" "),i("span",[t._v("进价")]),t._v(" "),i("span",[t._v("仓库所属")])])}],!1,null,"5738e800",null);c.options.__file="src\\module\\invoicing_system\\invoicing\\supplies_list.vue";n.default=c.exports}}]);