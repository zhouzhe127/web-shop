(window.webpackJsonp=window.webpackJsonp||[]).push([["integer_set"],{"97d7":function(e,t,n){"use strict";n.r(t);var i=n("81a2"),r=n("f6ce");function s(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function i(r,s){try{var c=t[r](s),o=c.value}catch(e){return void n(e)}if(!c.done)return Promise.resolve(o).then(function(e){i("next",e)},function(e){i("throw",e)});e(o)}("next")})}}var c={data:function(){return{on:!1,priceRule:0,list:[],userData:Object}},mounted:function(){this.userData=r.a.session("userShop"),this.init()},methods:{getIsDiscountToggle:function(e){this.on=e},init:function(){var e=this;return s(regeneratorRuntime.mark(function t(){var n,r,s,c;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.getPriceRule({data:{shopId:e.userData.currentShop.id,priceRule:e.priceRule}});case 2:if(n=t.sent){for(r={selected:!1},s=0;s<n.list.length;s++)for(c in r)n.list[s][c]=r[c];e.list=n.list,e.priceRule=n.priceRule,1*n.priceRule>0?(e.list[e.priceRule-1].selected=!0,e.on=!0):0==n.priceRule&&(e.on=!1)}case 4:case"end":return t.stop()}},t,e)}))()},selectItem:function(e){for(var t=this.list,n=0;n<t.length;n++)t[n].selected=!1;this.list[e-1].selected=!0,this.priceRule=e},keepOn:function(){var e=this;return s(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return 0==e.on&&(e.priceRule=0),t.next=3,i.a.setPriceRule({data:{shopId:e.userData.currentShop.id,priceRule:e.priceRule}});case 3:t.sent&&(1==e.on&&0==e.priceRule?e.$store.commit("setWin",{title:"温馨提示",content:"请选择取整方式"}):e.$store.commit("setWin",{title:"温馨提示",content:"保存成功"}));case 5:case"end":return t.stop()}},t,e)}))()}},components:{onOff:function(){return n.e("on_off").then(n.bind(null,"034b"))}}},o=(n("bd82"),n("d801")),a=Object(o.a)(c,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{attrs:{id:"integer"}},[n("div",{staticClass:"topR",staticStyle:{position:"relative"}},[n("section",{staticClass:"fl"},[n("label",{staticClass:"commodity-name fl"},[e._v("开启取整")]),e._v(" "),n("on-off",{staticClass:"on_off",attrs:{status:e.on},on:{statusChange:e.getIsDiscountToggle}})],1)]),e._v(" "),e.on?[n("div",{staticClass:"picName"},[n("span",{staticClass:"required span_set"},[e._v("取整方式 ")]),e._v(" "),n("ul",e._l(e.list,function(t,i){return n("li",{key:i,on:{click:function(n){e.selectItem(t.id)}}},[n("h3",[e._v(e._s(t.name))]),e._v(" "),n("span",[e._v(e._s(t.desc))]),e._v(" "),t.selected&&e.priceRule>0?n("i"):e._e()])}))])]:e._e(),e._v(" "),n("a",{staticClass:"yellow",attrs:{href:"javascript:void(0);"},on:{click:e.keepOn}},[e._v("保存")])],2)},[],!1,null,"0403b3d9",null);t.default=a.exports},bd82:function(e,t,n){"use strict";var i=n("f403");n.n(i).a},f403:function(e,t,n){}}]);