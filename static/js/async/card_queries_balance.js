(window.webpackJsonp=window.webpackJsonp||[]).push([["card_queries_balance"],{2184:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("win",{attrs:{align:"center",width:540,height:202},on:{winEvent:t.clickResult}},[i("span",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(t.title))]),t._v(" "),i("div",{attrs:{slot:"content"},slot:"content"},[i("div",{staticClass:"mobilePhone",attrs:{id:"phone"}},[i("div",{staticClass:"phoneBox"},[0==t.type?i("div",{staticClass:"leftHalf required"},[t._v("\n\t\t\t\t\t新手机号\n\t\t\t\t")]):i("div",{staticClass:"leftHalf required"},[t._v("\n\t\t\t\t\t手机号\n\t\t\t\t")]),t._v(" "),i("div",{staticClass:"rightHalf"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.orderNumber,expression:"orderNumber"}],staticClass:"txt",attrs:{type:"text",placeholder:"请输入手机号码"},domProps:{value:t.orderNumber},on:{input:function(e){e.target.composing||(t.orderNumber=e.target.value)}}})])]),t._v(" "),0==t.type?i("div",{staticClass:"phoneBox"},[i("div",{staticClass:"handle-tips"},[i("i")]),t._v(" "),i("div",{staticClass:"instructions"},[i("span",[t._v("在此处更换手机号后,原有手机号无法登陆该卡。需要在新手机号登录。微信需要重新登录新手机号方可使用该实体卡。")])])]):t._e()])])])};n._withStripped=!0;var s=i("81a2");var o={data:function(){return{title:0==this.type?"更换手机号":"绑定手机号",orderNumber:""}},props:{detaiList:Object,type:""},methods:{changePhone:function(t){var e,i=this;return(e=regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(i.detaiList),e.next=3,s.a.changeMemberMobile({data:{memberCardId:i.detaiList.id,mobile:i.orderNumber}});case 3:e.sent&&(i.$emit("throwWinResult",t),i.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"修改成功！"}));case 5:case"end":return e.stop()}},e,i)}),function(){var t=e.apply(this,arguments);return new Promise(function(e,i){return function n(s,o){try{var a=t[s](o),r=a.value}catch(t){return void i(t)}if(!a.done)return Promise.resolve(r).then(function(t){n("next",t)},function(t){n("throw",t)});e(r)}("next")})})()},clickResult:function(t){if("ok"==t){if(""==this.orderNumber.trim())return this.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"请填写手机号码"}),!1;if(!/^1\d{10}$/.test(this.orderNumber))return this.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"手机号码格式错误"}),!1;this.changePhone(t)}else this.$emit("throwWinResult",t)}},components:{win:function(){return i.e("win").then(i.bind(null,"f60a"))}}},a=(i("b16d"),i("6ceb")),r=Object(a.a)(o,n,[],!1,null,"38058828",null);r.options.__file="src\\module\\member_system\\card_queries_phone.vue";e.default=r.exports},"22c9":function(t,e,i){},"31bf":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFCQThBNjA5NTcxNTExRTdCNzI4QzVFQTBERTkzQkVEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFCQThBNjBBNTcxNTExRTdCNzI4QzVFQTBERTkzQkVEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUJBOEE2MDc1NzE1MTFFN0I3MjhDNUVBMERFOTNCRUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUJBOEE2MDg1NzE1MTFFN0I3MjhDNUVBMERFOTNCRUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4kIzh0AAABmklEQVR42oyUTSgFURTHvdfzke+yYMNiUKOXyIKUCK9slJKPbGyUslBWVhIrK/UUexsLxEaRzxI2Sh4WJDNJsfGRFFHy/I/+U891Z8apX/d0z73/OXPuuTdgWVaSxppAN8cizt2AHbAAtp2FhmH8jCFFwASzoEYjXkL6QQz0gAsnGExY2ACOXURUqwQn3PNLSDJZBWkem8dAOwXEUsC6bdum82sBMAfSPUT2wTj9ZDBPPxUsQywsGTWDKp9fqQMdzHxYiZWBiGTU5SHwClbAPRgE9S7rhkI8Yp1tgiPWbo9zDyBPs7ZWfq1QE7hlzwyAAs5lsj46yxGhD00gF0yAA7DIuSjIdquBCN1p5jM49nLMB30etXwRoUOX4BR4pD/tc6qnQfaQau9glH4jj34GPLsITYrQBjhTAkuSLv03MEI/SyNiS4vI8cfZSzF2qlgpKGYNw6ATVGhEPkErXoC4c/vlFrcwO7lD1eDKpy4iEoHIuXr7d/nVy3/c/mtQzj1/nhEnM5PZrYEn8MWvS1dvgTZ5zxLfIrFvAQYAHHVSK1WxAuMAAAAASUVORK5CYII="},"690b":function(t,e,i){"use strict";var n=i("22c9");i.n(n).a},"832c":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("win",{attrs:{align:"right",width:850,height:600},on:{winEvent:t.clickResult}},[n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),n("div",{attrs:{slot:"content"},slot:"content"},[n("div",{staticClass:"member-details",attrs:{id:"balances"}},[n("div",{staticClass:"member-box"},[n("p",{staticClass:"fl box-left"},[0==t.type?[t._v("余额变动量")]:[t._v("积分变动量")]],2),t._v(" "),"0"==t.type?n("input",{directives:[{name:"model",rawName:"v-model",value:t.amounts,expression:"amounts"}],staticClass:"fl",staticStyle:{"margin-left":"28px","text-indent":"10px",width:"217px",height:"41px"},attrs:{type:"text",placeholder:"请输入金额",maxlength:"5"},domProps:{value:t.amounts},on:{input:function(e){e.target.composing||(t.amounts=e.target.value)}}}):n("input",{directives:[{name:"model",rawName:"v-model",value:t.points,expression:"points"}],staticClass:"fl",staticStyle:{"margin-left":"28px","text-indent":"10px",width:"217px",height:"41px"},attrs:{type:"text",placeholder:"请输入金额",maxlength:"5"},domProps:{value:t.points},on:{input:function(e){e.target.composing||(t.points=e.target.value)}}}),t._v(" "),n("p",{staticClass:"fl balanceTip"},[n("span",{class:{active:1==t.operationIndex},on:{click:function(e){t.selectiveType("1")}}},[t._v("增加")]),t._v(" "),n("span",{class:{active:0==t.operationIndex},on:{click:function(e){t.selectiveType("0")}}},[t._v("减少")])])]),t._v(" "),n("div",{staticClass:"reason"},[n("p",{staticClass:"fl box-left",staticStyle:{"margin-top":"5px"}},[t._v("原因")]),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.obj.behavior,expression:"obj.behavior"}],staticStyle:{"margin-left":"28px",width:"473px",height:"82px"},attrs:{placeholder:"请输入变动原因",maxlength:"30"},domProps:{value:t.obj.behavior},on:{input:function(e){e.target.composing||t.$set(t.obj,"behavior",e.target.value)}}})]),t._v(" "),n("p",{staticClass:"memberNotice"},[n("img",{staticStyle:{width:"17px",height:"17px","margin-right":"5px"},attrs:{src:i("31bf")}}),t._v("最佳10个字，最多30个字，在余额详情显示")]),t._v(" "),n("div",{staticClass:"member-box"},[n("p",{staticClass:"fl box-left"},[t._v("操作")]),t._v(" "),"0"==t.type?n("p",{staticClass:"fl",staticStyle:{width:"auto","margin-left":"28px","margin-right":"10px","font-size":"16px"}},[t._v(" "+t._s(t.amount)+t._s(t.operationType)+t._s(t.obj.amount)+"="+t._s(t.changeNum()))]):n("p",{staticClass:"fl",staticStyle:{width:"auto","margin-left":"28px","margin-right":"10px","font-size":"16px"}},[t._v(t._s(t.point)+t._s(t.operationType)+t._s(t.obj.point)+"="+t._s(t.changeNum()))]),t._v(" "),n("p",{staticClass:"fl",staticStyle:{height:"43px","line-height":"43px",display:"flex","align-items":"center",color:"#A5A5A5","font-size":"14px"}},[n("img",{staticStyle:{width:"17px",height:"17px","margin-right":"7px"},attrs:{src:i("31bf")}}),t._v("在原有余额上增加或减少")])]),t._v(" "),n("div",{staticClass:"reason"},[n("p",{staticClass:"fl box-left",staticStyle:{"margin-top":"5px"}},[t._v("备注")]),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.obj.remark,expression:"obj.remark"}],staticStyle:{"margin-left":"28px",width:"473px",height:"82px"},attrs:{placeholder:"操作余额备注",maxlength:"50"},domProps:{value:t.obj.remark},on:{input:function(e){e.target.composing||t.$set(t.obj,"remark",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"reason"},[n("p",{staticClass:"fl box-left",staticStyle:{height:"40px","line-height":"40px"}},[t._v("短信提醒")]),t._v(" "),n("span",{class:0==t.obj.msgStatus?"off check-span":"on check-span",staticStyle:{"margin-left":"28px"},on:{click:t.openSms}}),t._v(" "),n("a",{staticClass:"fl",staticStyle:{display:"block",color:"#F7931E",height:"40px","line-height":"40px","text-decoration":"underline","margin-left":"32px",cursor:"pointer"},on:{click:t.usingSmsTemplates}},[t._v("使用短信模板")]),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.obj.msg,expression:"obj.msg"}],staticStyle:{"margin-left":"148px","margin-top":"13px",width:"473px",height:"112px"},attrs:{placeholder:"短信提醒编辑",maxlength:"50"},domProps:{value:t.obj.msg},on:{input:function(e){e.target.composing||t.$set(t.obj,"msg",e.target.value)}}})])])])])};n._withStripped=!0;var s=i("81a2");var o=/[^\d]/g,a={data:function(){return{title:0==this.type?"余额操作":"积分操作",onoff:!1,obj:{point:0,amount:0,msg:"",type:"",behavior:"",remark:"",msgStatus:!1},msgTemplate:"",amount:this.detaiList.cardAmount,point:this.detaiList.cardPoint,operationType:"+",operationIndex:1}},props:{type:"",userData:Object,detaiList:Object},methods:{compelUpdatePointAndBalance:function(t){var e,i=this;return(e=regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return 0==i.type?"1"==i.operationIndex?i.obj.type=12:i.obj.type=13:"1"==i.operationIndex?i.obj.type=10:i.obj.type=11,e.next=3,s.a.changeAmountAndPoint({data:{point:i.obj.point,amount:i.obj.amount,memberCardIds:i.detaiList.id,sendMessage:i.obj.msg,type:1==i.operationIndex?1:2,behavior:i.obj.behavior,remark:i.obj.remark}});case 3:e.sent&&(i.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"更改成功！"}),i.$emit("throwWinResult",t));case 5:case"end":return e.stop()}},e,i)}),function(){var t=e.apply(this,arguments);return new Promise(function(e,i){return function n(s,o){try{var a=t[s](o),r=a.value}catch(t){return void i(t)}if(!a.done)return Promise.resolve(r).then(function(t){n("next",t)},function(t){n("throw",t)});e(r)}("next")})})()},selectiveType:function(t){this.operationIndex=t,this.operationType=1==t?"+":"-",this.changeNum()},changeNum:function(){return"0"==this.type?"1"==this.operationIndex?(Number(this.amount)+Number(this.obj.amount)).toFixed(2):(Number(this.amount)-Number(this.obj.amount)).toFixed(2):"1"==this.operationIndex?(Number(this.point)+Number(this.obj.point)).toFixed(2):(Number(this.point)-Number(this.obj.point)).toFixed(2)},usingSmsTemplates:function(){"1"==this.type?this.msgTemplate=String("尊敬的"+this.detaiList.name+"用户您好，由于"+this.obj.behavior+"原因，您的积分由"+this.detaiList.cardPoint+"变动至"+this.changeNum()+"敬请谅解。如有问题请致电："+this.userData.currentShop.telephone):this.msgTemplate=String("尊敬的"+this.detaiList.name+"用户您好，由于"+this.obj.behavior+"原因，您的余额由"+this.detaiList.cardAmount+"变动至"+this.changeNum()+"敬请谅解。如有问题请致电："+this.userData.currentShop.telephone),this.obj.msg=this.msgTemplate},openSms:function(){if(""==this.detaiList.mobile)return this.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"暂未绑定手机号,无法使用短信提醒"}),!1;this.obj.msgStatus=!this.obj.msgStatus},clickResult:function(t){if("ok"==t){if(0==this.type){if(""==(this.obj.amount+"").trim()||"0"==this.obj.amount)return this.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"请填写余额值"}),!1;if("0"==this.operationIndex&&Number(this.obj.amount)>Number(this.amount))return this.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"操作余额不能大于总余额"}),!1}else{if(""==(this.obj.point+"").trim()||"0"==this.obj.point)return this.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"请填写积分值"}),!1;if("0"==this.operationIndex&&Number(this.obj.point)>Number(this.point))return this.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"操作积分不能大于总积分"}),!1}if(this.obj.behavior+""!=""&&!/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(this.obj.behavior.trim()))return this.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"原因只能输入字母、数字和汉字"}),!1;this.compelUpdatePointAndBalance(t)}else this.$emit("throwWinResult",t)}},computed:{points:{get:function(){return this.obj.point},set:function(t){this.obj.point=t.replace(o,"")}},amounts:{get:function(){return this.obj.amount},set:function(t){this.obj.amount=t.replace(o,"")}}},components:{win:function(){return i.e("win").then(i.bind(null,"f60a"))}}},r=(i("690b"),i("6ceb")),l=Object(r.a)(a,n,[],!1,null,"a705dbd4",null);l.options.__file="src\\module\\member_system\\card_queries_balance.vue";e.default=l.exports},b16d:function(t,e,i){"use strict";var n=i("badc");i.n(n).a},badc:function(t,e,i){}}]);