(window.webpackJsonp=window.webpackJsonp||[]).push([["order_win"],{"0460":function(t,s,i){"use strict";i.r(s);var o=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",[i("win",{attrs:{align:"center",width:900,height:600,type:"alert"},on:{winEvent:t.getWinClickResult}},[i("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),i("div",{attrs:{slot:"content",id:"discounTan"},slot:"content"},[i("section",{staticClass:"oBox"},[t.discounts.discount&&t.discounts.discount.length>0?i("ul",{staticClass:"oUl"},[i("section",{staticClass:"otitle"},[i("div",{staticClass:"dian"}),t._v(" 整单折扣\n\t\t\t\t\t\t"),i("h3",{staticClass:"oTotal"},[t._v("总计: ￥"+t._s(parseFloat(t.discounts.discountPrice).toFixed(2)))])]),t._v(" "),t._l(t.discounts.discount,function(s,o){return i("li",{key:o,staticClass:"oLi"},[i("section",{staticClass:"rightBor"},[i("h3",{staticClass:"oH3"},[t._v(t._s(s.name+"·"+s.times+"次"))]),t._v(" "),i("h3",{staticClass:"oH3",staticStyle:{color:"#726F76","font-size":"20px"}},[t._v("￥"+t._s(parseFloat(s.price).toFixed(2)))])]),t._v(" "),i("section",{staticClass:"oLift"})])})],2):t._e(),t._v(" "),t.discounts.discount&&t.discounts.discount.length>0?i("div",{staticClass:"oZhe"}):t._e(),t._v(" "),t.discounts.discount2&&t.discounts.discount2.length>0?i("ul",{staticClass:"oUl"},[i("section",{staticClass:"otitle"},[i("div",{staticClass:"dian"}),t._v(" 整单强折\n\t\t\t\t\t\t"),i("h3",{staticClass:"oTotal"},[t._v("总计: ￥"+t._s(parseFloat(t.discounts.discountPrice2).toFixed(2)))])]),t._v(" "),t._l(t.discounts.discount2,function(s,o){return i("li",{key:o,staticClass:"oLi"},[i("section",{staticClass:"rightBor"},[i("h3",{staticClass:"oH3"},[t._v(t._s(s.name+"·"+s.times+"次"))]),t._v(" "),i("h3",{staticClass:"oH3",staticStyle:{color:"#726F76","font-size":"20px"}},[t._v("￥"+t._s(parseFloat(s.price).toFixed(2)))])]),t._v(" "),i("section",{staticClass:"oLift"})])})],2):t._e(),t._v(" "),t.discounts.discount2&&t.discounts.discount2.length>0?i("div",{staticClass:"oZhe"}):t._e(),t._v(" "),t.discounts.oneDis.length>0?i("ul",{staticClass:"oUl"},[i("section",{staticClass:"otitle"},[i("div",{staticClass:"dian"}),t._v(" 单品折扣\n\t\t\t\t\t\t"),i("h3",{staticClass:"oTotal"},[t._v("总计: ￥"+t._s(parseFloat(t.discounts.oneDisPrice).toFixed(2)))])]),t._v(" "),t._l(t.discounts.oneDis,function(s,o){return i("li",{key:o,staticClass:"oLi"},[i("section",{staticClass:"rightBor"},[i("h3",{staticClass:"oH3",attrs:{title:s.name}},[t._v(t._s(s.name+"·"+s.times+"次"))]),t._v(" "),i("h3",{staticClass:"oH3",staticStyle:{color:"#726F76","font-size":"20px"}},[t._v("￥"+t._s(parseFloat(s.price).toFixed(2)))])]),t._v(" "),i("section",{staticClass:"oLift"})])})],2):t._e(),t._v(" "),t.discounts.oneDis&&t.discounts.oneDis.length>0?i("div",{staticClass:"oZhe"}):t._e(),t._v(" "),t.discounts.coupon&&t.discounts.coupon.length>0?i("ul",{staticClass:"oUl"},[i("section",{staticClass:"otitle"},[i("div",{staticClass:"dian"}),t._v(" 优惠券\n\t\t\t\t\t\t"),i("h3",{staticClass:"oTotal"},[t._v("总计: ￥"+t._s(parseFloat(t.discounts.couponPrice).toFixed(2)))])]),t._v(" "),t._l(t.discounts.coupon,function(s,o){return i("li",{key:o,staticClass:"oLi"},[i("section",{staticClass:"rightBor"},[i("h3",{staticClass:"oH3",attrs:{title:s.name}},[t._v(t._s(s.name+"-"+s.times+"次("+s.num+"张)"))]),t._v(" "),i("h3",{staticClass:"oH3",staticStyle:{color:"#726F76","font-size":"20px"}},[t._v("￥"+t._s(parseFloat(s.price).toFixed(2)))])]),t._v(" "),i("section",{staticClass:"oLift"})])})],2):t._e(),t._v(" "),t.discounts.coupon&&t.discounts.coupon.length>0?i("div",{staticClass:"oZhe"}):t._e(),t._v(" "),t.discounts.others&&t.discounts.others.length>0?i("ul",{staticClass:"oUl"},[i("section",{staticClass:"otitle"},[i("div",{staticClass:"dian"}),t._v(" 其它优惠\n\t\t\t\t\t\t"),i("h3",{staticClass:"oTotal"},[t._v("总计: ￥"+t._s(parseFloat(t.discounts.othersPrice).toFixed(2)))])]),t._v(" "),t._l(t.discounts.others,function(s,o){return i("li",{key:o,staticClass:"oLi"},[i("section",{staticClass:"rightBor"},[4==s.type?i("h3",{staticClass:"oH3",attrs:{title:s.name}},[t._v(t._s("3"==t.userData.currentShop.ischain?s.name:s.name+"("+t.freeNum+")"))]):t._e(),t._v(" "),4!=s.type?i("h3",{staticClass:"oH3",attrs:{title:s.name}},[t._v(t._s(s.name+"·"+s.times+"次"))]):t._e(),t._v(" "),i("h3",{staticClass:"oH3",staticStyle:{color:"#726F76","font-size":"20px"}},[t._v("￥"+t._s(parseFloat(s.price).toFixed(2)))])]),t._v(" "),i("section",{staticClass:"oLift"})])})],2):t._e(),t._v(" "),t.discounts.others&&t.discounts.others.length>0?i("div",{staticClass:"oZhe"}):t._e(),t._v(" "),i("div",{staticStyle:{width:"100%",height:"50px"}},[i("h3",{staticStyle:{width:"100%",height:"50px","line-height":"50px","text-align":"right","padding-right":"40px",color:"#FD9A00","font-size":"18px","font-weight":"bolder"}},[t._v("优惠总计："+t._s(parseFloat(t.discountPrice).toFixed(2)))])])])])])],1)};o._withStripped=!0;var e=i("f6ce"),c={props:{payTotalNum:null,title:null},data:function(){return{userData:null,discounts:{discount:[],discount2:[],oneDis:[],others:[]},order:null,coupon:null,discountPrice:null,freeNum:null}},mounted:function(){var t=this.payTotalNum.discountList.order,s={discount:[],discountPrice:0,discount2:[],discountPrice2:0,oneDis:[],oneDisPrice:0,others:[],othersPrice:0,coupon:this.payTotalNum.discountList.coupon,couponPrice:0,alldiscountPrice:0};s.discount=[];for(var i=0;i<t.length;i++)"1"==t[i].type?(s.discount.push(t[i]),s.discountPrice=s.discountPrice+1*t[i].price):"3"==t[i].type?(s.discount2.push(t[i]),s.discountPrice2=s.discountPrice2+1*t[i].price):"5"==t[i].type?(s.oneDis.push(t[i]),s.oneDisPrice=s.oneDisPrice+1*t[i].price):(s.others.push(t[i]),s.othersPrice=s.othersPrice+1*t[i].price);for(var o=0;o<s.coupon.length;o++)s.couponPrice=s.couponPrice+1*s.coupon[o].price;s.alldiscountPrice=s.discountPrice+s.discountPrice2+s.oneDisPrice+s.othersPrice+s.couponPrice,this.discounts=s,this.userData=e.a.session("userShop"),this.discountPrice="3"==this.userData.currentShop.ischain?s.alldiscountPrice:this.payTotalNum.discount,this.order=this.payTotalNum.discountList.order,this.coupon=this.payTotalNum.discountList.coupon,this.freeNum=this.payTotalNum.freeNum},methods:{getWinClickResult:function(t){this.$emit("toClick",t)}},components:{win:function(){return i.e("win").then(i.bind(null,"f60a"))}}},n=(i("7ad6"),i("7610")),a=Object(n.a)(c,o,[],!1,null,"2d345168",null);a.options.__file="src\\module\\statistics\\order_win.vue";s.default=a.exports},"16d8":function(t,s,i){},"7ad6":function(t,s,i){"use strict";var o=i("16d8");i.n(o).a}}]);