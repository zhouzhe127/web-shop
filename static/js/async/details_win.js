(window.webpackJsonp=window.webpackJsonp||[]).push([["details_win"],{"0a8a":function(t,e,i){"use strict";var n=i("5559");i.n(n).a},5559:function(t,e,i){},cc4c:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("win",{attrs:{width:599,height:452,ok:{content:t.isEdit?"保存":"修改"},type:"alert"},on:{winEvent:t.winEvent}},[i("span",{attrs:{slot:"title"},slot:"title"},[t._v("详细信息")]),t._v(" "),i("div",{staticClass:"details_content",attrs:{slot:"content"},slot:"content"},[i("ul",[i("li",{staticClass:"username"},[t._v("用户："+t._s(t.details.name||"--"))]),t._v(" "),i("li",{staticClass:"referee"},[t._v("推荐人："+t._s(t.details.recommendedName||"--"))]),t._v(" "),t.isEdit?t._e():i("li",{staticClass:"real_name"},[t._v("真实姓名："+t._s(t.details.realName||"--"))]),t._v(" "),t.isEdit?i("li",{staticClass:"real_name"},[t._v("真实姓名：\n\t\t\t\t"),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.name,expression:"name",modifiers:{trim:!0}}],attrs:{maxlength:"20",type:"text"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]):t._e(),t._v(" "),t.isEdit?t._e():i("li",{staticClass:"mobile_phone"},[t._v("手机号："+t._s(t.details.mobile||"--"))]),t._v(" "),t.isEdit?i("li",{staticClass:"mobile_phone"},[t._v("手机号：\n\t\t\t\t"),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.phone,expression:"phone",modifiers:{trim:!0}}],attrs:{maxlength:"11",type:"text",onkeyup:"value=value.replace(/[^\\d]/g,'')"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]):t._e(),t._v(" "),i("li",{staticClass:"current_inter"},[t._v("当前积分："+t._s(t.details.points||"--"))]),t._v(" "),i("li",{staticClass:"belong_group"},[t._v("所在分组："+t._s(t.details.groupName||"--"))]),t._v(" "),i("li",{staticClass:"belong_group"},[t._v("标签："+t._s(t.details.tagsStr||"--"))])])])])};n._withStripped=!0;var a=i("81a2"),s=i("bbb9"),o=i("05dd");var r={data:function(){return{details:"",phone:"",name:"",isEdit:!1,iNd:1}},props:["detailInfo"],watch:{isEdit:function(t){t&&console.log(t)}},methods:{winEvent:function(t){"ok"==t?(this.isEdit=!0,++this.iNd,this.isEdit&&this.iNd>2&&this.editFansInfo()):this.$emit("closeWin")},editFansInfo:function(){var t,e=this;return(t=regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(o.a.checkData({name:{cond:"$$.trim()!=''",pro:"请输入姓名"},phone:{cond:"/^((12[0-9])|(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9])|(17[0-9])|(16[0-9]))\\d{8}$/g.test($$)",pro:"请输入正确的手机号"}},e)){t.next=2;break}return t.abrupt("return",!1);case 2:return t.next=4,a.a.setMobileAndRealName({data:{id:e.details.id,name:e.name,mobile:e.phone}});case 4:e.$store.commit("setWin",{content:"修改成功",title:"操作提示",winType:"alert"}),e.$emit("closeWin",{name:e.name,mobile:e.phone});case 6:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function n(a,s){try{var o=e[a](s),r=o.value}catch(t){return void i(t)}if(!o.done)return Promise.resolve(r).then(function(t){n("next",t)},function(t){n("throw",t)});t(r)}("next")})})()}},mounted:function(){this.details=s.a.deepCopy(this.detailInfo),this.details.points=Number(this.details.memberId)>0?this.details.memberPoint:this.details.point,this.phone=this.details.mobile,this.name=this.details.realName},components:{win:function(){return i.e("win").then(i.bind(null,"f60a"))}}},l=(i("0a8a"),i("7610")),c=Object(l.a)(r,n,[],!1,null,"42c0a97b",null);c.options.__file="src\\module\\seller_assistant\\details_win.vue";e.default=c.exports}}]);