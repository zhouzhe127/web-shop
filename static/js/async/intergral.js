(window.webpackJsonp=window.webpackJsonp||[]).push([["intergral"],{3813:function(t,e,n){"use strict";var i=n("8105");n.n(i).a},"74c67":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticStyle:{"text-align":"left",width:"100%"},attrs:{id:"jifen"}},[n("div",{staticClass:"integra-content"},[n("div",{staticClass:"heade-title"},[t._v("\n\t\t\t会员获得积分设置\n\t\t")]),t._v(" "),n("div",{staticClass:"topR"},[n("section",{staticClass:"fl",staticStyle:{clear:"both"}},[n("label",{staticClass:"commodity-name fl"},[t._v("参与积分")]),t._v(" "),n("on-off",{attrs:{status:t.on},on:{statusChange:function(e){return t.on=e}}})],1)]),t._v(" "),n("div",{staticClass:"picName"},[n("span",{staticClass:"required",staticStyle:{display:"block",float:"left",width:"100px","line-height":"40px"}},[t._v("积分比例 ")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.cash,expression:"cash"}],attrs:{type:"text",maxlength:"4",disabled:t.disabled,placeholder:"请输入现金"},domProps:{value:t.cash},on:{input:function(e){e.target.composing||(t.cash=e.target.value)}}}),t._v(" "),n("i",[t._v("  ：")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.integral,expression:"integral"}],attrs:{type:"text",maxlength:"4",disabled:t.disabled,placeholder:"请输入积分"},domProps:{value:t.integral},on:{input:function(e){e.target.composing||(t.integral=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"topR"},[n("section",{staticClass:"fl",staticStyle:{clear:"both",position:"relative"}},[n("label",{staticClass:"commodity-name fl"},[t._v("积分永久有效")]),t._v(" "),t.on?t._e():n("div",{staticClass:"mesking"}),t._v(" "),n("on-off",{attrs:{status:t.expiration},on:{statusChange:function(e){return t.expiration=e}}})],1)]),t._v(" "),n("div",{staticClass:"expiration-time"},[n("div",{staticClass:"required time-exp"},[t._v("积分清零时间")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.month,expression:"month"}],attrs:{type:"text",maxlength:"2",disabled:t.disabledExp,placeholder:"请输入月"},domProps:{value:t.month},on:{input:function(e){e.target.composing||(t.month=e.target.value)}}}),t._v("  月 \n\t\t\t"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.day,expression:"day"}],attrs:{type:"text",maxlength:"2",disabled:t.disabledExp,placeholder:"请输入日"},domProps:{value:t.day},on:{input:function(e){e.target.composing||(t.day=e.target.value)}}}),t._v("  日  \n\t\t")])]),t._v(" "),t.isBrand?n("a",{staticClass:"yellow",staticStyle:{margin:"20px 0 0 100px",width:"250px"},attrs:{href:"javascript:void(0);"},on:{click:t.keepOn}},[t._v("保存")]):t._e()])};i._withStripped=!0;var a=n("81a2"),r=n("f6ce"),s=n("bbb9"),o=n("05dd");function l(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(a,r){try{var s=e[a](r),o=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(o).then(function(t){i("next",t)},function(t){i("throw",t)});t(o)}("next")})}}var c={data:function(){return{isBrand:!(parseInt(r.a.session("userShop").currentShop.brandId)>0),on:!1,oned:!1,cash:"",integral:"",disabled:!0,disabledExp:!0,month:"",day:"",expiration:!1,spreader:"",follower:""}},computed:{spreaders:{get:function(){return this.spreader},set:function(t){this.spreader=t.replace(/[^\d]/g,"")}},followers:{get:function(){return this.follower},set:function(t){this.follower=t.replace(/[^\d]/g,"")}}},watch:{on:"ons",expiration:"expirations"},methods:{keepOn:function(){var t=this;0==this.on&&1==this.oned?this.$store.commit("setWin",{winType:"confirm",content:"关闭积分功能，所有会员消费将不再获得积分！",title:"操作提示",callback:function(e){"ok"==e&&t.setPointConfig()}}):0==this.expiration?this.checkData(this.month,this.day)&&this.setPointConfig():this.setPointConfig()},ons:function(){0==this.on?(this.disabled=!0,this.disabledExp=!0,this.month="",this.day="",this.integral="",this.cash="",1==this.expiration&&(this.expiration=!1)):(this.disabled=!1,this.disabledExp=!1)},expirations:function(){if(0==this.on)return this.expiration,!1;1==this.on&&1==this.expiration?(this.disabledExp=!0,this.month="",this.day=""):this.disabledExp=!1},checkData:function(t,e){if(isNaN(e)||isNaN(t))return this.$store.commit("setWin",{content:"请输入正确格式的月份和日期",winType:"alert",title:"提示信息"}),!1;if(e-=0,(t-=0)<0||t>12)return this.$store.commit("setWin",{content:"请输入正确的月份(0-12的正整数)",winType:"alert",title:"提示信息"}),!1;if(0==e&&this.expiration)return this.$store.commit("setWin",{content:"请输入正确的日(不能为“0”)",winType:"alert",title:"提示信息"}),!1;var n=this.getDay(t);return!!o.a.checkData({m:{reg:/^\d*$/,pro:"请输入月份只能是正整数",value:t},d:{reg:/^\d*$/,pro:"请输入日只能是正整数",value:e}},this)&&(!(e>n||e<0)||(this.$store.commit("setWin",{content:"日输入错误(不能超过当月的总天数)",winType:"alert",title:"提示信息"}),!1))},getDay:function(t){return 2==t?28:this.checkArr(t,[1,3,5,7,8,10,12])?31:30},checkArr:function(t,e){for(var n={},i=0;i<e.length;i++)n[e[i]]||(n[e[i]]=1);return!!n[t]},getPointConfig:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var n,i,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.getPointConfig({data:{}});case 2:0!=(n=e.sent).list.status&&(t.on=!0,t.cash=n.list.cash,t.integral=n.list.point,0==(i=n.list.expirationTime)?(t.expiration=!0,t.month="",t.day=""):(i*=1e3,r=new Date(i),t.month=r.getMonth()+1,t.day=r.getDate()-1),t.on&&(t.oned=t.on)),t.spreader=n.list.spreaderPoint,t.follower=n.list.followerPoint;case 6:case"end":return e.stop()}},e,t)}))()},setPointConfig:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var n,i,r,l,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n="",!t.on){e.next=22;break}if(o.a.checkData({cash:{cond:"$$ != '' && $$ != 0",pro:"现金不能为空且不能为0"},integral:{cond:"$$ != ''",pro:"积分不能为空且不能为0"}},t)){e.next=4;break}return e.abrupt("return",!1);case 4:if(/^\d+(\.\d+)?$/.test(t.cash)){e.next=7;break}return t.prompt("请正确输入正确的现金数"),e.abrupt("return",!1);case 7:if(/^\d+(\.\d+)?$/.test(t.integral)){e.next=10;break}return t.prompt("请正确输入正确的积分数"),e.abrupt("return",!1);case 10:if(0!=t.expiration){e.next=13;break}if(o.a.checkData({cash:{month:"$$ != '' && $$ != 0",pro:"请输入月份且不能为0"},day:{cond:"$$ != '' && $$ != 0",pro:"请输入正确的日"}}.this)){e.next=13;break}return e.abrupt("return",!1);case 13:(i=new Date).setMonth(t.month-1),i.setDate(t.day-0+1),n=s.a.getTime({time:new Date(i),type:!0}).start,n=parseInt(n/1e3),t.cash=s.a.toFloatStr(t.cash+"",2),t.integral=s.a.toFloatStr(t.integral+"",2),e.next=24;break;case 22:t.cash=0,t.integral=0;case 24:if(r=void 0,r=0==t.on?0:1,l=0,l=t.expiration?0:n,!(t.spreader&&t.spreader<0)){e.next=31;break}return t.prompt("推广者获得积分不能小于0"),e.abrupt("return",!1);case 31:if(!(t.follower&&t.follower<0)){e.next=34;break}return t.prompt("关注者获得积分不能为小于0"),e.abrupt("return",!1);case 34:return e.next=36,a.a.setPointConfig({data:{status:r,cash:t.cash,point:t.integral,expirationTime:l,spreaderPoint:t.spreader,followerPoint:t.follower}});case 36:0!=(c=e.sent).list.status&&(t.on=!0,t.cash=c.list.cash),t.integral=c.list.point,t.spreader=c.list.spreaderPoint,t.follower=c.list.followerPoint,t.prompt("保存成功","提示信息");case 42:case"end":return e.stop()}},e,t)}))()},prompt:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"提示信息",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"alert";this.$store.commit("setWin",{winType:n,content:t,title:e})}},mounted:function(){this.getPointConfig()},components:{"on-off":function(){return n.e("on_off").then(n.bind(null,"034b"))}}},p=(n("3813"),n("6ceb")),d=Object(p.a)(c,i,[],!1,null,"b24c8140",null);d.options.__file="src\\module\\member_system\\intergral.vue";e.default=d.exports},8105:function(t,e,n){}}]);