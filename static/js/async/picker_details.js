(window.webpackJsonp=window.webpackJsonp||[]).push([["picker_details"],{"4a36":function(t,e,i){},"7f09":function(t,e,i){"use strict";var a=i("4a36");i.n(a).a},ffec:function(t,e,i){"use strict";i.r(e);var a=i("f6ce"),s=i("bbb9"),n=i("81a2"),l=i("05dd");function r(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function a(s,n){try{var l=e[s](n),r=l.value}catch(t){return void i(t)}if(!l.done)return Promise.resolve(r).then(function(t){a("next",t)},function(t){a("throw",t)});t(r)}("next")})}}var o={data:function(){return{detailList:[],recordId:"",isChangeList:!1,isPickerDetail:!0,item:{},detail:{},info:"",isBack:!0}},mounted:function(){this.recordId=this.$route.query.id,this.info=a.a.session("info"),this.initBtn()},methods:{initBtn:function(){var t=this;if(this.recordId){this.$store.commit("setHeaderTil",{type:"push",params:[{title:"查看详情"}]});var e=[{name:"返回",className:"info",type:4,fn:function(){a.a.session("isBackPickingRecord",!0),window.history.go(-1)}}];this.$store.commit("setPageTools",e),this.initOne()}else{this.$store.commit("setHeaderTil",{type:"push",params:[{title:"领料人详情"}]});var i=[{name:"领料盘库",className:"primary",type:4,fn:function(){t.isPickerDetail=!1;var e={storageInfo:t.detailList,info:t.info};a.a.session("plateStorage",e),t.$router.push({path:"../pickingList/plateStorage",query:t.$route.query})}},{name:"返回",className:"info",type:4,fn:function(){t.$store.commit("setPageTools",{}),a.a.session("numType",{num:1}),t.$router.push({path:"../pickingList",query:t.$route.query})}}];this.$store.commit("setPageTools",i),this.getDetailByOwner()}},getType:function(t){var e={0:"成品",1:"半成品",2:"普通物料"};for(var i in e)if(i==t)return e[i];return"--"},changeList:function(){this.isChangeList=!this.isChangeList},backItem:function(t,e){t.indexDe=e;for(var i="",a="",s=0;s<t.materialUnit.length;s++)if(t.materialUnit[s].muId==e){a=t.materialUnit[s].value,i=t.materialUnit[s].name;break}if(t.showSurplus=l.a.comUnit(t.surplus,a,i,t.minName),t.batch&&0!=t.batch.length)for(var n=0;n<t.batch.length;n++)t.batch[n].showSurplus=l.a.comUnit(t.batch[n].surplus,a,i,t.minName)},unitConversion:function(){for(var t=0;t<this.detailList.length;t++){for(var e=[],i=0;i<this.detailList[t].materialUnit.length;i++){1==this.detailList[t].materialUnit[i].isDefault&&(this.detailList[t].defaultName=this.detailList[t].materialUnit[i].name,this.detailList[t].defaultValue=this.detailList[t].materialUnit[i].value),1==this.detailList[t].materialUnit[i].isMin&&(this.detailList[t].minName=this.detailList[t].materialUnit[i].name);var a={value:this.detailList[t].materialUnit[i].muId,label:this.detailList[t].materialUnit[i].name};e.push(a)}for(var s=0;s<e.length;s++)if(e[s].label==this.detailList[t].defaultName){var n=e.splice(s,1);e.unshift(n[0])}if(this.$set(this.detailList[t],"unitList",e),this.$set(this.detailList[t],"indexDe",e[0].value),this.detailList[t].showSurplus=l.a.comUnit(this.detailList[t].surplus,this.detailList[t].defaultValue,this.detailList[t].defaultName,this.detailList[t].minName),this.detailList[t].batch&&0!=this.detailList[t].batch.length)for(var r=0;r<this.detailList[t].batch.length;r++)this.detailList[t].batch[r].showSurplus=l.a.comUnit(this.detailList[t].batch[r].surplus,this.detailList[t].defaultValue,this.detailList[t].defaultName,this.detailList[t].minName)}},getDetailByOwner:function(){var t=this;return r(regeneratorRuntime.mark(function e(){var i,a,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.getDetailByOwner({data:{owner:t.info.id}});case 2:if(i=e.sent){for(a=0;a<i.length;a++)if(i[a].showSurplus="",i[a].useNum="",i[a].useWeight="",i[a].backNum="",i[a].backWeight="",i[a].usemin="",i[a].backmin="",i[a].selUnit="",i[a].unit="",i[a].index=0,i[a].batch&&0!=i[a].batch.length)for(l=0;l<i[a].batch.length;l++)i[a].batch[l].useNum="",i[a].batch[l].useWeight="",i[a].batch[l].backNum="",i[a].batch[l].backWeight="",i[a].batch[l].usemin="",i[a].batch[l].backmin="",i[a].batch[l].selUnit="",i[a].batch[l].unit="",i[a].batch[l].showSurplus="";t.detailList=s.a.deepCopy(i),t.unitConversion()}case 4:case"end":return e.stop()}},e,t)}))()},initOne:function(){var t=this;return r(regeneratorRuntime.mark(function e(){var i,a,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.MaterialreceiveGetLogDetail({data:{id:t.recordId}});case 2:if(i=e.sent){for(t.detail=i,a=0;a<i.material.length;a++)if(i.material[a].showSurplus="",i.material[a].surplus=i.material[a].number,i.material[a].batch&&0!=i.material[a].batch.length)for(l=0;l<i.material[a].batch.length;l++)i.material[a].batch[l].showSurplus="",i.material[a].batch[l].surplus=i.material[a].batch[l].number;t.detailList=s.a.deepCopy(i.material),t.unitConversion()}case 4:case"end":return e.stop()}},e,t)}))()},transformTime:function(t){return s.a.format(new Date(1e3*Number(t)),"yyyy-MM-dd")},storageReturn:function(t){var e=this;this.isPickerDetail=t,Promise.resolve().then(function(){e.initBtn()})}},components:{plateStorage:function(){return i.e("plate_storage").then(i.bind(null,"f756"))},selectBtn:function(){return i.e("select_btn").then(i.bind(null,"3d41"))}}},c=(i("7f09"),i("d801")),u=Object(c.a)(o,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"people_del"}},[t.isPickerDetail?i("div",[i("div",{staticClass:"ic-title"},[i("div",{staticClass:"text"},[t._v("\n\t\t\t  "+t._s(t.recordId?"领料详情":"领料人详情")+"\n\t\t\t")]),t._v(" "),i("div",{staticClass:"dashed"})]),t._v(" "),t.recordId?t._e():[i("section",{staticClass:"ic-contern"},[i("div",{staticClass:"all-contern"},[i("span",{staticClass:"span_contern"},[t._v("领料人："+t._s(t.info.name))])])])],t._v(" "),t.recordId?[i("section",{staticClass:"ic-contern"},[i("div",{staticClass:"all-contern"},[t._v("\n\t\t\t\t\t领料原因："+t._s(t.detail.reason)+"\n\t\t\t\t")]),t._v(" "),i("div",{staticClass:"all-contern"},[i("span",{staticClass:"span_contern"},[t._v("领料人："+t._s(t.detail.ownerName))]),t._v(" "),i("span",{staticClass:"span_contern"},[t._v("操作人："+t._s(t.detail.creatorName))])]),t._v(" "),i("div",{staticClass:"all-contern"},[t._v("\n\t\t\t\t\t备注："+t._s(t.detail.remarks?t.detail.remarks:"--")+"\n\t\t\t\t")])])]:t._e(),t._v(" "),i("div",{staticClass:"list_num"},[i("section",{staticClass:"totle"},[i("div",{staticClass:"head"},[t._v("\n\t\t\t\t\t所领物料 · 共"),i("span",{staticClass:"wen_zi"},[t._v(t._s(t.detailList.length))]),t._v("个条目\n\t\t\t\t\t"),i("span",{staticClass:"changeList",on:{click:function(e){t.changeList()}}},[t._v(t._s(t.isChangeList?"简洁":"详细"))])]),t._v(" "),i("ul",{staticClass:"oUl oulFirst"},[i("li",{staticClass:"narrow"},[t._v("序号")]),t._v(" "),i("li",[t._v("物料名")]),t._v(" "),i("li",[t._v("分类")]),t._v(" "),i("li",[t._v("类型")]),t._v(" "),i("li",[t._v("领料单位选择")]),t._v(" "),i("li",[t._v(t._s(t.recordId?"领料数量/重量":"剩余数量/重量"))])]),t._v(" "),0==t.detailList.length?i("ul",{staticStyle:{width:"100%",color:"orange"}},[i("li",{staticStyle:{height:"50px","line-height":"50px","text-align":"center"}},[t._v("无记录")])]):t._e(),t._v(" "),i("div",{staticClass:"scroll-box"},t._l(t.detailList,function(e,a){return 0!=t.detailList.length?i("section",{key:a,staticClass:"list-box"},[i("ul",{staticClass:"oUl oulSecond"},[i("li",{staticClass:"narrow"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(a+1)+"\n\t\t\t\t\t\t\t")]),t._v(" "),i("li",{staticClass:"over_hide",attrs:{title:e.materialName}},[t._v(t._s(e.materialName))]),t._v(" "),i("li",{staticClass:"over_hide",attrs:{title:e.materialCategoryName}},[t._v(t._s(e.materialCategoryName))]),t._v(" "),i("li",[t._v(t._s(t.getType(e.materialType)))]),t._v(" "),i("li",{staticStyle:{"line-height":"0","padding-top":"15px"}},[i("el-select",{staticStyle:{width:"100px"},on:{change:function(i){t.backItem(e,i)}},model:{value:e.indexDe,callback:function(i){t.$set(e,"indexDe",i)},expression:"item.indexDe"}},t._l(e.unitList,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),i("li",{staticClass:"over_hide",attrs:{title:e.showSurplus}},[t._v(t._s(e.showSurplus))])]),t._v(" "),t.isChangeList&&e.batch&&0!=e.batch.length?i("div",{staticClass:"sec-box"},[i("ul",{staticClass:"oulThd font16"},[i("li",[t._v("序号")]),t._v(" "),i("li",[t._v("批次编码")]),t._v(" "),i("li",[t._v("生产日期")]),t._v(" "),i("li",[t._v("供应商")]),t._v(" "),i("li",[t._v("进价")]),t._v(" "),i("li",[t._v("所属仓库")]),t._v(" "),i("li",[t._v(t._s(t.recordId?"领料数量/重量":"剩余数量/重量"))])]),t._v(" "),t._l(e.batch,function(e,a){return i("ul",{key:a,staticClass:"oulThd"},[i("li",[t._v("批次"+t._s(a+1))]),t._v(" "),i("li",{staticClass:"over_hide",attrs:{title:e.batchCode}},[t._v(t._s(e.batchCode))]),t._v(" "),i("li",[t._v(t._s(t.transformTime(e.productionTime)))]),t._v(" "),i("li",{staticClass:"over_hide",attrs:{title:e.supplier}},[t._v(t._s(e.supplier))]),t._v(" "),i("li",{staticClass:"over_hide",attrs:{title:e.purchasePrice}},[t._v(t._s(e.purchasePrice))]),t._v(" "),i("li",{staticClass:"over_hide",attrs:{title:e.warehouseName+"-"+e.areaName}},[t._v(t._s(e.warehouseName)+"-"+t._s(e.areaName))]),t._v(" "),i("li",{staticClass:"over_hide",attrs:{title:e.showSurplus}},[t._v(t._s(e.showSurplus))])])})],2):t._e()]):t._e()}))])])],2):t._e()])},[],!1,null,"607926db",null);e.default=u.exports}}]);