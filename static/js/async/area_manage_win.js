(window.webpackJsonp=window.webpackJsonp||[]).push([["area_manage_win"],{"1a00":function(e,t,n){"use strict";var r=n("5af4");n.n(r).a},"5af4":function(e,t,n){},adfa:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("win",{attrs:{align:"right",width:580,height:"auto",ok:e.okStyle,cancel:e.cancelStyle},on:{winEvent:e.clickResult}},[n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.title))]),e._v(" "),n("div",{attrs:{slot:"content"},slot:"content"},[n("div",{staticClass:"tas-addtas",attrs:{id:"area-window"}},[n("el-form",{ref:"getOneArea",attrs:{model:e.getOneArea,"label-width":"100px"}},[n("el-form-item",{attrs:{required:"",label:"区域名称"}},[n("el-input",{staticStyle:{width:"300px"},attrs:{maxlength:"20",placeholder:"请输入区域名称"},model:{value:e.getOneArea.areaName,callback:function(t){e.$set(e.getOneArea,"areaName",t)},expression:"getOneArea.areaName"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"排序"}},[n("el-input-number",{staticStyle:{width:"150px"},attrs:{min:1,max:255},model:{value:e.getOneArea.sort,callback:function(t){e.$set(e.getOneArea,"sort",t)},expression:"getOneArea.sort"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"描述"}},[n("el-input",{staticStyle:{width:"360px"},attrs:{type:"textarea",maxlength:"50",placeholder:"请输入区域描述"},model:{value:e.getOneArea.description,callback:function(t){e.$set(e.getOneArea,"description",t)},expression:"getOneArea.description"}})],1)],1)],1)])])};r._withStripped=!0;var a=n("81a2");function i(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function r(a,i){try{var s=t[a](i),o=s.value}catch(e){return void n(e)}if(!s.done)return Promise.resolve(o).then(function(e){r("next",e)},function(e){r("throw",e)});e(o)}("next")})}}var s={data:function(){return{title:"",getOneArea:{},cancelStyle:null,okStyle:null}},props:{isAdd:null,areaId:"",shopId:""},mounted:function(){this.isAdd?(this.title="新建区域",this.cancelStyle=null,this.okStyle={content:"保存",style:{backgroundColor:"#29ABE2",color:"#fff"}}):this.isAdd||(this.title="编辑区域",this.okStyle={content:"保存",style:{backgroundColor:"#29ABE2",color:"#fff"}},this.cancelStyle={content:"删除",style:{backgroundColor:"red",color:"#fff "}}),this.getOneAreaInfo()},methods:{change:function(e){this.getOneArea.sort=e},getOneAreaInfo:function(){var e=this;return i(regeneratorRuntime.mark(function t(){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.isAdd){t.next=7;break}return t.next=3,a.a.getOneAreaInfo({data:{shopId:e.shopId,id:e.areaId}});case 3:(n=t.sent)&&(e.getOneArea=n),t.next=8;break;case 7:e.isAdd&&(e.getOneArea={areaName:"",description:"",sort:1});case 8:case"end":return t.stop()}},t,e)}))()},createArea:function(){var e=this;return i(regeneratorRuntime.mark(function t(){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.a.createArea({data:{shopId:e.shopId,areaName:e.getOneArea.areaName,description:e.getOneArea.description,sort:e.getOneArea.sort,createUid:"1"}});case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}},t,e)}))()},editArea:function(e){var t=this;return i(regeneratorRuntime.mark(function n(){var r;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.a.editArea({data:{shopId:t.shopId,id:t.areaId,areaName:e.areaName,description:e.description,sort:e.sort}});case 2:return r=n.sent,n.abrupt("return",r);case 4:case"end":return n.stop()}},n,t)}))()},deleteArea:function(){var e=this;return i(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.a.deleteArea({data:{shopId:e.shopId,id:e.areaId}});case 2:return t.abrupt("return");case 3:case"end":return t.stop()}},t,e)}))()},clickResult:function(e){var t=this;if("ok"==e){if(""==this.getOneArea.areaName.trim())return this.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"区域名不能为空！"}),!1;if(!this.getOneArea.sort)return this.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"请正确排序"}),!1;this.isAdd?this.createArea().then(function(n){t.$emit("throwWinResult",e,n)}):this.isAdd||this.editArea(this.getOneArea).then(function(n){t.$emit("throwWinResult",e,n)})}else"cancel"==e?this.isAdd?this.$emit("throwWinResult",e):this.isAdd||this.$store.commit("setWin",{title:"操作提示",winType:"confirm",content:"确认删除区域"+this.getOneArea.areaName+"？",callback:function(n){"ok"==n&&t.deleteArea().then(function(){t.$emit("throwWinResult",e,t.getOneArea)})}}):this.$emit("throwWinResult",e)}},components:{win:function(){return n.e("win").then(n.bind(null,"f60a"))},subadd:function(){return n.e("subadd").then(n.bind(null,"e7ea"))}}},o=(n("1a00"),n("6ceb")),c=Object(o.a)(s,r,[],!1,null,"55ea764e",null);c.options.__file="src\\module\\shop_config\\area_manage_win.vue";t.default=c.exports}}]);