(window.webpackJsonp=window.webpackJsonp||[]).push([["entity_card"],{"4fca":function(t,e,a){},d0d7:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"entity"},[a("div",{staticClass:"filter"},[a("div",{staticClass:"input-box"},[a("calendar",{attrs:{time:t.startTime,format:"yyyy年MM月dd日"},on:{emit:t.startTimeChange}})],1),t._v(" "),a("span",{staticClass:"input-word"},[t._v("至")]),t._v(" "),a("div",{staticClass:"input-box"},[a("calendar",{attrs:{time:t.endTime,format:"yyyy年MM月dd日"},on:{emit:t.endTimeChange}})],1),t._v(" "),a("selectBtn",{attrs:{sorts:t.selectBelong,index:t.belongIndex,width:180},on:{emit:t.belongSelect}}),t._v(" "),a("selectBtn",{attrs:{sorts:t.selectCardType,index:t.cardIndex,width:150},on:{emit:t.cardTypeSelect}})],1),t._v(" "),a("div",{staticClass:"main"},[a("div",{staticClass:"total"},[t._m(0),t._v(" "),a("div",{staticClass:"item"},[a("span",[t._v(t._s(t.cardData.num))]),t._v(" "),a("span",[t._v(t._s(t.cardData.amount))]),t._v(" "),a("span",[t._v(t._s(t.cardData.cardAmount))]),t._v(" "),a("span",[t._v(t._s(t.cardData.cardPoint))]),t._v(" "),a("span",[t._v(t._s(t.cardData.couponNum))])])]),t._v(" "),a("com-table",{attrs:{listHeight:80,showHand:!0,listName:"卡列表",showTitle:1,listWidth:1300,introData:t.cardList,titleData:t.titleList,allTotal:t.cardListLength},scopedSlots:t._u([{key:"con-0",fn:function(e){return a("div",{},[t._v(t._s(t.formatTime(e.data.createTime)))])}},{key:"con-1",fn:function(e){return a("div",{},[t._v(t._s(t.getShopName(e.data.shopId)))])}},{key:"con-2",fn:function(e){return a("div",{},[t._v(t._s(t.getCardName(e.data.cardTypeId)))])}},{key:"con-3",fn:function(e){return a("div",{},[t._v(t._s(t.getCardPrice(e.data.cardId)))])}},{key:"con-6",fn:function(e){return a("div",{staticStyle:{color:"#00aae5"}},[t._v(t._s(e.data.couponNum))])}}])}),t._v(" "),a("div",{staticClass:"page-box"},[a("pageBtn",{attrs:{total:t.pageNum,page:t.page,isNoJump:!0},on:{pageNum:t.pageChange}})],1)],1)])};n._withStripped=!0;var r=a("f6ce"),i=a("81a2"),s=a("bbb9");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function n(r,i){try{var s=e[r](i),o=s.value}catch(t){return void a(t)}if(!s.done)return Promise.resolve(o).then(function(t){n("next",t)},function(t){n("throw",t)});t(o)}("next")})}}var c={data:function(){return{index:null,titleList:[{titleName:"开卡时间",titleStyle:{width:"160px",flex:"none"}},{titleName:"卡属门店"},{titleName:"卡类型"},{titleName:"购卡金额"},{titleName:"卡内金额",dataName:"cardAmount"},{titleName:"卡内积分",dataName:"cardPoint"},{titleName:"卡内券包(张)",dataName:"couponNum"}],allTotal:0,entityList:[],belong:[],cardType:[],selectBelong:[],belongIndex:0,selectCardType:[],cardRelationList:[],cardData:"",cardList:[],cardIndex:0,startTime:"",endTime:"",cardId:0,belongId:"",page:1,pageNum:0,pageShow:10,status:0,statusFrom:0,phone:0,userData:"",userShopList:"",shopId:"",isBrand:0,cardListLength:0}},components:{selectBtn:function(){return a.e("select_btn").then(a.bind(null,"3d41"))},calendar:function(){return a.e("calendar_type").then(a.bind(null,"f2dd"))},pageBtn:function(){return a.e("page_element").then(a.bind(null,"5921"))},comTable:function(){return a.e("table").then(a.bind(null,"4360"))}},created:function(){this.userData=r.a.session("userShop"),this.shopId=this.userData.currentShop.id,this.belong=this.userData.currentShop,this.selectBelong.push(this.belong.name),this.isBrand="3"==this.userData.currentShop.ischain?1:0},mounted:function(){var t=this;this.$store.commit("setPageTools",[{name:"筛选",fn:function(){t.filter()},className:"userLabel"},{name:"重置",fn:function(){t.reset()},className:"userLabel"}]),this.shopId=this.userData.currentShop.id,this.getCardType(),this.getCardRelationList(),this.startTime=(new Date).setHours(0,0,0,0),this.endTime=(new Date).setHours(23,59,59,999),this.getCardList()},methods:{getCardType:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.cardTypeGetList({data:{shopId:t.shopId,ischain:t.isBrand}});case 2:a=e.sent,t.cardType=a,t.cardType.forEach(function(e){t.selectCardType.push(e.name)}),t.selectCardType.unshift("全部");case 6:case"end":return e.stop()}},e,t)}))()},getCardRelationList:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.getCardRelationList({data:{shopId:t.shopId,ischain:t.isBrand}});case 2:a=e.sent,t.cardRelationList=a;case 4:case"end":return e.stop()}},e,t)}))()},getCardList:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.validate()){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,i.a.getCardStatistics({data:{ischain:t.isBrand,startTime:parseInt(t.startTime/1e3),endTime:parseInt(t.endTime/1e3),page:t.page,num:t.pageShow,cardTypeId:t.cardId,subShopId:t.belongId}});case 4:a=e.sent,t.cardList=a.cardList,1==t.page&&(t.cardData=a,t.pageNum=a.total,console.log(t.pageNum),t.cardListLength=a.count);case 7:case"end":return e.stop()}},e,t)}))()},filter:function(){this.page=1,this.getCardList()},pageChange:function(t){this.page=t.page,this.pageShow=t.num,this.getCardList()},reset:function(){this.belongIndex=0,this.cardIndex=0,this.cardId="",this.belongId="",this.startTime=(new Date).setHours(0,0,0,0),this.endTime=(new Date).setHours(23,59,59,999),this.page=1,this.getCardList()},getShopName:function(){return this.belong.name},getCardName:function(t){var e=!0,a=!1,n=void 0;try{for(var r,i=this.cardType[Symbol.iterator]();!(e=(r=i.next()).done);e=!0){var s=r.value;if(s.id==t)return s.name}}catch(t){a=!0,n=t}finally{try{!e&&i.return&&i.return()}finally{if(a)throw n}}},getCardPrice:function(t){var e="--",a=!0,n=!1,r=void 0;try{for(var i,s=this.cardRelationList[Symbol.iterator]();!(a=(i=s.next()).done);a=!0){var o=i.value;o.id==t&&(e=o.price)}}catch(t){n=!0,r=t}finally{try{!a&&s.return&&s.return()}finally{if(n)throw r}}return e},formatTime:function(t){return s.a.format(new Date(1e3*t),"yyyy-MM-dd hh:mm")},belongSelect:function(t){this.belongIndex=t,this.belongId=this.belongIndex},cardTypeSelect:function(t){this.cardIndex=t,this.cardId=this.cardIndex>0?this.cardType[this.cardIndex-1].id:0},startTimeChange:function(t){this.startTime=t},endTimeChange:function(t){this.endTime=t},validate:function(){var t=!0;return parseInt(this.startTime/1e3/3600/24)>parseInt(this.endTime/1e3/3600/24)&&(this.$store.commit("setWin",{title:"提示信息",winType:"alert",content:"开始时间不能大于结束时间"}),t=!1),t}}},d=(a("f0ed"),a("6ceb")),u=Object(d.a)(c,n,[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"title"},[a("span",[t._v("开卡次数")]),t._v(" "),a("span",[t._v("购卡金额")]),t._v(" "),a("span",[t._v("卡内总额")]),t._v(" "),a("span",[t._v("卡内总积分")]),t._v(" "),a("span",[t._v("卡内券包(张)")])])}],!1,null,"e9f989e6",null);u.options.__file="src\\module\\statistics\\entity_card.vue";e.default=u.exports},f0ed:function(t,e,a){"use strict";var n=a("4fca");a.n(n).a}}]);