(window.webpackJsonp=window.webpackJsonp||[]).push([["activity_custom"],{"19ba":function(t,e,i){"use strict";var s=i("d7ab");i.n(s).a},"3f61":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.showVip?s("memberScreening",{on:{selectVip:t.selectVipEvent}}):s("section",{staticClass:"custom"},[t._m(0),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl required"},[t._v("活动名称")]),t._v(" "),s("div",{staticClass:"rightHalf"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.customName,expression:"customName"}],staticClass:"name",attrs:{type:"text",placeholder:"请输入活动标题",maxlength:"10"},domProps:{value:t.customName},on:{input:function(e){e.target.composing||(t.customName=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl required"},[t._v("活动对象")]),t._v(" "),s("div",{staticClass:"rightHalf"},[s("singleSelect",{key:"id",staticClass:"fl",attrs:{index:t.indexCustom,styles:{width:"108px",border:"1px solid #cecdcd",marginRight:"8px"},list:t.customList,name:"name"},on:{selOn:t.haveIndex}}),t._v(" "),1==t.indexCustom?s("span",{staticClass:"fl associated"},[t._v("(已关联"+t._s(t.member)+"人)")]):t._e()],1)]),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl required"},[t._v("关联优惠券")]),t._v(" "),s("div",{staticClass:"rightHalf"},[s("section",{staticClass:"clearfix"},[s("a",{staticClass:"addclassify",staticStyle:{width:"200px"},attrs:{href:"javascript:void(0);"},on:{click:t.addCustom}},[t._v("选择关联优惠券")]),t._v(" "),t.selectCoupon.length>0?s("span",[t._v("(已关联"+t._s(t.selectCoupon.length)+"张)")]):t._e()]),t._v(" "),t._l(t.miCount,function(e,n){return s("div",{directives:[{name:"show",rawName:"v-show",value:t.num,expression:"num"}],key:n,staticClass:"mic",staticStyle:{display:"inline-block"}},[s("section",{staticClass:"mic-del",attrs:{title:e.name}},[s("span",{staticClass:"mic-name"},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"openoperation",staticStyle:{"margin-top":"30px"}},[s("img",{staticStyle:{position:"absolute"},attrs:{src:i("41e1")},on:{click:function(i){t.delCount(e.id,n)}}})])]),t._v(" "),s("div",{ref:"autoGive",refInFor:!0,staticClass:"mic-limit auto-give",staticStyle:{top:"3px"}},[s("span",[t._v("发放数量：")]),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.micsel[n],expression:"micsel[index]"}],staticClass:"mic-num",on:{click:function(i){t.autosell(e.id,n)},change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.micsel,n,e.target.multiple?i:i[0])}}},[s("option",{attrs:{value:"0",selected:"selected"}},[t._v("不设限制")]),t._v(" "),s("option",{attrs:{value:"1"}},[t._v("设定总数")])]),t._v(" "),s("span",{staticClass:"down",staticStyle:{right:"11px"}}),t._v(" "),s("span",{staticClass:"line"}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.micNum,expression:"item.micNum"}],ref:"autoTxt",refInFor:!0,staticClass:"auto-txt",attrs:{type:"text",maxlength:"9"},domProps:{value:e.micNum},on:{input:function(i){i.target.composing||t.$set(e,"micNum",i.target.value)}}}),t._v(" "),s("span",{ref:"autoLook",refInFor:!0,staticClass:"look auto-look"},[t._v("张")])]),t._v(" "),s("div",{ref:"autoDay",refInFor:!0,staticClass:"mic-limit auto-day",staticStyle:{bottom:"3px"}},[s("span",[t._v("每日上限：")]),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.micselimit[n],expression:"micselimit[index]"}],staticClass:"mic-num",on:{click:function(i){t.autosellimit(e.id,n)},change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.micselimit,n,e.target.multiple?i:i[0])}}},[s("option",{attrs:{value:"0",selected:"selected"}},[t._v("不设限制")]),t._v(" "),s("option",{attrs:{value:"1"}},[t._v("设定总数")])]),t._v(" "),s("span",{staticClass:"down",staticStyle:{right:"11px"}}),t._v(" "),s("span",{staticClass:"line"}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.micLimit,expression:"item.micLimit"}],ref:"txtDay",refInFor:!0,staticClass:"auto-txt",attrs:{type:"text",maxlength:"9"},domProps:{value:e.micLimit},on:{input:function(i){i.target.composing||t.$set(e,"micLimit",i.target.value)}}}),t._v(" "),s("span",{ref:"lookDay",refInFor:!0,staticClass:"look auto-look"},[t._v("张")])])])})],2)]),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl"},[t._v("活动时间")]),t._v(" "),s("div",{staticClass:"rightHalf"},[s("div",{staticClass:"fl",staticStyle:{cursor:"pointer"}},[s("calendar",{ref:"startCal",staticClass:"fl",attrs:{pObj:t.startObj},on:{throwTime:t.getStartTime}}),t._v(" "),s("span",{staticClass:"fl lines"},[t._v("-")]),t._v(" "),s("calendar",{ref:"endCal",staticClass:"fl",attrs:{pObj:t.endObj},on:{throwTime:t.getEndTime}})],1),t._v(" "),s("span",{staticClass:"fl returnInt"},[t._v("共"+t._s(t.returnInt)+"天")])])]),t._v(" "),t._m(1),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl"},[t._v("消息推送渠道")]),t._v(" "),s("div",{staticClass:"rightHalf"},[s("mulSelect",{staticClass:"fl",attrs:{styles:{backgroundColor:"rgb(240,240,240)"},list:t.goodsType,selects:t.customSelect,name:"name",keyName:"id"},on:{selOn:t.selOn}}),t._v(" "),t._m(2)],1)]),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl"},[t._v("内容设置")]),t._v(" "),s("div",{staticClass:"rightHalf"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.customActivity,expression:"customActivity"}],attrs:{placeholder:"请输入内容设置",maxlength:"151"},domProps:{value:t.customActivity},on:{input:function(e){e.target.composing||(t.customActivity=e.target.value)}}}),t._v(" "),t._m(3),t._v(" "),s("div",{staticClass:"limit"},[s("p",[t._v("引用参数:\n\t\t\t\t\t"),t._l(t.customParameter,function(e,i){return s("a",{key:i,staticStyle:{color:"#FF9200"},on:{click:function(e){t.addParameter(i,2)}}},[t._v(t._s(e.name))])})],2)])])]),t._v(" "),s("div",{staticClass:"online-box clearfix"},[s("span",{staticClass:"online-sub fl"},[t._v("活动说明")]),t._v(" "),s("div",{staticClass:"rightHalf"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.customExplain,expression:"customExplain"}],attrs:{placeholder:"请输入活动说明",maxlength:"151"},domProps:{value:t.customExplain},on:{input:function(e){e.target.composing||(t.customExplain=e.target.value)}}}),t._v(" "),t._m(4)])]),t._v(" "),s("div",{staticClass:"box",staticStyle:{"margin-top":"100px","padding-left":"70px"}},[s("a",{staticClass:"gray",staticStyle:{width:"200px"},attrs:{href:"javascript:void(0);"},on:{click:t.returnAct}},[t._v("取消")]),t._v(" "),t.isactivityDetail?[s("a",{staticClass:"gray",staticStyle:{width:"200px",background:"#858585"},attrs:{href:"javascript:void(0);"},on:{click:function(e){t.activitySave("0")}}},[t._v("保存")]),t._v(" "),""==t.editId?s("a",{staticClass:"yellow",staticStyle:{width:"200px"},attrs:{href:"javascript:void(0);"},on:{click:function(e){t.activitySave("1")}}},[t._v("发布")]):t._e()]:t._e()],2),t._v(" "),t.showCoupon?s("birthCoupon",{attrs:{selectCoupon:t.selectCoupon,couponList:t.couponList},on:{winEvent:t.winEventCoupon}}):t._e()],1)};s._withStripped=!0;var n=i("f6ce"),a=i("bbb9"),o=i("81a2"),c=i("05dd");function l(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function s(n,a){try{var o=e[n](a),c=o.value}catch(t){return void i(t)}if(!o.done)return Promise.resolve(c).then(function(t){s("next",t)},function(t){s("throw",t)});t(c)}("next")})}}var r=null,u={data:function(){return{startObj:{time:a.a.getTime({time:new Date}).start},endObj:{time:a.a.getTime({time:new Date}).end},dates:(new Date).getTime(),returnInt:1,edit:!1,editId:"",total:[{text:"不设限制",value:"0"},{text:"设定总数",value:"1"}],num:!0,customName:"",customExplain:"",customIds:[],selectCoupon:[],member:0,memfilter:"",customList:[{name:"店内"},{name:"会员"}],indexCustom:0,goodsType:[{name:"微信",id:"1"}],customSelect:[],msmStatus:!1,micsel:[],micselimit:[],memberCoupon:[],miCount:[],activityDetail:{},brandId:null,customActivity:"",customParameter:[{name:"【会员姓名】",id:"{memberName}"},{name:"【优惠券名称】",id:"{couponName}"},{name:"【优惠券数量】",id:"{couponNum}"},{name:"【活动名称】",id:"{activityName}"}],showCoupon:!1,couponList:[],showVip:!1,memberStatus:!0,isactivityDetail:!0}},watch:{micselimit:{handler:function(){console.log(this.micselimit,"---")},deep:!0},customExplain:function(){this.customExplain.length>150&&(this.$store.commit("setWin",{content:"仅限150个字符"}),this.customExplain=this.customExplain.substr(0,150))},customActivity:function(){this.customActivity.length>150&&(this.$store.commit("setWin",{content:"仅限150个字符"}),this.customActivity=this.customActivity.substr(0,150))},"startObj.time":"timeChange","endObj.time":"timeChange"},methods:{valiData:function(t,e,i){this.$store.commit("setWin",{content:t,title:e,winType:i})},haveIndex:function(t){this.indexCustom=t,0==this.indexCustom?this.selectCoupon=this.miCount:1==this.indexCustom&&(this.selectCoupon=this.memberCoupon),this.abc()},getStartTime:function(t){this.startObj.time=t},getEndTime:function(t){this.endObj.time=t},timeChange:function(){this.returnInt=Math.ceil((new Date(this.endObj.time).getTime()-new Date(this.startObj.time).getTime())/864e5)},addVip:function(){this.showVip=!0},selectVipEvent:function(t){var e=this;"ok"==t.status&&(this.member=t.member,this.memfilter=t.memfilter),this.$store.commit("setPageTools",[{name:"<返回活动列表",className:["activity"],fn:function(){e.returnAct()}}]),this.showVip=!1},abc:function(){1==this.indexCustom&&(this.memberStatus&&this.addVip(),this.num=!1),0==this.indexCustom&&(this.num=!0)},addParameter:function(t){this.customActivity+=this.customParameter[t].id},winEventCoupon:function(t){if(this.showCoupon=!1,"ok"==t.status)if(this.selectCoupon=t.data.select,this.couponList=t.data.list,0==this.indexCustom){this.miCount=t.data.select;for(var e=0;e<this.miCount.length;e++)this.$set(this.micsel,e,0),this.$set(this.micselimit,e,0)}else 1==this.indexCustom&&(this.memberCoupon=t.data.select)},selOn:function(t){this.goodsSelect=t},autosell:function(t,e){var i=this.$refs.autoLook,s=this.$refs.autoTxt;0==this.micsel[e]&&(i[e].style.display="none",s[e].style.display="none",this.miCount[e].micNum=""),1==this.micsel[e]&&(i[e].style.display="inline",s[e].style.display="inline-block")},autosellimit:function(t,e){var i=this.$refs.lookDay,s=this.$refs.txtDay;0==this.micselimit[e]&&(i[e].style.display="none",s[e].style.display="none",this.miCount[e].micLimit=""),1==this.micselimit[e]&&(i[e].style.display="inline",s[e].style.display="inline-block")},delCount:function(t,e){var i=this;this.$store.commit("setWin",{content:"确认删除该优惠券？",callback:function(t){"ok"==t&&(i.miCount.splice(e,1),i.customIds.splice(e,1))}})},returnAct:function(){this.$router.push("/admin/activity/generalActivity")},addCustom:function(){var t=this;return l(regeneratorRuntime.mark(function e(){var i,s,n,a,c,l,r,u;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.getGetCouponCondition({});case 2:for(i=e.sent,s=[],n=!0,a=!1,c=void 0,e.prev=7,l=i[Symbol.iterator]();!(n=(r=l.next()).done);n=!0)(u=r.value).num=1,7!=u.type&&s.push(u);e.next=15;break;case 11:e.prev=11,e.t0=e.catch(7),a=!0,c=e.t0;case 15:e.prev=15,e.prev=16,!n&&l.return&&l.return();case 18:if(e.prev=18,!a){e.next=21;break}throw c;case 21:return e.finish(18);case 22:return e.finish(15);case 23:t.couponList=s,0==t.indexCustom?t.selectCoupon=t.miCount:1==t.indexCustom&&(t.selectCoupon=t.memberCoupon),t.showCoupon=!0;case 26:case"end":return e.stop()}},e,t,[[7,11,15,23],[16,,18,22]])}))()},checkForm:function(){return!!c.a.checkData({isclick:{cond:"$$!==true",pro:"请勿重复保存"},customName:"活动名称未设置",selectCoupon:{cond:"$$.length!=0",pro:"请关联优惠券"}},this)&&(!(this.startObj.time-this.endObj.time>0)||(this.valiData("时间选择范围错误!"),!1))},activitySave:function(t){var e=this;return l(regeneratorRuntime.mark(function i(){var s,n,c;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(e.checkForm()){i.next=2;break}return i.abrupt("return");case 2:if(e.edit){i.next=10;break}return s=[],n={couponIds:0==e.indexCustom?e.miCount:e.memberCoupon,minConsume:"",maxConsume:"",isLoop:"0",memberRights:"1",pushChannel:e.customSelect.toString().replace(/,/g,""),msgContent:e.customActivity},s.push(n),i.next=8,o.a.fissionActivity({data:{rule:JSON.stringify(s),type:1,mouldType:0,name:e.customName,explain:e.customExplain,objectType:e.memberStatus?e.indexCustom:4,memberIds:e.memfilter,memberNum:e.member,startTime:parseInt(e.startObj.time/1e3),endTime:parseInt(e.endObj.time/1e3),getType:0,isAuto:t}});case 8:i.next=24;break;case 10:return 0==e.indexCustom?e.activityDetail.rule[0].couponIds=e.miCount:1==e.indexCustom&&(e.activityDetail.rule[0].couponIds=e.memberCoupon),e.activityDetail.name=e.customName,e.activityDetail.explain=e.customExplain,e.activityDetail.objectType=e.indexCustom,e.activityDetail.startTime=parseInt(e.startObj.time/1e3),e.activityDetail.endTime=parseInt(e.endObj.time/1e3),e.activityDetail.rule[0].pushChannel=e.customSelect.toString().replace(/,/g,""),e.activityDetail.rule[0].msgContent=e.customActivity,e.activityDetail.rule=a.a.deepCopy(e.activityDetail.rule),e.activityDetail.isAuto=t,e.activityDetail.memberIds=e.memfilter,e.activityDetail.memberNum=e.member,i.next=24,o.a.fissionActivity({data:{activityId:e.editId,data:JSON.stringify(e.activityDetail)}});case 24:c="0"==t?"保存成功":"发布成功",e.valiData(c),e.returnAct();case 27:case"end":return i.stop()}},i,e)}))()},getActivityDetail:function(t){var e=this;return l(regeneratorRuntime.mark(function i(){var s,n;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,o.a.newgetActivityDetail({data:{activityId:t.id,type:t.type,mouldType:t.mouldType}});case 2:for(s=i.sent,e.activityDetail=s,e.customName=s.name,n=s.rule[0].couponIds;(n+"").length>3&&"string"==typeof e.activityDetail.rule[0].couponIds;)n=e.activityDetail.rule[0].couponIds=JSON.parse(e.activityDetail.rule[0].couponIds);e.customActivity=s.rule[0].msgContent,e.customSelect=s.rule[0].pushChannel.length>1?s.rule[0].pushChannel.split("").toString().split(","):s.rule[0].pushChannel.split(","),e.customExplain=s.explain,"4"==s.objectType?(e.indexCustom=1,e.memberStatus=!1):e.indexCustom=parseInt(s.objectType),0==e.indexCustom?e.num=!0:e.num=!1,e.startObj.time=1e3*s.startTime,e.endObj.time=1e3*s.endTime,e.selectCoupon=s.rule[0].couponIds,e.miCount=s.rule[0].couponIds,e.member=s.sendProgress.split(",")[0],e.memfilter=s.memberIds,"0"==e.activityDetail.objectType?e.customIds=e.activityDetail.rule[0].couponIds:e.customIds1=e.activityDetail.rule[0].couponIds,e.$nextTick(function(){setTimeout(function(){for(var t=e.$refs.autoDay,i=e.$refs.lookDay,s=e.$refs.txtDay,n=e.$refs.autoLook,a=e.$refs.autoTxt,o=0;o<e.miCount.length;o++){if(e.miCount[o].micLimit&&""!=e.miCount[o].micLimit){e.micselimit[o]=1;for(var c=0;c<t.length;c++)s[o].style.display="inline-block",i[o].style.display="inline"}else e.$set(e.micselimit,o,0);e.miCount[o].micNum&&""!=e.miCount[o].micNum?(e.micsel[o]=1,a[o].style.display="inline-block",n[o].style.display="inline"):e.$set(e.micsel,o,0)}},300)});case 20:case"end":return i.stop()}},i,e)}))()}},beforeCreate:function(){r=n.a.session("userShop").currentShop},components:{mulSelect:function(){return i.e("mul_select").then(i.bind(null,"7d09"))},birthCoupon:function(){return i.e("activity_birth_coupon").then(i.bind(null,"2d94"))},memberScreening:function(){return i.e("activity_screening").then(i.bind(null,"1e4a"))},singleSelect:function(){return i.e("mul_select").then(i.bind(null,"7231"))},calendar:function(){return i.e("calendar_result").then(i.bind(null,"9265"))}},mounted:function(){var t=this;this.$store.commit("setPageTools",[{name:"<返回活动列表",className:["activity"],fn:function(){t.returnAct()}}]),this.ischain=this.brandId=r.ischain;var e=n.a.session("memberIds");e&&(this.indexCustom=1,this.member=e.length,this.memfilter=e.join(","),this.memberStatus=!1);var i=n.a.session("activityInfo");i&&(i.isShowdetail&&(this.isactivityDetail=!1),this.editId=i.id,this.edit=!0,this.getActivityDetail(i))},beforeDestroy:function(){n.a.session("activityInfo",null),n.a.session("memberIds",null)}},m=(i("19ba"),i("6ceb")),v=Object(m.a)(u,s,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"set-line"},[e("div",{staticClass:"titles"},[this._v("自定义设置")]),this._v(" "),e("div",{staticClass:"line"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"set-line"},[e("div",{staticClass:"titles"},[this._v("活动通知")]),this._v(" "),e("div",{staticClass:"line"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl handle-tips"},[e("i"),this._v(" 活动发布后将通过该渠道触发会员\n\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bluehandle-tips"},[e("i"),this._v(" 活动发布后将通过该渠道触发会员\n\t\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bluehandle-tips"},[e("i"),this._v(" 限150字以内\n\t\t\t")])}],!1,null,"ab9d1ef2",null);v.options.__file="src\\module\\marketing_tools\\new_activity\\activity_custom.vue";e.default=v.exports},"41e1":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAYCAYAAAD3Va0xAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUJJREFUeNrsVUFOwzAQdKI+IOIDcOBOuMCRCJU7P4AnlBc0vIDyAtoXJHcO5cqJ9gwS4QOofUGYqcbVYuE04tyRRt7WnrG9tjdJ27Yuho+r84nC8vj5dRX0ZWz9/0nMCANzNG/gF0hRAR6pJU/UN4JZPXBxjMA1+ALeyNRjCT4qrjDp3SBYahHM6GSylKFnbsYR+WZrMCnxYxzMGBNe/DFumrwPz7jvTy21r3BDewDcWqlcrJSXygiZzJmEdXhyFjRaKA/jQMgZG9cTPkfcwjd4CfGkrxi6azQNNItUl4orOAAfZNoXTAPNXNox262JC7sKf6st0ogJhU/GYG7iSoey2+g/2BvtjQJkesgztcS9iVlu6vB2b2u2OhpTZrtefqbywyp6ykf7q/ir4NfgYY/drFX4p9GviAyzLhdVjC1+BBgAlGWMQ6Ax/VYAAAAASUVORK5CYII="},d7ab:function(t,e,i){}}]);