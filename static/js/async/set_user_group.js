(window.webpackJsonp=window.webpackJsonp||[]).push([["set_user_group"],{"1ed7":function(t,n,e){"use strict";e.r(n);var i={data:function(){return{list:this.showList,result:[],title:""}},props:["showList","index"],methods:{winEvent:function(t){"ok"==t?this.$emit("closeWin",{data:this.result}):this.$emit("closeWin")},editUserGroup:function(){this.index}},mounted:function(){1==this.index?this.title="设置用户组":this.title="设置标签"},components:{win:function(){return e.e("win").then(e.bind(null,"f60a"))},"mul-select":function(){return e.e("mul_select").then(e.bind(null,"7d09"))}}},s=(e("e554"),e("d801")),l=Object(s.a)(i,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("win",{attrs:{width:591,height:350},on:{winEvent:t.winEvent}},[e("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),e("div",{staticClass:"user_group_content",attrs:{slot:"content"},slot:"content"},[e("mul-select",{key:"id",attrs:{isradio:1==t.index,styles:{minWidth:"101px",margin:"5px",backgroundColor:"rgb(236,236,236)"},list:t.list,selects:t.result,name:"name"},on:{"update:list":function(n){t.list=n},"update:selects":function(n){t.result=n}}})],1)])},[],!1,null,"194b976f",null);n.default=l.exports},e554:function(t,n,e){"use strict";var i=e("f365");e.n(i).a},f365:function(t,n,e){}}]);