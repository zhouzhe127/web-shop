(window.webpackJsonp=window.webpackJsonp||[]).push([["page_select_all"],{"110c":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM3Q0IyMDNCREYxMTFFNkJCMjBCMDk4RUE1RkFBOUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM3Q0IyMDRCREYxMTFFNkJCMjBCMDk4RUE1RkFBOUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzdDQjIwMUJERjExMUU2QkIyMEIwOThFQTVGQUE5QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzdDQjIwMkJERjExMUU2QkIyMEIwOThFQTVGQUE5QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pr9ucPQAAAFaSURBVHjarNQ7LARBHMfx2ROF9/tc4gqJREGhUduLgkYjUUmUOlEqlCqJRojCoxMVtYIoKBUaOc8gItGcZ0Mj1neSWTln/mtu3T/5JLc3s7/Mzvx3vSAIlKVSGEA79IRL7CGnHCpRcJ3GFo4xiDKUYxhnWEfyz1S9UqMXd5hGRd7/oRrM4grdlvFv4Y823GMoarIxhms0SXM8s6cbOMeMcqt5VGFcevw0HlDpsMpQI15RbxvXB9WPXbwp93rCIfqk09dtk1XFl+6QDin0E16M0ITpYevADXpihOp7LqSDSuERtUUcVCteTO+KLbVmNn/KcZWreMdk1BvVgluMOqxyAidRT5Z/0WVewTk0WCYnsYwsjuC7hGrNWMEztrGIJeyYfV9AHTLIScGe8OmrRgadpm1OcVDwgujxTYxgX/pKxeHbVvzfUGtwKUJ/BZcq9EewdFBxy8fHlwADAMK7/x/UqqS7AAAAAElFTkSuQmCC"},"40e9":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("win",{attrs:{height:560,width:920,ok:t.btnOK,cancel:t.btnCancel},on:{winEvent:t.closeSelfWin}},[n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),n("div",{attrs:{slot:"content",id:"list-page"},slot:"content"},[n("div",{staticClass:"body-head"},[n("div",{staticClass:"block-div"},[n("select-store",{attrs:{sorts:t.category,isSingle:t.sortOne.isSingle,tipName:t.sortOne.tipName},on:{emit:function(e){t.getSelectStore(e,"one")}}})],1),t._v(" "),n("div",{staticClass:"block-div"},[n("select-store",{attrs:{sorts:t.child,isSingle:t.sortTwo.isSingle,tipName:t.sortTwo.tipName},on:{emit:function(e){t.getSelectStore(e,"two")}}}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:0==t.child.length,expression:"child.length == 0"}],staticClass:"cover-div",on:{click:t.stopShowSelectStore}})],1),t._v(" "),n("div",{staticClass:"input-div"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{type:"text",placeholder:t.placeholder},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}}),t._v(" "),n("span",{staticClass:"search-img",on:{click:t.funSearchGoods}},[n("img",{attrs:{src:i("110c"),alt:""}})])])]),t._v(" "),t.showBtn?n("div",{staticClass:"body-head",staticStyle:{overflow:"hidden"}},[n("div",{staticClass:"menu fl"},t._l(t.buttons,function(e,i){return n("span",{key:i,staticClass:"radio",class:{"select-radio":e.id==t.selectBtn.id},on:{click:function(n){t.toggleButton(e,i)}}},[t._v(t._s(e.id==t.selectBtn.id?e.alias:e.name))])}))]):t._e(),t._v(" "),n("div",{staticClass:"body-content"},[n("div",{staticClass:"list-all"},[t._l(t.goodsList,function(e,i){return[n("span",{key:i,class:{"mul-span":t.radio&&e.selected,"single-span":!t.radio&&e.selected},on:{click:function(n){t.chooseItem(e,i)}}},[t._v(t._s(e[t.fieldName]))])]})],2)]),t._v(" "),n("div",{staticClass:"body-bottom-only"},[n("div",{staticClass:"page-container"},[n("pageElement",{attrs:{page:t.pageObj.currentPage,total:t.pageObj.totalNum,num:t.pageObj.num,showPageNum:t.pageObj.showPageNum,isNoPaging:!0,isNoJump:!t.pageObj.isNoJump},on:{pageNum:t.getPageNum}})],1),t._v(" "),1==t.selectBtn.id||2==t.selectBtn.id?n("span",{staticClass:"select-tips"},[t._v("已选择:"+t._s(t.pageObj.count+"个"))]):n("span",{staticClass:"select-tips"},[t._v("已选择:"+t._s(t.selectItem.length>1?t.selectItem.length+"个":t.selectItem[0]&&t.selectItem[0][t.fieldName]))])])])])};n._withStripped=!0;var r=i("bbb9"),s=i("81a2"),a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=function(){return function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var i=[],n=!0,r=!1,s=void 0;try{for(var a,o=t[Symbol.iterator]();!(n=(a=o.next()).done)&&(i.push(a.value),!e||i.length!==e);n=!0);}catch(t){r=!0,s=t}finally{try{!n&&o.return&&o.return()}finally{if(r)throw s}}return i}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();function l(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}function c(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function n(r,s){try{var a=e[r](s),o=a.value}catch(t){return void i(t)}if(!a.done)return Promise.resolve(o).then(function(t){n("next",t)},function(t){n("throw",t)});t(o)}("next")})}}var h={data:function(){return{btnOK:{content:"确定",style:"background-color:#ff9800"},btnCancel:{content:"取消",style:"background-color:#a0a0a0"},pageObj:{num:50,currentPage:1,totalNum:0,showPageNum:6,isNoJump:!1},sortOne:{tipName:"请选择一级分类",isSingle:!0,isConfirm:!0,status:-1},sortTwo:{tipName:"请选择二级分类",isSingle:!0,isConfirm:!1,status:-1},category:[],child:[],selectCategory:{parent:[],child:[]},buttons:[{id:2,name:"选择全部",alias:"取消全部",selected:!1},{id:1,name:"选择本类",alias:"取消本类",selected:!1},{id:0,name:"选择本页",alias:"取消本页",selected:!1}],selectBtn:{},goodsList:[],selectItem:[],search:""}},props:{fieldName:{type:String,default:"name"},title:{type:String,default:"选择物料"},radio:{type:Boolean,default:!0},pCategory:{type:Array,default:Array},pSelCategory:{type:Array,default:Array},pPageObj:{type:Object,default:Object},pSelGoods:{type:Array,default:Array},pSelBtn:{type:[Number,String],default:-1},showBtn:{type:Boolean,default:!0},pSearch:{type:String,default:""},placeholder:{type:String,default:"请输入物料名称"}},watch:{pSelGoods:function(){this.initGoodsList()},pSelCategory:function(){this.initCategory()},pCategory:function(){this.initCategory()},pPageObj:function(){this.initPageObj()},pSelBtn:function(){this.initBtn()}},methods:{funSearchGoods:function(){var t=this;return c(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.selectBtn={},t.pageObj.currentPage=1,t.selectItem=[],e.next=5,t.requestGoodsList();case 5:case"end":return e.stop()}},e,t)}))()},getPageNum:function(t){var e=this;return c(regeneratorRuntime.mark(function i(){return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(e.pageObj.currentPage!=t.page){i.next=2;break}return i.abrupt("return");case 2:return 0==e.selectBtn.id&&(e.selectBtn={}),e.pageObj.currentPage=parseInt(t.page),i.next=6,e.requestGoodsList();case 6:e.initGoodsList(e.selectItem);case 7:case"end":return i.stop()}},i,e)}))()},closeSelfWin:function(t){var e,i,n={};(e=i=[].concat(l(this.selectCategory.parent))).push.apply(e,l(this.selectCategory.child)),this.pageObj.currentPage=1,"ok"==t&&(n={pSelGoods:this.selectItem,pPageObj:this.pageObj,pSelBtn:this.selectBtn,pSelCategory:i,child:this.selectCategory.child,parent:this.selectCategory.parent,cid:this.getCategoryId()}),n=r.a.deepCopy(n),console.log(n),this.$emit("selGoods",t,n)},stopShowSelectStore:function(){-1!=this.sortOne.status?0!=this.child.length||this.alertWin("该分类下无二级分类!"):this.alertWin("请先选择一级分类!")},getSelectStore:function(t,e,i){if("one"==e){var n=this.filterSelectStore(t);this.child=this.filterChildCategory(n),this.selectCategory.parent=n,this.selectCategory.child=[],this.sortTwo.tipName="请选择二级分类",i||(this.selectBtn={}),n.length>0?this.sortOne.status=1:(this.sortOne.status=-1,this.selectCategory={parent:[],child:[]},1==this.selectBtn.id&&(this.selectBtn={}))}else this.selectCategory.child=this.filterSelectStore(t)},toggleButton:function(t){var e={},i="number"==typeof this.selectBtn.id;if(!i||t.id==this.selectBtn.id){if(1!=t.id||0!=this.selectCategory.parent.length)return i&&t.id==this.selectBtn.id?(this.selectBtn={},e=this.initSelect(this.goodsList,[],!0,!1,"selected"),0==t.id?this.delSelectItem(this.selectItem,e.no):this.selectItem=[],void(this.goodsList=e.arr)):void(i||(this.selectBtn=t,e=this.initSelect(this.goodsList,[],!1,!0,"selected"),this.goodsList=e.arr,1==this.selectBtn.id||2==this.selectBtn.id?this.selectItem=[]:this.selectItem=this.addSelectItem(this.selectItem,e.no)));this.alertWin("请先选择分类!")}},chooseItem:function(t){var e=this.selectBtn.id;if(1!=e&&2!=e){var i=!t.selected,n={};this.radio?(t.selected=!t.selected,t.selected?(this.selectItem.push(t),"number"!=typeof this.selectBtn.id&&this.selectItem.length==this.goodsList.length&&this.goodsList.length>0&&(this.selectBtn=this.getEleById(this.buttons,0,"id"))):(0==this.selectBtn.id&&(this.selectBtn={}),this.deleteEle(this.selectItem,t.id,"id"))):(n=this.initSelect(this.goodsList,[t],i,!1,"selected"),this.goodsList=n.arr,this.selectItem=i?[t]:[])}},deleteEle:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"id",n=0,r=t.length;n<r;n+=1)if(t[n][i]==e){t.splice(n,1);break}},initSelect:function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];var n=o(e,5),r=n[0],s=void 0===r?[]:r,c=n[1],h=void 0===c?[]:c,u=n[2],d=void 0===u||u,g=n[3],f=void 0!==g&&g,p=n[4],v=void 0===p?"isSelect":p,y=[],m={arr:[],sel:[],no:[]};y=0==h.length?[null]:h[0]&&"object"==a(h[0])?this.listGetAttr(h,"id"):h;var b=!0,S=!1,w=void 0;try{for(var I,C=s[Symbol.iterator]();!(b=(I=C.next()).done);b=!0){for(var A=I.value,B=0;B<y.length;B+=1){if(A.id==y[B]){A[v]=d,m.sel.push(A),y.length>1&&y.splice(B,1);break}A[v]=f}A[v]==f&&m.no.push(A)}}catch(t){S=!0,w=t}finally{try{!b&&C.return&&C.return()}finally{if(S)throw w}}return m.arr=[].concat(l(s)),m},initSelectCategory:function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];var n=o(e,4),r=n[0],s=void 0===r?[]:r,c=n[1],h=void 0===c?[]:c,u=n[2],d=void 0===u||u,g=n[3],f=void 0===g?"selected":g,p=[],v={arr:[],sel:[],no:[]};p=0==h.length?[null]:h[0]&&"object"==a(h[0])?this.listGetAttr(h,"id"):h;var y=!0,m=!1,b=void 0;try{for(var S,w=s[Symbol.iterator]();!(y=(S=w.next()).done);y=!0){for(var I=S.value,C=0;C<p.length;C++){if(I.id==p[C]){I[f]=d,v.sel.push(I),p.length>1&&p.splice(C,1);break}I[f]=!d}I[f]==!d&&v.no.push(I),Array.isArray(I.child)||(I.child=[]);var A=!0,B=!1,G=void 0;try{for(var j,O=I.child[Symbol.iterator]();!(A=(j=O.next()).done);A=!0){for(var k=j.value,R=0;R<p.length;R++){if(k.id==p[R]){k[f]=d,v.sel.push(k),p.length>1&&p.splice(R,1);break}k[f]=!d}k[f]==!d&&v.no.push(k)}}catch(t){B=!0,G=t}finally{try{!A&&O.return&&O.return()}finally{if(B)throw G}}if(!this.radio&&1==v.sel.length)break}}catch(t){m=!0,b=t}finally{try{!y&&w.return&&w.return()}finally{if(m)throw b}}return v.arr=[].concat(l(s)),v},listGetAttr:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"id",i=[];return t.forEach(function(t,n){i[n]=t[e]+""}),i},filterChildCategory:function(t){var e=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done);i=!0){var o=s.value;o.child&&e.push.apply(e,l(o.child))}}catch(t){n=!0,r=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw r}}return e},filterSelectStore:function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).filter(function(t){return t.selected})},assignCategory:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done);i=!0){var o=s.value;if(0==o.pid){o.child=[];var l=!0,c=!1,h=void 0;try{for(var u,d=t[Symbol.iterator]();!(l=(u=d.next()).done);l=!0){var g=u.value;g.pid==o.id&&o.child.push(g)}}catch(t){c=!0,h=t}finally{try{!l&&d.return&&d.return()}finally{if(c)throw h}}e.push(o)}}}catch(t){n=!0,r=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw r}}return e},alertWin:function(t){this.$store.commit("setWin",{title:"温馨提示",content:t})},getEleById:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"id",n={},r=!0,s=!1,a=void 0;try{for(var o,l=t[Symbol.iterator]();!(r=(o=l.next()).done);r=!0){var c=o.value;if(c[i]==e){n=c;break}}}catch(t){s=!0,a=t}finally{try{!r&&l.return&&l.return()}finally{if(s)throw a}}return n},addSelectItem:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=this.listGetAttr(t,"id"),n=new Set(i),r=[].concat(l(t)),s=!0,a=!1,o=void 0;try{for(var c,h=e[Symbol.iterator]();!(s=(c=h.next()).done);s=!0){var u=c.value,d=u.id+"";n.has(d)||(n.add(d),r.push(u))}}catch(t){a=!0,o=t}finally{try{!s&&h.return&&h.return()}finally{if(a)throw o}}return r},delSelectItem:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=!0,n=!1,r=void 0;try{for(var s,a=e[Symbol.iterator]();!(i=(s=a.next()).done);i=!0)for(var o=s.value,l=0;l<t.length;l++)if(o.id==t[l].id){t.splice(l,1);break}}catch(t){n=!0,r=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw r}}},getCategoryId:function(){var t="",e=this.selectCategory,i=e.parent,n=void 0===i?[]:i,r=e.child,s=void 0===r?[]:r;return s.length>0?t=s[0].id:n.length>0&&(t=n[0].id),t},requestGoodsList:function(){var t=this;return c(regeneratorRuntime.mark(function e(){var i,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i={},n={},i={page:t.pageObj.currentPage,num:t.pageObj.num,cid:t.getCategoryId(),name:t.search},e.next=4,t.getHttp("getMaterialList",i);case 4:n=e.sent,Array.isArray(n.list)&&(t.goodsList=n.list,t.pageObj.totalNum=n.total,t.pageObj.count=n.count);case 6:case"end":return e.stop()}},e,t)}))()},initBtn:function(){var t=this.pSelBtn;""===t&&(t=-1),t=Number(t),this.selectBtn=this.getEleById(this.buttons,t,"id")},initPageObj:function(){var t=!0,e=!1,i=void 0;try{for(var n,r=["num","currentPage","totalNum","showPageNum","isNoJump"][Symbol.iterator]();!(t=(n=r.next()).done);t=!0){var s=n.value;this.pPageObj[s]&&(this.pageObj[s]=this.pPageObj[s])}}catch(t){e=!0,i=t}finally{try{!t&&r.return&&r.return()}finally{if(e)throw i}}},initCategory:function(){var t,e=!0;this.category=this.pCategory;var i=!0,n=!1,r=void 0;try{for(var s,a=this.category[Symbol.iterator]();!(i=(s=a.next()).done);i=!0){0!=s.value.pid&&(e=!1)}}catch(t){n=!0,r=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw r}}e||(this.category=this.assignCategory(this.category)),t=this.initSelectCategory(this.category,this.pSelCategory,!0),this.category=t.arr,this.getSelectStore(this.category,"one",!0)},initGoodsList:function(t){var e={};1==this.selectBtn.id||2==this.selectBtn.id?(e=this.initSelect(this.goodsList,[],!1,!0,"selected"),this.goodsList=e.arr,this.selectItem=[]):(e=this.initSelect(this.goodsList,t,!0,!1,"selected"),this.selectItem=this.addSelectItem(this.selectItem,e.sel),this.goodsList=e.arr,this.selectItem.length==this.goodsList.length&&this.goodsList.length>0?this.selectBtn=this.getEleById(this.buttons,0,"id"):this.selectBtn={})},getHttp:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return c(regeneratorRuntime.mark(function n(){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a[t]({data:i});case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}},n,e)}))()},initData:function(){this.search=this.pSearch}},mounted:function(){var t=this;return c(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.initBtn(),t.initData(),t.initPageObj(),t.initCategory(),e.next=6,t.requestGoodsList();case 6:t.initGoodsList(t.pSelGoods);case 7:case"end":return e.stop()}},e,t)}))()},components:{win:function(){return i.e("win").then(i.bind(null,"f60a"))},selectStore:function(){return i.e("win").then(i.bind(null,"cb83"))},pageElement:function(){return i.e("page_element").then(i.bind(null,"5921"))}}},u=(i("638b"),i("7610")),d=Object(u.a)(h,n,[],!1,null,"5b69fa67",null);d.options.__file="src\\module\\invoicing_system\\brand_assign\\page_select_all.vue";e.default=d.exports},"638b":function(t,e,i){"use strict";var n=i("bba3");i.n(n).a},bba3:function(t,e,i){}}]);