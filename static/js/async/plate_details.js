(window.webpackJsonp=window.webpackJsonp||[]).push([["plate_details"],{"788e":function(t,i,e){},"8a30":function(t,i,e){"use strict";var a=e("788e");e.n(a).a},b6e3:function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"plate_div"}},[t._m(0),t._v(" "),e("section",{staticClass:"ic-contern"},[e("div",{staticClass:"all-contern"},[e("span",{staticClass:"span_contern"},[t._v("领料人："+t._s(t.detail.ownerName))]),t._v(" "),e("span",{staticClass:"span_contern"},[t._v("操作人："+t._s(t.detail.creatorName))]),t._v(" "),e("span",{staticClass:"span_contern"},[t._v(" 备注："+t._s(t.detail.remarks?t.detail.remarks:"--"))])])]),t._v(" "),e("div",{staticClass:"list_num"},[e("section",{staticClass:"totle"},[e("div",{staticClass:"head"},[t._v("\n\t\t\t\t所领物料 · 共"),e("span",{staticClass:"wen_zi"},[t._v(t._s(t.detailList.length))]),t._v("个条目\n\t\t\t\t"),e("span",{staticClass:"changeList",on:{click:function(i){t.changeList()}}},[t._v(t._s(t.isChangeList?"简洁":"详细"))])]),t._v(" "),t._m(1),t._v(" "),0==t.detailList.length?e("ul",{staticClass:"no_record"},[e("li",[t._v("无记录")])]):t._e(),t._v(" "),t._l(t.detailList,function(i,a){return 0!=t.detailList.length?e("section",{key:a,staticStyle:{clear:"both"}},[e("ul",{staticClass:"oUl oulSecond"},[e("li",[t._v("\n\t\t\t\t\t\t"+t._s(a+1)+"\n\t\t\t\t\t")]),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:i.materialName}},[t._v(t._s(i.materialName))]),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:i.materialCategoryName}},[t._v(t._s(i.materialCategoryName))]),t._v(" "),e("li",[t._v(t._s(t.getType(i.materialType)))]),t._v(" "),e("li",{staticStyle:{"line-height":"0","margin-top":"15px"},on:{click:function(e){t.backItem(i,i.index)}}},[e("selectBtn",{attrs:{sorts:i.unitList,index:i.index,width:"80"},on:{emit:t.selectType}})],1),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:i.number}},[t._v(t._s(i.number))]),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:i.backJ}},[t._v(t._s(i.backJ))]),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:i.beforeJ}},[t._v(t._s(i.beforeJ))]),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:i.afterJ}},[t._v(t._s(i.afterJ))])]),t._v(" "),e("section",{staticStyle:{"border-bottom":"3px solid #f7f7f7"}},[t.isChangeList&&0!=i.batch.length?e("ul",{staticClass:"oulThd font16"},[e("li",[t._v("序号")]),t._v(" "),e("li",[t._v("批次编码")]),t._v(" "),e("li",[t._v("生产日期")]),t._v(" "),e("li",[t._v("供应商")]),t._v(" "),e("li",[t._v("进价")]),t._v(" "),e("li",[t._v("所属仓库")]),t._v(" "),e("li",[t._v("领料消耗")]),t._v(" "),e("li",[t._v("领料回库")]),t._v(" "),e("li",[t._v("领料人盘库前")]),t._v(" "),e("li",[t._v("领料人盘库后")])]):t._e(),t._v(" "),t._l(i.batch,function(a,s){return t.isChangeList&&0!=i.batch.length?e("ul",{key:s,staticClass:"oulThd"},[e("li",[t._v("批次"+t._s(s+1))]),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:a.batchCode}},[t._v(t._s(a.batchCode))]),t._v(" "),e("li",[t._v(t._s(t.transformTime(a.productionTime)))]),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:a.supplier}},[t._v(t._s(a.supplier))]),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:a.purchasePrice}},[t._v(t._s(a.purchasePrice))]),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:a.warehouseName+"-"+a.areaName}},[t._v(t._s(a.warehouseName)+"-"+t._s(a.areaName))]),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:a.number}},[t._v(t._s(a.number))]),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:a.backJ}},[t._v(t._s(a.backJ))]),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:a.beforeJ}},[t._v(t._s(a.beforeJ))]),t._v(" "),e("li",{staticClass:"over_hide",attrs:{title:a.afterJ}},[t._v(t._s(a.afterJ))])]):t._e()})],2)]):t._e()})],2)])])};a._withStripped=!0;var s=e("f6ce"),n=e("bbb9"),l=e("81a2"),r=e("05dd");var c={data:function(){return{detailList:[],fromPicking:{},isChangeList:!1,item:{},detail:{}}},mounted:function(){var t=this;this.$store.commit("setHeaderTil",{type:"push",params:[{title:"查看详情"}]});var i=[{name:"返回",className:"huiC",fn:function(){s.a.session("listDetail",null),s.a.session("isBackPickingRecord",!0),t.$router.push({path:"../pickingList",query:t.$route.query})}}];this.$store.commit("setPageTools",i),this.fromPicking=s.a.session("listDetail"),this.initOne()},destroyed:function(){s.a.session("listDetail",null)},methods:{changeList:function(){this.isChangeList=!this.isChangeList},getType:function(t){var i={0:"物料"};for(var e in i)if(e==t)return i[e];return"--"},selectType:function(t){this.backItem(this.item,t)},backItem:function(t,i){this.item=t,t.index=i;for(var e=t.unitList[i],a="",s=0;s<t.materialUnit.length;s++)t.materialUnit[s].name==e&&(a=t.materialUnit[s].value);if(t.number=r.a.comUnit(t.consumeNum,a,e,t.minName),t.backJ=r.a.comUnit(t.returnNum,a,e,t.minName),t.beforeJ=r.a.comUnit(t.initialNum,a,e,t.minName),t.afterJ=r.a.comUnit(t.surplus,a,e,t.minName),t.batch&&0!=t.batch.length)for(var n=0;n<t.batch.length;n++)t.batch[n].number=r.a.comUnit(t.batch[n].consumeNum,a,e,t.minName),t.batch[n].backJ=r.a.comUnit(t.batch[n].returnNum,a,e,t.minName),t.batch[n].beforeJ=r.a.comUnit(t.batch[n].initialNum,a,e,t.minName),t.batch[n].afterJ=r.a.comUnit(t.batch[n].surplus,a,e,t.minName)},unitConversion:function(){for(var t=0;t<this.detailList.length;t++){for(var i=[],e=0;e<this.detailList[t].materialUnit.length;e++){1==this.detailList[t].materialUnit[e].isDefault&&(this.detailList[t].defaultName=this.detailList[t].materialUnit[e].name,this.detailList[t].defaultValue=this.detailList[t].materialUnit[e].value),1==this.detailList[t].materialUnit[e].isMin&&(this.detailList[t].minName=this.detailList[t].materialUnit[e].name),i=i.concat(this.detailList[t].materialUnit[e].name);for(var a=0;a<i.length;a++)if(i[a]==this.detailList[t].defaultName){var s=i.splice(a,1);i.unshift(s[0])}this.detailList[t].unitList=i}this.detailList[t].index=0;var n=this.detailList[t].defaultValue,l=this.detailList[t].defaultName,c=this.detailList[t].minName;if(this.detailList[t].number=r.a.comUnit(this.detailList[t].consumeNum,n,l,c),this.detailList[t].backJ=r.a.comUnit(this.detailList[t].returnNum,n,l,c),this.detailList[t].beforeJ=r.a.comUnit(this.detailList[t].initialNum,n,l,c),this.detailList[t].afterJ=r.a.comUnit(this.detailList[t].surplus,n,l,c),this.detailList[t].batch&&0!=this.detailList[t].batch.length)for(var o=0;o<this.detailList[t].batch.length;o++)this.detailList[t].batch[o].number=r.a.comUnit(this.detailList[t].batch[o].consumeNum,n,l,c),this.detailList[t].batch[o].backJ=r.a.comUnit(this.detailList[t].batch[o].returnNum,n,l,c),this.detailList[t].batch[o].beforeJ=r.a.comUnit(this.detailList[t].batch[o].initialNum,n,l,c),this.detailList[t].batch[o].afterJ=r.a.comUnit(this.detailList[t].batch[o].surplus,n,l,c)}},initOne:function(){var t,i=this;return(t=regeneratorRuntime.mark(function t(){var e,a,s;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.getCheckMaterialRecord({data:{id:i.fromPicking.id}});case 2:if(e=t.sent){for(i.detail=n.a.deepCopy(e),a=0;a<e.material.length;a++)if(e.material[a].number="",e.material[a].backJ="",e.material[a].beforeJ="",e.material[a].afterJ="",e.material[a].batch&&0!=e.material[a].batch.length)for(s=0;s<e.material[a].batch.length;s++)e.material[a].batch[s].number="",e.material[a].batch[s].backJ="",e.material[a].batch[s].beforeJ="",e.material[a].batch[s].afterJ="";i.detailList=n.a.deepCopy(e.material),i.unitConversion()}case 4:case"end":return t.stop()}},t,i)}),function(){var i=t.apply(this,arguments);return new Promise(function(t,e){return function a(s,n){try{var l=i[s](n),r=l.value}catch(t){return void e(t)}if(!l.done)return Promise.resolve(r).then(function(t){a("next",t)},function(t){a("throw",t)});t(r)}("next")})})()},transformTime:function(t){return n.a.format(new Date(1e3*Number(t)),"yyyy-MM-dd")}},components:{selectBtn:function(){return e.e("select_btn").then(e.bind(null,"3d41"))}}},o=(e("8a30"),e("7610")),_=Object(o.a)(c,a,[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"ic-title"},[i("div",{staticClass:"text"},[this._v("\n\t\t\t领料盘库详情\n\t\t")]),this._v(" "),i("div",{staticClass:"dashed"})])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("ul",{staticClass:"oUl oulFirst"},[e("li",[t._v("序号")]),t._v(" "),e("li",[t._v("物料名")]),t._v(" "),e("li",[t._v("分类")]),t._v(" "),e("li",[t._v("类型")]),t._v(" "),e("li",[t._v("领料单位选择")]),t._v(" "),e("li",[t._v("领料消耗")]),t._v(" "),e("li",[t._v("领料回库")]),t._v(" "),e("li",[t._v("领料人盘库前")]),t._v(" "),e("li",[t._v("领料人盘库后")])])}],!1,null,"0dbf0c72",null);_.options.__file="src\\module\\invoicing_system\\picking_list\\plate_details.vue";i.default=_.exports}}]);