(window.webpackJsonp=window.webpackJsonp||[]).push([["spiking_commodity"],{"5b98":function(t,e,n){"use strict";n.r(e);var a=n("81a2"),o=n("f6ce");function s(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function a(o,s){try{var i=e[o](s),r=i.value}catch(t){return void n(t)}if(!i.done)return Promise.resolve(r).then(function(t){a("next",t)},function(t){a("throw",t)});t(r)}("next")})}}var i={data:function(){return{page:1,num:10,count:"0",pageNum:"",goodslist:[],uploadUrl:"",index:null,shopstock:"",goodsimageList:"",goodsName:"",type:{0:"下架",1:"上架",2:"上架"},statusType:{0:"上架中",1:"待上架",2:"已下架"},titleList:[{titleName:"操作",titleStyle:{fontSize:"16px",width:"244px",flex:"none"}},{titleName:"状态",titleStyle:{fontSize:"16px",width:"129px",flex:"none"}},{titleName:"名称",dataName:"name",titleStyle:{fontSize:"16px",width:"129px",flex:"none"}},{titleName:"列表图",titleStyle:{fontSize:"16px",width:"129px",flex:"none"}},{titleName:"卖价",dataName:"price",titleStyle:{fontSize:"16px",width:"129px",flex:"none"}},{titleName:"原价",dataName:"originalPrice",titleStyle:{fontSize:"16px",width:"129px",flex:"none"}},{titleName:"库存",dataName:"stock",titleStyle:{fontSize:"16px",width:"129px",flex:"none"}},{titleName:"订单数",titleStyle:{fontSize:"16px",width:"129px",flex:"none"}},{titleName:"创建时间",dataName:"createTime",titleStyle:{fontSize:"16px",width:"287px",flex:"none"}}]}},methods:{addNewGoods:function(t,e){var n=this;return s(regeneratorRuntime.mark(function a(){var s,i,r,c,u;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if("edi"!=e){a.next=17;break}return a.next=3,n.getGoodsStocks(t.id);case 3:for(s=[],i=0;i<n.shopstock.length;i++)t.id==n.shopstock[i].goodsId&&s.push(n.shopstock[i]);return o.a.session("shopstock",s),a.next=8,n.getGoodsImages(t.id);case 8:for(r=[],c=[],u=0;u<n.goodsimageList.length;u++)t.id==n.goodsimageList[u].goodsId&&("1"==n.goodsimageList[u].type?c.push(n.goodsimageList[u]):"0"==n.goodsimageList[u].type&&r.push(n.goodsimageList[u]));o.a.session("detailimg",c),o.a.session("shufflingimg",r),o.a.session("detail",t),o.a.session("type",e),a.next=18;break;case 17:"add"==e&&o.a.session("type",e);case 18:n.$router.push("/admin/Assistantgood/newgoods");case 19:case"end":return a.stop()}},a,n)}))()},pageChange:function(t){this.page=t.page,this.num=t.num,this.getcommodity()},getcommodity:function(){var t=this;return s(regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.getcommodities({data:{page:t.page,num:t.num,goodsName:t.goodsName}});case 2:n=e.sent,t.goodslist=n.goodsList,t.pageNum=n.total,t.count=n.count;case 6:case"end":return e.stop()}},e,t)}))()},changeFormat:function(t){return(t-=0)<10?"0"+t:t+""},transFormDates:function(t){10==(t+="").length?(t-=0,t*=1e3):t-=0;var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+" "+e.getHours()+":"+this.changeFormat(e.getMinutes())},getGoodsStocks:function(t){var e=this;return s(regeneratorRuntime.mark(function n(){var o;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.a.getGoodsStock({data:{goodsId:t}});case 2:if(!(o=n.sent)){n.next=6;break}return e.shopstock=o,n.abrupt("return",e.shopstock);case 6:case"end":return n.stop()}},n,e)}))()},getGoodsImages:function(t){var e=this;return s(regeneratorRuntime.mark(function n(){var o;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.a.getGoodsImage({data:{goodsId:t}});case 2:if(!(o=n.sent)){n.next=6;break}return e.goodsimageList=o,n.abrupt("return",e.goodsimageList);case 6:case"end":return n.stop()}},n,e)}))()},updateStatus:function(t){var e=this;return s(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if("0"!=t.stock){n.next=3;break}return e.$store.commit("setWin",{content:"无法上架,请添加库存",winType:"alert",title:"操作提示"}),n.abrupt("return",!1);case 3:return n.next=5,a.a.updateStatus({data:{activityId:t.activityId,goodsId:t.id}});case 5:n.sent&&(e.$store.commit("setWin",{content:e.type[t.status]+"成功",winType:"alert",title:"操作提示"}),e.getcommodity());case 7:case"end":return n.stop()}},n,e)}))()},reset:function(){this.goodsName="",this.getcommodity()}},watch:{},components:{selectBtn:function(){return n.e("select_btn").then(n.bind(null,"3d41"))},pageElement:function(){return n.e("page_element").then(n.bind(null,"5921"))},comTable:function(){return n.e("table").then(n.bind(null,"4360"))}},mounted:function(){var t=this;this.$store.commit("setPageTools",{addnewgoods:function(){t.addNewGoods("","add")}}),this.uploadUrl=o.a.session("userShop").uploadUrl,this.getcommodity()}},r=(n("7d0c"),n("d801")),c=Object(r.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"spikingCommodity"}},[n("div",{staticClass:"search"},[n("span",[t._v("关键字")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.goodsName,expression:"goodsName"}],attrs:{type:"",name:"",placeholder:"请输入商品名称"},domProps:{value:t.goodsName},on:{input:function(e){e.target.composing||(t.goodsName=e.target.value)}}}),t._v(" "),n("a",{staticClass:"blue",attrs:{href:"javascript:;"},on:{click:t.getcommodity}},[t._v("筛选")]),t._v(" "),n("a",{staticClass:"gray",attrs:{href:"javascript:;"},on:{click:t.reset}},[t._v("重置")])]),t._v(" "),n("com-table",{key:t.index,attrs:{listHeight:80,listName:"疯抢商品列表",showHand:!1,listWidth:1436,introData:t.goodslist,titleData:t.titleList,widthType:!0},scopedSlots:t._u([{key:"con-0",fn:function(e){return n("div",{staticClass:"btnLink"},[n("a",{attrs:{href:"javascript:;"},on:{click:function(n){t.addNewGoods(e.data,"edi")}}},[t._v("编辑")]),t._v(" "),n("a",{attrs:{href:"javascript:;"},on:{click:function(n){t.updateStatus(e.data)}}},[t._v(t._s(t.type[e.data.status]))])])}},{key:"con-1",fn:function(e){return n("div",{class:"1"==e.data.status?"":"0"==e.data.status?"start":"end"},[t._v(t._s(t.statusType[e.data.status]))])}},{key:"con-3",fn:function(e){return n("div",{},[n("img",{staticStyle:{height:"80px"},attrs:{src:t.uploadUrl+e.data.listImage}})])}},{key:"con-4",fn:function(e){return n("div",{},[t._v("￥"+t._s(e.data.price))])}},{key:"con-5",fn:function(e){return n("div",{},[t._v("￥"+t._s(e.data.originalPrice))])}},{key:"con-7",fn:function(e){return n("div",{},[t._v(t._s(e.data.stock-e.data.spareStock))])}},{key:"con-8",fn:function(e){return n("div",{},[t._v(t._s(t.transFormDates(e.data.createTime)))])}}])}),t._v(" "),n("section",{staticClass:"turn-page"},[n("pageElement",{attrs:{page:Number(t.page),total:Number(t.pageNum),numArr:[10,20,30,40,50],isNoJump:!0},on:{pageNum:t.pageChange}})],1)],1)},[],!1,null,"16c15fcc",null);e.default=c.exports},"7d0c":function(t,e,n){"use strict";var a=n("f13d");n.n(a).a},f13d:function(t,e,n){}}]);