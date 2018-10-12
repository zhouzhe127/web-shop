(window.webpackJsonp=window.webpackJsonp||[]).push([["add_supply"],{"79c3":function(t,e,a){"use strict";a.r(e);var n=a("05dd"),s=a("81a2");function i(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function n(s,i){try{var r=e[s](i),o=r.value}catch(t){return void a(t)}if(!r.done)return Promise.resolve(o).then(function(t){n("next",t)},function(t){n("throw",t)});t(o)}("next")})}}var r={data:function(){return{user:[{name:"",phone:"",address:""}],name:"",bank:"",bankAccount:"",tax:"",taxRate:""}},computed:{newBank:{get:function(){return this.bankAccount},set:function(t){this.bankAccount=""!=t?t.replace(/[^\d]/g,""):""}}},props:["editId","shopId","suppierList"],mounted:function(){this.editId&&this.getDetail()},methods:{getDetail:function(){var t=this;return i(regeneratorRuntime.mark(function e(){var a,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.suppelierById({data:{id:t.editId}});case 2:for(n in a=e.sent,t.user=a.people.people,a)t[n]=a[n];case 5:case"end":return e.stop()}},e,t)}))()},addUser:function(){this.user.push({name:"",phone:"",address:""})},closeUser:function(t){n.a.checkData({user:{cond:"$$.length>1",pro:"供应商至少有一个"}},this)&&this.user.splice(t,1)},cancel:function(){this.$emit("save","cancel")},addSupplier:function(){var t=this;return i(regeneratorRuntime.mark(function e(){var a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(a={}).people=t.user,e.next=4,s.a.addSupplier({data:{name:t.name,bank:t.bank,bankAccount:t.bankAccount,tax:t.tax,taxRate:t.taxRate,people:JSON.stringify(a)}});case 4:t.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"保存成功"}),t.suppierList();case 6:case"end":return e.stop()}},e,t)}))()},editSupplier:function(){var t=this;return i(regeneratorRuntime.mark(function e(){var a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(a={}).people=t.user,e.next=4,s.a.editSupplier({data:{name:t.name,bank:t.bank,bankAccount:t.bankAccount,tax:t.tax,taxRate:t.taxRate,people:JSON.stringify(a),id:t.editId}});case 4:t.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"保存成功"}),t.suppierList();case 6:case"end":return e.stop()}},e,t)}))()},save:function(){if(n.a.checkData({name:"请输入供应商名称"},this)){for(var t=0;t<this.user.length;t++){if(""==this.user[t].phone)return this.$store.commit("setWin",{winType:"alert",content:"请输入联系方式"}),!1;if(!n.a.checkData({name:"请填写对接人",phone:{cond:"(/^[0-9]*$/).test($$)",pro:"联系方式号码输入有误"},address:"请填写联系地址"},this.user[t]))return}this.editId?this.editSupplier():this.addSupplier(),this.$emit("save","ok")}}}},o=(a("ef60"),a("d801")),c=Object(o.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{attrs:{id:"content"}},[n("div",{staticClass:"info-main"},[t._m(0),t._v(" "),n("div",{staticClass:"info-content"},[n("label",{staticClass:"content-box"},[n("span",{staticClass:"required"},[t._v("供应商名称")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"right",attrs:{type:"text",placeholder:"请输入供应商名称",maxlength:"20"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),t._v(" "),n("label",{staticClass:"content-box"},[n("span",{staticClass:"required icon-none"},[t._v("开户银行")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.bank,expression:"bank"}],staticClass:"right",attrs:{type:"text",placeholder:"选填",maxlength:"20"},domProps:{value:t.bank},on:{input:function(e){e.target.composing||(t.bank=e.target.value)}}})]),t._v(" "),n("label",{staticClass:"content-box"},[n("span",{staticClass:"required icon-none"},[t._v("银行账号")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.newBank,expression:"newBank"}],staticClass:"right",attrs:{type:"text",placeholder:"选填",maxlength:"25"},domProps:{value:t.newBank},on:{input:function(e){e.target.composing||(t.newBank=e.target.value)}}})]),t._v(" "),n("label",{staticClass:"content-box"},[n("span",{staticClass:"required icon-none"},[t._v("税号")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.tax,expression:"tax"}],staticClass:"right",attrs:{type:"text",placeholder:"选填",maxlength:"20"},domProps:{value:t.tax},on:{input:function(e){e.target.composing||(t.tax=e.target.value)}}})]),t._v(" "),n("label",{staticClass:"content-box"},[n("span",{staticClass:"required icon-none"},[t._v("税率")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.taxRate,expression:"taxRate"}],staticClass:"right",attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",type:"text",placeholder:"选填",maxlength:"2"},domProps:{value:t.taxRate},on:{input:function(e){e.target.composing||(t.taxRate=e.target.value)}}}),t._v(" "),n("span",[t._v("(%)")])])])]),t._v(" "),n("div",{staticClass:"info-main"},[t._m(1),t._v(" "),t._l(t.user,function(e,a){return[n("div",{key:a,staticClass:"info-content userinfo"},[n("label",{staticClass:"content-box"},[n("span",{staticClass:"required"},[t._v("对接人")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"item.name"}],staticClass:"right",attrs:{type:"text",placeholder:"请输入联系人",maxlength:"20"},domProps:{value:e.name},on:{input:function(a){a.target.composing||t.$set(e,"name",a.target.value)}}})]),t._v(" "),n("label",{staticClass:"content-box"},[n("span",{staticClass:"required"},[t._v("联系方式")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"item.phone"}],staticClass:"right",attrs:{type:"text",placeholder:"请输入联系方式",maxlength:"11"},domProps:{value:e.phone},on:{input:function(a){a.target.composing||t.$set(e,"phone",a.target.value)}}})]),t._v(" "),n("label",{staticClass:"content-box"},[n("span",{staticClass:"required"},[t._v("联系地址")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.address,expression:"item.address"}],staticClass:"right",attrs:{type:"text",placeholder:"请输入联系地址",maxlength:"30"},domProps:{value:e.address},on:{input:function(a){a.target.composing||t.$set(e,"address",a.target.value)}}})]),t._v(" "),n("div",{staticClass:"off",on:{click:function(e){t.closeUser(a)}}})])]}),t._v(" "),t.user.length<3?n("section",{staticClass:"user",on:{click:t.addUser}},[n("img",{staticClass:"addicon",attrs:{src:a("f343"),alt:"add"}}),t._v(" "),n("span",{staticClass:"addword"},[t._v("新增对接人")])]):t._e()],2),t._v(" "),n("div",{staticClass:"box"},[n("a",{staticClass:"gray",attrs:{href:"javascript:void(0);"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),n("a",{staticClass:"yellow",attrs:{href:"javascript:void(0);"},on:{click:t.save}},[t._v("保存")])])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"info-title"},[e("span",{staticClass:"title"},[this._v("基本信息")]),this._v(" "),e("span",{staticClass:"line"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"info-title"},[e("span",{staticClass:"title"},[this._v("对接人信息")]),this._v(" "),e("span",{staticClass:"line"})])}],!1,null,"69915b98",null);e.default=c.exports},da04:function(t,e,a){},ef60:function(t,e,a){"use strict";var n=a("da04");a.n(n).a}}]);