(window.webpackJsonp=window.webpackJsonp||[]).push([["setup_user"],{6309:function(t,s,e){},"9fe2":function(t,s,e){"use strict";var i=e("6309");e.n(i).a},cc9e:function(t,s,e){"use strict";e.r(s);var i=e("81a2"),n=e("f6ce"),a=e("05dd"),o=e("bbb9");var r={data:function(){return{powList:[{name:"积分商品核销"},{name:"疯抢商品核销"},{name:"优惠券核销"},{name:"扫码消费"},{name:"任务审核"}],selectPow:[],isShowStaff:!1,selectJob:[],jobList:[{name:"店长"},{name:"店员"},{name:"收银员"}],isShowSelector:!1,ischain:"",shopName:"",isShowShopWin:!1,isEdit:!1,userSelectId:"",power:"1",slectsShopIds:[],staffId:"",editDatas:o.a.deepCopy(this.editData),showIds:""}},props:["editData"],methods:{selectStaff:function(t){this.isShowStaff=!1,t&&(this.staffId=t)},closeShopWin:function(t){this.isShowShopWin=!1,t&&(this.slectsShopIds=t)},closeUserWin:function(t){this.isShowSelector=!1,t&&(this.userSelectId=t)},wentBack:function(){this.$store.commit("setPageTools",{}),this.$emit("wengBack")},init:function(){this.userSelectId=this.editDatas.fansId,this.showIds=this.editDatas.fansId,this.selectJob=[this.editDatas.position-1],this.slectsShopIds=this.editDatas.shopIds.split(","),this.staffId=this.editDatas.staffId;var t=this.editDatas.permissions.split(","),s=!0,e=!1,i=void 0;try{for(var n,a=t[Symbol.iterator]();!(s=(n=a.next()).done);s=!0){var o=n.value;this.selectPow.push(Number(o)-1)}}catch(t){e=!0,i=t}finally{try{!s&&a.return&&a.return()}finally{if(e)throw i}}},saveChange:function(){var t,s=this;return(t=regeneratorRuntime.mark(function t(){var e,n,o,r,c,l,h,u;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a.a.checkData({userSelectId:{cond:"$$ != ''",pro:"请选择用户"},staffId:{cond:"$$.trim() != ''",pro:"请选择工作人员"},selectPow:{cond:"$$.length>0",pro:"请选择权限"}},s)){t.next=2;break}return t.abrupt("return",!1);case 2:if(!(3==s.ischain&&s.slectsShopIds.length<1)){t.next=5;break}return s.$store.commit("setWin",{content:"请选择工作门店",title:"操作提示",winType:"alert"}),t.abrupt("return",!1);case 5:if("0"!=s.selectJob.length){t.next=8;break}return s.$store.commit("setWin",{content:"请选择职位",title:"操作提示",winType:"alert"}),t.abrupt("return",!1);case 8:for(e="",n=[],o=!0,r=!1,c=void 0,t.prev=13,l=s.selectPow[Symbol.iterator]();!(o=(h=l.next()).done);o=!0)u=h.value,n.push(u+1);t.next=21;break;case 17:t.prev=17,t.t0=t.catch(13),r=!0,c=t.t0;case 21:t.prev=21,t.prev=22,!o&&l.return&&l.return();case 24:if(t.prev=24,!r){t.next=27;break}throw c;case 27:return t.finish(24);case 28:return t.finish(21);case 29:if(!s.isEdit){t.next=35;break}return t.next=32,i.a.editAssistantstaff({data:{id:s.editDatas.id,fansId:s.userSelectId,staffId:s.staffId,permissions:n.toString(),shopIds:s.slectsShopIds.join(","),position:s.selectJob[0]+1}});case 32:e=t.sent,t.next=38;break;case 35:return t.next=37,i.a.addAssistantstaff({data:{fansId:s.userSelectId,staffId:s.staffId,permissions:n.toString(),shopIds:s.slectsShopIds.join(","),position:s.selectJob[0]+1}});case 37:e=t.sent;case 38:e&&(s.$store.commit("setWin",{content:"保存成功",title:"操作提示",winType:"alert"}),s.wentBack());case 39:case"end":return t.stop()}},t,s,[[13,17,21,29],[22,,24,28]])}),function(){var s=t.apply(this,arguments);return new Promise(function(t,e){return function i(n,a){try{var o=s[n](a),r=o.value}catch(t){return void e(t)}if(!o.done)return Promise.resolve(r).then(function(t){i("next",t)},function(t){i("throw",t)});t(r)}("next")})})()}},mounted:function(){var t=this;this.$store.commit("setPageTools",{back:function(){t.wentBack()}});var s=n.a.session("userShop");this.ischain=s.currentShop.ischain,3!=this.ischain&&(this.shopName=s.currentShop.name,this.slectsShopIds=[s.currentShop.id]),this.editData&&(this.isEdit=!0,this.init())},components:{"select-user-win":function(){return e.e("select_user_win").then(e.bind(null,"6ec9"))},"select-work-shop-win":function(){return e.e("select_work_shop_win").then(e.bind(null,"4a42"))},"mul-select":function(){return e.e("mul_select").then(e.bind(null,"7d09"))},"select-staff-win":function(){return e.e("select_staff_win").then(e.bind(null,"b6f9"))}}},c=(e("9fe2"),e("d801")),l=Object(c.a)(r,function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"setup_user"},[t._m(0),t._v(" "),e("section",{staticClass:"setup_user_content"},[e("div",{staticClass:"setup_user_name"},[e("span",{staticClass:"authority_d required"},[t._v("用户")]),t._v(" "),e("button",{staticClass:"bind_btn",on:{click:function(){t.isShowSelector=!0,t.showIds=t.userSelectId}}},[t._v("选择用户")]),t._v(" "),t.userSelectId?e("span",{staticClass:"authority_select"},[t._v("已选择1位用户")]):t._e()]),t._v(" "),e("div",{staticClass:"bind_staff"},[e("span",{staticClass:"required"},[t._v("绑定员工")]),t._v(" "),e("button",{staticClass:"bind_btn",on:{click:function(){t.isShowStaff=!0}}},[t._v("选择员工")]),t._v(" "),t.staffId?e("span",{staticClass:"authority_select"},[t._v("已选择1位员工")]):t._e()]),t._v(" "),e("div",{staticClass:"authority"},[e("span",{staticClass:"authority_d required"},[t._v("权限")]),t._v(" "),e("mul-select",{attrs:{styles:{backgroundColor:"rgb(236,236,236)",marginRight:"8px"},list:t.powList,selects:t.selectPow,name:"name",keys:"id",isradio:!1}})],1),t._v(" "),3==t.ischain?e("div",{staticClass:"worker_shop"},[e("span",{staticClass:"required"},[t._v("工作门店")]),t._v(" "),e("button",{on:{click:function(){t.isShowShopWin=!0}}},[t._v("选择工作门店")]),t._v(" "),t.slectsShopIds.length>0?e("span",{staticClass:"authority_select"},[t._v("已选择"+t._s(t.slectsShopIds.length)+"家门店")]):t._e()]):t._e(),t._v(" "),3!=t.ischain?e("div",{staticClass:"worker_shop"},[e("span",{staticClass:"required"},[t._v("工作门店")]),t._v(" "),e("i",[t._v(t._s(t.shopName))])]):t._e(),t._v(" "),e("div",{staticClass:"job_type"},[e("span",{staticClass:"authority_d required"},[t._v("职位")]),t._v(" "),e("mul-select",{attrs:{styles:{backgroundColor:"rgb(236,236,236)",marginRight:"8px"},list:t.jobList,selects:t.selectJob,name:"name",keys:"id",isradio:!0}})],1),t._v(" "),e("div",{staticClass:"save_change"},[e("button",{on:{click:t.saveChange}},[t._v("保存")])])]),t._v(" "),e("transition",{attrs:{name:"fade"}},[t.isShowSelector?e("select-user-win",{attrs:{showIds:t.showIds},on:{closeWin:t.closeUserWin}}):t._e(),t._v(" "),t.isShowShopWin?e("select-work-shop-win",{attrs:{slectsShopIds:t.slectsShopIds,isEdit:t.isEdit},on:{closeWin:t.closeShopWin}}):t._e(),t._v(" "),t.isShowStaff?e("select-staff-win",{on:{closeWin:t.selectStaff}}):t._e()],1)],1)},[function(){var t=this.$createElement,s=this._self._c||t;return s("header",{staticClass:"setup_user_nav"},[s("span",[this._v("新建人员")]),this._v(" "),s("p",{staticClass:"dashed"})])}],!1,null,"0fe17426",null);s.default=l.exports}}]);