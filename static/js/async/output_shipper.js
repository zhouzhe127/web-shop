(window.webpackJsonp=window.webpackJsonp||[]).push([["output_shipper"],{1253:function(t,i,e){"use strict";var a=e("59b8");e.n(a).a},"59b8":function(t,i,e){},9593:function(t,i,e){"use strict";e.r(i);var a=e("f6ce"),n=e("bbb9"),s=e("05dd"),r={data:function(){return{selectType:0,showCom:!1,comObj:{},details:{},goodsDetails:[],materialDetails:[],materialUnit:[],allUnit:[],unitName:"",conversion:"",smallUnit:"",listIndex:0,sleIndex:0,printShow:!1,detailSend:"",goodsSend:"",materialSend:"",detailObj:{},isBrand:0,matTypeHash:{0:"成品",1:"半成品",2:"普通物料"}}},mounted:function(){this.initBtn();var t=a.a.session("userShop");this.details=a.a.session("outStoreDetails"),this.isBrand="3"==t.currentShop.ischain?1:0,this.details.isBrand=this.isBrand,this.goodsDetails=this.setGoodsList(this.details.itemDetail.goodsDetail),this.materialDetails=this.setMaterialList(this.details.itemDetail.materialDetail);var i={goods:this.goodsDetails,material:this.materialDetails};this.detailObj=i,!this.goodsDetails.length&&this.materialDetails.length&&(this.selectType=1)},components:{selectBtn:function(){return e.e("select_btn").then(e.bind(null,"3d41"))},outputPrint:function(){return e.e("output_shipper_print").then(e.bind(null,"ba23"))},detailList:function(){return e.e("operation_detail_list").then(e.bind(null,"0777"))}},methods:{initBtn:function(){var t=this,i=[{name:"确认",className:"primary",type:4,fn:function(){delete t.$route.query.id,t.$router.push({path:"/admin/operation",query:t.$route.query})}},{name:"打印",className:"primary",type:5,fn:function(){t.printShow=!t.printShow,t.$store.commit("setPageTools",[])}}];this.$store.commit("setPageTools",i)},getDetailObj:function(t){this.showCom=t.showCom},getEmit:function(){this.printShow=!1,this.initBtn()},setGoodsList:function(t){var i=n.a.deepCopy(t);for(var e in i){var a=i[e];a.serialNumCus=Number(e)+1,a.typeNameCus=0==a.type?"普通商品":"称重商品",a.outGoodsNumCus=a.num+a.unit;var s=0;for(var r in a.batchInfo){var o=a.batchInfo[r];o.serialNumCus="批次 "+(Number(r)+1),o.timeCus=this.timeConversion(o.productionTime),o.priceAndName=o.purchasePrice+"元/"+a.unit,o.outGoodsNumCus=o.num+a.unit,s+=o.purchasePrice*o.num}a.costTotal=this.setNumfloat(s)+"元"}return i},setMaterialList:function(t){var i=n.a.deepCopy(t);for(var e in i){var a=i[e],s=[],r=!0,o=!1,u=void 0;try{for(var l,d=a.cateData[Symbol.iterator]();!(r=(l=d.next()).done);r=!0){var m=l.value;s.push(m.name)}}catch(t){o=!0,u=t}finally{try{!r&&d.return&&d.return()}finally{if(o)throw u}}a.serialNumCus=Number(e)+1,a.cateCus=s.join(","),a.outMatNumCus=this.setUnit(a.unitData,a.num,a.selectUnitName),a.matType=this.matTypeHash[a.type];var c=0;for(var h in a.batchInfo){var v=a.batchInfo[h];v.serialNumCus="批次 "+(Number(h)+1),v.timeCus=this.timeConversion(v.productionTime),v.priceAndName=v.purchasePrice+"元/"+this.getUnitName(a.unitData,v.purchaseUnit),v.outMatNumCus=this.setUnit(a.unitData,v.num,a.selectUnitName),this.isBrand&&(v.distributionStr=v.distributionPrice+"元/"+this.getUnitName(a.unitData,v.distributionUnit)),c+=v.num/this.getUnitName(a.unitData,v.purchaseUnit,!0)*v.purchasePrice}a.costTotal=this.setNumfloat(c)+"元"}return i},getUnitName:function(t,i){var e=!0,a=!1,n=void 0;try{for(var s,r=t[Symbol.iterator]();!(e=(s=r.next()).done);e=!0){var o=s.value;if(o.muId==i)return o.name}}catch(t){a=!0,n=t}finally{try{!e&&r.return&&r.return()}finally{if(a)throw n}}},setUnit:function(t,i,e){var a=0,n=!0,s=!1,r=void 0;try{for(var o,u=t[Symbol.iterator]();!(n=(o=u.next()).done);n=!0){var l=o.value;l.name==e&&(a=Number(i)/Number(l.value)+e)}}catch(t){s=!0,r=t}finally{try{!n&&u.return&&u.return()}finally{if(s)throw r}}return a},setNumfloat:function(t){var i=t+"";if(/\.\d{4,}/.test(i)){var e=i.substr(i.indexOf(".")+3,1);i=e>0?i.replace(/(\d+\.\d{2})(\d*)/,"$1"+e):i.replace(/(\d+\.\d{2})(\d*)/,"$11")}return i},listClick:function(t){this.listIndex=t},openInfo:function(){this.showCom=!this.showCom},timeConversion:function(t){return n.a.format(new Date(1e3*t),"yyyy-MM-dd")},unitCon:function(t,i){var e="",a=!0,n=!1,r=void 0;try{for(var o,u=t.unitData[Symbol.iterator]();!(a=(o=u.next()).done);a=!0){var l=o.value;1==l.isMin&&(e=l.name)}}catch(t){n=!0,r=t}finally{try{!a&&u.return&&u.return()}finally{if(n)throw r}}return s.a.comUnit(t.num,t.unitData[i].value,t.unitData[i].name,e)},unitDetail:function(t,i,e){var a="",n=!0,r=!1,o=void 0;try{for(var u,l=t.unitData[Symbol.iterator]();!(n=(u=l.next()).done);n=!0){var d=u.value;1==d.isMin&&(a=d.name)}}catch(t){r=!0,o=t}finally{try{!n&&l.return&&l.return()}finally{if(r)throw o}}return s.a.comUnit(e,t.unitData[i].value,t.unitData[i].name,a)}}},o=(e("1253"),e("d801")),u=Object(o.a)(r,function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"output-shipper"}},[t.printShow?t._e():[e("div",{staticClass:"head"},[t._v("出货单")]),t._v(" "),e("div",{staticClass:"detail"},[e("div",{staticClass:"list"},[e("div",{staticClass:"shipper-num"},[t._v("出货单号："+t._s(t.details.receiptNumber))]),t._v(" "),e("div",[t._v("操作人："+t._s(t.details.createName))])]),t._v(" "),e("div",{staticClass:"list"},[e("div",{staticClass:"shipper-num"},[t._v("出货原因："+t._s(t.details.cause))]),t._v(" "),e("div",[t._v("备注："+t._s(t.details.remark))])]),t._v(" "),e("div",{staticClass:"list"},[e("div",{staticClass:"shipper-num"},[t._v("出货仓库："+t._s(t.details.outWname))])]),t._v(" "),e("div",{staticClass:"list"},[e("div",{staticClass:"shipper-num"},[t._v("入货仓库："+t._s(t.details.intoWname))])])]),t._v(" "),e("detail-list",{attrs:{detail:t.detailObj,type:1},on:{emit:t.getDetailObj}})],t._v(" "),t.printShow?e("output-print",{attrs:{detail:t.details,goods:t.goodsDetails,material:t.materialDetails,isOpen:t.showCom},on:{emit:t.getEmit}}):t._e()],2)},[],!1,null,"0dc5f97c",null);i.default=u.exports}}]);