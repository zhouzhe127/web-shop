(window.webpackJsonp=window.webpackJsonp||[]).push([["job_manage_two"],{2377:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("win",{attrs:{align:"center",width:1e3,height:480},on:{winEvent:t.clickTanResult}},[e("span",{attrs:{slot:"title"},slot:"title"},[t._v("职位权限配置")]),t._v(" "),e("div",{attrs:{slot:"content"},slot:"content"},[t.tabList1&&t.tabList1.length>0?e("div",{staticClass:"permissions"},[e("div",{staticClass:"tas-addtas2"},[e("ul",t._l(t.tabList1,function(i,s){return e("li",{key:s,class:{"bgc-blue":t.tab1Index==s},on:{click:function(i){t.funSelectOne(s)}}},[t._v(t._s(i.title))])}))]),t._v(" "),e("div",{staticClass:"tas-addtas2"},[e("ul",t._l(t.tabList2,function(i,s){return e("li",{key:s,class:{"bgc-hui":t.tab2Index==s},on:{click:function(i){t.funSelectTwo(s)}}},[t._v(t._s(i.title))])}))]),t._v(" "),e("div",{staticClass:"selectbtns"},t._l(t.list,function(i,s){return e("span",{key:s,class:{sign:i.selected},on:{click:function(e){t.isSelected(i)}}},[t._v(t._s(i.title))])}))]):t._e(),t._v(" "),e("div",{staticStyle:{width:"100%",height:"40px","background-color":"#f7f7f7",position:"fixed",bottom:"50px",left:"0"}},[e("section",{staticClass:"isallselect",class:{allselect:!t.allSelect},on:{click:t.dellAll}},[t._v("取消全部")]),t._v(" "),e("section",{staticClass:"isallselect",class:{allselect:t.allSelect},on:{click:t.selectAll}},[t._v("选择全部")]),t._v(" "),e("h3",{staticStyle:{width:"160px",height:"40px","line-height":"40px",float:"right",color:"#FF9700"}},[t._v("已选择"+t._s(t.selectNum)+"个")])])])])};s._withStripped=!0;var l=e("81a2");var n={data:function(){return{nodeIds:[],tab1Index:0,tab2Index:0,tabList1:[],tabList2:[],list:[],newList:[],allSelect:!1,selectNum:0}},props:{info:Object},mounted:function(){this.nodeIds=this.info.nodeIds;for(var t=0;t<this.nodeIds.length;t++)this.nodeIds[t]=parseInt(this.nodeIds[t]);this.getPermissionsList()},methods:{getPermissionsList:function(){var t,i=this;return(t=regeneratorRuntime.mark(function t(){var e,s,n,c,h,a;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.newGetPermissionsList({data:{type:i.info.type}});case 2:if(e=t.sent){for(e=[{id:"0",title:"全部",child:[]}].concat(e),s=e,n=0;n<s.length;n++)if(s[n].child)for(c=0;c<s[n].child.length;c++)if(s[n].child[c].child)for(h=0;h<s[n].child[c].child.length;h++)for(s[n].child[c].child[h].selected=!1,a=0;a<i.nodeIds.length;a++)i.nodeIds[a]==s[n].child[c].child[h].id&&(s[n].child[c].child[h].selected=!0);i.tabList1=s,i.tab1Changed()}case 4:case"end":return t.stop()}},t,i)}),function(){var i=t.apply(this,arguments);return new Promise(function(t,e){return function s(l,n){try{var c=i[l](n),h=c.value}catch(t){return void e(t)}if(!c.done)return Promise.resolve(h).then(function(t){s("next",t)},function(t){s("throw",t)});t(h)}("next")})})()},funSelectOne:function(t){this.tab1Index=t,this.tab2Index=0},funSelectTwo:function(t){this.tab2Index=t},tab1Changed:function(t){if(this.tab1Index>0){var i=this.tabList1[this.tab1Index],e=this.tabList1[this.tab1Index].child?this.tabList1[this.tab1Index].child:[];e=[{id:"0",title:"全部",child:i}].concat(e),this.tabList2=e,this.tab2Changed(t)}else{for(var s=[],l=this.tabList1,n=0;n<l.length;n++)for(var c=0;c<l[n].child.length;c++)s=s.concat(l[n].child[c].child);this.list=s,this.newList=s;for(var h=0;h<this.list.length;h++)null!=this.list[h]&&void 0!=this.list[h]&&""!=this.list[h]||this.list.splice(h,1);if(this.tabList2=[],t)for(var a=0;a<this.list.length;a++)t.id==this.list[a].id&&(this.list[a].selected=!this.list[a].selected)}},tab2Changed:function(t){if(0!=this.tab2Index||0==this.tab1Index){if(this.tabList2.length>this.tab2Index&&(this.list=this.tabList2[this.tab2Index].child?this.tabList2[this.tab2Index].child:[]),t)for(var i=0;i<this.list.length;i++)t.id==this.list[i].id&&(this.list[i].selected=!this.list[i].selected)}else{for(var e=[],s=this.tabList1[this.tab1Index].child,l=0;l<s.length;l++)e=e.concat(s[l].child);this.list=e;for(var n=0;n<this.list.length;n++)null!=this.list[n]&&void 0!=this.list[n]&&""!=this.list[n]||this.list.splice(n,1);if(t)for(var c=0;c<this.list.length;c++)t.id==this.list[c].id&&(this.list[c].selected=!this.list[c].selected)}},selectAll:function(){this.allSelect=!0;for(var t=0;t<this.list.length;t++)this.list[t].selected=!0},dellAll:function(){this.allSelect=!1;for(var t=0;t<this.list.length;t++)this.list[t].selected=!1},isSelected:function(t){this.tab1Changed(t)},clickTanResult:function(t){if("ok"==t){for(var i=this.tabList1,e=[],s=0;s<i.length;s++)for(var l=0;l<i[s].child.length;l++)for(var n=0;n<i[s].child[l].child.length;n++)i[s].child[l].child[n].selected&&e.push(i[s].child[l].child[n].id);this.info.nodeIds=e}this.$emit("throwTanResult",t)}},watch:{tab1Index:"tab1Changed",tab2Index:"tab2Changed",list:{deep:!0,handler:function(){for(var t=this.newList,i=[],e=0;e<t.length;e++)1==t[e].selected&&i.push(t[e]);this.selectNum=i.length}}},components:{win:function(){return e.e("win").then(e.bind(null,"f60a"))}}},c=(e("c5d9"),e("7610")),h=Object(c.a)(n,s,[],!1,null,"359e2442",null);h.options.__file="src\\module\\shop_config\\job_manage_two.vue";i.default=h.exports},7668:function(t,i,e){},c5d9:function(t,i,e){"use strict";var s=e("7668");e.n(s).a}}]);