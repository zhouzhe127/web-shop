(window.webpackJsonp=window.webpackJsonp||[]).push([["member_label"],{a522:function(t,e,n){},b732:function(t,e,n){"use strict";n.r(e);var a=n("81a2"),i=n("f6ce"),s=n("bbb9"),r=n("05dd");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function a(i,s){try{var r=e[i](s),o=r.value}catch(t){return void n(t)}if(!r.done)return Promise.resolve(o).then(function(t){a("next",t)},function(t){a("throw",t)});t(o)}("next")})}}var c={data:function(){return{labelList:[],tagDetail:"",tagOn:0,name:"",sort:"",id:"",isFlag:!1,userShop:"",currentShop:"",title:"",num:1,isShowAddWin:!1,item:"",isShowMemberWin:!1,textOn:"",memberItem:"",titleList:[{titleName:"操作",titleStyle:{width:"100px",flex:"none"}},{titleName:"名称",dataName:"name"},{titleName:"已贴标签数量",dataName:"relevanceNum"},{titleName:"排序",dataName:"sort"}]}},methods:{closeMemberWin:function(t){"ok"==t?(this.hintLabel(this.memberItem),this.changeTag(this.memberItem)):this.isShowMemberWin=!1},closeWin:function(t){"ok"==t?this.addLabel():this.isShowAddWin=!1},addMemberlabel:function(t,e){this.isShowAddWin=!0,this.item=e||"",this.item?(this.name=e.name,this.id=e.id,this.num=e.sort):(this.name=null,this.id=null,this.num=1),this.title="0"==t?"新建会员标签":"编辑会员标签","1"==t&&this.getDetail(e)},addLabel:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r.a.checkData({name:{cond:"$$.trim() != ''",pro:"请输入标签名字"}},t)){e.next=2;break}return e.abrupt("return",!1);case 2:return t.isShowAddWin=!1,n=""==t.item?"MemberTag/addTag":"MemberTag/updateTag",e.next=6,a.a.changeMemberTag({data:{id:t.id,name:t.name,sort:t.num},url:r.a.host.wx+n});case 6:t.getLabelList();case 7:case"end":return e.stop()}},e,t)}))()},getLabelList:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.getMemberTag({data:{}});case 2:n=e.sent,t.labelList=n,t.labelList=s.a.sortByAll(t.labelList);case 5:case"end":return e.stop()}},e,t)}))()},getDetail:function(t){var e=this;return o(regeneratorRuntime.mark(function n(){var i;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.a.getMemberTag({data:{id:t.id}});case 2:i=n.sent,e.name=i.name,e.id=i.id,e.sort=i.sort;case 6:case"end":return n.stop()}},n,e)}))()},changeTag:function(t){0==t.status?t.status=1:t.status=0},hintSwitch:function(t){this.id=t.id,this.memberItem=t||"",this.isShowMemberWin=!0,this.textOn=0==t.status?1:0},hintLabel:function(t){var e=this;return o(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.a.changeTagStatus({data:{id:t.id,flag:0==t.status?1:0}});case 2:e.isShowMemberWin=!1;case 3:case"end":return n.stop()}},n,e)}))()}},mounted:function(){this.getLabelList(),this.userShop=i.a.session("userShop"),this.currentShop=this.userShop.currentShop,0!=this.currentShop.ischain&&3!=this.currentShop.ischain||(this.isFlag=!this.isFlag)},components:{win:function(){return n.e("win").then(n.bind(null,"f60a"))},"sub-add":function(){return n.e("subadd").then(n.bind(null,"e7ea"))},comTable:function(){return n.e("table").then(n.bind(null,"4360"))}}},l=(n("ca4b"),n("d801")),u=Object(l.a)(c,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"memberLabel"}},[n("div",{staticClass:"btn-concent"},[n("button",{directives:[{name:"show",rawName:"v-show",value:t.isFlag,expression:"isFlag"}],staticClass:"increase",on:{click:function(e){t.addMemberlabel("0","")}}},[t._v("添加会员标签")])]),t._v(" "),n("com-table",{attrs:{listHeight:80,showHand:!1,showTitle:1,listWidth:1e3,introData:t.labelList,titleData:t.titleList},scopedSlots:t._u([{key:"con-0",fn:function(e){return n("div",{staticClass:"dolist_btn"},[n("span",{directives:[{name:"show",rawName:"v-show",value:t.isFlag,expression:"isFlag"}],on:{click:function(n){t.addMemberlabel("1",e.data)}}},[t._v("编辑")]),t._v(" "),0==e.data.status?n("span",{on:{click:function(n){t.hintSwitch(e.data)}}},[t._v("开启")]):t._e(),t._v(" "),1==e.data.status?n("span",{on:{click:function(n){t.hintSwitch(e.data)}}},[t._v("关闭")]):t._e()])}}])},[n("div")]),t._v(" "),n("transition",{attrs:{name:"fade"}},[t.isShowAddWin?n("win",{attrs:{width:540,height:250},on:{winEvent:t.closeWin}},[n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),n("div",{attrs:{slot:"content",id:"addLabel"},slot:"content"},[n("ul",{staticClass:"creatLabel"},[n("li",[n("span",{staticClass:"labelLeft required"},[t._v("标签名称")]),t._v(" "),n("section",{staticClass:"labelRight"},[n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.name,expression:"name",modifiers:{trim:!0}}],staticClass:"inp",attrs:{type:"text",placeholder:"请输入标签名称",maxlength:"20"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])]),t._v(" "),n("li",[n("span",{staticClass:"labelLeft"},[t._v("排序")]),t._v(" "),n("section",{staticClass:"labelRight subadd"},[n("sub-add",{attrs:{bindnum:t.num,maxnum:1e3,minnum:1},on:{toClick:function(e){t.num=arguments[0]}}})],1)])])])]):t._e()],1),t._v(" "),n("transition",{attrs:{name:"fade"}},[t.isShowMemberWin?n("win",{attrs:{width:540,height:300},on:{winEvent:t.closeMemberWin}},[n("span",{attrs:{slot:"title"},slot:"title"},[t._v("提示")]),t._v(" "),n("div",{attrs:{slot:"content",id:"hintPop"},slot:"content"},[n("p",{staticClass:"content"},[t._v("确定\n\t\t\t\t\t"),1==t.textOn?[t._v("关闭")]:t._e(),t._v(" "),0==t.textOn?[t._v("开启")]:t._e(),t._v("该会员标签？")],2)])]):t._e()],1)],1)},[],!1,null,"bdefca90",null);e.default=u.exports},ca4b:function(t,e,n){"use strict";var a=n("a522");n.n(a).a}}]);