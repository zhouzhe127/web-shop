(window.webpackJsonp=window.webpackJsonp||[]).push([["relation_win"],{"596b":function(t,e,s){"use strict";s.r(e);var i=s("81a2"),o=s("f6ce"),a=s("bbb9");var n={},c={},l=o.a.session("goodList");if(l)for(var d=0;d<l.length;d++)1!=l[d].type&&2!=l[d].type&&2!=l[d].status&&1!=l[d].isGroup||(l.splice(d,1),d--);else;var r=o.a.session("packageList"),h={created:function(){this.item&&(this.selected={id:this.item.eDishSkuCode?this.item.eDishSkuCode:"",goodsName:this.item.eDishSkuCode?this.getGoodsName(this.item.eDishSkuCode):""},/^(0)/.test(this.item.eDishSkuCode)&&this.getGoodList(1))},data:function(){return{oneArea:{oneAreaBtn:!1,oneAreaName:"请选择一级分类",oneAreaIndex:-1,oneAreaList:[{id:"0",name:"全部"}]},twoArea:{twoAreaBtn:!1,twoAreaName:"请选择二级分类",twoAreaIndex:-1,twoAreaList:[{id:"0",name:"全部二级分类"}],newTwoAreaList:[{id:"0",name:"全部二级分类"}]},isPackage:!1,packlist:a.a.deepCopy(r),packCom:[],goodList:a.a.deepCopy(l),goodsCom:[],L1ID:0,L2ID:0,allSelect:!1,oneGoodList:{},newOneGoodList:{},allGood:!0,selected:"",search:""}},props:["width","height","title","seloneAir","seltwoAir","changeConfig","item"],methods:{getGoodList:function(t){this.allGood=!0,0==t?(this.isPackage=!1,this.goodsCom=this.goodList,n.item&&(this.selectOneArea(n.index,n.item,1),c.item&&this.selectTwoArea(c.index,c.item))):1==t&&(this.isPackage=!0,this.goodsCom=this.packlist)},choseGood:function(t){this.selected=a.a.deepCopy(t),this.isPackage&&(this.selected.id="0"+this.selected.id)},selectPack:function(t){var e=[],s=this.packlist;if(-1==t)this.packCom=s;else for(var i=0;i<s.length;i++)s[i].type==t&&e.push(s[i]);this.packlist=e},showOneArea:function(t){t.stopPropagation(),this.twoArea.twoAreaBtn=!1,this.oneArea.oneAreaBtn=!this.oneArea.oneAreaBtn},showTwoArea:function(t){if(t.stopPropagation(),0==this.L1ID)return this.$store.commit("setWin",{content:"请先选择一个一级分类"}),!1;this.oneArea.oneAreaBtn=!1,this.twoArea.twoAreaBtn=!this.twoArea.twoAreaBtn},selectOneArea:function(t,e,s){n.item=e,n.index=t,1!=s&&(c={});for(var i=0;i<this.oneArea.oneAreaList.length;i++)this.oneArea.oneAreaList[i].selected=!1;if(e.selected=!0,this.oneArea.oneAreaBtn=!1,0==t)this.allGood=!0,this.goodsCom=this.goodList,this.oneArea.oneAreaIndex=t,this.oneArea.oneAreaName=e.name,this.L1ID=e.id,this.twoArea.twoAreaName="请选择二级分类";else{this.allGood=!1,this.oneArea.oneAreaName=e.name,this.oneArea.oneAreaIndex=t,this.twoArea.twoAreaName="请选择二级分类",this.L1ID=e.id,this.L2ID=0;var o=this.goodList;e.goodsList=[],this.twoArea.twoAreaList=[{id:"0",name:"全部二级分类"}];for(var l=0;l<e.child.length;l++)e.child[l].selected=!1,this.twoArea.twoAreaList.push(e.child[l]),e.child[l].goodsList=[];for(var d=0;d<o.length;d++)for(var r=0;r<o[d].cids.length;r++){e.id==o[d].cids[r]&&e.goodsList.push(o[d]);for(var h=0;h<e.child.length;h++)e.child[h].id==o[d].cids[r]&&e.child[h].goodsList.push(o[d])}this.oneGoodList=a.a.deepCopy(e),this.newOneGoodList=a.a.deepCopy(e)}},selectTwoArea:function(t,e){c.item=e,c.index=t,this.twoArea.twoAreaName=e.name;for(var s=this.twoArea.twoAreaList,i=0;i<s.length;i++)s[i].selected=!1;e.selected=!0,this.twoArea.twoAreaBtn=!1;var o=a.a.deepCopy(this.newOneGoodList),n={};if(0==e.id)o.goodsList=[],this.oneGoodList=o;else{for(var l=0;l<o.child.length;l++)e.id==o.child[l].id&&(n=o.child[l]);this.oneGoodList=n}this.L2ID=e.id},getOneAreaList:function(){var t,e=this;return(t=regeneratorRuntime.mark(function t(){var s,o,a,n,c,l;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.oneArea.oneAreaList=[{id:"0",name:"全部"}],t.next=3,i.a.getCategoryList({data:{}});case 3:for(s=t.sent,o=s,a=[{id:"0",name:"全部"}],n=[{id:"0",name:"全部二级分类"}],c=0;c<o.length;c++)for(o[c].selected=!1,a.push(o[c]),l=0;l<o[c].child.length;l++)n.push(o[c].child[l]);e.oneArea.oneAreaList=a,e.twoArea.twoAreaList=n,e.twoArea.newTwoAreaList=n;case 11:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,s){return function i(o,a){try{var n=e[o](a),c=n.value}catch(t){return void s(t)}if(!n.done)return Promise.resolve(c).then(function(t){i("next",t)},function(t){i("throw",t)});t(c)}("next")})})()},keyUp:function(){this.search=this.search.toUpperCase();var t=[];if(this.allGood){for(var e=this.isPackage?this.packlist:this.goodList,s=0;s<e.length;s++){-1==(this.isPackage?e[s].packageName:e[s].goodsName).toUpperCase().indexOf(this.search)&&-1==e[s].BC.indexOf(this.search)||t.push(e[s])}this.isPackage?this.packCom=t:this.goodsCom=t,""==this.search&&(this.isPackage?this.packCom=this.packlist:this.goodsCom=this.goodList)}else{for(var i={},o=0;o<this.newOneGoodList.goodsList.length;o++)-1==this.newOneGoodList.goodsList[o].goodsName.toUpperCase().indexOf(this.search)&&-1==this.newOneGoodList.goodsList[o].BC.indexOf(this.search)||t.push(this.newOneGoodList.goodsList[o]);if(i.goodsList=t,i.name=this.newOneGoodList.name,i.child=[],this.newOneGoodList.child.length>0){for(var n=0;n<this.newOneGoodList.child.length;n++){for(var c=[],l=0;l<this.newOneGoodList.child[n].goodsList.length;l++)-1==this.newOneGoodList.child[n].goodsList[l].goodsName.toUpperCase().indexOf(this.search)&&-1==this.newOneGoodList.child[n].goodsList[l].BC.indexOf(this.search)||c.push(this.newOneGoodList.child[n].goodsList[l]);this.oneGoodList.child[n].goodsList=c}i.child=this.oneGoodList.child}this.oneGoodList=a.a.deepCopy(i),""==this.search&&(this.oneGoodList=a.a.deepCopy(this.newOneGoodList))}},winEvent:function(t){this.$emit("relationEvent",t)},getGoodsName:function(t){if(/^(0)/.test(t)){t=t.substr(1,t.length-1);for(var e=0;e<r.length;e++)if(t==r[e].id)return r[e].packageName}else for(var s=0;s<l.length;s++)if(t==l[s].id)return l[s].goodsName;return!1}},mounted:function(){var t=this;this.getOneAreaList(),this.item&&this.item.eDishSkuCode&&(this.selected.id=this.item.eDishSkuCode,this.selected.goodsName=this.getGoodsName(this.selected.id));var e=a.a.deepCopy(this.goodList);this.goodList=e,this.goodsCom=e,this.selectPack(0),this.packCom=this.packlist,n.item&&(this.selectOneArea(n.index,n.item,1),c.item&&this.selectTwoArea(c.index,c.item)),document.onclick=function(){t.oneArea.oneAreaBtn=!1,t.twoArea.twoAreaBtn=!1}},components:{win:function(){return s.e("win").then(s.bind(null,"f60a"))}}},g=(s("816a"),s("d801")),p=Object(g.a)(h,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("win",{attrs:{width:t.width,height:t.height,align:"center"},on:{winEvent:t.winEvent},scopedSlots:t._u([{key:"content",fn:function(e){return s("div",{staticStyle:{height:"100%"},attrs:{id:"tan"}},[s("div",{attrs:{id:"relevance"}},[s("section",{staticClass:"oCont",staticStyle:{width:"100%"}},[s("div",{staticClass:"Box",staticStyle:{width:"160px",float:"left","margin-top":"-2px"}},[s("section",{staticClass:"oDe",class:{act:!t.isPackage},staticStyle:{"border-left":"none",width:"50%"},on:{click:function(e){t.getGoodList(0)}}},[t._v("商品\n\t\t\t\t\t")]),t._v(" "),s("section",{staticClass:"oDe",class:{act:t.isPackage},on:{click:function(e){t.getGoodList(1)}}},[t._v("套餐")])]),t._v(" "),t.isPackage?t._e():s("ul",{staticStyle:{width:"550px",float:"left","margin-left":"20px"}},[s("li",{staticStyle:{width:"210px",float:"left"}},[s("section",{staticClass:"staList fl detLi"},[s("section",{staticClass:"tableList",on:{click:t.showOneArea}},[s("span",{staticClass:"oSpan"},[t._v(t._s(t.oneArea.oneAreaName))]),t._v(" "),s("div",{staticClass:"fl"},[s("i")])]),t._v(" "),t.oneArea.oneAreaBtn?s("div",{staticClass:"detDiv"},[s("i",{staticClass:"detI"}),t._v(" "),s("div",{staticStyle:{width:"100%",height:"100%","overflow-y":"auto","z-index":"16"}},[t._l(t.oneArea.oneAreaList,function(e,i){return[s("section",{key:i,staticClass:"shoName",class:{"shoName-select-one":e&&e.selected},on:{click:function(s){t.selectOneArea(i,e)}}},[t._v(t._s(e.name)+"\n\t\t\t\t\t\t\t\t\t\t")])]})],2)]):t._e()])]),t._v(" "),s("li",{staticStyle:{width:"210px","margin-left":"20px",float:"left"}},[s("section",{staticClass:"staList fl detLi"},[s("section",{staticClass:"tableList",on:{click:t.showTwoArea}},[s("span",{staticClass:"oSpan"},[t._v(t._s(t.twoArea.twoAreaName))]),t._v(" "),s("div",{staticClass:"fl"},[s("i")])]),t._v(" "),t.twoArea.twoAreaBtn?s("div",{staticClass:"detDiv",staticStyle:{left:"-180px"}},[s("i",{staticClass:"detI",staticStyle:{left:"290px"}}),t._v(" "),s("div",{staticStyle:{width:"100%",height:"100%","overflow-y":"auto","z-index":"16"}},[t._l(t.twoArea.twoAreaList,function(e,i){return[s("section",{key:i,staticClass:"shoName",class:{"shoName-select-one":e&&e.selected},on:{click:function(s){t.selectTwoArea(i,e)}}},[t._v(t._s(e.name)+"\n\t\t\t\t\t\t\t\t\t\t")])]})],2)]):t._e()])])]),t._v(" "),s("section",{staticClass:"search",staticStyle:{"margin-left":"20px",display:"inline-block","vertical-align":"bottom"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"search-input",attrs:{type:"text",placeholder:"请输入名称/简码"},domProps:{value:t.search},on:{keyup:t.keyUp,input:function(e){e.target.composing||(t.search=e.target.value)}}}),t._v(" "),s("a",{staticClass:"search-btn",staticStyle:{"background-color":"#29A7E1"},attrs:{href:"javascript:void(0);"},on:{click:t.keyUp}})])]),t._v(" "),s("ul",{staticClass:"aUl",staticStyle:{width:"950px","margin-bottom":"30px"}},[t.allGood?[t._l(t.goodsCom,function(e,i){return t.isPackage?t._e():s("li",{key:i,staticClass:"aLi",class:{"shoName-select":e.id==t.selected.id},on:{click:function(s){t.choseGood(e,i)}}},[t._v(t._s(e.goodsName)+"\n\t\t\t\t\t")])}),t._v(" "),t._l(t.packCom,function(e,i){return t.isPackage?s("li",{key:i,staticClass:"aLi",class:{"shoName-select":"0"+e.id==t.selected.id},on:{click:function(s){t.choseGood(e,i)}}},[t._v(t._s(e.packageName)+"\n\t\t\t\t\t")]):t._e()}),t._v(" "),!t.isPackage&&0==t.goodsCom.length||t.isPackage&&0==t.packCom.length?s("div",{staticClass:"showText"},[s("span",[t._v("------------未搜索到该商品------------")])]):t._e()]:t._e(),t._v(" "),t.allGood?t._e():[t.oneGoodList.goodsList&&t.oneGoodList.goodsList.length>0?s("div",{staticClass:"onecate"},[s("section",{staticClass:"onecataTitle"},[s("i",{staticClass:"twoI",class:{oneI:"0"==t.L2ID}}),t._v(" "),s("li",{staticClass:"twoTitle ",class:{oneTitle:"0"==t.L2ID}},[t._v(t._s(t.oneGoodList.name))])]),t._v(" "),s("section",{staticStyle:{width:"800px",float:"left"}},[t._l(t.oneGoodList.goodsList,function(e,i){return[s("li",{key:i,staticClass:"aLi",class:{"shoName-select":e.id==t.selected.id},on:{click:function(s){t.choseGood(e,i)}}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(e.goodsName?e.goodsName:e.packageName)+"\n\t\t\t\t\t\t\t\t")])]})],2)]):t._e(),t._v(" "),t._l(t.oneGoodList.child,function(e,i){return t.oneGoodList.child?[e.goodsList.length>0?s("div",{key:i,staticClass:"onecate"},[s("section",{staticClass:"onecataTitle"},[s("i",{staticClass:"twoI"}),t._v(" "),s("li",{staticClass:"twoTitle"},[t._v(t._s(e.name))])]),t._v(" "),s("section",{staticStyle:{width:"800px",float:"left"}},t._l(e.goodsList,function(e,i){return s("ul",{key:i},[s("li",{staticClass:"aLi",class:{"shoName-select":e.id==t.selected.id},on:{click:function(s){t.choseGood(e,i)}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t"+t._s(e.goodsName?e.goodsName:e.packageName)+"\n\t\t\t\t\t\t\t\t\t")])])}))]):t._e()]:t._e()}),t._v(" "),0==t.oneGoodList.goodsList.length?s("div",{staticClass:"showText"},[s("span",[t._v("------------未搜索到该商品------------")])]):t._e()]],2),t._v(" "),s("div",{staticStyle:{width:"100%",height:"40px","background-color":"#f7f7f7",position:"fixed",bottom:"50px",left:"0"}},[s("h3",{staticClass:"elic",staticStyle:{width:"160px",height:"40px","line-height":"40px",float:"right",color:"#FF9700"}},[t._v("已选择:"+t._s(t.selected.goodsName||t.selected.packageName))])])])])}}])},[s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))])])},[],!1,null,"270ae176",null);e.default=p.exports},"816a":function(t,e,s){"use strict";var i=s("f2d4");s.n(i).a},f2d4:function(t,e,s){}}]);