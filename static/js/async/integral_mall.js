(window.webpackJsonp=window.webpackJsonp||[]).push([["integral_mall"],{"5b04":function(t,e,i){"use strict";i.r(e);var n=i("81a2"),a=i("f6ce"),s=i("bbb9");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function n(a,s){try{var o=e[a](s),l=o.value}catch(t){return void i(t)}if(!o.done)return Promise.resolve(l).then(function(t){n("next",t)},function(t){n("throw",t)});t(l)}("next")})}}var l={data:function(){return{shopId:null,imgHost:null,ischain:null,goodLists:[],len:null,total:1,num:10,index:null,uid:null,isTemplate:!1,isShop:"shop",isWin:!1,editInfos:"",allTotal:100,page:1,pageTotal:10,createUser:"",dataList:[],count:0,statusType:{0:"品牌商品",1:"门店商品"},commoditySlect:"商品管理",commodityList:[{name:"商品管理",id:0},{name:"兑换管理",id:1}],commodityId:0}},mounted:function(){var t=a.a.session("userShop");this.shopId=t.currentShop.id,this.imgHost=t.uploadUrl,this.ischain=t.currentShop.ischain,this.uid=t.user.id,this.getActivityGoodsList(),"0"!=this.ischain&&"3"!=this.ischain||0!=this.commodityId||this.initBtn()},methods:{initBtn:function(){var t=this,e={setTemplateType:function(){t.isTemplate=!0},addIntegral:function(){t.editInfos="",t.$router.push("/admin/integralMall/addIntegralMall")}};this.$store.commit("setPageTools",e)},getActivityGoodsList:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var i,a,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.getActivityGoodsList({data:{page:t.page,num:t.num}});case 2:for(i=e.sent,t.goodLists=i.list,t.total=i.total,t.total<10?t.len=t.total:t.len=10,a=t.goodLists,t.count=i.count,o=0;o<a.length;o++)a[o].createTime=s.a.getTime({time:a[o].createTime,type:!0,format:"yyyy.MM.dd"}).format,a[o].showStatus=0==a[o].status?"已上架":"已下架";case 9:case"end":return e.stop()}},e,t)}))()},ActivityShelves:function(t,e,i){var a=this;return o(regeneratorRuntime.mark(function o(){var l,r;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,n.a.ActivityShelves({data:{id:e,status:0==i?1:0,uid:a.uid}});case 2:l=o.sent,(r=l).createTime=s.a.getTime({time:r.createTime,type:!0,format:"yyyy.MM.dd"}).format,a.$set(a.goodLists,t,r);case 6:case"end":return o.stop()}},o,a)}))()},ActivityDel:function(t,e){var i=this;return o(regeneratorRuntime.mark(function a(){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.a.ActivityDel({data:{id:e,uid:i.uid}});case 2:i.goodLists.splice(t,1);case 3:case"end":return a.stop()}},a,i)}))()},del:function(t,e){var i=this;this.$store.commit("setWin",{title:"提示信息",winType:"confirm",content:"确认删除商品",callback:function(n){"ok"==n&&i.ActivityDel(t,e)}})},setTemplateType:function(){this.isTemplate=!0},openWin:function(){this.editInfos="",this.isWin=!0},shelves:function(t,e,i){this.ActivityShelves(t,e,i)},edit:function(t,e){for(var i=0;i<this.goodLists.length;i++)if(this.goodLists[i].id==e){this.editInfos=this.goodLists[i],a.a.session("editInfos",this.editInfos);break}this.$router.push("/admin/integralMall/addIntegralMall")},templateResult:function(){this.isTemplate=!1},getAdd:function(){},selType:function(t){var e=this;this.commodityId=t.id,"0"!=this.ischain&&"3"!=this.ischain||0!=this.commodityId||setTimeout(function(){e.initBtn()})},handleSizeChange:function(t){this.num=t,this.getActivityGoodsList()},pageChange:function(t){this.page=t,this.getActivityGoodsList()}},components:{page:function(){return i.e("page_element").then(i.bind(null,"5921"))},temset:function(){return i.e("template_win").then(i.bind(null,"bef4"))},exchange:function(){return i.e("exchange").then(i.bind(null,"6cf9"))},addwin:function(){return i.e("addintegral_win").then(i.bind(null,"7a1e"))},comTable:function(){return i.e("table").then(i.bind(null,"4360"))}},destroyed:function(){this.$store.commit("setPageTools",{})}},r=(i("fb63"),i("d801")),c=Object(r.a)(l,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"mall-box",attrs:{id:"inte"}},[i("div",{staticClass:"firstFun"},[i("el-radio-group",{model:{value:t.commoditySlect,callback:function(e){t.commoditySlect=e},expression:"commoditySlect"}},t._l(t.commodityList,function(e,n){return i("el-radio-button",{key:n,attrs:{label:e.name},nativeOn:{change:function(i){t.selType(e)}}})}))],1),t._v(" "),0==t.commodityId?i("div",{staticClass:"gooodsTable",staticStyle:{"margin-bottom":"20px"}},[i("div",{staticClass:"list_box"},[i("div",{staticClass:"list_title"},[i("div",{staticClass:"list_title_l fl"},[i("span",[t._v("商品列表")]),t._v(" "),i("span"),t._v(" "),i("span",[t._v("共\n\t\t\t\t\t\t\t"),i("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.count))]),t._v("条记录")])]),t._v(" "),i("div",{staticClass:"list_title_r fr"})]),t._v(" "),i("el-table",{attrs:{data:t.goodLists,border:"",stripe:!0,"header-cell-style":{"background-color":"#f5f7fa"},"header-row-style":{height:"40px"},"row-style":{height:"70px"}}},[i("el-table-column",{attrs:{fixed:"",prop:"id",label:"序号",width:"100",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"商品类型",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t.statusType[e.row.type]))])]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"name",label:"商品名称",width:"200",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"imageName",label:"展示图片",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("img",{staticStyle:{width:"60px",height:"60px"},attrs:{src:t.imgHost+e.row.imageName}})]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"140",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"price",label:"兑换所需积分",width:"140",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"cash",label:"兑换所需现金",width:"140",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"inventory",label:"库存",width:"100",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"exchangeNum",label:"已兑换数量",width:"140",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"sort",label:"排序",width:"100",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"showStatus",label:"状态",width:"100",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"receiveNum",label:"操作",width:"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{staticStyle:{color:"rgb(40, 168, 224)"},attrs:{size:"mini",type:"text"},on:{click:function(i){t.shelves(e.$index,e.row.id,e.row.status)}}},[t._v(t._s("0"==e.row.status?"下架":"上架"))]),t._v(" "),i("span",{staticStyle:{padding:"0 5px",color:"#D2D2D2"}},[t._v("|")]),t._v(" "),i("el-button",{staticStyle:{color:"#ff8d00"},attrs:{size:"mini",type:"text"},on:{click:function(i){t.edit(e.$index,e.row.id)}}},[t._v("编辑")]),t._v(" "),i("span",{staticStyle:{padding:"0 5px",color:"#D2D2D2"}},[t._v("|")]),t._v(" "),i("el-button",{staticStyle:{color:"#fd3f1f"},attrs:{size:"mini",type:"text"},on:{click:function(i){t.del(e.$index,e.row.id)}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),i("div",{staticClass:"pageWrap"},[i("el-pagination",{attrs:{background:"","current-page":t.page,"page-size":t.num,layout:"sizes, prev, pager, next","page-count":t.total,"page-sizes":[10,20,30]},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)]):t._e(),t._v(" "),1==t.commodityId?i("exchange",{attrs:{shopId:t.shopId,ischain:t.ischain,imgHost:t.imgHost}}):t._e(),t._v(" "),t.isTemplate?i("temset",{attrs:{shopId:t.shopId},on:{getTemplate:t.templateResult}}):t._e(),t._v(" "),t.isWin?i("addwin",{attrs:{editInfos:t.editInfos,uid:t.uid,imgHost:t.imgHost,ischain:t.ischain},on:{winEvent:t.getAdd}}):t._e()],1)},[],!1,null,"121d3f0e",null);e.default=c.exports},fb63:function(t,e,i){"use strict";var n=i("fb78");i.n(n).a},fb78:function(t,e,i){}}]);