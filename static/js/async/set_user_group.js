(window.webpackJsonp=window.webpackJsonp||[]).push([["set_user_group"],{"0bcc":function(t,e,n){"use strict";var s=n("a902");n.n(s).a},"1ed7":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("win",{attrs:{width:591,height:350},on:{winEvent:t.winEvent}},[n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),n("div",{staticClass:"user_group_content",attrs:{slot:"content"},slot:"content"},[n("mul-select",{key:"id",attrs:{isradio:1==t.index,styles:{minWidth:"101px",margin:"5px",backgroundColor:"rgb(236,236,236)"},list:t.list,selects:t.result,name:"name"},on:{"update:list":function(e){t.list=e},"update:selects":function(e){t.result=e}}})],1)])};s._withStripped=!0;var i={data:function(){return{list:this.showList,result:[],title:""}},props:["showList","index"],methods:{winEvent:function(t){"ok"==t?this.$emit("closeWin",{data:this.result}):this.$emit("closeWin")},editUserGroup:function(){this.index}},mounted:function(){1==this.index?this.title="设置用户组":this.title="设置标签"},components:{win:function(){return n.e("win").then(n.bind(null,"f60a"))},"mul-select":function(){return n.e("mul_select").then(n.bind(null,"7d09"))}}},l=(n("0bcc"),n("6ceb")),o=Object(l.a)(i,s,[],!1,null,"c64eb1c8",null);o.options.__file="src\\module\\seller_assistant\\set_user_group.vue";e.default=o.exports},a902:function(t,e,n){}}]);