(window.webpackJsonp=window.webpackJsonp||[]).push([["coupon_manage_win"],{"6aa4":function(t,e,i){"use strict";i.r(e);var s=i("81a2"),a=i("f6ce"),h=i("bbb9");var l={data:function(){return{detials:{},showShops:"",couponDetail:"",ischain:"",sharing:{0:"不与其它优惠共享",1:"可与其他优惠共享,可与会员卡优惠共用",2:"可与其他优惠共享,不与会员卡优惠共用"}}},props:["index","item"],computed:{ok:function(){return 3!=this.ischain&&0!=this.ischain?{content:"确定"}:{content:"修改"}}},methods:{winEvent:function(t){"ok"==t?3!=this.ischain&&0!=this.ischain?this.$emit("changeCoupon","nochange"):this.$emit("changeCoupon",this.detials):this.$emit("changeCoupon","nochange")},getEndTime:function(){var t=h.a.deepCopy(this.detials);return 0==t.validityType?"领券后"+t.relativeTime+"天过期":1==t.validityType?(t.endTime-=0,t.endTime=1e3*t.endTime,console.log(t.endTime),"到"+h.a.format(new Date(t.endTime),"yyyy-MM-dd")+"过期"):void 0},changeDays:function(t){if(0==(t=h.a.deepCopy(t)).length)return"请选择日期";t=t.sort(function(t,e){return t-e});var e="";function i(e){for(var i=t.indexOf(e);i<t.length;i++)if(t[i+1]-t[i]!=1){var s="";return s=t[i]-e==0?t[i]:t[i]-e==1?e+","+t[i]:e+"到"+t[i],i<t.length-1&&(s+=","),s}}for(var s=0;s<t.length;s++)t[s]-t[s-1]!=1&&(e+=i(t[s]));return e},getNum:function(t){return this.detials[t]&&this.detials[t].length>0&&0!=this.detials[t]?this.detials[t].split(",").length:0},getCouponInfo:function(){var t,e=this;return(t=regeneratorRuntime.mark(function t(){var i;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.getCouponById({data:{couponId:e.item.id}});case 2:i=t.sent,e.detials=i;case 4:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function s(a,h){try{var l=e[a](h),o=l.value}catch(t){return void i(t)}if(!l.done)return Promise.resolve(o).then(function(t){s("next",t)},function(t){s("throw",t)});t(o)}("next")})})()}},mounted:function(){this.ischain=a.a.session("userShop").currentShop.ischain,3==this.ischain&&(this.showShops=!0),this.getCouponInfo()},components:{win:function(){return i.e("win").then(i.bind(null,"f60a"))}}},o=(i("c0263"),i("d801")),n=Object(o.a)(l,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"fade"}},[i("win",{attrs:{width:580,height:800,align:"right",type:"alert",ok:t.ok},on:{winEvent:t.winEvent}},[i("section",{attrs:{slot:"content",id:"tanmanagement"},slot:"content"},[i("section",{staticClass:"titleTop",staticStyle:{width:"100%",height:"40px"}},[i("div",{staticStyle:{width:"100%",height:"40px",margin:"10px","line-height":"40px",position:"relative"}},[i("i",{staticStyle:{width:"2px",height:"28px",position:"absolute",top:"6px",left:"0","background-color":"#28A8E0"}}),t._v(" "),i("h3",{staticStyle:{width:"73px",height:"40px","margin-left":"10px",float:"left"}},[t._v("主要信息")]),t._v(" "),i("div",{staticStyle:{width:"430px",margin:"20px 5px",float:"left","border-bottom":"1px dashed #ccc"}})])]),t._v(" "),i("section",{staticStyle:{width:"100%",height:"auto"}},[i("div",{staticClass:"cList"},[i("div",{staticStyle:{width:"100%",height:"40px"}},[i("h3",{staticClass:"showBefore"},[t._v("优惠券类型:")]),t._v(" "),"1"==t.detials.type?i("div",{staticClass:"shopAfter"},[t._v("单品减免")]):t._e(),t._v(" "),"2"==t.detials.type?i("div",{staticClass:"shopAfter"},[t._v("整单减免")]):t._e(),t._v(" "),"3"==t.detials.type?i("div",{staticClass:"shopAfter"},[t._v("单品打折")]):t._e(),t._v(" "),"4"==t.detials.type?i("div",{staticClass:"shopAfter"},[t._v("整单打折")]):t._e(),t._v(" "),"5"==t.detials.type?i("div",{staticClass:"shopAfter"},[t._v("赠菜")]):t._e(),t._v(" "),"6"==t.detials.type?i("div",{staticClass:"shopAfter"},[t._v("代金券")]):t._e(),t._v(" "),"7"==t.detials.type?i("div",{staticClass:"shopAfter"},[t._v("积分卡券")]):t._e()]),t._v(" "),i("div",{staticStyle:{width:"100%",height:"40px"}},[i("h3",{staticClass:"showBefore"},[t._v("优惠券名称:")]),t._v(" "),i("div",{staticClass:"shopAfter"},[t._v(t._s(t.detials.name))])]),t._v(" "),"2"==t.detials.type||"6"==t.detials.type?i("div",{staticStyle:{width:"100%",height:"40px"}},[i("h3",{staticClass:"showBefore"},[t._v("强制减免:")]),t._v(" "),1==t.detials.isDiscount?i("div",{staticClass:"shopAfter"},[t._v("是")]):t._e(),t._v(" "),0==t.detials.isDiscount?i("div",{staticClass:"shopAfter"},[t._v("否")]):t._e()]):t._e(),t._v(" "),4==t.detials.type?i("div",{staticStyle:{width:"100%",height:"40px"}},[i("h3",{staticClass:"showBefore"},[t._v("是否强折:")]),t._v(" "),1==t.detials.isDiscount?i("div",{staticClass:"shopAfter"},[t._v("是")]):t._e(),t._v(" "),0==t.detials.isDiscount?i("div",{staticClass:"shopAfter"},[t._v("否")]):t._e()]):t._e(),t._v(" "),t.showShops&&"7"!=t.detials.type?i("div",{staticStyle:{width:"100%",height:"40px"}},[i("h3",{staticClass:"showBefore"},[t._v("关联店铺:")]),t._v(" "),i("div",{staticClass:"shopAfter",staticStyle:{height:"auto"}},[t._v("关联了"+t._s(t.getNum("shopIds"))+"家店铺")])]):t._e(),t._v(" "),"7"!==t.detials.type&&"6"!==t.detials.type&&"4"!==t.detials.type&&"2"!==t.detials.type&&t.detials.gids&&t.detials.gids.length>0?i("div",{staticStyle:{width:"100%",height:"40px"}},[i("h3",{staticClass:"showBefore"},[t._v("关联菜品:")]),t._v(" "),i("div",{staticClass:"shopAfter",staticStyle:{height:"auto"}},[t._v("关联了"+t._s(t.getNum("gids"))+"道菜")])]):t._e(),t._v(" "),"7"!==t.detials.type&&"4"!==t.detials.type&&"2"!==t.detials.type&&t.detials.pids&&t.detials.pids.length>0?i("div",{staticStyle:{width:"100%",height:"40px"}},[i("h3",{staticClass:"showBefore"},[t._v("关联套餐:")]),t._v(" "),i("div",{staticClass:"shopAfter",staticStyle:{height:"auto"}},[t._v("关联了"+t._s(t.getNum("pids"))+"套餐")])]):t._e(),t._v(" "),5==t.detials.type?i("div",{staticStyle:{width:"100%",height:"40px"}},[i("h3",{staticClass:"showBefore"},[t._v("是否包含口味价钱:")]),t._v(" "),0==t.detials.tastePrice?i("div",{staticClass:"shopAfter",staticStyle:{height:"auto"}},[t._v("否")]):t._e(),t._v(" "),1==t.detials.tastePrice?i("div",{staticClass:"shopAfter",staticStyle:{height:"auto"}},[t._v("是")]):t._e()]):t._e(),t._v(" "),""!=t.detials.param&&5!=t.detials.type&&7!=t.detials.type?i("div",{staticStyle:{width:"100%",height:"100%"}},["1"==t.detials.type||"2"==t.detials.type?i("h3",{staticClass:"showBefore"},[t._v("减免力度:")]):t._e(),t._v(" "),"3"==t.detials.type||"4"==t.detials.type?i("h3",{staticClass:"showBefore"},[t._v("折扣力度:")]):t._e(),t._v(" "),"1"==t.detials.type||"2"==t.detials.type?i("div",{staticClass:"shopAfter"},[t._v("减免"+t._s(t.detials.param)+"元")]):t._e(),t._v(" "),"3"==t.detials.type||"4"==t.detials.type?i("div",{staticClass:"shopAfter"},[t._v(t._s(t.detials.param)+"%")]):t._e()]):t._e(),t._v(" "),""!=t.detials.param&&7==t.detials.type?i("div",{staticStyle:{width:"100%",height:"100%"}},[i("h3",{staticClass:"showBefore"},[t._v("积分量:")]),t._v(" "),i("div",{staticClass:"shopAfter"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.detials.param)+"\n\t\t\t\t\t\t\t")])]):t._e(),t._v(" "),i("div",{staticStyle:{width:"100%",height:"40px"}},[i("h3",{staticClass:"showBefore"},[t._v("券有效期:")]),t._v(" "),i("div",{staticClass:"shopAfter"},[t._v(t._s(t.getEndTime()))])]),t._v(" "),7!=t.detials.type?i("div",[i("h3",{staticClass:"showBefore"},[t._v("优惠券共享:")]),t._v(" "),i("div",{staticClass:"shopAfter"},[t._v(t._s(t.sharing[t.detials.sharingStatus]))])]):t._e(),t._v(" "),"1"==t.detials.isRenewal?i("div",{staticStyle:{width:"370px",height:"40px",color:"#A0A0A0","margin-left":"135px"}},[t._v("上架时间结束时,若没有领完，则自动延期 每次延期30天")]):t._e()])]),t._v(" "),i("div",{staticStyle:{width:"100%",height:"40px",margin:"10px","line-height":"40px",position:"relative"}},[i("i",{staticStyle:{width:"2px",height:"28px",position:"absolute",top:"6px",left:"0","background-color":"#28A8E0"}}),t._v(" "),i("h3",{staticStyle:{width:"73px",height:"40px","margin-left":"10px",float:"left"}},[t._v("使用规则")]),t._v(" "),i("div",{staticStyle:{width:"430px",margin:"20px 5px",float:"left","border-bottom":"1px dashed #ccc"}})]),t._v(" "),7!=t.detials.type?i("div",{staticClass:"cList"},[i("div",{staticStyle:{width:"100%",height:"auto",overflow:"hidden"}},[i("h3",{staticClass:"showBefore"},[t._v("使用时间段:")]),t._v(" "),i("section",{staticStyle:{width:"370px",float:"left"}},[""==t.detials.useTime?[i("div",{staticClass:"shopAfter"},[t._v("不限制")])]:[t.detials.useTime&&t.detials.useTime.type&&"week"==t.detials.useTime.type?t._l(t.detials.useTime.list,function(e,s){return i("div",{key:s,staticClass:"shopAfter"},[i("span",[t._v(t._s(e.startslot)+" - ")]),t._v(" "),e.isNextDay?i("span",[t._v("至隔日")]):t._e(),t._v(" "),i("span",[t._v(t._s(e.endslot))])])}):t._e(),t._v(" "),t.detials.useTime&&t.detials.useTime.type&&"month"==t.detials.useTime.type?t._l(t.detials.useTime.list,function(e,s){return i("div",{key:s,staticClass:"shopAfter",staticStyle:{height:"auto"}},[i("span",[t._v(t._s(e.startslot)+" - ")]),t._v(" "),e.isNextDay?i("span",[t._v("至隔日")]):t._e(),t._v(" "),i("span",[t._v(t._s(e.endslot))]),t._v(" "),i("span",[t._v("日期:")]),t._v(" "),i("div",{staticStyle:{width:"240px",height:"100%"}},[t._v("每月的"+t._s(t.changeDays(e.month))+"日")])])}):t._e()]],2)]),t._v(" "),i("div",{staticStyle:{width:"100%",height:"40px"}},[i("h3",{staticClass:"showBefore"},[t._v("最低消费:")]),t._v(" "),0==parseFloat(t.detials.lowestConsume)?i("div",{staticClass:"shopAfter"},[t._v("不限制")]):i("div",{staticClass:"shopAfter"},[t._v(t._s(t.detials.lowestConsume))])]),t._v(" "),"2"==t.detials.type?i("div",{staticStyle:{width:"100%",height:"40px"}},[i("h3",{staticClass:"showBefore"},[t._v("最大使用上限:")]),t._v(" "),i("div",{staticClass:"shopAfter"},[t._v(t._s(t.detials.useLimit))])]):t._e()]):t._e(),t._v(" "),i("div",{staticStyle:{width:"100%",height:"40px",margin:"10px","line-height":"40px",position:"relative"}},[i("i",{staticStyle:{width:"2px",height:"28px",position:"absolute",top:"6px",left:"0","background-color":"#28A8E0"}}),t._v(" "),i("h3",{staticStyle:{width:"73px",height:"40px","margin-left":"10px",float:"left"}},[t._v("其它设置")]),t._v(" "),i("div",{staticStyle:{width:"430px",margin:"20px 5px",float:"left","border-bottom":"1px dashed #ccc"}})]),t._v(" "),i("div",{staticStyle:{width:"100%",height:"40px","margin-left":"30px"}},[i("h3",{staticClass:"showBefore"},[t._v("备注:")]),t._v(" "),i("div",{staticClass:"shopAfter"},[t._v(t._s(t.detials.annotation))])]),t._v(" "),i("div",{staticStyle:{width:"100%",height:"40px","margin-left":"30px"}},[i("h3",{staticClass:"showBefore"},[t._v("使用须知:")]),t._v(" "),i("div",{staticClass:"shopAfter"},[t._v(t._s(t.detials.useKnow))])])])])],1)},[],!1,null,"000c47ec",null);e.default=n.exports},c0263:function(t,e,i){"use strict";var s=i("ff80");i.n(s).a},ff80:function(t,e,i){}}]);