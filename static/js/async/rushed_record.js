(window.webpackJsonp=window.webpackJsonp||[]).push([["rushed_record"],{"485d":function(t,e,n){"use strict";var r=n("96a5");n.n(r).a},"96a5":function(t,e,n){},ff60:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"rushedRecord"}},[n("div",{staticClass:"rushedstatus"},[t._v("\n\t\t名称:"+t._s(t.goodsname)+"\n\t")]),t._v(" "),n("com-table",{attrs:{listHeight:80,showTitle:1,introData:t.recordorderlist,listWidth:1436,titleData:t.titleList,widthType:!0},scopedSlots:t._u([{key:"con-0",fn:function(e){return n("div",{staticClass:"userbox"},[n("div",{staticClass:"imgbox"},[""!=e.data.imageUrl?n("img",{attrs:{src:e.data.imageUrl}}):t._e()]),t._v(" "),n("div",{staticClass:"namebox"},[n("span",[t._v(t._s(e.data.name))])])])}},{key:"con-1",fn:function(e){return n("div",{},[t._v("1")])}},{key:"con-2",fn:function(e){return n("div",{},[t._v(t._s(t.transFormDates(e.data.createTime)))])}},{key:"con-3",fn:function(e){return n("div",{},[t._v("\n\t\t\t"+t._s("7"==e.data.status?"是":"否")+"\n\t\t")])}}])},[n("div",{staticClass:"list_title",attrs:{slot:"title"},slot:"title"},[n("div",{staticClass:"list_title_l fl"},[n("span",[t._v("抢购记录")]),t._v(" "),n("span"),t._v(" "),n("span",[t._v("共\n\t\t\t\t\t\t\t"),n("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.count))]),t._v("条记录")])]),t._v(" "),n("div",{staticClass:"list_title_r fr"},[n("p",[t._v("抢购领取:"+t._s(t.receiveNum)+"份")]),t._v(" "),n("p",[t._v("抢购数量:"+t._s(t.grabNum)+"份")])])])]),t._v(" "),n("section",{staticClass:"turn-page"},[n("pageElement",{attrs:{page:Number(t.page),total:Number(t.pageNum),numArr:[10,20,30,40,50],isNoJump:!0},on:{pageNum:t.pageChange}})],1)],1)};r._withStripped=!0;var s=n("81a2"),i=n("f6ce");var a={data:function(){return{index:null,titleList:[{titleName:"抢购用户",titleStyle:{fontSize:"16px",width:"359px",flex:"none"}},{titleName:"数量",titleStyle:{fontSize:"16px",width:"359px",flex:"none"}},{titleName:"购买时间",titleStyle:{fontSize:"16px",width:"359px",flex:"none"}},{titleName:"是否领取",titleStyle:{fontSize:"16px",width:"359px",flex:"none"}}],allTotal:0,page:1,count:0,num:10,pageNum:1,showPageList:[10,20],goodsId:"",goodsname:"",uploadUrl:"",grabNum:"",receiveNum:"",recordorderlist:[]}},methods:{returnStore:function(){this.$router.push("/admin/Assistanthistory/detail")},pageChange:function(t){this.page=t.page,this.num=t.num,this.getRecordlist()},getRecordlist:function(){var t,e=this;return(t=regeneratorRuntime.mark(function t(){var n,r,i;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.getHistoryrecord({data:{goodsId:e.goodsId,page:e.page,num:e.num}});case 2:for(n=t.sent,e.grabNum=n.grabNum,e.receiveNum=n.receiveNum,e.recordorderlist=n.orderList,r=0;r<n.fansList.length;r++)for(i=0;i<e.recordorderlist.length;i++)e.recordorderlist[i].fid==n.fansList[r].id&&(e.recordorderlist[i].name=n.fansList[r].name,e.recordorderlist[i].imageUrl=n.fansList[r].imageUrl);e.pageNum=n.total,e.count=n.count;case 9:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function r(s,i){try{var a=e[s](i),o=a.value}catch(t){return void n(t)}if(!a.done)return Promise.resolve(o).then(function(t){r("next",t)},function(t){r("throw",t)});t(o)}("next")})})()},changeFormat:function(t){return(t-=0)<10?"0"+t:t+""},transFormDates:function(t){10==(t+="").length?(t-=0,t*=1e3):t-=0;var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+" "+e.getHours()+":"+this.changeFormat(e.getMinutes())}},watch:{pageShow:""},components:{selectBtn:function(){return n.e("select_btn").then(n.bind(null,"3d41"))},pageElement:function(){return n.e("page_element").then(n.bind(null,"5921"))},comTable:function(){return n.e("table").then(n.bind(null,"4360"))}},mounted:function(){var t=this;this.$store.commit("setPageTools",{back:function(){t.returnStore()}}),this.uploadUrl=i.a.session("userShop").uploadUrl,this.goodsId=i.a.session("historyrecord").id,this.goodsname=i.a.session("historyrecord").name,this.getRecordlist()}},o=(n("485d"),n("6ceb")),u=Object(o.a)(a,r,[],!1,null,"3e90c635",null);u.options.__file="src\\module\\seller_assistant\\rushed_record.vue";e.default=u.exports}}]);