(window.webpackJsonp=window.webpackJsonp||[]).push([["printer_errors"],{"66c1":function(t,e,r){"use strict";r.r(e);var n=r("81a2"),i=r("f6ce");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,r){return function n(i,o){try{var a=e[i](o),s=a.value}catch(t){return void r(t)}if(!a.done)return Promise.resolve(s).then(function(t){n("next",t)},function(t){n("throw",t)});t(s)}("next")})}}var a={data:function(){return{shopId:null,page:0,pageTotal:1,pageNum:10,pageCount:0,printError:[]}},mounted:function(){var t=i.a.session("userShop");this.shopId=t.currentShop.id,this.getPrintErrorList()},components:{comTable:function(){return r.e("table").then(r.bind(null,"4360"))}},methods:{getPrintErrorList:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.getPrintErrorList({data:{shopId:t.shopId}});case 2:r=e.sent,t.printError=r;case 4:case"end":return e.stop()}},e,t)}))()},openDetails:function(t){var e=this;return o(regeneratorRuntime.mark(function r(){return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,n.a.getPrinterrorByEid({data:{shopId:e.shopId,eid:t.eid}});case 2:r.sent?(e.$store.commit("setWin",{title:"提示",winType:"alert",content:"打印信息已传递，请稍等片刻！"}),e.getPrintErrorList()):e.$store.commit("setWin",{title:"错误提示",winType:"alert",content:"请求失败"});case 4:case"end":return r.stop()}},r,e)}))()}}},s=(r("aa47"),r("d801")),c=Object(s.a)(a,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticStyle:{width:"100%"},attrs:{id:"printerError"}},[r("section",{staticClass:"oBox"},[r("div",{staticClass:"boxTop"},[r("span",{staticStyle:{"font-size":"16px","margin-right":"20px"}},[t._v("打印错误列表 · 共"),r("span",{staticStyle:{color:"#ff3c04","font-size":"inherit"}},[t._v(t._s(t.printError.length))]),t._v("个条目")])]),t._v(" "),r("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{stripe:"","header-cell-style":{"background-color":"#f5f7fa"},data:t.printError,border:""}},[r("el-table-column",{attrs:{fixed:"","min-width":"100",align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",{staticStyle:{color:"#FE8D2C",cursor:"pointer"},on:{click:function(r){t.openDetails(e.row)}}},[t._v("补打")])]}}])}),t._v(" "),r("el-table-column",{attrs:{fixed:"",align:"center","min-width":"220",prop:"eid",label:"订单编号"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"120",align:"center",prop:"orderName",label:"打印单据名称"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"120",prop:"errorInfo",align:"center",label:"错误提示"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"180",prop:"createTime",align:"center",label:"生成时间"}})],1)],1)])},[],!1,null,"866269d4",null);e.default=c.exports},aa47:function(t,e,r){"use strict";var n=r("d5d5");r.n(n).a},d5d5:function(t,e,r){}}]);