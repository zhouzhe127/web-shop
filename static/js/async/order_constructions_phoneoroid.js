(window.webpackJsonp=window.webpackJsonp||[]).push([["order_constructions_phoneoroid"],{"291d":function(t,e,a){"use strict";var i=a("67cf");a.n(i).a},6798:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"membercard"}},[a("section",[a("com-table",{attrs:{listHeight:80,listWidth:1400,showHand:!1,titleData:t.shoptitleList,introData:t.formList},on:{tableEvent:t.tableEvent},scopedSlots:t._u([{key:"con-0",fn:function(e){return a("div",{on:{click:function(a){t.openStore(e.data)}}},[t._v("\n\t\t\t\t"+t._s(e.data.oid)+"\n\t\t\t")])}},{key:"con-7",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t"+t._s(e.data.vouchersPain)+"("+t._s(e.data.vouchersNum)+"张)\n\t\t\t")])}}])})],1),t._v(" "),a("section",{staticClass:"turn-page"},[a("pageElement",{attrs:{page:Number(t.page),total:Number(t.endTotal),numArr:[10,20,30,40,50],isNoJump:!0},on:{pageNum:t.getPageNum}})],1)])};i._withStripped=!0;var n={data:function(){return{page:1,num:10,endTotal:1,shoptitleList:[{titleName:"订单号",dataName:"oid",conStyle:{color:"#27a8e0",cursor:"pointer"},titleStyle:{width:"200px",flex:"none",fontSize:"16px"}},{titleName:"状态"},{titleName:"下单时间",dataName:"createTime",titleStyle:{width:"200px",flex:"none",fontSize:"16px"}},{titleName:"销量 ",dataName:"sales"},{titleName:"赠品数",dataName:"gift"},{titleName:"配送金额",dataName:"moveFee"},{titleName:"优惠总额",dataName:"discount"},{titleName:"代金券"},{titleName:"消费金额",dataName:"consumption"},{titleName:"微信支付",dataName:"weChatPain"},{titleName:"会员支付",dataName:"memberPain"},{titleName:"积分抵扣总额",dataName:"pointCash"},{titleName:"实收金额",dataName:"pain"},{titleName:"顾客电话号码",dataName:"phone"}],staticshopLists:[],allFormList:[],formList:[],oid:"",showdetail:!1}},props:{phoneOroidList:Array},methods:{tableEvent:function(){},getPageNum:function(t){this.page=t.page,this.num=t.num,this.setPage()},openStore:function(t){this.oid=t.oid,this.showdetail=!0;var e={oid:this.oid,showdetail:this.showdetail};this.$emit("phoneResult","phone",e)},setPage:function(){this.endTotal=Math.ceil(this.allFormList.length/this.num);var t=(this.page-1)*this.num,e=this.page*this.num,a=this.allFormList.slice(t,e);this.formList=a}},watch:{},components:{pageElement:function(){return a.e("page_element").then(a.bind(null,"5921"))},comTable:function(){return a.e("table").then(a.bind(null,"4360"))}},created:function(){var t={titleStyle:{fontSize:"16px"}},e=!0,a=!1,i=void 0;try{for(var n,o=this.shoptitleList[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var s=n.value;"oid"!=s.dataName&&"createTime"!=s.dataName&&Object.assign(s,t)}}catch(t){a=!0,i=t}finally{try{!e&&o.return&&o.return()}finally{if(a)throw i}}},mounted:function(){this.allFormList=this.phoneOroidList,this.setPage()},destroyed:function(){clearInterval(this.timer)}},o=(a("291d"),a("7610")),s=Object(o.a)(n,i,[],!1,null,"a3b30294",null);s.options.__file="src\\module\\statistics\\order_constructions_phoneoroid.vue";e.default=s.exports},"67cf":function(t,e,a){}}]);