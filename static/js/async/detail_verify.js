(window.webpackJsonp=window.webpackJsonp||[]).push([["detail_verify"],{3629:function(t,a,e){},"7afc":function(t,a,e){"use strict";var n=e("3629");e.n(n).a},c1f8:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{attrs:{id:"shipment"}},[n("div",{staticClass:"topBox"},[n("div",{staticClass:"title"},[n("i"),t._v(" "),n("h3",[t._v("查看详情")]),t._v(" "),t._l(70,function(t){return n("div",{key:t,staticClass:"dian"})})],2),t._v(" "),n("div",{staticClass:"innerBox"},[n("ul",[n("li",[n("span",[t._v("申请单号：")]),t._v(" "),n("span",[t._v(t._s(t.detailData.code))])]),t._v(" "),n("li",[n("span",[t._v("审核状态：")]),t._v(" "),n("span",[t._v(t._s(t.auditStatus[t.detailData.auditStatus-1]))])]),t._v(" "),n("li",[n("span",[t._v("调度状态：")]),t._v(" "),n("span",[t._v(t._s(t.dispatchStatus[t.detailData.dispatchStatus-1]))])]),t._v(" "),n("li",[n("span",[t._v("入货仓库：")]),t._v(" "),n("span",[t._v(t._s(t.detailData.wName))]),t._v(" "),t.detailData.wid?n("img",{attrs:{src:e("d94d"),alt:""},on:{click:t.examine}}):t._e()])]),t._v(" "),n("ul",[n("li",[n("span",[t._v("申请人：")]),t._v(" "),n("span",[t._v(t._s(t.detailData.createName))])]),t._v(" "),n("li",[n("span",[t._v("申请时间：")]),t._v(" "),n("span",[t._v(t._s(t.getTime(t.detailData.createTime)))])]),t._v(" "),n("li",[n("span",[t._v("原因：")]),t._v(" "),n("span",[t._v(t._s(t.detailData.reason||"--"))])]),t._v(" "),n("li",[n("span",[t._v("备注：")]),t._v(" "),n("span",[t._v(t._s(t.detailData.remark||"--"))])])]),t._v(" "),n("ul",[n("li",[n("span",[t._v("审核人：")]),t._v(" "),n("span",[t._v(t._s(t.getUserName(t.detailData.auditUid)))])]),t._v(" "),n("li",[n("span",[t._v("审核时间：")]),t._v(" "),n("span",[t._v(t._s(t.getTime(t.detailData.auditTime)))])]),t._v(" "),n("li",[n("span",[t._v("原因：")]),t._v(" "),n("span",[t._v(t._s(t.detailData.auditReason||"--"))])]),t._v(" "),n("li",[n("span",[t._v("备注：")]),t._v(" "),n("span",[t._v(t._s(t.detailData.auditRemark||"--"))])])])])]),t._v(" "),n("ul",{staticClass:"tebBox"},t._l(t.tebData,function(a,e){return n("li",{key:e,class:{active:t.tabactive==e},on:{click:function(a){t.tebClick(e)}}},[t._v(t._s(a))])})),t._v(" "),1==t.tabactive?n("com-table",{attrs:{listName:"调度单列表",titleData:t.dataList,allTotal:t.totalNum,introData:t.goodsDetails,listWidth:1200},scopedSlots:t._u([{key:"con-0",fn:function(a){return n("div",{},[n("span",{staticClass:"selDetail",on:{click:function(e){t.detailBtn(a.data.id)}}},[t._v("查看详情")]),t._v(" "),a.data&&2==a.data.dynamic&&1!=t.type?n("span",{staticClass:"inGoods",on:{click:function(e){t.insertGoods(a.data.id)}}},[n("i",[t._v("|")]),t._v("入货")]):t._e(),t._v(" "),t.detailData&&4!==Number(t.detailData.auditStatus)?n("span",{staticClass:"dele",on:{click:function(e){t.delList(a.data.id)}}},[n("i",[t._v("|")]),t._v("删除")]):t._e()])}},{key:"con-1",fn:function(a){return n("span",{},[t._v(t._s(a.index+1+10*(t.page-1)))])}},{key:"con-3",fn:function(a){return n("span",{},[t._v(t._s(t.listStatus[a.data.dynamic-1]))])}},{key:"con-7",fn:function(a){return n("span",{},[t._v(t._s(t.getTime(a.data.createTime)))])}}])}):t._e(),t._v(" "),0==t.tabactive?n("ul",{staticClass:"typeBox"},t._l(t.typeData,function(a,e){return n("li",{key:e,class:{active:t.typeactive==e},on:{click:function(a){t.typeBox(e)}}},[t._v(t._s(a))])})):t._e(),t._v(" "),0==t.tabactive?n("div",[0==t.typeactive?n("com-table",{attrs:{listName:"商品列表",titleData:t.titleList1,allTotal:t.listNum,introData:t.introData,listWidth:1e3},scopedSlots:t._u([{key:"con-0",fn:function(a){return n("span",{},[t._v(t._s(a.index+1+10*(t.page-1)))])}},{key:"con-3",fn:function(a){return n("div",{},[1==a.data.type?n("span",[t._v("普通商品")]):t._e(),t._v(" "),2==a.data.type?n("span",[t._v("物料")]):t._e(),t._v(" "),3==a.data.type?n("span",[t._v("称重商品")]):t._e()])}},{key:"con-4",fn:function(a){return n("span",{},[t._v(t._s(a.data.num)+t._s(a.data.unitName))])}},{key:"con-5",fn:function(a){return n("span",{},[t._v(t._s(a.data.shippingQty)+t._s(a.data.unitName))])}}])}):t._e(),t._v(" "),1==t.typeactive?n("com-table",{attrs:{listName:"物料列表",titleData:t.titleList2,allTotal:t.listNum,introData:t.introData,listWidth:1e3},scopedSlots:t._u([{key:"con-0",fn:function(a){return n("span",{},[t._v(t._s(a.index+1+10*(t.page-1)))])}},{key:"con-2",fn:function(a){return n("div",{},[1==a.data.type?n("span",[t._v("普通商品")]):t._e(),t._v(" "),2==a.data.type?n("span",[t._v("物料")]):t._e(),t._v(" "),3==a.data.type?n("span",[t._v("称重商品")]):t._e()])}},{key:"con-3",fn:function(a){return n("div",{},[a.data&&a.data.unitData?n("span",[t._v(t._s(t.getNum(a.data.num,a.data.unitData,a.data.unitId)))]):t._e(),t._v(" "),a.data&&!a.data.unitData?n("span",[t._v(t._s(a.data.num))]):t._e()])}},{key:"con-4",fn:function(a){return n("div",{},[a.data&&a.data.unitData?n("span",[t._v(t._s(t.getNum(a.data.shippingQty,a.data.unitData,a.data.unitId)))]):t._e(),t._v(" "),a.data&&!a.data.unitData?n("span",[t._v(t._s(a.data.shippingQty))]):t._e()])}}])}):t._e()],1):t._e(),t._v(" "),n("div",{staticClass:"page-box"},[n("page-turn",{attrs:{isNoPaging:!0,total:t.pageTotal,page:t.page},on:{pageNum:t.pageChange}})],1),t._v(" "),t.waremessage?n("waremessage-win",{attrs:{wid:t.detailData.wid,width:500,height:200,title:"仓库信息"},on:{winEvent:function(a){t.waremessage=!1}}}):t._e()],1)};n._withStripped=!0;var i=e("81a2"),s=e("bbb9"),r=e("f6ce"),o=e("05dd");function l(t){return function(){var a=t.apply(this,arguments);return new Promise(function(t,e){return function n(i,s){try{var r=a[i](s),o=r.value}catch(t){return void e(t)}if(!r.done)return Promise.resolve(o).then(function(t){n("next",t)},function(t){n("throw",t)});t(o)}("next")})}}var u={props:["type"],data:function(){return{applyId:"",tabactive:0,typeactive:0,tebData:["总单","调度单列表"],typeData:["商品","物料"],page:1,pageTotal:1,waremessage:!1,detailData:"",auditStatus:["审核中","已取消","审核未通过","审核通过"],dispatchStatus:["未调度","调度中","未出货","全部取消","待入货","已完成","已完成（异常）"],listStatus:["未出货","待入货","调度中","已取消","已完成","已完成（异常）"],user:[],introData:"",goodsDetails:"",totalNum:0,listNum:0,dataList:[{titleName:"操作"},{titleName:"序号"},{titleName:"调度单号",dataName:"receiptNumber"},{titleName:"调度状态",dataName:"dynamic"},{titleName:"出货仓库",dataName:"outWname"},{titleName:"入货仓库",dataName:"intoWname"},{titleName:"操作人",dataName:"createName"},{titleName:"操作时间"}],titleList1:[{titleName:"序号"},{titleName:"商品名称",dataName:"itemName"},{titleName:"条形码",dataName:"barCode"},{titleName:"类型"},{titleName:"申请数量"},{titleName:"出货数量"}],titleList2:[{titleName:"序号"},{titleName:"物料名称",dataName:"itemName"},{titleName:"类型"},{titleName:"申请数量",dataName:"num"},{titleName:"出货数量",dataName:"shippingQty"}]}},methods:{init:function(){var t=this;return l(regeneratorRuntime.mark(function a(){var e;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,i.a.invoic_getApplication({data:{applyId:t.applyId}});case 2:e=a.sent,t.detailData=e,t.$emit("detailData",t.detailData),t.searItem();case 6:case"end":return a.stop()}},a,t)}))()},getNum:function(t,a,e){var n=null,i=null,s=null,r=!0,l=!1,u=void 0;try{for(var c,d=a[Symbol.iterator]();!(r=(c=d.next()).done);r=!0){var p=c.value;1==p.isMin&&(s=p.name),p.muId==e&&(i=p.name,n=p.value)}}catch(t){l=!0,u=t}finally{try{!r&&d.return&&d.return()}finally{if(l)throw u}}return o.a.comUnit(t,n,i,s)},searItem:function(){var t=this;return l(regeneratorRuntime.mark(function a(){var e;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(0!=t.tabactive){a.next=7;break}return a.next=3,i.a.invoic_getApplicationDetail({data:{applyId:t.applyId,page:t.page,num:100,choose:0==t.typeactive?1:2}});case 3:e=a.sent,t.introData=e.list,t.listNum=t.introData.length,t.pageTotal=e.total;case 7:case"end":return a.stop()}},a,t)}))()},searAll:function(){var t=this;return l(regeneratorRuntime.mark(function a(){var e;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(1!=t.tabactive){a.next=7;break}return a.next=3,i.a.invoic_getApplyDispatchRecord({data:{applyId:t.applyId,page:t.page,num:100}});case 3:e=a.sent,t.goodsDetails=e.list,t.totalNum=t.goodsDetails.length,t.pageTotal=e.total;case 7:case"end":return a.stop()}},a,t)}))()},tebClick:function(t){this.tabactive=t,this.searAll(),this.searItem()},typeBox:function(t){this.typeactive=t,this.introData="",this.searItem()},examine:function(){this.waremessage=!0},pageChange:function(t){this.page=t.page},getlist:function(t){var a=[],e=!0,n=!1,i=void 0;try{for(var s,r=this.detailData.detail[Symbol.iterator]();!(e=(s=r.next()).done);e=!0){var o=s.value;o.type==t&&a.push(o)}}catch(t){n=!0,i=t}finally{try{!e&&r.return&&r.return()}finally{if(n)throw i}}return a},getTime:function(t){return 0==t?"--":s.a.format(1e3*parseInt(t),"yyyy-MM-dd hh:mm")},getUserName:function(t){var a=!0,e=!1,n=void 0;try{for(var i,s=this.user[Symbol.iterator]();!(a=(i=s.next()).done);a=!0){var r=i.value;if(r.userId==t)return r.name}}catch(t){e=!0,n=t}finally{try{!a&&s.return&&s.return()}finally{if(e)throw n}}return"--"},delList:function(t){var a=this;this.$store.commit("setWin",{winType:"confirm",title:"操作提示！",content:"确认删除调度记录？",callback:function(e){"ok"==e&&a.deleteList(t)}})},deleteList:function(t){var a=this;return l(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.invoic_deleteDispatchOrder({data:{id:t}});case 2:a.searAll(),a.init();case 4:case"end":return e.stop()}},e,a)}))()},insertGoods:function(t){this.$router.push({path:"/admin/operation/enterGoods",query:{id:t}})},detailBtn:function(t){r.a.session("clusionToOperationDetail",!0),this.$router.push({path:"/admin/operation/operationDetail",query:{id:t}})}},mounted:function(){this.user=r.a.session("user")?r.a.session("user"):[],this.applyId=this.$route.query.id,this.init()},computed:{},components:{comTable:function(){return e.e("table").then(e.bind(null,"4360"))},pageTurn:function(){return e.e("page_element").then(e.bind(null,"5921"))},waremessageWin:function(){return e.e("waremessage_win").then(e.bind(null,"39f2"))}}},c=(e("7afc"),e("7610")),d=Object(c.a)(u,n,[],!1,null,"87f20890",null);d.options.__file="src\\module\\invoicing_system\\conclusion\\detail_verify.vue";a.default=d.exports},d94d:function(t,a,e){t.exports=e.p+"images/examine.421ae45c.jpg"}}]);