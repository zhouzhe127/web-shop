(window.webpackJsonp=window.webpackJsonp||[]).push([["manage_edit_win"],{"2c29":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("win",{attrs:{width:980,height:510},on:{winEvent:t.winEvent}},[i("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),t._v(" "),i("div",{staticStyle:{padding:"20px 40px"},attrs:{slot:"content",id:"tan"},slot:"content"},[i("section",{staticClass:"batch",staticStyle:{clear:"both"}},[i("section",{staticClass:"topTitle"},[i("span",[t._v("商品名称：")]),t._v(" "),i("span",[t._v(t._s(t.detail.gName))])]),t._v(" "),i("section",{staticClass:"topTitle"},[i("span",[t._v("条码：")]),t._v(" "),i("span",[t._v(t._s(t.detail.barCode))])]),t._v(" "),i("section",{staticClass:"topTitle"},[i("span",[t._v("规格：")]),t._v(" "),i("span",[t._v(t._s(t.detail.specifications))])]),t._v(" "),i("section",{staticClass:"topTitle"},[i("span",[t._v("分类：")]),t._v(" "),i("span",[t._v(t._s(t.goodsCate))])]),t._v(" "),i("div",{staticClass:"awaySet",staticStyle:{"margin-top":"20px"}},[i("div",{staticClass:"awaySet-left"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.searchText,expression:"searchText"}],attrs:{type:"text",id:"",placeholder:"输入供应商"},domProps:{value:t.searchText},on:{input:function(e){e.target.composing||(t.searchText=e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.searchCade,expression:"searchCade"}],attrs:{type:"text",id:"",placeholder:"输入批次编号"},domProps:{value:t.searchCade},on:{input:function(e){e.target.composing||(t.searchCade=e.target.value)}}}),t._v(" "),i("div",{staticStyle:{width:"210px",height:"40px",border:"1px solid #CECDCD","line-height":"40px",float:"left"}},[i("div",{staticStyle:{width:"100%",height:"40px","line-height":"40px",cursor:"pointer"},on:{click:t.showCalendar}},[i("div",{staticStyle:{float:"left",width:"45%",height:"40px","text-align":"center"}},[t._v(t._s(t.transFormDate(t.startTime)))]),t._v(" "),i("div",{staticStyle:{float:"left",width:"10%",height:"40px","text-align":"center"}},[t._v("-")]),t._v(" "),i("div",{staticStyle:{float:"left",width:"45%",height:"40px","text-align":"center"}},[t._v(t._s(t.transFormDate(t.endTime)))])]),t._v(" "),t.isShowCa?i("can-multi",{attrs:{sideStart:t.startTime,sideEnd:t.endTime},on:{closeCan:function(){t.isShowCa=!1},castTime:t.getAddAlltime}}):t._e(),t._v(" "),i("div",{staticClass:"fl calendar-ctr",attrs:{onclick:"$('#mycalendar2').mouseup();"}},[i("i")])],1)]),t._v(" "),i("div",{staticClass:"awaySet-right"},[i("a",{staticClass:"blueBor",staticStyle:{width:"100px",height:"40px","line-height":"40px","margin-right":"5px"},attrs:{href:"javascript:void(0);"},on:{click:t.searchReset}},[t._v("重置")]),t._v(" "),i("a",{staticClass:"blue",staticStyle:{width:"100px",height:"40px","line-height":"40px"},attrs:{href:"javascript:void(0);"},on:{click:t.searchNum}},[t._v("筛选")])])]),t._v(" "),i("div",{staticClass:"homeTitle",staticStyle:{"border-top":"1px solid #ccc",padding:"10px 0","margin-top":"20px"}},[i("ul",[i("li",[t._v("序号")]),t._v(" "),i("li",[t._v("批次编码")]),t._v(" "),i("li",[t._v("生产日期")]),t._v(" "),i("li",{staticStyle:{width:"30%"}},[t._v("供应商")]),t._v(" "),i("li",[t._v("数量")])])]),t._v(" "),t._l(t.showList,function(e,a){return i("div",{key:a,staticClass:"homeList",staticStyle:{padding:"2px 0",height:"54px"}},[i("ol",{class:{selon:t.batchNum==a},staticStyle:{cursor:"pointer"},on:{click:function(i){t.batchSel(e,a)}}},[i("li",[t._v(t._s(a+1))]),t._v(" "),i("li",[t._v(t._s(e.batchCode))]),t._v(" "),i("li",[t._v(t._s(t.getTime(e.productionTime)))]),t._v(" "),i("li",{staticStyle:{width:"30%"}},[t._v(t._s(e.supplier))]),t._v(" "),i("li",[t._v(t._s(e.surplus))])])])}),t._v(" "),0==t.batchDetail?i("div",{attrs:{id:"emptyData"}},[t._v("目前没有可操作数据")]):t._e(),t._v(" "),t.total>1?i("page-turn",{ref:"pageEdit",staticStyle:{float:"right","margin-top":"10px"},attrs:{isNoJump:!1,isNoPaging:!0,page:t.page,total:t.total,len:10},on:{pageNum:t.pageChanged}}):t._e()],2)])])};a._withStripped=!0;var s=i("81a2"),n=i("bbb9");var o={data:function(){return{title:"批次选择",titleList:null,startTime:n.a.getTime({time:new Date}).start,endTime:n.a.getTime({time:new Date}).end,page:1,total:0,count:0,num:10,isShowCa:!1,searchCade:"",searchText:"",newDetail:"",batchDetail:0,batchNum:null,goodsCate:[],showList:"",batchItem:""}},props:["detail","gid"],methods:{getAddAlltime:function(t){this.startTime=new Date(t.startTime).getTime(),this.endTime=new Date(t.endTime).getTime(),this.isShowCa=!1},winEvent:function(t){this.$emit("winEvent",t,this.batchItem)},init:function(){var t,e=this;return(t=regeneratorRuntime.mark(function t(){var i;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.getGoodsBatch({data:{gid:e.gid}});case 2:i=t.sent,e.batchDetail=i.list,e.newDetail=n.a.deepCopy(e.batchDetail),e.resetGoods();case 6:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function a(s,n){try{var o=e[s](n),r=o.value}catch(t){return void i(t)}if(!o.done)return Promise.resolve(r).then(function(t){a("next",t)},function(t){a("throw",t)});t(r)}("next")})})()},pageChanged:function(t){this.page=t.page,this.resetGoods()},batchSel:function(t,e){this.batchNum=e,this.batchItem=t},searchReset:function(){this.searchText="",this.searchCade="",this.startTime=n.a.getTime({time:new Date}).start,this.endTime=n.a.getTime({time:new Date}).end,this.page=1,this.newDetail=this.batchDetail,this.resetGoods()},searchNum:function(){for(var t=this.searchText,e=this.searchCade,i=[],a=0;a<this.batchDetail.length;a++){var s=this.batchDetail[a],n=1e3*s.createTime,o=new Date(this.endTime);o.setDate(o.getDate()+1),-1!=s.supplier.indexOf(t)&&0==s.batchCode.indexOf(e)&&this.startTime<=n&&n<=o&&i.push(s)}this.newDetail=i,this.resetGoods()},resetGoods:function(){this.total=Math.ceil(this.newDetail.length/this.num),this.showList=this.newDetail.slice(10*(this.page-1),10*this.page)},showCalendar:function(){this.isShowCa=!this.isShowCa},getTime:function(t){return n.a.format(new Date(1e3*t),"yyyy年MM月dd日")},transFormDate:function(t){return n.a.format(new Date(t),"yyyy-MM-dd")}},mounted:function(){var t=!0,e=!1,i=void 0;try{for(var a,s=this.detail.cate[Symbol.iterator]();!(t=(a=s.next()).done);t=!0){var n=a.value;this.goodsCate.push(n.name)}}catch(t){e=!0,i=t}finally{try{!t&&s.return&&s.return()}finally{if(e)throw i}}this.goodsCate=this.goodsCate.join(","),this.init()},components:{"page-turn":function(){return i.e("page_element").then(i.bind(null,"5921"))},win:function(){return i.e("win").then(i.bind(null,"f60a"))},"can-multi":function(){return i.e("can_multi").then(i.bind(null,"742e"))}}},r=(i("55e3"),i("7610")),l=Object(r.a)(o,a,[],!1,null,"6a962371",null);l.options.__file="src\\module\\invoicing_system\\invoicing\\manage_edit_win.vue";e.default=l.exports},"55e3":function(t,e,i){"use strict";var a=i("daf7");i.n(a).a},daf7:function(t,e,i){}}]);