(window.webpackJsonp=window.webpackJsonp||[]).push([["staff_level"],{"4c31":function(t,e,n){},"744c":function(t,e,n){},b114:function(t,e,n){"use strict";var i=n("4c31");n.n(i).a},c35a:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"staffLevel"}},[n("com-table",{key:t.index,attrs:{listHeight:80,listWidth:1436,listName:"人员级别",showTitle:1,introData:t.levelist,titleData:t.titleList,allTotal:t.levelist.length,widthType:!0},scopedSlots:t._u([{key:"con-0",fn:function(e){return n("div",{staticClass:"btnLink"},[n("a",{attrs:{href:"javascript:;"},on:{click:function(n){t.openStore(e.data,"edi")}}},[t._v("编辑")]),t._v(" "),n("a",{attrs:{href:"javascript:;"},on:{click:function(n){t.deletLevel(e.data)}}},[t._v("删除")])])}},{key:"con-1",fn:function(e){return n("div",{staticClass:"btnLink_g"},[n("ul",[t._l(e.data.star,function(t,e){return n("li",{key:e,staticClass:"on"})}),t._v(" "),t._l(e.data.unstar,function(t,e){return n("li",{key:e+"_0"})})],2)])}}])}),t._v(" "),t.showWin?n(t.isPopupwindow,{tag:"component",attrs:{type:t.type,leveldetail:t.leveldetail},on:{getAppliedWin:t.getResult}}):t._e()],1)};i._withStripped=!0;var a=n("81a2"),r=n("bbb9"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Win",{attrs:{width:591,height:326,align:"center",ok:t.okStyle,cancel:t.cancelStyle},on:{winEvent:t.getAppliedWin}},[n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),n("div",{attrs:{slot:"content",id:"tan"},slot:"content"},[n("div",{staticClass:"mobilePhone"},[n("div",{staticClass:"phoneBox"},[n("div",{staticClass:"leftHalf required"},[t._v("\n\t\t\t\t\t累计达到\n\t\t\t\t")]),t._v(" "),n("div",{staticClass:"rightHalf"},[n("section",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.goldCoin,expression:"goldCoin"}],staticClass:"cumulative",attrs:{type:"text",placeholder:"请输入正整数",maxlength:"6",onkeyup:"value=value.replace(/[^\\d]/g,'')"},domProps:{value:t.goldCoin},on:{input:function(e){e.target.composing||(t.goldCoin=e.target.value)}}}),t._v(" "),n("span",[t._v("金币")])]),t._v(" "),n("span",{staticClass:"automatic"},[t._v("自动升级")])])]),t._v(" "),n("div",{staticClass:"phoneBox"},[n("div",{staticClass:"leftHalf required"},[t._v("\n\t\t\t\t\t名称\n\t\t\t\t")]),t._v(" "),n("div",{staticClass:"rightHalf"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"txt",attrs:{type:"text",placeholder:"请输入名称",maxlength:"20"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"phoneBox"},[n("div",{staticClass:"leftHalf"},[t._v("\n\t\t\t\t\t等级显示\n\t\t\t\t")]),t._v(" "),n("div",{staticClass:"rightHalf"},[n("ul",t._l(t.star,function(e,i){return n("li",{key:i,class:e.status?"on":"",on:{mouseover:function(e){t.selectStars("moveover",i)},mouseout:function(e){t.selectStars("moveout","")},click:function(e){t.selectStars("click",i)}}},[n("a",{attrs:{href:"javascript:;"}},[t._v(t._s(e.num))])])}))])])])])])};function l(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(a,r){try{var s=e[a](r),l=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(l).then(function(t){i("next",t)},function(t){i("throw",t)});t(l)}("next")})}}s._withStripped=!0;var o=/^[0-9]*[1-9][0-9]*$/,c={data:function(){return{title:"",okStyle:null,cancelStyle:null,star:[{num:1,status:!1},{num:2,status:!1},{num:3,status:!1},{num:4,status:!1},{num:5,status:!1}],iScore:0,iStar:0,name:"",goldCoin:"",count:0}},computed:{},props:{type:String,leveldetail:Object},methods:{getAppliedWin:function(t){var e=this;return l(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if("ok"!=t){n.next=20;break}if(""!=e.jtrim(e.goldCoin)){n.next=5;break}return e.$store.commit("setWin",{content:"请输入金币值",winType:"alert",title:"操作提示"}),n.abrupt("return",!1);case 5:if(o.test(e.goldCoin)){n.next=8;break}return e.$store.commit("setWin",{content:"金币值只能是正整数",winType:"alert",title:"操作提示"}),n.abrupt("return",!1);case 8:if(""!=e.jtrim(e.name)){n.next=12;break}return e.$store.commit("setWin",{content:"请输入人员等级名称",winType:"alert",title:"操作提示"}),n.abrupt("return",!1);case 12:if("view"!=e.type){n.next=17;break}return n.next=15,e.saveConfig({levelId:"",name:e.name,star:e.iStar,totalGold:e.goldCoin});case 15:n.next=20;break;case 17:if("edi"!=e.type){n.next=20;break}return n.next=20,e.saveConfig({levelId:e.leveldetail.id,name:e.name,star:e.iStar,totalGold:e.goldCoin});case 20:e.$emit("getAppliedWin",t);case 21:case"end":return n.stop()}},n,e)}))()},fnPoint:function(t){this.iScore=t||this.iStar;for(var e=0;e<this.star.length;e++)this.star[e].status=e<this.iScore},selectStars:function(t,e){switch(t){case"moveover":this.fnPoint(e+1);break;case"moveout":this.fnPoint();break;case"click":0==e?(this.count++,this.count%2==0?this.iStar=0:this.iStar=1):this.iStar=e+1}},jtrim:function(t){return t.replace(/(^\s*)|(\s*$)/g,"")},saveConfig:function(t){var e=this,n=t.levelId,i=t.name,r=t.star,s=t.totalGold;return l(regeneratorRuntime.mark(function t(){var l;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.a.AssaddOrEdit({data:{levelId:n,name:i,star:r,totalGold:s}});case 2:return l=t.sent,t.abrupt("return",l);case 4:case"end":return t.stop()}},t,e)}))()}},components:{Win:function(){return n.e("win").then(n.bind(null,"f60a"))}},mounted:function(){"edi"==this.type?(this.name=this.leveldetail.name,this.goldCoin=this.leveldetail.totalGold,this.iStar=this.leveldetail.star,this.fnPoint(this.iStar),this.title="编辑人员",this.okStyle={content:"保存",style:{backgroundColor:"#FF9800",color:"#fff"}},this.cancelStyle={content:"取消",style:{backgroundColor:"#A0A0A0",color:"#fff"}}):"view"==this.type&&(this.title="新增人员等级",this.okStyle={content:"确定",style:{backgroundColor:"#FF9800",color:"#fff"}},this.cancelStyle={content:"取消",style:{backgroundColor:"#A0A0A0",color:"#fff"}})}},u=(n("b114"),n("6ceb")),v=Object(u.a)(c,s,[],!1,null,"69d348c4",null);function d(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(a,r){try{var s=e[a](r),l=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(l).then(function(t){i("next",t)},function(t){i("throw",t)});t(l)}("next")})}}v.options.__file="src\\module\\seller_assistant\\staff_level_win.vue";var f={data:function(){return{index:null,titleList:[{titleName:"操作",titleStyle:{fontSize:"16px",width:"287px",flex:"none"}},{titleName:"等级显示",titleStyle:{fontSize:"16px",width:"574px",flex:"none"}},{titleName:"名称",dataName:"name",titleStyle:{fontSize:"16px",width:"287px",flex:"none"}},{titleName:"条件",dataName:"totalGold",titleStyle:{fontSize:"16px",width:"287px",flex:"none"}}],allTotal:0,showWin:!1,isPopupwindow:"",type:"",levelist:[],leveldetail:""}},methods:{openStore:function(t,e){this.showWin=!0,this.type=e,this.leveldetail=t,this.isPopupwindow="getAppliedWin"},getResult:function(t){"ok"==t&&this.getLevel(),this.showWin=!1},getLevel:function(){var t=this;return d(regeneratorRuntime.mark(function e(){var n,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.getListlevel({data:{}});case 2:if((n=e.sent)&&""!=n)for(t.levelist=n,t.levelist=r.a.sortByAll(t.levelist,["sort","star"],!0),i=0;i<t.levelist.length;i++)null==t.levelist[i].star&&(t.levelist[i].star=0),t.levelist[i].star=Number(t.levelist[i].star),t.levelist[i].unstar=5-Number(t.levelist[i].star);case 4:case"end":return e.stop()}},e,t)}))()},deletLevel:function(t){var e=this;this.$store.commit("setWin",{title:"温馨提示",winType:"confirm",content:"确定删除该等级",callback:function(n){"ok"==n&&e.deletLevels(t)}})},deletLevels:function(t){var e=this;return d(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.a.deletelevel({data:{levelId:t.id}});case 2:n.sent&&e.getLevel();case 4:case"end":return n.stop()}},n,e)}))()}},components:{comTable:function(){return n.e("table").then(n.bind(null,"4360"))},getAppliedWin:v.exports},mounted:function(){var t=this;this.$store.commit("setPageTools",{adduserLevel:function(){t.openStore({},"view")}}),this.getLevel()}},p=(n("f199"),Object(u.a)(f,i,[],!1,null,"3482d381",null));p.options.__file="src\\module\\seller_assistant\\staff_level.vue";e.default=p.exports},f199:function(t,e,n){"use strict";var i=n("744c");n.n(i).a}}]);