(window.webpackJsonp=window.webpackJsonp||[]).push([["putaway_win"],{"7cdb":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("win",{attrs:{width:t.width,height:t.height,align:"center"},on:{winEvent:t.winEvent},scopedSlots:t._u([{key:"content",fn:function(e){return i("div",{attrs:{id:"tan"}},[i("div",{attrs:{id:"putaway"}},[i("div",{staticClass:"awayTop"},[i("div",{staticClass:"awayTitle"},[i("div",{staticClass:"awayText"},[i("h3",{staticClass:"showBefore awayText"},[t._v("商品名称:")]),t._v(" "),i("div",{staticClass:"showAfter awayText"},[t._v(t._s(t.goods.gName))])]),t._v(" "),i("div",{staticClass:"awayText"},[i("h3",{staticClass:"showBefore awayText"},[t._v("条码:")]),t._v(" "),i("div",{staticClass:"showAfter awayText"},[t._v(t._s(t.goods.barCode||"--"))])]),t._v(" "),i("div",{staticClass:"awayText"},[i("h3",{staticClass:"showBefore awayText"},[t._v("规格:")]),t._v(" "),i("div",{staticClass:"showAfter awayText"},[t._v(t._s(t.goods.specifications||"--"))])]),t._v(" "),i("div",{staticClass:"awayText"},[i("h3",{staticClass:"showBefore awayText"},[t._v("分类:")]),t._v(" "),i("div",{staticClass:"showAfter awayText"},[t._v(t._s(t.goodsCate))])])]),t._v(" "),i("div",{staticClass:"awayBtn"},[i("h3",[t._v("上架到货架:")]),t._v(" "),i("section",{staticStyle:{"margin-right":"40px",position:"relative"}},[i("section",{staticClass:"tableListInp",staticStyle:{overflow:"hidden",height:"42px","border-color":"#ccc"},on:{click:t.awaySetBtn}},[i("span",{staticStyle:{height:"40px",width:"160px",display:"block",float:"left","text-align":"center","border-right":"1px #B3B3B3 solid","line-height":"40px","font-size":"14px"}},[t._v(t._s(t.selRant))]),t._v(" "),t.newwareGoods.length>1?i("div",{staticClass:"fl",staticStyle:{"border-right":"1px #ccc solid"}},[i("i")]):t._e(),t._v(" "),t.newwareGoods.length<3?i("div",{staticClass:"fl"},[i("p",{staticStyle:{width:"40px",height:"40px","font-size":"30px","text-align":"center","line-height":"37px"},on:{click:t.putRant}},[t._v("+")])]):t._e()]),t._v(" "),t.classifyBtn?i("ul",{staticClass:"tableListUl",staticStyle:{width:"203px","background-color":"#fff",border:"1px #ccc solid",position:"absolute",top:"42px","border-top":"none","border-bottom":"none"}},t._l(t.newwareGoods,function(e,s){return i("li",{key:s,staticStyle:{"text-align":"center","border-bottom":"1px #ccc solid",cursor:"pointer"},on:{click:function(i){t.selectBtn(e)}}},[t._v(t._s(e.shelfName)+"-"+t._s(e.areaName))])})):t._e()])])]),t._v(" "),i("div",{staticClass:"awaySet"},[i("div",{staticClass:"awaySet-left"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.searchText,expression:"searchText"}],attrs:{type:"text",id:"",placeholder:"输入供应商"},domProps:{value:t.searchText},on:{input:function(e){e.target.composing||(t.searchText=e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.searchCade,expression:"searchCade"}],attrs:{type:"text",id:"",placeholder:"输入批次编号"},domProps:{value:t.searchCade},on:{input:function(e){e.target.composing||(t.searchCade=e.target.value)}}}),t._v(" "),i("div",{staticStyle:{width:"250px",height:"40px",border:"1px solid #CECDCD","line-height":"40px",float:"left"}},[i("div",{staticStyle:{width:"100%",height:"40px","line-height":"40px",cursor:"pointer"},on:{click:t.showCalendar}},[i("div",{staticStyle:{float:"left",width:"45%",height:"40px","text-align":"center"}},[t._v(t._s(t.transFormDate(t.startTime)))]),t._v(" "),i("div",{staticStyle:{float:"left",width:"10%",height:"40px","text-align":"center"}},[t._v("-")]),t._v(" "),i("div",{staticStyle:{float:"left",width:"45%",height:"40px","text-align":"center"}},[t._v(t._s(t.transFormDate(t.endTime)))])]),t._v(" "),t.open?i("can-multi",{ref:"canMulti",attrs:{sideStart:t.startTime,sideEnd:t.endTime},on:{closeCan:t.closeCan,castTime:t.getAlltime}}):t._e()],1)]),t._v(" "),i("div",{staticClass:"awaySet-right"},[i("a",{staticClass:"blueBor",staticStyle:{width:"100px",height:"40px","line-height":"40px"},attrs:{href:"javascript:void(0);"},on:{click:t.searchReset}},[t._v("重置")]),t._v(" "),i("a",{staticClass:"blue",staticStyle:{width:"100px",height:"40px","line-height":"40px"},attrs:{href:"javascript:void(0);"},on:{click:t.searchList}},[t._v("筛选")])])]),t._v(" "),i("div",{staticClass:"awayBottom"},[i("ul",{staticClass:"awayForm"},[i("li",{staticStyle:{width:"80px"}},[i("span",[t._v("序号")])]),t._v(" "),i("li",{staticStyle:{width:"160px"}},[i("span",[t._v("批次号")])]),t._v(" "),i("li",{staticStyle:{width:"160px"}},[i("span",[t._v("生产日期")])]),t._v(" "),i("li",{staticStyle:{width:"235px"}},[i("span",[t._v("供应商")])]),t._v(" "),i("li",{staticStyle:{width:"80px"}},[i("span",[t._v("数量")])]),t._v(" "),i("li",{staticStyle:{width:"160px"}},[i("span",[t._v("上架数")])])]),t._v(" "),i("div",{staticClass:"awayList"},t._l(t.searList,function(e,s){return i("ul",{key:s,staticClass:"awayListUl"},[i("li",{staticStyle:{width:"80px"}},[i("span",[t._v(t._s(s+1))])]),t._v(" "),""==e.batchCode?i("li",{staticStyle:{width:"160px"}},[i("span",[t._v("--")])]):i("li",{staticStyle:{width:"160px"}},[i("span",[t._v(t._s(e.batchCode))])]),t._v(" "),i("li",{staticStyle:{width:"160px"}},[i("span",[t._v(t._s(t.getTime(e.productionTime)||"--"))])]),t._v(" "),i("li",{staticStyle:{width:"235px"}},[i("span",[t._v(t._s(e.supplier))])]),t._v(" "),i("li",{staticStyle:{width:"80px"},attrs:{title:e.surplus}},[i("span",[t._v(t._s(e.surplus))])]),t._v(" "),i("li",{ref:"clickIpt",refInFor:!0,staticStyle:{width:"160px"}},[i("p",{on:{click:function(e){t.showInput(s)}}},[t._v("添加数量")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.awayNum[s],expression:"awayNum[i]"}],attrs:{type:"text",name:""},domProps:{value:t.awayNum[s]},on:{input:[function(e){e.target.composing||t.$set(t.awayNum,s,e.target.value)},function(e){t.inpChange(s)}]}})])])})),t._v(" "),0==t.list.length?i("div",{attrs:{id:"emptyData"}},[t._v("目前没有可操作数据")]):t._e()])])])}}])},[i("span",{attrs:{slot:"title"},slot:"title"},[t._v("上架")])]),t._v(" "),t.wareshow?i("warehouse-win",{ref:"warehouse",attrs:{title:"货架选择",wareType:1},on:{wareEvent:t.wareEvent}}):t._e()],1)};s._withStripped=!0;var a=i("bbb9"),n={data:function(){return{width:980,height:515,selRant:"选择货架",classifyBtn:!1,willAway:"",wareshow:!1,searchText:"",searchCade:"",startTime:a.a.getTime({time:new Date}).start,endTime:a.a.getTime({time:new Date}).end,awayNum:[],indexArr:[],searList:"",newwareGoods:"",open:!1,goodsCate:[],selArr:[]}},props:["goods","wareType","wareGoods","list"],methods:{awaySetBtn:function(t){t.stopPropagation(),this.classifyBtn=!this.classifyBtn},putRant:function(t){t.stopPropagation(),this.wareshow=!0},selectBtn:function(t){this.selRant=t.shelfName+"-"+t.areaName,this.classifyBtn=!1,this.willAway=t},showCalendar:function(){this.open=!this.open},searchReset:function(){this.searchCade="",this.searchText="",this.startTime=a.a.getTime({time:new Date}).start,this.endTime=a.a.getTime({time:new Date}).end,this.searList=this.selArr},searchList:function(){for(var t=this.searchText,e=this.searchCade,i=[],s=0;s<this.searList.length;s++){var a=this.searList[s],n=1e3*a.productionTime;-1!=a.supplier.indexOf(t)&&0==a.batchCode.indexOf(e)&&this.startTime<=n&&n<=this.endTime+864e5-1&&i.push(a)}this.searList=i},showInput:function(t){var e=this.$refs.clickIpt;return this.indexArr.length>=5?(this.putAlert("最多上架5个商品"),e[t].firstChild.style.display="block",void(e[t].lastChild.style.display="none")):(e[t].firstChild.style.display="none",e[t].lastChild.style.display="block",this.awayNum[t]=this.selArr[t].surplus,this.awayNum[t]<=0?(this.putAlert("上架商品数必须大于0"),e[t].firstChild.style.display="block",void(e[t].lastChild.style.display="none")):void this.indexArr.push(t))},inpChange:function(t){var e=this.$refs.clickIpt;if(+this.awayNum[t]>+this.selArr[t].surplus)return this.putAlert("上架商品数应小于总量"),this.awayNum[t]=this.selArr[t].surplus,void(e[t].lastChild.value=this.awayNum[t]);if(this.awayNum[t]<=0)return this.awayNum[t]=this.selArr[t].surplus,e[t].lastChild.value=this.awayNum[t],e[t].firstChild.style.display="block",e[t].lastChild.style.display="none",void(this.indexArr=this.indexArr.filter(function(e){return e!=t}));if(!/^[0-9]\d*\.?/.test(this.awayNum[t]))return this.putAlert("请重新输入"),this.awayNum[t]=this.selArr[t].surplus,e[t].lastChild.value=this.awayNum[t],e[t].firstChild.style.display="block",e[t].lastChild.style.display="none",void(this.indexArr=this.indexArr.filter(function(e){return e!=t}));if(0==this.selArr[t].type){if(e[t].lastChild.value=parseInt(this.awayNum[t]),this.awayNum[t]=parseInt(this.awayNum[t]),this.awayNum[t]<=0)return this.awayNum[t]=this.selArr[t].surplus,e[t].lastChild.value=this.awayNum[t],e[t].firstChild.style.display="block",e[t].lastChild.style.display="none",void(this.indexArr=this.indexArr.filter(function(e){return e!=t}))}else if(this.awayNum[t].includes(".")&&(this.awayNum[t]=a.a.deepCopy(this.awayNum[t].substr(0,this.awayNum[t].indexOf(".")+4))),this.awayNum[t]<=0)return this.awayNum[t]=this.selArr[t].surplus,e[t].lastChild.value=this.awayNum[t],e[t].firstChild.style.display="block",e[t].lastChild.style.display="none",void(this.indexArr=this.indexArr.filter(function(e){return e!=t}))},wareEvent:function(t){this.wareshow=!1,"ok"==t&&this.wareClose()},closeCan:function(){this.open=!1},wareClose:function(){var t=this.$refs.warehouse,e=new Object;if(void 0==t.chooseWare.id)return this.wareshow=!0,void this.$store.commit("setWin",{title:"提示！",winType:"alert",content:"请选择区域"});for(var i in this.checkPush=!1,e.shelfId=t.chooseWare.shelfId,e.areaName=t.chooseWare.name,e.areaId=t.chooseWare.id,e.shelfName=t.searchList[t.homeSel].name,this.newwareGoods)this.newwareGoods[i].areaId!=t.chooseWare.id?this.checkPush=!0:this.checkPush=!1;this.checkPush&&this.newwareGoods.push(e),this.selRant=t.searchList[t.homeSel].name+"-"+t.chooseWare.name,this.willAway=e},winEvent:function(t){this.$emit("putawayEvent",t)},transFormDate:function(t){return a.a.format(new Date(t),"yyyy-MM-dd")},getTime:function(t){return a.a.format(new Date(1e3*t),"yyyy年MM月dd日")},putAlert:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"错误",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"提示信息";this.$store.commit("setWin",{title:e,winType:"alert",content:t})},getAlltime:function(t){this.startTime=a.a.getTime({time:t.startTime}).start,this.endTime=a.a.getTime({time:t.endTime}).end,this.open=!1}},mounted:function(){var t=this,e=!0,i=!1,s=void 0;try{for(var n,r=this.list[Symbol.iterator]();!(e=(n=r.next()).done);e=!0){var l=n.value;Number(l.surplus)>0&&this.selArr.push(l)}}catch(t){i=!0,s=t}finally{try{!e&&r.return&&r.return()}finally{if(i)throw s}}this.searList=a.a.deepCopy(this.selArr),this.newwareGoods=a.a.deepCopy(this.wareGoods);var o=!0,h=!1,c=void 0;try{for(var d,u=this.goods.cate[Symbol.iterator]();!(o=(d=u.next()).done);o=!0){var p=d.value;this.goodsCate.push(p.name)}}catch(t){h=!0,c=t}finally{try{!o&&u.return&&u.return()}finally{if(h)throw c}}for(var w in this.goodsCate=this.goodsCate.join(","),this.selArr)this.awayNum[w]=this.selArr[w].surplus;document.onclick=function(){t.classifyBtn=!1}},components:{win:function(){return i.e("win").then(i.bind(null,"f60a"))},warehouseWin:function(){return i.e("warehouse_win").then(i.bind(null,"0c7d"))},canMulti:function(){return i.e("can_multi").then(i.bind(null,"742e"))}}},r=(i("b321"),i("7610")),l=Object(r.a)(n,s,[],!1,null,"1a791c4a",null);l.options.__file="src\\module\\invoicing_system\\invoicing\\putaway_win.vue";e.default=l.exports},"92e8":function(t,e,i){},b321:function(t,e,i){"use strict";var s=i("92e8");i.n(s).a}}]);