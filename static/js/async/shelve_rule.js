(window.webpackJsonp=window.webpackJsonp||[]).push([["shelve_rule"],{1301:function(e,t,n){},"1b45":function(e,t,n){"use strict";var r=n("1301");n.n(r).a},ab59:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"deploy-content"}},[n("div",{staticClass:"deploy-font"},[e._v("\n\t\t货架商品销售配置\n\t")]),e._v(" "),n("ul",{staticClass:"rule",on:{click:e.clickItem}},[n("li",{class:{active:0==e.currentChoose}},[e._v("货架商品不足时，不可以销售该商品")]),e._v(" "),n("li",{class:{active:1==e.currentChoose}},[e._v("货架商品不足时，可以销售该商品\n\t\t\t"),n("i",[e._v("销售后货架商品数量为负数，下次上架后补充完整")])])]),e._v(" "),n("div",{staticClass:"btn",on:{click:e.save}},[e._v("保存")])])};r._withStripped=!0;var s=n("81a2"),o=n("f6ce");var i={data:function(){return{currentChoose:null,shopId:null}},methods:{getShelveRule:function(){var e,t=this;return(e=regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.getShelveRule({data:{shopId:t.shopId}});case 2:n=e.sent,t.currentChoose=n;case 4:case"end":return e.stop()}},e,t)}),function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function r(s,o){try{var i=t[s](o),c=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(c).then(function(e){r("next",e)},function(e){r("throw",e)});e(c)}("next")})})()},clickItem:function(){this.currentChoose=null==this.currentChoose||"0"==this.currentChoose?"1":"0"},save:function(){var e=this;s.a.editShelveRule({data:{shopId:this.shopId,isShelveMinus:this.currentChoose}}).then(function(){e.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"修改成功"})})}},mounted:function(){var e=o.a.session("userShop");this.shopId=e.currentShop.id,this.getShelveRule()}},c=(n("1b45"),n("7610")),u=Object(c.a)(i,r,[],!1,null,"39ff12d8",null);u.options.__file="src\\module\\invoicing_system\\config_manage\\shelve_rule.vue";t.default=u.exports}}]);