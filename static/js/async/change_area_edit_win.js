(window.webpackJsonp=window.webpackJsonp||[]).push([["change_area_edit_win"],{"66e3":function(e,t,a){},a981:function(e,t,a){"use strict";var n=a("66e3");a.n(n).a},fa4c:function(e,t,a){"use strict";a.r(t);var n=a("81a2");function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,a){return function n(r,i){try{var s=t[r](i),o=s.value}catch(e){return void a(e)}if(!s.done)return Promise.resolve(o).then(function(e){n("next",e)},function(e){n("throw",e)});e(o)}("next")})}}var i={data:function(){return{areaName:"",titleName:"修改区域",requestData:null,type:"",oldName:""}},props:["winOpen"],mounted:function(){this.requestData=this.winOpen,this.type=this.requestData.type,this.requestData.name&&(this.areaName=this.requestData.name,this.oldName=this.requestData.name),"edit"==this.type?this.titleName="修改区域":"add"==this.type&&(this.titleName="添加区域")},methods:{clickResult:function(e){"ok"==e?this.confirmMethod():this.$emit("emit",!1)},confirmMethod:function(){if(this.areaName){var e=this.requestData.type;"edit"==e?this.editArea():"add"==e&&this.addArea()}else this.$store.commit("setWin",{title:"提示信息",content:"区域名不能为空"})},editArea:function(){var e=this;return r(regeneratorRuntime.mark(function t(){var a;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.oldName!=e.areaName){t.next=3;break}return e.$store.commit("setWin",{title:"提示信息",content:"区域名称已存在"}),t.abrupt("return");case 3:return t.next=5,n.a.editWarehouseArea({data:{name:e.areaName,wid:e.requestData.wid,id:e.requestData.id}});case 5:t.sent&&(a={type:"edit",id:e.requestData.id,name:e.areaName},e.$emit("emit",a));case 7:case"end":return t.stop()}},t,e)}))()},addArea:function(){var e=this;return r(regeneratorRuntime.mark(function t(){var a;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.addWarehouseArea({data:{name:e.areaName,wid:e.requestData.wid,id:e.requestData.id}});case 2:t.sent&&(a={type:"add",id:e.requestData.id,name:e.areaName},e.$emit("emit",a));case 4:case"end":return t.stop()}},t,e)}))()}},components:{win:function(){return a.e("win").then(a.bind(null,"f60a"))}}},s=(a("a981"),a("d801")),o=Object(s.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("win",{attrs:{align:"center",width:450,height:"auto",type:"confirm"},on:{winEvent:e.clickResult}},[a("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.titleName))]),e._v(" "),a("div",{staticClass:"content",attrs:{slot:"content"},slot:"content"},["edit"==e.type?a("div",{staticClass:"input-box"},[e._v("\n\t\t\t区域名称 "),a("em",[e._v("*")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.areaName,expression:"areaName"}],attrs:{type:"text",placeholder:"区域名称",maxlength:"20"},domProps:{value:e.areaName},on:{input:function(t){t.target.composing||(e.areaName=t.target.value)}}})]):e._e(),e._v(" "),"add"==e.type?a("div",{staticClass:"input-box"},[e._v("\n\t\t\t区域名称 "),a("em",[e._v("*")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.areaName,expression:"areaName"}],attrs:{type:"text",placeholder:"区域名称",maxlength:"20"},domProps:{value:e.areaName},on:{input:function(t){t.target.composing||(e.areaName=t.target.value)}}})]):e._e()])])},[],!1,null,"9e2d3972",null);t.default=o.exports}}]);