(window.webpackJsonp=window.webpackJsonp||[]).push([["select_shop"],{"27a4":function(s,t,h){"use strict";h.r(t);var i=function(){var s=this,t=s.$createElement,h=s._self._c||t;return h("div",{staticClass:"detLi"},[h("div",{staticClass:"select-body-btn select-btn",on:{click:s.shop}},[h("span",{ref:"spanBtn"},[s.showNum&&"请选择店铺"!=s.selectedShop?h("i",[s._v("已选择"+s._s(s.selectedShop.split(",").length)+"家门店")]):h("i",[s._v(s._s(s.selectedShop))])]),s._v(" "),s._m(0)]),s._v(" "),s.showShop?h("div",{staticClass:"detDiv",staticStyle:{width:"500px",top:"52px",left:"-10px"},on:{click:function(s){s.stopPropagation()}}},[h("i",{staticClass:"detI",staticStyle:{left:"150px"}}),s._v(" "),h("div",{staticClass:"detH3",staticStyle:{"text-align":"left","max-height":"500px",overflow:"auto"}},[h("div",{staticClass:"jobBtn"},[h("a",{staticClass:"job",class:{selectbtn:"all"==s.shopType},attrs:{href:"javascript:void(0)"},on:{click:function(t){s.chooseShop("all")}}},[s._v("全部")]),s._v(" "),h("a",{staticClass:"job",class:{selectbtn:"brand"==s.shopType},attrs:{href:"javascript:void(0)"},on:{click:function(t){s.chooseShop("brand")}}},[s._v("直营店")]),s._v(" "),h("a",{staticClass:"job",class:{selectbtn:"shop"==s.shopType},attrs:{href:"javascript:void(0)"},on:{click:function(t){s.chooseShop("shop")}}},[s._v("加盟店")])]),s._v(" "),h("ul",[h("li",{staticClass:"all",class:{active:s.allShop},on:{click:function(t){s.selJob()}}},[s._v("全部")]),s._v(" "),s._l(s.showShopList,function(t,i){return h("li",{key:i,class:{active:t.selected},on:{click:function(h){s.selJob(t)}}},[s._v(s._s(t.shopName))])})],2)]),s._v(" "),h("div",{staticClass:"detLiBtn"},[h("span",{staticClass:"gray",on:{click:function(t){s.cancel()}}},[s._v("取消")]),s._v(" "),h("span",{staticClass:"yellow",on:{click:function(t){s.ensure()}}},[s._v("确定")])])]):s._e()])};i._withStripped=!0;var o=h("f6ce"),e={data:function(){return{shopType:"all",allShop:!1,showShopList:[],shopList:[],showShop:!1,selectedShop:"请选择店铺",shopIds:[]}},props:["show","reset","showNum"],mounted:function(){this.init()},watch:{show:function(){this.showShop=!1},reset:function(){this.selectedShop="请选择店铺",this.init(),this.shopIds=[]}},methods:{init:function(){for(var s=o.a.session("shopList"),t=0;t<s.length;t++)s[t].selected=!1;this.shopList=s,this.showShopList=s},shop:function(){this.showShop=!this.showShop,0!=this.shopList.length&&(this.isSelected(this.shopIds,this.shopList),this.isAll(this.showShopList)?this.allShop=!0:this.allShop=!1)},isSelected:function(s,t){for(var h=0;h<t.length;h++){t[h].selected=!1;for(var i=0;i<s.length;i++)s[i]==t[h].id&&(t[h].selected=!0)}},selJob:function(s){var t=0;if(s){s.selected=!s.selected;for(var h=0;h<this.showShopList.length;h++)this.showShopList[h].selected&&t++;t==this.showShopList.length?this.allShop=!0:this.allShop=!1}else if(this.isAll(this.showShopList))for(var i=0;i<this.showShopList.length;i++)this.showShopList[i].selected=!1,this.allShop=!1;else for(var o=0;o<this.showShopList.length;o++)this.showShopList[o].selected=!0,this.allShop=!0},chooseShop:function(s){if(this.shopType=s,this.showShopList=[],"all"===s)this.showShopList=this.shopList;else if("brand"===s)for(var t=0;t<this.shopList.length;t++)"1"==this.shopList[t].ischain&&this.showShopList.push(this.shopList[t]);else if("shop"===s)for(var h=0;h<this.shopList.length;h++)"2"==this.shopList[h].ischain&&this.showShopList.push(this.shopList[h]);this.isAll(this.showShopList)?this.allShop=!0:this.allShop=!1},isAll:function(s){if(0==s.length)return!1;for(var t=0;t<s.length;t++)if(!s[t].selected)return!1;return!0},ensure:function(){this.showShop=!1,this.selectedShop="",this.shopIds=[];for(var s=0;s<this.shopList.length;s++)this.shopList[s].selected&&(this.selectedShop+=this.shopList[s].shopName+",",this.shopIds.push(this.shopList[s].id));this.selectedShop=this.selectedShop.slice(0,this.selectedShop.length-1),this.selectedShop||(this.selectedShop="请选择店铺"),this.$emit("returnShop",this.shopIds,this.selectedShop,this.shopList)},cancel:function(){this.showShop=!1,this.$emit("returnShop")}}},l=(h("39d2"),h("7610")),c=Object(l.a)(e,i,[function(){var s=this.$createElement,t=this._self._c||s;return t("em",[t("i")])}],!1,null,"24134156",null);c.options.__file="src\\module\\cashier\\select_shop.vue";t.default=c.exports},"39d2":function(s,t,h){"use strict";var i=h("9125");h.n(i).a},9125:function(s,t,h){}}]);