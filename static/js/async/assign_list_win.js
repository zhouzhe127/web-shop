(window.webpackJsonp=window.webpackJsonp||[]).push([["assign_list_win"],{"070a":function(t,e,i){},"1c73":function(t,e,i){"use strict";var n=i("070a");i.n(n).a},"38b2":function(t,e,i){"use strict";i.r(e);var n=i("bbb9"),s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l=function(){return function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var i=[],n=!0,s=!1,l=void 0;try{for(var o,r=t[Symbol.iterator]();!(n=(o=r.next()).done)&&(i.push(o.value),!e||i.length!==e);n=!0);}catch(t){s=!0,l=t}finally{try{!n&&r.return&&r.return()}finally{if(s)throw l}}return i}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();function o(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}var r={data:function(){return{btnOk:{},btnCancel:{},selectRadio:0,selects:[],dataList:[],nowList:[],buttons:[],selectMenu:{},listDivHeight:300}},props:{btns:{type:Array,default:Array},winDesc:{type:Object,default:Object},ok:{type:Object,default:Object},cancel:{type:Object,default:Object},showTips:{type:Boolean,default:!0},showMenus:{type:Boolean,default:!0},list:{type:Array,default:Array},selectList:{type:Array,default:Array},radio:{type:Boolean,default:!0},tips:{type:String,default:"没有该数据信息!"},title:{type:String,default:"添加单位"},fieldName:{type:String,default:"goodsName"},relAttr:{type:String,default:"type"},eleStyle:{type:Object,default:Object}},watch:{selectList:function(){this.initData()},list:function(){this.initData()},ok:function(){this.initBtn()},cancel:function(){this.initBtn()}},methods:{closeSelfWin:function(t){var e=[];e="ok"==t?this.selects:[],e=n.a.deepCopy(e),this.$emit("throwCommonWin",e,t)},operationAll:function(t){if(this.radio){var e={};"checkbox"==t?(this.selectRadio=1,e=this.initSelect(this.nowList,[],!1,!0)):(this.selectRadio=2,e=this.initSelect(this.nowList,this.selects,!1,!0)),this.nowList=[].concat(o(e.arr)),this.selects=this.getSelects(this.dataList)}},chooseItem:function(t){if(!t.notAllow)if(t.isSelect=!t.isSelect,this.radio){if(t.isSelect)this.selects.push(t);else for(var e=0,i=this.selects.length;e<i;e+=1)if(t.id==this.selects[e].id){this.selects.splice(e,1);break}}else this.selects=t.isSelect?[t]:[]},toggleMenu:function(t){var e=this,i=t.relAttr;this.selectMenu=t,this.nowList=0==i?[].concat(o(this.dataList)):this.dataList.filter(function(t){return t[e.relAttr]==i})},getSelects:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=[],i=!0,n=!1,s=void 0;try{for(var l,o=t[Symbol.iterator]();!(i=(l=o.next()).done);i=!0){var r=l.value;r.isSelect&&e.push(r)}}catch(t){n=!0,s=t}finally{try{!i&&o.return&&o.return()}finally{if(n)throw s}}return e},listGetAttr:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"id",i=[];return t.forEach(function(t,n){i[n]=t[e]+""}),i},listAddAttr:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"toggle",i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return t.map(function(t){return t[e]=i,t})},initSelect:function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];var n=l(e,4),r=n[0],a=void 0===r?[]:r,c=n[1],u=void 0===c?[]:c,h=n[2],f=void 0===h||h,d=n[3],y=void 0!==d&&d,p=[],v={arr:[],sel:[],no:[]};p=0==u.length?[null]:u[0]&&"object"==s(u[0])?this.listGetAttr(u,"id"):u;var b=!0,g=!1,w=void 0;try{for(var m,S=a[Symbol.iterator]();!(b=(m=S.next()).done);b=!0){for(var A=m.value,_=0;_<p.length;_+=1){if(A.id==p[_]){A.isSelect=f,v.sel.push(A),p.length>1&&p.splice(_,1);break}A.isSelect=y}A.isSelect==y&&v.no.push(A)}}catch(t){g=!0,w=t}finally{try{!b&&S.return&&S.return()}finally{if(g)throw w}}return v.arr=[].concat(o(a)),v},initBtn:function(){var t=this.winDesc.height||560,e=this.showMenus?t-60:t;this.showTips&&(e-=50),this.listDivHeight=e-50,this.ok.content||(this.btnOk={content:"确认",style:"background-color:#ff8d01"}),this.cancel.content||(this.btnCancel={content:"取消",style:"background-color:#9fa0a0"}),this.buttons=[{relAttr:0,name:"全部"},{relAttr:1,name:"直营店"},{relAttr:2,name:"加盟店"}],this.btns.length>0&&(this.buttons=this.btns)},initData:function(){var t;this.dataList=this.list,this.selects=this.selectList,t=this.initSelect(this.dataList,this.selects,!0,!1),this.selects=t.sel,this.dataList=t.arr,this.selectMenu=this.buttons[0],this.toggleMenu(this.selectMenu)}},mounted:function(){this.initBtn(),this.initData()},components:{win:function(){return i.e("win").then(i.bind(null,"f60a"))}}},a=(i("1c73"),i("d801")),c=Object(a.a)(r,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("win",{attrs:{align:"center",width:t.winDesc.width||920,height:t.winDesc.height||560,ok:t.btnOk,cancel:t.btnCancel},on:{winEvent:t.closeSelfWin}},[i("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),i("div",{attrs:{slot:"content",id:"paging-list"},slot:"content"},[t.showMenus?i("div",{staticClass:"menu"},t._l(t.buttons,function(e,n){return i("div",{key:n,staticClass:"button",class:{"select-btn":e.relAttr==t.selectMenu.relAttr},on:{click:function(i){t.toggleMenu(e,n)}}},[t._v(t._s(e.name))])})):t._e(),t._v(" "),i("div",{staticClass:"list",style:{"max-height":t.listDivHeight+"px"}},t._l(t.nowList,function(e,n){return i("span",{key:n,class:{radio:t.selects[0]&&t.selects[0].id==e.id&&!t.radio,checkbox:e.isSelect&&t.radio,"none-select":e.notAllow},style:t.eleStyle,on:{click:function(i){t.chooseItem(e,n)}}},[t._v(t._s(e[t.fieldName]))])})),t._v(" "),t.showTips?i("div",{staticClass:"bottom"},[t.radio?[i("span",{staticClass:"btn",class:{"select-btn":1==t.selectRadio},staticStyle:{"margin-left":"20px"},on:{click:function(e){t.operationAll("checkbox")}}},[t._v("全选")]),t._v(" "),i("span",{staticClass:"btn",class:{"select-btn":2==t.selectRadio},on:{click:function(e){t.operationAll("radio")}}},[t._v("反选")])]:t._e(),t._v(" "),i("span",{staticClass:"tips-word"},[t._v("已选择 : "+t._s(t.selects.length>1?t.selects.length+"个":t.selects[0]&&t.selects[0][t.fieldName]))])],2):t._e(),t._v(" "),0==t.dataList.length?i("div",{staticClass:"none-tips"},[t._v("\n\t\t\t\t"+t._s(t.tips)+"\n\t\t\t")]):t._e()])])},[],!1,null,"caef2a2a",null);e.default=c.exports}}]);