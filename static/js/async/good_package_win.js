(window.webpackJsonp=window.webpackJsonp||[]).push([["good_package_win"],{"9ccf":function(t,e,o){"use strict";var s=o("a2ab");o.n(s).a},a2ab:function(t,e,o){},f163:function(t,e,o){"use strict";o.r(e);var s=o("bbb9"),i=o("81a2"),n=o("f6ce");function a(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,o){return function s(i,n){try{var a=e[i](n),r=a.value}catch(t){return void o(t)}if(!a.done)return Promise.resolve(r).then(function(t){s("next",t)},function(t){s("throw",t)});t(r)}("next")})}}var r={data:function(){return{oneArea:{name:"请选择一级分类",id:-1,show:!1,oneAreaIndex:-1},twoArea:{name:"请选择二级分类",id:null,show:!1,twoAreaIndex:-1},packMenu:[{id:-1,name:"全部"},{id:0,name:"固定套餐"},{id:1,name:"可选套餐"},{id:2,name:"自定义套餐"}],category:[],child:[],goodsList:[],copyGoods:null,packages:[],copyPack:null,nowPackages:null,parentGoods:[],childGoods:[],nowChildGoods:[],title:null,type:null,showSearch:!1,showCategory:null,toggle:!0,showSelectAll:0,selectPackMenu:-1,countGoods:{count:0,name:""},countPackages:{count:0,name:""},isGetExtra:!1}},props:{pGoodsList:null},methods:{goodListWin:function(t){var e=this,o={goodArr:[],packArr:[]};"ok"==t?(o.goodArr=this.goodsList.filter(function(t){return t.isSelect}),o.packArr=this.packages.filter(function(t){return t.isSelect}),o.goodArr||(o.goodArr=[]),o.packArr||(o.packArr=[])):(this.copyGoods||(this.copyGoods=[]),this.copyPack||(this.copyPack=[]),this.goodsList.forEach(function(t){e.copyGoods.forEach(function(e){t.id==e&&o.goodArr.push(t)})}),this.packages.forEach(function(t){e.copyPack.forEach(function(e){t.id==e&&o.packArr.push(t)})})),this.$emit("throwGoodListWin",t,o)},showOneArea:function(){this.oneArea.show=!this.oneArea.show,this.twoArea.show=!1},newselectOneArea:function(t){this.oneArea.oneAreaIndex=t,this.twoArea.twoAreaIndex=-1;var e=this.category[t];this.selectOneArea(e)},newselectTwoArea:function(t){this.twoArea.twoAreaIndex=t;var e=this.child[t];this.selectTwoArea(e)},selectOneArea:function(t){this.oneArea.id=t.id,this.oneArea.name=t.name,this.twoArea={id:-2,name:"请选择二级分类",show:!1,twoAreaIndex:-1},this.child=t.child,this.child||(this.child=[]);var e=this.filterGoodsByPid(this.goodsList,this.category,t.id);this.parentGoods=e.parent,this.childGoods=e.child,this.nowChildGoods=this.childGoods},showTwoArea:function(){this.child||(this.child=[]),-1!=this.oneArea.id?0!=this.child.length?(this.twoArea.show=!this.twoArea.show,this.oneArea.show=!1,-1!=this.child[0].id&&this.child.unshift({id:-1,name:"全部二级分类",show:!1})):this.$store.commit("setWin",{title:"温馨提示",content:"该分类下不存在二级分类"}):this.$store.commit("setWin",{title:"温馨提示",content:"请先选择一级分类"})},selectTwoArea:function(t){this.twoArea.id=t.id,this.twoArea.name=t.name,this.twoArea.show=!1,this.nowChildGoods=this.childGoods.filter(function(e){return-1==t.id||e.id==t.id}),this.parentGoods=[]},filterGoodsByPid:function(t,e,o){var s=[],i=[];return-1==o?{parent:t,child:[]}:(t.forEach(function(t){var e=t.cids;e||(e=[]);for(var i=0,n=e.length;i<n;i++)if(e[i]==o){s.push(t);break}}),e.some(function(e){if(e.id==o){var s=e.child;return s||(s=[]),s.forEach(function(e){var o={name:e.name,id:e.id,arr:[]};t.forEach(function(t){var s=t.cids;s||(s=[]);for(var i=0,n=s.length;i<n;i++)if(s[i]==e.id){o.arr.push(t);break}}),o.arr.length>0&&i.push(o)}),!0}}),{parent:s,child:i})},selectPack:function(t){this.selectPackMenu=t,this.nowPackages=this.packages.filter(function(e){return-1==t||e.type==t})},choseParentGood:function(t,e){this.toggle?(this.pGoodsList.goodRadio&&(this.goodsList=this.goodsList.map(function(t){return t.isSelect=!1,t})),t.isSelect=!t.isSelect,this.parentGoods.splice(e,1,t),this.countGoods=this.initSelectNum(this.goodsList,"good")):(this.pGoodsList.packageRadio&&(this.packages=this.packages.map(function(t){return t.isSelect=!1,t})),t.isSelect=!t.isSelect,this.countPackages=this.initSelectNum(this.packages,"pack"))},choseChildGood:function(t,e,o){this.pGoodsList.goodRadio&&(this.goodsList=this.goodsList.map(function(t){return t.isSelect=!1,t})),t.isSelect=!t.isSelect,this.childGoods[o].arr.splice(e,1,t),this.countGoods=this.initSelectNum(this.goodsList,"good")},selectAll:function(){this.toggle?(this.parentGoods=this.parentGoods.map(function(t){return t.isSelect=!0,t}),this.nowChildGoods||(this.nowChildGoods=[]),this.nowChildGoods=this.nowChildGoods.map(function(t){return t.arr.forEach(function(t){t.isSelect=!0}),t}),this.countGoods=this.initSelectNum(this.goodsList,"good")):(this.nowPackages=this.nowPackages.map(function(t){return t.isSelect=!0,t}),this.countPackages=this.initSelectNum(this.packages,"pack"))},cancelAll:function(){this.toggle?(this.parentGoods=this.parentGoods.map(function(t){return t.isSelect=!1,t}),this.nowChildGoods||(this.nowChildGoods=[]),this.nowChildGoods=this.nowChildGoods.map(function(t){return t.arr.forEach(function(t){t.isSelect=!1}),t}),this.countGoods={count:0,name:""}):(this.nowPackages=this.nowPackages.map(function(t){return t.isSelect=!1,t}),this.countPackages={count:0,name:""})},initData:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var o,s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(o=n.a.session("userShop"),t.shopId=o.currentShop.id,t.pGoodsList.title?t.title=t.pGoodsList.title:t.title="选择关联商品",t.type=t.pGoodsList.type,t.isGetExtra=t.pGoodsList.isGetExtra,t.pGoodsList.showSearch||(t.showSearch=!1),t.showSelectAll=t.pGoodsList.showSelectAll,void 0===t.pGoodsList.showSelectAll&&(t.showSelectAll=0),s=null,t.isGetExtra){e.next=13;break}return e.next=12,t.ShopGetExtra();case 12:s=e.sent;case 13:e.t0=""+t.type,e.next="0"===e.t0?16:"1"===e.t0?19:"2"===e.t0?21:23;break;case 16:return t.initGoods(s),t.initPackages(s),e.abrupt("break",25);case 19:return t.initGoods(s),e.abrupt("break",25);case 21:return t.initPackages(s),e.abrupt("break",25);case 23:t.initGoods(s),t.initPackages(s);case 25:t.showCategory=t.pGoodsList.showCategory,void 0===t.showCategory&&(t.showCategory=0),t.isGetExtra||n.a.session("httpGoodVersion",s);case 28:case"end":return e.stop()}},e,t)}))()},initGoods:function(t){var e=this;if(this.goodsList=this.pGoodsList.goodsList,this.goodsList=this.copyData(this.goodsList),this.pGoodsList.delGoods){var o=this.pGoodsList.delGoods;this.goodsList=this.filterGoods(this.goodsList,o)}if(this.pGoodsList.selGoods){var i=this.pGoodsList.selGoods;this.copyGoods=this.copyData(i)}if(this.goodsList=this.initSelect(this.goodsList,this.pGoodsList.selGoods),this.countGoods=this.initSelectNum(this.goodsList,"good"),this.pGoodsList.category){this.category=s.a.deepCopy(this.pGoodsList.category),this.category.unshift({id:-1,name:"全部"});var n=this.filterGoodsByPid(this.goodsList,this.category,this.oneArea.id);this.parentGoods=n.parent,this.childGoods=n.child}else this.getCategoryList(!1,t.otherConfigVer).then(function(t){t[0]&&-1!=t[0].id&&t.unshift({id:-1,name:"全部一级分类"}),e.category=t;var o=e.filterGoodsByPid(e.goodsList,e.category,e.oneArea.id);e.parentGoods=o.parent,e.childGoods=o.child})},initPackages:function(t){var e=this;this.getpackagelist(!1,t.otherConfigVer).then(function(t){if(e.packages=t,e.pGoodsList.delPack){var o=e.pGoodsList.delPack;e.packages=e.filterGoods(t,o)}if(e.pGoodsList.selPack){var s=e.pGoodsList.selPack;e.copyPack=e.copyData(s)}e.packages=e.initSelect(e.packages,e.pGoodsList.selPack),e.selectPack(e.selectPackMenu),e.countPackages=e.initSelectNum(e.packages,"pack")})},initSelectNum:function(t,e){var o={},s={count:0,name:""};return t.forEach(function(t){t.isSelect&&(s.count++,o=t)}),1==s.count&&(s.name="good"==e?o.goodsName:o.packageName),s},filterGoods:function(t,e){return t.filter(function(t){for(var o=!1,s=0,i=e.length;s<i;s++)if(t.id==e[s]){o=!0;break}return!o})},initSelect:function(t,e){return t.map(function(t){var o=!1;if(e)for(var s=0,i=e.length;s<i;s++)if(t.id==e[s]){o=!0;break}return t.isSelect=!!o,t})},copyData:function(t){var e=null;return e=JSON.stringify(t),e=JSON.parse(e)},ShopGetExtra:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var o;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.ShopGetExtra({data:{}});case 2:return o=t.sent,t.abrupt("return",o);case 4:case"end":return t.stop()}},e,t)}))()},getPack:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.getpackagelist({data:{shopId:t.shopId,page:1,num:9999}});case 2:return o=e.sent,n.a.session("packList",o),e.abrupt("return",o);case 5:case"end":return e.stop()}},e,t)}))()},getpackagelist:function(t,e){var o=this;return a(regeneratorRuntime.mark(function s(){var i,a;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(i=null,!t){s.next=7;break}return s.next=4,o.getPack();case 4:i=s.sent,s.next=25;break;case 7:if(a=n.a.session("httpGoodVersion")){s.next=14;break}return s.next=11,o.getPack();case 11:i=s.sent,s.next=25;break;case 14:if(a.otherConfigVer!=e){s.next=22;break}if(i=n.a.session("packList")){s.next=20;break}return s.next=19,o.getPack();case 19:i=s.sent;case 20:s.next=25;break;case 22:return s.next=24,o.getPack();case 24:i=s.sent;case 25:return s.abrupt("return",i);case 26:case"end":return s.stop()}},s,o)}))()},getCate:function(){var t=this;return a(regeneratorRuntime.mark(function e(){var o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.getCategoryList({data:{shopId:t.shopId}});case 2:return o=e.sent,n.a.session("areaList",o),e.abrupt("return",o);case 5:case"end":return e.stop()}},e,t)}))()},getCategoryList:function(t,e){var o=this;return a(regeneratorRuntime.mark(function s(){var i,a;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(i=null,!t){s.next=7;break}return s.next=4,o.getCate();case 4:i=s.sent,s.next=25;break;case 7:if(a=n.a.session("httpGoodVersion")){s.next=14;break}return s.next=11,o.getCate();case 11:i=s.sent,s.next=25;break;case 14:if(a.otherConfigVer!=e){s.next=22;break}if(i=n.a.session("areaList")){s.next=20;break}return s.next=19,o.getCate();case 19:i=s.sent;case 20:s.next=25;break;case 22:return s.next=24,o.getCate();case 24:i=s.sent;case 25:return s.abrupt("return",i);case 26:case"end":return s.stop()}},s,o)}))()},catchEvent:function(t){t.cancelBubble=!0}},mounted:function(){this.initData()},components:{elCategory:function(){return o.e("el_category").then(o.bind(null,"eff4"))},win:function(){return o.e("win").then(o.bind(null,"f60a"))}}},c=(o("9ccf"),o("d801")),l=Object(c.a)(r,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("win",{attrs:{align:"center",width:800,height:560},on:{winEvent:t.goodListWin}},[o("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),o("div",{attrs:{slot:"content",id:"good_list"},slot:"content"},[o("section",{staticClass:"configTan"},[t.showSearch?o("section",{staticClass:"search-goods"},[o("span",{staticStyle:{"font-size":"16px"}},[t._v("搜索商品：")]),t._v(" "),o("input",{attrs:{type:"text",placeholder:"请输入商品的简码或名称"}})]):t._e(),t._v(" "),o("section",{staticClass:"oCont",staticStyle:{width:"100%"}},[0==t.type?o("div",{staticClass:"Box",staticStyle:{width:"160px",float:"left"}},[o("section",{staticClass:"oDe",class:{act:t.toggle},staticStyle:{"border-left":"none",width:"50%"},on:{click:function(e){t.toggle=!0}}},[t._v("商品")]),t._v(" "),o("section",{staticClass:"oDe",class:{act:!t.toggle},on:{click:function(e){t.toggle=!1}}},[t._v("套餐")])]):t._e(),t._v(" "),t.toggle&&2!=t.type?o("div",{staticStyle:{float:"left","margin-left":"10px"}},[0==t.showCategory||1==t.showCategory?o("elCategory",{attrs:{itemIndex:t.oneArea.oneAreaIndex,categoryArr:t.category,itemArea:t.oneArea},on:{selectCategory:t.newselectOneArea}}):t._e(),t._v(" "),2==t.showCategory||0==t.showCategory?o("elCategory",{attrs:{itemIndex:t.twoArea.twoAreaIndex,categoryArr:t.child,itemArea:t.twoArea},on:{selectCategory:t.newselectTwoArea}}):t._e()],1):t._e(),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:!t.toggle,expression:"!toggle"}],staticStyle:{width:"100%",height:"50px",overflow:"hidden","padding-top":"10px"}},[o("el-radio-group",{on:{change:t.selectPack},model:{value:t.selectPackMenu,callback:function(e){t.selectPackMenu=e},expression:"selectPackMenu"}},[o("el-radio-button",{attrs:{label:"-1"}},[t._v("全部")]),t._v(" "),o("el-radio-button",{attrs:{label:"0"}},[t._v("固定套餐")]),t._v(" "),o("el-radio-button",{attrs:{label:"1"}},[t._v("可选套餐")]),t._v(" "),o("el-radio-button",{attrs:{label:"2"}},[t._v("自定义套餐")])],1)],1)]),t._v(" "),o("ul",{staticClass:"aUl"},[-1==t.oneArea.id&&2!=t.type&&t.toggle&&t.parentGoods&&t.parentGoods.length>0?o("section",t._l(t.parentGoods,function(e,s){return o("li",{key:s,class:{aLi:!0,"shoName-select":e.isSelect},attrs:{"data-id":e.id},on:{click:function(o){t.choseParentGood(e,s)}}},[t._v(t._s(e.goodsName))])})):t._e(),t._v(" "),t.toggle?t._e():o("section",t._l(t.nowPackages,function(e,s){return t.packages.length>0?o("li",{key:s,staticClass:"aLi",class:{"shoName-select":e.isSelect},on:{click:function(o){t.choseParentGood(e,s)}}},[t._v(t._s(e.packageName))]):t._e()})),t._v(" "),t.toggle&&-1!=t.oneArea.id?o("section",[t.parentGoods&&t.parentGoods.length>0?o("div",{staticClass:"onecate"},[o("section",[o("i",{class:{twoI:!0,oneI:!0}}),t._v(" "),o("li",{class:{twoTitle:!0,oneTitle:!0}},[t._v(t._s(t.oneArea.name))])]),t._v(" "),o("section",{staticStyle:{clear:"both"}},t._l(t.parentGoods,function(e,s){return o("li",{key:s,staticClass:"aLi",class:{"shoName-select":e.isSelect},on:{click:function(o){t.choseParentGood(e,s)}}},[t._v(t._s(e.goodsName))])}))]):t._e(),t._v(" "),t._l(t.nowChildGoods,function(e,s){return o("div",{key:s,staticClass:"onecate"},[o("section",{},[o("i",{staticClass:"twoI"}),t._v(" "),o("li",{staticClass:"twoTitle"},[t._v(t._s(e.name))])]),t._v(" "),o("section",{staticStyle:{clear:"both"}},t._l(e.arr,function(e,i){return o("li",{key:i,staticClass:"aLi",class:{"shoName-select":e.isSelect},on:{click:function(o){t.choseChildGood(e,i,s)}}},[t._v(t._s(e.goodsName))])}))])})],2):t._e()]),t._v(" "),0==t.showSelectAll||1==t.showSelectAll||2==t.showSelectAll?o("div",{staticStyle:{width:"100%",height:"40px","background-color":"#f7f7f7",position:"fixed",bottom:"50px",left:"0"}},[1==t.showSelectAll||0==t.showSelectAll?o("section",{staticClass:"isallselect allselect",on:{click:t.cancelAll}},[t._v("取消全部")]):t._e(),t._v(" "),1==t.showSelectAll||0==t.showSelectAll?o("section",{staticClass:"isallselect",on:{click:t.selectAll}},[t._v("选择全部")]):t._e(),t._v(" "),2==t.showSelectAll||0==t.showSelectAll?o("h3",{directives:[{name:"show",rawName:"v-show",value:t.toggle,expression:"toggle"}],staticStyle:{width:"auto",height:"40px","line-height":"40px","margin-right":"25px",float:"right",color:"#FF9700"}},[t._v("已选择: "+t._s(t.countGoods.count>1?t.countGoods.count+"个":t.countGoods.name))]):t._e(),t._v(" "),2==t.showSelectAll||0==t.showSelectAll?o("h3",{directives:[{name:"show",rawName:"v-show",value:!t.toggle,expression:"!toggle"}],staticStyle:{width:"auto",height:"40px","line-height":"40px","margin-right":"25px",float:"right",color:"#FF9700"}},[t._v("已选择: "+t._s(t.countPackages.count>1?t.countPackages.count+"个":t.countPackages.name))]):t._e()]):t._e()])])])},[],!1,null,"581dcc7e",null);e.default=l.exports}}]);