(window.webpackJsonp=window.webpackJsonp||[]).push([["category_count"],{"20ed":function(t,e,i){"use strict";var n=i("9110");i.n(n).a},"549a":function(t,e,i){"use strict";i.r(e);var n=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"img-div"},[e("img",{attrs:{src:i("b8bc")}}),this._v(" "),e("div",{staticStyle:{"font-size":"20px",color:"#999"}},[this._v("\n\t\t\t\t\t数据加载中,请稍后...\n\t\t\t\t")])])}],s=i("81a2");function a(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function n(s,a){try{var o=e[s](a),r=o.value}catch(t){return void i(t)}if(!o.done)return Promise.resolve(r).then(function(t){n("next",t)},function(t){n("throw",t)});t(r)}("next")})}}var o={data:function(){return{startTime:{show:!0,detail:!0,width:160,time:""},endTime:{show:!0,detail:!0,width:160,time:""},pageObj:{currentPage:1,total:0,num:10},mapHttp:{count:"GoodssalesGetCateSales"},tipsObj:{sale:!1,consume:!1,get:!1},countList:[],nowList:[],extendList:!0,loading:!0,openRadio:!0}},methods:{initBtn:function(){var t=this;this.$store.commit("setPageTools",[{name:"导出",className:["export-btn"],fn:function(){var e=parseInt(t.startTime.time/1e3),i=parseInt(t.endTime.time/1e3),n=t.openRadio?"1":"0";s.a.GoodssalesCateSalesExport({data:{startTime:e,endTime:i,isOpenTime:n},format:"csv"})}}])},getStartTime:function(t){this.startTime.time=t},getEndTime:function(t){this.endTime.time=t},funGetPageNum:function(t){this.pageObj.currentPage=t.page,this.pageObj.num=t.num,this.initPage(this.countList,this.pageObj.currentPage,this.pageObj.num)},initPage:function(t,e,i){var n,s;this.pageObj.total=Math.ceil(t.length/i),n=(e-1)*i,s=e*i,this.nowList=t.slice(n,s)},clickBtn:function(t){var e=this;return a(regeneratorRuntime.mark(function i(){var n,s,a,o;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:e.loading=!0,e.extendList=!0,n=0,s=0,a=0,e.pageObj.currentPage=1,e.pageObj.num=10,o=[],i.t0=t,i.next="filter"===i.t0?9:"reset"===i.t0?10:13;break;case 9:return i.abrupt("break",13);case 10:return e.initTime(),e.openRadio=!0,i.abrupt("break",13);case 13:return a=e.openRadio?"1":"0",n=parseInt(e.startTime.time/1e3),s=parseInt(e.endTime.time/1e3),i.next=18,e.getHttp(e.mapHttp.count,{startTime:n,endTime:s,isOpenTime:a});case 18:o=i.sent,e.loading=!1,e.initCountList(o,!0);case 21:case"end":return i.stop()}},i,e)}))()},tabTips:function(t){document.addEventListener("click",this.domEvent,!1);for(var e=Object.keys(this.tipsObj),i=0,n=e.length;i<n;i++)t==e[i]?this.tipsObj[t]=!this.tipsObj[t]:this.tipsObj[e[i]]=!1},showAllList:function(){var t=this;this.extendList=!this.extendList,this.countList=this.countList.map(function(e){return e.slideDown=t.extendList,e})},toggleList:function(t,e){t.slideDown=!t.slideDown,this.countList.splice(e,1,t)},initTime:function(){var t=new Date,e=[];e[0]=t.getFullYear(),e[1]=t.getMonth(),e[2]=t.getDate(),this.startTime.time=new Date(Number(e[0]),Number(e[1]),Number(e[2]),0,0,0).getTime(),this.endTime.time=new Date(Number(e[0]),Number(e[1]),Number(e[2]),23,59,59).getTime()},getHttp:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return a(regeneratorRuntime.mark(function n(){var a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a[t]({data:i});case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}},n,e)}))()},initCountList:function(t,e){Array.isArray(t)&&(this.countList=t),this.countList=this.countList.map(function(t){return t.slideDown=e,t}),this.initPage(this.countList,this.pageObj.currentPage,this.pageObj.num)},domEvent:function(){this.tabTips("no"),document.removeEventListener("click",this.domEvent)}},mounted:function(){this.initBtn(),this.initTime(),this.clickBtn("filter")},components:{calendar:function(){return i.e("calendar_result").then(i.bind(null,"9265"))},pageElement:function(){return i.e("page_element").then(i.bind(null,"5921"))}},filters:{toFixed:function(t){return t=(t=100*Number(t)).toFixed(2)+"%"}}},r=(i("20ed"),i("d801")),c=Object(r.a)(o,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"categoryCount"}},[i("div",{staticClass:"body-head"},[i("div",{staticClass:"calendar-com"},[i("calendar",{attrs:{pObj:t.startTime},on:{throwTime:t.getStartTime}}),t._v(" "),i("span",{staticStyle:{display:"inline-block","line-height":"40px","vertical-align":"top"}},[t._v(" 至 ")]),t._v(" "),i("calendar",{attrs:{pObj:t.endTime},on:{throwTime:t.getEndTime}})],1),t._v(" "),i("div",{staticClass:"run-time"},[i("span",{staticClass:"img",class:{sel:t.openRadio},on:{click:function(e){t.openRadio=!t.openRadio}}}),t._v(" "),i("span",{staticClass:"time"},[t._v("按营业时间")])]),t._v(" "),i("div",{staticClass:"blue btn-common",on:{click:function(e){t.clickBtn("filter")}}},[t._v("筛选")]),t._v(" "),i("div",{staticClass:"gray btn-common",on:{click:function(e){t.clickBtn("reset")}}},[t._v("重置")])]),t._v(" "),i("div",{staticClass:"body-content"},[i("div",{staticClass:"table-head"},[t._v("\n\t\t\t分类统计\n\t\t\t"),i("span",{staticClass:"circle"}),t._v("共\n\t\t\t"),i("span",{staticClass:"num"},[t._v(t._s(t.countList.length))]),t._v("个条目\n\t\t\t"),i("span",{staticClass:"extend",on:{click:t.showAllList}},[t._v(t._s(t.extendList?"展开二级分类":"收起二级分类"))])]),t._v(" "),i("div",{staticClass:"table-title"},[i("li",{staticClass:"big-li"},[t._v("展开 / 收起")]),t._v(" "),i("li",[t._v("分类名称")]),t._v(" "),i("li",[t._v("销量\n\t\t\t\t"),i("span",{staticClass:"tips",on:{click:function(e){e.stopPropagation(),t.tabTips("sale")}}},[t.tipsObj.sale?i("i",{staticClass:"trangle"}):t._e()]),t._v(" "),t.tipsObj.sale?i("div",{staticClass:"tips-content"},[i("i",{staticClass:"trangle"}),t._v("\n\t\t\t\t\t商品;已销售的数量(不包含退品,包含赠品) 公式:商品总数 - 退品数 = 销量\n\t\t\t\t")]):t._e()]),t._v(" "),i("li",[t._v("消费金额\n\t\t\t\t"),i("span",{staticClass:"tips",on:{click:function(e){e.stopPropagation(),t.tabTips("consume")}}},[t.tipsObj.consume?i("i",{staticClass:"trangle"}):t._e()]),t._v(" "),t.tipsObj.consume?i("div",{staticClass:"tips-content"},[i("i",{staticClass:"trangle"}),t._v("\n\t\t\t\t\t不计算任何优惠且不包含退品金额\n\t\t\t\t")]):t._e()]),t._v(" "),i("li",[t._v("消费占比")]),t._v(" "),i("li",[t._v("实收金额\n\t\t\t\t"),i("span",{staticClass:"tips",on:{click:function(e){e.stopPropagation(),t.tabTips("get")}}},[t.tipsObj.get?i("i",{staticClass:"trangle"}):t._e()]),t._v(" "),t.tipsObj.get?i("div",{staticClass:"tips-content"},[i("i",{staticClass:"trangle"}),t._v("\n\t\t\t\t\t商品原价减去商品的优惠金额(未计算整单减免)\n\t\t\t\t")]):t._e()]),t._v(" "),i("li",[t._v("实收占比")])]),t._v(" "),t._l(t.nowList,function(e,n){return i("div",{key:n,staticClass:"table-row"},[i("div",{staticClass:"row-left"},[i("i",{staticClass:"fi fi-double-angle-up fi-2x font-up",class:{"fi-double-angle-up":!e.slideDown,"font-up":!e.slideDown,"fi-double-angle-down":e.slideDown,"font-down":e.slideDown},on:{click:function(i){t.toggleList(e,n)}}})]),t._v(" "),i("ul",{staticClass:"row-ul"},[i("li",[t._v(t._s(e.name))]),t._v(" "),i("li",[t._v(t._s(e.salesNum))]),t._v(" "),i("li",[t._v(t._s(e.sales))]),t._v(" "),i("li",[t._v(t._s(e.salesPercent))]),t._v(" "),i("li",[t._v(t._s(e.realSales))]),t._v(" "),i("li",[t._v(t._s(e.realSalesPercent))])]),t._v(" "),t._l(e.child,function(s,a){return e.child&&!e.slideDown?i("ul",{key:n+a,staticClass:"row-ul first-row"},[i("li",[t._v(t._s(s.name))]),t._v(" "),i("li",[t._v(t._s(s.salesNum))]),t._v(" "),i("li",[t._v(t._s(s.sales))]),t._v(" "),i("li",[t._v(t._s(s.salesPercent))]),t._v(" "),i("li",[t._v(t._s(s.realSales))]),t._v(" "),i("li",[t._v(t._s(s.realSalesPercent))])]):t._e()})],2)}),t._v(" "),t.loading||0!=t.countList.length?t._e():i("div",{staticClass:"tips-container"},[t._v("\n\t\t\t暂无统计信息\n\t\t")]),t._v(" "),t._e()],2),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.countList.length>0,expression:"countList.length>0"}],staticClass:"page-com"},[i("pageElement",{attrs:{page:t.pageObj.currentPage,total:t.pageObj.total,num:t.pageObj.num,isNoPaging:!1,isNoJump:!0},on:{pageNum:t.funGetPageNum}})],1)])},n,!1,null,"37597050",null);e.default=c.exports},9110:function(t,e,i){},b8bc:function(t,e,i){t.exports=i.p+"images/preloader.3e54c692.gif"}}]);