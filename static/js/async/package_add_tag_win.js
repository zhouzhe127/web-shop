(window.webpackJsonp=window.webpackJsonp||[]).push([["package_add_tag_win"],{"08e6":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("win",{attrs:{align:"center",height:560,width:800,ok:t.btnOk,cancel:t.btnCancel},on:{winEvent:t.goodListWin}},[o("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),o("div",{attrs:{slot:"content",id:"packTan"},slot:"content"},[o("div",{staticClass:"oBox"},[o("el-form",{attrs:{"label-width":"100px",inline:!0}},[o("el-form-item",{attrs:{required:"",label:"名称"}},[o("el-input",{staticStyle:{width:"200px"},attrs:{maxlength:"10",placeholder:"输入名称"},model:{value:t.tagName,callback:function(e){t.tagName=e},expression:"tagName"}})],1),t._v(" "),o("el-form-item",{attrs:{required:"",label:0==t.packageType?"总数量":"可选数量"}},[0==t.packageType?o("span",[t._v(t._s(t.totalNum))]):t._e(),t._v(" "),1==t.packageType||2==t.packageType?o("el-input-number",{attrs:{min:1},on:{change:t.getSubAdd},model:{value:t.totalNum,callback:function(e){t.totalNum=e},expression:"totalNum"}}):t._e()],1)],1)],1),t._v(" "),o("section",{staticClass:"configBox"},[o("section",{staticClass:"oCont",staticStyle:{width:"100%"}},[o("ul",{staticStyle:{float:"left","margin-left":"20px"}},[o("li",{staticStyle:{width:"210px",float:"left"}},[o("elCategory",{attrs:{categoryArr:t.oneArea.oneAreaList,itemIndex:t.oneArea.oneAreaIndex,itemArea:t.oneArea},on:{selectCategory:t.newselectOneArea}})],1),t._v(" "),o("li",{staticStyle:{width:"210px","margin-left":"20px",float:"left"}},[o("elCategory",{attrs:{categoryArr:t.twoArea.twoAreaList,itemIndex:t.twoArea.twoAreaIndex,itemArea:t.twoArea},on:{selectCategory:t.newselectTwoArea}})],1),t._v(" "),o("li",{staticStyle:{width:"180px","margin-left":"20px",float:"left"}},[o("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入名称",clearable:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}},[o("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.searchGoods},slot:"append"})],1)],1),t._v(" "),o("li",{staticStyle:{width:"60px","margin-left":"10px",float:"left"}},[o("el-button",{attrs:{type:"info"},on:{click:function(e){t.recSearch()}}},[t._v("重置")])],1)])]),t._v(" "),o("section",{staticClass:"aUl"},[t.allGood?o("section",[o("el-checkbox-group",{model:{value:t.selecIndex,callback:function(e){t.selecIndex=e},expression:"selecIndex"}},t._l(t.goodsCom,function(e,a){return o("div",{key:a,staticStyle:{"margin-bottom":"2px",display:"inline-block","margin-right":"10px"}},[o("el-checkbox",{staticClass:"labItem",attrs:{label:e.id,border:""},on:{change:function(o){t.funSetIsSelect(e,a)}}},[t._v(t._s(e.goodsName))]),t._v(" "),2!=t.packageType?[o("el-input",{staticStyle:{width:"40px"},attrs:{maxlength:"2"},on:{change:function(o){t.funSetGoodsNum(e,a)}},model:{value:e.packageGoodsNum,callback:function(o){t.$set(e,"packageGoodsNum",o)},expression:"item.packageGoodsNum"}}),t._v(" "),o("span",[t._v(t._s(e.unit))])]:t._e()],2)}))],1):t._e(),t._v(" "),t.allGood?t._e():o("section",[t.oneGoodList.goodsList.length>0?o("div",{staticClass:"onecate"},[o("section",{staticClass:"onecataTitle"},[o("i",{staticClass:"twoI",class:{oneI:"0"==t.L2ID}}),t._v(" "),o("div",{staticClass:"twoTitle ",class:{oneTitle:"0"==t.L2ID}},[t._v(t._s(t.oneGoodList.name))])]),t._v(" "),o("section",{staticStyle:{width:"600px","margin-left":"30px"}},[o("el-checkbox-group",{model:{value:t.selecIndex,callback:function(e){t.selecIndex=e},expression:"selecIndex"}},t._l(t.oneGoodList.goodsList,function(e,a){return o("div",{key:a,staticStyle:{"margin-bottom":"2px",display:"inline-block","margin-right":"10px"}},[o("el-checkbox",{staticClass:"labItem",attrs:{label:e.id,border:""},on:{change:function(o){t.funSetIsSelect(e,a)}}},[t._v(t._s(e.goodsName))]),t._v(" "),2!=t.packageType?[o("el-input",{staticStyle:{width:"40px"},attrs:{maxlength:"2"},on:{change:function(o){t.funSetGoodsNum(e,a)}},model:{value:e.packageGoodsNum,callback:function(o){t.$set(e,"packageGoodsNum",o)},expression:"item.packageGoodsNum"}}),t._v(" "),o("span",[t._v(t._s(e.unit))])]:t._e()],2)}))],1)]):t._e(),t._v(" "),t._l(t.oneGoodList.child,function(e,a){return e.goodsList.length>0?o("div",{key:a,staticClass:"onecate"},[o("section",{staticClass:"onecataTitle"},[o("i",{staticClass:"twoI"}),t._v(" "),o("div",{staticClass:"twoTitle"},[t._v(t._s(e.name))])]),t._v(" "),o("section",{staticStyle:{width:"600px","margin-left":"30px"}},[o("el-checkbox-group",{model:{value:t.selecIndex,callback:function(e){t.selecIndex=e},expression:"selecIndex"}},t._l(e.goodsList,function(e,a){return o("div",{key:a,staticStyle:{"margin-bottom":"2px",display:"inline-block","margin-right":"10px"}},[o("el-checkbox",{staticClass:"labItem",attrs:{label:e.id,border:""},on:{change:function(o){t.funSetIsSelect(e,a)}}},[t._v(t._s(e.goodsName))]),t._v(" "),2!=t.packageType?[o("el-input",{staticStyle:{width:"40px"},attrs:{maxlength:"2"},on:{change:function(o){t.funSetGoodsNum(e,a)}},model:{value:e.packageGoodsNum,callback:function(o){t.$set(e,"packageGoodsNum",o)},expression:"item.packageGoodsNum"}}),t._v(" "),o("span",[t._v(t._s(e.unit))])]:t._e()],2)}))],1)]):t._e()})],2)])])])])};a._withStripped=!0;var n=o("81a2"),s=o("f6ce");function i(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,o){return function a(n,s){try{var i=e[n](s),r=i.value}catch(t){return void o(t)}if(!i.done)return Promise.resolve(r).then(function(t){a("next",t)},function(t){a("throw",t)});t(r)}("next")})}}var r={data:function(){return{shopId:"",title:"",oneArea:{oneAreaBtn:!1,name:"请选择一级分类",oneAreaIndex:-1,oneAreaList:[{id:"0",name:"全部"}]},twoArea:{twoAreaBtn:!1,name:"请选择二级分类",twoAreaIndex:-1,twoAreaList:[{id:"0",name:"全部二级分类"}]},goodsCom:[],goodList:[],L1ID:0,L2ID:0,oneGoodList:{},newOneGoodList:{},allGood:!0,version:{},search:"",packageType:1,tagName:"",totalNum:null,btnOk:{},btnCancel:{},selecIndex:[]}},mounted:function(){var t=s.a.session("userShop");this.shopId=t.currentShop.id,this.initBtn(),this.getOneAreaList(),this.getGoodsList(),document.addEventListener("click",this.myClick)},destroyed:function(){document.removeEventListener("click",this.myClick)},props:{pObj:null},components:{win:function(){return o.e("win").then(o.bind(null,"f60a"))},elCategory:function(){return o.e("el_category").then(o.bind(null,"eff4"))}},methods:{initBtn:function(){this.packageType=this.pObj.packageType,this.tagName=this.pObj.tagName,this.totalNum=this.pObj.totalNum,this.selecIndex=this.pObj.goodsIds,this.title=this.pObj.title,this.tagName?(this.btnCancel={content:"删除",style:"background-color:#c33"},this.btnOk={content:"确定"}):(this.btnCancel={content:"取消"},this.btnOk={content:"确定"})},recSearch:function(){this.selectOneArea(0,{id:0}),this.oneArea.name="请选择一级分类",this.L1ID,this.search=""},getSubAdd:function(t){this.totalNum=t},myClick:function(){this.oneArea.oneAreaBtn=!1,this.twoArea.twoAreaBtn=!1},searchGoods:function(){for(var t=[],e=this.goodList,o=0;o<e.length;o++){var a=e[o].goodsName.toLowerCase(),n=this.search;a&&a.indexOf(n)>-1&&t.push(e[o])}this.oneArea.name="请选择一级分类",this.L1ID,this.twoArea={twoAreaBtn:!1,name:"请选择二级分类",twoAreaIndex:-1,twoAreaList:[{id:"0",name:"全部二级分类"}]},this.allGood=!0,this.goodsCom=t},goodListWin:function(t){var e=this;if("ok"==t){if(!this.tagName||0==this.tagName.trim().length||/[\s&"'"']/im.test(this.tagName))return this.$store.commit("setWin",{title:"提示信息",content:"请输入标识名！并且分类名中不能含有&和引号!"}),!1;var o=this.counterSelectGoods(this.goodList);if(0==o.total)return void this.$store.commit("setWin",{title:"提示信息",content:"请选择商品"});o.tagName=this.tagName;if((this.pObj.tagName?this.pObj.packageTag.filter(function(t){return t.tagName!=e.pObj.tagName}):this.pObj.packageTag).some(function(t){if(t.tagName==e.tagName.trim())return!0}))return this.$store.commit("setWin",{title:"温馨提示",content:"该标识名已经存在!"}),!1;if(0!=this.packageType&&o.total<this.totalNum)return this.$store.commit("setWin",{title:"温馨提示",content:"选中的商品总数量不能小于'可选数量'!"}),!1;this.pObj.tagName?(1*this.pObj.packageType>0&&(o.total=this.totalNum),this.$emit("throwTagWin","edit",o)):(1*this.pObj.packageType>0&&(o.total=this.totalNum),this.$emit("throwTagWin","add",o))}else"cancel"==t&&this.pObj.tagName?this.$store.commit("setWin",{title:"温馨提示",content:"确认删除该标识?",winType:"confirm",callback:function(t){"ok"==t&&e.$emit("throwTagWin","delete")}}):this.$emit("throwTagWin","close")},getGoodsList:function(){var t=[],e={};t=this.pObj.goodsList;for(var o=0;o<t.length;o++)this.$set(t[o],"selected",!1),this.$set(t[o],"packageGoodsNum",""),e[t[o].id]||(e[t[o].id]=o);for(var a=this.pObj.selGoods,n=0;n<a.length;n++){var s=e[a[n].gid];(s||void 0!=s)&&(t[s].selected=!0,t[s].packageGoodsNum=a[n].packageGoodsNum)}this.goodsCom=t,this.goodList=t},funSetIsSelect:function(t,e){if(t.selected=!t.selected,t.selected?t.packageGoodsNum="1":t.packageGoodsNum=0,0==this.packageType){var o=this.counterSelectGoods(this.goodList);this.totalNum=o.total}},funSetGoodsNum:function(t,e){this.selecIndex.push(t.id);var o=t.packageGoodsNum;if(/^[\d]+$/g.test(o)?t.packageGoodsNum=parseInt(1*o):t.packageGoodsNum="",1*t.packageGoodsNum==0?t.selected=!1:t.selected=!0,0==this.packageType){var a=this.counterSelectGoods(this.goodList);this.totalNum=a.total}},counterSelectGoods:function(t){for(var e={goods:[],total:0},o=0;o<t.length;o++)t[o].selected&&(e.goods.push(t[o]),e.total=e.total+parseInt(1*t[o].packageGoodsNum));return e},showOneArea:function(t){t.stopPropagation(),this.twoArea.twoAreaBtn=!1,this.oneArea.oneAreaBtn=!this.oneArea.oneAreaBtn},showTwoArea:function(t){if(t.stopPropagation(),0==this.L1ID)return this.$store.commit("setWin",{title:"温馨提示",winType:"alert",content:"请先选择一个一级分类"}),!1;this.oneArea.oneAreaBtn=!1,this.twoArea.twoAreaBtn=!this.twoArea.twoAreaBtn},newselectOneArea:function(t){this.oneArea.oneAreaIndex=t,this.twoArea.twoAreaIndex=-1;var e=this.oneArea.oneAreaList[t];this.selectOneArea(t,e)},newselectTwoArea:function(t){this.twoArea.twoAreaIndex=t;var e=this.twoArea.twoAreaList[t];this.selectTwoArea(t,e)},selectOneArea:function(t,e){if(this.search="",this.twoArea.name="请选择二级分类",this.L1ID=e.id,this.L2ID=0,0==t)this.allGood=!0,this.goodsCom=this.goodList,this.oneArea.name="全部";else{this.allGood=!1,this.oneArea.name=e.name,this.oneArea.oneAreaIndex=t;var o=this.goodList;e.goodsList=[],this.twoArea.twoAreaList=[{id:"0",name:"全部二级分类"}];for(var a=0;a<e.child.length;a++)this.twoArea.twoAreaList.push(e.child[a]),e.child[a].goodsList=[];for(var n=0;n<o.length;n++)for(var s=0;s<o[n].cids.length;s++){e.id==o[n].cids[s]&&e.goodsList.push(o[n]);for(var i=0;i<e.child.length;i++)e.child[i].id==o[n].cids[s]&&e.child[i].goodsList.push(o[n])}this.oneGoodList=e,this.newOneGoodList=e}},selectTwoArea:function(t,e){this.search="",this.twoArea.name=e.name;for(var o=this.twoArea.twoAreaList,a=0;a<o.length;a++)o[a].selected=!1;e.selected=!0,this.twoArea.twoAreaBtn=!1;var n=this.newOneGoodList,s={};if(0==e.id)n.goodsList=[],this.oneGoodList=n;else{for(var i=0;i<n.child.length;i++)e.id==n.child[i].id&&(s=n.child[i]);this.oneGoodList=s}this.L2ID=e.id},ShopGetExtra:function(){var t=this;return i(regeneratorRuntime.mark(function e(){var o;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.ShopGetExtra({data:{}});case 2:return o=t.sent,t.abrupt("return",o);case 4:case"end":return t.stop()}},e,t)}))()},getOneAreaList:function(){var t=this;return i(regeneratorRuntime.mark(function e(){var o,a,i,r,c,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=s.a.session("httpGoodVersion"),a=!1,e.next=4,t.ShopGetExtra();case 4:if(t.version=e.sent,o&&t.version.otherConfigVer==o.otherConfigVer?a=!0:(a=!1,s.a.session("httpGoodVersion",t.version)),t.oneArea.oneAreaList=[{id:"0",name:"全部"}],i=[{id:"0",name:"全部"}],r=void 0,!(c=s.a.session("areaList"))||!a){e.next=14;break}r=c,e.next=18;break;case 14:return e.next=16,n.a.getCategoryList({data:{shopId:t.shopId}});case 16:r=e.sent,s.a.session("areaList",r);case 18:for(l=0;l<r.length;l++)t.$set(r[l],"selected",!1),i.push(r[l]);t.oneArea.oneAreaList=i;case 20:case"end":return e.stop()}},e,t)}))()}}},c=(o("5f55"),o("6ceb")),l=Object(c.a)(r,a,[],!1,null,"d54bf9d6",null);l.options.__file="src\\module\\goods_config\\package_com\\package_add_tag_win.vue";e.default=l.exports},"5f55":function(t,e,o){"use strict";var a=o("ecd2");o.n(a).a},ecd2:function(t,e,o){}}]);