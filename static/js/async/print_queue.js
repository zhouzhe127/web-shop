(window.webpackJsonp=window.webpackJsonp||[]).push([["print_queue"],{"2b5b":function(t,e,n){},c5c6:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticStyle:{"text-align":"left",position:"relative"},attrs:{id:"print-queue"}},[n("section",[n("com-table",{attrs:{listHeight:50,listName:"打印队列",fixed:2,listWidth:770,showTitle:1,introData:t.PrintList,titleData:t.titleList,allTotal:t.PrintList.length},scopedSlots:t._u([{key:"con-0",fn:function(e){return n("div",{},[t._v(t._s(e.index+1))])}},{key:"con-5",fn:function(e){return n("div",{},[n("a",{staticClass:"blue",staticStyle:{width:"100%"},attrs:{href:"javascript:void(0);"},on:{click:function(n){t.openDetails(e.data.printData)}}},[t._v("详情")])])}}])})],1),t._v(" "),t.showWin?n("print-queue-win",{attrs:{alist:t.alist},on:{printQueueWin:t.throwWinResult}}):t._e()],1)};i._withStripped=!0;var r=n("81a2");function a(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(r,a){try{var o=e[r](a),s=o.value}catch(t){return void n(t)}if(!o.done)return Promise.resolve(s).then(function(t){i("next",t)},function(t){i("throw",t)});t(s)}("next")})}}var o={data:function(){return{titleList:[{titleName:"序号",titleStyle:{width:"10%"}},{titleName:"打印单据名称",titleStyle:{width:"20%"},dataName:"orderName"},{titleName:"打印机ip",titleStyle:{width:"20%"},dataName:"ip"},{titleName:"打印次数",titleStyle:{width:"10%"},dataName:"printTimes"},{titleName:"生成时间",titleStyle:{width:"20%"},dataName:"createTime"},{titleName:"打印详情",titleStyle:{width:"20%"}}],shopId:null,PrintList:[],showWin:!1,alist:[]}},mounted:function(){this.$store.commit("setPageTools",[{name:"清空打印队列",className:["addStaff","export-btn","green"],fn:this.clearbtn}]),this.getPrintList()},components:{win:function(){return n.e("win").then(n.bind(null,"f60a"))},comTable:function(){return n.e("table").then(n.bind(null,"4360"))},printQueueWin:function(){return n.e("print_queue_win").then(n.bind(null,"5a5f"))}},methods:{throwWinResult:function(){this.showWin=!1},getPrintList:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.a.getPrintList({data:{}});case 2:n=e.sent,t.PrintList=n;case 4:case"end":return e.stop()}},e,t)}))()},clearbtn:function(){var t=this;this.$store.commit("setWin",{title:"操作提示",winType:"confirm",content:"确定清空打印队列?",callback:function(e){"ok"==e&&t.clearPrr()}})},clearPrr:function(){var t=this;return a(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.a.clearPrintcolumn({data:{}});case 2:e.sent?(t.$store.commit("setWin",{title:"提示",winType:"alert",content:"打印队列已清空！"}),t.getPrintList()):t.$store.commit("setWin",{title:"错误提示",winType:"alert",content:"请求失败"});case 4:case"end":return e.stop()}},e,t)}))()},openDetails:function(t){this.showWin=!0;for(var e=t.split(","),n=0;n<e.length;n++)""!=e[n]&&void 0!==e[n]&&"-"!=e[n]||(e.splice(n,1),n-=1);this.alist=e}}},s=(n("d070"),n("7610")),l=Object(s.a)(o,i,[],!1,null,"6bdb9438",null);l.options.__file="src\\module\\shop_config\\print_queue.vue";e.default=l.exports},d070:function(t,e,n){"use strict";var i=n("2b5b");n.n(i).a}}]);