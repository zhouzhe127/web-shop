(window.webpackJsonp=window.webpackJsonp||[]).push([["activity_fullReduction"],{1720:function(t,e,s){"use strict";var i=s("4d7b");s.n(i).a},"4d7b":function(t,e,s){},c201:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"reduction"}},[t._m(0),t._v(" "),t._m(1),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl required"},[t._v("活动标题")]),t._v(" "),s("div",{staticClass:"rightHalf"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.activityName,expression:"activityName"}],staticClass:"name",attrs:{type:"text",placeholder:"请输入活动标题"},domProps:{value:t.activityName},on:{input:function(e){e.target.composing||(t.activityName=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl required"},[t._v("活动时间")]),t._v(" "),s("div",{staticClass:"rightHalf"},[s("div",{staticClass:"input-box"},[s("calendar",{attrs:{time:t.startTime,format:"yyyy年MM月dd日"},on:{emit:t.startTimeChange}})],1),t._v(" "),s("s",[t._v("-")]),t._v(" "),s("div",{staticClass:"input-box"},[s("calendar",{attrs:{time:t.endTime,format:"yyyy年MM月dd日"},on:{emit:t.endTimeChange}})],1)])]),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl required"},[t._v("活动门店")]),t._v(" "),"3"==t.ischain?s("div",{staticClass:"rightHalf"},[s("a",{staticClass:"addclassify fl",attrs:{href:"javascript:void(0);"},on:{click:t.openActivityWin}},[t._v("关联门店")]),t._v(" "),t.selectsList.length>=1?s("span",{staticClass:"fl"},[t._v("已选择"+t._s(t.selectsList.length)+"家店铺")]):t._e()]):s("div",{staticClass:"rightHalf"},[s("span",[t._v(t._s(t.shopName))])])]),t._v(" "),t._m(2),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl"},[t._v("是否与会员折扣同享")]),t._v(" "),s("div",{staticClass:"rightHalf"},[t._l(t.list,function(e,i){return s("span",{key:i,staticClass:"freeFix",class:{presentActive:t.isMemberShare==i},staticStyle:{"margin-right":"14px"},on:{click:function(e){t.chooseIntegral("1",i)}}},[t._v(t._s(e.name))])}),t._v(" "),s("div",{staticClass:"prompting",on:{click:function(e){t.isPublicNumber("1")}}},[t.isPublic[1]?s("div",{staticClass:"detDiv"},[s("i",{staticClass:"detI triright"}),t._v(" "),s("h3",{staticClass:"detH3"},[t._v("\n\t\t\t\t\t\t是:与会员折扣同享,当该门店有此活动时,先计算会员价,累加达到满减值再进行满减!\n\t\t\t\t\t\t"),s("P",[t._v("否:不与会员折扣同享,当该门店有此活动时,只需要计算满减即可.")])],1)]):t._e()])],2)]),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl"},[t._v("是否与单品优惠券同享")]),t._v(" "),s("div",{staticClass:"rightHalf"},[t._l(t.list,function(e,i){return s("span",{key:i,staticClass:"freeFix",class:{presentActive:t.isItemShare==i},staticStyle:{"margin-right":"14px"},on:{click:function(e){t.chooseIntegral("2",i)}}},[t._v(t._s(e.name))])}),t._v(" "),s("div",{staticClass:"prompting",on:{click:function(e){t.isPublicNumber("2")}}},[t.isPublic[2]?s("div",{staticClass:"detDiv"},[s("i",{staticClass:"detI triright"}),t._v(" "),s("h3",{staticClass:"detH3"},[t._v("\n\t\t\t\t\t\t是：允许使用单品优惠券，先计算单品金额。所有单品金额累加满足减免金额时，再进行减免。注意：使用单品优惠券时可能导致订单金额不满足满减优惠，若用户需要满减优惠需再次凑单至满减金额即可。\n\t\t\t\t\t\t"),s("P",[t._v("否：不予使用单品优惠券，包含：赠品券，单品减免券，单品折扣券。")])],1)]):t._e()])],2)]),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl"},[t._v("是否与整单优惠券同享")]),t._v(" "),s("div",{staticClass:"rightHalf"},[t._l(t.list,function(e,i){return s("span",{key:i,staticClass:"freeFix",class:{presentActive:t.isWholeShare==i},staticStyle:{"margin-right":"14px"},on:{click:function(e){t.chooseIntegral("3",i)}}},[t._v(t._s(e.name))])}),t._v(" "),s("div",{staticClass:"prompting",on:{click:function(e){t.isPublicNumber("3")}}},[t.isPublic[3]?s("div",{staticClass:"detDiv"},[s("i",{staticClass:"detI triright"}),t._v(" "),t._m(3)]):t._e()])],2)]),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl"},[t._v("默认规则")]),t._v(" "),s("div",{staticClass:"rightHalf"},[s("onOff",{key:1,staticClass:"fl",attrs:{status:t.payDiscount},on:{statusChange:t.openpayDiscount}}),t._v(" "),t._m(4)],1)]),t._v(" "),t.payDiscount?s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl"}),t._v(" "),s("div",{staticClass:"rightHalf"},[s("span",{staticClass:"fl"},[t._v("不满")]),t._v(" "),s("section",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.cash,expression:"cash"}],staticClass:"cumulative",attrs:{type:"text",placeholder:"请输入金额",maxlength:"6",onkeyup:"value=value.replace(/[^\\d\\.]/g,'')"},domProps:{value:t.cash},on:{input:function(e){e.target.composing||(t.cash=e.target.value)}}}),t._v(" "),s("span",[t._v("元")])]),t._v(" "),s("span",{staticClass:"fl"},[t._v(",只付")]),t._v(" "),s("section",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.payCash,expression:"payCash"}],staticClass:"cumulative",attrs:{type:"text",placeholder:"请输入金额",maxlength:"6",onkeyup:"value=value.replace(/[^\\d\\.]/g,'')"},domProps:{value:t.payCash},on:{input:function(e){e.target.composing||(t.payCash=e.target.value)}}}),t._v(" "),s("span",[t._v("元")])])])]):t._e(),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl"},[t._v("优惠设置")]),t._v(" "),s("div",{staticClass:"rightHalf"},[s("onOff",{key:1,staticClass:"fl",attrs:{status:t.preferential},on:{statusChange:t.openpreferential}}),t._v(" "),t._m(5)],1)]),t._v(" "),t.preferential?s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl"}),t._v(" "),s("div",{staticClass:"rightHalf"},[s("com-table",{attrs:{listHeight:60,listWidth:1100,showHand:!1,titleData:t.titleList,introData:t.formList,widthType:!0},scopedSlots:t._u([{key:"con-0",fn:function(e){return s("div",{staticClass:"delete"},[s("span",{on:{click:function(s){t.delplan(e.data)}}},[t._v("删除")])])}},{key:"con-1",fn:function(e){return s("div",{},[t._v("\n\t\t\t\t\t"+t._s(e.data.index)+"\n\t\t\t\t")])}},{key:"con-2",fn:function(e){return s("div",{staticClass:"orderCash"},[s("section",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.data.fullCash,expression:"props.data.fullCash"}],staticClass:"cumulative",attrs:{type:"text",placeholder:"请输入金额",maxlength:"6",onkeyup:"value=value.replace(/[^\\d\\.]/g,'')"},domProps:{value:e.data.fullCash},on:{blur:function(s){t.formatValue(e.data.index,"fullCash")},input:function(s){s.target.composing||t.$set(e.data,"fullCash",s.target.value)}}}),t._v(" "),s("span",[t._v("元")])]),t._v(" "),e.data.fullStatus?s("div",{staticClass:"warning-tips"},[s("i"),t._v(t._s(e.data.fullerrorMessage)+"\n\t\t\t\t\t")]):t._e()])}},{key:"con-3",fn:function(e){return s("div",{staticClass:"orderCash"},[s("section",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.data.reduceCsah,expression:"props.data.reduceCsah"}],staticClass:"cumulative",attrs:{type:"text",placeholder:"请输入金额",maxlength:"6",onkeyup:"value=value.replace(/[^\\d\\.]/g,'')"},domProps:{value:e.data.reduceCsah},on:{blur:function(s){t.formatValue(e.data.index,"reduceCsah")},input:function(s){s.target.composing||t.$set(e.data,"reduceCsah",s.target.value)}}}),t._v(" "),s("span",[t._v("元")])]),t._v(" "),e.data.reduceStatus?s("div",{staticClass:"warning-tips"},[s("i"),t._v(t._s(e.data.reduceerrorMessage)+"\n\t\t\t\t\t")]):t._e()])}}])}),t._v(" "),t.formList.length<5?s("a",{staticClass:"addclassify fl",attrs:{href:"javascript:void(0);"},on:{click:t.addplan}},[t._v("增加优惠方案")]):t._e()],1)]):t._e(),t._v(" "),s("div",{staticClass:"online-box clearfix",staticStyle:{"padding-left":"100px"}},[s("a",{staticClass:"gray fl",staticStyle:{width:"200px","margin-right":"10px","background-color":"#a7a7a7"},attrs:{href:"javascript:void(0);"},on:{click:t.closePage}},[t._v("取消")]),t._v(" "),s("a",{staticClass:"gray fl",staticStyle:{width:"200px","margin-right":"10px"},attrs:{href:"javascript:void(0);"},on:{click:function(e){t.saveConfig("0")}}},[t._v("保存")]),t._v(" "),""==t.editId?s("a",{staticClass:"yellow fl",staticStyle:{width:"200px"},attrs:{href:"javascript:void(0);"},on:{click:function(e){t.saveConfig("1")}}},[t._v("发布")]):t._e()]),t._v(" "),t.showRang?s("rang",{attrs:{activityList:t.shopList,selectsList:t.selectsList},on:{winEvent:t.rangEvent}}):t._e()],1)};i._withStripped=!0;var a=s("81a2"),n=s("bbb9"),r=s("f6ce");function l(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,s){return function i(a,n){try{var r=e[a](n),l=r.value}catch(t){return void s(t)}if(!r.done)return Promise.resolve(l).then(function(t){i("next",t)},function(t){i("throw",t)});t(l)}("next")})}}var o={data:function(){return{ischain:r.a.session("userShop").currentShop.ischain,shopId:r.a.session("userShop").currentShop.id,shopName:r.a.session("userShop").currentShop.name,activityName:"",startTime:(new Date).setHours(0,0,0,0),endTime:(new Date).setHours(23,59,59,999),showRang:!1,activityList:[],shopList:[],selectsList:[],list:[{name:"否",id:0},{name:"是",id:1}],isMemberShare:0,isItemShare:0,isWholeShare:0,payDiscount:!1,cash:"",payCash:"",preferential:!1,titleList:[{titleName:"操作",titleStyle:{width:"150px",flex:"none"}},{titleName:"序列",titleStyle:{width:"150px",flex:"none"}},{titleName:"订单金额(元)"},{titleName:"减免金额(元)"}],formList:[],editId:"",isPublic:{1:!1,2:!1,3:!1}}},methods:{startTimeChange:function(t){this.startTime=t},endTimeChange:function(t){this.endTime=new Date(t).setHours(23,59,59,999)},openActivityWin:function(){this.showRang=!0},isPublicNumber:function(t){for(var e in this.isPublic)e!=t&&(this.isPublic[e]=!1);this.isPublic[t]=!this.isPublic[t]},rangEvent:function(t){"ok"==t.status&&(this.selectsList=t.select),this.showRang=!1},chooseIntegral:function(t,e){switch(t){case"1":this.isMemberShare=e;break;case"2":this.isItemShare=e;break;case"3":this.isWholeShare=e}},openpayDiscount:function(t){this.payDiscount=t},openpreferential:function(t){this.preferential=t},closePage:function(){this.$router.push("/admin/activity")},addplan:function(){if(!this.validationForm())return this.valiData("订单金额或满减金额未填写或填写有误!"),!1;var t=!0,e=!1,s=void 0;try{for(var i,a=this.formList[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){var n=i.value;if(""==n.fullCash||""==n.reduceCsah)return this.valiData("请完善优惠方案信息!"),!1}}catch(t){e=!0,s=t}finally{try{!t&&a.return&&a.return()}finally{if(e)throw s}}this.formList.push({index:"",fullCash:"",reduceCsah:"",fullStatus:!1,reduceStatus:!1,fullerrorMessage:"",reduceerrorMessage:""});for(var r=0;r<this.formList.length;r++)this.formList[r].index=r+1},delplan:function(t){this.formList.splice(t.index-1,1);for(var e=0;e<this.formList.length;e++)this.formList[e].index=e+1,this.isRepeat(this.formList)||0==this.formList[e].fullCash||(this.formList[e].fullStatus=!1)},formatValue:function(t,e){if(this.formList[t-1][e]=n.a.toFloatStr(this.formList[t-1][e],2),"fullCash"==e&&(this.formList[t-1].fullStatus=!1,0==this.formList[t-1].fullCash&&(this.formList[t-1].fullStatus=!0,this.formList[t-1].fullerrorMessage="订单金额不能为0!"),this.isRepeat(this.formList)&&(this.formList[t-1].fullStatus=!0,this.formList[t-1].fullerrorMessage="订单金额不能重复!"),!this.isRepeat(this.formList))){var s=!0,i=!1,a=void 0;try{for(var r,l=this.formList[Symbol.iterator]();!(s=(r=l.next()).done);s=!0){r.value.fullStatus=!1}}catch(t){i=!0,a=t}finally{try{!s&&l.return&&l.return()}finally{if(i)throw a}}}"reduceCsah"==e&&(this.formList[t-1].reduceStatus=!1,0==this.formList[t-1].reduceCsah&&(this.formList[t-1].reduceStatus=!0,this.formList[t-1].reduceerrorMessage="减免金额不能为0!"))},isRepeat:function(t){var e={};for(var s in t){if(e[t[s].fullCash])return!0;e[t[s].fullCash]=!0}return!1},validationForm:function(){var t=!0,e=!1,s=void 0;try{for(var i,a=this.formList[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){var n=i.value;if(n.fullStatus||n.reduceStatus)return!1;if(""==n.fullCash||""==n.reduceCsah)return!1}}catch(t){e=!0,s=t}finally{try{!t&&a.return&&a.return()}finally{if(e)throw s}}return!0},valiData:function(t,e,s){this.$store.commit("setWin",{content:t,title:e,winType:s})},checkForm:function(){return""==this.activityName?(this.valiData("活动标题不能为空!"),!1):"3"==this.ischain&&0==this.selectsList.length?(this.valiData("请选择活动门店!"),!1):this.payDiscount||this.preferential?!this.payDiscount||""!=this.cash&&""!=this.payCash?this.preferential&&this.formList.length<=0?(this.valiData("请添加优惠规则方案!"),!1):!!this.validationForm()||(this.valiData("订单金额或满减金额信息有误,请更改!"),!1):(this.valiData("请完善默认规则信息!"),!1):(this.valiData("请至少开启一个规则!"),!1)},saveConfig:function(t){this.checkForm()&&(""==this.editId?this.addConfig(t):this.ediConfig(t))},addConfig:function(t){var e=this;return l(regeneratorRuntime.mark(function s(){var i,n,r,l,o,c,u,h,v,d,f;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:for(i=[],n={couponIds:{isMemberShare:e.isMemberShare,isItemShare:e.isItemShare,isWholeShare:e.isWholeShare,otherRule:{status:Number(e.payDiscount),orderPrice:e.cash,pay:e.payCash},status:Number(e.preferential),discountRule:[]}},r=[],l=!0,o=!1,c=void 0,s.prev=6,u=e.formList[Symbol.iterator]();!(l=(h=u.next()).done);l=!0)v=h.value,d={orderPrice:v.fullCash,reduction:v.reduceCsah},r.push(d);s.next=14;break;case 10:s.prev=10,s.t0=s.catch(6),o=!0,c=s.t0;case 14:s.prev=14,s.prev=15,!l&&u.return&&u.return();case 17:if(s.prev=17,!o){s.next=20;break}throw c;case 20:return s.finish(17);case 21:return s.finish(14);case 22:return n.couponIds.discountRule=r,i.push(n),s.next=26,a.a.fissionActivity({data:{type:6,shopIds:"3"==e.ischain?e.selectsList.join(","):e.shopId,mouldType:0,name:e.activityName,objectType:2,startTime:parseInt(e.startTime/1e3),endTime:parseInt(e.endTime/1e3),isAuto:t,rule:JSON.stringify(i)}});case 26:f=0==t?"保存成功":"发布成功",e.valiData(f),e.closePage();case 29:case"end":return s.stop()}},s,e,[[6,10,14,22],[15,,17,21]])}))()},ediConfig:function(t){var e=this;return l(regeneratorRuntime.mark(function s(){var i,n,r,l,o,c,u,h,v,d,f,p;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:for((i={}).type=6,i.shopIds="3"==e.ischain?e.selectsList.join(","):e.shopId,i.mouldType=0,i.name=e.activityName,i.objectType=2,i.startTime=parseInt(e.startTime/1e3),i.endTime=parseInt(e.endTime/1e3),i.isAuto=t,i.rule=[],n=[],r={id:e.ruleId,couponIds:{isMemberShare:e.isMemberShare,isItemShare:e.isItemShare,isWholeShare:e.isWholeShare,otherRule:{status:Number(e.payDiscount),orderPrice:e.cash,pay:e.payCash},status:Number(e.preferential),discountRule:[]}},l=[],o=!0,c=!1,u=void 0,s.prev=16,h=e.formList[Symbol.iterator]();!(o=(v=h.next()).done);o=!0)d=v.value,f={orderPrice:d.fullCash,reduction:d.reduceCsah},l.push(f);s.next=24;break;case 20:s.prev=20,s.t0=s.catch(16),c=!0,u=s.t0;case 24:s.prev=24,s.prev=25,!o&&h.return&&h.return();case 27:if(s.prev=27,!c){s.next=30;break}throw u;case 30:return s.finish(27);case 31:return s.finish(24);case 32:return r.couponIds.discountRule=l,n.push(r),i.rule=n,s.next=37,a.a.fissionActivity({data:{activityId:e.editId,data:JSON.stringify(i)}});case 37:p=0==t?"保存成功":"发布成功",e.valiData(p),e.closePage();case 40:case"end":return s.stop()}},s,e,[[16,20,24,32],[25,,27,31]])}))()},getActivityDetail:function(t){var e=this;return l(regeneratorRuntime.mark(function s(){var i,n,r,l;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,a.a.getActivityDetails({data:{activityId:t.id}});case 2:if(i=s.sent)for(e.activityName=i.name,e.startTime=1e3*i.startTime,e.endTime=1e3*i.endTime,e.ruleId=i.rule[0].id,e.selectsList=i.shopIds.split(","),e.isMemberShare=i.rule[0].couponIds.isItemShare,e.isMemberShare=i.rule[0].couponIds.isMemberShare,e.isWholeShare=i.rule[0].couponIds.isWholeShare,e.payDiscount=Boolean(Number(i.rule[0].couponIds.otherRule.status)),e.cash=i.rule[0].couponIds.otherRule.orderPrice,e.payCash=i.rule[0].couponIds.otherRule.pay,e.preferential=Boolean(Number(i.rule[0].couponIds.status)),n=i.rule[0].couponIds.discountRule,r=0;r<n.length;r++)l={index:r+1,fullCash:n[r].orderPrice,reduceCsah:n[r].reduction,fullStatus:!1,reduceStatus:!1,fullerrorMessage:"",reduceerrorMessage:""},e.formList.push(l);case 4:case"end":return s.stop()}},s,e)}))()}},components:{calendar:function(){return s.e("calendar_type").then(s.bind(null,"f2dd"))},rang:function(){return s.e("activity_agift_rang").then(s.bind(null,"5267"))},singleSelect:function(){return s.e("mul_select").then(s.bind(null,"7231"))},onOff:function(){return s.e("on_off").then(s.bind(null,"034b"))},comTable:function(){return s.e("table").then(s.bind(null,"4360"))}},mounted:function(){var t=this;this.shopList=r.a.session("shopList"),this.$store.commit("setPageTools",[{name:"<返回活动列表",className:["activity"],fn:function(){t.closePage()}}]);var e=r.a.session("activityInfo");e&&(this.editId=e.id,this.getActivityDetail(e))},beforeDestroy:function(){r.a.session("activityInfo",null)}},c=(s("1720"),s("7610")),u=Object(c.a)(o,i,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"set-line"},[e("div",{staticClass:"titles"},[this._v("活动设置")]),this._v(" "),e("div",{staticClass:"line"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"handle-tips",staticStyle:{margin:"0 0 20px 20px"}},[e("i"),this._v(" 说明:您可以设置顾客订单满指定金额后，可享受相应优惠。如【订单满50元减20；满100元减40】。满减活动当前仅支持自助模式。\n\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"set-line"},[e("div",{staticClass:"titles"},[this._v("营销规则设置")]),this._v(" "),e("div",{staticClass:"line"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{staticClass:"detH3"},[this._v("\n\t\t\t\t\t\t是：允许使用整单优惠券，先计算满减优惠。后计算整单优惠券，用户实付金额满足优惠券使用门槛时，可允许用户继续使用整单券。\n\t\t\t\t\t\t"),e("p",[this._v("否：不予使用整单优惠券，包含：整单减免，整单折扣，代金券。")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips",staticStyle:{"margin-left":"20px"}},[e("i"),this._v(" 说明:当订单金额低于支付金额时,用户只需支付订单金额\n\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips",staticStyle:{"margin-left":"20px"}},[e("i"),this._v(" 说明:最多设置5条优惠规则\n\t\t\t")])}],!1,null,"621b86e8",null);u.options.__file="src\\module\\marketing_tools\\activity_fullReduction.vue";e.default=u.exports}}]);