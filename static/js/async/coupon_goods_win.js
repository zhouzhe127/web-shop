(window.webpackJsonp=window.webpackJsonp||[]).push([["coupon_goods_win"],{"0b47":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("win",{attrs:{width:1e3,height:700},on:{winEvent:t.winEvent}},[e("span",{attrs:{slot:"title"},slot:"title"},[t._v("选择商品")]),t._v(" "),e("div",{staticClass:"tas-addtas2",attrs:{slot:"content",id:"tas-addtas2"},slot:"content"},[e("div",{staticClass:"tas-show2-title"},[e("ul",[t._l(t.category,function(s,i){return[s.id==t.List1ID?e("li",{key:i,staticClass:"bgc-blue",on:{click:function(e){t.changeL1ID(s.id,i)}}},[t._v(t._s(s.name))]):e("li",{key:i,staticClass:"tas-Cuisine",on:{click:function(e){t.changeL1ID(s.id,i)}}},[t._v(t._s(s.name))])]})],2)]),t._v(" "),e("div",{staticClass:"tas-show2-taste",attrs:{transition:"slidUpDown"}},[e("ul",[t._l(t.child,function(s,i){return[s.id==t.List2ID?e("li",{key:i,staticClass:"bgc-gray",on:{click:function(e){t.changeL2ID(s.id)}}},[t._v(t._s(s.name))]):e("li",{key:i,staticClass:"tas-tasList ",on:{click:function(e){t.changeL2ID(s.id)}}},[t._v(t._s(s.name))])]})],2)]),t._v(" "),t.filterChilds()?e("div",{staticClass:"tas-show2-goods"},[e("ul",[t._l(t.goodsSort,function(s,i){return[t.incategory(s.cids)?[t.isselected(s.id,"goods")?e("li",{key:i,staticClass:"tas-goodsList sign",on:{click:function(e){t.deleteGoodsId(s.id,"goods")}}},[t._v(t._s(s.goodsName))]):e("li",{key:i,staticClass:"tas-goodsList",on:{click:function(e){t.addGoodsID(s.id,"goods")}}},[t._v(t._s(s.goodsName))])]:t._e()]})],2)]):t._e(),t._v(" "),e("div",{staticClass:"tas-show2-title"},[e("ul",[t._l(t.packageTitle,function(s,i){return[s.id==t.packageIndex?e("li",{key:i,staticClass:"bgc-blue",on:{click:function(e){t.changePackage(s)}}},[t._v(t._s(s.name))]):e("li",{key:i,staticClass:"tas-Cuisine",on:{click:function(e){t.changePackage(s)}}},[t._v(t._s(s.name))])]})],2)]),t._v(" "),e("div",{staticClass:"tas-show2-goods"},[e("ul",[t._l(t.packageList,function(s,i){return[t.filterPackage(s.type)?e("li",{key:i,staticClass:"tas-goodsList",class:{sign:t.isselected(s.id,"package")},on:{click:function(e){t.deleteGoodsId(s.id,"package")}}},[t._v(t._s(s.packageName))]):t._e()]})],2)])])])};i._withStripped=!0;var o=e("bbb9"),a=e("f6ce"),n=e("81a2");var c=a.a.session("userShop"),d={data:function(){return{category:[],child:[],goods:[],List1ID:0,List2ID:0,selectedGoodsID:[],packageTitle:[{name:"全部",id:0},{name:"可选套餐",id:1},{name:"固定套餐",id:2}],packageIndex:0,packageList:[],selectPackageId:[]}},props:["selectShops","selectPackages","selectGoods"],computed:{goodsSort:function(){return o.a.sortByAll(this.goods,"id")}},methods:{winEvent:function(t){if("ok"!=t)return this.$emit("closeWin"),!1;0==this.selectedGoodsID.length&&0==this.selectPackageId.length?this.$store.commit("setWin",{winType:"alert",title:"提示信息",content:"请选择至少一道菜或者套餐"}):this.$emit("closeWin",{selectedGoodsID:this.selectedGoodsID,selectPackageId:this.selectPackageId})},changeL1ID:function(t,s){this.List1ID=t,this.List2ID=0,this.child=this.category[s].child?this.category[s].child:[]},changePackage:function(t){this.packageIndex=t.id},changeL2ID:function(t){this.List2ID=t},addGoodsID:function(t,s){this.selectPackageId=[],this.selectedGoodsID=[],"goods"==s?this.selectedGoodsID.push(t):this.selectPackageId.push(t)},isSave:function(t,s){for(var e={},i=0;i<s.length;i++)e[s[i]]||(e[s[i]]=666);return!e[t]},deleteGoodsId:function(t,s){"goods"==s?this.removeList(t):"package"==s&&(0==this.selectPackageId.length||this.selectPackageId.length>0&&this.isSave(t,this.selectPackageId)?this.addGoodsID(t,"package"):this.removeList(t))},selectAllGoods:function(t){if("package"==t)for(var s=0;s<this.packageList.length;s++)0==this.packageIndex?this.addGoodsID(this.packageList[s].id,"package"):1==this.packageIndex?1==this.packageList[s].type&&this.addGoodsID(this.packageList[s].id,"package"):2==this.packageIndex&&0==this.packageList[s].type&&this.addGoodsID(this.packageList[s].id,"package");else for(var e=0;e<this.goods.length;e++)0==this.List1ID?this.addGoodsID(this.goods[e].id,"goods"):this.goods[e].cids.indexOf(this.List1ID)>=0&&0==this.List2ID?this.addGoodsID(this.goods[e].id,"goods"):this.goods[e].cids.indexOf(this.List2ID)>=0&&this.addGoodsID(this.goods[e].id,"goods")},removeList:function(t){var s=this.selectPackageId.indexOf(t);this.selectPackageId.splice(s,1)},unSelectAllGoods:function(t){if("package"==t)for(var s=0;s<this.packageList.length;s++)0==this.packageIndex?this.removeList(this.packageList[s].id):1==this.packageIndex?1==this.packageList[s].type&&this.removeList(this.packageList[s].id):2==this.packageIndex&&0==this.packageList[s].type&&this.removeList(this.packageList[s].id);else for(var e=0;e<this.goods.length;e++)0==this.List1ID?this.deleteGoodsId(this.goods[e].id,"goods"):this.goods[e].cids.indexOf(this.List1ID)>=0&&0==this.List2ID?this.deleteGoodsId(this.goods[e].id,"goods"):this.goods[e].cids.indexOf(this.List2ID)>=0&&this.deleteGoodsId(this.goods[e].id,"goods")},incategory:function(t){return 0==this.List1ID||(t.indexOf(this.List1ID)>=0&&0==this.List2ID||t.indexOf(this.List2ID)>=0)},filterChilds:function(){for(var t=0,s=0;s<this.goods.length;s++)this.incategory(this.goods[s].cids)&&t++;return t>0},isselected:function(t,s){return-1!=("goods"==s?o.a.deepCopy(this.selectedGoodsID):o.a.deepCopy(this.selectPackageId)).indexOf(t)},isSelectPackage:function(t){return-1!=this.selectPackageId.indexOf(t)},filterPackage:function(t){return 0==this.packageIndex||(1==this.packageIndex?1==t:2==this.packageIndex?0==t:void 0)},arrToString:function(t){for(var s="",e=0;e<t.length;e++)s+=t[e],e<t.length-1&&(s+=",");return s},init:function(){var t,s=this;return(t=regeneratorRuntime.mark(function t(){var e,i,o;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=a.a.session("areaList"),s.category=e,s.category.unshift({name:"全部",id:0}),i=a.a.session("goodList"),s.goods=i,t.next=7,n.a.getAllPackage({data:{page:1,num:9999,shopIds:s.arrToString(s.selectShops)?s.arrToString(s.selectShops):c.currentShop.id}});case 7:o=t.sent,s.packageList=o;case 9:case"end":return t.stop()}},t,s)}),function(){var s=t.apply(this,arguments);return new Promise(function(t,e){return function i(o,a){try{var n=s[o](a),c=n.value}catch(t){return void e(t)}if(!n.done)return Promise.resolve(c).then(function(t){i("next",t)},function(t){i("throw",t)});t(c)}("next")})})()}},mounted:function(){this.selectedGoodsID=this.selectGoods?this.selectGoods:[],this.selectPackageId=this.selectPackages?this.selectPackages:[],this.init()},components:{win:function(){return e.e("win").then(e.bind(null,"f60a"))}}},h=(e("9c53"),e("7610")),l=Object(h.a)(d,i,[],!1,null,"a6e767e4",null);l.options.__file="src\\module\\marketing_tools\\coupon_goods_win.vue";s.default=l.exports},"47d2":function(t,s,e){},"9c53":function(t,s,e){"use strict";var i=e("47d2");e.n(i).a}}]);