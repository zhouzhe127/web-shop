(window.webpackJsonp=window.webpackJsonp||[]).push([["template_list"],{"0435":function(e,t,n){},"59f9":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"template-list"}},[n("div",{staticClass:"content-head"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],staticClass:"template-name",attrs:{type:"text",maxlength:"30",placeholder:"请输入模板名称"},domProps:{value:e.search},on:{input:function(t){t.target.composing||(e.search=t.target.value)}}}),e._v(" "),n("span",{staticClass:"blue common-btn",on:{click:function(t){e.clickBtn("filter")}}},[e._v("筛选")]),n("span",{staticClass:"gray common-btn",on:{click:function(t){e.clickBtn("reset")}}},[e._v("重置")])]),e._v(" "),n("div",{staticClass:"content-body"},[n("com-table",{attrs:{showHand:!0,listName:"模板列表",listHeight:70,showTitle:1,titleData:e.titleData,introData:e.nowList,allTotal:e.searchList.length,fixed:0,bannerStyle:{color:"#43414a",fontSize:"16px"},widthType:!0,listWidth:1435},scopedSlots:e._u([{key:"con-0",fn:function(t){return n("div",{staticClass:"operation-column"},[n("span",{staticClass:"delete",on:{click:function(n){e.deleteUse(t.data,t.index,"delete")}}},[e._v("删除")]),n("span",{staticClass:"use",on:{click:function(n){e.deleteUse(t.data,t.index,"use")}}},[e._v("使用")])])}},{key:"con-1",fn:function(t){return[e._v("\n                "+e._s(t.data.itemIndex)+"\n            ")]}}])}),e._v(" "),n("div",[n("page-element",{attrs:{page:e.pageObj.page,total:e.pageObj.total},on:{pageNum:e.getPageNum}})],1)],1)])};a._withStripped=!0;var i=n("81a2");function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function s(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function a(i,r){try{var s=t[i](r),u=s.value}catch(e){return void n(e)}if(!s.done)return Promise.resolve(u).then(function(e){a("next",e)},function(e){a("throw",e)});e(u)}("next")})}}var u={data:function(){return{titleData:[{titleName:"操作"},{titleName:"序号"},{titleName:"模板名称",dataName:"name"}],introData:[],pageObj:{page:1,total:0,num:10},templateList:[],nowList:[],searchList:[],search:""}},methods:{clickBtn:function(e){"reset"==e&&(this.search=""),this.searchList=this.fnSearch(this.templateList,this.search),this.pageObj.total=Math.ceil(this.searchList.length/this.pageObj.num),this.getPageNum({page:1,num:this.pageObj.num})},addItemIndex:function(e){for(var t=0;t<e.length;t++){var n=(this.pageObj.page-1)*this.pageObj.num+1+t;e[t].itemIndex=n>=10?n:"0"+n}return e},deleteTemplate:function(e){var t=this;return s(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.getHttp("deleteApplicationTemplate",{id:e.id});case 2:if(n.sent){n.next=5;break}return n.abrupt("return");case 5:t.templateList=t.templateList.filter(function(t){return t.id!=e.id}),t.searchList=t.searchList.filter(function(t){return t.id!=e.id}),t.pageObj.total=Math.ceil(t.searchList.length/t.pageObj.num),t.getPageNum({page:t.pageObj.page,num:t.pageObj.num}),t.pageObj.page>1&&0==t.nowList.length&&(t.pageObj.page-=1,t.getPageNum({page:t.pageObj.page,num:t.pageObj.num}));case 10:case"end":return n.stop()}},n,t)}))()},deleteUse:function(e,t,n){var a=this;return s(regeneratorRuntime.mark(function i(){var r;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:"delete"==n?a.$store.commit("setWin",{title:"温馨提示",winType:"confirm",content:"确认删除该模板?",callback:function(n){"ok"==n&&a.deleteTemplate(e,t)}}):((r=a.$route.query).id=e.id,r.tab=2,a.$router.push({path:"schedulingApplication/purchaseRequisition",query:r}));case 1:case"end":return i.stop()}},i,a)}))()},initPage:function(e,t,n){var a=(t-1)*n,i=t*n;return e.slice(a,i)},getPageNum:function(e){this.pageObj.page=e.page,e.num!=this.pageObj.num&&(this.pageObj.num=e.num,this.pageObj.total=Math.ceil(this.searchList.length/this.pageObj.num)),this.nowList=this.initPage(this.searchList,this.pageObj.page,this.pageObj.num),this.nowList=this.addItemIndex(this.nowList)},fnSearch:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return(t=t.trim())?e.filter(function(e){if("string"==typeof e.name&&e.name.includes(t))return!0}):e},getHttp:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return s(regeneratorRuntime.mark(function a(){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a[e]({data:n});case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}},a,t)}))()}},computed:{},mounted:function(){var e=this;return s(regeneratorRuntime.mark(function t(){var n,a;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getHttp("getApplicationTemplates",{type:1});case 2:n=t.sent,Array.isArray(n)&&(e.templateList=n,(a=e.searchList).push.apply(a,r(n)),e.pageObj.total=Math.ceil(e.searchList.length/e.pageObj.num),e.getPageNum({page:1,num:10}));case 4:case"end":return t.stop()}},t,e)}))()},components:{comTable:function(){return n.e("table").then(n.bind(null,"4360"))},pageElement:function(){return n.e("page_element").then(n.bind(null,"5921"))}}},c=(n("e127"),n("7610")),o=Object(c.a)(u,a,[],!1,null,"f3b5b3d4",null);o.options.__file="src\\module\\invoicing_system\\warehouse_manage\\template_list.vue";t.default=o.exports},e127:function(e,t,n){"use strict";var a=n("0435");n.n(a).a}}]);