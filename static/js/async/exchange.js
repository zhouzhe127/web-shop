(window.webpackJsonp=window.webpackJsonp||[]).push([["exchange"],{"529e":function(t,e,a){},"6cf9":function(t,e,a){"use strict";a.r(e);var n=a("81a2"),s=a("bbb9"),i=a("f6ce");function r(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function n(s,i){try{var r=e[s](i),l=r.value}catch(t){return void a(t)}if(!r.done)return Promise.resolve(l).then(function(t){n("next",t)},function(t){n("throw",t)});t(l)}("next")})}}var l={data:function(){return{useLists:[],useInitial:[],useNum:null,usedNum:null,total:1,pages:1,count:0,num:10,len:null,statusList:[{id:"all",name:"全部"},{id:"use",name:"未核销"},{id:"used",name:"已核销"}],commoditySlect:"全部",types:"all",exportUrl:"",isWin:!1,allTotal:0,staffList:{},shopsList:[],startTime:(new Date).setDate(1)-((new Date).getTime()-(new Date).setHours(0,0,0,0)),endTime:(new Date).setHours(23,59,59,59),actName:""}},props:["ischain","imgHost","shopId"],mounted:function(){this.userShop=i.a.session("userShop"),this.currentShop=this.userShop.currentShop,this.getListByShopId({page:this.pages}),"1"!=this.ischain&&"2"!=this.ischain&&this.initBtn(),this.getShopList()},methods:{initBtn:function(){var t=this,e={openCode:function(){t.openCodeWin()},leadOut:function(){t.changeExport()}};this.$store.commit("setPageTools",e)},getListByShopId:function(t){var e=this;return r(regeneratorRuntime.mark(function a(){var i,r,l;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.pages=t.page,a.next=3,n.a.getListByShopId({data:{page:e.pages,num:e.num,type:e.types,start:parseInt(e.startTime/1e3),end:parseInt(e.endTime/1e3),name:e.actName}});case 3:for(i=a.sent,e.useNum=i.numList.useNum,e.usedNum=i.numList.usedNum,e.useLists=i.list,e.staffList=i.staffList,e.total=i.total,e.count=i.count,e.total<10?e.len=e.total:e.len=10,r=e.useLists,l=0;l<r.length;l++)"0"!=r[l].createTime&&(r[l].createTime=s.a.getTime({time:r[l].createTime,type:!0,format:"yyyy.MM.dd"}).format,r[l].state=0==r[l].status?"未核销":"已核销"),1==r[l].status&&"0"!=r[l].updateTime&&(r[l].updateTime=s.a.getTime({time:r[l].updateTime,type:!0,format:"yyyy.MM.dd"}).format);e.useInitial=s.a.deepCopy(e.useLists);case 14:case"end":return a.stop()}},a,e)}))()},changeExport:function(){var t=this;return r(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.changeExport({data:{shopId:t.shopId}});case 2:case"end":return e.stop()}},e,t)}))()},openCodeWin:function(){this.isWin=!0},verifyCode:function(t){var e=this;return r(regeneratorRuntime.mark(function a(){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.a.verifyCode({data:{code:t}});case 2:e.getListByShopId({page:e.pages});case 3:case"end":return a.stop()}},a,e)}))()},code:function(t,e){"ok"==t&&this.verifyCode(e),this.isWin=!1},getShopList:function(){if("3"==this.ischain){this.shopsList=i.a.session("shopList");var t=!0,e=!1,a=void 0;try{for(var n,s=this.shopsList[Symbol.iterator]();!(t=(n=s.next()).done);t=!0){var r=n.value;r.name=r.shopName}}catch(t){e=!0,a=t}finally{try{!t&&s.return&&s.return()}finally{if(e)throw a}}}else this.shopsList.push(i.a.session("userShop").currentShop)},getshopName:function(t){var e="所有门店",a=!0,n=!1,s=void 0;try{for(var i,r=this.shopsList[Symbol.iterator]();!(a=(i=r.next()).done);a=!0){var l=i.value;l.id==t&&(e=l.name?l.name:l.shopName)}}catch(t){n=!0,s=t}finally{try{!a&&r.return&&r.return()}finally{if(n)throw s}}return e},searchList:function(){this.getListByShopId({page:1})},startTimeChange:function(t){this.startTime=t},endTimeChange:function(t){this.endTime=new Date(t).setHours(23,59,59,999)},selType:function(t){this.types=t.id,this.getListByShopId({page:1})},handleSizeChange:function(t){this.num=t,this.getListByShopId({page:this.pages})},pageChange:function(t){this.pages=t,this.getListByShopId({page:this.pages})}},components:{page:function(){return a.e("page_element").then(a.bind(null,"5921"))},changewin:function(){return a.e("exchange_win").then(a.bind(null,"6dbd"))},comTable:function(){return a.e("table").then(a.bind(null,"4360"))},calendar:function(){return a.e("calendar_type").then(a.bind(null,"f2dd"))}},destroyed:function(){this.$store.commit("setPageTools",{})}},o=(a("f02a"),a("d801")),c=Object(o.a)(l,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"user"}},[a("div",{staticClass:"filter clearfix"},[a("div",{staticClass:"filbox fl clearfix"},[a("span",{staticClass:"line fl"},[t._v("创建时间")]),t._v(" "),a("el-date-picker",{staticClass:"fl",attrs:{type:"date",format:"yyyy 年 MM 月 dd 日",placeholder:"选择日期","value-format":"timestamp",clearable:!1,editable:!1},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}}),t._v(" "),a("span",{staticClass:"line fl"},[t._v("-")]),t._v(" "),a("el-date-picker",{staticClass:"fl",attrs:{type:"date",format:"yyyy 年 MM 月 dd 日",placeholder:"选择日期","value-format":"timestamp",clearable:!1,editable:!1},on:{change:t.endTimeChange},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}}),t._v(" "),a("el-button",{staticClass:"fl",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.searchList}})],1),t._v(" "),a("div",{staticClass:"filbox fl clearfix"},[a("span",{staticClass:"fl line"},[t._v("商品名称")]),t._v(" "),a("el-input",{staticClass:"fl",staticStyle:{width:"200px"},attrs:{placeholder:"请输入商品名称",maxlength:"10"},model:{value:t.actName,callback:function(e){t.actName=e},expression:"actName"}})],1),t._v(" "),a("div",{staticClass:"filbox fl"},[a("el-button",{staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:t.searchList}},[t._v("筛选")])],1)]),t._v(" "),a("div",{staticClass:"filter clearfix"},[a("div",{staticClass:"filbox"},[a("span",{staticClass:"line"},[t._v("状态:")]),t._v(" "),a("el-radio-group",{model:{value:t.commoditySlect,callback:function(e){t.commoditySlect=e},expression:"commoditySlect"}},t._l(t.statusList,function(e,n){return a("el-radio-button",{key:n,attrs:{label:e.name},nativeOn:{change:function(a){t.selType(e)}}})}))],1)]),t._v(" "),a("div",{staticClass:"integralInfo"},[a("span",{staticClass:"fl"},[t._v("已消费："+t._s(t.usedNum)+"份")]),t._v(" "),a("span",{staticClass:"fl"},[t._v("未消费："+t._s(t.useNum)+"份")])]),t._v(" "),a("div",{staticClass:"list_box"},[a("div",{staticClass:"list_title"},[a("div",{staticClass:"list_title_l fl"},[a("span",[t._v("兑换列表")]),t._v(" "),a("span"),t._v(" "),a("span",[t._v("共\n\t\t\t\t\t\t\t\t"),a("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.count))]),t._v("条记录")])]),t._v(" "),a("div",{staticClass:"list_title_r fr"})]),t._v(" "),a("el-table",{attrs:{data:t.useLists,border:"",stripe:!0,"header-cell-style":{"background-color":"#f5f7fa"},"header-row-style":{height:"40px"},"row-style":{height:"70px"}}},[a("el-table-column",{attrs:{fixed:"",prop:"id",label:"序号",width:"100",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"gname",label:"商品名称",width:"200",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"imageName",label:"展示图片",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{width:"60px",height:"60px"},attrs:{src:t.imgHost+e.row.gimage}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"140",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"updateTime",label:"消费时间",width:"140",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"point",label:"兑换积分",width:"100",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"兑换金额",width:"100",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"mname",label:"兑换人",width:"140",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"state",label:"状态",width:"100",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"code",label:"券码",width:"100",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"领取门店",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.getshopName(e.row.shopId)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"核销人",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.staffList[e.row.updateUid]))])]}}])})],1)],1),t._v(" "),a("div",{staticClass:"pageWrap"},[a("el-pagination",{attrs:{background:"","current-page":t.pages,"page-size":t.num,layout:"sizes, prev, pager, next","page-count":t.total,"page-sizes":[10,20,30]},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1),t._v(" "),t.isWin?a("changewin",{on:{getWin:t.code}}):t._e()],1)},[],!1,null,"9e1590cc",null);e.default=c.exports},f02a:function(t,e,a){"use strict";var n=a("529e");a.n(n).a}}]);