(window.webpackJsonp=window.webpackJsonp||[]).push([["warehouse_goods_detail"],{9187:function(t,e,a){},"9e79":function(t,e,a){"use strict";var i=a("9187");a.n(i).a},a33b3:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"warehouse-lists"},[a("div",{staticClass:"heander"},[a("div",{staticClass:"title"},[a("i"),t._v(" "),a("h3",[t._v("库存详情")]),t._v(" "),t._l(70,function(t){return a("div",{key:t,staticClass:"dian"})})],2),t._v(" "),a("div",{staticClass:"innerBox"},[a("ul",[a("li",[a("span",[t._v("商品名：")]),a("span",[t._v(t._s(t.goodsDetail.gName))])]),t._v(" "),a("li",[a("span",[t._v("条形码：")]),a("span",[t._v(t._s(t.goodsDetail.barCode))])]),t._v(" "),a("li",[a("span",[t._v("品牌：")]),a("span",[t._v(t._s(t.getString(t.goodsDetail.brandName)||"无"))])]),t._v(" "),a("li",[a("span",[t._v("序号：")]),a("span",[t._v(t._s(t.goodsTitle.numerical))])])]),t._v(" "),a("ul",[a("li",[a("span",[t._v("分类：")]),a("span",[t._v(t._s(t.getString(t.goodsDetail.cate,"name")))])]),t._v(" "),a("li",[a("span",[t._v("单位：")]),a("span",[t._v(t._s(t.goodsDetail.unit))])]),t._v(" "),a("li",[a("span",[t._v("规格：")]),a("span",[t._v(t._s(t.goodsDetail.specifications))])]),t._v(" "),a("li",[a("span",[t._v("批次数：")]),a("span",[t._v(t._s(t.goodsDetail.batchNum))])])]),t._v(" "),a("ul",[a("li",[a("span",[t._v("保质期：")]),a("span",[t._v(t._s(t.goodsDetail.validity)+t._s(t.dateType[t.goodsDetail.validityType]))])]),t._v(" "),a("li",[a("span",[t._v("库存数量/重量：")]),t._v(" "),a("span",[t._v(t._s(t.goodsDetail.surplus)+t._s(t.goodsDetail.unit))])])])])]),t._v(" "),a("div",{staticClass:"main"},[a("tableCom",{attrs:{listName:"调度记录",introData:t.selList,titleData:t.titleList,listWidth:1e3,allTotal:t.totalPage},scopedSlots:t._u([{key:"con-0",fn:function(e){return a("div",{},[t._v(t._s(e.index))])}},{key:"con-2",fn:function(e){return a("div",{},[t._v(t._s(t.getTime(e.data.productionTime)))])}},{key:"con-4",fn:function(e){return a("div",{},[t._v(t._s(e.data.surplus)+t._s(t.goodsDetail.unit))])}},{key:"con-5",fn:function(e){return a("div",{},[t._v(t._s(e.data.purchasePrice)+t._s(t.goodsDetail.unit))])}},{key:"con-6",fn:function(e){return a("div",{},[t._v(t._s(e.data.wName)+"\n\t\t\t\t"),e.data.wName&&e.data.aName?[t._v("-")]:t._e(),t._v(t._s(e.data.aName))],2)}}])}),t._v(" "),a("div",{staticClass:"page-box"},[a("page-btn",{attrs:{isNoJump:!1,isNoPaging:!0,total:t.pageTotal,page:t.page},on:{pageNum:t.pageChange}})],1)],1)])};i._withStripped=!0;var n=a("f6ce"),s=a("bbb9"),o=a("81a2");function r(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function i(n,s){try{var o=e[n](s),r=o.value}catch(t){return void a(t)}if(!o.done)return Promise.resolve(r).then(function(t){i("next",t)},function(t){i("throw",t)});t(r)}("next")})}}var l={data:function(){return{page:1,showNum:10,pageTotal:1,typeList:["全部类型","普通商品","称重商品"],allGoods:"全部类型",allList:"",selList:"",gid:"",goodsDetail:"",goodsTitle:"",dateType:["月","日","年"],titleList:[{titleName:"序号"},{titleName:"批次编码",dataName:"batchCode"},{titleName:"生产日期"},{titleName:"供应商",dataName:"supplier"},{titleName:"数量/重量"},{titleName:"进价"},{titleName:"所属仓库"}],totalPage:0}},components:{pageBtn:function(){return a.e("page_element").then(a.bind(null,"5921"))},tableCom:function(){return a.e("table").then(a.bind(null,"4360"))}},mounted:function(){n.a.session("goodsneed")&&(this.goodsTitle=n.a.session("goodsneed")),this.$store.commit("setPageTools",[{name:"返回",className:["back"],fn:function(){n.a.session("warehouseDetailDestroy",!0),window.history.go(-1)}}]),this.init(),this.getDetail()},methods:{init:function(){var t=this;return r(regeneratorRuntime.mark(function e(){var a,i,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={gid:t.goodsTitle.id,wid:t.goodsTitle.wid||""},t.goodsTitle.shopId&&Object.assign(a,{shopId:t.goodsTitle.shopId}),e.next=4,o.a.getGoodsBatch({data:a});case 4:i=e.sent,n=i.list,t.allList=n,t.totalPage=t.allList.length,t.pageTotal=Math.ceil(n.length/t.showNum),t.selList=t.allList.slice(10*(t.page-1),10*(t.page-1)+10);case 10:case"end":return e.stop()}},e,t)}))()},getDetail:function(){var t=this;return r(regeneratorRuntime.mark(function e(){var a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.getDetails({data:{gid:t.goodsTitle.id,shopIds:t.goodsTitle.shopId||"",wid:t.goodsTitle.wid||""}});case 2:a=e.sent,t.goodsDetail=a;case 4:case"end":return e.stop()}},e,t)}))()},pageChange:function(t){this.page=t.page,this.selList=this.allList.slice(10*(this.page-1),10*(this.page-1)+10)},getTime:function(t){return s.a.format(1e3*parseInt(t),"yyyy年MM月dd日")},addCount:function(t){return/^0+/.test(t+="")&&(t=t.replace(/^0+/,"")),/\./.test(t)||(t+=".000"),/^\./.test(t)&&(t="0"+t),t=(t+="000").match(/([+-]?)\d+\.\d{3}/)[0]},getString:function(t,e){if("string"==typeof t||!t)return t;if(e){var a=[],i=!0,n=!1,s=void 0;try{for(var o,r=t[Symbol.iterator]();!(i=(o=r.next()).done);i=!0){var l=o.value;a.push(l[e])}}catch(t){n=!0,s=t}finally{try{!i&&r.return&&r.return()}finally{if(n)throw s}}return a.join(",")}return e?void 0:t.join(",")}},destroyed:function(){sessionStorage.removeItem("goodsneed")}},d=(a("9e79"),a("6ceb")),u=Object(d.a)(l,i,[],!1,null,"b90748da",null);u.options.__file="src\\module\\invoicing_system\\warehouse_manage\\warehouse_goods_detail.vue";e.default=u.exports}}]);