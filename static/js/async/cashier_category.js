(window.webpackJsonp=window.webpackJsonp||[]).push([["cashier_category"],{"5a7d":function(t,e,s){"use strict";s.r(e);var i=s("81a2"),n=s("f6ce"),a=s("bbb9");function o(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,s){return function i(n,a){try{var o=e[n](a),r=o.value}catch(t){return void s(t)}if(!o.done)return Promise.resolve(r).then(function(t){i("next",t)},function(t){i("throw",t)});t(r)}("next")})}}var r={data:function(){return{shopId:null,options:["日报表","周报表","月报表","季度报表","年报表"],selectedType:0,selectedName:"日报表",startTime:"",timeStart:"",timeEnd:"",endTime:"",hourMinute:["00-00","23-59"],index:0,shopList:[],selects:[],shopName:"请选择店铺",selShopid:[],chooseShopList:[],buttonList:{flag:0,list:[{index:0,name:"原表"},{index:1,name:"占比"},{index:2,name:"总占比"},{index:3,name:"环比"},{index:4,name:"同比"}]},taskId:"",orderList:[],selOrderList:[],selTotalList:[],loading:!0,repeat:!1,list:[],ChartShopName:[],industry:"",taskCountTotal:1,taskCount:0,totalCount:1}},mounted:function(){var t=n.a.session("userShop");this.shopId=t.currentShop.id,document.addEventListener("click",this.show),this.getShopList()},methods:{getShopList:function(){var t=this;return o(regeneratorRuntime.mark(function e(){var s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.getShopList({data:{shopId:t.shopId}});case 2:s=e.sent,t.shopList=s;case 4:case"end":return e.stop()}},e,t)}))()},classifiedReport:function(t){var e=this;return o(regeneratorRuntime.mark(function s(){return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:i.a.classifiedReport({data:{shopId:e.shopId,timeType:e.selectedType+1,startTime:0===e.selectedType?e.startTime:e.timeStart,endTime:0===e.selectedType?e.endTime:e.timeEnd,timeBetween:t,reportType:e.buttonList.flag+1,shopIds:e.selShopid.join(),type:20},timeout:6e4}).then(function(t){e.taskId=t.taskId,e.taskCountTotal=t.taskCount,e.totalCount=1,e.taskInfo(t),window.timer=setInterval(function(){e.taskInfo(t)},3e3)});case 1:case"end":return s.stop()}},s,e)}))()},taskInfo:function(t){var e=this;return o(regeneratorRuntime.mark(function s(){return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:i.a.taskInfo({data:{shopId:e.shopId,taskId:t.taskId}}).then(function(s){e.taskCount=s.taskCount,e.totalCount+=3,3==s.status?(clearInterval(window.timer),e.repeat=!1,e.getCategoryData(t.taskId)):2==s.status&&(clearInterval(window.timer),e.repeat=!1,e.loading=!0,e.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"查询失败，请重试"}))});case 1:case"end":return s.stop()}},s,e)}))()},getAnalysis:function(t){var e=this;return o(regeneratorRuntime.mark(function s(){return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:i.a.getAnalysis({data:{shopId:e.shopId,taskId:t},timeout:6e4}).then(function(t){e.orderList=a.a.deepCopy(t),e.list=a.a.deepCopy(t),e.loading=!0});case 1:case"end":return s.stop()}},s,e)}))()},getCategoryData:function(t){var e=this;return o(regeneratorRuntime.mark(function s(){return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:i.a.getCategoryData({data:{shopId:e.shopId,taskId:t},timeout:6e4}).then(function(t){e.orderList=a.a.deepCopy(t),e.list=a.a.deepCopy(t),e.loading=!0});case 1:case"end":return s.stop()}},s,e)}))()},startTimeChange:function(t,e){this.startTime=t,2==this.selectedType?this.timeStart=new Date(t).getFullYear()+"年"+(new Date(t).getMonth()+1):(this.timeStart=e,console.log(e),this.timeStart=this.timeStart.substring(0,this.timeStart.length-1),3==this.selectedType&&(this.timeStart=this.timeStart.substring(0,this.timeStart.length-1)),this.timeStart=this.timeStart.replace(/\s/g,"")),console.log(this.timeStart)},endTimeChange:function(t,e){this.endTime=t,2==this.selectedType?this.timeEnd=new Date(t).getFullYear()+"年"+(new Date(t).getMonth()+1):(this.timeEnd=e,this.timeEnd=this.timeEnd.substring(0,this.timeEnd.length-1),3==this.selectedType&&(this.timeEnd=this.timeEnd.substring(0,this.timeEnd.length-1)),this.timeEnd=this.timeEnd.replace(/\s/g,"")),console.log(this.timeEnd)},getShopname:function(){if("请选择店铺"!=this.shopName){for(var t=this.shopName.split(","),e=[],s=0;s<t.length;s++){var i={};0===s?(i.className="chyellow",i.name=t[s]):1===s?(i.className="chblue",i.name=t[s]):2===s?(i.className="chgreen",i.name=t[s]):(i.className="",i.name=t[s]),e.push(i)}this.ChartShopName=e}else this.shopName="请选择店铺"},getShop:function(t){this.shopName="";for(var e=[],s=a.a.deepCopy(this.shopList),i=0;i<s.length;i++)t.includes(s[i].id)&&(this.shopName=this.shopName+s[i].shopName+"、 ",s[i].selected=!0,e.push(s[i]));this.chooseShopList=e,console.log(e),this.selShopid=t,this.getShopname()},search:function(){if(this.endTime<this.startTime)return this.$store.commit("setWin",{title:"温馨提示",winType:"alert",content:"结束时间不能小于开始时间"}),!1;if(this.repeat)return this.$store.commit("setWin",{title:"温馨提示",winType:"alert",content:"当前查询尚未结束，请结束后再进行查询或刷新浏览器重新查询！"}),!1;if(0==this.selShopid.length)return this.$store.commit("setWin",{title:"温馨提示",winType:"alter",content:"请选择店铺"}),!1;switch(this.loading=!1,this.repeat=!0,this.taskCountTotal=1,this.taskCount=0,this.selectedType){case 0:this.startTime=a.a.format(new Date(this.startTime),"yyyy-MM-dd"),this.endTime=a.a.format(new Date(this.endTime),"yyyy-MM-dd");break;case 1:this.timeStart=this.timeStart.replace("年第","/"),this.timeEnd=this.timeEnd.replace("年第","/");break;case 2:this.timeStart=this.timeStart.replace("年","/"),this.timeEnd=this.timeEnd.replace("年","/");break;case 3:this.timeStart=this.timeStart.replace("年第","/"),this.timeEnd=this.timeEnd.replace("年第","/")}var t=this.hourMinute[0].substring(0,2)+":"+this.hourMinute[0].substring(3,5)+"-"+this.hourMinute[1].substring(0,2)+":"+this.hourMinute[1].substring(3,5);this.classifiedReport(t)},chartSearch:function(t){this.buttonList.flag=t,this.search()},resetAll:function(){this.options=["日报表","周报表","月报表","季度报表","年报表"],this.shopName="请选择店铺",this.selects=[],this.selectedType=0,this.startTime=(new Date).setHours(0,0,0,0),this.endTime=(new Date).setHours(0,0,0,0),this.index++,this.hourMinute=["00-00","23-59"],this.selShopid=[]},light:function(t){this.buttonList.flag=t,this.search()}},components:{selectBtn:function(){return s.e("select_btn").then(s.bind(null,"3d41"))},calendar:function(){return s.e("calendar_type").then(s.bind(null,"f2dd"))},timehm:function(){return s.e("time").then(s.bind(null,"4712"))},mulSelect:function(){return s.e("mul_select").then(s.bind(null,"7d09"))},categoryRetail:function(){return s.e("category_form").then(s.bind(null,"af57"))},loading:function(){return s.e("category_loading").then(s.bind(null,"ab0a"))},formShop:function(){return s.e("form_shop").then(s.bind(null,"1e0a"))},elShopList:function(){return s.e("el_shopList").then(s.bind(null,"60ff"))}},destroyed:function(){clearInterval(window.timer)}},h=(s("9a6d"),s("d801")),c=Object(h.a)(r,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"report-cate"}},[s("section",{staticClass:"yuChairFix clearfix"},[s("section",{staticClass:"top-box fl"},[s("span",{staticClass:"wordSize"},[t._v("时间类型：")]),t._v(" "),s("el-select",{model:{value:t.selectedType,callback:function(e){t.selectedType=e},expression:"selectedType"}},t._l(t.options,function(t,e){return s("el-option",{key:e,attrs:{label:t,value:e}})}))],1),t._v(" "),s("section",{staticClass:"top-box fl",staticStyle:{"margin-right":"0"}},[s("section",{staticClass:"cala chairFix"},[s("calendar",{staticClass:"data-box",attrs:{time:t.startTime,type:t.selectedType,format:"yyyy年MM月dd日"},on:{emit:t.startTimeChange}})],1)]),t._v(" "),s("span",{staticClass:"line"},[t._v("-")]),t._v(" "),s("section",{staticClass:"top-box fl"},[s("section",{staticClass:"cala chairFix"},[s("calendar",{staticClass:"data-box",attrs:{time:t.endTime,type:t.selectedType,format:"yyyy年MM月dd日"},on:{emit:t.endTimeChange}})],1)]),t._v(" "),s("section",{staticClass:"top-box fl"},[s("span",{staticClass:"wordSize"},[t._v("时间段筛选：")]),t._v(" "),s("el-time-picker",{staticStyle:{width:"200px"},attrs:{"is-range":"",clearable:!1,"value-format":"HH-mm"},model:{value:t.hourMinute,callback:function(e){t.hourMinute=e},expression:"hourMinute"}})],1),t._v(" "),s("section",{staticStyle:{display:"inline-block"}},[s("section",{staticClass:"top-box fl",staticStyle:{height:"42px"}},[s("elShopList",{attrs:{shopIds:t.selShopid},on:{chooseShop:t.getShop}})],1),t._v(" "),s("section",{staticClass:"top-box fl detLi ",staticStyle:{height:"55px"}},[s("a",{staticClass:"blue searchs",attrs:{href:"javascript:void(0);"},on:{click:t.search}},[t._v("搜索")]),t._v(" "),s("a",{staticClass:"gray",attrs:{href:"javascript:void(0);"},on:{click:t.resetAll}},[t._v("重置")])])])]),t._v(" "),t.orderList.length>0&&t.loading?s("categoryRetail",{attrs:{taskId:t.taskId,chooseShopList:t.chooseShopList.filter(function(t){return t.selected}),shopList:t.shopList,orderList:t.orderList,loading:t.loading,selShopid:t.selShopid,shopName:t.shopName,selectedType:t.selectedType}}):t._e(),t._v(" "),t.loading&&0==t.orderList.length?s("section",{staticStyle:{border:"1px solid #ccc",height:"200px","text-align":"center","line-height":"200px","font-size":"24px",color:"#B3B3B3","margin-top":"20px"}},[t._v("\n\t\t-暂无数据-\n\t")]):t._e(),t._v(" "),t.loading?t._e():s("loading",{attrs:{totalCount:t.totalCount,taskCountTotal:t.taskCountTotal,taskCount:t.taskCount}})],1)},[],!1,null,"973c0244",null);e.default=c.exports},8462:function(t,e,s){},"9a6d":function(t,e,s){"use strict";var i=s("8462");s.n(i).a}}]);