(window.webpackJsonp=window.webpackJsonp||[]).push([["addcause_win"],{"0b11":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("win",{attrs:{align:"center",width:580,height:300},on:{winEvent:t.getCauseName}},[n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),n("div",{attrs:{slot:"content",id:"tan"},slot:"content"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.titleName,expression:"titleName"}],attrs:{type:"text",placeholder:"请输入名称",maxlength:"30"},domProps:{value:t.titleName},on:{input:function(e){e.target.composing||(t.titleName=e.target.value)}}})])])],1)};i._withStripped=!0;var a={data:function(){return{title:"",titleName:""}},props:["type"],mounted:function(){1==this.type?this.title="新增下架原因":this.title="新增耗损原因"},methods:{getCauseName:function(t){this.$emit("add-cause",t,this.titleName)}},components:{win:function(){return n.e("win").then(n.bind(null,"f60a"))}}},s=(n("a465"),n("7610")),o=Object(s.a)(a,i,[],!1,null,"1b7a0ead",null);o.options.__file="src\\module\\invoicing_system\\config_manage\\addcause_win.vue";e.default=o.exports},a465:function(t,e,n){"use strict";var i=n("fadd");n.n(i).a},fadd:function(t,e,n){}}]);