(window.webpackJsonp=window.webpackJsonp||[]).push([["operation_detail_list"],{"0777":function(s,t,e){"use strict";e.r(t);var a=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"detail-list"},[e("ul",{staticClass:"chooseBtn"},[e("li",{class:{select:0==s.selectType},on:{click:function(t){s.selectTab(0)}}},[s._v("商品")]),s._v(" "),e("li",{class:{select:1==s.selectType},on:{click:function(t){s.selectTab(1)}}},[s._v("物料")])]),s._v(" "),0==s.selectType?e("div",{staticClass:"table"},[e("div",{staticClass:"table-head"},[s._v("商品信息"),e("span",{staticClass:"circle"}),s._v("共"),e("em",[s._v(s._s(s.goodsDetails.length))]),s._v("个条目\n\t\t\t"),e("span",{staticClass:"detail-toggle select-ban",on:{click:s.openInfo}},[s._v(s._s(0==s.showCom?"详细":"简洁"))])]),s._v(" "),e("div",{staticClass:"scroll-box"},[e("div",{staticClass:"table-title",class:{enter:2==s.detailType}},[e("li",[s._v("序号")]),s._v(" "),e("li",[s._v("商品名")]),s._v(" "),1==s.detailType?[e("li",[s._v("条形码")]),s._v(" "),e("li",[s._v("商品类型")]),s._v(" "),e("li",[s._v("出货数量/重量")])]:s._e(),s._v(" "),2==s.detailType?[e("li",[s._v("出货数量")]),s._v(" "),e("li",[s._v("入货数量")]),s._v(" "),e("li",[s._v("耗损数量")]),s._v(" "),e("li",[s._v("入货仓库")])]:s._e()],2),s._v(" "),e("div",{staticClass:"table-body"},[s._l(s.goodsDetails,function(t,a){return e("div",{key:a,staticClass:"table-item"},[e("div",{staticClass:"one-item",class:{enter:2==s.detailType}},[e("li",[s._v(s._s(t.serialNumCus))]),s._v(" "),e("li",[s._v(s._s(t.itemName))]),s._v(" "),1==s.detailType?[e("li",[s._v(s._s(t.barCode))]),s._v(" "),e("li",[s._v(s._s(t.typeNameCus))]),s._v(" "),e("li",[s._v(s._s(t.outGoodsNumCus))])]:s._e(),s._v(" "),2==s.detailType?[e("li",[s._v(s._s(t.num))]),s._v(" "),e("li",[s._v(s._s(t.intoNum))]),s._v(" "),e("li",[s._v(s._s(t.consumeNum))]),s._v(" "),e("li",[s._v(s._s(t.wName)+"-"+s._s(t.aName))])]:s._e()],2),s._v(" "),s.showCom?e("div",{staticClass:"small-table"},[e("div",{staticClass:"small-head"},[e("span",[s._v("序号")]),s._v(" "),e("span",[s._v("批次号")]),s._v(" "),e("span",[s._v("生产日期")]),s._v(" "),e("span",[s._v("供应商")]),s._v(" "),e("span",[s._v("进价")]),s._v(" "),1==s.detailType?[e("span",[s._v("所属仓库")]),s._v(" "),e("span",[s._v("数量/重量")])]:s._e(),s._v(" "),2==s.detailType?[e("span",[s._v("入货数量")]),s._v(" "),e("span",[s._v("耗损数量")])]:s._e()],2),s._v(" "),s._l(t.batchInfo,function(t,a){return e("div",{key:a,staticClass:"small-body"},[e("span",[s._v(s._s(t.serialNumCus))]),s._v(" "),e("span",[s._v(s._s(t.batchCode))]),s._v(" "),e("span",[s._v(s._s(t.timeCus))]),s._v(" "),e("span",[s._v(s._s(t.supplier))]),s._v(" "),e("span",[s._v(s._s(t.priceAndName))]),s._v(" "),1==s.detailType?[e("span",[s._v(s._s(t.wName)+"-"+s._s(t.aName))]),s._v(" "),e("span",[s._v(s._s(t.outGoodsNumCus))])]:s._e(),s._v(" "),2==s.detailType?[e("span",[s._v(s._s(t.intoNumDetail))]),s._v(" "),e("span",[s._v(s._s(t.consumeNumDetail))])]:s._e()],2)})],2):s._e()])}),s._v(" "),s.goodsDetails.length?s._e():e("div",{staticClass:"empty"},[s._v("- 暂无条目 -")])],2)])]):s._e(),s._v(" "),1==s.selectType?e("div",{staticClass:"table"},[e("div",{staticClass:"table-head"},[s._v("物料列表"),e("span",{staticClass:"circle"}),s._v("共"),e("em",[s._v(s._s(s.materialDetails.length))]),s._v("个条目\n\t\t\t"),e("span",{staticClass:"detail-toggle select-ban",on:{click:s.openInfo}},[s._v(s._s(0==s.showCom?"详细":"简洁"))])]),s._v(" "),e("div",{staticClass:"scroll-box"},[e("div",{staticClass:"table-title",class:{enter:2==s.detailType}},[e("li",[s._v("序号")]),s._v(" "),e("li",[s._v("物料名")]),s._v(" "),1==s.detailType?[e("li",[s._v("分类")]),s._v(" "),e("li",[s._v("类型")]),s._v(" "),e("li",[s._v("出货数量/重量")])]:s._e(),s._v(" "),2==s.detailType?[e("li",[s._v("出货数量")]),s._v(" "),e("li",[s._v("入货数量")]),s._v(" "),e("li",[s._v("耗损数量")]),s._v(" "),e("li",[s._v("入货仓库")])]:s._e()],2),s._v(" "),e("div",{staticClass:"table-body"},[s._l(s.materialDetails,function(t,a){return e("div",{key:a,staticClass:"table-item"},[e("div",{staticClass:"one-item",class:{enter:2==s.detailType}},[e("li",[s._v(s._s(t.serialNumCus))]),s._v(" "),e("li",[s._v(s._s(t.itemName))]),s._v(" "),1==s.detailType?[e("li",[s._v(s._s(t.cateCus))]),s._v(" "),e("li",[s._v(s._s(t.matType))]),s._v(" "),e("li",[s._v(s._s(t.outMatNumCus))])]:s._e(),s._v(" "),2==s.detailType?[e("li",[s._v(s._s(t.num))]),s._v(" "),e("li",[s._v(s._s(t.intoNum))]),s._v(" "),e("li",[s._v(s._s(t.consumeNum))]),s._v(" "),e("li",[s._v(s._s(t.wName)+"-"+s._s(t.aName))])]:s._e()],2),s._v(" "),s.showCom?e("div",{staticClass:"small-table",class:{brand:s.isBrand&&1==s.detailType}},[e("div",{staticClass:"small-head"},[e("span",[s._v("序号")]),s._v(" "),e("span",[s._v("批次编码")]),s._v(" "),e("span",[s._v("生产日期")]),s._v(" "),e("span",[s._v("供应商")]),s._v(" "),e("span",[s._v("进价")]),s._v(" "),s.isBrand&&1==s.detailType?e("span",[s._v("分销价")]):s._e(),s._v(" "),1==s.detailType?[e("span",[s._v("所属仓库")]),s._v(" "),e("span",[s._v("数量/重量")])]:s._e(),s._v(" "),2==s.detailType?[e("span",[s._v("入货数量")]),s._v(" "),e("span",[s._v("耗损数量")])]:s._e()],2),s._v(" "),s._l(t.batchInfo,function(t,a){return e("div",{key:a,staticClass:"small-body"},[e("span",[s._v(s._s(t.serialNumCus))]),s._v(" "),e("span",[s._v(s._s(t.batchCode))]),s._v(" "),e("span",[s._v(s._s(t.timeCus))]),s._v(" "),e("span",[s._v(s._s(t.supplier))]),s._v(" "),e("span",[s._v(s._s(t.priceAndName))]),s._v(" "),s.isBrand&&1==s.detailType?e("span",[s._v(s._s(t.distributionStr))]):s._e(),s._v(" "),1==s.detailType?[e("span",[s._v(s._s(t.wName)+"-"+s._s(t.aName))]),s._v(" "),e("span",[s._v(s._s(t.outMatNumCus))])]:s._e(),s._v(" "),2==s.detailType?[e("span",[s._v(s._s(t.intoNumDetail))]),s._v(" "),e("span",[s._v(s._s(t.consumeNumDetail))])]:s._e()],2)})],2):s._e()])}),s._v(" "),s.materialDetails.length?s._e():e("div",{staticClass:"empty"},[s._v("- 暂无条目 -")])],2)])]):s._e()])};a._withStripped=!0;var i=e("f6ce"),_={data:function(){return{selectType:0,showCom:!1,goodsDetails:[],materialDetails:[],emitObj:{},detailType:1,listDetail:{},isBrand:0}},props:["detail","detailInto","type"],watch:{type:"initData",detail:"initData",detailInto:"initData"},mounted:function(){var s=i.a.session("userShop");this.isBrand="3"==s.currentShop.ischain?1:0,this.initData()},methods:{initData:function(){this.detailType=this.type,1==this.detailType?(this.detail.goods&&(this.goodsDetails=this.detail.goods),this.detail.material&&(this.materialDetails=this.detail.material)):2==this.detailType&&(this.detailInto.goods&&(this.goodsDetails=this.detailInto.goods),this.detailInto.material&&(this.materialDetails=this.detailInto.material)),!this.goodsDetails.length&&this.materialDetails.length?this.selectType=1:this.selectType=0},openInfo:function(){this.showCom=!this.showCom,this.emitObj.showCom=this.showCom,this.$emit("emit",this.emitObj)},selectTab:function(s){this.selectType=s,this.emitObj.selectType=s,this.$emit("emit",this.emitObj)}}},l=(e("10a6"),e("6ceb")),v=Object(l.a)(_,a,[],!1,null,"52ccce47",null);v.options.__file="src\\module\\invoicing_system\\warehouse_manage\\operation_detail_list.vue";t.default=v.exports},"10a6":function(s,t,e){"use strict";var a=e("7069");e.n(a).a},7069:function(s,t,e){}}]);