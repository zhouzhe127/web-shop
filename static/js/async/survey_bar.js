(window.webpackJsonp=window.webpackJsonp||[]).push([["survey_bar"],{"06b0":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"line"},[e("div",{staticClass:"head"},[e("span",{staticClass:"name"},[t._v("店铺统计")]),t._v(" "),e("div",{staticClass:"tab"},[e("ul",{staticClass:"barTab select-ban",on:{click:t.tabBtn}},t._l(t.tabList,function(a,s){return e("li",{key:s,class:{active:t.tabIndex==s},attrs:{"data-index":s}},[t._v(t._s(a.name))])}))])]),t._v(" "),t._m(0),t._v(" "),e("div",{staticClass:"chart-select bar-check select-ban"},t._l(t.checkList,function(a,s){return e("div",{key:s,staticClass:"check-div",class:[{active:t.barSelect[a.name]},a.className],attrs:{"data-index":s},on:{click:t.chartSelect}},[e("i"),t._v(t._s(a.name)+"\n\t\t\t\t")])}))])};s._withStripped=!0;var r={props:["bar","echarts","shopList"],data:function(){return{dataBar:{xAxis:{business:[],amount:[],orderNumber:[],discount:[],passengerFlow:[]},total:{business:[],amount:[],orderNumber:[],discount:[],passengerFlow:[]},eatIn:{business:[],amount:[],orderNumber:[],discount:[],passengerFlow:[]},takeOut:{business:[],amount:[],discount:[],orderNumber:[],passengerFlow:[]},quickPayment:{business:[],amount:[],orderNumber:[],discount:[],passengerFlow:[]}},tabList:[{type:"business",name:"营业总额"},{type:"discount",name:"优惠总额"},{type:"amount",name:"入账金额"},{type:"orderNumber",name:"订单量"},{type:"passengerFlow",name:"客流量"}],checkList:[{name:"总值",className:"total",color:"#ff9800"},{name:"堂吃",className:"eatIn",color:"#fcd030"},{name:"外卖",className:"takeOut",color:"#1b88ee"},{name:"快捷支付",className:"quickPayment",color:"#a16bff"}],xNameBar:"店铺名称",yNameBar:["营业总额","优惠总额","入账金额","订单量","客流量"],yNameIndexBar:0,tabIndex:0,barType:"business",sliderBarEnd:100,barDom:null,barSelect:{"总值":!0,"堂吃":!0,"外卖":!0,"快捷支付":!0},seriesData:[]}},mounted:function(){this.analytic(),this.echarts&&this.initEchart()},methods:{analytic:function(){var t=this.bar;for(var a in this.dataBar)for(var e in this.dataBar[a])this.dataBar.xAxis[e]=[],this.dataBar[a][e]=[];var s=[];for(var r in t){var i=!0,n=!1,o=void 0;try{for(var c,l=this.shopList[Symbol.iterator]();!(i=(c=l.next()).done);i=!0){var h=c.value;h.id==r&&s.push(h.name)}}catch(t){n=!0,o=t}finally{try{!i&&l.return&&l.return()}finally{if(n)throw o}}for(var d in this.dataBar.xAxis)this.dataBar.xAxis[d]=s;for(var u in t[r])for(var b in t[r][u])this.dataBar[u][b].push(t[r][u][b])}if(s.length>10){var m=10/s.length;(m=m.toFixed(2)-0)>1&&(m=1),this.sliderBarEnd=100*m}},initEchart:function(){this.barDom=this.echarts.init(document.getElementById("bar-charts")),this.setBarListData(this.dataBar,this.barType),this.barDom.setOption(this.getBarData(this.dataBar,this.barType))},getBarData:function(t,a){return{legend:{selected:this.barSelect},grid:{top:30,left:80,right:70,bottom:70},tooltip:{trigger:"axis",axisPointer:{type:"cross",animation:!1,label:{backgroundColor:"#505765"}}},xAxis:[{name:this.xNameBar,axisTick:{show:!1},data:t.xAxis[a]}],yAxis:[{name:this.yNameBar[this.yNameIndexBar],type:"value",axisTick:{show:!1}}],dataZoom:[{type:"slider",show:!0,start:0,end:this.sliderBarEnd}],series:this.seriesData}},setBarListData:function(t,a){var e=[],s=!0,r=!1,i=void 0;try{for(var n,o=this.checkList[Symbol.iterator]();!(s=(n=o.next()).done);s=!0){var c=n.value,l={name:c.name,type:"bar",animation:!0,barWidth:15,barGap:"20%",itemStyle:{normal:{color:c.color}},data:t[c.className][a]};e.push(l)}}catch(t){r=!0,i=t}finally{try{!s&&o.return&&o.return()}finally{if(r)throw i}}this.seriesData=e},chartSelect:function(t){var a=t.currentTarget,e=parseInt(a.getAttribute("data-index")),s=this.checkList[e].name;this.barSelect[s]=!this.barSelect[s],this.setBarListData(this.dataBar,this.barType),this.barDom.setOption(this.getBarData(this.dataBar,this.barType))},tabBtn:function(){var t=event.target;if("li"==t.tagName.toLocaleLowerCase()){var a=parseInt(t.getAttribute("data-index"));this.tabIndex=a,this.barType=this.tabList[a].type,this.yNameIndexBar=a,this.setBarListData(this.dataBar,this.barType),this.barDom.setOption(this.getBarData(this.dataBar,this.barType))}}}},i=(e("6cbf"),e("7610")),n=Object(i.a)(r,s,[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"chart-box"},[a("div",{attrs:{id:"bar-charts"}})])}],!1,null,"3a40d495",null);n.options.__file="src\\module\\home_page\\survey_bar.vue";a.default=n.exports},1185:function(t,a,e){},"6cbf":function(t,a,e){"use strict";var s=e("1185");e.n(s).a}}]);