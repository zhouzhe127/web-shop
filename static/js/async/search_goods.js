(window.webpackJsonp=window.webpackJsonp||[]).push([["search_goods"],{"09c3":function(e,t,s){"use strict";var a=s("af06");s.n(a).a},"74af":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[0==e.inventConfigure?s("ul",{staticClass:"tebBox"},e._l(e.tebData,function(t,a){return s("li",{key:a,class:{active:e.tabactive==a},on:{click:function(t){e.tebClick(a)}}},[e._v(e._s(t))])})):e._e(),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:0==e.tabactive,expression:"tabactive==0"}],staticClass:"warehouse-lists"},[s("div",{staticClass:"filter"},[s("div",{staticClass:"inline-box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.goodsName,expression:"goodsName"}],attrs:{type:"text",placeholder:"请输入商品名"},domProps:{value:e.goodsName},on:{input:function(t){t.target.composing||(e.goodsName=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"inline-box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.goodsCode,expression:"goodsCode"}],attrs:{type:"text",placeholder:"请输入条形码"},domProps:{value:e.goodsCode},on:{input:function(t){t.target.composing||(e.goodsCode=t.target.value)}}})]),e._v(" "),s("div",{staticStyle:{display:"inline-block","vertical-align":"top",margin:"0 10px"}},[s("select-btn",{ref:"select",attrs:{sorts:e.typeList,name:e.allGoods},on:{selOn:e.selectList}})],1),e._v(" "),s("div",{staticClass:"inline-box setspeen"},[e._v("\n\t\t\t\t仓库所属：\n\t\t\t\t"),s("select-btn",{ref:"selects",attrs:{sorts:e.wareVal,name:e.wareGoods},on:{selOn:e.selectWare}}),e._v(" "),s("div",{staticClass:"inline-box button-box"},[s("span",{staticClass:"blue",on:{click:e.searchGoods}},[e._v("筛选")]),e._v(" "),s("span",{staticClass:"gray",on:{click:e.resetGoods}},[e._v("重置")])])],1)]),e._v(" "),s("div",{staticClass:"main"},[s("div",{staticClass:"list"},[s("div",{staticClass:"head"},[e._v("\n\t\t\t\t\t商品列表 · 共"),s("em",[e._v(" "+e._s(e.allcount)+" ")]),e._v("条数据\n\t\t\t\t")]),e._v(" "),e._m(0),e._v(" "),s("ul",e._l(e.allList,function(t,a){return s("li",{key:a},[s("span",{staticClass:"wide handle",on:{click:function(s){e.getDetail(1+a+10*(e.page-1),t)}}},[s("em",{staticClass:"detail"},[e._v("查看详情")])]),e._v(" "),s("span",[e._v(e._s(1+a+10*(e.page-1)))]),e._v(" "),s("span",{staticClass:"wide"},[e._v(e._s(t.goodsName))]),e._v(" "),t.barCode?s("span",[e._v(e._s(t.barCode))]):s("span",[e._v("--")]),e._v(" "),s("span",[e._v(e._s(e.typeList[+t.type+1]))]),e._v(" "),s("span",[e._v(e._s(t.shopName))]),e._v(" "),t.goodsNum?s("span",[e._v(e._s(Number(t.goodsNum.surplus)||0)+e._s(t.unit))]):e._e()])}))]),e._v(" "),s("div",{staticClass:"page-box"},[s("pageBtn",{attrs:{isNoJump:!1,isNoPaging:!0,total:e.pageTotal,page:e.page},on:{pageNum:e.pageChange}})],1)])]),e._v(" "),e.wareList?s("invent-supplies",{directives:[{name:"show",rawName:"v-show",value:1==e.tabactive,expression:"tabactive==1"}],attrs:{wareList:e.wareList,tabactive:e.tabactive}}):e._e()],1)};a._withStripped=!0;var n=s("f6ce"),i=s("bbb9"),o=s("81a2");function r(e){if(Array.isArray(e)){for(var t=0,s=Array(e.length);t<e.length;t++)s[t]=e[t];return s}return Array.from(e)}function l(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,s){return function a(n,i){try{var o=t[n](i),r=o.value}catch(e){return void s(e)}if(!o.done)return Promise.resolve(r).then(function(e){a("next",e)},function(e){a("throw",e)});e(r)}("next")})}}var c={data:function(){return{page:1,showNum:10,pageTotal:0,typeList:["全部类型","普通商品","称重商品"],allGoods:"全部类型",wareList:"",wareVal:"",wareGoods:"全部",selWare:0,selType:-1,goodsName:"",goodsCode:"",allList:"",tebData:["商品","物料"],tabactive:0,shopIds:"",allcount:0,inventConfigure:0}},components:{pageBtn:function(){return s.e("page_element").then(s.bind(null,"5921"))},selectBtn:function(){return s.e("select_btn").then(s.bind(null,"3d41"))},inventSupplies:function(){return s.e("allSupplies").then(s.bind(null,"4fd2"))}},mounted:function(){var e=this;this.$store.commit("setPageTools",[{name:"返回",className:["back"],fn:function(){e.$router.push({path:"/admin/warehouseList",query:e.$route.query})}}]),this.inventConfigure=n.a.session("inventConfigure"),this.tabactive=0==this.inventConfigure?0:this.inventConfigure-1,this.init()},methods:{init:function(){var e=this;return l(regeneratorRuntime.mark(function t(){var s,a,i;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.invoicing_getOwners();case 2:s=t.sent,e.wareList=[{shopId:-1,shopName:"全部",all:e.getShops(s)}].concat(r(s)),a=s.map(function(e){return e.shopName}),e.wareVal=["全部"].concat(r(a)),e.shopIds=e.getShops(s),e.selWare=e.shopIds,i=n.a.session("inventConfigure"),e.tabactive=2==i?1:0,e.configIndex=i,1!=i&&0!=i||e.getlistAll();case 12:case"end":return t.stop()}},t,e)}))()},getlistAll:function(){var e=this;return l(regeneratorRuntime.mark(function t(){var s,a,n,r,l,c,u,v;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.getMultiShopGoodsList({data:{shopIds:e.selWare,type:e.selType,goodsName:e.goodsName,barCode:e.goodsCode,page:e.page,num:10}});case 2:s=t.sent,e.allList=s.list,e.pageTotal=s.total,e.allcount=s.count,a=!0,n=!1,r=void 0,t.prev=9,l=e.allList[Symbol.iterator]();case 11:if(a=(c=l.next()).done){t.next=20;break}return u=c.value,t.next=15,o.a.invent_getGoodsNum({data:{gids:u.id,shopId:u.shopId}});case 15:v=t.sent,u.goodsNum=v[0];case 17:a=!0,t.next=11;break;case 20:t.next=26;break;case 22:t.prev=22,t.t0=t.catch(9),n=!0,r=t.t0;case 26:t.prev=26,t.prev=27,!a&&l.return&&l.return();case 29:if(t.prev=29,!n){t.next=32;break}throw r;case 32:return t.finish(29);case 33:return t.finish(26);case 34:e.allList=i.a.deepCopy(e.allList);case 35:case"end":return t.stop()}},t,e,[[9,22,26,34],[27,,29,33]])}))()},getShops:function(e){var t=[];for(var s in e)0!=e[s].shopId&&t.push(e[s].shopId);return t.join(",")},pageChange:function(e){e.page&&(this.page=e.page,this.getlistAll())},selectList:function(e){this.selType=e-1},selectWare:function(e){console.log(e),e>0?this.selWare=this.wareList[e].shopId:this.shopIds=this.wareList[0].all},searchGoods:function(){this.page=1,this.getlistAll()},resetGoods:function(){this.page=1,this.goodsName="",this.goodsCode="",this.selWare=this.shopIds,this.selType=-1,this.wareGoods="全部",this.allGoods="全部类型",this.$refs.select.sortName="全部类型",this.$refs.selects.sortName="全部",this.$refs.select.selected=0,this.$refs.selects.selected=0,this.getlistAll()},getDetail:function(e,t){t.numerical=e,n.a.session("goodsneed",t),this.$router.push({path:"warehouseGoodsDetail",query:this.$route.query})},tebClick:function(e){this.tabactive=e}}},u=(s("09c3"),s("6ceb")),v=Object(u.a)(c,a,[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"title"},[s("span",{staticClass:"wide"},[e._v("操作")]),e._v(" "),s("span",[e._v("序号")]),e._v(" "),s("span",{staticClass:"wide"},[e._v("商品名")]),e._v(" "),s("span",[e._v("条码")]),e._v(" "),s("span",[e._v("商品类型")]),e._v(" "),s("span",[e._v("仓库所属")]),e._v(" "),s("span",[e._v("库存总量")])])}],!1,null,"152e7408",null);v.options.__file="src\\module\\invoicing_system\\warehouse_manage\\search_goods.vue";t.default=v.exports},af06:function(e,t,s){}}]);